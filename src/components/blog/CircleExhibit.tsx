"use client";

import { useEffect, useRef, useState } from "react";

import { THEME_CHANGE_EVENT } from "@/components/ThemeToggle";
import { chi1 } from "@/lib/meanfield";

import {
  CIRCLE_DEPTH as DEPTH,
  CIRCLE_SB as SB,
  CIRCLE_WIDTH as WIDTH,
  advance,
  depthOf,
  drawCurve,
  startRun,
  type CircleRun as Run,
} from "./circleSim";
import { Transport } from "./ExhibitControls";
import { pad, regime } from "./format";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "./useExhibit";

const STEP_MS = 1200;
const HOLD_MS = 3000;
const PANELS = [1.2, 2.5, 4.0].map((sw) => ({ sw, chi: chi1(sw, SB) }));
const WEIGHTS = PANELS.map((p) => p.sw);

const stretchText = (s: number) =>
  s < 10 ? s.toFixed(2) : s < 100 ? s.toFixed(1) : Math.round(s).toLocaleString("en-US");

export function CircleExhibit() {
  const figRef = useRef<HTMLElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const runRef = useRef<Run | null>(null);
  const clock = useRef(0);
  const reduce = usePrefersReducedMotion();
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState(8);
  const [seed, setSeed] = useState(1);
  const [view, setView] = useState({ layer: 0, stretch: PANELS.map(() => 1) });
  const { width } = useBox(figRef);
  const playing = userPlaying ?? !reduce;

  useEffect(() => {
    runRef.current = startRun(seed, WEIGHTS);
  }, [seed]);

  useEffect(() => {
    const run = runRef.current;
    if (!run || !width) return;
    while (depthOf(run) < view.layer) advance(run);
    const paint = () =>
      canvases.current.forEach((canvas, i) => {
        if (canvas) drawCurve(canvas, run.frames[i][view.layer].xy);
      });
    paint();
    window.addEventListener(THEME_CHANGE_EVENT, paint);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, paint);
  }, [seed, view.layer, width]);

  const show = (layer: number) => {
    const run = runRef.current;
    if (!run) return;
    while (depthOf(run) < layer) advance(run);
    setView({ layer, stretch: run.frames.map((f) => f[layer].stretch) });
  };

  useAnimationLoop(figRef, playing, (dt) => {
    const run = runRef.current;
    if (!run) return;
    advance(run);
    clock.current += dt * speed;
    const atEnd = view.layer >= DEPTH;
    if (clock.current < (atEnd ? HOLD_MS : STEP_MS)) return;
    if (atEnd) {
      clock.current = 0;
      setSeed((s) => s + 1);
      setView({ layer: 0, stretch: PANELS.map(() => 1) });
    } else if (depthOf(run) > view.layer) {
      clock.current = 0;
      show(view.layer + 1);
    }
  });

  const jump = (layer: number) => {
    clock.current = 0;
    show(Math.max(0, Math.min(DEPTH, layer)));
  };

  return (
    <section className="exhibit" aria-labelledby="circle-title">
      <div className="l c gap">
        <h2 id="circle-title">EXHIBIT A: A CIRCLE THROUGH DEPTH</h2>
      </div>
      <div className="l">
        <span>
          3 TANH NETWORKS, WIDTH {WIDTH}, σ<sub>b</sub> {SB}
        </span>
        <span>SIMULATED IN YOUR BROWSER</span>
      </div>
      <div className="l ro">
        <span>
          LAYER: {pad(view.layer, 2)} OF {DEPTH}
        </span>
        <span>NETWORK: #{pad(seed, 4)}</span>
      </div>
      <div className="l trio">
        {PANELS.map((p) => (
          <span key={p.sw}>
            σ<sub>w</sub> {p.sw.toFixed(1)}
          </span>
        ))}
      </div>
      <figure
        className="circle-fig"
        ref={figRef}
        aria-label="The same circle of inputs pushed through three random tanh networks with weight scales 1.2, 2.5 and 4.0, one layer at a time"
      >
        {PANELS.map((p, i) => (
          <canvas
            key={p.sw}
            ref={(el) => {
              canvases.current[i] = el;
            }}
            aria-hidden="true"
          />
        ))}
      </figure>
      <div className="l trio">
        {PANELS.map((p) => (
          <span key={p.sw}>
            χ<sub>1</sub> {p.chi.toFixed(2)} {regime(p.chi)}
          </span>
        ))}
      </div>
      <div className="l trio">
        {view.stretch.map((s, i) => (
          <span key={PANELS[i].sw}>LENGTH ×{stretchText(s)}</span>
        ))}
      </div>
      <Transport
        label="REPLAY"
        unit="layer"
        playing={playing}
        speed={speed}
        onPlay={() => setUserPlaying(!playing)}
        onFirst={() => jump(0)}
        onPrev={() => jump(view.layer - 1)}
        onNext={() => jump(view.layer + 1)}
        onSpeed={setSpeed}
      />
      <div className="l">
        <span className="legend">
          EACH PANEL: THE CIRCLE ON ITS TWO WIDEST DIRECTIONS (PCA), RESCALED TO FIT. LENGTH: CURVE LENGTH
          OVER LAYER 0. A NEW NETWORK IS DRAWN AFTER LAYER {DEPTH}.
        </span>
      </div>
    </section>
  );
}
