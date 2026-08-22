"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

import {
  learningFolders,
  type LearningFolderId,
} from "@/data/learning-notes";

import { FadeIn } from "../FadeIn";
import styles from "./AboutLearningFolders.module.css";

type NoteStatus = "idle" | "loading" | "ready" | "error";

export function AboutLearningFolders() {
  const [openFolderId, setOpenFolderId] = useState<LearningFolderId | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteStatus, setNoteStatus] = useState<NoteStatus>("idle");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openFolder = learningFolders.find((folder) => folder.id === openFolderId);
  const activeNote = openFolder?.notes.find((note) => note.id === selectedNoteId)
    ?? openFolder?.notes[0];
  const activeNoteHref = activeNote?.href;

  const closeFolder = useCallback(() => {
    setOpenFolderId(null);
    setSelectedNoteId(null);
    setNoteContent("");
    setNoteStatus("idle");
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!openFolderId) return;

    document.body.classList.add("lock");
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFolder();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lock");
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeFolder, openFolderId]);

  useEffect(() => {
    if (!activeNoteHref) return;

    const controller = new AbortController();

    fetch(activeNoteHref, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${activeNoteHref}`);
        return response.text();
      })
      .then((content) => {
        setNoteContent(content);
        setNoteStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setNoteStatus("error");
      });

    return () => controller.abort();
  }, [activeNoteHref]);

  return (
    <section className={styles.section} aria-labelledby="learning-heading">
      <FadeIn className={styles.reveal}>
        <header className="section-header">
          <h2 className="section-header-label" id="learning-heading">What I&apos;m learning</h2>
        </header>
        <div className={styles.intro}>
          <p>
            Working notes from classes, papers, and ideas I am still trying to make precise.
          </p>
          <span>0 notes · 4 folders</span>
        </div>
      </FadeIn>

      <div className={styles.content}>
        <FadeIn className={styles.gridReveal}>
          <div className={styles.folderGrid}>
            {learningFolders.map((folder) => (
              <button
                className={styles.folder}
                type="button"
                key={folder.id}
                aria-haspopup="dialog"
                aria-expanded={openFolderId === folder.id}
                aria-controls="learning-folder-dialog"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setNoteContent("");
                  setNoteStatus(folder.notes.length > 0 ? "loading" : "idle");
                  setSelectedNoteId(folder.notes[0]?.id ?? null);
                  setOpenFolderId(folder.id);
                }}
              >
                <span className={styles.folderTab}>
                  <span>{folder.index}</span>
                  <span className={styles.tabDot} aria-hidden />
                </span>
                <span className={styles.folderBody}>
                  <span className={styles.folderTitle}>{folder.title}</span>
                  <span className={styles.folderDescription}>{folder.description}</span>
                  <span className={styles.folderMeta}>
                    <span>{String(folder.notes.length).padStart(2, "0")} Markdown files</span>
                    <span className={styles.openLabel}>Open folder <span aria-hidden>↗</span></span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn className={styles.figureReveal}>
          <figure className={styles.figure}>
            <Image
              src="/images/illustrations/impact-walker.png"
              alt="Illustration of Michael walking beside his learning folders"
              width={569}
              height={759}
              sizes="(max-width: 780px) 105px, 155px"
            />
          </figure>
        </FadeIn>
      </div>

      {openFolder && (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeFolder();
          }}
        >
          <section
            className={styles.dialog}
            id="learning-folder-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="learning-folder-title"
          >
            <header className={styles.dialogHeader}>
              <div>
                <span className={styles.eyebrow}>Folder {openFolder.index} · learning archive</span>
                <h2 id="learning-folder-title">{openFolder.longTitle}</h2>
              </div>
              <button
                className={styles.closeButton}
                type="button"
                ref={closeButtonRef}
                onClick={closeFolder}
              >
                Close <span aria-hidden>×</span>
              </button>
            </header>

            <div className={styles.workspace}>
              <aside className={styles.filePane}>
                <p>{openFolder.description}</p>
                <div className={styles.sourceList} aria-label="Learning sources">
                  {openFolder.sources.map((source) => <span key={source}>{source}</span>)}
                </div>
                <nav className={styles.fileList} aria-label={`${openFolder.title} notes`}>
                  {openFolder.notes.length > 0 ? (
                    openFolder.notes.map((note, index) => (
                      <button
                        className={styles.fileButton}
                        type="button"
                        key={note.id}
                        aria-current={activeNote?.id === note.id ? "page" : undefined}
                        onClick={() => {
                          if (activeNote?.id === note.id) return;
                          setNoteContent("");
                          setNoteStatus("loading");
                          setSelectedNoteId(note.id);
                        }}
                      >
                        <span className={styles.fileIndex}>{String(index + 1).padStart(2, "0")}</span>
                        <span className={styles.fileCopy}>
                          <strong>{note.title}</strong>
                          <span>{note.filename}</span>
                        </span>
                        <span className={styles.fileArrow} aria-hidden>→</span>
                      </button>
                    ))
                  ) : (
                    <div className={styles.emptyFileList}>
                      <span>00</span>
                      <p>No Markdown files yet.</p>
                    </div>
                  )}
                </nav>
              </aside>

              <article className={styles.previewPane} aria-live="polite">
                <header className={styles.previewHeader}>
                  <span className={styles.previewDots} aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={styles.previewFilename}>{activeNote?.filename ?? "No file selected"}</span>
                  <span className={styles.previewMode}>Rendered Markdown</span>
                </header>

                <div className={styles.previewBody}>
                  {!activeNote && (
                    <div className={styles.emptyPreview}>
                      <span aria-hidden>.md</span>
                      <strong>This folder is empty.</strong>
                      <p>Markdown previews will appear here when notes are added.</p>
                    </div>
                  )}

                  {noteStatus === "loading" && (
                    <div className={styles.loadingState} aria-label="Loading note">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  )}

                  {noteStatus === "error" && (
                    <div className={styles.errorState}>
                      <strong>This note could not be loaded.</strong>
                      <p>The Markdown file may have moved. Try another file or refresh the page.</p>
                    </div>
                  )}

                  {noteStatus === "ready" && (
                    <div className={styles.markdown}>
                      <Markdown skipHtml>{noteContent}</Markdown>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
