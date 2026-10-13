import Link from "next/link"
import type { ReactNode } from "react"
import { Icon } from "@/components/brand/icon"
import type { IconName } from "@/lib/icons"
import { getLocale, t } from "@/lib/i18n"
import { NAV } from "@/lib/nav"
import { cn } from "@/lib/utils"

/** Page column: max 1240px, fluid gutter, large rhythm between sections. */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page grid gap-[clamp(72px,9vw,128px)] pt-[clamp(32px,5vw,64px)] pb-30 *:min-w-0", className)}>{children}</div>
}

/** Mono eyebrow with the page's key path. */
export function Eyebrow({ path, children, className }: { path?: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs leading-tight tracking-[0.06em] text-muted-foreground uppercase", className)}>
      {path && <span className="tracking-normal text-brand normal-case">{path}</span>}
      {children}
    </div>
  )
}

export function PageHeader({ path, label, title, subtitle, lede, meta }: { path: string; label: ReactNode; title: ReactNode; subtitle?: ReactNode; lede?: ReactNode; meta?: { k: ReactNode; v: ReactNode }[] }) {
  return (
    <header className="grid gap-5 pt-2">
      <Eyebrow path={path}>{label}</Eyebrow>
      <h1 className="font-display text-[clamp(44px,7.4vw,104px)] leading-[0.96] font-extrabold tracking-[-0.02em] [font-stretch:125%]">
        {title}
        {subtitle && <span className="mt-[0.3em] block text-[0.42em] font-bold tracking-[-0.01em] text-faint">{subtitle}</span>}
      </h1>
      {lede && <div className="max-w-[40em] text-[clamp(17px,1.6vw,20px)] leading-[1.7] text-subtle">{lede}</div>}
      {meta && (
        <div className="flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
          {meta.map((m, i) => (
            <span key={i}>
              {m.k} <b className="font-medium text-foreground">{m.v}</b>
            </span>
          ))}
        </div>
      )}
    </header>
  )
}

/** Section: heading on the left, lede on the right, specimens full width below. */
export function Section({ id, tag, title, lede, children, className }: { id?: string; tag: ReactNode; title: ReactNode; lede?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("grid scroll-mt-6 gap-9", className)}>
      <div className="grid gap-x-12 gap-y-4 border-t border-foreground pt-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <h2 className="grid gap-2.5 font-display text-[clamp(28px,3.2vw,40px)] leading-[1.08] font-[750] tracking-[-0.01em] [font-stretch:112%]">
          <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-faint uppercase [font-stretch:100%]">{tag}</span>
          {title}
        </h2>
        {lede && <div className="grid gap-3 text-[17px] leading-[1.7] text-subtle">{lede}</div>}
      </div>
      {children}
    </section>
  )
}

export function Sub({ title, aside, children, className }: { title: ReactNode; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-5", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3 text-lg font-semibold tracking-[-0.005em]">
        <h3>{title}</h3>
        {aside && <small className="font-mono text-xs font-normal text-muted-foreground">{aside}</small>}
      </div>
      {children}
    </div>
  )
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid max-w-[68ch] gap-[0.9em] text-subtle [&_li]:pl-1 [&_ol]:grid [&_ol]:list-decimal [&_ol]:gap-1.5 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:grid [&_ul]:list-[square] [&_ul]:gap-1.5 [&_ul]:pl-5", className)}>{children}</div>
}

type Surface = "default" | "surface" | "stage" | "ink" | "blue" | "white" | "paper" | "oxide" | "checker"
const SURFACE: Record<Surface, string> = {
  default: "bg-background",
  surface: "bg-surface",
  stage: "bg-stage text-stage-foreground",
  ink: "bg-neutral-950 text-white",
  blue: "bg-blue-500 text-white",
  white: "bg-white text-neutral-950",
  paper: "bg-neutral-50 text-neutral-950",
  oxide: "bg-oxide-500 text-neutral-950",
  checker: "bg-checker",
}

/** Specimen frame with an optional caption bar. */
export function Spec({ children, caption, aside, on = "default", className, bodyClassName }: { children: ReactNode; caption?: ReactNode; aside?: ReactNode; on?: Surface; className?: string; bodyClassName?: string }) {
  return (
    <figure className={cn("m-0 grid min-w-0 border border-border bg-background", className)}>
      <div className={cn("relative grid min-h-40 place-items-center overflow-hidden p-[clamp(20px,3vw,40px)]", SURFACE[on], bodyClassName)}>{children}</div>
      {(caption || aside) && (
        <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-border px-3.5 py-2.5 font-mono text-xs leading-normal text-muted-foreground [&_b]:font-medium [&_b]:text-foreground">
          <span>{caption}</span>
          {aside && <span>{aside}</span>}
        </figcaption>
      )}
    </figure>
  )
}

export function DoDont({ kind, children, caption, on = "default", bodyClassName }: { kind: "do" | "dont"; children: ReactNode; caption: ReactNode; on?: Surface; bodyClassName?: string }) {
  return (
    <figure className="m-0 grid min-w-0 border border-border">
      <div className={cn("relative grid min-h-44 place-items-center overflow-hidden p-[clamp(20px,3vw,36px)]", SURFACE[on], kind === "dont" && "strike-through", bodyClassName)}>{children}</div>
      <figcaption className="grid grid-cols-[auto_1fr] items-start gap-2.5 border-t border-border px-3.5 py-3 text-sm leading-normal text-subtle">
        <span className={cn("mt-1.5 size-2.5", kind === "do" ? "bg-green-500" : "bg-red-500")} aria-hidden="true" />
        <span>
          <b className="mr-1 font-semibold text-foreground">{kind === "do" ? t("正确", "Do") : t("错误", "Don't")}</b>
          {caption}
        </span>
      </figcaption>
    </figure>
  )
}

export function Note({ children, tone = "brand", className }: { children: ReactNode; tone?: "brand" | "parity"; className?: string }) {
  return (
    <div className={cn("grid grid-cols-[auto_1fr] gap-3.5 border border-border bg-surface px-4.5 py-4 text-[15px] leading-[1.65] text-subtle [&_b]:text-foreground", className)}>
      <span className={cn("mt-2 size-2.5", tone === "brand" ? "bg-brand" : "bg-parity")} aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export function Table({ head, rows, className, mono = [] }: { head: ReactNode[]; rows: ReactNode[][]; className?: string; mono?: number[] }) {
  return (
    <div className={cn("overflow-x-auto border border-border", className)}>
      <table className="w-full min-w-[600px] border-collapse text-sm leading-normal">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} className="border-b border-border bg-surface px-4 py-3 text-left align-top font-mono text-[11px] font-medium tracking-[0.06em] whitespace-nowrap text-muted-foreground uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {r.map((c, j) => (
                <td key={j} className={cn("px-4 py-3 align-top text-subtle", j === 0 && "text-foreground", mono.includes(j) && "font-mono text-[13px] whitespace-nowrap md:whitespace-normal")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function CardLink({ href, k, title, children, icon = "arrow-up-right", meta }: { href: string; k: string; title: ReactNode; children?: ReactNode; icon?: IconName; meta?: ReactNode }) {
  return (
    <Link href={href} className="group relative grid min-h-46 content-start gap-3.5 border border-border p-5.5 text-foreground transition-colors duration-(--duration-base) ease-standard hover:border-foreground hover:bg-surface">
      <span className="font-mono text-xs leading-none text-brand">{k}</span>
      <h3 className="text-xl font-semibold tracking-[-0.01em]">{title}</h3>
      {children && <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>}
      {meta && <span className="mt-auto font-mono text-xs text-muted-foreground">{meta}</span>}
      <Icon name={icon} className="absolute top-4.5 right-4.5 size-4.5 text-faint transition-transform duration-(--duration-base) ease-emphasized group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
    </Link>
  )
}

/** Previous / next links in nav order. */
export function PageFooter({ slug }: { slug: string }) {
  const locale = getLocale()
  const flat = NAV.flatMap((g) => g.items)
  const i = flat.findIndex((x) => x.slug === slug)
  const prev = i > 0 ? flat[i - 1] : null
  const next = i >= 0 && i < flat.length - 1 ? flat[i + 1] : null
  const name = (x: (typeof flat)[number]) => (locale === "zh" ? x.zh : x.en)
  const to = (x: (typeof flat)[number]) => (x.slug ? `/${locale}/${x.slug}/` : `/${locale}/`)
  return (
    <footer className="grid gap-6 border-t border-border pt-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={to(prev)} className="group grid gap-1 border border-border p-4 transition-colors hover:border-foreground">
            <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">← {t("上一页", "Previous")}</span>
            <span className="font-semibold">{name(prev)}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={to(next)} className="group grid gap-1 border border-border p-4 text-right transition-colors hover:border-foreground">
            <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("下一页", "Next")} →</span>
            <span className="font-semibold">{name(next)}</span>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-4 font-mono text-xs leading-relaxed text-muted-foreground">
        <span>RustFS Design System v1.0 · 2026-10-14</span>
        <span>{t("RustFS 名称与标志为 RustFS 的注册商标或商标。", "RustFS and the RustFS logo are trademarks of RustFS.")}</span>
      </div>
    </footer>
  )
}
