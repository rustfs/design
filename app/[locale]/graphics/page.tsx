import type { Metadata } from "next"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix, type MatrixOptions } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import { MatrixPlayground } from "@/components/site/matrix-playground"
import { DoDont, Note, Page, PageFooter, PageHeader, Prose, Section, Spec, Sub, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "图形语言" : "Graphics" }
}

const INK_VARS = "[--mx-data:#0062FF] [--mx-parity:#FF5E14] [--mx-empty:rgba(255,255,255,0.16)]"
const PAPER_VARS = "[--mx-data:#0062FF] [--mx-parity:#FF5E14] [--mx-empty:rgba(11,14,20,0.16)]"
const SIGNAL_VARS = "[--mx-data:#FFFFFF] [--mx-parity:#0B0E14] [--mx-empty:rgba(255,255,255,0.3)]"

export default async function GraphicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/graphics/"
        label="Guidelines · Graphics"
        title={t("图形语言", "Graphics")}
        subtitle={t("Graphics", "图形语言")}
        lede={t(
          "RustFS 的品牌图形直接取自纠删码的真实结构：对象被切成数据块与校验块，写入纠删集中的每一块盘。条带签名与分片矩阵是仅有的两种品牌图形，所有版式都在同一套网格上组织。",
          "RustFS brand graphics come straight from the real structure of erasure coding: an object is cut into data and parity shards and written to every drive in an erasure set. The stripe signature and the shard matrix are the only two brand graphics, and every layout is organised on the same grid.",
        )}
        meta={[
          { k: t("图形", "Graphics"), v: t("条带签名 · 分片矩阵", "Stripe · Shard matrix") },
          { k: t("网格", "Grid"), v: "12 col · 4px" },
          { k: t("画板单位", "Artboard unit"), v: "u = 1/100" },
        ]}
      />

      <Section id="model" tag="Model" title={t("图形从哪里来", "Where the graphics come from")} lede={<p>{t("一个纠删集由若干块盘组成。每次写入，对象被切成 k 个数据块与 m 个校验块，每块盘存一块；下一个条带中，校验块的位置向右移动一格。任意 k 块即可还原对象。", "An erasure set is a group of drives. On each write the object is cut into k data shards and m parity shards, one per drive; on the next stripe the parity moves one drive to the right. Any k shards rebuild the object.")}</p>}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Spec on="paper" bodyClassName="min-h-80 place-items-stretch content-center gap-6" caption={t("一次写入 · EC 4+2", "One write · EC 4+2")}>
            <div className="grid grid-cols-[auto_1fr] items-center gap-5 text-neutral-950">
              <div className="grid h-24 w-28 content-between border-2 border-neutral-950 p-2.5 font-mono text-[11px]">
                <span>{t("对象", "OBJECT")}</span>
                <b className="font-medium">hello.txt</b>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {["D1", "D2", "D3", "D4", "P1", "P2"].map((s, i) => (
                  <div key={s} className="grid gap-1.5">
                    <span className={`grid h-16 place-items-end-start p-1.5 font-mono text-[11px] text-white ${i < 4 ? "bg-blue-500" : "bg-oxide-500"}`}>{s}</span>
                    <span className="font-mono text-[9px] tracking-[0.06em] text-neutral-500">#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </Spec>
          <Spec on="ink" bodyClassName={`min-h-80 ${INK_VARS}`} caption={t("连续写入 · EC 4+2", "Successive writes · EC 4+2")}>
            <ShardMatrix className="!h-56" cols={6} rows={6} k={4} m={2} seed={1} gap={0.22} />
          </Spec>
        </div>
      </Section>

      <Section id="stripe" tag="Stripe signature" title={t("条带签名", "Stripe signature")} lede={<p>{t("条带签名是一个最小的纠删条带：4 个数据块加 2 个校验块。它用作品牌签名、分隔符与角标，是品牌最小的图形单位。", "The stripe signature is the smallest erasure stripe: four data shards and two parity shards. It works as a sign-off, a divider and a corner mark, and is the smallest graphic unit in the brand.")}</p>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Spec on="white" bodyClassName="min-h-40" caption={t("标准 4+2", "Standard 4+2")}><Stripe className="text-[22px]" /></Spec>
          <Spec on="ink" bodyClassName={`min-h-40 ${INK_VARS}`} caption={t("Ink 底", "On Ink")}><Stripe className="text-[22px]" /></Spec>
          <Spec on="blue" bodyClassName={`min-h-40 ${SIGNAL_VARS}`} caption={t("Signal 底：校验块为 Ink", "On Signal: parity turns Ink")}><Stripe className="text-[22px]" /></Spec>
          <Spec on="white" bodyClassName="min-h-40" caption={t("缺失一块：用于修复相关内容", "One shard missing: for healing topics")}><Stripe className="text-[22px]" missing={[2]} /></Spec>
        </div>
        <Table
          head={[t("规则", "Rule"), t("规范", "Standard")]}
          rows={[
            [t("结构", "Structure"), t("固定为 4 个数据块 + 2 个校验块，方块间距为边长的 32%。不得改变数量、顺序或形状。", "Always four data shards and two parity shards, spaced at 32% of the shard size. Never change the count, order or shape.")],
            [t("尺寸", "Size"), t("方块边长为相邻字标高度的 ⅓；独立使用时不小于 6px。", "Each shard is ⅓ of the adjacent wordmark height; at least 6px on its own.")],
            [t("位置", "Placement"), t("页脚签名、标题旁的角标、章节分隔。每个画面最多出现一次。", "Footer sign-offs, corner marks beside titles, section dividers. At most once per layout.")],
            [t("颜色", "Colour"), t("数据块为 Signal Blue，校验块为 Oxide；Signal 底上数据块为白色、校验块为 Ink。", "Data shards are Signal Blue and parity Oxide; on Signal, data turns white and parity Ink.")],
          ]}
        />
      </Section>

      <Section id="matrix" tag="Shard matrix" title={t("分片矩阵", "Shard matrix")} lede={<p>{t("分片矩阵是放大的纠删集：列代表盘，行代表条带。它是品牌的主视觉，用于封面、海报、首屏与视频。矩阵须按真实规则生成，不得手工随意排布色块。", "The shard matrix is an erasure set at scale: columns are drives and rows are stripes. It is the brand's key visual for covers, posters, heroes and video. A matrix must be generated by the real rule; never arrange the squares by hand.")}</p>}>
        <MatrixPlayground />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { o: { cols: 12, rows: 6, k: 4, m: 2, seed: 2 }, zh: "solid：默认，用于主视觉", en: "solid: the default key visual" },
            { o: { cols: 12, rows: 6, k: 4, m: 2, seed: 2, mode: "tone" as const }, zh: "tone：数据块三档明度，增加纵深", en: "tone: three data shades for depth" },
            { o: { cols: 12, rows: 6, k: 4, m: 2, seed: 2, mode: "outline" as const }, zh: "outline：数据块为线框，校验块成为焦点", en: "outline: data as outlines, parity becomes the focus" },
            { o: { cols: 12, rows: 6, k: 4, m: 2, seed: 2, fade: "bl" as const }, zh: "dissolve：向一角消隐，为文字让位", en: "dissolve: thins toward a corner to make room for type" },
            { o: { cols: 12, rows: 6, k: 4, m: 2, seed: 2, dead: [3, 8] }, zh: "dead：整列故障盘，说明容错", en: "dead: failed drives, for fault tolerance" },
            { o: { cols: 12, rows: 6, k: 4, m: 2, seed: 2, missing: 4 }, zh: "missing：零散缺失块，说明修复", en: "missing: scattered gaps, for healing" },
          ].map((v: { o: MatrixOptions; zh: string; en: string }, i) => (
            <Spec key={i} on="ink" bodyClassName={`min-h-44 ${INK_VARS}`} caption={t(v.zh, v.en)}>
              <ShardMatrix className="!h-32" gap={0.22} {...v.o} />
            </Spec>
          ))}
        </div>
        <Note>{t("矩阵中的颜色比例由 k 与 m 决定，天然满足「蓝色承载、橙色校验」的比例。为文字留白时使用 dissolve 或调整矩阵所占区域，不得在矩阵上叠加半透明遮罩。", "The colour balance of a matrix follows from k and m, so it naturally keeps Signal dominant and Oxide scarce. To make room for type, use dissolve or change the area the matrix covers; never lay a translucent scrim over it.")}</Note>
      </Section>

      <Section id="grid" tag="Grid" title={t("版式网格", "Layout grid")} lede={<p>{t("网页使用 12 栏网格，最大宽度 1240px，两侧留白不小于 16px，间距以 4px 为基数。固定尺寸的画板（封面、海报、幻灯片）以 u 为单位，1u 等于短边的 1/100，安全边距为 7u。", "Web pages use a 12-column grid, 1240px wide at most, with side gutters of at least 16px and spacing on a 4px base. Fixed-size artboards — covers, posters, slides — measure in u, one hundredth of the short side, with a 7u safe margin.")}</p>}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Spec on="paper" bodyClassName="min-h-72 p-6 place-items-stretch" caption={t("网页：12 栏，24px 栏间距", "Web: 12 columns, 24px gutters")}>
            <div className="relative grid grid-cols-12 gap-3">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className="h-56 bg-blue-500/10 outline-1 -outline-offset-1 outline-blue-500/40" />
              ))}
              <div className="absolute inset-x-0 top-6 grid grid-cols-12 gap-3">
                <span className="col-span-7 h-12 bg-neutral-950" />
                <span className="col-span-5" />
                <span className="col-span-5 mt-3 h-3 bg-neutral-400" />
                <span className="col-span-7" />
                <span className="col-span-4 mt-2 h-3 bg-neutral-400" />
                <span className="col-span-8" />
                <span className="col-span-6 col-start-7 -mt-16 h-28 bg-blue-500" />
              </div>
            </div>
          </Spec>
          <Spec on="ink" bodyClassName={`min-h-72 p-6 ${INK_VARS}`} caption={t("画板：u = 短边 / 100，边距 7u", "Artboard: u = short side / 100, 7u margin")}>
            <div className="relative aspect-[1200/630] w-full max-w-[460px] bg-neutral-950 outline-1 outline-white/15">
              <div className="absolute inset-y-[7%] left-[3.675%] right-[3.675%] outline-1 outline-oxide-500 outline-dashed" />
              <span className="absolute top-[1.2%] left-[1%] font-mono text-[10px] text-oxide-400">7u</span>
              <Wordmark className="absolute top-[7%] left-[3.675%] h-[4.25%] w-auto text-white" />
              <span className="absolute bottom-[7%] left-[3.675%] font-display text-[clamp(18px,3vw,32px)] leading-none font-extrabold text-white [font-stretch:125%]">1.0.1</span>
              <div className="absolute inset-y-0 right-0 w-[36%]">
                <ShardMatrix className="!h-full" cols={4} rows={8} k={4} m={2} seed={6} fit="slice" gap={0.22} />
              </div>
            </div>
          </Spec>
        </div>
        <Table
          mono={[1]}
          head={[t("断点", "Breakpoint"), t("宽度", "Width"), t("栏数", "Columns"), t("两侧留白", "Gutter")]}
          rows={[
            [t("手机", "Phone"), "< 640px", "4", "16px"],
            [t("平板", "Tablet"), "640–1023px", "8", "24–40px"],
            [t("桌面", "Desktop"), "1024–1439px", "12", "40–64px"],
            [t("宽屏", "Wide"), "≥ 1440px", t("12，内容最大 1240px", "12, content max 1240px"), "64px"],
          ]}
        />
      </Section>

      <Section id="diagrams" tag="Diagrams" title={t("架构图", "Diagrams")} lede={<p>{t("架构图与流程图沿用同一套语言：1px 线框、直角、正交连线、等宽标注。RustFS 组件使用 Signal Blue，外部系统使用中性色，需要强调的唯一路径使用 Oxide。", "Architecture and flow diagrams share one language: 1px outlines, square corners, orthogonal connectors and mono labels. RustFS components are Signal Blue, external systems neutral, and the single path to emphasise is Oxide.")}</p>}>
        <Spec on="white" bodyClassName="min-h-96 p-[clamp(16px,3vw,40px)] place-items-stretch">
          <div className="grid gap-3 text-neutral-950 md:grid-cols-[1fr_auto_1.1fr_auto_2.2fr] md:items-center">
            <div className="grid gap-2">
              {["AWS SDK", "mc / aws-cli", t("应用", "Applications")].map((c) => (
                <div key={c} className="border border-neutral-300 px-3 py-2.5 font-mono text-xs">{c}</div>
              ))}
            </div>
            <DiagramArrow />
            <div className="grid gap-1.5 bg-blue-500 p-4 text-white">
              <Icon name="api" className="size-6" />
              <b className="text-base font-semibold">S3 API</b>
              <span className="font-mono text-[11px] opacity-80">:9000</span>
            </div>
            <DiagramArrow accent />
            <div className="grid gap-3 border border-blue-500 p-3">
              <span className="font-mono text-[11px] tracking-[0.06em] text-blue-600 uppercase">RustFS · Pool 1</span>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="grid gap-2 border border-neutral-300 p-2">
                    <span className="flex items-center gap-1.5 font-mono text-[11px]"><Icon name="node" className="size-3.5 text-blue-500" />node-{n}</span>
                    <div className="h-14 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
                      <ShardMatrix className="!h-full" cols={4} rows={3} k={4} m={2} shift={1} seed={n} gap={0.25} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Spec>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [t("线条", "Lines"), t("1px 线框与连线；连线只走水平与垂直方向，箭头为实心三角。", "1px outlines and connectors; connectors run horizontally or vertically and end in solid arrowheads.")],
            [t("颜色", "Colour"), t("RustFS 组件为蓝色，外部系统为中性色；全图只用一条 Oxide 路径。", "RustFS components blue, external systems neutral; one Oxide path per diagram.")],
            [t("文字", "Text"), t("组件名用 Geist 半粗，端口、路径与参数用 Geist Mono。", "Component names in Geist Semibold; ports, paths and parameters in Geist Mono.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid gap-1.5 border-t border-border pt-3 text-sm leading-relaxed text-subtle">
              <b className="font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">{k}</b>
              {v}
            </div>
          ))}
        </div>
      </Section>

      <Section id="imagery" tag="Imagery" title={t("图像与截图", "Imagery and screenshots")} lede={<p>{t("品牌只使用真实的产品截图、硬件与活动照片。不使用库存图片、AI 生成图像，也不使用与内容无关的抽象插画。", "The brand uses real product screenshots and real photos of hardware and events. No stock imagery, no AI-generated images and no abstract illustration unrelated to the content.")}</p>}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Spec on="paper" bodyClassName="min-h-80 p-[clamp(16px,3vw,36px)] place-items-stretch" caption={t("截图：直角、1px 边框、无设备外壳、无投影", "Screenshots: square, 1px frame, no device chrome, no shadow")}>
            <ConsoleSketch />
          </Spec>
          <div className="grid gap-4">
            <Sub title={t("产品截图", "Product screenshots")}>
              <Prose>
                <ul>
                  <li>{t("使用真实界面与真实的示例数据（存储桶 my-bucket、对象 hello.txt），不得出现客户数据与内部主机名。", "Show the real interface with canonical sample data (bucket my-bucket, object hello.txt); never customer data or internal hostnames.")}</li>
                  <li>{t("以 1px 边框直接置于版面，不加设备外壳、圆角、倾斜或透视。", "Place it flat with a 1px frame: no device chrome, rounded corners, tilt or perspective.")}</li>
                  <li>{t("截图宽度按网格取整；需要强调时，用 Oxide 1px 线框标注唯一的区域。", "Size screenshots to the grid; to emphasise, outline one region with a 1px Oxide frame.")}</li>
                </ul>
              </Prose>
            </Sub>
            <Sub title={t("照片", "Photography")}>
              <Prose>
                <ul>
                  <li>{t("拍摄真实的硬件、机房、团队与活动现场；自然光或中性白光，避免蓝紫色舞台灯效。", "Photograph real hardware, data centres, teams and events in natural or neutral light; avoid blue and purple stage lighting.")}</li>
                  <li>{t("置于品牌底色上时可使用 Ink 单色调处理，高光不超过 Paper。", "On brand surfaces, photos may take an Ink duotone, with highlights no brighter than Paper.")}</li>
                </ul>
              </Prose>
            </Sub>
          </div>
        </div>
      </Section>

      <Section id="rules" tag="Do & Don't" title={t("图形规则", "Graphic rules")}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="ink" bodyClassName={`min-h-52 ${INK_VARS}`} caption={t("矩阵按纠删规则生成，校验块成斜向条带。", "A matrix generated by the erasure rule; parity forms diagonal bands.")}>
            <ShardMatrix className="!h-36" cols={12} rows={6} k={4} m={2} seed={4} gap={0.22} />
          </DoDont>
          <DoDont kind="dont" on="ink" bodyClassName="min-h-52" caption={t("随意排布的色块、圆点与渐变光效。", "Arbitrary squares, dots and gradient light effects.")}>
            <div className="grid grid-cols-8 gap-2">
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i} className="size-6 rounded-full" style={{ background: ["#0062FF", "#FF5E14", "#7C3AED", "#06B6D4"][(i * 7) % 4], opacity: ((i * 37) % 10) / 10 + 0.2, boxShadow: "0 0 18px rgba(124,58,237,.6)" }} />
              ))}
            </div>
          </DoDont>
          <DoDont kind="do" on="paper" bodyClassName={`min-h-52 ${PAPER_VARS}`} caption={t("条带签名作为页脚签名，每个画面一次。", "The stripe as a footer sign-off, once per layout.")}>
            <div className="flex w-full items-center justify-between border-t border-neutral-300 pt-4">
              <Wordmark className="h-4 w-auto text-blue-500" />
              <Stripe className="text-[10px]" />
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" bodyClassName="min-h-52" caption={t("改变条带的数量、颜色或改为圆形。", "Changing the stripe's count or colours, or making it round.")}>
            <span className="flex gap-1.5">
              {["#0062FF", "#7C3AED", "#FF5E14", "#0062FF", "#FF5E14", "#06B6D4", "#FF5E14"].map((c, i) => (
                <i key={i} className="size-5 rounded-full" style={{ background: c }} />
              ))}
            </span>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="graphics" />
    </Page>
  )
}

function DiagramArrow({ accent = false }: { accent?: boolean }) {
  return (
    <svg viewBox="0 0 48 12" className={`hidden h-3 w-12 md:block ${accent ? "text-oxide-500" : "text-neutral-400"}`} aria-hidden="true">
      <path d="M0 6h40" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 1l8 5-8 5z" fill="currentColor" />
    </svg>
  )
}

function ConsoleSketch() {
  const rows = [
    ["my-bucket", "1,284", "12.4 GiB", "EC 4+2"],
    ["models", "312", "86.1 GiB", "EC 4+2"],
    ["logs-2026", "48,907", "3.2 GiB", "EC 4+2"],
    ["backups", "96", "410 GiB", "EC 8+4"],
  ]
  return (
    <div className="grid min-w-0 grid-cols-[132px_1fr] overflow-hidden border border-neutral-300 bg-white text-neutral-950">
      <div className="grid content-start gap-1 border-r border-neutral-200 p-3">
        <Wordmark className="mb-3 h-3 w-auto text-blue-500" />
        {["Buckets", "Access", "Replication", "Lifecycle", "Settings"].map((n, i) => (
          <span key={n} className={`flex items-center gap-2 px-1.5 py-1 text-[11px] ${i === 0 ? "bg-neutral-100 font-semibold" : "text-neutral-600"}`}>
            <i className={`size-1.5 ${i === 0 ? "bg-blue-500" : "outline-1 -outline-offset-1 outline-neutral-300"}`} />
            {n}
          </span>
        ))}
      </div>
      <div className="min-w-0 p-3">
        <div className="mb-3 flex items-center justify-between">
          <b className="text-sm font-semibold">Buckets</b>
          <span className="bg-blue-500 px-2 py-1 text-[10px] font-medium text-white">Create bucket</span>
        </div>
        <table className="w-full border-collapse font-mono text-[10px]">
          <thead>
            <tr className="text-left text-neutral-500">
              {["Name", "Objects", "Size", "Erasure"].map((h) => (
                <th key={h} className="border-b border-neutral-200 py-1.5 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, j) => (
                  <td key={j} className={`border-b border-neutral-100 py-1.5 ${j > 0 && j < 3 ? "text-right pr-3" : ""}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
