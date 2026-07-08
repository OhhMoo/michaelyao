import {
  IconChartCandle,
  IconBinaryTree,
  IconMathFunction,
  type Icon as TablerIcon,
} from "@tabler/icons-react";
import { FadeIn } from "@/components/FadeIn";
import { FolderPreview } from "@/components/FolderPreview";

type Flagship = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  links: { label: string; href: string; external?: boolean }[];
  preview?: React.ComponentProps<typeof FolderPreview>["preview"];
  image?: { src: string; alt: string };
};

const FLAGSHIPS: Flagship[] = [
  {
    title: "SPEQTRO",
    eyebrow: "Autonomous spectroscopy reasoning agent",
    description:
      "An agent that reads NMR, IR, and MS spectra, runs six specialist ML models across four evidence streams, and returns ranked structures — showing its reasoning at every step. Runs as a CLI, a web GUI, or an MCP server inside Claude or Cursor.",
    tags: ["Python", "PyTorch", "MCP", "Spectroscopy"],
    links: [
      { label: "Read the page →", href: "/speqtro" },
      { label: "GitHub ↗", href: "https://github.com/OhhMoo/SPEQTRO", external: true },
    ],
    preview: { kind: "video", src: "/videos/speqtro-video.mp4" },
  },
  {
    title: "Water, clustered",
    eyebrow: "Two states of supercooled water, made visible",
    description:
      "Is liquid water one continuum or a mixture of two local structures? I let unsupervised clustering decide on MD trajectories, then validated it against an observable the clustering never saw. Two structurally distinct populations emerge on their own.",
    tags: ["OpenMM", "HDBSCAN", "UMAP", "HPC"],
    links: [
      { label: "Read the page →", href: "/water" },
      { label: "GitHub ↗", href: "https://github.com/OhhMoo/Water_Clustering", external: true },
    ],
    preview: {
      kind: "iframe-pair",
      title: "water 3D clustering",
      panes: [
        { src: "/plotly/water-3d-cluster0.html", caption: "cluster 0", title: "Cluster 0 — Low-density" },
        { src: "/plotly/water-3d-cluster1.html", caption: "cluster 1", title: "Cluster 1 — High-density" },
      ],
    },
  },
  {
    title: "SAE × RL",
    eyebrow: "Reading what RL fine-tuning changes inside a model",
    description:
      "Can sparse autoencoders trained on a chain of PPO checkpoints tell you what RL fine-tuning changes inside a model? A three-axis scorecard separates reward-invariant reorganization from reward-graded causal load.",
    tags: ["PyTorch", "SAELens", "verl", "TopK SAE"],
    links: [
      { label: "Read the page →", href: "/sae-rl" },
      { label: "GitHub ↗", href: "https://github.com/OhhMoo/sae_rl", external: true },
    ],
    image: {
      src: "/images/works/sae-rl/scorecard.png",
      alt: "Three-axis dissociation scorecard across matched PPO chains",
    },
  },
];

type ProjectCard = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
  Icon: TablerIcon;
};

const CARDS: ProjectCard[] = [
  {
    title: "LangAlpha",
    blurb:
      "Open-source agentic investing platform (1.5k+ GitHub stars) — live market data, inline financial time-series charts, and TradingView integration for systematic research workflows.",
    tags: ["FastAPI", "LangGraph", "React", "Daytona"],
    href: "/langalpha",
    Icon: IconChartCandle,
  },
  {
    title: "ms-pred-PyG",
    blurb:
      "ICEBERG's MS/MS fragmentation pipeline — 19 files, 8 GNN families (GGNN, PNA, GINE…) — ported from DGL to PyTorch Geometric. DAG fragment pipelines redesigned around Batch and scatter_.",
    tags: ["PyTorch", "PyG", "Chem"],
    href: "/ms-pred",
    Icon: IconBinaryTree,
  },
  {
    title: "Mode-Selective Criticality",
    blurb:
      "Mean-field signal propagation in random tanh networks — a replication of Poole et al. (2016), transient chaos.",
    tags: ["NumPy", "Mean-field theory", "SAE"],
    href: "/criticality",
    Icon: IconMathFunction,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="maya-section maya-section--alt">
      <div className="maya-container">
        <FadeIn style={{ transitionDelay: "0.2s" }}>
          <div className="maya-title">
            <h2>Projects</h2>
            <p>Click on any project to learn more</p>
          </div>
        </FadeIn>

        <div className="featured-stack">
          {FLAGSHIPS.map((it, i) => (
            <FadeIn
              key={it.title}
              className="feat-item feat-item-inline"
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
                <div className="feat-links">
                  {it.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="feat-item-preview">
                {it.image ? (
                  <img className="feat-plain-img" src={it.image.src} alt={it.image.alt} />
                ) : (
                  it.preview && <FolderPreview preview={it.preview} />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="maya-projects-grid maya-projects-grid--rest">
          {CARDS.map((card) => (
            <FadeIn key={card.title} style={{ transitionDelay: "0.4s" }}>
              <a href={card.href}>
                <div className="service-thumb">
                  <div className="maya-card-icon">
                    <card.Icon size={45} stroke={1.5} />
                  </div>
                  <h4>{card.title}</h4>
                  <p>{card.blurb}</p>
                  <div className="skill-container">
                    {card.tags.map((t) => (
                      <span key={t} className="skill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
