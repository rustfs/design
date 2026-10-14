import type { Metadata } from "next"
import { Archivo, Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import { Wordmark } from "@/components/brand/logo"
import { Stripe } from "@/components/brand/stripe"
import "./globals.css"

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" })
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  title: "404 · RustFS Design System",
  icons: { icon: "/brand/logo/favicon.svg" },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="bg-neutral-950 text-white">
        <main className="container-page grid min-h-screen content-between gap-16 py-10">
          <Link href="/" aria-label="RustFS Design System" className="w-fit">
            <Wordmark className="h-5 w-auto text-white" />
          </Link>
          <div className="grid gap-8">
            <span className="[--mx-data:#0062FF] [--mx-parity:#FF5E14]">
              <Stripe missing={[2]} className="text-[18px]" />
            </span>
            <h1 className="font-display text-[clamp(96px,18vw,240px)] leading-[0.82] font-extrabold tracking-[-0.04em] [font-stretch:125%]">404</h1>
            <div className="grid max-w-[44ch] gap-3">
              <code className="w-fit !bg-transparent !p-0 font-mono text-sm text-blue-400">NoSuchKey</code>
              <p className="text-lg leading-relaxed text-neutral-300">The specified key does not exist.</p>
              <p className="text-lg leading-relaxed text-neutral-300">请求的页面不存在。</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 font-mono text-xs" aria-label="Language">
            <Link href="/en/" className="border border-white/25 px-3 py-2 transition-colors hover:border-white">Back to the guidelines</Link>
            <Link href="/zh/" className="border border-white/25 px-3 py-2 transition-colors hover:border-white">返回中文首页</Link>
          </nav>
        </main>
      </body>
    </html>
  )
}
