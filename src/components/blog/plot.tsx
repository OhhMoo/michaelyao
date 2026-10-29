export type Scale = ((value: number) => number) & { ticks: readonly number[] };

export function scale(domain: [number, number], range: [number, number], ticks: readonly number[]): Scale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  return Object.assign((value: number) => r0 + ((value - d0) / (d1 - d0)) * (r1 - r0), { ticks });
}

export const MARGIN = { left: 36, right: 10, top: 16, bottom: 22 };

/** A figure height rounded up to whole page lines, so the rows after it stay on the line grid. */
export const snap = (height: number, line: number) => Math.ceil(height / line) * line;

export function polyline(points: readonly (readonly [number, number])[], x: Scale, y: Scale): string {
  return points.map(([a, b], i) => `${i ? "L" : "M"}${x(a).toFixed(1)} ${y(b).toFixed(1)}`).join("");
}

const tick = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(1));

type AxesProps = { width: number; height: number; x: Scale; y: Scale; xLabel: string; yLabel: string };

export function Axes({ width, height, x, y, xLabel, yLabel }: AxesProps) {
  const bottom = height - MARGIN.bottom;
  return (
    <g>
      <path className="axis" d={`M${MARGIN.left} ${MARGIN.top}V${bottom}H${width - MARGIN.right}`} />
      {x.ticks.map((t) => (
        <g key={`x${t}`}>
          <path className="axis" d={`M${x(t).toFixed(1)} ${bottom}v4`} />
          <text x={x(t)} y={bottom + 15} textAnchor="middle">
            {tick(t)}
          </text>
        </g>
      ))}
      {y.ticks.map((t) => (
        <g key={`y${t}`}>
          <path className="axis" d={`M${MARGIN.left - 4} ${y(t).toFixed(1)}h4`} />
          <text x={MARGIN.left - 7} y={y(t) + 3.5} textAnchor="end">
            {tick(t)}
          </text>
        </g>
      ))}
      <text className="lbl" x={MARGIN.left + 4} y={MARGIN.top - 5}>
        {yLabel}
      </text>
      <text className="lbl" x={width - MARGIN.right} y={bottom - 5} textAnchor="end">
        {xLabel}
      </text>
    </g>
  );
}
