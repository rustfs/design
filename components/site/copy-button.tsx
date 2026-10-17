"use client"

import { toast } from "sonner"
import { Icon } from "@/components/brand/icon"
import { cn } from "@/lib/utils"
import { useT } from "./locale-provider"

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const previousFocus = document.activeElement as HTMLElement | null
    const host = previousFocus?.closest('[role="dialog"], [role="alertdialog"]') ?? document.body
    const ta = document.createElement("textarea")
    ta.value = text
    ta.style.position = "fixed"
    ta.style.opacity = "0"
    host.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand("copy")
    } catch {}
    ta.remove()
    previousFocus?.focus({ preventScroll: true })
    return ok
  }
}

export function CopyButton({ text, label, className, variant = "light" }: { text: string; label?: string; className?: string; variant?: "light" | "dark" }) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await copyText(text)
        if (ok) toast.success(t("已复制", "Copied"))
        else toast.error(t("浏览器拦截了复制，请手动选择文本", "The browser blocked copying. Select the text instead."))
      }}
      className={cn(
        "inline-flex h-7 min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 border px-2 text-xs leading-none font-medium transition-colors sm:min-h-7 sm:min-w-0 pointer-coarse:min-h-11 pointer-coarse:min-w-11",
        variant === "dark" ? "border-neutral-700 text-neutral-200 hover:bg-neutral-850" : "border-strong bg-background text-foreground hover:bg-surface",
        className,
      )}
    >
      <Icon name="copy" className="size-3.5" />
      {label ?? t("复制", "Copy")}
    </button>
  )
}
