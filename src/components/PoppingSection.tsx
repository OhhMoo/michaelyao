import { FadeIn } from "./FadeIn";
import { LiveFrame } from "./LiveFrame";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * essay prose itself (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const POPPING_STEPS: DashboardStep[] = [
  {
    id: "popping-site",
    tag: "01 / 02",
    label: "Popping dictionary — now viewing",
    heading: "The site",
    meta: "Entries organized by level, with an alphabetical index",
    stats: [{ k: "Dictionary moves", v: "18" }],
  },
  {
    id: "popping-live",
    tag: "02 / 02",
    label: "Popping dictionary — now viewing",
    heading: "The live site",
    meta: "Every video self-hosted — nothing depends on the old platform",
    stats: [{ k: "Live at", v: "poppindex.com" }],
  },
];

export function PoppingSection() {
  return (
    <section className="npage npage--popping" id="popping">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">A popping dictionary, move by move</h1>
        <p className="np-subhead">
          A curated dictionary of popping dance elements — <span className="em">18 moves</span> from
          Fresno to Crazy Leg, each with history, technique breakdowns, practice clips, and the
          dancers who defined them. Originally built on Wix, now rebuilt as a static Next.js site
          and self-hosted at <span className="em">poppindex.com</span>.
        </p>
      </FadeIn>

      {/* The .essay-dash split adds the sticky ScrollDashboard alongside the
          reading column (desktop ≥1280px only); all prose and the wide live
          embed stay inside .essay-dash-main. */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="np-body np-col" id="popping-site">
            <h2 className="np-h2">The site</h2>
            <p>
              Entries are organized by level — basic and advanced leg, arm, and stylistic elements —
              with an alphabetical index, per-element video references, and a gallery of legendary
              poppers. Every video is self-hosted; nothing depends on the old platform.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-wide" id="popping-live">
            <figure>
              <LiveFrame
                src="https://poppindex.com/"
                url="poppindex.com"
                title="Popping Dictionary — live site"
              />
              <figcaption className="np-caption">The live site — browse the dictionary right here.</figcaption>
            </figure>
          </FadeIn>
        </div>

        <ScrollDashboard steps={POPPING_STEPS} ariaLabel="Popping dictionary — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://poppindex.com/" target="_blank" rel="noreferrer">
          Live website ↗
        </a>
        <a href="https://github.com/OhhMoo/poppingdictionary" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
