"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const TABS = [
  { href: "/", label: "Academic", key: "academic" },
  { href: "/about", label: "About", key: "about" },
] as const;

/**
 * The shared site header, in georgialyu.com's style: two-line wordmark left,
 * tabs centre, social icons right, hamburger under 768px. Used by both the
 * academic page and the About clone so the two share one header and one set
 * of tabs; `.gl-nav` styling is hard-coded (see styles/site-nav.css) so it
 * renders identically on top of either page's token set.
 *
 * Hides on scroll-down past 80px, reappears on scroll-up — the original's rule.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeKey = pathname.split("/").filter(Boolean).includes("about")
    ? "about"
    : "academic";

  const className = ["nav", "gl-nav", hidden ? "nav--hidden" : "", menuOpen ? "menu-open" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={className} id="nav">
      <Link className="nav-logo" href="/">
        MICHAEL YAO
        <br />
        <span>RESEARCHER</span>
      </Link>

      <div className="nav-center">
        {TABS.map((tab) => (
          <Link
            className={tab.key === activeKey ? "active" : undefined}
            href={tab.href}
            key={tab.key}
            aria-current={tab.key === activeKey ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <div className="nav-icons">
          <a
            href="https://www.linkedin.com/in/yiqi-yao-michael/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a href="https://github.com/OhhMoo" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="mailto:myao3411@gmail.com" aria-label="Email">
            <EmailIcon />
          </a>
        </div>

        <ThemeToggle />

        <button
          className="nav-menu-btn"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
