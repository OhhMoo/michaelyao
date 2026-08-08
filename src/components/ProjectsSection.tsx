import { FadeIn } from "@/components/FadeIn";
import { Activity, Droplet, LineChart, Music2, Network, Waves, type LucideIcon } from "lucide-react";

type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  stats: { k: string; v: string }[];
};

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "project-speqtro",
    title: "SPEQTRO",
    description: "Six models rank molecular structures from spectra — and show their reasoning.",
    href: "/speqtro",
    icon: Waves,
    stats: [
      { k: "MODELS", v: "6 specialist" },
      { k: "EVIDENCE", v: "NMR · IR · MS" },
      { k: "OUTPUT", v: "Ranked + traced" },
    ],
  },
  {
    id: "project-water",
    title: "Water, clustered",
    description: "Unsupervised clustering resolves two hidden structures in supercooled water.",
    href: "/water",
    icon: Droplet,
    stats: [
      { k: "TRAJECTORIES", v: "20 × 20,480 configs" },
      { k: "METHOD", v: "K-Means · GMM · UMAP" },
      { k: "RESULT", v: "2 latent populations" },
    ],
  },
  {
    id: "project-sae-rl",
    title: "SAE × RL",
    description: "Aligned sparse autoencoders track what RL reorganizes inside a model.",
    href: "/sae-rl",
    icon: Network,
    stats: [
      { k: "CHECKPOINTS", v: "8 × 4 layers" },
      { k: "SAES", v: "32 warm-start" },
      { k: "METRIC", v: "Decoder cosine drift" },
    ],
  },
  {
    id: "project-langalpha",
    title: "LangAlpha",
    description: "An open-source agentic workspace for AI-driven investment research.",
    href: "/langalpha",
    icon: LineChart,
    stats: [
      { k: "DATA", v: "Live quotes · SEC EDGAR" },
      { k: "AGENTS", v: "Multi-agent research" },
      { k: "STATUS", v: "Open source" },
    ],
  },
  {
    id: "project-criticality",
    title: "Mode-Selective Criticality",
    description: "Replicating mean-field chaos and signal propagation in random tanh networks.",
    href: "/criticality",
    icon: Activity,
    stats: [
      { k: "MODEL", v: "Random tanh networks" },
      { k: "THEORY", v: "Mean-field signal prop." },
      { k: "FOCUS", v: "Transient chaos" },
    ],
  },
  {
    id: "project-popping",
    title: "Popping Dictionary",
    description: "An editorial index of 18 popping elements, technique, and history.",
    href: "/popping",
    icon: Music2,
    stats: [
      { k: "ENTRIES", v: "18 elements" },
      { k: "FORMAT", v: "Editorial index" },
      { k: "CONTENT", v: "Technique · history · dancers" },
    ],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="maya-section maya-section--alt projects-section">
      <div className="maya-container">
        <FadeIn>
          <div className="maya-title">
            <h2>Projects</h2>
            <p>Research stories, tools, and archives — hover a card for the evidence behind it.</p>
          </div>
        </FadeIn>

        <FadeIn className="showcase-grid">
          {showcaseProjects.map((project) => {
            const Icon = project.icon;
            return (
              <a className="showcase-card" href={project.href} key={project.id} id={project.id}>
                <span className="showcase-arrow" aria-hidden="true">
                  ↗
                </span>
                <div className="showcase-icon">
                  <Icon strokeWidth={1.25} />
                </div>
                <div className="showcase-cap">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="showcase-detail">
                    <dl className="showcase-detail-rows">
                      {project.stats.map((stat) => (
                        <div className="showcase-detail-row" key={stat.k}>
                          <dt>{stat.k}</dt>
                          <dd>{stat.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </a>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
