"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AboutGrid.module.css";

type GridLayout = "desktop" | "mobile";

interface ImagePlacement {
  cell: number;
  image: number;
}

const placements: Record<GridLayout, readonly ImagePlacement[]> = {
  desktop: [
    { cell: 22, image: 1 },
    { cell: 0, image: 2 },
    { cell: 3, image: 3 },
    { cell: 7, image: 4 },
    { cell: 11, image: 5 },
    { cell: 15, image: 6 },
    { cell: 28, image: 7 },
    { cell: 34, image: 8 },
    { cell: 39, image: 9 },
    { cell: 44, image: 10 },
  ],
  mobile: [
    { cell: 22, image: 1 },
    { cell: 1, image: 2 },
    { cell: 4, image: 3 },
    { cell: 7, image: 4 },
    { cell: 10, image: 5 },
    { cell: 19, image: 6 },
    { cell: 25, image: 7 },
    { cell: 33, image: 8 },
    { cell: 36, image: 9 },
    { cell: 44, image: 10 },
  ],
};

const cells = Array.from({ length: 45 }, (_, index) => index);

export function AboutGrid() {
  const [layout, setLayout] = useState<GridLayout>("desktop");
  const [openImages, setOpenImages] = useState<ReadonlySet<number>>(
    () => new Set([1]),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    const updateLayout = (isMobile: boolean) => {
      setLayout(isMobile ? "mobile" : "desktop");
    };

    updateLayout(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      updateLayout(event.matches);
      setOpenImages(new Set([1]));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const imageByCell = new Map(
    placements[layout].map(({ cell, image }) => [cell, image]),
  );

  const toggleImage = (imageNumber: number) => {
    setOpenImages((current) => {
      const next = new Set(current);

      if (next.has(imageNumber)) {
        next.delete(imageNumber);
      } else {
        next.add(imageNumber);
      }

      return next;
    });
  };

  return (
    <section className={styles.section} aria-labelledby="about-grid-heading">
      <div className={styles.gridViewport}>
        <div className={styles.grid} role="group" aria-label="Interactive illustration grid">
          {cells.map((cell) => {
            const imageNumber = imageByCell.get(cell);

            if (imageNumber === undefined) {
              return <div className={styles.cell} aria-hidden="true" key={cell} />;
            }

            const isOpen = openImages.has(imageNumber);

            return (
              <button
                className={`${styles.cell} ${styles.imageCell}`}
                type="button"
                aria-label={`${isOpen ? "Hide" : "Reveal"} character illustration ${imageNumber}`}
                aria-pressed={isOpen}
                key={cell}
                onClick={() => toggleImage(imageNumber)}
              >
                <Image
                  className={styles.image}
                  src={`/images/about-grid/${imageNumber}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 64px, 104px"
                  unoptimized
                />
                <span
                  className={`${styles.cover} ${isOpen ? styles.coverOpen : ""}`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.context}>
        <h2 id="about-grid-heading">About</h2>
        <p>
          Michael works between computational science and machine learning, building tools for
          molecular systems and scientific reasoning.
        </p>
        <p>
          He keeps photography and illustration as a way of looking beyond the lab: a practice in
          noticing form, light, and small details.
        </p>
        <nav className={styles.links} aria-label="Michael Yao online">
          <a href="https://github.com/OhhMoo" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yiqi-yao-michael/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:myao3411@gmail.com">Email</a>
        </nav>
      </div>
    </section>
  );
}
