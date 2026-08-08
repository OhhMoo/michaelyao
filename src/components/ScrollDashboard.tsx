"use client";

import { useMemo, type ReactNode } from "react";
import { ProjectDataViz, type ProjectChart } from "@/components/ProjectDataViz";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { StatViz } from "@/components/StatViz";
import { clamp01, easeOutCubic } from "@/lib/tween";

export type DashboardStat = { k: string; v: string };

export type DashboardStep = {
  /** DOM id of the section this step tracks (see useSectionProgress). */
  id: string;
  /** Corner tag, e.g. a date range ("May 2026 – Present") or step no. */
  tag?: string;
  /** Small accent label, e.g. "Experience — now viewing". */
  label?: string;
  heading: string;
  meta?: string;
  /** Media tile (image/video/preview) shown for the focused step. */
  tile?: ReactNode;
  chart?: ProjectChart;
  stats?: DashboardStat[];
  href?: string;
  linkLabel?: string;
};

/**
 * Sticky side panel (desktop only — see .live-dashboard's max-width:1280px
 * rule in globals.css) that mirrors ai-2027.com's scroll-driven readouts.
 *
 * Everything on it is a pure function of useSectionProgress's continuous
 * float: the track fills as the reader advances, and each step's charts
 * (StatViz) fill over the half-step before that step takes focus (`arrive`).
 * Scrolling backwards runs every value in reverse. Text blocks
 * (heading/meta/tile) can't interpolate, so they swap with a short
 * fade when the focused step changes (the keyed .live-dashboard-inner
 * remount).
 */
export function ScrollDashboard({
  steps,
  ariaLabel,
  extendEdges = false,
}: {
  steps: DashboardStep[];
  ariaLabel: string;
  extendEdges?: boolean;
}) {
  const ids = useMemo(() => steps.map((step) => step.id), [steps]);
  const progress = useSectionProgress(ids, { extendEdges });
  const n = steps.length;

  const activeIndex = Math.min(n - 1, Math.max(0, Math.round(progress)));
  const active = steps[activeIndex];

  // 0 while the previous step still holds the reading line, 1 once this one
  // is centered — drives every chart below.
  const arrive = easeOutCubic(clamp01((progress - (activeIndex - 0.5)) / 0.5));

  if (!active) return null;

  const fillPct = n > 1 ? clamp01(progress / (n - 1)) * 100 : 100;

  return (
    <aside className="live-dashboard" aria-label={ariaLabel}>
      <div className="live-dashboard-pin">
        {/* Real chronological position: a thin track with one dot per step,
            filling continuously as the reader scrolls. */}
        <div className="live-dashboard-track" aria-hidden="true">
          <div className="live-dashboard-track-fill" style={{ width: `${fillPct}%` }} />
          {steps.map((step, i) => (
            <span
              key={step.id}
              className={`live-dashboard-track-dot${i === activeIndex ? " is-active" : ""}`}
              style={{ left: `${(i / Math.max(n - 1, 1)) * 100}%` }}
            />
          ))}
        </div>

        <div className="live-dashboard-inner" key={active.id}>
          {active.tag && <span className="live-dashboard-tag">{active.tag}</span>}
          {active.label && <span className="live-dashboard-label">{active.label}</span>}
          <h3 className="live-dashboard-heading">{active.heading}</h3>
          {active.meta && <p className="live-dashboard-meta">{active.meta}</p>}

          {active.tile && <div className="live-dashboard-tile">{active.tile}</div>}

          {active.chart && <ProjectDataViz chart={active.chart} progress={arrive} />}

          {active.stats && active.stats.length > 0 && (
            <div className="live-dashboard-stats">
              {active.stats.map((stat) => (
                <StatViz key={stat.k} k={stat.k} v={stat.v} progress={arrive} />
              ))}
            </div>
          )}

          {active.href && (
            <a className="live-dashboard-link" href={active.href}>
              {active.linkLabel ?? "Read more"}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
