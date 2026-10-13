"use client"

import { useId, useMemo, useState } from "react"
import { ShardMatrix, type MatrixOptions } from "@/components/brand/matrix"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { useT } from "./locale-provider"

type Surface = "ink" | "paper" | "signal"
const SURFACE: Record<Surface, { bg: string; data: string; parity: string; empty: string }> = {
  ink: { bg: "#0B0E14", data: "#0062FF", parity: "#FF5E14", empty: "rgba(255,255,255,.16)" },
  paper: { bg: "#F4F6F9", data: "#0062FF", parity: "#FF5E14", empty: "rgba(11,14,20,.16)" },
  signal: { bg: "#0062FF", data: "#FFFFFF", parity: "#0B0E14", empty: "rgba(255,255,255,.3)" },
}

export function MatrixPlayground() {
  const t = useT()
  const id = useId()
  const [o, setO] = useState<Required<Pick<MatrixOptions, "cols" | "rows" | "k" | "m" | "seed" | "missing">> & { mode: NonNullable<MatrixOptions["mode"]>; fade: NonNullable<MatrixOptions["fade"]>; dead: number }>({
    cols: 16,
    rows: 8,
    k: 12,
    m: 4,
    seed: 7,
    missing: 0,
    mode: "solid",
    fade: "",
    dead: 0,
  })
  const [surface, setSurface] = useState<Surface>("ink")
  const set = <K extends keyof typeof o>(k: K, v: (typeof o)[K]) => setO((p) => ({ ...p, [k]: v }))

  const dead = useMemo(() => (o.dead > 0 ? Array.from({ length: Math.min(o.dead, o.cols) }, (_, i) => Math.round(((i + 1) * o.cols) / (o.dead + 1)) - 1) : []), [o.dead, o.cols])
  const code = useMemo(() => {
    const parts = [`cols={${o.cols}}`, `rows={${o.rows}}`, `k={${o.k}}`, `m={${o.m}}`]
    if (o.mode !== "solid") parts.push(`mode="${o.mode}"`)
    if (o.fade) parts.push(`fade="${o.fade}"`)
    if (o.missing) parts.push(`missing={${o.missing}}`)
    if (dead.length) parts.push(`dead={[${dead.join(", ")}]}`)
    parts.push(`seed={${o.seed}}`)
    return `<ShardMatrix ${parts.join(" ")} />`
  }, [o, dead])

  const s = SURFACE[surface]
  const range = (key: "cols" | "rows" | "k" | "m" | "seed" | "missing" | "dead", label: string, min: number, max: number) => (
    <label className="grid gap-1.5" htmlFor={`${id}-${key}`}>
      <span className="flex justify-between font-mono text-[11px] tracking-[0.04em] text-muted-foreground uppercase">
        <span>{label}</span>
        <span className="text-foreground num">{o[key]}</span>
      </span>
      <input
        id={`${id}-${key}`}
        type="range"
        min={min}
        max={max}
        value={o[key]}
        onChange={(e) => set(key, Number(e.target.value))}
        className="h-5 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brand [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-strong [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-brand"
      />
    </label>
  )
  const seg = <V extends string>(label: string, value: V, opts: { v: V; l: string }[], on: (v: V) => void) => (
    <div className="grid gap-1.5">
      <span className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground uppercase">{label}</span>
      <div className="flex flex-wrap border border-strong" role="group" aria-label={label}>
        {opts.map((x, i) => (
          <button key={x.v || "none"} type="button" aria-pressed={value === x.v} onClick={() => on(x.v)} className={cn("h-7 flex-1 px-2 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground", i > 0 && "border-l border-strong", value === x.v && "bg-foreground text-background hover:text-background")}>
            {x.l}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="grid border border-border lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="grid min-h-[360px] min-w-0 grid-rows-[1fr_auto]">
        <div className="relative grid place-items-center overflow-hidden p-[clamp(20px,4vw,48px)] transition-colors duration-(--duration-base) ease-standard" style={{ background: s.bg, ["--mx-data" as string]: s.data, ["--mx-parity" as string]: s.parity, ["--mx-empty" as string]: s.empty }}>
          <ShardMatrix className="!h-[min(52vw,340px)] max-w-full" cols={o.cols} rows={o.rows} k={o.k} m={o.m} seed={o.seed} mode={o.mode} fade={o.fade} missing={o.missing} dead={dead} gap={0.22} />
        </div>
        <div className="flex min-w-0 items-center justify-between gap-3 border-t border-border bg-neutral-950 py-2 pr-2 pl-3.5">
          <code className="min-w-0 truncate !bg-transparent font-mono text-xs !text-neutral-200">{code}</code>
          <CopyButton text={code} variant="dark" />
        </div>
      </div>
      <div className="grid content-start gap-4 border-t border-border p-5 lg:border-t-0 lg:border-l">
        <div className="grid grid-cols-2 gap-4">
          {range("cols", t("盘 cols", "Drives"), 2, 32)}
          {range("rows", t("条带 rows", "Stripes"), 1, 16)}
          {range("k", t("数据块 k", "Data k"), 1, 16)}
          {range("m", t("校验块 m", "Parity m"), 0, 8)}
          {range("missing", t("缺失块", "Missing"), 0, 12)}
          {range("dead", t("故障盘", "Failed drives"), 0, 4)}
        </div>
        {seg(t("模式", "Mode"), o.mode, [{ v: "solid", l: "solid" }, { v: "tone", l: "tone" }, { v: "outline", l: "outline" }, { v: "sparse", l: "sparse" }], (v) => set("mode", v))}
        {seg(t("消隐方向", "Dissolve"), o.fade, [{ v: "", l: "—" }, { v: "l", l: "l" }, { v: "r", l: "r" }, { v: "t", l: "t" }, { v: "b", l: "b" }, { v: "bl", l: "bl" }, { v: "tr", l: "tr" }], (v) => set("fade", v))}
        {seg(t("底色", "Surface"), surface, [{ v: "ink", l: "INK" }, { v: "paper", l: "PAPER" }, { v: "signal", l: "SIGNAL" }], setSurface)}
        {range("seed", t("随机种子", "Seed"), 1, 99)}
        <p className="text-xs leading-relaxed text-muted-foreground">
          {o.dead > o.m
            ? t("故障盘数量超过校验块数量时，数据将无法重建。", "With more failed drives than parity shards, data can no longer be rebuilt.")
            : t(`EC ${o.k}+${o.m}：任意 ${o.m} 块盘离线时数据仍可读取。`, `EC ${o.k}+${o.m}: data stays readable with any ${o.m} drives offline.`)}
        </p>
      </div>
    </div>
  )
}
