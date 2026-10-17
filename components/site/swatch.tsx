"use client"

import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { copyText } from "./copy-button"
import { useT } from "./locale-provider"

/** A colour chip that copies its value on click. */
export function CopyChip({ value, children, className, style, label }: { value: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; label?: string }) {
  const t = useT()
  return (
    <button
      type="button"
      title={t(`复制 ${value}`, `Copy ${value}`)}
      aria-label={label ?? t(`复制 ${value}`, `Copy ${value}`)}
      onClick={async () => {
        const ok = await copyText(value)
        if (ok) toast.success(t(`已复制 ${value}`, `Copied ${value}`))
        else toast.error(t("浏览器拦截了复制，请手动选择色值", "The browser blocked copying. Select the colour value instead."))
      }}
      className={cn("group relative text-left transition-[transform,outline-color] duration-(--duration-fast) ease-standard focus-visible:z-10 active:translate-y-px", className)}
      style={style}
    >
      {children}
    </button>
  )
}
