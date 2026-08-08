import Link from "next/link";

import { FadeIn } from "../FadeIn";
import { ArrowRightIcon } from "../icons";
import { AboutProjectCard, type AboutProject } from "./AboutProjectCard";

/**
 * Four featured works. Descriptions are one-liners in the register of the
 * original's cards — the full argument lives on each project's own page.
 */
const FEATURED: readonly AboutProject[] = [
  {
    title: "SPEQTRO",
    href: "/speqtro",
    tags: ["Agent", "Spectroscopy", "Tooling"],
    description:
      "An autonomous agent that turns NMR, IR and MS spectra into ranked structures",
    // Still image only — the animated terminal capture lives on /speqtro.
    image: "/images/about-projects/speqtro.png",
  },
  {
    title: "Chem-ICL",
    href: "/ersilia",
    tags: ["Molecular ML", "TabPFN"],
    description:
      "In-context molecular property prediction with no task-specific training",
    image: "/images/about-projects/chem-icl.png",
  },
];

export function AboutProjects() {
  return (
    <section className="work" id="work">
      <FadeIn>
        <div className="section-header">
          <span className="section-header-label">PROJECTS</span>
        </div>
      </FadeIn>

      <div className="projects">
        {FEATURED.map((project) => (
          <AboutProjectCard key={project.href} project={project} />
        ))}
      </div>

      <FadeIn>
        <div className="section-header">
          {/* The academic page is the full record — this is the "see more" target. */}
          <Link className="section-header-label" href="/">
            SEE MORE WORK
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
