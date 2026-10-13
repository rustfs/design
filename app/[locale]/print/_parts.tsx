import type { CSSProperties, ReactNode } from "react"
import { Template, type TemplateProps } from "@/components/artboard/template"
import { cn } from "@/lib/utils"

/** Template with a non-printing hairline at the trim, so white and Ink boards stay legible on any page theme. */
export function PrintTemplate({ children, ...props }: TemplateProps) {
  return (
    <Template {...props}>
      {children}
      <i className="no-export pointer-events-none absolute inset-0 z-30 border-[length:calc(1px/var(--s,1))] border-[rgba(127,127,127,0.32)]" aria-hidden="true" />
    </Template>
  )
}

/**
 * Physical scale for a print artboard: `--mm` is one millimetre in artboard pixels and
 * `--m` (the frame inset used by `ab-frame`) becomes a margin measured in millimetres.
 */
export function phys(pxPerMm: number, marginMm: number): CSSProperties {
  return { "--mm": `${pxPerMm}px`, "--m": `${+(pxPerMm * marginMm).toFixed(2)}px` } as CSSProperties
}

/** Non-printing guide label. `no-export` keeps it out of the exported PNG. */
export function GuideTag({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={cn("no-export pointer-events-none absolute z-20 bg-neutral-950/85 px-[0.7em] py-[0.5em] font-mono leading-none tracking-[0.04em] whitespace-nowrap text-oxide-500", className)} style={style}>
      {children}
    </span>
  )
}

/** Non-printing horizontal guide line at `y` pixels from the top. */
export function GuideLine({ y, className }: { y: number; className?: string }) {
  return <div className={cn("no-export pointer-events-none absolute inset-x-0 z-20 border-t border-dashed border-oxide-500", className)} style={{ top: y }} />
}

/** Non-printing zone: a tinted band between two y positions. `hatch` marks an area to keep clear. */
export function GuideZone({ top, height, hatch = false, className }: { top: number; height: number; hatch?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "no-export pointer-events-none absolute inset-x-0 z-10 border-y border-dashed border-oxide-500",
        hatch ? "bg-[repeating-linear-gradient(135deg,rgba(255,94,20,0.32)_0_2px,transparent_2px_16px)]" : "",
        className,
      )}
      style={{ top, height }}
    />
  )
}

/** Non-printing rectangle (windows, slots, print areas). */
export function GuideBox({ x, y, w, h, className }: { x: number; y: number; w: number; h: number; className?: string }) {
  return <div className={cn("no-export pointer-events-none absolute z-20 border border-dashed border-oxide-500", className)} style={{ left: x, top: y, width: w, height: h }} />
}

/** Heavy wayfinding arrow on the icon grid: square caps, mitred joins. */
export function SignArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.75} strokeLinecap="square" strokeLinejoin="miter" className={className} aria-hidden="true">
      <path d="M1.375 12H17.5M12 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  )
}

/** Reference process values for one brand colour, with a bar per channel. */
export function InkCard({ name, sub, swatch, value, cmyk, note }: { name: ReactNode; sub: ReactNode; swatch: string; value: ReactNode; cmyk: [number, number, number, number] | null; note: ReactNode }) {
  return (
    <div className="grid min-w-0 grid-rows-[auto_1fr] border border-border">
      <div className="relative aspect-[16/9] min-h-24 shadow-[inset_0_0_0_1px_var(--border)]" style={{ background: swatch }}>
        {cmyk === null && <span className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_9px,rgba(11,14,20,0.07)_9px_10px)]" aria-hidden="true" />}
      </div>
      <div className="grid content-start gap-3 border-t border-border p-4">
        <div className="grid gap-0.5">
          <b className="text-[15px] leading-snug font-semibold">{name}</b>
          <span className="font-mono text-xs leading-snug text-muted-foreground">{sub}</span>
        </div>
        <div className="font-mono text-[13px] leading-none font-medium text-foreground">{value}</div>
        {cmyk && (
          <div className="grid gap-1.5" aria-hidden="true">
            {(["C", "M", "Y", "K"] as const).map((ch, i) => (
              <div key={ch} className="grid grid-cols-[14px_1fr_26px] items-center gap-2 font-mono text-[11px] leading-none text-muted-foreground">
                <span>{ch}</span>
                <span className="relative h-1.5 bg-surface-2">
                  <i className="absolute inset-y-0 left-0 bg-foreground" style={{ width: `${cmyk[i]}%` }} />
                </span>
                <span className="text-right tabular-nums text-foreground">{cmyk[i]}</span>
              </div>
            ))}
          </div>
        )}
        <p className="text-[13px] leading-relaxed text-subtle">{note}</p>
      </div>
    </div>
  )
}

/** Large figure + label used for the key production numbers. */
export function Figure({ n, unit, label, children }: { n: ReactNode; unit?: ReactNode; label: ReactNode; children: ReactNode }) {
  return (
    <div className="grid content-start gap-1.5 border-t border-border pt-3">
      <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-muted-foreground uppercase">{label}</span>
      <b className="font-display text-[clamp(30px,3.4vw,40px)] leading-none font-extrabold tracking-[-0.02em] num [font-stretch:125%]">
        {n}
        {unit && <small className="ml-1 text-[0.5em] font-bold tracking-normal text-faint">{unit}</small>}
      </b>
      <span className="text-[13px] leading-relaxed text-subtle">{children}</span>
    </div>
  )
}
