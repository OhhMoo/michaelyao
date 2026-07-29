import { FadeIn } from "@/components/FadeIn";
import { Timeline, type CareerTimelineEntry } from "@/components/Timeline";
import { LiveDashboard } from "@/components/LiveDashboard";
import { experience, education, type TimelineEntry } from "@/data/resume";
import { slugify } from "@/lib/slug";

function withIds(entries: TimelineEntry[], sectionLabel: string): CareerTimelineEntry[] {
  return entries.map((entry) => ({
    ...entry,
    id: slugify(entry.heading),
    sectionLabel,
  }));
}

/**
 * Merges Experience + Education into one continuous, reverse-chronological
 * scroll narrative (Experience first, then Education), with a sticky
 * LiveDashboard tracking whichever entry is currently in view. Replaces
 * the old ExperienceSection + EducationSection pair.
 */
export function CareerSection() {
  const experienceEntries = withIds(experience, "Experience");
  const educationEntries = withIds(education, "Education");
  const allEntries = [...experienceEntries, ...educationEntries];

  return (
    <section id="career" className="maya-section maya-section--alt">
      <div className="maya-container career-layout">
        <div className="career-main">
          <FadeIn style={{ transitionDelay: "0.2s" }}>
            <div className="maya-title">
              <h2>Experience &amp; Education</h2>
            </div>
          </FadeIn>
          <Timeline entries={experienceEntries} />
          <Timeline entries={educationEntries} />
        </div>
        <LiveDashboard entries={allEntries} />
      </div>
    </section>
  );
}
