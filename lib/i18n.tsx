import { cache, type ReactNode } from "react"

export const locales = ["zh", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// Request-scoped locale for server components. Every layout and page calls
// setLocale() with its route param before rendering children.
const store = cache(() => ({ locale: defaultLocale as Locale }))

export function setLocale(locale: Locale) {
  store().locale = locale
}

export function getLocale(): Locale {
  return store().locale
}

/** Pick the string for the current request locale. */
export function t<T>(zh: T, en: T): T {
  return getLocale() === "zh" ? zh : en
}

/** Inline bilingual text for server components: <T zh="标志" en="Logo" /> */
export function T({ zh, en }: { zh: ReactNode; en: ReactNode }) {
  return <>{getLocale() === "zh" ? zh : en}</>
}

export function href(locale: Locale, path = "") {
  const clean = path.replace(/^\/+|\/+$/g, "")
  return clean ? `/${locale}/${clean}/` : `/${locale}/`
}
