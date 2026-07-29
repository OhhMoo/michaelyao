import { Nav } from "@/components/Nav";
import { MayaHero } from "@/components/MayaHero";
import { InfoSection } from "@/components/InfoSection";
import { CareerSection } from "@/components/CareerSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Folders } from "@/components/Folders";
import { ClosingSection } from "@/components/ClosingSection";

export default function Home() {
  return (
    <>
      <Nav />

      <MayaHero />

      <InfoSection />

      <CareerSection />

      <ProjectsSection />

      <Folders />

      <ClosingSection />
    </>
  );
}
