import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

/** Code is always set on Ink, in both themes. Pass `code` for copy; `children` may hold highlighted markup. */
export function CodeBlock({ title, code, children, className, maxHeight = 520 }: { title?: ReactNode; code: string; children?: ReactNode; className?: string; maxHeight?: number }) {
  return (
    <div className={cn("relative min-w-0 border border-neutral-800 bg-neutral-950 text-neutral-100", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 py-2 pr-2 pl-3.5 font-mono text-xs text-neutral-400">
        <span className="truncate">{title}</span>
        <CopyButton text={code} variant="dark" />
      </div>
      <pre className="m-0 overflow-auto p-4 font-mono text-[13px] leading-[1.65] [tab-size:2]" style={{ maxHeight }}>
        {children ?? code}
      </pre>
    </div>
  )
}
