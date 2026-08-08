"use client";

import { parseDeltaStat } from "@/lib/parseDelta";
import { clamp01, decimalPlaces, formatTweened, parseLeadingNumber } from "@/lib/tween";
import { DeltaBar } from "@/components/DeltaBar";

/**
 * Renders one dashboard stat as a small chart instead of a bare number.
 * The kind is inferred from the stat string — never fabricated:
 *
 *   "10.5% → 46.2%"   before→after bars (DeltaBar)
 *   "44 / 45"         radial ring filled to the fraction
 *   "46.2%"           radial ring filled to the percent
 *   "4", "9 × 10 splits", "32 warm-start"   waffle dots that light one by one
 *   "0.81", "1.05"    marker sliding along a scale strip
 *   anything else     plain text (untweened units/joined labels)
 *
 * `progress` is the step's 0–1 arrival tween from ScrollDashboard, so every
 * chart fills as the reader scrolls its section into focus — and drains
 * when they scroll back.
 */
export function StatViz({ k, v, progress }: { k: string; v: string; progress: number }) {
  const delta = parseDeltaStat(v);
  if (delta) {
    return <DeltaBar label={k} from={delta.from} to={delta.to} suffix={delta.suffix} progress={progress} />;
  }

  const fraction = v.match(/^([\d,]+(?:\.\d+)?)\s*\/\s*([\d,]+(?:\.\d+)?)$/);
  if (fraction) {
    const a = parseFloat(fraction[1].replace(/,/g, ""));
    const b = parseFloat(fraction[2].replace(/,/g, ""));
    if (b > 0) {
      return (
        <Ring
          label={k}
          frac={(a / b) * progress}
          text={formatTweened(a * progress, decimalPlaces(a), fraction[1].includes(","))}
          sub={`/ ${fraction[2]}`}
        />
      );
    }
  }

  const percent = v.match(/^([\d,]+(?:\.\d+)?)%$/);
  if (percent) {
    const x = parseFloat(percent[1].replace(/,/g, ""));
    return (
      <Ring
        label={k}
        frac={(x / 100) * progress}
        text={formatTweened(x * progress, decimalPlaces(x), false)}
        sub="%"
      />
    );
  }

  const num = parseLeadingNumber(v);
  if (num) {
    // Waffle unit chart — one dot per unit, lighting up in sequence.
    if (Number.isInteger(num.value) && num.value >= 1 && num.value <= 64) {
      const lit = num.value * progress;
      return (
        <div className="stat-viz">
          <span className="live-dashboard-stat-k">{k}</span>
          <span className="live-dashboard-stat-v">
            {formatTweened(lit, 0, num.commas)}
            {num.suffix}
          </span>
          <span className="stat-waffle" aria-hidden="true">
            {Array.from({ length: num.value }, (_, i) => (
              <span key={i} className="stat-waffle-dot" style={{ opacity: 0.18 + 0.82 * clamp01(lit - i) }} />
            ))}
          </span>
        </div>
      );
    }
    // Scale strip — a marker sliding out to a measured (non-integer) value.
    if (!Number.isInteger(num.value) && !num.suffix.includes("+")) {
      const max = niceCeil(num.value);
      return (
        <div className="stat-viz">
          <span className="live-dashboard-stat-k">{k}</span>
          <span className="stat-scale">
            <span className="stat-scale-track" aria-hidden="true">
              <span className="stat-scale-fill" style={{ width: `${(num.value / max) * progress * 100}%` }} />
            </span>
            <span className="stat-scale-val">
              {formatTweened(num.value * progress, num.decimals, num.commas)}
              {num.suffix}
            </span>
          </span>
        </div>
      );
    }
    return (
      <div className="live-dashboard-stat">
        <span className="live-dashboard-stat-k">{k}</span>
        <span className="live-dashboard-stat-v">
          {formatTweened(num.value * progress, num.decimals, num.commas)}
          {num.suffix}
        </span>
      </div>
    );
  }

  return (
    <div className="live-dashboard-stat">
      <span className="live-dashboard-stat-k">{k}</span>
      <span className="live-dashboard-stat-v">{v}</span>
    </div>
  );
}

/** Smallest quarter-step above v (0.81 → 1, 1.05 → 1.25) — strip maximum. */
function niceCeil(v: number): number {
  const c = Math.ceil(v * 4) / 4;
  return c > v ? c : c + 0.25;
}

function Ring({ label, frac, text, sub }: { label: string; frac: number; text: string; sub?: string }) {
  const R = 24;
  const C = 2 * Math.PI * R;
  return (
    <div className="stat-viz stat-viz--ring">
      <span className="live-dashboard-stat-k">{label}</span>
      <span className="stat-ring">
        <svg viewBox="0 0 56 56" aria-hidden="true">
          <circle className="stat-ring-bg" cx="28" cy="28" r={R} />
          <circle
            className="stat-ring-fg"
            cx="28"
            cy="28"
            r={R}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - clamp01(frac))}
          />
        </svg>
        <span className="stat-ring-val">
          {text}
          {sub && <span className="stat-ring-sub">{sub}</span>}
        </span>
      </span>
    </div>
  );
}
