import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Michael Yao",
  description: "Computer-science & math student at Harvey Mudd, Zhuang group.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
