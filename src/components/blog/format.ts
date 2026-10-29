export const pad = (value: number, width: number) => String(value).padStart(width, "0");

export function regime(chi: number): "ORDERED" | "CRITICAL" | "CHAOTIC" {
  if (Math.abs(chi - 1) < 0.01) return "CRITICAL";
  return chi < 1 ? "ORDERED" : "CHAOTIC";
}
