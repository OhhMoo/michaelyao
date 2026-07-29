"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which of a list of section ids currently sits nearest the
 * vertical center of the viewport. Built on the same IntersectionObserver
 * idiom as FadeIn.tsx, but instead of a one-shot "did it appear" flag,
 * this continuously reports which single section is "active" — the
 * mechanic that drives a scroll-linked side panel (e.g. LiveDashboard)
 * to swap its content as the reader scrolls past each section.
 *
 * Falls back to the first id until something has intersected, and holds
 * the last active id during fast scroll jumps where nothing currently
 * intersects the center band (rather than flickering to null).
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (ids.length === 0) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const id of ids) {
          const r = ratios.current.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      {
        // Narrow band around vertical center — only the section crossing
        // the reader's eye line counts as "active".
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
