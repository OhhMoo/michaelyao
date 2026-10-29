import type { Metadata } from "next";

import { CriticalityMemo } from "@/components/blog/CriticalityMemo";
import { SiteNav } from "@/components/SiteNav";
import { criticality } from "@/data/blog";
import "@/components/blog/memo.css";

export const metadata: Metadata = {
  title: `${criticality.title} — Michael Yao`,
  description:
    "Mean-field signal propagation in deep random tanh networks: the length and correlation maps and the χ₁ = 1 order-to-chaos boundary, with live simulations. Zhuang Group, Harvey Mudd.",
};

export default function CriticalityPostPage() {
  return (
    <>
      <SiteNav />
      {/* The shared nav is position: fixed — this keeps the memo clear of it. */}
      <div className="gl-nav-offset">
        <CriticalityMemo />
      </div>
    </>
  );
}
