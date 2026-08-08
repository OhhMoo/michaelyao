import { clamp01, decimalPlaces, easeOutCubic } from "@/lib/tween";

type DeltaBarProps = {
  label: string;
  from: number;
  to: number;
  suffix?: string;
  /**
   * 0–1 arrival tween (default 1 = settled). Driven per-frame by
   * ScrollDashboard's scroll progress: the "before" bar grows over the
   * first half, the "after" bar over the second, values counting with them.
   * While < 1 the CSS width transition is disabled — the scroll position
   * itself is the animation clock, and a transition would only lag behind.
   */
  progress?: number;
};

export function DeltaBar({ label, from, to, suffix = "", progress = 1 }: DeltaBarProps) {
  const max = Math.max(from, to, 1);
  const fromPct = (from / max) * 100;
  const toPct = (to / max) * 100;

  const t1 = easeOutCubic(clamp01(progress * 2));
  const t2 = easeOutCubic(clamp01(progress * 2 - 1));
  const live = progress < 1;

  // Keep the source strings' precision: "10.5% → 46.2%" shows one decimal,
  // "1,458 → 200" shows grouped integers.
  const decimals = Math.max(decimalPlaces(from), decimalPlaces(to));
  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    <div className="delta-bar">
      <div className="delta-bar-label">{label}</div>
      <div className="delta-bar-row">
        <span className="delta-bar-row-tag">before</span>
        <div className="delta-bar-track">
          <div
            className="delta-bar-fill delta-bar-fill--from"
            style={{ width: `${fromPct * t1}%`, transition: live ? "none" : undefined }}
          />
        </div>
        <span className="delta-bar-value">
          {fmt(from * t1)}
          {suffix}
        </span>
      </div>
      <div className="delta-bar-row">
        <span className="delta-bar-row-tag">after</span>
        <div className="delta-bar-track">
          <div
            className="delta-bar-fill delta-bar-fill--to"
            style={{ width: `${toPct * t2}%`, transition: live ? "none" : undefined }}
          />
        </div>
        <span className="delta-bar-value">
          {fmt(to * t2)}
          {suffix}
        </span>
      </div>
    </div>
  );
}
