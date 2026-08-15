import type { Metadata } from "next";

import { AboutFooter } from "@/components/about/AboutFooter";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutProjects } from "@/components/about/AboutProjects";
import { AboutStack } from "@/components/about/AboutStack";
import { GridRowSection } from "@/components/GridRowSection";
import { HeroGrid } from "@/components/HeroGrid";
import { ScrollDownIcon } from "@/components/icons";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "About — Michael Yao",
  description: "A graphic introduction to Michael Yao beyond his academic work.",
};

/**
 * The interactive grid establishes the visual language; Projects, Stack,
 * and Impact extend its numbered cells and warm editorial palette.
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

      <AboutPrinciples />

      <AboutStack />

      <AboutImpact />

      <GridRowSection />

      <AboutFooter />
    </div>
  );
}
