import type { ReactNode } from "react";

type SidenoteProps = {
  children: ReactNode;
};

/**
 * Tufte-style margin note: drop it inline inside prose, right where the
 * aside is cited. Renders a numbered superscript reference immediately
 * followed by the floated note itself; both share the `essay-sidenote`
 * CSS counter (reset once per `.essay` ancestor) so their numbers stay
 * in sync automatically — no manual index prop needed.
 *
 * Usage:
 *   <p>
 *     ...some claim in the prose
 *     <Sidenote>a genuinely tangential aside about that claim.</Sidenote>
 *     ...the sentence continues.
 *   </p>
 *
 * Must be used inside an ancestor with the `.essay` class (see globals.css,
 * "ESSAY SYSTEM" section) so the counter and float geometry are defined.
 */
export function Sidenote({ children }: SidenoteProps) {
  return (
    <>
      <sup className="essay-sidenote-ref" aria-hidden="true" />
      <span className="essay-sidenote">{children}</span>
    </>
  );
}
