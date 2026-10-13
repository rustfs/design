"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Icon } from "@/components/brand/icon"
import { motion } from "@/lib/tokens"
import { cn } from "@/lib/utils"
import { useT } from "./locale-provider"

function useReduced() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => setR(m.matches)
    on()
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])
  return r
}

function ReplayButton({ onClick, label }: { onClick: () => void; label?: string }) {
  const t = useT()
  return (
    <button type="button" onClick={onClick} className="inline-flex h-7 items-center gap-1.5 border border-strong bg-background px-2.5 text-xs font-medium transition-colors hover:bg-surface">
      <Icon name="replay" className="size-3.5" />
      {label ?? t("重播", "Replay")}
    </button>
  )
}

/* ---------- Easing curves ---------- */
export function EasingDemo() {
  const t = useT()
  const [run, setRun] = useState(0)
  const curves = [
    ...motion.easing.map((e) => ({ name: e.name, css: e.css, pts: e.value as readonly number[] })),
    { name: "linear", css: "linear", pts: [0, 0, 1, 1] },
  ]
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">{t("时长统一为 720ms，便于比较曲线", "All at 720ms so the curves can be compared")}</span>
        <ReplayButton onClick={() => setRun((r) => r + 1)} label={t("播放", "Play")} />
      </div>
      <div className="grid gap-px border border-border bg-border">
        {curves.map((c) => {
          const [x1, y1, x2, y2] = c.pts
          const muted = c.name === "linear"
          return (
            <div key={c.name} className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 bg-background p-4 sm:grid-cols-[120px_180px_minmax(0,1fr)]">
              <svg viewBox="-0.08 -0.08 1.16 1.16" className="size-20 sm:size-24" aria-hidden="true">
                <rect x="0" y="0" width="1" height="1" fill="none" stroke="var(--border)" strokeWidth={0.01} />
                <path d={`M0 1C${x1} ${1 - y1} ${x2} ${1 - y2} 1 0`} fill="none" stroke={muted ? "var(--faint)" : "var(--brand)"} strokeWidth={0.03} />
                <path d={`M0 1L${x1} ${1 - y1}M1 0L${x2} ${1 - y2}`} stroke="var(--parity)" strokeWidth={0.008} />
                <rect x={x1 - 0.025} y={1 - y1 - 0.025} width={0.05} height={0.05} fill="var(--parity)" />
                <rect x={x2 - 0.025} y={1 - y2 - 0.025} width={0.05} height={0.05} fill="var(--parity)" />
              </svg>
              <div className="grid gap-1 font-mono text-xs">
                <span className={muted ? "text-muted-foreground" : "text-foreground"}>{muted ? "linear" : `--ease-${c.name}`}</span>
                <span className="text-muted-foreground">{c.css}</span>
              </div>
              <div className="relative col-span-2 h-8 border-b border-border sm:col-span-1">
                <span key={run} className={cn("absolute bottom-0 left-0 block size-6", muted ? "bg-faint" : "bg-brand")} style={{ animation: run ? `ease-track 720ms ${c.css} forwards` : undefined }} />
              </div>
            </div>
          )
        })}
      </div>
      <style>{`@keyframes ease-track { from { left: 0 } to { left: calc(100% - 24px) } } @media (prefers-reduced-motion: reduce) { [style*="ease-track"] { animation: none !important; left: calc(100% - 24px) !important } }`}</style>
    </div>
  )
}

/* ---------- Durations ---------- */
export function DurationDemo() {
  const t = useT()
  const [run, setRun] = useState(0)
  const use: Record<string, [string, string]> = {
    instant: ["按下反馈、切换勾选", "Press feedback, toggles"],
    fast: ["悬停、颜色变化", "Hover, colour changes"],
    base: ["展开、标签页、提示", "Disclosure, tabs, tooltips"],
    slow: ["面板、抽屉、页面区块", "Panels, drawers, page blocks"],
    scene: ["品牌动作、片头场景", "Brand moves, opening scenes"],
    stagger: ["分片之间的间隔", "Gap between shards"],
  }
  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <ReplayButton onClick={() => setRun((r) => r + 1)} label={t("播放", "Play")} />
      </div>
      <div className="grid gap-px border border-border bg-border">
        {motion.duration.map((d) => (
          <div key={d.name} className="grid grid-cols-[110px_64px_minmax(0,1fr)] items-center gap-4 bg-background px-4 py-3 sm:grid-cols-[140px_72px_minmax(0,1fr)_220px]">
            <span className="font-mono text-xs">--duration-{d.name}</span>
            <span className="font-mono text-xs text-muted-foreground num">{d.value}</span>
            <div className="h-2 bg-surface-2">
              <span key={run} className="block h-full bg-brand" style={{ width: run ? undefined : "100%", animation: run ? `dur-fill ${d.value} var(--ease-standard) forwards` : undefined }} />
            </div>
            <span className="col-span-3 text-xs text-muted-foreground sm:col-span-1">{t(use[d.name][0], use[d.name][1])}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes dur-fill { from { width: 0 } to { width: 100% } }`}</style>
    </div>
  )
}

/* ---------- Brand moves ---------- */
type Cell = "d" | "p" | "x" | "h" | "o"

export function WriteDemo() {
  const t = useT()
  const reduced = useReduced()
  const [n, setN] = useState(18)
  const timer = useRef<number[]>([])
  const play = useCallback(() => {
    timer.current.forEach(clearTimeout)
    timer.current = []
    if (reduced) {
      setN(18)
      return
    }
    setN(0)
    for (let i = 1; i <= 18; i++) timer.current.push(window.setTimeout(() => setN(i), 120 + i * 60))
  }, [reduced])
  useEffect(() => () => timer.current.forEach(clearTimeout), [])
  return (
    <MoveFrame
      title={t("写入 Write", "Write")}
      body={t("分片按条带逐块出现：每块 60ms、步进式出现，不做淡入。用于页面载入、发布与上传完成。", "Shards appear stripe by stripe, 60ms apart, stepping in rather than fading. Use it for page load, releases and completed uploads.")}
      spec="steps(2) · 60 ms / shard · 3 stripes"
      onReplay={play}
    >
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: 18 }, (_, i) => {
          const row = Math.floor(i / 6)
          const col = i % 6
          const parity = (((col - row) % 6) + 6) % 6 >= 4
          return <span key={i} className={cn("size-[clamp(22px,4vw,34px)] transition-opacity duration-[60ms] [transition-timing-function:steps(2)]", parity ? "bg-oxide-500" : "bg-blue-500", i < n ? "opacity-100" : "opacity-0")} />
        })}
      </div>
    </MoveFrame>
  )
}

export function HealDemo() {
  const t = useT()
  const reduced = useReduced()
  const [cells, setCells] = useState<Cell[]>(["d", "d", "d", "d", "p", "p"])
  const timer = useRef<number[]>([])
  const play = useCallback(() => {
    timer.current.forEach(clearTimeout)
    timer.current = []
    if (reduced) return
    const seq: [number, Cell[]][] = [
      [0, ["d", "d", "x", "d", "p", "p"]],
      [700, ["d", "d", "x", "d", "o", "o"]],
      [1000, ["d", "d", "h", "d", "p", "p"]],
      [1700, ["d", "d", "d", "d", "p", "p"]],
    ]
    seq.forEach(([at, s]) => timer.current.push(window.setTimeout(() => setCells(s), at)))
  }, [reduced])
  useEffect(() => () => timer.current.forEach(clearTimeout), [])
  return (
    <MoveFrame
      title={t("修复 Heal", "Heal")}
      body={t("一个数据块消失为虚线框，校验块闪亮，缺失的块被重建。用于状态恢复、错误解除与「修复」主题内容。", "A data shard drops to a dashed outline, the parity shards flash and the missing shard is rebuilt. Use it for recovered states, cleared errors and healing topics.")}
      spec="0 → 700 ms missing · 1000 ms rebuild · ease-emphasized"
      onReplay={play}
    >
      <div className="flex gap-2">
        {cells.map((c, i) => (
          <span
            key={i}
            className={cn(
              "size-[clamp(30px,5.5vw,48px)] transition-[background-color,box-shadow,transform] duration-(--duration-slow) ease-emphasized",
              c === "d" && "bg-blue-500",
              c === "p" && "bg-oxide-500",
              c === "o" && "scale-110 bg-oxide-400",
              c === "x" && "bg-transparent shadow-[inset_0_0_0_1.5px_var(--color-blue-500)] [background-image:repeating-linear-gradient(45deg,transparent_0_5px,rgba(0,98,255,.18)_5px_6px)]",
              c === "h" && "bg-oxide-500",
            )}
          />
        ))}
      </div>
    </MoveFrame>
  )
}

function MoveFrame({ title, body, spec, onReplay, children }: { title: React.ReactNode; body: React.ReactNode; spec: string; onReplay: () => void; children: React.ReactNode }) {
  return (
    <figure className="m-0 grid border border-border">
      <div className="relative grid min-h-60 place-items-center bg-neutral-950 p-8">
        {children}
        <div className="absolute top-3 right-3">
          <ReplayButton onClick={onReplay} />
        </div>
      </div>
      <figcaption className="grid gap-2 border-t border-border p-5">
        <b className="text-base font-semibold">{title}</b>
        <p className="text-sm leading-relaxed text-subtle">{body}</p>
        <span className="font-mono text-[11px] text-muted-foreground">{spec}</span>
      </figcaption>
    </figure>
  )
}

/* ---------- Micro-interactions ---------- */
export function MicroDemos() {
  const t = useT()
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
      <div className="grid content-between gap-6 bg-background p-6">
        <button type="button" className="group relative inline-flex h-11 items-center gap-2 justify-self-start overflow-hidden bg-brand px-4 text-sm font-medium text-white transition-transform duration-(--duration-fast) ease-standard hover:-translate-y-px active:translate-y-0 active:scale-[.985]">
          <span className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-[linear-gradient(120deg,transparent_0_42%,rgba(255,255,255,.28)_48%,transparent_54%_100%)] transition-transform duration-(--duration-slow) ease-emphasized group-hover:translate-x-[130%] motion-reduce:hidden" />
          {t("下载 RustFS", "Download RustFS")}
          <Icon name="arrow-right" className="size-4 transition-transform duration-(--duration-base) ease-emphasized group-hover:translate-x-0.5" />
        </button>
        <Spec title={t("按钮", "Button")} lines={[t("悬停上移 1px，光带扫过", "Lifts 1px; a sheen sweeps across"), "150 ms standard · 420 ms emphasized"]} />
      </div>
      <div className="grid content-between gap-6 bg-background p-6">
        <a href="#micro" className="group relative grid gap-2 border border-border p-4 transition-colors duration-(--duration-base) ease-standard hover:border-foreground hover:bg-surface">
          <span className="font-mono text-xs text-brand">docs/</span>
          <span className="font-semibold">{t("阅读文档", "Read the docs")}</span>
          <Icon name="arrow-up-right" className="absolute top-4 right-4 size-4 text-faint transition-transform duration-(--duration-base) ease-emphasized group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
        </a>
        <Spec title={t("卡片", "Card")} lines={[t("边框变为前景色，箭头移动 2px", "Border turns foreground; arrow moves 2px"), "240 ms standard"]} />
      </div>
      <div className="grid content-between gap-6 bg-background p-6">
        <a href="#micro" className="justify-self-start bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 text-link transition-[background-size] duration-(--duration-base) ease-emphasized hover:bg-[length:100%_1px]">
          {t("查看兼容性矩阵", "See the compatibility matrix")}
        </a>
        <Spec title={t("链接", "Link")} lines={[t("下划线从左向右生长", "Underline grows left to right"), "240 ms emphasized"]} />
      </div>
    </div>
  )
}

function Spec({ title, lines }: { title: React.ReactNode; lines: React.ReactNode[] }) {
  return (
    <div className="grid gap-1">
      <b className="text-sm font-semibold">{title}</b>
      {lines.map((l, i) => (
        <span key={i} className={cn("text-xs", i ? "font-mono text-muted-foreground" : "text-subtle")}>{l}</span>
      ))}
    </div>
  )
}
