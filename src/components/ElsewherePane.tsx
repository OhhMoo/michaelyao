const LINKS = [
  { label: "github.com/OhhMoo ↗", href: "https://github.com/OhhMoo" },
  { label: "linkedin ↗", href: "https://www.linkedin.com/in/yiqi-yao-michael/" },
  { label: "myao3411@gmail.com", href: "mailto:myao3411@gmail.com" },
  { label: "ersilia contribution →", href: "/ersilia/" },
];

const COMPANIES: { name: string; sub: string; logo?: string; href?: string }[] = [
  {
    name: "Ersilia Open Source Initiative",
    sub: "ML Research Intern",
    logo: "/images/logos/ersilia-brand.png",
    href: "https://ersilia.io/",
  },
  { name: "Alkera AI", sub: "ML Engineering Intern · YC-S26" },
  { name: "Algoverse", sub: "Mechanistic Interpretability Researcher" },
  { name: "Harvey Mudd College", sub: "Zhuang Group · Student Researcher" },
];

export function ElsewherePane() {
  return (
    <div className="elsewhere-pane">
      <div className="group-title">Folder VI · Elsewhere</div>
      <h2 className="pane-heading">Elsewhere — other places.</h2>
      <p className="pane-intro">Code, email, scholar — the usual coordinates.</p>

      <div className="elsewhere-links">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="company-grid">
        {COMPANIES.map((c) => {
          const inner = (
            <>
              {c.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={c.logo} alt={c.name} />
              ) : (
                <span className="company-name">{c.name}</span>
              )}
              <span className="company-sub">{c.sub}</span>
            </>
          );
          return c.href ? (
            <a
              key={c.name}
              className="company-tile"
              href={c.href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {inner}
            </a>
          ) : (
            <div key={c.name} className="company-tile">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
