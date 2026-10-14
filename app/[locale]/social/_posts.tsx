import type { CSSProperties, ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { QR } from "@/components/brand/qr"
import { Stripe } from "@/components/brand/stripe"
import { cn } from "@/lib/utils"
import { Guide, H, Head, Ph, Tag } from "./_shared"

const TONE = [1, 0.6, 1, 0.34, 1, 1, 0.6, 1, 0.34, 0.6, 1, 1, 0.34, 1, 0.6, 1]
const tone = (i: number) => TONE[(i * 7 + 3) % TONE.length]

const ArrowDown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M12 2v34M5 28l7 8 7-8" />
  </svg>
)

/* ============================== Square · 1080 × 1080 ============================== */

/** 1 · Release */
export function PostRelease() {
  return (
    <>
      <ShardMatrix className="absolute inset-x-0 bottom-0 !h-[calc(var(--u)*20)] !w-full" cols={20} rows={4} k={4} m={2} seed={21} mode="tone" fit="slice" gap={0.22} />
      <div className="ab-frame bottom-[calc(var(--u)*27)]">
        <Head label={<><L zh="版本发布" en="Release" /> · <b>2026-10</b></>} />
        <div>
          <div className="ab-display u-text-28 leading-[0.8] tracking-[-0.045em]">
            <small className="mb-[0.34em] ml-[0.09em] block text-[0.22em] leading-none tracking-[-0.01em] text-ab-brand">RustFS</small>1.0.1
          </div>
          <p className="ab-body u-mt-6 u-text-4 max-w-[19em]">
            <L zh="生产可用的 S3 兼容对象存储。版本说明与升级步骤见 GitHub Releases。" en="Production-ready, S3-compatible object storage. Release notes and upgrade steps are on GitHub Releases." />
          </p>
        </div>
        <span className="ab-url u-text-3">github.com/rustfs/rustfs/releases</span>
      </div>
    </>
  )
}

/** 2 · Feature spotlight */
export function PostFeature() {
  return (
    <div className="ab-frame">
      <Head label={<L zh="功能聚焦" en="Feature spotlight" />} />
      <div className="grid justify-items-start u-gap-4">
        <Tag accent className="u-text-2.75 text-ab-fg">
          <L zh="预览" en="Preview" />
        </Tag>
        <div className="ab-display u-text-13 leading-[0.86] tracking-[-0.035em]">S3 Tables</div>
        <p className="ab-body u-text-4 max-w-[19em]">
          <L zh="在 RustFS 中直接存放 Apache Iceberg 表，通过 Iceberg REST Catalog 访问。" en="Apache Iceberg tables stored inside RustFS and served through an Iceberg REST catalog." />
        </p>
      </div>
      <div className="grid grid-cols-[calc(var(--u)*15)_1fr] items-center u-gap-y-3 border-t border-ab-line u-pt-4">
        {[
          {
            k: <L zh="目录" en="Catalog" />,
            v: (
              <span className="inline-flex u-h-8 items-center u-gap-1.5 bg-ab-data u-px-2.5 font-mono u-text-2.75 font-medium text-ab-on-data">
                <Icon name="api" className="u-size-4" />
                Iceberg REST
              </span>
            ),
          },
          {
            k: <L zh="元数据" en="Metadata" />,
            v: (
              <span className="flex u-gap-1.25">
                {["metadata.json", "manifest list", "manifests"].map((s) => (
                  <span key={s} className="inline-flex u-h-7 items-center border-[calc(var(--u)*0.25)] border-ab-fg u-px-1.5 font-mono u-text-2.25 whitespace-nowrap">
                    {s}
                  </span>
                ))}
              </span>
            ),
          },
          {
            k: <L zh="数据文件" en="Data files" />,
            v: (
              <span className="grid grid-cols-[repeat(14,1fr)] u-gap-0.75">
                {Array.from({ length: 28 }, (_, i) => (
                  <i key={i} className="block aspect-square bg-ab-data" style={{ opacity: tone(i) }} />
                ))}
              </span>
            ),
          },
        ].map((r, i) => (
          <div key={i} className="contents">
            <span className="ab-label u-text-2.5">{r.k}</span>
            <div className="relative border-l border-ab-line u-pl-3">{r.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** 3 · Tip with code */
export function PostTip() {
  return (
    <div className="ab-frame">
      <Head label={<><L zh="提示" en="Tip" /> · <b>01</b></>} />
      <div className="grid u-gap-4">
        <div className="grid u-gap-2">
          <span className="font-mono u-text-3.5 leading-none font-medium tracking-[0.08em] text-ab-muted">UID</span>
          <span className="ab-num u-text-22 leading-[0.78] tracking-[-0.045em] text-ab-brand">10001</span>
        </div>
        <H className="u-text-5.5 max-w-[17em]" zhClass="leading-[1.4]" enClass="leading-[1.12]" zh="RustFS 容器以 UID 10001 运行，挂载前须先把数据目录交给它。" en="The RustFS container runs as UID 10001. Hand it the data directories before mounting them." />
      </div>
      <div className="ab-term">
        <div className="flex items-center u-gap-1 border-b border-ab-line u-px-2.5 u-py-1.75 u-text-2.25 tracking-[0.04em] text-ab-muted">
          <i className="block u-size-1.25 bg-current opacity-45" />
          <i className="block u-size-1.25 bg-current opacity-45" />
          <i className="block u-size-1.25 bg-current opacity-45" />
          <span className="u-ml-1">~/rustfs</span>
        </div>
        <pre className="m-0 u-px-3 u-py-3 font-mono u-text-3.25 leading-[1.6] whitespace-pre-wrap">
          <span className="dim"><L zh="# 数据目录须对 UID 10001 可写" en="# must be writable by UID 10001" /></span>
          {"\n"}<span className="pr">$</span> mkdir -p data logs
          {"\n"}<span className="pr">$</span> chown -R 10001:10001 data logs
        </pre>
      </div>
    </div>
  )
}

/** 4 · Stat / milestone */
export function PostStat() {
  return (
    <>
      <ShardMatrix className="absolute top-[calc(var(--u)*14)] right-0 !h-[calc(var(--u)*19)] !w-[50%]" cols={10} rows={4} k={4} m={2} seed={41} mode="tone" fade="l" fit="slice" gap={0.24} />
      <div className="ab-frame">
        <Head label={<L zh="里程碑" en="Milestone" />} />
        <div className="grid u-gap-7">
          <div>
            <div className="ab-num u-text-21 leading-[0.78] tracking-[-0.04em]">34,869</div>
            <div className="ab-head u-mt-5 u-text-7.5">
              <L zh="GitHub Star" en="GitHub stars" />
            </div>
            <p className="ab-body m-0 u-mt-3 u-text-4">
              <L zh="感谢每一位关注 RustFS 的开发者。" en="Thank you to everyone who follows RustFS." />
            </p>
          </div>
          <span className="border-t border-ab-line u-pt-3 font-mono u-text-2.5 leading-[1.5] text-ab-muted">
            <L zh="数据来源：RustFS 官方网站 · 统计日期：2026-10-14" en="Source: official RustFS website · As of 2026-10-14" />
          </span>
        </div>
      </div>
    </>
  )
}

/** 5 · Event / meetup */
export function PostMeetup() {
  const start = 2
  const day = 22
  return (
    <div className="ab-frame">
      <Head label={<L zh="线下交流会" en="Meetup" />} />
      <div className="flex items-end justify-between u-gap-4">
        <H className="u-text-8.5" zhClass="leading-[1.16]" enClass="leading-[0.98]" zh={<>RustFS<br />用户交流会</>} en={<>RustFS<br />Meetup</>} />
        <span className="ab-head u-mb-0.5 u-text-5 text-ab-fg-2">
          <Ph>
            <L zh="城市" en="City" />
          </Ph>
        </span>
      </div>
      <div className="grid grid-cols-7 u-gap-x-1 u-gap-y-1">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="u-pb-0.5 font-mono u-text-2.25 leading-none text-ab-muted">
            <L zh={"一二三四五六日"[i]} en={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][i]} />
          </span>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const n = i - start + 1
          if (n < 1 || n > 31) return <i key={i} className="block u-h-4.25" />
          return <i key={i} className={cn("block u-h-4.25", n === day ? "bg-ab-parity" : "border border-ab-line")} />
        })}
      </div>
      <dl className="m-0 grid grid-cols-2 border-t border-ab-line">
        {[
          [<L key="a" zh="日期" en="Date" />, <Ph key="b">YYYY-MM-DD</Ph>],
          [<L key="c" zh="时间" en="Time" />, <Ph key="d">HH:MM – HH:MM</Ph>],
          [<L key="e" zh="地点" en="Venue" />, <Ph key="f"><L zh="场地名称" en="Venue name" /></Ph>],
          [<L key="g" zh="报名" en="RSVP" />, <span key="h" className="text-ab-fg-2"><L zh="链接见正文" en="Link in the caption" /></span>],
        ].map(([k, v], i) => (
          <div key={i} className={cn("grid u-gap-1 border-b border-ab-line u-py-1.5", i % 2 === 1 && "border-l border-ab-line u-pl-3")}>
            <dt className="ab-label u-text-2.5">{k}</dt>
            <dd className="m-0 u-text-3.75 leading-tight font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** 6 · Hiring */
export function PostHiring() {
  const slot = 13
  return (
    <div className="ab-frame">
      <Head label={<L zh="招聘" en="Hiring" />} />
      <div>
        <H className="u-text-12" zhClass="leading-[1.1]" enClass="ab-display leading-[0.9] tracking-[-0.035em]" zh="加入 RustFS" en="Join RustFS" />
        <div className="ab-head u-mt-5 u-text-6">
          <Ph>
            <L zh="职位名称" en="Role title" />
          </Ph>
        </div>
        <div className="u-mt-3 flex u-gap-3 font-mono u-text-3 text-ab-muted">
          <Ph>
            <L zh="地点" en="Location" />
          </Ph>
          <span>·</span>
          <Ph>
            <L zh="全职 / 远程" en="Full-time / remote" />
          </Ph>
        </div>
      </div>
      <div className="grid u-gap-4">
        <div className="grid grid-cols-8 u-gap-1.25">
          {Array.from({ length: 24 }, (_, i) =>
            i === slot ? (
              <span key={i} className="grid aspect-square place-items-center border-[calc(var(--u)*0.3)] border-dashed border-ab-accent text-ab-accent">
                <Icon name="plus" className="u-size-5" strokeWidth={2} />
              </span>
            ) : (
              <i key={i} className="block aspect-square bg-ab-data" style={{ opacity: tone(i) }} />
            ),
          )}
        </div>
        <span className="ab-url u-text-3">
          <L zh="职位详情与申请方式见正文链接" en="Details and how to apply: link in the caption" />
        </span>
      </div>
    </div>
  )
}

/** 7 · Principle quote */
export function PostPrinciple() {
  return (
    <div className="ab-frame">
      <Head label={<><L zh="品牌原则" en="Principle" /> · <b>01</b></>} />
      <blockquote className="m-0 grid u-gap-7">
        <Stripe className="u-text-3.5" />
        <H
          className="u-text-7.5"
          zhClass="u-text-6.5 leading-[1.36]"
          enClass="leading-[1.1] tracking-[-0.015em]"
          zh={<><span className="text-ab-muted">Rust 让每一块内存<br />都有主人。</span><br />RustFS 让 AI 时代的基建，<br />从每一个字节算起。</>}
          en={<><span className="text-ab-muted">Rust gives every value an owner.</span> RustFS accounts for AI infrastructure byte by byte.</>}
        />
      </blockquote>
      <div className="flex items-center u-gap-3 border-t border-ab-line u-pt-3">
        <span className="ab-label u-text-2.75">
          — <L zh="RustFS 设计原则" en="RustFS design principles" />
        </span>
      </div>
    </div>
  )
}

/** 8 · Contributor thanks */
export function PostThanks() {
  const main = [40, 170, 300, 430, 560, 690, 820]
  return (
    <div className="ab-frame">
      <Head label={<L zh="感谢贡献者" en="Thank you" />} />
      <div className="grid u-gap-5">
        <span className="grid u-size-24 place-items-center border border-dashed border-ab-muted font-mono u-text-2.25 tracking-[0.08em] text-ab-muted uppercase">
          <L zh="头像" en="Avatar" />
        </span>
        <div className="font-mono u-text-8 leading-none font-medium tracking-[-0.03em]">
          <Ph>@username</Ph>
        </div>
        <p className="ab-head m-0 u-text-6 max-w-[16em]">
          <L zh="感谢你为 RustFS 做出的贡献。" en="Thank you for contributing to RustFS." />
        </p>
      </div>
      <div className="grid u-gap-4">
        <svg viewBox="0 0 860 150" className="block h-auto w-full" aria-hidden="true">
          <path d="M20 112H840" className="stroke-ab-muted" strokeWidth="3" fill="none" />
          <path d="M300 112V40H560L560 40H690V112" className="stroke-ab-accent" strokeWidth="3" fill="none" strokeLinejoin="miter" />
          {main.map((x) => (x === 690 ? null : <rect key={x} x={x - 13} y={99} width={26} height={26} className="fill-ab-muted" />))}
          {[400, 500].map((x) => (
            <rect key={x} x={x - 13} y={27} width={26} height={26} className="fill-ab-accent" />
          ))}
          <rect x={690 - 22} y={90} width={44} height={44} className="fill-ab-data" />
        </svg>
        <div className="flex flex-wrap items-center u-gap-x-2.5 u-gap-y-1.5 border-t border-ab-line u-pt-3 font-mono u-text-2.75">
          <Icon name="branch" className="u-size-3.75 text-ab-muted" />
          <span className="text-ab-muted">rustfs/rustfs</span>
          <Ph>#0000</Ph>
          <Ph>
            <L zh="PR 标题" en="PR title" />
          </Ph>
          <Tag className="ml-auto">
            <L zh="已合并" en="Merged" />
          </Tag>
        </div>
      </div>
    </div>
  )
}

/* ============================== Portrait · 1080 × 1350 ============================== */

/** 9 · Blog post */
export function PortraitMigrate() {
  return (
    <div className="ab-frame">
      <Head label={<><L zh="迁移指南" en="Migration guide" /> · <b><L zh="博客" en="Blog" /></b></>} />
      <H className="u-text-7.5" zhClass="leading-[1.3]" enClass="leading-[1.06]" zh={<>替换二进制：<br />从 MinIO 迁移到 RustFS 的简单方法</>} en="Binary replacement: a simple way to migrate from MinIO to RustFS" />
      <div className="grid u-gap-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch u-gap-3">
          <div className="grid u-h-36 content-between border-[calc(var(--u)*0.25)] border-dashed border-ab-muted u-p-4 font-mono">
            <span className="u-text-2.75 tracking-[0.04em] text-ab-muted">/usr/local/bin</span>
            <b className="u-text-7.5 leading-none font-normal text-ab-fg-2 line-through decoration-ab-accent decoration-[calc(var(--u)*0.5)]">minio</b>
          </div>
          <div className="grid place-items-center text-ab-muted">
            <ArrowDown className="u-h-8 -rotate-90" />
          </div>
          <div className="grid u-h-36 content-between bg-ab-data u-p-4 font-mono text-ab-on-data">
            <span className="u-text-2.75 tracking-[0.04em] opacity-75">/usr/local/bin</span>
            <b className="u-text-7.5 leading-none font-normal">rustfs</b>
          </div>
        </div>
        <div className="grid grid-cols-3 border-y border-ab-line font-mono u-text-2.75">
          {["S3 API", "SDK · CLI", <L key="c" zh="应用代码" en="App code" />].map((s, i) => (
            <span key={i} className={cn("grid u-gap-1 u-py-2", i > 0 && "border-l border-ab-line u-pl-3")}>
              <em className="u-text-2.25 tracking-[0.08em] text-ab-muted uppercase not-italic">
                <L zh="保持不变" en="Unchanged" />
              </em>
              <b className="font-medium">{s}</b>
            </span>
          ))}
        </div>
      </div>
      <span className="ab-url u-text-3">
        <L zh="全文见 rustfs.com 博客" en="Read it on the rustfs.com blog" />
      </span>
    </div>
  )
}

/** 10 · Feature round-up */
export function PortraitFeatures() {
  const rows: [Parameters<typeof Icon>[0]["name"], ReactNode, "a" | "p" | "o"][] = [
    ["shard", <L key="1" zh="纠删码 · 位腐烂保护" en="Erasure coding · bitrot protection" />, "a"],
    ["heal", <L key="2" zh="自愈" en="Healing" />, "a"],
    ["lock", <L key="4" zh="版本控制 · 对象锁定（WORM）" en="Versioning · Object Lock (WORM)" />, "a"],
    ["key", <L key="5" zh="SSE / KMS 加密" en="SSE / KMS encryption" />, "a"],
    ["replicate", <L key="6" zh="桶复制 · 站点复制" en="Bucket and site replication" />, "a"],
    ["tier", <L key="7" zh="生命周期 · 分层" en="Lifecycle · tiering" />, "a"],
    ["user", "IAM · OIDC", "a"],
    ["table", "S3 Tables · Iceberg REST", "p"],
    ["terminal", "SFTP · Swift API", "o"],
  ]
  const status = { a: <L zh="可用" en="Available" />, p: <L zh="预览" en="Preview" />, o: <L zh="可选构建" en="Opt-in" /> }
  return (
    <div className="ab-frame">
      <Head label={<><L zh="功能盘点" en="Round-up" /> · <b>2026-10</b></>} />
      <H className="u-text-8.5" zhClass="leading-[1.18]" enClass="leading-[1.02]" zh="RustFS 1.0 功能一览" en="What’s in RustFS 1.0" />
      <ul className="m-0 grid list-none border-t border-ab-line p-0">
        {rows.map(([icon, name, s], i) => (
          <li key={i} className="grid grid-cols-[calc(var(--u)*7)_1fr_auto] items-center border-b border-ab-line u-py-1.5 u-text-3.5">
            <Icon name={icon} className="u-size-4.5 text-ab-brand" />
            <span>{name}</span>
            <Tag accent={s === "p"} className={cn(s === "p" && "text-ab-fg")}>
              {status[s]}
            </Tag>
          </li>
        ))}
      </ul>
      <span className="font-mono u-text-2.5 text-ab-muted">
        <L zh="功能状态以 RustFS 官方文档为准 · 2026-10" en="Status per the official RustFS documentation · 2026-10" />
      </span>
    </div>
  )
}

/* ============================== Carousel · 1080 × 1350 · EC 4+2 ============================== */

const STRIPES = [0, 1, 2]
const DRIVES = [0, 1, 2, 3, 4, 5]
const shard = (x: number, y: number) => {
  const pos = (((x - y) % 6) + 6) % 6
  return pos >= 4 ? { p: true, name: `P${pos - 3}` } : { p: false, name: `D${pos + 1}` }
}

function EcGrid({ state }: { state: "empty" | "full" | "lost" | "rebuilt" }) {
  const lost = [1, 4]
  return (
    <div className="grid grid-cols-6 u-gap-2">
      {DRIVES.map((x) => {
        const isLost = lost.includes(x)
        const dashed = state === "empty" || (state === "lost" && isLost)
        const ring = state === "rebuilt" && isLost
        return (
          <div key={x} className="grid u-gap-1.5">
            <div className="grid u-gap-1.5" style={ring ? ({ outline: "calc(var(--u) * 0.45) solid var(--ab-fg)", outlineOffset: "calc(var(--u) * 0.8)" } as CSSProperties) : undefined}>
              {STRIPES.map((y) => {
                const s = shard(x, y)
                return dashed ? (
                  <i key={y} className="grid u-h-9 items-end border-[calc(var(--u)*0.2)] border-dashed border-ab-muted u-p-1.25 font-mono u-text-2.5 leading-none text-ab-muted not-italic opacity-80">
                    {state === "lost" ? s.name : ""}
                  </i>
                ) : (
                  <i key={y} className={cn("grid u-h-9 items-end u-p-1.25 font-mono u-text-2.5 leading-none font-medium not-italic", s.p ? "bg-ab-parity text-white" : "bg-ab-data text-ab-on-data")}>
                    {s.name}
                  </i>
                )
              })}
            </div>
            <span className={cn("u-mt-1 flex items-center u-gap-1 font-mono u-text-2.25 leading-none tracking-[0.04em]", (state === "lost" || state === "rebuilt") && isLost ? "font-medium text-ab-fg" : "text-ab-muted")}>
              {state === "lost" && isLost ? <Icon name="close" className="u-size-2.75" strokeWidth={2.5} /> : state === "rebuilt" && isLost ? <Icon name="check" className="u-size-2.75" strokeWidth={2.5} /> : <Icon name="drive" className="u-size-2.75" />}
              {state === "lost" && isLost ? <L zh="离线" en="DOWN" /> : state === "rebuilt" && isLost ? <L zh="已修复" en="HEALED" /> : `0${x + 1}`}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Slide({ n, title, body, top, state }: { n: 1 | 2 | 3 | 4; title: ReactNode; body: ReactNode; top: ReactNode; state: "empty" | "full" | "lost" | "rebuilt" }) {
  return (
    <>
      <div className="ab-frame">
        <Head label={<><L zh="纠删码" en="Erasure coding" /> · <b>{n} / 4</b></>} />
        <div className="grid u-gap-4">
          <p className="ab-body m-0 u-text-3.75 max-w-[24em] [text-wrap:balance]">{body}</p>
          <div className="flex items-center u-gap-4">
            <div className="grid flex-1 grid-cols-4 u-gap-1">
              {[1, 2, 3, 4].map((i) => (
                <i key={i} className={cn("block u-h-0.75", i <= n ? "bg-ab-fg" : "bg-ab-line")} />
              ))}
            </div>
            <span className="ab-label u-text-2.5">{n < 4 ? <L zh="滑动查看下一步 →" en="Swipe for the next step →" /> : "docs.rustfs.com"}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-[calc(var(--u)*17)] right-(--m) left-(--m)">{title}</div>
      <div className="absolute top-[calc(var(--u)*40)] right-(--m) left-(--m) grid u-h-50 content-end u-gap-4">
        {top}
        <EcGrid state={state} />
      </div>
    </>
  )
}

const slideTitle = (zh: ReactNode, en: ReactNode) => <H className="u-text-7.5 max-w-[14em]" zhClass="leading-[1.3]" enClass="leading-[1.06]" zh={zh} en={en} />
const Legend = () => (
  <div className="flex u-gap-5 font-mono u-text-2.5 text-ab-fg-2">
    <span className="inline-flex items-center u-gap-1.5"><i className="block u-size-2 bg-ab-data" /><L zh="数据分片 ×4" en="Data shard ×4" /></span>
    <span className="inline-flex items-center u-gap-1.5"><i className="block u-size-2 bg-ab-parity" /><L zh="校验分片 ×2" en="Parity shard ×2" /></span>
  </div>
)

export function Carousel1() {
  return (
    <Slide
      n={1}
      state="empty"
      title={slideTitle(<>坏了两块盘，<br />数据为什么还在？</>, "Two drives fail. Why is the data still there?")}
      top={
        <div className="grid u-gap-2">
          <div className="flex u-h-9 items-center justify-between bg-ab-fg u-px-3 font-mono u-text-2.75 font-medium text-ab-bg">
            <span className="inline-flex items-center u-gap-2"><Icon name="object" className="u-size-4" /><L zh="一个对象" en="One object" /></span>
            <span className="opacity-70"><L zh="→ 6 块盘" en="→ 6 drives" /></span>
          </div>
        </div>
      }
      body={<L zh="以 EC 4+2 为例：一个对象写入一组 6 块盘。" en="Take EC 4+2: one object is written across a set of six drives." />}
    />
  )
}
export function Carousel2() {
  return (
    <Slide
      n={2}
      state="full"
      title={slideTitle("先把对象切成分片", "First, the object is cut into shards")}
      top={<Legend />}
      body={<L zh="4 个数据分片加 2 个校验分片，每块盘存放一个；校验分片的位置逐条带轮转。" en="Four data shards plus two parity shards, one per drive. Parity moves to a different drive with every stripe." />}
    />
  )
}
export function Carousel3() {
  return (
    <Slide
      n={3}
      state="lost"
      title={slideTitle("任意两块盘损坏", "Any two drives can fail")}
      top={
        <div className="font-mono u-text-2.5 text-ab-fg-2">
          <L zh="每个条带仍剩 4 个分片" en="Every stripe still has four shards" />
        </div>
      }
      body={<L zh="剩下的任意 4 个分片足以还原完整对象，读取不受影响。" en="Any four remaining shards are enough to reconstruct the whole object, so reads keep working." />}
    />
  )
}
export function Carousel4() {
  return (
    <Slide
      n={4}
      state="rebuilt"
      title={slideTitle("换盘之后，分片自动重建", "New drives, rebuilt shards")}
      top={
        <div className="font-mono u-text-2.5 text-ab-fg-2">
          <L zh="由剩余分片重新计算 → 写回新盘" en="Recomputed from the survivors → new drives" />
        </div>
      }
      body={<L zh="更换磁盘后，RustFS 用剩余分片重新计算丢失的分片，并写回新盘。" en="Once the drives are replaced, RustFS recomputes the missing shards from the survivors and writes them back." />}
    />
  )
}

/* ============================== Vertical · 1080 × 1920 ============================== */

/** 14 · Story / event poster */
export function StoryLive() {
  return (
    <>
      <ShardMatrix className="absolute inset-x-0 top-0 !h-[calc(var(--u)*32)] !w-full" cols={10} rows={3} k={4} m={2} seed={17} mode="tone" fade="b" fit="slice" gap={0.22} />
      <div className="ab-frame top-[calc(var(--u)*39)] bottom-[calc(var(--u)*35)]">
        <div className="grid u-gap-5">
          <span className="ab-label inline-flex items-center u-gap-2 u-text-3.25 text-ab-fg">
            <i className="block u-size-2.5 bg-ab-accent" />
            <L zh="直播预告" en="Livestream" />
          </span>
          <H className="u-text-11.5" zhClass="leading-[1.16]" enClass="ab-display leading-[0.92] tracking-[-0.03em]" zh={<>RustFS 1.0<br />架构解读</>} en={<>Inside<br />RustFS 1.0</>} />
        </div>
        <div className="grid u-gap-3 border-t border-ab-line u-pt-5">
          <b className="ab-num u-text-15 leading-[0.8]">MM.DD</b>
          <span className="font-mono u-text-4 leading-none font-medium tracking-[0.04em]">
            HH:MM <span className="text-ab-muted"><L zh="北京时间" en="UTC" /></span>
          </span>
        </div>
        <div className="grid u-gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="grid grid-cols-[calc(var(--u)*9)_1fr] items-center u-gap-3">
              <span className="grid u-size-9 place-items-center border border-dashed border-ab-muted font-mono u-text-1.75 tracking-[0.06em] text-ab-muted uppercase">
                <L zh="照片" en="Photo" />
              </span>
              <span className="grid u-gap-1">
                <b className="u-text-4 leading-tight font-semibold"><Ph><L zh="演讲者姓名" en="Speaker name" /></Ph></b>
                <span className="font-mono u-text-2.75 text-ab-muted"><L zh="职务 · 所属机构" en="Role · Organisation" /></span>
              </span>
            </div>
          ))}
        </div>
        <div className="ab-row items-end">
          <Wordmark className="ab-logo u-h-5" />
          <span className="ab-url u-text-3">rustfs.com</span>
        </div>
      </div>
      <Guide className="inset-x-0 top-0 h-[250px]" label={<L zh="平台界面 · 顶部 250px 不放文字" en="Platform UI · no text in the top 250px" />} labelClass="bottom-0 left-0" />
      <Guide className="inset-x-0 bottom-0 h-[340px]" label={<L zh="平台界面 · 底部 340px 不放文字" en="Platform UI · no text in the bottom 340px" />} labelClass="top-0 left-0" />
    </>
  )
}

/** 15 · Xiaohongshu note cover (Chinese only) */
export function XhsCover() {
  return (
    <div className="ab-frame">
      <Head label={<>教程 · <b>附命令</b></>} />
      <h3 className="m-0 grid">
        <span className="flex items-end u-gap-4">
          <span className="ab-num u-text-36 leading-[0.74] tracking-[-0.05em] text-ab-brand">3</span>
          <span className="ab-zh u-text-11 leading-none">条命令，</span>
        </span>
        <span className="ab-zh u-mt-4 u-text-11 leading-[1.2]">
          在本机跑起
          <br />
          RustFS
        </span>
      </h3>
      <div className="grid u-gap-4">
        <div className="ab-term">
          <pre className="m-0 u-px-3 u-py-3 font-mono u-text-2.75 leading-[1.65] whitespace-pre-wrap">
            <span className="pr">$</span> mkdir -p data logs
            {"\n"}<span className="pr">$</span> chown -R 10001:10001 data logs
            {"\n"}<span className="pr">$</span> docker run -d -p 9000:9000 -p 9001:9001 \
            {"\n"}{"    "}-v $(pwd)/data:/data -v $(pwd)/logs:/logs \
            {"\n"}{"    "}rustfs/rustfs:latest
            {"\n\n"}<span className="dim"># S3 API  </span><span className="ok">http://localhost:9000</span>
            {"\n"}<span className="dim"># 控制台  </span><span className="ok">http://localhost:9001</span>
          </pre>
        </div>
        <span className="ab-url u-text-3">完整步骤：docs.rustfs.com</span>
      </div>
    </div>
  )
}

/** 16 · WeChat Moments poster (Chinese only) */
export function MomentsPoster() {
  return (
    <div className="ab-frame">
      <Wordmark className="ab-logo u-h-5.5" />
      <div className="grid u-gap-6">
        <h3 className="ab-zh m-0 u-text-9 leading-[1.22]">
          AI 时代的基建，
          <br />
          从每一个字节算起。
        </h3>
        <p className="ab-body m-0 u-text-4.25 leading-[1.6]">
          以 Rust 构建的分布式对象存储。
          <br />
          兼容 S3 · Apache 2.0 开源 · 自托管
        </p>
      </div>
      <ShardMatrix className="!h-[calc(var(--u)*54)] !w-full" cols={6} rows={8} k={4} m={2} seed={3} missing={3} gap={0.2} fit="slice" />
      <div className="grid grid-cols-[auto_1fr] items-center u-gap-5 border-t border-ab-line u-pt-5">
        <div className="bg-white u-p-1.5">
          <QR value="https://rustfs.com" quiet={1} className="u-size-23 text-neutral-950" />
        </div>
        <div className="grid u-gap-2">
          <b className="u-text-4.5 leading-tight font-semibold">长按识别二维码</b>
          <span className="ab-url u-text-3.25">访问 rustfs.com</span>
          <span className="font-mono u-text-2.5 text-ab-muted">1.0.0 正式版 · 2026-09-16 发布</span>
        </div>
      </div>
    </div>
  )
}
