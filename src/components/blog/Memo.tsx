import Image from "next/image";
import type { ReactNode } from "react";

import { LineNumbers } from "./LineNumbers";

const RULE = "=".repeat(240);

/** A page set as a numbered transcript; its children are the rows. */
export function Memo({ labelledBy, children }: { labelledBy: string; children: ReactNode }) {
  return (
    <article className="memo" aria-labelledby={labelledBy}>
      <LineNumbers />
      <div className="doc">
        <div className="sheet">{children}</div>
      </div>
    </article>
  );
}

export function Divider() {
  return (
    <div className="l divider" aria-hidden="true">
      <span>{RULE}</span>
    </div>
  );
}

/** Keeps symbols in their own case inside capitalised rows. */
export function M({ children }: { children: ReactNode }) {
  return <span className="m">{children}</span>;
}

/** Two-column rows; on phones the value drops under its key. */
export function Table({ head, rows }: { head?: [ReactNode, ReactNode]; rows: [ReactNode, ReactNode][] }) {
  return (
    <>
      {head && (
        <div className="l tx">
          <span>{head[0]}</span>
          <span className="dt">{head[1]}</span>
        </div>
      )}
      {rows.map(([key, value], i) => (
        <div className="l tx" key={i}>
          <span>
            {key}
            <span className="dt-m">{value}</span>
          </span>
          <span className="dt">{value}</span>
        </div>
      ))}
    </>
  );
}

/** A research figure with its caption row and a sentence on what it shows. */
export function AppendixFigure({ src, alt, width, height, caption, note, children }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  note: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <figure className="plate">
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 680px) 100vw, 864px" />
      </figure>
      <div className="l">
        <span>{caption}</span>
        <span>{note}</span>
      </div>
      <div className="l para">
        <span>{children}</span>
      </div>
      <div className="l" />
    </>
  );
}
