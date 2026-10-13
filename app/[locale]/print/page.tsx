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
          "名片、信纸、周边制品与活动物料的版式规范。画板按成品尺寸等比绘制，以屏幕分辨率导出供审阅；印刷生产文件须按 300 dpi、3 mm 出血另行制作。",
          "Layouts for stationery, merchandise and event materials. Artboards are drawn in proportion to the finished size and export at screen resolution for review; production files are prepared separately at 300 dpi with 3 mm bleed.",
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
        lede={
          <p>
            {t(
              "屏幕上的品牌色无法在纸张、织物与陶瓷上完全复现。以下规则使不同供应商、不同材料的成品保持一致：颜色以印刷打样为准，尺寸以毫米计量，标志与文字始终远离裁切线。",
              "Brand colours on screen cannot be reproduced exactly on paper, fabric or ceramic. These rules keep finished pieces consistent across suppliers and materials: colour is approved on a printed proof, sizes are measured in millimetres, and marks and text stay clear of the trim.",
            )}
          </p>
        }
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
              {t("底色与图形延伸至裁切线外 3 mm。", "Backgrounds and graphics run 3 mm past the trim.")}
            </Figure>
            <Figure n="5" unit="mm" label={t("安全区", "Safe zone")}>
              {t("文字、标志与二维码距裁切线不少于 5 mm。", "Text, marks and QR codes stay 5 mm inside the trim.")}
            </Figure>
            <Figure n="300" unit="dpi" label={t("分辨率", "Resolution")}>
              {t("按成品尺寸计算；标志与文字保持矢量。", "At finished size; marks and type stay vector.")}
            </Figure>
            <Figure n="6" unit="pt" label={t("最小字号", "Minimum type")}>
              {t("反白文字不小于 8 pt，且不使用细体。", "Reversed type at least 8 pt and never light.")}
            </Figure>
            <Figure n="18" unit="mm" label={t("字标最小宽度", "Wordmark min. width")}>
              {t("小于此宽度时改用符号。", "Below this width, use the symbol.")}
            </Figure>
            <Figure n="5" unit="mm" label={t("符号最小宽度", "Symbol min. width")}>
              {t("更小的物件不放置标志。", "Smaller items carry no mark.")}
            </Figure>
          </div>
        </TemplateGrid>

        <Sub title={t("印刷色彩", "Colour in print")} aside={t("参考值 · 须以打样确认", "Reference values · confirm on a proof")}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            <InkCard
              name="Signal Blue"
              sub="#0062FF"
              swatch="#0062FF"
              value="C90 M60 Y0 K0"
              cmyk={[90, 60, 0, 0]}
              note={t("字标、数据块与大面积品牌色。超出四色色域，对颜色要求高的物料宜使用专色。", "Wordmark, data shards and large brand fields. It lies outside the process gamut; colour-critical pieces should use a spot ink.")}
            />
            <InkCard
              name="Oxide"
              sub="#FF5E14"
              swatch="#FF5E14"
              value="C0 M70 Y95 K0"
              cmyk={[0, 70, 95, 0]}
              note={t("仅用于校验块与单一焦点，约占画面 10%，不得大面积铺底。", "Parity and the single focal point only, about 10% of the area. Never a flood.")}
            />
            <InkCard
              name={t("Ink · 大面积", "Ink · large areas")}
              sub="#0B0E14"
              swatch="#0B0E14"
              value="C60 M40 Y20 K100"
              cmyk={[60, 40, 20, 100]}
              note={t("四色黑，总墨量 220%。单色黑大面积印刷会发灰，底色与大色块须使用四色黑。", "Rich black at 220% total ink. Black alone prints greyish over large areas, so backgrounds and large fields use rich black.")}
            />
            <InkCard
              name={t("Ink · 文字与细线", "Ink · type and lines")}
              sub="#0B0E14"
              swatch="#231F20"
              value="C0 M0 Y0 K100"
              cmyk={[0, 0, 0, 100]}
              note={t("文字、细线与小面积元素只用单色黑，避免套印偏差。灰色使用 K 单色网点。", "Type, fine lines and small elements use black only, avoiding misregistration. Greys are K-only tints.")}
            />
            <InkCard
              name="White / Paper"
              sub="#FFFFFF · #F4F6F9"
              swatch="#FFFFFF"
              value={t("不着墨 · 白墨", "No ink · white ink")}
              cmyk={null}
              note={t("浅色底即纸张本色，不得用浅灰网点模拟 Paper。深色承印物上以白墨或白色箔实现。", "Light surfaces are the stock itself; never imitate Paper with a grey tint. On dark substrates, use white ink or white foil.")}
            />
          </div>
          <Note tone="parity">
            {t(
              <>
                <b>以上 CMYK 数值为参考值</b>，是与印刷厂沟通的起点，不是最终色值。每批物料须在实际承印物上打样，在标准光源（D50）下与经批准的印刷色样比对后方可批量生产。本规范不指定 Pantone 色号；专色须按经批准的色样调配，并出示样张确认。
              </>,
              <>
                <b>These CMYK values are reference values</b>: a starting point for the printer, not final values. Every job is proofed on the actual stock and compared with the approved printed reference under standard D50 light before the run. These guidelines do not name a Pantone match; spot inks are mixed to the approved reference and confirmed on a drawdown.
              </>,
            )}
          </Note>
        </Sub>

        <Sub title={t("生产规则", "Production rules")}>
          <Table
            head={[t("项目", "Item"), t("规则", "Rule")]}
            rows={[
              [t("色彩模式", "Colour mode"), t("印刷文件使用 CMYK 或专色。屏幕显示不得作为颜色依据，颜色以印刷打样为准。", "Print files are CMYK or spot. The screen is never the colour reference; the printed proof is.")],
              [t("黑色", "Black"), t("大面积 Ink 使用四色黑 C60 M40 Y20 K100；文字与细线只用 K100，不得使用四色黑。", "Large Ink areas use rich black C60 M40 Y20 K100. Type and fine lines use K100 only, never rich black.")],
              [t("出血与安全区", "Bleed and safe zone"), t("底色与图形延伸至裁切线外 3 mm；文字、标志与二维码距裁切线不少于 5 mm。大幅面物料的遮挡区见各模板说明。", "Backgrounds and graphics extend 3 mm past the trim; text, marks and QR codes stay at least 5 mm inside it. Large formats add the hidden zones given with each template.")],
              [t("分辨率", "Resolution"), t("位图按成品尺寸不低于 300 dpi；字标、符号、文字与分片矩阵始终为矢量。", "Bitmaps at 300 dpi or more at finished size; the wordmark, symbol, type and shard matrix are always vector.")],
              [t("最小尺寸", "Minimum sizes"), t("字标宽 ≥ 18 mm，符号宽 ≥ 5 mm。字号 ≥ 6 pt，反白文字 ≥ 8 pt 且不使用细体。线宽 ≥ 0.25 pt，反白线宽 ≥ 0.5 pt。", "Wordmark ≥ 18 mm wide, symbol ≥ 5 mm. Type ≥ 6 pt; reversed type ≥ 8 pt and never light. Lines ≥ 0.25 pt; reversed lines ≥ 0.5 pt.")],
              [t("渐变与网点", "Gradients and tints"), t("不使用渐变、阴影与透明叠加，渐变在印刷中会出现色阶断层。网点色调不低于 10%。", "No gradients, shadows or transparency; gradients band in print. Tints no lighter than 10%.")],
              [t("二维码", "QR codes"), t("深色模块印在浅色底上，宽 ≥ 15 mm，四周留 4 个模块的静区。不得反色、不得嵌入标志、不得使用圆点模块。付印前须用至少两部手机实测。", "Dark modules on a light ground, at least 15 mm wide, with a 4-module quiet zone. Never inverted, never with a logo inside, never with round modules. Test on at least two phones before printing.")],
              [t("深色承印物", "Dark substrates"), t("在深色纸张或织物上，Signal Blue 与 Oxide 下须铺白墨打底。烫印仅用于字标或符号，使用白色或银色哑光箔，笔画不细于 0.3 mm；不使用金色或镭射箔。", "On dark stock or fabric, Signal Blue and Oxide print over a white underbase. Foil is for the wordmark or symbol only, in matte white or silver, with strokes no finer than 0.3 mm; never gold or holographic.")],
              [t("模切", "Die-cuts"), t("贴纸、吊牌与卡片一律直角模切，不使用圆角或异形轮廓。", "Stickers, tags and cards are die-cut with square corners; no rounded corners or contour shapes.")],
              [t("交付", "Delivery"), t("交付 PDF/X-4，嵌入字体，含 3 mm 出血与裁切标记；文件名包含成品尺寸与版本，例如 rustfs-card-90x54-v1.pdf。", "Deliver PDF/X-4 with fonts embedded, 3 mm bleed and crop marks. File names carry the finished size and version, for example rustfs-card-90x54-v1.pdf.")],
            ]}
          />
        </Sub>

        <Sub title={t("纸张与工艺", "Stock and finishing")} aside={t("推荐项 · 以供应商规格与打样为准", "Recommendations · confirm with the supplier and a proof")}>
          <div className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "layers" as const, k: t("文具", "Stationery"), v: t("推荐非涂布纸：名片 350 g/m²，信纸 100–120 g/m²（兼容激光打印），信封 100 g/m²。非涂布纸吸墨，Signal Blue 会略显暗，须单独打样。", "Uncoated stock is recommended: 350 g/m² for cards, 100–120 g/m² for letterhead (laser-safe), 100 g/m² for envelopes. Uncoated stock absorbs ink and darkens Signal Blue, so it needs its own proof.") },
              { icon: "image" as const, k: t("海报与指示", "Posters and signs"), v: t("推荐哑光涂布纸 170–200 g/m²，避免高光纸在灯光下反光。指示牌宜裱 5 mm KT 板或 PVC 板。", "Matte coated stock at 170–200 g/m² is recommended; gloss reflects under venue lighting. Mount signs on 5 mm foam board or PVC.") },
              { icon: "site" as const, k: t("大幅面", "Large format"), v: t("背景墙与桌布推荐布面热升华，无反光、可折叠运输；易拉宝推荐防卷曲 PP 或 PET 膜。", "Dye-sublimated fabric is recommended for backdrops and table covers: no glare, folds for transport. Roll-ups use anti-curl PP or PET film.") },
              { icon: "chip" as const, k: t("周边制品", "Merchandise"), v: t("织物推荐丝网印刷（不超过 3 色）或数码直喷；马克杯推荐热转印；贴纸推荐哑膜乙烯基。", "Screen print (three colours at most) or direct-to-garment for textiles; sublimation for mugs; matte vinyl for stickers.") },
            ].map(({ icon, k, v }) => (
              <div key={icon} className="grid content-start gap-3 border-r border-b border-border p-5">
                <Icon name={icon} className="size-5 text-brand" />
                <b className="text-[15px] leading-snug font-semibold">{k}</b>
                <p className="text-sm leading-relaxed text-subtle">{v}</p>
              </div>
            ))}
          </div>
        </Sub>

        <Sub title={t("成品尺寸", "Finished sizes")} aside={t("画板 = 成品尺寸 × 比例", "Artboard = finished size × scale")}>
          <Table
            mono={[1, 2, 3]}
            head={[t("物料", "Item"), t("成品尺寸 mm", "Finished mm"), t("画板 px", "Artboard px"), t("比例", "Scale"), t("安全区与遮挡区", "Safe and hidden zones")]}
            rows={[
              [t("名片", "Business card"), "90 × 54", "1080 × 648", "12 px/mm", t("5 mm；版式边距 6 mm", "5 mm; layout margin 6 mm")],
              [t("信纸 A4", "Letterhead A4"), "210 × 297", "1240 × 1754", "5.9 px/mm", t("左右边距 20 mm；页脚距底边 12 mm", "20 mm side margins; footer 12 mm from the bottom")],
              [t("DL 信封", "DL envelope"), "220 × 110", "1100 × 550", "5 px/mm", t("底边 15 mm 留空；右上角为邮资区", "Bottom 15 mm clear; postage top right")],
              [t("插卡式名牌", "Slide-in name tag"), "100 × 70", "1000 × 700", "10 px/mm", t("上缘 12 mm 为插口区", "Top 12 mm is the slot zone")],
              [t("贴纸版", "Sticker sheet"), "150 × 150", "1500 × 1500", "10 px/mm", t("图形越过模切线 1.5 mm", "Artwork runs 1.5 mm past each cut")],
              [t("T 恤 · 胸前", "T-shirt · chest"), "100 × 100", "1200 × 1200", "12 px/mm", t("领口下 75 mm 起", "Starts 75 mm below the collar")],
              [t("T 恤 · 背后", "T-shirt · back"), "300 × 360", "1500 × 1800", "5 px/mm", t("领口下 100 mm 起", "Starts 100 mm below the collar")],
              [t("帆布袋", "Tote bag"), "250 × 300", "1250 × 1500", "5 px/mm", t("距缝线 20 mm", "20 mm from the seams")],
              [t("A5 笔记本封面", "A5 notebook cover"), "148 × 210", "1036 × 1470", "7 px/mm", t("书脊侧 12 mm", "12 mm on the spine side")],
              [t("马克杯", "Mug wrap"), "200 × 85", "2000 × 850", "10 px/mm", t("两端各 15 mm 为手柄区", "15 mm handle zone at each end")],
              [t("挂绳", "Lanyard"), t("20 × 100 循环", "20 × 100 repeat"), "3000 × 200", "10 px/mm", t("上下各 2 mm 为缝边", "2 mm hem top and bottom")],
              [t("胸牌", "Conference badge"), "100 × 140", "1000 × 1400", "10 px/mm", t("上缘 15 mm 为挂孔区", "Top 15 mm is the clip zone")],
              [t("展台背景墙", "Booth backdrop"), "3000 × 2400", "1500 × 1200", "0.5 px/mm", t("1.0 m 以下被台面遮挡", "Below 1.0 m is hidden by the counter")],
              [t("易拉宝", "Roll-up banner"), "850 × 2000", "850 × 2000", "1 px/mm", t("底部 200 mm 不放重要信息", "Nothing important in the bottom 200 mm")],
              [t("桌布前挡", "Table cover front"), "1800 × 760", "1800 × 760", "1 px/mm", t("上缘 50 mm 为桌面转折", "Top 50 mm folds over the table edge")],
              [t("指示牌 A3 横版", "Directional sign A3"), "420 × 297", "1680 × 1188", "4 px/mm", "20 mm"],
              [t("活动海报 A3 竖版", "Meetup poster A3"), "297 × 420", "1188 × 1680", "4 px/mm", "20 mm"],
            ]}
          />
        </Sub>
      </Section>

      {/* ------------------------------------------------------------------ Stationery */}
      <Section
        id="stationery"
        tag="Stationery"
        title={t("办公文具", "Stationery")}
        lede={
          <p>
            {t(
              "文具以白色或纸张本色为底，Signal Blue 只用于字标与少量图形。个人信息以等宽字体排列，姓名是唯一的视觉重点。",
              "Stationery sits on white or natural stock; Signal Blue is kept to the wordmark and a few small graphics. Personal details are set in mono, and the name is the only point of emphasis.",
            )}
          </p>
        }
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
            note={t(<><b>规则：</b>字标宽 40 mm，左下对齐 6 mm 版式边距；条带签名位于右上。正面不放任何文字信息。</>, <><b>Rule:</b> the wordmark is 40 mm wide, set bottom left on the 6 mm layout margin; the stripe signature sits top right. The front carries no other copy.</>)}
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
            note={t(<><b>规则：</b>姓名 12 pt，职位 8 pt，联系方式为等宽 7 pt。二维码宽 18 mm，指向 rustfs.com 或个人页面，四周保留静区。</>, <><b>Rule:</b> name 12 pt, title 8 pt, contact details in 7 pt mono. The 18 mm QR code points to rustfs.com or a personal page and keeps its quiet zone.</>)}
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
            note={t(<><b>规则：</b>正文 10/15 pt，左对齐。左缘两条折线位于 99 mm 与 198 mm，三折后收件人地址落在 DL 信封窗口内。</>, <><b>Rule:</b> body text 10/15 pt, ranged left. Fold marks at 99 mm and 198 mm on the left edge; folded in three, the address shows through a DL window.</>)}
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
              note={t(<><b>规则：</b>发件信息位于左上角；右上角为邮资区，底边 15 mm 留空供邮政处理。虚线为窗口位置，不印刷。</>, <><b>Rule:</b> sender details top left; postage top right; the bottom 15 mm stays clear for postal processing. The dashed window guide does not print.</>)}
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
            note={t(<><b>规则：</b>用于办公访客与内部活动。左侧色带承载符号，姓名在 2 m 外可读。上缘 12 mm 插入卡套后被遮挡。</>, <><b>Rule:</b> for office visitors and internal events. The band on the left carries the symbol; the name reads from 2 m. The top 12 mm is hidden by the holder.</>)}
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
              {t(
                "邮件客户端普遍不支持 SVG 与网页字体：图标须使用托管在公开地址上的 PNG（96 × 96，显示为 48 × 48），并以 {ICON_PNG_URL} 处替换；Geist 不可用时依次回退到系统字体。签名中不得加入横幅图片、口号或社交图标墙。",
                "Mail clients rarely support SVG or web fonts. Use a hosted PNG icon (96 × 96, shown at 48 × 48) in place of {ICON_PNG_URL}; when Geist is unavailable the stack falls back to system fonts. Signatures carry no banner images, slogans or rows of social icons.",
              )}
            </p>
          </div>
        </TemplateGrid>
        <CodeBlock title={t("email-signature.html · 复制后替换姓名、职位与图标地址", "email-signature.html · replace the name, title and icon URL after copying")} code={sigHtml} maxHeight={360} />
      </Section>

      {/* ------------------------------------------------------------------ Merchandise */}
      <Section
        id="merchandise"
        tag="Merchandise"
        title={t("周边制品", "Merchandise")}
        lede={
          <p>
            {t(
              "周边制品以一个图形、少量颜色完成：丝网印刷不超过 3 色，Oxide 只出现在校验块上。印花须在实际面料或器物上打样确认。",
              "Merchandise is built from one graphic and few colours: screen prints use three colours at most, and Oxide appears only on parity. Every print is proofed on the actual fabric or object.",
            )}
          </p>
        }
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
            note={t(<><b>规则：</b>六枚贴纸均为直角模切，图形延伸至模切线外 1.5 mm。虚线为模切线，不印刷。符号贴纸不小于 30 mm。</>, <><b>Rule:</b> all six stickers are die-cut with square corners, artwork running 1.5 mm past each cut. Dashed lines are cut paths and do not print. The symbol sticker is at least 30 mm.</>)}
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
                <b className="ab-head u-text-4.25 whitespace-nowrap"><L zh="每一个字节，都有着落。" en="Every byte, accounted for." /></b>
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
            note={t(<><b>规则：</b>底色代表面料颜色。字标宽 80 mm，居中于 100 × 100 mm 印花区内，印花区上缘位于领口下 75 mm；深色面料须铺白墨打底。</>, <><b>Rule:</b> the surface stands for the garment colour. The 80 mm wordmark is centred in a 100 × 100 mm print area whose top edge sits 75 mm below the collar; dark garments need a white underbase.</>)}
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
            note={t(<><b>规则：</b>EC 12+4 纠删集，16 列为 16 块盘，校验块逐条带轮转。品牌口号置于图形之下。</>, <><b>Rule:</b> an EC 12+4 erasure set: 16 columns for 16 drives, parity rotating with each stripe. The brand line sits below the graphic.</>)}
          >
            <div className="ab-frame">
              <div className="grid u-gap-2.5">
                <ShardMatrix className="!h-auto w-full" cols={16} rows={10} k={12} m={4} seed={5} mode="tone" gap={0.2} />
                <span className="flex justify-between font-mono u-text-1.5 leading-none tracking-[0.08em] text-ab-muted uppercase">
                  <span>EC 12+4 · <L zh="16 块盘" en="16 drives" /></span>
                  <span><L zh="校验块逐条带轮转" en="Parity rotates per stripe" /></span>
                </span>
                <h3 className="ab-display u-mt-9 leading-[0.94]">
                  <L zh={<span className="block u-text-10 leading-[1.12]">每一个字节，<br />都有着落。</span>} en={<span className="block u-text-7.5">Every byte,<br />accounted for.</span>} />
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
            note={t(<><b>规则：</b>Paper 代表本色帆布。条带签名每格 26 mm，与字标共用左边线；丝网印刷不超过 3 色。</>, <><b>Rule:</b> Paper stands for natural canvas. Each stripe square is 26 mm and shares the wordmark&rsquo;s left edge; three screen colours at most.</>)}
          >
            <div className="ab-frame">
              <span className="ab-label u-text-2">EC 4+2 · <L zh="4 数据块 + 2 校验块" en="4 data + 2 parity" /></span>
              <div className="grid u-gap-7">
                <Stripe className="u-text-10.5" />
                <h3 className="ab-head leading-[1.02]"><L zh={<span className="block u-text-7.5 leading-[1.14]">每一个字节，<br />都有着落。</span>} en={<span className="block u-text-6.5">Every byte,<br />accounted for.</span>} /></h3>
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
            note={t(<><b>规则：</b>分片矩阵以压凹或同色印刷呈现，字标为白色或银色哑光烫印。书脊侧留 12 mm。</>, <><b>Rule:</b> the shard matrix is blind-debossed or printed tone on tone; the wordmark is matte white or silver foil. Keep 12 mm clear on the spine side.</>)}
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
            note={t(<><b>规则：</b>左右两面各放一个主体：字标与品牌口号。底部的分片带以 6 格为周期，在手柄处无缝衔接；两端 15 mm 为手柄区。</>, <><b>Rule:</b> one subject per face: the wordmark on one, the brand line on the other. The shard band along the bottom repeats every six cells so it meets seamlessly at the handle; the 15 mm at each end is the handle zone.</>)}
          >
            <div className="absolute top-(--m) right-[150px] bottom-[220px] left-[150px] grid grid-cols-2">
              <div className="grid place-items-center">
                <Wordmark className="ab-logo self-center u-h-12.75" />
              </div>
              <div className="grid place-items-center">
                <h3 className="ab-display leading-[0.94]">
                  <L zh={<span className="block u-text-9.5 leading-[1.12]">每一个字节，<br />都有着落。</span>} en={<span className="block u-text-8.5">Every byte,<br />accounted for.</span>} />
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
            note={t(<><b>规则：</b>字标与条带签名每 100 mm 重复一次，字标高 8 mm。上下各 2 mm 为缝边，不放图形。</>, <><b>Rule:</b> the wordmark and stripe signature repeat every 100 mm, the wordmark 8 mm tall. The 2 mm hem at top and bottom carries no artwork.</>)}
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
        lede={
          <p>
            {t(
              "活动物料在数米之外被阅读。每件物料只传达一条信息，字号按观看距离计算；关键信息位于视线高度，被台面与人群遮挡的下部只放装饰图形。",
              "Event materials are read from metres away. Each piece carries one message, sized for its viewing distance; the key message sits at eye level, and the lower area hidden by counters and crowds carries decoration only.",
            )}
          </p>
        }
      >
        <TemplateGrid>
          {/* Badges */}
          {[
            { id: "attendee", zh: "参会者", en: "Attendee", band: "t-signal bg-ab-bg text-ab-fg", note: t("Signal 色带：参会者。", "Signal band: attendees.") },
            { id: "speaker", zh: "演讲者", en: "Speaker", band: "t-ink bg-ab-bg text-ab-fg", note: t("Ink 色带：演讲者。", "Ink band: speakers.") },
            { id: "staff", zh: "工作人员", en: "Staff", band: "t-ink bg-ab-bg text-ab-fg", marker: true, note: t("Ink 色带加 Oxide 方块：工作人员，是参会者需要一眼找到的唯一角色；Oxide 只作为这一处焦点标记，不铺满色带。", "Ink band with an Oxide marker: staff, the one role attendees must find at a glance. Oxide is the single focal marker, never a full band.") },
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
              note={
                <>
                  <b>{t("规则：", "Rule: ")}</b>
                  {b.note}
                  {t(" 姓名字高不小于 11 mm，2 m 外可读；上缘 15 mm 为挂孔区。", " The name is at least 11 mm tall and reads from 2 m; the top 15 mm is the clip zone.")}
                </>
              }
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
              note={t(<><b>规则：</b>字标位于 1.8 m 以上，越过人群可见；唯一的信息位于 1.2–1.8 m 视线区；1.0 m 以下被台面遮挡，只放分片矩阵。参考线不导出。</>, <><b>Rule:</b> the wordmark sits above 1.8 m, visible over the crowd; the single message sits in the 1.2–1.8 m eye-level zone; below 1.0 m the counter hides the wall, so it carries only the shard matrix. Guides do not export.</>)}
            >
              <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[460px] [--mx-empty:transparent]" cols={16} rows={5} k={12} m={4} seed={17} mode="tone" gap={0.16} fit="slice" fade="t" />
              <Wordmark className="ab-logo absolute top-(--m) left-(--m) u-h-9" />
              <h3 className="ab-display absolute top-[318px] left-(--m) u-text-11 leading-[0.94]">
                <L zh={<span className="block leading-[1.08]">每一个字节，<br />都有着落。</span>} en={<>Every byte,<br />accounted for.</>} />
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
                {t(
                  "字高指拉丁大写字母或汉字的高度。最小字高 = 最远观看距离 ÷ 300；主信息不小于最小字高的 1.5 倍。",
                  "Letter height means the height of a Latin capital or a Chinese character. Minimum letter height = farthest viewing distance ÷ 300; the key message is at least 1.5 times that.",
                )}
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
            note={t(<><b>规则：</b>唯一的信息位于 1 m 以上；二维码置于 1.0–1.2 m，便于扫码。底部 20 cm 被底座遮挡，不放重要信息。</>, <><b>Rule:</b> the single message sits above 1 m; the QR code sits at 1.0–1.2 m where it is easy to scan. The bottom 20 cm is hidden by the base and carries nothing important.</>)}
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
            note={t(<><b>规则：</b>日期、场地与议程为占位文字，演讲者信息须经本人确认后填写。二维码须替换为活动报名链接，并同步修改其下方的地址。</>, <><b>Rule:</b> date, venue and agenda are placeholders; speaker details are filled in only after each speaker confirms them. Replace the QR code with the registration link and update the address printed beneath it.</>)}
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
              note={t(<><b>规则：</b>箭头只按 45° 步进旋转，不得镜像文字。每块指示牌只指向一个目的地。</>, <><b>Rule:</b> the arrow rotates in 45° steps only and the text is never mirrored. Each sign points to one destination.</>)}
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
              note={t(<><b>规则：</b>桌布为对称版式，字标居中，宽 760 mm。上缘 50 mm 翻过桌沿，底部图形可被遮挡。</>, <><b>Rule:</b> the table cover is symmetric, with the wordmark centred at 760 mm wide. The top 50 mm folds over the table edge; the graphic at the bottom may be hidden.</>)}
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
        lede={<p>{t("付印前，须逐项对照以下规则，并确认打样已获批准。", "Check every piece against these rules, and confirm the proof is approved, before it goes to press.")}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {/* 1 · trim */}
          <DoDont kind="do" on="paper" caption={t("字标与条带签名位于 5 mm 安全区内，裁切误差不会影响标志。", "The wordmark and stripe sit inside the 5 mm safe zone; trimming tolerance never touches the mark.")}>
            <div className="relative h-[150px] w-[250px] bg-blue-500 [--mx-data:#FFFFFF] [--mx-parity:#0B0E14]">
              <span className="absolute inset-[14px] border border-dashed border-white/45" />
              <Wordmark className="absolute bottom-[18px] left-[18px] h-[22px] w-auto text-white" />
              <Stripe className="absolute top-[18px] right-[18px] text-[9px]" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" caption={t("标志贴近或越过裁切线，裁切后被切掉一部分。", "Marks set against or across the trim lose part of themselves when cut.")}>
            <div className="relative h-[150px] w-[250px] overflow-hidden bg-blue-500 [--mx-data:#FFFFFF] [--mx-parity:#0B0E14]">
              <Wordmark className="absolute -bottom-[5px] -left-[6px] h-[30px] w-auto text-white" />
              <Stripe className="absolute -top-[3px] -right-[8px] text-[11px]" />
            </div>
          </DoDont>

          {/* 2 · die-cut */}
          <DoDont kind="do" on="paper" caption={t("贴纸直角模切，与品牌的方正形态一致。", "Stickers are die-cut square, matching the brand's square geometry.")}>
            <div className="flex items-center gap-4">
              <AppIcon className="size-24" />
              <div className="grid h-24 w-40 place-items-center bg-neutral-950 px-4 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
                <Stripe className="text-[14px]" />
              </div>
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" caption={t("圆角、圆形或沿图形轮廓的异形模切。", "Rounded corners, circles or contour cuts around the artwork.")}>
            <div className="flex items-center gap-4">
              <span className="block size-24 overflow-hidden rounded-[22px]"><AppIcon className="size-full" /></span>
              <span className="grid size-24 place-items-center rounded-full bg-neutral-950 font-mono text-xs font-medium tracking-[0.06em] text-white">EC 4+2</span>
            </div>
          </DoDont>

          {/* 3 · gradients */}
          <DoDont kind="do" on="blue" bodyClassName="p-0 min-h-44" caption={t("平涂色块与实心分片，任何印刷方式都能稳定复现。", "Flat fields and solid shards reproduce reliably in any process.")}>
            <div className="absolute inset-0 [--mx-data:#FFFFFF] [--mx-parity:#0B0E14] [--mx-empty:rgba(255,255,255,0.3)]">
              <ShardMatrix className="absolute inset-y-6 right-6 !h-[calc(100%-48px)] !w-[46%]" cols={6} rows={4} k={4} m={2} seed={4} fit="right" gap={0.22} />
              <Wordmark className="absolute bottom-6 left-6 h-6 w-auto text-white" />
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="p-0 min-h-44" caption={t("蓝橙渐变在印刷中出现色阶断层，且混出品牌之外的颜色。", "A blue-to-orange gradient bands in print and mixes colours outside the palette.")}>
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BANDING.map((c, i) => `${c} ${(i * 100) / BANDING.length}% ${((i + 1) * 100) / BANDING.length}%`).join(", ")})` }}>
              <Wordmark className="absolute bottom-6 left-6 h-6 w-auto text-white" />
            </div>
          </DoDont>

          {/* 4 · orange */}
          <DoDont kind="do" on="ink" caption={t("Oxide 只标记校验块，约占画面 10%。", "Oxide marks parity only, about 10% of the area.")}>
            <div className="grid justify-items-start gap-4 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
              <Wordmark className="h-7 w-auto text-white" />
              <Stripe className="text-[18px]" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="oxide" caption={t("Oxide 大面积铺底，失去校验色的含义，也压过 Signal Blue。", "Oxide as a full flood loses its meaning as the parity colour and overpowers Signal Blue.")}>
            <div className="grid justify-items-start gap-4">
              <Wordmark className="h-7 w-auto text-white" />
              <span className="font-display text-xl leading-none font-extrabold text-white [font-stretch:125%]">EC 4+2</span>
            </div>
          </DoDont>

          {/* 5 · reversed type */}
          <DoDont kind="do" on="ink" bodyClassName="place-items-start content-center gap-2" caption={t("深色底上的反白文字不小于 8 pt，使用 Regular 或更粗的字重。", "Reversed type on dark grounds is 8 pt or larger, Regular weight or heavier.")}>
            <span className="font-mono text-[11px] leading-none font-medium tracking-[0.08em] text-neutral-400 uppercase">Email</span>
            <span className="font-mono text-[15px] leading-none font-medium text-white">name@rustfs.com</span>
          </DoDont>
          <DoDont kind="dont" on="ink" bodyClassName="place-items-start content-center" caption={t("细体小字反白在深色底上，印刷时被油墨填没。", "Small light type reversed out of a dark ground fills in on press.")}>
            <span className="max-w-[30ch] text-[9px] leading-snug font-light text-neutral-600">
              {t("Apache 2.0 许可 · 自托管 · 无遥测 · 兼容 S3 的分布式对象存储 · rustfs.com", "Apache 2.0 · self-hosted · no telemetry · S3-compatible distributed object storage · rustfs.com")}
            </span>
          </DoDont>

          {/* 6 · QR */}
          <DoDont kind="do" on="ink" caption={t("深色模块印在白色底上，四周保留 4 个模块的静区。", "Dark modules on a white ground with a 4-module quiet zone.")}>
            <div className="size-28 bg-white text-neutral-950">
              <QR value={URL} quiet={4} className="size-full" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="ink" caption={t("反色二维码、裁掉静区或在中间嵌入标志，部分手机无法识别。", "Inverted codes, a cropped quiet zone or a logo in the middle fail on some phones.")}>
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
