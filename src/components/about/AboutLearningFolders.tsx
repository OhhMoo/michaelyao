"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import {
  learningFolders,
  learningNoteCount,
  type LearningFolder,
  type LearningFolderId,
} from "@/data/learning-notes";

import { FadeIn } from "../FadeIn";
import styles from "./AboutLearningFolders.module.css";

type NoteStatus = "idle" | "loading" | "ready" | "error";

const missingImageMessage = "[sorrrrrrrry image is missing and we are working on it...]";

function getFolderNoteCount(folder: LearningFolder) {
  return folder.notes.length + folder.subfolders.reduce(
    (total, subfolder) => total + subfolder.notes.length,
    0,
  );
}

function replaceMissingImages(markdown: string) {
  return markdown
    .replace(
      /!\[\[[^\]]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:#[^|\]]+)?(?:\|[^\]]+)?\]\]/gi,
      `\n\n${missingImageMessage}\n\n`,
    )
    .replace(
      /!\[[^\]]*\]\((?:[^()]|\([^()]*\))*\)/g,
      `\n\n${missingImageMessage}\n\n`,
    );
}

export function AboutLearningFolders() {
  const [openFolderId, setOpenFolderId] = useState<LearningFolderId | null>(null);
  const [selectedSubfolderId, setSelectedSubfolderId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [noteStatus, setNoteStatus] = useState<NoteStatus>("idle");
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openFolder = learningFolders.find((folder) => folder.id === openFolderId);
  const activeSubfolder = openFolder?.subfolders.find(
    (subfolder) => subfolder.id === selectedSubfolderId,
  ) ?? openFolder?.subfolders[0];
  const activeNotes = activeSubfolder?.notes ?? openFolder?.notes ?? [];
  const activeNote = activeNotes.find((note) => note.id === selectedNoteId)
    ?? activeNotes[0];
  const activeNoteHref = activeNote?.href;

  const closeFolder = useCallback(() => {
    setOpenFolderId(null);
    setSelectedSubfolderId(null);
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
        setNoteContent(replaceMissingImages(content));
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
          <span>{learningNoteCount} notes · {learningFolders.length} folders</span>
        </div>
      </FadeIn>

      <div className={styles.content}>
        <FadeIn className={styles.gridReveal}>
          <div className={styles.folderGrid}>
            {learningFolders.map((folder) => {
              const noteCount = getFolderNoteCount(folder);
              const subfolderLabel = folder.subfolders.length === 1 ? "subfolder" : "subfolders";

              return (
                <button
                  className={styles.folder}
                  type="button"
                  key={folder.id}
                  aria-haspopup="dialog"
                  aria-expanded={openFolderId === folder.id}
                  aria-controls="learning-folder-dialog"
                  onClick={(event) => {
                    const firstSubfolder = folder.subfolders[0];
                    const firstNote = firstSubfolder?.notes[0] ?? folder.notes[0];
                    lastTriggerRef.current = event.currentTarget;
                    setNoteContent("");
                    setNoteStatus(firstNote ? "loading" : "idle");
                    setSelectedSubfolderId(firstSubfolder?.id ?? null);
                    setSelectedNoteId(firstNote?.id ?? null);
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
                      <span>
                        {String(noteCount).padStart(2, "0")} files
                        {folder.subfolders.length > 0 && (
                          <> · {String(folder.subfolders.length).padStart(2, "0")} {subfolderLabel}</>
                        )}
                      </span>
                      <span className={styles.openLabel}>Open folder <span aria-hidden>↗</span></span>
                    </span>
                  </span>
                </button>
              );
            })}
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

                {openFolder.subfolders.length > 0 && (
                  <>
                    <div className={styles.directoryHeader}>
                      <span>Subfolders</span>
                      <span>{String(openFolder.subfolders.length).padStart(2, "0")}</span>
                    </div>
                    <nav className={styles.subfolderList} aria-label={`${openFolder.title} subfolders`}>
                      {openFolder.subfolders.map((subfolder) => (
                        <button
                          className={styles.subfolderButton}
                          type="button"
                          key={subfolder.id}
                          aria-current={activeSubfolder?.id === subfolder.id ? "true" : undefined}
                          onClick={() => {
                            if (activeSubfolder?.id === subfolder.id) return;
                            setNoteContent("");
                            setNoteStatus(subfolder.notes[0] ? "loading" : "idle");
                            setSelectedSubfolderId(subfolder.id);
                            setSelectedNoteId(subfolder.notes[0]?.id ?? null);
                          }}
                        >
                          <span className={styles.subfolderIcon} aria-hidden />
                          <span className={styles.subfolderCopy}>
                            <strong>{subfolder.index}. {subfolder.title}</strong>
                            <span>{String(subfolder.notes.length).padStart(2, "0")} Markdown files</span>
                          </span>
                          <span className={styles.subfolderArrow} aria-hidden>→</span>
                        </button>
                      ))}
                    </nav>
                  </>
                )}

                <div className={styles.activeDirectory}>
                  <span>{activeSubfolder?.title ?? `${openFolder.title} Notes`}</span>
                  <p>
                    {activeSubfolder?.description
                      ?? (openFolder.notes.length > 0
                        ? `Markdown files stored directly in the ${openFolder.title} folder.`
                        : "No notes in this folder yet.")}
                  </p>
                </div>
                <nav className={styles.fileList} aria-label={`${activeSubfolder?.title ?? openFolder.title} notes`}>
                  {activeNotes.length > 0 ? (
                    activeNotes.map((note, index) => (
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
                        <span className={styles.fileArrow} aria-hidden>↗</span>
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
                  <span className={styles.previewFilename}>
                    {activeNote
                      ? `${activeSubfolder?.title ?? openFolder.title} / ${activeNote.filename}`
                      : "No file selected"}
                  </span>
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
                      <Markdown
                        skipHtml
                        remarkPlugins={[remarkMath, remarkGfm]}
                        rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
                      >
                        {noteContent}
                      </Markdown>
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
