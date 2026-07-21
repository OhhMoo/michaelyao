import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StudyArchive } from "@/components/StudyArchive";

export const metadata: Metadata = {
  title: "Studies · Michael Yao",
  description: "An evolving archive of Michael Yao's study notes and rendered Obsidian pages.",
};

export default function StudiesPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <StudyArchive />
      </main>
      <Footer />
    </>
  );
}
