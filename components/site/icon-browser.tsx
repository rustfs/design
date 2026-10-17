"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Icon } from "@/components/brand/icon"
import { ICON_GROUPS, ICON_LABELS, iconSVG, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { copyText } from "./copy-button"
import { useLocale, useT } from "./locale-provider"
import { Modal } from "./modal"

export function IconBrowser() {
  const t = useT()
  const locale = useLocale()
  const [q, setQ] = useState("")
  const [size, setSize] = useState<16 | 20 | 24 | 32>(24)
  const [selected, setSelected] = useState<IconName | null>(null)
  const groups = useMemo(() => {
    const s = q.trim().toLowerCase()
    return ICON_GROUPS.map((g) => ({ ...g, names: g.names.filter((n) => s.split(/\s+/).every((term) => `${n} ${n.replaceAll("-", " ")} ${ICON_LABELS[n]} ${g.zh} ${g.en}`.toLowerCase().includes(term))) })).filter((g) => g.names.length)
  }, [q])
  const total = groups.reduce((a, g) => a + g.names.length, 0)
  const copy = async (n: IconName, format: "svg" | "jsx") => {
    const snippet = format === "svg" ? iconSVG(n) : `<Icon name="${n}" />`
    if (await copyText(snippet)) toast.success(t(`已复制 ${format.toUpperCase()}`, `Copied ${format.toUpperCase()}`))
    else toast.error(t("复制失败，请重试或下载 SVG。", "Could not copy. Try again or download the SVG."))
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
            placeholder={t("搜索名称或用途，例如 存储桶", "Search by name or purpose, e.g. bucket")}
            className="h-11 w-full border border-strong bg-background px-3 text-sm placeholder:text-muted-foreground"
          />
        </label>
        <div className="flex border border-strong" role="group" aria-label={t("尺寸", "Size")}>
          {([16, 20, 24, 32] as const).map((s, i) => (
            <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={size === s} className={cn("h-11 px-3 font-mono text-xs text-muted-foreground hover:text-foreground", i > 0 && "border-l border-strong", size === s && "bg-foreground text-background hover:text-background")}>
              {s}px
            </button>
          ))}
        </div>
        <span role="status" className="font-mono text-xs text-muted-foreground">{total} {t("个图标", "icons")}</span>
      </div>
      {!total && <div className="grid justify-items-start gap-3 border border-border bg-surface px-6 py-10"><p className="text-lg font-semibold">{t("没有找到匹配的图标", "No matching icons")}</p><p className="text-sm text-muted-foreground">{t("试试用途或英文名称，例如「存储桶」或 bucket。", "Try another name or purpose, such as bucket.")}</p><button type="button" onClick={() => setQ("")} className="min-h-11 border border-strong bg-background px-4 text-sm font-medium hover:border-foreground">{t("清空搜索", "Clear search")}</button></div>}
      {groups.map((g) => (
        <div key={g.id} className="grid gap-3">
          <h3 className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{locale === "zh" ? `${g.zh} · ${g.en}` : g.en}</h3>
          <div className="grid grid-cols-3 border-t border-l border-border sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
            {g.names.map((n) => (
              <button key={n} type="button" onClick={() => setSelected(n)} aria-label={t(`获取 ${n} 图标`, `Get ${n} icon`)} className="group grid aspect-square min-w-0 grid-rows-[1fr_auto] place-items-center border-r border-b border-border bg-background p-3 transition-colors duration-(--duration-fast) ease-standard hover:bg-surface focus-visible:z-10">
                <span className="block" style={{ width: size, height: size }}>
                  <Icon name={n} className="size-full text-foreground transition-colors group-hover:text-brand" title={n} />
                </span>
                <span className="w-full truncate text-center font-mono text-[10px] text-muted-foreground">{n}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      {selected && <Modal title={selected} onClose={() => setSelected(null)} className="max-w-md">
        <header className="flex items-center justify-between gap-4"><h2 className="font-mono text-lg font-medium">{selected}</h2><button type="button" onClick={() => setSelected(null)} aria-label={t("关闭", "Close")} className="grid size-11 place-items-center border border-border hover:bg-surface"><Icon name="close" /></button></header>
        <div className="grid min-h-48 place-items-center bg-surface"><Icon name={selected} className="size-20 text-brand" /></div>
        <p className="text-sm text-muted-foreground">{t("24 × 24 · 1.5px 线宽 · 透明背景", "24 × 24 · 1.5px stroke · transparent background")}</p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => copy(selected, "svg")} className="min-h-11 border border-strong text-sm hover:bg-surface">{t("复制 SVG", "Copy SVG")}</button>
          <button type="button" onClick={() => copy(selected, "jsx")} className="min-h-11 border border-strong text-sm hover:bg-surface">{t("复制 JSX", "Copy JSX")}</button>
          <a href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(iconSVG(selected))}`} download={`rustfs-${selected}.svg`} className="col-span-2 flex min-h-11 items-center justify-center gap-2 bg-primary text-sm font-medium text-primary-foreground hover:bg-primary-hover"><Icon name="download" className="size-4" />{t("下载 SVG", "Download SVG")}</a>
        </div>
      </Modal>}
    </div>
  )
}
