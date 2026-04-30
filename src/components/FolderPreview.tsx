"use client";

import type { ProjectPreview } from "@/data/projects";
import { CliMockup } from "@/components/CliMockup";

function macTitleFor(preview: ProjectPreview): string {
  if (preview.kind === "image") {
    const src = preview.src;
    const file = src.slice(src.lastIndexOf("/") + 1);
    return file || "preview";
  }
  if (preview.kind === "image-pair") return "preview";
  if (preview.kind === "image-gallery") return preview.title ?? "gallery";
  if (preview.kind === "video") return "preview";
  if (preview.kind === "iframe") return preview.title ?? "preview";
  if (preview.kind === "iframe-pair") return preview.title ?? "preview";
  if (preview.kind === "svg") {
    return preview.node === "iceberg" ? "iceberg.note" : "sae-drift.note";
  }
  if (preview.kind === "ascii") {
    return `${preview.shape}.note`;
  }
  return "note.txt";
}

function MacFrame({
  title,
  tone = "light",
  children,
}: {
  title: string;
  tone?: "light" | "dark";
  children: React.ReactNode;
}) {
  return (
    <div className={`mac-window mac-${tone}`}>
      <div className="mac-titlebar">
        <span className="mac-dot mac-dot-red" />
        <span className="mac-dot mac-dot-yellow" />
        <span className="mac-dot mac-dot-green" />
        <span className="mac-title mac-title-hidden">{title}</span>
      </div>
      <div className="mac-body">{children}</div>
    </div>
  );
}

function isDarkBg(bg: string): boolean {
  const hex = bg.trim();
  if (!hex.startsWith("#")) return false;
  const h = hex.slice(1);
  const full =
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0").slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.4;
}

function PlaceholderNote({ caption, dark = false }: { caption?: string; dark?: boolean }) {
  return (
    <div className={`preview preview-note${dark ? " preview-note-dark" : ""}`}>
      <span className="preview-note-mark">···</span>
      {caption ? <span className="preview-note-cap">{caption}</span> : null}
    </div>
  );
}

export function FolderPreview({ preview }: { preview: ProjectPreview }) {
  const title = macTitleFor(preview);

  if (preview.kind === "cli") {
    return <CliMockup lines={preview.lines} width={preview.width} />;
  }
  if (preview.kind === "image") {
    return (
      <div className="mac-window mac-image">
        <div className="mac-titlebar">
          <span className="mac-dot mac-dot-red" />
          <span className="mac-dot mac-dot-yellow" />
          <span className="mac-dot mac-dot-green" />
        </div>
        <div className="mac-body">
          <div className="preview">
            <img src={preview.src} alt={preview.alt ?? ""} />
          </div>
        </div>
      </div>
    );
  }
  if (preview.kind === "video") {
    return (
      <div className="mac-window mac-dark mac-video">
        <div className="mac-titlebar">
          <span className="mac-dot mac-dot-red" />
          <span className="mac-dot mac-dot-yellow" />
          <span className="mac-dot mac-dot-green" />
        </div>
        <div className="mac-body">
          <div className="preview preview-video">
            <video
              src={preview.src}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    );
  }
  if (preview.kind === "image-pair") {
    return (
      <MacFrame title={title}>
        <div className="preview-pair preview-pair-images">
          {preview.panes.map((p, i) => (
            <div key={i}>
              <img
                src={p.src}
                alt={p.alt ?? ""}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {p.caption ? <span className="cap">{p.caption}</span> : null}
            </div>
          ))}
        </div>
      </MacFrame>
    );
  }
  if (preview.kind === "iframe-pair") {
    return (
      <div className="pair-live-grid">
        {preview.panes.map((p, i) => (
          <div key={i} className="pair-live-pane">
            <iframe src={p.src} title={p.title ?? `preview ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    );
  }
  if (preview.kind === "image-gallery") {
    return (
      <div className="gallery-live">
        <div className="gallery-live-head">{preview.images.length} views · swipe to browse</div>
        <div className="gallery-live-row">
          {preview.images.map((img, i) => (
            <figure key={i} className="gallery-live-frame">
              <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
              {img.caption ? <figcaption>{img.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    );
  }
  if (preview.kind === "quote") {
    const tone = preview.bg && isDarkBg(preview.bg) ? "dark" : "light";
    return (
      <MacFrame title={title} tone={tone}>
        <div
          className="preview preview-quote"
          style={{ background: preview.bg ?? "#f5f5f5" }}
        >
          <div className="quote-preview">{preview.text}</div>
        </div>
      </MacFrame>
    );
  }
  if (preview.kind === "ascii") {
    const tone = preview.theme ?? "light";
    return (
      <MacFrame title={title} tone={tone}>
        <PlaceholderNote caption={preview.caption} dark={tone === "dark"} />
      </MacFrame>
    );
  }
  if (preview.kind === "svg") {
    return (
      <MacFrame title={title} tone="dark">
        <PlaceholderNote dark />
      </MacFrame>
    );
  }
  if (preview.kind === "iframe") {
    // not used by current data set; render an empty mac frame
    return (
      <MacFrame title={title}>
        <PlaceholderNote />
      </MacFrame>
    );
  }
  return null;
}
