import type { ReactNode } from "react";

import { water } from "@/data/blog";

import { AppendixFigure, Divider, M, Memo, Table } from "./Memo";
import { ThresholdExhibit } from "./ThresholdExhibit";
import { WarmingExhibit } from "./WarmingExhibit";

const CODE = "https://zenodo.org/records/23351258";

const GLANCE: [ReactNode, ReactNode][] = [
  ["Question", "Is liquid water one structure or two?"],
  ["Data", "Molecular dynamics of 1,024 molecules, three water models"],
  ["Features", "Four order parameters per molecule"],
  ["Method", "Gaussian mixture plus a likelihood-ratio threshold"],
  ["Key result", "Two states in cold water that merge as it warms"],
  ["Status", "Under review at PNAS"],
  ["Advisor", "Bilin Zhuang"],
];

const PARAMETERS: [ReactNode, ReactNode][] = [
  [<M key="q">q</M>, "How close the four nearest neighbours come to a perfect tetrahedron"],
  [
    <M key="s">
      s<sub>k</sub>
    </M>,
    "How evenly spaced those four neighbours are",
  ],
  ["LSI", "How clean the gap is between the first and second neighbour shells"],
  [<M key="z">ζ</M>, "How far the nearest non-bonded neighbour sits beyond the hydrogen-bonded ones"],
];

export function WaterMemo() {
  return (
    <Memo labelledBy="water-title">
      <div className="l notice">
        <h1 className="hero-title" id="water-title">
          {water.title}
        </h1>
      </div>
      <div className="l notice dim">
        <span>{water.date}</span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Water is the most familiar liquid there is, and one of the strangest. It is densest at 4 °C, above its
          freezing point, and it gets easier to squeeze as it cools. For more than a century people have argued about
          why: is liquid water one continuous network of hydrogen bonds, or a mixture of two kinds of local
          arrangement that keep turning into each other?
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          We built an unsupervised machine-learning method to look for those two arrangements in simulated water,
          molecule by molecule. Its one rule is to leave room for doubt: a molecule that does not clearly belong to
          either group is set aside rather than forced into one.
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The answer depends on temperature. In cold water the two groups are distinct, and they look different to
          X-rays; as the water warms, they merge into one. Both sides of the old argument are right, each in its own
          temperature range.
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
            CODE AND DATA ON ZENODO
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        </span>
      </div>
      <div className="l" />
      <div className="l c gap">
        <h2>01. THE QUESTION</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The argument is nearly as old as the subject. Röntgen proposed in 1892 that liquid water contains two forms;
          later, mixture models like Pauling&apos;s competed with Pople&apos;s picture of a single, continuously
          distorted network, and diffraction found evidence for both without ruling either out. Tanaka and
          colleagues gave the mixture side a concrete form: water keeps switching between locally favoured
          tetrahedral structures (LFTS), which are more ordered and less dense, and disordered normal-liquid
          structures (DNLS), which are denser and less ordered.
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The catch is that the two overlap. Plot almost any structural measure and you see one broad hump rather
          than two clean peaks, so a hard cutoff cannot say which state a given molecule is in.
        </span>
      </div>
      <div className="l" />
      <div className="l c gap">
        <h2>02. FOUR NUMBERS PER MOLECULE</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          We simulated 1,024 water molecules with the TIP4P/2005 model at −20 °C, three independent times, keeping
          1,000 frames from each run: about a million snapshots of single molecules per run. Each molecule is then
          described by four standard order parameters, each scaled to the range 0 to 1.
        </span>
      </div>
      <div className="l" />
      <Table head={["Parameter", "What it measures"]} rows={PARAMETERS} />
      <div className="l" />
      <div className="l c gap">
        <h2>03. LEAVE ROOM FOR DOUBT</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The obvious tools draw a hard line. K-means splits the molecules 58 to 42 percent, and a two-component
          Gaussian mixture gives essentially the same split, but both cut straight through a crowded region: their
          silhouette scores, which rate how much closer each molecule sits to its own group than to the other, are
          only 0.24 and 0.21.
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          So we keep the Gaussian mixture but change the decision. For each molecule we compare how likely its four
          numbers are under the high-ζ group H and under the low-ζ group L.
        </span>
      </div>
      <div className="l" />
      <div className="l eq">
        <span>
          Λ(x) = log p<sub>H</sub>(x) − log p<sub>L</sub>(x)
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          A molecule joins H when Λ ≥ τ, joins L when Λ ≤ −τ, and is set aside as transitional otherwise. The sign of
          Λ alone decides the group, so τ only controls how many borderline molecules are held back. With τ = 2,
          about 10% are set aside, 32.5% land in H and 57.7% in L, and the silhouette rises to 0.340, the best of the
          methods we tried. Exhibit A runs the same rule on a toy version of the problem.
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <ThresholdExhibit />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>04. CHECKING WITH X-RAYS</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          A clean split in feature space does not prove the two groups are physically different. For that we
          computed each group&apos;s structure factor S(k), the quantity measured in X-ray and neutron scattering,
          using only molecules from that group.
        </span>
      </div>
      <div className="l" />
      <div className="l eq">
        <span>
          S<sub>i</sub>(k) = 1 + Σ<sub>j≠i</sub> sin(k r<sub>ij</sub>) / (k r<sub>ij</sub>) · W(r<sub>ij</sub>)
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The H group shows a first sharp diffraction peak at k r<sub>OO</sub>/2π ≈ 0.82, the fingerprint of a
          tetrahedral network. The L group peaks at 1.06, where an ordinary dense liquid does, with no sharp peak at
          all. So H is the LFTS and L is the DNLS. The transitional molecules, treated the same way, give an almost
          featureless curve: they carry no structure of their own.
        </span>
      </div>
      <div className="l" />
      <div className="l c gap">
        <h2>05. WARMING UP</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Then we applied the same classifier, unchanged, to simulations from −30 °C to +90 °C. The tetrahedral state
          shrinks steadily as the water warms: it is 41% of the classified molecules at −30 °C, 16% at +30 °C and 7%
          at +90 °C. Its sharp diffraction peak fades too, while the dense state&apos;s peak barely moves; by room
          temperature the two structure factors are nearly indistinguishable.
        </span>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          Another way to see the merge: keeping the two groups equally well separated takes setting aside almost no
          molecules at −30 °C, but a third of the liquid at +30 °C. Cold water is a mixture of two structural states;
          warm water is one.
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <WarmingExhibit />
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>06. WHAT&apos;S NEXT</h2>
      </div>
      <div className="l" />
      <div className="l para">
        <span>
          The method has a single tunable parameter, τ, and it keeps the rule that sorts molecules separate from the
          measurement that checks the sort. The same picture holds in two other water models, TIP5P and SWM4-NDP.
          Nothing in it is specific to water, so it should carry over to other liquids, glasses and amorphous
          materials where structural states overlap.
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>NOTES</h2>
      </div>
      <div className="l" />
      <div className="l q">
        <h3>Are these real molecules?</h3>
      </div>
      <div className="l a">
        <span>
          They are simulated, with classical molecular dynamics of three standard water models. Exhibit A is a toy;
          Exhibit B plots numbers from the paper.
        </span>
      </div>
      <div className="l" />
      <div className="l q">
        <h3>Why not just use K-means?</h3>
      </div>
      <div className="l a">
        <span>
          It draws a hard line through the crowded middle, so borderline molecules land in whichever group is
          nearer. Setting them aside keeps both groups clean.
        </span>
      </div>
      <div className="l" />
      <div className="l q">
        <h3>Where are the code and data?</h3>
      </div>
      <div className="l a">
        <span>
          <a href={CODE} target="_blank" rel="noreferrer">
            zenodo.org/records/23351258
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
          Y. Yao, D. Sanghi, A. D. Chokshi, S. Nathani, M. Jerricho, M. Choi, H. Wang and B. Zhuang. Is water a
          mixture: unsupervised likelihood-ratio classification reveals two water states that merge upon increasing
          temperature. Under review, PNAS, 2026.
        </span>
      </div>
      <div className="l ref">
        <span>[2]</span>
        <span>
          W. C. Röntgen.{" "}
          <a href="https://doi.org/10.1002/andp.18922810108" target="_blank" rel="noreferrer">
            Ueber die Constitution des flüssigen Wassers
          </a>
          . Annalen der Physik 281, 91–97, 1892.
        </span>
      </div>
      <div className="l ref">
        <span>[3]</span>
        <span>
          J. Russo and H. Tanaka.{" "}
          <a href="https://doi.org/10.1038/ncomms4556" target="_blank" rel="noreferrer">
            Understanding water&apos;s anomalies with locally favoured structures
          </a>
          . Nature Communications 5, 3556, 2014.
        </span>
      </div>
      <div className="l ref">
        <span>[4]</span>
        <span>
          R. Shi and H. Tanaka.{" "}
          <a href="https://doi.org/10.1126/sciadv.aav3194" target="_blank" rel="noreferrer">
            Distinct signature of local tetrahedral ordering in the scattering function of covalent liquids and
            glasses
          </a>
          . Science Advances 5, eaav3194, 2019.
        </span>
      </div>
      <div className="l ref">
        <span>[5]</span>
        <span>
          P. Debye.{" "}
          <a href="https://doi.org/10.1002/andp.19153510606" target="_blank" rel="noreferrer">
            Zerstreuung von Röntgenstrahlen
          </a>
          . Annalen der Physik 351, 809–823, 1915.
        </span>
      </div>
      <div className="l" />
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2 id="appendix">APPENDIX: FIGURES FROM THE PAPER</h2>
      </div>
      <div className="l" />
      <AppendixFigure
        src="/images/research/water/paper/fig1-classification.webp"
        alt="TIP4P/2005 water at minus 20 degrees: the q–ζ density before classification, the same molecules split into LFTS, DNLS and transitional groups, each group's four order parameters, and the classified scatter"
        width={1400}
        height={1248}
        caption="FIGURE A1: CLASSIFICATION AT −20 °C"
        note="TIP4P/2005"
      >
        The same molecules before and after classification in the q–ζ plane, each group&apos;s four order
        parameters, and the classified scatter: high-ζ (LFTS) in blue, low-ζ (DNLS) in red, transitional in grey.
      </AppendixFigure>
      <AppendixFigure
        src="/images/research/water/paper/fig2-workflow.webp"
        alt="The classification workflow: a molecular dynamics trajectory, four order parameters per molecule scaled to the range 0 to 1, a two-component Gaussian mixture, and a likelihood-ratio classifier that sorts molecules into LFTS, transitional and DNLS"
        width={1600}
        height={459}
        caption="FIGURE A2: THE WORKFLOW"
        note="ONE TUNABLE PARAMETER"
      >
        From the simulation to three groups: four order parameters per molecule, scaled to the range 0 to 1, a
        two-component Gaussian mixture, and the likelihood-ratio rule, whose threshold τ = 2 sets aside about 10%
        as transitional.
      </AppendixFigure>
      <AppendixFigure
        src="/images/research/water/paper/fig3-structure-factor.webp"
        alt="Group structure factors at minus 20 degrees: a first sharp diffraction peak near 0.82 for LFTS, an ordinary-liquid peak near 1.06 for DNLS, a flat curve for the transitional group, and the same split resolved along ζ"
        width={1400}
        height={1571}
        caption="FIGURE A3: STRUCTURE FACTORS AT −20 °C"
        note="PER GROUP"
      >
        Each group&apos;s S(k): a first sharp diffraction peak near 0.82 for LFTS, an ordinary-liquid peak near 1.06
        for DNLS, and a nearly flat curve for the transitional molecules; below, the same split resolved along ζ.
      </AppendixFigure>
      <AppendixFigure
        src="/images/research/water/paper/fig4-temperature.webp"
        alt="From minus 30 to plus 90 degrees: the fractions of DNLS, LFTS and transitional molecules, and each state's structure factor across the range"
        width={1600}
        height={429}
        caption="FIGURE A4: −30 TO +90 °C"
        note="FIXED CLASSIFIER"
      >
        The share of molecules in each state across the temperature range, and each state&apos;s S(k): the LFTS
        peak fades on warming while the DNLS curve barely changes.
      </AppendixFigure>
      <div className="l" />
      <div className="l c">
        <span>*** END OF NOTE ***</span>
      </div>
    </Memo>
  );
}
