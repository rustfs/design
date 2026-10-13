#!/usr/bin/env node
// Print a RustFS shard-matrix SVG.
// Usage: node matrix.mjs --cols 16 --rows 8 --k 12 --m 4 [--shift 1] [--mode solid|tone|outline|sparse]
//        [--fade l|r|t|b|tl|tr|bl|br] [--dead 3,9] [--missing 2] [--seed 7] [--gap 0.2]
//        [--surface ink|paper|signal] [--width 600] > matrix.svg
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? [...a, [v.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : "true"]] : a), []))
const num = (k, d) => (args[k] !== undefined ? Number(args[k]) : d)
const o = {
  cols: num("cols", 16), rows: num("rows", 8), k: num("k", 12), m: num("m", 4), shift: num("shift", 1),
  seed: num("seed", 7), density: num("density", 1), missing: num("missing", 0), gap: num("gap", 0.2),
  mode: args.mode ?? "solid", fade: args.fade ?? "", dead: args.dead ? String(args.dead).split(",").map(Number) : [],
}
const SURFACE = {
  ink: { data: "#0062FF", parity: "#FF5E14", empty: "rgba(255,255,255,0.16)" },
  paper: { data: "#0062FF", parity: "#FF5E14", empty: "rgba(11,14,20,0.16)" },
  signal: { data: "#FFFFFF", parity: "#0B0E14", empty: "rgba(255,255,255,0.3)" },
}
const c = SURFACE[args.surface ?? "ink"]

function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const FADE = { l: (x) => x, r: (x) => 1 - x, t: (_, y) => y, b: (_, y) => 1 - y, tl: (x, y) => (x + y) / 2, br: (x, y) => 1 - (x + y) / 2, tr: (x, y) => (1 - x + y) / 2, bl: (x, y) => (x + 1 - y) / 2 }
const r = mulberry32(o.seed)
const n = o.k + o.m
const cells = []
for (let y = 0; y < o.rows; y++) for (let x = 0; x < o.cols; x++) {
  const pos = (((x - y * o.shift) % n) + n) % n
  let t = pos >= o.k ? "p" : "d", a = 1
  if (r() > o.density) t = "e"
  if (o.mode === "tone" && t === "d") { const q = r(); a = q < 0.5 ? 1 : q < 0.78 ? 0.6 : 0.34 }
  if (o.mode === "outline" && t === "d") t = "e"
  if (o.mode === "sparse" && t === "d" && r() < 0.55) t = "e"
  if (o.fade && FADE[o.fade]) {
    const f = FADE[o.fade](x / Math.max(1, o.cols - 1), y / Math.max(1, o.rows - 1))
    const keep = Math.pow(Math.max(0, Math.min(1, f * 1.15)), 1.6)
    if (r() > keep) { t = "e"; a = keep > 0.18 ? 1 : 0 }
  }
  cells.push({ x, y, t, a })
}
cells.forEach((q) => { if (o.dead.includes(q.x) && q.a > 0) { q.t = "x"; q.a = 1 } })
const pool = cells.filter((q) => q.t === "d" && q.a > 0.9)
for (let i = 0; i < o.missing && pool.length; i++) pool.splice(Math.floor(r() * pool.length), 1)[0].t = "x"
const cell = 10, g = cell * o.gap, step = cell + g
const W = o.cols * step - g, H = o.rows * step - g
const width = num("width", Math.round(W * 4))
const rects = cells.filter((q) => q.a > 0.02).map((q) => {
  const x = (q.x * step).toFixed(2), y = (q.y * step).toFixed(2)
  const op = q.a < 1 ? ` opacity="${q.a.toFixed(2)}"` : ""
  if (q.t === "d") return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${c.data}"${op}/>`
  if (q.t === "p") return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${c.parity}"/>`
  if (q.t === "e") return `<rect x="${(+x + 0.5).toFixed(2)}" y="${(+y + 0.5).toFixed(2)}" width="${cell - 1}" height="${cell - 1}" fill="none" stroke="${c.empty}" stroke-width="1" vector-effect="non-scaling-stroke"/>`
  return `<rect x="${(+x + 0.5).toFixed(2)}" y="${(+y + 0.5).toFixed(2)}" width="${cell - 1}" height="${cell - 1}" fill="none" stroke="${c.data}" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/>`
}).join("")
process.stdout.write(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W.toFixed(2)} ${H.toFixed(2)}" width="${width}" height="${Math.round((width * H) / W)}">${rects}</svg>\n`)
