"use client";

import type { ReactNode } from "react";
import { FolderPreview } from "@/components/FolderPreview";
import { FadeIn } from "@/components/FadeIn";

type FeatItem = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  links: { label: string; href: string }[];
  preview?: React.ComponentProps<typeof FolderPreview>["preview"];
  customPreview?: ReactNode;
};

const ITEMS: FeatItem[] = [
  {
    title: "SPEQTRO",
    eyebrow: "Autonomous spectroscopy reasoning agent",
    description:
      "Agentic AI system for autonomous spectroscopy analysis with CLI, GUI, and MCP interfaces. Features multi-format spectral parsers (JCAMP-DX, Bruker FID, CSV), an ensemble scoring pipeline combining 4 independent ML evidence streams, and a full test suite (34 unit tests). Pip-installable: pip install speqtro.",
    tags: ["Python", "PyTorch", "MCP", "NMR", "Mass Spec"],
    links: [{ label: "GitHub ↗", href: "https://github.com/OhhMoo/SPEQTRO" }],
    preview: { kind: "video", src: "/videos/speqtro-video.mp4" },
  },
  {
    title: "LangAlpha",
    eyebrow: "AI-investment research agent harness",
    description:
      "Persistent multi-agent system for financial research, where work compounds across sessions in dedicated sandbox workspaces, each with an agent.md memory file. Uses Programmatic Tool Calling (PTC) — the agent writes code to process market data locally instead of flooding LLM context. Ships 23 pre-built finance skills (DCF, earnings, comps, morning notes), a parallel subagent swarm with live steering, multi-provider LLM failover, and per-workspace encrypted secret vaults.",
    tags: ["FastAPI", "LangGraph", "React", "Daytona", "PostgreSQL"],
    links: [
      { label: "GitHub ↗", href: "https://github.com/ginlix-ai/LangAlpha" },
      { label: "Live ↗", href: "https://langalpha.com/" },
    ],
  },
  {
    title: "Water Clustering",
    eyebrow: "Supercooled water structural analysis pipeline",
    description:
      "Large-scale molecular dynamics simulations on HPC studying structural heterogeneity in supercooled water. Automated pipelines for preprocessing, feature scaling, and visualization of high-dimensional order-parameter datasets. Applied HDBSCAN and GMM clustering to characterize distinct structural motifs, validated against the two-state liquid framework (Shi & Tanaka, JACS 2020).",
    tags: ["Python", "OpenMM", "Gromacs", "HDBSCAN", "MD Simulation"],
    links: [{ label: "GitHub ↗", href: "https://github.com/OhhMoo/Water_Clustering" }],
    preview: {
      kind: "iframe-pair",
      title: "water 3D clustering",
      panes: [
        { src: "/plotly/water-3d-cluster0.html", caption: "cluster 0", title: "Cluster 0 — Low-density" },
        { src: "/plotly/water-3d-cluster1.html", caption: "cluster 1", title: "Cluster 1 — High-density" },
      ],
    },
  },
];

export function Featured() {
  return (
    <section className="featured" id="featured">
      <FadeIn className="featured-head">
        <div>
          <div className="eyebrow">Featured</div>
          <h2 className="featured-title">Featured Work</h2>
          <p className="featured-sub">
            Three projects that span the spectrum — agents, simulation, and the place where they
            meet.
          </p>
        </div>
        <p className="featured-note">
          A small selection. The full archive lives below, organized by folder.
        </p>
      </FadeIn>

      <div className="featured-stack">
        {ITEMS.map((it, i) => {
          const hasPreview = Boolean(it.preview || it.customPreview);
          return (
            <FadeIn
              key={it.title}
              className={`feat-item ${hasPreview ? "feat-item-inline" : ""}`.trim()}
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              <div className="feat-item-text">
                <h3 className="feat-item-title">{it.title}</h3>
                <div className="feat-item-eyebrow">{it.eyebrow}</div>
                <p className="feat-item-desc">{it.description}</p>
                <div className="feat-chips">
                  {it.tags.map((t) => (
                    <span key={t} className="feat-chip">
                      {t}
                    </span>
                  ))}
                </div>
                {it.links.length > 0 && (
                  <div className="feat-links">
                    {it.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {hasPreview && (
                <div className="feat-item-preview">
                  {it.customPreview ?? (it.preview && <FolderPreview preview={it.preview} />)}
                </div>
              )}
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
