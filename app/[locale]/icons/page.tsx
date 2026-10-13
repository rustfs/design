import type { Metadata } from "next"
import { Icon } from "@/components/brand/icon"
import { IconBrowser } from "@/components/site/icon-browser"
import { DoDont, Page, PageFooter, PageHeader, Section, Spec, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { ICONS } from "@/lib/icons"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "图标" : "Icons" }
}

export default async function IconsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)
  const count = Object.keys(ICONS).length

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/icons/"
        label="Guidelines · Icons"
        title={t("图标", "Icons")}
        subtitle={t("Icons", "图标")}
        lede={t(
          "RustFS 图标集覆盖存储结构、数据流、安全与界面操作。图标与字标同样方正：24px 网格、1.5px 线宽、直角端点与斜接拐角。",
          "The RustFS icon set covers storage structure, data flow, security and interface actions. Icons are as square as the wordmark: a 24px grid, 1.5px strokes, square caps and mitred joins.",
        )}
        meta={[
          { k: t("数量", "Icons"), v: String(count) },
          { k: t("网格", "Grid"), v: "24 px" },
          { k: t("线宽", "Stroke"), v: "1.5 px" },
          { k: t("端点", "Caps"), v: t("直角", "Square") },
        ]}
      />

      <Section id="construction" tag="Construction" title={t("绘制规则", "Construction")} lede={<p>{t("图标在 24 × 24 网格上绘制，四周保留 2px 留白，主体位于 20 × 20 的活动区域内。线条一律 1.5px，端点为直角，拐角为斜接；填充只用于表示「已写入」或「当前」的方块。", "Icons are drawn on a 24 × 24 grid with 2px of padding, keeping the subject inside a 20 × 20 live area. Every stroke is 1.5px with square caps and mitred joins; fills are reserved for a shard that is written or current.")}</p>}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Spec on="white" bodyClassName="min-h-96" caption={t("bucket · 24px 网格放大", "bucket · 24px grid enlarged")}>
            <svg viewBox="-1 -1 26 26" className="size-[min(72vw,320px)]" aria-hidden="true">
              {Array.from({ length: 25 }, (_, i) => (
                <g key={i}>
                  <path d={`M${i} 0V24`} stroke="#DCE0E6" strokeWidth={0.04} />
                  <path d={`M0 ${i}H24`} stroke="#DCE0E6" strokeWidth={0.04} />
                </g>
              ))}
              <rect x="2" y="2" width="20" height="20" fill="#FF5E14" fillOpacity={0.06} stroke="#FF5E14" strokeWidth={0.06} strokeDasharray="0.3 0.3" />
              <rect x="3" y="3" width="18" height="18" fill="none" stroke="#9AA0AC" strokeWidth={0.05} />
              <circle cx="12" cy="12" r="10" fill="none" stroke="#9AA0AC" strokeWidth={0.05} />
              <path d={ICONS.bucket.d} fill="none" stroke="#0062FF" strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
              <path d={ICONS.bucket.d} fill="none" stroke="#FFFFFF" strokeWidth={0.06} />
              <text x="2" y="1.4" fontSize="0.9" fill="#B33A10" fontFamily="var(--font-mono)">2px</text>
              <text x="15.6" y="23.6" fontSize="0.9" fill="#5A616D" fontFamily="var(--font-mono)">24 × 24</text>
            </svg>
          </Spec>
          <div className="grid gap-4">
            <Table
              mono={[1]}
              head={[t("属性", "Property"), t("取值", "Value"), t("说明", "Notes")]}
              rows={[
                [t("画布", "Canvas"), "24 × 24", t("所有图标在同一画布上绘制", "Every icon shares one canvas")],
                [t("留白", "Padding"), "2 px", t("主体位于 20 × 20 活动区域内", "Subject stays in the 20 × 20 live area")],
                [t("线宽", "Stroke"), "1.5 px", t("缩放时保持比例，不单独加粗", "Scales with the icon; never thickened separately")],
                [t("端点 · 拐角", "Caps · joins"), "square · miter", t("与字标的直角结构一致", "Matches the wordmark's square construction")],
                [t("填充", "Fill"), "currentColor", t("仅用于表示已写入或当前的方块", "Only for a shard that is written or current")],
                [t("颜色", "Colour"), "currentColor", t("跟随文字颜色，不单独上色", "Inherits the text colour; never coloured on its own")],
              ]}
            />
            <div className="grid grid-cols-4 gap-px border border-border bg-border">
              {[16, 20, 24, 32].map((s) => (
                <div key={s} className="grid place-items-center gap-3 bg-background p-5">
                  <span style={{ width: s, height: s }} className="block">
                    <Icon name="erasure-set" className="size-full" />
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="set" tag="Icon set" title={t("图标集", "Icon set")} lede={<p>{t("点击图标即可复制 React 用法。站点与产品中通过 Icon 组件引用，名称即下方标注。", "Click an icon to copy its React usage. Sites and products reference icons through the Icon component by the names below.")}</p>}>
        <IconBrowser />
      </Section>

      <Section id="usage" tag="Usage" title={t("使用规范", "Usage")}>
        <Table
          mono={[1]}
          head={[t("场景", "Context"), t("尺寸", "Size"), t("规则", "Rule")]}
          rows={[
            [t("按钮与输入框", "Buttons and inputs"), "16 px", t("位于文字左侧，间距 6–8px；与文字同色。", "Left of the label with 6–8px between; same colour as the label.")],
            [t("导航与列表", "Navigation and lists"), "20 px", t("与文字基线居中对齐。", "Centred on the text line.")],
            [t("功能卡片", "Feature cards"), "24–32 px", t("位于标题上方，左对齐；一个卡片一个图标。", "Above the title, left aligned; one icon per card.")],
            [t("营销画面", "Marketing layouts"), "≥ 48 px", t("可按比例放大并将线宽降至 1px，作为辅助图形。", "May scale up with a 1px stroke as a secondary graphic.")],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="white" caption={t("图标配文字，与文字同色。", "Icons paired with labels, in the label colour.")}>
            <div className="flex flex-wrap gap-3 text-neutral-950">
              {(["bucket", "replicate", "lock"] as const).map((n) => (
                <span key={n} className="inline-flex items-center gap-2 border border-neutral-300 px-3 py-2 text-sm">
                  <Icon name={n} className="size-4" />
                  {n === "bucket" ? t("存储桶", "Buckets") : n === "replicate" ? t("复制", "Replication") : t("对象锁定", "Object Lock")}
                </span>
              ))}
            </div>
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("圆角线条、混用其它图标库、单独上色。", "Rounded strokes, mixed icon libraries, decorative colours.")}>
            <div className="flex gap-4">
              <svg viewBox="0 0 24 24" className="size-9 text-violet-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.75 5.25h16.5M5.25 5.25l1.5 15h10.5l1.5-15M6 10.25h12" /></svg>
              <svg viewBox="0 0 24 24" className="size-9 text-oxide-500" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12h8" stroke="#fff" strokeWidth={2} strokeLinecap="round" /></svg>
              <svg viewBox="0 0 24 24" className="size-9 text-teal-500" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M21 3v6h-6" /></svg>
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="icons" />
    </Page>
  )
}
