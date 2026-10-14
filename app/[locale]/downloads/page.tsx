import type { Metadata } from "next"
import { Icon } from "@/components/brand/icon"
import { AppIcon, BrandSymbol, Wordmark } from "@/components/brand/logo"
import { Note, Page, PageFooter, PageHeader, Prose, Section } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "资源下载" : "Downloads" }
}

type Asset = { name: string; zh: string; en: string; bg: string; preview: React.ReactNode; files: { label: string; href: string }[] }

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  const logos: Asset[] = [
    { name: "Wordmark · Signal", zh: "浅色背景", en: "Light backgrounds", bg: "bg-white", preview: <Wordmark className="h-auto w-[70%] text-blue-500" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-wordmark.svg" }, { label: "PNG", href: "/brand/png/rustfs-wordmark.png" }] },
    { name: "Wordmark · White", zh: "Ink 与 Signal 背景", en: "Ink and Signal backgrounds", bg: "bg-neutral-950", preview: <Wordmark className="h-auto w-[70%] text-white" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-wordmark-white.svg" }, { label: "PNG", href: "/brand/png/rustfs-wordmark-white.png" }] },
    { name: "Wordmark · Ink", zh: "单色印刷", en: "One-colour print", bg: "bg-neutral-50", preview: <Wordmark className="h-auto w-[70%] text-neutral-950" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-wordmark-ink.svg" }, { label: "PNG", href: "/brand/png/rustfs-wordmark-ink.png" }] },
    { name: "Symbol · Signal", zh: "流向 S 符号", en: "Flow S symbol", bg: "bg-white", preview: <BrandSymbol className="size-24 text-blue-500" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-symbol.svg" }, { label: "PNG", href: "/brand/png/rustfs-symbol.png" }] },
    { name: "Symbol · White", zh: "深色背景", en: "Dark backgrounds", bg: "bg-blue-500", preview: <BrandSymbol className="size-24 text-white" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-symbol-white.svg" }, { label: "PNG", href: "/brand/png/rustfs-symbol-white.png" }] },
    { name: "Symbol · Ink", zh: "单色", en: "One colour", bg: "bg-neutral-50", preview: <BrandSymbol className="size-24 text-neutral-950" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-symbol-ink.svg" }, { label: "PNG", href: "/brand/png/rustfs-symbol-ink.png" }] },
    { name: "App icon · Signal", zh: "应用图标母版", en: "App icon master", bg: "bg-surface", preview: <AppIcon className="size-28" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-app-icon.svg" }, { label: "PNG 1024", href: "/brand/png/rustfs-app-icon-1024.png" }] },
    { name: "App icon · Ink", zh: "深色应用图标", en: "Dark app icon", bg: "bg-surface", preview: <AppIcon className="size-28" bg="#0B0E14" />, files: [{ label: "SVG", href: "/brand/logo/rustfs-app-icon-ink.svg" }, { label: "PNG 1024", href: "/brand/png/rustfs-app-icon-ink-1024.png" }] },
    { name: "Favicon", zh: "网站图标", en: "Website icons", bg: "bg-surface", preview: <div className="flex items-end gap-3">{[16, 32, 48].map((s) => <span key={s} style={{ width: s, height: s }}><AppIcon className="size-full" /></span>)}</div>, files: [{ label: "SVG", href: "/brand/logo/favicon.svg" }, { label: "ICO", href: "/favicon.ico" }, { label: "180", href: "/apple-touch-icon.png" }, { label: "192", href: "/brand/png/favicon-192.png" }, { label: "512", href: "/brand/png/favicon-512.png" }] },
  ]

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/downloads/"
        label="Resources · Downloads"
        title={t("资源下载", "Downloads")}
        subtitle={t("Downloads", "资源下载")}
        lede={t("官方文件。使用前请阅读使用条款。", "Official files. Read the terms of use first.")}
        meta={[
          { k: t("格式", "Formats"), v: "SVG · PNG · ICO · CSS · JSON" },
          { k: t("版本", "Version"), v: "1.0 · 2026-10-14" },
        ]}
      />

      <Section id="logo" tag="Logo" title={t("标志与图标", "Logo and icons")} lede={<p>{t("优先使用 SVG。", "Prefer SVG.")}</p>}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((a) => (
            <figure key={a.name} className="m-0 grid content-start bg-background">
              <div className={cn("grid aspect-[16/9] place-items-center", a.bg)}>{a.preview}</div>
              <figcaption className="grid gap-3 border-t border-border p-4">
                <div className="grid gap-0.5">
                  <b className="text-sm font-semibold">{a.name}</b>
                  <span className="text-xs text-muted-foreground">{t(a.zh, a.en)}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {a.files.map((f) => (
                    <a key={f.href} href={f.href} download className="inline-flex h-7 items-center gap-1.5 border border-strong px-2.5 font-mono text-[11px] transition-colors hover:border-foreground hover:bg-surface">
                      <Icon name="download" className="size-3.5" />
                      {f.label}
                    </a>
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="code" tag="Code & agents" title={t("设计令牌与 agent 资源", "Tokens and agent resources")}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/tokens/tokens.json", "tokens.json", t("DTCG 格式的设计令牌", "Design tokens in DTCG format")],
            ["/tokens/tailwind.css", "tailwind.css", t("Tailwind v4 主题", "Tailwind v4 theme")],
            ["/tokens/tokens.css", "tokens.css", t("CSS 变量", "CSS variables")],
            ["/DESIGN.md", "DESIGN.md", t("面向 agent 的设计规范", "Design spec for agents")],
            ["/downloads/rustfs-brand.skill", "rustfs-brand.skill", t("Claude Skill 安装包", "Claude skill package")],
            ["/downloads/rustfs-brand-skill.zip", "rustfs-brand-skill.zip", t("Skill 的 zip 版本", "The skill as a zip")],
          ].map(([href, name, note]) => (
            <a key={href} href={href} download className="group grid content-start gap-2 bg-background p-5 transition-colors hover:bg-surface">
              <span className="flex items-center justify-between font-mono text-sm">
                {name}
                <Icon name="download" className="size-4 text-faint transition-colors group-hover:text-brand" />
              </span>
              <span className="text-sm text-subtle">{note}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section id="fonts" tag="Fonts" title={t("字体", "Fonts")} lede={<p>{t("均可免费商用。", "All free for commercial use.")}</p>}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Archivo", "fonts.google.com/specimen/Archivo", "https://fonts.google.com/specimen/Archivo", "SIL OFL 1.1"],
            ["Geist", "fonts.google.com/specimen/Geist", "https://fonts.google.com/specimen/Geist", "SIL OFL 1.1"],
            ["Geist Mono", "fonts.google.com/specimen/Geist+Mono", "https://fonts.google.com/specimen/Geist+Mono", "SIL OFL 1.1"],
            ["Source Han Sans SC", "github.com/adobe-fonts/source-han-sans", "https://github.com/adobe-fonts/source-han-sans", "SIL OFL 1.1"],
          ].map(([name, label, url, lic]) => (
            <a key={name} href={url} target="_blank" rel="noreferrer" className="group grid content-start gap-2 bg-background p-5 transition-colors hover:bg-surface">
              <span className="flex items-center justify-between text-base font-semibold">
                {name}
                <Icon name="external" className="size-4 text-faint transition-colors group-hover:text-brand" />
              </span>
              <span className="truncate font-mono text-[11px] text-muted-foreground">{label}</span>
              <span className="font-mono text-[11px] text-faint">{lic}</span>
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{t("HarmonyOS Sans SC 请从华为开发者联盟获取。", "Get HarmonyOS Sans SC from HUAWEI Developers.")}</p>
      </Section>

      <Section id="terms" tag="Terms of use" title={t("使用条款", "Terms of use")}>
        <Prose>
          <ul>
            <li>{t("可用于指代 RustFS 项目及产品。", "May be used to refer to RustFS and its products.")}</li>
            <li>{t("未经书面授权，不得暗示认可或合作。", "Never imply endorsement or partnership without written permission.")}</li>
            <li>{t("不得修改标志或将其用于其他标识。", "Never modify the logo or use it in other marks.")}</li>
            <li>{t("Apache 2.0 许可不含商标使用权。", "The Apache 2.0 licence grants no trademark rights.")}</li>
          </ul>
        </Prose>
        <Note>{t("其他授权请通过 rustfs.com 联系。", "For other uses, contact RustFS via rustfs.com.")}</Note>
      </Section>

      <PageFooter slug="downloads" />
    </Page>
  )
}
