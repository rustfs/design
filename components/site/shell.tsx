import type { ReactNode } from "react"
import { t } from "@/lib/i18n"
import { Sidebar } from "./sidebar"

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
      <a href="#main" className="fixed top-3 left-3 z-[100] -translate-y-24 bg-foreground px-4 py-3 text-sm font-medium text-background focus:translate-y-0">{t("跳到正文", "Skip to content")}</a>
      <Sidebar />
      <main id="main" tabIndex={-1} className="min-w-0">
        {children}
      </main>
    </div>
  )
}
