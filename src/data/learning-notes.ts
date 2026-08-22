export type LearningFolderId = "llm" | "gnn" | "rl" | "math";

export type LearningNote = {
  id: string;
  title: string;
  filename: string;
  href: string;
};

export type LearningFolder = {
  id: LearningFolderId;
  index: string;
  title: string;
  longTitle: string;
  description: string;
  sources: readonly string[];
  notes: readonly LearningNote[];
};

export const learningFolders: readonly LearningFolder[] = [
  {
    id: "llm",
    index: "01",
    title: "LLM",
    longTitle: "Large language models",
    description: "Architecture, post-training, evaluation, and tool-using systems.",
    sources: ["Transformers", "post-training", "agent systems"],
    notes: [],
  },
  {
    id: "gnn",
    index: "02",
    title: "GNN",
    longTitle: "Graph neural networks",
    description: "Representations, message passing, and learning on molecular graphs.",
    sources: ["CS224W", "PyTorch Geometric", "molecular ML"],
    notes: [],
  },
  {
    id: "rl",
    index: "03",
    title: "RL",
    longTitle: "Reinforcement learning",
    description: "Sequential decisions, policy optimization, and learning from feedback.",
    sources: ["CS234", "Sutton & Barto", "OpenAI Spinning Up"],
    notes: [],
  },
  {
    id: "math",
    index: "04",
    title: "Math",
    longTitle: "Mathematical foundations",
    description: "The probability, optimization, and spectral ideas beneath the models.",
    sources: ["probability", "optimization", "linear algebra"],
    notes: [],
  },
] as const;
