"use client";

import { clamp01, easeOutCubic } from "@/lib/tween";

export type ProjectChart =
  | {
      kind: "donut";
      title: string;
      value: string;
      label: string;
      segments: string[];
      note: string;
    }
  | {
      kind: "bars";
      title: string;
      items: { label: string; value: number; max: number; display: string }[];
      scale?: "linear" | "log";
      note: string;
    }
  | {
      kind: "line";
      title: string;
      points: { x: number; y: number; label: string }[];
      xLabel: string;
      yLabel: string;
      note: string;
    };

function DonutChart({
  chart,
  progress,
}: {
  chart: Extract<ProjectChart, { kind: "donut" }>;
  progress: number;
}) {
  const fill = easeOutCubic(clamp01(progress));

  return (
    <div className="project-viz-donut">
      <div className="project-viz-ring" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <circle className="project-viz-ring-track" cx="60" cy="60" r="46" pathLength="100" />
          <circle
            className="project-viz-ring-fill"
            cx="60"
            cy="60"
            r="46"
            pathLength="100"
            strokeDasharray={`${fill * 100} 100`}
          />
        </svg>
        <span className="project-viz-ring-copy">
          <strong>{chart.value}</strong>
          <small>{chart.label}</small>
        </span>
      </div>
      <div className="project-viz-legend">
        {chart.segments.map((segment, index) => (
          <div className="project-viz-legend-row" key={segment}>
            <span className="project-viz-legend-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{segment}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart({
  chart,
  progress,
}: {
  chart: Extract<ProjectChart, { kind: "bars" }>;
  progress: number;
}) {
  const fill = easeOutCubic(clamp01(progress));

  return (
    <div className="project-viz-bars">
      {chart.items.map((item) => (
        <div className="project-viz-bar-row" key={item.label}>
          <div className="project-viz-bar-copy">
            <span>{item.label}</span>
            <strong>{item.display}</strong>
          </div>
          <svg
            className="project-viz-bar-track"
            viewBox="0 0 100 7"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect className="project-viz-bar-bg" width="100" height="7" />
            <rect
              className="project-viz-bar-fill"
              width={
                clamp01(
                  chart.scale === "log"
                    ? Math.log10(item.value + 1) / Math.log10(item.max + 1)
                    : item.value / item.max,
                ) *
                fill *
                100
              }
              height="7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

function LineChart({
  chart,
  progress,
}: {
  chart: Extract<ProjectChart, { kind: "line" }>;
  progress: number;
}) {
  const fill = easeOutCubic(clamp01(progress));
  const width = 280;
  const height = 154;
  const inset = { top: 14, right: 12, bottom: 30, left: 34 };
  const plotWidth = width - inset.left - inset.right;
  const plotHeight = height - inset.top - inset.bottom;
  const maxX = Math.max(...chart.points.map((point) => point.x));
  const maxY = Math.max(...chart.points.map((point) => point.y));
  const coordinates = chart.points.map((point) => ({
    ...point,
    cx: inset.left + (point.x / maxX) * plotWidth,
    cy: inset.top + plotHeight - (point.y / maxY) * plotHeight,
  }));
  const line = coordinates.map((point) => `${point.cx},${point.cy}`).join(" ");

  return (
    <div className="project-viz-line">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={chart.title}>
        {[0, 0.5, 1].map((tick) => (
          <line
            className="project-viz-gridline"
            key={tick}
            x1={inset.left}
            x2={width - inset.right}
            y1={inset.top + plotHeight * tick}
            y2={inset.top + plotHeight * tick}
          />
        ))}
        <polyline
          className="project-viz-line-path"
          points={line}
          pathLength="1"
          strokeDasharray={`${fill} 1`}
        />
        {coordinates.map((point, index) => (
          <g
            className="project-viz-line-point"
            key={point.label}
            opacity={fill >= index / coordinates.length ? 1 : 0}
          >
            <circle cx={point.cx} cy={point.cy} r="3.5" />
            {(index === 0 || index === coordinates.length - 1) && (
              <text x={point.cx} y={point.cy - 9} textAnchor="middle">
                {point.y}
              </text>
            )}
          </g>
        ))}
        <text className="project-viz-axis-label" x={inset.left + plotWidth / 2} y={height - 3}>
          {chart.xLabel}
        </text>
        <text
          className="project-viz-axis-label"
          x="8"
          y={inset.top + plotHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90 8 ${inset.top + plotHeight / 2})`}
        >
          {chart.yLabel}
        </text>
      </svg>
    </div>
  );
}

export function ProjectDataViz({
  chart,
  progress,
}: {
  chart: ProjectChart;
  progress: number;
}) {
  return (
    <figure className="project-viz">
      <figcaption className="project-viz-title">{chart.title}</figcaption>
      {chart.kind === "donut" && <DonutChart chart={chart} progress={progress} />}
      {chart.kind === "bars" && <BarChart chart={chart} progress={progress} />}
      {chart.kind === "line" && <LineChart chart={chart} progress={progress} />}
      <p className="project-viz-note">{chart.note}</p>
    </figure>
  );
}
