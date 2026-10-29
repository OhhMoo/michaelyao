"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { chi1, depthScale, qStar } from "@/lib/meanfield";

import { pad, regime } from "./format";
import { snap } from "./plot";
import { useAnimationLoop, useBox, usePrefersReducedMotion } from "./useExhibit";

const COLS = 64;
const ROWS = 32;
const SB_MAX = 4;
const SW_MIN = 1;
const SW_MAX = 5;
const SB_NETWORKS = 0.3;
const NETWORKS = [1.2, 2.5, 4.0];
const PAD = { left: 30, right: 12, top: 10, bottom: 24 };

const rowWeight = (r: number) => SW_MAX - ((SW_MAX - SW_MIN) * (r + 0.5)) / ROWS;
const colBias = (c: number) => (SB_MAX * (c + 0.5)) / COLS;

/** χ₁ across one row of the grid; each q* search starts from its neighbour's answer. */
function computeRow(r: number): Float64Array {
  const sw = rowWeight(r);
  const out = new Float64Array(COLS);
  let q = 1;
  for (let c = 0; c < COLS; c++) {
    q = qStar(sw, colBias(c), q);
    out[c] = chi1(sw, colBias(c), q);
  }
  return out;
}

/** Where χ₁ falls through 1 in each column, interpolated between printed rows, as [σ_b, σ_w]. */
function boundary(rows: Float64Array[]): [number, number][] {
  const points: [number, number][] = [];
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r + 1 < rows.length; r++) {
      const a = rows[r][c] - 1;
      const b = rows[r + 1][c] - 1;
      if (a > 0 && b <= 0) {
        points.push([colBias(c), rowWeight(r) + (a / (a - b)) * (rowWeight(r + 1) - rowWeight(r))]);
        break;
      }
    }
  }
  return points;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const toGrid = (v: number) => Math.round(v * 20) / 20;
const probeAt = (sw: number, sb: number) => ({ sw: toGrid(clamp(sw, SW_MIN, SW_MAX)), sb: toGrid(clamp(sb, 0, SB_MAX)) });
const depthText = (xi: number) => (xi > 999 ? "∞ LAYERS" : `${xi.toFixed(1)} LAYERS`);

export function PhaseExhibit() {
  const figRef = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const [rows, setRows] = useState<Float64Array[]>([]);
  const [probe, setProbe] = useState({ sw: 2.5, sb: SB_NETWORKS });
  const { width, line } = useBox(figRef);
  const printing = rows.length < ROWS;

  useAnimationLoop(figRef, printing, () => {
    setRows((prev) => (prev.length < ROWS ? [...prev, computeRow(prev.length)] : prev));
  });

  const readout = useMemo(() => {
    const q = qStar(probe.sw, probe.sb);
    return { q, chi: chi1(probe.sw, probe.sb, q), xi: depthScale(probe.sw, probe.sb) };
  }, [probe]);

  const plotW = Math.max(0, width - PAD.left - PAD.right);
  const plotH = (plotW / COLS) * ROWS;
  const height = snap(plotH + PAD.top + PAD.bottom, line);
  const x = (sb: number) => PAD.left + (sb / SB_MAX) * plotW;
  const y = (sw: number) => PAD.top + ((SW_MAX - sw) / (SW_MAX - SW_MIN)) * plotH;
  const r = Math.max(0.9, (plotW / COLS) * 0.26);

  let ordered = "";
  let chaotic = "";
  rows.forEach((row, ri) => {
    const cy = y(rowWeight(ri)).toFixed(1);
    row.forEach((chi, ci) => {
      const dot = `M${(x(colBias(ci)) - r).toFixed(1)} ${cy}a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(2 * r).toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(-2 * r).toFixed(2)} 0`;
      if (chi > 1) chaotic += dot;
      else ordered += dot;
    });
  });
  const edge = boundary(rows)
    .map(([sb, sw], i) => `${i ? "L" : "M"}${x(sb).toFixed(1)} ${y(sw).toFixed(1)}`)
    .join("");

  const pick = (event: PointerEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setProbe(
      probeAt(
        SW_MAX - ((event.clientY - box.top - PAD.top) / plotH) * (SW_MAX - SW_MIN),
        ((event.clientX - box.left - PAD.left) / plotW) * SB_MAX,
      ),
    );
  };
  const nudge = (event: KeyboardEvent<HTMLElement>) => {
    const step = event.shiftKey ? 0.25 : 0.05;
    const moves: Record<string, [number, number]> = {
      ArrowUp: [step, 0],
      ArrowDown: [-step, 0],
      ArrowRight: [0, step],
      ArrowLeft: [0, -step],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    setProbe((p) => probeAt(p.sw + move[0], p.sb + move[1]));
  };

  const px = x(probe.sb);
  const py = y(probe.sw);

  return (
    <section className="exhibit" aria-labelledby="phase-title">
      <div className="l c gap">
        <h2 id="phase-title">EXHIBIT D: THE PHASE DIAGRAM</h2>
      </div>
      <div className="l">
        <span>
          TANH NETWORKS: σ<sub>b</sub> 0–{SB_MAX} ACROSS, σ<sub>w</sub> {SW_MIN}–{SW_MAX} UP
        </span>
        <span>MEAN-FIELD THEORY</span>
      </div>
      <div className="l ro">
        <span>
          PRINTED: {pad(rows.length, 2)} OF {ROWS} ROWS
        </span>
        <span>CLICK OR USE ARROW KEYS TO PROBE</span>
      </div>
      <figure
        className="phase-fig"
        ref={figRef}
        tabIndex={0}
        onKeyDown={nudge}
        aria-label="Phase diagram of random tanh networks over bias scale and weight scale. Arrow keys move the probe; hold Shift for larger steps."
      >
        {width > 0 && (
          <svg width={width} height={height} onPointerDown={pick} aria-hidden="true">
            <path className="ord" d={ordered} />
            <path className="cha" d={chaotic} />
            {edge && (
              <>
                <path className="halo" d={edge} />
                <path className="edge" d={edge} />
              </>
            )}
            {printing && !reduce && rows.length > 0 && (
              <path className="head" d={`M${PAD.left} ${(y(rowWeight(rows.length - 1)) + plotH / ROWS / 2).toFixed(1)}h${plotW.toFixed(1)}`} />
            )}
            {[1, 2, 3, 4, 5].map((sw) => (
              <text key={`w${sw}`} x={PAD.left - 10} y={y(sw) + 3.5} textAnchor="end">
                {sw}
              </text>
            ))}
            {[0, 1, 2, 3, 4].map((sb) => (
              <text key={`b${sb}`} x={x(sb)} y={PAD.top + plotH + 16} textAnchor="middle">
                {sb}
              </text>
            ))}
            {NETWORKS.map((sw, i) => (
              <g key={sw}>
                <circle className="pulse" cx={x(SB_NETWORKS)} cy={y(sw)} r={3} style={{ animationDelay: `${i * 0.5}s` }} />
                <circle className="net" cx={x(SB_NETWORKS)} cy={y(sw)} r={3.5} />
                <text className="tag" x={x(SB_NETWORKS) + 9} y={y(sw) + 3.5}>
                  A {sw.toFixed(1)}
                </text>
              </g>
            ))}
            <circle className="probe" cx={px} cy={py} r={7} />
            <path
              className="probe"
              d={`M${px - 13} ${py}h6M${px + 7} ${py}h6M${px} ${py - 13}v6M${px} ${py + 7}v6`}
            />
          </svg>
        )}
      </figure>
      <div className="l ro" aria-live="polite">
        <span>
          PROBE: σ<sub>w</sub> {probe.sw.toFixed(2)}, σ<sub>b</sub> {probe.sb.toFixed(2)}
        </span>
        <span>q* {readout.q.toFixed(2)}</span>
      </div>
      <div className="l ro" aria-live="polite">
        <span>
          χ<sub>1</sub> {readout.chi.toFixed(3)}: {regime(readout.chi)}
        </span>
        <span>SURVIVAL DEPTH {depthText(readout.xi)}</span>
      </div>
      <div className="l keyline">
        <span>
          <span className="key-cha">●</span> CHAOTIC, χ<sub>1</sub> &gt; 1
        </span>
        <span>
          <span className="key-ord">●</span> ORDERED, χ<sub>1</sub> &lt; 1
        </span>
        <span>
          - - - χ<sub>1</sub> = 1
        </span>
        <span>○ EXHIBIT A&apos;S NETWORKS</span>
      </div>
    </section>
  );
}
