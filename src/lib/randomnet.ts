/**
 * Finite random tanh networks, simulated directly. Activations are stored row-major: p points
 * (rows) by n neurons (columns) in one Float64Array.
 */

export type Rand = () => number;

/** mulberry32: a small seeded generator whose whole state is one 32-bit integer. */
export function mulberry32(seed: number): Rand {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal draws from a uniform generator (Box–Muller, keeping the spare). */
export function gaussian(rand: Rand): Rand {
  let spare: number | null = null;
  return () => {
    if (spare !== null) {
      const z = spare;
      spare = null;
      return z;
    }
    let u = 0;
    while (u === 0) u = rand();
    const r = Math.sqrt(-2 * Math.log(u));
    const t = 2 * Math.PI * rand();
    spare = r * Math.sin(t);
    return r * Math.cos(t);
  };
}

/** One layer's random draws, all standard normal; forward() scales them by σ_w/√n and σ_b. */
export type Layer = { n: number; weights: Float64Array; bias: Float64Array };

export function drawLayer(n: number, gauss: Rand): Layer {
  const weights = new Float64Array(n * n);
  const bias = new Float64Array(n);
  for (let i = 0; i < weights.length; i++) weights[i] = gauss();
  for (let i = 0; i < n; i++) bias[i] = gauss();
  return { n, weights, bias };
}

/** The next layer's pre-activations: σ_w/√n · W tanh(h) + σ_b · b, for each of the p rows. */
export function forward(h: Float64Array, p: number, layer: Layer, sw: number, sb: number): Float64Array {
  const { n, weights, bias } = layer;
  const out = new Float64Array(p * n);
  const act = new Float64Array(n);
  const scale = sw / Math.sqrt(n);
  for (let k = 0; k < p; k++) {
    for (let j = 0; j < n; j++) act[j] = Math.tanh(h[k * n + j]);
    for (let i = 0; i < n; i++) {
      let s = 0;
      const row = i * n;
      for (let j = 0; j < n; j++) s += weights[row + j] * act[j];
      out[k * n + i] = scale * s + sb * bias[i];
    }
  }
  return out;
}

function normalize(v: Float64Array): Float64Array {
  let s = 0;
  for (let i = 0; i < v.length; i++) s += v[i] * v[i];
  const inv = 1 / Math.sqrt(s);
  for (let i = 0; i < v.length; i++) v[i] *= inv;
  return v;
}

function orthonormalPair(n: number, gauss: Rand): [Float64Array, Float64Array] {
  const u = normalize(Float64Array.from({ length: n }, () => gauss()));
  const v = Float64Array.from({ length: n }, () => gauss());
  let d = 0;
  for (let i = 0; i < n; i++) d += u[i] * v[i];
  for (let i = 0; i < n; i++) v[i] -= d * u[i];
  return [u, normalize(v)];
}

/** p points evenly spaced around a great circle, each with per-neuron variance q (Poole et al.). */
export function circle(n: number, p: number, q: number, gauss: Rand): Float64Array {
  const [u, v] = orthonormalPair(n, gauss);
  const r = Math.sqrt(n * q);
  const h = new Float64Array(p * n);
  for (let k = 0; k < p; k++) {
    const t = (2 * Math.PI * k) / p;
    const cu = r * Math.cos(t);
    const sv = r * Math.sin(t);
    for (let j = 0; j < n; j++) h[k * n + j] = cu * u[j] + sv * v[j];
  }
  return h;
}

/** Two inputs with per-neuron variance q and correlation c. */
export function pair(n: number, q: number, c: number, gauss: Rand): Float64Array {
  const [u, v] = orthonormalPair(n, gauss);
  const r = Math.sqrt(n * q);
  const s = Math.sqrt(1 - c * c);
  const h = new Float64Array(2 * n);
  for (let j = 0; j < n; j++) {
    h[j] = r * u[j];
    h[n + j] = r * (c * u[j] + s * v[j]);
  }
  return h;
}

/** The empirical q: mean squared pre-activation over all rows. */
export function meanSquare(h: Float64Array, p: number, n: number): number {
  let s = 0;
  for (let i = 0; i < p * n; i++) s += h[i] * h[i];
  return s / (p * n);
}

/** The empirical c between rows a and b (their cosine). */
export function correlation(h: Float64Array, n: number, a: number, b: number): number {
  let ab = 0;
  let aa = 0;
  let bb = 0;
  for (let j = 0; j < n; j++) {
    const x = h[a * n + j];
    const y = h[b * n + j];
    ab += x * y;
    aa += x * x;
    bb += y * y;
  }
  return ab / Math.sqrt(aa * bb);
}

/** Length of the closed curve through the p rows, in order. */
export function arcLength(h: Float64Array, p: number, n: number): number {
  let total = 0;
  for (let k = 0; k < p; k++) {
    const next = (k + 1) % p;
    let s = 0;
    for (let j = 0; j < n; j++) {
      const d = h[next * n + j] - h[k * n + j];
      s += d * d;
    }
    total += Math.sqrt(s);
  }
  return total;
}

/**
 * The rows projected onto their two principal components, as [x0, y0, x1, y1, ...]. The top two
 * eigenvectors of the p×p Gram matrix come from subspace iteration and a 2×2 Rayleigh–Ritz step.
 * With `prev`, the result is rotated or reflected onto it so consecutive frames line up.
 */
export function project2(h: Float64Array, p: number, n: number, prev?: Float64Array): Float64Array {
  const mean = new Float64Array(n);
  for (let k = 0; k < p; k++) for (let j = 0; j < n; j++) mean[j] += h[k * n + j] / p;
  const x = new Float64Array(p * n);
  for (let k = 0; k < p; k++) for (let j = 0; j < n; j++) x[k * n + j] = h[k * n + j] - mean[j];

  const gram = new Float64Array(p * p);
  for (let a = 0; a < p; a++) {
    for (let b = a; b < p; b++) {
      let s = 0;
      for (let j = 0; j < n; j++) s += x[a * n + j] * x[b * n + j];
      gram[a * p + b] = s;
      gram[b * p + a] = s;
    }
  }
  const apply = (v: Float64Array) => {
    const out = new Float64Array(p);
    for (let a = 0; a < p; a++) {
      let s = 0;
      for (let b = 0; b < p; b++) s += gram[a * p + b] * v[b];
      out[a] = s;
    }
    return out;
  };
  const dot = (u: Float64Array, v: Float64Array) => {
    let s = 0;
    for (let i = 0; i < p; i++) s += u[i] * v[i];
    return s;
  };

  let v1: Float64Array = new Float64Array(p);
  let v2: Float64Array = new Float64Array(p);
  for (let k = 0; k < p; k++) {
    v1[k] = prev ? prev[2 * k] : Math.cos((2 * Math.PI * k) / p);
    v2[k] = prev ? prev[2 * k + 1] : Math.sin((2 * Math.PI * k) / p);
  }
  for (let iter = 0; iter < 40; iter++) {
    const w1 = normalize(apply(v1));
    const w2 = apply(v2);
    const d = dot(w1, w2);
    for (let i = 0; i < p; i++) w2[i] -= d * w1[i];
    v1 = w1;
    v2 = normalize(w2);
  }
  const g1 = apply(v1);
  const g2 = apply(v2);
  const b11 = dot(v1, g1);
  const b12 = dot(v1, g2);
  const b22 = dot(v2, g2);
  const phi = 0.5 * Math.atan2(2 * b12, b11 - b22);
  const cs = Math.cos(phi);
  const sn = Math.sin(phi);
  const lam1 = cs * cs * b11 + 2 * cs * sn * b12 + sn * sn * b22;
  const lam2 = sn * sn * b11 - 2 * cs * sn * b12 + cs * cs * b22;
  const out = new Float64Array(2 * p);
  const s1 = lam1 > 0 ? 1 / Math.sqrt(lam1) : 0;
  const s2 = lam2 > 0 ? 1 / Math.sqrt(lam2) : 0;
  for (let k = 0; k < p; k++) {
    out[2 * k] = (cs * g1[k] + sn * g2[k]) * s1;
    out[2 * k + 1] = (-sn * g1[k] + cs * g2[k]) * s2;
  }
  return prev ? alignTo(out, prev) : out;
}

/** The rotation or reflection of the 2-D points `y` that best matches `target` (Procrustes). */
function alignTo(y: Float64Array, target: Float64Array): Float64Array {
  let m11 = 0;
  let m12 = 0;
  let m21 = 0;
  let m22 = 0;
  for (let k = 0; k < y.length; k += 2) {
    m11 += y[k] * target[k];
    m12 += y[k] * target[k + 1];
    m21 += y[k + 1] * target[k];
    m22 += y[k + 1] * target[k + 1];
  }
  const rot = Math.hypot(m11 + m22, m21 - m12);
  const ref = Math.hypot(m11 - m22, m12 + m21);
  const out = new Float64Array(y.length);
  if (rot >= ref) {
    const t = Math.atan2(m21 - m12, m11 + m22);
    const c = Math.cos(t);
    const s = Math.sin(t);
    for (let k = 0; k < y.length; k += 2) {
      out[k] = y[k] * c + y[k + 1] * s;
      out[k + 1] = -y[k] * s + y[k + 1] * c;
    }
  } else {
    const t = Math.atan2(m12 + m21, m11 - m22);
    const c = Math.cos(t);
    const s = Math.sin(t);
    for (let k = 0; k < y.length; k += 2) {
      out[k] = y[k] * c + y[k + 1] * s;
      out[k + 1] = y[k] * s - y[k + 1] * c;
    }
  }
  return out;
}
