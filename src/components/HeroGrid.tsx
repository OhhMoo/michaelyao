"use client";

import { useEffect, useState } from "react";
import { buildCells, getLayout, type CellSpec, type GridLayout } from "@/lib/grid-data";
import { GridCell } from "./GridCell";

export function HeroGrid() {
  const [layout, setLayout] = useState<GridLayout | null>(null);
  const [cells, setCells] = useState<CellSpec[]>([]);
  const [extActive, setExtActive] = useState(false);
  const [extOpacity, setExtOpacity] = useState(0);
  const [hintOpacity, setHintOpacity] = useState(1);

  useEffect(() => {
    const compute = () => {
      const next = getLayout(window.innerWidth);
      setLayout((prev) => {
        if (!prev || prev.cols !== next.cols) {
          setCells(buildCells(next));
          return next;
        }
        return prev;
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 120;
      setHintOpacity(scrolled ? 0 : 1);
      setExtOpacity(scrolled ? 1 : 0);
      setExtActive(scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!layout) {
    return (
      <div className="hero-right">
        <div className="grid-wrap">
          <div className="grid" id="grid"></div>
        </div>
        <p className="grid-hint">Click the dark cells</p>
      </div>
    );
  }

  const center = Math.floor(layout.rows / 2) * layout.cols + Math.floor(layout.cols / 2);

  return (
    <div className="hero-right">
      <div className="grid-wrap">
        <div className="grid" id="grid">
          {cells.map((cell) => (
            <GridCell key={cell.index} cell={cell} startsOpen={cell.index === center} />
          ))}
        </div>
        <div
          className={`grid-col-ext grid-col-ext--bottom ${extActive ? "active" : ""}`}
          style={{ opacity: extOpacity }}
        >
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-cell"></div>
          <div className="grid-col-ext-char">
            <img className="grid-col-ext-img" src="/images/extra-1.png" alt="" />
            <div className="grid-col-ext-bubble">
              👀 Take a glimpse of what I&apos;ve been working on!
            </div>
          </div>
        </div>
      </div>
      <p className="grid-hint" style={{ opacity: hintOpacity }}>
        Click the dark cells
      </p>
    </div>
  );
}
