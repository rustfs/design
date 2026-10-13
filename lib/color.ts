// Colour maths for the documentation pages (sRGB, WCAG 2.x contrast, OKLCH).

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6)
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16)) as [number, number, number]
}

const lin = (c: number) => {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map(lin)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** WCAG 2.x grade for text: AAA ≥ 7, AA ≥ 4.5, AA large ≥ 3. */
export function grade(ratio: number): "AAA" | "AA" | "AA18" | "—" {
  if (ratio >= 7) return "AAA"
  if (ratio >= 4.5) return "AA"
  if (ratio >= 3) return "AA18"
  return "—"
}

export function oklch(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map(lin)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const C = Math.hypot(A, B)
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360
  return [L, C, H]
}

export function oklchString(hex: string) {
  const [l, c, h] = oklch(hex)
  return `oklch(${(l * 100).toFixed(1)}% ${c.toFixed(3)} ${c < 0.002 ? 0 : h.toFixed(1)})`
}

export function rgbString(hex: string) {
  return hexToRgb(hex).join(" ")
}

/** Text colour that reads on a given fill. */
export function onColor(hex: string) {
  return contrast(hex, "#FFFFFF") >= contrast(hex, "#0B0E14") ? "#FFFFFF" : "#0B0E14"
}
