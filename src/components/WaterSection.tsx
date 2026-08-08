import { FadeIn } from "./FadeIn";
import { EssayFootnotes } from "./EssayFootnotes";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * essay prose itself (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const WATER_STEPS: DashboardStep[] = [
  {
    id: "water-method",
    tag: "01 / 03",
    label: "Water study — now viewing",
    heading: "The method",
    meta: "Hybrid density-denoising pipeline, DBSCAN → GMM",
    stats: [
      { k: "Order parameters", v: "4" },
      { k: "Structural populations", v: "2" },
    ],
  },
  {
    id: "water-validation",
    tag: "02 / 03",
    label: "Water study — now viewing",
    heading: "The validation",
    meta: "Held-out S(k) computed straight from atomic coordinates",
    stats: [
      { k: "LFTS first peak k_T1", v: "0.81" },
      { k: "DNLS first peak k_D1", v: "1.05" },
      { k: "Shared descriptors", v: "0" },
    ],
  },
  {
    id: "water-generality",
    tag: "03 / 03",
    label: "Water study — now viewing",
    heading: "Generality",
    meta: "Deep supercooling → ambient conditions",
    stats: [
      { k: "Independent water models", v: "3" },
      { k: "Signature", v: "TIP4P/2005 · TIP5P · SWM4-NDP" },
    ],
  },
];

export function WaterSection() {
  return (
    <section className="npage npage--water" id="water">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">Two states of water, made visible</h1>
        <p className="np-subhead">
          Is liquid water one continuum, or a mixture of two local structures? A century-old debate,
          because both pictures fit the same bulk data. Unsupervised clustering decides — validated
          against an observable the clustering never saw.
        </p>
      </FadeIn>

      {/* Everything below shares one `.essay` ancestor (footnote styling).
          The .essay-dash split adds the sticky ScrollDashboard alongside the
          reading column (desktop ≥1280px only). */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="essay-epigraph np-col">
            <p>Is liquid water one continuum, or a mixture of two local structures?</p>
          </FadeIn>

          <FadeIn className="np-media np-col">
            <figure>
              <div className="np-glass">
                <img
                  src="/images/research/water/0-flowchart.png"
                  alt="Flowchart from molecular-dynamics trajectories through feature extraction, GMM fitting, and likelihood-ratio classification into LFTS, transitional, and DNLS water structures"
                />
              </div>
              <figcaption className="np-caption">
                From molecular-dynamics trajectories to an unsupervised classification of locally
                favoured tetrahedral and disordered normal-liquid structures.
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="np-col" id="water-method">
            <h2 className="np-h2">The method</h2>
            <p>
              I ran molecular dynamics on <span className="em">TIP4P/2005</span> and{" "}
              <span className="em">TIP5P</span>
              <sup className="essay-footnote-ref">1</sup>{" "}
              water and described each molecule by four order parameters — tetrahedral order{" "}
              <code>q</code>, <code>LSI</code>, <code>S</code>
              <sub>k</sub>, and translational order <code>ζ</code>. A hybrid density-denoising pipeline
              (<code>DBSCAN → GMM</code>)
              <sup className="essay-footnote-ref">2</sup>{" "}
              gave the clearest split: two structurally distinct populations — locally favoured
              tetrahedral structures (LFTS) and disordered normal-liquid structures (DNLS) — emerge on
              their own.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-col">
            <figure>
              <div className="np-glass">
                <img src="/images/research/water/1-clustering.png" alt="Order-parameter density resolved into LFTS and DNLS clusters" />
              </div>
              <figcaption className="np-caption">
                One diffuse cloud of molecules (left) resolves into two clean populations across every
                order parameter (right). No labels were given; the split is the data&apos;s own.
              </figcaption>
            </figure>
          </FadeIn>

          {/* The two populations, rendered live. Both panes are self-contained
              Plotly scenes (~3.9 MB each), so they load lazily — drag to
              rotate, scroll to zoom. */}
          <FadeIn className="np-media np-col" id="water-models">
            <figure>
              <div className="pair-live-grid">
                <div className="pair-live-pane">
                  <iframe
                    src="/plotly/water-3d-cluster0.html"
                    title="Interactive 3D density surface for the low-density LFTS water cluster"
                    loading="lazy"
                  />
                </div>
                <div className="pair-live-pane">
                  <iframe
                    src="/plotly/water-3d-cluster1.html"
                    title="Interactive 3D density surface for the higher-density DNLS water cluster"
                    loading="lazy"
                  />
                </div>
              </div>
              <figcaption className="np-caption">
                Each population as its own 3D density surface — the low-density LFTS cluster (left)
                and the higher-density DNLS cluster (right). Drag to rotate, scroll to zoom.
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="np-col" id="water-validation">
            <h2 className="np-h2">The validation</h2>
            <p>
              Clusters are easy to draw and hard to trust. So I tested them against something the
              clustering never saw: the per-cluster oxygen–oxygen structure factor <code>S(k)</code>,
              computed straight from atomic coordinates. The LFTS cluster peaks at <code>k</code>
              <sub>T1</sub> ≈ 0.81, the DNLS cluster at <code>k</code>
              <sub>D1</sub> ≈ 1.05 — exactly where two-state theory predicts. Since clustering and
              validation share no descriptor, the agreement is model-independent.
              <sup className="essay-footnote-ref">3</sup>
            </p>
          </FadeIn>
          <FadeIn className="np-media np-col">
            <figure>
              <div className="np-glass">
                <img src="/images/research/water/2-validation.png" alt="Per-cluster structure factors with distinct first diffraction peaks that superpose into the total" />
              </div>
              <figcaption className="np-caption">
                Each cluster carries its own first diffraction peak; together they superpose into the
                total <code>S(k)</code> of real water.
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="np-col" id="water-generality">
            <h2 className="np-h2">Generality</h2>
            <p>
              The two-state signature is not an artefact of one model or temperature. It holds from
              deep supercooling to ambient conditions, and across three independent water models.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-col">
            <figure>
              <div className="np-glass">
                <img src="/images/research/water/3-generality.png" alt="Structure factors and population fractions across temperature and across water models" />
              </div>
              <figcaption className="np-caption">
                The LFTS fraction shifts smoothly with temperature and the peaks persist across
                TIP4P/2005, TIP5P, and SWM4-NDP.
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="np-col">
            <EssayFootnotes
              notes={[
                {
                  text: "TIP4P/2005 and TIP5P are rigid, point-charge parameterizations of the water molecule built for molecular-dynamics simulation — along with SWM4-NDP, the third model used in the generality check below, these are three independently developed descriptions of the same substance.",
                },
                {
                  text: "DBSCAN is a density-based clustering step that strips out sparse, ambiguous points without requiring a fixed cluster count in advance; the GMM (Gaussian mixture model) that follows then fits soft, probabilistic memberships to whatever populations DBSCAN leaves behind.",
                },
                {
                  text: "\u201CModel-independent\u201D here means the same two-population split shows up whether you look at the four order parameters used to build the clusters or at S(k) computed straight from atomic coordinates — since the clustering step and the validation step never share a descriptor, one can't have quietly leaked into the other.",
                },
                {
                  text: "The two-state framing tested here follows the Shi & Tanaka hypothesis for structural heterogeneity in liquid water.",
                },
                {
                  text: (
                    <>
                      Code and analysis:{" "}
                      <a href="https://github.com/OhhMoo/Water_Clustering" target="_blank" rel="noreferrer">
                        github.com/OhhMoo/Water_Clustering
                      </a>
                    </>
                  ),
                },
              ]}
            />
          </FadeIn>
        </div>

        <ScrollDashboard steps={WATER_STEPS} ariaLabel="Water study — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/Water_Clustering" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
