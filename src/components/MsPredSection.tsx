import { FadeIn } from "./FadeIn";

const PIPELINE = `molecule → RDKit → PyG Data → MAGMa fragment DAG
   → Batch.from_data_list → GNN message passing (GGNN · PNA · GINE)
   → per-fragment intensities → predicted MS/MS spectrum`;

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

      <FadeIn className="np-body np-col">
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

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The port</h2>
        <p>
          Custom layers were rebuilt PyG-style with <code>torch_scatter</code> in place of DGL&apos;s{" "}
          <code>update_all</code>: <code>dgl.batch</code> → <code>Batch.from_data_list</code>, node/edge
          stores → <code>data.x</code> / <code>edge_attr</code>, pooling → <code>global_mean_pool</code>.
          Result: <span className="em">zero</span> remaining DGL imports, same numbers.
        </p>
      </FadeIn>

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/ms-pred-PyG-ver" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
