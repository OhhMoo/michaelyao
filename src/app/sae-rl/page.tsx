import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SaeRlSection } from "@/components/SaeRlSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SAE × RL — Michael Yao",
  description:
    "Sparse autoencoders trained across PPO checkpoints to measure how reinforcement learning reshapes a model's internal feature geometry.",
};

export default function SaeRlPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <SaeRlSection />
      </main>
      <Footer />
    </>
  );
}
