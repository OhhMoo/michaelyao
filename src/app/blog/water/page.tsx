import type { Metadata } from "next";

import { WaterMemo } from "@/components/blog/WaterMemo";
import { SiteNav } from "@/components/SiteNav";
import { water } from "@/data/blog";
import "@/components/blog/memo.css";

export const metadata: Metadata = {
  title: `${water.title} — Michael Yao`,
  description:
    "Unsupervised likelihood-ratio classification of simulated water molecules: two local structures in cold water that merge as it warms, with live exhibits. Zhuang Group, Harvey Mudd.",
};

export default function WaterPostPage() {
  return (
    <>
      <SiteNav />
      {/* The shared nav is position: fixed — this keeps the memo clear of it. */}
      <div className="gl-nav-offset">
        <WaterMemo />
      </div>
    </>
  );
}
