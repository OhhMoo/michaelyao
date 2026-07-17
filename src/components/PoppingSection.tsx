import { FadeIn } from "./FadeIn";
import { LiveFrame } from "./LiveFrame";

export function PoppingSection() {
  return (
    <section className="npage npage--popping" id="popping">
      <FadeIn className="np-head np-col">
        <div className="np-eyebrow">Side quest</div>
        <div className="np-date">Dance archive · poppindex.com</div>
        <h1 className="np-headline">A popping dictionary, move by move</h1>
        <p className="np-subhead">
          A curated dictionary of popping dance elements — <span className="em">18 moves</span> from
          Fresno to Crazy Leg, each with history, technique breakdowns, practice clips, and the
          dancers who defined them. Originally built on Wix, now rebuilt as a static Next.js site
          and self-hosted at <span className="em">poppindex.com</span>.
        </p>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The site</h2>
        <p>
          Entries are organized by level — basic and advanced leg, arm, and stylistic elements —
          with an alphabetical index, per-element video references, and a gallery of legendary
          poppers. Every video is self-hosted; nothing depends on the old platform.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-wide">
        <figure>
          <LiveFrame
            src="https://poppindex.com/"
            url="poppindex.com"
            title="Popping Dictionary — live site"
          />
          <figcaption className="np-caption">The live site — browse the dictionary right here.</figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-links np-col">
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
