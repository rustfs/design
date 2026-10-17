import Link from "next/link"
import type { Metadata } from "next"
import { Icon } from "@/components/brand/icon"
import { WriteWordmark } from "@/components/brand/write-wordmark"
import { LiveMatrix } from "@/components/brand/matrix-live"
import { ShardMatrix } from "@/components/brand/matrix"
import { CardLink, Page, PageFooter, Section, Table } from "@/components/site/page"
import { href, isLocale, setLocale, t, type Locale } from "@/lib/i18n"

export const metadata: Metadata = { title: { absolute: "RustFS Design System" } }

export default async function Overview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  return (
    <>
      {/* Hero: an erasure set drawn to scale — 16 drives, parity rotating per stripe */}
      <section className="relative overflow-hidden border-b border-border bg-neutral-950 text-white [--mx-data:#0062FF] [--mx-empty:rgba(255,255,255,0.14)] [--mx-parity:#FF5E14]" aria-label="RustFS Design System">
        <div className="container-page grid min-h-[min(640px,86dvh)] grid-cols-1 gap-x-10 gap-y-7 pt-[clamp(28px,4vw,48px)] pb-[clamp(28px,3.5vw,40px)] md:min-h-[min(86dvh,clamp(480px,45vw,640px))] md:grid-cols-2 md:grid-rows-[auto_1fr]">
          <div className="flex flex-wrap justify-between gap-4 font-mono text-xs leading-tight tracking-[0.06em] text-neutral-400 uppercase md:col-span-2">
            <span>
              <b className="font-medium text-white">RustFS Design System</b> · {t("官方设计指南", "Official design guidelines")} v1.0
            </span>
            <span>s3://rustfs-brand/ · 2026-10-14</span>
          </div>
          <LiveMatrix className="relative order-3 min-h-55 md:order-none md:col-start-2 md:row-start-2 md:min-h-80 [&>svg]:absolute [&>svg]:inset-0" cols={16} rows={14} k={12} m={4} seed={11} mode="tone" fade="bl" gap={0.22} fit="right" missing={2} write heal />
          <div className="@container relative z-10 order-2 grid gap-7 self-end md:order-none md:col-start-1 md:row-start-2">
            <WriteWordmark className="h-auto w-full max-w-[560px] text-white" />
            <h1 className="font-display text-[clamp(26px,8.8cqi,52px)] leading-[1.16] font-extrabold">
              {locale === "zh" ? (
                <>
                  AI 时代的基建，
                  <br />
                  从每一个字节算起。
                  <span className="mt-[0.5em] block text-[max(14px,0.5em)] leading-[1.2] tracking-[-0.01em] text-blue-400 [font-stretch:125%]">AI infrastructure,<br />accounted for byte by byte.</span>
                </>
              ) : (
                <span className="block leading-[1.04] tracking-[-0.02em] [font-stretch:125%]">AI infrastructure,<br />accounted for<br />byte by byte.</span>
              )}
            </h1>
            <nav aria-label={t("常用资源", "Quick access")} className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm font-medium sm:gap-x-5">
              <Link href={href(locale, "downloads")} className="group inline-flex min-h-12 items-center gap-3 bg-white px-4 text-neutral-950 transition-colors hover:bg-blue-100">{t("下载标志", "Get the logos")}<Icon name="download" className="size-4 transition-transform group-hover:translate-y-0.5" /></Link>
              <span className="inline-flex items-center gap-4 sm:gap-5">
                <Link href={href(locale, "covers")} className="inline-flex min-h-11 items-center border-b border-white/35 text-white transition-colors hover:border-white">{t("选用模板", "Use a template")}</Link>
                <Link href={href(locale, "tokens")} className="inline-flex min-h-11 items-center border-b border-white/35 text-white transition-colors hover:border-white">{t("接入 Tokens", "Get tokens")}</Link>
              </span>
            </nav>
          </div>
        </div>
      </section>

      <Page>
        <Section
          id="core"
          tag="Brand core"
          title={t("品牌核心", "The brand in one line")}
        >
          <div className="grid items-start gap-x-14 gap-y-10 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="grid gap-7">
              <p className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.18] font-extrabold">
                {locale === "zh" ? (
                  <>
                    Rust 让每一块内存都有主人。
                    <br />
                    RustFS 让 AI 时代的基建，
                    <br />
                    <em className="text-brand not-italic">从每一个字节算起</em>。
                  </>
                ) : (
                  <span className="text-[1.15em] leading-[1.1] tracking-[-0.02em] [font-stretch:112%]">
                    Rust gives every value an owner. RustFS accounts for AI infrastructure <em className="text-brand not-italic">byte by byte</em>.
                  </span>
                )}
              </p>
              <p className="max-w-[56ch] text-lg leading-[1.7] text-subtle">
                {t("对象被切成数据块与校验块写入每块盘；坏盘可重建，位腐烂可发现，数据不离开你的机房。", "Objects are split into data and parity shards on every drive: failed drives are rebuilt, bitrot is caught and data never leaves your premises.")}
              </p>
            </div>
            <dl className="m-0 grid border border-border">
              {[
                [t("面向", "For"), t("需要自主掌控 S3 存储的平台与 AI 团队", "Platform and AI teams who need S3 storage they control")],
                [t("我们是", "Is"), t("Rust 原生、兼容 S3 的分布式对象存储", "Rust-native, S3-compatible distributed object storage")],
                [t("不同在", "Unlike"), t("内存安全 · Apache 2.0 · 无遥测 · 自愈", "Memory-safe · Apache 2.0 · no telemetry · self-healing")],
                [t("依据", "Proof"), t("1.0.0 正式版 · 2026-09-16", "1.0.0 GA · 2026-09-16")],
              ].map(([k, v], i) => (
                <div key={i} className="grid grid-cols-[88px_1fr] gap-4 border-b border-border px-4.5 py-3.5 last:border-0">
                  <dt className="font-mono text-[11px] leading-[1.9] font-medium tracking-[0.06em] text-muted-foreground uppercase">{k}</dt>
                  <dd className="m-0 text-[15px] leading-[1.65]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section
          id="personality"
          tag="Personality"
          title={t("品牌性格", "Personality")}
        >
          <div className="grid border-t border-l border-border sm:grid-cols-2 xl:grid-cols-4">
            {[
              { zh: "精确", en: "Exact", d: t("数字带单位和日期，结论可复现。", "Numbers carry units and dates; claims can be reproduced."), not: t("冷冰冰的参数表", "a cold spec sheet") },
              { zh: "坦诚", en: "Candid", d: t("限制写在明处，只比可验证的事实。", "Limits stated up front; only verifiable comparisons."), not: t("夸张、最高级、恐吓式营销", "hype, superlatives, fear marketing") },
              { zh: "工程化", en: "Engineered", d: t("画面像一张排版精良的系统图。", "Layouts read like a well-set system diagram."), not: t("堆术语、炫技", "jargon for its own sake") },
              { zh: "开放", en: "Open", d: t("平视、友好，欢迎贡献与迁移。", "Level and friendly; contributions welcome."), not: t("随意、玩梗、自嗨", "sloppy, meme-driven, self-congratulatory") },
            ].map((x) => (
              <div key={x.en} className="grid content-start gap-2.5 border-r border-b border-border p-5.5">
                <h3 className="font-display text-2xl leading-[1.1] font-[750] tracking-[-0.01em] [font-stretch:112%]">
                  {locale === "zh" ? x.zh : x.en}
                  <small className="mt-1.5 block font-mono text-[11px] leading-normal font-medium tracking-[0.06em] text-faint uppercase [font-stretch:100%]">{locale === "zh" ? x.en : x.zh}</small>
                </h3>
                <p className="text-sm leading-[1.65] text-subtle">{x.d}</p>
                <span className="font-mono text-xs leading-normal text-muted-foreground">
                  {t("不是 ", "Not ")}
                  <s className="decoration-parity decoration-[1.5px]">{x.not}</s>
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="principles"
          tag="Design principles"
          title={t("设计原则", "Design principles")}
          lede={<p>{t("规范未覆盖的情形，以这四条判断。", "Where the guidelines are silent, these decide.")}</p>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Principle
              title={t("结构可见", "Show the structure")}
              sub={t("Show the structure", "结构可见")}
              body={t("用网格、分片与标注组织画面，图形取自纠删码的真实结构。", "Grids, shards and labels organise every layout; graphics come from real erasure coding.")}
            >
              <ShardMatrix className="absolute inset-6 h-[calc(100%-48px)] w-[calc(100%-48px)]" cols={12} rows={5} k={4} m={2} seed={3} gap={0.25} />
            </Principle>
            <Principle
              title={t("精确胜过响亮", "Exact over loud")}
              sub={t("Exact over loud", "精确胜过响亮")}
              body={t("用带单位与日期的真实数字代替形容词。", "Real numbers with units and dates replace adjectives.")}
            >
              <div className="grid w-full max-w-90 gap-1.5">
                <span className="text-[13px] text-faint line-through decoration-parity">Blazing-fast, world-class</span>
                <span className="font-display text-[clamp(28px,14cqi,48px)] leading-none font-extrabold tracking-[-0.02em] num [font-stretch:125%]">15,154,618</span>
                <span className="flex justify-between border-t border-strong pt-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                  <span>Docker pulls</span>
                  <span>2026-10-14</span>
                </span>
              </div>
            </Principle>
            <Principle
              title={t("蓝色承载，橙色校验", "Blue carries, Oxide checks")}
              sub={t("Blue carries, Oxide checks", "蓝色承载，橙色校验")}
              body={t("Signal Blue 承载信息；Oxide 只标记校验与唯一焦点。", "Signal Blue carries the message; Oxide marks parity and one focal point.")}
            >
              <div className="grid w-full max-w-95 gap-2.5">
                <div className="grid h-11 grid-cols-10 gap-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <i key={i} className={i < 6 ? "border border-border bg-surface-2" : i < 9 ? "bg-brand" : "bg-parity"} />
                  ))}
                </div>
                <div className="flex justify-between font-mono text-[11px] text-muted-foreground">
                  <span>{t("中性 60%", "Neutral 60%")}</span>
                  <span>Signal 30%</span>
                  <span>Oxide 10%</span>
                </div>
              </div>
            </Principle>
            <Principle
              title={t("方正、平直、可预期", "Square, flat, predictable")}
              sub={t("Square, flat, predictable", "方正、平直、可预期")}
              body={t("直角、1px 线，无投影与光晕；动效步进，不回弹。", "Square corners and 1px rules, no shadows or glows; motion steps, never bounces.")}
            >
              <div className="flex flex-wrap items-end justify-center gap-3.5">
                <span className="inline-flex shrink-0 items-center gap-2 bg-brand px-4 py-3 text-[13px] font-medium whitespace-nowrap text-white">
                  {t("下载 RustFS", "Download RustFS")} <Icon name="arrow-right" className="size-4" />
                </span>
                <span className="w-38 shrink-0 border border-strong bg-background px-3.5 py-3 font-mono text-xs leading-snug text-muted-foreground">
                  {t("实例", "Instances")}
                  <b className="mt-1 block font-sans text-[22px] leading-tight font-semibold text-foreground num">2,700,000+</b>
                </span>
              </div>
            </Principle>
          </div>
        </Section>

        <Section
          id="standards"
          tag="Core standards"
          title={t("核心规范", "Core standards")}
        >
          <Table
            head={[t("项目", "Area"), t("规范", "Standard"), t("章节", "Chapter")]}
            rows={[
              [t("品牌色", "Brand colour"), t("Signal Blue #0062FF 是唯一的品牌蓝", "Signal Blue #0062FF is the only brand blue"), <a key="c1" href={href(locale, "color")} className="font-mono text-xs">color/</a>],
              [t("强调色", "Accent"), t("Oxide #FF5E14 只标记校验与唯一焦点，约 10%", "Oxide #FF5E14 marks parity and one focal point, ~10%"), <a key="c2" href={href(locale, "color")} className="font-mono text-xs">color/</a>],
              [t("标志", "Logo"), t("字标为主标志，流向 S 为独立符号，不得改动", "Wordmark first, Flow S as symbol; never altered"), <a key="c3" href={href(locale, "logo")} className="font-mono text-xs">logo/</a>],
              [t("字体", "Typography"), t("Archivo 加宽体 · Geist · Geist Mono · HarmonyOS Sans", "Archivo Expanded · Geist · Geist Mono · HarmonyOS Sans"), <a key="c4" href={href(locale, "type")} className="font-mono text-xs">type/</a>],
              [t("形状", "Shape"), t("一律直角，无投影与渐变光晕", "Square corners, no shadows or glows"), <a key="c5" href={href(locale, "graphics")} className="font-mono text-xs">graphics/</a>],
              [t("品牌图形", "Brand graphics"), t("仅分片矩阵与条带签名，不用 AI 插画与库存图", "Shard matrix and stripe only; no stock or AI art"), <a key="c6" href={href(locale, "graphics")} className="font-mono text-xs">graphics/</a>],
              [t("动效", "Motion"), t("写入与修复两个动作，不回弹", "Write and heal; never bounce"), <a key="c7" href={href(locale, "motion")} className="font-mono text-xs">motion/</a>],
              [t("文案", "Copy"), t("可验证的事实，不用最高级", "Verifiable facts, no superlatives"), <a key="c8" href={href(locale, "voice")} className="font-mono text-xs">voice/</a>],
            ]}
          />
        </Section>

        <Section
          id="facts"
          tag="Brand facts"
          title={t("品牌事实", "Brand facts")}
          lede={<p>{t("引用时须注明来源与统计日期。", "Cite the source and date whenever you use them.")}</p>}
        >
          <div className="grid gap-3.5">
            {[
              [["34,869", "GitHub stars"], ["2.7M+", t("全球实例", "Instances")], ["15.15M", "Docker pulls"], ["7,094", "Commits"]],
              [["1.0.0", "GA · 2026-09-16"], ["1.0.1", t("当前稳定版", "Current release")], ["2.0", "Apache License"], ["S3", t("兼容 API · 见兼容性矩阵", "Compatible API · see matrix")]],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-foreground md:grid-cols-4">
                {row.map(([v, l], j) => (
                  <div key={j} className="grid gap-2.5 border-b border-border py-5.5 pr-5 [&:nth-child(even)]:border-l [&:nth-child(even)]:pl-5 md:[&:nth-child(3)]:border-l md:[&:nth-child(3)]:pl-5">
                    <span className="font-display text-[clamp(28px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.02em] num [font-stretch:125%]">{v}</span>
                    <span className="font-mono text-[11px] leading-normal font-medium tracking-[0.06em] text-muted-foreground uppercase">{l}</span>
                  </div>
                ))}
              </div>
            ))}
            <p className="font-mono text-xs leading-relaxed text-faint">{t("数据来源：RustFS 官方网站。统计日期：2026-10-14。", "Source: the official RustFS website. As of 2026-10-14.")}</p>
          </div>
        </Section>

        <Section
          id="map"
          tag="Structure"
          title={t("指南结构", "Structure")}
        >
          <div className="grid gap-4">
            <h3 className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("指南 Guidelines", "Guidelines")}</h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <CardLink href={href(locale, "logo")} k="logo/" title={t("标志", "Logo")}>{t("字标、符号与组合", "Wordmark, symbol, lockups")}</CardLink>
              <CardLink href={href(locale, "color")} k="color/" title={t("色彩", "Color")}>{t("色阶、状态色与对比度", "Scales, status, contrast")}</CardLink>
              <CardLink href={href(locale, "type")} k="type/" title={t("字体", "Typography")}>{t("字体、字号与中英混排", "Faces, scale, mixed scripts")}</CardLink>
              <CardLink href={href(locale, "graphics")} k="graphics/" title={t("图形语言", "Graphics")}>{t("条带、矩阵与网格", "Stripe, matrix, grid")}</CardLink>
              <CardLink href={href(locale, "icons")} k="icons/" title={t("图标", "Icons")}>{t("24px 直角线性图标", "24px square-ended icons")}</CardLink>
              <CardLink href={href(locale, "dataviz")} k="dataviz/" title={t("数据可视化", "Data visualisation")}>{t("图表与指标卡", "Charts and metrics")}</CardLink>
              <CardLink href={href(locale, "web")} k="web/" title={t("网站与组件", "Web & UI")}>{t("组件与页面区块", "Components and sections")}</CardLink>
              <CardLink href={href(locale, "motion")} k="motion/" title={t("动效", "Motion")}>{t("缓动、时长与品牌动作", "Easing, timing, brand moves")}</CardLink>
              <CardLink href={href(locale, "voice")} k="voice/" title={t("语言与文案", "Voice")}>{t("语气、术语与用词", "Tone, terms, word list")}</CardLink>
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("模板 Templates", "Templates")}</h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <CardLink href={href(locale, "ads")} k="ads/" title={t("广告投放", "Advertising")}>{t("展示、信息流与户外", "Display, feed, outdoor")}</CardLink>
              <CardLink href={href(locale, "covers")} k="covers/" title={t("文章封面", "Article covers")}>{t("OG、公众号与社区", "OG, WeChat, communities")}</CardLink>
              <CardLink href={href(locale, "slides")} k="slides/" title={t("演示文稿", "Slides")}>{t("16:9 母版与版式", "16:9 master and layouts")}</CardLink>
              <CardLink href={href(locale, "video")} k="video/" title={t("视频首尾帧", "Video")}>{t("片头、片尾与缩略图", "Openers, end cards, thumbnails")}</CardLink>
              <CardLink href={href(locale, "social")} k="social/" title={t("社交媒体", "Social")}>{t("头像、横幅与帖子", "Avatars, banners, posts")}</CardLink>
              <CardLink href={href(locale, "print")} k="print/" title={t("印刷与活动", "Print & events")}>{t("物料、周边与展台", "Stationery, merch, booths")}</CardLink>
            </div>
          </div>
        </Section>

        <Section
          id="resources"
          tag="Resources"
          title={t("资源", "Resources")}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <CardLink href={href(locale, "tokens")} k="tokens/" title="Design Tokens" icon="layers">{t("JSON、CSS 与 Tailwind 主题", "JSON, CSS, Tailwind theme")}</CardLink>
            <CardLink href={href(locale, "agents")} k="agents/" title={t("DESIGN.md 与 Skill", "DESIGN.md & skill")} icon="terminal">{t("给 AI agent 的规范与技能", "Spec and skill for agents")}</CardLink>
            <CardLink href={href(locale, "downloads")} k="downloads/" title={t("资源下载", "Downloads")} icon="download">{t("标志与图标源文件", "Logo and icon files")}</CardLink>
          </div>
        </Section>

        <PageFooter slug="" />
      </Page>
    </>
  )
}

function Principle({ title, sub, body, children }: { title: React.ReactNode; sub: React.ReactNode; body: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="grid min-w-0 grid-rows-[200px_auto] border border-border">
      <div className="@container relative grid place-items-center overflow-hidden border-b border-border bg-surface p-6">{children}</div>
      <div className="grid gap-2 p-5.5">
        <h3 className="flex flex-wrap items-baseline gap-2.5 text-[21px] font-semibold tracking-[-0.01em]">
          {title} <small className="font-mono text-xs font-normal text-muted-foreground">{sub}</small>
        </h3>
        <p className="max-w-[52ch] text-[15px] leading-[1.7] text-subtle">{body}</p>
      </div>
    </article>
  )
}
