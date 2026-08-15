import { FadeIn } from "../FadeIn";
import styles from "./AboutPrinciples.module.css";

type Principle = {
  index: string;
  title: string;
  description: string;
};

const PRINCIPLES: readonly Principle[] = [
  {
    index: "01",
    title: "Close the training–inspection loop",
    description:
      "I pair post-training with mechanistic interpretability so a model change is measured at both the output level and the activation level.",
  },
  {
    index: "02",
    title: "Controls make the claim",
    description:
      "Label shuffles, matched-gradient chains, input-only predictors, and cross-model comparisons separate task learning from noise, format learning, and guessability.",
  },
  {
    index: "03",
    title: "Auditability is a capability",
    description:
      "When monitoring and interpretability lag behind performance, trust becomes unaudited. A useful system should expose why it acted, not only whether it scored well.",
  },
  {
    index: "04",
    title: "Test behavior, not proxy signals",
    description:
      "Reliability should survive representation changes, multi-turn tool use, and realistic conditions. Measure the resulting behavior—not keyword matches or success against an imperfect grader.",
  },
] as const;

export function AboutPrinciples() {
  return (
    <section className={styles.section} aria-labelledby="principles-heading">
      <FadeIn className={styles.reveal}>
        <header className="section-header">
          <h2 className="section-header-label" id="principles-heading">Principles</h2>
        </header>
      </FadeIn>

      <div className={styles.list}>
        {PRINCIPLES.map((principle) => (
          <FadeIn className={styles.rowReveal} key={principle.index}>
            <article className={styles.row}>
              <span className={styles.index}>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
