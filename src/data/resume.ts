export type TimelineSubEntry = {
  subtitle: string;
  dates?: string;
  bullets: string[];
};

export type TimelineStat = { k: string; v: string };

export type TimelineEntry = {
  heading: string;
  meta: string[]; // rendered joined with " | "
  bullets?: string[];
  subEntries?: TimelineSubEntry[];
  paragraphs?: string[];
  footnote?: { text: string; label: string; href: string };
  /** Short tags surfaced in the live career dashboard while this entry is in view. */
  skills?: string[];
  /** Headline numbers pulled verbatim from this entry's own bullets — no invented stats. */
  stat?: TimelineStat[];
};

// Source: Resume.pdf (2026-07). Reverse-chronological, research + industry merged.
export const experience: TimelineEntry[] = [
  {
    heading: "Alkera AI, Inc. (YC-S26)",
    meta: ["Machine Learning Engineering Intern", "San Francisco, CA", "May 2026 – Present"],
    bullets: [
      "Built an end-to-end GRPO policy-optimization harness in verl for an LLM data agent, spanning agent-loop routing, a DuckDB-backed task runner, and an episode-scoring reward pipeline that raised task success from 10.5% to 46.2%",
      "Containerized training and evaluation with Docker on Linux for deterministic, versioned experiments that reproduce reliably across HPC nodes",
    ],
    skills: ["verl", "GRPO", "DuckDB", "Docker", "RL"],
    stat: [{ k: "Task success", v: "10.5% → 46.2%" }],
  },
  {
    heading: "Ersilia Open Source Initiative",
    meta: ["Machine Learning Research Intern", "Remote — Barcelona, Spain", "Mar 2026 – Present"],
    bullets: [
      "Built an in-context TabPFN fusion ensemble (KS-gated AUC selection, 1,458 → 200 features); matched grid-tuned RF/XGBoost across 9 endpoints × 10 stratified splits (n=89, paired Wilcoxon)",
    ],
    footnote: {
      text: "Read more about this work",
      label: "here",
      href: "/ersilia",
    },
    skills: ["TabPFN", "In-context learning", "Cheminformatics"],
    stat: [{ k: "Features", v: "1,458 → 200" }, { k: "Endpoints", v: "9 × 10 splits" }],
  },
  {
    heading: "Zhuang Group — Harvey Mudd College",
    meta: [
      "Student Researcher, Computational Physics & Machine Learning",
      "Claremont, CA",
      "Oct 2025 – Present",
    ],
    subEntries: [
      {
        subtitle: "Statistical Physics of Deep Neural Networks",
        dates: "Mar 2026 – Present",
        bullets: [
          "Modeling forward signal propagation as an iterated random map; deriving fixed-point and stability conditions on the variance–correlation recursion via mean-field theory to predict maximum trainable network depth",
          "Locating the order-to-chaos phase boundary and its dependence on weight and bias variance, connecting the edge-of-chaos critical point to gradient stability and trainable initialization",
        ],
      },
      {
        subtitle: "Unsupervised Classification of Water Structure — first-author ACS Central Science manuscript",
        dates: "Oct 2025 – Feb 2026",
        bullets: [
          "Reduced 20 molecular-dynamics trajectories (20,480 configurations) to a four-dimensional order-parameter representation via Python pipelines (NumPy, Pandas, MDtraj)",
          "Applied K-Means, GMM, DBSCAN, and UMAP to resolve two latent structural populations, tuning hyperparameters by silhouette score and validating against an independent oxygen–oxygen structure factor held out from the classifier",
        ],
      },
    ],
    skills: ["Mean-field theory", "MDtraj", "UMAP", "GMM", "DBSCAN"],
    stat: [{ k: "MD trajectories", v: "20 × 20,480 configs" }],
  },
  {
    heading: "Algoverse",
    meta: [
      "Mechanistic Interpretability Researcher (Supervisor: Cole Blodin, Amazon Web Services)",
      "Remote",
      "Jan 2026 – Present",
    ],
    bullets: [
      "Built an end-to-end pipeline (PPO fine-tuning in verl with FSDP + vLLM, activation caching across 8 checkpoints and 4 residual-stream layers, TopK sparse-autoencoder training) to quantify how reinforcement learning reshapes a model's internal representation geometry",
      "Trained 32 warm-start sparse autoencoders with feature indices aligned across checkpoints, making decoder cosine-similarity a well-defined drift metric on high-dimensional feature space",
    ],
    skills: ["PPO", "verl", "FSDP", "vLLM", "Sparse autoencoders"],
    stat: [{ k: "SAEs trained", v: "32 warm-start" }, { k: "Checkpoints", v: "8 × 4 layers" }],
  },
];

export const education: TimelineEntry[] = [
  {
    heading: "Harvey Mudd College",
    meta: ["B.S. — Joint Computer Science & Mathematics", "Claremont, CA", "Expected May 2028"],
    paragraphs: [
      "Relevant coursework: Statistical Mechanics, Probability, Statistics, Differential Equations, Graph Theory",
    ],
    skills: ["Statistical Mechanics", "Probability", "Graph Theory"],
  },
  {
    heading: "Shanghai Qibao Dwight High School",
    meta: ["IB Diploma — 44/45", "Shanghai, China", "2022 – 2025"],
    paragraphs: ["Awards:"],
    bullets: [
      "UK Chemistry Olympiad: Round 1 Gold Medalist (2023, 2024), Silver Medalist (2022)",
      "Canadian Chemistry Olympiad: Round 2 Gold Medalist (2024), Round 1 Gold Medalist (2022)",
    ],
    skills: ["Chemistry"],
    stat: [{ k: "IB Diploma", v: "44 / 45" }],
  },
];
