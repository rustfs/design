"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Tabs, ToggleGroup } from "radix-ui"
import { toast } from "sonner"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { Stripe } from "@/components/brand/stripe"
import { copyText } from "@/components/site/copy-button"
import { useT } from "@/components/site/locale-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  ADDON,
  ANNOUNCE,
  ANNOUNCE_CLOSE,
  ANNOUNCE_LINK,
  ANNOUNCE_ROW,
  Btn,
  CHECK_BOX,
  CHECK_DASH,
  CHECK_INPUT,
  CHECK_LABEL,
  CHECK_MARK,
  CHIP,
  ChevronDown,
  CMD,
  CMD_COPY,
  CMD_PROMPT,
  CMD_TEXT,
  COUNT,
  cx,
  ERROR,
  ERROR_MARK,
  FIELD,
  GROUP_INPUT,
  HELP,
  INPUT,
  INPUT_GROUP,
  LABEL,
  MARK,
  NAV,
  NAV_ACTIONS,
  NAV_LINK,
  NAV_LINKS,
  NAV_MENU,
  NAV_ROW,
  NAV_SHEET,
  NAV_SHEET_LINK,
  QUOTA,
  QUOTA_CELL,
  SEG,
  SEG_ITEM,
  SELECT,
  SELECT_ICON,
  SKELETON_CELL,
  SWITCH,
  SWITCH_THUMB,
  TABS_CONTENT,
  TABS_LIST,
  TABS_TRIGGER,
} from "./_ui"

const PAD = "p-[clamp(16px,2.4vw,28px)]"

function useReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => setReduce(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduce
}

/* ---------- Inputs ---------- */
const BUCKET_RE = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/

export function InputsDemo() {
  const t = useT()
  const [name, setName] = useState("Photos-2026")
  const invalid = name.length > 0 && !BUCKET_RE.test(name)
  return (
    <div className={cn("grid gap-x-10 gap-y-8 md:grid-cols-2", PAD)}>
      <div className={FIELD}>
        <label htmlFor="ui-bucket" className={LABEL}>
          {t("存储桶名称", "Bucket name")}
        </label>
        <input id="ui-bucket" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={invalid} aria-describedby="ui-bucket-help" spellCheck={false} autoComplete="off" className={cx(INPUT)} />
        {invalid ? (
          <p id="ui-bucket-help" className={ERROR}>
            <i className={ERROR_MARK} aria-hidden="true" />
            {t("仅可使用 3–63 个小写字母、数字、点或连字符。", "Use 3–63 lowercase letters, numbers, dots or hyphens.")}
          </p>
        ) : (
          <p id="ui-bucket-help" className={HELP}>
            {t("3–63 个字符，以小写字母或数字开头和结尾。", "3–63 characters, starting and ending with a lowercase letter or number.")}
          </p>
        )}
      </div>
      <div className={FIELD}>
        <label htmlFor="ui-endpoint" className={LABEL}>
          {t("服务端点", "Endpoint")}
        </label>
        <div className={cx(INPUT_GROUP)}>
          <span className={ADDON}>https://</span>
          <input id="ui-endpoint" defaultValue="s3.example.com:9000" spellCheck={false} autoComplete="off" aria-describedby="ui-endpoint-help" className={GROUP_INPUT} />
        </div>
        <p id="ui-endpoint-help" className={HELP}>
          {t("S3 API 默认监听 9000 端口，控制台为 9001。", "The S3 API listens on port 9000 by default; the Console on 9001.")}
        </p>
      </div>
      <div className={FIELD}>
        <label htmlFor="ui-prefix" className={LABEL}>
          {t("前缀", "Prefix")} <span className="font-normal text-muted-foreground">{t("（可选）", "(optional)")}</span>
        </label>
        <input id="ui-prefix" placeholder="logs/2026/" spellCheck={false} autoComplete="off" className={cn(cx(INPUT), "font-mono text-[13px]")} />
      </div>
      <div className={FIELD}>
        <label htmlFor="ui-region" className={cn(LABEL, "text-faint")}>
          {t("区域", "Region")}
        </label>
        <input id="ui-region" defaultValue="us-east-1" disabled aria-describedby="ui-region-help" className={cn(cx(INPUT), "font-mono text-[13px]")} />
        <p id="ui-region-help" className={HELP}>
          {t("由集群配置决定，此处只读。", "Set by the cluster configuration; read-only here.")}
        </p>
      </div>
    </div>
  )
}

/* ---------- Select & segmented ---------- */
export function SelectDemo() {
  const t = useT()
  const [range, setRange] = useState("24h")
  const ranges = [
    ["1h", "1H", t("1 小时", "hour")],
    ["24h", "24H", t("24 小时", "24 hours")],
    ["7d", "7D", t("7 天", "7 days")],
    ["30d", "30D", t("30 天", "30 days")],
  ] as const
  const [view, setView] = useState("list")
  return (
    <div className={cn("grid gap-x-10 gap-y-8 md:grid-cols-2", PAD)}>
      <div className={FIELD}>
        <label htmlFor="ui-class" className={LABEL}>
          {t("存储类别", "Storage class")}
        </label>
        <div className="relative">
          <select id="ui-class" className={cx(SELECT)} defaultValue="STANDARD">
            <option>STANDARD</option>
            <option>REDUCED_REDUNDANCY</option>
          </select>
          <ChevronDown className={SELECT_ICON} />
        </div>
      </div>
      <div className={FIELD}>
        <span className={LABEL} id="ui-range-label">
          {t("时间范围", "Time range")}
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup.Root type="single" value={range} onValueChange={(v) => v && setRange(v)} aria-labelledby="ui-range-label" className={SEG}>
            {ranges.map(([v, l]) => (
              <ToggleGroup.Item key={v} value={v} className={cx(SEG_ITEM)}>
                {l}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <ToggleGroup.Root type="single" value={view} onValueChange={(v) => v && setView(v)} aria-label={t("视图", "View")} className={SEG}>
            <ToggleGroup.Item value="list" aria-label={t("列表", "List")} className={cn(cx(SEG_ITEM), "grid min-w-9 place-items-center px-0")}>
              <Icon name="table" className="size-4" />
            </ToggleGroup.Item>
            <ToggleGroup.Item value="grid" aria-label={t("网格", "Grid")} className={cn(cx(SEG_ITEM), "grid min-w-9 place-items-center px-0")}>
              <Icon name="erasure-set" className="size-4" />
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <p className={HELP}>
          {t("当前：最近 ", "Showing the last ")}
          {ranges.find((r) => r[0] === range)?.[2]}
          {t("。", ".")}
        </p>
      </div>
    </div>
  )
}

/* ---------- Checkbox & switch ---------- */
function Check({ checked, onChange, disabled, indeterminate, children }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; indeterminate?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])
  return (
    <label className={CHECK_LABEL}>
      <span className={CHECK_BOX}>
        <input ref={ref} type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} className={cx(CHECK_INPUT)} />
        <Icon name="check" strokeWidth={2.5} className={CHECK_MARK} />
        <i className={CHECK_DASH} aria-hidden="true" />
      </span>
      {children}
    </label>
  )
}

function Switch({ on, onChange, disabled, label }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean; label: ReactNode }) {
  return (
    <label className="inline-flex items-center gap-3 text-sm text-foreground has-disabled:text-faint">
      <button type="button" role="switch" aria-checked={on} disabled={disabled} onClick={() => onChange(!on)} className={cx(SWITCH)}>
        <span className={SWITCH_THUMB} />
      </button>
      {label}
    </label>
  )
}

export function ChecksDemo() {
  const t = useT()
  const [versioning, setVersioning] = useState(true)
  const [lock, setLock] = useState(false)
  const [selected, setSelected] = useState(3)
  const [sse, setSse] = useState(true)
  const [anon, setAnon] = useState(false)
  return (
    <div className={cn("grid gap-x-10 gap-y-8 md:grid-cols-2", PAD)}>
      <fieldset className="m-0 grid content-start gap-3.5 border-0 p-0">
        <legend className="mb-3.5 font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("复选框", "Checkbox")}</legend>
        <Check checked={versioning} onChange={setVersioning}>
          {t("启用版本控制", "Enable versioning")}
        </Check>
        <Check checked={versioning && lock} onChange={setLock} disabled={!versioning}>
          {t("启用对象锁定（需先启用版本控制）", "Enable Object Lock (requires versioning)")}
        </Check>
        <Check checked={selected === 8} indeterminate={selected > 0 && selected < 8} onChange={() => setSelected(selected === 8 ? 0 : 8)}>
          {t(`已选择 ${selected} / 8 个对象`, `${selected} of 8 objects selected`)}
        </Check>
      </fieldset>
      <fieldset className="m-0 grid content-start gap-3.5 border-0 p-0">
        <legend className="mb-3.5 font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("开关", "Switch")}</legend>
        <Switch on={sse} onChange={setSse} label={t("默认加密（SSE-S3）", "Default encryption (SSE-S3)")} />
        <Switch on={anon} onChange={setAnon} label={t("匿名读取", "Anonymous read")} />
        <Switch on={true} onChange={() => {}} disabled label={t("审计日志（集群设置）", "Audit log (cluster setting)")} />
      </fieldset>
    </div>
  )
}

/* ---------- Tabs ---------- */
export function TabsDemo() {
  const t = useT()
  const tabs = [
    { v: "objects", l: t("对象", "Objects"), n: "128" },
    { v: "versions", l: t("版本", "Versions"), n: "342" },
    { v: "lifecycle", l: t("生命周期", "Lifecycle"), n: "2" },
    { v: "replication", l: t("复制", "Replication"), n: null },
  ]
  const body: Record<string, ReactNode> = {
    objects: t("对象列表：键、大小、最后修改时间与存储类别。", "Object list: key, size, last modified and storage class."),
    versions: t("每个对象的全部历史版本，包括删除标记。", "Every version of every object, delete markers included."),
    lifecycle: t("2 条规则：30 天后转储到温层；365 天后过期。", "Two rules: transition to the warm tier after 30 days; expire after 365 days."),
    replication: t("尚未配置复制目标。复制要求源与目标存储桶均启用版本控制。", "No replication target yet. Replication requires versioning on both source and target buckets."),
  }
  return (
    <div className={PAD}>
      <Tabs.Root defaultValue="objects">
        <Tabs.List className={TABS_LIST} aria-label={t("存储桶", "Bucket")}>
          {tabs.map((x) => (
            <Tabs.Trigger key={x.v} value={x.v} className={cx(TABS_TRIGGER)}>
              {x.l}
              {x.n && <span className={COUNT}>{x.n}</span>}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((x) => (
          <Tabs.Content key={x.v} value={x.v} className={TABS_CONTENT}>
            {body[x.v]} <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">· {t("示例数据", "Sample data")}</span>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  )
}

/* ---------- Toast ---------- */
export function ToastDemo() {
  const t = useT()
  return (
    <div className={cn("flex flex-wrap items-center gap-3", PAD)}>
      <Btn variant="outline" size="sm" onClick={() => toast.success(t("已创建存储桶", "Bucket created"), { description: "s3://photos" })}>
        <Icon name="check" />
        {t("成功", "Success")}
      </Btn>
      <Btn variant="outline" size="sm" onClick={() => toast.warning(t("配额已用 85%", "Quota at 85%"), { description: t("s3://backups · 已用 8.5 / 10 TiB", "s3://backups · 8.5 of 10 TiB") })}>
        <Icon name="alert" />
        {t("警告", "Warning")}
      </Btn>
      <Btn variant="outline" size="sm" onClick={() => toast.error(t("访问被拒绝", "Access denied"), { description: "s3:PutObject · s3://logs" })}>
        <Icon name="close" />
        {t("错误", "Error")}
      </Btn>
      <Btn
        variant="outline"
        size="sm"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1800)), {
            loading: t("正在上传 report.parquet…", "Uploading report.parquet…"),
            success: t("上传完成", "Upload complete"),
            error: t("上传失败", "Upload failed"),
          })
        }
      >
        <Icon name="upload" />
        {t("进行中", "In progress")}
      </Btn>
      <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">{t("点击触发 · 示例数据", "Click to trigger · Sample data")}</span>
    </div>
  )
}

/* ---------- Navigation bar ---------- */
export function NavDemo() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const links = [t("产品", "Product"), t("文档", "Docs"), t("博客", "Blog"), t("社区", "Community")]
  return (
    <header className={NAV}>
      <div className={NAV_ROW}>
        <a href="#nav" aria-label="RustFS" className="shrink-0" onClick={(e) => e.preventDefault()}>
          <Wordmark className="h-4.5 w-auto text-brand dark:text-foreground" />
        </a>
        <nav className={NAV_LINKS} aria-label={t("主导航", "Main")}>
          {links.map((l, i) => (
            <a key={l} href="#nav" aria-current={i === 1 ? "page" : undefined} className={NAV_LINK} onClick={(e) => e.preventDefault()}>
              {l}
            </a>
          ))}
        </nav>
        <div className={NAV_ACTIONS}>
          <Btn variant="ghost" size="sm" className="font-mono text-xs">
            中 / EN
          </Btn>
          <Btn variant="ghost" size="sm">
            GitHub
            <Icon name="arrow-up-right" />
          </Btn>
          <Btn size="sm">
            <Icon name="download" />
            {t("下载", "Download")}
          </Btn>
        </div>
        <Btn variant="ghost" size="icon" aria-expanded={open} aria-label={open ? t("关闭菜单", "Close menu") : t("打开菜单", "Open menu")} className={NAV_MENU} onClick={() => setOpen(!open)}>
          <Icon name={open ? "close" : "menu"} />
        </Btn>
      </div>
      {open && (
        <nav className={NAV_SHEET} aria-label={t("主导航", "Main")}>
          {links.map((l) => (
            <a key={l} href="#nav" className={NAV_SHEET_LINK} onClick={(e) => e.preventDefault()}>
              {l}
              <Icon name="arrow-right" className="size-4 text-faint" />
            </a>
          ))}
          <div className="grid gap-2 p-4">
            <Btn size="lg" className="w-full">
              <Icon name="download" />
              {t("下载 RustFS", "Download RustFS")}
            </Btn>
            <Btn variant="outline" size="lg" className="w-full">
              GitHub
              <Icon name="arrow-up-right" />
            </Btn>
          </div>
        </nav>
      )}
    </header>
  )
}

/* ---------- Announcement bar ---------- */
export function AnnouncementDemo() {
  const t = useT()
  const [shown, setShown] = useState(true)
  if (!shown)
    return (
      <div className={cn("flex min-h-10 items-center", PAD)}>
        <Btn variant="link" onClick={() => setShown(true)}>
          {t("重新显示公告栏", "Show the announcement again")}
        </Btn>
      </div>
    )
  return (
    <div role="region" aria-label={t("公告", "Announcement")} className={ANNOUNCE}>
      <div className={ANNOUNCE_ROW}>
        <Stripe className="hidden text-[6px] sm:inline-flex" />
        <a href="#announce" className={ANNOUNCE_LINK} onClick={(e) => e.preventDefault()}>
          {t("RustFS 1.0.1 现已发布", "RustFS 1.0.1 is available")}
          <Icon name="arrow-right" className="size-3.5 transition-transform duration-(--duration-base) ease-emphasized group-hover:translate-x-0.5" />
        </a>
        <span className="hidden font-mono text-xs text-neutral-400 md:inline">{t("更新说明 · github.com/rustfs/rustfs/releases", "Release notes · github.com/rustfs/rustfs/releases")}</span>
        <button type="button" aria-label={t("关闭公告", "Dismiss")} className={ANNOUNCE_CLOSE} onClick={() => setShown(false)}>
          <Icon name="close" className="size-4" />
        </button>
      </div>
    </div>
  )
}

/* ---------- Quota ---------- */
export function QuotaDemo() {
  const t = useT()
  const [p, setP] = useState(0.68)
  const filled = Math.round(p * 40)
  const tone = p >= 0.95 ? QUOTA_CELL.full : p >= 0.8 ? QUOTA_CELL.warn : QUOTA_CELL.used
  const label = p >= 0.95 ? t("即将写满", "Nearly full") : p >= 0.8 ? t("接近上限", "Approaching limit") : t("正常", "Normal")
  const mark = p >= 0.95 ? MARK.offline : p >= 0.8 ? MARK.degraded : MARK.online
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm font-medium">
          {t("存储桶配额", "Bucket quota")} <span className="font-mono text-[13px] font-normal text-muted-foreground">s3://backups</span>
        </span>
        <span className="font-mono text-[13px] tabular-nums">
          {(p * 10).toFixed(1)} / 10 TiB · {Math.round(p * 100)}%
        </span>
      </div>
      <div role="progressbar" aria-label={t("配额用量", "Quota used")} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p * 100)} className={QUOTA}>
        {Array.from({ length: 40 }, (_, i) => (
          <i key={i} className={cn("transition-colors duration-(--duration-fast)", i < filled ? tone : QUOTA_CELL.free)} />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={CHIP}>
          <i className={mark} />
          {label}
        </span>
        <ToggleGroup.Root type="single" value={String(p)} onValueChange={(v) => v && setP(Number(v))} aria-label={t("示例用量", "Sample usage")} className={SEG}>
          {[0.68, 0.85, 0.97].map((v) => (
            <ToggleGroup.Item key={v} value={String(v)} className={cx(SEG_ITEM)}>
              {Math.round(v * 100)}%
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </div>
  )
}

/* ---------- Command bar with copy feedback ---------- */
export function CommandBar({ command, className }: { command: string; className?: string }) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <div className={cn(CMD, className)}>
      <code className={CMD_TEXT}>
        <span className={CMD_PROMPT} aria-hidden="true">
          $
        </span>
        {command}
      </code>
      <button
        type="button"
        aria-label={copied ? t("已复制", "Copied") : t("复制命令", "Copy command")}
        data-copied={copied}
        className={cx(CMD_COPY)}
        onClick={async () => {
          const ok = await copyText(command)
          if (!ok) {
            toast.error(t("浏览器拦截了复制，请手动选择文本", "The browser blocked copying. Select the text instead."))
            return
          }
          setCopied(true)
          toast.success(t("已复制", "Copied"))
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setCopied(false), 1600)
        }}
      >
        <Icon name={copied ? "check" : "copy"} className="size-4" />
      </button>
    </div>
  )
}

/* ---------- Elevation: the only shadow is on overlays ---------- */
export function OverlayDemo() {
  const t = useT()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Btn variant="outline">
          {t("对象操作", "Object actions")}
          <ChevronDown className="size-4" />
        </Btn>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6} className="w-56 border border-border shadow-overlay ring-0">
        <DropdownMenuLabel className="font-mono text-[11px] tracking-[0.06em] uppercase">photos/2026/cover.jpg</DropdownMenuLabel>
        <DropdownMenuItem className="text-[13px]">
          <Icon name="download" />
          {t("下载", "Download")}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[13px]">
          <Icon name="copy" />
          {t("复制路径", "Copy path")}
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[13px]">
          <Icon name="versions" />
          {t("查看版本", "Show versions")}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-0" />
        <DropdownMenuItem variant="destructive" className="text-[13px]">
          <Icon name="close" />
          {t("删除", "Delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ---------- Heal: fail a drive, watch it rebuild ---------- */
type Phase = "ok" | "lost" | "parity" | "rebuild"
export function HealDemo() {
  const t = useT()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("ok")
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach((x) => window.clearTimeout(x)), [])
  const run = () => {
    timers.current.forEach((x) => window.clearTimeout(x))
    if (reduce) {
      setPhase("ok")
      toast.success(t("分片已重建", "Shard rebuilt"), { description: "drive 03 · stripe 0" })
      return
    }
    setPhase("lost")
    timers.current = [window.setTimeout(() => setPhase("parity"), 720), window.setTimeout(() => setPhase("rebuild"), 1440), window.setTimeout(() => setPhase("ok"), 2160)]
  }
  const chip = {
    ok: [MARK.online, t("在线", "Online")],
    lost: [MARK.degraded, t("降级", "Degraded")],
    parity: ["size-2 shrink-0 bg-brand", t("修复中", "Healing")],
    rebuild: ["size-2 shrink-0 bg-brand", t("修复中", "Healing")],
  }[phase]
  return (
    <div className="grid justify-items-center gap-5">
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => {
          const parity = i >= 4
          const lost = i === 2
          return (
            <i
              key={i}
              className={cn(
                "size-7 transition-[background-color,outline-color] duration-(--duration-instant) sm:size-8",
                parity ? "bg-parity" : "bg-brand",
                lost && phase === "lost" && "bg-transparent outline-1 -outline-offset-1 outline-brand outline-dashed",
                lost && phase === "parity" && "bg-transparent outline-1 -outline-offset-1 outline-brand outline-dashed",
                parity && phase === "parity" && "outline-2 outline-offset-2 outline-parity",
                lost && phase === "rebuild" && "bg-parity",
              )}
            />
          )
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className={CHIP} aria-live="polite">
          <i className={chip[0]} />
          {chip[1]}
        </span>
        <Btn variant="outline" size="sm" onClick={run} disabled={phase !== "ok"}>
          <Icon name="replay" />
          {t("模拟一块盘故障", "Fail a drive")}
        </Btn>
      </div>
    </div>
  )
}

/* ---------- Skeleton as stepped shards ---------- */
export function SkeletonDemo() {
  const t = useT()
  const [loading, setLoading] = useState(true)
  const reload = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 2400)
  }
  const rows = [14, 24, 18]
  const start = rows.map((_, r) => rows.slice(0, r).reduce((a, b) => a + b, 0))
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid min-h-30 content-start gap-3 border border-border bg-background p-4" aria-busy={loading} aria-live="polite">
        {loading ? (
          <>
            <span className="sr-only">{t("正在加载", "Loading")}</span>
            {rows.map((len, r) => (
              <div key={r} className={cn("flex flex-wrap gap-0.5", r === 0 && "mb-1")} aria-hidden="true">
                {Array.from({ length: len }, (_, c) => (
                  <i key={c} className={SKELETON_CELL} style={{ animationDelay: `${((start[r] + c) % 24) * 40}ms` }} />
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            <b className="font-mono text-[13px] font-medium">s3://photos</b>
            <span className="text-sm text-subtle">{t("1,284 个对象 · 3.4 GiB · 已启用版本控制", "1,284 objects · 3.4 GiB · versioning on")}</span>
            <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">{t("示例数据", "Sample data")}</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Btn variant="outline" size="sm" onClick={loading ? () => setLoading(false) : reload}>
          <Icon name={loading ? "check" : "replay"} />
          {loading ? t("完成加载", "Finish loading") : t("重新加载", "Reload")}
        </Btn>
      </div>
    </div>
  )
}
