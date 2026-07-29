import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { WaterSection } from "@/components/WaterSection";
import { Footer } from "@/components/Footer";
import { ProgressRail } from "@/components/ProgressRail";

export const metadata: Metadata = {
  title: "Water, clustered — Michael Yao",
  description:
    "Unsupervised machine-learning clustering of molecular-dynamics water, validated model-independently against the oxygen–oxygen structure factor. Zhuang Group, Harvey Mudd.",
};

export default function WaterPage() {
  return (
    <>
      <ProgressRail />
      <Nav />
      <main className="page-with-nav">
        <WaterSection />
      </main>
      <Footer />
    </>
  );
}
