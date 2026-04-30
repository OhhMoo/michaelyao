"use client";

import { useCallback, useEffect, useState } from "react";
import { folders, projects, type FolderId } from "@/data/projects";
import { Folder } from "@/components/Folder";
import { Backdrop } from "@/components/Backdrop";
import { FadeIn } from "@/components/FadeIn";

type Stagger = { tilt: number; tx: number; ty: number };

const STAGGER: Stagger[] = [
  { tilt: -1.6, tx: 0, ty: 0 },
  { tilt: 1.2, tx: 22, ty: 28 },
  { tilt: -0.8, tx: 56, ty: 0 },
  { tilt: 1.4, tx: -18, ty: 36 },
  { tilt: -1.1, tx: 28, ty: 12 },
  { tilt: 0.9, tx: -8, ty: 44 },
];

export function Folders() {
  const [openId, setOpenId] = useState<FolderId | null>(null);

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    document.body.classList.toggle("lock", openId !== null);
    return () => {
      document.body.classList.remove("lock");
    };
  }, [openId]);

  useEffect(() => {
    if (openId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, close]);

  useEffect(() => {
    const validIds = new Set(folders.map((f) => f.id));
    const apply = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (validIds.has(raw as FolderId)) {
        const el = document.getElementById("works");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpenId(raw as FolderId);
      }
    };
    window.addEventListener("hashchange", apply);
    apply();
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const rows = [folders.slice(0, 2), folders.slice(2, 4), folders.slice(4, 6)];

  return (
    <>
      <div className="archive-head" id="works">
        <FadeIn>
          <div className="w">Works.</div>
        </FadeIn>
        <FadeIn className="archive-note" style={{ transitionDelay: "0.12s" }}>
          <p>
            Six folders, twenty-odd projects. Click a tab to open it — atoms, agents, photos,
            and what&apos;s in between.
          </p>
        </FadeIn>
      </div>

      <section className="folders" id="works-grid">
        {rows.map((row, ri) => (
          <div className="folder-row" key={ri}>
            {row.map((f, ci) => {
              const s = STAGGER[ri * 2 + ci] ?? { tilt: 0, tx: 0, ty: 0 };
              return (
                <Folder
                  key={f.id}
                  folder={f}
                  projects={projects.filter((p) => p.folder === f.id)}
                  isOpen={openId === f.id}
                  onOpen={() => setOpenId(f.id)}
                  onClose={close}
                  tilt={s.tilt}
                  tx={s.tx}
                  ty={s.ty}
                />
              );
            })}
          </div>
        ))}
      </section>
      <Backdrop show={openId !== null} onClose={close} />
    </>
  );
}
