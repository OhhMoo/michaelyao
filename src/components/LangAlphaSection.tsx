import { FadeIn } from "./FadeIn";
import { LiveFrame } from "./LiveFrame";

const PIPELINE = `question → plan → sandbox (agent.md memory)
   → 23 finance skills → stream over SSE / WebSocket
   → cited, source-tracked brief`;

export function LangAlphaSection() {
  return (
    <section className="npage npage--langalpha" id="langalpha">
      <FadeIn className="np-head np-col">
        <div className="np-eyebrow">Project</div>
        <div className="np-date">Multi-agent systems</div>
        <h1 className="np-headline">A research memory, on purpose</h1>
        <p className="np-subhead">
          An open-source agentic investing platform (1.5k+ stars). Each investigation runs in its
          own sandbox with a written <code>agent.md</code> memory the agent reads, appends, and cites
          — so long research tasks stay grounded instead of drifting.
        </p>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The pipeline</h2>
        <pre className="np-pipeline">{PIPELINE}</pre>
        <p>
          Live market data and per-turn source provenance stream to the UI while the agent works;
          nothing is asserted without a citation.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-wide">
        <figure>
          <LiveFrame
            src="https://ginlix.ai/home"
            url="ginlix.ai"
            title="Ginlix — the live LangAlpha platform"
          />
          <figcaption className="np-caption">The live platform — browse it right here.</figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/ginlix-ai/LangAlpha" target="_blank" rel="noreferrer">
          LangAlpha on GitHub ↗
        </a>
        <a href="https://ginlix.ai/home" target="_blank" rel="noreferrer">
          ginlix.ai ↗
        </a>
      </FadeIn>
    </section>
  );
}
