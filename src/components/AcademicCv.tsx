import Image from "next/image";
import Link from "next/link";

import { education, experience, type TimelineEntry } from "@/data/resume";

import styles from "./AcademicCv.module.css";

const selectedResearch = [
  {
    title: "Water",
    href: "/water",
    description:
      "Unsupervised classification of structural heterogeneity across molecular-dynamics trajectories, validated against an independent oxygen–oxygen structure factor.",
  },
  {
    title: "Mode-Selective Criticality",
    href: "/criticality",
    description:
      "A mean-field study of signal propagation in random tanh networks, tracing the order-to-chaos boundary and asking which modes survive depth.",
  },
  {
    title: "SAE × RL",
    href: "/sae-rl",
    description:
      "Sparse autoencoders trained across PPO checkpoints measure how reinforcement learning reorganizes a language model’s internal feature geometry.",
  },
  {
    title: "SPEQTRO",
    href: "/speqtro",
    description:
      "An autonomous agent that combines specialist models for NMR, IR, and mass spectra into ranked molecular structures with traceable evidence.",
  },
  {
    title: "chem-icl",
    href: "/ersilia",
    description:
      "An in-context TabPFN pipeline that combines Ersilia model representations to predict molecular properties without training a new model for every task.",
  },
  {
    title: "ms-pred-PyG",
    href: "/ms-pred",
    description:
      "A port of ICEBERG’s MS/MS fragmentation pipeline from DGL to PyTorch Geometric, covering 19 files and eight graph-neural-network families.",
  },
] as const;

type TimelineProps = {
  entries: TimelineEntry[];
};

function Timeline({ entries }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {entries.map((entry) => (
        <article className={styles.entry} key={entry.heading}>
          <div className={styles.meta}>
            {entry.meta.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className={styles.entryContent}>
            <h3>{entry.heading}</h3>

            {entry.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

            {entry.bullets && (
              <ul>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}

            {entry.subEntries?.map((subEntry) => (
              <div className={styles.subEntry} key={subEntry.subtitle}>
                <div className={styles.subEntryHeading}>
                  <h4>{subEntry.subtitle}</h4>
                  {subEntry.dates && <p>{subEntry.dates}</p>}
                </div>
                <ul>
                  {subEntry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}

            {entry.footnote && (
              <p className={styles.footnote}>
                {entry.footnote.text} {" "}
                <Link href={entry.footnote.href}>{entry.footnote.label}</Link>.
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function AcademicCv() {
  return (
    <main className={styles.root}>
      <header className={styles.identity}>
        <div className={styles.identityText}>
          <h1>Michael Yao</h1>
          <p className={styles.affiliation}>Computer Science &amp; Mathematics · Harvey Mudd College</p>
          <div className={styles.introduction}>
            <p>
              I work at the intersection of computational physics, machine-learning
              interpretability, and molecular machine learning. My research pairs theory and
              simulation with careful research software to make complex scientific and learned
              systems easier to measure, test, and understand.
            </p>
          </div>
          <nav className={styles.links} aria-label="Academic profile links">
            <a href="mailto:myao3411@gmail.com">Email</a>
            <Link href="/resume.pdf">CV (PDF)</Link>
            <a href="https://github.com/OhhMoo" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yiqi-yao-michael/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <Image
          className={styles.portrait}
          src="/images/about/pfp.jpg"
          alt="Portrait of Michael Yao"
          width={132}
          height={164}
          priority
        />
      </header>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading">Research &amp; Experience</h2>
        <Timeline entries={experience} />
      </section>

      <section className={styles.section} aria-labelledby="research-heading">
        <h2 id="research-heading">Selected Research &amp; Software</h2>
        <div className={styles.researchList}>
          {selectedResearch.map((item) => (
            <article className={styles.researchItem} key={item.href}>
              <h3>
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <Timeline entries={education} />
      </section>
    </main>
  );
}
