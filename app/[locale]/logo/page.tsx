import type { Metadata } from "next"
import { AppIcon, BrandSymbol, Wordmark } from "@/components/brand/logo"
import { Stripe } from "@/components/brand/stripe"
import { CardLink, DoDont, Note, Page, PageFooter, PageHeader, Prose, Section, Spec, Sub, Table } from "@/components/site/page"
import { href, isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { LETTERS, LOGO_PATHS, WORDMARK_VIEWBOX } from "@/lib/logo-paths"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "标志" : "Logo" }
}

export default async function LogoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/logo/"
        label="Guidelines · Logo"
        title={t("标志", "Logo")}
        subtitle={t("Logo", "标志")}
        lede={t(
          "RustFS 标志由定制字标与「流向 S」符号组成。字标末尾的 S 内嵌一进一出两支箭头，代表在集群中流动、被复制与修复的数据。标志是品牌最重要的资产，任何场合均须使用官方源文件。",
          "The RustFS logo consists of a custom wordmark and the Flow S symbol. The final S of the wordmark carries two arrows, one in and one out, for data that moves through the cluster and is replicated and repaired. The logo is the most important brand asset; always use the official source files.",
        )}
        meta={[
          { k: t("主标志", "Primary"), v: t("字标", "Wordmark") },
          { k: t("符号", "Symbol"), v: "Flow S" },
          { k: t("颜色", "Colour"), v: "Signal #0062FF" },
          { k: t("源文件", "Source"), v: "SVG" },
        ]}
      />

      <Section
        id="wordmark"
        tag="Wordmark"
        title={t("字标", "Wordmark")}
        lede={
          <p>
            {t(
              "字标是 RustFS 的主标志，适用于绝大多数场合。字形为定制的宽体粗黑结构：R 的字碗与腿部分离，U 的左侧竖笔高于右侧，F 的顶端斜切，最后的 S 内嵌双向箭头。字标不是字体，不得用任何字体重新排出。",
              "The wordmark is the primary logo and the right choice in almost every context. Its letters are custom drawn in a wide, heavy construction: the R's bowl is separated from its leg, the U's left stem rises above the right, the F is cut on a diagonal and the final S carries two arrows. The wordmark is not a typeface and must never be retyped in any font.",
            )}
          </p>
        }
      >
        <Spec on="white" bodyClassName="min-h-[clamp(240px,34vw,440px)]" caption={<>RUSTFS · viewBox 360 × 60.6</>} aside={<>Signal Blue <b>#0062FF</b></>}>
          <Wordmark className="h-auto w-[min(78%,760px)] text-blue-500" />
        </Spec>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { k: "R", zh: "字碗与腿部之间留出切口，结构清晰，小尺寸下仍可辨认。", en: "A cut separates the bowl from the leg, keeping the letter clear at small sizes." },
            { k: "U", zh: "左侧竖笔高出右侧，形成轻微的不对称，避免字标过于机械。", en: "The left stem rises above the right; the slight asymmetry keeps the wordmark from feeling mechanical." },
            { k: "S", zh: "末尾的 S 内嵌双向箭头，表示数据的写入与读出、复制与修复。", en: "The final S carries arrows in both directions: data written and read, replicated and repaired." },
          ].map((x) => (
            <div key={x.k} className="grid grid-cols-[56px_1fr] items-start gap-4 border-t border-border pt-4">
              <span className="font-display text-5xl leading-none font-extrabold text-brand [font-stretch:125%]">{x.k}</span>
              <p className="text-sm leading-relaxed text-subtle">{t(x.zh, x.en)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="symbol"
        tag="Symbol"
        title={t("符号：流向 S", "Symbol: the Flow S")}
        lede={
          <p>
            {t(
              "流向 S 取自字标的最后一个字母，仅在字标无法完整显示时单独使用：社交头像、favicon、应用图标、贴纸与小尺寸标识。符号与字标不得在同一画面中并列出现。",
              "The Flow S is the last letter of the wordmark. Use it on its own only where the wordmark cannot be shown in full: social avatars, favicons, app icons, stickers and small marks. Never place the symbol next to the wordmark in the same composition.",
            )}
          </p>
        }
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Spec on="white" bodyClassName="min-h-80" caption={t("符号", "Symbol")} aside="viewBox 64 × 64">
            <BrandSymbol className="size-[clamp(140px,18vw,220px)] text-blue-500" />
          </Spec>
          <div className="grid gap-4 sm:grid-cols-2">
            <Spec on="surface" bodyClassName="min-h-38" caption={t("应用图标 · Signal", "App icon · Signal")}>
              <AppIcon className="size-28" />
            </Spec>
            <Spec on="surface" bodyClassName="min-h-38" caption={t("应用图标 · Ink", "App icon · Ink")}>
              <AppIcon className="size-28" bg="#0B0E14" />
            </Spec>
            <Spec on="surface" className="sm:col-span-2" bodyClassName="min-h-38 place-items-end justify-start" caption={t("16 / 24 / 32 / 48 / 64 / 96 px · 最小 16 px", "16 / 24 / 32 / 48 / 64 / 96 px · minimum 16 px")}>
              <div className="flex flex-wrap items-end gap-5">
                {[16, 24, 32, 48, 64, 96].map((px) => (
                  <div key={px} className="grid justify-items-center gap-2">
                    <span style={{ width: px, height: px }} className="block">
                      <AppIcon className="size-full" />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">{px}</span>
                  </div>
                ))}
              </div>
            </Spec>
          </div>
        </div>
        <Note>
          {t(
            "应用图标为正方形母版，符号占画面宽度的 57%。iOS、Android 等平台会自动套用圆角蒙版，母版本身不得预先绘制圆角。",
            "The app icon master is square, with the symbol at 57% of its width. iOS, Android and other platforms apply their own corner masks; the master itself must never have rounded corners.",
          )}
        </Note>
      </Section>

      <Section
        id="colour"
        tag="Colour versions"
        title={t("颜色版本", "Colour versions")}
        lede={<p>{t("标志只使用以下颜色组合。浅色背景首选 Signal Blue 字标；深色与蓝色背景使用白色字标；单色印刷使用 Ink。", "Use the logo only in the combinations below. On light backgrounds the Signal Blue wordmark is the first choice; on dark and blue backgrounds use white; one-colour printing uses Ink.")}</p>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { on: "white" as const, cls: "text-blue-500", zh: "首选：Signal · 白底", en: "Primary: Signal on White" },
            { on: "paper" as const, cls: "text-blue-500", zh: "Signal · Paper 底", en: "Signal on Paper" },
            { on: "blue" as const, cls: "text-white", zh: "白色 · Signal 底", en: "White on Signal" },
            { on: "ink" as const, cls: "text-white", zh: "白色 · Ink 底", en: "White on Ink" },
            { on: "white" as const, cls: "text-neutral-950", zh: "单色：Ink · 白底", en: "One colour: Ink on White" },
            { on: "ink" as const, cls: "text-blue-500", zh: "大尺寸展示：Signal · Ink 底（字标宽 ≥ 160px）", en: "Large display only: Signal on Ink (wordmark ≥ 160px wide)" },
          ].map((v, i) => (
            <Spec key={i} on={v.on} bodyClassName="min-h-44" caption={t(v.zh, v.en)}>
              <Wordmark className={`h-auto w-[62%] ${v.cls}`} />
            </Spec>
          ))}
        </div>
      </Section>

      <Section
        id="clearspace"
        tag="Clear space & size"
        title={t("安全空间与最小尺寸", "Clear space and minimum size")}
        lede={<p>{t("以字标高度 H 为基准，字标四周须保留不小于 ½H 的安全空间，其中不得出现文字、图形或画面边缘。符号四周保留不小于符号宽度 25% 的空间。", "Measure from the wordmark height H. Keep at least ½H clear on every side of the wordmark, free of text, graphics and the edge of the canvas. Keep at least 25% of the symbol's width clear around the symbol.")}</p>}
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Spec on="white" bodyClassName="min-h-80" caption={t("字标：四周 ½H", "Wordmark: ½H on every side")}>
            <div className="relative p-[clamp(20px,3.2vw,40px)] outline-1 -outline-offset-1 outline-oxide-500 outline-dashed">
              <div className="relative">
                <Wordmark className="h-[clamp(40px,6.4vw,80px)] w-auto text-blue-500" />
                <span className="absolute top-0 -left-[calc(clamp(20px,3.2vw,40px)+6px)] h-full w-px bg-oxide-500" aria-hidden="true" />
                <span className="absolute top-1/2 -left-[calc(clamp(20px,3.2vw,40px)+30px)] -translate-y-1/2 font-mono text-[11px] text-oxide-600">H</span>
              </div>
              <span className="absolute top-1.5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-oxide-600">½H</span>
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-oxide-600">½H</span>
            </div>
          </Spec>
          <Spec on="white" bodyClassName="min-h-80" caption={t("符号：四周 25%", "Symbol: 25% on every side")}>
            <div className="relative p-9 outline-1 -outline-offset-1 outline-oxide-500 outline-dashed">
              <BrandSymbol className="size-36 text-blue-500" />
              <span className="absolute top-1.5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-oxide-600">25%</span>
            </div>
          </Spec>
        </div>
        <Table
          head={[t("元素", "Element"), t("屏幕最小尺寸", "Minimum on screen"), t("印刷最小尺寸", "Minimum in print"), t("说明", "Notes")]}
          mono={[1, 2]}
          rows={[
            [t("字标", "Wordmark"), "72 px", "18 mm", t("小于此尺寸时改用符号或应用图标", "Below this, use the symbol or the app icon")],
            [t("符号", "Symbol"), "16 px", "5 mm", t("16px 以下不得使用", "Never below 16px")],
            [t("应用图标", "App icon"), "16 px", "6 mm", t("favicon 使用应用图标，不使用单独的符号", "Favicons use the app icon, not the bare symbol")],
          ]}
        />
      </Section>

      <Section
        id="lockups"
        tag="Lockups"
        title={t("组合规范", "Lockups")}
        lede={<p>{t("字标与其它元素组合时，间距与对齐均以 H 为单位。组合只有以下四种，不得自行创造新的组合。", "When the wordmark is combined with other elements, spacing and alignment are measured in H. There are four lockups; do not create others.")}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Spec on="white" bodyClassName="min-h-56" caption={t("字标 + 品牌口号：间距 H，口号为 Geist Mono 大写，字高 ⅓H", "Wordmark + line: H apart, line in Geist Mono caps at ⅓H")}>
            <div className="grid gap-[44px]">
              <Wordmark className="h-11 w-auto text-blue-500" />
              <span className="font-mono text-[13px] leading-none font-medium tracking-[0.12em] text-neutral-950 uppercase">Every byte, accounted for.</span>
            </div>
          </Spec>
          <Spec on="white" bodyClassName="min-h-56" caption={t("产品组合：间距 ½H 的 1px 分隔线，产品名为 Geist Medium，字高 = H", "Product lockup: a 1px rule with ½H either side, product name in Geist Medium at cap height H")}>
            <div className="flex items-center gap-[18px]">
              <Wordmark className="h-9 w-auto text-blue-500" />
              <span className="h-12 w-px bg-neutral-300" />
              <span className="text-[44px] leading-none font-medium tracking-[-0.01em] text-neutral-950">Console</span>
            </div>
          </Spec>
          <Spec on="ink" bodyClassName="min-h-56" caption={t("联合品牌：双方等高，以细「×」分隔，间距 H", "Co-branding: equal heights, separated by a light “×”, H apart")}>
            <div className="flex items-center gap-9">
              <Wordmark className="h-9 w-auto text-white" />
              <span className="font-display text-3xl font-light text-neutral-400">×</span>
              <span className="grid h-9 w-36 place-items-center border border-dashed border-white/30 font-mono text-[10px] tracking-[0.08em] text-neutral-400">{t("合作方标志", "PARTNER LOGO")}</span>
            </div>
          </Spec>
          <Spec on="blue" bodyClassName="min-h-56" caption={t("签名组合：字标 + 条带签名，条带方块边长 = ⅓H", "Signature: wordmark + stripe, each shard ⅓H square")}>
            <div className="flex items-center gap-9">
              <Wordmark className="h-9 w-auto text-white" />
              <Stripe className="text-[12px] [--mx-data:#FFFFFF] [--mx-parity:#0B0E14]" />
            </div>
          </Spec>
        </div>
        <Sub title={t("产品与子品牌命名", "Product names")}>
          <Prose>
            <p>{t("产品组合仅用于 RustFS 官方产品，产品名使用英文且首字母大写。中文环境中产品名同样保留英文，不作翻译。", "Product lockups are reserved for official RustFS products. Product names are English and capitalised, and stay in English in Chinese contexts.")}</p>
          </Prose>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Console", "Operator", "Docs"].map((p) => (
              <Spec key={p} on="white" bodyClassName="min-h-28" caption={`RustFS ${p}`}>
                <div className="flex items-center gap-3">
                  <Wordmark className="h-5 w-auto text-blue-500" />
                  <span className="h-6 w-px bg-neutral-300" />
                  <span className="text-2xl leading-none font-medium text-neutral-950">{p}</span>
                </div>
              </Spec>
            ))}
          </div>
        </Sub>
      </Section>

      <Section
        id="misuse"
        tag="Misuse"
        title={t("错误用法", "Misuse")}
        lede={<p>{t("以下处理会破坏标志的识别度，任何情况下均不得使用。", "Each of these damages recognition and is never permitted.")}</p>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DoDont kind="dont" on="white" caption={t("改为渐变或非品牌色", "Gradients or off-brand colours")}>
            <MisuseWordmark variant="gradient" className="h-auto w-[78%]" />
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("拉伸或压扁", "Stretched or squashed")}>
            <Wordmark className="h-auto w-[78%] origin-center scale-x-[1.25] scale-y-[0.7] text-blue-500" />
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("描边、投影或发光", "Outlines, shadows or glows")}>
            <Wordmark className="h-auto w-[78%] text-transparent [filter:drop-shadow(0_6px_8px_rgba(0,98,255,.55))] [&_g]:[stroke:#0062FF] [&_g]:[stroke-width:2]" />
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("旋转或倾斜", "Rotated or skewed")}>
            <Wordmark className="h-auto w-[70%] -rotate-12 text-blue-500" />
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("用字体重新排出", "Retyped in a font")}>
            <span className="font-sans text-4xl font-black tracking-tight text-blue-500">RUSTFS</span>
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("删除或改动 S 中的箭头", "Removing or changing the arrows in the S")}>
            <MisuseWordmark variant="no-arrows" className="h-auto w-[78%] text-blue-500" />
          </DoDont>
          <DoDont kind="dont" on="white" bodyClassName="bg-[repeating-linear-gradient(45deg,#5C99FF_0_10px,#FFFFFF_10px_20px)]" caption={t("放在对比不足或杂乱的背景上", "On busy or low-contrast backgrounds")}>
            <Wordmark className="h-auto w-[78%] text-blue-500" />
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("与符号并列，或改变字间距", "Paired with the symbol, or re-spaced")}>
            <div className="flex items-center gap-3">
              <BrandSymbol className="size-9 text-blue-500" />
              <Wordmark className="h-6 w-auto text-blue-500" />
            </div>
          </DoDont>
        </div>
      </Section>

      <Section
        id="name"
        tag="Name"
        title={t("名称书写", "Writing the name")}
        lede={<p>{t("字标中的全大写形式只属于标志。在正文、标题与界面文字中，名称一律写作 RustFS。", "The all-caps form belongs to the logo alone. In running text, headings and interface copy the name is always written RustFS.")}</p>}
      >
        <Table
          head={[t("正确", "Correct"), t("错误", "Incorrect"), t("说明", "Notes")]}
          mono={[0, 1]}
          rows={[
            ["RustFS", "RUSTFS · Rustfs · rustFS · Rust FS", t("R 与 FS 大写，中间无空格", "Capital R and FS, no space")],
            ["RustFS 1.0.1", "RustFS v1.0.1 · RustFS V1", t("版本号不加 v 前缀", "No v prefix on versions")],
            [t("RustFS 对象存储", "RustFS object storage"), t("锈 FS · RustFS 文件系统", "RustFS file system"), t("名称不翻译；RustFS 是对象存储，不称作文件系统", "The name is never translated; RustFS is object storage, not a file system")],
            ["rustfs/rustfs", "RustFS/RustFS", t("命令、镜像与路径中保持小写原样", "Commands, images and paths keep their lowercase form")],
          ]}
        />
      </Section>

      <Section id="files" tag="Files" title={t("源文件", "Source files")} lede={<p>{t("所有标志文件均为 SVG 矢量格式，可在资源下载页获取。", "Every logo file is provided as SVG on the downloads page.")}</p>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <CardLink href={href(locale, "downloads")} k="downloads/" title={t("下载标志文件", "Download logo files")} icon="download">
            {t("字标、符号与应用图标，含 Signal、白色与 Ink 三种颜色版本。", "Wordmark, symbol and app icon in Signal, White and Ink.")}
          </CardLink>
          <CardLink href={href(locale, "color")} k="color/" title={t("色彩规范", "Colour standards")}>
            {t("标志颜色与背景色的完整对比度要求。", "Full contrast requirements for logo and background colours.")}
          </CardLink>
        </div>
      </Section>

      <PageFooter slug="logo" />
    </Page>
  )
}

/** Deliberately wrong renderings for the misuse grid. */
function MisuseWordmark({ variant, className }: { variant: "gradient" | "no-arrows"; className?: string }) {
  if (variant === "gradient") {
    return (
      <svg viewBox={WORDMARK_VIEWBOX} className={className} aria-hidden="true">
        <defs>
          <linearGradient id="misuse-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <g fill="url(#misuse-gradient)">
          {LETTERS.map((k) => (
            <path key={k} d={LOGO_PATHS[k]} />
          ))}
        </g>
      </svg>
    )
  }
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} aria-hidden="true">
      <g fill="currentColor">
        {LETTERS.filter((k) => k !== "s2").map((k) => (
          <path key={k} d={LOGO_PATHS[k]} />
        ))}
        <path d={LOGO_PATHS.s1} transform="translate(180.2 0)" />
      </g>
    </svg>
  )
}
