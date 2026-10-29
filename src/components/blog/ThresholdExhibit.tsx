"use client";

import { useMemo, useRef, useState } from "react";

import { fitMixture, logDensity, sampleMixture, silhouette, type Gaussian2 } from "@/lib/mixture";
import { mulberry32 } from "@/lib/randomnet";

import { Choice } from "./ExhibitControls";
import { pad } from "./format";
import { Axes, MARGIN, scale, snap } from "./plot";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "./useExhibit";

const N = 800;
const TAUS = [0, 1, 2, 3];
const CYCLE_MS = 2400;
/** Two overlapping states in a q–ζ-like plane: a smaller, more ordered one up and to the right. */
const TRUTH: Gaussian2[] = [
  { weight: 0.35, mean: [0.7, 0.68], cov: [0.008, 0.002, 0.008] },
  { weight: 0.65, mean: [0.43, 0.38], cov: [0.015, 0.004, 0.012] },
];

const pct = (share: number) => `${Math.round(share * 100)}%`;
const circle = (x: number, y: number, r: number) =>
  `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** 1 for the high-ζ group, 0 for low-ζ, −1 for set aside; at τ = 0 every point joins a group. */
function classify(lambda: Float64Array, tau: number): Int8Array {
  return Int8Array.from(lambda, (v) => (v >= tau ? 1 : v <= -tau ? 0 : -1));
}

export function ThresholdExhibit() {
  const figRef = useRef<HTMLElement>(null);
  const clock = useRef(0);
  const reduce = usePrefersReducedMotion();
  const [picked, setPicked] = useState(false);
  const [tau, setTau] = useState(2);
  const [seed, setSeed] = useState(1);
  const { width, line } = useBox(figRef);

  const data = useMemo(() => {
    const { xs, ys } = sampleMixture(TRUTH, N, mulberry32(seed));
    const [a, b] = fitMixture(xs, ys);
    const [low, high] = a.mean[1] < b.mean[1] ? [a, b] : [b, a];
    const lambda = Float64Array.from(xs, (x, i) => logDensity(high, x, ys[i]) - logDensity(low, x, ys[i]));
    return { xs, ys, lambda };
  }, [seed]);
  const labels = useMemo(() => classify(data.lambda, tau), [data, tau]);
  const score = useMemo(() => silhouette(data.xs, data.ys, labels), [data, labels]);
  const share = (k: number) => labels.filter((l) => l === k).length / N;

  useAnimationLoop(figRef, !picked && !reduce, (dt) => {
    clock.current += dt;
    if (clock.current < CYCLE_MS) return;
    clock.current = 0;
    setTau((t) => TAUS[(TAUS.indexOf(t) + 1) % TAUS.length]);
  });

  const ph = snap(Math.min(width * 0.5, 380), line);
  const x = scale([0, 1], [MARGIN.left, width - MARGIN.right], [0, 0.5, 1]);
  const y = scale([0, 1], [ph - MARGIN.bottom, MARGIN.top], [0, 0.5, 1]);
  let high = "";
  let low = "";
  let aside = "";
  data.xs.forEach((vx, i) => {
    const vy = data.ys[i];
    if (vx < 0 || vx > 1 || vy < 0 || vy > 1) return;
    if (labels[i] === 1) high += circle(x(vx), y(vy), 2.2);
    else if (labels[i] === 0) low += circle(x(vx), y(vy), 2.2);
    else aside += circle(x(vx), y(vy), 1.8);
  });

  return (
    <section className="exhibit" aria-labelledby="threshold-title">
      <div className="l c gap">
        <h2 id="threshold-title">EXHIBIT A: LEAVING ROOM FOR DOUBT</h2>
      </div>
      <div className="l">
        <span>TOY DATA: TWO OVERLAPPING STATES, {N} POINTS</span>
        <span>FITTED IN YOUR BROWSER</span>
      </div>
      <Choice
        label="τ"
        options={TAUS}
        value={tau}
        format={String}
        onChange={(next) => {
          setPicked(true);
          setTau(next);
        }}
      >
        <button
          className="t"
          type="button"
          onClick={() => {
            setPicked(true);
            setSeed((s) => s + 1);
          }}
        >
          [NEW DRAW]
        </button>{" "}
        #{pad(seed, 4)}
      </Choice>
      <figure
        className="plots"
        ref={figRef}
        aria-label="Toy data in two overlapping clouds, sorted by the likelihood ratio into a high group, a low group and points set aside"
      >
        {width > 0 && (
          <svg width={width} height={ph} aria-hidden="true">
            <Axes width={width} height={ph} x={x} y={y} xLabel="q" yLabel="ζ" />
            <path className="aside" d={aside} />
            <path className="sim" d={low} />
            <path className="dot" d={high} />
          </svg>
        )}
      </figure>
      <div className="l ro">
        <span>
          HIGH-ζ {pct(share(1))} · LOW-ζ {pct(share(0))} · SET ASIDE {pct(share(-1))}
        </span>
        <span>SILHOUETTE {score.toFixed(3)}</span>
      </div>
      <div className="l keyline">
        <span>
          <span className="key-cha">●</span> HIGH-ζ GROUP
        </span>
        <span>○ LOW-ζ GROUP</span>
        <span>
          <span className="key-ord">●</span> SET ASIDE, |Λ| &lt; τ
        </span>
      </div>
      <div className="l">
        <span className="legend">
          THE SIGN OF Λ PICKS THE GROUP; τ ONLY DECIDES HOW MANY BORDERLINE POINTS TO HOLD BACK. τ CYCLES UNTIL
          YOU PICK ONE.
        </span>
      </div>
    </section>
  );
}
