/**
 * Mean-field theory of deep random tanh networks (Poole et al., 2016; Schoenholz et al., 2017).
 *
 * A layer is h' = W tanh(h) + b with W_ij ~ N(0, σ_w²/N) and b_i ~ N(0, σ_b²); σ_w and σ_b are
 * standard deviations. At large width a layer is summarised by the variance q of its
 * pre-activations and the correlation c between the images of two inputs.
 */

/** tanh and sech are flat beyond |x| = 10, so integrals stop there and add the tail mass. */
const EDGE = 10;
/** Simpson intervals per integral; nested (two-input) integrals use fewer per level. */
const STEPS = 400;
const STEPS_NESTED = 160;

const sech2 = (x: number) => {
  const s = 1 / Math.cosh(x);
  return s * s;
};

/** Complementary error function (Numerical Recipes erfcc; fractional error below 1.2e-7). */
function erfc(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const r =
    t *
    Math.exp(
      -z * z - 1.26551223 +
        t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
        t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    );
  return x >= 0 ? r : 2 - r;
}

/**
 * E[f(x)] for x ~ N(mean, variance), by Simpson's rule over ±9 standard deviations. The range is
 * clipped to ±EDGE; the probability mass beyond the clip is charged at f's value on the clip.
 */
function expectation(f: (x: number) => number, mean: number, variance: number, steps = STEPS): number {
  const s = Math.sqrt(Math.max(variance, 0));
  if (s < 1e-9) return f(mean);
  if (mean - 9 * s >= EDGE) return f(EDGE);
  if (mean + 9 * s <= -EDGE) return f(-EDGE);
  const a = Math.max(mean - 9 * s, -EDGE);
  const b = Math.min(mean + 9 * s, EDGE);
  const h = (b - a) / steps;
  const norm = 1 / (s * Math.sqrt(2 * Math.PI));
  let sum = 0;
  for (let i = 0; i <= steps; i++) {
    const x = a + i * h;
    const u = (x - mean) / s;
    const w = i === 0 || i === steps ? 1 : i % 2 ? 4 : 2;
    sum += w * f(x) * Math.exp(-0.5 * u * u);
  }
  const lowTail = 0.5 * erfc((mean - a) / (s * Math.SQRT2));
  const highTail = 0.5 * erfc((b - mean) / (s * Math.SQRT2));
  return (sum * h * norm) / 3 + lowTail * f(a) + highTail * f(b);
}

/** The length map: the next layer's variance from this layer's, q → σ_w² E[tanh²(√q z)] + σ_b². */
export function qMap(q: number, sw: number, sb: number): number {
  return sw * sw * expectation((x) => Math.tanh(x) ** 2, 0, q) + sb * sb;
}

/**
 * The stable fixed point q* of the length map. Plain iteration slows down near the order-chaos
 * boundary, so every third step is an Aitken extrapolation. `q0` warm-starts the search.
 */
export function qStar(sw: number, sb: number, q0 = 1): number {
  let q = q0;
  for (let i = 0; i < 2000; i++) {
    const q1 = qMap(q, sw, sb);
    const q2 = qMap(q1, sw, sb);
    const bend = q2 - 2 * q1 + q;
    const jump = Math.abs(bend) > 1e-300 ? q - ((q1 - q) * (q1 - q)) / bend : q2;
    const next = Number.isFinite(jump) && jump >= 0 ? jump : q2;
    if (Math.abs(next - q) <= 1e-13 * Math.max(1, q)) return next;
    q = next;
  }
  return q;
}

/**
 * χ₁ = σ_w² E[tanh′(√q* z)²]: how much a small perturbation grows per layer.
 * Below 1 the network is ordered, above 1 it is chaotic.
 */
export function chi1(sw: number, sb: number, q = qStar(sw, sb)): number {
  return sw * sw * expectation((x) => sech2(x) * sech2(x), 0, q);
}

/** E[f(u₁) g(u₂)] for pre-activations u₁, u₂ with variance q and correlation c. */
function pairExpectation(f: (x: number) => number, g: (x: number) => number, c: number, q: number): number {
  const inner = q * (1 - c * c);
  return expectation((x) => f(x) * expectation(g, c * x, inner, STEPS_NESTED), 0, q, STEPS_NESTED);
}

/** The correlation map: the next layer's correlation between two inputs, at variance q*. */
export function cMap(c: number, sw: number, sb: number, q = qStar(sw, sb)): number {
  return (sw * sw * pairExpectation(Math.tanh, Math.tanh, c, q) + sb * sb) / q;
}

/**
 * The stable fixed point c* of the correlation map: 1 in the ordered phase. In the chaotic phase
 * cMap(c) − c is positive at c = 0 and negative just below 1, so c* is found by bisection.
 */
export function cStar(sw: number, sb: number, q = qStar(sw, sb)): number {
  if (chi1(sw, sb, q) <= 1) return 1;
  let lo = 0;
  let hi = 1 - 1e-6;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (cMap(mid, sw, sb, q) > mid) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * The survival depth ξ = −1 / ln χ_c: about how many layers a difference between two inputs
 * lasts. χ_c is the slope of the correlation map at c*, which equals χ₁ on the ordered side.
 * It diverges on the order-chaos boundary.
 */
export function depthScale(sw: number, sb: number): number {
  const q = qStar(sw, sb);
  const slope1 = chi1(sw, sb, q);
  const slope = slope1 <= 1 ? slope1 : sw * sw * pairExpectation(sech2, sech2, cStar(sw, sb, q), q);
  return slope >= 1 - 1e-12 ? Infinity : -1 / Math.log(slope);
}

/** The weight scale on the order-chaos boundary (χ₁ = 1) for a given bias scale. */
export function criticalWeight(sb: number): number {
  let lo = 0.5;
  let hi = 10;
  let q = 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    q = qStar(mid, sb, q);
    if (chi1(mid, sb, q) > 1) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}
