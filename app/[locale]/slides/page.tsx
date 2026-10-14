import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import { DoDont, Note, Page, PageFooter, PageHeader, Prose, Section, Sub, Table } from "@/components/site/page"
import { isLocale, setLocale, t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Deck } from "./_deck"
import { Master } from "./_master"
import { TOTAL } from "./_parts"
import { PresentDeck } from "./_present"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "演示文稿" : "Slides" }
}

/** A small 16:9 slide for the Do & Don't specimens; type is sized in container units. */
function Mini({ dark, children, className }: { dark?: boolean; children: ReactNode; className?: string }) {
  return <div className={cn("@container relative aspect-video w-full max-w-[400px] overflow-hidden", dark ? "bg-neutral-950 text-white" : "bg-white text-neutral-950 outline-1 -outline-offset-1 outline-neutral-200", className)}>{children}</div>
}

const THEME_COLOURS: [string, string, string, string][] = [
  ["文字/背景 - 深色 1", "Text/Background – Dark 1", "#0B0E14", "Ink"],
  ["文字/背景 - 浅色 1", "Text/Background – Light 1", "#FFFFFF", "White"],
  ["文字/背景 - 深色 2", "Text/Background – Dark 2", "#424853", "Neutral 700"],
  ["文字/背景 - 浅色 2", "Text/Background – Light 2", "#F4F6F9", "Paper"],
  ["着色 1", "Accent 1", "#0062FF", "Signal Blue"],
  ["着色 2", "Accent 2", "#FF5E14", "Oxide"],
  ["着色 3", "Accent 3", "#00AEAE", "Teal 500"],
  ["着色 4", "Accent 4", "#7D5BE6", "Violet 500"],
  ["着色 5", "Accent 5", "#F7AE0C", "Amber 500"],
  ["着色 6", "Accent 6", "#61C3F9", "Sky 500"],
  ["超链接", "Hyperlink", "#014FDD", "Blue 600"],
  ["已访问的超链接", "Followed hyperlink", "#043EB5", "Blue 700"],
]

export default async function SlidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/slides/"
        label="Templates · Slides"
        title={t("演示文稿", "Slides")}
        subtitle={t("Slides", "演示文稿")}
        lede={t("一个 16:9 母版与 18 个版式，用于技术演讲、销售演示与内部评审。", "One 16:9 master and eighteen layouts for talks, sales decks and internal reviews.")}
        meta={[
          { k: t("版式", "Layouts"), v: String(TOTAL) },
          { k: t("尺寸", "Size"), v: "1920 × 1080 · 16:9" },
          { k: t("底色", "Surfaces"), v: "Ink / Paper / White / Signal" },
          { k: t("语言", "Languages"), v: "中 / EN" },
        ]}
      />

      <Section
        id="master"
        tag="Master grid"
        title={t("母版网格", "The master grid")}
        lede={<p>{t("页眉、标题与页脚每页同位，翻页时画面不跳动。", "Header, title and footer hold their positions on every slide, so nothing jumps.")}</p>}
      >
        <Master />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t("一页一个观点", "One idea per slide"), t("第二个观点另起一页。", "A second point gets its own slide.")],
            [t("标题不超过 2 行", "Two-line titles"), t("首行落在 y 288 基线；过长则改写，不得缩小字号。", "First line on the y 288 baseline; rewrite long titles, never shrink them.")],
            [t("要点不超过 6 条", "Six bullets at most"), t("每条不超过 2 行；更多内容拆页或改用图表。", "Two lines each; otherwise split the slide or use a chart.")],
            [t("数字带单位与来源", "Units and sources"), t("来源与统计日期写在页底来源行。", "Source and date go in the source line at the foot.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid content-start gap-1.5 border-t border-border pt-3 text-sm leading-relaxed text-subtle">
              <b className="font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">
                {String(i + 1).padStart(2, "0")} · {k}
              </b>
              {v}
            </div>
          ))}
        </div>
        <Sub title={t("字号", "Type sizes")} aside={t("以 1920 × 1080 计 · 1u = 10.8 px", "At 1920 × 1080 · 1u = 10.8 px")}>
          <Table
            className="[&_table]:min-w-[600px]"
            mono={[2, 3]}
            head={[t("角色", "Role"), t("字体", "Typeface"), t("字号", "Size"), "u"]}
            rows={[
              [t("封面标题", "Cover title"), "Archivo 125% · ExtraBold", "151 px", "14u"],
              [t("章节编号", "Section number"), "Archivo 125% · ExtraBold", "432 px", "40u"],
              [t("陈述句", "Statement"), t("Archivo 125% · 中文黑体 Bold", "Archivo 125% · Chinese sans Bold"), "162–173 px", "15–16u"],
              [t("页面标题", "Slide title"), t("Archivo 112% · Bold；中文黑体 Bold", "Archivo 112% · Bold; Chinese sans Bold"), "70 px", "6.5u"],
              [t("小标题", "Subhead"), "Archivo 112% · Bold", "46 px", "4.25u"],
              [t("正文", "Body"), "Geist · Regular / Medium", t("32 px，不小于 28 px", "32 px, never below 28 px"), "3u"],
              [t("代码", "Code"), "Geist Mono · Regular", "30 px", "2.75u"],
              [t("标签、页脚、来源行", "Labels, footer, source line"), t("Geist Mono · Medium · 大写", "Geist Mono · Medium · caps"), "22 px", "2u"],
            ]}
          />
        </Sub>
      </Section>

      <Section
        id="layouts"
        tag="Layouts"
        title={t("版式", "Layouts")}
        lede={<p>{t("按一场完整演讲的顺序排列，页码与议程一致。", "In the order of a complete talk; slide numbers match the agenda.")}</p>}
      >
        <PresentDeck count={TOTAL} />
        <Deck />
      </Section>

      <Section
        id="powerpoint"
        tag="PowerPoint & Keynote"
        title={t("在 PowerPoint 与 Keynote 中搭建", "Building in PowerPoint and Keynote")}
        lede={<p>{t("文稿须从与本页一致的母版新建，不得从旧文稿复制页面。", "Every deck starts from a master that matches this page; never copy slides from older decks.")}</p>}
      >
        <Sub title={t("字体", "Fonts")} aside="SIL Open Font License 1.1">
          <Table
            className="[&_table]:min-w-[780px]"
            head={[t("用途", "Role"), t("字体", "Typeface"), t("获取", "Source"), t("替代字体", "Fallback")]}
            rows={[
              [t("封面、章节编号、陈述句", "Covers, section numbers, statements"), "Archivo Expanded · ExtraBold", "Google Fonts · OFL", "Arial Bold"],
              [t("页面标题、小标题", "Slide titles, subheads"), "Archivo SemiExpanded · Bold", "Google Fonts · OFL", "Arial Bold"],
              [t("正文", "Body"), "Geist · Regular / Medium", "Google Fonts · OFL", "Arial"],
              [t("标签、数据、代码", "Labels, data, code"), "Geist Mono · Regular / Medium", "Google Fonts · OFL", "Consolas"],
              [t("中文", "Chinese"), t("HarmonyOS Sans SC 或思源黑体 Source Han Sans SC", "HarmonyOS Sans SC or Source Han Sans SC"), t("HarmonyOS 官网 · 思源黑体 OFL", "HarmonyOS site · Source Han Sans OFL"), t("微软雅黑", "Microsoft YaHei")],
            ]}
          />
          <Note>
            {t(
              "须安装 Archivo 静态字体（Expanded = 125%，SemiExpanded = 112.5%）；替代字体仅在无法嵌入时使用，且整份统一替换。",
              "Install the static Archivo styles (Expanded = 125%, SemiExpanded = 112.5%); use fallbacks only when fonts cannot be embedded, across the whole deck.",
            )}
          </Note>
        </Sub>

        <Sub title={t("主题颜色", "Theme colours")} aside={t("PowerPoint：设计 → 变体 → 颜色 → 自定义颜色", "PowerPoint: Design → Variants → Colours → Customise Colours")}>
          <div className="grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:grid-cols-6">
            {THEME_COLOURS.map(([zh, en, hex, name]) => (
              <div key={hex} className="grid content-start gap-3 border-r border-b border-border p-3">
                <i className="block h-14 shadow-[inset_0_0_0_1px_var(--strong)]" style={{ background: hex }} />
                <div className="grid gap-1">
                  <span className="text-[13px] leading-snug font-medium">{t(zh, en)}</span>
                  <span className="font-mono text-xs leading-none text-foreground">{hex}</span>
                  <span className="font-mono text-[11px] leading-none text-muted-foreground">{name}</span>
                </div>
              </div>
            ))}
          </div>
          <Note tone="parity">
            {t(
              "对照系列手动改为 #9AA0AC；Oxide 只用于校验块与唯一焦点；Keynote 须存为自定义调色板。",
              "Recolour comparison series to #9AA0AC by hand; keep Oxide for parity and one focal point; in Keynote, save these as a custom palette.",
            )}
          </Note>
        </Sub>

        <Sub title={t("尺寸、参考线与字号换算", "Size, guides and type conversion")} aside={t("PowerPoint 宽屏：1 pt = 2 px", "PowerPoint widescreen: 1 pt = 2 px")}>
          <Table
            className="[&_table]:min-w-[760px]"
            mono={[1, 2, 3]}
            head={[t("项目", "Item"), t("模板（px）", "Template (px)"), "Keynote", "PowerPoint"]}
            rows={[
              [t("幻灯片尺寸", "Slide size"), "1920 × 1080", t("宽屏 1920 × 1080", "Wide 1920 × 1080"), "13.333 × 7.5 in · 33.867 × 19.05 cm"],
              [t("边距参考线", "Margin guides"), "96", "96 pt", "0.667 in · 1.693 cm"],
              [t("12 栏 · 栏宽 / 栏距", "12 columns · width / gutter"), "122 / 24", "122 / 24 pt", "0.847 / 0.167 in"],
              [t("标题区顶部", "Title zone top"), "216", "216 pt", "1.5 in · 3.81 cm"],
              [t("封面标题", "Cover title"), "151", "151 pt", "76 pt"],
              [t("页面标题", "Slide title"), "70", "70 pt", "35 pt"],
              [t("小标题", "Subhead"), "46", "46 pt", "23 pt"],
              [t("正文（最小值）", "Body (minimum)"), "32 (28)", "32 (28) pt", "16 (14) pt"],
              [t("标签、页脚、来源行", "Labels, footer, source line"), "22", "22 pt", "11 pt"],
            ]}
          />
        </Sub>

        <Sub title={t("母版版式", "Master layouts")} aside={t("版式名称统一使用英文", "Layout names are always in English")}>
          <Table
            className="[&_table]:min-w-[680px]"
            mono={[0]}
            head={[t("母版版式名称", "Master layout name"), t("PowerPoint 基础版式", "PowerPoint base layout"), t("占位符", "Placeholders")]}
            rows={[
              ["01 Cover – Ink", t("标题幻灯片", "Title Slide"), t("标题、副标题、演讲者、活动、日期", "Title, subtitle, speaker, event, date")],
              ["02 Cover – Signal", t("标题幻灯片", "Title Slide"), t("标题、副标题、演讲者、活动、日期", "Title, subtitle, speaker, event, date")],
              ["03 Agenda", t("标题和内容", "Title and Content"), t("标题、编号列表", "Title, numbered list")],
              ["04 Section", t("节标题", "Section Header"), t("编号、章节名、说明", "Number, section name, description")],
              ["05 Statement", t("仅标题", "Title Only"), t("陈述句", "Statement")],
              ["06 Title + Bullets + Visual", t("两栏内容", "Two Content"), t("标题、要点（7 栏）、图（5 栏）", "Title, bullets (7 cols), visual (5 cols)")],
              ["07 Two Columns", t("比较", "Comparison"), t("标题、两栏标题、两栏正文", "Title, two headings, two bodies")],
              ["08 Three Features", t("仅标题", "Title Only"), t("标题、3 组图标与正文", "Title, three icon and text groups")],
              ["09 Big Numbers", t("仅标题", "Title Only"), t("标题、主数字、3 个次要数字、来源行", "Title, lead figure, three figures, source line")],
              ["10 Chart", t("标题和内容", "Title and Content"), t("标题、图表、来源行", "Title, chart, source line")],
              ["11 Diagram", t("仅标题", "Title Only"), t("标题、图示区域", "Title, diagram area")],
              ["12 Code", t("两栏内容", "Two Content"), t("标题、说明、代码框（等宽）", "Title, notes, code box (mono)")],
              ["13 Table", t("标题和内容", "Title and Content"), t("标题、表格、来源行", "Title, table, source line")],
              ["14 Quote", t("仅标题", "Title Only"), t("引文、说明、出处", "Quote, explanation, attribution")],
              ["15 Timeline", t("仅标题", "Title Only"), t("标题、4 个节点", "Title, four milestones")],
              ["16 Speakers", t("仅标题", "Title Only"), t("标题、4 个图片占位符与文本", "Title, four picture placeholders with text")],
              ["17 Picture + Caption", t("图片与标题", "Picture with Caption"), t("图片（8 栏）、图号、标题、说明", "Picture (8 cols), figure number, title, caption")],
              ["18 Closing", t("空白", "Blank"), t("致谢、联系方式、二维码、链接", "Thanks, contact, QR code, links")],
            ]}
          />
        </Sub>

        <Sub title={t("导出与交付", "Export and delivery")}>
          <Prose className="text-[15px] leading-[1.7]">
            <ul>
              <li>{t("PDF：导出后在文档属性中确认全部字体已嵌入。", "PDF: confirm in the document properties that every font is embedded.")}</li>
              <li>{t("PPTX：开启「将字体嵌入文件」，嵌入所有字符。", "PPTX: turn on Embed fonts in the file, with all characters.")}</li>
              <li>{t("Keynote 文件不含字体：交付 PDF，或先确认对方已安装。", "Keynote files carry no fonts: send a PDF or confirm they are installed.")}</li>
              <li>{t("页码字段无法生成「07 / 18」时，定稿后统一手填。", "If the number field cannot produce “07 / 18”, fill it in once the deck is final.")}</li>
            </ul>
          </Prose>
        </Sub>
      </Section>

      <Section id="rules" tag="Do & Don't" title={t("演示前检查", "Before you present")}>
        <div className="grid gap-4 md:grid-cols-2">
          {/* 1 · one idea */}
          <DoDont kind="do" on="surface" caption={t("一页一个观点，一个图形。", "One idea, one graphic per slide.")}>
            <Mini dark>
              <Wordmark className="absolute top-[7cqw] left-[6cqw] h-auto w-[13cqw] text-white" />
              <span className="absolute top-[22cqw] left-[6cqw] max-w-[80cqw] font-display text-[6.4cqw] leading-[1.14] font-[750] [font-stretch:112%]">
                {t(
                  <>
                    EC 4+2
                    <br />
                    可容忍任意 2 块盘故障
                  </>,
                  <>EC 4+2 survives any two failed drives</>,
                )}
              </span>
              <Stripe className="absolute bottom-[7cqw] left-[6cqw] text-[3.4cqw] [--mx-data:#0062FF] [--mx-parity:#FF5E14]" />
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("要点超过 6 条，字号低于 28 px。", "Over six bullets, type below 28 px.")}>
            <Mini className="p-[5cqw]">
              <span className="block text-[4.2cqw] leading-tight font-bold">{t("RustFS 功能概览与技术细节说明", "RustFS features overview and technical details")}</span>
              <ul className="mt-[2.5cqw] grid list-disc gap-[0.6cqw] pl-[4cqw] text-[2.1cqw] leading-[1.3] text-neutral-700">
                {Array.from({ length: 11 }, (_, i) => (
                  <li key={i}>{t("纠删码、位腐烂保护、自愈、版本控制、对象锁定、复制、生命周期与分层存储……", "Erasure coding, bitrot protection, healing, versioning, Object Lock, replication, lifecycle and tiering…")}</li>
                ))}
              </ul>
            </Mini>
          </DoDont>

          {/* 2 · chart scale */}
          <DoDont kind="do" on="surface" caption={t("数值轴从 0 开始。", "The value axis starts at zero.")}>
            <Mini>
              <svg viewBox="0 0 400 225" className="absolute inset-0 size-full" aria-hidden="true">
                {[0, 5, 10].map((v) => (
                  <g key={v}>
                    <line x1="56" x2="372" y1={190 - v * 15} y2={190 - v * 15} stroke={v === 0 ? "#0B0E14" : "#DCE0E6"} strokeWidth={v === 0 ? 1.5 : 1} />
                    <text x="44" y={190 - v * 15} dy="0.35em" textAnchor="end" fontSize="11" fill="#5A616D" className="font-mono">
                      {v}
                    </text>
                  </g>
                ))}
                <rect x="140" y={190 - 9.1 * 15} width="52" height={9.1 * 15} fill="#0062FF" />
                <rect x="236" y={190 - 8.4 * 15} width="52" height={8.4 * 15} fill="#C4C9D2" />
                <text x="166" y={190 - 9.1 * 15 - 7} textAnchor="middle" fontSize="12" fill="#0B0E14" className="font-mono">9.1</text>
                <text x="262" y={190 - 8.4 * 15 - 7} textAnchor="middle" fontSize="12" fill="#5A616D" className="font-mono">8.4</text>
              </svg>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("截断坐标轴，夸大差异。", "A truncated axis inflates the gap.")}>
            <Mini>
              <svg viewBox="0 0 400 225" className="absolute inset-0 size-full" aria-hidden="true">
                {[8, 8.4, 8.8, 9.2].map((v) => (
                  <g key={v}>
                    <line x1="56" x2="372" y1={190 - (v - 8) * 140} y2={190 - (v - 8) * 140} stroke={v === 8 ? "#0B0E14" : "#DCE0E6"} strokeWidth={v === 8 ? 1.5 : 1} />
                    <text x="44" y={190 - (v - 8) * 140} dy="0.35em" textAnchor="end" fontSize="11" fill="#5A616D" className="font-mono">
                      {v.toFixed(1)}
                    </text>
                  </g>
                ))}
                <rect x="140" y={190 - 1.1 * 140} width="52" height={1.1 * 140} fill="#0062FF" />
                <rect x="236" y={190 - 0.4 * 140} width="52" height={0.4 * 140} fill="#C4C9D2" />
              </svg>
            </Mini>
          </DoDont>

          {/* 3 · sources */}
          <DoDont kind="do" on="surface" caption={t("数字带单位、来源与日期。", "Figures carry a unit, source and date.")}>
            <Mini className="grid content-end p-[6cqw]">
              <span className="font-display text-[15cqw] leading-[0.9] font-extrabold tracking-[-0.03em] tabular-nums [font-stretch:125%]">15.15M</span>
              <span className="mt-[2cqw] font-mono text-[2.8cqw] leading-none font-medium tracking-[0.08em] text-neutral-600 uppercase">Docker pulls · 15,154,618</span>
              <span className="mt-[5cqw] border-t border-neutral-200 pt-[2cqw] font-mono text-[2.4cqw] leading-none text-neutral-500">{t("数据来源：RustFS 官方网站。统计日期：2026-10-14。", "Source: the official RustFS website. As of 2026-10-14.")}</span>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("约数，无来源、无日期。", "Rounded, unsourced, undated.")}>
            <Mini className="grid content-center justify-items-center p-[6cqw] text-center">
              <span className="font-sans text-[17cqw] leading-none font-black text-blue-500">15M+</span>
              <span className="mt-[2cqw] font-sans text-[4cqw] font-semibold text-neutral-700">{t("下载量！", "downloads!")}</span>
            </Mini>
          </DoDont>

          {/* 4 · graphics */}
          <DoDont kind="do" on="surface" caption={t("图形来自产品结构。", "Graphics come from the product’s structure.")}>
            <Mini dark className="[--mx-data:#0062FF] [--mx-empty:rgba(255,255,255,0.14)] [--mx-parity:#FF5E14]">
              <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[40%]" cols={5} rows={7} k={4} m={1} seed={5} mode="tone" fade="l" fit="slice" gap={0.18} />
              <Wordmark className="absolute top-[7cqw] left-[6cqw] h-auto w-[13cqw] text-white" />
              <span className="absolute bottom-[7cqw] left-[6cqw] max-w-[46cqw] font-display text-[6cqw] leading-[1.05] font-[750] [font-stretch:112%]">{t("纠删码如何保证数据完整", "How erasure coding keeps data whole")}</span>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("剪贴画、立体图标、渐变与投影。", "Clip art, 3D icons, gradients, shadows.")}>
            <Mini className="bg-linear-to-b from-[#DDEFFF] to-white">
              <div className="absolute top-[14cqw] left-1/2 h-[22cqw] w-[44cqw] -translate-x-1/2">
                <i className="absolute bottom-0 left-0 block h-[13cqw] w-full rounded-full bg-linear-to-b from-white to-[#A8D4FF] shadow-[0_6px_14px_rgba(0,60,160,.35)]" />
                <i className="absolute top-0 left-[10cqw] block size-[17cqw] rounded-full bg-linear-to-b from-white to-[#A8D4FF] shadow-[0_6px_14px_rgba(0,60,160,.3)]" />
                <i className="absolute top-[4cqw] left-[22cqw] block size-[13cqw] rounded-full bg-linear-to-b from-white to-[#A8D4FF]" />
              </div>
              <i className="absolute bottom-[10cqw] left-[18cqw] block h-[16cqw] w-[12cqw] rounded-[2cqw] bg-linear-to-br from-neutral-300 to-neutral-500 shadow-[0_8px_16px_rgba(0,0,0,.35)]" />
              <i className="absolute right-[18cqw] bottom-[10cqw] block h-[16cqw] w-[12cqw] rounded-[2cqw] bg-linear-to-br from-neutral-300 to-neutral-500 shadow-[0_8px_16px_rgba(0,0,0,.35)]" />
              <span className="absolute inset-x-0 bottom-[3cqw] text-center font-serif text-[5cqw] font-bold text-blue-700 italic [text-shadow:0_2px_6px_rgba(0,98,255,.5)]">{t("云存储解决方案", "Cloud Storage Solutions")}</span>
            </Mini>
          </DoDont>

          {/* 5 · slide numbers */}
          <DoDont kind="do" on="surface" bodyClassName="gap-2" caption={t("页码「07 / 18」，固定在页脚右侧。", "“07 / 18”, fixed at the footer’s right.")}>
            <div className="grid w-full max-w-[400px] grid-cols-3 gap-2">
              {[6, 7, 8].map((n) => (
                <Mini key={n} className="bg-white">
                  <i className="absolute top-[12cqw] left-[8cqw] block h-[7cqw] w-[56cqw] bg-neutral-950" />
                  <i className="absolute top-[26cqw] left-[8cqw] block h-[3cqw] w-[70cqw] bg-neutral-200" />
                  <i className="absolute top-[33cqw] left-[8cqw] block h-[3cqw] w-[62cqw] bg-neutral-200" />
                  <span className="absolute right-[6cqw] bottom-[6cqw] font-mono text-[8cqw] leading-none text-neutral-600 tabular-nums">
                    <b className="font-medium text-neutral-950">0{n}</b> / 18
                  </span>
                </Mini>
              ))}
            </div>
          </DoDont>
          <DoDont kind="dont" on="surface" bodyClassName="gap-2" caption={t("页码格式与位置逐页变化。", "Number format and position vary.")}>
            <div className="grid w-full max-w-[400px] grid-cols-3 gap-2">
              {[
                ["6", "top-[6cqw] right-[6cqw]"],
                [t("第 7 页", "Page 7"), "bottom-[6cqw] left-1/2 -translate-x-1/2"],
                ["p. 8 of 18", "bottom-[6cqw] left-[6cqw]"],
              ].map(([label, pos], i) => (
                <Mini key={i} className="bg-white">
                  <i className="absolute top-[12cqw] left-[8cqw] block h-[7cqw] w-[56cqw] bg-neutral-950" />
                  <i className="absolute top-[26cqw] left-[8cqw] block h-[3cqw] w-[70cqw] bg-neutral-200" />
                  <span className={cn("absolute font-sans text-[9cqw] leading-none whitespace-nowrap text-neutral-600", pos)}>{label}</span>
                </Mini>
              ))}
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="slides" />
    </Page>
  )
}
