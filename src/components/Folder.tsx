"use client";

import { useState } from "react";
import type { FolderMeta, Project } from "@/data/projects";
import { FolderPreview } from "@/components/FolderPreview";
import { ElsewherePane } from "@/components/ElsewherePane";

type Props = {
  folder: FolderMeta;
  projects: Project[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  tilt: number;
  tx: number;
  ty: number;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

export function Folder({
  folder,
  projects,
  isOpen,
  onOpen,
  onClose,
  tilt,
  tx,
  ty,
}: Props) {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? "");

  // Projects with a dedicated page (internal "Read the page →" link) show that
  // page live in the right pane; the rest keep the description pane.
  const pageHref = (p: Project) =>
    p.links.find((l) => l.href.startsWith("/"))?.href;

  const colorClass = `f-${folder.color}`;
  const openClass = isOpen ? " open" : "";
  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isOpen) return;
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("iframe")) return;
    if (target.closest("[data-close]")) return;
    if (target.closest(".project-item")) return;
    e.preventDefault();
    e.stopPropagation();
    onOpen();
  };

  return (
    <article
      className={`folder ${colorClass} folder--${folder.id}${openClass}`}
      style={{
        ["--tilt" as string]: `${tilt}deg`,
        ["--tx" as string]: `${tx}px`,
        ["--ty" as string]: `${ty}px`,
      }}
      onClick={handleCardClick}
    >
      <div className="tab">
        <span className="idx">{pad2(folder.index)}</span>
        <span className="tab-dot" aria-hidden />
      </div>

      <div className="body">
        <h3 className="cover-name">{folder.group}</h3>
        <div className="hint">
          <span className="arrow" />
        </div>

        {isOpen && folder.id === "elsewhere" && (
          <div className="panes panes-single">
            <ElsewherePane />
          </div>
        )}

        {isOpen && folder.id !== "elsewhere" && (
          <div className="panes">
            <div className="pane-left">
              <div className="group-title">
                Folder {folder.indexRoman} · {folder.group}
              </div>
              <h2 className="pane-heading">{folder.paneHeading}</h2>
              <p
                className="pane-intro"
                dangerouslySetInnerHTML={{ __html: folder.paneIntroHtml }}
              />
              <div className="project-list">
                {projects.map((p, i) => (
                  <div
                    key={p.id}
                    className={`project-item${p.id === activeId ? " active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveId(p.id);
                    }}
                  >
                    <span className="idx">{pad2(i + 1)}</span>
                    <span className="name">{p.title}</span>
                    <span className="year">{p.year}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pane-right">
              {projects.map((p) => {
                const href = pageHref(p);
                if (href) {
                  // Live embed of the project's own detail page
                  return (
                    <div
                      key={p.id}
                      className={`project-card-pane project-page-pane${p.id === activeId ? " show" : ""}`}
                    >
                      {p.id === activeId && (
                        <iframe src={href} title={p.title} loading="lazy" />
                      )}
                    </div>
                  );
                }
                return (
                <div
                  key={p.id}
                  className={`project-card-pane${p.id === activeId ? " show" : ""}`}
                >
                  {p.preview && <FolderPreview preview={p.preview} />}
                  <h4>{p.title}</h4>
                  <div className="one-liner">{p.oneLiner}</div>
                  <p dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />
                  {p.stats && p.stats.length > 0 && (
                    <div className="stats">
                      {p.stats.map((s) => (
                        <div key={s.k}>
                          <div className="k">{s.k}</div>
                          <div className="v">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {p.techStack.length > 0 && (
                    <div className="tags">
                      {p.techStack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                  {p.links.length > 0 && (
                    <div className="links">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
