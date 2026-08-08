export type DeltaStat = { from: number; to: number; suffix: string };

/**
 * Parses "before → after" stat strings (e.g. "10.5% → 46.2%", "1,458 → 200")
 * into numeric endpoints for bar-chart rendering. Returns null for anything
 * that isn't a two-value delta (counts, ratios, fractions) so those stay as
 * plain text — never fabricates a chart out of non-comparable data.
 */
export function parseDeltaStat(v: string): DeltaStat | null {
  const m = v.match(/^([\d,]+(?:\.\d+)?)\s*(%?)\s*(?:→|->)\s*([\d,]+(?:\.\d+)?)\s*(%?)\s*$/);
  if (!m) return null;
  const from = parseFloat(m[1].replace(/,/g, ""));
  const to = parseFloat(m[3].replace(/,/g, ""));
  const suffix = m[2] || m[4] || "";
  if (Number.isNaN(from) || Number.isNaN(to)) return null;
  return { from, to, suffix };
}
