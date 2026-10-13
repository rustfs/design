"use client"

import { createContext, useCallback, useContext } from "react"
import type { Locale } from "@/lib/i18n"

const LocaleContext = createContext<Locale>("en")

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

/** Client-side picker: const t = useT(); t("中文", "English") */
export function useT() {
  const locale = useLocale()
  return useCallback(<T,>(zh: T, en: T): T => (locale === "zh" ? zh : en), [locale])
}
