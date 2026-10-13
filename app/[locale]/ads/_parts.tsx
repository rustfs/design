import type { CSSProperties, ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Icon } from "@/components/brand/icon"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/* ---------- Approved copy: every ad draws from this deck verbatim ---------- */

export type Line = { zh: string; en: string }
export type Message = { id: string; msg: Line; proof: Line; footnote: boolean; zhCount: number; enWords: number }

export const MESSAGES: Message[] = [
  {
    id: "drives",
    msg: { zh: "丢盘，不丢数据。", en: "Lose drives. Keep data." },
    proof: { zh: "EC 4+2 配置下，任意两块盘离线时数据仍可读取。", en: "With EC 4+2, data stays readable with any two drives offline." },
    footnote: true,
    zhCount: 6,
    enWords: 4,
  },
  {
    id: "s3",
    msg: { zh: "S3 调用不变，底层换成 Rust。", en: "Same S3 calls. Rust underneath." },
    proof: { zh: "S3 兼容范围以官方兼容性矩阵为准。", en: "S3 coverage is defined by the official compatibility matrix." },
    footnote: true,
    zhCount: 10,
    enWords: 5,
  },
  {
    id: "open",
    msg: { zh: "开源，不设暗条款。", en: "Open source. No fine print." },
    proof: { zh: "Apache License 2.0", en: "Apache License 2.0" },
    footnote: false,
    zhCount: 7,
    enWords: 5,
  },
  {
    id: "hardware",
    msg: { zh: "数据只留在你的硬件上。", en: "Your data stays on your hardware." },
    proof: { zh: "无遥测，完全自托管。", en: "No telemetry. Fully self-hosted." },
    footnote: false,
    zhCount: 10,
    enWords: 6,
  },
  {
    id: "ai",
    msg: { zh: "为 AI 数据打造的内存安全存储。", en: "Memory-safe storage for AI data." },
    proof: { zh: "以 Rust 构建。", en: "Built in Rust." },
    footnote: false,
    zhCount: 13,
    enWords: 5,
  },
]

export const M = Object.fromEntries(MESSAGES.map((m) => [m.id, m])) as Record<"drives" | "s3" | "open" | "hardware" | "ai", Message>

/** Approved call-to-action labels: a verb, then its object. */
export const CTA = {
  download: { zh: "下载 RustFS", en: "Download RustFS" },
  docs: { zh: "阅读文档", en: "Read the docs" },
  source: { zh: "查看源码", en: "View the source" },
  short: { zh: "下载", en: "Download" },
} satisfies Record<string, Line>

/* ---------- Artboard parts (sizes are passed in u so each format tunes its own) ---------- */

/** Footnote marker after a claim. */
export function Fn({ n = 1 }: { n?: number }) {
  return <sup className="relative -top-[1.15em] ml-[0.1em] align-baseline font-sans text-[0.36em] leading-none font-semibold tracking-normal">{n}</sup>
}

/** Footnote line: numeral in a hanging column, full-contrast text on Signal. */
export function Footnote({ zh, en, n = 1, className }: Line & { n?: number; className?: string }) {
  return (
    <p className={cn("grid grid-cols-[auto_1fr] gap-x-[0.45em] font-sans leading-[1.35] font-normal text-ab-fg-2 [.t-signal_&]:text-ab-fg", className)}>
      <span className="font-semibold">{n}</span>
      <span>
        <L zh={zh} en={en} />
      </span>
    </p>
  )
}

/** Square call-to-action: Signal Blue with a white label, or white with a Signal label on Signal. */
export function Cta({ zh, en, className, arrow = true }: Line & { className?: string; arrow?: boolean }) {
  return (
    <span className={cn("inline-flex w-max items-center justify-between bg-ab-data font-sans leading-none font-semibold tracking-[-0.005em] whitespace-nowrap text-ab-on-data", className)}>
      <span>
        <L zh={zh} en={en} />
      </span>
      {arrow && <Icon name="arrow-right" strokeWidth={2} className="size-[1.15em]" />}
    </span>
  )
}

/** One erasure set drawn as drives (columns) × stripes (rows); parity rotates per stripe; dead columns are offline drives. */
export function DriveGrid({
  cols = 6,
  rows = 4,
  k = 4,
  m = 2,
  dead = [],
  className,
  colClassName,
  cellClassName,
  labels = false,
  labelClassName,
}: {
  cols?: number
  rows?: number
  k?: number
  m?: number
  dead?: number[]
  className?: string
  colClassName?: string
  cellClassName?: string
  labels?: boolean
  labelClassName?: string
}) {
  const n = k + m
  return (
    <div className={cn("grid", className)} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: cols }, (_, x) => {
        const off = dead.includes(x)
        return (
          <div key={x} className={cn("grid grid-cols-1 content-start", colClassName)}>
            {Array.from({ length: rows }, (_, y) => {
              const parity = (((x - y) % n) + n) % n >= k
              return <i key={y} className={cn("block aspect-square", cellClassName, off ? "border-dashed border-ab-data [border-width:max(1px,calc(var(--u)*0.3))]" : parity ? "bg-ab-parity" : "bg-ab-data")} />
            })}
            {labels && (
              <span className={cn("justify-self-center font-mono leading-none font-medium tracking-[0.06em] whitespace-nowrap uppercase", off ? "text-ab-fg" : "text-ab-muted", labelClassName)}>
                {off ? <L zh="离线" en="Offline" /> : String(x + 1).padStart(2, "0")}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

/** Stripes as rows in one grid, each labelled with the object prefix it stores. */
export function StripeRows({ rows, k = 6, m = 2, className, cellClassName, labelClassName }: { rows: ReactNode[]; k?: number; m?: number; className?: string; cellClassName?: string; labelClassName?: string }) {
  const n = k + m
  return (
    <div className={cn("grid items-center", className)} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr)) auto` }}>
      {rows.flatMap((label, y) => [
        ...Array.from({ length: n }, (_, x) => {
          const parity = (((x - y) % n) + n) % n >= k
          return <i key={`${y}-${x}`} className={cn("block aspect-square", cellClassName, parity ? "bg-ab-parity" : "bg-ab-data")} />
        }),
        <span key={`${y}-l`} className={cn("font-mono leading-none whitespace-nowrap text-ab-fg-2", labelClassName)}>
          {label}
        </span>,
      ])}
    </div>
  )
}

/** A static, scaled artboard for specimens outside the template grid (no export controls). */
export function Mini({ w, h, scale = 1, theme = "ink", lang, className, children }: { w: number; h: number; scale?: number; theme?: "ink" | "paper" | "white" | "signal"; lang: Locale; className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative shrink-0 overflow-hidden", className)} style={{ width: w * scale, height: h * scale }}>
      <div className={cn("ab", `t-${theme}`)} data-lang={lang} style={{ "--w": `${w}px`, "--h": `${h}px`, "--s": scale } as CSSProperties}>
        {children}
      </div>
    </div>
  )
}

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M2 12h34M28 5l8 7-8 7" />
  </svg>
)

/* ---------- Page-level glyphs (follow the site theme, not an artboard surface) ---------- */

/** Artboard size with a proportional chip. */
export function Dim({ w, h }: { w: number; h: number }) {
  const k = 28 / Math.max(w, h)
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <span className="grid size-7 shrink-0 place-items-center" aria-hidden="true">
        <i className="block border border-brand bg-brand/15" style={{ width: Math.max(3, Math.round(w * k)), height: Math.max(3, Math.round(h * k)) }} />
      </span>
      {w} × {h}
    </span>
  )
}

const cellsOf = (cols: number, rows: number, k: number, m: number) =>
  Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols
    const y = Math.floor(i / cols)
    return { x, y, parity: (((x - y) % (k + m)) + (k + m)) % (k + m) >= k }
  })

/** Small specimen of the graphic each approved message uses. */
export function MessageGlyph({ id }: { id: string }) {
  const box = "grid h-14 w-24 shrink-0 content-center"
  if (id === "drives")
    return (
      <span className={box} aria-hidden="true">
        <span className="grid grid-cols-6 gap-[3px]">
          {cellsOf(6, 3, 4, 2).map((c, i) => (
            <i key={i} className={cn("block aspect-square", c.x === 1 || c.x === 4 ? "border border-dashed border-brand" : c.parity ? "bg-parity" : "bg-brand")} />
          ))}
        </span>
      </span>
    )
  if (id === "s3")
    return (
      <span className={cn(box, "gap-[5px]")} aria-hidden="true">
        <span className="grid grid-cols-3 gap-[3px]">
          {[0, 1, 2].map((i) => (
            <i key={i} className="block h-2 border border-strong" />
          ))}
        </span>
        <i className="block h-px bg-foreground" />
        <span className="grid grid-cols-8 gap-[3px]">
          {cellsOf(8, 2, 6, 2).map((c, i) => (
            <i key={i} className={cn("block aspect-square", c.parity ? "bg-parity" : "bg-brand")} />
          ))}
        </span>
      </span>
    )
  if (id === "open")
    return (
      <span className={cn(box, "content-center")} aria-hidden="true">
        <span className="font-display text-[34px] leading-none font-extrabold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--foreground)] [font-stretch:125%]">2.0</span>
      </span>
    )
  if (id === "hardware")
    return (
      <span className={box} aria-hidden="true">
        <span className="relative border border-foreground p-[5px]">
          <span className="grid grid-cols-8 gap-[3px]">
            {cellsOf(8, 2, 6, 2).map((c, i) => (
              <i key={i} className={cn("block aspect-square", c.parity ? "bg-parity" : "bg-brand")} />
            ))}
          </span>
          <span className="absolute -top-2 -right-2 grid size-4 place-items-center bg-background">
            <Icon name="lock" className="size-3.5" strokeWidth={1.75} />
          </span>
        </span>
      </span>
    )
  return (
    <span className={cn(box, "gap-[3px]")} aria-hidden="true">
      {[0, 1, 2].map((y) => (
        <span key={y} className="grid grid-cols-[repeat(6,minmax(0,1fr))_28px] items-center gap-[3px]">
          {cellsOf(6, 3, 4, 2)
            .filter((c) => c.y === y)
            .map((c, i) => (
              <i key={i} className={cn("block aspect-square", c.parity ? "bg-parity" : "bg-brand")} />
            ))}
          <i className="ml-1 block h-px bg-faint" />
        </span>
      ))}
    </span>
  )
}
