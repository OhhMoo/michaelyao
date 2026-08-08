"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type AboutProject = {
  title: string;
  href: string;
  tags: readonly string[];
  description: string;
  /** 4:3 cover art for the card visual. */
  image: string;
  /** Optional clip that crossfades in on hover, as on the original. */
  video?: string;
};

/**
 * One card from georgialyu.com's PROJECTS grid. Two behaviours ride on the
 * anchor itself rather than a wrapper, because globals.css staggers the
 * reveal with `.project-card:nth-child(n).fade-in { transition-delay }`:
 *
 *  - reveal   — IntersectionObserver at threshold 0.12 / rootMargin -40px
 *  - hover    — the clip plays and crossfades over the still (`.video-ready`)
 */
export function AboutProjectCard({ project }: { project: AboutProject }) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {
      /* autoplay refused — the still stays up, which is the graceful case */
    });
    if (video.readyState >= 3) {
      setVideoReady(true);
    } else {
      video.addEventListener("canplay", () => setVideoReady(true), { once: true });
    }
  };

  const handleLeave = () => {
    const video = videoRef.current;
    setVideoReady(false);
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const className = [
    "project-card",
    "fade-in",
    visible ? "visible" : "",
    videoReady ? "video-ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      className={className}
      href={project.href}
      ref={cardRef}
      onMouseEnter={project.video ? handleEnter : undefined}
      onMouseLeave={project.video ? handleLeave : undefined}
    >
      <div className="project-inner">
        {/* No `--no-video` modifier even on video-less cards: that variant
            also kills the hover zoom, and on the original it is reserved for
            the one card that isn't a link at all. */}
        <div className="project-visual">
          <div
            className="project-img"
            style={{
              backgroundImage: `url('${project.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {project.video && (
            <video
              className="project-hover-video"
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="none"
            />
          )}
        </div>

        <div className="project-bottom">
          <div className="project-info">
            <div className="project-name-row">
              <h3 className="project-name">{project.title}</h3>
              <div className="project-name-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p className="project-desc">{project.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
