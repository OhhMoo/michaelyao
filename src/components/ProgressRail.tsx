"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Thin fixed reading-progress rail (ai-2027.com-style). Drop it once, near
 * the top of any essay-styled page — it reads page scroll internally via
 * `useScrollProgress`, so it takes no props.
 */
export function ProgressRail() {
  const progress = useScrollProgress();

  return (
    <div className="essay-progress-rail" aria-hidden="true">
      <div className="essay-progress-rail-fill" style={{ height: `${progress}%` }} />
    </div>
  );
}
