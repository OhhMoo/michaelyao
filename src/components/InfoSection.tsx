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
                <strong>School:</strong> <span>Harvey Mudd College &rsquo;29</span>
              </li>
              <li>
                <strong>Major:</strong> <span>Chemistry &amp; Computer Science</span>
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
                  I&apos;m Michael &mdash; a chemistry &amp; computer-science student at Harvey
                  Mudd, working in the Zhuang group on the structural heterogeneity of supercooled
                  water: large MD simulations, order-parameter embeddings, clustering into two
                  liquid-like states.
                </p>
                <p>
                  Outside the lab I build tools at the seam of atoms and algorithms &mdash; agentic
                  spectroscopy reasoning, sparse autoencoders on RL-trained models, GNN pipelines
                  for MS/MS fragmentation. I care about systems you can hold in your head, and
                  results that survive being looked at twice.
                </p>
              </div>
              <div className="about-btns">
                {/* TODO: drop the real PDF at public/resume.pdf */}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="/resume.pdf"
                  className="btn-custom"
                  download="Michael Yao Resume"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
