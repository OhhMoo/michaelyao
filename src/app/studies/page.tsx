import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { StudyProgress } from "@/components/StudyProgress";

export const metadata: Metadata = {
  title: "Study Progress — Michael Yao",
  description: "A rough qualitative snapshot of Michael Yao's current learning progress.",
};

export default function StudiesPage() {
  return (
    <>
      <Nav />
      <main className="simple-page">
        <StudyProgress />
      </main>
    </>
  );
}
