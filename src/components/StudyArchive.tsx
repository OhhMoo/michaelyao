"use client";

import { useEffect, useState } from "react";
import { studyFolders, type StudyEntry } from "@/data/studies";

function formatStudyDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function StudyEntryRow({
  entry,
  index,
  onPreview,
}: {
  entry: StudyEntry;
  index: string;
  onPreview: (entry: StudyEntry) => void;
}) {
  const content = (
    <>
      <span className="study-entry-index">{index}</span>
      <span className="study-entry-copy">
        <strong>{entry.title}</strong>
      </span>
      <span className="study-entry-meta">
        <span>{formatStudyDate(entry.date)}</span>
      </span>
    </>
  );

  if (entry.download) {
    return (
      <a className="study-entry" href={entry.href} download>
        {content}
      </a>
    );
  }

  return (
    <button className="study-entry" type="button" onClick={() => onPreview(entry)}>
      {content}
    </button>
  );
}

export function StudyArchive() {
  const [selectedEntry, setSelectedEntry] = useState<StudyEntry | null>(null);

  useEffect(() => {
    if (!selectedEntry) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEntry(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedEntry]);

  return (
    <section className="study-archive" aria-labelledby="study-title">
      <header className="study-header">
        <div>
          <p className="study-kicker">A working archive</p>
          <h1 id="study-title">Studies.</h1>
        </div>
        <p className="study-intro">
          Notes from the things I am trying to understand. Each folder grows as a set of ideas
          becomes clear enough to keep.
        </p>
      </header>

      <div className="study-grid">
        {studyFolders.map((folder) => (
          <details className="study-folder" key={folder.index} open={folder.defaultOpen}>
            <summary>
              <span className="study-tab">
                <span>{folder.index}</span>
                <span className="study-tab-dot" aria-hidden />
              </span>
              <span className="study-folder-title">{folder.title}</span>
              <span className="study-folder-toggle" aria-hidden />
            </summary>

            <div className="study-folder-body">
              {folder.sources && folder.sources.length > 0 && (
                <div className="study-folder-sources">
                  <span>Learning sources</span>
                  {folder.sources.map((source) => (
                    <span key={source}>{source}</span>
                  ))}
                </div>
              )}
              {folder.entries.length > 0 ? (
                <div className="study-entry-list">
                  {folder.entries.map((entry, entryIndex) => (
                    <StudyEntryRow
                      key={entry.href}
                      entry={entry}
                      index={String(entryIndex + 1).padStart(2, "0")}
                      onPreview={setSelectedEntry}
                    />
                  ))}
                </div>
              ) : (
                <p className="study-empty">No published notes here yet.</p>
              )}
            </div>
          </details>
        ))}
      </div>

      {selectedEntry && (
        <div
          className="study-preview-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedEntry(null);
          }}
        >
          <section
            className="study-preview"
            role="dialog"
            aria-modal="true"
            aria-labelledby="study-preview-title"
          >
            <div className="study-preview-header">
              <div>
                <p className="study-kicker">Reading window</p>
                <h2 id="study-preview-title">{selectedEntry.title}</h2>
              </div>
              <a href={selectedEntry.href} target="_blank" rel="noreferrer">
                Open in new tab ↗
              </a>
              <button type="button" onClick={() => setSelectedEntry(null)}>
                Close <span aria-hidden>×</span>
              </button>
            </div>
            <iframe
              src={`${selectedEntry.href}#view=FitH`}
              title={`${selectedEntry.title} PDF preview`}
              className="study-preview-frame"
            />
          </section>
        </div>
      )}
    </section>
  );
}
