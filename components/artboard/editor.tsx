"use client"

import { useEffect, useRef, useState } from "react"
import { AlertDialog } from "radix-ui"
import { Icon } from "@/components/brand/icon"
import { Modal } from "@/components/site/modal"
import { useT } from "@/components/site/locale-provider"
import type { TextField } from "./draft"

export function TemplateEditor({ title, source, fields, w, h, onChange, onReset, onClose, status }: { title: string; source: HTMLElement; fields: TextField[]; w: number; h: number; onChange: (index: number, value: string) => void; onReset: () => boolean; onClose: () => void; status: string }) {
  const t = useT()
  const [revision, setRevision] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [overflow, setOverflow] = useState(false)
  const visible = fields.map((field, index) => ({ ...field, index })).filter((field) => field.node.parentElement?.getClientRects().length)


  return (
    <Modal title={t("编辑文字", "Edit text")} onClose={onClose} className="max-h-[96dvh] max-w-6xl gap-0 overflow-hidden p-0">
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground" role="status">{status}</p>
        </div>
        <button type="button" onClick={onClose} className="inline-flex h-11 shrink-0 items-center gap-2 bg-foreground px-4 text-sm font-medium text-background"><Icon name="check" className="size-4" />{t("完成编辑", "Done")}</button>
      </header>
      <div className="grid min-h-0 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 bg-surface p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="font-mono text-xs text-muted-foreground">{w} × {h}</span>
            <div className="flex border border-strong" role="group" aria-label={t("预览缩放", "Preview zoom")}>
              {[1, 1.5, 2].map((value) => <button key={value} type="button" aria-pressed={zoom === value} onClick={() => setZoom(value)} className="h-11 px-3 text-xs aria-pressed:bg-foreground aria-pressed:text-background">{value === 1 ? t("适应", "Fit") : `${value * 100}%`}</button>)}
            </div>
          </div>
          <div className="max-h-[48dvh] overflow-auto lg:max-h-[65dvh]" tabIndex={0} aria-label={t("画板预览", "Artboard preview")}>
            <ArtboardPreview source={source} fields={fields} revision={revision} zoom={zoom} w={w} h={h} onOverflow={setOverflow} />
          </div>
          {overflow && <p className="mt-4 text-sm text-warning" role="status">{t("文字可能超出版面，请缩短后检查预览。", "Text may overflow. Shorten it and check the preview.")}</p>}
        </div>
        <div className="grid content-start gap-4 border-t border-border p-4 sm:p-6 lg:max-h-[75dvh] lg:overflow-y-auto lg:border-t-0 lg:border-l">
          {visible.map(({ node, original, index }) => (
            <label key={index} className="grid gap-2 text-xs text-muted-foreground">
              <span className="truncate" title={original}>{original}</span>
              <textarea value={node.data} onChange={(event) => { onChange(index, event.target.value); setRevision((value) => value + 1) }} rows={node.data.length > 60 ? 3 : node.data.length > 32 ? 2 : 1} className="min-h-11 w-full resize-y border border-strong bg-background p-3 text-sm leading-relaxed text-foreground" />
            </label>
          ))}
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild><button type="button" className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 border border-strong px-4 text-sm hover:bg-surface"><Icon name="replay" className="size-4" />{t("恢复当前语言默认文字", "Reset this language")}</button></AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="fixed inset-0 z-[70] bg-neutral-1000/70" />
              <AlertDialog.Content className="fixed top-1/2 left-1/2 z-[80] grid w-[calc(100%-32px)] max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 border border-border bg-background p-6 shadow-overlay">
                <AlertDialog.Title className="text-lg font-semibold">{t("恢复默认文字？", "Reset this text?")}</AlertDialog.Title>
                <AlertDialog.Description className="text-sm text-muted-foreground">{t("只清除当前模板、当前语言的草稿。", "Only the draft for this template and language will be cleared.")}</AlertDialog.Description>
                <div className="mt-2 flex justify-end gap-2">
                  <AlertDialog.Cancel className="min-h-11 border border-strong px-4 text-sm hover:bg-surface">{t("取消", "Cancel")}</AlertDialog.Cancel>
                  <AlertDialog.Action onClick={() => { if (onReset()) setRevision((value) => value + 1) }} className="min-h-11 bg-foreground px-4 text-sm font-medium text-background">{t("恢复默认", "Reset text")}</AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </div>
    </Modal>
  )
}

/** Mount inside the portal so the host exists before the preview is cloned. */
function ArtboardPreview({ source, fields, revision, zoom, w, h, onOverflow }: { source: HTMLElement; fields: TextField[]; revision: number; zoom: number; w: number; h: number; onOverflow: (value: boolean) => void }) {
  const preview = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = preview.current
    if (!host) return
    const clone = source.cloneNode(true) as HTMLElement
    clone.removeAttribute("id")
    clone.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"))
    clone.setAttribute("aria-hidden", "true")
    clone.inert = true
    host.replaceChildren(clone)
    const resize = () => clone.style.setProperty("--s", String(host.clientWidth / w))
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    // Text can extend beyond either its layout box or the artboard itself.
    const bounds = source.getBoundingClientRect()
    const clipped = fields.some(({ node }) => {
      const parent = node.parentElement
      if (!parent?.getClientRects().length) return false
      const range = document.createRange()
      range.selectNodeContents(node)
      const rect = range.getBoundingClientRect()
      return rect.right > bounds.right + 2 || rect.bottom > bounds.bottom + 2 || (parent.clientWidth > 0 && parent.scrollWidth > parent.clientWidth + 2)
    })
    // Sync the warning with the measured DOM preview.
    onOverflow(clipped)
    return () => { observer.disconnect(); host.replaceChildren() }
  }, [source, fields, revision, w, onOverflow])

  return <div ref={preview} className="ab-fit editor-preview" style={{ width: `${zoom * 100}%`, aspectRatio: `${w} / ${h}` }} />
}
