import { FadeIn } from "@/components/FadeIn";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

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
              <div className="about-text">
                <p>
                  I&apos;m Michael &mdash; a computer-science &amp; math student at Harvey
                  Mudd, working in the Zhuang group on the statistical physics of deep neural
                  networks and the structural heterogeneity of supercooled water: mean-field
                  theory, large MD simulations, order-parameter embeddings.
                </p>
                <p>
                  Outside the lab I build tools at the seam of atoms and algorithms &mdash; agentic
                  spectroscopy reasoning, sparse autoencoders on RL-trained models, GNN pipelines
                  for MS/MS fragmentation. I care about systems you can hold in your head, and
                  results that survive being looked at twice.
                </p>
              </div>
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
