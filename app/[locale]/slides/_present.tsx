"use client"

import { present } from "@/components/artboard/present"
import { Icon } from "@/components/brand/icon"
import { useT } from "@/components/site/locale-provider"

const pad = (n: number) => String(n).padStart(2, "0")

/** Presents every artboard in the group, from the first slide or from the one picked in the strip. */
export function PresentDeck({ group = "deck", count }: { group?: string; count: number }) {
  const t = useT()
  const run = (start = 0) => {
    const boards = Array.from(document.querySelectorAll<HTMLElement>(`[data-present-group="${group}"] .ab`))
    present(boards, start)
  }

  return (
    <div className="grid gap-x-10 gap-y-6 border border-foreground p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-brand uppercase">Deck · {count}</span>
          <p className="text-[clamp(20px,2.2vw,26px)] leading-tight font-semibold tracking-[-0.01em]">{t(`全屏演示全部 ${count} 页`, `Present all ${count} slides full screen`)}</p>
          <p className="max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
            {t("← → 或空格翻页 · Esc 退出", "← → or Space to move · Esc to exit")}
          </p>
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label={t("从指定页开始演示", "Start from a slide")}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => run(i)}
              aria-label={t(`从第 ${i + 1} 页开始演示`, `Present from slide ${i + 1}`)}
              className="grid h-8 w-9 place-items-center border border-strong font-mono text-[11px] leading-none text-muted-foreground transition-colors duration-(--duration-fast) ease-standard hover:border-brand hover:bg-brand hover:text-white"
            >
              {pad(i + 1)}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => run(0)}
        className="group inline-flex h-13 items-center justify-center gap-3 bg-brand px-6 text-[15px] leading-none font-semibold text-white transition-colors duration-(--duration-fast) ease-standard hover:bg-blue-600 sm:justify-self-start lg:justify-self-end"
      >
        <Icon name="play" className="size-4.5 transition-transform duration-(--duration-base) ease-emphasized group-hover:translate-x-0.5" />
        {t("演示全部", "Present the deck")}
      </button>
    </div>
  )
}
