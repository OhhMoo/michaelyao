import Link from "next/link";

import { FadeIn } from "../FadeIn";
import { ArrowRightIcon } from "../icons";
import styles from "./AboutProjects.module.css";

export function AboutProjects() {
  return (
    <section className={styles.section} aria-label="Academic projects">
      <FadeIn className={styles.reveal}>
        <Link className={styles.link} href="/#projects">
          Projects
          <ArrowRightIcon width={14} height={14} />
        </Link>
      </FadeIn>
    </section>
  );
}
