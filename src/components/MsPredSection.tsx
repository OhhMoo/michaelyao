import { FadeIn } from "./FadeIn";

const PIPELINE = `molecule → RDKit → PyG Data → MAGMa fragment DAG
   → Batch.from_data_list → GNN message passing (GGNN · PNA · GINE)
   → per-fragment intensities → predicted MS/MS spectrum`;

export function MsPredSection() {
  return (
    <section className="rpage rpage--mspred" id="ms-pred">
      <FadeIn className="rp-hero">
        <div className="rp-lattice" aria-hidden />
        <div className="rp-eyebrow">Graph neural networks</div>
        <h1 className="rp-headline">
          Same model,
          <br />
          <span className="rp-script">new framework.</span>
        </h1>
        <p className="rp-lede">
          ICEBERG predicts a molecule&apos;s tandem mass spectrum from its fragmentation graph. I
          ported the full pipeline from DGL to PyTorch Geometric — 19 files, three GNN families,
          zero change in behaviour.
        </p>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The pipeline</div>
        <div className="rp-block-body">
          <pre className="rp-pipeline">{PIPELINE}</pre>
          <p className="rp-caption">
            A molecule becomes a fragment DAG, each fragment a graph; a two-stage model generates the
            fragments, then predicts their intensities into a binned spectrum.
          </p>
          <figure className="rp-figure">
            <img src="/images/projects/ms-pyg-teaser.png" alt="Precursor molecule through a collision cell to a learned neural simulator predicting the mass spectrum" />
            <figcaption>Precursor → fragmentation → learned simulator → predicted spectrum.</figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The port</div>
        <div className="rp-block-body">
          <p>
            Custom layers were rebuilt PyG-style with <code>torch_scatter</code> in place of DGL&apos;s{" "}
            <code>update_all</code>: <code>dgl.batch</code> → <code>Batch.from_data_list</code>, node/edge
            stores → <code>data.x</code> / <code>edge_attr</code>, pooling → <code>global_mean_pool</code>.
            Result: <span className="em">zero</span> remaining DGL imports, same numbers.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="rp-links">
        <a href="https://github.com/OhhMoo/ms-pred-PyG-ver" target="_blank" rel="noreferrer">
          ms-pred-PyG on GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
