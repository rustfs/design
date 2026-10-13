/** Fullscreen presenter for artboards (slides). Clones each board and scales it to the viewport. */
export function present(boards: HTMLElement[], start = 0) {
  if (!boards.length) return
  let i = Math.max(0, start)
  const pv = document.createElement("div")
  pv.setAttribute("role", "dialog")
  pv.setAttribute("aria-label", "Presentation")
  pv.style.cssText = "position:fixed;inset:0;z-index:100;background:#06070B;overflow:hidden;cursor:pointer"
  const ui = document.createElement("div")
  ui.style.cssText = "position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 14px);display:flex;justify-content:center;gap:8px;align-items:center;font:400 12px/1 var(--font-mono);color:#9AA0AC;opacity:.35;transition:opacity .24s"
  const btn = (label: string, fn: () => void) => {
    const b = document.createElement("button")
    b.type = "button"
    b.textContent = label
    b.style.cssText = "height:28px;padding:0 10px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font:500 12px/1 var(--font-sans);cursor:pointer"
    b.addEventListener("click", (e) => {
      e.stopPropagation()
      fn()
    })
    return b
  }
  const counter = document.createElement("span")
  ui.append(btn("←", () => go(-1)), counter, btn("→", () => go(1)), btn("Esc", () => close()))
  pv.append(ui)
  pv.addEventListener("mouseenter", () => (ui.style.opacity = "1"))
  pv.addEventListener("mouseleave", () => (ui.style.opacity = ".35"))
  document.body.append(pv)
  document.body.style.overflow = "hidden"

  const show = () => {
    pv.querySelectorAll(".ab").forEach((n) => n.remove())
    const src = boards[i]
    const c = src.cloneNode(true) as HTMLElement
    const w = Number(src.dataset.w)
    const h = Number(src.dataset.h)
    const s = Math.min(window.innerWidth / w, window.innerHeight / h)
    c.removeAttribute("contenteditable")
    c.style.left = "50%"
    c.style.top = "50%"
    c.style.transformOrigin = "50% 50%"
    c.style.transform = `translate(-50%, -50%) scale(${s})`
    pv.insertBefore(c, ui)
    counter.textContent = `${String(i + 1).padStart(2, "0")} / ${String(boards.length).padStart(2, "0")}`
  }
  const go = (d: number) => {
    i = Math.min(boards.length - 1, Math.max(0, i + d))
    show()
  }
  const onKey = (e: KeyboardEvent) => {
    if (["ArrowRight", "PageDown", " "].includes(e.key)) {
      e.preventDefault()
      go(1)
    } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
      e.preventDefault()
      go(-1)
    } else if (e.key === "Escape") close()
  }
  const close = () => {
    pv.remove()
    document.body.style.overflow = ""
    document.removeEventListener("keydown", onKey)
    window.removeEventListener("resize", show)
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  }
  pv.addEventListener("click", () => go(1))
  document.addEventListener("keydown", onKey)
  window.addEventListener("resize", show)
  pv.requestFullscreen?.().catch(() => {})
  show()
}
