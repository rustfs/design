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
        lede={t(
          "16:9 母版（1920 × 1080）及一整套版式，适用于技术演讲、销售演示与内部评审。所有版式共用同一母版：96 px 边距、12 栏网格、固定的页眉与页脚。每一页均可在本页全屏演示。",
          "A 16:9 master (1920 × 1080) with a full set of layouts for talks, sales decks and internal reviews. Every layout shares one master: 96 px margins, a 12-column grid and a fixed header and footer. Every slide can be presented full screen from this page.",
        )}
        meta={[
          { k: t("版式", "Layouts"), v: String(TOTAL) },
          { k: t("尺寸", "Size"), v: "1920 × 1080 · 16:9" },
          { k: t("底色", "Surfaces"), v: "Ink / Paper / White / Signal" },
          { k: t("语言", "Languages"), v: "中 / EN" },
          { k: t("演示", "Present"), v: t("全屏 · ← →", "Full screen · ← →") },
        ]}
      />

      <Section
        id="master"
        tag="Master grid"
        title={t("母版网格", "The master grid")}
        lede={
          <p>
            {t(
              "边距为画面宽度的 5%，即 96 px；内容对齐 12 栏网格，栏宽 122 px、栏距 24 px。页眉、标题与页脚的位置在每一页保持不变，翻页时画面不跳动。",
              "Margins are 5% of the width: 96 px. Content aligns to a 12-column grid with 122 px columns and 24 px gutters. The header, title and footer hold the same positions on every slide, so nothing jumps when the slide changes.",
            )}
          </p>
        }
      >
        <Master />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [t("一页一个观点", "One idea per slide"), t("每页只承载一个结论；第二个观点另起一页。", "Each slide carries one conclusion. A second point gets a slide of its own.")],
            [t("标题不超过 2 行", "Two-line titles"), t("标题首行落在 y 288 基线上。超过 2 行时改写标题，不得缩小字号。", "The first line sits on the y 288 baseline. If a title runs longer, rewrite it; never shrink it.")],
            [t("正文不小于 28 px", "Body 28 px or larger"), t("以 1920 宽计。本母版正文为 32 px，标签、页脚与来源行为 22 px 等宽体。", "Measured at 1920 wide. Body copy here is 32 px; labels, footers and source lines are 22 px mono.")],
            [t("要点不超过 6 条", "Six bullets at most"), t("每条不超过 2 行。内容更多时拆分为两页，或改用图表。", "Two lines each. With more to say, split the slide or use a chart.")],
            [t("数字带单位与来源", "Units and sources"), t("每个数字写明单位；来源与统计日期写在页底来源行。", "Every figure states its unit; the source and date go in the source line at the foot.")],
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
        lede={
          <p>
            {t(
              "共 18 个版式，按一场完整演讲的顺序排列，页码与议程一致。每页可单独切换底色与语言、编辑文字、导出 PNG，或从该页开始演示。",
              "Eighteen layouts in the order of a complete talk, with slide numbers that match the agenda. Each slide can switch surface and language, be edited in place, be exported as PNG, or start the presentation from that slide.",
            )}
          </p>
        }
      >
        <PresentDeck count={TOTAL} />
        <Deck />
      </Section>

      <Section
        id="powerpoint"
        tag="PowerPoint & Keynote"
        title={t("在 PowerPoint 与 Keynote 中搭建", "Building in PowerPoint and Keynote")}
        lede={
          <p>
            {t(
              "PowerPoint 与 Keynote 母版须与本页版式保持一致：相同的尺寸、字体、主题颜色、网格与版式名称。母版建好后，所有演示文稿均从母版新建，不得从旧文稿复制页面。",
              "PowerPoint and Keynote masters must match these layouts: the same size, fonts, theme colours, grid and layout names. Once the master exists, every deck starts from it; slides are never copied over from older decks.",
            )}
          </p>
        }
      >
        <Sub title={t("字体", "Fonts")} aside="SIL Open Font License 1.1">
          <Table
            className="[&_table]:min-w-[780px]"
            head={[t("用途", "Role"), t("字体", "Typeface"), t("获取", "Source"), t("替代字体（仅限无法嵌入时）", "Fallback (only when unavoidable)")]}
            rows={[
              [t("封面、章节编号、陈述句", "Covers, section numbers, statements"), "Archivo Expanded · ExtraBold", "Google Fonts · OFL", "Arial Bold"],
              [t("页面标题、小标题", "Slide titles, subheads"), "Archivo SemiExpanded · Bold", "Google Fonts · OFL", "Arial Bold"],
              [t("正文", "Body"), "Geist · Regular / Medium", "Google Fonts · OFL", "Arial"],
              [t("标签、数据、代码", "Labels, data, code"), "Geist Mono · Regular / Medium", "Google Fonts · OFL", "Consolas"],
              [t("中文", "Chinese"), t("HarmonyOS Sans SC 或思源黑体 Source Han Sans SC", "HarmonyOS Sans SC or Source Han Sans SC"), t("HarmonyOS 官方下载；思源黑体为 OFL", "HarmonyOS official download; Source Han Sans under OFL"), t("微软雅黑", "Microsoft YaHei")],
            ]}
          />
          <Note>
            {t(
              "PowerPoint 与 Keynote 不能调节可变字体的宽度轴。Archivo 须安装静态字体：Expanded 对应 125% 宽度，SemiExpanded 对应 112.5% 宽度。替代字体只在字体既无法嵌入、对方也未安装时使用，且须整份文稿统一替换。",
              "PowerPoint and Keynote cannot set the width axis of a variable font. Install the static Archivo styles instead: Expanded matches 125% width and SemiExpanded matches 112.5%. Use the fallbacks only when the fonts can neither be embedded nor installed, and replace them across the whole deck.",
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
              "着色顺序与数据可视化色板一致。比较类图表中，RustFS 使用着色 1，对照系列须手动改为中性色 #9AA0AC；Oxide 只用于校验块与唯一的焦点。Keynote 没有主题颜色槽位，须将以上颜色存为自定义调色板。",
              "The accent order follows the data visualisation palette. In comparison charts RustFS uses Accent 1 and the comparison series is recoloured by hand to neutral #9AA0AC; Oxide is kept for parity and the single focal point. Keynote has no theme colour slots, so save these colours as a custom palette.",
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
            className="[&_table]:min-w-[820px]"
            mono={[1]}
            head={[t("版式", "Layout"), t("母版版式名称", "Master layout name"), t("PowerPoint 基础版式", "PowerPoint base layout"), t("占位符", "Placeholders")]}
            rows={[
              [t("01 封面", "01 Cover"), "01 Cover – Ink", t("标题幻灯片", "Title Slide"), t("标题、副标题、演讲者、活动、日期", "Title, subtitle, speaker, event, date")],
              [t("02 封面 · 备选", "02 Cover, alternate"), "02 Cover – Signal", t("标题幻灯片", "Title Slide"), t("标题、副标题、演讲者、活动、日期", "Title, subtitle, speaker, event, date")],
              [t("03 议程", "03 Agenda"), "03 Agenda", t("标题和内容", "Title and Content"), t("标题、编号列表", "Title, numbered list")],
              [t("04 章节页", "04 Section divider"), "04 Section", t("节标题", "Section Header"), t("编号、章节名、说明", "Number, section name, description")],
              [t("05 陈述", "05 Statement"), "05 Statement", t("仅标题", "Title Only"), t("陈述句", "Statement")],
              [t("06 标题 + 要点 + 图", "06 Title, bullets and visual"), "06 Title + Bullets + Visual", t("两栏内容", "Two Content"), t("标题、要点（7 栏）、图（5 栏）", "Title, bullets (7 cols), visual (5 cols)")],
              [t("07 两栏", "07 Two columns"), "07 Two Columns", t("比较", "Comparison"), t("标题、两栏标题、两栏正文", "Title, two headings, two bodies")],
              [t("08 三项特性", "08 Three features"), "08 Three Features", t("仅标题", "Title Only"), t("标题、3 组图标与正文", "Title, three icon and text groups")],
              [t("09 大数字", "09 Big numbers"), "09 Big Numbers", t("仅标题", "Title Only"), t("标题、主数字、3 个次要数字、来源行", "Title, lead figure, three figures, source line")],
              [t("10 图表", "10 Chart"), "10 Chart", t("标题和内容", "Title and Content"), t("标题、图表、来源行", "Title, chart, source line")],
              [t("11 架构图", "11 Architecture"), "11 Diagram", t("仅标题", "Title Only"), t("标题、图示区域", "Title, diagram area")],
              [t("12 代码", "12 Code"), "12 Code", t("两栏内容", "Two Content"), t("标题、说明、代码框（等宽）", "Title, notes, code box (mono)")],
              [t("13 对比表", "13 Comparison table"), "13 Table", t("标题和内容", "Title and Content"), t("标题、表格、来源行", "Title, table, source line")],
              [t("14 原则引语", "14 Principle"), "14 Quote", t("仅标题", "Title Only"), t("引文、说明、出处", "Quote, explanation, attribution")],
              [t("15 时间线", "15 Timeline"), "15 Timeline", t("仅标题", "Title Only"), t("标题、4 个节点", "Title, four milestones")],
              [t("16 演讲者与团队", "16 Speakers and team"), "16 Speakers", t("仅标题", "Title Only"), t("标题、4 个图片占位符与文本", "Title, four picture placeholders with text")],
              [t("17 图片 + 说明", "17 Image and caption"), "17 Picture + Caption", t("图片与标题", "Picture with Caption"), t("图片（8 栏）、图号、标题、说明", "Picture (8 cols), figure number, title, caption")],
              [t("18 结束页", "18 Closing"), "18 Closing", t("空白", "Blank"), t("致谢、联系方式、二维码、链接", "Thanks, contact, QR code, links")],
            ]}
          />
        </Sub>

        <Sub title={t("导出与交付", "Export and delivery")}>
          <Prose className="text-[15px] leading-[1.7]">
            <ul>
              <li>
                {t(
                  "交付 PDF：PowerPoint 选择「文件 → 导出 → PDF」，Keynote 选择「文件 → 导出为 → PDF」。导出后在 PDF 阅读器的文档属性中确认全部字体均为已嵌入。",
                  "PDF: in PowerPoint choose File → Export → PDF; in Keynote choose File → Export To → PDF. Then confirm in the PDF reader's document properties that every font is embedded.",
                )}
              </li>
              <li>
                {t(
                  "交付可编辑的 PPTX：在 PowerPoint 的保存选项中开启「将字体嵌入文件」，并选择嵌入所有字符。",
                  "Editable PPTX: turn on Embed fonts in the file in PowerPoint's save options and choose to embed all characters.",
                )}
              </li>
              <li>
                {t("Keynote 文件不包含字体。交付他人时须提供 PDF，或事先确认对方已安装上述字体。", "Keynote files do not carry their fonts. Send a PDF, or confirm beforehand that the recipient has the fonts installed.")}
              </li>
              <li>
                {t(
                  "页码使用两位数字与总页数，例如「07 / 18」。软件的页码字段无法生成该格式时，须在定稿后统一填写。",
                  "Slide numbers use two digits and the total, for example “07 / 18”. Where the software's number field cannot produce that format, fill in the numbers once the deck is final.",
                )}
              </li>
            </ul>
          </Prose>
        </Sub>
      </Section>

      <Section id="rules" tag="Do & Don't" title={t("演示前检查", "Before you present")} lede={<p>{t("演示前须逐页对照以下规则。", "Check every slide against these rules before presenting.")}</p>}>
        <div className="grid gap-4 md:grid-cols-2">
          {/* 1 · one idea */}
          <DoDont kind="do" on="surface" caption={t("每页一个观点：一个标题、一个图形。", "One idea per slide: one title, one graphic.")}>
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
          <DoDont kind="dont" on="surface" caption={t("整段文字搬上幻灯片：要点超过 6 条，字号低于 28 px。", "Paragraphs pasted onto a slide: more than six bullets, type below 28 px.")}>
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
          <DoDont kind="do" on="surface" caption={t("数值轴从 0 开始，柱高与数值成正比。", "The value axis starts at zero; bar height is proportional to the value.")}>
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
          <DoDont kind="dont" on="surface" caption={t("截断坐标轴放大差异：8.4 与 9.1 看起来相差近三倍。", "A truncated axis inflates the gap: 8.4 and 9.1 look almost three times apart.")}>
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
          <DoDont kind="do" on="surface" caption={t("数字带单位，并注明来源与统计日期。", "Numbers carry a unit, a source and a date.")}>
            <Mini className="grid content-end p-[6cqw]">
              <span className="font-display text-[15cqw] leading-[0.9] font-extrabold tracking-[-0.03em] tabular-nums [font-stretch:125%]">15.15M</span>
              <span className="mt-[2cqw] font-mono text-[2.8cqw] leading-none font-medium tracking-[0.08em] text-neutral-600 uppercase">Docker pulls · 15,154,618</span>
              <span className="mt-[5cqw] border-t border-neutral-200 pt-[2cqw] font-mono text-[2.4cqw] leading-none text-neutral-500">{t("数据来源：RustFS 官方网站。统计日期：2026-10-14。", "Source: the official RustFS website. As of 2026-10-14.")}</span>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("约数、含义不清、没有来源与日期的数字。", "A rounded figure with an unclear meaning and no source or date.")}>
            <Mini className="grid content-center justify-items-center p-[6cqw] text-center">
              <span className="font-sans text-[17cqw] leading-none font-black text-blue-500">15M+</span>
              <span className="mt-[2cqw] font-sans text-[4cqw] font-semibold text-neutral-700">{t("下载量！", "downloads!")}</span>
            </Mini>
          </DoDont>

          {/* 4 · graphics */}
          <DoDont kind="do" on="surface" caption={t("图形来自产品结构：分片矩阵、条带签名或真实架构图。", "Graphics come from the product's structure: the shard matrix, the stripe signature or a real architecture diagram.")}>
            <Mini dark className="[--mx-data:#0062FF] [--mx-empty:rgba(255,255,255,0.14)] [--mx-parity:#FF5E14]">
              <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[40%]" cols={5} rows={7} k={4} m={1} seed={5} mode="tone" fade="l" fit="slice" gap={0.18} />
              <Wordmark className="absolute top-[7cqw] left-[6cqw] h-auto w-[13cqw] text-white" />
              <span className="absolute bottom-[7cqw] left-[6cqw] max-w-[46cqw] font-display text-[6cqw] leading-[1.05] font-[750] [font-stretch:112%]">{t("纠删码如何保证数据完整", "How erasure coding keeps data whole")}</span>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("剪贴画、立体图标、渐变、投影与花体标题。", "Clip art, 3D icons, gradients, drop shadows and decorative titles.")}>
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
          <DoDont kind="do" on="surface" bodyClassName="gap-2" caption={t("页码统一为「07 / 18」格式，固定在页脚右侧。", "Slide numbers always read “07 / 18”, fixed at the right of the footer.")}>
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
          <DoDont kind="dont" on="surface" bodyClassName="gap-2" caption={t("页码格式与位置逐页变化。", "Slide number format and position change from slide to slide.")}>
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
