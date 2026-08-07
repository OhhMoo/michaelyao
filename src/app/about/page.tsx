import type { Metadata } from "next";
import { AboutGrid } from "@/components/AboutGrid";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "About — Michael Yao",
  description: "A graphic introduction to Michael Yao beyond his academic work.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="simple-page">
        <AboutGrid />
      </main>
    </>
  );
}
