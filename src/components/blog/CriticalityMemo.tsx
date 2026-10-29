import type { ReactNode } from "react";

import { criticality } from "@/data/blog";

import { CircleExhibit } from "./CircleExhibit";
import { CorrelationExhibit } from "./CorrelationExhibit";
import { LengthMapExhibit } from "./LengthMapExhibit";
import { AppendixFigure, Divider, M, Memo, Table } from "./Memo";
import { PhaseExhibit } from "./PhaseExhibit";

const CODE = "https://github.com/OhhMoo/SAE-Correlation";

const sw = (
  <>
    σ<sub>w</sub>
  </>
);
const sb = (
  <>
    σ<sub>b</sub>
  </>
);

const GLANCE: [ReactNode, ReactNode][] = [
  ["Question", "How many layers can a signal survive?"],
  ["Network", "Random weights, tanh activations"],
  [
    "Settings",
    <>
      Weight scale <M>{sw}</M>, bias scale <M>{sb}</M>
    </>,
  ],
  ["Method", "Mean-field theory, checked by simulation"],
  ["Key result", "The boundary between order and chaos"],
  ["Replicates", "Poole et al. (2016)"],
  ["Advisor", "Bilin Zhuang"],
  ["Period", "October 2025 – present"],
];

const DICTIONARY: [ReactNode, ReactNode][] = [
  ["Distance, or time", "Depth, in layers"],
  ["Two-point correlator", "Activation covariance"],
  [
    <>
      Correlation length <M>ξ</M>
    </>,
    "Survival depth: layers a pattern lasts",
  ],
  ["Critical point", "Edge of chaos"],
];

const NEXT: [ReactNode, ReactNode][] = [
  ["Normal modes", "Fourier modes of the activations"],
  ["Crystal", "Symmetric ring"],
  ["Liquid", "Broken symmetry"],
  ["Scattering experiment", "Sparse autoencoder"],
];

export function CriticalityMemo() {
  return (
    <Memo labelledBy="memo-title">
      <div className="l notice">
        <h1 className="hero-title" id="memo-title">
          {criticality.title}
        </h1>
      </div>
      <div className="l notice dim">
        <span>{criticality.date}</span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Every input to a deep neural network passes through many layers. When the weights are random, as
          they are at initialisation, one of two things happens along the way: the input&apos;s structure
          fades until all inputs look alike (order), or small differences between inputs grow until similar
          inputs look unrelated (chaos).
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Which one happens is set by two numbers: the weight scale {sw}, how spread out the random weights
          are, and the bias scale {sb}. On the boundary between order and chaos a signal survives through any
          number of layers, which is where very deep networks can still be trained.
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          This note replicates Poole et al. (2016), who locate that boundary with mean-field theory, for
          networks with tanh activations. The four exhibits below run the theory and small simulated networks
          live in your browser; figures from the research runs are in the appendix.
        </span>
      </div>
      <div className="l" />
      <div className="l" />
      <div className="l c gap">
        <span>AT A GLANCE</span>
      </div>
      <Table rows={GLANCE} />
      <div className="l" />
      <div className="l">
        <span>
          <a className="chip cta" href={CODE} target="_blank" rel="noreferrer">
            READ THE CODE ON GITHUB
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Exhibit A shows the effect directly. It takes a circle of inputs and pushes it through three random
          networks that differ only in their weight scale. With small weights the circle stays a smooth loop
          and shrinks (order); with large weights it crumples into a random walk (chaos).
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <CircleExhibit />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>01. THE IDEA</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Borrow the dictionary of phase transitions and point it at a network. Depth plays the role of
          distance, and the correlation length becomes the number of layers a pattern can survive. The edge
          of chaos is the knife-edge where that survival depth diverges: a network sitting there passes a
          signal through arbitrarily many layers without fading it or scrambling it.
        </span>
      </div>
      <div className="l" />
      <Table head={["Physics", "Network"]} rows={DICTIONARY} />
      <div className="l" />
      <div className="l c gap">
        <h2>02. TWO NUMBERS PER LAYER</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          At large width, each pre-activation is a sum of many independent random terms, so it is Gaussian. A
          whole layer then reduces to two numbers: the variance q of its pre-activations, and the correlation c
          between the images of two inputs. A layer with weight scale {sw}, bias scale {sb} and width N maps
          both forward.
        </span>
      </div>
      <div className="l" />
      <div className="l eq">
        <span>
          h<sup>l</sup> = W<sup>l</sup> tanh(h<sup>l−1</sup>) + b<sup>l</sup>, W<sub>ij</sub> ~ N(0, σ
          <sub>w</sub>
          <sup>2</sup>/N), b<sub>i</sub> ~ N(0, σ<sub>b</sub>
          <sup>2</sup>)
        </span>
      </div>
      <div className="l" />
      <div className="l c gap">
        <h2>03. SIGNAL LENGTH</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The first number is the variance. Its map from one layer to the next has a single stable fixed point
          q*, and both theory and simulation reach it within a handful of layers. The weight scale {sw} sets
          where it sits. Dz below is the standard Gaussian measure.
        </span>
      </div>
      <div className="l" />
      <div className="l eq">
        <span>
          q<sup>l</sup> = σ<sub>w</sub>
          <sup>2</sup> ∫ Dz tanh<sup>2</sup>(√q<sup>l−1</sup> z) + σ<sub>b</sub>
          <sup>2</sup>
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <LengthMapExhibit />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>04. ORDER VS. CHAOS</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The second number is the correlation between two inputs as they descend. Below the critical weight
          scale, every pair is pulled together until c = 1, and the network forgets which input it saw: order.
          Above it, nearby inputs are pushed apart until they settle at a fixed point c* below 1: chaos. The
          crossover is sharp.
        </span>
      </div>
      <div className="l" />
      <div className="l eq">
        <span>
          c<sup>l</sup> = [σ<sub>w</sub>
          <sup>2</sup> ∫ Dz<sub>1</sub> Dz<sub>2</sub> tanh(u<sub>1</sub>) tanh(u<sub>2</sub>) + σ<sub>b</sub>
          <sup>2</sup>] / q*
        </span>
      </div>
      <div className="l eq">
        <span>
          u<sub>1</sub> = √q* z<sub>1</sub>, u<sub>2</sub> = √q* (c<sup>l−1</sup> z<sub>1</sub> + √(1 − (c
          <sup>l−1</sup>)<sup>2</sup>) z<sub>2</sub>)
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <CorrelationExhibit />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>05. THE PHASE BOUNDARY</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Whether c = 1 is stable comes down to one slope, χ<sub>1</sub>: how much a small perturbation grows
          from one layer to the next. Below 1, perturbations die out and the network is ordered; above 1, they
          grow and it is chaotic. Setting χ<sub>1</sub> = 1 traces the boundary across the plane of bias and
          weight scales.
        </span>
      </div>
      <div className="l" />
      <div className="l eq">
        <span>
          χ<sub>1</sub> = σ<sub>w</sub>
          <sup>2</sup> ∫ Dz [tanh′(√q* z)]<sup>2</sup>
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Near that line the survival depth ξ = −1 / ln χ<sub>c</sub> grows without bound, where χ<sub>c</sub>{" "}
          is the slope of the correlation map at its fixed point (equal to χ<sub>1</sub> on the ordered side).
          A network initialised on the line can carry a signal through any depth, which is where very deep
          networks remain trainable [2].
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <PhaseExhibit />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>06. WHAT&apos;S NEXT: MODE-SELECTIVE CRITICALITY</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The clean theory treats every neuron alike. Give the network a symmetry instead, such as neurons on
          a ring whose connections depend only on the distance between them, and the same dictionary extends:
          the activations split into Fourier modes, and each mode gets its own critical point. The working
          hypothesis is mode-selective criticality: broad patterns survive to any depth while fine detail dies
          out, and the network&apos;s wiring alone decides which.
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          A perfectly symmetric ring keeps its modes clean and independent, like a crystal. Real networks
          break the symmetry and the modes blur together, like a liquid. That is where the closed-form theory
          stops and the next step begins: a sparse autoencoder, used the way a physicist uses a scattering
          experiment, to read the hidden modes back out.
        </span>
      </div>
      <div className="l" />
      <Table head={["Physics", "Network"]} rows={NEXT} />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>NOTES</h2>
      </div>
      <div className="l" />
      <div className="l q">
        <h3>What does mean-field mean here?</h3>
      </div>
      <div className="l a">
        <span>
          At large width each pre-activation sums many independent random terms, so it is Gaussian, and a
          layer is described by two numbers: <M>q</M> and <M>c</M>.
        </span>
      </div>
      <div className="l" />
      <div className="l q">
        <h3>Are the exhibits the research runs?</h3>
      </div>
      <div className="l a">
        <span>
          No. They run the same equations with smaller networks, in your browser. Figures from the research
          runs are in the appendix.
        </span>
      </div>
      <div className="l" />
      <div className="l q">
        <h3>Where is the code?</h3>
      </div>
      <div className="l a">
        <span>
          <a href={CODE} target="_blank" rel="noreferrer">
            github.com/OhhMoo/SAE-Correlation
          </a>
        </span>
      </div>
      <div className="l" />
      <div className="l c gap">
        <h2>REFERENCES</h2>
      </div>
      <div className="l" />
      <div className="l ref">
        <span>[1]</span>
        <span>
          B. Poole, S. Lahiri, M. Raghu, J. Sohl-Dickstein and S. Ganguli.{" "}
          <a href="https://arxiv.org/abs/1606.05340" target="_blank" rel="noreferrer">
            Exponential expressivity in deep neural networks through transient chaos
          </a>
          . NeurIPS, 2016.
        </span>
      </div>
      <div className="l ref">
        <span>[2]</span>
        <span>
          S. S. Schoenholz, J. Gilmer, S. Ganguli and J. Sohl-Dickstein.{" "}
          <a href="https://arxiv.org/abs/1611.01232" target="_blank" rel="noreferrer">
            Deep information propagation
          </a>
          . ICLR, 2017.
        </span>
      </div>
      <div className="l ref">
        <span>[3]</span>
        <span>
          H. Sompolinsky, A. Crisanti and H.-J. Sommers.{" "}
          <a href="https://doi.org/10.1103/PhysRevLett.61.259" target="_blank" rel="noreferrer">
            Chaos in random neural networks
          </a>
          . Physical Review Letters 61, 259, 1988.
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2 id="appendix">APPENDIX: FIGURES FROM THE RESEARCH RUNS</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          These come from the research code rather than the browser: the experiments behind Exhibits A to C,
          with simulations at width 1,000.
        </span>
      </div>
      <div className="l" />
      <AppendixFigure
        src="/images/research/criticality/circle.png"
        alt="A circle propagated to layer 10 at three weight scales: a smooth loop at 1.2, a wrinkled loop at 2.5 and a jagged random walk at 4.0"
        width={1400}
        height={484}
        caption="FIGURE A1: A CIRCLE AT LAYER 10"
        note={<>{sw} 1.2 · 2.5 · 4.0</>}
      >
        The same circle of inputs after ten layers. At {sw} = 1.2 it is still a smooth loop, at 2.5 it wrinkles,
        and at 4.0 it is a random walk.
      </AppendixFigure>
      <AppendixFigure
        src="/images/research/criticality/length.png"
        alt="Length map at three weight scales with the identity line, and the variance against depth: simulation points sit on the mean-field curves"
        width={1400}
        height={534}
        caption="FIGURE A2: LENGTH MAP AND DYNAMICS"
        note="THEORY VS. SIMULATION"
      >
        Left: the length map at three weight scales, against the identity line. Right: the variance against
        depth. Simulation points sit on the mean-field curves, and every start reaches its fixed point within a
        few layers.
      </AppendixFigure>
      <AppendixFigure
        src="/images/research/criticality/correlation.png"
        alt="Correlation map at three weight scales with the identity line, and the correlation against depth: ordered pairs climb to 1, chaotic pairs settle below it"
        width={1400}
        height={533}
        caption="FIGURE A3: CORRELATION MAP AND DYNAMICS"
        note="THEORY VS. SIMULATION"
      >
        Left: the correlation map. Right: the correlation against depth from three starting values. At {sw} =
        1.2 every pair climbs to c = 1; at 2.5 and 4.0 the pairs settle at a fixed point below 1.
      </AppendixFigure>
      <div className="l" />
      <div className="l c">
        <span>*** END OF NOTE ***</span>
      </div>
    </Memo>
  );
}
