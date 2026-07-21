import { FadeIn } from "./FadeIn";

const PIPELINE = `base model → PPO fine-tune (verl · FSDP · vLLM)
   → cache activations: 8 checkpoints × 4 residual layers
   → train 32 warm-start TopK SAEs → align features
   → decoder cosine drift = how the geometry moved`;

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

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The pipeline</h2>
        <pre className="np-pipeline">{PIPELINE}</pre>
        <p>
          Warm-starting each SAE from the last keeps feature indices aligned across checkpoints, so
          decoder cosine-similarity becomes a well-defined drift metric.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-wide">
        <figure>
          <div className="np-glass">
            <img src="/images/works/sae-rl/scorecard.png" alt="Per-feature scorecard tracking representational drift across PPO checkpoints" />
          </div>
          <figcaption className="np-caption">Feature-level drift tracked across the checkpoint chain.</figcaption>
        </figure>
      </FadeIn>
      <FadeIn className="np-media np-wide">
        <figure>
          <div className="np-glass">
            <img src="/images/works/sae-rl/accuracy.png" alt="Reconstruction accuracy of the trained sparse autoencoders" />
          </div>
          <figcaption className="np-caption">SAE reconstruction holding up across layers and checkpoints.</figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/sae_rl" target="_blank" rel="noreferrer">
          sae_rl on GitHub ↗
        </a>
        <span className="np-note">Algoverse · AWS-supervised</span>
      </FadeIn>
    </section>
  );
}
