import { FadeIn } from "./FadeIn";
import { ScrollDashboard, type DashboardStep } from "./ScrollDashboard";

const PIPELINE = `molecule → RDKit → PyG Data → MAGMa fragment DAG
   → Batch.from_data_list → GNN message passing (GGNN · PNA · GINE)
   → per-fragment intensities → predicted MS/MS spectrum`;

/**
 * Scroll-driven dashboard steps — every number is taken verbatim from the
 * essay prose itself (no invented stats). The `id`s anchor to the FadeIn
 * block opening each section; useSectionProgress tweens between them.
 */
const MSPRED_STEPS: DashboardStep[] = [
  {
    id: "mspred-pipeline",
    tag: "01 / 02",
    label: "ICEBERG PyG port — now viewing",
    heading: "The pipeline",
    meta: "Two-stage model: fragment generation, then intensity prediction",
    stats: [
      { k: "Pipeline stages", v: "2" },
      { k: "GNN families", v: "3" },
      { k: "Architectures", v: "GGNN · PNA · GINE" },
    ],
  },
  {
    id: "mspred-port",
    tag: "02 / 02",
    label: "ICEBERG PyG port — now viewing",
    heading: "The port",
    meta: "torch_scatter in place of DGL's update_all",
    stats: [
      { k: "Files ported", v: "19" },
      { k: "Remaining DGL imports", v: "0" },
    ],
  },
];

export function MsPredSection() {
  return (
    <section className="npage npage--mspred" id="ms-pred">
      <FadeIn className="np-head np-col">
        <h1 className="np-headline">Same model, new framework</h1>
        <p className="np-subhead">
          ICEBERG predicts a molecule&apos;s tandem mass spectrum from its fragmentation graph. I
          ported the full pipeline from DGL to PyTorch Geometric — 19 files, three GNN families,
          zero change in behaviour.
        </p>
      </FadeIn>

      {/* Everything below shares one `.essay` ancestor; the inner .essay-dash
          split adds the sticky ScrollDashboard alongside the reading column
          (desktop ≥1280px only). */}
      <div className="essay essay-dash">
        <div className="essay-dash-main">
          <FadeIn className="np-body np-col" id="mspred-pipeline">
            <h2 className="np-h2">The pipeline</h2>
            <pre className="np-pipeline">{PIPELINE}</pre>
            <p>
              A molecule becomes a fragment DAG, each fragment a graph; a two-stage model generates the
              fragments, then predicts their intensities into a binned spectrum.
            </p>
          </FadeIn>
          <FadeIn className="np-media np-col">
            <figure>
              <div className="np-glass">
                <img src="/images/projects/ms-pyg-teaser.png" alt="Precursor molecule through a collision cell to a learned neural simulator predicting the mass spectrum" />
              </div>
              <figcaption className="np-caption">Precursor → fragmentation → learned simulator → predicted spectrum.</figcaption>
            </figure>
          </FadeIn>

          <FadeIn className="np-body np-col" id="mspred-port">
            <h2 className="np-h2">The port</h2>
            <p>
              Custom layers were rebuilt PyG-style with <code>torch_scatter</code> in place of DGL&apos;s{" "}
              <code>update_all</code>: <code>dgl.batch</code> → <code>Batch.from_data_list</code>, node/edge
              stores → <code>data.x</code> / <code>edge_attr</code>, pooling → <code>global_mean_pool</code>.
              Result: <span className="em">zero</span> remaining DGL imports, same numbers.
            </p>
          </FadeIn>
        </div>

        <ScrollDashboard steps={MSPRED_STEPS} ariaLabel="ICEBERG PyG port — live section dashboard" />
      </div>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/ms-pred-PyG-ver" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
