"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { L } from "@/components/artboard/l"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { useLocale, useT } from "@/components/site/locale-provider"
import { cn } from "@/lib/utils"

const COLS = 6
const ROWS = 17
const K = 4
const N = 6
const DEAD = [1, 4]
const DATA = "#0062FF"
const PARITY = "#FF5E14"
const EASE = "cubic-bezier(.2,0,0,1)"
const EMPH = "cubic-bezier(.16,1,.3,1)"

/** Stage start times in ms. 0 write · 1 drives offline · 2 parity flash · 3 heal · 4 end frame */
const CUES = [150, 1500, 2500, 3500, 4900]
const END = CUES.length

const mark = <sup className="relative -top-[1.15em] ml-[0.1em] align-baseline font-sans text-[0.36em] leading-none font-semibold">1</sup>

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const x = i % COLS
  const y = Math.floor(i / COLS)
  const parity = (((x - y) % N) + N) % N >= K
  return { x, y, parity, dead: DEAD.includes(x) }
})

/** 300 × 250 HTML5 banner: one play of the write and heal moves, ending on the complete static frame. */
export function HealBanner() {
  const t = useT()
  const locale = useLocale()
  const fitRef = useRef<HTMLDivElement>(null)
  const abRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const [stage, setStage] = useState(0)
  const [instant, setInstant] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const fit = fitRef.current
    const ab = abRef.current
    if (!fit || !ab) return
    const apply = () => ab.style.setProperty("--s", (fit.clientWidth / 300).toFixed(5))
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(fit)
    return () => ro.disconnect()
  }, [])

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    abRef.current?.getAnimations({ subtree: true }).forEach((a) => a.cancel())
  }

  const play = useCallback(() => {
    clear()
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setInstant(true)
      setStage(END)
      return
    }
    setReduced(false)
    setInstant(true)
    setStage(0)
    timers.current.push(
      window.setTimeout(() => {
        setInstant(false)
        CUES.forEach((at, i) => timers.current.push(window.setTimeout(() => setStage(i + 1), at)))
      }, 60),
    )
  }, [])

  useEffect(() => {
    const id = window.setTimeout(play, 0)
    return () => {
      window.clearTimeout(id)
      clear()
    }
  }, [play])

  // Parity flashes once (well under 3 Hz), then the offline shards are rebuilt from parity.
  useEffect(() => {
    const ab = abRef.current
    if (!ab || instant) return
    if (stage === 3) {
      ab.querySelectorAll<HTMLElement>("[data-p='1'][data-d='0']").forEach((el) => el.animate([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], { duration: 420, easing: EASE }))
    }
    if (stage === 4) {
      ab.querySelectorAll<HTMLElement>("[data-d='1']").forEach((el) => {
        const y = Number(el.dataset.y)
        el.animate(
          [
            { backgroundColor: PARITY, opacity: 0.25 },
            { backgroundColor: PARITY, opacity: 1, offset: 0.4 },
            { backgroundColor: el.dataset.p === "1" ? PARITY : DATA, opacity: 1 },
          ],
          { duration: 720, delay: y * 40, easing: EASE, fill: "backwards" },
        )
      })
    }
  }, [stage, instant])

  const shown = (from: number) => stage >= from
  const reveal = (from: number, delay = 0): CSSProperties => ({
    opacity: shown(from) ? 1 : 0,
    transform: shown(from) ? "none" : "translateY(calc(var(--u) * 1.5))",
    transition: instant ? "none" : `opacity 240ms ${EASE} ${delay}ms, transform 420ms ${EMPH} ${delay}ms`,
  })

  const steps = [
    { at: "0.0 s", k: t("写入", "Write"), v: t("分片按条带依次出现", "Shards appear stripe by stripe") },
    { at: "1.5 s", k: t("离线", "Offline"), v: t("两块盘离线，出现第一句", "Two drives go offline; the first half of the line appears") },
    { at: "2.5 s", k: t("校验", "Parity"), v: t("校验块闪烁一次，出现第二句", "Parity flashes once; the second half appears") },
    { at: "3.5 s", k: t("修复", "Heal"), v: t("由校验块重建离线分片", "Offline shards are rebuilt from parity") },
    { at: "4.9 s", k: t("尾帧", "End frame"), v: t("字标、信息、脚注、CTA 全部就位并停止", "Wordmark, message, footnote and CTA in place; motion stops") },
  ]

  return (
    <div className="grid items-start gap-x-10 gap-y-6 md:grid-cols-[minmax(0,600px)_minmax(0,1fr)]">
      <figure className="m-0 grid min-w-0 gap-3">
        <div ref={fitRef} className="relative w-full overflow-hidden bg-surface outline outline-1 -outline-offset-1 outline-border" style={{ aspectRatio: "300 / 250" }}>
          <div ref={abRef} className="ab t-ink" data-lang={locale} style={{ "--w": "300px", "--h": "250px" } as CSSProperties} aria-label={t("动画横幅示例：丢盘，不丢数据。", "Animated banner sample: Lose drives. Keep data.")} role="img">
            <div className="absolute inset-y-0 right-0 grid w-[30%] grid-cols-6 content-center gap-[calc(var(--u)*0.9)]">
              {cells.map((c, i) => {
                const off = c.dead && (stage === 2 || stage === 3)
                return (
                  <i
                    key={i}
                    data-x={c.x}
                    data-y={c.y}
                    data-p={c.parity ? 1 : 0}
                    data-d={c.dead ? 1 : 0}
                    className="block aspect-square border border-dashed"
                    style={{
                      opacity: shown(1) ? 1 : 0,
                      backgroundColor: off ? "transparent" : c.parity ? PARITY : DATA,
                      borderColor: off ? DATA : "transparent",
                      transition: instant || !(stage === 1) ? "none" : `opacity 60ms steps(2) ${Math.round(120 + (c.x + c.y * 0.6) * 28)}ms`,
                    }}
                  />
                )
              })}
            </div>
            <div className="absolute top-(--m) bottom-(--m) left-(--m) right-[calc(30%+var(--u)*6)] flex flex-col justify-between">
              <div style={reveal(1)}>
                <Wordmark className="ab-logo u-h-5.5" />
              </div>
              <div className="grid justify-items-start u-gap-4">
                <h3 className="ab-head u-text-9 leading-none [&_[data-l=zh]]:leading-[1.16]">
                  <span className="block" style={reveal(2)}>
                    <L zh="丢盘，" en="Lose drives." />
                  </span>
                  <span className="block" style={reveal(3)}>
                    <L zh={<>不丢数据{mark}。</>} en={<>Keep data.{mark}</>} />
                  </span>
                </h3>
                <span className="inline-flex u-h-11 w-max items-center u-gap-2 bg-ab-data u-px-3.5 font-sans u-text-4.5 leading-none font-semibold whitespace-nowrap text-ab-on-data" style={reveal(5)}>
                  <L zh="下载 RustFS" en="Download RustFS" />
                  <Icon name="arrow-right" strokeWidth={2} className="size-[1.15em]" />
                </span>
              </div>
              <p className="grid grid-cols-[auto_1fr] gap-x-[0.45em] u-text-3.75 leading-[1.35] text-ab-fg-2" style={reveal(5, 80)}>
                <span className="font-semibold">1</span>
                <span>
                  <L zh="EC 4+2 配置下，任意两块盘离线时数据仍可读取。" en="With EC 4+2, data stays readable with any two drives offline." />
                </span>
              </p>
            </div>
          </div>
        </div>
        <figcaption className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs leading-normal text-muted-foreground">
          <span>300 × 250 · HTML5 · {t("播放 1 次，约 5.3 秒", "1 play, about 5.3 s")}</span>
          <button type="button" onClick={play} className="inline-flex h-7 items-center gap-1.5 border border-strong bg-background px-2.5 font-sans text-xs leading-none font-medium text-foreground transition-colors hover:bg-surface">
            <Icon name="replay" className="size-3.5" />
            {t("重播", "Replay")}
          </button>
        </figcaption>
      </figure>
      <div className="grid gap-4">
        <ol className="m-0 grid list-none border-t border-border p-0" aria-label={t("动画时间轴", "Animation timeline")}>
          {steps.map((s, i) => {
            const active = stage === i + 1 || (i === steps.length - 1 && stage >= END)
            const done = stage > i + 1
            return (
              <li key={i} className="grid grid-cols-[52px_12px_1fr] items-baseline gap-3 border-b border-border py-3 text-sm leading-snug">
                <span className="font-mono text-xs text-muted-foreground">{s.at}</span>
                <i className={cn("block size-2.5 translate-y-px transition-colors duration-(--duration-base)", active ? "bg-brand" : done ? "bg-foreground/40" : "border border-strong")} aria-hidden="true" />
                <span className={cn("transition-colors duration-(--duration-base)", active ? "text-foreground" : "text-muted-foreground")}>
                  <b className="mr-1.5 font-semibold text-foreground">{s.k}</b>
                  {s.v}
                </span>
              </li>
            )
          })}
        </ol>
        <p className="text-[13px] leading-relaxed text-muted-foreground empty:hidden" aria-live="polite">
          {reduced && t("已开启「减少动态效果」：直接显示尾帧。", "Reduced motion is on: the end frame is shown directly.")}
        </p>
      </div>
    </div>
  )
}
