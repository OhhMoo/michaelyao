import { qStar } from "@/lib/meanfield";
import {
  arcLength,
  circle,
  drawLayer,
  forward,
  gaussian,
  mulberry32,
  project2,
  type Layer,
  type Rand,
} from "@/lib/randomnet";

/** Neurons per layer, points around the circle, layers per network, and the bias scale. */
export const CIRCLE_WIDTH = 200;
export const CIRCLE_POINTS = 160;
export const CIRCLE_DEPTH = 30;
export const CIRCLE_SB = 0.3;

type Frame = { xy: Float64Array; stretch: number };
export type CircleRun = {
  weights: readonly number[];
  gauss: Rand;
  h: Float64Array[];
  frames: Frame[][];
  base: number[];
  pending: { layer: Layer; next: Float64Array[] } | null;
};

/** One circle, scaled to each network's q*, sent into networks that share their random draws. */
export function startRun(seed: number, weights: readonly number[]): CircleRun {
  const gauss = gaussian(mulberry32(seed));
  const unit = circle(CIRCLE_WIDTH, CIRCLE_POINTS, 1, gauss);
  const h = weights.map((sw) => {
    const scale = Math.sqrt(qStar(sw, CIRCLE_SB));
    return unit.map((v) => v * scale);
  });
  return {
    weights,
    gauss,
    h,
    frames: h.map((x) => [{ xy: project2(x, CIRCLE_POINTS, CIRCLE_WIDTH), stretch: 1 }]),
    base: h.map((x) => arcLength(x, CIRCLE_POINTS, CIRCLE_WIDTH)),
    pending: null,
  };
}

/** Layers computed for every network. */
export const depthOf = (run: CircleRun) => run.frames[run.weights.length - 1].length - 1;

/** Computes the next layer for one network, so a layer costs one animation frame per network. */
export function advance(run: CircleRun) {
  if (depthOf(run) >= CIRCLE_DEPTH) return;
  run.pending ??= { layer: drawLayer(CIRCLE_WIDTH, run.gauss), next: [] };
  const i = run.pending.next.length;
  const h = forward(run.h[i], CIRCLE_POINTS, run.pending.layer, run.weights[i], CIRCLE_SB);
  const frames = run.frames[i];
  frames.push({
    xy: project2(h, CIRCLE_POINTS, CIRCLE_WIDTH, frames[frames.length - 1].xy),
    stretch: arcLength(h, CIRCLE_POINTS, CIRCLE_WIDTH) / run.base[i],
  });
  run.pending.next.push(h);
  if (run.pending.next.length === run.weights.length) {
    run.h = run.pending.next;
    run.pending = null;
  }
}

/** The projected circle, rescaled to fit a square canvas, in the canvas's text colour. */
export function drawCurve(canvas: HTMLCanvasElement, xy: Float64Array) {
  const w = canvas.clientWidth;
  const ctx = canvas.getContext("2d");
  if (!w || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const px = Math.round(w * dpr);
  if (canvas.width !== px) {
    canvas.width = px;
    canvas.height = px;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, w);
  let radius = 0;
  for (let k = 0; k < xy.length; k += 2) radius = Math.max(radius, Math.hypot(xy[k], xy[k + 1]));
  const s = (w / 2 - 8) / (radius || 1);
  const ink = getComputedStyle(canvas).color;
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  for (let k = 0; k < xy.length; k += 2) {
    const x = w / 2 + xy[k] * s;
    const y = w / 2 - xy[k + 1] * s;
    if (k) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.globalAlpha = 1;
  for (let k = 0; k < xy.length; k += 2) ctx.fillRect(w / 2 + xy[k] * s - 1, w / 2 - xy[k + 1] * s - 1, 2, 2);
}
