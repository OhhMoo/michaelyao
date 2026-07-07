"use client";

import { FadeIn } from "./FadeIn";

const PIPELINE = `                    ┌─ concat → select ─┐ physchem
SMILES+labels ─group┤  (Isaura)   (≤k)  ├─ concat → TabPFN → P(active)
  into families     └─ concat → select ─┘ learned            (+ RF baseline)`;

export function ErsiliaSection() {
  return (
    <section className="ersilia" id="ersilia">
      <FadeIn className="ers-hero">
        <div className="ers-lattice" aria-hidden />
        <div className="ers-eyebrow">Open-source contribution</div>
        <div className="ers-brand">
          <img src="/images/ersilia/ersilia-logo.png" alt="Ersilia" className="ers-logo" />
        </div>
        <h1 className="ers-headline">
          Drug-discovery models,
          <br />
          <span className="ers-script">in context.</span>
        </h1>
        <p className="ers-lede">
          I contribute to the <span className="em">Ersilia Open Source Initiative</span>, a non-profit
          that builds free AI/ML tools for scientists working on neglected and infectious diseases.
          My work there is <code>chem-icl</code> — a small pipeline that turns Ersilia&apos;s model hub
          into an in-context learner for chemistry.
        </p>
      </FadeIn>

      <FadeIn className="ers-block">
        <div className="ers-block-label">The idea</div>
        <div className="ers-block-body">
          <p>
            Predicting whether a molecule is toxic or membrane-permeable usually means training a fresh
            model per task. <code>chem-icl</code> skips the training. It picks a handful of Ersilia models,
            groups their outputs into representation <span className="em">families</span> —
            structural, physicochemical, learned — selects the most predictive features, and hands a
            labelled <span className="em">context</span> to <code>TabPFN</code>, a transformer that reasons
            over the context at inference time. The context <span className="em">is</span> the input;
            nothing is fit.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="ers-block">
        <div className="ers-block-label">The pipeline</div>
        <div className="ers-block-body">
          <pre className="ers-pipeline">{PIPELINE}</pre>
          <p className="ers-caption">
            Molecules resolve cheapest-first — the local Isaura store, then the shared cloud lake,
            then a one-off Ersilia run cached back. Every model must cover every molecule; nothing is
            silently dropped.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="ers-block">
        <div className="ers-block-label">What the benchmark says</div>
        <div className="ers-block-body">
          <figure className="ers-figure">
            <img src="/images/ersilia/benchmark.png" alt="family_stack vs family_concat across 9 TDC tasks: a dead heat" />
            <figcaption>
              Stacking per-family TabPFNs against a plain concatenate-then-one-TabPFN, over nine TDC
              ADME/Tox tasks × ten seeds. The honest result: a dead heat. The added machinery of a
              stacker doesn&apos;t beat the simpler concat, so <code>chem-icl</code> ships concat as the
              default and keeps the stacker as an option.
            </figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="ers-links">
        <a href="https://github.com/ersilia-os/chem-icl" target="_blank" rel="noreferrer">
          chem-icl on GitHub ↗
        </a>
        <a href="https://ersilia.io/" target="_blank" rel="noreferrer">
          ersilia.io ↗
        </a>
      </FadeIn>
    </section>
  );
}
