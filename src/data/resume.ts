export type TimelineLink = { label: string; href: string };

export type TimelineFigure =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      type: "plots";
      plots: { src: string; title: string }[];
    };

export type TimelineSubEntry = {
  subtitle: string;
  dates?: string;
  summary?: string;
  bullets?: string[];
  links?: TimelineLink[];
  figure?: TimelineFigure;
};

export type TimelineStat = { k: string; v: string };

export type TimelineEntry = {
  heading: string;
  meta: string[];
  summary?: string;
  bullets?: string[];
  subEntries?: TimelineSubEntry[];
  paragraphs?: string[];
  links?: TimelineLink[];
  footnote?: { text: string; label: string; href: string };
  stat?: TimelineStat[];
};

export type Publication = {
  id: number;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  links: TimelineLink[];
};

export type CvProject = {
  title: string;
  href: string;
  description: string;
};

// Source: resume_m.pdf (2026-10). Bullets may cite publications as "[n]".
export const profile = {
  name: "Michael Yao",
  affiliation: "B.S. Joint Computer Science & Mathematics · Harvey Mudd College",
  bio: [
    "I am currently a machine learning engineering intern at Alkera AI (YC S26), where I train SQL data agents with execution-verified reinforcement learning. I also do research with Bilin Zhuang at Harvey Mudd on unsupervised learning for molecular systems and the mean-field theory of deep networks, and with Miquel Duran-Frigola at Ersilia on tabular foundation models for low-data molecular prediction.",
  ],
  interests: [
    "LLM post-training (RL)",
    "Tool-use agents",
    "AI for science",
    "Mechanistic interpretability",
  ],
  links: [
    { label: "Email", href: "mailto:miyao@hmc.edu" },
    { label: "CV (PDF)", href: "/resume.pdf" },
    { label: "GitHub", href: "https://github.com/OhhMoo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yiqi-yao-michael/" },
  ],
};

export const SELF_AUTHOR = "Y. Yao";

export const publications: Publication[] = [
  {
    id: 1,
    title:
      "Feature Selection for Tabular Foundation Models: Exploring Feature Utility in Low-Data Molecular Prediction",
    authors: ["Y. Yao", "M. Duran-Frigola"],
    venue: "arXiv:2609.30789",
    year: "2026",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2609.30789" },
      { label: "Code", href: "https://github.com/ersilia-os/chem-icl" },
    ],
  },
  {
    id: 2,
    title:
      "Is Water a Mixture: Unsupervised Likelihood-Ratio Classification Reveals Two Water States That Merge Upon Increasing Temperature",
    authors: ["Y. Yao", "D. Sanghi", "A. D. Chokshi", "et al."],
    venue: "Under review, PNAS",
    year: "2026",
    links: [{ label: "Code", href: "https://zenodo.org/records/23351258" }],
  },
  {
    id: 3,
    title:
      "A Null-Step Control for Sparse-Autoencoder Feature Drift Across Fine-Tuning Checkpoints",
    authors: ["Y. Yao", "C. Blodin", "et al."],
    venue: "Manuscript",
    year: "2026",
    links: [{ label: "Weights", href: "https://huggingface.co/sae-anon/sae-null-step" }],
  },
];

export const researchExperience: TimelineEntry[] = [
  {
    heading: "Zhuang Group — Harvey Mudd College",
    meta: ["Undergraduate Researcher", "Advisor: Bilin Zhuang", "Claremont, CA", "Oct 2025 – Present"],
    subEntries: [
      {
        subtitle: "Unsupervised Machine Learning on Water Structure",
        summary:
          "GMM classification in (q, LSI, sₖ, ζ) order-parameter space · likelihood-ratio abstention · TIP4P/2005, TIP5P, SWM4-NDP MD · state-resolved S(k) [2]",
        links: [{ label: "Read more", href: "/water" }],
        figure: {
          type: "plots",
          plots: [
            {
              src: "/plotly/water-3d-cluster0.html",
              title: "Interactive 3D view of water structure cluster 0",
            },
            {
              src: "/plotly/water-3d-cluster1.html",
              title: "Interactive 3D view of water structure cluster 1",
            },
          ],
        },
      },
      {
        subtitle: "Mean-Field Theory of Deep Neural Networks",
        summary:
          "Deep tanh networks · mean-field variance & correlation recursions · fixed point c* · order-to-chaos boundary χ₁ = 1 · width-1,000 simulations",
        links: [{ label: "Read more", href: "/criticality" }],
        figure: {
          type: "image",
          src: "/images/research/criticality/fixed-point-chaos-boundary.png",
          alt: "Heatmaps of the neural-network fixed point and order-to-chaos boundary",
          width: 1400,
          height: 536,
        },
      },
    ],
  },
  {
    heading: "Ersilia Open Source Initiative",
    meta: ["ML Researcher", "Advisor: Miquel Duran-Frigola", "Remote", "Apr 2026 – Present"],
    subEntries: [
      {
        subtitle: "Feature Selection for Tabular Foundation Models",
        summary:
          "TabPFN in-context learning · 77 few-shot tasks · RDKit, fingerprint & pharmacophore families · +3.5–5.3 ROC-AUC · assay selection · ADME/Tox leakage audit [1]",
        links: [{ label: "Read more", href: "https://arxiv.org/abs/2609.30789" }],
        figure: {
          type: "image",
          src: "/images/research/ersilia/feature-utility-radar.png",
          alt: "Radar chart of ROC-AUC gain over RDKit-11 for each molecular feature family at 16 and 128 labels",
          width: 1845,
          height: 1004,
        },
      },
    ],
  },
];

export const industryExperience: TimelineEntry[] = [
  {
    heading: "Alkera AI (YC S26)",
    meta: ["Machine Learning Engineering Intern", "San Francisco, CA", "May 2026 – Present"],
    subEntries: [
      {
        subtitle: "Execution-Verified Reinforcement Learning",
        bullets: [
          "Implemented multi-turn GRPO in verl for SQL pipeline synthesis and debugging with iterative tool execution",
          "Scaled Qwen3.5 from 9B to 27B (8×A100 to 8×H100), raising the mean execution-graded score by 67% (0.18 to 0.30)",
          "Bounded execution-verifier rewards with baseline and gold anchors to reward correct SQL outcomes over surface matches",
        ],
      },
      {
        subtitle: "Sandboxed Agent Infrastructure & Evaluation",
        bullets: [
          "Built a sandboxed 63-tool MCP gateway emulating 19 vendor platforms, integrating DuckDB, dbt, BI, Jira, and Slack",
          "Designed 32 data-incident tasks with deterministic execution graders and tiered rewards; evaluated 483 agent rollouts",
          "Patched sandbox-escape and root-credential exploits uncovered in agent rollouts to prevent execution-based reward hacking",
        ],
      },
    ],
    links: [{ label: "Website", href: "https://www.alkera.ai/" }],
  },
  {
    heading: "Fresenius Kabi",
    meta: ["R&D Data & Quality Systems Intern", "Wuxi, China", "Aug 2026 – Sep 2026"],
    bullets: [
      "Built a Python and JavaScript ETL pipeline to automate quality-compliance audits across 665 documents, reconciling 222 SOP records against master databases and automatically repairing 189 broken cross-references",
    ],
  },
];

/** Every role, reverse-chronological by start date. */
export const experience: TimelineEntry[] = [...industryExperience, ...researchExperience];

export const cvProjects: CvProject[] = [
  {
    title: "NullStep",
    href: "/sae-rl",
    description:
      "A null-step control, with model weights held fixed, that isolates dictionary-retraining noise in sparse-autoencoder feature-drift metrics across 112 TopK and JumpReLU SAEs on SFT and PPO checkpoints. With Cole Blodin (AWS).",
  },
  {
    title: "LangAlpha",
    href: "/langalpha",
    description:
      "A multi-agent financial research platform with real-time Server-Sent Events streams that expose agent reasoning and per-turn source-citation tracking that links research to its evidence.",
  },
  {
    title: "SPEQTRO",
    href: "/speqtro",
    description:
      "An autonomous agent that combines NMR, IR, and mass-spectrometry models into ranked molecular structures with traceable evidence.",
  },
];

export const education: TimelineEntry[] = [
  {
    heading: "Harvey Mudd College",
    meta: ["B.S. — Joint Computer Science & Mathematics", "Claremont, CA", "Expected May 2028"],
    paragraphs: [
      "GPA: 3.90",
      "Relevant coursework: Statistical Mechanics, Probability, Statistics, Differential Equations, Graph Theory",
    ],
  },
  {
    heading: "Shanghai Qibao Dwight High School",
    meta: ["IB Diploma", "Shanghai, China", "2022 – 2025"],
    paragraphs: ["Score: 44 / 45"],
    stat: [{ k: "IB Diploma", v: "44 / 45" }],
  },
];

export const programs: TimelineEntry[] = [
  {
    heading: "Break Through Tech AI — Cornell Tech",
    meta: ["May 2026 – Present"],
  },
  {
    heading: "Summer Science Program (SSP)",
    meta: ["Southwestern Oklahoma State University", "Weatherford, OK", "Jun 2024 – Aug 2024"],
    summary:
      "Cross-bridged tetraazamacrocycle (Me₂B1#N₄) synthesis · Ni, Co, Cu complexes · Fenton-type dye-bleaching catalysis · NMR, UV-Vis, MS",
  },
];
