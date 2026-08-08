"use client";

import { FadeIn } from "./FadeIn";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

const PIPELINE = `                    ┌─ concat → select ─┐ physchem
SMILES+labels ─group┤  (Isaura)   (≤k)  ├─ concat → TabPFN → P(active)
  into families     └─ concat → select ─┘ learned            (+ RF baseline)`;

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * essay prose itself (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const ERSILIA_STEPS: DashboardStep[] = [
  {
    id: "ersilia-idea",
    tag: "01 / 03",
    label: "chem-icl — now viewing",
    heading: "The idea",
    meta: "Skips training: a labelled context handed to TabPFN",
  },
  {
    id: "ersilia-pipeline",
    tag: "02 / 03",
    label: "chem-icl — now viewing",
    heading: "The pipeline",
    meta: "Cheapest-first: local store → cloud lake → one-off run, cached",
  },
  {
    id: "ersilia-benchmark",
    tag: "03 / 03",
    label: "chem-icl — now viewing",
    heading: "What the benchmark says",
    meta: "Per-family stacking vs. plain concat — a dead heat",
    stats: [
      { k: "TDC ADME/Tox tasks", v: "9" },
      { k: "Seeds", v: "10" },
    ],
  },
];

export function ErsiliaSection() {
  return (
    <section className="npage npage--ersilia" id="ersilia">
      <FadeIn className="np-head np-col">
        <img src="/images/ersilia/ersilia-logo.png" alt="Ersilia" className="np-logo" />
        <h1 className="np-headline">Drug-discovery models, in context</h1>
        <p className="np-subhead">
          I contribute to the <span className="em">Ersilia Open Source Initiative</span>, a non-profit
          building free ML tools for neglected-disease research. My work there is <code>chem-icl</code>.
        </p>
      </FadeIn>

      {/* The .essay-dash split adds the sticky ScrollDashboard alongside the
          reading column (desktop ≥1280px only). */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="np-body np-col" id="ersilia-idea">
            <h2 className="np-h2">The idea</h2>
            <p>
              Predicting a molecule&apos;s toxicity usually means training a fresh model per task.{" "}
              <code>chem-icl</code> skips training: it groups Ersilia model outputs into
              representation <span className="em">families</span>, selects the best features, and hands a
              labelled context to <code>TabPFN</code>, a transformer that reasons over it at inference.
              The context <span className="em">is</span> the input; nothing is fit.
            </p>
          </FadeIn>

          <FadeIn className="np-body np-col" id="ersilia-pipeline">
            <h2 className="np-h2">The pipeline</h2>
            <pre className="np-pipeline">{PIPELINE}</pre>
            <p>
              Molecules resolve cheapest-first: local store → cloud lake → a one-off run, cached back.
              Every model must cover every molecule.
            </p>
          </FadeIn>

          <FadeIn className="np-body np-col" id="ersilia-benchmark">
            <h2 className="np-h2">What the benchmark says</h2>
          </FadeIn>
          <FadeIn className="np-media np-col">
            <figure>
              <div className="np-glass">
                <img src="/images/ersilia/benchmark.png" alt="family_stack vs family_concat across 9 TDC tasks: a dead heat" />
              </div>
              <figcaption className="np-caption">
                Per-family stacking vs. a plain concat, over nine TDC ADME/Tox tasks × ten seeds — a
                dead heat. So <code>chem-icl</code> ships the simpler concat as default.
              </figcaption>
            </figure>
          </FadeIn>
        </div>

        <ScrollDashboard steps={ERSILIA_STEPS} ariaLabel="chem-icl — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/ersilia-os/chem-icl" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href="https://ersilia.io/" target="_blank" rel="noreferrer">
          Live website ↗
        </a>
      </FadeIn>
    </section>
  );
}
