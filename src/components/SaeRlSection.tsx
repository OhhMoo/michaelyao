import { FadeIn } from "./FadeIn";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

const PIPELINE = `base model → PPO fine-tune (verl · FSDP · vLLM)
   → cache activations: 8 checkpoints × 4 residual layers
   → train 32 warm-start TopK SAEs → align features
   → decoder cosine drift = how the geometry moved`;

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * essay prose itself (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const SAERL_STEPS: DashboardStep[] = [
  {
    id: "saerl-pipeline",
    tag: "01 / 03",
    label: "SAE × RL study — now viewing",
    heading: "The pipeline",
    meta: "Warm-started SAEs keep feature indices aligned across checkpoints",
    stats: [
      { k: "PPO checkpoints", v: "8" },
      { k: "Residual layers", v: "4" },
      { k: "Warm-start TopK SAEs", v: "32" },
    ],
  },
  {
    id: "saerl-drift",
    tag: "02 / 03",
    label: "SAE × RL study — now viewing",
    heading: "Feature-level drift",
    meta: "Decoder cosine similarity as a well-defined drift metric",
  },
  {
    id: "saerl-reconstruction",
    tag: "03 / 03",
    label: "SAE × RL study — now viewing",
    heading: "Reconstruction accuracy",
    meta: "SAE reconstruction holding up across layers and checkpoints",
  },
];

export function SaeRlSection() {
  return (
    <section className="npage npage--saerl" id="sae-rl">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">What does RL change inside a model?</h1>
        <p className="np-subhead">
          Reinforcement fine-tuning makes a model better — but at what, and where? I train sparse
          autoencoders across a chain of PPO checkpoints and measure how the internal feature
          geometry drifts as training proceeds.
        </p>
      </FadeIn>

      {/* Everything below shares one `.essay` ancestor so the sidenote counter
          numbers continuously across the prose sections. The inner
          .essay-dash split adds the sticky ScrollDashboard alongside the
          reading column (desktop ≥1280px only). */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="np-body np-col" id="saerl-pipeline">
            <h2 className="np-h2">The pipeline</h2>
            <pre className="np-pipeline">{PIPELINE}</pre>
            <p>
              Warm-starting each SAE from the last keeps feature indices aligned across checkpoints, so
              decoder cosine-similarity becomes a well-defined drift metric.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-col" id="saerl-drift">
            <figure>
              <div className="np-glass">
                <img src="/images/works/sae-rl/scorecard.png" alt="Per-feature scorecard tracking representational drift across PPO checkpoints" />
              </div>
              <figcaption className="np-caption">Feature-level drift tracked across the checkpoint chain.</figcaption>
            </figure>
          </FadeIn>
          <FadeIn className="np-media np-col" id="saerl-reconstruction">
            <figure>
              <div className="np-glass">
                <img src="/images/works/sae-rl/accuracy.png" alt="Reconstruction accuracy of the trained sparse autoencoders" />
              </div>
              <figcaption className="np-caption">SAE reconstruction holding up across layers and checkpoints.</figcaption>
            </figure>
          </FadeIn>
        </div>

        <ScrollDashboard steps={SAERL_STEPS} ariaLabel="SAE × RL study — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/sae_rl" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
