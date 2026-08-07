"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryLinks = [
  { href: "/", label: "Academic", key: "academic" },
  { href: "/about", label: "About", key: "about" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const activeKey = pathSegments.includes("about")
    ? "about"
    : pathSegments.includes("studies")
      ? null
      : "academic";

  return (
    <header className="simple-nav">
      <div className="simple-nav-inner">
        <Link className="simple-nav-name" href="/">
          Michael Yao
        </Link>
        <nav className="simple-nav-tabs" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link
              className={link.key === activeKey ? "is-active" : undefined}
              href={link.href}
              key={link.key}
              aria-current={link.key === activeKey ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
