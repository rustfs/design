"use client"

import { useEffect } from "react"
import { Icon } from "@/components/brand/icon"
import { useT } from "@/components/site/locale-provider"

let fontCSS: string | null = null

/** Render an artboard to PNG at native size (2× unless the board is very large). */
export async function exportArtboard(node: HTMLElement, { w, h, name }: { w: number; h: number; name: string }) {
  const { toPng, getFontEmbedCSS } = await import("html-to-image")
  const ratio = w * h > 4_000_000 ? 1 : 2
  if (fontCSS === null) {
    try {
      fontCSS = await getFontEmbedCSS(node)
    } catch {
      fontCSS = ""
    }
  }
  const opts = {
    width: w,
    height: h,
    pixelRatio: ratio,
    cacheBust: true,
    fontEmbedCSS: fontCSS || undefined,
    filter: (n: HTMLElement) => !(n.classList && n.classList.contains("no-export")),
    style: { transform: "none", left: "0", top: "0", position: "relative" },
  }
  let url: string
  try {
    url = await toPng(node, opts)
  } catch {
    url = await toPng(node, { ...opts, skipFonts: true, fontEmbedCSS: undefined })
  }
  return { url, name: `${name}-${w}x${h}@${ratio}x.png` }
}

export function ExportPreview({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const t = useT()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-[100] grid grid-rows-[auto_1fr] gap-4 bg-neutral-1000/90 px-4 pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-[calc(env(safe-area-inset-bottom,0px)+16px)] text-white" role="dialog" aria-modal="true" aria-label={t("导出预览", "Export preview")} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs leading-normal text-neutral-300">
        <span>
          {name}
          <br />
          {t("若点击下载没有反应，请在图片上右键「存储图片」。", "If Download does nothing, right-click the image and save it.")}
        </span>
        <span className="flex gap-2">
          <a href={url} download={name} className="inline-flex h-8 items-center gap-1.5 border border-blue-500 bg-blue-500 px-3 text-xs font-medium text-white">
            <Icon name="download" className="size-3.5" />
            {t("下载", "Download")}
          </a>
          <button type="button" autoFocus onClick={onClose} className="inline-flex h-8 items-center gap-1.5 border border-white/30 px-3 text-xs font-medium text-white hover:bg-white/10">
            <Icon name="close" className="size-3.5" />
            {t("关闭", "Close")}
          </button>
        </span>
      </div>
      <div className="grid min-h-0 place-items-center overflow-auto" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img src={url} alt={name} className="max-h-full max-w-full bg-[repeating-conic-gradient(#1E232B_0_25%,#13171E_0_50%)] bg-[length:16px_16px] object-contain" />
      </div>
    </div>
  )
}
