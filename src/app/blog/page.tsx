import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/BlogIndex";
import { SiteNav } from "@/components/SiteNav";
import "@/components/blog/memo.css";

export const metadata: Metadata = {
  title: "Blog — Michael Yao",
  description: "Research notes by Michael Yao, with live exhibits that run in the browser.",
};

export default function BlogPage() {
  return (
    <>
      <SiteNav />
      {/* The shared nav is position: fixed — this keeps the memo clear of it. */}
      <div className="gl-nav-offset">
        <BlogIndex />
      </div>
    </>
  );
}
