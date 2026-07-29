import { FadeIn } from "@/components/FadeIn";
import type { TimelineEntry } from "@/data/resume";

/**
 * A TimelineEntry plus the bits CareerSection computes once and threads
 * through to both this list renderer and LiveDashboard: a stable DOM id
 * (for useActiveSection to track) and a human label distinguishing the
 * Experience vs. Education group it came from.
 */
export type CareerTimelineEntry = TimelineEntry & {
  id: string;
  sectionLabel: string;
};

export function Timeline({ entries }: { entries: CareerTimelineEntry[] }) {
  return (
    <ul className="timeline">
      {entries.map((entry) => {
        const hasMobileDetail =
          Boolean(entry.stat?.length) ||
          Boolean(entry.skills?.length) ||
          Boolean(entry.bullets?.length) ||
          Boolean(entry.subEntries?.length) ||
          Boolean(entry.paragraphs?.length);
        return (
          <li key={entry.heading} id={entry.id}>
            <FadeIn style={{ transitionDelay: "0.1s" }}>
              <div className="timeline-content">
                <span className="career-group-label">{entry.sectionLabel}</span>
                <h4>{entry.heading}</h4>
                <em>
                  {entry.meta.map((m, i) => (
                    <span key={i}>
                      {m}
                      {i < entry.meta.length - 1 ? " | " : ""}
                    </span>
                  ))}
                </em>
                {entry.footnote && (
                  <p className="timeline-footnote">
                    {entry.footnote.text}{" "}
                    <a target="_blank" rel="noreferrer" href={entry.footnote.href}>
                      <b>{entry.footnote.label}</b>
                    </a>
                  </p>
                )}
                {/* Full detail (bullets/sub-entries/paragraphs/stat/skills) is
                    inline here only below 1280px — on desktop the same content
                    lives in LiveDashboard's sticky panel instead. */}
                {hasMobileDetail && (
                  <div className="career-mobile-stats">
                    {entry.bullets && (
                      <ul>
                        {entry.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {entry.subEntries?.map((sub) => (
                      <div className="timeline-sub" key={sub.subtitle}>
                        <h5 className="timeline-subtitle">
                          <span>{sub.subtitle}</span>
                          {sub.dates && <span className="timeline-sub-dates">{sub.dates}</span>}
                        </h5>
                        <ul>
                          {sub.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {entry.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                    {entry.stat && entry.stat.length > 0 && (
                      <dl className="career-stat-row">
                        {entry.stat.map((stat) => (
                          <div className="career-stat" key={stat.k}>
                            <dt>{stat.k}</dt>
                            <dd>{stat.v}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {entry.skills && entry.skills.length > 0 && (
                      <div className="career-chip-row">
                        {entry.skills.map((skill) => (
                          <span className="career-chip" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          </li>
        );
      })}
    </ul>
  );
}
