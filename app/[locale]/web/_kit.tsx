import type { ReactNode } from "react"
import { CodeBlock } from "@/components/site/code-block"
import { cn } from "@/lib/utils"

/** One component: live specimen on top, code and rules underneath. */
export function Specimen({ id, n, title, aside, children, code, codeTitle, rules, previewClassName }: { id: string; n: string; title: ReactNode; aside?: ReactNode; children: ReactNode; code: string; codeTitle: ReactNode; rules: ReactNode[]; previewClassName?: string }) {
  return (
    <article id={id} className="grid min-w-0 scroll-mt-6 gap-4">
      <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-foreground pt-4">
        <h3 className="flex items-baseline gap-3 font-display text-[clamp(22px,2.2vw,28px)] leading-[1.15] font-[750] tracking-[-0.01em] [font-stretch:112%]">
          <span className="font-mono text-xs font-medium tracking-normal text-brand [font-stretch:100%]">{n}</span>
          {title}
        </h3>
        {aside && <span className="font-mono text-xs text-muted-foreground">{aside}</span>}
      </header>
      <div className={cn("grid min-w-0 grid-cols-[minmax(0,1fr)] border border-border bg-background", previewClassName)}>{children}</div>
      <Rules items={rules} className="gap-x-10 py-1 md:grid-cols-2" />
      <CodeBlock title={codeTitle} code={code} maxHeight={420} />
    </article>
  )
}

export function Rules({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("m-0 grid list-none gap-2.5 p-0 text-sm leading-[1.65] text-subtle [&_b]:font-semibold [&_b]:text-foreground [&_code]:text-[0.86em]", className)}>
      {items.map((r, i) => (
        <li key={i} className="grid grid-cols-[auto_1fr] gap-3">
          <i className="mt-[0.62em] size-1.5 bg-foreground" aria-hidden="true" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  )
}

/** A labelled row inside a specimen. */
export function Row({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className="grid min-w-0 gap-x-6 gap-y-3 border-b border-border p-[clamp(16px,2.4vw,28px)] last:border-0 md:grid-cols-[112px_minmax(0,1fr)] md:items-center">
      <span className="font-mono text-[11px] leading-tight font-medium tracking-[0.08em] text-muted-foreground uppercase">{label}</span>
      <div className={cn("flex min-w-0 flex-wrap items-center gap-3", className)}>{children}</div>
    </div>
  )
}

/** A specimen with a caption underneath, used for state matrices. */
export function Cell({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid justify-items-start gap-2.5", className)}>
      {children}
      <span className="font-mono text-[11px] leading-none text-muted-foreground">{label}</span>
    </div>
  )
}

/** Sample-data label, required wherever figures are illustrative. */
export function Sample({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 font-mono text-[11px] leading-none tracking-[0.06em] text-muted-foreground uppercase", className)}><i className="size-1.5 border border-current" aria-hidden="true" />{children}</span>
}
