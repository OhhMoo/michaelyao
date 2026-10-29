import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { Divider, Memo } from "@/components/blog/Memo";
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
  type TimelineLink,
} from "@/data/resume";

import { CircleTrio } from "./CircleTrio";

function Chip({ link }: { link: TimelineLink }) {
  const label = link.label.toUpperCase();
  if (link.href.startsWith("http")) {
    return (
      <a className="chip" href={link.href} target="_blank" rel="noreferrer">
        {label} ↗
      </a>
    );
  }
  // Static files (e.g. /resume.pdf) and mailto: are not app routes.
  if (link.href.startsWith("/") && !link.href.includes(".")) {
    return (
      <Link className="chip" href={link.href}>
        {label} →
      </Link>
    );
  }
  return (
    <a className="chip" href={link.href}>
      {label}
    </a>
  );
}

function Chips({ links, indent }: { links?: TimelineLink[]; indent?: boolean }) {
  if (!links?.length) return null;
  return (
    <div className={indent ? "l chips in" : "l chips"}>
      <span>
        {links.map((link) => (
          <Chip key={link.href} link={link} />
        ))}
      </span>
    </div>
  );
}

/** The last meta item is always the date range; the rest is the role, advisor and place. */
function Entry({ entry }: { entry: TimelineEntry }) {
  const date = entry.meta[entry.meta.length - 1];
  const details = entry.meta.slice(0, -1).join(" · ");
  return (
    <>
      <div className="l entry">
        <span>{entry.heading}</span>
        <span>{date}</span>
      </div>
      {details && (
        <div className="l dim">
          <span>{details}</span>
        </div>
      )}
      {entry.summary && (
        <div className="l para">
          <span>{entry.summary}</span>
        </div>
      )}
      {entry.summary && entry.paragraphs?.length ? <div className="l" /> : null}
      {entry.paragraphs?.map((paragraph) => (
        <div className="l para" key={paragraph}>
          <span>{paragraph}</span>
        </div>
      ))}
      {entry.bullets?.map((bullet) => (
        <div className="l para in" key={bullet}>
          <span>- {bullet}</span>
        </div>
      ))}
      {entry.subEntries?.map((sub) => (
        <Fragment key={sub.subtitle}>
          <div className="l" />
          <div className="l in">
            <span>{sub.subtitle}</span>
            {sub.dates && <span>{sub.dates}</span>}
          </div>
          {sub.summary && (
            <div className="l dim in">
              <span>{sub.summary}</span>
            </div>
          )}
          <Chips links={sub.links} indent />
          {sub.sketch === "circles" && <CircleTrio />}
        </Fragment>
      ))}
      <Chips links={entry.links} />
      <div className="l" />
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Divider />
      <div className="l" />
      <div className="l c gap">
        <h2>{title}</h2>
      </div>
      <div className="l" />
      {children}
    </>
  );
}

export function AcademicMemo() {
  return (
    <Memo labelledBy="cv-name">
      <h1 className="sr-only" id="cv-name">
        {profile.name}
      </h1>
      <figure className="portrait-fig">
        <Image
          className="portrait"
          src="/images/about/pfp.jpg"
          alt="Portrait of Michael Yao"
          width={200}
          height={249}
          sizes="200px"
          priority
        />
      </figure>
      {profile.bio.map((paragraph) => (
        <Fragment key={paragraph}>
          <div className="l para">
            <span>{paragraph}</span>
          </div>
          <div className="l" />
        </Fragment>
      ))}
      <div className="l kv">
        <span>INTERESTS</span>
        <span>{profile.interests.join(" · ")}</span>
      </div>
      <div className="l" />
      <Chips links={profile.links} />
      <div className="l clear" />

      <Section title="RESEARCH EXPERIENCE">
        {researchExperience.map((entry) => (
          <Entry key={entry.heading} entry={entry} />
        ))}
      </Section>

      <Section title="INDUSTRY EXPERIENCE">
        {industryExperience.map((entry) => (
          <Entry key={entry.heading} entry={entry} />
        ))}
      </Section>

      <Section title="PROJECTS">
        {cvProjects.map((project) => (
          <div className="l kv" key={project.href}>
            <span>
              <a href={project.href} target="_blank" rel="noreferrer">
                {project.title.toUpperCase()} ↗
              </a>
            </span>
            <span>{project.description}</span>
          </div>
        ))}
        <div className="l" />
      </Section>

      <Section title="PUBLICATIONS">
        {publications.map((publication) => (
          <Fragment key={publication.id}>
            <div className="l ref" id={`pub-${publication.id}`}>
              <span>[{publication.id}]</span>
              <span>
                {publication.authors.map((author, index) => (
                  <Fragment key={author}>
                    {index > 0 && ", "}
                    {author === SELF_AUTHOR ? <span className="me">{author}</span> : author}
                  </Fragment>
                ))}
                {publication.authors.at(-1)?.endsWith(".") ? " " : ". "}
                {publication.title}. <span className="dim">{publication.venue}</span>, {publication.year}.
              </span>
            </div>
            <div className="l ref chips">
              <span />
              <span>
                {publication.links.map((link) => (
                  <Chip key={link.href} link={link} />
                ))}
              </span>
            </div>
            <div className="l" />
          </Fragment>
        ))}
      </Section>

      <Section title="EDUCATION">
        {education.map((entry) => (
          <Entry key={entry.heading} entry={entry} />
        ))}
      </Section>

      <Section title="PROGRAMS">
        {programs.map((entry) => (
          <Entry key={entry.heading} entry={entry} />
        ))}
      </Section>

      <Divider />
      <figure className="ending">
        <Image
          src="/images/illustrations/academic-sleep.png"
          alt="Line illustration of Michael sleeping on a couch among cats"
          width={918}
          height={742}
          sizes="300px"
        />
      </figure>
      <div className="l c">
        <span>*** END OF PAGE ***</span>
      </div>
    </Memo>
  );
}
