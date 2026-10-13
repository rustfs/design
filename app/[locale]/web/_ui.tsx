import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------
   Class strings for the Web & UI specimens. Every specimen renders
   with these constants and every snippet prints the same constants,
   so the code shown is the code running on the page.
   ------------------------------------------------------------------ */

type Groups = string | readonly string[]
const list = (g: Groups): readonly string[] => (typeof g === "string" ? [g] : g)
export const cx = (...g: Groups[]) => g.flatMap(list).join(" ")

/** A className attribute as code: one string, or cn() with one group per line. */
export function cls(g: Groups, indent = 0) {
  const groups = list(g)
  const pad = " ".repeat(indent)
  if (groups.length === 1) return `className="${groups[0]}"`
  return `className={cn(\n${groups.map((s) => `${pad}  "${s}",`).join("\n")}\n${pad})}`
}

function valueCode(g: Groups, indent: number) {
  const groups = list(g)
  const pad = " ".repeat(indent)
  if (groups.length === 1) return `"${groups[0]}"`
  return `[\n${groups.map((s) => `${pad}  "${s}",`).join("\n")}\n${pad}]`
}

/* ---------- Glyphs missing from the brand icon set (same grid: 24px, 1.5 stroke, square caps) ---------- */
const GLYPHS = {
  chevron: "M6.75 9.75L12 15l5.25-5.25",
  search: "M10.75 4.25a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13zM15.5 15.5l4.75 4.75",
  minus: "M6.75 12h10.5",
}
export function Glyph({ name, className }: { name: keyof typeof GLYPHS; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={cn("block size-4 shrink-0", className)} aria-hidden="true">
      <path d={GLYPHS[name]} />
    </svg>
  )
}

/* ---------- Button ---------- */
const LIFT = "hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0"

export const BUTTON = {
  base: [
    "relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden border border-transparent font-medium whitespace-nowrap select-none",
    "transition-[translate,background-color,border-color,color,text-decoration-color] duration-(--duration-fast) ease-standard",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  variant: {
    default: [
      `bg-primary text-primary-foreground hover:bg-blue-600 active:bg-blue-700 ${LIFT}`,
      "before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/3 before:-translate-x-[150%] before:-skew-x-12 before:bg-white/20",
      "hover:before:translate-x-[320%] hover:before:transition-transform hover:before:duration-(--duration-scene) hover:before:ease-emphasized motion-reduce:before:hidden",
    ],
    secondary: [`bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklab,var(--secondary),var(--foreground)_8%)] ${LIFT}`],
    outline: [`border-strong bg-background text-foreground hover:border-foreground ${LIFT}`],
    ghost: ["text-foreground hover:bg-surface active:bg-surface-2"],
    link: ["text-link underline decoration-transparent decoration-1 underline-offset-4 hover:decoration-current"],
    destructive: [`bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklab,var(--destructive),var(--foreground)_14%)] ${LIFT}`],
  },
  size: {
    sm: "h-8 px-3 text-[13px] [&_svg]:size-3.5",
    default: "h-10 px-4 text-sm [&_svg]:size-4",
    lg: "h-12 px-5 text-[15px] [&_svg]:size-4.5",
    icon: "size-10 [&_svg]:size-4.5",
  },
  compound: "h-auto px-0",
} as const

export const buttonVariants = cva(BUTTON.base, {
  variants: { variant: BUTTON.variant, size: BUTTON.size },
  compoundVariants: [{ variant: "link", class: BUTTON.compound }],
  defaultVariants: { variant: "default", size: "default" },
})

export function Btn({ className, variant, size, ...props }: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button type="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export const BUTTON_CODE = `// components/ui/button.tsx
const buttonVariants = cva(
  ${valueCode(BUTTON.base, 2)},
  {
    variants: {
      variant: {
${Object.entries(BUTTON.variant)
  .map(([k, v]) => `        ${k}: ${valueCode(v, 8)},`)
  .join("\n")}
      },
      size: {
${Object.entries(BUTTON.size)
  .map(([k, v]) => `        ${k}: "${v}",`)
  .join("\n")}
      },
    },
    compoundVariants: [{ variant: "link", class: "${BUTTON.compound}" }],
    defaultVariants: { variant: "default", size: "default" },
  },
)

<Button>Deploy</Button>
<Button variant="outline" size="sm"><Icon name="download" />Download</Button>`

/* ---------- Inputs ---------- */
export const FIELD = "grid gap-2"
export const LABEL = "text-sm font-medium text-foreground"
export const HELP = "text-[13px] leading-normal text-muted-foreground"
export const ERROR = "flex items-center gap-2 text-[13px] leading-normal text-danger"
export const ERROR_MARK = "size-2 shrink-0 bg-danger"
export const INPUT = [
  "h-10 w-full min-w-0 border border-input bg-background px-3 text-sm text-foreground placeholder:text-faint",
  "transition-colors duration-(--duration-fast) ease-standard hover:border-faint",
  "focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  "aria-invalid:border-danger aria-invalid:focus-visible:outline-danger",
  "disabled:cursor-not-allowed disabled:border-border disabled:bg-surface disabled:text-faint",
]
export const INPUT_GROUP = [
  "flex h-10 items-stretch border border-input bg-background transition-colors duration-(--duration-fast) ease-standard hover:border-faint",
  "focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring",
]
export const ADDON = "grid place-items-center border-r border-border bg-surface px-3 font-mono text-xs text-muted-foreground"
export const GROUP_INPUT = "min-w-0 flex-1 bg-transparent px-3 font-mono text-[13px] text-foreground placeholder:text-faint focus-visible:outline-none"

export const INPUT_CODE = `<div ${cls(FIELD)}>
  <label htmlFor="bucket" ${cls(LABEL)}>Bucket name</label>
  <input id="bucket" aria-invalid={invalid} aria-describedby="bucket-help" ${cls(INPUT, 2)} />
  {invalid ? (
    <p id="bucket-help" ${cls(ERROR)}>
      <i ${cls(ERROR_MARK)} />Use 3–63 lowercase letters, numbers, dots or hyphens.
    </p>
  ) : (
    <p id="bucket-help" ${cls(HELP)}>3–63 characters.</p>
  )}
</div>

<div ${cls(INPUT_GROUP)}>
  <span ${cls(ADDON)}>https://</span>
  <input ${cls(GROUP_INPUT)} />
</div>`

/* ---------- Select & segmented control ---------- */
export const SELECT = [
  "h-10 w-full appearance-none border border-input bg-background pr-10 pl-3 text-sm text-foreground",
  "transition-colors duration-(--duration-fast) ease-standard hover:border-faint",
  "focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
]
export const SELECT_ICON = "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
export const SEG = "inline-flex border border-strong"
export const SEG_ITEM = [
  "h-8 min-w-11 px-3 font-mono text-xs text-muted-foreground transition-colors duration-(--duration-fast) ease-standard not-first:border-l not-first:border-strong",
  "hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background",
  "focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
]
export const SELECT_CODE = `<div className="relative">
  <select ${cls(SELECT, 2)}>
    <option>STANDARD</option>
    <option>REDUCED_REDUNDANCY</option>
  </select>
  <ChevronDown ${cls(SELECT_ICON)} />
</div>

// import { ToggleGroup } from "radix-ui"
<ToggleGroup.Root type="single" defaultValue="24h" ${cls(SEG)}>
  <ToggleGroup.Item value="1h" ${cls(SEG_ITEM, 2)}>1H</ToggleGroup.Item>
  {/* 24H · 7D · 30D */}
</ToggleGroup.Root>`

/* ---------- Checkbox & switch ---------- */
export const CHECK_LABEL = "inline-flex items-center gap-2.5 text-sm text-foreground has-disabled:text-faint"
export const CHECK_BOX = "relative grid size-4 shrink-0 place-items-center"
export const CHECK_INPUT = [
  "peer absolute inset-0 appearance-none border border-input bg-background transition-colors duration-(--duration-instant) ease-standard",
  "hover:border-faint checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:border-border disabled:bg-surface",
]
export const CHECK_MARK = "pointer-events-none relative col-start-1 row-start-1 size-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100"
export const CHECK_DASH = "pointer-events-none relative col-start-1 row-start-1 h-0.5 w-2 bg-primary-foreground opacity-0 peer-indeterminate:opacity-100"
export const SWITCH = [
  "group inline-flex h-5 w-9 shrink-0 items-center border border-input bg-surface-2 p-0.5 transition-colors duration-(--duration-fast) ease-standard",
  "aria-checked:border-primary aria-checked:bg-primary disabled:opacity-40",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
]
export const SWITCH_THUMB = "size-3.5 bg-subtle transition-[translate,background-color] duration-(--duration-fast) ease-emphasized group-aria-checked:translate-x-4 group-aria-checked:bg-primary-foreground motion-reduce:transition-none"
export const CHECK_CODE = `<label ${cls(CHECK_LABEL)}>
  <span ${cls(CHECK_BOX)}>
    <input type="checkbox" ${cls(CHECK_INPUT, 4)} />
    <Icon name="check" strokeWidth={2.5} ${cls(CHECK_MARK)} />
    <i ${cls(CHECK_DASH)} />
  </span>
  Enable versioning
</label>

<button role="switch" aria-checked={on} onClick={() => setOn(!on)} ${cls(SWITCH, 0)}>
  <span ${cls(SWITCH_THUMB)} />
</button>`

/* ---------- Status chips & badges ---------- */
export const CHIP = "inline-flex h-6 items-center gap-1.5 border border-border bg-background px-2 font-mono text-[11px] leading-none font-medium tracking-[0.06em] text-foreground uppercase"
export const MARK = {
  online: "size-2 shrink-0 bg-success",
  healing: "size-2 shrink-0 bg-brand animate-[rfs-heal_2880ms_steps(1)_infinite]",
  degraded: "size-2 shrink-0 bg-warning",
  offline: "size-2 shrink-0 bg-danger",
  parity: "size-2 shrink-0 bg-parity",
} as const
export const BADGE_SOLID = "inline-flex h-6 items-center bg-foreground px-2 font-mono text-[11px] leading-none font-medium tracking-[0.06em] text-background uppercase"
export const COUNT = "inline-grid h-5 min-w-5 place-items-center bg-surface-2 px-1 font-mono text-[11px] leading-none text-foreground tabular-nums"
export const CHIP_CODE = `const MARK = {
${Object.entries(MARK)
  .map(([k, v]) => `  ${k}: "${v}",`)
  .join("\n")}
}

<span ${cls(CHIP)}>
  <i className={MARK.healing} />
  Healing
</span>

<span ${cls(BADGE_SOLID)}>1.0.1</span>
<span ${cls(COUNT)}>12</span>`

/* ---------- Tabs ---------- */
export const TABS_LIST = "flex overflow-x-auto border-b border-border [scrollbar-width:none]"
export const TABS_TRIGGER = [
  "relative inline-flex h-11 shrink-0 items-center gap-2 px-3.5 text-sm text-muted-foreground transition-colors duration-(--duration-fast) ease-standard hover:text-foreground",
  "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-transparent data-[state=active]:text-foreground data-[state=active]:after:bg-brand",
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
]
export const TABS_CONTENT = "pt-5 text-sm leading-relaxed text-subtle focus-visible:outline-none"
export const TABS_CODE = `// import { Tabs } from "radix-ui"
<Tabs.Root defaultValue="objects">
  <Tabs.List ${cls(TABS_LIST)}>
    <Tabs.Trigger value="objects" ${cls(TABS_TRIGGER, 4)}>
      Objects <span ${cls(COUNT)}>128</span>
    </Tabs.Trigger>
    {/* Versions · Lifecycle · Replication */}
  </Tabs.List>
  <Tabs.Content value="objects" ${cls(TABS_CONTENT)}>…</Tabs.Content>
</Tabs.Root>`

/* ---------- Callouts ---------- */
export const CALLOUT = "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border border-border bg-surface px-4 py-3.5 text-sm leading-relaxed"
export const CALLOUT_MARK = { note: "mt-1 size-2.5 bg-info", tip: "mt-1 size-2.5 bg-success", warning: "mt-1 size-2.5 bg-warning", preview: "mt-1 size-2.5 bg-parity" } as const
export const CALLOUT_TITLE = "font-mono text-[11px] leading-[18px] font-medium tracking-[0.08em] text-foreground uppercase"
export const CALLOUT_BODY = "col-start-2 text-subtle"
export const CALLOUT_CODE = `<div role="note" ${cls(CALLOUT)}>
  <i ${cls(CALLOUT_MARK.warning)} aria-hidden="true" />
  <b ${cls(CALLOUT_TITLE)}>Warning</b>
  <p ${cls(CALLOUT_BODY)}>EC 4+2 tolerates at most two failed drives.</p>
</div>

// note: bg-info · tip: bg-success · warning: bg-warning · preview: bg-parity`

/* ---------- Table ---------- */
export const TABLE_WRAP = "overflow-x-auto border border-border"
export const TABLE = "w-full min-w-[640px] border-collapse text-[13px] leading-none"
export const TH = "h-9 border-b border-border bg-surface px-3 text-left font-mono text-[11px] font-medium tracking-[0.06em] whitespace-nowrap text-muted-foreground uppercase"
export const TH_NUM = "text-right"
export const TR = "border-b border-border transition-colors duration-(--duration-instant) last:border-0 hover:bg-surface"
export const TD = "h-10 px-3 whitespace-nowrap text-foreground"
export const TD_NUM = "text-right font-mono tabular-nums"
export const TABLE_CODE = `<div ${cls(TABLE_WRAP)}>
  <table ${cls(TABLE)}>
    <thead>
      <tr>
        <th ${cls(TH)}>Drive</th>
        <th ${cls(`${TH} ${TH_NUM}`)}>Used</th>
      </tr>
    </thead>
    <tbody>
      <tr ${cls(TR)}>
        <td ${cls(`${TD} font-mono`)}>/data/rustfs0</td>
        <td ${cls(`${TD} ${TD_NUM}`)}>3.42 TiB</td>
      </tr>
    </tbody>
  </table>
</div>`

/* ---------- Cards ---------- */
export const CARD = [
  "group flex flex-col gap-3 border border-border bg-card p-6 text-card-foreground",
  "transition-colors duration-(--duration-base) ease-standard hover:border-foreground",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
]
export const CARD_ICON = "grid size-10 shrink-0 place-items-center border border-border text-brand [&_svg]:size-5"
export const CARD_TITLE = "mt-3 text-lg leading-snug font-semibold"
export const CARD_TEXT = "text-sm leading-relaxed text-muted-foreground"
export const CARD_MORE = "mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-link"
export const CARD_ARROW = "size-4 transition-transform duration-(--duration-base) ease-emphasized group-hover:translate-x-0.5 motion-reduce:transition-none"
export const CARD_CODE = `<a href="/docs/erasure-coding/" ${cls(CARD, 0)}>
  <span ${cls(CARD_ICON)}><Icon name="shard" /></span>
  <h3 ${cls(CARD_TITLE)}>Erasure coding</h3>
  <p ${cls(CARD_TEXT)}>…</p>
  <span ${cls(CARD_MORE)}>
    Learn more <Icon name="arrow-right" ${cls(CARD_ARROW)} />
  </span>
</a>`

/* ---------- Navigation bar ---------- */
export const NAV = "@container border-b border-border bg-background"
export const NAV_ROW = "mx-auto flex h-16 max-w-[1240px] items-center gap-8 px-[clamp(16px,4.2vw,64px)]"
export const NAV_LINKS = "hidden items-center gap-6 @3xl:flex"
export const NAV_LINK = "text-sm text-subtle transition-colors duration-(--duration-fast) hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:font-medium"
export const NAV_ACTIONS = "ml-auto hidden items-center gap-3 @3xl:flex"
export const NAV_MENU = "ml-auto @3xl:hidden"
export const NAV_SHEET = "grid border-t border-border @3xl:hidden"
export const NAV_SHEET_LINK = "flex h-12 items-center justify-between border-b border-border px-4 text-[15px] text-foreground transition-colors hover:bg-surface"
export const NAV_CODE = `<header ${cls(NAV)}>
  <div ${cls(NAV_ROW)}>
    <a href="/" aria-label="RustFS"><Wordmark className="h-4.5 w-auto text-brand" /></a>
    <nav ${cls(NAV_LINKS)}>
      <a href="/product/" ${cls(NAV_LINK, 6)}>Product</a>
    </nav>
    <div ${cls(NAV_ACTIONS)}>…</div>
    <Button variant="ghost" size="icon" aria-expanded={open} ${cls(NAV_MENU)}>
      <Icon name={open ? "close" : "menu"} />
    </Button>
  </div>
  {open && (
    <nav ${cls(NAV_SHEET)}>
      <a href="/product/" ${cls(NAV_SHEET_LINK, 6)}>Product</a>
    </nav>
  )}
</header>`

/* ---------- Announcement bar ---------- */
export const ANNOUNCE = "bg-stage text-stage-foreground"
export const ANNOUNCE_ROW = "mx-auto flex min-h-10 max-w-[1240px] items-center gap-3 px-[clamp(16px,4.2vw,64px)] py-2 text-[13px] leading-snug"
export const ANNOUNCE_LINK = "group inline-flex items-center gap-1.5 font-medium underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
export const ANNOUNCE_CLOSE = "ml-auto grid size-8 shrink-0 place-items-center text-neutral-400 transition-colors hover:text-white"
export const ANNOUNCE_CODE = `<div role="region" aria-label="Announcement" ${cls(ANNOUNCE)}>
  <div ${cls(ANNOUNCE_ROW)}>
    <Stripe className="hidden text-[6px] sm:inline-flex" />
    <a href="/blog/rustfs-1-0-1/" ${cls(ANNOUNCE_LINK, 4)}>
      RustFS 1.0.1 is available <Icon name="arrow-right" className="size-3.5" />
    </a>
    <button aria-label="Dismiss" ${cls(ANNOUNCE_CLOSE, 4)}>
      <Icon name="close" className="size-4" />
    </button>
  </div>
</div>`

/* ---------- Footer ---------- */
export const FOOTER = "@container border-t border-border bg-background"
export const FOOTER_GRID = "mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-10 px-[clamp(16px,4.2vw,64px)] py-12 @2xl:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]"
export const FOOTER_HEAD = "font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase"
export const FOOTER_LINK = "text-sm text-subtle transition-colors duration-(--duration-fast) hover:text-foreground"
export const FOOTER_BASE = "mx-auto flex max-w-[1240px] flex-wrap justify-between gap-x-6 gap-y-2 border-t border-border px-[clamp(16px,4.2vw,64px)] py-5 font-mono text-xs text-muted-foreground"
export const FOOTER_CODE = `<footer ${cls(FOOTER)}>
  <div ${cls(FOOTER_GRID, 2)}>
    <div className="col-span-2 @2xl:col-span-1">…wordmark and line…</div>
    <nav aria-label="Docs" className="grid content-start gap-3">
      <h2 ${cls(FOOTER_HEAD)}>Docs</h2>
      <a href="https://docs.rustfs.com" ${cls(FOOTER_LINK, 6)}>Quick start</a>
    </nav>
  </div>
  <div ${cls(FOOTER_BASE, 2)}>
    <span>© 2026 RustFS · Apache License 2.0</span>
  </div>
</footer>`

/* ---------- Toast ---------- */
export const TOAST_CODE = `import { toast } from "sonner"

toast.success("Bucket created", { description: "s3://photos" })
toast.warning("Quota at 85%", { description: "s3://backups · 8.5 of 10 TiB" })
toast.error("Access denied", { description: "s3:PutObject on s3://logs" })
toast.promise(upload(file), {
  loading: "Uploading…",
  success: "Upload complete",
  error: "Upload failed",
})`

/* ---------- Empty state ---------- */
export const EMPTY = "grid justify-items-center gap-5 border border-dashed border-strong px-6 py-12 text-center"
export const EMPTY_TITLE = "text-lg font-semibold"
export const EMPTY_TEXT = "max-w-[40ch] text-sm leading-relaxed text-muted-foreground"
export const EMPTY_CODE = `<div ${cls(EMPTY)}>
  <ShardMatrix cols={8} rows={3} k={8} m={0} mode="outline" className="h-12 w-auto" />
  <h3 ${cls(EMPTY_TITLE)}>No buckets yet</h3>
  <p ${cls(EMPTY_TEXT)}>A bucket holds objects and their versions.</p>
  <Button><Icon name="plus" />Create bucket</Button>
</div>`

/* ---------- Shard progress & quota ---------- */
export const SHARDS = "grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1"
export const SHARD = {
  done: "aspect-square bg-brand",
  healing: "aspect-square animate-[rfs-heal_2880ms_steps(1)_infinite] bg-brand",
  todo: "aspect-square border border-strong",
} as const
export const QUOTA = "grid h-3 grid-cols-[repeat(40,minmax(0,1fr))] gap-0.5"
export const QUOTA_CELL = { used: "bg-brand", warn: "bg-warning", full: "bg-danger", free: "bg-surface-2" } as const
export const PROGRESS_CODE = `<div role="progressbar" aria-valuemin={0} aria-valuemax={16} aria-valuenow={7} ${cls(SHARDS)}>
  {drives.map((d) => <i key={d.id} className={SHARD[d.state]} />)}
</div>

const SHARD = {
${Object.entries(SHARD)
  .map(([k, v]) => `  ${k}: "${v}",`)
  .join("\n")}
}

// Quota: 40 cells; brand below 80%, warning from 80%, danger from 95%
<div ${cls(QUOTA)}>…</div>`

/* ---------- Links & motion ---------- */
export const LINK_GROW = [
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 text-link",
  "transition-[background-size] duration-(--duration-base) ease-emphasized hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]",
]
export const SKELETON_CELL = "size-2 bg-surface-2 animate-[rfs-shard_1200ms_steps(1)_infinite]"

export function ChevronDown({ className }: { className?: string }) {
  return <Glyph name="chevron" className={className} />
}

/* ---------- Command bar (install commands, copy feedback) ---------- */
export const CMD = "flex min-w-0 items-stretch border border-neutral-800 bg-neutral-950 text-neutral-100"
export const CMD_TEXT = "flex min-w-0 flex-1 items-center gap-3 overflow-x-auto bg-transparent px-4 py-3 font-mono text-[13px] leading-5 whitespace-nowrap text-neutral-100 [scrollbar-width:thin]"
export const CMD_PROMPT = "text-blue-400 select-none"
export const CMD_COPY = [
  "grid w-11 shrink-0 place-items-center border-l border-neutral-800 text-neutral-400 transition-colors duration-(--duration-fast) ease-standard",
  "hover:bg-neutral-900 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-400 data-[copied=true]:text-green-500",
]
export const CMD_CODE = `const [copied, setCopied] = useState(false)

<div ${cls(CMD)}>
  <code ${cls(CMD_TEXT)}>
    <span ${cls(CMD_PROMPT)}>$</span>{command}
  </code>
  <button
    aria-label="Copy command"
    data-copied={copied}
    onClick={async () => {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      toast.success("Copied")
      setTimeout(() => setCopied(false), 1600)
    }}
    ${cls(CMD_COPY, 4)}
  >
    <Icon name={copied ? "check" : "copy"} className="size-4" />
  </button>
</div>`
