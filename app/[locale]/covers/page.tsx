import type { Metadata } from "next"
import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import { DoDont, Page, PageFooter, PageHeader, Section, Table } from "@/components/site/page"
import { isLocale, setLocale, t } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "文章封面" : "Article covers" }
}

const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" className={className} aria-hidden="true">
    <path d="M2 12h34M28 5l8 7-8 7" />
  </svg>
)

export default async function CoversPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/covers/"
        label="Templates · Article covers"
        title={t("文章封面", "Article covers")}
        subtitle={t("Article covers", "文章封面")}
        lede={t(
          "博客、微信公众号、技术社区与 Newsletter 的封面采用统一骨架：字标位于左上，栏目标签位于右上，标题占据左侧约三分之二，品牌图形位于右侧或底边。替换标题即可生成新封面，底色用于区分栏目。",
          "Covers for the blog, WeChat, developer communities and the newsletter share one skeleton: the wordmark top left, the category label top right, the title across the left two thirds and the brand graphic on the right or along the bottom edge. A new cover needs only a new title; the surface colour identifies the series.",
        )}
        meta={[
          { k: t("模板", "Templates"), v: "15" },
          { k: t("底色", "Surfaces"), v: "Ink / Paper / White / Signal" },
          { k: t("语言", "Languages"), v: "中 / EN" },
          { k: t("导出", "Export"), v: "PNG @2x" },
        ]}
      />

      <Section
        id="anatomy"
        tag="Anatomy"
        title={t("封面结构", "Four zones, fixed positions")}
        lede={
          <p>
            {t(
              "封面尺寸以 u 为单位，1u 等于画板短边的 1/100。安全边距为 7u，字标高 4.25u，标签字号 2.25u。不同尺寸的封面因此保持相同比例，品牌在各平台呈现一致。",
              "All measurements use u, one hundredth of the artboard's short side. The safe margin is 7u, the wordmark 4.25u tall and labels 2.25u. Covers of every size therefore keep the same proportions, and the brand reads the same on every platform.",
            )}
          </p>
        }
      >
        <TemplateGrid>
          <Template title={t("封面骨架", "Cover anatomy")} spec={t("1200 × 630 · 安全边距 7u · u = 6.3px", "1200 × 630 · 7u safe margin · u = 6.3px")} w={1200} h={630} file="cover-anatomy" langs={["en"]}>
            <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[36%]" cols={6} rows={12} k={4} m={2} seed={21} mode="tone" fit="slice" gap={0.22} />
            <div className="ab-frame right-[calc(36%+var(--m))]">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="ab-label">Release · <b>2026-10</b></span>
              </div>
              <div className="ab-display u-text-27 leading-[0.82] tracking-[-0.035em]">
                <small className="mb-[0.35em] ml-[0.12em] block text-[0.26em] leading-none tracking-[-0.01em] text-ab-brand">RustFS</small>1.0.1
              </div>
              <span className="ab-url">github.com/rustfs/rustfs/releases</span>
            </div>
            <div className="pointer-events-none absolute inset-(--m) outline outline-1 outline-dashed outline-oxide-500" />
            {[
              ["① Logo 4.25u", "left-[calc(var(--m)+var(--u)*24)] top-[calc(var(--m)+var(--u)*0.6)]"],
              ["② Label · date", "left-[calc(var(--m)+var(--u)*24)] top-[calc(var(--m)+var(--u)*5.8)]"],
              ["③ Title ≤ 64%", "left-[calc(var(--m)+var(--u)*72)] u-top-50"],
              ["④ Graphic: right 36% / bottom", "u-right-4 u-bottom-4"],
            ].map(([label, pos]) => (
              <span key={label} className={`absolute bg-neutral-950/85 px-[calc(var(--u)*0.9)] py-[calc(var(--u)*0.6)] font-mono u-text-2 leading-none tracking-[0.04em] text-oxide-500 ${pos}`}>
                {label}
              </span>
            ))}
          </Template>
        </TemplateGrid>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t("① 字标", "① Wordmark"), t("位于左上角，高 4.25u。Ink 与 Signal 底色上使用白色字标，浅色底色上使用 Signal Blue。", "Top left, 4.25u tall. White on Ink and Signal; Signal Blue on light surfaces.")],
            [t("② 标签", "② Label"), t("位于右上角，使用等宽大写：栏目 · 日期或阅读时长。每个封面仅设一个标签。", "Top right, in mono capitals: category · date or reading time. One label per cover.")],
            [t("③ 标题", "③ Title"), t("中文不超过 2 行、18 字；英文不超过 3 行。标题过长时缩小字号，不得压缩字距。", "Chinese: at most two lines and 18 characters. English: at most three lines. Long titles are set smaller; tracking is never tightened.")],
            [t("④ 图形", "④ Graphic"), t("使用分片矩阵或说明内容的示意图。不得使用与内容无关的插画、库存图片或 AI 生成图像。", "A shard matrix or a diagram that explains the content. Unrelated illustration, stock imagery and AI-generated images are not permitted.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid gap-1.5 border-t border-border pt-3 text-sm leading-relaxed text-subtle">
              <b className="font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">{k}</b>
              {v}
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="sizes"
        tag="Sizes"
        title={t("平台尺寸", "Sizes by platform")}
        lede={<p>{t("下表为各平台截至 2026 年 10 月的推荐尺寸。平台规则可能调整，发布前应在平台预览中确认裁切效果。", "Recommended sizes for each platform as of October 2026. Platform rules change; confirm the crop in the platform preview before publishing.")}</p>}
      >
        <Table
          mono={[1, 2]}
          head={[t("用途", "Use"), t("画板", "Artboard"), t("比例", "Ratio"), t("注意", "Notes")]}
          rows={[
            [t("博客 OG、X、LinkedIn、Slack 预览", "Blog OG, X, LinkedIn, Slack unfurls"), "1200 × 630", "1.91 : 1", t("X 在时间线里会裁上下各约 3%，重要内容离上下边至少 7u", "X trims about 3% top and bottom in the timeline; keep key content 7u from the edges")],
            [t("微信公众号头条封面", "WeChat article cover"), "900 × 383", "2.35 : 1", t("转发到聊天时使用单独上传的 1:1 图，不要指望自动裁切", "Chat shares use a separately uploaded 1:1 image; do not rely on the automatic crop")],
            [t("公众号次条 / 分享缩略图", "WeChat secondary / share thumbnail"), "600 × 600", "1 : 1", t("缩略图实际显示约 64px，只放一个大字或符号", "Shown at about 64px; one big word or the symbol only")],
            [t("掘金、知乎、CSDN、思否等文章头图", "Juejin, Zhihu, CSDN, SegmentFault headers"), "1600 × 900", "16 : 9", t("列表页会缩到约 240px 宽，标题字号不小于 8u", "Lists shrink it to about 240px wide; keep titles at 8u or larger")],
            ["Medium, dev.to", "1000 × 420", "2.38 : 1", t("dev.to 会裁成 1000 × 420，Medium 列表页裁成方形，主体放左半", "dev.to crops to 1000 × 420 and Medium lists crop to a square; keep the subject on the left")],
            [t("Newsletter 邮件头图", "Newsletter header"), "1200 × 400", "3 : 1", t("邮件客户端常默认不加载图片，标题同时写进邮件正文", "Many mail clients block images by default; repeat the title in the email body")],
          ]}
        />
      </Section>

      <Section
        id="templates"
        tag="Templates"
        title={t("封面模板", "Cover templates")}
        lede={<p>{t("共 15 个模板。选择「编辑文字」可直接修改画板文字；底色与语言可切换；完成后选择「导出 PNG」。", "Fifteen templates. Choose Edit text to change copy on the artboard, switch the surface and language as needed, then choose Export PNG.")}</p>}
      >
        <TemplateGrid
          filters={[
            { id: "all", label: t("全部 15", "All 15") },
            { id: "og", label: "OG / X / LinkedIn 8" },
            { id: "wechat", label: t("微信公众号 4", "WeChat 4") },
            { id: "community", label: t("技术社区 2", "Communities 2") },
            { id: "news", label: "Newsletter 1" },
          ]}
        >
          {/* 1 · Release */}
          <Template span={6} title={t("版本发布", "Release")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["ink", "paper", "signal"]} tags={["og"]} file="og-release" note={t(<><b>用途：</b>主版本与补丁版本发布。版本号是画面唯一的主体，副标题以一句话说明该版本的意义。</>, <><b>Use:</b> major and patch releases. The version number is the sole focus; the subtitle states in one line what the release delivers.</>)}>
            <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[36%]" cols={6} rows={12} k={4} m={2} seed={21} mode="tone" fit="slice" gap={0.22} />
            <div className="ab-frame right-[calc(36%+var(--m))]">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="ab-label"><L zh="版本发布" en="Release" /> · <b>2026-10</b></span>
              </div>
              <div>
                <div className="ab-display u-text-27 leading-[0.82] tracking-[-0.035em]">
                  <small className="mb-[0.35em] ml-[0.12em] block text-[0.26em] leading-none tracking-[-0.01em] text-ab-brand">RustFS</small>1.0.1
                </div>
                <p className="ab-body u-mt-4 u-text-3.25 max-w-[22em]">
                  <L zh="生产可用的 S3 兼容对象存储。Rust 构建，Apache 2.0 许可。" en="Production-ready, S3-compatible object storage. Built in Rust, licensed Apache 2.0." />
                </p>
              </div>
              <span className="ab-url">github.com/rustfs/rustfs/releases</span>
            </div>
          </Template>

          {/* 2 · Engineering */}
          <Template span={6} title={t("工程深度文", "Engineering deep dive")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["paper", "ink", "signal"]} tags={["og"]} file="og-engineering" note={t(<><b>用途：</b>技术原理类文章。下半部以说明原理的示意图代替装饰；示例为 EC 4+2，任意 2 块盘损坏后数据均可重建。</>, <><b>Use:</b> technical explainers. A small diagram that explains the idea replaces decoration; this one shows EC 4+2, which survives any two failed drives.</>)}>
            <div className="ab-frame">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="ab-label"><L zh="工程" en="Engineering" /> · <b><L zh="12 分钟" en="12 min" /></b></span>
              </div>
              <h3 className="ab-head u-text-8.25 max-w-[13em]"><L zh="纠删码如何保证数据完整" en="How erasure coding keeps your data whole" /></h3>
              <div className="grid grid-cols-[auto_auto_1fr] items-end u-gap-3">
                <div className="grid u-h-20 u-w-24 content-between border-2 border-ab-fg u-p-1.5 font-mono u-text-2 tracking-[0.04em]">
                  <span><L zh="对象" en="OBJECT" /></span>
                  <b className="u-text-2.5 font-medium">hello.txt<br />64 MiB</b>
                </div>
                <div className="grid u-h-20 u-w-8 place-items-center text-ab-muted"><Arrow className="w-full" /></div>
                <div className="grid grid-cols-6 u-gap-1.25">
                  {["D1", "D2", "D3", "D4", "P1", "P2"].map((s, i) => (
                    <div key={s} className="grid u-gap-1">
                      <i className={`grid u-h-17 place-items-end-start u-p-1 font-mono u-text-2.25 leading-none not-italic ${i < 4 ? "bg-ab-data text-ab-on-data" : "bg-ab-parity text-white"}`}>{s}</i>
                      <span className="font-mono u-text-1.5 leading-none tracking-[0.06em] text-ab-muted">DRIVE 0{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Template>

          {/* 3 · Tutorial */}
          <Template span={6} title={t("教程", "Tutorial")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["ink", "paper", "signal"]} tags={["og"]} file="og-tutorial" note={t(<><b>用途：</b>操作教程。终端中仅展示官方文档中存在的命令；结果以注释形式说明，不得虚构程序输出。</>, <><b>Use:</b> tutorials. The terminal shows only commands from the official documentation; results are given as comments and program output is never invented.</>)}>
            <div className="ab-frame right-1/2">
              <Wordmark className="ab-logo" />
              <h3 className="ab-head u-text-8.5"><L zh="快速上手：用 Docker 运行 RustFS" en="Quickstart: RustFS on Docker" /></h3>
              <div className="flex u-gap-3">
                <span className="ab-label"><L zh="教程" en="Tutorial" /></span>
                <span className="ab-label"><b>5 min</b> <L zh="阅读" en="read" /></span>
              </div>
            </div>
            <div className="ab-term absolute right-(--m) bottom-(--m) top-[calc(var(--m)+var(--u)*9)] w-[calc(50%-var(--m)*1.4)]">
              <div className="flex items-center u-gap-1 border-b border-ab-line u-px-2 u-py-1.5 u-text-2 tracking-[0.04em] text-ab-muted">
                <i className="block u-size-1.25 bg-current opacity-45" /><i className="block u-size-1.25 bg-current opacity-45" /><i className="block u-size-1.25 bg-current opacity-45" />
                <span className="u-ml-1">~/rustfs</span>
              </div>
              <pre className="m-0 u-px-2.5 u-py-2.5 font-mono u-text-2.25 leading-[1.6] whitespace-pre-wrap">
                <span className="dim"><L zh="# 数据目录需对 UID 10001 可写" en="# data dirs must be writable by UID 10001" /></span>
                {"\n"}<span className="pr">$</span> mkdir -p data logs
                {"\n"}<span className="pr">$</span> chown -R 10001:10001 data logs
                {"\n"}<span className="pr">$</span> docker run -d -p 9000:9000 -p 9001:9001 \
                {"\n"}    -v $(pwd)/data:/data \
                {"\n"}    -v $(pwd)/logs:/logs \
                {"\n"}    rustfs/rustfs:latest
                {"\n\n"}<span className="dim"># S3 API   </span><span className="ok">http://localhost:9000</span>
                {"\n"}<span className="dim"># Console  </span><span className="ok">http://localhost:9001</span>
              </pre>
            </div>
          </Template>

          {/* 4 · Partnership */}
          <Template span={6} title={t("合作公告", "Partnership")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["signal", "ink", "paper"]} tags={["og"]} file="og-partner" note={t(<><b>用途：</b>联合公告。双方标志等高，以细「×」分隔。合作方标志按其品牌规范置入虚线框，导出前删除虚线框。</>, <><b>Use:</b> joint announcements. Both logos share one height with a light “×” between them. Place the partner logo per their guidelines inside the dashed box, then remove the box.</>)}>
            <div className="ab-frame justify-start gap-0">
              <div className="ab-row">
                <span className="ab-label"><L zh="公告" en="Announcement" /></span>
                <span className="ab-label"><b>2026-10</b></span>
              </div>
              <div className="u-mt-13 flex items-center u-gap-4">
                <Wordmark className="ab-logo u-h-7.5" />
                <span className="font-display u-text-7 leading-none font-light text-ab-muted">×</span>
                <span className="grid u-h-12 u-min-w-40 place-items-center border border-dashed border-ab-line u-px-3 font-mono u-text-2 tracking-[0.08em] text-ab-muted"><L zh="合作方标志" en="PARTNER LOGO" /></span>
              </div>
              <h3 className="ab-head u-mt-9 u-text-6.5 max-w-[16em]"><L zh="RustFS 加入合作伙伴计划，让 S3 存储更靠近 GPU" en="RustFS joins the Partner Program to bring S3 storage closer to the GPU" /></h3>
            </div>
            <ShardMatrix className="absolute right-(--m) bottom-(--m) left-(--m) !h-[calc(var(--u)*2.6)] !w-auto" cols={72} rows={1} k={10} m={2} seed={4} gap={0.35} fit="none" />
          </Template>

          {/* 5 · Case study */}
          <Template span={6} title={t("客户案例", "Case study")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["white", "paper", "ink", "signal"]} tags={["og"]} file="og-case" note={t(<><b>用途：</b>客户案例。以一条数据流说明 RustFS 在客户系统中的位置。客户名称与数据须经客户书面确认，未经确认不得使用数字。</>, <><b>Use:</b> customer stories. One data flow shows where RustFS sits in the customer’s system. Customer names and figures require the customer’s written approval; without it, no figures are used.</>)}>
            <div className="ab-frame">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="border border-dashed border-ab-line u-px-2 u-py-1 font-mono u-text-1.75 leading-none tracking-[0.08em] text-ab-muted"><L zh="客户标志" en="CUSTOMER LOGO" /></span>
              </div>
              <div className="grid u-gap-2.5">
                <span className="ab-label"><L zh="客户案例 · AI 训练" en="Case study · AI training" /></span>
                <h3 className="ab-head u-text-7 max-w-[15em]"><L zh="Nawāt 如何用 RustFS 管理 AI 微调存储" en="Managing AI fine-tuning storage with Nawāt and RustFS" /></h3>
              </div>
              <div className="grid grid-cols-[1fr_auto_1.3fr_auto_1fr] items-stretch u-gap-1.5">
                {[
                  { icon: "layers" as const, name: <L zh="数据集" en="Datasets" />, sub: "jsonl · parquet", hi: false },
                  null,
                  { icon: "bucket" as const, name: "RustFS", sub: "s3://fine-tune/", hi: true },
                  null,
                  { icon: "chip" as const, name: <L zh="训练" en="Training" />, sub: "checkpoints", hi: false },
                ].map((n, i) =>
                  n ? (
                    <div key={i} className={`grid content-start u-gap-1.5 border u-p-2 ${n.hi ? "border-transparent bg-ab-data text-ab-on-data" : "border-ab-line bg-ab-panel"}`}>
                      <Icon name={n.icon} className="u-size-4.5" />
                      <b className="u-text-2.5 leading-tight font-semibold">{n.name}</b>
                      <span className="font-mono u-text-1.75 leading-tight opacity-75">{n.sub}</span>
                    </div>
                  ) : (
                    <div key={i} className="grid u-w-4 place-items-center text-ab-muted"><Arrow className="w-full" /></div>
                  ),
                )}
              </div>
            </div>
          </Template>

          {/* 6 · Security advisory */}
          <Template span={6} title={t("安全公告", "Security advisory")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["ink", "paper"]} tags={["og"]} file="og-advisory" note={t(<><b>用途：</b>安全公告，仅在公告公开后使用。信息须完整：编号、严重程度、修复版本。Oxide 仅用于严重程度标记。</>, <><b>Use:</b> only after the advisory is public. Calm and complete: identifier, severity, fixed version. Orange appears once, on severity.</>)}>
            <div className="ab-frame">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="ab-label"><L zh="安全公告" en="Security advisory" /></span>
              </div>
              <h3 className="ab-head u-text-6.5 max-w-[17em]"><L zh="一句话说明影响范围与升级版本" en="One line on what is affected and what to upgrade to" /></h3>
              <div className="grid grid-cols-[auto_auto_auto_1fr] border-y border-ab-line font-mono u-text-2.25">
                {[
                  [<L key="a" zh="编号" en="Advisory" />, "GHSA-xxxx-xxxx-xxxx"],
                  [<L key="b" zh="严重程度" en="Severity" />, <span key="c" className="inline-flex items-center u-gap-1"><i className="block u-size-1.5 bg-ab-accent" /><L zh="高" en="High" /></span>],
                  [<L key="d" zh="修复版本" en="Fixed in" />, "1.0.1"],
                ].map(([k, v], i) => (
                  <span key={i} className={`grid u-gap-0.75 u-py-1.75 u-pr-3 ${i > 0 ? "border-l border-ab-line u-pl-3" : ""}`}>
                    <em className="text-[0.8em] tracking-[0.08em] text-ab-muted uppercase not-italic">{k}</em>
                    {v}
                  </span>
                ))}
                <span />
              </div>
            </div>
            <Icon name="shield" strokeWidth={0.9} className="absolute right-(--m) top-[calc(var(--m)+var(--u)*10)] u-size-16 text-ab-brand" />
          </Template>

          {/* 7 · Docs */}
          <Template span={6} title={t("文档页 OG", "Docs OG")} spec={t("1200 × 630 · docs.rustfs.com 自动生成", "1200 × 630 · generated for docs.rustfs.com")} w={1200} h={630} themes={["white", "paper", "ink"]} tags={["og"]} file="og-docs" note={t(<><b>用途：</b>文档站自动生成的分享图。面包屑取自页面路径，标题取自页面标题，图标按章节对应（安装 = terminal，管理 = console，安全 = shield）。</>, <><b>Use:</b> share images generated for the documentation site. The breadcrumb follows the page path, the title is the page title and the icon follows the section (install = terminal, manage = console, security = shield).</>)}>
            <div className="ab-frame right-[calc(var(--u)*42+var(--m))]">
              <Wordmark className="ab-logo" />
              <div>
                <div className="flex u-gap-1.5 font-mono u-text-2.5 text-ab-muted">
                  <b className="font-medium text-ab-brand"><L zh="文档" en="docs" /></b><span>/</span><span><L zh="安装" en="installation" /></span><span>/</span><span>linux</span>
                </div>
                <h3 className="ab-head u-mt-3 u-text-9 max-w-[11em]"><L zh="Linux 快速开始" en="Linux quick start" /></h3>
                <p className="ab-body u-mt-3 max-w-[30em]"><L zh="安装二进制、配置数据卷，启动单节点部署。" en="Install the binary, point it at your volumes, and start a single-node deployment." /></p>
              </div>
              <span className="ab-url">docs.rustfs.com/installation/linux/quick-start</span>
            </div>
            <div className="absolute top-1/2 right-(--m) grid u-size-30 -translate-y-1/2 place-items-center bg-ab-data text-ab-on-data">
              <Icon name="terminal" strokeWidth={1} className="u-size-15" />
            </div>
          </Template>

          {/* 8 · What's new */}
          <Template span={6} title={t("功能盘点", "What's new")} spec="1200 × 630 · OG / X / LinkedIn" w={1200} h={630} themes={["ink", "paper", "signal"]} tags={["og"]} file="og-whats-new" note={t(<><b>用途：</b>功能盘点。状态标签与官方功能状态表一致：可用、预览、可选构建。预览功能以 Oxide 方块标记。</>, <><b>Use:</b> feature round-ups. Status labels follow the official feature status table: Available, Preview, Opt-in. Preview items carry the Oxide marker.</>)}>
            <div className="ab-frame">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="ab-label"><L zh="新功能" en="What's new" /> · <b>1.0</b></span>
              </div>
              <div className="grid grid-cols-[0.8fr_1.2fr] items-end u-gap-6">
                <h3 className="ab-head u-text-8"><L zh="RustFS 1.0 有什么" en="What's in RustFS 1.0" /></h3>
                <ul className="m-0 grid list-none border-t border-ab-line p-0">
                  {[
                    [<L key="1" zh="站点复制" en="Site replication" />, <L key="1s" zh="可用" en="Available" />, false],
                    [<L key="2" zh="对象锁定（WORM）" en="Object Lock (WORM)" />, <L key="2s" zh="可用" en="Available" />, false],
                    ["S3 Tables · Iceberg REST", <L key="3s" zh="预览" en="Preview" />, true],
                    ["SFTP", <L key="4s" zh="可选构建" en="Opt-in" />, false],
                  ].map(([name, status, preview], i) => (
                    <li key={i} className="grid grid-cols-[calc(var(--u)*5)_1fr_auto] items-center u-gap-1.5 border-b border-ab-line u-py-1.75 u-text-3">
                      <i className={`block u-size-1.75 ${preview ? "bg-ab-parity" : "bg-ab-data"}`} />
                      <span>{name}</span>
                      <em className="border border-ab-line u-px-1.25 u-py-0.75 font-mono u-text-2 leading-none font-medium tracking-[0.08em] text-ab-muted uppercase not-italic">{status}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Template>

          {/* 9 · WeChat header */}
          <Template span={8} title={t("公众号头条 · 发布", "WeChat cover · release")} spec={t("900 × 383 · 微信公众号", "900 × 383 · WeChat")} w={900} h={383} themes={["ink", "signal", "paper"]} langs={["zh"]} tags={["wechat"]} file="wechat-release">
            <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[34%]" cols={6} rows={5} k={4} m={2} seed={8} fit="slice" gap={0.22} />
            <div className="ab-frame right-[calc(34%+var(--m))]">
              <div className="ab-row">
                <Wordmark className="ab-logo u-h-7" />
                <span className="ab-label u-text-4">版本发布</span>
              </div>
              <div>
                <h3 className="ab-zh u-text-15.5 leading-[1.1]">RustFS 1.0 正式发布</h3>
                <p className="ab-body u-mt-3 u-text-5">生产可用 · 兼容 S3 · Apache 2.0</p>
              </div>
            </div>
          </Template>

          {/* 10 · WeChat square */}
          <Template span={4} title={t("公众号次条 / 分享图", "WeChat square / share")} spec="600 × 600 · 1:1" w={600} h={600} themes={["signal", "ink", "paper"]} langs={["zh"]} tags={["wechat"]} file="wechat-square">
            <div className="ab-frame u-inset-9">
              <div className="ab-row">
                <Wordmark className="ab-logo u-h-5.5" />
                <Stripe className="u-text-2.5" />
              </div>
              <div>
                <div className="ab-display u-text-34 leading-[0.8] tracking-[-0.04em]">1.0</div>
                <div className="ab-zh u-mt-5 u-text-8.5">正式发布</div>
              </div>
            </div>
          </Template>

          {/* 11 · WeChat series */}
          <Template span={6} title={t("公众号 · 系列专栏", "WeChat · series")} spec={t("900 × 383 · 期号即顺序", "900 × 383 · the number is the issue")} w={900} h={383} themes={["paper", "ink", "signal"]} langs={["zh"]} tags={["wechat"]} file="wechat-series" note={t(<><b>用途：</b>系列连载。右侧空心数字为期号；同一系列须使用同一底色。</>, <><b>Use:</b> series. The large outlined number is the issue number; each series keeps a single surface colour.</>)}>
            <div className="ab-display absolute right-[calc(var(--m)-var(--u)*2)] bottom-[calc(var(--m)-var(--u)*1)] u-text-42 leading-[0.76] tracking-[-0.05em] text-transparent [-webkit-text-stroke:calc(var(--u)*0.45)_var(--ab-fg)]">02</div>
            <div className="ab-frame">
              <div className="flex items-center u-gap-5">
                <Wordmark className="ab-logo u-h-6.5" />
                <span className="ab-label u-text-4">存储原理 · 系列</span>
              </div>
              <h3 className="ab-zh u-text-13 leading-[1.16]">坏了两块盘，<br />数据为什么还在</h3>
            </div>
          </Template>

          {/* 12 · WeChat live */}
          <Template span={6} title={t("公众号 · 直播预告", "WeChat · livestream")} spec="900 × 383" w={900} h={383} themes={["ink", "signal", "paper"]} langs={["zh"]} tags={["wechat"]} file="wechat-live">
            <div className="ab-frame right-[calc(34%+var(--m)+var(--u)*6)]">
              <span className="ab-label inline-flex items-center u-gap-2 u-text-4"><i className="block u-size-3 bg-ab-accent" />直播预告</span>
              <h3 className="ab-zh u-text-11.5 leading-[1.16]">RustFS 1.0<br />架构解读</h3>
            </div>
            <div className="absolute top-(--m) right-(--m) bottom-(--m) grid w-[34%] content-end u-gap-4 border-l border-ab-line u-pl-6">
              <Wordmark className="ab-logo u-h-6.5" />
              <div>
                <b className="block ab-num u-text-15 leading-[0.9]">10.22</b>
                <span className="font-mono u-text-3.5 leading-tight tracking-[0.08em] text-ab-muted">周四</span>
              </div>
              <span className="ab-label u-text-4"><b>20:00</b> 北京时间</span>
            </div>
          </Template>

          {/* 13 · Community 16:9 */}
          <Template span={6} title={t("技术社区头图 16:9", "Community header 16:9")} spec={t("1600 × 900 · 掘金 / 知乎 / CSDN / 思否", "1600 × 900 · Juejin / Zhihu / CSDN / SegmentFault")} w={1600} h={900} themes={["paper", "ink", "signal"]} langs={["zh"]} tags={["community"]} file="community-16x9" note={t(<><b>用途：</b>中文技术社区。列表页缩略图宽约 240px，标题须位于左上，图形置于下半部。提及第三方产品时仅使用文字，不得使用其标志。</>, <><b>Use:</b> Chinese developer communities. List thumbnails are about 240px wide, so the title sits top left and the graphic below. Third-party products are named in text only, never with their logos.</>)}>
            <div className="ab-frame">
              <div className="ab-row">
                <Wordmark className="ab-logo" />
                <span className="ab-label">迁移指南 · <b>15 分钟</b></span>
              </div>
              <h3 className="ab-zh u-text-8.5 leading-[1.18] max-w-[11em]">从 MinIO 迁移到 RustFS：一份技术指南</h3>
              <div className="grid grid-cols-[1fr_1.4fr_1fr] items-center border-t border-ab-line u-pt-4">
                <div className="grid u-gap-1.5 border border-ab-line u-p-2.5">
                  <span className="font-mono u-text-2 text-ab-muted">FROM</span>
                  <b className="u-text-3.5 font-semibold">MinIO</b>
                  <span className="font-mono u-text-2 text-ab-muted">现有部署</span>
                </div>
                <div className="grid justify-items-center u-gap-1.25 u-px-2">
                  <span className="font-mono u-text-2 font-medium tracking-[0.08em] text-ab-fg-2">S3 API 不变</span>
                  <div className="grid u-h-1.5 w-full grid-cols-12 u-gap-0.5">
                    {Array.from({ length: 12 }, (_, i) => <i key={i} className={(i + 1) % 6 === 0 || (i + 2) % 6 === 0 ? "bg-ab-parity" : "bg-ab-data"} />)}
                  </div>
                  <span className="font-mono u-text-2 font-medium tracking-[0.08em] text-ab-fg-2">SDK · CLI · 应用代码</span>
                </div>
                <div className="grid u-gap-1.5 border border-transparent bg-ab-data u-p-2.5 text-ab-on-data">
                  <span className="font-mono u-text-2 opacity-80">TO</span>
                  <b className="u-text-3.5 font-semibold">RustFS</b>
                  <span className="font-mono u-text-2 opacity-80">Apache 2.0</span>
                </div>
              </div>
            </div>
          </Template>

          {/* 14 · Medium / dev.to */}
          <Template span={6} title="Medium / dev.to" spec="1000 × 420" w={1000} h={420} themes={["ink", "paper", "signal"]} langs={["en"]} tags={["community"]} file="medium-cover" note={t(<><b>用途：</b>英文技术社区。Medium 列表页从左侧裁切为方形，标题与字标须位于左侧。</>, <><b>Use:</b> English communities. Medium lists crop a square from the left, so the title and wordmark stay left.</>)}>
            <div className="absolute top-1/2 right-(--m) flex -translate-y-1/2 items-center u-gap-3">
              <div className="grid u-h-40 u-w-34 content-between border border-dashed border-ab-line u-p-3 font-mono u-text-4.5 text-ab-muted">
                <em className="text-[0.72em] tracking-[0.06em] not-italic">/usr/local/bin</em>
                <b className="font-normal line-through decoration-ab-accent decoration-2">minio</b>
              </div>
              <Arrow className="u-w-8 text-ab-muted" />
              <div className="grid u-h-40 u-w-34 content-between bg-ab-data u-p-3 font-mono u-text-4.5 text-ab-on-data">
                <em className="text-[0.72em] tracking-[0.06em] not-italic opacity-75">/usr/local/bin</em>
                <b className="font-normal">rustfs</b>
              </div>
            </div>
            <div className="ab-frame right-[calc(var(--u)*90+var(--m))]">
              <Wordmark className="ab-logo" />
              <h3 className="ab-head u-text-7.5">Binary replacement: a simple way to migrate from MinIO to RustFS</h3>
            </div>
          </Template>

          {/* 15 · Newsletter */}
          <Template title={t("Newsletter 邮件头图", "Newsletter header")} spec={t("1200 × 400 · 邮件内 640px 宽显示", "1200 × 400 · shown 640px wide in mail")} w={1200} h={400} themes={["paper", "ink", "signal"]} tags={["news"]} file="newsletter-header" note={t(<><b>用途：</b>月报邮件头图。三项数据每期更新，统计日期须在邮件正文首段注明。</>, <><b>Use:</b> the monthly newsletter header. Update the three figures each issue and state their date in the first paragraph of the email.</>)}>
            <div className="ab-frame flex-row items-stretch">
              <div className="grid content-between">
                <Wordmark className="ab-logo" />
                <h3 className="ab-display u-text-13 leading-[0.92]">
                  <L zh="月报" en="Monthly" />
                  <br />
                  <span className="text-ab-brand">2026.10</span>
                </h3>
              </div>
              <div className="grid content-between justify-items-end">
                <div className="flex items-center u-gap-3">
                  <span className="ab-label u-text-3.5">Newsletter · <b>No. 10</b></span>
                  <Stripe className="u-text-2.75" />
                </div>
                <div className="grid grid-cols-3 border-t border-ab-line">
                  {[
                    ["1.0.1", <L key="a" zh="最新版本" en="Latest release" />],
                    ["34,869", "GitHub stars"],
                    ["15.15M", "Docker pulls"],
                  ].map(([v, l], i) => (
                    <div key={i} className={`grid u-gap-1.5 u-pt-3 u-pr-5 ${i > 0 ? "border-l border-ab-line u-pl-5" : ""}`}>
                      <b className="ab-num u-text-10">{v}</b>
                      <span className="font-mono u-text-3 leading-none font-medium tracking-[0.08em] text-ab-muted uppercase">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Template>
        </TemplateGrid>
      </Section>

      <Section
        id="rules"
        tag="Do & Don't"
        title={t("发布前检查", "Before you publish")}
        lede={<p>{t("发布封面前，须逐项对照以下规则。", "Check every cover against these rules before publication.")}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="ink" bodyClassName="p-0 min-h-55" caption={t("品牌图形源自产品结构，标题是画面唯一的主体。", "The graphic comes from the product's structure; the title is the only hero.")}>
            <div className="absolute inset-0 [--mx-data:#0062FF] [--mx-parity:#FF5E14]">
              <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[36%]" cols={5} rows={8} k={4} m={1} seed={2} fit="slice" />
              <Wordmark className="absolute top-5.5 left-6 h-auto w-25 text-white" />
              <span className="absolute bottom-6 left-6 font-display text-[34px] leading-[0.95] font-extrabold text-white [font-stretch:125%]">1.0.1</span>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="p-0 min-h-55 bg-black" caption={t("使用与内容无关的抽象线条或 AI 插画，标题使用系统字体，缺少字标。", "Unrelated abstract lines or AI art, a system-font title and no wordmark.")}>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_6px,rgba(255,0,0,.55)_6px_7px),repeating-linear-gradient(35deg,transparent_0_9px,rgba(255,0,0,.4)_9px_10px)]" />
            <span className="relative p-6 font-[Arial,Helvetica,sans-serif] text-[30px] leading-tight font-bold text-white">RustFS Weekly</span>
          </DoDont>
          <DoDont kind="do" on="paper" bodyClassName="place-items-start content-center gap-2" caption={t("一个标签、一个标题，左对齐。", "One label, one title, aligned left.")}>
            <span className="font-mono text-[11px] leading-none tracking-[0.08em] text-neutral-600">ENGINEERING · 12 MIN</span>
            <span className="max-w-[14em] font-display text-[26px] leading-[1.1] font-[750] text-neutral-950 [font-stretch:112%]">How erasure coding keeps your data whole</span>
          </DoDont>
          <DoDont kind="dont" on="paper" bodyClassName="content-center gap-1.5 text-center" caption={t("居中堆叠、多个标签、表情符号、发光投影与最高级口号。", "Centred stacks, several tags, emoji, glows and superlative slogans.")}>
            <span className="font-mono text-xs leading-none font-semibold text-oxide-500">🔥 NEW!! 必看</span>
            <span className="font-display text-[26px] leading-[1.1] font-extrabold text-blue-500 [font-stretch:125%] [text-shadow:0_4px_18px_rgba(0,98,255,.6)]">THE FASTEST STORAGE EVER</span>
            <span className="font-mono text-xs leading-none text-oxide-500">#AI #Cloud #Rust #S3 #Storage</span>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="covers" />
    </Page>
  )
}
