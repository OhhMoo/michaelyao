"use client";

import { useEffect } from "react";

/**
 * Numbers every rendered line of the memo, so a row that wraps onto a second line reads 6, 7.
 * Without it the CSS counter still numbers rows, one number each.
 */
export function LineNumbers() {
  useEffect(() => {
    const doc = document.querySelector<HTMLElement>(".memo .doc");
    if (!doc) return;
    let pending = 0;

    const number = () => {
      pending = 0;
      // Read every row first, then write, so the page lays out once.
      const plan: [HTMLElement, string | null, number][] = [];
      let n = 0;
      for (const row of doc.querySelectorAll<HTMLElement>(".l")) {
        if (!row.getClientRects().length) {
          plan.push([row, null, 0]);
          continue;
        }
        const lh = parseFloat(getComputedStyle(row).lineHeight) || 27;
        const lines = Math.max(1, Math.round(row.getBoundingClientRect().height / lh));
        const nums: number[] = [];
        for (let i = 0; i < lines; i++) nums.push(++n);
        plan.push([row, nums.join("\n"), lh]);
      }
      for (const [row, text, lh] of plan) {
        if (text === null) {
          delete row.dataset.ln;
          continue;
        }
        if (row.dataset.ln !== text) row.dataset.ln = text;
        row.style.setProperty("--ln-lh", `${lh}px`);
      }
    };
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(number);
    };

    // Re-number when rows re-wrap (resize, late web font) or rows come and go. The exhibits'
    // live readouts change text without changing row heights, so they do not trigger this.
    const resize = new ResizeObserver(schedule);
    const watch = () => doc.querySelectorAll(".l").forEach((row) => resize.observe(row));
    const hasRow = (node: Node) => node instanceof Element && (node.matches(".l") || node.querySelector(".l") !== null);
    const mutation = new MutationObserver((records) => {
      if (records.some((r) => [...r.addedNodes].some(hasRow) || [...r.removedNodes].some(hasRow))) {
        watch();
        schedule();
      }
    });
    mutation.observe(doc, { subtree: true, childList: true });
    watch();
    void document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      resize.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(pending);
    };
  }, []);

  return null;
}
