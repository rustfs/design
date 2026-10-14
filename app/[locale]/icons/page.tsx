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
        lede={t("24px 网格、1.5px 线宽、直角端点。", "24px grid, 1.5px strokes, square ends.")}
        meta={[
          { k: t("数量", "Icons"), v: String(count) },
          { k: t("网格", "Grid"), v: "24 px" },
          { k: t("线宽", "Stroke"), v: "1.5 px" },
          { k: t("端点", "Caps"), v: t("直角", "Square") },
        ]}
      />

      <Section id="construction" tag="Construction" title={t("绘制规则", "Construction")} lede={<p>{t("主体在 20 × 20 内；填充只表示已写入的块。", "Keep to the 20 × 20 live area; fills mean a written shard.")}</p>}>
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
                [t("画布", "Canvas"), "24 × 24", t("统一画布", "One canvas")],
                [t("留白", "Padding"), "2 px", t("20 × 20 活动区", "20 × 20 live area")],
                [t("线宽", "Stroke"), "1.5 px", t("随图标缩放", "Scales with the icon")],
                [t("端点 · 拐角", "Caps · joins"), "square · miter", t("与字标一致", "Matches the wordmark")],
                [t("填充", "Fill"), "currentColor", t("只表示已写入的块", "Written shards only")],
                [t("颜色", "Colour"), "currentColor", t("跟随文字颜色", "Inherits text colour")],
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

      <Section id="set" tag="Icon set" title={t("图标集", "Icon set")} lede={<p>{t("点击复制用法。", "Click to copy.")}</p>}>
        <IconBrowser />
      </Section>

      <Section id="usage" tag="Usage" title={t("使用规范", "Usage")}>
        <Table
          mono={[1]}
          head={[t("场景", "Context"), t("尺寸", "Size"), t("规则", "Rule")]}
          rows={[
            [t("按钮与输入框", "Buttons and inputs"), "16 px", t("文字左侧，间距 6–8px", "Left of the label, 6–8px")],
            [t("导航与列表", "Navigation and lists"), "20 px", t("居中对齐文字", "Centred on the text")],
            [t("功能卡片", "Feature cards"), "24–32 px", t("标题上方，一卡一个", "Above the title, one per card")],
            [t("营销画面", "Marketing layouts"), "≥ 48 px", t("可放大，线宽 1px", "May scale up with a 1px stroke")],
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
