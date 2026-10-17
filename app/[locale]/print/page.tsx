import type { Metadata } from "next"
import { L } from "@/components/artboard/l"
import { TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { AppIcon, BrandSymbol, Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { QR } from "@/components/brand/qr"
import { Stripe } from "@/components/brand/stripe"
import { CodeBlock } from "@/components/site/code-block"
import { DoDont, Note, Page, PageFooter, PageHeader, Section, Spec, Sub, Table } from "@/components/site/page"
import { isLocale, setLocale, t } from "@/lib/i18n"
import { Figure, GuideBox, GuideLine, GuideTag, GuideZone, InkCard, phys, PrintTemplate, SignArrow } from "./_parts"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "印刷与活动" : "Print & events" }
}

const URL = "https://rustfs.com"

/** Email signature: table layout and inline styles, the only markup mail clients render reliably. */
const signature = (name: string, title: string) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Geist,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#0B0E14;">
  <tr>
    <td style="padding:0 16px 0 0;vertical-align:top;">
      <img src="{ICON_PNG_URL}" width="48" height="48" alt="RustFS" style="display:block;width:48px;height:48px;border:0;">
    </td>
    <td style="vertical-align:top;">
      <div style="font-size:15px;line-height:20px;font-weight:600;">${name}</div>
      <div style="font-size:13px;line-height:18px;color:#5A616D;">${title}</div>
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid #DCE0E6;font-family:'Geist Mono',Menlo,Consolas,monospace;font-size:12px;line-height:16px;color:#9AA0AC;">
        <a href="mailto:name@rustfs.com" style="color:#014FDD;text-decoration:none;">name@rustfs.com</a> &middot;
        <a href="https://rustfs.com" style="color:#014FDD;text-decoration:none;">rustfs.com</a> &middot;
        <a href="https://github.com/rustfs/rustfs" style="color:#014FDD;text-decoration:none;">github.com/rustfs/rustfs</a>
      </div>
    </td>
  </tr>
</table>`

const BANDING = ["#0062FF", "#2461DD", "#4961BC", "#6D609A", "#926079", "#B65F57", "#DB5F36", "#FF5E14"]

export default async function PrintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)

  const sigHtml = signature(t("姓名", "Name"), t("职位 · RustFS", "Title · RustFS"))

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/print/"
        label="Templates · Print & events"
        title={t("印刷与活动", "Print & events")}
        subtitle={t("Print & events", "印刷与活动")}
        lede={t(
          "文具、周边与活动物料的版式。画板仅供审阅，印刷文件须另行制作。",
          "Layouts for stationery, merchandise and events. Artboards are for review; print files are prepared separately.",
        )}
        meta={[
          { k: t("模板", "Templates"), v: "21" },
          { k: t("底色", "Surfaces"), v: "Ink / Paper / White / Signal" },
          { k: t("语言", "Languages"), v: "中 / EN" },
          { k: t("生产文件", "Production"), v: t("300 dpi · 3 mm 出血 · PDF/X-4", "300 dpi · 3 mm bleed · PDF/X-4") },
        ]}
      />

      {/* ------------------------------------------------------------------ Production */}
      <Section
        id="production"
        tag="Print production"
        title={t("印刷生产", "Print production")}
        lede={<p>{t("颜色以打样为准，尺寸以毫米计，标志远离裁切线。", "Colour is approved on a proof, sizes are in millimetres, and marks stay clear of the trim.")}</p>}
      >
        <TemplateGrid>
          <PrintTemplate
            span={7}
            title={t("名片骨架 · 出血、裁切与安全区", "Anatomy · bleed, trim and safe zone")}
            spec="110 × 74 mm · 1320 × 888 · 12 px/mm"
            w={1320}
            h={888}
            themes={["paper", "white", "ink"]}
            file="print-anatomy"
            style={phys(12, 7)}
          >
            {/* crop marks, 3 mm off the trim */}
            {[
              "left-0 top-[120px] h-px w-[72px]",
              "right-0 top-[120px] h-px w-[72px]",
              "left-0 top-[767px] h-px w-[72px]",
              "right-0 top-[767px] h-px w-[72px]",
              "top-0 left-[120px] w-px h-[72px]",
              "bottom-0 left-[120px] w-px h-[72px]",
              "top-0 left-[1199px] w-px h-[72px]",
              "bottom-0 left-[1199px] w-px h-[72px]",
            ].map((c) => (
              <i key={c} className={`absolute bg-ab-fg ${c}`} />
            ))}
            {/* bleed area carries the card's surface */}
            <div className="t-signal absolute top-[84px] left-[84px] h-[720px] w-[1152px] bg-ab-bg text-ab-fg [--mx-data:var(--ab-data)] [--mx-parity:var(--ab-parity)]">
              <Wordmark className="ab-logo absolute bottom-[108px] left-[108px] h-[80.8px]" />
              <Stripe className="absolute top-[108px] right-[108px] text-[36px]" />
            </div>
            {/* trim (solid) and safe zone (dashed) */}
            <div className="pointer-events-none absolute top-[119px] left-[119px] h-[650px] w-[1082px] border border-oxide-500" />
            <div className="pointer-events-none absolute top-[179px] left-[179px] h-[530px] w-[962px] border border-dashed border-oxide-500" />
            {[
              [<L key="a" zh="① 出血 3 mm" en="① Bleed 3 mm" />, "left-[140px] top-[18px]"],
              [<L key="b" zh="② 裁切线 90 × 54 mm" en="② Trim 90 × 54 mm" />, "left-[500px] top-[18px]"],
              [<L key="c" zh="③ 安全区 5 mm" en="③ Safe zone 5 mm" />, "left-[196px] top-[196px]"],
              [<L key="d" zh="④ 字标宽 40 mm，不小于 18 mm" en="④ Wordmark 40 mm wide, 18 mm min." />, "left-[196px] top-[500px]"],
            ].map(([label, pos], i) => (
              <span key={i} className={`absolute bg-neutral-950/85 px-[12px] py-[10px] font-mono text-[28px] leading-none tracking-[0.02em] text-oxide-500 ${pos}`}>
                {label}
              </span>
            ))}
          </PrintTemplate>
          <div className="col-span-12 grid grid-cols-2 content-start gap-x-6 gap-y-6 md:col-span-5 md:pt-14">
            <Figure n="3" unit="mm" label={t("出血", "Bleed")}>
              {t("底色与图形越过裁切线。", "Backgrounds and graphics run past the trim.")}
            </Figure>
            <Figure n="5" unit="mm" label={t("安全区", "Safe zone")}>
              {t("文字、标志与二维码在此线内。", "Text, marks and QR codes stay inside.")}
            </Figure>
            <Figure n="300" unit="dpi" label={t("分辨率", "Resolution")}>
              {t("按成品尺寸；标志与文字为矢量。", "At finished size; marks and type vector.")}
            </Figure>
            <Figure n="6" unit="pt" label={t("最小字号", "Minimum type")}>
              {t("反白 ≥ 8 pt，不用细体。", "Reversed ≥ 8 pt, never light.")}
            </Figure>
            <Figure n="18" unit="mm" label={t("字标最小宽度", "Wordmark min. width")}>
              {t("更小时改用符号。", "Below this, use the symbol.")}
            </Figure>
            <Figure n="5" unit="mm" label={t("符号最小宽度", "Symbol min. width")}>
              {t("更小的物件不放标志。", "Smaller items carry no mark.")}
            </Figure>
          </div>
        </TemplateGrid>

        <Sub title={t("印刷色彩", "Colour in print")} aside={t("参考值 · 须以打样确认", "Reference values · confirm on a proof")}>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5">
            <InkCard
              name="Signal Blue"
              sub="#0062FF"
              swatch="#0062FF"
              value="C90 M60 Y0 K0"
              cmyk={[90, 60, 0, 0]}
              note={t("超出四色色域；关键物料宜用专色。", "Outside the process gamut; colour-critical pieces should use a spot ink.")}
            />
            <InkCard
              name="Oxide"
              sub="#FF5E14"
              swatch="#FF5E14"
              value="C0 M70 Y95 K0"
              cmyk={[0, 70, 95, 0]}
              note={t("仅用于校验块与焦点，约 10%，不得铺底。", "Parity and one focal point, about 10%. Never a flood.")}
            />
            <InkCard
              name={t("Ink · 大面积", "Ink · large areas")}
              sub="#0B0E14"
              swatch="#0B0E14"
              value="C60 M40 Y20 K100"
              cmyk={[60, 40, 20, 100]}
              note={t("底色与大色块用四色黑，总墨量 220%。", "Backgrounds and large fields: rich black, 220% total ink.")}
            />
            <InkCard
              name={t("Ink · 文字与细线", "Ink · type and lines")}
              sub="#0B0E14"
              swatch="#231F20"
              value="C0 M0 Y0 K100"
              cmyk={[0, 0, 0, 100]}
              note={t("文字与细线只用单色黑；灰色用 K 网点。", "Type and fine lines in black only; greys are K tints.")}
            />
            <InkCard
              name="White / Paper"
              sub="#FFFFFF · #F4F6F9"
              swatch="#FFFFFF"
              value={t("不着墨 · 白墨", "No ink · white ink")}
              cmyk={null}
              note={t("浅底即纸色，不得用灰网模拟；深色承印物用白墨或白箔。", "Bare stock, never a grey tint; white ink or foil on dark stock.")}
            />
          </div>
          <Note tone="parity">
            {t(
              <>
                <b>CMYK 仅为参考值</b>：每批须在实际承印物上打样，于 D50 光源下与批准色样比对后方可量产；不指定 Pantone，专色按批准色样调配。
              </>,
              <>
                <b>CMYK values are references only</b>: proof every job on the actual stock and match it to the approved reference under D50 light before the run; no Pantone is named, and spot inks are mixed to the approved reference.
              </>,
            )}
          </Note>
        </Sub>

        <Sub title={t("生产规则", "Production rules")}>
          <Table
            head={[t("项目", "Item"), t("规则", "Rule")]}
            rows={[
              [t("色彩模式", "Colour mode"), t("CMYK 或专色；不以屏幕为准", "CMYK or spot; never judged on screen")],
              [t("线宽", "Line weight"), t("≥ 0.25 pt；反白 ≥ 0.5 pt", "≥ 0.25 pt; reversed ≥ 0.5 pt")],
              [t("渐变与网点", "Gradients and tints"), t("不用渐变、阴影与透明；网点 ≥ 10%", "No gradients, shadows or transparency; tints ≥ 10%")],
              [t("二维码", "QR codes"), t("宽 ≥ 15 mm，静区 4 模块，不用圆点模块；付印前两部手机实测", "≥ 15 mm wide, 4-module quiet zone, square modules; test on two phones before print")],
              [t("深色承印物", "Dark substrates"), t("彩色下铺白墨；烫印仅限标志，白或银哑光箔，笔画 ≥ 0.3 mm，不用金箔或镭射箔", "White underbase beneath colour; foil for marks only, matte white or silver, strokes ≥ 0.3 mm, never gold or holographic")],
              [t("模切", "Die-cuts"), t("一律直角", "Square corners only")],
              [t("交付", "Delivery"), t("PDF/X-4，嵌入字体，含出血与裁切标记；命名如 rustfs-card-90x54-v1.pdf", "PDF/X-4, fonts embedded, bleed and crop marks; named like rustfs-card-90x54-v1.pdf")],
            ]}
          />
        </Sub>

        <Sub title={t("纸张与工艺", "Stock and finishing")} aside={t("推荐项 · 以打样为准", "Recommended · confirm on a proof")}>
          <div className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "layers" as const, k: t("文具", "Stationery"), v: t("非涂布纸：名片 350 g/m²，信纸 100–120 g/m²，信封 100 g/m²。Signal Blue 会偏暗，须单独打样。", "Uncoated: cards 350 g/m², letterhead 100–120 g/m², envelopes 100 g/m². Signal Blue darkens; proof it separately.") },
              { icon: "image" as const, k: t("海报与指示", "Posters and signs"), v: t("哑光涂布纸 170–200 g/m²；指示牌裱 5 mm KT 板或 PVC。", "Matte coated 170–200 g/m²; signs on 5 mm foam board or PVC.") },
              { icon: "site" as const, k: t("大幅面", "Large format"), v: t("背景墙与桌布用布面热升华；易拉宝用防卷曲 PP 或 PET 膜。", "Dye-sublimated fabric for backdrops and table covers; anti-curl PP or PET for roll-ups.") },
              { icon: "chip" as const, k: t("周边制品", "Merchandise"), v: t("织物丝印 ≤ 3 色或数码直喷；马克杯热转印；贴纸哑膜乙烯基。", "Textiles: screen print (≤ 3 colours) or DTG; mugs: sublimation; stickers: matte vinyl.") },
            ].map(({ icon, k, v }) => (
              <div key={icon} className="grid content-start gap-3 border-r border-b border-border p-5">
                <Icon name={icon} className="size-5 text-brand" />
                <b className="text-[15px] leading-snug font-semibold">{k}</b>
                <p className="text-sm leading-relaxed text-subtle">{v}</p>
              </div>
            ))}
          </div>
        </Sub>

        <Sub title={t("成品尺寸", "Finished sizes")}>
          <Table
            mono={[1]}
            head={[t("物料", "Item"), t("成品 mm", "Finished mm"), t("安全区 / 遮挡区", "Safe / hidden zone")]}
            rows={[
              [t("名片", "Business card"), "90 × 54", t("5 mm；边距 6 mm", "5 mm; margin 6 mm")],
              [t("信纸 A4", "Letterhead A4"), "210 × 297", t("边距 20 mm；页脚距底 12 mm", "20 mm sides; footer 12 mm up")],
              [t("DL 信封", "DL envelope"), "220 × 110", t("底边 15 mm 留空；右上邮资区", "Bottom 15 mm clear; postage top right")],
              [t("插卡式名牌", "Slide-in name tag"), "100 × 70", t("上缘 12 mm 插口区", "Top 12 mm slot")],
              [t("贴纸版", "Sticker sheet"), "150 × 150", t("越过模切线 1.5 mm", "1.5 mm past each cut")],
              [t("T 恤 · 胸前", "T-shirt · chest"), "100 × 100", t("领口下 75 mm", "75 mm below collar")],
              [t("T 恤 · 背后", "T-shirt · back"), "300 × 360", t("领口下 100 mm", "100 mm below collar")],
              [t("帆布袋", "Tote bag"), "250 × 300", t("距缝线 20 mm", "20 mm from seams")],
              [t("A5 笔记本封面", "A5 notebook cover"), "148 × 210", t("书脊侧 12 mm", "12 mm spine side")],
              [t("马克杯", "Mug wrap"), "200 × 85", t("两端 15 mm 手柄区", "15 mm handle zone each end")],
              [t("挂绳", "Lanyard"), t("20 × 100 循环", "20 × 100 repeat"), t("上下 2 mm 缝边", "2 mm hem each edge")],
              [t("胸牌", "Conference badge"), "100 × 140", t("上缘 15 mm 挂孔区", "Top 15 mm clip")],
              [t("展台背景墙", "Booth backdrop"), "3000 × 2400", t("1.0 m 以下被台面遮挡", "Hidden below 1.0 m")],
              [t("易拉宝", "Roll-up banner"), "850 × 2000", t("底部 200 mm 被遮挡", "Bottom 200 mm hidden")],
              [t("桌布前挡", "Table cover front"), "1800 × 760", t("上缘 50 mm 翻过桌沿", "Top 50 mm folds over")],
              [t("指示牌 A3 横版", "Directional sign A3"), "420 × 297", "20 mm"],
              [t("活动海报 A3 竖版", "Meetup poster A3"), "297 × 420", "20 mm"],
            ]}
          />
        </Sub>
      </Section>

      {/* ------------------------------------------------------------------ Stationery */}
      <Section
        id="stationery"
        tag="Stationery"
        title={t("办公文具", "Stationery")}
        lede={<p>{t("白色或本色纸为底；Signal Blue 仅限字标与少量图形，姓名是唯一重点。", "White or natural stock; Signal Blue kept to the wordmark and small graphics; the name is the sole emphasis.")}</p>}
      >
        <TemplateGrid>
          {/* Business card · front */}
          <PrintTemplate
            span={6}
            title={t("名片 · 正面", "Business card · front")}
            spec="90 × 54 mm · 1080 × 648 · 12 px/mm"
            w={1080}
            h={648}
            themes={["signal", "ink", "white"]}
            langs={["en"]}
            file="card-front"
            style={phys(12, 6)}
            note={t("字标宽 40 mm；正面不放其他文字。", "Wordmark 40 mm wide; no other copy on the front.")}
          >
            <Wordmark className="ab-logo absolute bottom-(--m) left-(--m) u-h-12.5" />
            <Stripe className="absolute top-(--m) right-(--m) u-text-5.5" />
          </PrintTemplate>

          {/* Business card · back */}
          <PrintTemplate
            span={6}
            title={t("名片 · 背面", "Business card · back")}
            spec="90 × 54 mm · 1080 × 648 · 12 px/mm"
            w={1080}
            h={648}
            themes={["white", "paper"]}
            file="card-back"
            style={phys(12, 6)}
            note={t("姓名 12 pt，职位 8 pt，联系方式等宽 7 pt；二维码 18 mm。", "Name 12 pt, title 8 pt, contacts 7 pt mono; QR 18 mm.")}
          >
            <div className="ab-frame">
              <div className="ab-row items-start">
                <div className="grid u-gap-2">
                  <b className="u-text-8 leading-none font-semibold tracking-[-0.01em]"><L zh="姓名" en="Name" /></b>
                  <span className="u-text-5.25 leading-tight text-ab-fg-2"><L zh="职位 · 团队" en="Title · Team" /></span>
                </div>
                <BrandSymbol className="u-size-10 text-ab-brand" />
              </div>
              <div className="flex items-end justify-between u-gap-4">
                <dl className="m-0 grid grid-cols-[auto_1fr] items-baseline u-gap-x-4 u-gap-y-2.5 u-pb-4 font-mono u-text-4.5 leading-none">
                  {[
                    ["Email", "name@rustfs.com"],
                    ["Web", "rustfs.com"],
                    ["GitHub", "github.com/rustfs/rustfs"],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="u-text-4 font-medium tracking-[0.08em] text-ab-muted uppercase">{k}</dt>
                      <dd className="m-0 text-ab-fg">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="t-white u-size-33 flex-none bg-ab-bg text-ab-fg">
                  <QR value={URL} quiet={4} className="size-full" />
                </div>
              </div>
            </div>
          </PrintTemplate>

          {/* Letterhead A4 */}
          <PrintTemplate
            span={5}
            title={t("信纸 A4", "Letterhead A4")}
            spec="210 × 297 mm · 1240 × 1754 · 5.9 px/mm"
            w={1240}
            h={1754}
            themes={["white", "paper"]}
            file="letterhead-a4"
            style={phys(5.905, 20)}
            note={t("正文 10/15 pt 左对齐；折线 99、198 mm，地址对准 DL 窗口。", "Body 10/15 pt, ranged left; folds at 99 and 198 mm fit a DL window.")}
          >
            <div className="absolute top-[calc(var(--mm)*15)] right-(--m) left-(--m) flex items-start justify-between">
              <Wordmark className="ab-logo h-[calc(var(--mm)*6.06)]" />
              <div className="grid justify-items-end font-mono text-[length:calc(var(--mm)*2.47)] leading-[1.55] text-ab-fg-2">
                <b className="font-medium text-ab-fg">RustFS</b>
                <span className="text-ab-muted"><L zh="地址第一行" en="Address line 1" /></span>
                <span className="text-ab-muted"><L zh="地址第二行" en="Address line 2" /></span>
                <span>rustfs.com</span>
              </div>
            </div>
            <div className="absolute top-[calc(var(--mm)*52)] left-(--m) grid text-[length:calc(var(--mm)*3.528)] leading-[1.5] text-ab-muted">
              <span><L zh="收件人姓名" en="Recipient name" /></span>
              <span><L zh="公司名称" en="Company" /></span>
              <span><L zh="地址" en="Address" /></span>
            </div>
            <div className="absolute top-[calc(var(--mm)*104)] left-(--m) grid w-[calc(var(--mm)*150)] u-gap-1.5 text-[length:calc(var(--mm)*3.528)] leading-[1.5] text-ab-fg">
              <span className="u-mb-1.5 font-mono text-[length:calc(var(--mm)*3.175)] text-ab-muted">YYYY-MM-DD</span>
              <b className="font-semibold"><L zh="主题：信纸版式" en="Subject: letterhead layout" /></b>
              <p>
                <L
                  zh="本信纸用于对外正式函件。字标位于左上角，宽 36 mm；发件信息以等宽字体右对齐，与字标顶端对齐。"
                  en="This letterhead is used for formal external correspondence. The wordmark sits top left at 36 mm wide; sender details are set in mono, right-aligned to the top of the wordmark."
                />
              </p>
              <p>
                <L
                  zh="正文使用 Geist Regular 10 pt，行距 15 pt，Ink 色，左对齐，不得两端对齐。中文正文使用 HarmonyOS Sans 或思源黑体。左右边距各 20 mm。"
                  en="Body text is Geist Regular 10 pt on 15 pt leading, in Ink, ranged left and never justified. Chinese text uses HarmonyOS Sans or Source Han Sans. Side margins are 20 mm."
                />
              </p>
              <p>
                <L
                  zh="左缘的两条短线为折线。信纸三折后，收件人地址恰好位于 DL 信封的窗口内。"
                  en="The two short marks on the left edge are fold marks. Folded in three, the recipient address sits inside the window of a DL envelope."
                />
              </p>
              <div className="u-mt-3 grid">
                <span><L zh="此致" en="Kind regards," /></span>
                <b className="u-mt-5 font-semibold"><L zh="姓名" en="Name" /></b>
                <span className="text-ab-muted"><L zh="职位" en="Title" /></span>
              </div>
            </div>
            <i className="absolute top-[calc(var(--mm)*99)] left-0 h-px w-[calc(var(--mm)*6)] bg-ab-muted" />
            <i className="absolute top-[calc(var(--mm)*198)] left-0 h-px w-[calc(var(--mm)*6)] bg-ab-muted" />
            <div className="absolute right-(--m) bottom-[calc(var(--mm)*12)] left-(--m) flex items-center justify-between border-t border-ab-line u-pt-1.5 font-mono text-[length:calc(var(--mm)*2.47)] text-ab-fg-2">
              <span>rustfs.com · docs.rustfs.com · github.com/rustfs/rustfs</span>
              <Stripe className="u-text-1" />
            </div>
          </PrintTemplate>

          <div className="col-span-12 grid grid-cols-12 items-start gap-x-6 gap-y-10 md:col-span-7">
            {/* DL envelope */}
            <PrintTemplate
              title={t("DL 信封", "DL envelope")}
              spec="220 × 110 mm · 1100 × 550 · 5 px/mm"
              w={1100}
              h={550}
              themes={["white", "paper"]}
              file="envelope-dl"
              style={phys(5, 10)}
              note={t("底边 15 mm 须留空，供邮政处理。", "Keep the bottom 15 mm clear for postal processing.")}
            >
              <div className="ab-frame justify-start u-gap-2.5">
                <div className="flex items-center u-gap-4">
                  <Wordmark className="ab-logo self-center u-h-4.5" />
                  <Stripe className="u-text-2" />
                </div>
                <div className="grid font-mono u-text-2.25 leading-[1.5] text-ab-fg-2">
                  <span><L zh="地址第一行" en="Address line 1" /></span>
                  <span><L zh="地址第二行" en="Address line 2" /></span>
                  <span>rustfs.com</span>
                </div>
              </div>
              <GuideBox x={100} y={250} w={450} h={225} />
              <GuideTag className="u-text-2.25" style={{ left: 112, top: 262 }}>
                <L zh="窗口 90 × 45 mm" en="Window 90 × 45 mm" />
              </GuideTag>
              <GuideBox x={850} y={50} w={200} h={150} />
              <GuideTag className="u-text-2.25" style={{ right: 62, top: 62 }}>
                <L zh="邮资区" en="Postage" />
              </GuideTag>
              <GuideZone top={475} height={75} hatch />
            </PrintTemplate>

            {/* Email signature */}
            <PrintTemplate
              title={t("邮件签名", "Email signature")}
              spec={t("600 × 160 · 邮件正文 HTML", "600 × 160 · HTML in the message body")}
              w={600}
              h={160}
              themes={["white"]}
              file="email-signature"
            >
              <div className="absolute inset-0 flex items-center u-gap-10 u-px-15">
                <AppIcon className="u-size-30 flex-none" />
                <div className="grid">
                  <b className="u-text-9.5 leading-[1.33] font-semibold"><L zh="姓名" en="Name" /></b>
                  <span className="u-text-8 leading-[1.4] text-ab-muted"><L zh="职位 · RustFS" en="Title · RustFS" /></span>
                  <span className="u-mt-6 border-t border-ab-line u-pt-6 font-mono u-text-7.5 leading-[1.33] whitespace-nowrap text-ab-brand">
                    name@rustfs.com <span className="text-ab-muted">·</span> rustfs.com <span className="text-ab-muted">·</span> github.com/rustfs/rustfs
                  </span>
                </div>
              </div>
            </PrintTemplate>
          </div>

          {/* Slide-in name tag */}
          <PrintTemplate
            span={5}
            title={t("插卡式名牌", "Slide-in name tag")}
            spec="100 × 70 mm · 1000 × 700 · 10 px/mm"
            w={1000}
            h={700}
            themes={["white", "paper", "ink"]}
            file="name-tag"
            style={phys(10, 7)}
            note={t("用于访客与内部活动；姓名 2 m 外可读。", "For visitors and internal events; the name reads from 2 m.")}
          >
            <div className="absolute inset-y-0 left-0 flex w-[calc(var(--mm)*24)] items-end bg-ab-data u-p-6 text-ab-on-data">
              <BrandSymbol className="u-size-9" />
            </div>
            <div className="absolute top-[calc(var(--mm)*18)] right-(--m) bottom-(--m) left-[calc(var(--mm)*32)] flex flex-col justify-between">
              <div className="grid u-gap-3">
                <b className="ab-head u-text-14 leading-[0.95]"><L zh="姓名" en="Name" /></b>
                <span className="u-text-4.5 leading-tight text-ab-fg-2"><L zh="职位 · 团队" en="Title · Team" /></span>
              </div>
              <span className="font-mono u-text-3.5 leading-none tracking-[0.04em] text-ab-fg-2">rustfs.com</span>
            </div>
            <GuideZone top={0} height={120} hatch />
            <GuideTag className="u-text-3" style={{ right: 70, top: 30 }}>
              <L zh="插口区 12 mm" en="Slot zone 12 mm" />
            </GuideTag>
          </PrintTemplate>

          <div className="col-span-12 grid content-start gap-3 md:col-span-7">
            <div className="grid gap-1">
              <div className="text-[15px] leading-snug font-semibold">{t("邮件签名 · HTML 实样", "Email signature · live HTML")}</div>
              <div className="font-mono text-xs leading-snug text-muted-foreground">{t("表格布局 · 内联样式 · 600px 以内", "Table layout · inline styles · within 600px")}</div>
            </div>
            <Spec on="white" bodyClassName="place-items-stretch content-start gap-5 text-left" caption={t("示例数据 · Sample data", "Sample data · 示例数据")} aside={t("图标须为托管的 PNG", "Icon must be a hosted PNG")}>
              <div className="grid gap-2" aria-hidden="true">
                <i className="block h-2 w-[86%] bg-neutral-100" />
                <i className="block h-2 w-[72%] bg-neutral-100" />
                <i className="block h-2 w-[40%] bg-neutral-100" />
              </div>
              <div className="min-w-0 overflow-x-auto" dangerouslySetInnerHTML={{ __html: sigHtml.replace("{ICON_PNG_URL}", "/brand/logo/rustfs-app-icon.svg") }} />
            </Spec>
            <p className="max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground">
              {t("图标 96 × 96，显示为 48 × 48；不得加入横幅、口号或社交图标。", "Icon 96 × 96, shown at 48 × 48. No banners, slogans or social icons.")}
            </p>
          </div>
        </TemplateGrid>
        <CodeBlock title={t("email-signature.html · 替换姓名、职位与图标地址", "email-signature.html · replace name, title and icon URL")} lang="html" code={sigHtml} maxHeight={360} />
      </Section>

      {/* ------------------------------------------------------------------ Merchandise */}
      <Section
        id="merchandise"
        tag="Merchandise"
        title={t("周边制品", "Merchandise")}
        lede={<p>{t("一个图形、少量颜色：丝印不超过 3 色，Oxide 只用于校验块。", "One graphic, few colours: three screen colours at most, Oxide on parity only.")}</p>}
      >
        <TemplateGrid>
          {/* Sticker sheet */}
          <PrintTemplate
            span={6}
            title={t("贴纸版", "Sticker sheet")}
            spec="150 × 150 mm · 1500 × 1500 · 10 px/mm"
            w={1500}
            h={1500}
            themes={["paper", "white"]}
            file="sticker-sheet"
            style={phys(10, 8)}
            note={t("直角模切，图形越过模切线 1.5 mm；符号贴纸 ≥ 30 mm。", "Square die-cuts, artwork 1.5 mm past the cut; symbol sticker ≥ 30 mm.")}
          >
            <div className="absolute inset-(--m) grid grid-cols-[440px_1fr] grid-rows-[40px_440px_500px_180px] gap-[60px]">
              <div className="col-span-2 flex items-center justify-between font-mono u-text-1.75 leading-none tracking-[0.08em] text-ab-muted uppercase">
                <span>RustFS · <L zh="贴纸" en="Stickers" /> 01</span>
                <span>150 × 150 mm</span>
              </div>
              {/* 1 · symbol */}
              <div className="relative">
                <AppIcon className="size-full" />
                <i className="no-export absolute -inset-[8px] border border-dashed border-oxide-500" />
              </div>
              <div className="grid grid-rows-2 gap-[60px]">
                {/* 2 · wordmark bar */}
                <div className="t-white relative grid place-items-center bg-ab-bg">
                  <Wordmark className="ab-logo self-center u-h-6.5" />
                  <i className="no-export absolute -inset-[8px] border border-dashed border-oxide-500" />
                </div>
                {/* 3 · EC 4+2 */}
                <div className="t-ink relative flex items-center justify-between bg-ab-bg px-[50px] text-ab-fg [--mx-data:var(--ab-data)] [--mx-parity:var(--ab-parity)]">
                  <span className="ab-num u-text-4.5">EC 4+2</span>
                  <Stripe className="u-text-3.5" />
                  <i className="no-export absolute -inset-[8px] border border-dashed border-oxide-500" />
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-[60px]">
                {/* 4 · memory-safe */}
                <div className="t-ink relative flex flex-col justify-between bg-ab-bg p-[50px] text-ab-fg">
                  <div className="flex items-start justify-between">
                    <span className="ab-label u-text-2"><L zh="Rust 构建" en="Built in Rust" /></span>
                    <Icon name="shield" strokeWidth={1.25} className="u-size-7 text-ab-brand" />
                  </div>
                  <b className="ab-head u-text-6 leading-[0.98]"><L zh="内存安全" en="Memory-safe" /></b>
                  <i className="no-export absolute -inset-[8px] border border-dashed border-oxide-500" />
                </div>
                {/* 5 · S3 compatible */}
                <div className="t-signal relative flex flex-col justify-between bg-ab-bg p-[50px] text-ab-fg">
                  <div className="flex items-start justify-between">
                    <span className="ab-label u-text-2">API · SDK · CLI</span>
                    <Icon name="bucket" strokeWidth={1.25} className="u-size-7" />
                  </div>
                  <b className="ab-head u-text-6 leading-[0.98]"><L zh="S3 兼容" en="S3 compatible" /></b>
                  <i className="no-export absolute -inset-[8px] border border-dashed border-oxide-500" />
                </div>
              </div>
              {/* 6 · brand line */}
              <div className="t-signal relative col-span-2 flex items-center justify-between bg-ab-bg px-[50px] text-ab-fg [--mx-data:var(--ab-data)] [--mx-parity:var(--ab-parity)]">
                <b className="ab-head whitespace-nowrap"><L zh={<span className="u-text-4.25">AI 时代的基建，从每一个字节算起。</span>} en={<span className="u-text-2.75">AI infrastructure, accounted for byte by byte.</span>} /></b>
                <Stripe className="u-text-1.75" />
                <i className="no-export absolute -inset-[8px] border border-dashed border-oxide-500" />
              </div>
            </div>
          </PrintTemplate>

          {/* T-shirt · chest */}
          <PrintTemplate
            span={6}
            title={t("T 恤 · 胸前印花", "T-shirt · chest print")}
            spec="100 × 100 mm · 1200 × 1200 · 12 px/mm"
            w={1200}
            h={1200}
            themes={["ink", "white", "signal"]}
            langs={["en"]}
            file="tshirt-chest"
            style={phys(12, 10)}
            note={t("字标宽 80 mm 居中；深色面料须铺白墨打底。", "Wordmark 80 mm wide, centred; dark garments need a white underbase.")}
          >
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid justify-items-center u-gap-7">
                <Wordmark className="ab-logo self-center u-h-13.5" />
                <Stripe className="u-text-3.75" />
              </div>
            </div>
            <GuideBox x={60} y={60} w={1080} h={1080} />
            <GuideTag className="u-text-2" style={{ left: 72, top: 72 }}>
              <L zh="印花区 100 × 100 mm" en="Print area 100 × 100 mm" />
            </GuideTag>
          </PrintTemplate>

          {/* T-shirt · back */}
          <PrintTemplate
            span={4}
            title={t("T 恤 · 背后印花", "T-shirt · back print")}
            spec="300 × 360 mm · 1500 × 1800 · 5 px/mm"
            w={1500}
            h={1800}
            themes={["ink", "white", "signal"]}
            file="tshirt-back"
            style={phys(5, 20)}
          >
            <div className="ab-frame">
              <div className="grid u-gap-2.5">
                <ShardMatrix className="!h-auto w-full" cols={16} rows={10} k={12} m={4} seed={5} mode="tone" gap={0.2} />
                <span className="flex justify-between font-mono u-text-1.5 leading-none tracking-[0.08em] text-ab-muted uppercase">
                  <span>EC 12+4 · <L zh="16 块盘" en="16 drives" /></span>
                  <span><L zh="校验块逐条带轮转" en="Parity rotates per stripe" /></span>
                </span>
                <h3 className="ab-display u-mt-9 leading-[0.94]">
                  <L zh={<span className="block u-text-8.5 leading-[1.14]">AI 时代的基建，<br />从每一个字节算起。</span>} en={<span className="block u-text-7.5">AI infrastructure,<br />accounted for<br />byte by byte.</span>} />
                </h3>
              </div>
              <span className="ab-url u-text-1.75">rustfs.com</span>
            </div>
          </PrintTemplate>

          {/* Tote bag */}
          <PrintTemplate
            span={4}
            title={t("帆布袋", "Tote bag")}
            spec="250 × 300 mm · 1250 × 1500 · 5 px/mm"
            w={1250}
            h={1500}
            themes={["paper", "ink", "signal"]}
            file="tote-bag"
            style={phys(5, 20)}
            note={t("条带每格 26 mm，与字标左边线对齐。", "Stripe squares are 26 mm, flush left with the wordmark.")}
          >
            <div className="ab-frame">
              <span className="ab-label u-text-2">EC 4+2 · <L zh="4 数据块 + 2 校验块" en="4 data + 2 parity" /></span>
              <div className="grid u-gap-7">
                <Stripe className="u-text-10.5" />
                <h3 className="ab-head leading-[1.02]"><L zh={<span className="block u-text-7.5 leading-[1.14]">AI 时代的基建，<br />从每一个字节算起。</span>} en={<span className="block u-text-6.5">AI infrastructure,<br />accounted for<br />byte by byte.</span>} /></h3>
              </div>
              <Wordmark className="ab-logo u-h-5" />
            </div>
          </PrintTemplate>

          {/* Notebook A5 */}
          <PrintTemplate
            span={4}
            title={t("笔记本封面 A5", "Notebook cover A5")}
            spec="148 × 210 mm · 1036 × 1470 · 7 px/mm"
            w={1036}
            h={1470}
            themes={["ink", "signal", "paper"]}
            file="notebook-a5"
            style={phys(7, 12)}
            note={t("矩阵压凹或同色印；字标用白或银哑光烫印。", "Matrix debossed or tone on tone; wordmark in matte white or silver foil.")}
          >
            <ShardMatrix className="absolute inset-x-0 top-0 !h-auto [--mx-parity:var(--ab-line)]" cols={8} rows={7} k={6} m={2} seed={9} mode="outline" gap={0.16} />
            <div className="absolute right-(--m) bottom-(--m) left-(--m) flex items-end justify-between">
              <Wordmark className="ab-logo u-h-5.75" />
              <span className="ab-label u-text-2"><L zh="笔记" en="Notes" /></span>
            </div>
          </PrintTemplate>

          {/* Mug wrap */}
          <PrintTemplate
            span={12}
            title={t("马克杯", "Mug wrap")}
            spec="200 × 85 mm · 2000 × 850 · 10 px/mm"
            w={2000}
            h={850}
            themes={["white", "ink"]}
            file="mug-wrap"
            style={phys(10, 10)}
            note={t("每面一个主体；分片带 6 格一循环，于手柄处无缝衔接。", "One subject per face; a six-cell shard repeat meets seamlessly at the handle.")}
          >
            <div className="absolute top-(--m) right-[150px] bottom-[220px] left-[150px] grid grid-cols-2">
              <div className="grid place-items-center">
                <Wordmark className="ab-logo self-center u-h-12.75" />
              </div>
              <div className="grid place-items-center">
                <h3 className="ab-display leading-[0.94]">
                  <L zh={<span className="block u-text-9.5 leading-[1.12]">AI 时代的基建，<br />从每一个字节算起。</span>} en={<span className="block u-text-7.5">AI infrastructure,<br />accounted for<br />byte by byte.</span>} />
                </h3>
              </div>
            </div>
            <ShardMatrix className="absolute inset-x-0 bottom-[80px] !h-[104px]" cols={36} rows={2} k={4} m={2} seed={3} gap={0.14} fit="none" />
            <div className="no-export pointer-events-none absolute inset-y-0 left-0 z-10 w-[150px] border-r border-dashed border-oxide-500 bg-[repeating-linear-gradient(135deg,rgba(255,94,20,0.32)_0_2px,transparent_2px_16px)]" />
            <div className="no-export pointer-events-none absolute inset-y-0 right-0 z-10 w-[150px] border-l border-dashed border-oxide-500 bg-[repeating-linear-gradient(135deg,rgba(255,94,20,0.32)_0_2px,transparent_2px_16px)]" />
            <GuideTag className="u-text-2.25" style={{ left: 170, top: 30 }}>
              <L zh="← 手柄区 15 mm" en="← Handle zone 15 mm" />
            </GuideTag>
            <GuideTag className="u-text-2.25" style={{ right: 170, top: 30 }}>
              <L zh="手柄区 15 mm →" en="Handle zone 15 mm →" />
            </GuideTag>
          </PrintTemplate>

          {/* Lanyard */}
          <PrintTemplate
            span={12}
            title={t("挂绳", "Lanyard")}
            spec={t("20 mm 宽 · 100 mm 循环 · 3000 × 200 · 10 px/mm", "20 mm wide · 100 mm repeat · 3000 × 200 · 10 px/mm")}
            w={3000}
            h={200}
            themes={["signal", "ink"]}
            langs={["en"]}
            file="lanyard"
            style={phys(10, 2)}
            note={t("字标高 8 mm；缝边不放图形。", "Wordmark 8 mm tall; no artwork on the hems.")}
          >
            <div className="absolute inset-0 flex items-center">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex u-w-500 flex-none items-center justify-around">
                  <Wordmark className="ab-logo self-center u-h-40" />
                  <Stripe className="u-text-22" />
                </div>
              ))}
            </div>
            <div className="no-export pointer-events-none absolute inset-y-0 left-[1000px] z-10 border-l border-dashed border-oxide-500" />
            <div className="no-export pointer-events-none absolute inset-y-0 left-[2000px] z-10 border-l border-dashed border-oxide-500" />
            <GuideTag className="u-text-11" style={{ left: 1012, top: 12 }}>
              <L zh="循环 100 mm" en="Repeat 100 mm" />
            </GuideTag>
          </PrintTemplate>
        </TemplateGrid>
      </Section>

      {/* ------------------------------------------------------------------ Events */}
      <Section
        id="events"
        tag="Events"
        title={t("活动物料", "Event materials")}
        lede={<p>{t("每件只传达一条信息，置于视线高度；被遮挡的下部只放装饰。", "One message per piece, at eye level; the hidden lower area carries decoration only.")}</p>}
      >
        <TemplateGrid>
          {/* Badges */}
          {[
            { id: "attendee", zh: "参会者", en: "Attendee", band: "t-signal bg-ab-bg text-ab-fg", note: t("Signal 色带 = 参会者。", "Signal band = attendee.") },
            { id: "speaker", zh: "演讲者", en: "Speaker", band: "t-ink bg-ab-bg text-ab-fg", note: t("Ink 色带 = 演讲者。", "Ink band = speaker.") },
            { id: "staff", zh: "工作人员", en: "Staff", band: "t-ink bg-ab-bg text-ab-fg", marker: true, note: t("Ink 色带加 Oxide 方块 = 工作人员；Oxide 不铺满色带。", "Ink band plus Oxide marker = staff; Oxide never fills the band.") },
          ].map((b) => (
            <PrintTemplate
              key={b.id}
              span={4}
              title={t(`胸牌 · ${b.zh}`, `Badge · ${b.en}`)}
              spec="100 × 140 mm · 1000 × 1400 · 10 px/mm"
              w={1000}
              h={1400}
              themes={["white", "paper"]}
              file={`badge-${b.id}`}
              style={phys(10, 8)}
              note={b.note}
            >
              <div className="absolute top-[calc(var(--mm)*19)] right-(--m) left-(--m) flex items-start justify-between">
                <Wordmark className="ab-logo u-h-5" />
                <span className="ab-label grid justify-items-end u-gap-1 u-text-2.5 text-right">
                  <L zh="活动名称" en="Event name" />
                  <b>YYYY-MM-DD</b>
                </span>
              </div>
              <div className="absolute top-[calc(var(--mm)*44)] right-(--m) left-(--m) grid u-gap-3.5">
                <b className="ab-head u-text-16 leading-[0.92]"><L zh="姓名" en="Name" /></b>
                <div className="grid u-gap-1">
                  <span className="u-text-5 leading-tight font-semibold"><L zh="公司名称" en="Company" /></span>
                  <span className="u-text-4 leading-tight text-ab-fg-2"><L zh="职位" en="Title" /></span>
                </div>
              </div>
              <div className="absolute right-(--m) bottom-[calc(var(--mm)*34)] grid u-size-22 place-items-center border border-dashed border-ab-muted text-center font-mono u-text-2.25 leading-tight tracking-[0.06em] text-ab-muted uppercase">
                <L zh={<>签到码</>} en={<>Check-in<br />QR</>} />
              </div>
              <div className={`absolute inset-x-0 bottom-0 flex h-[calc(var(--mm)*26)] items-center justify-between px-(--m) ${b.band}`}>
                <span className="ab-head u-text-8 leading-none uppercase"><L zh={b.zh} en={b.en} /></span>
                {"marker" in b && b.marker && <i className="block u-size-8 bg-oxide-500" aria-hidden="true" />}
              </div>
              <GuideZone top={0} height={150} hatch />
              <GuideBox x={420} y={50} w={160} h={40} />
              <GuideTag className="u-text-2.25" style={{ left: 80, top: 52 }}>
                <L zh="挂孔区 15 mm" en="Clip zone 15 mm" />
              </GuideTag>
            </PrintTemplate>
          ))}

          <div className="col-span-12 grid grid-cols-12 items-start gap-x-6 gap-y-10 md:col-span-8">
            {/* Booth backdrop */}
            <PrintTemplate
              title={t("展台背景墙", "Booth backdrop")}
              spec="3000 × 2400 mm · 1500 × 1200 · 0.5 px/mm"
              w={1500}
              h={1200}
              themes={["ink", "signal", "white"]}
              file="booth-backdrop"
              style={phys(0.5, 168)}
              note={t("字标在 1.8 m 以上，信息在 1.2–1.8 m，1.0 m 以下只放矩阵。", "Wordmark above 1.8 m, message at 1.2–1.8 m, only the matrix below 1.0 m.")}
            >
              <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[460px] [--mx-empty:transparent]" cols={16} rows={5} k={12} m={4} seed={17} mode="tone" gap={0.16} fit="slice" fade="t" />
              <Wordmark className="ab-logo absolute top-(--m) left-(--m) u-h-9" />
              <h3 className="ab-display absolute top-[318px] left-(--m) u-text-11 leading-[0.94]">
                <L zh={<span className="block leading-[1.08]">AI 时代的基建，<br />从每一个字节算起。</span>} en={<span className="block u-text-7.5">AI infrastructure,<br />accounted for<br />byte by byte.</span>} />
              </h3>
              <span className="absolute top-[622px] left-(--m) font-mono u-text-3 leading-none font-medium tracking-[0.02em] text-ab-fg-2">rustfs.com</span>
              <GuideZone top={300} height={300} />
              <GuideLine y={700} />
              <GuideTag className="u-text-1.75" style={{ right: 84, top: 312 }}>
                <L zh="视线区 1.2–1.8 m" en="Eye level 1.2–1.8 m" />
              </GuideTag>
              <GuideTag className="u-text-1.75" style={{ right: 84, top: 712 }}>
                <L zh="1.0 m · 台面高度，以下被遮挡" en="1.0 m · counter height, hidden below" />
              </GuideTag>
              <div className="no-export pointer-events-none absolute inset-y-0 right-0 z-20 w-[16px] border-l border-oxide-500">
                {[2, 1.5, 1, 0.5].map((m) => (
                  <span key={m} className="absolute right-0 flex -translate-y-1/2 items-center gap-[6px]" style={{ top: (2.4 - m) * 500 }}>
                    <b className="bg-neutral-950/85 px-[6px] py-[4px] font-mono text-[16px] leading-none font-normal whitespace-nowrap text-oxide-500">{m.toFixed(1)} m</b>
                    <i className="block h-px w-[16px] bg-oxide-500" />
                  </span>
                ))}
              </div>
            </PrintTemplate>
            <div className="col-span-12 grid gap-3">
              <Table
                mono={[1, 2, 3]}
                head={[t("物料", "Item"), t("观看距离", "Viewing distance"), t("最小字高", "Min. letter height"), t("主信息字高", "Key message")]}
                rows={[
                  [t("胸牌姓名", "Badge name"), "1–2 m", "7 mm", "≥ 11 mm"],
                  [t("A3 海报标题", "A3 poster title"), "1–4 m", "14 mm", "≥ 25 mm"],
                  [t("A3 指示牌", "A3 sign"), "3–8 m", "27 mm", "≥ 45 mm"],
                  [t("易拉宝", "Roll-up"), "2–8 m", "27 mm", "≥ 45 mm"],
                  [t("展台背景墙", "Backdrop"), "5–30 m", "100 mm", "≥ 150 mm"],
                ]}
              />
              <p className="max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground">
                {t("字高按拉丁大写或汉字计：最小字高 = 最远距离 ÷ 300，主信息 ≥ 1.5 倍。", "Cap or Han height: minimum = farthest distance ÷ 300; key message ≥ 1.5×.")}
              </p>
            </div>
          </div>

          {/* Roll-up banner */}
          <PrintTemplate
            span={4}
            title={t("易拉宝", "Roll-up banner")}
            spec="850 × 2000 mm · 850 × 2000 · 1 px/mm"
            w={850}
            h={2000}
            themes={["signal", "ink", "white"]}
            file="rollup-banner"
            style={phys(1, 60)}
            note={t("信息在 1 m 以上；二维码置于 1.0–1.2 m。", "Message above 1 m; QR code at 1.0–1.2 m.")}
          >
            <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[940px] [--mx-empty:transparent]" cols={8} rows={10} k={6} m={2} seed={6} gap={0.16} fit="slice" fade="t" />
            <div className="absolute top-(--m) right-(--m) left-(--m) grid u-gap-12">
              <Wordmark className="ab-logo u-h-10" />
              <div className="grid u-gap-6">
                <h3 className="ab-display leading-[0.98]">
                  <L zh={<span className="block u-text-11 leading-[1.14]">以 Rust 构建的<br />S3 兼容<br />对象存储</span>} en={<span className="block u-text-9">S3-compatible<br />object storage,<br />built in Rust.</span>} />
                </h3>
                <span className="font-mono u-text-2.75 leading-[1.5] font-medium tracking-[0.04em] text-ab-fg-2">
                  <L zh="Apache 2.0 · 自托管 · 无遥测" en="Apache 2.0 · Self-hosted · No telemetry" />
                </span>
              </div>
            </div>
            <div className="absolute top-[790px] right-(--m) left-(--m) flex items-end u-gap-4">
              <div className="t-white u-size-22 flex-none bg-ab-bg text-ab-fg">
                <QR value={URL} quiet={4} className="size-full" />
              </div>
              <div className="grid u-gap-1 font-mono u-text-2.75 leading-tight">
                <b className="font-medium">rustfs.com</b>
                <span className="text-ab-fg-2">github.com/rustfs</span>
              </div>
            </div>
            <GuideLine y={1000} />
            <GuideTag className="u-text-2.5" style={{ right: 60, top: 1012 }}>
              <L zh="1.0 m · 关键信息在此线以上" en="1.0 m · key message above" />
            </GuideTag>
            <GuideZone top={1800} height={200} hatch />
            <GuideTag className="u-text-2.5" style={{ right: 60, top: 1812 }}>
              <L zh="底部 20 cm · 底座遮挡" en="Bottom 20 cm · hidden by base" />
            </GuideTag>
          </PrintTemplate>

          {/* Meetup poster */}
          <PrintTemplate
            span={6}
            title={t("活动海报 A3", "Meetup poster A3")}
            spec="297 × 420 mm · 1188 × 1680 · 4 px/mm"
            w={1188}
            h={1680}
            themes={["ink", "signal", "paper"]}
            file="poster-meetup-a3"
            style={phys(4, 20)}
            note={t("演讲者信息须经本人确认；二维码与下方地址须同步替换。", "Speaker details need each speaker's approval; replace the QR code and its printed URL together.")}
          >
            <div className="ab-frame u-gap-0">
              <div className="ab-row">
                <Wordmark className="ab-logo u-h-5" />
                <span className="ab-label u-text-2.25"><L zh="技术沙龙" en="Meetup" /></span>
              </div>
              <div className="grid u-gap-4">
                <h3 className="ab-display u-text-12 leading-[0.9]">
                  <L zh={<span className="block leading-[1.08]">RustFS<br />技术沙龙</span>} en={<>RustFS<br />Meetup</>} />
                </h3>
                <span className="ab-head u-text-4.5 text-ab-brand"><L zh="城市 · 活动主题" en="City · Event theme" /></span>
              </div>
              <ShardMatrix className="!h-auto w-full" cols={12} rows={3} k={4} m={2} seed={12} mode="tone" gap={0.2} />
              <ol className="m-0 grid list-none border-t border-ab-line p-0">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="grid grid-cols-[calc(var(--u)*12)_1fr] items-baseline border-b border-ab-line u-py-2">
                    <span className="font-mono u-text-1.75 text-ab-muted">HH:MM</span>
                    <span className="grid u-gap-0.5">
                      <b className="u-text-2.25 leading-tight font-semibold"><L zh={`议题标题 ${n}`} en={`Talk title ${n}`} /></b>
                      <span className="u-text-1.75 leading-tight text-ab-fg-2"><L zh="演讲者姓名 · 公司" en="Speaker name · Company" /></span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex items-end justify-between u-gap-4">
                <div className="grid u-gap-2">
                  <b className="ab-num u-text-7">YYYY.MM.DD</b>
                  <span className="font-mono u-text-2 leading-[1.45] text-ab-fg-2">
                    HH:MM – HH:MM
                    <br />
                    <L zh="场地名称 · 详细地址" en="Venue · Address" />
                  </span>
                </div>
                <div className="grid justify-items-end u-gap-1.5">
                  <div className="t-white u-size-18 bg-ab-bg text-ab-fg">
                    <QR value={URL} quiet={4} className="size-full" />
                  </div>
                  <span className="font-mono u-text-1.5 text-ab-fg-2">rustfs.com</span>
                </div>
              </div>
            </div>
          </PrintTemplate>

          <div className="col-span-12 grid grid-cols-12 items-start gap-x-6 gap-y-10 md:col-span-6">
            {/* Directional sign */}
            <PrintTemplate
              title={t("指示牌 A3", "Directional sign A3")}
              spec="420 × 297 mm · 1680 × 1188 · 4 px/mm"
              w={1680}
              h={1188}
              themes={["signal", "ink", "white"]}
              file="sign-a3"
              style={phys(4, 20)}
              note={t("箭头按 45° 步进，文字不得镜像；一牌一个目的地。", "Arrow turns in 45° steps; text never mirrored; one destination per sign.")}
            >
              <div className="ab-frame">
                <div className="ab-row items-start">
                  <SignArrow className="u-size-40" />
                  <Wordmark className="ab-logo u-h-4.5" />
                </div>
                <div className="grid u-gap-3">
                  <h3 className="ab-head u-text-22 leading-[0.9]"><L zh="签到处" en="Check-in" /></h3>
                  <span className="font-mono u-text-3 leading-none font-medium tracking-[0.04em] text-ab-fg-2"><L zh="RustFS 技术沙龙" en="RustFS Meetup" /></span>
                </div>
              </div>
            </PrintTemplate>

            {/* Table cover */}
            <PrintTemplate
              title={t("桌布前挡", "Table cover front")}
              spec="1800 × 760 mm · 1800 × 760 · 1 px/mm"
              w={1800}
              h={760}
              themes={["ink", "signal"]}
              langs={["en"]}
              file="table-cover"
              style={phys(1, 60)}
              note={t("对称版式，字标居中，宽 760 mm。", "Symmetric; wordmark centred, 760 mm wide.")}
            >
              <div className="absolute inset-x-0 top-[150px] grid justify-items-center u-gap-6">
                <Wordmark className="ab-logo self-center h-[calc(var(--mm)*128)]" />
                <span className="font-mono u-text-4 leading-none font-medium tracking-[0.08em] text-ab-fg-2">rustfs.com</span>
              </div>
              <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[100px]" cols={36} rows={2} k={4} m={2} seed={2} gap={0.14} fit="none" />
              <GuideZone top={0} height={50} hatch />
              <GuideTag className="u-text-2.5" style={{ right: 60, top: 64 }}>
                <L zh="桌沿转折 50 mm" en="Table-edge fold 50 mm" />
              </GuideTag>
            </PrintTemplate>
          </div>
        </TemplateGrid>
      </Section>

      {/* ------------------------------------------------------------------ Do & Don't */}
      <Section
        id="rules"
        tag="Do & Don't"
        title={t("付印前检查", "Before it goes to press")}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {/* 1 · trim */}
          <DoDont kind="do" on="paper" caption={t("标志位于 5 mm 安全区内。", "Marks inside the 5 mm safe zone.")}>
            <div className="relative h-[150px] w-[250px] bg-blue-500 [--mx-data:#FFFFFF] [--mx-parity:#0B0E14]">
              <span className="absolute inset-[14px] border border-dashed border-white/45" />
              <Wordmark className="absolute bottom-[18px] left-[18px] h-[22px] w-auto text-white" />
              <Stripe className="absolute top-[18px] right-[18px] text-[9px]" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" caption={t("标志贴近或越过裁切线。", "Marks against or across the trim.")}>
            <div className="relative h-[150px] w-[250px] overflow-hidden bg-blue-500 [--mx-data:#FFFFFF] [--mx-parity:#0B0E14]">
              <Wordmark className="absolute -bottom-[5px] -left-[6px] h-[30px] w-auto text-white" />
              <Stripe className="absolute -top-[3px] -right-[8px] text-[11px]" />
            </div>
          </DoDont>

          {/* 2 · die-cut */}
          <DoDont kind="do" on="paper" caption={t("直角模切。", "Square die-cuts.")}>
            <div className="flex items-center gap-4">
              <AppIcon className="size-24" />
              <div className="grid h-24 w-40 place-items-center bg-neutral-950 px-4 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
                <Stripe className="text-[14px]" />
              </div>
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" caption={t("圆角、圆形或异形模切。", "Rounded, circular or contour cuts.")}>
            <div className="flex items-center gap-4">
              <span className="block size-24 overflow-hidden rounded-[22px]"><AppIcon className="size-full" /></span>
              <span className="grid size-24 place-items-center rounded-full bg-neutral-950 font-mono text-xs font-medium tracking-[0.06em] text-white">EC 4+2</span>
            </div>
          </DoDont>

          {/* 3 · gradients */}
          <DoDont kind="do" on="blue" bodyClassName="p-0 min-h-44" caption={t("平涂色块与实心分片。", "Flat fields and solid shards.")}>
            <div className="absolute inset-0 [--mx-data:#FFFFFF] [--mx-parity:#0B0E14] [--mx-empty:rgba(255,255,255,0.3)]">
              <ShardMatrix className="absolute inset-y-6 right-6 !h-[calc(100%-48px)] !w-[46%]" cols={6} rows={4} k={4} m={2} seed={4} fit="right" gap={0.22} />
              <Wordmark className="absolute bottom-6 left-6 h-6 w-auto text-white" />
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="p-0 min-h-44" caption={t("渐变在印刷中出现色阶断层。", "Gradients band in print.")}>
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BANDING.map((c, i) => `${c} ${(i * 100) / BANDING.length}% ${((i + 1) * 100) / BANDING.length}%`).join(", ")})` }}>
              <Wordmark className="absolute bottom-6 left-6 h-6 w-auto text-white" />
            </div>
          </DoDont>

          {/* 4 · orange */}
          <DoDont kind="do" on="ink" caption={t("Oxide 只标记校验块，约 10%。", "Oxide on parity only, about 10%.")}>
            <div className="grid justify-items-start gap-4 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
              <Wordmark className="h-7 w-auto text-white" />
              <Stripe className="text-[18px]" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="oxide" caption={t("Oxide 大面积铺底。", "Oxide as a flood.")}>
            <div className="grid justify-items-start gap-4">
              <Wordmark className="h-7 w-auto text-white" />
              <span className="font-display text-xl leading-none font-extrabold text-white [font-stretch:125%]">EC 4+2</span>
            </div>
          </DoDont>

          {/* 5 · reversed type */}
          <DoDont kind="do" on="ink" bodyClassName="place-items-start content-center gap-2" caption={t("反白文字 ≥ 8 pt，Regular 或更粗。", "Reversed type ≥ 8 pt, Regular or heavier.")}>
            <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-neutral-400 uppercase">Email</span>
            <span className="font-mono text-[15px] leading-none font-medium text-white">name@rustfs.com</span>
          </DoDont>
          <DoDont kind="dont" on="ink" bodyClassName="place-items-start content-center" caption={t("细体小字反白，印刷时糊版。", "Small light reversed type fills in.")}>
            <span className="max-w-[30ch] text-[9px] leading-snug font-light text-neutral-600">
              {t("Apache 2.0 许可 · 自托管 · 无遥测 · 兼容 S3 的分布式对象存储 · rustfs.com", "Apache 2.0 · self-hosted · no telemetry · S3-compatible distributed object storage · rustfs.com")}
            </span>
          </DoDont>

          {/* 6 · QR */}
          <DoDont kind="do" on="ink" caption={t("白底深色模块，静区 4 模块。", "Dark on white, 4-module quiet zone.")}>
            <div className="size-28 bg-white text-neutral-950">
              <QR value={URL} quiet={4} className="size-full" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="ink" caption={t("反色、裁掉静区或嵌入标志。", "Inverted, no quiet zone, or a logo inside.")}>
            <div className="relative size-28 text-white">
              <QR value={URL} quiet={0} className="size-full" />
              <span className="absolute top-1/2 left-1/2 grid size-8 -translate-1/2 place-items-center bg-blue-500">
                <BrandSymbol className="size-6 text-white" />
              </span>
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="print" />
    </Page>
  )
}
