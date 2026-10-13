/* Keyframes for the brand moves used by the Web & UI specimens.
   Colours fall back from the shard-matrix variables to the semantic tokens,
   so the same animation works on the page and inside artboards. */
const HEAL = `@keyframes rfs-heal {
  0% { background-color: var(--mx-data, var(--brand)); outline: 1px solid transparent; outline-offset: -1px; }
  25% { background-color: transparent; outline: 1px dashed var(--mx-data, var(--brand)); outline-offset: -1px; }
  50% { background-color: var(--mx-parity, var(--parity)); outline: 1px solid transparent; outline-offset: -1px; }
  62.5%, 100% { background-color: var(--mx-data, var(--brand)); outline: 1px solid transparent; outline-offset: -1px; }
}`

const SHARD = `@keyframes rfs-shard {
  0% { background-color: var(--surface-2); }
  50% { background-color: var(--strong); }
}`

export function MotionStyles() {
  return (
    <style href="rfs-web-ui-motion" precedence="medium">
      {`${HEAL}\n${SHARD}`}
    </style>
  )
}

export const HEAL_CSS = `/* 0–25% intact · 25–50% dropped out · 50–62.5% parity flash · rebuilt.
   --mx-* lets the same keyframes follow an artboard's surface. */
${HEAL}

<i className="size-2 bg-brand animate-[rfs-heal_2880ms_steps(1)_infinite]" />`

export const SKELETON_CSS = `${SHARD}

{cells.map((_, i) => (
  <i
    key={i}
    className="size-2 bg-surface-2 animate-[rfs-shard_1200ms_steps(1)_infinite]"
    style={{ animationDelay: \`\${(i % 24) * 40}ms\` }}
  />
))}`
