import type { ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Wordmark } from "@/components/brand/logo"
import { Stripe } from "@/components/brand/stripe"
import { cn } from "@/lib/utils"

/** Slides in the deck. */
export const TOTAL = 18

/** Slide master: the outer margin is 5% of the width (96 px at 1920). */
export const SLIDE = "[--m:calc(var(--w)*0.05)]"

/** Slide title: Archivo 112%, 6.5u (70 px at 1920), two lines at most. The top padding puts the first baseline on y 288 in both languages. */
export const TITLE = "ab-head m-0 u-text-6.5 pt-[calc(var(--u)*1.1)] [[data-lang=zh]_&]:pt-[calc(var(--u)*0.75)] [[data-lang=zh]_&]:leading-[1.18] [[data-lang=zh]_&]:tracking-[0.01em]"

export const pad = (n: number) => String(n).padStart(2, "0")

/** The four parts of the sample talk; slide numbers are the real order of the deck. */
export const PARTS = [
  { zh: "背景", en: "Context", desc: { zh: "对象存储面临的变化与 RustFS 的定位", en: "What is changing in object storage, and where RustFS fits" }, pages: "05–07" },
  { zh: "能力与采用", en: "Capabilities", desc: { zh: "纠删码、位腐烂保护、自愈与社区规模", en: "Erasure coding, bitrot protection, healing and adoption" }, pages: "08–10" },
  { zh: "架构与部署", en: "Architecture", desc: { zh: "从 S3 请求到磁盘，以及三条命令完成部署", en: "From S3 request to drive, and a three-command deployment" }, pages: "11–13" },
  { zh: "原则与路线", en: "Principles & roadmap", desc: { zh: "设计原则、里程碑与团队", en: "Design principles, milestones and the team" }, pages: "14–17" },
]

/** Section label for the header: "02 · Capabilities". */
export function Part({ i }: { i: number }) {
  const p = PARTS[i - 1]
  return (
    <>
      <b>{pad(i)}</b> · <L zh={p.zh} en={p.en} />
    </>
  )
}

/** Header zone: wordmark left, section label right. */
export function Header({ section }: { section?: ReactNode }) {
  return (
    <div className="absolute inset-x-(--m) top-(--m) flex u-h-3 items-center justify-between">
      <Wordmark className="ab-logo u-h-3" />
      {section && <span className="ab-label u-text-2 leading-none">{section}</span>}
    </div>
  )
}

/** Footer zone: stripe signature and deck name left, slide number right. */
export function Footer({ n }: { n: number }) {
  return (
    <div className="absolute inset-x-(--m) bottom-(--m) flex u-h-2 items-center justify-between font-mono u-text-2 leading-none tracking-[0.04em] text-ab-muted">
      <span className="flex items-center u-gap-2.5">
        <Stripe className="u-text-1.25" />
        <span>
          RustFS 1.0 · <L zh="活动名称" en="Event name" />
        </span>
      </span>
      <span className="tabular-nums">
        <b className="font-medium text-ab-fg">{pad(n)}</b> / {TOTAL}
      </span>
    </div>
  )
}

export function Chrome({ n, section }: { n: number; section?: ReactNode }) {
  return (
    <>
      <Header section={section} />
      <Footer n={n} />
    </>
  )
}

/** Content stage: y 216 → 888 at 1920 × 1080, on the 12-column grid (gutter 2.25u ≈ 24 px). */
export function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("absolute inset-x-(--m) u-top-20 bottom-[calc(var(--m)*2)] grid grid-cols-12 u-gap-x-2.25", className)}>{children}</div>
}

/** Stage with a fixed 20u title row, so body copy starts at the same height on every slide. */
export const ROWS = "grid-rows-[calc(var(--u)*20)_minmax(0,1fr)]"
export const ROWS3 = "grid-rows-[calc(var(--u)*20)_minmax(0,1fr)_auto]"

/** Small run of shards: d = data, p = parity, x = missing, c = failed checksum, h = rebuilt. */
export function Shards({ s, className }: { s: string; className?: string }) {
  return (
    <span className={cn("inline-flex u-gap-0.75", className)} aria-hidden="true">
      {s.split("").map((c, i) => (
        <i
          key={i}
          className={cn(
            "relative block u-size-2.75",
            c === "d" && "bg-ab-data",
            c === "p" && "bg-ab-parity",
            c === "x" && "border-2 border-dashed border-ab-data",
            c === "h" && "bg-ab-data outline-2 outline-offset-[calc(var(--u)*0.4)] outline-ab-fg",
            c === "c" && "border-2 border-ab-data",
          )}
        >
          {c === "c" && (
            <svg viewBox="0 0 10 10" className="absolute inset-0 size-full text-ab-data" aria-hidden="true">
              <path d="M0 10L10 0M0 0l10 10" stroke="currentColor" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
            </svg>
          )}
        </i>
      ))}
    </span>
  )
}

export const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M2 12h34M28 5l8 7-8 7" />
  </svg>
)

/** Placeholder frame for content supplied later (photos, screenshots, partner marks). */
export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid place-items-center border-2 border-dashed border-ab-line font-mono u-text-2 leading-tight tracking-[0.08em] text-ab-muted uppercase", className)}>{children}</div>
}
