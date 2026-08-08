"use client";

import { useMemo } from "react";
import type { CareerTimelineEntry } from "@/components/Timeline";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * Desktop-only sticky summary for the active career entry. The complete
 * experience and education copy stays in the timeline at every breakpoint;
 * this panel is deliberately compact so its final visual treatment can evolve
 * independently without hiding any resume content.
 */
export function LiveDashboard({ entries }: { entries: CareerTimelineEntry[] }) {
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const activeId = useActiveSection(ids);
  const activeIndex = Math.max(
    0,
    entries.findIndex((entry) => entry.id === activeId),
  );
  const active = entries[activeIndex] ?? entries[0];

  if (!active) return null;

  const dateTag = active.meta.at(-1);
  const roleOrDegree = active.meta[0];

  return (
    <aside className="live-dashboard" aria-label="Current experience or education entry">
      <div className="live-dashboard-pin">
        <div className="live-dashboard-inner" key={active.id}>
          {dateTag && <span className="live-dashboard-tag">{dateTag}</span>}

          <div className="live-dashboard-track" aria-hidden="true">
            {entries.map((entry, index) => (
              <span
                key={entry.id}
                className={`live-dashboard-track-dot${index === activeIndex ? " is-active" : ""}`}
                style={{ left: `${(index / Math.max(entries.length - 1, 1)) * 100}%` }}
              />
            ))}
          </div>

          <h3 className="live-dashboard-heading">{active.heading}</h3>
          {roleOrDegree && <p className="live-dashboard-meta">{roleOrDegree}</p>}

          {active.stat && active.stat.length > 0 && (
            <dl className="live-dashboard-stats">
              {active.stat.map((stat) => (
                <div className="live-dashboard-stat" key={stat.k}>
                  <dt className="live-dashboard-stat-k">{stat.k}</dt>
                  <dd className="live-dashboard-stat-v">{stat.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </aside>
  );
}
