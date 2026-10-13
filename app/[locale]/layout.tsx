import type { Metadata, Viewport } from "next"
import { Archivo, Geist, Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { LocaleProvider } from "@/components/site/locale-provider"
import { Shell } from "@/components/site/shell"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { isLocale, locales, setLocale } from "@/lib/i18n"
import "../globals.css"

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" })
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const zh = locale === "zh"
  return {
    title: { default: "RustFS Design System", template: "%s · RustFS Design System" },
    description: zh
      ? "RustFS 品牌与视觉识别系统：标志、色彩、字体、图形、动效、文案，以及广告、封面、演示、网站、视频、社媒与印刷模板。"
      : "The RustFS brand and visual identity system: logo, color, type, graphics, motion and voice, with templates for ads, covers, slides, web, video, social and print.",
    icons: { icon: "/brand/logo/favicon.svg", apple: "/apple-touch-icon.png" },
    openGraph: { type: "website", siteName: "RustFS Design System", images: [{ url: "/og.png", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
    alternates: { languages: { "zh-CN": "/zh/", en: "/en/" } },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0E14" },
  ],
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setLocale(locale)
  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocaleProvider locale={locale}>
            <TooltipProvider>
              <Shell>{children}</Shell>
              <Toaster position="bottom-center" />
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
