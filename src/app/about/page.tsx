import type { Metadata } from "next";

import { AboutFooter } from "@/components/about/AboutFooter";
import { AboutProjects } from "@/components/about/AboutProjects";
import { GridRowSection } from "@/components/GridRowSection";
import { HeroGrid } from "@/components/HeroGrid";
import { ScrollDownIcon } from "@/components/icons";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "About — Michael Yao",
  description: "A graphic introduction to Michael Yao beyond his academic work.",
};

/**
 * Section order mirrors georgialyu.com/index.html exactly:
 * nav → hero grid → scroll arrow → PROJECTS → single-row grid → foot.
 * The `about-clone` wrapper re-pins the design tokens to that site's
 * values without touching any other route (see styles/about-clone.css).
 */
export default function AboutPage() {
  return (
    <div className="about-clone">
      <SiteNav />

      <section className="hero">
        <div className="hero-bg-circle" />
        <HeroGrid />
      </section>

      <div className="scroll-arrow">
        <ScrollDownIcon />
      </div>

      <AboutProjects />

      <GridRowSection />

      <AboutFooter />
    </div>
  );
}
