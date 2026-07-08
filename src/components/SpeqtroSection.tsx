import { FadeIn } from "./FadeIn";

const PIPELINE = `spectra ─┬─ IR  → functional groups        (SSIN)
         ├─ NMR → candidates + ¹³C shifts   (ChefNMR · CASCADE → DP4)
         └─ MS  → fragment match            (ICEBERG)
                              └─ ensemble → ranked structures`;

export function SpeqtroSection() {
  return (
    <section className="rpage rpage--speqtro" id="speqtro">
      <FadeIn className="rp-hero">
        <div className="rp-lattice" aria-hidden />
        <div className="rp-eyebrow">Agentic AI · Spectroscopy</div>
        <h1 className="rp-headline">
          Name a molecule
          <br />
          <span className="rp-script">from its spectra.</span>
        </h1>
        <p className="rp-lede">
          Structure elucidation is slow, expert work. SPEQTRO is an autonomous agent that reads NMR,
          IR, and MS spectra, runs six specialist ML models, and returns ranked structures — showing
          its reasoning at each step.
        </p>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The pipeline</div>
        <div className="rp-block-body">
          <pre className="rp-pipeline">{PIPELINE}</pre>
          <p className="rp-caption">
            Each spectrum type contributes independent evidence; a final ensemble combines all four
            into one ranked answer. Nothing is a black box — every model&apos;s call is logged.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">In one line</div>
        <div className="rp-block-body">
          <p>
            15 built-in tools, 6 vendored ML models, 4 evidence streams, 34 tests. Runs as a CLI, a
            web GUI, or an <code>MCP</code> server inside Claude or Cursor. Reads JCAMP-DX, Bruker
            FID, CSV peaks, or an image of a spectrum.
          </p>
          <figure className="rp-figure">
            <div className="rp-macwin">
              <div className="rp-macbar" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <img src="/images/works/speqtro.gif" alt="SPEQTRO agent analysing a spectrum in the terminal" />
            </div>
            <figcaption>The agent working an unknown structure from the command line.</figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-links">
        <a href="https://github.com/OhhMoo/SPEQTRO" target="_blank" rel="noreferrer">
          SPEQTRO on GitHub ↗
        </a>
        <span style={{ color: "var(--text-2)", fontFamily: "var(--ff-label), sans-serif", fontSize: "0.95rem" }}>
          pip install speqtro
        </span>
      </FadeIn>
    </section>
  );
}
