import { FadeIn } from "@/components/FadeIn";
import type { TimelineEntry } from "@/data/resume";

export type CareerTimelineEntry = TimelineEntry & {
  id: string;
};

export function Timeline({ entries }: { entries: CareerTimelineEntry[] }) {
  return (
    <ul className="timeline">
      {entries.map((entry) => {
        const hasDetail =
          Boolean(entry.stat?.length) ||
          Boolean(entry.bullets?.length) ||
          Boolean(entry.subEntries?.length) ||
          Boolean(entry.paragraphs?.length);

        return (
          <li key={entry.heading} id={entry.id}>
            <FadeIn style={{ transitionDelay: "0.1s" }}>
              <div className="timeline-content">
                <h4>{entry.heading}</h4>
                <em>
                  {entry.meta.map((meta, index) => (
                    <span key={meta}>
                      {meta}
                      {index < entry.meta.length - 1 ? " | " : ""}
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

                {hasDetail && (
                  <div className="career-detail">
                    {entry.bullets && (
                      <ul>
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {entry.subEntries?.map((subEntry) => (
                      <div className="timeline-sub" key={subEntry.subtitle}>
                        <h5 className="timeline-subtitle">
                          <span>{subEntry.subtitle}</span>
                          {subEntry.dates && (
                            <span className="timeline-sub-dates">{subEntry.dates}</span>
                          )}
                        </h5>
                        <ul>
                          {subEntry.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {entry.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {entry.stat && entry.stat.length > 0 && (
                      <dl className="career-stat-row">
                        {entry.stat.map((stat) => (
                          <div className="career-stat" key={stat.k}>
                            <dt className="career-stat-k">{stat.k}</dt>
                            <dd className="career-stat-v">{stat.v}</dd>
                          </div>
                        ))}
                      </dl>
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
