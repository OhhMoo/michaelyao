"use client";

import { FadeIn } from "./FadeIn";

export function AboutSection() {
  return (
    <section className="about" id="about">
      <FadeIn className="about-photo">
        <div className="photo">
          <img src="/images/about/pfp.jpg" alt="Michael Yao" />
        </div>
      </FadeIn>

      <FadeIn className="about-body">
        <p>
          I&apos;m Michael — a chemistry &amp; computer-science student at Harvey Mudd, working in
          the <span className="em">Zhuang group</span> on the structural heterogeneity of
          supercooled water: large MD simulations, order-parameter embeddings, clustering into
          two liquid-like states.
        </p>
        <p>
          Outside the lab I build tools at the seam of{" "}
          <span className="em">atoms and algorithms</span> — agentic spectroscopy reasoning,
          sparse autoencoders on RL-trained models, GNN pipelines for MS/MS fragmentation. I
          care about systems you can hold in your head, and results that survive being looked
          at twice.
        </p>
        <p>
          Most of what I make is here: code, preprints, and a few unfinished sentences I&apos;m
          still rewriting.
        </p>
        <p>
          I&apos;m a first-year student at <span className="em">Harvey Mudd College</span>{" "}
          studying chemistry and computer science. Currently, I spend my time:
        </p>

        <ul className="about-list">
          <li>
            <span className="arrow" aria-hidden>
              →
            </span>
            <div>
              <span className="em">Researching Atoms</span> — running large-scale MD
              simulations under <span className="em">Prof. Bilin Zhuang</span>, studying
              structural heterogeneity in supercooled water with UMAP, HDBSCAN, and GMM
              clustering.
            </div>
          </li>
          <li>
            <span className="arrow" aria-hidden>
              →
            </span>
            <div>
              <span className="em">Interpreting RL</span> — researching mechanistic
              interpretability of reinforcement learning, training Sparse Autoencoders and
              tracking representational drift.
            </div>
          </li>
          <li>
            <span className="arrow" aria-hidden>
              →
            </span>
            <div>
              <span className="em">Exploring GNNs</span> — actively learning graph neural
              networks, currently working on migrating MS/MS fragmentation prediction models
              (ICEBERG) from DGL to PyTorch Geometric.
            </div>
          </li>
        </ul>

        <div className="stats-row">
          <div>
            <div className="k">Based</div>
            <div className="v">Claremont, CA</div>
          </div>
          <div>
            <div className="k">School</div>
            <div className="v">Harvey Mudd &rsquo;29</div>
          </div>
          <div>
            <div className="k">Lab</div>
            <div className="v">Zhuang Group</div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
