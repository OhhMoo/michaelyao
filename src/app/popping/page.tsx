import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { PoppingSection } from "@/components/PoppingSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Popping Dictionary — Michael Yao",
  description:
    "A curated dictionary of popping dance elements — history, technique, and practice clips — rebuilt from Wix as a static Next.js site at poppindex.com.",
};

export default function PoppingPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <PoppingSection />
      </main>
      <Footer />
    </>
  );
}
