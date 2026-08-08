import { FadeIn } from "./FadeIn";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

const PIPELINE = `spectra ─┬─ IR  → functional groups        (SSIN)
         ├─ NMR → candidates + ¹³C shifts   (ChefNMR · CASCADE → DP4)
         └─ MS  → fragment match            (ICEBERG)
                              └─ ensemble → ranked structures`;

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * essay prose itself (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const SPEQTRO_STEPS: DashboardStep[] = [
  {
    id: "speqtro-pipeline",
    tag: "01 / 03",
    label: "SPEQTRO — now viewing",
    heading: "The pipeline",
    meta: "Each spectrum type contributes independent evidence",
    stats: [{ k: "Ensemble inputs", v: "4" }],
  },
  {
    id: "speqtro-in-one-line",
    tag: "02 / 03",
    label: "SPEQTRO — now viewing",
    heading: "In one line",
    meta: "CLI, web GUI, or MCP server inside Claude or Cursor",
    stats: [
      { k: "Built-in tools", v: "15" },
      { k: "Vendored ML models", v: "6" },
      { k: "Tests", v: "34" },
    ],
  },
  {
    id: "speqtro-demo",
    tag: "03 / 03",
    label: "SPEQTRO — now viewing",
    heading: "The agent at work",
    meta: "An unknown structure worked from the command line",
  },
];

export function SpeqtroSection() {
  return (
    <section className="npage npage--speqtro" id="speqtro">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">Name a molecule from its spectra</h1>
        <p className="np-subhead">
          Structure elucidation is slow, expert work. SPEQTRO is an autonomous agent that reads NMR,
          IR, and MS spectra, runs six specialist ML models, and returns ranked structures — showing
          its reasoning at each step.
        </p>
      </FadeIn>

      {/* The .essay-dash split adds the sticky ScrollDashboard alongside the
          reading column (desktop ≥1280px only). */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="np-body np-col" id="speqtro-pipeline">
            <h2 className="np-h2">The pipeline</h2>
            <pre className="np-pipeline">{PIPELINE}</pre>
            <p>
              Each spectrum type contributes independent evidence; a final ensemble combines all four
              into one ranked answer. Nothing is a black box — every model&apos;s call is logged.
            </p>
          </FadeIn>

          <FadeIn className="np-body np-col" id="speqtro-in-one-line">
            <h2 className="np-h2">In one line</h2>
            <p>
              15 built-in tools, 6 vendored ML models, 4 evidence streams, 34 tests. Runs as a CLI, a
              web GUI, or an <code>MCP</code> server inside Claude or Cursor. Reads JCAMP-DX, Bruker
              FID, CSV peaks, or an image of a spectrum.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-col" id="speqtro-demo">
            <figure>
              <div className="rp-macwin">
                <img src="/images/works/speqtro.gif" alt="SPEQTRO agent analysing a spectrum in the terminal" />
              </div>
              <figcaption className="np-caption">The agent working an unknown structure from the command line.</figcaption>
            </figure>
          </FadeIn>
        </div>

        <ScrollDashboard steps={SPEQTRO_STEPS} ariaLabel="SPEQTRO — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/SPEQTRO" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
