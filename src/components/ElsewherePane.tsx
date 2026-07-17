const COMPANIES: { name: string; sub: string; logo?: string; href?: string }[] = [
  {
    name: "Alkera",
    sub: "ML Engineering Intern · YC-S26",
    logo: "/images/logos/alkera.png",
    href: "https://www.alkera.ai/",
  },
  {
    name: "Ersilia Open Source Initiative",
    sub: "ML Research Intern",
    logo: "/images/logos/ersilia-brand.png",
    href: "https://ersilia.io/",
  },
  {
    name: "Algoverse",
    sub: "Mechanistic Interpretability Researcher",
    logo: "/images/logos/algoverse.png",
  },
  {
    name: "Harvey Mudd College",
    sub: "Zhuang Group · Student Researcher",
    logo: "/images/logos/harvey-mudd.png",
    href: "https://ohhmoo.github.io/FLUID-LabSite/bilin/",
  },
];

export function ElsewherePane() {
  return (
    <div className="elsewhere-pane">
      <div className="group-title">Folder VI · Elsewhere</div>
      <h2 className="pane-heading">Elsewhere — other places.</h2>

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
