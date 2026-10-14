"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { toast } from "sonner"
import { Icon } from "@/components/brand/icon"
import { useLocale, useT } from "@/components/site/locale-provider"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { exportArtboard, ExportPreview } from "./export"
import { present } from "./present"

export type SurfaceTheme = "ink" | "paper" | "white" | "signal"

const SWATCH: Record<SurfaceTheme, string> = { ink: "#0B0E14", paper: "#F4F6F9", white: "#FFFFFF", signal: "#0062FF" }

/* ---------- filtering ---------- */
const FilterContext = createContext<string>("all")

export function TemplateGrid({ filters, children, className }: { filters?: { id: string; label: ReactNode }[]; children: ReactNode; className?: string }) {
  const [active, setActive] = useState("all")
  return (
    <FilterContext.Provider value={active}>
      {filters && filters.length > 0 && (
        <div className="sticky top-[calc(env(safe-area-inset-top,0px)+61px)] z-20 -mb-4 flex flex-wrap gap-1.5 border-b border-border bg-background py-3 lg:top-[env(safe-area-inset-top,0px)]" role="group">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={cn("h-7.5 border border-strong px-2.5 text-xs font-medium transition-colors hover:bg-surface", active === f.id && "border-foreground bg-foreground text-background hover:bg-foreground")}
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
  const [editing, setEditing] = useState(false)
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null)

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

  const setEditable = useCallback((on: boolean) => {
    const ab = abRef.current
    if (!ab) return
    ab.querySelectorAll<HTMLElement>("*").forEach((el) => {
      if (el.closest("svg")) return
      const hasText = Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
      if (!hasText) return
      if (on) {
        el.setAttribute("contenteditable", "true")
        el.setAttribute("spellcheck", "false")
      } else {
        el.removeAttribute("contenteditable")
        el.removeAttribute("spellcheck")
      }
    })
  }, [])

  const toggleEdit = () => {
    const on = !editing
    setEditing(on)
    setEditable(on)
    if (on) toast(t("点击画板里的文字直接修改", "Click any text on the artboard to edit it"))
  }

  const doExport = async () => {
    if (!abRef.current) return
    if (editing) {
      setEditing(false)
      setEditable(false)
    }
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
          <ToolButton onClick={toggleEdit} pressed={editing} icon="edit" label={t("编辑文字", "Edit text")} />
          <ToolButton onClick={doExport} icon="download" label={t("导出 PNG", "Export PNG")} />
          {presentGroup && <ToolButton onClick={doPresent} icon="play" label={t("演示", "Present")} />}
        </div>
      </div>
      <div ref={fitRef} className="ab-fit" data-editing={editing} style={{ aspectRatio: `${w} / ${h}` }}>
        <div ref={abRef} className={cn("ab", `t-${theme}`, className)} data-w={w} data-h={h} data-file={file} data-lang={lang} style={{ "--w": `${w}px`, "--h": `${h}px`, ...style } as CSSProperties}>
          {children}
        </div>
      </div>
      {note && <figcaption className="max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground [&_b]:font-semibold [&_b]:text-subtle">{note}</figcaption>}
      {preview && <ExportPreview url={preview.url} name={preview.name} onClose={() => setPreview(null)} />}
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
    <button type="button" title={title} aria-pressed={pressed} onClick={onClick} className={cn("inline-flex h-6.5 items-center gap-1.5 px-2 font-mono text-[11px] leading-none text-muted-foreground transition-colors not-first:border-l not-first:border-strong hover:text-foreground", pressed && "bg-surface-2 text-foreground")}>
      {children}
    </button>
  )
}

function ToolButton({ onClick, pressed, icon, label }: { onClick: () => void; pressed?: boolean; icon: "edit" | "download" | "play"; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={pressed} aria-label={label} title={label} className={cn("inline-flex h-7 items-center gap-1.5 border border-strong bg-background px-2 text-xs leading-none font-medium transition-colors hover:bg-surface @[440px]:px-2.5", pressed && "border-foreground bg-foreground text-background hover:bg-foreground")}>
      <Icon name={icon} className="size-3.5" />
      <span className="hidden @[440px]:inline">{label}</span>
    </button>
  )
}
