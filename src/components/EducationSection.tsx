import { FadeIn } from "@/components/FadeIn";
import { Timeline } from "@/components/Timeline";
import { education } from "@/data/resume";

export function EducationSection() {
  return (
    <section id="education" className="maya-section maya-section--alt">
      <div className="maya-container">
        <FadeIn style={{ transitionDelay: "0.2s" }}>
          <div className="maya-title">
            <h2>My Education</h2>
          </div>
        </FadeIn>
        <Timeline entries={education} />
      </div>
    </section>
  );
}
