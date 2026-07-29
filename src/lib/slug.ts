/**
 * Deterministic slug for a timeline entry's DOM id. Used both to give each
 * rendered career entry a stable id and to build the matching id list that
 * useActiveSection watches (see CareerSection.tsx / LiveDashboard.tsx).
 *
 * NFKD normalization splits accented characters into base + combining mark;
 * the non-alphanumeric strip below then drops the combining marks along
 * with spaces and punctuation, so no separate diacritics regex is needed.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
