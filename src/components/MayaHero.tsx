import { FadeIn } from "@/components/FadeIn";

export function MayaHero() {
  return (
    <section id="home" className="maya-hero">
      <div className="maya-container">
        <div className="maya-hero-thumb">
          <FadeIn style={{ transitionDelay: "0.3s" }}>
            <h1>Hello, I am Michael!</h1>
          </FadeIn>
          <FadeIn style={{ transitionDelay: "0.5s" }}>
            <p>Chemistry &amp; CS student &mdash; atoms and algorithms</p>
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
