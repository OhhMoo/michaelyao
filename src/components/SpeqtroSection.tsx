import { FadeIn } from "./FadeIn";

const PIPELINE = `spectra ─┬─ IR  → functional groups        (SSIN)
         ├─ NMR → candidates + ¹³C shifts   (ChefNMR · CASCADE → DP4)
         └─ MS  → fragment match            (ICEBERG)
                              └─ ensemble → ranked structures`;

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

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The pipeline</h2>
        <pre className="np-pipeline">{PIPELINE}</pre>
        <p>
          Each spectrum type contributes independent evidence; a final ensemble combines all four
          into one ranked answer. Nothing is a black box — every model&apos;s call is logged.
        </p>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">In one line</h2>
        <p>
          15 built-in tools, 6 vendored ML models, 4 evidence streams, 34 tests. Runs as a CLI, a
          web GUI, or an <code>MCP</code> server inside Claude or Cursor. Reads JCAMP-DX, Bruker
          FID, CSV peaks, or an image of a spectrum.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-wide">
        <figure>
          <div className="rp-macwin">
            <div className="rp-macbar" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <img src="/images/works/speqtro.gif" alt="SPEQTRO agent analysing a spectrum in the terminal" />
          </div>
          <figcaption className="np-caption">The agent working an unknown structure from the command line.</figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/SPEQTRO" target="_blank" rel="noreferrer">
          SPEQTRO on GitHub ↗
        </a>
        <span className="np-note">pip install speqtro</span>
      </FadeIn>
    </section>
  );
}
