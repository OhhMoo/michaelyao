import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { MsPredSection } from "@/components/MsPredSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ms-pred-PyG — Michael Yao",
  description:
    "A PyTorch Geometric port of ICEBERG's MS/MS fragmentation-prediction pipeline — 19 files, three GNN families, no change in behaviour.",
};

export default function MsPredPage() {
  return (
    <>
      <Nav />
      <main className="page-with-nav">
        <MsPredSection />
      </main>
      <Footer />
    </>
  );
}
