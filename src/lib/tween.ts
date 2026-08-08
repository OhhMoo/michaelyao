/** Shared easing/interpolation helpers for scroll-driven readouts. */

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);

export type LeadingNumber = {
  value: number;
  /** Decimal places in the source string — preserved while tweening. */
  decimals: number;
  /** Whether the source used thousands separators ("1,458"). */
  commas: boolean;
  /** Everything after the number (" × 10 splits", " / 45") — kept verbatim. */
  suffix: string;
};

/**
 * Parses stat strings that lead with a single number ("32 warm-start",
 * "9 × 10 splits", "44 / 45") so the numeric part can count up while the
 * unit/rest of the label stays fixed. Returns null when there is no leading
 * number — those stats stay plain text, never a fabricated tween.
 */
export function parseLeadingNumber(v: string): LeadingNumber | null {
  const m = v.match(/^([\d,]+(?:\.\d+)?)([\s\S]*)$/);
  if (!m) return null;
  const value = parseFloat(m[1].replace(/,/g, ""));
  if (Number.isNaN(value)) return null;
  const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0;
  return { value, decimals, commas: m[1].includes(","), suffix: m[2] };
}

/** Formats a tweened value with the source string's decimals/grouping. */
export function formatTweened(value: number, decimals: number, commas: boolean): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: commas,
  });
}

/** Decimal places present in a number literal (10.5 → 1, 200 → 0). */
export function decimalPlaces(n: number): number {
  const s = n.toString();
  return s.includes(".") ? s.split(".")[1].length : 0;
}
