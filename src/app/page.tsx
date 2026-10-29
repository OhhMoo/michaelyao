import { AcademicMemo } from "@/components/academic/AcademicMemo";
import { SiteNav } from "@/components/SiteNav";
import "@/components/blog/memo.css";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      {/* The shared nav is position: fixed — this keeps the page clear of it. */}
      <div className="gl-nav-offset">
        <AcademicMemo />
      </div>
    </>
  );
}
