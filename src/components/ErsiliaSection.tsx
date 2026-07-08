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
          building free ML tools for neglected-disease research. My work there is <code>chem-icl</code>.
        </p>
      </FadeIn>

      <FadeIn className="ers-block">
        <div className="ers-block-label">The idea</div>
        <div className="ers-block-body">
          <p>
            Predicting a molecule&apos;s toxicity usually means training a fresh model per task.{" "}
            <code>chem-icl</code> skips training: it groups Ersilia model outputs into
            representation <span className="em">families</span>, selects the best features, and hands a
            labelled context to <code>TabPFN</code>, a transformer that reasons over it at inference.
            The context <span className="em">is</span> the input; nothing is fit.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="ers-block">
        <div className="ers-block-label">The pipeline</div>
        <div className="ers-block-body">
          <pre className="ers-pipeline">{PIPELINE}</pre>
          <p className="ers-caption">
            Molecules resolve cheapest-first: local store → cloud lake → a one-off run, cached back.
            Every model must cover every molecule.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="ers-block">
        <div className="ers-block-label">What the benchmark says</div>
        <div className="ers-block-body">
          <figure className="ers-figure">
            <img src="/images/ersilia/benchmark.png" alt="family_stack vs family_concat across 9 TDC tasks: a dead heat" />
            <figcaption>
              Per-family stacking vs. a plain concat, over nine TDC ADME/Tox tasks × ten seeds — a
              dead heat. So <code>chem-icl</code> ships the simpler concat as default.
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
