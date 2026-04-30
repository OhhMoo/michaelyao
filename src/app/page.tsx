import { Nav } from "@/components/Nav";
import { HeroGrid } from "@/components/HeroGrid";
import { Featured } from "@/components/Featured";
import { Folders } from "@/components/Folders";
import { GridRowSection } from "@/components/GridRowSection";
import { Footer } from "@/components/Footer";
import { ScrollDownIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Nav />

      <section className="hero">
        <div className="hero-bg-circle"></div>
        <HeroGrid />
      </section>

      <div className="scroll-arrow">
        <ScrollDownIcon />
      </div>

      <Featured />

      <Folders />

      <div className="page-decor-wrap">
        <img
          className="page-decor page-decor-bed"
          src="/images/extra-bed.png"
          alt=""
          aria-hidden
        />
      </div>

      <GridRowSection />

      <Footer />
    </>
  );
}
