import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { QR } from "@/components/brand/qr"
import { Stripe } from "@/components/brand/stripe"
import type { IconName } from "@/lib/icons"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Arrow, Chrome, PARTS, Part, Placeholder, ROWS, ROWS3, SLIDE, Shards, Stage, TITLE, TOTAL, pad } from "./_parts"

const W = 1920
const H = 1080
const deck = { w: W, h: H, presentGroup: "deck", className: SLIDE } as const

/* ---------- 10 · sample chart ---------- */
const OBJ = ["4 KiB", "64 KiB", "1 MiB", "16 MiB", "128 MiB"]
const SER_A = [1.4, 3.9, 7.2, 8.6, 9.1]
const SER_B = [1.1, 4.2, 6.5, 8.8, 8.7]

function SampleChart() {
  const w = 1728
  const h = 360
  const left = 84
  const top = 30
  const bottom = 64
  const ph = h - top - bottom
  const y = (v: number) => top + ph - (v / 10) * ph
  const gw = (w - left) / OBJ.length
  const bw = 92
  const gap = 10
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full overflow-visible" role="img" aria-label="Sample data bar chart">
      {[0, 2, 4, 6, 8, 10].map((v) => (
        <g key={v}>
          <line x1={left} x2={w} y1={y(v)} y2={y(v)} className={v === 0 ? "stroke-ab-fg" : "stroke-ab-line"} strokeWidth={v === 0 ? 2 : 1.5} />
          <text x={left - 22} y={y(v)} dy="0.36em" textAnchor="end" fontSize={22} className="fill-ab-muted font-mono">
            {v}
          </text>
        </g>
      ))}
      {OBJ.map((o, i) => {
        const cx = left + gw * (i + 0.5)
        const a = SER_A[i]
        const b = SER_B[i]
        return (
          <g key={o}>
            <rect x={cx - bw - gap / 2} y={y(a)} width={bw} height={y(0) - y(a)} className="fill-ab-data" />
            <rect x={cx + gap / 2} y={y(b)} width={bw} height={y(0) - y(b)} className="fill-ab-fg/22" />
            <text x={cx - bw / 2 - gap / 2} y={y(a) - 14} textAnchor="middle" fontSize={24} fontWeight={500} className="fill-ab-fg font-mono">
              {a.toFixed(1)}
            </text>
            <text x={cx + bw / 2 + gap / 2} y={y(b) - 14} textAnchor="middle" fontSize={24} className="fill-ab-muted font-mono">
              {b.toFixed(1)}
            </text>
            <text x={cx} y={y(0) + 46} textAnchor="middle" fontSize={26} className="fill-ab-fg-2 font-mono">
              {o}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- 11 · erasure set across four nodes ---------- */
function ErasureSet() {
  return (
    <div className="grid grid-cols-4 u-gap-2.5">
      {[0, 1, 2, 3].map((node) => (
        <div key={node} className="grid content-start u-gap-1.5">
          <span className="flex items-center u-gap-1 font-mono u-text-2 leading-none text-ab-fg-2">
            <Icon name="node" className="u-size-2.75" />
            node-{node + 1}
          </span>
          <div className="grid grid-cols-4 u-gap-0.75">
            {Array.from({ length: 16 }, (_, j) => {
              const stripe = Math.floor(j / 4)
              const parity = j % 4 === (stripe + node) % 4
              return <i key={j} className={cn("block aspect-square", parity ? "bg-ab-parity" : "bg-ab-data")} />
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Meta({ k, v, s }: { k: React.ReactNode; v: React.ReactNode; s?: React.ReactNode }) {
  return (
    <div className="grid content-start u-gap-1.25">
      <span className="ab-label u-text-2">{k}</span>
      <b className="u-text-3 leading-tight font-semibold">{v}</b>
      {s && <span className="u-text-2.75 leading-tight text-ab-fg-2">{s}</span>}
    </div>
  )
}

const FEATURES: { icon: IconName; zh: string; en: string; dzh: string; den: string; shards: string; czh: string; cen: string }[] = [
  {
    icon: "shard",
    zh: "纠删码",
    en: "Erasure coding",
    dzh: "对象被切分为 k 个数据块与 m 个校验块，写入纠删集中的不同磁盘。任意 m 块盘故障，数据仍可读取。",
    den: "Each object is split into k data and m parity shards on separate drives of an erasure set. Data stays readable with any m drives lost.",
    shards: "ddddpp",
    czh: "EC 4+2",
    cen: "EC 4+2",
  },
  {
    icon: "shield",
    zh: "位腐烂保护",
    en: "Bitrot protection",
    dzh: "每个分片写入时计算校验和，读取时重新校验。静默损坏的分片会被识别，不作为正确数据返回。",
    den: "Every shard is checksummed on write and verified on read. A silently corrupted shard is detected and never served as good data.",
    shards: "ddcdpp",
    czh: "读取时校验",
    cen: "Verified on read",
  },
  {
    icon: "heal",
    zh: "自愈",
    en: "Healing",
    dzh: "磁盘更换或分片损坏后，后台修复从其余分片重建缺失的数据，无需人工逐个恢复对象。",
    den: "After a drive is replaced or a shard is damaged, background healing rebuilds the missing data from the remaining shards.",
    shards: "ddhdpp",
    czh: "从其余分片重建",
    cen: "Rebuilt from the rest",
  },
]

const MILESTONES = [
  { date: "2026-08-19", zh: "RPM / DEB 安装包", en: "RPM and DEB packages", dzh: "发布 RPM / DEB 安装包分步教程", den: "Step-by-step install tutorial for RPM and DEB packages", tone: "data" },
  { date: "2026-09-10", zh: "S3 Tables", en: "S3 Tables", dzh: "在对象存储中提供 Apache Iceberg 表（预览）", den: "Apache Iceberg tables inside the object store (Preview)", tone: "data" },
  { date: "2026-09-16", zh: "1.0.0 正式版", en: "1.0.0 GA", dzh: "生产可用的正式版本", den: "General availability, production-ready", tone: "focus" },
  { date: null, zh: "1.0.1", en: "1.0.1", dzh: "当前发布版本", den: "The current release", tone: "now" },
] as const

export function Deck() {
  return (
    <TemplateGrid>
      {/* 01 · Cover */}
      <Template
        {...deck}
        span={12}
        title={t("01 封面", "01 Cover")}
        spec={t("1920 × 1080 · 开场 · Ink", "1920 × 1080 · Opening · Ink")}
        themes={["ink", "paper"]}
        file="slide-01-cover"
        note={t(
          <><b>用途：</b>演讲开场。标题分两级：产品与版本为主标题，演讲主题为副标题。演讲者、活动与日期置于底部信息栏，分片矩阵贴右侧出血。</>,
          <><b>Use:</b> the opening slide. The title has two levels: product and version, then the subject of the talk. Speaker, event and date sit in the bottom bar; the shard matrix bleeds off the right edge.</>,
        )}
      >
        <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[38%]" cols={10} rows={15} k={8} m={2} seed={5} mode="tone" fade="bl" gap={0.2} fit="slice" />
        <div className="ab-frame right-[calc(38%+var(--m))]">
          <Wordmark className="ab-logo u-h-4.25" />
          <div>
            <span className="ab-label u-text-2.25">
              <L zh="主题演讲" en="Keynote" /> · <b><L zh="主会场" en="Main stage" /></b>
            </span>
            <h2 className="ab-display u-mt-4 u-text-14 leading-[0.86] tracking-[-0.035em]">RustFS 1.0</h2>
            <p className="ab-head u-mt-4 u-text-6 text-ab-fg-2 [[data-lang=zh]_&]:tracking-[0.02em]">
              <L zh="面向 AI 时代的对象存储" en="Object storage for the AI era" />
            </p>
          </div>
          <div className="grid grid-cols-[1.25fr_1fr_0.7fr] u-gap-5 border-t border-ab-line u-pt-3">
            <Meta k={<L zh="演讲者" en="Speaker" />} v={<L zh="演讲者姓名" en="Speaker name" />} s={<L zh="职位 · 机构" en="Title · Organisation" />} />
            <Meta k={<L zh="活动" en="Event" />} v={<L zh="活动名称" en="Event name" />} s={<L zh="城市 · 会场" en="City · Venue" />} />
            <Meta k={<L zh="日期" en="Date" />} v={<span className="font-mono font-medium">2026-10-14</span>} />
          </div>
        </div>
      </Template>

      {/* 02 · Cover alt */}
      <Template
        {...deck}
        span={6}
        title={t("02 封面 · 备选", "02 Cover, alternate")}
        spec={t("1920 × 1080 · 开场 · Signal", "1920 × 1080 · Opening · Signal")}
        themes={["signal", "ink"]}
        file="slide-02-cover-alt"
        note={t(
          <><b>用途：</b>产品发布、合作活动等需要整屏品牌色的开场。底边矩阵带出血，信息栏位于矩阵带上方。</>,
          <><b>Use:</b> openings that call for a full brand-colour field, such as launches and partner events. The matrix band bleeds off the bottom edge with the information bar above it.</>,
        )}
      >
        <div className="ab-frame bottom-[calc(var(--u)*9+var(--m))]">
          <div className="ab-row">
            <Wordmark className="ab-logo u-h-4.25" />
            <span className="ab-label u-text-2.25">
              <L zh="主题演讲" en="Keynote" /> · <b>2026</b>
            </span>
          </div>
          <div>
            <h2 className="ab-display u-text-22 leading-[0.8] tracking-[-0.045em]">RustFS 1.0</h2>
            <p className="ab-head u-mt-6 u-text-6 [[data-lang=zh]_&]:tracking-[0.02em]">
              <L zh="面向 AI 时代的对象存储" en="Object storage for the AI era" />
            </p>
          </div>
          <div className="flex items-baseline u-gap-6 font-mono u-text-2.25 leading-none text-ab-fg-2">
            <span className="font-sans u-text-3 font-semibold text-ab-fg">
              <L zh="演讲者姓名" en="Speaker name" />
            </span>
            <span>
              <L zh="职位 · 机构" en="Title · Organisation" />
            </span>
            <span>
              <L zh="活动名称" en="Event name" />
            </span>
            <span className="ml-auto">2026-10-14</span>
          </div>
        </div>
        <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[calc(var(--u)*7.5)] !w-full" cols={48} rows={2} k={10} m={2} seed={9} mode="tone" gap={0.2} fit="slice" />
      </Template>

      {/* 03 · Agenda */}
      <Template
        {...deck}
        span={6}
        title={t("03 议程", "03 Agenda")}
        spec="1920 × 1080 · Paper"
        themes={["paper", "white", "ink"]}
        file="slide-03-agenda"
        note={t(
          <><b>用途：</b>列出演讲的组成部分，不超过 5 项。编号与章节页一致，右侧页码为该部分的实际页码范围。</>,
          <><b>Use:</b> the parts of the talk, five at most. Numbers match the section dividers; the page range on the right is the real range of that part.</>,
        )}
      >
        <Chrome n={3} section={<L zh="议程" en="Agenda" />} />
        <Stage>
          <div className="col-span-4 grid content-between">
            <h3 className={TITLE}>
              <L zh="议程" en="Agenda" />
            </h3>
            <span className="ab-label u-text-2">
              <b>4</b> <L zh="个部分" en="parts" /> · <b>{TOTAL}</b> <L zh="页" en="slides" />
            </span>
          </div>
          <ol className="col-span-8 col-start-5 m-0 grid list-none grid-rows-4 border-t border-ab-line p-0">
            {PARTS.map((p, i) => (
              <li key={p.en} className="grid grid-cols-[calc(var(--u)*12)_minmax(0,1fr)_auto] items-center border-b border-ab-line">
                <span className="ab-num u-text-5.5 text-ab-brand">{pad(i + 1)}</span>
                <span className="grid u-gap-1">
                  <b className="ab-head u-text-4.25 [[data-lang=zh]_&]:tracking-[0.02em]">
                    <L zh={p.zh} en={p.en} />
                  </b>
                  <span className="u-text-2.75 leading-snug text-ab-fg-2">
                    <L zh={p.desc.zh} en={p.desc.en} />
                  </span>
                </span>
                <span className="font-mono u-text-2 tracking-[0.04em] text-ab-muted">
                  <L zh="页" en="pp." /> <b className="font-medium text-ab-fg">{p.pages}</b>
                </span>
              </li>
            ))}
          </ol>
        </Stage>
      </Template>

      {/* 04 · Section divider */}
      <Template
        {...deck}
        span={6}
        title={t("04 章节页", "04 Section divider")}
        spec="1920 × 1080 · Signal"
        themes={["signal", "ink", "paper"]}
        file="slide-04-section"
        note={t(
          <><b>用途：</b>每个部分的第一页。编号与议程一致；底部矩阵带按部分分段，当前部分为实心，其余为空心。</>,
          <><b>Use:</b> the first slide of each part. The number matches the agenda; the matrix band is split by part, with the current part solid and the rest outlined.</>,
        )}
      >
        <Chrome n={4} section={<Part i={1} />} />
        <Stage className="grid-rows-[minmax(0,1fr)_auto]">
          <div className="col-span-6 self-end ab-display u-text-40 leading-[0.72] tracking-[-0.06em]">01</div>
          <div className="col-span-6 col-start-7 grid self-end u-gap-3 u-pb-1">
            <h3 className="ab-head u-text-9 [[data-lang=zh]_&]:tracking-[0.02em]">
              <L zh="背景" en="Context" />
            </h3>
            <p className="max-w-[24em] u-text-3 leading-snug text-balance text-ab-fg-2">
              <L zh={PARTS[0].desc.zh} en={PARTS[0].desc.en} />
            </p>
            <span className="ab-label u-text-2">
              <L zh="页" en="pp." /> <b>{PARTS[0].pages}</b>
            </span>
          </div>
          <div className="col-span-12 row-start-2 grid grid-cols-4 u-gap-x-2.25 u-mt-7">
            {PARTS.map((p, i) => (
              <div key={p.en} className="grid u-gap-1.5">
                <ShardMatrix className="!h-[calc(var(--u)*7)] !w-full" cols={10} rows={2} k={8} m={2} seed={3 + i} gap={0.22} fit="none" density={i === 0 ? 1 : 0} />
                <span className={cn("font-mono u-text-2 leading-none tracking-[0.04em]", i === 0 ? "text-ab-fg" : "text-ab-muted")}>
                  {pad(i + 1)} <L zh={p.zh} en={p.en} />
                </span>
              </div>
            ))}
          </div>
        </Stage>
      </Template>

      {/* 05 · Statement */}
      <Template
        {...deck}
        span={6}
        title={t("05 陈述", "05 Statement")}
        spec="1920 × 1080 · Ink"
        themes={["ink", "signal", "paper"]}
        file="slide-05-statement"
        note={t(
          <><b>用途：</b>整页只放一句话：品牌主张、一个结论或一个问题。中文不超过 2 行，不加图形与要点。</>,
          <><b>Use:</b> one sentence on its own: the brand line, a conclusion or a question. Two lines at most, with no graphic and no bullets.</>,
        )}
      >
        <Chrome n={5} section={<Part i={1} />} />
        <div className="absolute inset-x-(--m) top-1/2 -translate-y-1/2">
          <Stripe className="u-text-2.25" />
          <h3 className="m-0 u-mt-7">
            <L
              zh={
                <span className="ab-zh block u-text-16 leading-[1.14] tracking-[0.02em]">
                  每一个字节，
                  <br />
                  <em className="text-ab-brand not-italic">都有着落。</em>
                </span>
              }
              en={
                <span className="ab-display block u-text-15 leading-[0.96] tracking-[-0.035em]">
                  Every byte,
                  <br />
                  <em className="text-ab-brand not-italic">accounted for.</em>
                </span>
              }
            />
          </h3>
        </div>
      </Template>

      {/* 06 · Title, bullets, visual */}
      <Template
        {...deck}
        span={6}
        title={t("06 标题 + 要点 + 图", "06 Title, bullets and visual")}
        spec="1920 × 1080 · White"
        themes={["white", "paper", "ink"]}
        file="slide-06-bullets"
        note={t(
          <><b>用途：</b>最常用的内容页。要点占左侧 7 栏，不超过 6 条，每条不超过 2 行；右侧 5 栏放说明要点的图，不放装饰。</>,
          <><b>Use:</b> the workhorse content slide. Bullets take the left seven columns, six at most and two lines each; the right five columns hold a visual that explains them, never decoration.</>,
        )}
      >
        <Chrome n={6} section={<Part i={1} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-7")}>
            <L zh="单机起步，按池扩展" en="Start on one machine, grow by pools" />
          </h3>
          <ul className="col-span-7 row-start-2 m-0 grid list-none content-start u-gap-4 p-0 u-pr-4">
            {[
              ["单节点、单块盘即可启动，适用于开发与边缘场景。", "One node, one drive: enough for development and the edge."],
              ["生产部署将数据块与校验块分布到多节点、多块盘。", "Production spreads data and parity across many drives."],
              ["新增服务器池即可扩容；已有数据保留在原池中。", "Add server pools to grow; existing data stays where it is."],
              ["兼容 S3 的 API 可直接接入现有 SDK 与命令行工具。", "The S3-compatible API works with existing SDKs and CLIs."],
            ].map(([zh, en], i) => (
              <li key={i} className="grid grid-cols-[calc(var(--u)*3.5)_minmax(0,1fr)] u-text-3 leading-[1.42]">
                <i className="mt-[0.5em] block u-size-1.25 bg-ab-data" />
                <span>
                  <L zh={zh} en={en} />
                </span>
              </li>
            ))}
          </ul>
          <div className="col-span-5 col-start-8 row-span-2 row-start-1 grid grid-rows-[auto_auto_auto_auto_1fr] content-start u-gap-2 border-l border-ab-line u-pl-5">
            <span className="ab-label u-text-2">
              <b>
                <L zh="服务器池 1" en="Server pool 1" />
              </b>{" "}
              · <L zh="已有" en="Existing" />
            </span>
            <ShardMatrix className="!h-auto !w-full" cols={12} rows={4} k={10} m={2} seed={6} gap={0.22} fit="left" />
            <span className="ab-label u-mt-5 u-text-2">
              <b>
                <L zh="服务器池 2" en="Server pool 2" />
              </b>{" "}
              · <L zh="新增" en="Added" />
            </span>
            <ShardMatrix className="!h-auto !w-full" cols={12} rows={4} k={10} m={2} seed={6} gap={0.22} fit="left" density={0} />
            <span className="self-end border-t border-ab-line u-pt-2 font-mono u-text-2 leading-snug text-ab-fg-2">
              <L zh="同一命名空间 · 同一 S3 端点" en="One namespace · one S3 endpoint" />
            </span>
          </div>
        </Stage>
      </Template>

      {/* 07 · Two columns */}
      <Template
        {...deck}
        span={6}
        title={t("07 两栏 · 问题与方法", "07 Two columns: problem and approach")}
        spec="1920 × 1080 · Paper"
        themes={["paper", "white", "ink"]}
        file="slide-07-two-columns"
        note={t(
          <><b>用途：</b>对照两组内容：问题与方法、现状与目标。两栏各 6 栏宽，逐行对应；右栏以 Signal Blue 底标示结论。</>,
          <><b>Use:</b> two sets side by side: problem and approach, today and target. Each column is six grid columns wide and the rows correspond; the right column carries the conclusion on Signal Blue.</>,
        )}
      >
        <Chrome n={7} section={<Part i={1} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-9")}>
            <L zh="数据持续增长，掌控不能减少" en="Data keeps growing; control must not shrink" />
          </h3>
          {[
            {
              head: <L zh="问题" en="The problem" />,
              box: "border border-ab-line bg-ab-panel",
              rows: [
                ["训练数据、检查点与日志持续增长", "Training data, checkpoints and logs keep growing"],
                ["数据须留在自有基础设施内", "Data has to stay on infrastructure you own"],
                ["磁盘故障是常态，不是例外", "Drive failures are routine, not exceptional"],
              ],
            },
            {
              head: <L zh="方法" en="Our approach" />,
              box: "bg-ab-data text-ab-on-data",
              rows: [
                ["按服务器池水平扩展，命名空间保持统一", "Scale out by server pools behind one namespace"],
                ["自托管、无遥测，以 Apache 2.0 许可开源", "Self-hosted, no telemetry, open source under Apache 2.0"],
                ["纠删码与自愈：任意 m 块盘故障，数据仍可读取", "Erasure coding and healing: data stays readable with any m drives lost"],
              ],
            },
          ].map((col, c) => (
            <div key={c} className={cn("col-span-6 row-start-2 grid grid-rows-[auto_repeat(3,minmax(0,1fr))]", col.box)}>
              <div className="flex items-baseline justify-between border-b border-current/20 u-px-4 u-py-3">
                <span className="ab-head u-text-4 [[data-lang=zh]_&]:tracking-[0.02em]">{col.head}</span>
                <span className="font-mono u-text-2 leading-none tracking-[0.08em] opacity-70">{c === 0 ? "A" : "B"}</span>
              </div>
              {col.rows.map(([zh, en], i) => (
                <div key={i} className={cn("grid grid-cols-[calc(var(--u)*5)_minmax(0,1fr)] items-center u-px-4", i > 0 && "border-t border-current/15")}>
                  <span className="font-mono u-text-2 opacity-70">{pad(i + 1)}</span>
                  <span className="u-text-3 leading-[1.35] font-medium">
                    <L zh={zh} en={en} />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </Stage>
      </Template>

      {/* 08 · Three features */}
      <Template
        {...deck}
        span={6}
        title={t("08 三项特性", "08 Three features")}
        spec="1920 × 1080 · Ink"
        themes={["ink", "paper", "white"]}
        file="slide-08-features"
        note={t(
          <><b>用途：</b>并列三项能力。图标取自品牌图标集，统一 1.5 线宽比例；每项一个名称、一段说明、一个状态示意。</>,
          <><b>Use:</b> three capabilities side by side. Icons come from the brand set at a consistent stroke; each item has a name, one paragraph and one state diagram.</>,
        )}
      >
        <Chrome n={8} section={<Part i={2} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-9")}>
            <L zh="数据保持完整的三重机制" en="Three mechanisms keep data whole" />
          </h3>
          {FEATURES.map((f, i) => (
            <div key={f.en} className="col-span-4 row-start-2 grid grid-rows-[auto_auto_minmax(0,1fr)_auto] u-gap-2.5 border-t border-ab-line u-pt-3.5">
              <div className="flex items-start justify-between">
                <Icon name={f.icon} strokeWidth={1.1} className="u-size-7 text-ab-brand" />
                <span className="font-mono u-text-2 text-ab-muted">{pad(i + 1)}</span>
              </div>
              <h4 className="ab-head u-text-4.25 [[data-lang=zh]_&]:tracking-[0.02em]">
                <L zh={f.zh} en={f.en} />
              </h4>
              <p className="u-pr-3 u-text-2.75 leading-[1.5] text-ab-fg-2">
                <L zh={f.dzh} en={f.den} />
              </p>
              <div className="flex items-center u-gap-2.5">
                <Shards s={f.shards} />
                <span className="font-mono u-text-2 leading-none text-ab-muted">
                  <L zh={f.czh} en={f.cen} />
                </span>
              </div>
            </div>
          ))}
        </Stage>
      </Template>

      {/* 09 · Big numbers */}
      <Template
        {...deck}
        span={6}
        title={t("09 大数字", "09 Big numbers")}
        spec="1920 × 1080 · Signal"
        themes={["signal", "ink", "paper"]}
        file="slide-09-numbers"
        note={t(
          <><b>用途：</b>以数字说明规模。一个主数字配三个次要数字；每个数字带单位或量词，页底注明来源与统计日期，演讲前按来源重新核对。</>,
          <><b>Use:</b> scale, told with numbers. One lead figure and three supporting ones; every figure carries a unit, and the source and date sit at the foot. Re-check against the source before each talk.</>,
        )}
      >
        <Chrome n={9} section={<Part i={2} />} />
        <Stage className={ROWS3}>
          <h3 className={cn(TITLE, "col-span-6")}>
            <L zh="社区与采用" en="Community and adoption" />
          </h3>
          <div className="col-span-7 row-start-2 grid content-end u-pb-1">
            <b className="ab-num u-text-24 leading-[0.78] tracking-[-0.04em]">2.7M+</b>
            <span className="ab-label u-mt-4 u-text-2.25">
              <L zh="全球实例" en="Instances worldwide" /> · <b>2,700,000+</b>
            </span>
          </div>
          <dl className="col-span-5 col-start-8 row-span-2 row-start-1 m-0 grid grid-rows-3">
            {[
              ["34,869", "GitHub Stars", "GitHub Stars"],
              ["15.15M", "Docker 拉取 · 15,154,618", "Docker pulls · 15,154,618"],
              ["7,094", "代码提交", "Commits"],
            ].map(([v, zh, en]) => (
              <div key={v} className="grid content-center u-gap-2 border-t border-ab-line">
                <dd className="m-0 ab-num u-text-8 leading-none">{v}</dd>
                <dt className="ab-label u-text-2">
                  <L zh={zh} en={en} />
                </dt>
              </div>
            ))}
          </dl>
          <p className="col-span-12 row-start-3 u-mt-4 border-t border-ab-line u-pt-2 font-mono u-text-2 leading-none text-ab-muted">
            <L zh="数据来源：RustFS 官方网站。统计日期：2026-10-14。" en="Source: the official RustFS website. As of 2026-10-14." />
          </p>
        </Stage>
      </Template>

      {/* 10 · Chart */}
      <Template
        {...deck}
        span={6}
        title={t("10 图表", "10 Chart")}
        spec="1920 × 1080 · White"
        themes={["white", "paper", "ink"]}
        file="slide-10-chart"
        note={t(
          <><b>用途：</b>柱状图。数值轴从 0 开始并按比例绘制；RustFS 使用 Signal Blue，对照系列使用中性灰；单位写在轴标题中。示例数据须保留「示例数据」标记，正式数据须注明测试条件与日期。</>,
          <><b>Use:</b> bar charts. The value axis starts at zero and is drawn to scale; RustFS is Signal Blue and the comparison series is neutral grey; the unit is in the axis title. Sample data keeps its Sample data label; real data states the test conditions and date.</>,
        )}
      >
        <Chrome n={10} section={<Part i={2} />} />
        <Stage className={ROWS3}>
          <h3 className={cn(TITLE, "col-span-8")}>
            <L zh="读取吞吐量随对象大小变化" en="Read throughput by object size" />
          </h3>
          <div className="col-span-4 col-start-9 self-start justify-self-end">
            <span className="inline-block bg-ab-fg u-px-2 u-py-1.25 font-mono u-text-2 leading-none font-medium tracking-[0.08em] text-ab-bg uppercase">
              <L zh="示例数据 · 非实测" en="Sample data · not measured" />
            </span>
          </div>
          <div className="col-span-12 row-start-2 grid content-end u-gap-3">
            <div className="flex items-center justify-between font-mono u-text-2 leading-none text-ab-muted">
              <span>
                <L zh="吞吐量 · GiB/s" en="Throughput · GiB/s" />
              </span>
              <span className="flex items-center u-gap-5 text-ab-fg-2">
                <span className="inline-flex items-center u-gap-1.25">
                  <i className="block u-size-2 bg-ab-data" />
                  RustFS
                </span>
                <span className="inline-flex items-center u-gap-1.25">
                  <i className="block u-size-2 bg-ab-fg/22" />
                  <L zh="对照系统" en="Comparison" />
                </span>
              </span>
            </div>
            <SampleChart />
          </div>
          <p className="col-span-12 row-start-3 u-mt-3 font-mono u-text-2 leading-none text-ab-muted">
            <L zh="示例数据，仅用于展示版式。正式图表须注明硬件、版本、并发数与测试日期。" en="Sample data, for layout only. Real charts state hardware, versions, concurrency and test date." />
          </p>
        </Stage>
      </Template>

      {/* 11 · Architecture */}
      <Template
        {...deck}
        span={6}
        title={t("11 架构图", "11 Architecture")}
        spec="1920 × 1080 · Paper"
        themes={["paper", "white", "ink"]}
        file="slide-11-architecture"
        note={t(
          <><b>用途：</b>系统结构。数据流自左向右；方框、1px 线与箭头构成全部图形，纠删集以分片矩阵绘制并标明 k + m。</>,
          <><b>Use:</b> system structure. Data flows left to right; boxes, 1px lines and arrows make up the whole drawing, and the erasure set is drawn as a shard matrix labelled with k + m.</>,
        )}
      >
        <Chrome n={11} section={<Part i={3} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-9")}>
            <L zh="从 S3 请求到磁盘" en="From S3 request to drive" />
          </h3>
          <div className="col-span-12 row-start-2 grid grid-cols-[calc(var(--u)*24)_calc(var(--u)*6)_calc(var(--u)*24)_calc(var(--u)*6)_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] u-gap-y-2">
            {[<L key="a" zh="客户端" en="Clients" />, null, "S3 API", null, <L key="b" zh="RustFS 集群 · 服务器池 1" en="RustFS cluster · server pool 1" />].map((h, i) => (
              <span key={i} className="ab-label u-text-2 leading-none">
                {h}
              </span>
            ))}
            <div className="grid grid-rows-3 u-gap-1.5">
              {(
                [
                  ["console", "应用", "Applications"],
                  ["terminal", "SDK 与 CLI", "SDKs and CLIs"],
                  ["chip", "AI 工作负载", "AI workloads"],
                ] as const
              ).map(([icon, zh, en]) => (
                <div key={en} className="grid content-center u-gap-1.25 border border-ab-line bg-ab-panel u-px-2.5">
                  <Icon name={icon} className="u-size-3.5 text-ab-brand" />
                  <span className="u-text-2.75 leading-tight font-medium">
                    <L zh={zh} en={en} />
                  </span>
                </div>
              ))}
            </div>
            <div className="grid place-items-center text-ab-muted">
              <Arrow className="w-[70%]" />
            </div>
            <div className="grid content-between bg-ab-data u-p-2.5 text-ab-on-data">
              <Icon name="api" strokeWidth={1.25} className="u-size-5" />
              <div className="grid u-gap-1.5">
                <b className="ab-head u-text-4 whitespace-nowrap">S3 API</b>
                <span className="font-mono u-text-2.25 leading-tight opacity-85">HTTP(S) :9000</span>
                <span className="u-text-2.5 leading-snug opacity-85">
                  <L zh="任一节点均可接收请求" en="Any node serves requests" />
                </span>
              </div>
            </div>
            <div className="grid place-items-center text-ab-muted">
              <Arrow className="w-[70%]" />
            </div>
            <div className="grid grid-rows-[minmax(0,1fr)_auto] u-gap-2.5 border border-ab-line u-p-3">
              <ErasureSet />
              <div className="flex items-center justify-between u-gap-3 border-t border-ab-line u-pt-2 font-mono u-text-2 leading-tight text-ab-fg-2">
                <span>
                  <b className="font-medium text-ab-fg">EC 12+4</b> · <L zh="16 块盘中任意 4 块故障，数据仍可读取" en="any 4 of 16 drives can fail; data stays readable" />
                </span>
                <span className="flex shrink-0 items-center u-gap-2.5 text-ab-muted">
                  <span className="inline-flex items-center u-gap-1">
                    <i className="block u-size-1.5 bg-ab-data" />
                    <L zh="数据" en="Data" />
                  </span>
                  <span className="inline-flex items-center u-gap-1">
                    <i className="block u-size-1.5 bg-ab-parity" />
                    <L zh="校验" en="Parity" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Stage>
      </Template>

      {/* 12 · Code */}
      <Template
        {...deck}
        span={6}
        title={t("12 代码", "12 Code")}
        spec="1920 × 1080 · Ink"
        themes={["ink", "paper"]}
        file="slide-12-code"
        note={t(
          <><b>用途：</b>命令与代码。终端字号不小于 28 px，一屏不超过 12 行；只使用官方文档中存在的命令，以注释说明结果，不得虚构程序输出。</>,
          <><b>Use:</b> commands and code. Terminal type is 28 px or larger, twelve lines at most; only commands from the official documentation, with results given as comments and no invented output.</>,
        )}
      >
        <Chrome n={12} section={<Part i={3} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-5")}>
            <L zh={<>三条命令<br />运行 RustFS</>} en="Run RustFS in three commands" />
          </h3>
          <dl className="col-span-4 row-start-2 m-0 grid content-start border-t border-ab-line">
            {[
              ["S3 API", "localhost:9000"],
              [<L key="c" zh="控制台" en="Console" />, "localhost:9001"],
            ].map(([k, v], i) => (
              <div key={i} className="grid u-gap-1 border-b border-ab-line u-py-2.5">
                <dt className="ab-label u-text-2">{k}</dt>
                <dd className="m-0 font-mono u-text-3 leading-tight">{v}</dd>
              </div>
            ))}
            <dd className="m-0 u-mt-3.5 u-text-2.75 leading-[1.5] text-ab-fg-2">
              <L zh="容器以 UID 10001 运行，数据与日志目录须对该用户可写。" en="The container runs as UID 10001; the data and log directories must be writable by that user." />
            </dd>
          </dl>
          <div className="ab-term col-span-7 col-start-6 row-span-2 row-start-1 grid grid-rows-[auto_minmax(0,1fr)]">
            <div className="flex items-center u-gap-1.25 border-b border-ab-line u-px-3 u-py-2 u-text-2 leading-none tracking-[0.04em] text-ab-muted">
              <i className="block u-size-1.25 bg-current opacity-45" />
              <i className="block u-size-1.25 bg-current opacity-45" />
              <i className="block u-size-1.25 bg-current opacity-45" />
              <span className="u-ml-1.5">~/rustfs</span>
            </div>
            <pre className="m-0 self-center u-px-4 u-py-3 font-mono u-text-2.75 leading-[1.62] whitespace-pre">
              <span className="dim">
                <L zh="# 数据目录须对 UID 10001 可写" en="# data dirs must be writable by UID 10001" />
              </span>
              {"\n"}
              <span className="pr">$</span> mkdir -p data logs
              {"\n"}
              <span className="pr">$</span> chown -R 10001:10001 data logs
              {"\n"}
              <span className="pr">$</span> docker run -d -p 9000:9000 -p 9001:9001 \{"\n"}
              {"    "}-v $(pwd)/data:/data \{"\n"}
              {"    "}-v $(pwd)/logs:/logs \{"\n"}
              {"    "}rustfs/rustfs:latest
              {"\n\n"}
              <span className="dim"># S3 API   </span>
              <span className="ok">http://localhost:9000</span>
              {"\n"}
              <span className="dim"># Console  </span>
              <span className="ok">http://localhost:9001</span>
            </pre>
          </div>
        </Stage>
      </Template>

      {/* 13 · Comparison table */}
      <Template
        {...deck}
        span={6}
        title={t("13 对比表", "13 Comparison table")}
        spec="1920 × 1080 · White"
        themes={["white", "paper", "ink"]}
        file="slide-13-comparison"
        note={t(
          <><b>用途：</b>选型对照。只比较可核实的类别，用语中立；不点名、不贬低其他产品。具体产品的信息以其官方文档为准。</>,
          <><b>Use:</b> evaluations. Compare only categories that can be verified, in neutral wording; never name or disparage another product. For any specific product, its official documentation is the reference.</>,
        )}
      >
        <Chrome n={13} section={<Part i={3} />} />
        <Stage className={ROWS3}>
          <h3 className={cn(TITLE, "col-span-10")}>
            <L zh="选型对照：只比可验证的事实" en="Comparison: verifiable facts only" />
          </h3>
          <div className="col-span-12 row-start-2 grid grid-cols-[3fr_6fr_3fr] grid-rows-[auto_repeat(4,minmax(0,1fr))] self-stretch">
            <span className="ab-label self-end u-pb-2 u-text-2">
              <L zh="类别" en="Category" />
            </span>
            <span className="self-end border-t-[calc(var(--u)*0.75)] border-ab-data bg-ab-data/8 u-px-3 u-pt-2.5 u-pb-2 ab-head u-text-3.75">RustFS</span>
            <span className="self-end u-px-3 u-pb-2 ab-label u-text-2">
              <L zh="其他对象存储" en="Other object storage" />
            </span>
            {[
              ["许可证", "License", "Apache License 2.0", "Apache License 2.0"],
              ["实现语言", "Implementation language", "Rust · 内存安全", "Rust · memory-safe"],
              ["遥测", "Telemetry", "无", "None"],
              ["S3 API", "S3 API", "兼容 · 以官方兼容性矩阵为准", "Compatible · per the official compatibility matrix"],
            ].map(([kz, ke, vz, ve]) => (
              <div key={ke} className="col-span-3 grid grid-cols-subgrid items-center border-t border-ab-line">
                <span className="u-text-3 font-semibold">
                  <L zh={kz} en={ke} />
                </span>
                <span className="flex h-full items-center u-gap-2 bg-ab-data/8 u-px-3 u-text-3 leading-snug">
                  <i className="block u-size-1.25 shrink-0 bg-ab-data" />
                  <L zh={vz} en={ve} />
                </span>
                <span className="u-px-3 u-text-3 text-ab-muted">
                  <L zh="因产品而异" en="Varies by product" />
                </span>
              </div>
            ))}
          </div>
          <p className="col-span-12 row-start-3 u-mt-3 border-t border-ab-line u-pt-2 font-mono u-text-2 leading-none text-ab-muted">
            <L zh="仅列可核实的类别。具体产品的对应信息以其官方文档为准。" en="Only verifiable categories are listed. For a specific product, refer to its official documentation." />
          </p>
        </Stage>
      </Template>

      {/* 14 · Principle */}
      <Template
        {...deck}
        span={6}
        title={t("14 原则引语", "14 Principle")}
        spec="1920 × 1080 · Signal"
        themes={["signal", "ink", "paper"]}
        file="slide-14-principle"
        note={t(
          <><b>用途：</b>引语页。引文只取自 RustFS 设计原则、官方文档或经本人书面确认的发言，并注明出处；不得虚构人物或引语。</>,
          <><b>Use:</b> quotations. Quote only the RustFS design principles, the official documentation or remarks the speaker has approved in writing, always with attribution; never invent a person or a quote.</>,
        )}
      >
        <Chrome n={14} section={<Part i={4} />} />
        <Stage className="grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="col-span-12 flex items-start justify-between">
            <span aria-hidden="true" className="block u-h-9 overflow-hidden font-display u-text-24 leading-[0.86] font-extrabold text-ab-brand [font-stretch:125%]">
              “
            </span>
            <span className="ab-label u-text-2.25">
              <L zh="设计原则" en="Design principle" /> · <b>02</b> / 04
            </span>
          </div>
          <blockquote className="col-span-12 row-start-2 m-0 self-center">
            <p className="m-0">
              <L
                zh={<span className="ab-zh block u-text-14 leading-[1.1] tracking-[0.04em]">精确胜过响亮。</span>}
                en={<span className="ab-display block u-text-13 leading-[0.95] tracking-[-0.035em]">Exact over loud.</span>}
              />
            </p>
            <p className="m-0 u-mt-6 max-w-[30em] u-text-3.5 leading-[1.45] text-ab-fg-2 [[data-lang=en]_&]:max-w-[34em]">
              <L
                zh={
                  <>
                    用真实数字代替形容词。数字须标注单位、来源与统计日期；
                    <br />
                    性能数据只使用同环境实测，并注明测试条件。
                  </>
                }
                en="Replace adjectives with real numbers. Every figure carries a unit, a source and a date; performance figures come only from like-for-like runs, with the conditions stated."
              />
            </p>
          </blockquote>
          <span className="col-span-12 row-start-3 flex items-center u-gap-2.5 font-mono u-text-2.25 leading-none text-ab-fg">
            <i className="block u-h-0.25 u-w-6 bg-current" />
            <L zh="RustFS 设计原则" en="RustFS design principles" />
          </span>
        </Stage>
      </Template>

      {/* 15 · Timeline */}
      <Template
        {...deck}
        span={6}
        title={t("15 时间线", "15 Timeline")}
        spec="1920 × 1080 · Ink"
        themes={["ink", "paper", "white"]}
        file="slide-15-timeline"
        note={t(
          <><b>用途：</b>里程碑。日期使用 YYYY-MM-DD；只列已发生的事件，尚未确定日期的项目不写日期。唯一的 Oxide 节点标记最重要的里程碑。</>,
          <><b>Use:</b> milestones. Dates are YYYY-MM-DD; list only what has happened, and leave undated items undated. The single Oxide marker flags the milestone that matters most.</>,
        )}
      >
        <Chrome n={15} section={<Part i={4} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-9")}>
            <L zh="里程碑" en="Milestones" />
          </h3>
          <div className="relative col-span-12 row-start-2 grid grid-cols-4 grid-rows-[calc(var(--u)*5)_calc(var(--u)*6)_auto_auto] self-center u-gap-x-2.25">
            <i className="absolute left-0 u-top-8 block h-[2px] w-[calc(75%+var(--u)*1.6875)] -translate-y-1/2 bg-ab-fg/35" />
            <i className="absolute right-0 left-[calc(75%+var(--u)*1.6875)] u-top-8 block h-0 -translate-y-1/2 border-t-2 border-dashed border-ab-fg/35" />
            {MILESTONES.map((m) => (
              <div key={m.zh} className="relative row-span-4 grid grid-rows-subgrid u-pr-2">
                <span className={cn("self-center font-mono u-text-2.5 leading-none", m.tone === "now" ? "text-ab-brand" : "text-ab-fg-2")}>
                  {m.date ?? <L zh="当前版本" en="Current" />}
                </span>
                <span className="flex items-center">
                  <i
                    className={cn(
                      "block",
                      m.tone === "data" && "u-size-2.5 bg-ab-data",
                      m.tone === "focus" && "u-size-3.5 bg-ab-parity",
                      m.tone === "now" && "u-size-3.5 border-[calc(var(--u)*0.5)] border-ab-data bg-ab-bg",
                    )}
                  />
                </span>
                <b className={cn("ab-head u-mt-2.5 u-text-3.75 [[data-lang=zh]_&]:tracking-[0.02em]", m.tone === "now" && "ab-num")}>
                  <L zh={m.zh} en={m.en} />
                </b>
                <span className="u-mt-1.5 u-text-2.75 leading-[1.45] text-ab-fg-2">
                  <L zh={m.dzh} en={m.den} />
                </span>
              </div>
            ))}
          </div>
        </Stage>
      </Template>

      {/* 16 · Speakers */}
      <Template
        {...deck}
        span={6}
        title={t("16 演讲者与团队", "16 Speakers and team")}
        spec="1920 × 1080 · White"
        themes={["white", "paper", "ink"]}
        file="slide-16-team"
        note={t(
          <><b>用途：</b>演讲者或团队介绍。照片为 1:1 方形裁切，统一取景与色调；姓名、职位与账号须经本人确认后填写。</>,
          <><b>Use:</b> speakers or the team. Photos are square crops with consistent framing and tone; names, roles and handles are filled in only after each person has approved them.</>,
        )}
      >
        <Chrome n={16} section={<Part i={4} />} />
        <Stage className={ROWS}>
          <h3 className={cn(TITLE, "col-span-9")}>
            <L zh="演讲者与团队" en="Speakers and team" />
          </h3>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="col-span-3 row-start-2 grid content-end u-gap-1.5">
              <Placeholder className="mb-[calc(var(--u)*1.5)] aspect-square w-[78%] gap-[calc(var(--u)*1.5)] content-center">
                <Icon name="user" strokeWidth={1} className="u-size-7" />
                <L zh="照片 · 1:1" en="Photo · 1:1" />
              </Placeholder>
              <b className="u-text-3.25 leading-tight font-semibold">{i === 0 ? <L zh="演讲者姓名" en="Speaker name" /> : <L zh="成员姓名" en="Team member" />}</b>
              <span className="u-text-2.75 leading-tight text-ab-fg-2">
                <L zh="职位 · 机构" en="Role · Organisation" />
              </span>
              <span className="font-mono u-text-2 leading-tight text-ab-muted">
                <L zh="github.com/用户名" en="github.com/username" />
              </span>
            </div>
          ))}
        </Stage>
      </Template>

      {/* 17 · Image + caption */}
      <Template
        {...deck}
        span={6}
        title={t("17 图片 + 说明", "17 Image and caption")}
        spec="1920 × 1080 · Paper"
        themes={["paper", "white", "ink"]}
        file="slide-17-image"
        note={t(
          <><b>用途：</b>产品截图或现场照片。截图须来自真实界面，置于带地址栏的直角框内；说明文字位于右侧 4 栏，底部对齐。</>,
          <><b>Use:</b> product screenshots or event photos. Screenshots come from the real interface and sit in a square-cornered frame with an address bar; the caption takes the right four columns, aligned to the bottom.</>,
        )}
      >
        <Chrome n={17} section={<Part i={4} />} />
        <Stage>
          <figure className="col-span-8 m-0 grid grid-rows-[auto_minmax(0,1fr)] border border-ab-line bg-ab-panel">
            <div className="flex items-center u-gap-1.25 border-b border-ab-line u-px-2.5 u-py-1.75 font-mono u-text-2 leading-none text-ab-muted">
              <i className="block u-size-1.25 bg-current opacity-45" />
              <i className="block u-size-1.25 bg-current opacity-45" />
              <i className="block u-size-1.25 bg-current opacity-45" />
              <span className="u-ml-2 border border-ab-line u-px-2 u-py-0.75">localhost:9001</span>
            </div>
            <div className="relative overflow-hidden">
              <ShardMatrix className="absolute inset-0 !h-full !w-full" cols={26} rows={14} k={10} m={2} seed={14} density={0} gap={0.3} fit="slice" />
              <Placeholder className="absolute inset-[calc(var(--u)*4.5)] content-center gap-[calc(var(--u)*1.75)] bg-ab-panel">
                <Icon name="image" strokeWidth={1} className="u-size-6" />
                <L zh="截图 · 16:10 · 不小于 2560 × 1600" en="Screenshot · 16:10 · 2560 × 1600 or larger" />
              </Placeholder>
            </div>
          </figure>
          <figcaption className="col-span-4 col-start-9 grid content-end u-gap-3 u-pl-2">
            <span className="ab-label u-text-2">
              <L zh="图" en="Fig." /> <b>01</b>
            </span>
            <b className="ab-head u-text-5.5 [[data-lang=zh]_&]:tracking-[0.02em]">
              <L zh="Web 控制台" en="Web Console" />
            </b>
            <span className="u-text-3 leading-[1.45] text-ab-fg-2">
              <L zh="在浏览器中管理存储桶、访问策略与用户。" en="Manage buckets, access policies and users in the browser." />
            </span>
            <span className="u-mt-2 border-t border-ab-line u-pt-2 font-mono u-text-2 leading-none text-ab-muted">http://localhost:9001</span>
          </figcaption>
        </Stage>
      </Template>

      {/* 18 · Closing */}
      <Template
        {...deck}
        span={12}
        title={t("18 结束页", "18 Closing")}
        spec={t("1920 × 1080 · 结束 · Ink", "1920 × 1080 · Closing · Ink")}
        themes={["ink", "signal", "paper"]}
        file="slide-18-closing"
        note={t(
          <><b>用途：</b>演讲结束。二维码指向 rustfs.com，置于白色底块上以保证识别；链接只列官方地址。最后一页不显示页码。</>,
          <><b>Use:</b> the end of the talk. The QR code points to rustfs.com and sits on a white tile so it scans reliably; links are official addresses only. The last slide carries no slide number.</>,
        )}
      >
        {/* right panel: three columns plus the margin, bleeding off the edge */}
        <div className="absolute inset-y-0 right-0 flex w-[calc((100%-var(--m)*2+var(--u)*2.25)/4+var(--m))] flex-col justify-between bg-ab-data py-(--m) pr-(--m) u-pl-2.25 text-ab-on-data">
          <span className="ab-label u-text-2.25 text-current [&_b]:text-current">
            RustFS 1.0 · <b><L zh="活动名称" en="Event name" /></b>
          </span>
          <div className="grid justify-items-start u-gap-2.5">
            <QR value="https://rustfs.com" quiet={2} className="u-size-30 bg-white text-neutral-950 outline-1 -outline-offset-1 outline-ab-line" />
            <span className="font-mono u-text-2.25 leading-none">
              <L zh="扫码访问 rustfs.com" en="Scan for rustfs.com" />
            </span>
          </div>
        </div>
        <div className="ab-frame right-[calc((100%-var(--m)*2+var(--u)*2.25)/4+var(--m)+var(--u)*2.25)]">
          <Wordmark className="ab-logo u-h-4.25" />
          <div>
            <h2 className="m-0">
              <L zh={<span className="ab-zh block u-text-20 leading-none tracking-[0.04em]">谢谢</span>} en={<span className="ab-display block u-text-16 leading-[0.86] tracking-[-0.04em]">Thank you</span>} />
            </h2>
            <p className="u-mt-6 u-text-3.25 text-ab-fg-2">
              <L zh="演讲者姓名 · 邮箱或社交账号" en="Speaker name · email or handle" />
            </p>
          </div>
          <div className="flex u-gap-8 border-t border-ab-line u-pt-3">
            {(
              [
                ["globe", "官网", "Website", "rustfs.com"],
                ["layers", "文档", "Docs", "docs.rustfs.com"],
                ["branch", "源代码", "Source", "github.com/rustfs/rustfs"],
              ] as const
            ).map(([icon, zh, en, url]) => (
              <div key={url} className="grid u-gap-1.5">
                <span className="ab-label flex items-center u-gap-1 u-text-2">
                  <Icon name={icon} className="u-size-2.75 text-ab-brand" />
                  <L zh={zh} en={en} />
                </span>
                <span className="font-mono u-text-2.75 leading-none">{url}</span>
              </div>
            ))}
          </div>
        </div>
      </Template>
    </TemplateGrid>
  )
}

