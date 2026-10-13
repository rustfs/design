import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "RustFS Design System",
  icons: { icon: "/brand/logo/favicon.svg" },
  robots: { index: true, follow: true },
}

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0B0E14", color: "#FFFFFF", fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}
