"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Stripe } from "@/components/brand/stripe"
import { Wordmark } from "@/components/brand/logo"
import { Icon } from "@/components/brand/icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NAV, SITE } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { useLocale, useT } from "./locale-provider"

function useRoute() {
  const pathname = usePathname() || "/"
  const parts = pathname.split("/").filter(Boolean)
  const slug = parts.slice(1).join("/")
  return { slug }
}

const ICON_BTN = "grid size-8 shrink-0 place-items-center text-muted-foreground transition-colors duration-(--duration-fast) ease-standard hover:bg-surface-2 hover:text-foreground data-[state=open]:bg-surface-2 data-[state=open]:text-foreground"
const MENU = "w-40 border border-border shadow-overlay ring-0"

/** Theme menu: the trigger shows the current mode. */
function ThemeMenu() {
  const { theme, setTheme } = useTheme()
  const t = useT()
  const [mounted, setMounted] = useState(false)
  // next-themes only knows the stored theme after hydration
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  const current = (mounted ? theme : "system") ?? "system"
  const items = [
    { id: "system", icon: "monitor" as const, label: t("跟随系统", "System") },
    { id: "light", icon: "sun" as const, label: t("浅色", "Light") },
    { id: "dark", icon: "moon" as const, label: t("深色", "Dark") },
  ]
  const active = items.find((i) => i.id === current) ?? items[0]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={ICON_BTN} aria-label={t("主题", "Theme")} title={t("主题", "Theme")}>
        <Icon name={active.icon} className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={MENU}>
        <DropdownMenuRadioGroup value={current} onValueChange={setTheme}>
          {items.map((i) => (
            <DropdownMenuRadioItem key={i.id} value={i.id}>
              <Icon name={i.icon} className="size-4" />
              {i.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Language menu: switches to the same page in the chosen language. */
function LangMenu() {
  const locale = useLocale()
  const t = useT()
  const router = useRouter()
  const { slug } = useRoute()
  const go = (l: string) => {
    if (l === locale) return
    try {
      localStorage.setItem("rfs-lang", l)
    } catch {}
    router.push(slug ? `/${l}/${slug}/` : `/${l}/`)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={ICON_BTN} aria-label={t("语言", "Language")} title={t("语言", "Language")}>
        <Icon name="globe" className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={MENU}>
        <DropdownMenuRadioGroup value={locale} onValueChange={go}>
          <DropdownMenuRadioItem value="en" lang="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="zh" lang="zh-CN">中文</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Controls() {
  return (
    <div className="flex items-center gap-0.5">
      <LangMenu />
      <ThemeMenu />
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

function SideContent({ onNavigate, showControls = true }: { onNavigate?: () => void; showControls?: boolean }) {
  const locale = useLocale()
  return (
    <>
      <div className="grid gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}/`} onClick={onNavigate} className="text-foreground" aria-label="RustFS Design System">
            <Wordmark className="h-5 text-brand" />
          </Link>
          {showControls && <Controls />}
        </div>
        <span className="flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase">
          <b className="font-medium text-foreground">Design System</b>
          <Stripe className="text-[7px]" />
          <span>v{SITE.version}</span>
        </span>
      </div>
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto grid gap-3 border-t border-border pt-4">
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
        <div className="flex items-center gap-1.5">
          <Controls />
          <button type="button" onClick={() => setOpen(true)} aria-label={t("打开目录", "Open contents")} aria-expanded={open} className={cn(ICON_BTN, "ml-1 border border-border")}>
            <Icon name="menu" className="size-4" />
          </button>
        </div>
      </header>
      <aside className="sticky top-0 hidden h-screen flex-col gap-6 overflow-y-auto border-r border-border bg-background pt-7 pr-5 pb-5 pl-6 [scrollbar-width:thin] lg:flex">
        <SideContent />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col gap-7 overflow-y-auto bg-background px-5 pt-[calc(env(safe-area-inset-top,0px)+20px)] pb-[calc(env(safe-area-inset-bottom,0px)+20px)] lg:hidden" role="dialog" aria-modal="true" aria-label={t("目录", "Contents")}>
          <button type="button" onClick={() => setOpen(false)} aria-label={t("关闭目录", "Close contents")} className="absolute top-[calc(env(safe-area-inset-top,0px)+16px)] right-4 grid size-9 place-items-center border border-border">
            <Icon name="close" className="size-[18px]" />
          </button>
          <SideContent onNavigate={() => setOpen(false)} showControls={false} />
        </div>
      )}
    </>
  )
}
