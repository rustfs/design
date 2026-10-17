"use client"

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { toast } from "sonner"
import { Icon } from "@/components/brand/icon"
import { useLocale, useT } from "@/components/site/locale-provider"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { exportArtboard, ExportPreview } from "./export"
import { present } from "./present"
import { collectTextFields, hasPendingDraft, readDraft, removeDraft, restoreTextFields, saveDraft, type DraftValues, type TextField } from "./draft"
import { TemplateEditor } from "./editor"

export type SurfaceTheme = "ink" | "paper" | "white" | "signal"

const SWATCH: Record<SurfaceTheme, string> = { ink: "#0B0E14", paper: "#F4F6F9", white: "#FFFFFF", signal: "#0062FF" }

/* ---------- filtering ---------- */
const FilterContext = createContext<string>("all")

export function TemplateGrid({ filters, children, className }: { filters?: { id: string; label: ReactNode }[]; children: ReactNode; className?: string }) {
  const [active, setActive] = useState("all")
  return (
    <FilterContext.Provider value={active}>
      {filters && filters.length > 0 && (
        <div className="sticky top-[calc(env(safe-area-inset-top,0px)+118px)] z-20 -mb-4 flex flex-wrap gap-1.5 border-b border-border bg-background py-3 lg:top-12" role="group">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={cn("min-h-11 border border-strong px-2.5 text-xs font-medium transition-colors hover:bg-surface", active === f.id && "border-foreground bg-foreground text-background hover:bg-foreground")}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className={cn("grid grid-cols-12 items-start gap-x-6 gap-y-10", className)}>{children}</div>
    </FilterContext.Provider>
  )
}

const SPAN: Record<number, string> = {
  12: "col-span-12",
  8: "col-span-12 md:col-span-8",
  7: "col-span-12 md:col-span-7",
  6: "col-span-12 md:col-span-6",
  5: "col-span-12 md:col-span-5",
  4: "col-span-12 sm:col-span-6 md:col-span-4",
  3: "col-span-12 sm:col-span-6 md:col-span-3",
}

export type TemplateProps = {
  /** Display name shown above the artboard */
  title: ReactNode
  /** Size and channel line, e.g. "1200 × 630 · OG / X" */
  spec?: ReactNode
  w: number
  h: number
  /** Surface modes the template supports; the first is the default */
  themes?: SurfaceTheme[]
  /** Languages the template copy exists in; defaults to both */
  langs?: Locale[]
  /** File name stem for export */
  file: string
  /** Filter tags */
  tags?: string[]
  /** Grid columns out of 12 */
  span?: 12 | 8 | 7 | 6 | 5 | 4 | 3
  note?: ReactNode
  /** Group name: every template sharing it is shown in presenter mode */
  presentGroup?: string
  /** Extra classes on the artboard root (template-specific styling hooks) */
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export function Template({ title, spec, w, h, themes = ["ink"], langs = ["zh", "en"], file, tags = [], span = 12, note, presentGroup, className, style, children }: TemplateProps) {
  const locale = useLocale()
  const t = useT()
  const active = useContext(FilterContext)
  const fitRef = useRef<HTMLDivElement>(null)
  const abRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<SurfaceTheme>(themes[0])
  const [lang, setLang] = useState<Locale>(langs.includes(locale) ? locale : langs[0])
  const [editor, setEditor] = useState<{ source: HTMLElement; fields: TextField[] } | null>(null)
  const [preview, setPreview] = useState<{ url: string; name: string; width: number; height: number } | null>(null)
  const [exporting, setExporting] = useState(false)
  const fields = useRef<TextField[]>([])
  const values = useRef<DraftValues>({})
  const [saveState, setSaveState] = useState<"default" | "saved" | "error">("default")
  const [unsaved, setUnsaved] = useState(false)
  const draftKey = `rfs-draft-v1:${file}:${lang}`
  const saveLabel = saveState === "error" ? t("无法保存到本机，请导出后再离开", "Local storage is unavailable. Export before leaving.") : saveState === "saved" ? t("草稿已保存到本机", "Draft saved on this device") : t("修改会自动保存到本机", "Changes save on this device")

  useEffect(() => {
    const fit = fitRef.current
    const ab = abRef.current
    if (!fit || !ab) return
    const apply = () => ab.style.setProperty("--s", (fit.clientWidth / w).toFixed(5))
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(fit)
    return () => ro.disconnect()
  }, [w])

  useEffect(() => {
    const board = abRef.current
    if (!board) return
    if (!fields.current.length) fields.current = collectTextFields(board)
    let state: "default" | "saved" | "error" = "default"
    try {
      values.current = restoreTextFields(fields.current, readDraft(draftKey))
      if (Object.keys(values.current).length) state = "saved"
      if (hasPendingDraft(draftKey)) state = "error"
    } catch {
      values.current = restoreTextFields(fields.current, null)
      state = "error"
    }
    // Restore external localStorage state after hydration and language changes.
    setSaveState(state)
    setUnsaved(hasPendingDraft(draftKey))
  }, [draftKey])

  const changeText = (index: number, value: string) => {
    const field = fields.current[index]
    field.node.data = value
    if (value === field.original) delete values.current[index]
    else values.current[index] = { original: field.original, value }
    const saved = saveDraft(draftKey, values.current)
    setSaveState(saved ? "saved" : "error")
    setUnsaved(!saved)
  }

  const resetText = () => {
    try {
      removeDraft(draftKey)
      values.current = restoreTextFields(fields.current, null)
      setSaveState("default")
      setUnsaved(false)
      return true
    } catch {
      toast.error(t("无法清除本机草稿，请检查浏览器存储设置。", "Could not clear the draft. Check browser storage settings."))
      return false
    }
  }

  const doExport = async () => {
    if (!abRef.current || exporting) return
    setExporting(true)
    const id = toast.loading(t("正在渲染 PNG…", "Rendering PNG…"))
    // Live artboards (the video sting) listen for this and settle on their final frame first.
    abRef.current.dispatchEvent(new CustomEvent("rfs:before-export"))
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    try {
      const res = await exportArtboard(abRef.current, { w, h, name: `${file}-${lang}` })
      setPreview(res)
      toast.dismiss(id)
    } catch (e) {
      toast.error(t("导出失败：", "Export failed: ") + (e instanceof Error ? e.message : String(e)), { id })
    } finally {
      setExporting(false)
    }
  }

  const doPresent = () => {
    if (!presentGroup || !abRef.current) return
    const all = Array.from(document.querySelectorAll<HTMLElement>(`[data-present-group="${presentGroup}"] .ab`))
    present(all, all.indexOf(abRef.current))
  }

  const hidden = active !== "all" && !tags.includes(active)

  return (
    <figure hidden={hidden} className={cn("@container m-0 grid min-w-0 gap-3", SPAN[span])} data-present-group={presentGroup} data-tags={tags.join(" ")}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="grid min-w-0 gap-1">
          <div className="text-[15px] leading-snug font-semibold">{title}</div>
          <div className="font-mono text-xs leading-snug text-muted-foreground">{spec ?? `${w} × ${h}`}</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {themes.length > 1 && (
            <Seg label={t("底色", "Surface")}>
              {themes.map((th) => (
                <SegButton key={th} pressed={theme === th} onClick={() => setTheme(th)} title={th}>
                  <i className="block size-2.5 shadow-[inset_0_0_0_1px_rgba(127,127,127,0.45)]" style={{ background: SWATCH[th] }} />
                  <span className="hidden @[560px]:inline">{th.toUpperCase()}</span>
                </SegButton>
              ))}
            </Seg>
          )}
          {langs.length > 1 && (
            <Seg label={t("语言", "Language")}>
              <SegButton pressed={lang === "en"} onClick={() => setLang("en")}>EN</SegButton>
              <SegButton pressed={lang === "zh"} onClick={() => setLang("zh")}>中</SegButton>
            </Seg>
          )}
          <span className="inline-flex flex-wrap gap-1.5">
            <ToolButton onClick={() => { if (abRef.current) setEditor({ source: abRef.current, fields: fields.current }) }} pressed={!!editor} icon="edit" label={t("编辑文字", "Edit text")} />
            <ToolButton onClick={doExport} disabled={exporting} icon="download" label={exporting ? t("渲染中…", "Rendering…") : t("导出 PNG", "Export PNG")} />
            {presentGroup && <ToolButton onClick={doPresent} icon="play" label={t("演示", "Present")} />}
          </span>
        </div>
      </div>
      <div ref={fitRef} className="ab-fit" style={{ aspectRatio: `${w} / ${h}` }}>
        <div ref={abRef} className={cn("ab", `t-${theme}`, className)} data-w={w} data-h={h} data-file={file} data-lang={lang} style={{ "--w": `${w}px`, "--h": `${h}px`, ...style } as CSSProperties}>
          {children}
        </div>
      </div>
      {note && <figcaption className="max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground [&_b]:font-semibold [&_b]:text-subtle">{note}</figcaption>}
      {(saveState === "saved" || unsaved) && <p className="text-xs text-muted-foreground" role="status">{saveLabel}</p>}
      {editor && <TemplateEditor title={typeof title === "string" ? title : file} source={editor.source} fields={editor.fields} w={w} h={h} onChange={changeText} onReset={resetText} onClose={() => setEditor(null)} status={saveLabel} />}
      {preview && <ExportPreview {...preview} onClose={() => setPreview(null)} />}
    </figure>
  )
}

function Seg({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="inline-flex border border-strong" role="group" aria-label={label}>
      {children}
    </span>
  )
}

function SegButton({ pressed, onClick, title, children }: { pressed: boolean; onClick: () => void; title?: string; children: ReactNode }) {
  return (
    <button type="button" title={title} aria-label={title} aria-pressed={pressed} onClick={onClick} className={cn("inline-flex h-11 min-w-11 items-center justify-center gap-1.5 px-2 font-mono text-[11px] leading-none text-muted-foreground transition-colors not-first:border-l not-first:border-strong hover:text-foreground sm:h-9 pointer-coarse:min-h-11", pressed && "bg-surface-2 text-foreground")}>
      {children}
    </button>
  )
}

function ToolButton({ onClick, pressed, icon, label, disabled }: { onClick: () => void; pressed?: boolean; disabled?: boolean; icon: "edit" | "download" | "play"; label: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-pressed={pressed} aria-label={label} title={label} className={cn("inline-flex h-11 items-center gap-1.5 border border-strong bg-background px-2 text-xs leading-none font-medium transition-colors hover:bg-surface disabled:cursor-wait disabled:opacity-50 sm:h-9 pointer-coarse:min-h-11 @[440px]:px-2.5", pressed && "border-foreground bg-foreground text-background hover:bg-foreground")}>
      <Icon name={icon} className="size-3.5" />
      <span>{label}</span>
    </button>
  )
}
