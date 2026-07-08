import {
  Brain,
  Droplets,
  FlaskConical,
  Network,
  TrendingUp,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

type ProjectCard = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
  Icon: LucideIcon;
};

const CARDS: ProjectCard[] = [
  {
    title: "SPEQTRO",
    blurb:
      "An agentic spectroscopy reasoning system. Parses JCAMP-DX, Bruker FID, and raw CSV spectra; routes them through four independent ML evidence streams that collapse into one defensible structural guess.",
    tags: ["Python", "PyTorch", "MCP", "Spectroscopy"],
    href: "https://github.com/OhhMoo/SPEQTRO",
    Icon: FlaskConical,
  },
  {
    title: "LangAlpha",
    blurb:
      "A persistent multi-agent research harness. Every investigation gets its own Daytona sandbox with an agent.md memory the agent reads, appends, and cites.",
    tags: ["FastAPI", "LangGraph", "React", "Daytona"],
    href: "https://github.com/ginlix-ai/LangAlpha",
    Icon: TrendingUp,
  },
  {
    title: "Water, clustered",
    blurb:
      "Structural heterogeneity in supercooled water, framed against the Shi & Tanaka two-state hypothesis. MD on HPC → order-parameter extraction → UMAP → HDBSCAN / GMM.",
    tags: ["OpenMM", "HDBSCAN", "UMAP", "HPC"],
    href: "https://github.com/OhhMoo/Water_Clustering",
    Icon: Droplets,
  },
  {
    title: "Iceberg PyG",
    blurb:
      "ICEBERG's MS/MS fragmentation pipeline — 19 files, 8 GNN families (GGNN, PNA, GINE…) — ported from DGL to PyTorch Geometric. DAG fragment pipelines redesigned around Batch and scatter_.",
    tags: ["PyTorch", "PyG", "Chem"],
    href: "https://github.com/OhhMoo/ms-pred-PyG-ver",
    Icon: Network,
  },
  {
    title: "SAE × RL",
    blurb:
      "Can sparse autoencoders trained on a chain of PPO checkpoints tell you what RL fine-tuning changes inside a model?",
    tags: ["PyTorch", "SAELens", "verl", "TopK SAE"],
    href: "https://github.com/OhhMoo/sae_rl",
    Icon: Brain,
  },
  {
    title: "Mode-Selective Criticality",
    blurb:
      "Mean-field signal propagation in random tanh networks — a replication of Poole et al. (2016), transient chaos.",
    tags: ["NumPy", "Mean-field theory", "SAE"],
    // TODO(user): add a repo/writeup link for this project
    Icon: Waves,
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
        <div className="maya-projects-grid">
          {CARDS.map((card) => {
            const isExternal = card.href !== undefined && !card.href.startsWith("/");
            const thumb = (
              <div className="service-thumb">
                <div className="maya-card-icon">
                  <card.Icon size={45} strokeWidth={1.5} />
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
            );
            return (
              <FadeIn key={card.title} style={{ transitionDelay: "0.4s" }}>
                {card.href ? (
                  <a
                    href={card.href}
                    {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {thumb}
                  </a>
                ) : (
                  <div className="maya-card-static">{thumb}</div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
