/** Two-dimensional Gaussian mixtures: sampling, a two-component EM fit, and the silhouette score. */

/** cov is the symmetric matrix [[a, b], [b, c]] stored as [a, b, c]. */
export type Gaussian2 = { weight: number; mean: [number, number]; cov: [number, number, number] };

export function logDensity(g: Gaussian2, x: number, y: number): number {
  const [a, b, c] = g.cov;
  const det = a * c - b * b;
  const dx = x - g.mean[0];
  const dy = y - g.mean[1];
  const mahalanobis = (c * dx * dx - 2 * b * dx * dy + a * dy * dy) / det;
  return -Math.log(2 * Math.PI) - 0.5 * Math.log(det) - 0.5 * mahalanobis;
}

/** n points from the mixture; labels[i] is the component that drew point i. */
export function sampleMixture(components: Gaussian2[], n: number, rand: () => number) {
  const xs = new Float64Array(n);
  const ys = new Float64Array(n);
  const labels: number[] = [];
  const normal = () => {
    let u = 0;
    while (u === 0) u = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
  };
  for (let i = 0; i < n; i++) {
    let k = 0;
    let edge = components[0].weight;
    const u = rand();
    while (u > edge && k < components.length - 1) edge += components[++k].weight;
    const { mean, cov } = components[k];
    const l11 = Math.sqrt(cov[0]);
    const l21 = cov[1] / l11;
    const l22 = Math.sqrt(cov[2] - l21 * l21);
    const z1 = normal();
    const z2 = normal();
    xs[i] = mean[0] + l11 * z1;
    ys[i] = mean[1] + l21 * z1 + l22 * z2;
    labels.push(k);
  }
  return { xs, ys, labels };
}

function weightedGaussian(xs: ArrayLike<number>, ys: ArrayLike<number>, w: (i: number) => number): Gaussian2 {
  const n = xs.length;
  let total = 0;
  let mx = 0;
  let my = 0;
  for (let i = 0; i < n; i++) {
    total += w(i);
    mx += w(i) * xs[i];
    my += w(i) * ys[i];
  }
  mx /= total;
  my /= total;
  let a = 0;
  let b = 0;
  let c = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - mx;
    const dy = ys[i] - my;
    a += w(i) * dx * dx;
    b += w(i) * dx * dy;
    c += w(i) * dy * dy;
  }
  const ridge = 1e-6;
  return { weight: total / n, mean: [mx, my], cov: [a / total + ridge, b / total, c / total + ridge] };
}

/**
 * A two-component Gaussian mixture fitted by expectation–maximisation, started from the two
 * halves of the data split at the median of x + y.
 */
export function fitMixture(xs: ArrayLike<number>, ys: ArrayLike<number>, iterations = 200): Gaussian2[] {
  const n = xs.length;
  const second = new Float64Array(n);
  Array.from({ length: n }, (_, i) => i)
    .sort((i, j) => xs[i] + ys[i] - (xs[j] + ys[j]))
    .forEach((i, rank) => {
      second[i] = rank >= n / 2 ? 1 : 0;
    });
  let components: Gaussian2[] = [];
  for (let iter = 0; iter < iterations; iter++) {
    components = [
      weightedGaussian(xs, ys, (i) => 1 - second[i]),
      weightedGaussian(xs, ys, (i) => second[i]),
    ];
    for (let i = 0; i < n; i++) {
      const l0 = Math.log(components[0].weight) + logDensity(components[0], xs[i], ys[i]);
      const l1 = Math.log(components[1].weight) + logDensity(components[1], xs[i], ys[i]);
      second[i] = 1 / (1 + Math.exp(l0 - l1));
    }
  }
  return components;
}

/**
 * Mean silhouette over the points with a label of 0 or more; a label of −1 leaves a point out.
 * Each point scores (b − a) / max(a, b), with a its mean distance to its own group and b to the
 * other; a point alone in its group scores 0.
 */
export function silhouette(xs: ArrayLike<number>, ys: ArrayLike<number>, labels: ArrayLike<number>): number {
  const kept: number[] = [];
  for (let i = 0; i < labels.length; i++) if (labels[i] >= 0) kept.push(i);
  let total = 0;
  for (const i of kept) {
    let same = 0;
    let sameN = 0;
    let other = 0;
    let otherN = 0;
    for (const j of kept) {
      if (i === j) continue;
      const d = Math.hypot(xs[i] - xs[j], ys[i] - ys[j]);
      if (labels[j] === labels[i]) {
        same += d;
        sameN++;
      } else {
        other += d;
        otherN++;
      }
    }
    if (!sameN || !otherN) continue;
    const a = same / sameN;
    const b = other / otherN;
    total += (b - a) / Math.max(a, b);
  }
  return kept.length ? total / kept.length : 0;
}
