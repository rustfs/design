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
        <div className="container-page grid min-h-[min(680px,86vh)] grid-cols-1 gap-x-10 gap-y-7 pt-[clamp(28px,4vw,48px)] pb-[clamp(28px,3.5vw,40px)] md:grid-cols-2 md:grid-rows-[auto_1fr]">
          <div className="flex flex-wrap justify-between gap-4 font-mono text-xs leading-tight tracking-[0.06em] text-neutral-400 uppercase md:col-span-2">
            <span>
              <b className="font-medium text-white">RustFS Design System</b> · {t("官方设计指南", "Official design guidelines")} v1.0
            </span>
            <span>s3://rustfs-brand/ · 2026-10-14</span>
          </div>
          <LiveMatrix className="relative min-h-55 md:col-start-2 md:row-start-2 md:min-h-80 [&>svg]:absolute [&>svg]:inset-0" cols={16} rows={14} k={12} m={4} seed={11} mode="tone" fade="bl" gap={0.22} fit="right" missing={2} write heal />
          <div className="relative z-10 grid gap-7 self-end md:col-start-1 md:row-start-2">
            <WriteWordmark className="h-auto w-full max-w-[560px] text-white" />
            <h1 className="font-display text-[clamp(30px,4.2vw,56px)] leading-[1.16] font-extrabold">
              {locale === "zh" ? (
                <>
                  每一个字节，都有着落。
                  <span className="mt-[0.5em] block text-[0.5em] leading-[1.2] tracking-[-0.01em] text-blue-400 [font-stretch:125%]">Every byte, accounted for.</span>
                </>
              ) : (
                <span className="block tracking-[-0.02em] [font-stretch:125%]">Every byte, accounted for.</span>
              )}
            </h1>
          </div>
        </div>
      </section>

      <Page>
        <Section
          id="core"
          tag="Brand core"
          title={t("品牌核心", "The brand in one line")}
          lede={
            <p>
              {t(
                "RustFS 是以 Rust 构建的分布式对象存储，兼容 S3 协议，以 Apache 2.0 许可开源。品牌识别围绕一个承诺展开：数据的去向、冗余的份数与故障的可修复性，始终可见、可核算。",
                "RustFS is a distributed object store built in Rust, compatible with the S3 API and open source under Apache 2.0. The identity is built around one promise: where data lives, how much redundancy remains and whether a failure can be repaired are always visible and accountable.",
              )}
            </p>
          }
        >
          <div className="grid items-start gap-x-14 gap-y-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="grid gap-7">
              <p className="font-display text-[clamp(28px,3.5vw,48px)] leading-[1.18] font-extrabold">
                {locale === "zh" ? (
                  <>
                    Rust 让每一块内存都有主人。
                    <br />
                    RustFS 让<em className="text-brand not-italic">每一个字节，</em>
                    <br />
                    <em className="text-brand not-italic">都有着落</em>。
                  </>
                ) : (
                  <span className="text-[1.15em] leading-[1.1] tracking-[-0.02em] [font-stretch:112%]">
                    Rust gives every value an owner. RustFS gives <em className="text-brand not-italic">every byte an account</em>.
                  </span>
                )}
              </p>
              <div className="grid max-w-[68ch] gap-[0.9em] text-subtle [&_strong]:font-semibold [&_strong]:text-foreground">
                <p>
                  {t(
                    "Rust 的所有权模型保证每个值都有且只有一个主人。RustFS 把这种态度带到了磁盘上：每个对象切成数据块和校验块，分散写入纠删集里的每块盘；坏盘可以从校验块重建，位腐烂可以被发现，数据不会悄悄离开你的机房。",
                    "Rust's ownership model guarantees that every value has exactly one owner. RustFS carries that attitude onto disk: each object is split into data and parity shards spread across every drive in an erasure set; a failed drive is rebuilt from parity, bitrot is detected, and data never quietly leaves your premises.",
                  )}
                </p>
                <p>
                  {locale === "zh" ? (
                    <>
                      视觉系统把这种「可核算」画出来：<strong>看得见的结构</strong>（分片、条带、矩阵），<strong>精确的数字</strong>（带单位、带日期、可复现），<strong>克制的颜色</strong>（蓝色承载数据，橙色只标记校验与关键点）。
                    </>
                  ) : (
                    <>
                      The visual system draws that accountability: <strong>visible structure</strong> (shards, stripes, matrices), <strong>exact numbers</strong> (with units, dates and a way to reproduce them) and <strong>restrained colour</strong> (blue carries the data; orange marks parity and the one thing to notice).
                    </>
                  )}
                </p>
              </div>
            </div>
            <dl className="m-0 grid border border-border">
              {[
                [t("面向", "For"), t("需要完全自主掌控 S3 存储的平台、SRE 与 AI 基础设施团队", "Platform, SRE and AI infrastructure teams who need S3 storage they fully control")],
                [t("我们是", "Is"), t("Rust 原生、兼容 S3 的分布式对象存储，单机起步，按池扩展", "Rust-native, S3-compatible distributed object storage that starts on one machine and grows by pools")],
                [t("不同在", "Unlike"), t("内存安全；Apache 2.0 许可；无遥测，自托管；纠删码 + 位腐烂保护 + 自愈", "Memory-safe; Apache 2.0; no telemetry, self-hosted; erasure coding, bitrot protection and self-healing")],
                [t("依据", "Proof"), t("1.0.0 正式版于 2026-09-16 发布；S3 兼容范围以官方兼容性矩阵为准", "1.0.0 GA was released on 2026-09-16; S3 coverage is defined by the official compatibility matrix")],
                [t("口号", "Line"), "Every byte, accounted for. / 每一个字节，都有着落。"],
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
          title={t("品牌性格", "Four traits, each with a limit")}
          lede={<p>{t("文案、图像与动效均以以下四个特质为检验标准。每个特质同时标明其最易滑向的反面，应予避免。", "Copy, imagery and motion are measured against these four traits. Each also names the failure it most easily slides into, which must be avoided.")}</p>}
        >
          <div className="grid border-t border-l border-border sm:grid-cols-2 xl:grid-cols-4">
            {[
              { zh: "精确", en: "Exact", d: t("数字带单位和日期，结论能复现。宁可说「EC 4+2 可容忍 2 块盘故障」，也不说「极致可靠」。", "Numbers carry units and dates; claims can be reproduced. Say “EC 4+2 survives two failed drives”, not “ultimate reliability”."), not: t("冷冰冰的参数表", "a cold spec sheet") },
              { zh: "坦诚", en: "Candid", d: t("预览功能标 Preview，限制写在明处。和竞品比较只比可验证的事实。", "Preview features are labelled Preview and limits are stated up front. Comparisons stick to verifiable facts."), not: t("夸张、最高级、恐吓式营销", "hype, superlatives, fear marketing") },
              { zh: "工程化", en: "Engineered", d: t("画面像一张精心排版的系统图：网格、标注、坐标。复杂的东西讲清楚，不讲玄。", "Layouts read like a carefully set system diagram: grids, labels, coordinates. Complex things are explained, never mystified."), not: t("堆术语、炫技", "jargon for its own sake") },
              { zh: "开放", en: "Open", d: t("Apache 2.0、社区、可自托管。语气平视、友好，欢迎贡献，也欢迎迁移。", "Apache 2.0, community, self-hosted. The tone is level and friendly; contributions and migrations are both welcome."), not: t("随意、玩梗、自嗨", "sloppy, meme-driven, self-congratulatory") },
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
          title={t("设计原则", "Four principles for every channel")}
          lede={<p>{t("所有渠道的设计决策均由以下四条原则推导。规范未覆盖的情形，以此为判断依据。", "Every design decision, in every channel, derives from these four principles. Where the guidelines are silent, they decide.")}</p>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Principle
              title={t("结构可见", "Show the structure")}
              sub={t("Show the structure", "结构可见")}
              body={t("用网格、分片、条带、标注来组织画面，让人一眼看出东西是怎么搭起来的。品牌图形直接取自纠删码的真实结构，不画装饰性的抽象光效。", "Organise every layout with grids, shards, stripes and labels so people can see how things are built. Brand graphics come straight from the real structure of erasure coding, never from decorative light effects.")}
            >
              <ShardMatrix className="absolute inset-6 h-[calc(100%-48px)] w-[calc(100%-48px)]" cols={12} rows={5} k={4} m={2} seed={3} gap={0.25} />
            </Principle>
            <Principle
              title={t("精确胜过响亮", "Exact over loud")}
              sub={t("Exact over loud", "精确胜过响亮")}
              body={t("用真实数字代替形容词。数字配等宽标签、单位和统计日期；性能数据只放同环境实测，并注明测试条件。", "Replace adjectives with real numbers. Numbers get a mono label, a unit and a date; performance figures come only from like-for-like runs with the conditions stated.")}
            >
              <div className="grid w-full max-w-90 gap-1.5">
                <span className="text-[13px] text-faint line-through decoration-parity">Blazing-fast, world-class</span>
                <span className="font-display text-[clamp(34px,4vw,48px)] leading-none font-extrabold tracking-[-0.02em] num [font-stretch:125%]">15,154,618</span>
                <span className="flex justify-between border-t border-strong pt-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                  <span>Docker pulls</span>
                  <span>2026-10-14</span>
                </span>
              </div>
            </Principle>
            <Principle
              title={t("蓝色承载，橙色校验", "Blue carries, Oxide checks")}
              sub={t("Blue carries, Oxide checks", "蓝色承载，橙色校验")}
              body={t("Signal Blue 承担品牌识别和主要信息；Oxide 只出现在「校验块」和需要一眼看到的那一个点上。一屏内橙色元素最多一处主焦点。", "Signal Blue carries recognition and the main message. Oxide appears only on parity and on the single thing that must be seen first: one orange focal point per screen at most.")}
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
              body={t("直角、1px 线、无投影、无渐变光晕。动效按步进推进、不回弹。系统里的每个元素都像一块对齐的盘。", "Square corners, 1px rules, no drop shadows, no gradient glows. Motion advances in steps and never bounces. Every element sits like an aligned drive.")}
            >
              <div className="flex items-end gap-3.5">
                <span className="inline-flex items-center gap-2 bg-brand px-4 py-3 text-[13px] font-medium text-white">
                  {t("下载 RustFS", "Download RustFS")} <Icon name="arrow-right" className="size-4" />
                </span>
                <span className="w-38 border border-strong bg-background px-3.5 py-3 font-mono text-xs leading-snug text-muted-foreground">
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
          title={t("核心规范一览", "Core standards at a glance")}
          lede={<p>{t("以下规范适用于所有渠道与介质。各项细则见对应章节。", "These standards apply to every channel and medium. Each chapter gives the detail.")}</p>}
        >
          <Table
            head={[t("项目", "Area"), t("规范", "Standard"), t("章节", "Chapter")]}
            rows={[
              [t("品牌色", "Brand colour"), t("Signal Blue #0062FF 是唯一的品牌蓝，不得以其他蓝色替代。深色背景上的蓝色文字使用 Blue 400。", "Signal Blue #0062FF is the only brand blue; no other blue may stand in for it. Blue text on dark surfaces uses Blue 400."), <a key="c1" href={href(locale, "color")} className="font-mono text-xs">color/</a>],
              [t("强调色", "Accent"), t("Oxide #FF5E14 仅用于校验块与画面中唯一的焦点，面积约占 10%。", "Oxide #FF5E14 marks parity and the single focal point of a layout, at about 10% of the area."), <a key="c2" href={href(locale, "color")} className="font-mono text-xs">color/</a>],
              [t("标志", "Logo"), t("字标为主标志；独立符号使用「流向 S」。不得重绘、变形、描边或添加效果。", "The wordmark is the primary logo; the Flow S is the standalone symbol. Never redraw, distort, outline or add effects."), <a key="c3" href={href(locale, "logo")} className="font-mono text-xs">logo/</a>],
              [t("字体", "Typography"), t("展示用 Archivo（112–125% 宽度），正文与界面用 Geist，数据与代码用 Geist Mono，中文用思源黑体或 HarmonyOS Sans。", "Archivo at 112–125% width for display, Geist for text and interface, Geist Mono for data and code, Source Han Sans or HarmonyOS Sans for Chinese."), <a key="c4" href={href(locale, "type")} className="font-mono text-xs">type/</a>],
              [t("形状", "Shape"), t("界面、图形与图片一律直角，不使用投影与渐变光晕。平台强制的圆形头像裁切除外。", "Interfaces, graphics and images use square corners, with no drop shadows or gradient glows. Platform-imposed circular avatar crops are the only exception."), <a key="c5" href={href(locale, "graphics")} className="font-mono text-xs">graphics/</a>],
              [t("品牌图形", "Brand graphics"), t("仅使用分片矩阵与条带签名。不得使用与内容无关的插画、库存图片或 AI 生成图像。", "Use only the shard matrix and the stripe signature. No unrelated illustration, stock imagery or AI-generated images."), <a key="c6" href={href(locale, "graphics")} className="font-mono text-xs">graphics/</a>],
              [t("动效", "Motion"), t("使用标准缓动与时长；品牌动作为「写入」与「修复」，不使用回弹与弹性效果。", "Use the standard easings and durations. The brand moves are write and heal; never bounce or overshoot."), <a key="c7" href={href(locale, "motion")} className="font-mono text-xs">motion/</a>],
              [t("文案", "Copy"), t("陈述可验证的事实，数字注明单位、来源与统计日期，不使用最高级表述。", "State verifiable facts. Give numbers with units, a source and a date. No superlatives."), <a key="c8" href={href(locale, "voice")} className="font-mono text-xs">voice/</a>],
            ]}
          />
        </Section>

        <Section
          id="facts"
          tag="Brand facts"
          title={t("品牌事实", "Brand facts")}
          lede={<p>{t("对外引用以下数据时，须注明来源与统计日期，并在发布前按来源重新核对。", "Any public use of these figures must cite the source and the date, and be re-checked against the source before publication.")}</p>}
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
          title={t("指南结构", "How the guidelines are organised")}
          lede={<p>{t("本指南由规范、模板与资源三部分组成。所有模板均支持切换底色与语言、在线编辑文字并导出 PNG。", "The guidelines are organised as standards, templates and resources. Every template can switch surface and language, be edited in place and exported as PNG.")}</p>}
        >
          <div className="grid gap-4">
            <h3 className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("指南 Guidelines", "Guidelines")}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <CardLink href={href(locale, "logo")} k="logo/" title={t("标志", "Logo")}>{t("字标、流向 S 符号、锁定组合、安全空间、最小尺寸、错误用法、联合品牌。", "Wordmark, Flow S symbol, lockups, clear space, minimum sizes, misuse and co-branding.")}</CardLink>
              <CardLink href={href(locale, "color")} k="color/" title={t("色彩", "Color")}>{t("Signal、Oxide、中性三条主色阶，状态色，对比度矩阵，用色比例。", "Signal, Oxide and neutral scales, status colours, a contrast matrix and colour ratios.")}</CardLink>
              <CardLink href={href(locale, "type")} k="type/" title={t("字体", "Typography")}>{t("Archivo 加宽体、Geist、Geist Mono 与中文字体搭配，字号阶梯与中英混排。", "Archivo Expanded, Geist and Geist Mono with Chinese pairings, the type scale and mixed-script rules.")}</CardLink>
              <CardLink href={href(locale, "graphics")} k="graphics/" title={t("图形语言", "Graphics")}>{t("条带签名、分片矩阵、版式网格、图片与截图处理。", "Stripe signature, shard matrix, layout grids, imagery and screenshots.")}</CardLink>
              <CardLink href={href(locale, "icons")} k="icons/" title={t("图标", "Icons")}>{t("24px 网格、1.5 线宽、直角端点的存储领域图标集。", "A storage icon set on a 24px grid with 1.5px strokes and square ends.")}</CardLink>
              <CardLink href={href(locale, "dataviz")} k="dataviz/" title={t("数据可视化", "Data visualisation")}>{t("基准测试图、指标卡、架构图的统一画法。", "One way to draw benchmarks, metric tiles and architecture diagrams.")}</CardLink>
              <CardLink href={href(locale, "motion")} k="motion/" title={t("动效", "Motion")}>{t("缓动曲线、时长、写入与修复两个品牌动作，Logo 片头。", "Easing, durations, the write and heal moves and the logo sting.")}</CardLink>
              <CardLink href={href(locale, "voice")} k="voice/" title={t("语言与文案", "Voice")}>{t("语气、命名、中英混排、可说与不可说的词。", "Tone, naming, bilingual typesetting and the words we use and avoid.")}</CardLink>
            </div>
          </div>
          <div className="grid gap-4">
            <h3 className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("模板 Templates", "Templates")}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <CardLink href={href(locale, "ads")} k="ads/" title={t("广告投放", "Advertising")}>{t("IAB 标准尺寸、信息流、户外与海报。", "IAB sizes, social feeds, outdoor and posters.")}</CardLink>
              <CardLink href={href(locale, "covers")} k="covers/" title={t("文章封面", "Article covers")}>{t("OG、公众号、技术社区、Newsletter。", "OG, WeChat, developer communities, newsletters.")}</CardLink>
              <CardLink href={href(locale, "slides")} k="slides/" title={t("演示文稿", "Slides")}>{t("16:9 母版全套版式，可直接演示。", "A full 16:9 master you can present from.")}</CardLink>
              <CardLink href={href(locale, "web")} k="web/" title={t("网站与组件", "Web & UI")}>{t("首屏、功能区、对比、页脚与基础组件。", "Heroes, feature grids, comparisons, footers and core components.")}</CardLink>
              <CardLink href={href(locale, "video")} k="video/" title={t("视频首尾帧", "Video")}>{t("片头、章节卡、字幕条、片尾、缩略图。", "Openers, chapter cards, lower thirds, end cards, thumbnails.")}</CardLink>
              <CardLink href={href(locale, "social")} k="social/" title={t("社交媒体", "Social")}>{t("头像、横幅、帖子、轮播与竖版海报。", "Avatars, banners, posts, carousels and vertical posters.")}</CardLink>
              <CardLink href={href(locale, "print")} k="print/" title={t("印刷与活动", "Print & events")}>{t("名片、贴纸、T 恤、胸牌、展台、易拉宝。", "Cards, stickers, T-shirts, badges, booths, roll-ups.")}</CardLink>
            </div>
          </div>
        </Section>

        <Section
          id="resources"
          tag="Resources"
          title={t("资源与工具", "Resources and tools")}
          lede={<p>{t("设计令牌、标志源文件与面向 AI agent 的设计规范，均以本指南为准同步发布。", "Design tokens, logo source files and the design specification for AI agents are published alongside these guidelines and kept in sync with them.")}</p>}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <CardLink href={href(locale, "tokens")} k="tokens/" title="Design Tokens" icon="layers">{t("DTCG JSON、CSS 变量与 Tailwind v4 主题，由同一来源生成。", "DTCG JSON, CSS variables and a Tailwind v4 theme generated from one source.")}</CardLink>
            <CardLink href={href(locale, "agents")} k="agents/" title={t("DESIGN.md 与 Skill", "DESIGN.md & skill")} icon="terminal">{t("供 AI agent 读取的设计规范与可安装技能。", "The design specification for AI agents and an installable skill.")}</CardLink>
            <CardLink href={href(locale, "downloads")} k="downloads/" title={t("资源下载", "Downloads")} icon="download">{t("字标、符号与应用图标的 SVG 源文件。", "SVG source files for the wordmark, symbol and app icon.")}</CardLink>
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
      <div className="relative grid place-items-center overflow-hidden border-b border-border bg-surface p-6">{children}</div>
      <div className="grid gap-2 p-5.5">
        <h3 className="flex flex-wrap items-baseline gap-2.5 text-[21px] font-semibold tracking-[-0.01em]">
          {title} <small className="font-mono text-xs font-normal text-muted-foreground">{sub}</small>
        </h3>
        <p className="max-w-[52ch] text-[15px] leading-[1.7] text-subtle">{body}</p>
      </div>
    </article>
  )
}
