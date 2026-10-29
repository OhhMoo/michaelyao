import assert from "node:assert/strict";
import test from "node:test";

import { cMap, chi1, criticalWeight, cStar, depthScale, qMap, qStar } from "./meanfield.ts";

// Expected values come from a separate brute-force integration (Simpson's rule on fixed z-grids),
// not from this module. σ_w and σ_b are standard deviations; σ_b = 0.3 matches the research runs.
const near = (actual, expected, tol, what) =>
  assert.ok(Math.abs(actual - expected) <= tol, `${what}: expected ${expected} ± ${tol}, got ${actual}`);

test("qStar is the variance fixed point of the research networks", () => {
  near(qStar(1.2, 0.3), 0.4695, 1e-3, "σ_w 1.2");
  near(qStar(2.5, 0.3), 4.0791, 1e-3, "σ_w 2.5");
  near(qStar(4.0, 0.3), 12.6041, 2e-3, "σ_w 4.0");
});

test("qMap leaves qStar unchanged", () => {
  for (const sw of [1.2, 2.5, 4.0]) {
    const q = qStar(sw, 0.3);
    near(qMap(q, sw, 0.3), q, 1e-6 * q, `σ_w ${sw}`);
  }
});

test("chi1 is below 1 in the ordered phase and above 1 in the chaotic phase", () => {
  near(chi1(1.2, 0.3), 0.87, 1e-3, "σ_w 1.2");
  near(chi1(1.3, 0.3), 0.9398, 1e-3, "σ_w 1.3");
  near(chi1(2.5, 0.3), 1.5852, 1e-3, "σ_w 2.5");
  near(chi1(4.0, 0.3), 2.3673, 1e-3, "σ_w 4.0");
});

test("criticalWeight traces chi1 = 1 across the bias scale", () => {
  near(criticalWeight(0), 1, 5e-3, "σ_b 0");
  for (const [sb, sw] of [[0.3, 1.3956], [1, 1.8556], [2, 2.325], [3, 2.7058], [3.8, 2.9735]]) {
    near(criticalWeight(sb), sw, 2e-3, `σ_b ${sb}`);
  }
});

test("cMap fixes c = 1 and sends uncorrelated inputs to σ_b² / q*", () => {
  for (const sw of [1.2, 2.5, 4.0]) {
    near(cMap(1, sw, 0.3), 1, 1e-6, `c 1, σ_w ${sw}`);
    near(cMap(0, sw, 0.3), 0.09 / qStar(sw, 0.3), 1e-6, `c 0, σ_w ${sw}`);
  }
  near(cMap(0.5, 2.5, 0.3), 0.4442, 1e-3, "c 0.5, σ_w 2.5");
});

test("cStar is 1 when ordered and below 1 when chaotic", () => {
  assert.equal(cStar(1.2, 0.3), 1);
  near(cStar(2.5, 0.3), 0.1221, 2e-3, "σ_w 2.5");
  near(cStar(4.0, 0.3), 0.0297, 2e-3, "σ_w 4.0");
});

test("depthScale is finite off the boundary and diverges on it", () => {
  near(depthScale(1.2, 0.3), 7.1814, 0.05, "ordered, σ_w 1.2");
  near(depthScale(2.5, 0.3), 5.1089, 0.05, "chaotic, σ_w 2.5");
  assert.ok(depthScale(criticalWeight(0.3), 0.3) > 100, "on the boundary");
});
