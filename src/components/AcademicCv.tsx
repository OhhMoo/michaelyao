import Image from "next/image";
import Link from "next/link";

import { education, experience, type TimelineEntry } from "@/data/resume";

import styles from "./AcademicCv.module.css";

const selectedSoftware = [
  {
    title: "SPEQTRO",
    href: "/speqtro",
    description:
      "An autonomous agent that combines NMR, IR, and mass-spectrometry models into ranked molecular structures with traceable evidence.",
  },
  {
    title: "Chem-ICL",
    href: "/ersilia",
    description:
      "An in-context TabPFN pipeline that combines Ersilia model representations for molecular-property prediction without task-specific training.",
  },
  {
    title: "ms-pred × PyG",
    href: "/ms-pred",
    description:
      "A PyTorch Geometric port of ICEBERG’s MS/MS fragmentation pipeline across eight graph-neural-network families.",
  },
] as const;

type ExperienceLink = {
  label: string;
  href: string;
  external?: boolean;
};

type ExperienceDetails = {
  summary?: string;
  links?: readonly ExperienceLink[];
  projects?: readonly {
    title: string;
    summary: string;
    href: string;
    media:
      | {
          type: "image";
          src: string;
          alt: string;
          width: number;
          height: number;
        }
      | {
          type: "water-plots";
          plots: readonly {
            src: string;
            title: string;
          }[];
        };
  }[];
};

const experienceDetails: Record<string, ExperienceDetails> = {
  "Alkera AI, Inc. (YC-S26)": {
    summary:
      "Building reinforcement-learning infrastructure and evaluation systems for an LLM data agent.",
    links: [
      { label: "Read more", href: "https://www.alkera.ai/", external: true },
    ],
  },
  "Ersilia Open Source Initiative": {
    summary:
      "Developing Chem-ICL, an in-context learning pipeline for molecular-property prediction.",
    links: [{ label: "Read more", href: "/ersilia" }],
  },
  "Zhuang Group — Harvey Mudd College": {
    projects: [
      {
        title: "Statistical Physics of Deep Neural Networks",
        summary:
          "Using mean-field theory to study signal propagation, criticality, and trainable depth in random neural networks.",
        href: "/criticality",
        media: {
          type: "image",
          src: "/images/research/criticality/fixed-point-chaos-boundary.png",
          alt: "Heatmaps of the neural-network fixed point and order-to-chaos boundary",
          width: 1400,
          height: 536,
        },
      },
      {
        title: "Water × Unsupervised ML",
        summary:
          "Using unsupervised learning to identify latent structural populations in molecular-dynamics simulations of supercooled water.",
        href: "/water",
        media: {
          type: "water-plots",
          plots: [
            {
              src: "/plotly/water-3d-cluster0.html",
              title: "Interactive 3D view of water structure cluster 0",
            },
            {
              src: "/plotly/water-3d-cluster1.html",
              title: "Interactive 3D view of water structure cluster 1",
            },
          ],
        },
      },
    ],
  },
  Algoverse: {
    summary:
      "Tracing how reinforcement learning reshapes language-model representations with aligned sparse autoencoders.",
    links: [{ label: "Read more", href: "/sae-rl" }],
  },
};

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

function ExperienceTimeline({ entries }: TimelineProps) {
  return (
    <div className={styles.timeline}>
      {entries.map((entry) => {
        const details = experienceDetails[entry.heading];
        const links = details?.links ?? [];
        const projects = details?.projects ?? [];

        return (
          <article className={styles.entry} key={entry.heading}>
            <div className={styles.meta}>
              {entry.meta.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className={styles.entryContent}>
              <h3>{entry.heading}</h3>
              {details?.summary && <p>{details.summary}</p>}

              {projects.length > 0 && (
                <div className={styles.experienceProjects}>
                  {projects.map((project) => (
                    <section className={styles.experienceProject} key={project.href}>
                      <div className={styles.experienceProjectText}>
                        <h4>{project.title}</h4>
                        <p>{project.summary}</p>
                        <Link
                          className={styles.readMoreLink}
                          href={project.href}
                          aria-label={`Read more about ${project.title}`}
                        >
                          Read more
                        </Link>
                      </div>

                      {project.media.type === "image" ? (
                        <div className={styles.experienceProjectMedia}>
                          <Image
                            className={styles.experienceProjectImage}
                            src={project.media.src}
                            alt={project.media.alt}
                            width={project.media.width}
                            height={project.media.height}
                            sizes="(max-width: 700px) 100vw, 380px"
                          />
                        </div>
                      ) : (
                        <div
                          className={`${styles.experienceProjectMedia} ${styles.waterPlots}`}
                        >
                          {project.media.plots.map((plot) => (
                            <div className={styles.waterPlot} key={plot.src}>
                              <iframe src={plot.src} title={plot.title} loading="lazy" />
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              )}

              {links.length > 0 && (
                <nav
                  className={styles.readMoreLinks}
                  aria-label={`Read more about ${entry.heading}`}
                >
                  {links.map((link) =>
                    link.external ? (
                      <a
                        className={styles.readMoreLink}
                        href={link.href}
                        key={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link className={styles.readMoreLink} href={link.href} key={link.href}>
                        {link.label}
                      </Link>
                    ),
                  )}
                </nav>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function AcademicCv() {
  return (
    <main className={styles.root}>
      <header className={styles.identity}>
        <div className={styles.identityText}>
          <div className={styles.nameLine}>
            <h1>Michael Yao</h1>
            <Image
              className={styles.siteLogo}
              src="/seo/logo.png"
              alt=""
              width={28}
              height={41}
            />
          </div>
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
        <ExperienceTimeline entries={experience} />
      </section>

      <section className={styles.section} id="projects" aria-labelledby="software-heading">
        <h2 id="software-heading">Selected Software</h2>
        <ul className={styles.softwareList}>
          {selectedSoftware.map((item) => (
            <li className={styles.softwareItem} key={item.href}>
              <h3>
                <Link href={item.href}>{item.title}</Link>
              </h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <Timeline entries={education} />
      </section>

      <figure className={styles.endingIllustration}>
        <Image
          src="/images/illustrations/academic-sleep.png"
          alt="Line illustration of Michael sleeping on a couch among cats"
          width={918}
          height={742}
          sizes="(max-width: 700px) calc(100vw - 32px), 900px"
        />
      </figure>
    </main>
  );
}
