import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import {
  SELF_AUTHOR,
  cvProjects,
  education,
  industryExperience,
  profile,
  programs,
  publications,
  researchExperience,
  type TimelineEntry,
  type TimelineFigure,
  type TimelineLink,
} from "@/data/resume";

import styles from "./AcademicCv.module.css";

function CvLink({ link, className }: { link: TimelineLink; className?: string }) {
  if (link.href.startsWith("http")) {
    return (
      <a className={className} href={link.href} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    );
  }

  // Static files (e.g. /resume.pdf) and mailto: are not app routes.
  if (link.href.startsWith("/") && !link.href.includes(".")) {
    return (
      <Link className={className} href={link.href}>
        {link.label}
      </Link>
    );
  }

  return (
    <a className={className} href={link.href}>
      {link.label}
    </a>
  );
}

function LinkRow({ links }: { links?: TimelineLink[] }) {
  if (!links?.length) return null;

  return (
    <div className={styles.readMoreLinks}>
      {links.map((link) => (
        <CvLink className={styles.readMoreLink} key={link.href} link={link} />
      ))}
    </div>
  );
}

/** Turns "[n]" in resume text into a link to publication n. */
function withCitations(text: string): ReactNode[] {
  return text.split(/(\[\d+\])/).map((part, index) => {
    const match = /^\[(\d+)\]$/.exec(part);
    return match ? (
      <a className={styles.cite} href={`#pub-${match[1]}`} key={index}>
        {part}
      </a>
    ) : (
      part
    );
  });
}

function BulletList({ bullets }: { bullets?: string[] }) {
  if (!bullets?.length) return null;

  return (
    <ul>
      {bullets.map((bullet) => (
        <li key={bullet}>{withCitations(bullet)}</li>
      ))}
    </ul>
  );
}

function Figure({ figure }: { figure: TimelineFigure }) {
  if (figure.type === "image") {
    return (
      <div className={styles.figure}>
        <Image
          className={styles.figureImage}
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes="(max-width: 700px) 100vw, 420px"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.figure} ${styles.plots}`}>
      {figure.plots.map((plot) => (
        <div className={styles.plot} key={plot.src}>
          <iframe src={plot.src} title={plot.title} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function Meta({ items }: { items: string[] }) {
  return (
    <div className={styles.meta}>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className={styles.timeline}>
      {entries.map((entry) => (
        <article className={styles.entry} key={entry.heading}>
          <Meta items={entry.meta} />

          <div className={styles.entryContent}>
            <h3>{entry.heading}</h3>
            {entry.summary && <p>{entry.summary}</p>}
            {entry.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <BulletList bullets={entry.bullets} />

            {entry.subEntries?.map((subEntry) =>
              subEntry.figure ? (
                <section className={styles.experienceProject} key={subEntry.subtitle}>
                  <div className={styles.experienceProjectText}>
                    <h4>{subEntry.subtitle}</h4>
                    {subEntry.summary && <p>{withCitations(subEntry.summary)}</p>}
                    <BulletList bullets={subEntry.bullets} />
                    <LinkRow links={subEntry.links} />
                  </div>
                  <Figure figure={subEntry.figure} />
                </section>
              ) : (
                <div className={styles.subEntry} key={subEntry.subtitle}>
                  <div className={styles.subEntryHeading}>
                    <h4>{subEntry.subtitle}</h4>
                    {subEntry.dates && <p>{subEntry.dates}</p>}
                  </div>
                  {subEntry.summary && <p>{withCitations(subEntry.summary)}</p>}
                  <BulletList bullets={subEntry.bullets} />
                  <LinkRow links={subEntry.links} />
                </div>
              ),
            )}

            <LinkRow links={entry.links} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const headingId = `${id}-heading`;

  return (
    <section className={styles.section} id={id} aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      {children}
    </section>
  );
}

export function AcademicCv() {
  return (
    <main className={styles.root}>
      <header className={styles.identity}>
        <div className={styles.identityText}>
          <h1>{profile.name}</h1>
          <p className={styles.affiliation}>{profile.affiliation}</p>
          <div className={styles.introduction}>
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className={styles.interests}>
            <strong>Research interests:</strong> {profile.interests.join(" · ")}
          </p>
          <nav className={styles.links} aria-label="Academic profile links">
            {profile.links.map((link) => (
              <CvLink key={link.href} link={link} />
            ))}
          </nav>
        </div>

        <Image
          className={styles.portrait}
          src="/images/about/pfp.jpg"
          alt="Portrait of Michael Yao"
          width={187}
          height={233}
          priority
        />
      </header>

      <Section id="research" title="Research Experience">
        <Timeline entries={researchExperience} />
      </Section>

      <Section id="industry" title="Industry Experience">
        <Timeline entries={industryExperience} />
      </Section>

      <Section id="projects" title="Projects">
        <ul className={styles.softwareList}>
          {cvProjects.map((project) => (
            <li className={styles.softwareItem} key={project.href}>
              <h3>
                <Link href={project.href}>{project.title}</Link>
              </h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="publications" title="Publications">
        <ol className={styles.pubList}>
          {publications.map((publication) => (
            <li className={styles.pubItem} id={`pub-${publication.id}`} key={publication.id}>
              <span className={styles.pubNumber}>[{publication.id}]</span>
              <div>
                <p className={styles.pubCitation}>
                  {publication.authors.map((author, index) => (
                    <Fragment key={author}>
                      {index > 0 && ", "}
                      {author === SELF_AUTHOR ? <strong>{author}</strong> : author}
                    </Fragment>
                  ))}
                  {publication.authors.at(-1)?.endsWith(".") ? " " : ". "}
                  {publication.title}. <em>{publication.venue}</em>, {publication.year}.
                </p>
                <p className={styles.pubLinks}>
                  {publication.links.map((link) => (
                    <CvLink key={link.href} link={link} />
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="education" title="Education">
        <Timeline entries={education} />
      </Section>

      <Section id="programs" title="Programs">
        <Timeline entries={programs} />
      </Section>

      <figure className={styles.endingIllustration}>
        <Image
          src="/images/illustrations/academic-sleep.png"
          alt="Line illustration of Michael sleeping on a couch among cats"
          width={918}
          height={742}
          sizes="(max-width: 700px) 60vw, 300px"
        />
      </figure>
    </main>
  );
}
