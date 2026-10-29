export type BlogPost = { slug: string; title: string; date: string };

export const criticality: BlogPost = {
  slug: "criticality",
  title: "How far can a signal travel through a deep neural network?",
  date: "August 2026",
};

export const water: BlogPost = {
  slug: "water",
  title: "Is water one liquid, or a mixture of two?",
  date: "May 2026",
};

/** Newest first. */
export const posts: BlogPost[] = [criticality, water];
