import { Nav } from "@/components/Nav";
import { MayaHero } from "@/components/MayaHero";
import { InfoSection } from "@/components/InfoSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Folders } from "@/components/Folders";
import { ClosingSection } from "@/components/ClosingSection";

export default function Home() {
  return (
    <>
      <Nav />

      <MayaHero />

      <InfoSection />

      <ExperienceSection />

      <EducationSection />

      <ProjectsSection />

      <Folders />

      <ClosingSection />
    </>
  );
}
