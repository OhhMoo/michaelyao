"use client";

import { useMemo } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { CareerTimelineEntry } from "@/components/Timeline";

/**
 * Sticky side panel (desktop only — see .live-dashboard's max-width:1280px
 * rule in globals.css) that mirrors ai-2027.com's scroll-driven readout:
 * as the reader scrolls the CareerSection list, useActiveSection reports
 * whichever entry currently sits at the vertical center of the viewport
 * (IntersectionObserver-driven, not a click handler), and this panel swaps
 * its skills/stat readout to match. On narrow viewports the same data is
 * rendered inline per-entry by Timeline.tsx instead (see .career-mobile-stats),
 * so nothing is lost — only repositioned.
 */
export function LiveDashboard({ entries }: { entries: CareerTimelineEntry[] }) {
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries]);
  const activeId = useActiveSection(ids);
  const active = entries.find((entry) => entry.id === activeId) ?? entries[0];

  if (!active) return null;

  return (
    <aside className="live-dashboard" aria-label="Live career dashboard">
      <div className="live-dashboard-inner" key={active.id}>
        <span className="live-dashboard-label">{active.sectionLabel} — now viewing</span>
        <h3 className="live-dashboard-heading">{active.heading}</h3>
        {active.meta[0] && <p className="live-dashboard-meta">{active.meta[0]}</p>}
        {active.stat && active.stat.length > 0 && (
          <dl className="live-dashboard-stats">
            {active.stat.map((stat) => (
              <div className="live-dashboard-stat" key={stat.k}>
                <dt>{stat.k}</dt>
                <dd>{stat.v}</dd>
              </div>
            ))}
          </dl>
        )}
        {active.skills && active.skills.length > 0 && (
          <div className="career-chip-row">
            {active.skills.map((skill) => (
              <span className="career-chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
