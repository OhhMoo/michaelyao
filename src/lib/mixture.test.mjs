import assert from "node:assert/strict";
import test from "node:test";

import { fitMixture, logDensity, sampleMixture, silhouette } from "./mixture.ts";
import { mulberry32 } from "./randomnet.ts";

const near = (actual, expected, tol, what) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${what}: expected ${expected} ± ${tol}, got ${actual}`);

test("logDensity matches the closed form of a 2-D Gaussian", () => {
  const g = { weight: 1, mean: [1, 2], cov: [2, 0, 0.5] };
  near(logDensity(g, 1, 2), -Math.log(2 * Math.PI), 1e-12, "at the mean, det 1");
  near(logDensity(g, 1 + Math.SQRT2, 2), -Math.log(2 * Math.PI) - 0.5, 1e-12, "one Mahalanobis unit away");
  const tilted = { weight: 1, mean: [0, 0], cov: [1, 0.5, 1] };
  near(logDensity(tilted, 0, 0), -Math.log(2 * Math.PI) - 0.5 * Math.log(0.75), 1e-12, "correlated, at the mean");
});

test("sampleMixture draws each component in proportion to its weight", () => {
  const { xs, ys, labels } = sampleMixture(
    [
      { weight: 0.25, mean: [0, 0], cov: [1, 0, 1] },
      { weight: 0.75, mean: [10, 10], cov: [1, 0, 1] },
    ],
    4000,
    mulberry32(1),
  );
  assert.equal(xs.length, 4000);
  assert.equal(ys.length, 4000);
  near(labels.filter((l) => l === 1).length / 4000, 0.75, 0.03, "share of component 1");
});

test("fitMixture recovers the weights and means of a two-component mixture", () => {
  const truth = [
    { weight: 0.4, mean: [0.2, 0.2], cov: [0.003, 0, 0.003] },
    { weight: 0.6, mean: [0.8, 0.7], cov: [0.004, 0.001, 0.004] },
  ];
  const { xs, ys } = sampleMixture(truth, 2000, mulberry32(2));
  const fit = fitMixture(xs, ys).sort((a, b) => a.mean[1] - b.mean[1]);
  for (const [i, g] of fit.entries()) {
    near(g.weight, truth[i].weight, 0.05, `weight ${i}`);
    near(g.mean[0], truth[i].mean[0], 0.02, `mean x ${i}`);
    near(g.mean[1], truth[i].mean[1], 0.02, `mean y ${i}`);
  }
});

test("silhouette scores two tight, distant groups near 1 and skips unassigned points", () => {
  const xs = [0, 1, 10, 11, 5];
  const ys = [0, 0, 0, 0, 0];
  const labels = [0, 0, 1, 1, -1];
  const expected = (2 * (10.5 - 1) / 10.5 + 2 * (9.5 - 1) / 9.5) / 4;
  near(silhouette(xs, ys, labels), expected, 1e-12, "mean silhouette");
});
