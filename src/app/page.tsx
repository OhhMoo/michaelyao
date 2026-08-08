import { AcademicCv } from "@/components/AcademicCv";
import { SiteNav } from "@/components/SiteNav";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      {/* The shared nav is position: fixed — this keeps the CV clear of it. */}
      <div className="gl-nav-offset">
        <AcademicCv />
      </div>
    </>
  );
}
