import type { CSSProperties, ReactNode } from "react"
import { Wordmark } from "@/components/brand/logo"
import type { Locale } from "@/lib/i18n"
import { LOGO_PATHS } from "@/lib/logo-paths"
import { cn } from "@/lib/utils"

/** Wordmark top left, one mono label top right. */
export function Head({ label, logo = "ab-logo" }: { label: ReactNode; logo?: string }) {
  return (
    <div className="ab-row">
      <Wordmark className={logo} />
      <span className="ab-label u-text-2.75">{label}</span>
    </div>
  )
}

/** A heading whose Chinese and English lines use their own display settings. */
export function H({ zh, en, className, zhClass, enClass }: { zh: ReactNode; en: ReactNode; className?: string; zhClass?: string; enClass?: string }) {
  return (
    <h3 className={cn("m-0", className)}>
      <span data-l="zh" className={cn("ab-zh block", zhClass)}>
        {zh}
      </span>
      <span data-l="en" className={cn("ab-head block", enClass)}>
        {en}
      </span>
    </h3>
  )
}

/** Fill-in placeholder: replace before publishing. */
export function Ph({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("underline decoration-ab-muted decoration-dashed decoration-[0.06em] underline-offset-[0.2em]", className)}>{children}</span>
}

/** Mono status tag. */
export function Tag({ children, accent, className }: { children: ReactNode; accent?: boolean; className?: string }) {
  return (
    <em className={cn("inline-flex items-center u-gap-1 border border-ab-line u-px-1.25 u-py-0.75 font-mono u-text-2.25 leading-none font-medium tracking-[0.08em] text-ab-muted uppercase not-italic", className)}>
      {accent && <i className="block u-size-1.5 bg-ab-parity" />}
      {children}
    </em>
  )
}

/** Preview-only guide drawn over an artboard. Removed on export (`no-export`); line and label keep a constant on-screen size. */
export function Guide({ className, style, label, round, labelClass }: { className?: string; style?: CSSProperties; label?: ReactNode; round?: boolean; labelClass?: string }) {
  return (
    <div className={cn("no-export pointer-events-none absolute z-10", className)} style={style} aria-hidden="true">
      <div className={cn("absolute inset-0 border-dashed border-oxide-500", round && "rounded-full")} style={{ borderWidth: "calc(1.5px / var(--s, 1))" }} />
      {label && (
        <span
          className={cn("absolute bg-neutral-950/85 font-mono leading-none tracking-[0.04em] whitespace-nowrap text-oxide-400", labelClass ?? "top-0 left-0")}
          style={{ fontSize: "calc(10.5px / var(--s, 1))", padding: "calc(4px / var(--s, 1)) calc(6px / var(--s, 1))" }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

/** The avatar as a plain SVG: Flow S symbol on Signal Blue. `box` is the symbol box as a share of the side. */
export const AVATAR_BOX = 0.58
export function AvatarImg({ size, round, bg = "#0062FF", fg = "#FFFFFF", className }: { size: number; round?: boolean; bg?: string; fg?: string; className?: string }) {
  const s = (AVATAR_BOX * 100) / 64
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RustFS" className={cn("block shrink-0", round && "rounded-full", className)}>
      <rect width="100" height="100" fill={bg} />
      <path fill={fg} transform={`translate(50 50) scale(${s.toFixed(4)}) translate(-331.6 -30.3)`} d={LOGO_PATHS.s2} />
    </svg>
  )
}

/** A static, scaled copy of an artboard composition (feed-size previews). */
export function Mini({ w, h, width, theme, lang, label, children, className }: { w: number; h: number; width: number; theme: "ink" | "paper" | "white" | "signal"; lang: Locale; label?: ReactNode; children: ReactNode; className?: string }) {
  const s = width / w
  return (
    <figure className={cn("m-0 grid shrink-0 content-start gap-2", className)} style={{ width }}>
      <div className="relative overflow-hidden outline outline-1 -outline-offset-1 outline-border" style={{ width, height: Math.round(h * s) }} aria-hidden="true">
        <div className={`ab t-${theme} [&_.no-export]:hidden`} data-lang={lang} style={{ "--w": `${w}px`, "--h": `${h}px`, "--s": s } as CSSProperties}>
          {children}
        </div>
      </div>
      {label && <figcaption className="font-mono text-[11px] leading-snug text-muted-foreground">{label}</figcaption>}
    </figure>
  )
}
