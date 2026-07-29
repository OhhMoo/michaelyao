import type { ReactNode } from "react";

export type EssayFootnote = {
  text: ReactNode;
};

type EssayFootnotesProps = {
  notes: EssayFootnote[];
};

/**
 * Numbered footnote list for the end of an `.essay`-styled page — citations,
 * source links, etc. Renders nothing if `notes` is empty.
 *
 * Usage:
 *   <EssayFootnotes
 *     notes={[
 *       { text: "Some citation or clarifying note." },
 *       { text: <>Code: <a href="https://github.com/...">repo</a></> },
 *     ]}
 *   />
 */
export function EssayFootnotes({ notes }: EssayFootnotesProps) {
  if (notes.length === 0) return null;

  return (
    <div className="essay-footnotes">
      <ol>
        {notes.map((note, index) => (
          <li key={index}>{note.text}</li>
        ))}
      </ol>
    </div>
  );
}
