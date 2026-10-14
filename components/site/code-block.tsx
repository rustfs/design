import type { ReactNode } from "react"
import { guessLang, highlight, type CodeLang } from "@/lib/highlight"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

/**
 * Code is always set on Ink, in both themes, and highlighted at build time with the
 * syntax tokens. `lang` is optional: it is inferred from a file-like title, then from the code.
 */
export async function CodeBlock({ title, code, lang, className, maxHeight = 520 }: { title?: ReactNode; code: string; lang?: CodeLang; className?: string; maxHeight?: number }) {
  const language = lang ?? guessLang(title, code)
  const html = await highlight(code, language)
  return (
    <div className={cn("relative min-w-0 border border-neutral-800 bg-syntax-background text-syntax-foreground", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 py-2 pr-2 pl-3.5 font-mono text-xs text-neutral-400">
        <span className="min-w-0 truncate">{title}</span>
        <span className="flex shrink-0 items-center gap-3">
          {language !== "text" && <span className="hidden font-mono text-[10px] tracking-[0.08em] text-neutral-500 uppercase sm:inline">{language}</span>}
          <CopyButton text={code} variant="dark" />
        </span>
      </div>
      <div className="code-hl overflow-auto" style={{ maxHeight }} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
