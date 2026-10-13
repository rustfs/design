"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Icon } from "@/components/brand/icon"
import { ICON_GROUPS, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { copyText } from "./copy-button"
import { useLocale, useT } from "./locale-provider"

export function IconBrowser() {
  const t = useT()
  const locale = useLocale()
  const [q, setQ] = useState("")
  const [size, setSize] = useState<16 | 20 | 24 | 32>(24)
  const groups = useMemo(() => {
    const s = q.trim().toLowerCase()
    return ICON_GROUPS.map((g) => ({ ...g, names: g.names.filter((n) => !s || n.includes(s)) })).filter((g) => g.names.length)
  }, [q])
  const total = groups.reduce((a, g) => a + g.names.length, 0)
  const copy = async (n: IconName) => {
    const snippet = `<Icon name="${n}" />`
    if (await copyText(snippet)) toast.success(t(`已复制 ${snippet}`, `Copied ${snippet}`))
  }
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-0 flex-1 basis-60">
          <span className="sr-only">{t("搜索图标", "Search icons")}</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("搜索图标名称，例如 bucket", "Search by name, e.g. bucket")}
            className="h-10 w-full border border-strong bg-background px-3 font-mono text-sm outline-none placeholder:text-faint focus-visible:border-ring"
          />
        </label>
        <div className="flex border border-strong" role="group" aria-label={t("尺寸", "Size")}>
          {([16, 20, 24, 32] as const).map((s, i) => (
            <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={size === s} className={cn("h-10 px-3 font-mono text-xs text-muted-foreground hover:text-foreground", i > 0 && "border-l border-strong", size === s && "bg-foreground text-background hover:text-background")}>
              {s}px
            </button>
          ))}
        </div>
        <span className="font-mono text-xs text-muted-foreground">{total} {t("个图标", "icons")}</span>
      </div>
      {groups.map((g) => (
        <div key={g.id} className="grid gap-3">
          <h3 className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{locale === "zh" ? `${g.zh} · ${g.en}` : g.en}</h3>
          <div className="grid grid-cols-3 border-t border-l border-border sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
            {g.names.map((n) => (
              <button key={n} type="button" onClick={() => copy(n)} title={t(`复制 <Icon name="${n}" />`, `Copy <Icon name="${n}" />`)} className="group grid aspect-square min-w-0 grid-rows-[1fr_auto] place-items-center border-r border-b border-border bg-background p-3 transition-colors duration-(--duration-fast) ease-standard hover:bg-surface focus-visible:z-10">
                <span className="block" style={{ width: size, height: size }}>
                  <Icon name={n} className="size-full text-foreground transition-colors group-hover:text-brand" title={n} />
                </span>
                <span className="w-full truncate text-center font-mono text-[10px] text-muted-foreground">{n}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
