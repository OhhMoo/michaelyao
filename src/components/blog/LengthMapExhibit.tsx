"use client";

import { useMemo, useRef, useState } from "react";

import { qMap, qStar } from "@/lib/meanfield";
import { circle, drawLayer, forward, gaussian, meanSquare, mulberry32 } from "@/lib/randomnet";

import { Choice, Transport } from "./ExhibitControls";
import { pad } from "./format";
import { Axes, MARGIN, polyline, scale, snap } from "./plot";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "./useExhibit";

const SB = 0.3;
const DEPTH = 10;
const SIM_WIDTH = 300;
const STEP_MS = 1200;
const HOLD_MS = 3600;
/** Starting variances, as fractions of each weight scale's axis. */
const STARTS = [0.05, 0.45, 0.95];
const SETTINGS = [
  { sw: 1.2, max: 1, ticks: [0, 0.5, 1] },
  { sw: 2.5, max: 7, ticks: [0, 2, 4, 6] },
  { sw: 4.0, max: 20, ticks: [0, 5, 10, 15, 20] },
] as const;

function theory(sw: number, max: number) {
  const curve = Array.from({ length: 81 }, (_, i) => {
    const q = (max * i) / 80;
    return [q, qMap(q, sw, SB)] as const;
  });
  const paths = STARTS.map((f) => {
    const path = [f * max];
    for (let l = 0; l < DEPTH; l++) path.push(qMap(path[l], sw, SB));
    return path;
  });
  return { curve, paths, fixed: qStar(sw, SB) };
}

/** The same three starting variances through one finite network: its empirical q per layer. */
function simulate(sw: number, max: number, seed: number): number[][] {
  const gauss = gaussian(mulberry32(seed));
  const unit = circle(SIM_WIDTH, STARTS.length, 1, gauss);
  let h: Float64Array = unit.map((v, i) => v * Math.sqrt(STARTS[Math.floor(i / SIM_WIDTH)] * max));
  const rowQ = (k: number) => meanSquare(h.subarray(k * SIM_WIDTH, (k + 1) * SIM_WIDTH), 1, SIM_WIDTH);
  const out = STARTS.map((_, k) => [rowQ(k)]);
  for (let l = 0; l < DEPTH; l++) {
    h = forward(h, STARTS.length, drawLayer(SIM_WIDTH, gauss), sw, SB);
    out.forEach((series, k) => series.push(rowQ(k)));
  }
  return out;
}

const qText = (q: number) => (q < 10 ? q.toFixed(2) : q.toFixed(1));

export function LengthMapExhibit() {
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

  const setting = SETTINGS.find((s) => s.sw === sw) ?? SETTINGS[1];
  const model = useMemo(() => theory(setting.sw, setting.max), [setting]);
  const sim = useMemo(() => simulate(setting.sw, setting.max, seed), [setting, seed]);

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
  const qx = scale([0, setting.max], [MARGIN.left, pw - MARGIN.right], setting.ticks);
  const qy = scale([0, setting.max], [ph - MARGIN.bottom, MARGIN.top], setting.ticks);
  const lx = scale([0, DEPTH], [MARGIN.left, pw - MARGIN.right], [0, 5, 10]);

  return (
    <section className="exhibit" aria-labelledby="length-title">
      <div className="l c gap">
        <h2 id="length-title">EXHIBIT B: THE LENGTH MAP</h2>
      </div>
      <div className="l">
        <span>
          q OUT VS. q IN, σ<sub>b</sub> {SB}
        </span>
        <span>LINES: THEORY. RINGS: ONE NETWORK, WIDTH {SIM_WIDTH}</span>
      </div>
      <Choice
        label={
          <>
            σ<sub>w</sub>
          </>
        }
        options={SETTINGS.map((s) => s.sw)}
        value={setting.sw}
        onChange={(next) => {
          setSw(next);
          jump(0);
        }}
      >
        FIXED POINT q* {qText(model.fixed)}
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
        aria-label="Left: the length map with the identity line and a staircase for each starting variance. Right: the variance against depth, theory and simulation."
      >
        {width > 0 && (
          <>
            <svg width={pw} height={ph} aria-hidden="true">
              <Axes width={pw} height={ph} x={qx} y={qy} xLabel="q IN" yLabel="q OUT" />
              <path className="id" d={polyline([[0, 0], [setting.max, setting.max]], qx, qy)} />
              <path className="curve" d={polyline(model.curve, qx, qy)} />
              {model.paths.map((path, k) => {
                const steps: [number, number][] = [[path[0], path[0]]];
                for (let l = 0; l < layer; l++) steps.push([path[l], path[l + 1]], [path[l + 1], path[l + 1]]);
                return (
                  <g key={k}>
                    <path className="web" d={polyline(steps, qx, qy)} />
                    <circle className="dot" cx={qx(path[layer])} cy={qy(path[layer])} r={2.5} />
                  </g>
                );
              })}
              <circle className="fix" cx={qx(model.fixed)} cy={qy(model.fixed)} r={4} />
            </svg>
            <svg width={pw} height={ph} aria-hidden="true">
              <Axes width={pw} height={ph} x={lx} y={qy} xLabel="LAYER" yLabel="q" />
              <path className="id" d={polyline([[0, model.fixed], [DEPTH, model.fixed]], lx, qy)} />
              {model.paths.map((path, k) => (
                <g key={k}>
                  <path className="curve" d={polyline(path.slice(0, layer + 1).map((q, l) => [l, q] as const), lx, qy)} />
                  {sim[k].slice(0, layer + 1).map((q, l) => (
                    <circle key={l} className="sim" cx={lx(l)} cy={qy(Math.min(q, setting.max))} r={2.5} />
                  ))}
                  <circle className="dot" cx={lx(layer)} cy={qy(path[layer])} r={2.5} />
                </g>
              ))}
            </svg>
          </>
        )}
      </figure>
      <div className="l ro">
        <span>THEORY: {model.paths.map((p) => qText(p[layer])).join(" · ")}</span>
        <span>SIMULATED: {sim.map((s) => qText(s[layer])).join(" · ")}</span>
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
          DASHED: q OUT = q IN, AND q* ON THE RIGHT. EACH STAIR IS ONE LAYER, FROM THREE STARTING VARIANCES.
          OPEN CIRCLE: THE FIXED POINT.
        </span>
      </div>
    </section>
  );
}
