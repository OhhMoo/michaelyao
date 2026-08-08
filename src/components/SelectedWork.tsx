import { FadeIn } from "@/components/FadeIn";
import { ScrollDashboard, type DashboardStep } from "@/components/ScrollDashboard";
import { FolderPreview } from "@/components/FolderPreview";

type FeaturedWork = {
  id: string;
  /** Org · role · dates, shown above the title. */
  kicker: string;
  /** Short org line for the floating window. */
  org: string;
  dateTag: string;
  title: string;
  /** 1–2 sentences — enough to intrigue, not enough to spoil the page. */
  teaser: string;
  href: string;
  stats: { k: string; v: string }[];
  preview: React.ComponentProps<typeof FolderPreview>["preview"];
};

/**
 * The three featured works — one merged narrative, no separate "experience"
 * vs "projects" split. Every number is pulled verbatim from the matching
 * essay page's own prose (see SPEQTRO_STEPS / WATER_STEPS / SAERL_STEPS).
 */
const FEATURED: FeaturedWork[] = [
  {
    id: "work-sae-rl",
    kicker: "Algoverse · Mechanistic Interpretability Researcher · Jan 2026 – Present",
    org: "Algoverse — mechanistic interpretability",
    dateTag: "Jan 2026 – Present",
    title: "SAE × RL",
    teaser:
      "RL fine-tuning changes what a model does — but what does it change inside it? Thirty-two sparse autoencoders, trained across PPO checkpoints, read the drift directly.",
    href: "/sae-rl",
    stats: [
      { k: "Warm-start SAEs", v: "32" },
      { k: "Checkpoints", v: "8 × 4 layers" },
    ],
    preview: {
      kind: "image",
      src: "/images/works/sae-rl/scorecard.png",
      alt: "Three-axis dissociation scorecard across matched PPO chains",
    },
  },
  {
    id: "work-water",
    kicker: "Zhuang Group, Harvey Mudd · Student Researcher · Oct 2025 – Feb 2026",
    org: "Zhuang Group, Harvey Mudd",
    dateTag: "Oct 2025 – Feb 2026",
    title: "Water, clustered",
    teaser:
      "Is liquid water one continuum, or two structures hiding in plain sight? Unsupervised clustering on 20,480 configurations settles it — validated against an observable the clustering never saw.",
    href: "/water",
    stats: [
      { k: "MD trajectories", v: "20 × 20,480 configs" },
      { k: "Structural populations", v: "2" },
      { k: "LFTS first peak k_T1", v: "0.81" },
    ],
    preview: {
      kind: "image",
      src: "/images/research/water/1-clustering.png",
      alt: "Order-parameter density resolved into LFTS and DNLS clusters",
    },
  },
  {
    id: "work-speqtro",
    kicker: "Personal project · 2026",
    org: "Personal project",
    dateTag: "2026",
    title: "SPEQTRO",
    teaser:
      "Hand it a spectrum and watch an agent reason — NMR, IR, and MS evidence from six specialist models, fused into one ranked answer with every step logged.",
    href: "/speqtro",
    stats: [
      { k: "Vendored ML models", v: "6" },
      { k: "Built-in tools", v: "15" },
      { k: "Tests", v: "34" },
    ],
    preview: { kind: "video", src: "/videos/speqtro-video.mp4" },
  },
];

/**
 * Unified "Selected Work" — the old Experience timeline and Projects grid
 * merged into one clean list: a kicker, a title, one teasing sentence, and
 * a link into the full essay page. Everything dynamic (progress track,
 * media tile, stat charts) lives in the sticky ScrollDashboard beside it.
 */
export function SelectedWork() {
  const steps: DashboardStep[] = FEATURED.map((w) => ({
    id: w.id,
    tag: w.dateTag,
    label: "Selected work — now viewing",
    heading: w.title,
    meta: w.org,
    tile: <FolderPreview preview={w.preview} />,
    stats: w.stats,
  }));

  return (
    <section id="work" className="maya-section maya-section--alt">
      <div className="maya-container career-layout">
        <div className="career-main">
          <FadeIn style={{ transitionDelay: "0.2s" }}>
            <div className="maya-title">
              <h2>Selected Work</h2>
              <p>
                Now — Machine Learning Engineering Intern at Alkera AI (YC S26), San Francisco.
              </p>
            </div>
          </FadeIn>

          <ul className="work-list">
            {FEATURED.map((w, i) => (
              <li key={w.id} id={w.id}>
                <FadeIn style={{ transitionDelay: `${0.08 * i}s` }}>
                  <div className="work-entry">
                    <span className="work-kicker">{w.kicker}</span>
                    <h4 className="work-title">{w.title}</h4>
                    <p className="work-teaser">{w.teaser}</p>
                    <a className="work-link" href={w.href}>
                      Read the page →
                    </a>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>

          <FadeIn style={{ transitionDelay: "0.15s" }}>
            <p className="work-edu">
              Education — B.S. Joint Computer Science &amp; Mathematics, Harvey Mudd College
              (expected May 2028) · IB Diploma 44/45, Shanghai Qibao Dwight High School.
            </p>
          </FadeIn>
        </div>

        <ScrollDashboard steps={steps} ariaLabel="Selected work — live dashboard" />
      </div>
    </section>
  );
}
