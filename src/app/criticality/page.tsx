import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { CriticalitySection } from "@/components/CriticalitySection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mode-Selective Criticality — Michael Yao",
  description:
    "Mean-field signal propagation in deep random tanh networks — variance and correlation maps, the order-to-chaos phase boundary. Zhuang Group, Harvey Mudd.",
};

export default function CriticalityPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <CriticalitySection />
      </main>
      <Footer />
    </>
  );
}
