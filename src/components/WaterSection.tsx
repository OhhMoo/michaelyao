import { FadeIn } from "./FadeIn";

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

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The method</h2>
        <p>
          I ran molecular dynamics on <span className="em">TIP4P/2005</span> and{" "}
          <span className="em">TIP5P</span> water and described each molecule by four order
          parameters — tetrahedral order <code>q</code>, <code>LSI</code>, <code>S</code>
          <sub>k</sub>, and translational order <code>ζ</code>. A hybrid density-denoising pipeline
          (<code>DBSCAN → GMM</code>) gave the clearest split: two structurally distinct populations
          — locally favoured tetrahedral structures (LFTS) and disordered normal-liquid structures
          (DNLS) — emerge on their own.
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

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">The validation</h2>
        <p>
          Clusters are easy to draw and hard to trust. So I tested them against something the
          clustering never saw: the per-cluster oxygen–oxygen structure factor <code>S(k)</code>,
          computed straight from atomic coordinates. The LFTS cluster peaks at <code>k</code>
          <sub>T1</sub> ≈ 0.81, the DNLS cluster at <code>k</code>
          <sub>D1</sub> ≈ 1.05 — exactly where two-state theory predicts. Since clustering and
          validation share no descriptor, the agreement is model-independent.
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

      <FadeIn className="np-body np-col">
        <h2 className="np-h2">Generality</h2>
        <p>
          The two-state signature is not an artefact of one model or temperature. It holds from deep
          supercooling to ambient conditions, and across three independent water models.
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

      <FadeIn className="np-links np-col">
        <a href="https://github.com/OhhMoo/Water_Clustering" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </FadeIn>
    </section>
  );
}
