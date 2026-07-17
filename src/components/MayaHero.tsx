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
            <a href="#info" className="section-btn">
              Discover more
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
