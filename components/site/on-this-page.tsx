"use client"

import { useEffect, useRef, useState } from "react"
import { Icon } from "@/components/brand/icon"
import { useT } from "./locale-provider"

export type PageAnchor = { id: string; title: string }

export function OnThisPage({ items }: { items: PageAnchor[] }) {
  const t = useT()
  const details = useRef<HTMLDetailsElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState("")
  const matches = items.filter((item) => `${item.title} ${item.id}`.toLowerCase().includes(query.trim().toLowerCase()))

  useEffect(() => {
    const anchors = items.map(({ id }) => ({ id, element: document.getElementById(id) }))
    let frame = 0
    const update = () => {
      frame = 0
      const padding = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      let current = items[0]?.id ?? ""
      for (const anchor of anchors) {
        if (!anchor.element) continue
        const margin = parseFloat(window.getComputedStyle(anchor.element).scrollMarginTop) || 0
        if (anchor.element.getBoundingClientRect().top <= padding + margin + 1) current = anchor.id
      }
      setActive(current)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [items])

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (details.current?.open && !details.current.contains(event.target as Node)) details.current.open = false
    }
    document.addEventListener("pointerdown", close)
    return () => document.removeEventListener("pointerdown", close)
  }, [])

  return (
    <nav aria-label={t("本页内容", "On this page")} className="sticky top-[calc(env(safe-area-inset-top,0px)+69px)] z-30 -mt-6 -mb-6 bg-background lg:top-0">
      <details ref={details} className="group relative" onKeyDown={(event) => { if (event.key === "Escape" && details.current) { details.current.open = false; details.current.querySelector("summary")?.focus() } }}>
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 border-y border-border py-3 text-sm [&::-webkit-details-marker]:hidden">
          <Icon name="menu" className="size-4 text-brand" />
          <span className="shrink-0 font-medium">{t("本页内容", "On this page")}</span>
          <span className="min-w-0 flex-1 truncate text-muted-foreground">{items.find((item) => item.id === active)?.title}</span>
          <Icon name="chevron-down" className="size-4 transition-transform group-open:rotate-180" />
        </summary>
        <div className="absolute inset-x-0 top-full grid gap-3 border border-border bg-background p-4 shadow-overlay sm:max-w-lg">
          <label>
            <span className="sr-only">{t("查找章节或组件", "Find a section or component")}</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("查找章节或组件…", "Find a section or component…")} className="h-11 w-full border border-strong bg-background px-3 text-sm" />
          </label>
          <div className="grid max-h-[min(50dvh,360px)] overflow-y-auto overscroll-contain">
            {matches.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => { if (details.current) details.current.open = false; setQuery(""); setActive(item.id); document.getElementById(item.id)?.focus({ preventScroll: true }) }} className="flex min-h-11 items-center justify-between gap-4 px-3 text-sm hover:bg-surface aria-[current=location]:bg-surface aria-[current=location]:text-link"><span>{item.title}</span><Icon name="arrow-right" className="size-4 shrink-0" /></a>)}
            {!matches.length && <p className="px-3 py-4 text-sm text-muted-foreground">{t("没有匹配的章节，试试其他词。", "No matching sections. Try another term.")}</p>}
          </div>
        </div>
      </details>
    </nav>
  )
}
