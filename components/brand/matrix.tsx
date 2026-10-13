import { cn } from "@/lib/utils"

export type MatrixOptions = {
  /** drives */
  cols?: number
  /** stripes */
  rows?: number
  /** data shards per stripe */
  k?: number
  /** parity shards per stripe */
  m?: number
  /** how far parity rotates per stripe */
  shift?: number
  seed?: number
  mode?: "solid" | "tone" | "outline" | "sparse"
  /** probability that a cell is present */
  density?: number
  /** random data shards drawn as missing */
  missing?: number
  /** whole failed drives (column indexes) */
  dead?: number[]
  /** gap as a fraction of the cell */
  gap?: number
  fit?: "meet" | "slice" | "none" | "left" | "right"
  /** dissolve toward an edge */
  fade?: "" | "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"
}

export type Cell = { x: number; y: number; t: "d" | "p" | "e" | "x"; a: number }

export function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FADE: Record<string, (fx: number, fy: number) => number> = {
  l: (fx) => fx,
  r: (fx) => 1 - fx,
  t: (_, fy) => fy,
  b: (_, fy) => 1 - fy,
  tl: (fx, fy) => (fx + fy) / 2,
  br: (fx, fy) => 1 - (fx + fy) / 2,
  tr: (fx, fy) => (1 - fx + fy) / 2,
  bl: (fx, fy) => (fx + 1 - fy) / 2,
}

/** Lay out an erasure set: columns are drives, rows are stripes, parity rotates by `shift` per stripe. */
export function buildMatrix(o: MatrixOptions = {}) {
  const { cols = 16, rows = 8, k = 12, m = 4, shift = 1, seed = 7, mode = "solid", density = 1, missing = 0, dead = [], gap = 0.2, fade = "" } = o
  const r = mulberry32(seed)
  const n = k + m
  const cells: Cell[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pos = (((x - y * shift) % n) + n) % n
      let t: Cell["t"] = pos >= k ? "p" : "d"
      let a = 1
      if (r() > density) t = "e"
      if (mode === "tone" && t === "d") {
        const q = r()
        a = q < 0.5 ? 1 : q < 0.78 ? 0.6 : 0.34
      }
      if (mode === "outline" && t === "d") t = "e"
      if (mode === "sparse" && t === "d" && r() < 0.55) t = "e"
      if (fade && FADE[fade]) {
        const f = FADE[fade](x / Math.max(1, cols - 1), y / Math.max(1, rows - 1))
        const keep = Math.pow(Math.max(0, Math.min(1, f * 1.15)), 1.6)
        if (r() > keep) {
          t = "e"
          a = keep > 0.18 ? 1 : 0
        }
      }
      cells.push({ x, y, t, a })
    }
  }
  if (dead.length) cells.forEach((c) => { if (dead.includes(c.x) && c.a > 0) { c.t = "x"; c.a = 1 } })
  const pool = cells.filter((c) => c.t === "d" && c.a > 0.9)
  for (let i = 0; i < missing && pool.length; i++) pool.splice(Math.floor(r() * pool.length), 1)[0].t = "x"
  const cell = 10
  const g = cell * gap
  const step = cell + g
  return { cells, cell, step, width: cols * step - g, height: rows * step - g }
}

const PAR = { slice: "xMidYMid slice", none: "none", left: "xMinYMid meet", right: "xMaxYMid meet", meet: "xMidYMid meet" } as const

/** Shard matrix, rendered as static SVG (identical output on server and client). */
export function ShardMatrix({ className, ...o }: MatrixOptions & { className?: string }) {
  const { cells, cell, step, width, height } = buildMatrix(o)
  return (
    <svg className={cn("mx", className)} viewBox={`0 0 ${width.toFixed(2)} ${height.toFixed(2)}`} preserveAspectRatio={PAR[o.fit ?? "meet"]} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {cells
        .filter((c) => c.a > 0.02)
        .map((c) => {
          const inset = c.t === "e" || c.t === "x" ? 0.5 : 0
          return (
            <rect
              key={`${c.x}-${c.y}`}
              className={`c-${c.t}`}
              data-x={c.x}
              data-y={c.y}
              x={+(c.x * step + inset).toFixed(2)}
              y={+(c.y * step + inset).toFixed(2)}
              width={cell - inset * 2}
              height={cell - inset * 2}
              opacity={c.a < 1 ? +c.a.toFixed(2) : undefined}
            />
          )
        })}
    </svg>
  )
}
