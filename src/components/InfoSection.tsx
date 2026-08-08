import { FadeIn } from "@/components/FadeIn";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

// Real figures only — no invented stats (same convention as resume.ts).
const STATS = [
  { k: "Active roles", v: "4" },
  { k: "Projects shipped", v: "8" },
  { k: "GitHub stars", v: "1.5k+" },
  { k: "Manuscripts", v: "1" },
];

export function InfoSection() {
  return (
    <section id="info" className="maya-section">
      <div className="maya-container">
        <FadeIn style={{ transitionDelay: "0.2s" }}>
          <div className="maya-info-grid">
            <ul className="info-list">
              <li>
                <strong>Name:</strong> <span>Michael Yao</span>
              </li>
              <li>
                <strong>School:</strong> <span>Harvey Mudd College &rsquo;28</span>
              </li>
              <li>
                <strong>Major:</strong> <span>Joint Computer Science &amp; Mathematics</span>
              </li>
              <li>
                <strong>Lab:</strong> <span>Zhuang Group</span>
              </li>
              <li>
                <strong>Based:</strong> <span>Claremont, CA</span>
              </li>
              <li>
                <ul className="social-icon">
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://github.com/OhhMoo"
                      aria-label="GitHub"
                    >
                      <GitHubIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.linkedin.com/in/yiqi-yao-michael/"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:myao3411@gmail.com" aria-label="Email">
                      <EmailIcon />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
              <p className="info-epigraph">
                Atoms and algorithms &mdash; computational physics, ML interpretability, and the
                tools in between.
              </p>
              <dl className="stat-strip">
                {STATS.map((stat) => (
                  <div className="stat-cell" key={stat.k}>
                    <dt className="k">{stat.k}</dt>
                    <dd className="v">{stat.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="about-btns">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="/resume.pdf"
                  className="btn-discover"
                  download="Michael Yao Resume"
                >
                  Download Resume <span aria-hidden="true">›</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
