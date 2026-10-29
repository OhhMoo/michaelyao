import assert from "node:assert/strict";
import test from "node:test";

import { qStar } from "./meanfield.ts";
import {
  arcLength,
  circle,
  correlation,
  drawLayer,
  forward,
  gaussian,
  meanSquare,
  mulberry32,
  pair,
  project2,
} from "./randomnet.ts";

const near = (actual, expected, tol, what) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${what}: expected ${expected} ± ${tol}, got ${actual}`);

test("mulberry32 repeats for a seed and stays in [0, 1)", () => {
  const a = mulberry32(42), b = mulberry32(42);
  for (let i = 0; i < 100; i++) {
    const x = a();
    assert.equal(x, b());
    assert.ok(x >= 0 && x < 1);
  }
});

test("gaussian draws have mean 0 and variance 1", () => {
  const gauss = gaussian(mulberry32(1));
  let sum = 0, sq = 0;
  const m = 40000;
  for (let i = 0; i < m; i++) {
    const z = gauss();
    sum += z;
    sq += z * z;
  }
  near(sum / m, 0, 0.02, "mean");
  near(sq / m, 1, 0.03, "variance");
});

test("circle puts every point at variance q", () => {
  const n = 64, p = 12;
  const h = circle(n, p, 2.5, gaussian(mulberry32(3)));
  for (let k = 0; k < p; k++) near(meanSquare(h.subarray(k * n, (k + 1) * n), 1, n), 2.5, 1e-9, `point ${k}`);
});

test("pair has the requested variance and correlation", () => {
  const n = 128;
  const h = pair(n, 1.7, 0.35, gaussian(mulberry32(4)));
  near(meanSquare(h, 2, n), 1.7, 1e-9, "variance");
  near(correlation(h, n, 0, 1), 0.35, 1e-9, "correlation");
});

test("a wide random network settles at the mean-field q*", () => {
  const n = 1000, p = 4;
  const gauss = gaussian(mulberry32(7));
  let h = circle(n, p, 0.2, gauss);
  for (let l = 0; l < 10; l++) h = forward(h, p, drawLayer(n, gauss), 2.5, 0.3);
  const q = qStar(2.5, 0.3);
  near(meanSquare(h, p, n), q, 0.08 * q, "q after 10 layers");
});

test("project2 maps a circle to a circle of radius √(nq)", () => {
  const n = 50, p = 24, q = 0.8;
  const xy = project2(circle(n, p, q, gaussian(mulberry32(5))), p, n);
  const r = Math.sqrt(n * q);
  for (let k = 0; k < p; k++) near(Math.hypot(xy[2 * k], xy[2 * k + 1]), r, 1e-6 * r, `point ${k}`);
});

test("project2 rotates and reflects its output onto the previous frame", () => {
  const n = 50, p = 24;
  const h = circle(n, p, 0.8, gaussian(mulberry32(6)));
  const first = project2(h, p, n);
  const t = (40 * Math.PI) / 180;
  const prev = new Float64Array(2 * p);
  for (let k = 0; k < p; k++) {
    const x = first[2 * k], y = first[2 * k + 1];
    prev[2 * k] = x * Math.cos(t) + y * Math.sin(t);
    prev[2 * k + 1] = x * Math.sin(t) - y * Math.cos(t);
  }
  const aligned = project2(h, p, n, prev);
  for (let i = 0; i < 2 * p; i++) near(aligned[i], prev[i], 1e-6, `coordinate ${i}`);
});

test("arcLength of a sampled circle is its polygon perimeter", () => {
  const n = 40, p = 30, q = 1.3;
  const r = Math.sqrt(n * q);
  near(arcLength(circle(n, p, q, gaussian(mulberry32(8))), p, n), 2 * p * r * Math.sin(Math.PI / p), 1e-9, "perimeter");
});
