export type StudyEntry = {
  title: string;
  date: string;
  href: string;
  download?: boolean;
};

export type StudyFolder = {
  index: string;
  title: string;
  defaultOpen: boolean;
  sources?: string[];
  entries: StudyEntry[];
};

export const studyFolders: StudyFolder[] = [
  {
    index: "01",
    title: "Reinforcement Learning",
    defaultOpen: true,
    sources: ["CS234", "OpenAI Spinning Up", "Sutton & Barto RL textbook"],
    entries: [
      {
        title: "Introduction to Reinforcement Learning",
        date: "2026-07-21",
        href: "/studies/introduction-to-reinforcement-learning.pdf",
      },
    ],
  },
  {
    index: "02",
    title: "Machine Learning with Graph",
    defaultOpen: true,
    sources: ["CS224W"],
    entries: [
      {
        title: "Introduction to GNN",
        date: "2026-03-10",
        href: "/studies/machine-learning-with-graph/Introduction-to-GNN.pdf",
      },
      {
        title: "Node and Graph Features",
        date: "2026-03-11",
        href: "/studies/machine-learning-with-graph/Node-and-Graph-Features.pdf",
      },
      {
        title: "Node Embeddings",
        date: "2026-03-15",
        href: "/studies/machine-learning-with-graph/Node-Embeddings.pdf",
      },
      {
        title: "PageRank",
        date: "2026-04-13",
        href: "/studies/machine-learning-with-graph/PageRank.pdf",
      },
      {
        title: "Node Classification",
        date: "2026-04-18",
        href: "/studies/machine-learning-with-graph/Node-Classification.pdf",
      },
    ],
  },
  {
    index: "03",
    title: "Machine Learning Basics",
    defaultOpen: false,
    sources: ["CS229", "Machine Learning Specialization · Andrew Ng"],
    entries: [
      { title: "Linear Regression", date: "2025-05-12", href: "/studies/machine-learning/1-Linear-Regression.md", download: true },
      { title: "Logistic Regression", date: "2025-05-27", href: "/studies/machine-learning/2-Logistic-Regression.md", download: true },
      { title: "Clustering", date: "2025-06-08", href: "/studies/machine-learning/3-Clustering.md", download: true },
      { title: "Decision Tree", date: "2025-06-19", href: "/studies/machine-learning/4-Decision-Tree.md", download: true },
      { title: "Neural Network Structure", date: "2025-06-23", href: "/studies/machine-learning/5-Neural-Network-Structure.md", download: true },
      { title: "Neural Network Training", date: "2025-06-26", href: "/studies/machine-learning/6-Neural-Network-Training.md", download: true },
      { title: "Recommender System", date: "2025-06-28", href: "/studies/machine-learning/7-Recommender-System.md", download: true },
      { title: "Classification", date: "2025-07-05", href: "/studies/machine-learning/8-Classification.md", download: true },
      { title: "Reinforcement Learning", date: "2025-07-12", href: "/studies/machine-learning/9-Reinforcement-Learning.md", download: true },
      { title: "Principle Component Analysis", date: "2025-07-18", href: "/studies/machine-learning/10-Principle-Component-Analysis.md", download: true },
      { title: "Anomaly Detection", date: "2025-07-23", href: "/studies/machine-learning/Exp1-Anomaly-Detection.md", download: true },
      { title: "Diagnostics", date: "2025-07-27", href: "/studies/machine-learning/Exp2-Diagnostics.md", download: true },
      { title: "Optimization", date: "2025-07-31", href: "/studies/machine-learning/Exp3-Optimization.md", download: true },
    ],
  },
  {
    index: "04",
    title: "Others",
    defaultOpen: false,
    entries: [],
  },
];
