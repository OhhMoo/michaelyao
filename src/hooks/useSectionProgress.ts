"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Continuous, position-driven scroll progress across a list of section ids —
 * the engine behind ai-2027.com's "values change as you scroll" readouts.
 *
 * Unlike useScrollProgress (whole-page 0–100 percentage), this reports a
 * float in `[0, ids.length - 1]`: integer `i` means section `i`'s center
 * sits exactly on the reading line (45% of viewport height), and fractional
 * values interpolate between neighbours. Consumers can therefore tween
 * numbers and bars smoothly — and the tween reverses when the reader
 * scrolls back up, because the value derives from scroll position alone,
 * never from accumulated state.
 *
 * With `prefers-reduced-motion`, progress snaps to whole integers so
 * consumers render settled, fully-arrived values.
 */
export function useSectionProgress(
  ids: string[],
  { extendEdges = false }: { extendEdges?: boolean } = {},
): number {
  const [progress, setProgress] = useState(0);
  const anchors = useRef<number[]>([]);

  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Document-space center of each tracked element. Re-measured on any
    // body resize (fonts, images, viewport) since layout shifts move them.
    const measure = () => {
      anchors.current = elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const pts = anchors.current;
      if (pts.length === 0) return;
      const readLine = window.scrollY + window.innerHeight * 0.45;
      let p: number;
      if (readLine <= pts[0]) {
        const span = pts.length > 1 ? pts[1] - pts[0] : window.innerHeight * 0.6;
        p = extendEdges ? (readLine - pts[0]) / span : 0;
      } else if (readLine >= pts[pts.length - 1]) {
        const last = pts.length - 1;
        const span = pts.length > 1 ? pts[last] - pts[last - 1] : window.innerHeight * 0.6;
        p = extendEdges ? last + (readLine - pts[last]) / span : last;
      } else {
        let i = 0;
        while (i < pts.length - 1 && readLine > pts[i + 1]) i++;
        p = i + (readLine - pts[i]) / (pts[i + 1] - pts[i]);
      }
      if (reduced.matches) p = Math.round(p);
      // Quantize to avoid re-rendering on sub-pixel jitter.
      const q = Math.round(p * 1000) / 1000;
      setProgress((prev) => (prev === q ? prev : q));
    };

    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Catch late layout shifts (webfonts, images without dimensions).
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [extendEdges, ids]);

  return progress;
}
