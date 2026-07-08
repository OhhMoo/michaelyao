import { FadeIn } from "@/components/FadeIn";
import { Timeline } from "@/components/Timeline";
import { experience } from "@/data/resume";

export function ExperienceSection() {
  return (
    <section id="experience" className="maya-section maya-section--alt">
      <div className="maya-container">
        <FadeIn style={{ transitionDelay: "0.2s" }}>
          <div className="maya-title">
            <h2>My Experience</h2>
          </div>
        </FadeIn>
        <Timeline entries={experience} />
      </div>
    </section>
  );
}
