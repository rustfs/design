"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Stripe } from "@/components/brand/stripe"
import { Wordmark } from "@/components/brand/logo"
import { Icon } from "@/components/brand/icon"
import { NAV, SITE } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { useLocale, useT } from "./locale-provider"

function useRoute() {
  const pathname = usePathname() || "/"
  const parts = pathname.split("/").filter(Boolean)
  const slug = parts.slice(1).join("/")
  return { slug }
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // next-themes only knows the stored theme after hydration
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const current = mounted ? theme : undefined
  const opts = [
    { id: "system", label: "SYSTEM" },
    { id: "light", label: "LIGHT" },
    { id: "dark", label: "DARK" },
  ]
  return (
    <div className="grid grid-cols-3 border border-border" role="group" aria-label="Theme">
      {opts.map((o, i) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setTheme(o.id)}
          aria-pressed={current === o.id}
          className={cn(
            "py-2 font-mono text-[11px] leading-none tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground",
            i > 0 && "border-l border-border",
            current === o.id && "bg-foreground text-background hover:text-background",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function LangSwitch() {
  const locale = useLocale()
  const { slug } = useRoute()
  const to = (l: string) => (slug ? `/${l}/${slug}/` : `/${l}/`)
  return (
    <div className="grid grid-cols-2 border border-border" role="group" aria-label="Language">
      {[
        { id: "zh", label: "中文" },
        { id: "en", label: "English" },
      ].map((o, i) => (
        <Link
          key={o.id}
          href={to(o.id)}
          hrefLang={o.id === "zh" ? "zh-CN" : "en"}
          aria-current={locale === o.id ? "true" : undefined}
          onClick={() => {
            try {
              localStorage.setItem("rfs-lang", o.id)
            } catch {}
          }}
          className={cn(
            "py-2 text-center text-xs leading-none text-muted-foreground transition-colors hover:text-foreground",
            i > 0 && "border-l border-border",
            locale === o.id && "bg-foreground text-background hover:text-background",
          )}
        >
          {o.label}
        </Link>
      ))}
    </div>
  )
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale()
  const { slug } = useRoute()
  return (
    <nav className="grid gap-5" aria-label={locale === "zh" ? "目录" : "Contents"}>
      {NAV.map((g) => (
        <div key={g.en} className="grid gap-0.5">
          <div className="pb-2 font-mono text-[11px] leading-none tracking-[0.08em] text-faint uppercase">
            {locale === "zh" ? `${g.zh} ${g.en}` : g.en}
          </div>
          {g.items.map((it) => {
            const active = slug === it.slug
            return (
              <Link
                key={it.slug}
                href={it.slug ? `/${locale}/${it.slug}/` : `/${locale}/`}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group -ml-1 grid grid-cols-[10px_1fr_auto] items-center gap-2.5 py-[5px] pr-2 pl-1 text-sm leading-tight text-subtle transition-colors hover:bg-surface hover:text-foreground",
                  active && "font-semibold text-foreground",
                )}
              >
                <span className={cn("size-1.5 justify-self-center outline outline-1 -outline-offset-1 outline-strong transition-colors duration-(--duration-fast) [transition-timing-function:steps(2)] group-hover:bg-brand/50 group-hover:outline-brand", active && "bg-brand outline-brand group-hover:bg-brand")} />
                <span>{locale === "zh" ? it.zh : it.en}</span>
                <span className={cn("font-mono text-[11px] text-faint", active && "text-brand")}>{it.key}</span>
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function SideContent({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale()
  return (
    <>
      <Link href={`/${locale}/`} onClick={onNavigate} className="grid gap-2.5 text-foreground" aria-label="RustFS Design System">
        <Wordmark className="h-5 text-brand" />
        <span className="flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.08em] text-muted-foreground uppercase">
          <b className="font-medium text-foreground">Design System</b>
          <Stripe className="text-[7px]" />
          <span>v{SITE.version}</span>
        </span>
      </Link>
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto grid gap-3 border-t border-border pt-4">
        <LangSwitch />
        <ThemeSwitch />
        <p className="font-mono text-[11px] leading-relaxed text-faint">
          s3://rustfs-brand/ · {SITE.updated}
          <br />
          © 2026 RustFS
        </p>
      </div>
    </>
  )
}

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const locale = useLocale()
  const t = useT()
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])
  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-40 flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-3 lg:hidden">
        <Link href={`/${locale}/`} aria-label="RustFS Design System">
          <Wordmark className="h-4 text-brand" />
        </Link>
        <button type="button" onClick={() => setOpen(true)} aria-label={t("打开目录", "Open contents")} aria-expanded={open} className="grid size-9 place-items-center border border-border">
          <Icon name="menu" className="size-[18px]" />
        </button>
      </header>
      <aside className="sticky top-0 hidden h-screen flex-col gap-6 overflow-y-auto border-r border-border bg-background pt-7 pr-5 pb-5 pl-6 [scrollbar-width:thin] lg:flex">
        <SideContent />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col gap-7 overflow-y-auto bg-background px-5 pt-[calc(env(safe-area-inset-top,0px)+20px)] pb-[calc(env(safe-area-inset-bottom,0px)+20px)] lg:hidden" role="dialog" aria-modal="true" aria-label={t("目录", "Contents")}>
          <button type="button" onClick={() => setOpen(false)} aria-label={t("关闭目录", "Close contents")} className="absolute top-[calc(env(safe-area-inset-top,0px)+16px)] right-4 grid size-9 place-items-center border border-border">
            <Icon name="close" className="size-[18px]" />
          </button>
          <SideContent onNavigate={() => setOpen(false)} />
        </div>
      )}
    </>
  )
}
