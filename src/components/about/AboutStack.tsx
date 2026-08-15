import Image from "next/image";

import { FadeIn } from "../FadeIn";
import styles from "./AboutStack.module.css";

type StackGroup = {
  index: string;
  title: string;
  note: string;
  items: readonly string[];
};

const STACK_GROUPS: readonly StackGroup[] = [
  {
    index: "01",
    title: "RL",
    note: "post-training, distributed learning, and model analysis",
    items: ["PyTorch", "TensorFlow", "GRPO", "PPO", "verl", "FSDP", "vLLM", "transformers", "sparse autoencoders", "scikit-learn", "reward engineering", "Qwen"],
  },
  {
    index: "02",
    title: "Agentic AI",
    note: "tool-using systems with observable, verifiable behavior",
    items: ["agent harnesses", "tool-use loops", "LLM evaluation", "verifiers", "MCP", "provenance", "in-context learning", "TabPFN"],
  },
  {
    index: "03",
    title: "Molecular Simulation",
    note: "simulation, stochastic systems, and chemical evidence",
    items: ["NumPy", "Pandas", "PyTorch Geometric", "OpenMM", "MDTraj", "molecular dynamics", "Gaussian mixtures", "stochastic processes", "Monte Carlo", "computer vision", "spectral ML"],
  },
  {
    index: "04",
    title: "System and Data Engineering",
    note: "the infrastructure underneath training and live products",
    items: ["Python", "C++", "SQL", "R", "TypeScript", "Docker", "Linux", "HPC", "DuckDB", "FastAPI", "SSE", "WebSocket", "tiered caching"],
  },
] as const;

export function AboutStack() {
  return (
    <section className={styles.section} aria-labelledby="stack-heading">
      <FadeIn className={styles.reveal}>
        <header className="section-header">
          <h2 className="section-header-label" id="stack-heading">Working stack</h2>
        </header>
      </FadeIn>

      <div className={styles.content}>
        <div className={styles.matrix}>
          {STACK_GROUPS.map((group) => (
            <FadeIn className={styles.rowReveal} key={group.index}>
              <article className={styles.row}>
                <span className={styles.index}>{group.index}</span>
                <div className={styles.groupHeading}>
                  <h3>{group.title}</h3>
                  <p>{group.note}</p>
                </div>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className={styles.figureReveal}>
          <figure className={styles.figure}>
            <Image
              src="/images/illustrations/stack-thinker.png"
              alt="Illustration of Michael standing in thought beside his working stack"
              width={569}
              height={759}
              sizes="(max-width: 780px) 130px, 190px"
            />
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}
