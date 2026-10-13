import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
      <Sidebar />
      <main id="main" className="min-w-0">
        {children}
      </main>
    </div>
  )
}
