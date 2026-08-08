import { FadeIn } from "./FadeIn";
import { LiveFrame } from "./LiveFrame";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

const PIPELINE = `question → plan → sandbox (agent.md memory)
   → 23 finance skills → stream over SSE / WebSocket
   → cited, source-tracked brief`;

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * page's own prose (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const LANGALPHA_STEPS: DashboardStep[] = [
  {
    id: "langalpha-pipeline",
    tag: "01 / 02",
    label: "LangAlpha — now viewing",
    heading: "The pipeline",
    meta: "Sandboxed investigations with a written agent.md memory",
    stats: [{ k: "Finance skills", v: "23" }],
  },
  {
    id: "langalpha-live",
    tag: "02 / 02",
    label: "LangAlpha — now viewing",
    heading: "The live platform",
    meta: "Open-source agentic investing platform — browse it right here",
    stats: [{ k: "GitHub stars", v: "1.5k+" }],
  },
];

export function LangAlphaSection() {
  return (
    <section className="npage npage--langalpha" id="langalpha">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">A research memory, on purpose</h1>
        <p className="np-subhead">
          An open-source agentic investing platform (1.5k+ stars). Each investigation runs in its
          own sandbox with a written <code>agent.md</code> memory the agent reads, appends, and cites
          — so long research tasks stay grounded instead of drifting.
        </p>
      </FadeIn>

      {/* The .essay-dash split adds the sticky ScrollDashboard alongside the
          reading column (desktop ≥1280px only); .np-wide embeds stay inside
          .essay-dash-main and adapt to the narrower column automatically. */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="np-body np-col" id="langalpha-pipeline">
            <h2 className="np-h2">The pipeline</h2>
            <pre className="np-pipeline">{PIPELINE}</pre>
            <p>
              Live market data and per-turn source provenance stream to the UI while the agent works;
              nothing is asserted without a citation.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-wide" id="langalpha-live">
            <figure>
              <LiveFrame
                src="https://ginlix.ai/home"
                url="ginlix.ai"
                title="Ginlix — the live LangAlpha platform"
                showAddress={false}
              />
              <figcaption className="np-caption">The live platform — browse it right here.</figcaption>
            </figure>
          </FadeIn>
        </div>

        <ScrollDashboard steps={LANGALPHA_STEPS} ariaLabel="LangAlpha — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/ginlix-ai/LangAlpha" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href="https://ginlix.ai/home" target="_blank" rel="noreferrer">
          Live website ↗
        </a>
      </FadeIn>
    </section>
  );
}
