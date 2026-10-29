"use client";

import type { ReactNode } from "react";

const SPEEDS = [1, 4, 8, 16] as const;

type TransportProps = {
  label: string;
  unit: string;
  playing: boolean;
  speed: number;
  onPlay: () => void;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSpeed: (speed: number) => void;
};

/** The exhibits' tape-deck row: rewind, step, play or pause, and a speed multiplier. */
export function Transport({ label, unit, playing, speed, onPlay, onFirst, onPrev, onNext, onSpeed }: TransportProps) {
  return (
    <div className="l">
      <span>{label}</span>
      <span>
        <button className="t" type="button" onClick={onFirst} aria-label={`Back to the first ${unit}`}>
          [|&lt;]
        </button>
        <button className="t" type="button" onClick={onPrev} aria-label={`Previous ${unit}`}>
          [&lt;]
        </button>
        <button className="t" type="button" onClick={onPlay} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "[PAUSE]" : "[PLAY]"}
        </button>
        <button className="t" type="button" onClick={onNext} aria-label={`Next ${unit}`}>
          [&gt;]
        </button>
        {" SPEED "}
        {SPEEDS.map((s) => (
          <button
            className="t"
            type="button"
            key={s}
            aria-pressed={speed === s}
            aria-label={`Speed ${s}x`}
            onClick={() => onSpeed(s)}
          >
            {s}x
          </button>
        ))}
      </span>
    </div>
  );
}

type ChoiceProps = {
  label: ReactNode;
  options: readonly number[];
  value: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  children?: ReactNode;
};

/** A row of mutually exclusive chips, such as the weight scale σ_w; `children` fill the right side. */
export function Choice({ label, options, value, onChange, format = (v) => v.toFixed(1), children }: ChoiceProps) {
  return (
    <div className="l ro">
      <span>
        {label}{" "}
        {options.map((option) => (
          <button
            className="t"
            type="button"
            key={option}
            aria-pressed={option === value}
            onClick={() => onChange(option)}
          >
            {format(option)}
          </button>
        ))}
      </span>
      {children && <span>{children}</span>}
    </div>
  );
}
