import Link from "next/link";
import { GridRowSection } from "@/components/GridRowSection";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/icons";

export function ClosingSection() {
  return (
    <section id="closing">
      <GridRowSection />

      <div className="closing-foot">
        <div className="maya-container">
          <p>&copy; 2026 Michael Yao</p>
          <ul className="social-icon social-icon--on-dark">
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
          <div className="closing-links">
            <Link href="/#projects">Work</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
