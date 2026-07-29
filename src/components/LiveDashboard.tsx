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
  const activeIndex = entries.findIndex((entry) => entry.id === activeId);
  const active = activeIndex >= 0 ? entries[activeIndex] : entries[0];

  if (!active) return null;

  // The date range is always the last meta field for both experience and
  // education entries (see resume.ts) — used as the top date tag, echoing
  // ai-2027's "May 2025" corner label.
  const dateTag = active.meta[active.meta.length - 1];
  const roleOrDegree = active.meta[0];

  return (
    <aside className="live-dashboard" aria-label="Live career dashboard">
      <div className="live-dashboard-pin">
        <div className="live-dashboard-inner" key={active.id}>
          {dateTag && <span className="live-dashboard-tag">{dateTag}</span>}

          {/* Real chronological position — not a fabricated metric, just
              where this entry sits among all of them. */}
          <div className="live-dashboard-track" aria-hidden="true">
            {entries.map((entry, i) => (
              <span
                key={entry.id}
                className={`live-dashboard-track-dot${i === activeIndex ? " is-active" : ""}`}
                style={{ left: `${(i / Math.max(entries.length - 1, 1)) * 100}%` }}
              />
            ))}
          </div>

          <span className="live-dashboard-label">{active.sectionLabel} — now viewing</span>
          <h3 className="live-dashboard-heading">{active.heading}</h3>
          {roleOrDegree && <p className="live-dashboard-meta">{roleOrDegree}</p>}

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
            <div className="live-dashboard-capgrid">
              {active.skills.map((skill) => (
                <span className="live-dashboard-capcell" key={skill}>
                  <span className="live-dashboard-capcell-dot" aria-hidden="true" />
                  {skill}
                </span>
              ))}
            </div>
          )}

          {(active.bullets || active.subEntries || active.paragraphs) && (
            <div className="live-dashboard-detail">
              {active.bullets && (
                <ul>
                  {active.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {active.subEntries?.map((sub) => (
                <div className="live-dashboard-detail-sub" key={sub.subtitle}>
                  <h5>
                    {sub.subtitle}
                    {sub.dates ? ` — ${sub.dates}` : ""}
                  </h5>
                  <ul>
                    {sub.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {active.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
