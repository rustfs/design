"use client"

import { useEffect, useRef } from "react"
import { mulberry32, ShardMatrix, type MatrixOptions } from "./matrix"

/**
 * Shard matrix with the two brand motions:
 *  write — shards appear stripe by stripe on load
 *  heal  — a data shard drops out, parity flashes, the shard is rebuilt
 */
export function LiveMatrix({ write = false, heal = false, interval = 1600, className, ...o }: MatrixOptions & { write?: boolean; heal?: boolean; interval?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timers: number[] = []
    if (write) {
      el.querySelectorAll<SVGRectElement>("rect").forEach((rc) => {
        const x = Number(rc.dataset.x)
        const y = Number(rc.dataset.y)
        rc.style.opacity = "0"
        timers.push(window.setTimeout(() => {
          rc.style.transition = "opacity 60ms steps(2)"
          rc.style.opacity = ""
        }, 120 + (x + y * 0.6) * 28))
      })
    }
    let visible = true
    const io = new IntersectionObserver((es) => { visible = es[0]?.isIntersecting ?? true })
    io.observe(el)
    if (heal) {
      const r = mulberry32((o.seed ?? 7) + 99)
      const tick = () => {
        if (visible && !document.hidden) {
          const pool = Array.from(el.querySelectorAll<SVGRectElement>("rect.c-d")).filter((rc) => !rc.getAttribute("opacity") || Number(rc.getAttribute("opacity")) > 0.5)
          const pick = pool[Math.floor(r() * pool.length)]
          if (pick) {
            pick.setAttribute("class", "c-x")
            timers.push(window.setTimeout(() => {
              pick.setAttribute("class", "c-d c-h")
              timers.push(window.setTimeout(() => pick.setAttribute("class", "c-d"), 1300))
            }, 900))
          }
        }
        timers.push(window.setTimeout(tick, interval))
      }
      timers.push(window.setTimeout(tick, 1400))
    }
    return () => {
      io.disconnect()
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [write, heal, interval, o.seed])

  return (
    <div ref={ref} className={className}>
      <ShardMatrix {...o} />
    </div>
  )
}
