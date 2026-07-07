import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ErsiliaSection } from "@/components/ErsiliaSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ersilia — Michael Yao",
  description:
    "Contributor to the Ersilia Open Source Initiative — chem-icl, in-context learning for chemistry over Ersilia's model hub.",
};

export default function ErsiliaPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <ErsiliaSection />
      </main>
      <Footer />
    </>
  );
}
