import { FadeIn } from "./FadeIn";

const PIPELINE = `base model → PPO fine-tune (verl · FSDP · vLLM)
   → cache activations: 8 checkpoints × 4 residual layers
   → train 32 warm-start TopK SAEs → align features
   → decoder cosine drift = how the geometry moved`;

export function SaeRlSection() {
  return (
    <section className="rpage rpage--saerl" id="sae-rl">
      <FadeIn className="rp-hero">
        <div className="rp-lattice" aria-hidden />
        <div className="rp-eyebrow">Mechanistic interpretability</div>
        <h1 className="rp-headline">
          What does RL change
          <br />
          <span className="rp-script">inside a model?</span>
        </h1>
        <p className="rp-lede">
          Reinforcement fine-tuning makes a model better — but at what, and where? I train sparse
          autoencoders across a chain of PPO checkpoints and measure how the internal feature
          geometry drifts as training proceeds.
        </p>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The pipeline</div>
        <div className="rp-block-body">
          <pre className="rp-pipeline">{PIPELINE}</pre>
          <p className="rp-caption">
            Warm-starting each SAE from the last keeps feature indices aligned across checkpoints, so
            decoder cosine-similarity becomes a well-defined drift metric.
          </p>
          <figure className="rp-figure">
            <img src="/images/works/sae-rl/scorecard.png" alt="Per-feature scorecard tracking representational drift across PPO checkpoints" />
            <figcaption>Feature-level drift tracked across the checkpoint chain.</figcaption>
          </figure>
          <figure className="rp-figure">
            <img src="/images/works/sae-rl/accuracy.png" alt="Reconstruction accuracy of the trained sparse autoencoders" />
            <figcaption>SAE reconstruction holding up across layers and checkpoints.</figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-links">
        <a href="https://github.com/OhhMoo/sae_rl" target="_blank" rel="noreferrer">
          sae_rl on GitHub ↗
        </a>
        <span style={{ color: "var(--text-2)", fontFamily: "var(--ff-label), sans-serif", fontSize: "0.95rem" }}>
          Algoverse · AWS-supervised
        </span>
      </FadeIn>
    </section>
  );
}
