"use client";

import { useRef, useState } from "react";

import { Transport } from "./ExhibitControls";
import { pad } from "./format";
import { Axes, MARGIN, polyline, scale, snap } from "./plot";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "./useExhibit";

const TEMPS = [-30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
/** Paper, SI Table S6: LFTS share of the classified molecules, one classifier fixed at −20 °C. */
const LFTS = [0.413, 0.351, 0.3, 0.255, 0.218, 0.184, 0.158, 0.137, 0.121, 0.105, 0.093, 0.082, 0.072];
/** Same table: share of all molecules set aside to hold the silhouette at 0.281, measured to +30 °C. */
const ASIDE = [0.011, 0.011, 0.088, 0.145, 0.235, 0.294, 0.335];
const STEP_MS = 1200;
const HOLD_MS = 3600;
const LAST = TEMPS.length - 1;

const pct = (share: number) => `${(share * 100).toFixed(1)}%`;
const celsius = (t: number) => `${t < 0 ? "−" : t > 0 ? "+" : ""}${Math.abs(t)} °C`;

export function WarmingExhibit() {
  const figRef = useRef<HTMLElement>(null);
  const clock = useRef(0);
  const reduce = usePrefersReducedMotion();
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [speed, setSpeed] = useState(4);
  const [step, setStep] = useState(0);
  const { width, line } = useBox(figRef);
  const playing = userPlaying ?? !reduce;

  useAnimationLoop(figRef, playing, (dt) => {
    clock.current += dt * speed;
    if (clock.current < (step >= LAST ? HOLD_MS : STEP_MS)) return;
    clock.current = 0;
    setStep(step >= LAST ? 0 : step + 1);
  });

  const jump = (next: number) => {
    clock.current = 0;
    setStep(Math.max(0, Math.min(LAST, next)));
  };

  const ph = snap(Math.min(width * 0.42, 320), line);
  const x = scale([-30, 90], [MARGIN.left, width - MARGIN.right], [-30, 0, 30, 60, 90]);
  const y = scale([0, 0.45], [ph - MARGIN.bottom, MARGIN.top], [0, 0.2, 0.4]);
  const lfts = TEMPS.slice(0, step + 1).map((t, i) => [t, LFTS[i]] as const);
  const aside = TEMPS.slice(0, Math.min(step, ASIDE.length - 1) + 1).map((t, i) => [t, ASIDE[i]] as const);

  return (
    <section className="exhibit" aria-labelledby="warming-title">
      <div className="l c gap">
        <h2 id="warming-title">EXHIBIT B: WARMING UP</h2>
      </div>
      <div className="l">
        <span>TIP4P/2005 WATER, −30 TO +90 °C</span>
        <span>NUMBERS FROM THE PAPER</span>
      </div>
      <div className="l ro">
        <span>TEMPERATURE: {celsius(TEMPS[step])}</span>
        <span>
          STEP {pad(step + 1, 2)} OF {TEMPS.length}
        </span>
      </div>
      <figure
        className="plots"
        ref={figRef}
        aria-label="The share of tetrahedral molecules falling from 41 percent at minus 30 degrees to 7 percent at plus 90, and the share that must be set aside to keep the two groups equally separated rising to a third by plus 30"
      >
        {width > 0 && (
          <svg width={width} height={ph} aria-hidden="true">
            <Axes width={width} height={ph} x={x} y={y} xLabel="°C" yLabel="SHARE" />
            <path className="id" d={polyline([[TEMPS[step], 0], [TEMPS[step], 0.45]], x, y)} />
            <path className="curve" d={polyline(lfts, x, y)} />
            <path className="curve dashed" d={polyline(aside, x, y)} />
            {lfts.map(([t, v]) => (
              <circle key={`l${t}`} className="dot" cx={x(t)} cy={y(v)} r={2.5} />
            ))}
            {aside.map(([t, v]) => (
              <circle key={`a${t}`} className="sim" cx={x(t)} cy={y(v)} r={2.5} />
            ))}
          </svg>
        )}
      </figure>
      <div className="l ro">
        <span>LFTS SHARE {pct(LFTS[step])}</span>
        <span>SET ASIDE AT FIXED QUALITY {step < ASIDE.length ? pct(ASIDE[step]) : "NOT MEASURED"}</span>
      </div>
      <Transport
        label="REPLAY"
        unit="temperature"
        playing={playing}
        speed={speed}
        onPlay={() => setUserPlaying(!playing)}
        onFirst={() => jump(0)}
        onPrev={() => jump(step - 1)}
        onNext={() => jump(step + 1)}
        onSpeed={setSpeed}
      />
      <div className="l">
        <span className="legend">
          SOLID: TETRAHEDRAL (LFTS) SHARE OF THE CLASSIFIED MOLECULES, ONE CLASSIFIER FIXED AT −20 °C. DASHED: SHARE
          SET ASIDE TO KEEP THE TWO GROUPS EQUALLY SEPARATED, MEASURED TO +30 °C.
        </span>
      </div>
    </section>
  );
}
