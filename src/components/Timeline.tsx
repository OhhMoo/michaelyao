import { FadeIn } from "@/components/FadeIn";
import type { TimelineEntry } from "@/data/resume";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="timeline">
      {entries.map((entry) => (
        <li key={entry.heading}>
          <FadeIn style={{ transitionDelay: "0.1s" }}>
            <div className="timeline-content">
              <h4>{entry.heading}</h4>
              <em>
                {entry.meta.map((m, i) => (
                  <span key={i}>
                    {m}
                    {i < entry.meta.length - 1 ? " | " : ""}
                  </span>
                ))}
              </em>
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
              {entry.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {entry.footnote && (
                <p className="timeline-footnote">
                  {entry.footnote.text}{" "}
                  <a target="_blank" rel="noreferrer" href={entry.footnote.href}>
                    <b>{entry.footnote.label}</b>
                  </a>
                </p>
              )}
            </div>
          </FadeIn>
        </li>
      ))}
    </ul>
  );
}
