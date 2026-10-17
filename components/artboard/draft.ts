export type TextField = { node: Text; original: string }
export type DraftValues = Record<string, { original: string; value: string }>

// Failed writes stay available across client-side navigation until they can be saved.
const pendingDrafts = new Map<string, string>()
const warnBeforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = "" }
function updateLeaveWarning() {
  if (pendingDrafts.size) window.addEventListener("beforeunload", warnBeforeUnload)
  else window.removeEventListener("beforeunload", warnBeforeUnload)
}

export function readDraft(key: string) {
  return pendingDrafts.get(key) ?? localStorage.getItem(key)
}

export function hasPendingDraft(key: string) {
  return pendingDrafts.has(key)
}

export function saveDraft(key: string, values: DraftValues) {
  const serialized = JSON.stringify(values)
  try {
    localStorage.setItem(key, serialized)
    pendingDrafts.delete(key)
  } catch {
    pendingDrafts.set(key, serialized)
  }
  updateLeaveWarning()
  return !pendingDrafts.has(key)
}

export function removeDraft(key: string) {
  localStorage.removeItem(key)
  pendingDrafts.delete(key)
  updateLeaveWarning()
}

/** Keep text nodes intact, including bilingual spans and styled inline text. */
export function collectTextFields(root: HTMLElement): TextField[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const fields: TextField[] = []
  let node: Node | null
  while ((node = walker.nextNode())) {
    if (!node.textContent || !/[\p{L}\p{N}]/u.test(node.textContent) || node.parentElement?.closest("svg, script, style, button, .no-export")) continue
    fields.push({ node: node as Text, original: node.textContent })
  }
  return fields
}

export function restoreTextFields(fields: TextField[], raw: string | null): DraftValues {
  const parsed: unknown = raw ? JSON.parse(raw) : {}
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid draft")
  const values: DraftValues = {}
  fields.forEach((field, index) => {
    const saved = (parsed as DraftValues)[index]
    const value = saved?.original === field.original && typeof saved.value === "string" ? saved.value : field.original
    field.node.data = value
    if (value !== field.original) values[index] = { original: field.original, value }
  })
  return values
}
