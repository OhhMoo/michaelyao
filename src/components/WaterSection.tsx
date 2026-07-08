import { FadeIn } from "./FadeIn";

export function WaterSection() {
  return (
    <section className="rpage rpage--water" id="water">
      <FadeIn className="rp-hero">
        <div className="rp-lattice" aria-hidden />
        <div className="rp-eyebrow">Harvey Mudd · Zhuang Group</div>
        <h1 className="rp-headline">
          Two states of water,
          <br />
          <span className="rp-script">made visible.</span>
        </h1>
        <p className="rp-lede">
          Is liquid water one continuum, or a mixture of two local structures? A century-old debate,
          because both pictures fit the same bulk data. I let unsupervised clustering decide — then
          checked it against an observable the clustering never saw.
        </p>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The method</div>
        <div className="rp-block-body">
          <p>
            I ran molecular dynamics on <span className="em">TIP4P/2005</span> and{" "}
            <span className="em">TIP5P</span> water and described each molecule by four
            order parameters — tetrahedral order <code>q</code>, <code>LSI</code>,{" "}
            <code>S</code>
            <sub>k</sub>, and translational order <code>ζ</code>. A hybrid density-denoising
            pipeline (<code>DBSCAN → GMM</code>) gave the clearest split: two structurally distinct
            populations — locally favoured tetrahedral structures (LFTS) and disordered normal-liquid
            structures (DNLS) — emerge on their own.
          </p>
          <figure className="rp-figure">
            <img src="/images/research/water/1-clustering.png" alt="Order-parameter density resolved into LFTS and DNLS clusters" />
            <figcaption>
              One diffuse cloud of molecules (left) resolves into two clean populations across every
              order parameter (right). No labels were given; the split is the data&apos;s own.
            </figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">The validation</div>
        <div className="rp-block-body">
          <p>
            Clusters are easy to draw and hard to trust. So I tested them against something the
            clustering never saw: the per-cluster oxygen–oxygen structure factor{" "}
            <code>S(k)</code>, computed straight from atomic coordinates. The LFTS cluster peaks at{" "}
            <code>k</code>
            <sub>T1</sub> ≈ 0.81, the DNLS cluster at <code>k</code>
            <sub>D1</sub> ≈ 1.05 — exactly where two-state theory predicts. Since clustering and
            validation share no descriptor, the agreement is model-independent.
          </p>
          <figure className="rp-figure">
            <img src="/images/research/water/2-validation.png" alt="Per-cluster structure factors with distinct first diffraction peaks that superpose into the total" />
            <figcaption>
              Each cluster carries its own first diffraction peak; together they superpose into the
              total <code>S(k)</code> of real water.
            </figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-block">
        <div className="rp-block-label">Generality</div>
        <div className="rp-block-body">
          <p>
            The two-state signature is not an artefact of one model or temperature. It holds from
            deep supercooling to ambient conditions, and across three independent water models.
          </p>
          <figure className="rp-figure">
            <img src="/images/research/water/3-generality.png" alt="Structure factors and population fractions across temperature and across water models" />
            <figcaption>
              The LFTS fraction shifts smoothly with temperature and the peaks persist across
              TIP4P/2005, TIP5P, and SWM4-NDP.
            </figcaption>
          </figure>
        </div>
      </FadeIn>

      <FadeIn className="rp-links">
        <a href="https://github.com/OhhMoo/Water_Clustering" target="_blank" rel="noreferrer">
          Water_Clustering on GitHub ↗
        </a>
        <span style={{ color: "var(--text-2)", fontFamily: "var(--ff-label), sans-serif", fontSize: "0.95rem" }}>
          First-author manuscript · in preparation
        </span>
      </FadeIn>
    </section>
  );
}
