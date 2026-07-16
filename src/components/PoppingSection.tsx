import { FadeIn } from "./FadeIn";
import { LiveFrame } from "./LiveFrame";

export function PoppingSection() {
  return (
    <section className="rpage rpage--popping" id="popping">
      <FadeIn className="rp-hero">
        <div className="rp-lattice" aria-hidden />
        <div className="rp-eyebrow">Side quest · Dance archive</div>
        <h1 className="rp-headline">
          A popping dictionary,
          <br />
          <span className="rp-script">move by move.</span>
        </h1>
        <p className="rp-lede">
          A curated dictionary of popping dance elements — <span className="em">18 moves</span> from
          Fresno to Crazy Leg, each with history, technique breakdowns, practice clips, and the
          dancers who defined them. Originally built on Wix, now rebuilt as a static Next.js site
          and self-hosted at <span className="em">poppindex.com</span>.
        </p>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The site</div>
        <div className="rp-block-body">
          <p>
            Entries are organized by level — basic and advanced leg, arm, and stylistic elements —
            with an alphabetical index, per-element video references, and a gallery of legendary
            poppers. Every video is self-hosted; nothing depends on the old platform.
          </p>
          <figure className="rp-figure">
            <LiveFrame
              src="https://poppindex.com/"
              url="poppindex.com"
              title="Popping Dictionary — live site"
            />
            <figcaption>The live site — browse the dictionary right here.</figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-links">
        <a href="https://poppindex.com/" target="_blank" rel="noreferrer">
          poppindex.com ↗
        </a>
        <a href="https://github.com/OhhMoo/poppingdictionary" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
