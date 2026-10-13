"use client"

import { useState, type ReactNode } from "react"
import { Icon } from "@/components/brand/icon"
import { useT } from "@/components/site/locale-provider"
import { cn } from "@/lib/utils"

/** Wraps the frame grid and switches the no-export safe-area guides on every 16:9 frame. */
export function SafeAreas({ children }: { children: ReactNode }) {
  const t = useT()
  const [on, setOn] = useState(false)
  return (
    <div className="group/safe grid gap-6" data-safe={on ? "on" : "off"}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-border py-3">
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs leading-normal text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <i className="block h-0 w-5 border-t-2 border-dashed border-faint" aria-hidden="true" />
            {t("动作安全区 93%", "Action safe 93%")}
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="block h-0 w-5 border-t-2 border-dashed border-parity" aria-hidden="true" />
            {t("标题安全区 90%", "Title safe 90%")}
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="block size-2.5 bg-parity/25 shadow-[inset_0_0_0_1px_var(--parity)]" aria-hidden="true" />
            {t("平台界面遮挡区", "Platform UI zones")}
          </span>
          <span>{t("参考线不会导出", "Guides are never exported")}</span>
        </div>
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
          className={cn("inline-flex h-7 items-center gap-1.5 border border-strong bg-background px-2.5 text-xs leading-none font-medium transition-colors hover:bg-surface", on && "border-foreground bg-foreground text-background hover:bg-foreground")}
        >
          <Icon name={on ? "check" : "plus"} className="size-3.5" />
          {t("显示安全区", "Show safe areas")}
        </button>
      </div>
      {children}
    </div>
  )
}
