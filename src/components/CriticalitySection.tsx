import { FadeIn } from "./FadeIn";

export function CriticalitySection() {
  return (
    <section className="npage npage--crit" id="criticality">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">How deep can a signal go before it dies?</h1>
        <p className="np-subhead">
          A deep network is a signal passed through many layers. Whether it survives or scrambles is
          a phase transition. I use mean-field theory to predict the boundary — replicating Poole et
          al. (2016) on random <code>tanh</code> networks.
        </p>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The idea</h2>
        <p>
          Borrow the dictionary of phase transitions and point it at a network. Depth plays the
          role of distance; the correlation length becomes the number of layers a pattern can
          survive; the <span className="em">edge of chaos</span> is the knife-edge where that
          survival depth diverges. Sit there and a signal propagates through arbitrarily many
          layers without fading or scrambling — which is exactly where deep networks train best.
        </p>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">Signal length</h2>
        <p>
          The first quantity is the variance of activations, <code>q</code>. Its layer-to-layer
          map has a single stable fixed point, and both theory and simulation converge to it within
          a handful of layers — the weight scale sets where.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-col">
        <figure>
          <div className="np-glass">
            <img src="/images/research/criticality/length.png" alt="Variance map and its layer dynamics for three weight scales" />
          </div>
          <figcaption className="np-caption">
            The variance map (left) and its dynamics (right): points are simulation, curves are
            the mean-field prediction. They agree.
          </figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">Order vs. chaos</h2>
        <p>
          The second quantity is the correlation between two inputs as they descend the network.
          Below the critical weight scale every pair collapses to identical (ordered); above it,
          nearby inputs are driven apart (chaotic). The crossover is sharp.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-col">
        <figure>
          <div className="np-glass">
            <img src="/images/research/criticality/correlation.png" alt="Correlation map and correlation dynamics vs layer for ordered, critical, and chaotic regimes" />
          </div>
          <figcaption className="np-caption">
            Correlation converges to one in the ordered regime and decays in the chaotic one;
            simulation tracks theory across both.
          </figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The phase boundary</h2>
        <p>
          Setting the correlation slope <code>χ</code>
          <sub>1</sub> = 1 traces the order-to-chaos boundary across weight and bias variance —
          the line a network should be initialised on to train at any depth.
        </p>
      </FadeIn>
      <FadeIn className="np-media np-col">
        <figure>
          <div className="np-glass">
            <img src="/images/research/criticality/phase.png" alt="Fixed-point value and the chi1 = 1 order-to-chaos boundary over weight and bias scale" />
          </div>
          <figcaption className="np-caption">
            The <code>χ</code>
            <sub>1</sub> = 1 curve separates the ordered and chaotic phases in the
            (weight, bias) plane.
          </figcaption>
        </figure>
      </FadeIn>

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">What&apos;s next</h2>
        <p>
          The clean theory assumes a symmetric network. Real ones break that symmetry, blurring
          the independent modes together. The next step is a sparse autoencoder used as a
          measurement instrument — to read the hidden modes back out where the closed-form theory
          no longer holds.
        </p>
      </FadeIn>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/sae_rl" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
