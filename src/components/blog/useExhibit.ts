"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
}

/**
 * Calls `frame(dtMs)` on every animation frame while `running`, the element is on screen and
 * the tab is visible.
 */
export function useAnimationLoop(
  target: RefObject<Element | null>,
  running: boolean,
  frame: (dtMs: number) => void,
) {
  const frameRef = useRef(frame);
  useEffect(() => {
    frameRef.current = frame;
  });

  useEffect(() => {
    const node = target.current;
    if (!node || !running) return;
    let inView = false;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) : 0;
      last = now;
      frameRef.current(dt);
      raf = requestAnimationFrame(tick);
    };
    const sync = () => {
      const run = inView && !document.hidden;
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const observer = new IntersectionObserver((entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(raf);
    };
  }, [target, running]);
}

/** The element's content width and line height in CSS pixels; width is 0 until measured. */
export function useBox(target: RefObject<Element | null>) {
  const [box, setBox] = useState({ width: 0, line: 27 });
  useEffect(() => {
    const node = target.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const line = parseFloat(getComputedStyle(node).lineHeight) || 27;
      setBox((prev) => (prev.width === width && prev.line === line ? prev : { width, line }));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);
  return box;
}
