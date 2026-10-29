export type TimelineLink = { label: string; href: string };

/** A small memo-style plot drawn from the research's own numbers. */
export type TimelineSketch = "circles";

export type TimelineSubEntry = {
  subtitle: string;
  dates?: string;
  summary?: string;
  bullets?: string[];
  links?: TimelineLink[];
  sketch?: TimelineSketch;
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

// Source: resume_m.pdf (2026-10). Summaries may cite publications as "[n]".
export const profile = {
  name: "Michael Yao",
  bio: [
    "hi! i'm michael",
    "my goal is to understand how learning systems work, and to use them to do science.",
    "right now i'm a machine learning engineering intern at alkera ai (yc s26), where i train sql agents with reinforcement learning. on the research side, i work with bilin zhuang at harvey mudd on water and the mean-field theory of deep networks, and with miquel duran-frigola at ersilia on tabular foundation models for molecules. i also like reading what training changes inside a model (interpretability!).",
    "i love reading detective stories, a big fan of Shirai Tomoyuki",
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
    heading: "Harvey Mudd College",
    meta: ["Undergraduate Researcher", "Advisor: Bilin Zhuang", "Claremont, CA", "Oct 2025 – Present"],
    subEntries: [
      {
        subtitle: "Unsupervised Machine Learning on Water Structure",
        summary: "Likelihood-ratio abstention · Molecular Dynamics analysis",
        links: [
          { label: "Read more", href: "/blog/water" },
          { label: "Code", href: "https://zenodo.org/records/23351258" },
        ],
      },
      {
        subtitle: "Mean-Field Theory of Deep Neural Networks",
        summary: "Mean-field theory · Order-to-chaos boundary",
        links: [{ label: "Read more", href: "/blog/criticality" }],
        sketch: "circles",
      },
    ],
  },
  {
    heading: "Ersilia Open Source Initiative",
    meta: ["ML Researcher", "Advisor: Miquel Duran-Frigola", "Remote", "Apr 2026 – Present"],
    subEntries: [
      {
        subtitle: "Feature Selection for Tabular Foundation Models",
        summary: "TabPFN in-context learning · Molecular feature selection",
        links: [{ label: "arXiv", href: "https://arxiv.org/abs/2609.30789" }],
      },
    ],
  },
];

export const industryExperience: TimelineEntry[] = [
  {
    heading: "Alkera AI (YC S26)",
    meta: ["Machine Learning Engineering Intern", "San Francisco, CA", "May 2026 – Present"],
    summary: "Training AI agents to fix data pipelines, rewarded only when their code gets the right answer",
    paragraphs: [
      "I built Dataline, the RL environment behind it: a data engineer's whole working computer (warehouse, dbt, scheduler, BI dashboards, tickets, chat), rebuilt from a seed with something broken. The agent gets a terminal and is graded only on what it leaves behind; lying about its work or crossing a permission line is the only way to score below zero.",
    ],
    links: [
      { label: "Website", href: "https://www.alkera.ai/" },
      { label: "Dataline", href: "https://github.com/OhhMoo/Dataline" },
    ],
  },
  {
    heading: "Fresenius Kabi",
    meta: ["R&D Data & Quality Systems Intern", "Wuxi, China", "Aug 2026 – Sep 2026"],
    summary: "Automating quality-compliance checks across hundreds of R&D documents",
  },
];

/** Every role, reverse-chronological by start date. */
export const experience: TimelineEntry[] = [...industryExperience, ...researchExperience];

export const cvProjects: CvProject[] = [
  {
    title: "NullStep",
    href: "https://github.com/OhhMoo/NullStepSAE",
    description: "Telling real changes inside a fine-tuned model apart from measurement noise",
  },
  {
    title: "LangAlpha",
    href: "https://github.com/ginlix-ai/LangAlpha",
    description: "AI research agents for finance that show their reasoning and cite their sources",
  },
  {
    title: "SPEQTRO",
    href: "https://github.com/OhhMoo/SPEQTRO",
    description: "An AI agent that reads a molecule's spectra and works out its structure",
  },
];

export const education: TimelineEntry[] = [
  {
    heading: "Harvey Mudd College",
    meta: ["B.S. — Joint Computer Science & Mathematics", "Claremont, CA", "Expected May 2028"],
    summary: "GPA 3.90 · Statistical Mechanics · Probability · Statistics · Differential Equations · Graph Theory",
  },
  {
    heading: "Shanghai Qibao Dwight High School",
    meta: ["IB Diploma", "Shanghai, China", "2022 – 2025"],
    summary: "Score 44 / 45",
    stat: [{ k: "IB Diploma", v: "44 / 45" }],
  },
];

export const programs: TimelineEntry[] = [
  {
    heading: "Break Through Tech AI",
    meta: ["Cornell Tech", "May 2026 – Present"],
  },
  {
    heading: "Summer Science Program (SSP)",
    meta: ["Southwestern Oklahoma State University", "Weatherford, OK", "Jun 2024 – Aug 2024"],
  },
];
