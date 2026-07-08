export type TimelineEntry = {
  heading: string;
  meta: string[]; // rendered joined with " | "
  bullets?: string[];
  paragraphs?: string[];
  footnote?: { text: string; label: string; href: string };
};

export const experience: TimelineEntry[] = [
  // TODO(user): replace/extend from real resume — drop file into personal_info/
  {
    heading: "Zhuang Group — Harvey Mudd College",
    meta: ["Undergraduate Researcher", "Claremont, CA", "2025 – Present"], // TODO(user): confirm start date
    bullets: [
      "Running large-scale MD simulations studying structural heterogeneity in supercooled water",
      "Building order-parameter embeddings and clustering pipelines (UMAP, HDBSCAN, GMM) resolving two liquid-like states",
    ],
  },
  {
    heading: "Independent Research — Mechanistic Interpretability",
    meta: ["SAE × RL", "2025 – Present"], // TODO(user): confirm dates
    bullets: [
      "Training Sparse Autoencoders on RL-trained models and tracking representational drift",
    ],
  },
  {
    heading: "Open-source — ICEBERG (MS/MS fragmentation)",
    meta: ["Contributor", "2025 – Present"], // TODO(user): confirm dates
    bullets: [
      "Migrating MS/MS fragmentation prediction models from DGL to PyTorch Geometric",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    heading: "Harvey Mudd College",
    meta: ["B.S. — Chemistry & Computer Science", "2025 – 2029 (Class of ’29)"],
    paragraphs: ["Relevant coursework: TODO(user)"],
  },
  {
    heading: "High School", // TODO(user): school name
    meta: ["TODO(user): dates"],
    paragraphs: ["TODO(user): awards / notes"],
  },
];
