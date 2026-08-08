import styles from "./StudyProgress.module.css";

const progressRows = [
  {
    topic: "Machine-learning foundations",
    status: "established",
    fillClass: styles.fillEstablished,
    note: {
      label: "Note 03",
      title: "Clustering",
      date: "2025-06-08",
      href: "/studies/machine-learning/3-Clustering.md",
      excerpt:
        "K-means alternates between assigning points to their nearest centroid and moving each centroid toward its assigned points.",
    },
  },
  {
    topic: "Graph machine learning",
    status: "active",
    fillClass: styles.fillGraph,
    note: {
      label: "Note 01",
      title: "Introduction to GNN",
      date: "2026-03-10",
      href: "/studies/machine-learning-with-graph/Introduction-to-GNN.pdf",
      excerpt:
        "Graphs preserve relational structure; representation learning maps nodes into embeddings where network similarity can be measured.",
    },
  },
  {
    topic: "Reinforcement learning",
    status: "active",
    fillClass: styles.fillReinforcement,
    note: {
      label: "Latest note",
      title: "Introduction to Reinforcement Learning",
      date: "2026-07-21",
      href: "/studies/introduction-to-reinforcement-learning.pdf",
      excerpt:
        "A first map of optimization, delayed consequences, exploration, and how behavior cloning, reward modeling, and RLHF fit together.",
    },
  },
  {
    topic: "Statistical physics of neural networks",
    status: "exploring",
    fillClass: styles.fillStatisticalPhysics,
    note: {
      label: "Working note",
      title: "Signal propagation and criticality",
      date: "Current",
      href: "/criticality",
      excerpt:
        "Mean-field recursions track how variance and correlation evolve with depth and where the order-to-chaos transition appears.",
    },
  },
] as const;

export function StudyProgress() {
  return (
    <section className={styles.section} aria-labelledby="study-progress-heading">
      <header className={styles.header}>
        <h2 id="study-progress-heading" className={styles.heading}>
          Study progress
        </h2>
        <p className={styles.intro}>
          This is a rough qualitative snapshot of my learning progress, and it will be refined as
          the work develops.
        </p>
      </header>

      <div className={styles.chart}>
        {progressRows.map((row) => (
          <div className={styles.row} key={row.topic}>
            <div className={styles.rowLabel}>
              <span className={styles.topic}>{row.topic}</span>
              <span className={styles.status}>{row.status}</span>
            </div>
            <div className={styles.baseline} aria-hidden="true">
              <div className={`${styles.fill} ${row.fillClass}`} />
            </div>
            <article className={styles.notePreview}>
              <div className={styles.noteMeta}>
                <span>{row.note.label}</span>
                <time>{row.note.date}</time>
              </div>
              <a className={styles.noteTitle} href={row.note.href}>
                {row.note.title}
              </a>
              <p className={styles.noteExcerpt}>{row.note.excerpt}</p>
            </article>
          </div>
        ))}
      </div>

      <p className={styles.focus}>
        <span className={styles.focusLabel}>Current focus</span>
        Mean-field signal propagation, reinforcement learning, and graph-based molecular modeling.
      </p>
    </section>
  );
}
