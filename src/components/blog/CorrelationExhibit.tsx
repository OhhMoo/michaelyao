"use client";

import { useMemo, useRef, useState } from "react";

import { chi1, cMap, qStar } from "@/lib/meanfield";
import { correlation, drawLayer, forward, gaussian, mulberry32, pair } from "@/lib/randomnet";

import { Choice, Transport } from "./ExhibitControls";
import { pad, regime } from "./format";
import { Axes, MARGIN, polyline, scale, snap } from "./plot";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "./useExhibit";

const SB = 0.3;
const WEIGHTS = [1.2, 2.5, 4.0];
const DEPTH = 25;
const SIM_WIDTH = 400;
const STEP_MS = 800;
const HOLD_MS = 3600;
const STARTS = [0.1, 0.5, 0.9];
const SAMPLES = 40;

/**
 * The correlation map sampled at 41 points; trajectories step along its linear interpolation,
 * and c* is where it crosses the identity below 1 (c* = 1 when ordered).
 */
function theory(sw: number) {
  const q = qStar(sw, SB);
  const curve = Array.from({ length: SAMPLES + 1 }, (_, i) => [i / SAMPLES, cMap(i / SAMPLES, sw, SB, q)] as const);
  const at = (c: number) => {
    const t = Math.max(0, Math.min(1, c)) * SAMPLES;
    const i = Math.min(SAMPLES - 1, Math.floor(t));
    return curve[i][1] + (t - i) * (curve[i + 1][1] - curve[i][1]);
  };
  const paths = STARTS.map((c0) => {
    const path = [c0];
    for (let l = 0; l < DEPTH; l++) path.push(at(path[l]));
    return path;
  });
  const chi = chi1(sw, SB, q);
  let fixed = 1;
  if (chi > 1) {
    for (let i = 0; i < SAMPLES; i++) {
      const a = curve[i][1] - curve[i][0];
      const b = curve[i + 1][1] - curve[i + 1][0];
      if (a > 0 && b <= 0) {
        fixed = curve[i][0] + (a / (a - b)) / SAMPLES;
        break;
      }
    }
  }
  return { q, chi, curve, paths, fixed };
}

/** Three pairs of inputs at the starting correlations, through one finite network. */
function simulate(sw: number, q: number, seed: number): number[][] {
  const gauss = gaussian(mulberry32(seed));
  const rows = STARTS.length * 2;
  let h: Float64Array = new Float64Array(rows * SIM_WIDTH);
  STARTS.forEach((c, k) => h.set(pair(SIM_WIDTH, q, c, gauss), 2 * k * SIM_WIDTH));
  const out = STARTS.map((_, k) => [correlation(h, SIM_WIDTH, 2 * k, 2 * k + 1)]);
  for (let l = 0; l < DEPTH; l++) {
    h = forward(h, rows, drawLayer(SIM_WIDTH, gauss), sw, SB);
    out.forEach((series, k) => series.push(correlation(h, SIM_WIDTH, 2 * k, 2 * k + 1)));
  }
  return out;
}

export function CorrelationExhibit() {
  const figRef = useRef<HTMLElement>(null);
  const clock = useRef(0);
  const reduce = usePrefersReducedMotion();
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState(8);
  const [sw, setSw] = useState(2.5);
  const [seed, setSeed] = useState(1);
  const [layer, setLayer] = useState(0);
  const { width, line } = useBox(figRef);
  const playing = userPlaying ?? !reduce;

  const model = useMemo(() => theory(sw), [sw]);
  const sim = useMemo(() => simulate(sw, model.q, seed), [sw, model.q, seed]);

  useAnimationLoop(figRef, playing, (dt) => {
    clock.current += dt * speed;
    const atEnd = layer >= DEPTH;
    if (clock.current < (atEnd ? HOLD_MS : STEP_MS)) return;
    clock.current = 0;
    if (atEnd) {
      setSeed((s) => s + 1);
      setLayer(0);
    } else {
      setLayer(layer + 1);
    }
  });

  const jump = (next: number) => {
    clock.current = 0;
    setLayer(Math.max(0, Math.min(DEPTH, next)));
  };

  const stacked = width < 600;
  const pw = stacked ? width : Math.floor((width - 24) / 2);
  const ph = snap(pw * 0.62, line);
  const cx = scale([0, 1], [MARGIN.left, pw - MARGIN.right], [0, 0.5, 1]);
  const cy = scale([0, 1], [ph - MARGIN.bottom, MARGIN.top], [0, 0.5, 1]);
  const lx = scale([0, DEPTH], [MARGIN.left, pw - MARGIN.right], [0, 5, 10, 15, 20, 25]);
  const ly = scale([-0.1, 1], [ph - MARGIN.bottom, MARGIN.top], [0, 0.5, 1]);

  return (
    <section className="exhibit" aria-labelledby="corr-title">
      <div className="l c gap">
        <h2 id="corr-title">EXHIBIT C: THE CORRELATION MAP</h2>
      </div>
      <div className="l">
        <span>
          TWO INPUTS AT A TIME, σ<sub>b</sub> {SB}
        </span>
        <span>LINES: THEORY. RINGS: ONE NETWORK, WIDTH {SIM_WIDTH}</span>
      </div>
      <Choice
        label={
          <>
            σ<sub>w</sub>
          </>
        }
        options={WEIGHTS}
        value={sw}
        onChange={(next) => {
          setSw(next);
          jump(0);
        }}
      >
        χ<sub>1</sub> {model.chi.toFixed(2)} {regime(model.chi)}, c* {model.fixed.toFixed(2)}
      </Choice>
      <div className="l ro">
        <span>
          LAYER: {pad(layer, 2)} OF {DEPTH}
        </span>
        <span>RUN: #{pad(seed, 4)}</span>
      </div>
      <figure
        className="plots"
        ref={figRef}
        aria-label="Left: the correlation map with the identity line and a staircase for each starting correlation. Right: the correlation against depth, theory and simulation."
      >
        {width > 0 && (
          <>
            <svg width={pw} height={ph} aria-hidden="true">
              <Axes width={pw} height={ph} x={cx} y={cy} xLabel="c IN" yLabel="c OUT" />
              <path className="id" d={polyline([[0, 0], [1, 1]], cx, cy)} />
              <path className="curve" d={polyline(model.curve, cx, cy)} />
              {model.paths.map((path, k) => {
                const steps: [number, number][] = [[path[0], path[0]]];
                for (let l = 0; l < layer; l++) steps.push([path[l], path[l + 1]], [path[l + 1], path[l + 1]]);
                return (
                  <g key={k}>
                    <path className="web" d={polyline(steps, cx, cy)} />
                    <circle className="dot" cx={cx(path[layer])} cy={cy(path[layer])} r={2.5} />
                  </g>
                );
              })}
              <circle className="fix" cx={cx(model.fixed)} cy={cy(model.fixed)} r={4} />
            </svg>
            <svg width={pw} height={ph} aria-hidden="true">
              <Axes width={pw} height={ph} x={lx} y={ly} xLabel="LAYER" yLabel="c" />
              <path className="id" d={polyline([[0, model.fixed], [DEPTH, model.fixed]], lx, ly)} />
              {model.paths.map((path, k) => (
                <g key={k}>
                  <path className="curve" d={polyline(path.slice(0, layer + 1).map((c, l) => [l, c] as const), lx, ly)} />
                  {sim[k].slice(0, layer + 1).map((c, l) => (
                    <circle key={l} className="sim" cx={lx(l)} cy={ly(Math.max(-0.1, c))} r={2.5} />
                  ))}
                  <circle className="dot" cx={lx(layer)} cy={ly(path[layer])} r={2.5} />
                </g>
              ))}
            </svg>
          </>
        )}
      </figure>
      <div className="l ro">
        <span>THEORY: {model.paths.map((p) => p[layer].toFixed(2)).join(" · ")}</span>
        <span>SIMULATED: {sim.map((s) => s[layer].toFixed(2)).join(" · ")}</span>
      </div>
      <Transport
        label="REPLAY"
        unit="layer"
        playing={playing}
        speed={speed}
        onPlay={() => setUserPlaying(!playing)}
        onFirst={() => jump(0)}
        onPrev={() => jump(layer - 1)}
        onNext={() => jump(layer + 1)}
        onSpeed={setSpeed}
      />
      <div className="l">
        <span className="legend">
          DASHED: c OUT = c IN, AND c* ON THE RIGHT. ORDERED NETWORKS PULL EVERY PAIR TO c = 1; CHAOTIC ONES
          SETTLE BELOW IT.
        </span>
      </div>
    </section>
  );
}
