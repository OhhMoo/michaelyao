import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SpeqtroSection } from "@/components/SpeqtroSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SPEQTRO — Michael Yao",
  description:
    "An autonomous agent that identifies molecular structures from NMR, IR, and MS spectra using six specialist ML models.",
};

export default function SpeqtroPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <SpeqtroSection />
      </main>
      <Footer />
    </>
  );
}
