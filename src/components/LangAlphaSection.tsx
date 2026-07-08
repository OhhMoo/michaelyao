import { FadeIn } from "./FadeIn";

const PIPELINE = `question → plan → sandbox (agent.md memory)
   → 23 finance skills → stream over SSE / WebSocket
   → cited, source-tracked brief`;

export function LangAlphaSection() {
  return (
    <section className="rpage rpage--langalpha" id="langalpha">
      <FadeIn className="rp-hero">
        <div className="rp-lattice" aria-hidden />
        <div className="rp-eyebrow">Multi-agent systems</div>
        <h1 className="rp-headline">
          A research memory,
          <br />
          <span className="rp-script">on purpose.</span>
        </h1>
        <p className="rp-lede">
          An open-source agentic investing platform (1.5k+ stars). Each investigation runs in its
          own sandbox with a written <code>agent.md</code> memory the agent reads, appends, and cites
          — so long research tasks stay grounded instead of drifting.
        </p>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The pipeline</div>
        <div className="rp-block-body">
          <pre className="rp-pipeline">{PIPELINE}</pre>
          <p className="rp-caption">
            Live market data and per-turn source provenance stream to the UI while the agent works;
            nothing is asserted without a citation.
          </p>
          <figure className="rp-figure">
            <img src="/images/works/langalpha/1-chart.png" alt="LangAlpha technical chart view with moving averages and RSI" />
            <figcaption>Inline financial charts with TradingView-style overlays.</figcaption>
          </figure>
          <figure className="rp-figure">
            <img src="/images/works/langalpha/2-market.png" alt="LangAlpha market overview dashboard with an AI-generated brief" />
            <figcaption>An AI-generated market brief over live data.</figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-links">
        <a href="https://github.com/ginlix-ai/LangAlpha" target="_blank" rel="noreferrer">
          LangAlpha on GitHub ↗
        </a>
        <a href="https://langalpha.com/" target="_blank" rel="noreferrer">
          langalpha.com ↗
        </a>
      </FadeIn>
    </section>
  );
}
