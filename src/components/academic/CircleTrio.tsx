"use client";

import { useEffect, useRef, useState } from "react";

import { CIRCLE_DEPTH, advance, depthOf, drawCurve, startRun, type CircleRun } from "@/components/blog/circleSim";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "@/components/blog/useExhibit";
import { THEME_CHANGE_EVENT } from "@/components/ThemeToggle";

const WEIGHTS = [1.2, 2.5, 4.0];
const STEP_MS = 500;
const HOLD_MS = 1800;
/** The layer shown, without animating, to readers who prefer reduced motion. */
const STILL_LAYER = 12;

/** Exhibit A's three panels without their controls: one circle, three weight scales, layer by layer. */
export function CircleTrio() {
  const figRef = useRef<HTMLElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const runRef = useRef<CircleRun | null>(null);
  const clock = useRef(0);
  const reduce = usePrefersReducedMotion();
  const [seed, setSeed] = useState(1);
  const [step, setStep] = useState(0);
  const { width } = useBox(figRef);
  const layer = reduce ? STILL_LAYER : step;

  useEffect(() => {
    runRef.current = startRun(seed, WEIGHTS);
  }, [seed]);

  useEffect(() => {
    const run = runRef.current;
    if (!run || !width) return;
    while (depthOf(run) < layer) advance(run);
    const paint = () =>
      canvases.current.forEach((canvas, i) => {
        if (canvas) drawCurve(canvas, run.frames[i][layer].xy);
      });
    paint();
    window.addEventListener(THEME_CHANGE_EVENT, paint);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, paint);
  }, [seed, layer, width]);

  useAnimationLoop(figRef, !reduce, (dt) => {
    const run = runRef.current;
    if (!run) return;
    advance(run);
    clock.current += dt;
    const atEnd = step >= CIRCLE_DEPTH;
    if (clock.current < (atEnd ? HOLD_MS : STEP_MS)) return;
    clock.current = 0;
    if (atEnd) {
      setSeed((s) => s + 1);
      setStep(0);
    } else if (depthOf(run) > step) {
      setStep(step + 1);
    }
  });

  return (
    <figure
      className="circles"
      ref={figRef}
      aria-label="The same circle of inputs pushed through random tanh networks with weight scales 1.2, 2.5 and 4.0: it stays smooth at 1.2 and crumples as the weights grow"
    >
      {WEIGHTS.map((sw, i) => (
        <canvas
          key={sw}
          ref={(el) => {
            canvases.current[i] = el;
          }}
          aria-hidden="true"
        />
      ))}
    </figure>
  );
}
