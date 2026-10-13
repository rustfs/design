import type { ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { LiveMatrix } from "@/components/brand/matrix-live"
import { ShardMatrix } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import type { IconName } from "@/lib/icons"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/* Desktop artboards are 1440 × 900 (1u = 9px); phone artboards 390 × 844 (1u = 3.9px).
   The 1240px content column is drawn as an 11u side inset. */

const INSTALL = "curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh"

function Logo({ className }: { className?: string }) {
  return (
    <span className="block shrink-0">
      <Wordmark className={cn("ab-logo", className)} />
    </span>
  )
}

function Btn({ kind = "primary", size = "lg", children, className }: { kind?: "primary" | "outline" | "ghost"; size?: "lg" | "md" | "band" | "phone"; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap",
        size === "lg" && "u-h-5.5 u-gap-1 u-px-2.75 u-text-1.75",
        size === "md" && "u-h-4.5 u-gap-0.75 u-px-2 u-text-1.5",
        size === "band" && "u-h-6 u-gap-1 u-px-3 u-text-2",
        size === "phone" && "u-h-12.25 u-gap-2 u-px-5 u-text-4",
        kind === "primary" && "bg-ab-data text-ab-on-data",
        kind === "outline" && "border border-ab-line text-ab-fg",
        kind === "ghost" && "text-ab-fg-2",
        className,
      )}
    >
      {children}
    </span>
  )
}

const NAV_LINKS: [string, string][] = [
  ["产品", "Product"],
  ["文档", "Docs"],
  ["博客", "Blog"],
  ["社区", "Community"],
]

function DeskNav({ active }: { active?: number }) {
  return (
    <div className="relative flex u-h-8 items-center u-gap-6 border-b border-ab-line u-px-11">
      <Logo className="u-h-2.25" />
      <div className="flex u-gap-3.5 u-text-1.75 text-ab-fg-2">
        {NAV_LINKS.map(([zh, en], i) => (
          <span key={en} className={cn(i === active && "font-medium text-ab-fg")}>
            <L zh={zh} en={en} />
          </span>
        ))}
      </div>
      <div className="ml-auto flex items-center u-gap-3 u-text-1.75">
        <span className="font-mono u-text-1.5 text-ab-muted">中 / EN</span>
        <span className="flex items-center u-gap-0.5 text-ab-fg-2">
          GitHub <Icon name="arrow-up-right" className="u-size-1.75" />
        </span>
        <Btn size="md">
          <Icon name="download" className="u-size-1.75" />
          <L zh="下载" en="Download" />
        </Btn>
      </div>
    </div>
  )
}

function PhoneNav() {
  return (
    <div className="flex u-h-14 items-center justify-between border-b border-ab-line u-px-5">
      <Logo className="u-h-4.25" />
      <Icon name="menu" className="u-size-6" />
    </div>
  )
}

function Announce({ phone }: { phone?: boolean }) {
  return (
    <div className={cn("flex items-center bg-[#06070B] text-white", phone ? "u-h-10 u-gap-2.5 u-px-5 u-text-3.25" : "u-h-4.5 u-gap-1.5 u-px-11 u-text-1.5")}>
      <Stripe className={phone ? "u-text-1.5" : "u-text-0.75"} />
      <span className="font-medium">
        <L zh="RustFS 1.0.1 现已发布" en="RustFS 1.0.1 is available" />
      </span>
      <Icon name="arrow-right" className={phone ? "u-size-3.5" : "u-size-1.5"} />
      {!phone && (
        <span className="ml-auto font-mono u-text-1.25 text-[#9AA0AC]">
          <L zh="更新说明 · github.com/rustfs/rustfs/releases" en="Release notes · github.com/rustfs/rustfs/releases" />
        </span>
      )}
    </div>
  )
}

function Term({ children, className, copy = true }: { children: ReactNode; className?: string; copy?: boolean }) {
  return (
    <div className={cn("ab-term flex min-w-0 items-stretch", className)}>
      <div className="flex min-w-0 flex-1 items-center overflow-hidden whitespace-nowrap">{children}</div>
      {copy && (
        <span className="grid shrink-0 place-items-center border-l border-ab-line text-ab-muted [aspect-ratio:1]">
          <Icon name="copy" className="w-[42%]" />
        </span>
      )}
    </div>
  )
}

function Label({ children, className, phone }: { children: ReactNode; className?: string; phone?: boolean }) {
  return <span className={cn("ab-label", phone ? "u-text-3" : "u-text-1.5", className)}>{children}</span>
}

/* ------------------------------------------------------------------ */

export function PageSectionTemplates() {
  return (
    <TemplateGrid
      filters={[
        { id: "all", label: t("全部 14", "All 14") },
        { id: "hero", label: t("首屏 4", "Hero 4") },
        { id: "content", label: t("内容区块 6", "Content 6") },
        { id: "page", label: t("整页 4", "Full page 4") },
        { id: "phone", label: t("手机 390 3", "Phone 390 3") },
      ]}
    >
      {/* 1 · Hero A */}
      <Template
        title={t("首屏 A · 标语与分片矩阵", "Hero A · line and shard matrix")}
        spec={t("1440 × 900 · rustfs.com 首页", "1440 × 900 · rustfs.com home")}
        w={1440}
        h={900}
        themes={["ink", "paper", "white"]}
        tags={["hero"]}
        file="web-hero-a"
        note={t(
          <>
            <b>用途：</b>官网首页首屏。左侧依次为标签、标语、一句话定位、两个按钮与安装命令；右侧分片矩阵以修复动效持续运行。主按钮仅一个，次按钮使用描边样式；安装命令取自 README，可一键复制。
          </>,
          <>
            <b>Use:</b> the home page hero. On the left: label, line, one-sentence positioning, two buttons and the install command; on the right the shard matrix runs the heal motion. One primary button only, the second is outlined; the install command comes from the README and copies in one click.
          </>,
        )}
      >
        <Announce />
        <DeskNav />
        <LiveMatrix className="absolute top-[calc(var(--u)*20.5)] right-[calc(var(--u)*11)] bottom-[calc(var(--u)*9)] left-[56%] [&>svg]:h-full" cols={14} rows={12} k={12} m={4} seed={11} mode="tone" fade="bl" gap={0.24} fit="right" missing={2} heal interval={2200} />
        <div className="absolute top-[calc(var(--u)*12.5)] bottom-0 u-left-11 grid w-[48%] content-center u-gap-4">
          <Label>
            <L zh="开源对象存储" en="Open-source object storage" /> · <b>Apache 2.0</b>
          </Label>
          <h2>
            <L zh={<span className="ab-zh block u-text-8.25 leading-[1.14]">每一个字节，<br />都有着落。</span>} en={<span className="ab-display block u-text-8.25 leading-[0.98]">Every byte,<br />accounted for.</span>} />
          </h2>
          <p className="ab-body u-text-2 max-w-[34em]">
            <L zh={<>RustFS 是以 Rust 构建、兼容 S3 的分布式对象存储。<br />纠删码、位腐烂检测与自愈内建于每一次写入。</>} en="RustFS is distributed object storage built in Rust and compatible with S3. Erasure coding, bitrot detection and healing are built into every write." />
          </p>
          <div className="flex u-gap-1.5 u-mt-1">
            <Btn>
              <L zh="开始使用" en="Get started" />
              <Icon name="arrow-right" className="u-size-2" />
            </Btn>
            <Btn kind="outline">
              <L zh="阅读文档" en="Read the docs" />
            </Btn>
          </div>
          <Term className="u-mt-1 u-h-5.5 max-w-[calc(var(--u)*76)] u-text-1.5">
            <span className="pr u-px-2">$</span>
            <span className="truncate">{INSTALL}</span>
          </Term>
        </div>
      </Template>

      {/* 2 · Hero B */}
      <Template
        title={t("首屏 B · Signal 底色宣言", "Hero B · Signal statement")}
        spec={t("1440 × 900 · 发布页、活动页", "1440 × 900 · launch and campaign pages")}
        w={1440}
        h={900}
        themes={["signal", "ink"]}
        tags={["hero"]}
        file="web-hero-b"
        note={t(
          <>
            <b>用途：</b>版本发布与活动落地页。以三句短陈述占满首屏，下方给出可核实的事实与唯一的行动按钮。Signal 底色上主按钮为白底蓝字，条带签名中的校验块为 Ink。
          </>,
          <>
            <b>Use:</b> release and campaign landing pages. Three short statements fill the screen, with verifiable facts and a single call to action underneath. On Signal the primary button is white with blue text, and the parity shards of the stripe signature are Ink.
          </>,
        )}
      >
        <DeskNav />
        <div className="absolute top-[calc(var(--u)*8)] right-0 bottom-0 left-0 grid grid-rows-[1fr_auto] u-px-11 u-pb-9">
          <div className="flex items-center justify-between u-gap-6">
            <h2>
              <L
                zh={<span className="ab-zh block u-text-12 leading-[1.08]">兼容 S3。<br />Rust 构建。<br />开源。</span>}
                en={<span className="ab-display block u-text-11 leading-[0.94]">S3-compatible.<br />Built in Rust.<br />Open source.</span>}
              />
            </h2>
            <span className="grid grid-cols-2 u-gap-1.5 self-center" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <i key={i} className={cn("block u-size-7", i < 4 ? "bg-ab-data" : "bg-ab-parity")} />
              ))}
            </span>
          </div>
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-end border-t border-ab-line">
            {[
              [<L key="a" zh="许可" en="License" />, "Apache 2.0"],
              [<L key="b" zh="最新版本" en="Latest release" />, "1.0.1"],
              [<L key="c" zh="正式版发布" en="GA since" />, "2026-09-16"],
            ].map(([k, v], i) => (
              <div key={i} className={cn("grid u-gap-1 u-pt-2.5 u-pr-4", i > 0 && "border-l border-ab-line u-pl-3")}>
                <span className="ab-label u-text-1.5">{k}</span>
                <b className="ab-num u-text-3.5">{v}</b>
              </div>
            ))}
            <div className="flex items-center u-gap-3 u-pl-4">
              <Btn>
                <Icon name="download" className="u-size-2" />
                <L zh="下载 1.0.1" en="Download 1.0.1" />
              </Btn>
              <span className="flex items-center u-gap-0.75 u-text-1.75 font-medium underline decoration-1 underline-offset-[0.3em]">
                <L zh="发布说明" en="Release notes" />
              </span>
            </div>
          </div>
        </div>
      </Template>

      {/* 3 · Phone heroes and 404 */}
      <Template
        span={4}
        title={t("首屏 A · 手机", "Hero A · phone")}
        spec="390 × 844"
        w={390}
        h={844}
        themes={["ink", "paper", "white"]}
        tags={["hero", "phone"]}
        file="web-hero-a-phone"
        note={t("按钮通栏、高 48px；安装命令单行显示并可横向滚动；矩阵移至底部。", "Buttons run full width at 48px; the install command stays on one line and scrolls; the matrix moves to the bottom.")}
      >
        <Announce phone />
        <PhoneNav />
        <div className="grid u-gap-5 u-px-5 u-pt-9">
          <Label phone>
            <L zh="开源对象存储" en="Open-source object storage" /> · <b>Apache 2.0</b>
          </Label>
          <h2>
            <L zh={<span className="ab-zh block u-text-11 leading-[1.16]">每一个字节，<br />都有着落。</span>} en={<span className="ab-display block u-text-9.5 leading-[1]">Every byte, accounted for.</span>} />
          </h2>
          <p className="ab-body u-text-4">
            <L zh="以 Rust 构建、兼容 S3 的分布式对象存储。" en="Distributed object storage built in Rust and compatible with S3." />
          </p>
          <div className="grid u-gap-2.5">
            <Btn size="phone">
              <L zh="开始使用" en="Get started" />
              <Icon name="arrow-right" className="u-size-4.5" />
            </Btn>
            <Btn size="phone" kind="outline">
              <L zh="阅读文档" en="Read the docs" />
            </Btn>
          </div>
          <Term className="u-h-12.25 u-text-3.25">
            <span className="pr u-px-3.5">$</span>
            <span className="truncate">{INSTALL}</span>
          </Term>
        </div>
        <ShardMatrix className="absolute right-0 bottom-0 left-0 !h-[22%] !w-full" cols={16} rows={6} k={14} m={2} shift={-1} seed={11} mode="tone" fade="t" gap={0.24} fit="slice" />
      </Template>

      <Template
        span={4}
        title={t("首屏 B · 手机", "Hero B · phone")}
        spec="390 × 844"
        w={390}
        h={844}
        themes={["signal", "ink"]}
        tags={["hero", "phone"]}
        file="web-hero-b-phone"
        note={t("三句陈述保持三行；事实改为纵向列表；唯一按钮通栏。", "The three statements keep three lines; facts become a vertical list; the single button runs full width.")}
      >
        <PhoneNav />
        <div className="absolute top-[calc(var(--u)*14)] right-0 bottom-0 left-0 grid grid-rows-[1fr_auto] u-px-5 u-pb-6">
          <div className="grid content-center u-gap-6">
            <span className="flex u-gap-1.25" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <i key={i} className={cn("block u-size-4", i < 4 ? "bg-ab-data" : "bg-ab-parity")} />
              ))}
            </span>
            <h2>
              <L
                zh={<span className="ab-zh block u-text-12.5 leading-[1.12]">兼容 S3。<br />Rust 构建。<br />开源。</span>}
                en={<span className="ab-display block u-text-8.75 leading-[1]">S3-compatible.<br />Built in Rust.<br />Open source.</span>}
              />
            </h2>
          </div>
          <div className="grid u-gap-5">
            <div className="grid border-t border-ab-line">
              {[
                [<L key="a" zh="许可" en="License" />, "Apache 2.0"],
                [<L key="b" zh="最新版本" en="Latest release" />, "1.0.1"],
                [<L key="c" zh="正式版发布" en="GA since" />, "2026-09-16"],
              ].map(([k, v], i) => (
                <div key={i} className="flex items-baseline justify-between border-b border-ab-line u-py-2.75">
                  <span className="ab-label u-text-3">{k}</span>
                  <b className="font-mono u-text-3.75 font-medium">{v}</b>
                </div>
              ))}
            </div>
            <Btn size="phone">
              <Icon name="download" className="u-size-4.5" />
              <L zh="下载 1.0.1" en="Download 1.0.1" />
            </Btn>
          </div>
        </div>
      </Template>

      <Template
        span={4}
        title={t("404 · 手机", "404 · phone")}
        spec="390 × 844"
        w={390}
        h={844}
        themes={["ink", "paper", "white"]}
        tags={["page", "phone"]}
        file="web-404-phone"
        note={t("分片数字位于上方；标题、说明与两个按钮贴近拇指可及的下半屏。", "The shard numerals sit on top; the title, text and both buttons stay in the lower half, within thumb reach.")}
      >
        <PhoneNav />
        <div className="absolute inset-x-0 top-[calc(var(--u)*14)] bottom-0 grid grid-rows-[1fr_auto] u-px-5 u-pt-10 u-pb-6">
          <Shard404 cell="u-size-7" gap="u-gap-1" digitGap="u-gap-6" className="self-start" />
          <div className="grid u-gap-5">
          <Label phone>
            404 · <b>NoSuchKey</b>
          </Label>
          <h2>
            <L zh={<span className="ab-zh block u-text-8 leading-[1.2]">此路径下没有对象。</span>} en={<span className="ab-head block u-text-8 leading-[1.06]">There is no object at this path.</span>} />
          </h2>
          <p className="ab-body u-text-4">
            <L zh={<>页面可能已移动或删除。<br />其他每一个字节，都有着落。</>} en="The page may have moved or been deleted. Every other byte is accounted for." />
          </p>
          <div className="grid u-gap-2.5">
            <Btn size="phone">
              <L zh="返回首页" en="Back to home" />
            </Btn>
            <Btn size="phone" kind="outline">
              <L zh="搜索文档" en="Search the docs" />
            </Btn>
          </div>
          </div>
        </div>
      </Template>

      {/* 4 · Feature grid */}
      <Template
        title={t("功能网格", "Feature grid")}
        spec="1440 × 900"
        w={1440}
        h={900}
        themes={["white", "paper", "ink"]}
        tags={["content"]}
        file="web-features"
        note={t(
          <>
            <b>用途：</b>功能介绍区块。六项能力以 1px 线框成 3 × 2 网格，每项一个图标、一个标题、一句说明。卡片之间不加阴影或侧边色条，悬停时边框变为前景色。
          </>,
          <>
            <b>Use:</b> capability sections. Six capabilities sit in a 3 × 2 grid drawn with 1px rules, each with one icon, one title and one sentence. No shadows or side rails between cards; on hover the border turns to the foreground colour.
          </>,
        )}
      >
        <div className="absolute inset-0 grid grid-rows-[auto_1fr] u-gap-6 u-px-11 u-py-9">
          <div className="grid grid-cols-[1.1fr_1fr] items-end u-gap-10">
            <div className="grid u-gap-2.5">
              <Label>
                <L zh="数据保护" en="Data protection" />
              </Label>
              <h2>
                <L zh={<span className="ab-zh block u-text-5 leading-[1.2]">数据保护内建于每一次写入</span>} en={<span className="ab-head block u-text-5">Data protection built into every write</span>} />
              </h2>
            </div>
            <p className="ab-body u-text-1.75 max-w-[34em]">
              <L zh="每个对象写入时即切分为数据块与校验块，并分散到纠删集中的各块盘。下列能力均为默认构建的一部分。" en="Every object is split into data and parity shards as it is written and spread across the drives of an erasure set. Each capability below ships in the default build." />
            </p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 border-t border-l border-ab-line">
            {(
              [
                ["shard", "纠删码", "Erasure coding", "对象切分为数据块与校验块；不超过校验块数量的盘故障时，对象仍可读取。", "Objects are split into data and parity shards; they stay readable while failures stay within the parity count.", "EC k+m"],
                ["shield", "位腐烂检测", "Bitrot detection", "读取时校验每个分片，发现静默损坏后从校验块恢复。", "Every shard is verified on read; silent corruption is repaired from parity.", "Checksums"],
                ["heal", "自愈", "Healing", "盘或节点恢复后，缺失的分片在后台重建。", "When a drive or node returns, missing shards are rebuilt in the background.", "Heal"],
                ["lock", "版本控制与对象锁定", "Versioning and Object Lock", "保留对象的历史版本；以 WORM 方式锁定，满足留存要求。", "Keep every version; lock objects as WORM to meet retention rules.", "WORM"],
                ["replicate", "复制", "Replication", "存储桶复制与站点复制，在集群之间保持数据同步。", "Bucket and site replication keep data in step across clusters.", "Bucket · Site"],
                ["tier", "生命周期与分层", "Lifecycle and tiering", "按规则使对象过期，或转储到其他存储层。", "Expire objects or transition them to another tier by rule.", "ILM"],
              ] as [IconName, string, string, string, string, string][]
            ).map(([icon, zh, en, dzh, den, tag], i) => (
              <div key={i} className={cn("relative grid content-start u-gap-8 border-r border-b border-ab-line u-p-3.5", i === 0 && "outline-2 -outline-offset-1 outline-ab-fg")}>
                <div className="flex items-start justify-between">
                  <Icon name={icon} className="u-size-4 text-ab-brand" />
                  <span className="font-mono u-text-1.25 tracking-[0.06em] text-ab-muted uppercase">{tag}</span>
                </div>
                <div className="grid u-gap-1.25">
                  <h3 className="flex items-center justify-between u-text-2.25 leading-tight font-semibold">
                    <L zh={zh} en={en} />
                    {i === 0 && <Icon name="arrow-right" className="u-size-2.25 translate-x-[calc(var(--u)*0.25)] text-ab-fg" />}
                  </h3>
                  <p className="ab-body u-text-1.75 max-w-[24em]">
                    <L zh={dzh} en={den} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Template>

      {/* 5 · Stats band (1440 × 800, 1u = 8px) */}
      <Template
        title={t("数据带", "Stats band")}
        spec={t("1440 × 800 · 数字须注明来源与日期", "1440 × 800 · figures carry a source and date")}
        w={1440}
        h={800}
        themes={["ink", "paper", "signal"]}
        tags={["content"]}
        file="web-stats"
        note={t(
          <>
            <b>用途：</b>社区与采用数据。只使用官方来源的数字，保留千分位或两位小数的缩写，并在区块内注明来源与统计日期。不得使用「领先」「最快」等表述。
          </>,
          <>
            <b>Use:</b> community and adoption figures. Use official figures only, keep thousands separators or a two-decimal abbreviation, and state the source and date inside the section. Words such as “leading” or “fastest” are not used.
          </>,
        )}
      >
        <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] u-px-12.5 u-py-10">
          <div className="grid grid-cols-[1.1fr_1fr] items-end u-gap-10">
            <div className="grid u-gap-3">
              <span className="ab-label u-text-1.75">
                <L zh="开源与社区" en="Open source" />
              </span>
              <h2>
                <L zh={<span className="ab-zh block u-text-6">在公开中构建</span>} en={<span className="ab-head block u-text-6">Built in the open</span>} />
              </h2>
            </div>
            <p className="ab-body u-text-2.25 max-w-[28em]">
              <L zh="RustFS 以 Apache 2.0 许可在 GitHub 上公开开发，任何人都可以阅读代码、提交问题与贡献补丁。" en="RustFS is developed in the open on GitHub under Apache 2.0; anyone can read the code, file issues and contribute patches." />
            </p>
          </div>
          <div className="grid grid-cols-4 content-center">
            {[
              ["34,869", <L key="a" zh="GitHub 星标" en="GitHub stars" />, <L key="a2" zh="仓库 rustfs/rustfs" en="Repository rustfs/rustfs" />],
              ["2.7M+", <L key="b" zh="实例" en="Instances" />, <L key="b2" zh="已部署的 RustFS 实例" en="Deployed RustFS instances" />],
              ["15.15M", <L key="c" zh="Docker 拉取" en="Docker pulls" />, <L key="c2" zh="镜像 rustfs/rustfs" en="Image rustfs/rustfs" />],
              ["7,094", <L key="d" zh="提交" en="Commits" />, <L key="d2" zh="主仓库提交数" en="Commits to the main repository" />],
            ].map(([v, k, d], i) => (
              <div key={i} className={cn("grid u-gap-2.5 border-t border-ab-line u-pt-3 u-pr-3", i > 0 && "border-l u-pl-3.5")}>
                <span className="ab-label u-text-1.75">{k}</span>
                <b className="ab-num u-text-7">{v}</b>
                <span className="u-text-2 text-ab-fg-2">{d}</span>
              </div>
            ))}
          </div>
          <div className="grid u-gap-3">
            <ShardMatrix className="!u-h-2 !w-full" cols={80} rows={1} k={12} m={4} seed={5} gap={0.4} fit="none" />
            <div className="ab-row">
              <span className="font-mono u-text-1.75 text-ab-muted">
                <L zh="数据来源：RustFS 官方网站。统计日期：2026-10-14。" en="Source: official RustFS website. As of 2026-10-14." />
              </span>
              <span className="ab-url u-text-1.75">github.com/rustfs/rustfs</span>
            </div>
          </div>
        </div>
      </Template>

      {/* 6 · Integrations */}
      <Template
        title={t("生态集成墙", "Integrations wall")}
        spec={t("1440 × 900 · 仅文字，不用第三方标志", "1440 × 900 · names as text, never third-party logos")}
        w={1440}
        h={900}
        themes={["white", "paper", "ink"]}
        tags={["content"]}
        file="web-integrations"
        note={t(
          <>
            <b>用途：</b>生态与集成区块。第三方产品只以文字列出，按用途标注类别，不得使用其标志、配色或字体，也不得暗示合作关系。区块底部须注明商标归属。
          </>,
          <>
            <b>Use:</b> ecosystem sections. Third-party products appear as text only, labelled by role; their logos, colours and typefaces are never used, and no partnership is implied. A trademark line closes the section.
          </>,
        )}
      >
        <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] u-gap-6 u-px-11 u-py-9">
          <div className="grid grid-cols-[1.1fr_1fr] items-end u-gap-10">
            <div className="grid u-gap-2.5">
              <Label>
                <L zh="生态" en="Ecosystem" />
              </Label>
              <h2>
                <L zh={<span className="ab-zh block u-text-5 leading-[1.2]">在现有技术栈中运行</span>} en={<span className="ab-head block u-text-5">Runs in the stack you already have</span>} />
              </h2>
            </div>
            <p className="ab-body u-text-1.75 max-w-[32em]">
              <L zh="凡支持 S3 API 的工具，均可将 RustFS 作为存储端点；部署与观测使用通用的开源工具。" en="Any tool that speaks the S3 API can use RustFS as its storage endpoint; deployment and observability use common open-source tools." />
            </p>
          </div>
          <div className="grid grid-cols-5 grid-rows-2 border-t border-l border-ab-line">
            {[
              ["Kubernetes", "部署", "Deploy"],
              ["Docker", "部署", "Deploy"],
              ["Prometheus", "指标", "Metrics"],
              ["Grafana", "看板", "Dashboards"],
              ["Nginx", "反向代理", "Proxy"],
              ["Spark", "计算", "Compute"],
              ["ClickHouse", "分析", "Analytics"],
              ["TensorFlow", "机器学习", "ML"],
              ["PostgreSQL", "数据库备份", "DB backup"],
              ["Kafka", "流处理", "Streaming"],
            ].map(([name, zh, en]) => (
              <div key={name} className="grid content-between border-r border-b border-ab-line u-p-3">
                <span className="font-mono u-text-1.5 tracking-[0.08em] text-ab-muted uppercase">
                  <L zh={zh} en={en} />
                </span>
                <span className="font-display u-text-3.25 leading-none font-[650] tracking-[-0.01em] [font-stretch:108%]">{name}</span>
              </div>
            ))}
          </div>
          <span className="font-mono u-text-1.5 text-ab-muted">
            <L zh="所列名称为其各自所有者的商标，仅用于说明兼容用途，不表示合作或认可关系。" en="Names listed are trademarks of their respective owners, used only to describe compatibility; no partnership or endorsement is implied." />
          </span>
        </div>
      </Template>

      {/* 7 · Comparison */}
      <Template
        title={t("对比区块", "Comparison block")}
        spec="1440 × 900"
        w={1440}
        h={900}
        themes={["white", "paper", "ink"]}
        tags={["content"]}
        file="web-compare"
        note={t(
          <>
            <b>用途：</b>选型对比。只比较可核实的事实，每一项均须有来源；对比对象一栏以虚线框留空，填写前须核对其官方文档。不使用打勾打叉的胜负表与最高级用语。
          </>,
          <>
            <b>Use:</b> evaluations. Compare verifiable facts only, each with a source; the alternative column is left as dashed placeholders and filled only after checking that product’s official documentation. No win–lose tick tables, no superlatives.
          </>,
        )}
      >
        <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] u-gap-6 u-px-11 u-py-9">
          <div className="grid u-gap-2.5">
            <Label>
              <L zh="对比" en="Comparison" />
            </Label>
            <h2>
              <L zh={<span className="ab-zh block u-text-5 leading-[1.2]">选型前，核对这些事实</span>} en={<span className="ab-head block u-text-5">Check these facts before you choose</span>} />
            </h2>
          </div>
          <div className="grid grid-cols-[0.8fr_1.1fr_1.1fr] grid-rows-[auto_repeat(6,1fr)] border-t border-ab-fg">
            <span className="u-py-2 font-mono u-text-1.5 tracking-[0.08em] text-ab-muted uppercase">
              <L zh="项目" en="Criterion" />
            </span>
            <span className="flex items-center u-gap-1.25 bg-ab-data u-px-2.5 u-py-2 u-text-2 font-semibold text-ab-on-data">RustFS</span>
            <span className="u-ml-1.5 border border-dashed border-ab-line u-px-2.5 u-py-2 font-mono u-text-1.5 tracking-[0.08em] text-ab-muted uppercase">
              <L zh="对比对象" en="Alternative" />
            </span>
            {[
              [<L key="1" zh="许可" en="License" />, "Apache License 2.0"],
              [<L key="2" zh="实现语言" en="Language" />, "Rust"],
              [<L key="3" zh="接口" en="API" />, <L key="3v" zh="兼容 S3" en="S3-compatible" />],
              [<L key="4" zh="数据保护" en="Data protection" />, <L key="4v" zh="纠删码、位腐烂检测、自愈" en="Erasure coding, bitrot detection, healing" />],
              [<L key="5" zh="遥测" en="Telemetry" />, <L key="5v" zh="无" en="None" />],
              [<L key="6" zh="部署方式" en="Deployment" />, <L key="6v" zh="二进制、Docker、Helm" en="Binary, Docker, Helm" />],
            ].map(([k, v], i) => (
              <div key={i} className="contents">
                <span className="flex items-center border-b border-ab-line u-py-2.25 u-text-2 text-ab-fg-2">{k}</span>
                <span className="flex items-center u-gap-1.5 border-b border-ab-line u-px-2.5 u-py-2.25 u-text-2.25 font-medium">
                  <i className="block u-size-1 shrink-0 bg-ab-data" />
                  {v}
                </span>
                <span className="u-ml-1.5 flex items-center border-b border-ab-line u-px-2.5 u-py-2.25">
                  <span className="border border-dashed border-ab-line u-px-1.25 u-py-0.5 font-mono u-text-1.25 tracking-[0.06em] text-ab-muted uppercase">
                    <L zh="待填：可核实的事实" en="To fill: verifiable fact" />
                  </span>
                </span>
              </div>
            ))}
          </div>
          <span className="font-mono u-text-1.5 text-ab-muted">
            <L zh="RustFS 一栏来源：github.com/rustfs/rustfs README。核对日期：2026-10-14。" en="RustFS column source: github.com/rustfs/rustfs README. Checked 2026-10-14." />
          </span>
        </div>
      </Template>

      {/* 8 · CTA band (1440 × 800, 1u = 8px) */}
      <Template
        title={t("行动号召带", "CTA band")}
        spec="1440 × 800"
        w={1440}
        h={800}
        themes={["signal", "ink", "paper"]}
        tags={["content"]}
        file="web-cta"
        note={t(
          <>
            <b>用途：</b>页面末尾的行动号召。一个标题、一组 README 中的命令、一个主按钮。终端中的注释说明结果，不得虚构程序输出。
          </>,
          <>
            <b>Use:</b> the call to action that closes a page. One title, one set of commands from the README, one primary button. Comments in the terminal state the result; program output is never invented.
          </>,
        )}
      >
        <div className="absolute inset-x-0 top-0 bottom-[calc(var(--u)*5)] grid grid-cols-[1.45fr_1fr] items-center u-gap-10 u-px-12.5">
          <div className="grid content-center u-gap-4">
            <span className="ab-label u-text-1.75">
              <L zh="快速开始" en="Quick start" />
            </span>
            <h2>
              <L zh={<span className="ab-zh block u-text-8 leading-[1.16]">在本地<br />运行 RustFS</span>} en={<span className="ab-display block u-text-8">Run RustFS on your machine</span>} />
            </h2>
            <p className="ab-body u-text-2.25 max-w-[24em]">
              <L zh="一个容器即可启动单节点实例。数据目录须对 UID 10001 可写。" en="One container starts a single-node instance. Data directories must be writable by UID 10001." />
            </p>
            <div className="flex items-center u-gap-3.5 u-mt-1.5">
              <Btn size="band">
                <L zh="阅读快速开始" en="Read the quick start" />
                <Icon name="arrow-right" className="u-size-2.25" />
              </Btn>
              <span className="ab-url u-text-2">github.com/rustfs/rustfs</span>
            </div>
          </div>
          <div className="ab-term">
            <div className="flex items-center u-gap-1 border-b border-ab-line u-px-2.5 u-py-2 font-mono u-text-1.75 text-ab-muted">
              <i className="block u-size-1.25 bg-current opacity-45" />
              <i className="block u-size-1.25 bg-current opacity-45" />
              <i className="block u-size-1.25 bg-current opacity-45" />
              <span className="u-ml-1">~/rustfs</span>
            </div>
            <pre className="m-0 u-px-3 u-py-3 font-mono u-text-1.75 leading-[1.8] whitespace-pre-wrap">
              <span className="dim">
                <L zh="# 创建数据与日志目录" en="# create data and log directories" />
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
              <span className="dim"># S3 API </span>
              <span className="ok">http://localhost:9000</span>
              {"\n"}
              <span className="dim"># Console </span>
              <span className="ok">http://localhost:9001</span>
            </pre>
          </div>
        </div>
        <ShardMatrix className="absolute inset-x-0 bottom-0 !u-h-3 !w-full" cols={120} rows={2} k={14} m={2} seed={14} mode="tone" gap={0.24} fit="slice" />
      </Template>

      {/* 9 · Footer */}
      <Template
        title={t("页脚", "Footer")}
        spec="1440 × 900"
        w={1440}
        h={900}
        themes={["ink", "paper", "white"]}
        tags={["content"]}
        file="web-footer"
        note={t(
          <>
            <b>用途：</b>全站页脚。上部为标语、订阅与四列链接；底部为整幅字标与法律信息。字标宽度与 1240px 内容栏一致，不得裁切。
          </>,
          <>
            <b>Use:</b> the site footer. Above: the line, newsletter sign-up and four link columns; below: the full-width wordmark and legal line. The wordmark spans the 1240px content column and is never cropped.
          </>,
        )}
      >
        <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] u-px-11 u-pt-9 u-pb-4">
          <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] u-gap-4">
            <div className="grid content-start u-gap-3 u-pr-6">
              <p className="u-text-2.75 leading-[1.3] font-semibold">
                <L zh={<>每一个字节，<br />都有着落。</>} en={<>Every byte,<br />accounted for.</>} />
              </p>
              <span className="u-mt-1 ab-label u-text-1.5">
                <L zh="订阅月报" en="Monthly newsletter" />
              </span>
              <div className="flex u-h-5 border border-ab-line">
                <span className="flex flex-1 items-center u-px-1.75 u-text-1.5 text-ab-muted">name@example.com</span>
                <span className="flex items-center bg-ab-data u-px-2 u-text-1.5 font-medium text-ab-on-data">
                  <L zh="订阅" en="Subscribe" />
                </span>
              </div>
            </div>
            {[
              [["产品", "Product"], [["功能", "Features"], ["下载", "Download"], ["控制台", "Console"], ["更新日志", "Changelog"]]],
              [["文档", "Docs"], [["快速开始", "Quick start"], ["安装", "Installation"], ["S3 兼容性", "S3 compatibility"], ["Helm Chart", "Helm chart"]]],
              [["社区", "Community"], [["GitHub", "GitHub"], ["讨论区", "Discussions"], ["博客", "Blog"], ["贡献指南", "Contributing"]]],
              [["法律", "Legal"], [["许可证", "License"], ["安全", "Security"], ["商标", "Trademarks"], ["隐私", "Privacy"]]],
            ].map(([[hzh, hen], links], i) => (
              <div key={i} className="grid content-start u-gap-1.75">
                <span className="ab-label u-mb-0.5 u-text-1.5">
                  <L zh={hzh as string} en={hen as string} />
                </span>
                {(links as string[][]).map(([zh, en]) => (
                  <span key={en} className="u-text-1.75 text-ab-fg-2">
                    <L zh={zh} en={en} />
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-end u-pb-3">
            <Wordmark className="h-auto w-full text-ab-logo" />
          </div>
          <div className="flex items-center justify-between border-t border-ab-line u-pt-2 font-mono u-text-1.5 text-ab-muted">
            <span>© 2026 RustFS · Apache License 2.0</span>
            <span className="flex items-center u-gap-3">
              <span>rustfs.com</span>
              <span>docs.rustfs.com</span>
              <span>github.com/rustfs/rustfs</span>
            </span>
          </div>
        </div>
      </Template>

      {/* 10 · Blog index */}
      <Template
        title={t("博客索引", "Blog index")}
        spec="1440 × 900"
        w={1440}
        h={900}
        themes={["white", "paper", "ink"]}
        tags={["page"]}
        file="web-blog"
        note={t(
          <>
            <b>用途：</b>博客列表页。最新的一篇占两栏，其余四栏等宽。每张卡片：封面图形、栏目与日期、标题；不放摘要、作者头像与阅读数。封面图形取自品牌图形或图标，不使用库存图片。
          </>,
          <>
            <b>Use:</b> the blog index. The latest post spans two columns; the rest sit in four equal columns. Each card carries a cover graphic, category and date, and the title; no excerpt, avatars or view counts. Covers use brand graphics or icons, never stock imagery.
          </>,
        )}
      >
        <DeskNav active={2} />
        <div className="absolute top-[calc(var(--u)*8)] right-0 bottom-0 left-0 grid grid-rows-[auto_1fr] u-gap-4 u-px-11 u-pt-6 u-pb-7">
          <div className="ab-row items-end">
            <h2>
              <L zh={<span className="ab-zh block u-text-6">博客</span>} en={<span className="ab-display block u-text-6">Blog</span>} />
            </h2>
            <div className="flex u-gap-1">
              {[
                ["全部", "All"],
                ["发布", "Release"],
                ["产品", "Product"],
                ["教程", "Tutorial"],
                ["案例", "Case study"],
                ["集成", "Integration"],
              ].map(([zh, en], i) => (
                <span key={en} className={cn("flex u-h-3.5 items-center border u-px-1.5 font-mono u-text-1.25 tracking-[0.06em] uppercase", i === 0 ? "border-ab-fg bg-ab-fg text-ab-bg" : "border-ab-line text-ab-fg-2")}>
                  <L zh={zh} en={en} />
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 content-start u-gap-x-3 u-gap-y-5">
            <BlogCard span cat={<L zh="发布" en="Release" />} date="2026-09-16" title={<L zh="RustFS 1.0.0 正式发布：生产可用、开源、兼容 S3 的对象存储" en="Announcing RustFS 1.0.0 GA: Production-Ready, Open Source, S3-Compatible Object Storage" />}>
              <div className="absolute inset-0 bg-ab-data" />
              <div className="absolute u-top-2 u-right-2 u-bottom-2 left-[46%] [--mx-data:var(--ab-on-data)] [--mx-empty:transparent] [--mx-parity:var(--ab-accent)]">
                <ShardMatrix cols={12} rows={4} k={10} m={2} seed={3} fit="right" gap={0.3} />
              </div>
              <span className="ab-display absolute u-bottom-2 u-left-2.5 u-text-7 text-ab-on-data">1.0</span>
            </BlogCard>
            <BlogCard cat={<L zh="产品" en="Product" />} date="2026-09-10" icon="table" title={<L zh="RustFS 推出 S3 Tables：开源对象存储中的 Apache Iceberg 表" en="RustFS Launches S3 Tables: Apache Iceberg Tables Inside an Open-Source Object Store" />} />
            <BlogCard cat={<L zh="教程" en="Tutorial" />} date="2026-08-19" icon="terminal" title={<L zh="分步教程：使用 RPM/DEB 软件包安装 RustFS" en="Step-by-Step Tutorial: How to Install RustFS with RPM/DEB Packages" />} />
            <BlogCard cat={<L zh="案例" en="Case study" />} date="2026-08-06" icon="chip" title={<L zh="借助 Nawāt 与 RustFS 管理 AI 微调存储" en="Managing AI Fine-Tuning Storage with Nawāt and RustFS" />} />
            <BlogCard cat={<L zh="集成" en="Integration" />} date="2026-08-04" icon="key" title={<L zh="GitLab 与 RustFS 集成：OIDC 单点登录与 S3 对象存储" en="GitLab and RustFS Integration: OIDC SSO and S3 Object Storage" />} />
            <BlogCard cat={<L zh="迁移指南" en="Migration" />} icon="migrate" title={<L zh="从 MinIO 迁移到 RustFS：技术指南" en="Migrating from MinIO to RustFS: A Technical Guide" />} />
            <BlogCard cat={<L zh="迁移指南" en="Migration" />} icon="replicate" title={<L zh="二进制替换：从 MinIO 迁移到 RustFS 的简便方式" en="Binary replacement: a simple way to migrate from MinIO to RustFS" />} />
          </div>
        </div>
      </Template>

      {/* 11 · 404 */}
      <Template
        title={t("404 页面", "404 page")}
        spec="1440 × 900"
        w={1440}
        h={900}
        themes={["ink", "paper", "white"]}
        tags={["page"]}
        file="web-404"
        note={t(
          <>
            <b>用途：</b>404 页面。数字由分片组成，其中一块缺失并以修复动效重建：页面找不到，数据不会丢。文案平实，给出两个出口。
          </>,
          <>
            <b>Use:</b> the 404 page. The numerals are built from shards; one is missing and rebuilt with the heal motion: the page is gone, the data is not. The copy is plain and offers two ways out.
          </>,
        )}
      >
        <DeskNav />
        <div className="absolute top-[calc(var(--u)*8)] right-0 bottom-0 left-0 grid grid-cols-[1fr_auto] items-center u-gap-10 u-px-11">
          <div className="grid content-center u-gap-4">
            <Label>
              404 · <b>NoSuchKey</b>
            </Label>
            <h2>
              <L zh={<span className="ab-zh block u-text-6.5 leading-[1.2]">此路径下<br />没有对象。</span>} en={<span className="ab-head block u-text-6.5 max-w-[11em]">There is no object at this path.</span>} />
            </h2>
            <p className="ab-body u-text-2 max-w-[26em]">
              <L zh={<>页面可能已移动或删除。<br />其他每一个字节，都有着落。</>} en="The page may have moved or been deleted. Every other byte is accounted for." />
            </p>
            <div className="flex u-gap-1.5 u-mt-1">
              <Btn>
                <L zh="返回首页" en="Back to home" />
              </Btn>
              <Btn kind="outline">
                <L zh="搜索文档" en="Search the docs" />
              </Btn>
            </div>
            <span className="u-mt-2 font-mono u-text-1.5 text-ab-muted">GET /docs/old-path · 404</span>
          </div>
          <Shard404 cell="u-size-6.5" gap="u-gap-1" digitGap="u-gap-6.5" className="self-center" />
        </div>
      </Template>

      {/* 12 · Docs */}
      <Template
        title={t("文档页布局", "Docs page layout")}
        spec={t("1440 × 900 · docs.rustfs.com", "1440 × 900 · docs.rustfs.com")}
        w={1440}
        h={900}
        themes={["white", "paper", "ink"]}
        tags={["page"]}
        file="web-docs"
        note={t(
          <>
            <b>用途：</b>文档站。左侧导航 270px，正文最大 72 字符宽，右侧本页目录 216px。当前页以方块标记与加粗表示，不使用左侧色条；代码块始终为 Ink 底色。
          </>,
          <>
            <b>Use:</b> the documentation site. Left navigation 270px, body text at most 72 characters wide, on-page contents 216px on the right. The current page is marked with a square and bold weight, never a coloured side rail; code blocks always sit on Ink.
          </>,
        )}
      >
        <div className="flex u-h-8 items-center u-gap-4 border-b border-ab-line u-px-4">
          <Logo className="u-h-2.25" />
          <span className="font-mono u-text-1.5 tracking-[0.06em] text-ab-muted uppercase">
            <L zh="文档" en="Docs" />
          </span>
          <span className="u-ml-6 flex u-h-4.5 u-w-44 items-center u-gap-1.25 border border-ab-line u-px-1.5 u-text-1.5 text-ab-muted">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className="u-size-1.75 shrink-0" aria-hidden="true">
              <path d="M10.75 4.25a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13zM15.5 15.5l4.75 4.75" />
            </svg>
            <L zh="搜索文档" en="Search the docs" />
            <span className="ml-auto border border-ab-line u-px-0.75 font-mono u-text-1.25">⌘K</span>
          </span>
          <span className="ml-auto flex items-center u-gap-3 u-text-1.75 text-ab-fg-2">
            <span className="flex u-h-3.75 items-center border border-ab-line u-px-1.25 font-mono u-text-1.25">v1.0.1</span>
            <span>
              中 / EN
            </span>
            <span className="flex items-center u-gap-0.5">
              GitHub <Icon name="arrow-up-right" className="u-size-1.75" />
            </span>
          </span>
        </div>
        <div className="absolute top-[calc(var(--u)*8)] right-0 bottom-0 left-0 grid grid-cols-[calc(var(--u)*30)_1fr_calc(var(--u)*24)]">
          <div className="grid content-start u-gap-3 border-r border-ab-line u-px-4 u-py-4">
            {[
              [["开始", "Get started"], [["概览", "Overview"], ["快速开始", "Quick start"]]],
              [["安装", "Installation"], [["Linux", "Linux"], ["Docker", "Docker"], ["Kubernetes", "Kubernetes"]]],
              [["概念", "Concepts"], [["纠删码", "Erasure coding"], ["自愈", "Healing"], ["版本控制", "Versioning"]]],
              [["管理", "Administration"], [["控制台", "Console"], ["身份与访问", "Identity and access"], ["生命周期", "Lifecycle"]]],
            ].map(([[hzh, hen], items], gi) => (
              <div key={gi} className="grid u-gap-0.5">
                <span className="u-mb-0.5 font-mono u-text-1.5 tracking-[0.08em] text-ab-muted uppercase">
                  <L zh={hzh as string} en={hen as string} />
                </span>
                {(items as string[][]).map(([zh, en]) => {
                  const on = en === "Linux"
                  return (
                    <span key={en} className={cn("flex items-center u-gap-1 u-py-0.5 u-text-1.75", on ? "font-semibold text-ab-fg" : "text-ab-fg-2")}>
                      <i className={cn("block u-size-0.75 shrink-0", on ? "bg-ab-data" : "bg-transparent")} />
                      <L zh={zh} en={en} />
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="grid content-start u-gap-2.5 overflow-hidden u-px-8 u-py-4">
            <span className="flex u-gap-1 font-mono u-text-1.5 text-ab-muted">
              <L zh="文档" en="Docs" /> / <L zh="安装" en="Installation" /> / <b className="font-medium text-ab-fg-2">Linux</b>
            </span>
            <h2>
              <L zh={<span className="ab-zh block u-text-4.25">在 Linux 上安装</span>} en={<span className="ab-head block u-text-4.25">Install on Linux</span>} />
            </h2>
            <p className="ab-body u-text-1.75 max-w-[44em]">
              <L zh="使用官方安装脚本在单台 Linux 主机上安装 RustFS，然后在浏览器中打开控制台。" en="Install RustFS on a single Linux host with the official script, then open the Console in a browser." />
            </p>
            <h3 className="u-mt-2 u-text-2.25 font-semibold">
              <L zh="一键安装" en="One-line install" />
            </h3>
            <Term className="u-h-5 u-text-1.5">
              <span className="pr u-px-2">$</span>
              <span className="truncate">{INSTALL}</span>
            </Term>
            <div className="grid grid-cols-[auto_1fr] u-gap-x-1.5 border border-ab-line bg-ab-panel u-px-2 u-py-1.75 u-text-1.5 leading-[1.6]">
              <i className="u-mt-0.5 block u-size-1.25 bg-ab-data" />
              <span className="text-ab-fg-2">
                <b className="font-mono u-text-1.25 font-medium tracking-[0.08em] text-ab-fg uppercase">
                  <L zh="说明" en="Note" />
                </b>{" "}
                <L zh="S3 API 默认监听 9000 端口，控制台为 9001。生产环境须使用你自己设定的访问密钥。" en="The S3 API listens on port 9000 by default and the Console on 9001. Production deployments must use access keys you set yourself." />
              </span>
            </div>
            <h3 className="u-mt-2 u-text-2.25 font-semibold">
              <L zh="访问控制台" en="Open the Console" />
            </h3>
            <p className="ab-body u-text-1.75 max-w-[36em]">
              <L zh="在浏览器中打开 http://localhost:9001，使用管理员凭据登录。" en="Open http://localhost:9001 in a browser and sign in with the administrator credentials." />
            </p>
            <div className="u-mt-2 grid grid-cols-2 u-gap-1.5">
              <span className="grid u-gap-0.5 border border-ab-line u-p-1.75">
                <span className="font-mono u-text-1.25 text-ab-muted">
                  ← <L zh="上一页" en="Previous" />
                </span>
                <b className="u-text-1.75 font-semibold">
                  <L zh="快速开始" en="Quick start" />
                </b>
              </span>
              <span className="grid u-gap-0.5 border border-ab-line u-p-1.75 text-right">
                <span className="font-mono u-text-1.25 text-ab-muted">
                  <L zh="下一页" en="Next" /> →
                </span>
                <b className="u-text-1.75 font-semibold">Docker</b>
              </span>
            </div>
          </div>
          <div className="grid content-start u-gap-1.25 u-py-4 u-pr-4">
            <span className="u-mb-0.5 font-mono u-text-1.5 tracking-[0.08em] text-ab-muted uppercase">
              <L zh="本页内容" en="On this page" />
            </span>
            {[
              ["一键安装", "One-line install"],
              ["访问控制台", "Open the Console"],
              ["下一步", "Next steps"],
            ].map(([zh, en], i) => (
              <span key={en} className={cn("flex items-center u-gap-1 u-text-1.5", i === 0 ? "font-medium text-ab-fg" : "text-ab-muted")}>
                <i className={cn("block u-size-0.75 shrink-0", i === 0 ? "bg-ab-data" : "bg-transparent")} />
                <L zh={zh} en={en} />
              </span>
            ))}
          </div>
        </div>
      </Template>
    </TemplateGrid>
  )
}

function BlogCard({ span, cat, date, title, icon, children }: { span?: boolean; cat: ReactNode; date?: string; title: ReactNode; icon?: IconName; children?: ReactNode }) {
  return (
    <div className={cn("grid min-w-0 content-start u-gap-1.75", span && "col-span-2")}>
      <div className="relative u-h-17 overflow-hidden border border-ab-line bg-ab-panel">
        {children ?? <Icon name={icon ?? "object"} strokeWidth={1.25} className="absolute top-1/2 left-1/2 u-size-5.5 -translate-x-1/2 -translate-y-1/2 text-ab-brand" />}
      </div>
      <div className="grid content-start u-gap-1">
        <span className="flex u-gap-1.5 font-mono u-text-1.25 tracking-[0.06em] text-ab-muted uppercase">
          <b className="font-medium text-ab-brand">{cat}</b>
          {date && <span>{date}</span>}
        </span>
        <h3 className={cn("leading-[1.3] font-semibold text-pretty", span ? "u-text-2.5 max-w-[26em]" : "u-text-1.75")}>{title}</h3>
      </div>
    </div>
  )
}

/* "404" set in 3 × 5 shard numerals; one shard drops out and heals. */
const DIGITS: Record<string, string> = {
  "4": "101101111001001",
  "0": "111101101101111",
}
function Shard404({ cell, gap, digitGap, className }: { cell: string; gap: string; digitGap: string; className?: string }) {
  return (
    <div className={cn("flex items-start", digitGap, className)} aria-hidden="true">
      {["4", "0", "4"].map((d, di) => (
        <div key={di} className={cn("grid grid-cols-3", gap)}>
          {DIGITS[d].split("").map((on, i) => {
            const heal = di === 1 && i === 9
            return <i key={i} className={cn("block", cell, on === "1" ? "bg-ab-data" : "outline-1 -outline-offset-1 outline-ab-line", heal && "animate-[rfs-heal_2880ms_steps(1)_infinite]")} />
          })}
        </div>
      ))}
    </div>
  )
}
