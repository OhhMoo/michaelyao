export type LearningFolderId = "llm" | "ml-gnn" | "rl" | "math";

export type LearningNote = {
  id: string;
  title: string;
  filename: string;
  href: string;
};

export type LearningSubfolder = {
  id: string;
  index: string;
  title: string;
  description: string;
  notes: readonly LearningNote[];
};

export type LearningFolder = {
  id: LearningFolderId;
  index: string;
  title: string;
  longTitle: string;
  description: string;
  sources: readonly string[];
  notes: readonly LearningNote[];
  subfolders: readonly LearningSubfolder[];
};

export const learningFolders: readonly LearningFolder[] = [
  {
    id: "llm",
    index: "01",
    title: "LLM",
    longTitle: "Large language models",
    description: "Architecture notes covering the building blocks of transformer models.",
    sources: ["Transformers", "tokenization", "attention"],
    notes: [],
    subfolders: [
      {
        id: "transformer",
        index: "01",
        title: "Transformer",
        description: "A working path from tokens and embeddings through attention, FFNs, and masks.",
        notes: [
          {
            id: "tokenization",
            title: "Tokenization",
            filename: "01-tokenization.md",
            href: "/notes/llm/transformer/01-tokenization.md",
          },
          {
            id: "word-embedding",
            title: "Word Embedding",
            filename: "02-word-embedding.md",
            href: "/notes/llm/transformer/02-word-embedding.md",
          },
          {
            id: "positional-encoding",
            title: "Positional Encoding",
            filename: "03-positional-encoding.md",
            href: "/notes/llm/transformer/03-positional-encoding.md",
          },
          {
            id: "attention",
            title: "Attention",
            filename: "04-attention.md",
            href: "/notes/llm/transformer/04-attention.md",
          },
          {
            id: "ffn-activation",
            title: "FFN & Activation",
            filename: "05-ffn-and-activation.md",
            href: "/notes/llm/transformer/05-ffn-and-activation.md",
          },
          {
            id: "mask",
            title: "Mask",
            filename: "06-mask.md",
            href: "/notes/llm/transformer/06-mask.md",
          },
        ],
      },
    ],
  },
  {
    id: "ml-gnn",
    index: "02",
    title: "ML+GNN",
    longTitle: "Machine learning + graph neural networks",
    description: "Machine-learning basics and graph neural network notes, kept in two source folders.",
    sources: ["ML specialization", "CS224W", "graph ML"],
    notes: [],
    subfolders: [
      {
        id: "ml-basic",
        index: "01",
        title: "ML Basic",
        description: "Core supervised and unsupervised machine-learning methods.",
        notes: [
          {
            id: "linear-regression",
            title: "Linear Regression",
            filename: "01-linear-regression.md",
            href: "/notes/ml-gnn/ml-basic/01-linear-regression.md",
          },
          {
            id: "logistic-regression",
            title: "Logistic Regression",
            filename: "02-logistic-regression.md",
            href: "/notes/ml-gnn/ml-basic/02-logistic-regression.md",
          },
          {
            id: "clustering",
            title: "Clustering",
            filename: "03-clustering.md",
            href: "/notes/ml-gnn/ml-basic/03-clustering.md",
          },
          {
            id: "decision-tree",
            title: "Decision Tree",
            filename: "04-decision-tree.md",
            href: "/notes/ml-gnn/ml-basic/04-decision-tree.md",
          },
          {
            id: "neural-network-structure",
            title: "Neural Network Structure",
            filename: "05-neural-network-structure.md",
            href: "/notes/ml-gnn/ml-basic/05-neural-network-structure.md",
          },
          {
            id: "neural-network-training",
            title: "Neural Network Training",
            filename: "06-neural-network-training.md",
            href: "/notes/ml-gnn/ml-basic/06-neural-network-training.md",
          },
          {
            id: "recommender-system",
            title: "Recommender System",
            filename: "07-recommender-system.md",
            href: "/notes/ml-gnn/ml-basic/07-recommender-system.md",
          },
          {
            id: "classification",
            title: "Classification",
            filename: "08-classification.md",
            href: "/notes/ml-gnn/ml-basic/08-classification.md",
          },
          {
            id: "reinforcement-learning-basics",
            title: "Reinforcement Learning",
            filename: "09-reinforcement-learning.md",
            href: "/notes/ml-gnn/ml-basic/09-reinforcement-learning.md",
          },
          {
            id: "principal-component-analysis",
            title: "Principal Component Analysis",
            filename: "10-principal-component-analysis.md",
            href: "/notes/ml-gnn/ml-basic/10-principal-component-analysis.md",
          },
          {
            id: "anomaly-detection",
            title: "Anomaly Detection",
            filename: "11-anomaly-detection.md",
            href: "/notes/ml-gnn/ml-basic/11-anomaly-detection.md",
          },
          {
            id: "diagnostics",
            title: "Diagnostics",
            filename: "12-diagnostics.md",
            href: "/notes/ml-gnn/ml-basic/12-diagnostics.md",
          },
          {
            id: "optimization",
            title: "Optimization",
            filename: "13-optimization.md",
            href: "/notes/ml-gnn/ml-basic/13-optimization.md",
          },
        ],
      },
      {
        id: "gnn",
        index: "02",
        title: "GNN",
        description: "Graph representations, embeddings, PageRank, and node classification.",
        notes: [
          {
            id: "introduction-to-gnn",
            title: "Introduction to GNN",
            filename: "01-introduction-to-gnn.md",
            href: "/notes/ml-gnn/gnn/01-introduction-to-gnn.md",
          },
          {
            id: "node-and-graph-features",
            title: "Node and Graph Features",
            filename: "02-node-and-graph-features.md",
            href: "/notes/ml-gnn/gnn/02-node-and-graph-features.md",
          },
          {
            id: "node-embeddings",
            title: "Node Embeddings",
            filename: "03-node-embeddings.md",
            href: "/notes/ml-gnn/gnn/03-node-embeddings.md",
          },
          {
            id: "pagerank",
            title: "PageRank",
            filename: "04-pagerank.md",
            href: "/notes/ml-gnn/gnn/04-pagerank.md",
          },
          {
            id: "node-classification",
            title: "Node Classification",
            filename: "05-node-classification.md",
            href: "/notes/ml-gnn/gnn/05-node-classification.md",
          },
        ],
      },
    ],
  },
  {
    id: "rl",
    index: "03",
    title: "RL",
    longTitle: "Reinforcement learning",
    description: "From Markov decision processes to model-free control and policy gradients.",
    sources: ["CS234", "Sutton & Barto", "David Silver"],
    notes: [
      {
        id: "foundations",
        title: "Foundations",
        filename: "01-foundations.md",
        href: "/notes/rl/01-foundations.md",
      },
      {
        id: "dynamic-programming",
        title: "Dynamic Programming",
        filename: "02-dynamic-programming.md",
        href: "/notes/rl/02-dynamic-programming.md",
      },
      {
        id: "model-free-prediction",
        title: "Model-Free Prediction",
        filename: "03-model-free-prediction.md",
        href: "/notes/rl/03-model-free-prediction.md",
      },
      {
        id: "model-free-control",
        title: "Model-Free Control",
        filename: "04-model-free-control.md",
        href: "/notes/rl/04-model-free-control.md",
      },
      {
        id: "function-approximation",
        title: "Function Approximation",
        filename: "05-function-approximation.md",
        href: "/notes/rl/05-function-approximation.md",
      },
      {
        id: "value-function-approximation",
        title: "Value Function Approximation",
        filename: "06-value-function-approximation.md",
        href: "/notes/rl/06-value-function-approximation.md",
      },
      {
        id: "policy-gradient",
        title: "Policy Gradient",
        filename: "07-policy-gradient.md",
        href: "/notes/rl/07-policy-gradient.md",
      },
    ],
    subfolders: [],
  },
  {
    id: "math",
    index: "04",
    title: "Math",
    longTitle: "Mathematical foundations",
    description: "Probability, optimization, and spectral ideas beneath the models.",
    sources: ["probability", "optimization", "linear algebra"],
    notes: [],
    subfolders: [],
  },
] as const;

export const learningNoteCount = learningFolders.reduce(
  (folderTotal, folder) =>
    folderTotal
    + folder.notes.length
    + folder.subfolders.reduce(
      (subfolderTotal, subfolder) => subfolderTotal + subfolder.notes.length,
      0,
    ),
  0,
);
