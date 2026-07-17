import { FadeIn } from "@/components/FadeIn";

export function MayaHero() {
  return (
    <section id="home" className="maya-hero">
      <div className="maya-hero-bg maya-hero-bg-1" aria-hidden />
      <div className="maya-hero-bg maya-hero-bg-2" aria-hidden />
      <div className="maya-container">
        <div className="maya-hero-thumb">
          <FadeIn style={{ transitionDelay: "0.3s" }}>
            <h1>Hello, I am Michael!</h1>
          </FadeIn>
          <FadeIn style={{ transitionDelay: "0.5s" }}>
            <p>CS &amp; Math student &mdash; atoms and algorithms</p>
          </FadeIn>
          <FadeIn style={{ transitionDelay: "0.8s" }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="section-btn"
              download="Michael Yao Resume"
            >
              Download Resume
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
