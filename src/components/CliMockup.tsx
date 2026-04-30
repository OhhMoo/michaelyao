"use client";

export type CliLineVariant =
  | "frame"
  | "logo"
  | "subtitle"
  | "meta"
  | "hint"
  | "rule"
  | "prompt"
  | "status";

export type CliLine = {
  text: string;
  variant?: CliLineVariant;
};

type CliMockupProps = {
  lines: CliLine[];
  /** Target width (in monospace chars). The frame is auto-trimmed/repadded. */
  width?: number;
};

/** Repad / retrim a single line so the box fits within `width` chars. */
function fitLine(line: string, width: number): string {
  if (line === "") return "";
  // Box content lines:  │ ... │
  if (line.startsWith("│") && line.endsWith("│")) {
    const inner = line.slice(1, -1).trimEnd();
    if (inner.length > width - 2) {
      return "│" + inner.slice(0, width - 2) + "│";
    }
    return "│" + inner.padEnd(width - 2, " ") + "│";
  }
  // Top frame:  ╭── title ──╮
  if (line.startsWith("╭") && line.endsWith("╮")) {
    const m = line.match(/^╭(─+)(\s.+?\s)(─+)╮$/);
    const title = m ? m[2] : "";
    const dashes = Math.max(0, width - 2 - title.length);
    const left = Math.floor(dashes / 2);
    const right = dashes - left;
    return "╭" + "─".repeat(left) + title + "─".repeat(right) + "╮";
  }
  // Bottom frame:  ╰────╯
  if (line.startsWith("╰") && line.endsWith("╯")) {
    return "╰" + "─".repeat(Math.max(0, width - 2)) + "╯";
  }
  // Horizontal rule (all dashes)
  if (/^─+$/.test(line)) {
    return "─".repeat(width);
  }
  // Prompt / status / empty lines — leave as-is
  return line;
}

export function CliMockup({ lines, width = 80 }: CliMockupProps) {
  return (
    <div className="mac-window mac-cli">
      <div className="mac-titlebar">
        <span className="mac-dot mac-dot-red" />
        <span className="mac-dot mac-dot-yellow" />
        <span className="mac-dot mac-dot-green" />
      </div>
      <div className="mac-body cli-body">
        <div className="cli-content">
          {lines.map((line, i) => {
            const variant = line.variant ?? "frame";
            const className = `cli-line cli-line-${variant}`;
            const text = fitLine(line.text, width);

            if (variant === "prompt" && text.startsWith("> ")) {
              return (
                <div key={i} className={className}>
                  <span className="cli-prompt-marker">&gt;</span>
                  <span className="cli-prompt-text"> {text.slice(2)}</span>
                  <span className="cli-caret" aria-hidden />
                </div>
              );
            }

            return (
              <div key={i} className={className}>
                {text || " "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
