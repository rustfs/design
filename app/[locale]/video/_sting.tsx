"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import { flushSync } from "react-dom"
import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { useT } from "@/components/site/locale-provider"
import { cn } from "@/lib/utils"

/* ---------- easing: the brand motion tokens, evaluated per frame ---------- */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sx = (u: number) => ((ax * u + bx) * u + cx) * u
  const sy = (u: number) => ((ay * u + by) * u + cy) * u
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let lo = 0
    let hi = 1
    let u = x
    for (let i = 0; i < 32; i++) {
      const v = sx(u)
      if (Math.abs(v - x) < 1e-5) break
      if (v < x) lo = u
      else hi = u
      u = (lo + hi) / 2
    }
    return sy(u)
  }
}

const EASE = {
  standard: bezier(0.2, 0, 0, 1),
  emphasized: bezier(0.16, 1, 0.3, 1),
  exit: bezier(0.4, 0, 1, 1),
}
const clamp = (v: number) => Math.min(1, Math.max(0, v))

/* ---------- the score ---------- */
export type Variant = "intro" | "outro"
type Tone = "data" | "parity" | "hold" | "exit"
type Track = { id: string; zh: string; en: string; from: number; to: number; tone: Tone; marks?: number[] }
type Seq = { dur: number; poster: number; heal: boolean; letterAt: number; lineAt: number; urlAt?: number; fadeAt?: number; tracks: Track[]; beats: { at: number; zh: string; en: string }[] }

const WRITE_AT = [0, 1, 2, 3, 4, 5].map((i) => 120 + i * 80) // one shard every 80 ms, each a 60 ms two-step
const LETTER_STAGGER = 80
const LETTER_DUR = 420
const LINE_DUR = 420
const FADE_DUR = 720
const DROP = 600
const FLASH = 840
const RESTORE = 960
const RESTORE_DUR = 240
const letters = (at: number) => [0, 1, 2, 3, 4, 5].map((i) => at + i * LETTER_STAGGER)

export const SEQ: Record<Variant, Seq> = {
  intro: {
    dur: 3200,
    poster: 3200,
    heal: true,
    letterAt: 1200,
    lineAt: 2000,
    tracks: [
      { id: "write", zh: "写入", en: "Write", from: 120, to: 580, tone: "data", marks: WRITE_AT },
      { id: "heal", zh: "修复", en: "Heal", from: DROP, to: RESTORE + RESTORE_DUR, tone: "parity", marks: [DROP, FLASH, RESTORE] },
      { id: "mark", zh: "字标", en: "Wordmark", from: 1200, to: 1200 + 5 * LETTER_STAGGER + LETTER_DUR, tone: "data", marks: letters(1200) },
      { id: "line", zh: "口号", en: "Line", from: 2000, to: 2000 + LINE_DUR, tone: "data" },
      { id: "hold", zh: "静帧", en: "Hold", from: 2000 + LINE_DUR, to: 3200, tone: "hold" },
    ],
    beats: [
      { at: 0, zh: "Ink 底色，3 帧黑场", en: "Ink field, three frames of lead-in" },
      { at: 120, zh: "4+2 条带逐块写入", en: "The 4+2 stripe writes in, shard by shard" },
      { at: DROP, zh: "一块数据分片掉线，以虚线框表示", en: "One data shard drops out and turns to a dashed outline" },
      { at: FLASH, zh: "校验数据以 Oxide 闪现，分片重建", en: "Parity flashes Oxide and the shard is rebuilt" },
      { at: RESTORE, zh: "重建完成，分片恢复为 Signal Blue", en: "Rebuilt: the shard returns to Signal Blue" },
      { at: 1200, zh: "字标自基线逐字升起", en: "The wordmark rises from its baseline, letter by letter" },
      { at: 2000, zh: "品牌口号淡入", en: "The brand line fades up" },
      { at: 2420, zh: "静帧，保持至 3.2 s", en: "Hold to 3.2 s" },
    ],
  },
  outro: {
    dur: 5000,
    poster: 4000,
    heal: false,
    letterAt: 600,
    lineAt: 1400,
    urlAt: 1600,
    fadeAt: 4280,
    tracks: [
      { id: "write", zh: "写入", en: "Write", from: 120, to: 580, tone: "data", marks: WRITE_AT },
      { id: "mark", zh: "字标", en: "Wordmark", from: 600, to: 600 + 5 * LETTER_STAGGER + LETTER_DUR, tone: "data", marks: letters(600) },
      { id: "line", zh: "口号", en: "Line", from: 1400, to: 1400 + LINE_DUR, tone: "data" },
      { id: "url", zh: "网址", en: "URL", from: 1600, to: 1600 + LINE_DUR, tone: "data" },
      { id: "hold", zh: "静帧", en: "Hold", from: 1600 + LINE_DUR, to: 4280, tone: "hold" },
      { id: "fade", zh: "淡出", en: "Fade", from: 4280, to: 5000, tone: "exit" },
    ],
    beats: [
      { at: 0, zh: "Ink 底色，3 帧黑场", en: "Ink field, three frames of lead-in" },
      { at: 120, zh: "4+2 条带逐块写入", en: "The 4+2 stripe writes in, shard by shard" },
      { at: 600, zh: "字标自基线逐字升起", en: "The wordmark rises from its baseline, letter by letter" },
      { at: 1400, zh: "品牌口号与网址依次淡入", en: "The brand line, then the URL, fade up" },
      { at: 2020, zh: "静帧，可叠加平台结束画面元素", en: "Hold; platform end-screen elements may sit on top" },
      { at: 4280, zh: "淡出至 Ink", en: "Fade to Ink" },
    ],
  },
}

type Shard = { fill: "d" | "p" | null; o: number; flash: number; dashed: boolean }

function shardAt(i: number, t: number, heal: boolean): Shard {
  const s = WRITE_AT[i]
  const o = t < s ? 0 : t < s + 30 ? 0.5 : 1
  const fill = i < 4 ? "d" : "p"
  if (!heal || i !== 1 || t < DROP) return { fill, o, flash: 0, dashed: false }
  if (t < FLASH) return { fill: null, o: 1, flash: 0, dashed: true }
  if (t < RESTORE) return { fill: null, o: 1, flash: t < FLASH + 60 ? 0.25 : 1, dashed: true }
  const p = EASE.standard(clamp((t - RESTORE) / RESTORE_DUR))
  return { fill: "d", o: 1, flash: 1 - p, dashed: false }
}

function frameAt(v: Variant, t: number) {
  const s = SEQ[v]
  return {
    shards: [0, 1, 2, 3, 4, 5].map((i) => shardAt(i, t, s.heal)),
    letters: [0, 1, 2, 3, 4, 5].map((i) => EASE.emphasized(clamp((t - s.letterAt - i * LETTER_STAGGER) / LETTER_DUR))),
    line: EASE.standard(clamp((t - s.lineAt) / LINE_DUR)),
    url: s.urlAt === undefined ? 0 : EASE.standard(clamp((t - s.urlAt) / LINE_DUR)),
    fade: s.fadeAt === undefined ? 0 : EASE.exit(clamp((t - s.fadeAt) / FADE_DUR)),
  }
}

/* Each letter path sits inside the wordmark's own SVG viewport, so translating it down hides it below the baseline. */
const LETTER_VARS = "[&_.l-r]:[transform:translateY(var(--l0))] [&_.l-u]:[transform:translateY(var(--l1))] [&_.l-s1]:[transform:translateY(var(--l2))] [&_.l-t]:[transform:translateY(var(--l3))] [&_.l-f]:[transform:translateY(var(--l4))] [&_.l-s2]:[transform:translateY(var(--l5))]"

/** One frame of the sting, rendered from time alone, so any frame can be inspected or exported. */
export function StingFrame({ variant, t }: { variant: Variant; t: number }) {
  const f = frameAt(variant, t)
  const vars = Object.fromEntries(f.letters.map((p, i) => [`--l${i}`, `${((1 - p) * 64).toFixed(2)}px`])) as CSSProperties
  const rise = (p: number) => ({ opacity: p, transform: `translateY(calc(var(--u) * ${((1 - p) * 1.5).toFixed(3)}))` })
  return (
    <>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid justify-items-center">
          <span className="flex u-text-4 gap-[0.32em]" aria-hidden="true">
            {f.shards.map((s, i) => (
              <i key={i} className="relative block size-[1em]" style={{ opacity: s.o }}>
                {s.fill && <b className={cn("absolute inset-0", s.fill === "d" ? "bg-ab-data" : "bg-ab-parity")} />}
                {s.flash > 0 && <b className="absolute inset-0 bg-ab-parity" style={{ opacity: s.flash }} />}
                {s.dashed && <b className="absolute inset-0 border-dashed border-ab-data [border-width:calc(var(--u)*0.25)]" />}
              </i>
            ))}
          </span>
          <div className={cn("u-mt-7 u-h-12", LETTER_VARS)} style={vars}>
            <Wordmark className="h-full w-auto text-ab-logo" />
          </div>
          <p className="u-mt-6 font-display u-text-3.75 leading-[1.2] font-semibold tracking-[-0.005em] text-ab-fg-2 [font-stretch:112%]" style={rise(f.line)}>
            <L zh="AI 时代的基建，从每一个字节算起。" en="AI infrastructure, accounted for byte by byte." />
          </p>
          {variant === "outro" && (
            <p className="ab-url u-mt-3 u-text-2.75 text-ab-brand" style={rise(f.url)}>
              rustfs.com
            </p>
          )}
        </div>
      </div>
      {f.fade > 0 && <div className="absolute inset-0 bg-ab-bg" style={{ opacity: f.fade }} />}
    </>
  )
}

/* ---------- player ---------- */
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )

type Fps = 25 | 30 | 60
const pad = (n: number) => String(n).padStart(2, "0")
const timecode = (ms: number, fps: Fps) => {
  const f = Math.round((ms * fps) / 1000)
  const s = Math.floor(f / fps)
  return `00:00:${pad(s)}:${pad(f % fps)}`
}

export function StingPlayer() {
  const t = useT()
  const reduced = useReducedMotion()
  const [variant, setVariant] = useState<Variant>("intro")
  const [fps, setFps] = useState<Fps>(25)
  const [time, setTime] = useState(SEQ.intro.poster)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(false)
  const raf = useRef(0)
  const fpsRef = useRef<Fps>(25)
  const stage = useRef<HTMLDivElement>(null)
  const lanes = useRef<HTMLDivElement>(null)
  const autoplayed = useRef(false)
  const seq = SEQ[variant]

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current)
    setPlaying(false)
  }, [])

  const play = useCallback((v: Variant, from = 0) => {
    cancelAnimationFrame(raf.current)
    const s = SEQ[v]
    const origin = performance.now() - from
    setPlaying(true)
    setPlayed(true)
    const tick = (now: number) => {
      const el = now - origin
      if (el >= s.dur) {
        setTime(s.poster)
        setPlaying(false)
        return
      }
      const q = 1000 / fpsRef.current
      setTime(Math.floor(el / q) * q)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // Exports always capture the poster frame, never a frame mid-animation.
  useEffect(() => {
    const ab = stage.current?.querySelector(".ab")
    if (!ab) return
    const toPoster = () =>
      flushSync(() => {
        cancelAnimationFrame(raf.current)
        setPlaying(false)
        setTime(SEQ[variant].poster)
      })
    ab.addEventListener("rfs:before-export", toPoster)
    return () => ab.removeEventListener("rfs:before-export", toPoster)
  }, [variant])

  // Play once when the stage first comes into view; never with reduced motion.
  useEffect(() => {
    const el = stage.current
    if (!el || reduced) return
    const io = new IntersectionObserver(
      (es) => {
        if (es[0]?.isIntersecting && !autoplayed.current) {
          autoplayed.current = true
          play("intro")
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, play])

  const atEnd = time >= seq.dur || (!playing && time === seq.poster)
  const toggle = () => {
    if (playing) stop()
    else play(variant, atEnd ? 0 : time)
  }
  const choose = (v: Variant) => {
    if (v === variant) return
    autoplayed.current = true
    setVariant(v)
    if (reduced) {
      stop()
      setTime(SEQ[v].poster)
    } else play(v, 0)
  }
  const chooseFps = (f: Fps) => {
    fpsRef.current = f
    setFps(f)
  }

  const frameMs = 1000 / fps
  const seek = (to: number | ((prev: number) => number)) => {
    stop()
    autoplayed.current = true
    setTime((prev) => {
      const ms = typeof to === "function" ? to(prev) : to
      return Math.min(seq.dur, Math.max(0, Math.round(ms / frameMs) * frameMs))
    })
  }
  const seekFromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = lanes.current?.getBoundingClientRect()
    if (!r) return
    seek(((e.clientX - r.left) / r.width) * seq.dur)
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? frameMs * 10 : frameMs
    const map: Record<string, (prev: number) => number> = {
      ArrowRight: (p) => p + step,
      ArrowUp: (p) => p + step,
      ArrowLeft: (p) => p - step,
      ArrowDown: (p) => p - step,
      Home: () => 0,
      End: () => seq.dur,
    }
    if (e.key in map) {
      e.preventDefault()
      seek(map[e.key])
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      toggle()
    }
  }

  const pct = (ms: number) => `${(ms / seq.dur) * 100}%`
  const beat = [...seq.beats].reverse().find((b) => time >= b.at) ?? seq.beats[0]
  const rows = seq.tracks.length
  const ticks = Array.from({ length: Math.floor(seq.dur / 100) + 1 }, (_, i) => i * 100)

  return (
    <div className="grid gap-4">
      <div ref={stage}>
        <TemplateGrid>
          <Template
            title={variant === "intro" ? t("片头 · 3.2 秒", "Logo sting · 3.2 s") : t("片尾 · 5 秒", "Outro · 5 s")}
            spec={t("1920 × 1080 · 25 / 30 / 60 fps · 无声 · 导出为定格帧", "1920 × 1080 · 25 / 30 / 60 fps · silent · exports the poster frame")}
            w={1920}
            h={1080}
            themes={["ink", "paper", "signal"]}
            file={variant === "intro" ? "video-sting-intro" : "video-sting-outro"}
          >
            <StingFrame variant={variant} t={time} />
          </Template>
        </TemplateGrid>
      </div>

      <div className="grid border border-border">
        {/* transport */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-border px-3 py-2.5">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-8 min-w-24 items-center justify-center gap-1.5 border border-foreground bg-foreground px-3 text-xs leading-none font-medium text-background transition-colors duration-(--duration-fast) ease-standard hover:bg-transparent hover:text-foreground"
          >
            <Icon name={playing ? "pause" : played && atEnd ? "replay" : "play"} className="size-3.5" />
            {playing ? t("暂停", "Pause") : played && atEnd ? t("重播", "Replay") : t("播放", "Play")}
          </button>
          <span className="font-mono text-[13px] leading-none text-foreground tabular-nums" aria-label={t("时间码", "Timecode")}>
            {timecode(time, fps)}
          </span>
          <span className="font-mono text-xs leading-none text-muted-foreground tabular-nums">
            {(time / 1000).toFixed(2)} s / {(seq.dur / 1000).toFixed(1)} s
          </span>
          <span className="ml-auto flex flex-wrap gap-1.5">
            <Seg label={t("帧率", "Frame rate")}>
              {([25, 30, 60] as Fps[]).map((f) => (
                <SegButton key={f} pressed={fps === f} onClick={() => chooseFps(f)}>
                  {f}
                </SegButton>
              ))}
              <span className="inline-flex h-6.5 items-center px-2 font-mono text-[11px] leading-none text-faint">fps</span>
            </Seg>
            <Seg label={t("版本", "Version")}>
              <SegButton pressed={variant === "intro"} onClick={() => choose("intro")}>
                {t("片头 3.2 s", "Intro 3.2 s")}
              </SegButton>
              <SegButton pressed={variant === "outro"} onClick={() => choose("outro")}>
                {t("片尾 5 s", "Outro 5 s")}
              </SegButton>
            </Seg>
          </span>
        </div>

        {/* timeline */}
        <div className="grid grid-cols-[76px_minmax(0,1fr)] sm:grid-cols-[128px_minmax(0,1fr)]">
          <div className="grid border-r border-border" style={{ gridTemplateRows: `28px repeat(${rows}, 34px)` }}>
            <span className="border-b border-border" />
            {seq.tracks.map((tr) => {
              const on = time >= tr.from && time < tr.to
              return (
                <span key={tr.id} className={cn("flex items-center gap-2 px-3 font-mono text-[11px] leading-none tracking-[0.04em] uppercase transition-colors duration-(--duration-fast)", on ? "text-foreground" : "text-muted-foreground")}>
                  <i className={cn("hidden size-2 shrink-0 sm:block", TONE[tr.tone])} aria-hidden="true" />
                  {t(tr.zh, tr.en)}
                </span>
              )
            })}
          </div>
          <div className="px-3">
            <div
              ref={lanes}
              role="slider"
              tabIndex={0}
              aria-label={t("时间轴", "Timeline")}
              aria-valuemin={0}
              aria-valuemax={seq.dur}
              aria-valuenow={Math.round(time)}
              aria-valuetext={`${(time / 1000).toFixed(2)} s`}
              onKeyDown={onKey}
              onPointerDown={(e) => {
                try {
                  e.currentTarget.setPointerCapture(e.pointerId)
                } catch {}
                seekFromPointer(e)
              }}
              onPointerMove={(e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) seekFromPointer(e)
              }}
              className="relative grid cursor-ew-resize touch-none select-none"
              style={{ gridTemplateRows: `28px repeat(${rows}, 34px)` }}
            >
              <div className="relative border-b border-border">
                {ticks.map((ms) => {
                  const major = ms % 500 === 0
                  return (
                    <span key={ms} className="absolute bottom-0" style={{ left: pct(ms) }}>
                      <i className={cn("absolute bottom-0 block w-px bg-strong", major ? "h-2" : "h-1")} />
                      {major && <b className={cn("absolute bottom-3 font-mono text-[10px] leading-none font-normal text-muted-foreground tabular-nums", ms === 0 ? "left-0" : "-translate-x-1/2")}>{(ms / 1000).toFixed(1)}</b>}
                    </span>
                  )
                })}
              </div>
              {seq.tracks.map((tr) => (
                <div key={tr.id} className="relative">
                  <span className={cn("absolute top-1/2 h-3 -translate-y-1/2", TONE[tr.tone])} style={{ left: pct(tr.from), width: pct(tr.to - tr.from) }}>
                    {tr.marks?.slice(1).map((m) => (
                      <i key={m} className="absolute inset-y-0 w-px bg-background" style={{ left: `${((m - tr.from) / (tr.to - tr.from)) * 100}%` }} />
                    ))}
                  </span>
                </div>
              ))}
              <span className="pointer-events-none absolute inset-y-0 w-px bg-foreground" style={{ left: pct(time) }} aria-hidden="true">
                <i className="absolute -top-px -left-[3.5px] block size-2 bg-foreground" />
              </span>
            </div>
          </div>
        </div>

        {/* now playing */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border px-3 py-2.5 text-sm leading-normal">
          <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase tabular-nums">{(beat.at / 1000).toFixed(2)} s</span>
          <span className="text-foreground">{t(beat.zh, beat.en)}</span>
          {reduced && <span className="w-full text-xs text-muted-foreground sm:ml-auto sm:w-auto">{t("已按系统设置减弱动态效果：默认显示最终帧，不自动播放。", "Reduced motion is on: the final frame is shown and nothing plays automatically.")}</span>}
        </div>
      </div>
    </div>
  )
}

const TONE: Record<Tone, string> = {
  data: "bg-brand",
  parity: "bg-parity",
  hold: "bg-[repeating-linear-gradient(135deg,var(--strong)_0_1px,transparent_1px_5px)] shadow-[inset_0_0_0_1px_var(--strong)]",
  exit: "bg-faint",
}

function Seg({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="inline-flex border border-strong" role="group" aria-label={label}>
      {children}
    </span>
  )
}

function SegButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={cn("inline-flex h-6.5 items-center px-2 font-mono text-[11px] leading-none text-muted-foreground transition-colors not-first:border-l not-first:border-strong hover:text-foreground", pressed && "bg-surface-2 text-foreground")}>
      {children}
    </button>
  )
}
