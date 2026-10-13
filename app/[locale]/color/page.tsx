import type { Metadata } from "next"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import { DoDont, Note, Page, PageFooter, PageHeader, Section, Sub, Table } from "@/components/site/page"
import { CopyChip } from "@/components/site/swatch"
import { contrast, grade, oklchString, onColor, rgbString } from "@/lib/color"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { dataviz, scales, semantic } from "@/lib/tokens"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "色彩" : "Color" }
}

const INK = "#0B0E14"
const WHITE = "#FFFFFF"

export default async function ColorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  const brand = [
    { name: "Signal Blue", token: "blue-500", hex: "#0062FF", cmyk: "C90 M60 Y0 K0", zh: "主品牌色。承载标志、主要操作、链接与数据块。是唯一的品牌蓝。", en: "The primary brand colour. Carries the logo, primary actions, links and data shards. It is the only brand blue." },
    { name: "Oxide", token: "oxide-500", hex: "#FF5E14", cmyk: "C0 M70 Y95 K0", zh: "校验色。只标记校验块与画面中唯一的焦点，面积约 10%。不用于错误提示。", en: "The parity colour. Marks parity and the single focal point, at about 10% of the area. Never used for errors." },
    { name: "Ink", token: "neutral-950", hex: "#0B0E14", cmyk: "C60 M40 Y20 K100", zh: "深色底与正文色。带轻微蓝偏的近黑色。", en: "Dark surface and text colour, a near-black with a slight blue bias." },
    { name: "Paper", token: "neutral-50", hex: "#F4F6F9", cmyk: "—", zh: "浅色底与分区底色。", en: "Light surface and section background." },
  ]

  const roleNote: Record<string, [string, string]> = {
    background: ["页面底色", "Page background"],
    foreground: ["正文与标题", "Body text and headings"],
    card: ["卡片与面板", "Cards and panels"],
    popover: ["浮层", "Overlays"],
    primary: ["主要操作（Signal Blue）", "Primary actions (Signal Blue)"],
    secondary: ["次要按钮底色", "Secondary buttons"],
    muted: ["弱化区域底色", "Muted areas"],
    "muted-foreground": ["辅助文字（≥ 4.5:1）", "Supporting text (≥ 4.5:1)"],
    accent: ["悬停与选中底色", "Hover and selected states"],
    destructive: ["破坏性操作与错误", "Destructive actions and errors"],
    border: ["分隔线与边框", "Rules and borders"],
    input: ["输入框边框", "Input borders"],
    ring: ["焦点环", "Focus ring"],
    brand: ["品牌色块与图形", "Brand fills and graphics"],
    link: ["正文链接", "Inline links"],
    parity: ["校验块与唯一焦点", "Parity and the single focal point"],
    "parity-text": ["Oxide 文字（≥ 4.5:1）", "Oxide text (≥ 4.5:1)"],
    subtle: ["次级正文", "Secondary body text"],
    faint: ["占位与禁用（非必要信息）", "Placeholders and disabled (non-essential)"],
    strong: ["强调边框", "Strong borders"],
    surface: ["分区底色", "Section surface"],
    "surface-2": ["二级分区底色", "Second surface"],
    success: ["在线 · 健康", "Online · healthy"],
    warning: ["降级", "Degraded"],
    danger: ["离线 · 错误", "Offline · error"],
    info: ["信息 · 修复中", "Info · healing"],
    stage: ["深色展示区（两种主题下均为深色）", "Dark stage (dark in both themes)"],
    selection: ["文字选区", "Text selection"],
  }

  const status = [
    { zh: "在线", en: "Online", fill: "#02A855", light: "#037E3F", dark: "#02A855", note: ["盘与节点正常", "Drive or node healthy"] },
    { zh: "修复中", en: "Healing", fill: "#0062FF", light: "#014FDD", dark: "#5C99FF", note: ["正在从校验块重建", "Rebuilding from parity"], heal: true },
    { zh: "降级", en: "Degraded", fill: "#F7AE0C", light: "#A06604", dark: "#F7AE0C", note: ["冗余低于配置", "Redundancy below configuration"] },
    { zh: "离线", en: "Offline", fill: "#E42E41", light: "#C51B32", dark: "#FF6B78", note: ["不可用，需要处理", "Unavailable, needs action"] },
    { zh: "校验 · 预览", en: "Parity · Preview", fill: "#FF5E14", light: "#B33A10", dark: "#FE8F5D", note: ["校验块；预览功能标记", "Parity; preview feature marker"] },
  ]

  const texts = [
    ["Ink", "#0B0E14"],
    ["Neutral 700", "#424853"],
    ["Neutral 600", "#5A616D"],
    ["Neutral 500", "#757C88"],
    ["Neutral 400", "#9AA0AC"],
    ["Neutral 300", "#C4C9D2"],
    ["White", "#FFFFFF"],
    ["Blue 600", "#014FDD"],
    ["Blue 500", "#0062FF"],
    ["Blue 400", "#5C99FF"],
    ["Oxide 700", "#B33A10"],
    ["Oxide 500", "#FF5E14"],
    ["Oxide 400", "#FE8F5D"],
  ]
  const grounds = [
    ["White", "#FFFFFF"],
    ["Paper", "#F4F6F9"],
    ["Ink", "#0B0E14"],
    ["Signal", "#0062FF"],
  ]

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/color/"
        label="Guidelines · Color"
        title={t("色彩", "Color")}
        subtitle={t("Color", "色彩")}
        lede={t(
          "RustFS 的色彩取自纠删码的结构：Signal Blue 是承载数据的数据块，Oxide 是少量而关键的校验块，中性色是承载一切的盘。三者的面积比例约为 30 : 10 : 60。",
          "RustFS colour follows the structure of erasure coding. Signal Blue is the data shard that carries the content, Oxide is the small but critical parity shard, and the neutrals are the drives everything sits on. Their areas stand at roughly 30 : 10 : 60.",
        )}
        meta={[
          { k: t("品牌色", "Brand"), v: "Signal #0062FF" },
          { k: t("校验色", "Parity"), v: "Oxide #FF5E14" },
          { k: t("色阶", "Scales"), v: "3 × 11–15" },
          { k: t("标准", "Standard"), v: "WCAG 2.2 AA" },
        ]}
      />

      <Section id="brand" tag="Brand colours" title={t("品牌色", "Brand colours")} lede={<p>{t("四个品牌色构成所有画面的基础。点击色值即可复制。CMYK 为印刷参考值，须以实际打样为准。", "Four brand colours underpin every layout. Click a value to copy it. CMYK values are references for print and must be confirmed against a physical proof.")}</p>}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {brand.map((c, i) => (
            <div key={c.name} className={cn("grid min-w-0 grid-rows-[minmax(220px,1fr)_auto] bg-background", i === 0 && "sm:col-span-2 lg:col-span-1")}>
              <CopyChip value={c.hex} className="relative grid content-between p-5 outline-none" style={{ background: c.hex, color: onColor(c.hex) }}>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase opacity-80">{c.token}</span>
                <span className="grid gap-1">
                  <span className="font-display text-[clamp(26px,2.6vw,36px)] leading-none font-extrabold tracking-[-0.01em] [font-stretch:112%]">{c.name}</span>
                  <span className="font-mono text-sm">{c.hex}</span>
                </span>
              </CopyChip>
              <div className="grid gap-3 p-5 text-sm leading-relaxed">
                <p className="text-subtle">{t(c.zh, c.en)}</p>
                <dl className="m-0 grid grid-cols-[64px_1fr] gap-x-3 gap-y-1 font-mono text-xs">
                  <dt className="text-muted-foreground">RGB</dt>
                  <dd className="m-0">{rgbString(c.hex)}</dd>
                  <dt className="text-muted-foreground">OKLCH</dt>
                  <dd className="m-0">{oklchString(c.hex)}</dd>
                  <dt className="text-muted-foreground">CMYK</dt>
                  <dd className="m-0">{c.cmyk}</dd>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="proportion"
        tag="Proportion"
        title={t("用色比例", "Proportion")}
        lede={<p>{t("中性色约占 60%，Signal Blue 约占 30%，Oxide 不超过 10%。一个画面中 Oxide 只能出现一个主焦点。三种底色用于区分场景，比例规则保持不变。", "Neutrals take about 60%, Signal Blue about 30% and Oxide no more than 10%. A layout has at most one Oxide focal point. The three surfaces distinguish contexts; the proportion rule stays the same on each.")}</p>}
      >
        <div className="grid gap-3">
          <div className="grid h-16 grid-cols-10 gap-1.5">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={i < 6 ? "border border-border bg-surface-2" : i < 9 ? "bg-blue-500" : "bg-oxide-500"} />
            ))}
          </div>
          <div className="grid grid-cols-10 font-mono text-xs text-muted-foreground">
            <span className="col-span-6">{t("中性 60%", "Neutral 60%")}</span>
            <span className="col-span-3">Signal 30%</span>
            <span>Oxide 10%</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Ink", bg: "#0B0E14", fg: "#FFFFFF", sub: "#9AA0AC", logo: "#FFFFFF", data: "#0062FF", parity: "#FF5E14", zh: "默认的品牌展示底色：发布、活动、视频。", en: "The default stage: releases, events, video." },
            { name: "Paper", bg: "#F4F6F9", fg: "#0B0E14", sub: "#5A616D", logo: "#0062FF", data: "#0062FF", parity: "#FF5E14", zh: "技术内容与文档：教程、深度文章、报告。", en: "Technical content: tutorials, deep dives, reports." },
            { name: "Signal", bg: "#0062FF", fg: "#FFFFFF", sub: "rgba(255,255,255,.78)", logo: "#FFFFFF", data: "#FFFFFF", parity: "#0B0E14", zh: "公告与号召：合作、里程碑、行动号召。Oxide 不出现在 Signal 底色上，校验块改用 Ink。", en: "Announcements and calls to action. Oxide never sits on Signal; parity turns Ink." },
          ].map((s) => (
            <figure key={s.name} className="m-0 grid border border-border">
              <div className="relative grid aspect-[4/3] content-between overflow-hidden p-5" style={{ background: s.bg, color: s.fg, ["--mx-data" as string]: s.data, ["--mx-parity" as string]: s.parity }}>
                <Wordmark className="h-4 w-auto" fill={s.logo} />
                <ShardMatrix className="absolute top-0 right-0 !h-full !w-[38%]" cols={3} rows={6} k={4} m={2} seed={5} fit="slice" gap={0.25} />
                <div className="relative grid max-w-[60%] gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase" style={{ color: s.sub }}>Release · 2026-10</span>
                  <span className="font-display text-[clamp(22px,2.4vw,30px)] leading-none font-extrabold [font-stretch:125%]">1.0.1</span>
                </div>
              </div>
              <figcaption className="grid gap-1 border-t border-border px-4 py-3 text-sm leading-relaxed text-subtle">
                <b className="font-mono text-xs font-medium tracking-[0.06em] text-foreground uppercase">{s.name}</b>
                {t(s.zh, s.en)}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="scales" tag="Scales" title={t("色阶", "Scales")} lede={<p>{t("每个色阶在 OKLCH 空间中按等感知亮度生成，500 为锚点。色块下方标注其与白色、Ink 的对比度；标有 AA 的组合可用于正文。", "Each scale is built in OKLCH with even perceptual steps, anchored at 500. Below each chip are its contrast ratios against White and Ink; pairs marked AA are safe for body text.")}</p>}>
        {([
          ["blue", "Signal Blue", t("500 为标志色。浅色背景上的小号文字与链接使用 600，深色背景上使用 400。", "500 is the logo colour. Small text and links use 600 on light backgrounds and 400 on dark ones.")],
          ["oxide", "Oxide", t("500 仅用于图形与大面积色块，不用于小号文字。Oxide 文字在浅色背景上用 700，深色背景上用 400。", "500 is for graphics and fills, never small text. Oxide text uses 700 on light backgrounds and 400 on dark.")],
          ["neutral", "Neutral", t("带 262° 蓝色色相的冷灰。950 为 Ink，50 为 Paper。辅助文字在浅色背景上不浅于 600。", "A cool grey at hue 262°. 950 is Ink and 50 is Paper. Supporting text on light backgrounds is never lighter than 600.")],
        ] as const).map(([key, name, note]) => (
          <Sub key={key} title={name} aside={note}>
            <div className="grid grid-cols-3 gap-px border border-border bg-border sm:grid-cols-6 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr">
              {scales[key].map((st) => {
                const w = contrast(st.hex, WHITE)
                const k = contrast(st.hex, INK)
                return (
                  <CopyChip key={st.step} value={st.hex} className="grid min-w-0 bg-background">
                    <span className="grid h-20 content-end p-2 font-mono text-[11px]" style={{ background: st.hex, color: onColor(st.hex) }}>
                      {st.step}
                    </span>
                    <span className="grid gap-0.5 p-2 font-mono text-[11px] leading-tight">
                      <span className="text-foreground">{st.hex}</span>
                      <span className={cn("text-muted-foreground", w >= 4.5 && "text-foreground")}>W {w.toFixed(2)}{w >= 4.5 ? " AA" : ""}</span>
                      <span className={cn("text-muted-foreground", k >= 4.5 && "text-foreground")}>K {k.toFixed(2)}{k >= 4.5 ? " AA" : ""}</span>
                    </span>
                  </CopyChip>
                )
              })}
            </div>
          </Sub>
        ))}
      </Section>

      <Section id="status" tag="Status" title={t("状态色", "Status colours")} lede={<p>{t("状态色描述盘、节点与集群的健康状态，与品牌色分开使用。状态始终同时以文字与方形标记表达，不只依赖颜色。", "Status colours describe the health of drives, nodes and clusters and are kept apart from brand colour. State is always expressed with a label and a square marker, never by colour alone.")}</p>}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {status.map((s) => (
            <div key={s.en} className="grid gap-4 bg-background p-5">
              <span className="inline-flex items-center gap-2.5 text-sm font-semibold">
                <i className={cn("size-3", s.heal && "animate-pulse")} style={{ background: s.fill }} />
                {t(s.zh, s.en)}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(s.note[0], s.note[1])}</p>
              <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[11px]">
                <dt className="text-muted-foreground">{t("填充", "Fill")}</dt>
                <dd className="m-0">{s.fill}</dd>
                <dt className="text-muted-foreground">{t("文字 · 浅", "Text · light")}</dt>
                <dd className="m-0" style={{ color: s.light }}>{s.light}</dd>
                <dt className="text-muted-foreground">{t("文字 · 深", "Text · dark")}</dt>
                <dd className="m-0">{s.dark}</dd>
              </dl>
            </div>
          ))}
        </div>
        <Note tone="parity">{t("Oxide 不得用于错误或告警。错误使用红色，告警使用琥珀色；Oxide 只表示校验与需要首先看到的那一个点。", "Oxide must never signal an error or a warning. Errors are red and warnings amber; Oxide only means parity or the one thing to see first.")}</Note>
      </Section>

      <Section id="semantic" tag="Semantic tokens" title={t("语义色", "Semantic colours")} lede={<p>{t("界面与网站通过语义色引用颜色，而不直接使用色阶。语义色名称与 shadcn/ui 一致，深浅两套主题各有一组取值。", "Interfaces and websites reference colour through semantic roles, never through raw scale steps. Role names match shadcn/ui, and each role has a value for the light and the dark theme.")}</p>}>
        <Table
          head={[t("角色", "Role"), t("浅色主题", "Light"), t("深色主题", "Dark"), t("用途", "Use")]}
          rows={semantic.light
            .filter((r) => !r.name.startsWith("sidebar") && !r.name.startsWith("chart") && !r.name.endsWith("-foreground") || r.name === "muted-foreground")
            .map((r) => {
              const d = semantic.dark.find((x) => x.name === r.name)!
              const n = roleNote[r.name]
              return [
                <code key="n" className="!bg-transparent !p-0 font-mono text-[13px]">--{r.name}</code>,
                <Chip key="l" hex={r.hex} note={r.ref} />,
                <Chip key="d" hex={d.hex} note={d.ref} />,
                n ? t(n[0], n[1]) : "",
              ]
            })}
        />
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">{t("完整列表（含 *-foreground、chart-*、sidebar-*）见 Design Tokens 页。", "The full list, including *-foreground, chart-* and sidebar-*, is on the Design tokens page.")}</p>
      </Section>

      <Section id="contrast" tag="Contrast" title={t("对比度", "Contrast")} lede={<p>{t("正文须达到 4.5 : 1，18px 以上粗体或 24px 以上的大字须达到 3 : 1。下表列出常用文字色在四种底色上的对比度。", "Body text must reach 4.5 : 1. Large text — 18px bold or 24px and above — must reach 3 : 1. The matrix lists common text colours on the four surfaces.")}</p>}>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] border-collapse font-mono text-xs">
            <thead>
              <tr>
                <th className="border-b border-border bg-surface px-3 py-3 text-left font-medium tracking-[0.06em] text-muted-foreground uppercase">{t("文字 \\ 底色", "Text \\ ground")}</th>
                {grounds.map(([n, hex]) => (
                  <th key={n} className="border-b border-l border-border px-3 py-3 text-left font-medium" style={{ background: hex, color: onColor(hex) }}>
                    {n}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {texts.map(([n, fg]) => (
                <tr key={n}>
                  <td className="border-b border-border px-3 py-2.5 whitespace-nowrap">
                    <span className="mr-2 inline-block size-2.5 align-[-1px] shadow-[inset_0_0_0_1px_rgba(127,127,127,0.35)]" style={{ background: fg }} />
                    {n}
                  </td>
                  {grounds.map(([g, bg]) => {
                    const r = contrast(fg, bg)
                    const gr = grade(r)
                    return (
                      <td key={g} className="border-b border-l border-border px-3 py-2.5 whitespace-nowrap" style={{ background: bg, color: fg }}>
                        <span className={cn(gr === "—" && "opacity-45")}>{r.toFixed(2)}</span>
                        <span className="ml-2 text-[10px]" style={{ color: onColor(bg), opacity: gr === "—" ? 0.45 : 0.8 }}>{gr === "AA18" ? t("大字", "Large") : gr}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="dataviz" tag="Data colours" title={t("数据色", "Data colours")} lede={<p>{t("图表按以下顺序取色。RustFS 永远是第 1 色；对比其它系统时，其它系列使用中性色。", "Charts take colours in this order. RustFS is always series 1; when comparing with other systems, the other series use neutrals.")}</p>}>
        <div className="grid grid-cols-4 gap-px border border-border bg-border sm:grid-cols-8">
          {dataviz.map((d) => (
            <CopyChip key={d.index} value={d.hex} className="grid bg-background">
              <span className="grid h-24 content-between p-2.5 font-mono text-[11px]" style={{ background: d.hex, color: onColor(d.hex) }}>
                <span>{String(d.index).padStart(2, "0")}</span>
              </span>
              <span className="p-2.5 font-mono text-[11px]">{d.hex}</span>
            </CopyChip>
          ))}
        </div>
      </Section>

      <Section id="rules" tag="Do & Don't" title={t("用色规则", "Colour rules")}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="ink" caption={t("大面积中性色，Signal 承载内容，Oxide 只标记一个焦点。", "Large neutral areas, Signal carrying content, Oxide marking one focal point.")}>
            <div className="flex items-end gap-6 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
              <Stripe className="text-[18px]" />
              <span className="font-display text-3xl font-extrabold text-white [font-stretch:125%]">EC 4+2</span>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="bg-[linear-gradient(120deg,#7C3AED,#2563EB_45%,#06B6D4)]" caption={t("紫蓝渐变、霓虹光晕与非品牌色。", "Purple-to-blue gradients, neon glows and off-brand colours.")}>
            <span className="font-display text-3xl font-extrabold text-white [font-stretch:125%] [text-shadow:0_0_24px_rgba(255,255,255,.7)]">RustFS</span>
          </DoDont>
          <DoDont kind="do" on="white" caption={t("错误使用红色并配文字说明。", "Errors use red with a text label.")}>
            <span className="inline-flex items-center gap-2.5 border border-neutral-200 px-3 py-2 text-sm text-neutral-950"><i className="size-2.5 bg-red-500" />{t("盘 07 离线", "Drive 07 offline")}</span>
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("用 Oxide 表示错误，或大面积铺满 Oxide。", "Oxide used for errors, or flooded across large areas.")}>
            <div className="grid w-full place-items-center bg-oxide-500 py-8">
              <span className="text-sm font-semibold text-white">{t("盘 07 离线", "Drive 07 offline")}</span>
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="color" />
    </Page>
  )
}

function Chip({ hex, note }: { hex: string; note: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs whitespace-nowrap">
      <i className="inline-block size-3.5 shadow-[inset_0_0_0_1px_rgba(127,127,127,0.35)]" style={{ background: hex }} />
      <span className="text-foreground">{hex.toUpperCase()}</span>
      <span className="hidden text-faint xl:inline">{note.startsWith("{") ? note.slice(7, -1) : ""}</span>
    </span>
  )
}
