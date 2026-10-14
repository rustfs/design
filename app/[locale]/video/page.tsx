import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { BrandSymbol, Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { QR } from "@/components/brand/qr"
import { DoDont, Page, PageFooter, PageHeader, Prose, Section, Sub, Table } from "@/components/site/page"
import { getLocale, isLocale, setLocale, t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { SafeAreas } from "./_safe"
import { StingPlayer } from "./_sting"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "视频首尾帧" : "Video" }
}

/* 16:9 content frame: 10u left and right, 7u top and bottom (108 × 76 px at 1080p), inside the 90% title-safe area. */
const FRAME = "absolute inset-x-[calc(var(--u)*10)] inset-y-(--m) flex flex-col justify-between u-gap-3"
/* Labels on video are never smaller than 2.5u (27 px at 1080p). */
const LABEL = "ab-label u-text-2.5"
const TAG = "absolute bg-neutral-950/85 px-[calc(var(--u)*0.9)] py-[calc(var(--u)*0.6)] font-mono u-text-1.75 leading-none tracking-[0.06em] text-oxide-500 uppercase"

/** Action-safe (93%) and title-safe (90%) guides. Never exported; shown by the grid switch unless `always`. */
function SafeGuides({ always = false }: { always?: boolean }) {
  return (
    <div aria-hidden="true" className={cn("no-export pointer-events-none absolute inset-0 z-40", !always && "hidden group-data-[safe=on]/safe:block")}>
      <div className="absolute inset-[3.5%] border-dashed border-neutral-400 [border-width:calc(var(--u)*0.2)]" />
      <div className="absolute inset-[5%] border-dashed border-oxide-500 [border-width:calc(var(--u)*0.2)]" />
      {!always && (
        <>
          <span className={cn(TAG, "top-[3.5%] right-[3.5%] -translate-y-full text-neutral-300")}>Action 93%</span>
          <span className={cn(TAG, "right-[5%] bottom-[5%] translate-y-full")}>Title 90%</span>
        </>
      )}
    </div>
  )
}

/** A zone the platform covers with its own interface. Never exported. */
function Zone({ className, children, toggle = false }: { className: string; children: ReactNode; toggle?: boolean }) {
  return (
    <div aria-hidden="true" className={cn("no-export pointer-events-none absolute z-40 grid place-items-center border-dashed border-oxide-500 bg-oxide-500/10 [border-width:calc(var(--u)*0.2)]", toggle && "hidden group-data-[safe=on]/safe:grid", className)}>
      <span className="bg-neutral-950/85 px-[0.7em] py-[0.45em] text-center font-mono u-text-2 leading-tight tracking-[0.06em] text-oxide-500 uppercase">{children}</span>
    </div>
  )
}

/** Placeholder for an element the platform renders (end-screen slots, camera, slides). Never exported. */
function Slot({ className, children, round = false }: { className?: string; children: ReactNode; round?: boolean }) {
  return (
    <div className={cn("no-export grid place-items-center border-dashed border-ab-muted text-ab-muted [border-width:calc(var(--u)*0.2)]", round && "rounded-full", className)}>
      <span className="grid justify-items-center u-gap-1.5 text-center font-mono u-text-2.25 leading-tight tracking-[0.06em] uppercase">{children}</span>
    </div>
  )
}

const CHAPTERS: [string, string][] = [
  ["准备目录", "Prepare directories"],
  ["启动容器", "Run the container"],
  ["登录控制台", "Sign in to the Console"],
  ["创建存储桶", "Create a bucket"],
  ["创建访问密钥", "Create access keys"],
  ["连接 S3 客户端", "Connect an S3 client"],
]

/* ---------- thumbnails, shared by the templates and the 168 × 94 check ---------- */
function ThumbRelease() {
  return (
    <>
      <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[30%]" cols={4} rows={8} k={4} m={2} seed={21} mode="tone" fit="slice" gap={0.22} />
      <div className="ab-frame right-[calc(30%+var(--m))]">
        <Wordmark className="ab-logo u-h-7" />
        <div className="ab-display u-text-36 leading-[0.78] tracking-[-0.04em]">1.0.1</div>
        <span className="ab-head u-text-9 leading-none text-ab-brand">
          <L zh="版本发布" en="Release" />
        </span>
      </div>
    </>
  )
}

function ThumbTutorial() {
  return (
    <>
      <div className="absolute top-1/2 right-(--m) grid u-size-40 -translate-y-1/2 place-items-center bg-ab-data text-ab-on-data">
        <Icon name="terminal" strokeWidth={1.25} className="u-size-24" />
      </div>
      <div className="ab-frame right-[calc(var(--u)*40+var(--m)*2)]">
        <span className="ab-label u-text-4">
          <L zh="教程" en="Tutorial" />
        </span>
        <h3 className="ab-head u-text-14 leading-[0.98]">
          <L zh="用 Docker 部署" en="Run it on Docker" />
        </h3>
        <Wordmark className="ab-logo u-h-6" />
      </div>
    </>
  )
}

function ThumbTalk() {
  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 w-[36%] bg-ab-data">
        <div className="no-export absolute inset-(--m) grid place-items-center border-dashed border-ab-on-data/60 text-ab-on-data [border-width:calc(var(--u)*0.3)]">
          <span className="grid justify-items-center u-gap-2 font-mono u-text-3 tracking-[0.08em] uppercase">
            <Icon name="user" strokeWidth={1} className="u-size-10" />
            <L zh="讲者照片" en="Speaker photo" />
          </span>
        </div>
      </div>
      <div className="ab-frame right-[calc(36%+var(--m))]">
        <Wordmark className="ab-logo u-h-6" />
        <h3 className="ab-head u-text-15 leading-[0.98]">
          <L zh="纠删码原理" en="Erasure coding, explained" />
        </h3>
        <span className="ab-label u-text-4">
          <L zh="演讲" en="Talk" /> · <b><L zh="活动名称" en="Event name" /></b>
        </span>
      </div>
    </>
  )
}

function ThumbBili() {
  return (
    <>
      <div className="absolute top-(--m) right-(--m) bottom-[16%] grid u-w-36 content-center u-gap-2">
        <div className="grid u-h-20 content-between border-dashed border-ab-line u-p-3 font-mono u-text-4.5 text-ab-muted [border-width:calc(var(--u)*0.4)]">
          <em className="text-[0.6em] tracking-[0.08em] not-italic">FROM</em>
          <b className="font-medium">MinIO</b>
        </div>
        <div className="grid u-h-20 content-between bg-ab-data u-p-3 font-mono u-text-4.5 text-ab-on-data">
          <em className="text-[0.6em] tracking-[0.08em] not-italic opacity-80">TO</em>
          <b className="font-medium">RustFS</b>
        </div>
      </div>
      <div className="absolute top-(--m) right-[calc(var(--u)*36+var(--m)*2)] bottom-[16%] left-(--m) flex flex-col justify-between">
        <div className="flex items-center u-gap-4">
          <Wordmark className="ab-logo u-h-6" />
          <span className="ab-label u-text-4">迁移指南</span>
        </div>
        <h3 className="ab-zh u-text-13 leading-[1.12]">
          从 MinIO
          <br />
          迁移到 RustFS
        </h3>
      </div>
    </>
  )
}

/** A template rendered at the size a viewer actually sees it. */
function Actual({ w, h, theme, children, label }: { w: number; h: number; theme: string; children: ReactNode; label: ReactNode }) {
  const W = 168
  const s = W / w
  return (
    <figure className="m-0 grid content-start gap-2">
      <div className="relative overflow-hidden outline outline-1 -outline-offset-1 outline-border [&_.no-export]:hidden" style={{ width: W, height: Math.round(h * s) }}>
        <div className={`ab t-${theme}`} data-lang={getLocale()} style={{ "--w": `${w}px`, "--h": `${h}px`, "--s": s } as CSSProperties}>
          {children}
        </div>
      </div>
      <figcaption className="font-mono text-[11px] leading-snug text-muted-foreground">{label}</figcaption>
    </figure>
  )
}

const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M2 12h34M28 5l8 7-8 7" />
  </svg>
)

export default async function VideoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/video/"
        label="Templates · Video"
        title={t("视频首尾帧", "Video")}
        subtitle={t("Video", "视频首尾帧")}
        lede={t("片头片尾、画面图形与缩略图：文字在标题安全区内，动效只用写入与修复。", "Stings, frames and thumbnails: text stays title-safe, and motion uses only write and heal.")}
        meta={[
          { k: t("模板", "Templates"), v: "14" },
          { k: t("画幅", "Formats"), v: "16:9 / 9:16 / 1:1" },
          { k: t("帧率", "Frame rates"), v: "25 / 30 / 60 fps" },
          { k: t("色彩", "Colour"), v: "Rec.709" },
        ]}
      />

      {/* ---------- Logo sting ---------- */}
      <Section
        id="sting"
        tag="Logo sting"
        title={t("片头", "The logo sting")}
        lede={<p>{t("3.2 秒，无声：先写入，再修复，然后字标升起。", "3.2 seconds, silent: write, then heal, then the wordmark rises.")}</p>}
      >
        <StingPlayer />

        <Sub title={t("片头时间表", "Intro timing")} aside="3.2 s · 1920 × 1080">
          <Table
            className="[&_table]:min-w-[720px] [&_td:first-child]:whitespace-nowrap"
            mono={[0, 3]}
            head={[t("时间", "Time"), t("元素", "Element"), t("动作", "Action"), t("缓动", "Easing")]}
            rows={[
              ["0.00–0.12 s", t("画面", "Frame"), t("Ink 底，3 帧黑场（25 fps）", "Ink field, 3 lead-in frames (25 fps)"), "—"],
              ["0.12–0.58 s", t("条带 D1–D4 · P1–P2", "Stripe D1–D4 · P1–P2"), t("逐块写入，间隔 80 ms；每块 60 ms 内 0 → 50% → 100%", "Write in 80 ms apart; each 0 → 50% → 100% in 60 ms"), "steps(2)"],
              ["0.60 s", "D2", t("掉线：实心变虚线框", "Drops out: solid to dashed"), t("硬切", "Cut")],
              ["0.84–0.96 s", t("D2 位置", "D2 slot"), t("Oxide 闪现 25% → 100%", "Oxide flash 25% → 100%"), "steps(2)"],
              ["0.96–1.20 s", "D2", t("Oxide 回到 Signal Blue，重建完成", "Oxide back to Signal Blue; rebuilt"), "ease-standard · 240 ms"],
              ["1.20–2.02 s", t("字标 R · U · S · T · F · S", "Wordmark R · U · S · T · F · S"), t("逐字自基线升起，按外框裁切；间隔 80 ms", "Letters rise from the baseline, clipped to the box; 80 ms apart"), "ease-emphasized · 420 ms"],
              ["2.00–2.42 s", t("品牌口号", "Brand line"), t("透明度 0 → 100%，上移 1.5u", "Opacity 0 → 100%, up 1.5u"), "ease-standard · 420 ms"],
              ["2.42–3.20 s", t("全部", "All"), t("静帧", "Hold"), "—"],
            ]}
          />
        </Sub>

        <Sub title={t("片尾 5 秒版", "Five-second outro")} aside="5.0 s · 1920 × 1080">
          <Prose>
            <p>{t("用于没有平台结束画面的渠道（Bilibili、抖音、活动录像）；YouTube 改用结束画面。", "For channels without an end screen (Bilibili, Douyin, event recordings); YouTube uses the end card.")}</p>
          </Prose>
          <Table
            className="[&_table]:min-w-[720px] [&_td:first-child]:whitespace-nowrap"
            mono={[0, 3]}
            head={[t("时间", "Time"), t("元素", "Element"), t("动作", "Action"), t("缓动", "Easing")]}
            rows={[
              ["0.00–0.12 s", t("画面", "Frame"), t("Ink 底，3 帧黑场", "Ink field, 3 lead-in frames"), "—"],
              ["0.12–0.58 s", t("条带", "Stripe"), t("同片头写入", "As the intro"), "steps(2)"],
              ["0.60–1.42 s", t("字标", "Wordmark"), t("同片头逐字升起", "As the intro"), "ease-emphasized · 420 ms"],
              ["1.40–1.82 s", t("品牌口号", "Brand line"), t("淡入，上移 1.5u", "Fades up 1.5u"), "ease-standard · 420 ms"],
              ["1.60–2.02 s", "rustfs.com", t("淡入，上移 1.5u，晚口号 200 ms", "Fades up 1.5u, 200 ms after the line"), "ease-standard · 420 ms"],
              ["2.02–4.28 s", t("全部", "All"), t("静帧", "Hold"), "—"],
              ["4.28–5.00 s", t("全部", "All"), t("淡出至 Ink", "Fade to Ink"), "ease-exit · 720 ms"],
            ]}
          />
        </Sub>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            [t("位置", "Placement"), t("横屏视频的第一个画面，之前无任何画面与声音；结束后直切正片。竖屏短视频不用片头。", "The first thing in a landscape video, with nothing before it; hard cut to the programme. Vertical shorts have no sting.")],
            [t("帧率", "Frame rate"), t("使用与项目帧率一致的版本；不得变速、补帧或倒放。", "Use the version for the project frame rate; never retime, interpolate or reverse it.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid content-start gap-1.5 border-t border-border pt-3 text-sm leading-relaxed text-subtle">
              <b className="font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">{k}</b>
              {v}
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Frames ---------- */}
      <Section
        id="frames"
        tag="Frames"
        title={t("画面模板", "Frame templates")}
        lede={<p>{t("文字须在 90% 标题安全区内，图形须在 93% 动作安全区内。", "Text stays inside 90% title safe; graphics inside 93% action safe.")}</p>}
      >
        <SafeAreas>
          <TemplateGrid
            filters={[
              { id: "all", label: t("全部 14", "All 14") },
              { id: "landscape", label: t("16:9 画面 7", "16:9 frames 7") },
              { id: "thumb", label: t("缩略图 4", "Thumbnails 4") },
              { id: "other", label: t("竖屏与方形 2", "Vertical and square 2") },
            ]}
          >
            <Template title={t("画面结构", "Frame anatomy")} spec={t("1920 × 1080 · u = 10.8 px · 参考线不导出", "1920 × 1080 · u = 10.8 px · guides are not exported")} w={1920} h={1080} file="video-anatomy">
              <div className="absolute inset-x-[calc(var(--u)*10)] inset-y-(--m) border-ab-brand [border-width:calc(var(--u)*0.15)]" />
              <SafeGuides always />
              <div className={FRAME}>
                <div className="ab-row">
                  <Wordmark className="ab-logo" />
                  <span className={LABEL}>
                    <L zh="系列 · 期号" en="Series · episode" />
                  </span>
                </div>
                <div className="u-mb-38 grid u-gap-3">
                  <span className={LABEL}>
                    <L zh="标题 · 左对齐" en="Title · left aligned" />
                  </span>
                  <h3 className="ab-head u-text-8 max-w-[13em]">
                    <L zh="标题居左，最多两行" en="Titles sit left, two lines at most" />
                  </h3>
                </div>
              </div>
              <div className="absolute top-[66%] bottom-[22%] left-[calc(var(--u)*10)] grid w-[42%] place-items-center border border-ab-data bg-ab-data/20">
                <span className="font-mono u-text-2.25 tracking-[0.06em] text-ab-fg uppercase">
                  <L zh="④ 人名条 · 下沿距底 22%" en="④ Lower third · 22% from bottom" />
                </span>
              </div>
              <div className="absolute inset-x-[24%] top-[79%] bottom-(--m) grid place-items-center border border-ab-line bg-ab-panel">
                <span className="font-mono u-text-2.25 tracking-[0.06em] text-ab-fg uppercase">
                  <L zh="⑤ 字幕区 · 下沿距底 7u" en="⑤ Captions · 7u from bottom" />
                </span>
              </div>
              <ul className="absolute top-[30%] right-[calc(var(--u)*10)] m-0 grid list-none u-gap-2.5 p-0 font-mono u-text-2.25 leading-tight tracking-[0.04em] text-ab-fg-2">
                {[
                  ["border-neutral-400 border-dashed", <L key="1" zh="① 动作安全区 93% · 1786 × 1004" en="① Action safe 93% · 1786 × 1004" />],
                  ["border-oxide-500 border-dashed", <L key="2" zh="② 标题安全区 90% · 1728 × 972" en="② Title safe 90% · 1728 × 972" />],
                  ["border-ab-brand border-solid", <L key="3" zh="③ 内容边距 10u × 7u · 108 × 76 px" en="③ Content frame 10u × 7u · 108 × 76 px" />],
                ].map(([cls, label], i) => (
                  <li key={i} className="flex items-center u-gap-2">
                    <i className={cn("block h-0 u-w-6 [border-top-width:calc(var(--u)*0.25)]", cls as string)} />
                    {label}
                  </li>
                ))}
              </ul>
            </Template>

            <Template
              span={6}
              title={t("标题卡", "Title card")}
              spec="1920 × 1080 · 16:9"
              w={1920}
              h={1080}
              themes={["ink", "paper", "signal"]}
              file="video-title-card"
              tags={["landscape"]}
              note={t("接在片头之后，停留 3–5 s；集数须与系列实际顺序一致。", "After the sting, held 3–5 s; the episode number matches the real order.")}
            >
              <SafeGuides />
              <div className="ab-display absolute right-[calc(var(--u)*10)] bottom-[calc(var(--m)-var(--u)*0.5)] u-text-40 leading-[0.74] tracking-[-0.05em] text-ab-brand">03</div>
              <div className={FRAME}>
                <div className="ab-row">
                  <Wordmark className="ab-logo" />
                  <span className={LABEL}>
                    <L zh={<>上手系列 · <b>第 03 集</b></>} en={<>Getting started · <b>EP 03</b></>} />
                  </span>
                </div>
                <div className="max-w-[60%]">
                  <h3 className="ab-head u-text-8.5">
                    <L zh="用 Docker 部署单节点 RustFS" en="Deploy single-node RustFS with Docker" />
                  </h3>
                  <p className="ab-body u-mt-4 u-text-3.25">
                    <L zh="从准备数据目录到连接 S3 客户端，共 6 章。" en="Six chapters, from preparing data directories to connecting an S3 client." />
                  </p>
                </div>
                <div className="grid u-gap-1">
                  <span className={LABEL}>
                    <L zh="讲者" en="Speaker" />
                  </span>
                  <span className="u-text-3.25 leading-tight font-semibold">
                    <L zh="演讲者姓名 · 职位" en="Speaker name · Title" />
                  </span>
                </div>
              </div>
            </Template>

            <Template
              span={6}
              title={t("章节卡", "Chapter card")}
              spec="1920 × 1080 · 16:9"
              w={1920}
              h={1080}
              themes={["ink", "paper", "signal"]}
              file="video-chapter"
              tags={["landscape"]}
              note={t("停留 2–3 s；章节号与总数须真实。", "Held 2–3 s; chapter numbers and the total must be real.")}
            >
              <SafeGuides />
              <div className={FRAME}>
                <div className="ab-row">
                  <Wordmark className="ab-logo" />
                  <span className={LABEL}>
                    <L zh="章节" en="Chapter" /> · <b>03 / 06</b>
                  </span>
                </div>
                <div className="grid u-gap-4">
                  <span className="ab-display u-text-24 leading-[0.76] tracking-[-0.04em] text-ab-brand">03</span>
                  <h3 className="ab-head u-text-8.5">
                    <L zh="登录控制台" en="Sign in to the Console" />
                  </h3>
                  <span className="ab-url u-text-3">http://localhost:9001</span>
                </div>
                <ol className="m-0 grid list-none grid-cols-6 u-gap-1.25 p-0">
                  {CHAPTERS.map(([zh, en], i) => (
                    <li key={i} className="grid content-start u-gap-1.75">
                      <i className={cn("block u-h-1.5", i < 2 ? "bg-ab-data" : i === 2 ? "bg-ab-parity" : "bg-ab-line")} />
                      <span className={cn("font-mono u-text-2.5 leading-none", i === 2 ? "text-ab-fg" : "text-ab-muted")}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("u-text-2.5 leading-[1.25]", i === 2 ? "font-semibold text-ab-fg" : "text-ab-muted")}>
                        <L zh={zh} en={en} />
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Template>

            <Template
              span={6}
              title={t("人名条", "Lower third")}
              spec={t("1920 × 1080 · 透明背景", "1920 × 1080 · transparent background")}
              w={1920}
              h={1080}
              themes={["ink", "paper"]}
              file="video-lower-third"
              tags={["landscape"]}
              className="!bg-transparent"
              note={t("讲者首次出现时显示 4–6 s，不与字幕区重叠。", "Shown 4–6 s when a speaker first appears, clear of the captions.")}
            >
              <div aria-hidden="true" className="no-export absolute inset-0 -z-10" style={{ backgroundColor: "#13171E", backgroundImage: "repeating-conic-gradient(#1E232B 0 25%, transparent 0 50%)", backgroundSize: "calc(var(--u) * 6) calc(var(--u) * 6)" }} />
              <SafeGuides />
              <div className="absolute bottom-[22%] left-[calc(var(--u)*10)] flex items-stretch u-gap-0.5">
                <span className="grid grid-rows-6 u-w-2 u-gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <i key={i} className={i < 4 ? "bg-ab-data" : "bg-ab-parity"} />
                  ))}
                </span>
                <div className="grid u-h-14.5 u-min-w-56 content-center u-gap-1.25 bg-ab-bg u-pr-6 u-pl-3.5">
                  <b className="u-text-4.5 leading-[1.1] font-semibold text-ab-fg">
                    <L zh="演讲者姓名" en="Speaker Name" />
                  </b>
                  <span className="u-text-3 leading-[1.25] text-ab-fg-2">
                    <L zh="职位 · 所属机构" en="Title · Affiliation" />
                  </span>
                </div>
              </div>
            </Template>

            <Template
              span={6}
              title={t("字幕样式", "Caption style")}
              spec={t("1920 × 1080 · 字幕规格示例", "1920 × 1080 · caption specimen")}
              w={1920}
              h={1080}
              file="video-captions"
              tags={["landscape"]}
              themes={["paper", "white", "ink"]}
            >
              <SafeGuides />
              <div className="absolute inset-x-[calc(var(--u)*10)] top-(--m) bottom-[28%] flex flex-col justify-between">
                <div className="ab-row">
                  <span className={LABEL}>
                    <L zh="示例画面 · 演讲幻灯片" en="Sample frame · talk slide" />
                  </span>
                  <span className={LABEL}>EC 4+2</span>
                </div>
                <div className="grid u-gap-5">
                  <h3 className="ab-head u-text-6">
                    <L zh="一个对象，六个分片" en="One object, six shards" />
                  </h3>
                  <div className="grid grid-cols-6 u-gap-2">
                    {["D1", "D2", "D3", "D4", "P1", "P2"].map((s, i) => (
                      <div key={s} className="grid u-gap-1.25">
                        <i className={cn("grid u-h-20 place-items-end-start u-p-1.5 font-mono u-text-3 leading-none not-italic", i < 4 ? "bg-ab-data text-ab-on-data" : "bg-ab-parity text-white")}>{s}</i>
                        <span className="font-mono u-text-2.5 leading-none tracking-[0.06em] text-ab-muted">DRIVE 0{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-(--m) grid justify-items-center text-center">
                <span className="bg-neutral-950/80 px-[0.5em] py-[0.1em] u-text-4.5 leading-[1.45] font-medium text-white">每个对象被切成数据块和校验块</span>
                <span className="bg-neutral-950/80 px-[0.5em] py-[0.12em] u-text-3.5 leading-[1.45] text-white">Each object becomes data and parity shards</span>
              </div>
              <div aria-hidden="true" className="no-export">
                <span className={cn(TAG, "right-[calc(var(--u)*10)] bottom-[calc(var(--m)+var(--u)*7.5)]")}>
                  <L zh="中文 48 px · ≤ 16 字" en="ZH 48 px · ≤ 16 chars" />
                </span>
                <span className={cn(TAG, "right-[calc(var(--u)*10)] bottom-[calc(var(--m)+var(--u)*1.75)]")}>
                  <L zh="英文 38 px · ≤ 42 字符" en="EN 38 px · ≤ 42 chars" />
                </span>
                <span className={cn(TAG, "bottom-[calc(var(--m)+var(--u)*4.5)] left-[calc(var(--u)*10)]")}>
                  <L zh="底框 Ink 80% · 最多 2 行" en="Ink 80% box · 2 lines max" />
                </span>
                <span className="absolute bottom-0 left-1/2 h-(--m) border-l-[calc(var(--u)*0.2)] border-oxide-500" />
                <span className={cn(TAG, "bottom-[calc(var(--u)*1.5)] left-[calc(50%+var(--u)*1.25)]")}>
                  <L zh="下沿距底 7u · 76 px" en="7u · 76 px to the edge" />
                </span>
              </div>
            </Template>

            <Template
              span={6}
              title={t("终端录屏画面", "Terminal recording")}
              spec="1920 × 1080 · 16:9"
              w={1920}
              h={1080}
              themes={["ink", "paper"]}
              file="video-terminal"
              tags={["landscape"]}
              note={t("只录官方文档中的命令，不得剪辑或伪造输出。", "Official commands only; never edit or fake program output.")}
            >
              <SafeGuides />
              <div className="absolute inset-x-[calc(var(--u)*10)] top-(--m) flex items-center justify-between u-gap-4">
                <Wordmark className="ab-logo" />
                <span className={LABEL}>
                  <L zh={<>第 02 章 · <b>启动容器</b></>} en={<>Chapter 02 · <b>Run the container</b></>} />
                </span>
              </div>
              <div className="ab-term absolute inset-x-[calc(var(--u)*10)] top-[calc(var(--m)+var(--u)*8)] bottom-[18%] flex flex-col">
                <div className="flex items-center u-gap-1.25 border-b border-ab-line u-px-3 u-py-2 u-text-2.5 tracking-[0.04em] text-ab-muted">
                  <i className="block u-size-1.5 bg-current opacity-45" />
                  <i className="block u-size-1.5 bg-current opacity-45" />
                  <i className="block u-size-1.5 bg-current opacity-45" />
                  <span className="u-ml-1.5">~/rustfs</span>
                </div>
                <pre className="m-0 u-px-4 u-py-3 font-mono u-text-3 leading-[1.5] whitespace-pre">
                  <span className="dim">
                    <L zh="# 数据目录须对 UID 10001 可写" en="# data directories must be writable by UID 10001" />
                  </span>
                  {"\n"}
                  <span className="pr">$</span> mkdir -p data logs
                  {"\n"}
                  <span className="pr">$</span> chown -R 10001:10001 data logs
                  {"\n\n"}
                  <span className="pr">$</span> docker run -d -p 9000:9000 -p 9001:9001 \{"\n"}
                  {"    "}-v $(pwd)/data:/data \{"\n"}
                  {"    "}-v $(pwd)/logs:/logs \{"\n"}
                  {"    "}rustfs/rustfs:latest
                  {"\n\n"}
                  <span className="dim"># S3 API   </span>
                  <span className="ok">http://localhost:9000</span>
                  {"\n"}
                  <span className="dim"># Console  </span>
                  <span className="ok">http://localhost:9001</span>
                </pre>
              </div>
              <Slot className="absolute inset-x-[calc(var(--u)*10)] top-[calc(82%+var(--u)*1.5)] bottom-(--m)">
                <L zh="字幕区 · 保持空白" en="Caption zone · keep clear" />
              </Slot>
            </Template>

            <Template
              span={6}
              title={t("结束画面", "End card")}
              spec={t("1920 × 1080 · YouTube 结束画面", "1920 × 1080 · YouTube end screen")}
              w={1920}
              h={1080}
              themes={["ink", "paper", "signal"]}
              file="video-end-card"
              tags={["landscape"]}
              note={t("视频最后 5–20 s；在 YouTube 工作室中按虚线框对齐元素。", "The last 5–20 s; align YouTube Studio elements to the dashed boxes.")}
            >
              <SafeGuides />
              <div className={FRAME}>
                <div className="ab-row">
                  <Wordmark className="ab-logo" />
                  <span className={LABEL}>
                    <L zh="继续观看" en="Watch next" />
                  </span>
                </div>
                <div className="grid grid-cols-2 u-gap-5">
                  <Slot className="aspect-video">
                    <Icon name="play" strokeWidth={1} className="u-size-6" />
                    <L zh="视频元素 1" en="Video element 1" />
                  </Slot>
                  <Slot className="aspect-video">
                    <Icon name="play" strokeWidth={1} className="u-size-6" />
                    <L zh="视频元素 2" en="Video element 2" />
                  </Slot>
                </div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center u-gap-6">
                  <Slot round className="u-size-17">
                    <L zh="订阅" en="Subscribe" />
                  </Slot>
                  <div className="grid u-gap-2">
                    <p className="ab-head u-text-4.5">
                      <L zh="AI 时代的基建，从每一个字节算起。" en="AI infrastructure, accounted for byte by byte." />
                    </p>
                    <p className="flex flex-wrap u-gap-x-4 u-gap-y-1 ab-url u-text-2.75">
                      <span>rustfs.com</span>
                      <span>docs.rustfs.com</span>
                      <span>github.com/rustfs/rustfs</span>
                    </p>
                  </div>
                  <div className="grid justify-items-center u-gap-1.25">
                    <QR value="https://rustfs.com" quiet={2} className="u-size-15 bg-white text-neutral-950" />
                    <span className="font-mono u-text-2 tracking-[0.06em] text-ab-muted">rustfs.com</span>
                  </div>
                </div>
              </div>
            </Template>

            <Template
              title={t("直播叠加层", "Livestream overlay")}
              spec={t("1920 × 1080 · OBS 底层背景", "1920 × 1080 · OBS background layer")}
              w={1920}
              h={1080}
              themes={["ink", "paper"]}
              file="video-live-overlay"
              tags={["landscape"]}
              note={t("作 OBS 最底层；回放须去掉「直播」标签。", "Bottom layer in OBS; remove the Live label from the replay.")}
            >
              <SafeGuides />
              <div className={FRAME}>
                <div className="ab-row">
                  <div className="flex min-w-0 items-center u-gap-4">
                    <span className="inline-flex items-center u-gap-1.5 bg-ab-accent u-px-2 u-py-1.25 font-mono u-text-2.5 leading-none font-semibold tracking-[0.1em] text-ab-bg uppercase">
                      <i className="block u-size-1.25 bg-current" />
                      <L zh="直播" en="Live" />
                    </span>
                    <h3 className="ab-head u-text-4.25 truncate">
                      <L zh="RustFS 1.0 架构解读" en="Inside RustFS 1.0" />
                    </h3>
                  </div>
                  <Wordmark className="ab-logo u-h-3.5 self-center" />
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_calc(var(--u)*34)] items-stretch u-gap-3">
                  <Slot className="aspect-video">
                    <Icon name="monitor" strokeWidth={1} className="u-size-7" />
                    <L zh="幻灯片 / 屏幕共享 · 16:9" en="Slides / screen share · 16:9" />
                  </Slot>
                  <div className="flex flex-col justify-between u-gap-3">
                    <Slot className="aspect-[4/3]">
                      <Icon name="user" strokeWidth={1} className="u-size-7" />
                      <L zh="摄像头 · 4:3" en="Camera · 4:3" />
                    </Slot>
                    <div className="grid u-gap-1.25 border-t border-ab-line u-pt-3">
                      <span className={LABEL}>
                        <L zh="讲者" en="Speaker" />
                      </span>
                      <b className="u-text-3.5 leading-tight font-semibold">
                        <L zh="演讲者姓名" en="Speaker Name" />
                      </b>
                      <span className="u-text-2.75 leading-snug text-ab-fg-2">
                        <L zh="职位 · 所属机构" en="Title · Affiliation" />
                      </span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-end u-gap-3 border-t border-ab-line u-pt-3">
                      <QR value="https://rustfs.com" quiet={2} className="u-size-11 bg-white text-neutral-950" />
                      <span className="grid u-gap-1">
                        <span className={LABEL}>
                          <L zh="提问与资料" en="Q&A · links" />
                        </span>
                        <span className="ab-url u-text-2.75">rustfs.com</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Template>

            <Template span={4} title={t("YouTube 缩略图 · 发布", "YouTube thumbnail · release")} spec="1280 × 720" w={1280} h={720} themes={["ink", "paper", "signal"]} tags={["thumb"]} file="yt-thumb-release" note={t("版本号为唯一主体，168 × 94 下仍须可读。", "The version number is the only hero, legible at 168 × 94.")}>
              <ThumbRelease />
              <Zone toggle className="right-0 bottom-0 h-[14%] w-[18%]">
                <L zh="时长标记" en="Duration" />
              </Zone>
            </Template>

            <Template span={4} title={t("YouTube 缩略图 · 教程", "YouTube thumbnail · tutorial")} spec="1280 × 720" w={1280} h={720} themes={["signal", "ink", "paper"]} tags={["thumb"]} file="yt-thumb-tutorial" note={t("标题 2–4 个词，配与主题对应的图标。", "Two to four words, with the icon for the topic.")}>
              <ThumbTutorial />
              <Zone toggle className="right-0 bottom-0 h-[14%] w-[18%]">
                <L zh="时长标记" en="Duration" />
              </Zone>
            </Template>

            <Template span={4} title={t("YouTube 缩略图 · 演讲", "YouTube thumbnail · talk")} spec="1280 × 720" w={1280} h={720} themes={["paper", "ink", "signal"]} tags={["thumb"]} file="yt-thumb-talk" note={t("讲者照片须经本人同意；无照片时留底色，不用图库人像。", "Speaker photos need consent; without one, keep the panel plain, no stock portraits.")}>
              <ThumbTalk />
              <Zone toggle className="right-0 bottom-0 h-[14%] w-[18%]">
                <L zh="时长标记" en="Duration" />
              </Zone>
            </Template>

            <Template span={6} title={t("Bilibili 封面", "Bilibili cover")} spec={t("1146 × 717 · 中文", "1146 × 717 · Chinese")} w={1146} h={717} themes={["ink", "signal", "paper"]} langs={["zh"]} tags={["thumb"]} file="bilibili-cover" note={t("底部约 15% 不放文字；第三方产品只写名称，不用其标志。", "No text in the bottom 15%; name third-party products, never show their logos.")}>
              <ThumbBili />
              <Zone toggle className="inset-x-0 bottom-0 h-[15%]">
                播放量 · 弹幕 · 时长
              </Zone>
            </Template>

            <Template span={3} title={t("竖屏封面", "Vertical cover")} spec={t("1080 × 1920 · 抖音 / Shorts / Reels / 视频号", "1080 × 1920 · Douyin / Shorts / Reels / Channels")} w={1080} h={1920} themes={["ink", "signal", "paper"]} tags={["other"]} file="vertical-cover" note={t("兼作首帧；文字与主体须避开橙色遮挡区。", "Also the first frame; text and subject stay out of the orange zones.")}>
              <div className="absolute top-[14%] right-[12%] bottom-[20%] left-(--m) flex flex-col justify-between u-py-4">
                <div className="grid u-gap-7">
                  <div className="flex items-center justify-between u-gap-3">
                    <Wordmark className="ab-logo u-h-5" />
                    <span className="ab-label u-text-3">
                      <L zh="存储原理 · 01" en="Storage 101 · 01" />
                    </span>
                  </div>
                  <h3 className="ab-zh u-text-10 leading-[1.16]">
                    <L zh={<>坏了两块盘，<br />数据为什么还在？</>} en={<span className="ab-head block">Why does data survive two dead drives?</span>} />
                  </h3>
                </div>
                <div className="grid u-gap-3">
                  <ShardMatrix className="!h-auto w-full" cols={6} rows={3} k={4} m={2} dead={[1, 4]} seed={5} gap={0.22} fit="none" />
                  <div className="grid grid-cols-6 font-mono u-text-2.5 tracking-[0.04em] text-ab-muted">
                    {[1, 2, 3, 4, 5, 6].map((d) => (
                      <span key={d} className={d === 2 || d === 5 ? "text-ab-fg" : undefined}>
                        {d === 2 || d === 5 ? "✕ " : ""}D{d}
                      </span>
                    ))}
                  </div>
                  <p className="ab-body u-text-3.5 text-ab-fg-2">
                    <L zh="EC 4+2：任意 2 块盘离线，数据仍可读取。" en="EC 4+2: any two drives can fail and the data still reads." />
                  </p>
                </div>
              </div>
              <Zone className="inset-x-0 top-0 h-[14%]">
                <L zh="平台界面 · 顶部 14%" en="Platform UI · top 14%" />
              </Zone>
              <Zone className="inset-x-0 bottom-0 h-[20%]">
                <L zh="标题与互动 · 底部 20%" en="Caption and actions · bottom 20%" />
              </Zone>
              <Zone className="top-[14%] right-0 bottom-[20%] w-[12%] [&>span]:[writing-mode:vertical-rl]">
                <L zh="互动按钮 · 右侧 12%" en="Buttons · right 12%" />
              </Zone>
            </Template>

            <Template span={3} title={t("播客 / 音频封面", "Podcast / audio cover")} spec="1500 × 1500 · 1:1" w={1500} h={1500} themes={["signal", "ink", "paper"]} tags={["other"]} file="podcast-cover" note={t("标志符号在 55 px 下须可辨；节目名不超过两行。", "The symbol must read at 55 px; the show name runs two lines at most.")}>
              <div className="absolute inset-(--m) flex flex-col items-center justify-between text-center">
                <span className="ab-label u-text-3">
                  <L zh="播客" en="Podcast" /> · <b>EP 03</b>
                </span>
                <BrandSymbol className="u-size-56 text-ab-logo" />
                <h3 className="ab-head u-text-8">
                  <L zh="RustFS 音频" en="RustFS Audio" />
                </h3>
              </div>
            </Template>
          </TemplateGrid>
        </SafeAreas>

        <Sub title={t("缩略图实际尺寸检查", "Thumbnails at actual size")} aside={t("宽 168 px · 推荐列表与侧栏", "168 px wide · suggested list and sidebar")}>
          <div className="grid gap-x-6 gap-y-6 border border-border bg-surface p-5 sm:grid-cols-[repeat(auto-fill,168px)]">
            <Actual w={1280} h={720} theme="ink" label={t("发布 · 1280 × 720", "Release · 1280 × 720")}>
              <ThumbRelease />
            </Actual>
            <Actual w={1280} h={720} theme="signal" label={t("教程 · 1280 × 720", "Tutorial · 1280 × 720")}>
              <ThumbTutorial />
            </Actual>
            <Actual w={1280} h={720} theme="paper" label={t("演讲 · 1280 × 720", "Talk · 1280 × 720")}>
              <ThumbTalk />
            </Actual>
            <Actual w={1146} h={717} theme="ink" label="Bilibili · 1146 × 717">
              <ThumbBili />
            </Actual>
          </div>
          <Prose>
            <p>{t("168 px 宽时主标题须可读；小字不承载必要信息。", "The main title must read at 168 px; small type never carries essential information.")}</p>
          </Prose>
        </Sub>
      </Section>

      {/* ---------- Specs ---------- */}
      <Section
        id="specs"
        tag="Specs"
        title={t("交付规格", "Delivery specs")}
        lede={<p>{t("平台规则会变，发布前须在平台预览中确认裁切与遮挡。", "Platform rules change; check crops and overlays in the platform preview before publishing.")}</p>}
      >
        <Sub title={t("画幅与帧率", "Formats and frame rates")}>
          <Table
            className="[&_table]:min-w-[820px] [&_td.font-mono]:whitespace-nowrap"
            mono={[1, 2, 3]}
            head={[t("用途", "Use"), t("尺寸", "Size"), t("比例", "Ratio"), t("帧率", "Frame rate"), t("规则", "Rule")]}
            rows={[
              [t("演讲、教程、发布视频", "Talks, tutorials, release videos"), "1920 × 1080", "16:9", "25 / 30 fps", t("中国大陆与欧洲 25 fps，北美 30 fps；一个项目一个帧率；4K 为 3840 × 2160", "25 fps in mainland China and Europe, 30 fps in North America; one rate per project; 4K is 3840 × 2160")],
              [t("屏幕录制", "Screen recordings"), "1920 × 1080", "16:9", "30 / 60 fps", t("滚动或动画用 60 fps；按成片分辨率录制，不得放大", "60 fps for scrolling or animation; record at delivery size, never upscale")],
              [t("竖屏短视频", "Vertical short video"), "1080 × 1920", "9:16", "30 fps", t("抖音、Shorts、Reels、视频号共用一版", "One master for Douyin, Shorts, Reels and Channels")],
              [t("直播", "Livestream"), "1920 × 1080", "16:9", "30 fps", t("叠加层 PNG 置于 OBS 最底层", "Overlay PNG as the bottom OBS layer")],
              [t("片头、片尾", "Sting, outro"), "1920 × 1080", "16:9", "25 / 30 / 60 fps", t("每个帧率一版，与项目一致", "One version per frame rate, matching the project")],
              [t("YouTube 缩略图", "YouTube thumbnail"), "1280 × 720", "16:9", "—", t("JPG / PNG，≤ 2 MB", "JPG / PNG, ≤ 2 MB")],
              [t("Bilibili 封面", "Bilibili cover"), "1146 × 717", "16:10", "—", t("底部约 15% 不放文字", "No text in the bottom 15%")],
              [t("播客 / 音频封面", "Podcast / audio cover"), "1500 × 1500", "1:1", "—", t("RGB，JPG / PNG；Apple Podcasts 要求 1400–3000 px", "RGB, JPG / PNG; Apple Podcasts needs 1400–3000 px")],
            ]}
          />
        </Sub>

        <Sub title={t("安全区与最小字号", "Safe areas and minimum sizes")} aside={t("以 1920 × 1080 计", "At 1920 × 1080")}>
          <Table
            className="[&_table]:min-w-[720px] [&_td:first-child]:whitespace-nowrap [&_td.font-mono]:whitespace-nowrap"
            mono={[1]}
            head={[t("项目", "Item"), t("数值", "Value"), t("规则", "Rule")]}
            rows={[
              [t("动作安全区", "Action safe"), "93% · 1786 × 1004", t("有意义的图形；每边内收 3.5%", "Meaningful graphics; 3.5% in from each edge")],
              [t("标题安全区", "Title safe"), "90% · 1728 × 972", t("全部文字；每边内收 5%", "All text; 5% in from each edge")],
              [t("内容边距", "Content frame"), "10u × 7u · 108 × 76 px", t("模板文字边距，在标题安全区内", "Template text margin, inside title safe")],
              [t("竖屏遮挡区", "Vertical UI zones"), t("顶 14% · 底 20% · 右 12%", "Top 14% · bottom 20% · right 12%"), t("不放文字与主体；主页按 3:4 居中裁切，标题居中", "No text or subject; profile grids crop to a centred 3:4, so centre the title")],
              [t("正文", "Body text"), "≥ 3u · 32 px", t("16:9 画面中的任何句子", "Any sentence on 16:9")],
              [t("标签", "Labels"), "≥ 2.5u · 27 px", t("等宽大写，比文章封面大一级", "Mono caps, one step above article covers")],
              [t("代码", "Code"), "≥ 3u · 32 px", t("每屏 ≤ 14 行、60 列", "≤ 14 lines, 60 columns per screen")],
              [t("竖屏文字", "Vertical text"), "≥ 3.5u · 38 px", t("以 1080 × 1920 计；标题 ≥ 10u，标签 ≥ 2.5u", "At 1080 × 1920; titles ≥ 10u, labels ≥ 2.5u")],
              [t("缩略图标题", "Thumbnail title"), "≥ 13u · 94 px", t("以 1280 × 720 计；168 × 94 下约 12 px", "At 1280 × 720; about 12 px at 168 × 94")],
            ]}
          />
        </Sub>

        <Sub title={t("字幕", "Captions")}>
          <Table
            className="[&_table]:min-w-[560px] [&_td:first-child]:whitespace-nowrap"
            head={[t("项目", "Item"), t("规则", "Rule")]}
            rows={[
              [t("行长", "Line length"), t("中文 ≤ 16 字，英文 ≤ 42 字符；每条 ≤ 2 行", "Chinese ≤ 16 characters, English ≤ 42; two lines max")],
              [t("字号与字体", "Size and face"), t("中文约 48 px（4.5u），英文约 38 px（3.5u）；Geist / HarmonyOS Sans，Medium，白色", "Chinese ~48 px (4.5u), English ~38 px (3.5u); Geist / HarmonyOS Sans, Medium, white")],
              [t("底框", "Box"), t("Ink 80%，直角，紧贴每行；不得以描边、投影或发光代替", "Ink 80%, square, hugging each line; never outlines, shadows or glows")],
              [t("位置", "Position"), t("居中，下沿距底 7u（76 px）；不与人名条重叠", "Centred, 7u (76 px) above the bottom; clear of the lower third")],
              [t("双语", "Bilingual"), t("中文在上，英文在下，各一行", "Chinese above, English below, one line each")],
              [t("标点", "Punctuation"), t("中文逗号、句号改为空格，保留问号、引号与书名号；英文常规标点、句首大写", "Chinese commas and full stops become spaces; question, quotation and title marks stay. English: normal punctuation, sentence case")],
              [t("时长与文件", "Timing and files"), t("每条 1–7 s；上传 SRT / WebVTT（UTF-8）；竖屏短视频烧录字幕", "1–7 s each; upload SRT / WebVTT (UTF-8); burn in on vertical shorts")],
            ]}
          />
        </Sub>

        <Sub title={t("声音与色彩", "Sound and colour")}>
          <Table
            className="[&_table]:min-w-[720px] [&_td:first-child]:whitespace-nowrap [&_td.font-mono]:whitespace-nowrap"
            mono={[1]}
            head={[t("项目", "Item"), t("数值", "Value"), t("规则", "Rule")]}
            rows={[
              [t("音频标识", "Audio logo"), t("无", "None"), t("片头片尾静音；配乐须获授权，授权文件随工程归档", "Sting and outro are silent; music only when licensed, licence archived with the project")],
              [t("响度", "Loudness"), "−14 LUFS · ≤ −1 dBTP", t("网络发布；广播按 EBU R 128（−23 LUFS）", "Online; broadcast follows EBU R 128 (−23 LUFS)")],
              [t("色彩空间", "Colour space"), "Rec.709 · SDR", t("导出时写入 BT.709 标记，避免偏色", "Tag BT.709 on export to avoid colour shifts")],
              [t("品牌色 · 网络", "Brand colour · online"), "#0062FF · #FF5E14", t("直接使用 sRGB 色值", "sRGB values as they are")],
              [t("品牌色 · 广播", "Brand colour · broadcast"), t("合法电平 16–235", "Legal range 16–235"), t("须经合法化并在示波器上确认不越界；不得为保色值绕过", "Legalise and check the scopes; never bypass it to keep the hex values")],
            ]}
          />
        </Sub>
      </Section>

      {/* ---------- Do & Don't ---------- */}
      <Section id="rules" tag="Do & Don't" title={t("发布前检查", "Before you publish")}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="ink" bodyClassName="p-0 min-h-55" caption={t("只用写入与修复，无声，定格收尾。", "Write and heal only, silent, hold the end.")}>
            <div className="grid justify-items-center gap-3 py-10">
              <span className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <i key={i} className={cn("block size-3", i < 4 ? "bg-blue-500" : "bg-oxide-500")} />
                ))}
              </span>
              <Wordmark className="h-7 w-auto text-white" />
              <span className="font-display text-[13px] leading-none font-semibold text-neutral-300 [font-stretch:112%]">{t("AI 时代的基建，从每一个字节算起。", "AI infrastructure, accounted for byte by byte.")}</span>
            </div>
          </DoDont>
          <DoDont kind="dont" on="ink" bodyClassName="p-0 min-h-55" caption={t("旋转、弹跳、三维、发光、光晕或音效。", "Spins, bounces, 3D, glows, flares, sound effects.")}>
            <div className="grid justify-items-center gap-3 py-10">
              <Wordmark className="h-9 w-auto -rotate-12 skew-x-12 text-blue-400 drop-shadow-[0_0_14px_rgba(92,153,255,0.95)]" />
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-amber-500">WHOOSH!</span>
            </div>
          </DoDont>

          <DoDont kind="do" on="surface" bodyClassName="p-0 min-h-55" caption={t("文字在标题安全区内，左对齐。", "Text inside title safe, aligned left.")}>
            <div className="relative m-6 aspect-video w-[min(100%,380px)] bg-neutral-950">
              <span className="absolute inset-[5%] border border-dashed border-oxide-500/80" />
              <Wordmark className="absolute top-[9%] left-[9%] h-2.5 w-auto text-white" />
              <span className="absolute top-[38%] left-[9%] max-w-[60%] font-display text-[22px] leading-[1.05] font-[750] text-white [font-stretch:112%]">{t("登录控制台", "Sign in to the Console")}</span>
            </div>
          </DoDont>
          <DoDont kind="dont" on="surface" bodyClassName="p-0 min-h-55" caption={t("文字贴边，被过扫描切掉。", "Text at the edge, lost to overscan.")}>
            <div className="relative m-6 aspect-video w-[min(100%,380px)] overflow-hidden bg-neutral-950">
              <span className="absolute inset-[5%] border border-dashed border-oxide-500/80" />
              <span className="absolute top-[1%] -left-[2%] font-display text-[30px] leading-none font-extrabold whitespace-nowrap text-white [font-stretch:125%]">{t("登录 RustFS 控制台", "SIGN IN TO THE CONSOLE")}</span>
            </div>
          </DoDont>

          <DoDont kind="do" on="surface" bodyClassName="p-0 min-h-55" caption={t("最多两行，Ink 底框。", "Two lines max, on an Ink box.")}>
            <div className="relative m-6 grid aspect-video w-[min(100%,380px)] content-end justify-items-center bg-neutral-800 pb-[7%]">
              <span className="bg-neutral-950/80 px-1.5 text-[13px] leading-[1.5] font-medium text-white">每个对象被切成数据块和校验块</span>
              <span className="bg-neutral-950/80 px-1.5 text-[11px] leading-[1.5] text-white">Each object becomes data and parity shards</span>
            </div>
          </DoDont>
          <DoDont kind="dont" on="surface" bodyClassName="p-0 min-h-55" caption={t("三行长句、字太小、描边代替底框。", "Three long lines, tiny type, outlines.")}>
            <div className="relative m-6 grid aspect-video w-[min(100%,380px)] content-end justify-items-center bg-[repeating-linear-gradient(90deg,#0062FF_0_18px,#E0ECFE_18px_36px)] px-[6%] pb-[3%]">
              <span className="text-center text-[9px] leading-[1.3] font-bold text-yellow-300 [-webkit-text-stroke:0.6px_#000]">{t("纠删码会把每一个对象都切分成若干个数据块以及若干个校验块，然后再把这些块分别写入到纠删集里面不同的磁盘上面去，这样坏掉的盘就可以被重建出来", "Erasure coding takes every single object and splits it into a number of data shards plus a number of parity shards and then writes all of them across the different drives in the erasure set so that failed drives can be rebuilt")}</span>
            </div>
          </DoDont>

          <DoDont kind="do" on="surface" bodyClassName="p-0 min-h-55" caption={t("标题与主体避开平台界面。", "Title and subject clear of platform UI.")}>
            <div className="relative my-6 aspect-[9/16] h-56 bg-neutral-950">
              <span className="absolute inset-x-0 top-0 h-[14%] bg-oxide-500/15 outline outline-1 -outline-offset-1 outline-dashed outline-oxide-500/70" />
              <span className="absolute inset-x-0 bottom-0 h-[20%] bg-oxide-500/15 outline outline-1 -outline-offset-1 outline-dashed outline-oxide-500/70" />
              <span className="absolute top-[14%] right-0 bottom-[20%] w-[12%] bg-oxide-500/15 outline outline-1 -outline-offset-1 outline-dashed outline-oxide-500/70" />
              <span className="absolute top-[20%] right-[14%] left-[8%] font-display text-[13px] leading-[1.2] font-extrabold text-white">{t("坏了两块盘，数据为什么还在？", "Why does data survive two dead drives?")}</span>
              <span className="absolute right-[14%] bottom-[24%] left-[8%] grid grid-cols-6 gap-0.5">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <i key={i} className={cn("block aspect-square", i === 1 || i === 4 ? "border border-dashed border-blue-500" : i > 3 ? "bg-oxide-500" : "bg-blue-500")} />
                ))}
              </span>
            </div>
          </DoDont>
          <DoDont kind="dont" on="surface" bodyClassName="p-0 min-h-55" caption={t("标题压在按钮与说明之下。", "Title under the buttons and caption.")}>
            <div className="relative my-6 aspect-[9/16] h-56 bg-neutral-950">
              <span className="absolute inset-x-0 top-0 h-[14%] bg-oxide-500/15 outline outline-1 -outline-offset-1 outline-dashed outline-oxide-500/70" />
              <span className="absolute inset-x-0 bottom-0 h-[20%] bg-oxide-500/15 outline outline-1 -outline-offset-1 outline-dashed outline-oxide-500/70" />
              <span className="absolute top-[14%] right-0 bottom-[20%] w-[12%] bg-oxide-500/15 outline outline-1 -outline-offset-1 outline-dashed outline-oxide-500/70" />
              <span className="absolute right-[4%] bottom-[6%] left-[8%] font-display text-[13px] leading-[1.2] font-extrabold text-white">{t("坏了两块盘，数据为什么还在？", "Why does data survive two dead drives?")}</span>
              <span className="absolute top-[38%] right-[2%] grid gap-2">
                {[0, 1, 2].map((i) => (
                  <i key={i} className="block size-3 rounded-full bg-white/80" />
                ))}
              </span>
            </div>
          </DoDont>

          <DoDont kind="do" on="surface" bodyClassName="p-0 min-h-55" caption={t("2–4 个大字加一个图形。", "Two to four big words, one graphic.")}>
            <div className="m-6 grid gap-3">
              <Actual w={1280} h={720} theme="ink" label="168 × 94">
                <ThumbRelease />
              </Actual>
            </div>
          </DoDont>
          <DoDont kind="dont" on="surface" bodyClassName="p-0 min-h-55" caption={t("小字、箭头、红圈与夸张口号。", "Small type, arrows, red circles, hype.")}>
            <div className="relative m-6 aspect-video w-[168px] overflow-hidden bg-red-500">
              <span className="absolute top-1 left-1.5 max-w-[70%] text-[6px] leading-[1.15] font-bold text-white">{t("史上最快对象存储？？性能暴涨 1000% 全网首发 必看！！", "FASTEST STORAGE EVER?? 1000% FASTER — YOU WON'T BELIEVE THIS!!")}</span>
              <span className="absolute right-3 bottom-2 size-8 rounded-full border-2 border-yellow-300" />
              <Arrow className="absolute bottom-3 left-8 w-10 -rotate-12 text-yellow-300" />
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="video" />
    </Page>
  )
}
