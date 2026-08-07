import styles from "./StudyProgress.module.css";

const progressRows = [
  {
    topic: "Machine-learning foundations",
    status: "established",
    fillClass: styles.fillEstablished,
  },
  {
    topic: "Graph machine learning",
    status: "active",
    fillClass: styles.fillGraph,
  },
  {
    topic: "Reinforcement learning",
    status: "active",
    fillClass: styles.fillReinforcement,
  },
  {
    topic: "Statistical physics of neural networks",
    status: "exploring",
    fillClass: styles.fillStatisticalPhysics,
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
