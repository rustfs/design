import type { ReactNode } from "react"

/** Bilingual copy inside an artboard. Both languages render; the artboard's language toggle shows one. */
export function L({ zh, en }: { zh: ReactNode; en: ReactNode }) {
  return (
    <>
      <span data-l="zh">{zh}</span>
      <span data-l="en">{en}</span>
    </>
  )
}
