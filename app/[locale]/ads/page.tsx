import type { Metadata } from "next"
import type { ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { QR } from "@/components/brand/qr"
import { DoDont, Note, Page, PageFooter, PageHeader, Section, Spec, Sub, Table } from "@/components/site/page"
import { getLocale, isLocale, setLocale, t } from "@/lib/i18n"
import { HealBanner } from "./_banner"
import { Cta, CTA, Dim, DriveGrid, Fn, Footnote, M, MESSAGES, MessageGlyph, Mini, StripeRows } from "./_parts"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "广告投放" : "Advertising" }
}

/** Minimum widths keep long cells readable; narrow screens scroll the table instead of crushing it. */
const wide = (n: ReactNode) => <span className="block min-w-[18em]">{n}</span>
const mid = (n: ReactNode) => <span className="block min-w-[11em]">{n}</span>
const fmt = (name: ReactNode, group: ReactNode) => (
  <span className="grid min-w-[10em] gap-1">
    <span className="font-mono text-[10px] leading-none tracking-[0.08em] text-muted-foreground uppercase">{group}</span>
    {name}
  </span>
)

const S3_CALLS = ["PutObject", "GetObject", "ListObjectsV2", "DeleteObject", "CopyObject", "CreateMultipartUpload"]
const AI_PREFIXES = ["datasets/", "checkpoints/", "embeddings/", "eval/", "logs/", "features/"]

export default async function AdsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)
  const lang = getLocale()
  const both = (l: { zh: string; en: string }) => (lang === "zh" ? [l.zh, l.en] : [l.en, l.zh])

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/ads/"
        label="Templates · Advertising"
        title={t("广告投放", "Advertising")}
        subtitle={t("Advertising", "广告投放")}
        lede={t(
          "展示广告、社交信息流、户外与印刷使用同一套投放系统。每则广告都包含字标、一条主信息、一行依据和一个行动按钮；尺寸不同，结构不变。",
          "Display, social feeds, outdoor and print run on one campaign system. Every ad carries the wordmark, one message, one proof line and one call to action; the size changes, the structure does not.",
        )}
        meta={[
          { k: t("模板", "Templates"), v: "16" },
          { k: t("信息", "Messages"), v: "5" },
          { k: t("底色", "Surfaces"), v: "Ink / Paper / White / Signal" },
          { k: t("语言", "Languages"), v: "中 / EN" },
          { k: t("导出", "Export"), v: "PNG @2x" },
        ]}
      />

      {/* ------------------------------------------------------------------ Campaign system */}
      <Section
        id="system"
        tag="Campaign system"
        title={t("五个部件，每则广告都有", "Five parts in every ad")}
        lede={
          <p>
            {t(
              "广告的尺寸以 u 为单位，1u 等于画板短边的 1/100，安全边距为 7u。五个部件的位置可以随版式移动，但不得缺少，也不得重复：一个字标、一条信息、一行依据、一个按钮、一个品牌图形。",
              "Ads are measured in u, one hundredth of the artboard's short side, with a 7u safe margin. The five parts may move with the format but none may be dropped or repeated: one wordmark, one message, one proof line, one button and one brand graphic.",
            )}
          </p>
        }
      >
        <TemplateGrid>
          <Template title={t("结构示意 · 橙色虚线为 7u 安全边距", "Anatomy · the dashed line is the 7u safe margin")} spec="1200 × 628 · u = 6.28px" w={1200} h={628} file="ad-anatomy">
            <div className="absolute top-(--m) right-(--m) bottom-(--m) grid w-[34%] content-center">
              <DriveGrid cols={6} rows={5} dead={[1, 4]} className="u-gap-x-1.5" colClassName="u-gap-1.5" labels labelClassName="u-mt-1 u-text-1.75" />
            </div>
            <div className="ab-frame right-[calc(34%+var(--m)+var(--u)*8)]">
              <Wordmark className="ab-logo u-h-5" />
              <div className="grid justify-items-start u-gap-6">
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-12 leading-[0.98]">
                  <L zh={<>丢盘，<br />不丢数据<Fn />。</>} en={<>Lose drives.<br />Keep data.<Fn /></>} />
                </h3>
                <Cta {...CTA.download} className="u-h-8.5 u-gap-2.5 u-px-3.5 u-text-3" />
              </div>
              <Footnote {...M.drives.proof} className="u-text-2.25 max-w-[30em]" />
            </div>
            <div className="pointer-events-none absolute inset-(--m) outline outline-1 outline-oxide-500 outline-dashed" />
            {[
              ["④ Wordmark 5u", "left-[calc(var(--m)+var(--u)*36)] top-[calc(var(--m)+var(--u)*0.6)]"],
              ["① Message", "left-[calc(var(--m)+var(--u)*62)] top-[calc(var(--m)+var(--u)*21)]"],
              ["③ CTA · verb", "left-[calc(var(--m)+var(--u)*42)] top-[calc(var(--m)+var(--u)*56.5)]"],
              ["② Footnote ≥ 9px", "left-[calc(var(--m)+var(--u)*62)] bottom-[calc(var(--m)+var(--u)*1.5)]"],
              ["⑤ Graphic", "right-[calc(var(--m)+var(--u)*1)] top-[calc(var(--m)+var(--u)*1)]"],
            ].map(([label, pos]) => (
              <span key={label} className={`absolute bg-neutral-950/85 px-[calc(var(--u)*0.9)] py-[calc(var(--u)*0.6)] font-mono u-text-2 leading-none tracking-[0.04em] text-oxide-500 ${pos}`}>
                {label}
              </span>
            ))}
          </Template>
        </TemplateGrid>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [t("① 信息", "① Message"), t("一则广告只讲一条信息，取自下文核准信息表，逐字使用。信息是画面中最大的文字。", "One message per ad, taken word for word from the approved list below. It is the largest text on the artboard.")],
            [t("② 依据", "② Proof line"), t("每条信息配一行依据。需要前提条件的表述以上标数字标注，并在同一画面内给出脚注。", "Each message has one proof line. A claim that depends on a condition carries a superscript numeral and a footnote on the same artboard.")],
            [t("③ 按钮", "③ Call to action"), t("每则广告一个按钮，直角，标签为动词开头的短语。按钮不得使用 Oxide。", "One button per ad: square corners, a label that starts with a verb. Buttons are never Oxide.")],
            [t("④ 字标", "④ Wordmark"), t("每则广告都须出现字标。Ink 与 Signal 底色用白色，浅色底色用 Signal Blue。", "Every ad carries the wordmark: white on Ink and Signal, Signal Blue on light surfaces.")],
            [t("⑤ 图形", "⑤ Graphic"), t("分片矩阵或由它派生的示意图，用来说明信息本身。Oxide 只标记校验块或唯一焦点。", "The shard matrix, or a diagram drawn from it, that illustrates the message itself. Oxide marks parity or the single focal point.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid content-start gap-1.5 border-t border-border pt-3 text-sm leading-relaxed text-subtle">
              <b className="font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">{k}</b>
              {v}
            </div>
          ))}
        </div>

        <Sub title={t("信息长度按尺寸限定", "Message length by size")} aside={t("中文按字计，拉丁词与数字各计 1 字，标点不计", "Chinese counts characters; each Latin word or number counts as one; punctuation is not counted")}>
          <Table
            mono={[0]}
            head={[t("画板", "Artboard"), t("信息上限", "Message limit"), t("依据与脚注", "Proof line & footnote"), t("按钮", "Button"), t("最小字号", "Minimum size")]}
            rows={[
              ["320\u00a0×\u00a050", mid(t("5 个英文词 / 8 字，最多 2 行", "5 English words / 8 Chinese characters, 2 lines max")), mid(t("不可容纳，只投放无需脚注的信息", "No room: run only messages that need no footnote")), mid(t("动词单用：下载 / Download", "Verb alone: Download / 下载")), mid(t("信息 12 px", "Message 12 px"))],
              ["728\u00a0×\u00a090", mid(t("6 个英文词 / 12 字", "6 English words / 12 Chinese characters")), mid(t("脚注 1 行", "Footnote on 1 line")), mid(t("完整标签", "Full label")), mid(t("信息 18 px · 脚注 9 px", "Message 18 px · footnote 9 px"))],
              ["300\u00a0×\u00a0250 · 160\u00a0×\u00a0600", mid(t("6 个英文词 / 12 字，最多 4 行", "6 English words / 12 Chinese characters, 4 lines max")), mid(t("脚注最多 3 行", "Footnote up to 3 lines")), mid(t("完整标签", "Full label")), mid(t("信息 20 px · 脚注 9 px", "Message 20 px · footnote 9 px"))],
              ["300\u00a0×\u00a0600 · 970\u00a0×\u00a0250", mid(t("8 个英文词 / 16 字", "8 English words / 16 Chinese characters")), mid(t("依据 1 行，脚注最多 2 行", "Proof 1 line, footnote up to 2 lines")), mid(t("完整标签", "Full label")), mid(t("信息 24 px · 脚注 9 px", "Message 24 px · footnote 9 px"))],
              [t("社交 1080 宽", "Social, 1080 wide"), mid(t("8 个英文词 / 16 字，最多 3 行", "8 English words / 16 Chinese characters, 3 lines max")), mid(t("依据 1 行，脚注最多 2 行", "Proof 1 line, footnote up to 2 lines")), mid(t("完整标签", "Full label")), mid(t("信息 7u · 脚注 1.75u", "Message 7u · footnote 1.75u"))],
              [t("户外大牌 · 数字屏", "Billboards · screens"), mid(t("6 个英文词 / 12 字，5 秒内读完", "6 English words / 12 Chinese characters, read in 5 seconds")), mid(t("脚注紧邻图形，不小于 1.75u", "Footnote beside the graphic, at least 1.75u")), mid(t("标签 + 网址", "Label + URL")), mid(t("信息 8u · 脚注 1.75u", "Message 8u · footnote 1.75u"))],
              [t("灯箱 · 海报", "Lightboxes · posters"), mid(t("8 个英文词 / 16 字，最多 3 行", "8 English words / 16 Chinese characters, 3 lines max")), mid(t("依据 1 行；脚注不小于 1.75u，印刷不小于 7 pt", "Proof 1 line; footnote at least 1.75u, 7 pt in print")), mid(t("标签 + 网址或二维码", "Label + URL or QR code")), mid(t("信息 8u · 脚注 1.75u", "Message 8u · footnote 1.75u"))],
            ]}
          />
        </Sub>

        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
          <Sub title={t("行动按钮", "Call to action")}>
            <Spec on="surface" bodyClassName="grid-cols-2 gap-px bg-border p-0 place-items-stretch" caption={t("直角 · 动词开头 · Signal Blue，或 Signal 底色上的白色", "Square · starts with a verb · Signal Blue, or white on Signal")}>
              {([
                ["ink", t("下载 RustFS", "Download RustFS")],
                ["paper", t("阅读文档", "Read the docs")],
                ["white", t("查看源码", "View the source")],
                ["signal", t("下载 RustFS", "Download RustFS")],
              ] as const).map(([th, label]) => (
                <div key={th} className={`t-${th} grid min-h-34 min-w-0 content-between gap-5 bg-ab-bg p-4 sm:p-5`}>
                  <span className="font-mono text-[11px] leading-none tracking-[0.08em] text-ab-muted uppercase">{th}</span>
                  <span className="inline-flex h-10 w-max max-w-full items-center gap-2.5 bg-ab-data px-4 text-sm leading-none font-semibold whitespace-nowrap text-ab-on-data">
                    {label}
                    <Icon name="arrow-right" strokeWidth={2} className="size-4" />
                  </span>
                </div>
              ))}
            </Spec>
            <ul className="m-0 grid list-[square] gap-1.5 pl-5 text-[15px] leading-relaxed text-subtle">
              <li>{t("核准标签：「下载 RustFS」「阅读文档」「查看源码」。320 × 50 可只保留动词「下载」。", "Approved labels: “Download RustFS”, “Read the docs”, “View the source”. At 320 × 50 the verb may stand alone: “Download”.")}</li>
              <li>{t("按钮高度为标签字号的 2.4–3 倍，左右内边距约为高度的 1/3；标签不小于 11 px。箭头可选，只用 arrow-right 图标。", "Button height is 2.4–3 times the label size, with side padding about a third of the height; labels are never below 11 px. The arrow is optional and is always the arrow-right icon.")}</li>
              <li>{t("不得使用「点击这里」「了解更多」等不说明结果的标签，不得使用圆角、描边按钮或 Oxide 底色。", "Labels that do not say what happens, such as “Click here” or “Learn more”, are not permitted; nor are rounded corners, outline buttons or an Oxide fill.")}</li>
            </ul>
          </Sub>
          <Sub title={t("脚注", "Footnotes")}>
            <Spec on="ink" bodyClassName="place-items-stretch content-center" caption={t("上标数字 · 同一画面 · 不小于 9 px", "Superscript numeral · same artboard · 9 px minimum")}>
              <div className="grid w-full max-w-[440px] gap-5 justify-self-center">
                <span className="font-display text-[clamp(26px,3vw,34px)] leading-[1.08] font-[750] text-balance text-white [font-stretch:112%]">
                  {t("丢盘，不丢数据", "Lose drives. Keep data.")}
                  <sup className="ml-0.5 font-sans text-[0.4em] font-semibold">1</sup>
                  {t("。", "")}
                </span>
                <div className="grid grid-cols-[1fr_auto] items-start gap-4 border-t border-white/15 pt-3">
                  <span className="grid grid-cols-[auto_1fr] gap-x-1.5 text-[12px] leading-snug text-neutral-300">
                    <b className="font-semibold">1</b>
                    {t(M.drives.proof.zh, M.drives.proof.en)}
                  </span>
                  <span className="font-mono text-[11px] leading-snug whitespace-nowrap text-oxide-400">≥ 9 px</span>
                </div>
              </div>
            </Spec>
            <ul className="m-0 grid list-[square] gap-1.5 pl-5 text-[15px] leading-relaxed text-subtle">
              <li>{t("凡依赖前提条件的表述，须在信息后加上标数字，并在同一画面给出脚注；不得把条件放到落地页。", "Every claim that depends on a condition gets a superscript numeral and a footnote on the same artboard; the condition is never left to the landing page.")}</li>
              <li>{t("脚注不小于 1.75u，展示广告不小于 9 px，印刷不小于 7 pt；与底色对比度不低于 4.5 : 1。", "Footnotes are at least 1.75u, never below 9 px in display ads or 7 pt in print, with a contrast of at least 4.5 : 1.")}</li>
              <li>{t("放不下脚注的尺寸（如 320 × 50）只投放无需条件的信息。", "Sizes with no room for a footnote, such as 320 × 50, run only messages that need no condition.")}</li>
            </ul>
          </Sub>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ Messages */}
      <Section
        id="messages"
        tag="Messages"
        title={t("核准信息", "Approved messages")}
        lede={
          <p>
            {t(
              "以下五条信息是广告唯一可用的主文案，中英文成对使用。每条信息附一行依据；标有上标的信息须同时给出脚注。新增信息须经品牌团队审核，并附可在代码仓库或正式版本中核验的依据。",
              "These five lines are the only headlines an ad may use, always as a Chinese–English pair. Each comes with one proof line; lines marked with a superscript must carry the footnote. New lines need brand review and a proof that can be verified in the repository or an official release.",
            )}
          </p>
        }
      >
        <Table
          head={["#", t("信息", "Message"), t("依据", "Proof line"), t("图形", "Graphic"), t("长度", "Length")]}
          rows={MESSAGES.map((m, i) => {
            const [a, b] = both(m.msg)
            const [p, q] = both(m.proof)
            return [
              <span key="n" className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>,
              <span key="m" className="grid min-w-[13em] gap-1">
                <b className="font-display text-[19px] leading-[1.2] font-[750] text-foreground [font-stretch:112%]">
                  {m.footnote && a.endsWith("。") ? a.slice(0, -1) : a}
                  {m.footnote && <sup className="ml-0.5 font-sans text-[10px] font-semibold">1</sup>}
                  {m.footnote && a.endsWith("。") && "。"}
                </b>
                <span className="text-[13px] text-muted-foreground">{b}</span>
              </span>,
              <span key="p" className="grid min-w-[16em] gap-1">
                <span className="font-mono text-[11px] leading-none tracking-[0.06em] text-muted-foreground uppercase">{m.footnote ? t("脚注 · 与信息同时出现", "Footnote · always shown") : t("依据行", "Proof line")}</span>
                <span className="mt-1 text-foreground">
                  {m.footnote && <sup className="mr-1 font-semibold">1</sup>}
                  {p}
                </span>
                {p !== q && <span className="text-[13px] text-muted-foreground">{q}</span>}
              </span>,
              <span key="g" className="grid min-w-[12em] gap-2.5">
                <MessageGlyph id={m.id} />
                <span className="text-[13px] leading-snug">{
                  {
                    drives: t("纠删集中两列离线的分片矩阵", "An erasure set with two offline drive columns"),
                    s3: t("S3 调用层在上，分片矩阵在下", "The S3 call layer on top, the shard matrix underneath"),
                    open: t("许可证名称作为图形，空心「2.0」", "The licence name as the graphic, an outlined “2.0”"),
                    hardware: t("机柜边框内的分片矩阵与锁", "The shard matrix inside a rack frame, with a lock"),
                    ai: t("以 AI 数据前缀标注的条带", "Stripes labelled with AI data prefixes"),
                  }[m.id]
                }</span>
              </span>,
              <span key="l" className="font-mono text-[13px] whitespace-nowrap">{t(`${m.zhCount} 字 · ${m.enWords} 词`, `${m.enWords} words · ${m.zhCount} chars`)}</span>,
            ]
          })}
        />
        <Note>
          {t(
            "信息须逐字使用，不得改写、合并两条信息或单独翻译其中一种语言。不得添加「最快」「最好」「领先」等无法核验的表述；性能数字只有在附带测试条件、版本与日期，且已在官方渠道发布时才可使用。",
            "Use the lines word for word: do not rewrite them, merge two of them or translate one language on its own. Unverifiable words such as “fastest”, “best” or “leading” are not permitted. Performance figures may appear only with their test conditions, version and date, and only once they are published on an official channel.",
          )}
        </Note>
      </Section>

      {/* ------------------------------------------------------------------ Sizes */}
      <Section
        id="sizes"
        tag="Sizes"
        title={t("投放尺寸", "Formats")}
        lede={
          <p>
            {t(
              "下表为截至 2026 年 10 月的常用尺寸。静态展示广告以 PNG 或 JPG 交付，单个文件不超过 150 KB；平台规则可能调整，投放前应在平台预览中确认裁切与界面遮挡。",
              "Common formats as of October 2026. Static display ads are delivered as PNG or JPG at 150 KB or less per file. Platform rules change; confirm crops and interface overlays in the platform preview before a campaign goes live.",
            )}
          </p>
        }
      >
        <Table
          mono={[1]}
          head={[t("格式", "Format"), t("画板", "Artboard"), t("渠道", "Channel"), t("注意", "Notes")]}
          rows={[
            [fmt(t("中矩形 Medium Rectangle", "Medium Rectangle"), t("展示广告", "Display")), <Dim key="d" w={300} h={250} />, mid(t("展示广告网络、程序化购买", "Display networks, programmatic")), wide(t("五个部件齐全的基准尺寸，其他展示尺寸以它为参照", "The reference size with all five parts; other display sizes follow it"))],
            [fmt(t("通栏 Leaderboard", "Leaderboard"), t("展示广告", "Display")), <Dim key="d" w={728} h={90} />, mid(t("桌面端页面顶部", "Desktop, top of page")), wide(t("信息 1 行，脚注 1 行", "One-line message, one-line footnote"))],
            [fmt(t("宽擎天柱 Wide Skyscraper", "Wide Skyscraper"), t("展示广告", "Display")), <Dim key="d" w={160} h={600} />, mid(t("桌面端侧栏", "Desktop sidebar")), wide(t("纵向堆叠，信息每行不超过 8 个字符", "Stacked vertically; no line longer than 8 characters"))],
            [fmt(t("半页 Half Page", "Half Page"), t("展示广告", "Display")), <Dim key="d" w={300} h={600} />, mid(t("桌面端侧栏", "Desktop sidebar")), wide(t("图形可占画面一半", "The graphic may take half the height"))],
            [fmt(t("移动通栏 Mobile Leaderboard", "Mobile Leaderboard"), t("展示广告", "Display")), <Dim key="d" w={320} h={50} />, mid(t("移动端页面顶部或底部", "Mobile, top or bottom of page")), wide(t("字标 + 一句信息 + 按钮，只投放无需脚注的信息", "Wordmark, one line and a button; only messages that need no footnote"))],
            [fmt(t("横幅大图 Billboard", "Billboard"), t("展示广告", "Display")), <Dim key="d" w={970} h={250} />, mid(t("桌面端首屏", "Desktop, above the fold")), wide(t("信息、图形、按钮横向排开", "Message, graphic and button side by side"))],
            [fmt(t("信息流方图", "Feed square"), t("社交信息流", "Social")), <Dim key="d" w={1080} h={1080} />, mid("LinkedIn · X · Facebook · Instagram"), wide(t("平台标题栏重复同一条信息，不另写一条", "The platform headline field repeats the same message, never a second one"))],
            [fmt(t("信息流竖图 4:5", "Feed portrait 4:5"), t("社交信息流", "Social")), <Dim key="d" w={1080} h={1350} />, mid(t("Instagram、Facebook、LinkedIn 移动端", "Instagram, Facebook, LinkedIn mobile")), wide(t("比方图更高；主体放在中部 1080 × 1080 范围内，被裁为方图时仍完整", "Taller than the square; keep the subject inside the central 1080 × 1080 so a square crop still works"))],
            [fmt(t("快拍 / 短视频 9:16", "Story / Reels 9:16"), t("社交信息流", "Social")), <Dim key="d" w={1080} h={1920} />, mid(t("Stories、Reels、Shorts、抖音、视频号", "Stories, Reels, Shorts, Douyin, WeChat Channels")), wide(t("顶部 250 px、底部 420 px 与右侧操作栏不放置文字、字标与按钮", "Keep text, wordmark and button out of the top 250 px, the bottom 420 px and the right-hand action rail"))],
            [fmt(t("链接广告", "Link ad"), t("社交信息流", "Social")), <Dim key="d" w={1200} h={628} />, mid("LinkedIn · X · Facebook"), wide(t("平台在图片下方另显示标题与网址；图内不重复网址", "The platform shows a headline and URL under the image; do not repeat the URL inside it"))],
            [fmt(t("户外大牌 3:1", "Billboard 3:1"), t("户外与印刷", "Outdoor & print")), <Dim key="d" w={2400} h={800} />, mid(t("公路、楼宇户外大牌", "Roadside and building billboards")), wide(t("比例母版；制作文件按媒体方规格等比放大并加出血", "Proportion master; scale to the media owner's spec and add bleed for production"))],
            [fmt(t("数字屏 16:9", "Digital screen 16:9"), t("户外与印刷", "Outdoor & print")), <Dim key="d" w={1920} h={1080} />, mid(t("地铁、机场、楼宇数字屏", "Metro, airport and lobby screens")), wide(t("静帧投放；如需动画，遵循下文动画规则", "Runs as a still; animation follows the rules below"))],
            [fmt(t("地铁灯箱 2:3", "Metro lightbox 2:3"), t("户外与印刷", "Outdoor & print")), <Dim key="d" w={1200} h={1800} />, mid(t("地铁站台与通道灯箱", "Metro platform and corridor lightboxes")), wide(t("观看距离 3 m 以上，字标高度不小于画面高度 3%", "Viewed from 3 m or more; wordmark at least 3% of the height"))],
            [fmt(t("A2 海报", "A2 poster"), t("户外与印刷", "Outdoor & print")), <Dim key="d" w={1190} h={1684} />, mid(t("活动现场、办公场所", "Events and offices")), wide(t("按 A2（420 × 594 mm）以 pt 绘制；印刷加 3 mm 出血；二维码不小于 20 mm", "Drawn in points at A2 (420 × 594 mm); add 3 mm bleed; QR code at least 20 mm"))],
          ]}
        />
      </Section>

      {/* ------------------------------------------------------------------ Templates */}
      <Section
        id="templates"
        tag="Templates"
        title={t("广告模板", "Ad templates")}
        lede={
          <p>
            {t(
              "共 16 个模板，覆盖五条核准信息。每个模板只讲一条信息，图形为该信息而画。选择「编辑文字」可修改画板文字；底色与语言可切换；完成后选择「导出 PNG」。",
              "Sixteen templates covering the five approved messages. Each template carries one message, with a graphic drawn for that message. Choose Edit text to change copy on the artboard, switch the surface and language as needed, then choose Export PNG.",
            )}
          </p>
        }
      >
        <TemplateGrid
          filters={[
            { id: "all", label: t("全部 16", "All 16") },
            { id: "display", label: t("展示广告 7", "Display 7") },
            { id: "social", label: t("社交信息流 5", "Social 5") },
            { id: "outdoor", label: t("户外与印刷 4", "Outdoor & print 4") },
          ]}
        >
          {/* 1 · 970 × 250 Billboard — drives */}
          <Template span={12} title={t("横幅大图 · 丢盘", "Billboard · drives")} spec="970 × 250 · IAB Billboard" w={970} h={250} themes={["ink", "paper", "signal"]} tags={["display"]} file="ad-970x250-drives" note={t(<><b>用途：</b>桌面端首屏。信息、图形、按钮从左到右排开；图形标出纠删集中离线的两块盘，脚注说明成立条件。</>, <><b>Use:</b> desktop, above the fold. Message, graphic and button run left to right; the graphic marks the two offline drives in the erasure set and the footnote states the condition.</>)}>
            <div className="ab-frame right-[52%]">
              <Wordmark className="ab-logo u-h-6" />
              <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-16 leading-[0.98]">
                <L zh={<>丢盘，<br />不丢数据<Fn />。</>} en={<>Lose drives.<br />Keep data.<Fn /></>} />
              </h3>
              <Footnote {...M.drives.proof} className="u-text-4 max-w-[34em]" />
            </div>
            <div className="absolute top-(--m) bottom-(--m) left-[50%] grid w-[25%] content-center">
              <DriveGrid cols={6} rows={3} dead={[1, 4]} className="u-gap-x-2" colClassName="u-gap-2" labels labelClassName="u-mt-1 u-text-3.5" />
            </div>
            <div className="absolute top-(--m) right-(--m) bottom-(--m) flex flex-col items-end justify-end">
              <span className="ab-label mb-auto u-text-3.5">EC 4+2</span>
              <Cta {...CTA.download} className="u-h-13 u-gap-3 u-px-5 u-text-5.5" />
            </div>
          </Template>

          {/* 2 · 728 × 90 Leaderboard — S3 */}
          <Template span={8} title={t("通栏 · S3 调用", "Leaderboard · S3 calls")} spec="728 × 90 · IAB Leaderboard" w={728} h={90} themes={["white", "paper", "ink", "signal"]} tags={["display"]} file="ad-728x90-s3" note={t(<><b>用途：</b>桌面端页面顶部。字标、一行信息、一行脚注与按钮横向排开；底边的分片带即「底层」。</>, <><b>Use:</b> desktop, top of page. Wordmark, a one-line message with a one-line footnote and the button sit in a row; the shard band along the bottom edge is the “underneath”.</>)}>
            <div className="absolute inset-x-0 top-0 bottom-[calc(var(--u)*7)] flex items-center u-gap-x-22 u-px-22">
              <Wordmark className="ab-logo u-h-17 self-center" />
              <div className="grid min-w-0 flex-1 u-gap-5">
                <p className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-24 leading-none whitespace-nowrap">
                  <L zh={<>S3 调用不变，底层换成 Rust<Fn />。</>} en={<>Same S3 calls. Rust underneath.<Fn /></>} />
                </p>
                <Footnote {...M.s3.proof} className="u-text-10.5 whitespace-nowrap" />
              </div>
              <Cta {...CTA.docs} className="u-h-36 u-gap-8 u-px-15 u-text-14" />
            </div>
            <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[calc(var(--u)*7)] !w-full" cols={120} rows={1} k={4} m={2} seed={6} gap={0.3} fit="none" />
          </Template>

          {/* 3 · 320 × 50 Mobile Leaderboard — open */}
          <Template span={4} title={t("移动通栏 · 开源", "Mobile Leaderboard · open")} spec="320 × 50 · IAB Mobile Leaderboard" w={320} h={50} themes={["signal", "ink", "white"]} tags={["display"]} file="ad-320x50-open" note={t(<><b>用途：</b>移动端。只放字标、一句信息与按钮；放不下脚注，因此只投放无需条件的信息。</>, <><b>Use:</b> mobile. Wordmark, one line and the button only; there is no room for a footnote, so only messages that need no condition run here.</>)}>
            <div className="absolute inset-0 flex items-center u-gap-x-20 u-pr-14 u-pl-20">
              <Wordmark className="ab-logo u-h-19 self-center" />
              <i className="block u-h-48 w-px shrink-0 bg-ab-line" />
              <p className="ab-head [&_[data-l=zh]]:leading-[1.16] min-w-0 flex-1 u-text-25 leading-[1.08]">
                <L zh={<span className="u-text-28">开源，<br />不设暗条款。</span>} en={<>Open source.<br />No fine print.</>} />
              </p>
              <Cta {...CTA.short} className="u-h-60 u-gap-8 u-px-20 u-text-23" />
            </div>
          </Template>

          {/* 4 · 300 × 250 — drives */}
          <Template span={6} title={t("中矩形 · 丢盘", "Medium Rectangle · drives")} spec="300 × 250 · IAB Medium Rectangle" w={300} h={250} themes={["ink", "paper", "signal"]} tags={["display"]} file="ad-300x250-drives" note={t(<><b>用途：</b>基准尺寸。右侧六列即一个 EC 4+2 纠删集的六块盘，虚线两列为离线盘。</>, <><b>Use:</b> the reference size. The six columns on the right are the six drives of one EC 4+2 erasure set; the two dashed columns are offline.</>)}>
            <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[30%]" cols={6} rows={18} k={4} m={2} seed={3} dead={[1, 4]} fit="slice" gap={0.22} />
            <div className="absolute top-(--m) right-[calc(30%+var(--u)*6)] bottom-(--m) left-(--m) flex flex-col justify-between">
              <Wordmark className="ab-logo u-h-5.5" />
              <div className="grid justify-items-start u-gap-4">
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-9 leading-none">
                  <L zh={<>丢盘，<br />不丢数据<Fn />。</>} en={<>Lose drives.<br />Keep data.<Fn /></>} />
                </h3>
                <Cta {...CTA.download} className="u-h-11 u-gap-2 u-px-3.5 u-text-4.5" />
              </div>
              <Footnote {...M.drives.proof} className="u-text-3.75" />
            </div>
          </Template>

          {/* 5 · 300 × 250 — hardware */}
          <Template span={6} title={t("中矩形 · 自托管", "Medium Rectangle · self-hosted")} spec="300 × 250 · IAB Medium Rectangle" w={300} h={250} themes={["white", "paper", "ink"]} tags={["display"]} file="ad-300x250-hardware" note={t(<><b>用途：</b>数据主权。实线框代表用户自己的机柜，分片全部在框内；锁位于边框上。</>, <><b>Use:</b> data sovereignty. The solid frame is the customer’s own rack; every shard sits inside it, with the lock on the frame.</>)}>
            <div className="ab-frame u-gap-0">
              <div className="relative border-ab-fg u-px-3 u-pt-4 u-pb-3 [border-width:calc(var(--u)*0.5)]">
                <span className="absolute -top-[calc(var(--u)*2)] u-left-2.5 bg-ab-bg u-px-1 font-mono u-text-3.75 leading-none font-medium tracking-[0.08em] uppercase">
                  <L zh="你的机柜" en="Your rack" />
                </span>
                <span className="absolute -top-[calc(var(--u)*4)] u-right-2.5 grid u-size-7.5 place-items-center bg-ab-bg">
                  <Icon name="lock" strokeWidth={1.75} className="u-size-6" />
                </span>
                <ShardMatrix className="!h-auto" cols={12} rows={3} k={6} m={2} seed={9} gap={0.22} />
              </div>
              <div className="mt-auto">
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8 leading-[1.02]">
                  <L zh={<>数据只留在<br />你的硬件上。</>} en={<>Your data stays<br />on your hardware.</>} />
                </h3>
                <p className="ab-body u-mt-1.5 u-text-4.25 leading-snug">
                  <L {...M.hardware.proof} />
                </p>
              </div>
              <div className="u-mt-5 flex items-end justify-between">
                <Cta {...CTA.download} className="u-h-11 u-gap-2 u-px-3.5 u-text-4.5" />
                <Wordmark className="ab-logo u-mb-0.5 u-h-4.75 self-end" />
              </div>
            </div>
          </Template>

          {/* 6 · 300 × 600 — AI */}
          <Template span={5} title={t("半页 · AI 数据", "Half Page · AI data")} spec="300 × 600 · IAB Half Page" w={300} h={600} themes={["ink", "paper"]} tags={["display"]} file="ad-300x600-ai" note={t(<><b>用途：</b>面向 AI 基础设施团队。每一行条带标注一类 AI 数据的前缀；前缀为通用示例，不代表任何用户的数据。</>, <><b>Use:</b> for AI infrastructure teams. Each stripe is labelled with a common AI data prefix; the prefixes are generic examples, not any customer’s data.</>)}>
            <div className="ab-frame">
              <Wordmark className="ab-logo u-h-5" />
              <div>
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-9.5 leading-[1.02]">
                  <L zh={<span className="u-text-8.75 leading-[1.16]">为 AI 数据打造的<br />内存安全存储。</span>} en={<>Memory-safe<br />storage for<br />AI data.</>} />
                </h3>
                <p className="ab-body u-mt-3.5 u-text-4.5">
                  <L {...M.ai.proof} />
                </p>
              </div>
              <div className="grid u-gap-2.5">
                <span className="ab-label u-text-3">s3://training/</span>
                <StripeRows rows={AI_PREFIXES.slice(0, 5)} className="u-gap-x-1.25 u-gap-y-1.25" labelClassName="u-pl-2 u-text-3.5" />
              </div>
              <Cta {...CTA.docs} className="u-h-11 u-gap-2 u-px-3.5 u-text-4.5" />
            </div>
          </Template>

          {/* 7 · 160 × 600 — open */}
          <Template span={3} title={t("宽擎天柱 · 开源", "Wide Skyscraper · open")} spec="160 × 600 · IAB Wide Skyscraper" w={160} h={600} themes={["signal", "ink"]} tags={["display"]} file="ad-160x600-open" note={t(<><b>用途：</b>桌面端侧栏。许可证名称本身就是图形：所有条款都按正文字号公开，没有需要缩小的部分。</>, <><b>Use:</b> desktop sidebar. The licence name is the graphic: every term is public at full size, with nothing set small.</>)}>
            <div className="absolute u-inset-9 flex flex-col justify-between">
              <Wordmark className="ab-logo u-h-10" />
              <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-17 leading-[1.02]">
                <L zh={<span className="u-text-19 leading-[1.14]">开源，<br />不设<br />暗条款。</span>} en={<>Open<br />source.<br />No fine<br />print.</>} />
              </h3>
              <div className="grid u-gap-3">
                <span className="ab-label u-text-6.5 leading-[1.3] normal-case tracking-[0.02em]">Apache<br />License</span>
                <span className="ab-display u-text-42 leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:calc(var(--u)*0.7)_var(--ab-fg)]">2.0</span>
              </div>
              <Cta {...CTA.source} className="w-full u-h-19 u-px-5 u-text-7.5" />
            </div>
          </Template>

          {/* 8 · 1080 × 1920 — drives (story) */}
          <Template span={4} title={t("快拍 9:16 · 丢盘", "Story 9:16 · drives")} spec={t("1080 × 1920 · 橙色区域为平台界面，不导出", "1080 × 1920 · orange zones are platform UI, not exported")} w={1080} h={1920} themes={["ink", "signal"]} tags={["social"]} file="ad-1080x1920-drives" note={t(<><b>用途：</b>Stories 与 Reels。所有内容位于平台界面之外；橙色斜线区仅供排版参考，导出时自动去除。</>, <><b>Use:</b> Stories and Reels. Every element stays clear of the platform interface; the orange hatched zones are a layout guide and are removed on export.</>)}>
            <div className="absolute top-[290px] right-[180px] left-(--m) grid u-gap-7">
              <Wordmark className="ab-logo u-h-5" />
              <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-11 leading-[0.98]">
                <L zh={<>丢盘，<br />不丢数据<Fn />。</>} en={<>Lose drives.<br />Keep data.<Fn /></>} />
              </h3>
            </div>
            <div className="absolute top-[740px] right-[180px] left-(--m)">
              <DriveGrid cols={6} rows={3} dead={[1, 4]} className="u-gap-x-2" colClassName="u-gap-2" labels labelClassName="u-mt-1.25 u-text-2.25" />
            </div>
            <div className="absolute right-[180px] bottom-[440px] left-(--m) grid justify-items-start u-gap-4">
              <Cta {...CTA.download} className="u-h-9 u-gap-2.5 u-px-3.5 u-text-3.25" />
              <Footnote {...M.drives.proof} className="u-text-2.25 max-w-[30em]" />
            </div>
            <div className="no-export pointer-events-none absolute inset-0 font-mono u-text-2 leading-none tracking-[0.06em] text-oxide-500 uppercase">
              <div className="absolute inset-x-0 top-0 h-[250px] border-b-2 border-dashed border-oxide-500 bg-[repeating-linear-gradient(135deg,rgba(255,94,20,0.16)_0_2px,transparent_2px_16px)] u-p-3">
                <L zh="平台界面 · 顶部 250 px" en="Platform UI · top 250 px" />
              </div>
              <div className="absolute top-[1000px] right-0 bottom-[420px] w-[140px] border-l-2 border-dashed border-oxide-500 bg-[repeating-linear-gradient(135deg,rgba(255,94,20,0.16)_0_2px,transparent_2px_16px)]" />
              <div className="absolute inset-x-0 bottom-0 grid h-[420px] content-end border-t-2 border-dashed border-oxide-500 bg-[repeating-linear-gradient(135deg,rgba(255,94,20,0.16)_0_2px,transparent_2px_16px)] u-p-3">
                <L zh="平台界面 · 底部 420 px" en="Platform UI · bottom 420 px" />
              </div>
            </div>
          </Template>

          {/* 9 · 1080 × 1080 — S3 */}
          <Template span={6} title={t("信息流方图 · S3 调用", "Feed square · S3 calls")} spec="1080 × 1080 · LinkedIn / X / Facebook / Instagram" w={1080} h={1080} themes={["paper", "white", "ink"]} tags={["social"]} file="ad-1080-s3" note={t(<><b>用途：</b>迁移与兼容。上层是应用代码里不变的 S3 调用，下层是 RustFS 的分片；分界线即 S3 API。</>, <><b>Use:</b> migration and compatibility. The upper layer is the S3 calls that stay unchanged in application code; the lower layer is RustFS’s shards; the line between them is the S3 API.</>)}>
            <div className="ab-frame">
              <Wordmark className="ab-logo u-h-5" />
              <div className="grid justify-items-start u-gap-5">
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8.5 leading-[1]">
                  <L zh={<>S3 调用不变，<br />底层换成 Rust<Fn />。</>} en={<>Same S3 calls.<br />Rust underneath.<Fn /></>} />
                </h3>
                <Cta {...CTA.docs} className="u-h-8 u-gap-2 u-px-3 u-text-2.75" />
              </div>
              <div className="grid u-gap-2.5">
                <div className="flex flex-wrap u-gap-1.25">
                  {S3_CALLS.slice(0, 4).map((c) => (
                    <span key={c} className="border border-ab-line bg-ab-panel u-px-1.75 u-py-1.25 font-mono u-text-2.25 leading-none text-ab-fg-2">{c}</span>
                  ))}
                </div>
                <div className="flex items-center u-gap-2 font-mono u-text-1.75 leading-none font-medium tracking-[0.08em] text-ab-fg uppercase">
                  S3 API
                  <i className="block u-h-0.25 flex-1 bg-ab-fg" />
                </div>
                <ShardMatrix className="!h-auto" cols={24} rows={3} k={6} m={2} seed={14} gap={0.25} />
                <Footnote {...M.s3.proof} className="u-mt-2 u-text-2" />
              </div>
            </div>
          </Template>

          {/* 10 · 1080 × 1080 — open */}
          <Template span={6} title={t("信息流方图 · 开源", "Feed square · open")} spec="1080 × 1080 · LinkedIn / X / Facebook / Instagram" w={1080} h={1080} themes={["signal", "ink"]} tags={["social"]} file="ad-1080-open" note={t(<><b>用途：</b>开源许可。空心「2.0」是许可证版本，也是画面唯一的图形；不得加星号或小字。</>, <><b>Use:</b> the open-source licence. The outlined “2.0” is the licence version and the only graphic; no asterisks, no small print.</>)}>
            <div className="ab-frame">
              <Wordmark className="ab-logo u-h-5" />
              <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-9.5 leading-[1]">
                <L zh={<>开源，<br />不设暗条款。</>} en={<>Open source.<br />No fine print.</>} />
              </h3>
              <div className="grid self-end justify-items-start u-gap-2.5">
                <span className="ab-label u-text-2.5 normal-case tracking-[0.04em]">Apache License</span>
                <span className="ab-display u-text-34 leading-[0.76] tracking-[-0.05em] text-transparent [-webkit-text-stroke:calc(var(--u)*0.4)_var(--ab-fg)]">2.0</span>
              </div>
              <div className="flex items-center u-gap-4">
                <Cta {...CTA.source} className="u-h-8 u-gap-2 u-px-3 u-text-2.75" />
                <span className="ab-url u-text-2.25">github.com/rustfs/rustfs</span>
              </div>
            </div>
          </Template>

          {/* 11 · 1200 × 628 — AI link ad */}
          <Template span={6} title={t("链接广告 · AI 数据", "Link ad · AI data")} spec="1200 × 628 · LinkedIn / X / Facebook" w={1200} h={628} themes={["paper", "white", "ink"]} tags={["social"]} file="ad-1200x628-ai" note={t(<><b>用途：</b>链接卡片。平台会在图片下方显示标题与网址，图内只保留信息、依据与按钮。</>, <><b>Use:</b> link cards. The platform shows a headline and URL under the image, so the image keeps only the message, proof line and button.</>)}>
            <div className="absolute top-0 right-0 bottom-0 grid w-[44%] content-center bg-ab-panel u-px-7">
              <span className="ab-label u-mb-3 u-text-2.25">s3://training/</span>
              <StripeRows rows={AI_PREFIXES.slice(0, 6)} className="u-gap-x-1.25 u-gap-y-1.25" labelClassName="u-pl-2.5 u-text-2.5" />
            </div>
            <div className="ab-frame right-[calc(44%+var(--m))]">
              <Wordmark className="ab-logo u-h-5" />
              <div>
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8.5 leading-[1.02]">
                  <L zh={<>为 AI 数据打造的<br />内存安全存储。</>} en={<>Memory-safe storage<br />for AI data.</>} />
                </h3>
                <p className="ab-body u-mt-3 u-text-3.25">
                  <L {...M.ai.proof} />
                </p>
              </div>
              <Cta {...CTA.docs} className="u-h-8.5 u-gap-2 u-px-3.5 u-text-3" />
            </div>
          </Template>

          {/* 12 · 1920 × 1080 DOOH — hardware */}
          <Template span={6} title={t("数字屏 16:9 · 自托管", "Digital screen 16:9 · self-hosted")} spec="1920 × 1080 · DOOH" w={1920} h={1080} themes={["ink", "signal"]} tags={["outdoor"]} file="ad-dooh-hardware" note={t(<><b>用途：</b>地铁、机场与楼宇数字屏，以静帧投放。锁是画面唯一的焦点，不使用 Oxide 强调。</>, <><b>Use:</b> metro, airport and lobby screens, run as a still. The lock is the single focal point; Oxide is not used for emphasis.</>)}>
            <div className="ab-frame right-[48%]">
              <Wordmark className="ab-logo u-h-5" />
              <div>
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8.5 leading-[1.02]">
                  <L zh={<>数据只留在<br />你的硬件上。</>} en={<>Your data stays<br />on your hardware.</>} />
                </h3>
                <p className="ab-body u-mt-3 u-text-3.25">
                  <L {...M.hardware.proof} />
                </p>
              </div>
              <div className="flex items-center u-gap-3">
                <Cta {...CTA.download} className="u-h-8 u-gap-2 u-px-3 u-text-2.75" />
                <span className="ab-url u-text-2.5">rustfs.com</span>
              </div>
            </div>
            <div className="absolute top-[calc(var(--m)+var(--u)*4)] right-(--m) bottom-(--m) w-[40%] border-ab-fg u-p-5 [border-width:calc(var(--u)*0.4)]">
              <span className="absolute -top-[calc(var(--u)*1.25)] u-left-4 bg-ab-bg u-px-1.5 font-mono u-text-2 leading-none tracking-[0.08em] text-ab-fg uppercase">
                <L zh="你的机房" en="Your data centre" />
              </span>
              <span className="absolute -top-[calc(var(--u)*5.5)] u-right-4 grid u-size-11 place-items-center bg-ab-bg">
                <Icon name="lock" strokeWidth={1.2} className="u-size-10 text-ab-fg" />
              </span>
              <ShardMatrix className="!h-full" cols={8} rows={9} k={6} m={2} seed={12} mode="tone" gap={0.24} />
            </div>
          </Template>

          {/* 13 · 2400 × 800 Billboard — drives */}
          <Template span={12} title={t("户外大牌 3:1 · 丢盘", "Billboard 3:1 · drives")} spec={t("2400 × 800 · 比例母版", "2400 × 800 · proportion master")} w={2400} h={800} themes={["paper", "ink"]} tags={["outdoor"]} file="ad-billboard-drives" note={t(<><b>用途：</b>户外大牌，行车或步行中 5 秒内读完。信息占左侧一半，右侧六块盘中两块离线；脚注紧邻图形，说明成立条件。</>, <><b>Use:</b> roadside billboards, read in five seconds while moving. The message fills the left half; on the right, two of six drives are offline, with the footnote beside the graphic stating the condition.</>)}>
            <div className="ab-frame right-[46%]">
              <Wordmark className="ab-logo u-h-7" />
              <h3 className="ab-display u-text-19 leading-[0.94] tracking-[-0.03em]">
                <L zh={<span className="ab-zh u-text-20 leading-[1.08]">丢盘，<br />不丢数据<Fn />。</span>} en={<>Lose drives.<br />Keep data.<Fn /></>} />
              </h3>
              <div className="flex items-center u-gap-4">
                <Cta {...CTA.download} className="u-h-10 u-gap-3 u-px-4 u-text-3.75" />
                <span className="ab-url u-text-3.25">rustfs.com</span>
              </div>
            </div>
            <div className="absolute top-(--m) right-(--m) bottom-(--m) grid w-[38%] content-between">
              <DriveGrid cols={6} rows={4} dead={[1, 4]} className="u-gap-x-2.5" colClassName="u-gap-2.5" labels labelClassName="u-mt-1.5 u-text-2.25" />
              <Footnote {...M.drives.proof} className="u-text-2.5" />
            </div>
          </Template>

          {/* 14 · 1080 × 1350 — hardware */}
          <Template span={4} title={t("信息流竖图 4:5 · 自托管", "Feed portrait 4:5 · self-hosted")} spec="1080 × 1350 · Instagram / Facebook / LinkedIn" w={1080} h={1350} themes={["ink", "paper"]} tags={["social"]} file="ad-1080x1350-hardware" note={t(<><b>用途：</b>数据主权。机柜边框内是一个完整的纠删集；边框之外不放任何图形。</>, <><b>Use:</b> data sovereignty. A complete erasure set sits inside the rack frame; nothing is drawn outside it.</>)}>
            <div className="ab-frame">
              <Wordmark className="ab-logo u-h-5" />
              <div className="relative border-ab-fg u-p-4 [border-width:calc(var(--u)*0.35)]">
                <span className="absolute -top-[calc(var(--u)*1.25)] u-left-3 bg-ab-bg u-px-1.5 font-mono u-text-2 leading-none tracking-[0.08em] text-ab-fg uppercase">
                  <L zh="你的机柜" en="Your rack" />
                </span>
                <span className="absolute -top-[calc(var(--u)*4)] u-right-3 grid u-size-8 place-items-center bg-ab-bg">
                  <Icon name="lock" strokeWidth={1.25} className="u-size-7 text-ab-fg" />
                </span>
                <DriveGrid cols={8} rows={4} k={6} m={2} className="u-gap-x-1.25" colClassName="u-gap-1.25" />
                <div className="u-mt-2.5 flex justify-between font-mono u-text-1.75 leading-none tracking-[0.08em] text-ab-muted uppercase">
                  <span>EC 6+2</span>
                  <span>
                    <L zh="8 块盘" en="8 drives" />
                  </span>
                </div>
              </div>
              <div className="grid justify-items-start u-gap-5">
                <div>
                  <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8 leading-[1.02]">
                    <L zh={<>数据只留在<br />你的硬件上。</>} en={<>Your data stays<br />on your hardware.</>} />
                  </h3>
                  <p className="ab-body u-mt-2.5 u-text-3">
                    <L {...M.hardware.proof} />
                  </p>
                </div>
                <Cta {...CTA.download} className="u-h-8 u-gap-2 u-px-3 u-text-2.75" />
              </div>
            </div>
          </Template>

          {/* 15 · 1200 × 1800 Lightbox — S3 */}
          <Template span={4} title={t("地铁灯箱 2:3 · S3 调用", "Metro lightbox 2:3 · S3 calls")} spec="1200 × 1800 · 2:3" w={1200} h={1800} themes={["signal", "ink"]} tags={["outdoor"]} file="ad-lightbox-s3" note={t(<><b>用途：</b>地铁站台与通道。画面自上而下是同一个剖面：不变的 S3 调用、S3 API 分界线、底层的分片。</>, <><b>Use:</b> metro platforms and corridors. Top to bottom is one cross-section: the unchanged S3 calls, the S3 API line, then the shards underneath.</>)}>
            <div className="ab-frame">
              <Wordmark className="ab-logo u-h-5" />
              <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8.5 leading-[1]">
                <L zh={<>S3 调用不变，<br />底层换成 Rust<Fn />。</>} en={<>Same S3 calls.<br />Rust underneath.<Fn /></>} />
              </h3>
              <div className="grid u-gap-3">
                <div className="grid grid-cols-2 u-gap-1.5">
                  {S3_CALLS.slice(0, 4).map((c) => (
                    <span key={c} className="border border-ab-line u-px-3 u-py-3.5 font-mono u-text-3.25 leading-none text-ab-fg">{c}</span>
                  ))}
                </div>
                <div className="flex items-center u-gap-2 font-mono u-text-2 leading-none font-medium tracking-[0.08em] text-ab-fg uppercase">
                  S3 API
                  <i className="block u-h-0.25 flex-1 bg-ab-fg" />
                </div>
                <ShardMatrix className="mx-[calc(var(--m)*-1)] !h-auto !w-[calc(100%+var(--m)*2)]" cols={11} rows={4} k={4} m={2} seed={22} gap={0.2} />
              </div>
              <div className="grid justify-items-start u-gap-3.5">
                <Cta {...CTA.docs} className="u-h-8 u-gap-2 u-px-3 u-text-2.75" />
                <Footnote {...M.s3.proof} className="u-text-2" />
              </div>
            </div>
          </Template>

          {/* 16 · A2 poster — AI */}
          <Template span={4} title={t("A2 海报 · AI 数据", "A2 poster · AI data")} spec={t("1190 × 1684 pt · A2 · 印刷加 3 mm 出血", "1190 × 1684 pt · A2 · add 3 mm bleed")} w={1190} h={1684} themes={["paper", "white", "ink"]} tags={["outdoor"]} file="ad-a2-ai" note={t(<><b>用途：</b>活动现场与办公场所。分片矩阵占据画面中部，每一行条带标注一类 AI 数据；二维码指向文档首页，印刷尺寸不小于 20 mm。</>, <><b>Use:</b> events and offices. The shard matrix fills the middle, each stripe labelled with a kind of AI data; the QR code links to the documentation home and prints at 20 mm or larger.</>)}>
            <div className="ab-frame">
              <div className="ab-row">
                <Wordmark className="ab-logo u-h-5" />
                <span className="ab-label u-text-2.25">s3://training/</span>
              </div>
              <div>
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-9.5 leading-[1]">
                  <L zh={<span className="u-text-8.75 leading-[1.14]">为 AI 数据打造的<br />内存安全存储。</span>} en={<>Memory-safe<br />storage for<br />AI data.</>} />
                </h3>
                <p className="ab-body u-mt-3 u-text-3.25">
                  <L {...M.ai.proof} />
                </p>
              </div>
              <StripeRows rows={AI_PREFIXES} className="u-gap-x-1.25 u-gap-y-1.25" labelClassName="u-pl-3 u-text-2.75" />
              <div className="grid grid-cols-[1fr_auto] items-end u-gap-6 border-t border-ab-line u-pt-4">
                <div className="grid justify-items-start u-gap-3">
                  <Cta {...CTA.docs} className="u-h-7.5 u-gap-2 u-px-3 u-text-2.5" />
                  <span className="ab-url u-text-2.25">docs.rustfs.com</span>
                </div>
                <QR value="https://docs.rustfs.com" quiet={0} className="u-size-14 text-ab-fg" />
              </div>
            </div>
          </Template>
        </TemplateGrid>
      </Section>

      {/* ------------------------------------------------------------------ Animated */}
      <Section
        id="animated"
        tag="Animated banners"
        title={t("HTML5 动画横幅", "HTML5 animated banners")}
        lede={
          <p>
            {t(
              "动画只用于展示广告，并且只使用品牌动作：写入（分片依次出现）与修复（分片脱落、校验块闪烁、分片重建）。动画在任意时刻被截停，画面都应可读；结束时停在与静态版完全一致的尾帧。",
              "Animation is for display ads only and uses only the brand moves: write (shards appear in sequence) and heal (a shard drops out, parity flashes, the shard is rebuilt). The ad must read at any moment it is paused, and it ends on a frame identical to the static version.",
            )}
          </p>
        }
      >
        <div className="grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
          {[
            ["≤ 15 s", t("总时长", "Total duration"), t("含全部循环", "All loops included")],
            ["≤ 3", t("循环次数", "Loops"), t("之后停在尾帧", "Then it stops on the end frame")],
            ["≤ 3 Hz", t("闪烁频率", "Flash rate"), t("每秒不超过 3 次", "No more than three flashes a second")],
            ["≤ 150 KB", t("首次加载", "Initial load"), t("压缩后；其余资源在页面加载后补载", "Compressed; anything else loads after the page")],
          ].map(([v, k, d]) => (
            <div key={v} className="grid content-start gap-1.5 border-r border-b border-border p-5">
              <b className="font-display text-[clamp(28px,3.4vw,40px)] leading-none font-extrabold tracking-[-0.02em] [font-stretch:125%]">{v}</b>
              <span className="mt-2 text-sm font-semibold">{k}</span>
              <span className="text-[13px] leading-snug text-muted-foreground">{d}</span>
            </div>
          ))}
        </div>
        <HealBanner />
        <ul className="m-0 grid max-w-[72ch] list-[square] gap-1.5 pl-5 text-[15px] leading-relaxed text-subtle">
          <li>{t("尾帧须同时包含字标、信息、依据或脚注与按钮，并另行导出为同尺寸静态图，供不支持 HTML5 的版位使用。", "The end frame carries the wordmark, message, proof line or footnote and button, and is also exported as a static image of the same size for placements without HTML5.")}</li>
          <li>{t("不得使用弹跳、回弹、旋转、缩放冲击或视差；缓动只用 ease-standard 与 ease-emphasized。", "No bounce, overshoot, spin, zoom punches or parallax; easing is ease-standard or ease-emphasized only.")}</li>
          <li>{t("不得自动播放声音。整个画面为点击区域，使用平台提供的 clickTag。", "No autoplay sound. The whole artboard is the click area, using the platform's clickTag.")}</li>
          <li>{t("用户开启「减少动态效果」时，直接显示尾帧。字体须转为轮廓或子集化后内嵌，不得加载外部字体。", "With reduced motion on, show the end frame directly. Outline or subset and embed the fonts; never load external fonts.")}</li>
        </ul>
      </Section>

      {/* ------------------------------------------------------------------ Do & Don't */}
      <Section
        id="rules"
        tag="Do & Don't"
        title={t("投放前检查", "Before a campaign goes live")}
        lede={<p>{t("每则广告上线前，须逐项对照以下规则。", "Check every ad against these rules before it goes live.")}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {/* 1 · one message */}
          <DoDont kind="do" on="surface" caption={t("一则广告只讲一条信息，配一行依据。", "One message, one proof line.")}>
            <Mini w={300} h={250} theme="ink" lang={lang} scale={0.9}>
              <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[30%]" cols={6} rows={18} k={4} m={2} seed={3} dead={[1, 4]} fit="slice" gap={0.22} />
              <div className="absolute top-(--m) right-[calc(30%+var(--u)*6)] bottom-(--m) left-(--m) flex flex-col justify-between">
                <Wordmark className="ab-logo u-h-5.5" />
                <div className="grid justify-items-start u-gap-4">
                  <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-9 leading-none">
                    <L zh={<>丢盘，<br />不丢数据<Fn />。</>} en={<>Lose drives.<br />Keep data.<Fn /></>} />
                  </h3>
                  <Cta {...CTA.download} className="u-h-11 u-gap-2 u-px-3.5 u-text-4.5" />
                </div>
                <Footnote {...M.drives.proof} className="u-text-3.75" />
              </div>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("把多条信息与功能清单塞进同一画面，读者一条也记不住。", "Several messages and a feature list on one artboard; the reader keeps none of them.")}>
            <Mini w={300} h={250} theme="ink" lang={lang} scale={0.9}>
              <div className="absolute u-inset-6 flex flex-col u-gap-2.5">
                <Wordmark className="ab-logo u-h-4.5" />
                <p className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-6 leading-[1.05]">
                  <L zh="丢盘，不丢数据。S3 调用不变。开源，不设暗条款。" en="Lose drives. Keep data. Same S3 calls. Open source. No fine print." />
                </p>
                <ul className="m-0 grid list-[square] u-gap-0.5 u-pl-5 u-text-3.75 text-ab-fg-2">
                  <li><L zh="纠删码与位腐烂保护" en="Erasure coding and bitrot protection" /></li>
                  <li><L zh="版本控制与对象锁定" en="Versioning and Object Lock" /></li>
                  <li><L zh="复制、生命周期、KMS" en="Replication, lifecycle, KMS" /></li>
                </ul>
                <div className="mt-auto flex u-gap-2">
                  <Cta {...CTA.download} className="u-h-9 u-gap-1.5 u-px-2.5 u-text-3.5" arrow={false} />
                  <Cta {...CTA.docs} className="u-h-9 u-gap-1.5 u-px-2.5 u-text-3.5" arrow={false} />
                </div>
              </div>
            </Mini>
          </DoDont>

          {/* 2 · footnoted claim */}
          <DoDont kind="do" on="paper" bodyClassName="place-items-start content-center gap-3" caption={t("有条件的表述加上标，并在同一画面给出脚注。", "A conditional claim carries a superscript and its footnote on the same artboard.")}>
            <span className="font-display text-[30px] leading-[1.05] font-[750] text-neutral-950 [font-stretch:112%]">
              {t("丢盘，不丢数据", "Lose drives. Keep data.")}
              <sup className="ml-0.5 font-sans text-[12px] font-semibold">1</sup>
              {t("。", "")}
            </span>
            <span className="grid max-w-[34em] grid-cols-[auto_1fr] gap-x-1.5 text-[12px] leading-snug text-neutral-700">
              <b className="font-semibold">1</b>
              {t(M.drives.proof.zh, M.drives.proof.en)}
            </span>
          </DoDont>
          <DoDont kind="dont" on="paper" bodyClassName="place-items-start content-center gap-3" caption={t("无来源、无条件的最高级表述。", "An unqualified superlative with no source and no condition.")}>
            <span className="font-display text-[30px] leading-[1.05] font-[750] text-neutral-950 [font-stretch:112%]">{t("最快的 S3 存储。", "The fastest S3 storage.")}</span>
            <span className="text-[12px] leading-snug text-neutral-500">{t("（无脚注）", "(no footnote)")}</span>
          </DoDont>

          {/* 3 · CTA verb */}
          <DoDont kind="do" on="ink" bodyClassName="gap-4" caption={t("按钮以动词开头，说明点击后发生什么。", "The button starts with a verb and says what happens next.")}>
            <span className="inline-flex h-11 items-center gap-2.5 bg-blue-500 px-4.5 text-[15px] font-semibold text-white">
              {t("下载 RustFS", "Download RustFS")}
              <Icon name="arrow-right" strokeWidth={2} className="size-4.5" />
            </span>
          </DoDont>
          <DoDont kind="dont" on="ink" bodyClassName="gap-4" caption={t("「点击这里」不说明结果；圆角与描边也不属于品牌按钮。", "“Click here” says nothing about the result; rounded and outlined buttons are not brand buttons either.")}>
            <span className="inline-flex h-11 items-center rounded-full border-2 border-blue-400 px-6 text-[15px] font-semibold text-blue-300">{t("点击这里 >>", "Click here >>")}</span>
          </DoDont>

          {/* 4 · logo present */}
          <DoDont kind="do" on="surface" caption={t("字标始终出现，与按钮同在画面内。", "The wordmark is always present, alongside the button.")}>
            <Mini w={320} h={50} theme="signal" lang={lang} scale={1}>
              <div className="absolute inset-0 flex items-center u-gap-x-20 u-pr-14 u-pl-20">
                <Wordmark className="ab-logo u-h-19 self-center" />
                <i className="block u-h-48 w-px shrink-0 bg-ab-line" />
                <p className="ab-head [&_[data-l=zh]]:leading-[1.16] min-w-0 flex-1 u-text-25 leading-[1.08]">
                  <L zh={<span className="u-text-28">开源，<br />不设暗条款。</span>} en={<>Open source.<br />No fine print.</>} />
                </p>
                <Cta {...CTA.short} className="u-h-60 u-gap-8 u-px-20 u-text-23" />
              </div>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("缺少字标，读者不知道广告来自谁。", "No wordmark: the reader cannot tell who the ad is from.")}>
            <Mini w={320} h={50} theme="signal" lang={lang} scale={1}>
              <div className="absolute inset-0 flex items-center u-gap-x-20 u-pr-14 u-pl-20">
                <p className="ab-head [&_[data-l=zh]]:leading-[1.16] min-w-0 flex-1 u-text-25 leading-[1.08]">
                  <L zh={<span className="u-text-28">开源，<br />不设暗条款。</span>} en={<>Open source.<br />No fine print.</>} />
                </p>
                <Cta {...CTA.short} className="u-h-60 u-gap-8 u-px-20 u-text-23" />
              </div>
            </Mini>
          </DoDont>

          {/* 5 · Oxide focal */}
          <DoDont kind="do" on="surface" caption={t("Oxide 只标记校验块；按钮与文字不用橙色。", "Oxide marks parity only; the button and text stay out of orange.")}>
            <Mini w={300} h={250} theme="paper" lang={lang} scale={0.9}>
              <div className="absolute inset-x-0 top-0 u-h-30 overflow-hidden">
                <ShardMatrix className="!h-full" cols={24} rows={3} k={4} m={2} seed={5} gap={0.22} fit="slice" mode="tone" />
              </div>
              <div className="absolute inset-x-(--m) bottom-(--m) grid justify-items-start u-gap-4">
                <Wordmark className="ab-logo u-h-5" />
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8.5 leading-none">
                  <L zh={<>S3 调用不变，<br />底层换成 Rust。</>} en={<>Same S3 calls.<br />Rust underneath.</>} />
                </h3>
                <Cta {...CTA.docs} className="u-h-11 u-gap-2 u-px-3.5 u-text-4.5" />
              </div>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("橙色铺满底色、标题与按钮，失去唯一焦点。", "Orange on the background, the headline and the button; there is no single focal point left.")}>
            <Mini w={300} h={250} theme="paper" lang={lang} scale={0.9}>
              <div className="absolute inset-0 bg-oxide-100" />
              <div className="absolute inset-x-0 top-0 u-h-30 overflow-hidden [--mx-data:#FF5E14] [--mx-parity:#C2410C]">
                <ShardMatrix className="!h-full" cols={24} rows={3} k={4} m={2} seed={5} gap={0.22} fit="slice" mode="tone" />
              </div>
              <div className="absolute inset-x-(--m) bottom-(--m) grid justify-items-start u-gap-4">
                <Wordmark className="ab-logo u-h-5 !text-oxide-500" />
                <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-8.5 leading-none text-oxide-600">
                  <L zh={<>S3 调用不变，<br />底层换成 Rust。</>} en={<>Same S3 calls.<br />Rust underneath.</>} />
                </h3>
                <span className="inline-flex u-h-11 items-center bg-oxide-500 u-px-3.5 font-sans u-text-4.5 font-semibold text-white">
                  <L {...CTA.docs} />
                </span>
              </div>
            </Mini>
          </DoDont>

          {/* 6 · tuned small size */}
          <DoDont kind="do" on="surface" caption={t("小尺寸单独排版：字标、一句信息、一个按钮。", "Small sizes get their own layout: wordmark, one line, one button.")}>
            <Mini w={320} h={50} theme="ink" lang={lang} scale={1}>
              <div className="absolute inset-0 flex items-center u-gap-x-20 u-pr-14 u-pl-20">
                <Wordmark className="ab-logo u-h-19 self-center" />
                <i className="block u-h-48 w-px shrink-0 bg-ab-line" />
                <p className="ab-head [&_[data-l=zh]]:leading-[1.16] min-w-0 flex-1 u-text-25 leading-[1.08]">
                  <L zh={<span className="u-text-28">开源，<br />不设暗条款。</span>} en={<>Open source.<br />No fine print.</>} />
                </p>
                <Cta {...CTA.short} className="u-h-60 u-gap-8 u-px-20 u-text-23" />
              </div>
            </Mini>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("把 300 × 250 的版式直接缩进 320 × 50，文字小到无法阅读。", "A 300 × 250 layout shrunk into 320 × 50; the text becomes unreadable.")}>
            <div className="relative h-[50px] w-[320px] overflow-hidden bg-neutral-950">
              <div className="absolute top-0 left-[130px]">
                <Mini w={300} h={250} theme="ink" lang={lang} scale={0.2}>
                  <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[30%]" cols={6} rows={18} k={4} m={2} seed={3} dead={[1, 4]} fit="slice" gap={0.22} />
                  <div className="absolute top-(--m) right-[calc(30%+var(--u)*6)] bottom-(--m) left-(--m) flex flex-col justify-between">
                    <Wordmark className="ab-logo u-h-5.5" />
                    <h3 className="ab-head [&_[data-l=zh]]:leading-[1.16] u-text-9 leading-none">
                      <L zh={<>丢盘，<br />不丢数据。</>} en={<>Lose drives.<br />Keep data.</>} />
                    </h3>
                    <Footnote {...M.drives.proof} className="u-text-3.75" />
                  </div>
                </Mini>
              </div>
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="ads" />
    </Page>
  )
}

