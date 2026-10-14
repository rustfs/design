import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { Wordmark } from "@/components/brand/logo"
import { DoDont, Page, PageFooter, PageHeader, Section, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import {
  Carousel1,
  Carousel2,
  Carousel3,
  Carousel4,
  MomentsPoster,
  PortraitFeatures,
  PortraitMigrate,
  PostFeature,
  PostHiring,
  PostMeetup,
  PostPrinciple,
  PostRelease,
  PostStat,
  PostThanks,
  PostTip,
  StoryLive,
  XhsCover,
} from "./_posts"
import { Avatar, GithubBanner, GithubPreview, LinkedInCover, XHeader, YouTubeBanner } from "./_profiles"
import { AvatarImg, Mini } from "./_shared"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "社交媒体" : "Social" }
}

const ALT = {
  zh: "RustFS 1.0.1 版本发布图。深色背景，左上角为 RustFS 字标，右上角标注「版本发布 · 2026-10」。画面中部是大号版本号「1.0.1」，下方文字：「生产可用的 S3 兼容对象存储。版本说明与升级步骤见 GitHub Releases。」底部一行蓝色与橙色方块组成的分片矩阵。",
  en: "Release graphic for RustFS 1.0.1. Dark background with the RustFS wordmark top left and the label “Release · 2026-10” top right. A large version number, 1.0.1, sits in the middle, followed by the line “Production-ready, S3-compatible object storage. Release notes and upgrade steps are on GitHub Releases.” A band of blue and orange squares, the shard matrix, runs along the bottom.",
}

/** Numbered marker used in the post anatomy. */
const Num = ({ n }: { n: number }) => (
  <span className="mr-2 inline-grid size-[18px] shrink-0 place-items-center bg-brand align-[2px] font-mono text-[10px] leading-none font-medium text-white">{n}</span>
)

function AvatarSizes() {
  return (
    <figure className="col-span-12 m-0 grid min-w-0 gap-3 md:col-span-8">
      <div className="grid gap-1">
        <div className="text-[15px] leading-snug font-semibold">{t("显示尺寸检查", "At display size")}</div>
        <div className="font-mono text-xs leading-snug text-muted-foreground">96 · 48 · 32 px · {t("圆形与方形裁切", "circle and square crops")}</div>
      </div>
      <div className="grid border border-border sm:grid-cols-2">
        {[
          { cls: "bg-white text-neutral-600", name: t("浅色界面", "Light interface") },
          { cls: "bg-neutral-950 text-neutral-400", name: t("深色界面", "Dark interface") },
        ].map((b, i) => (
          <div key={i} className={cn("grid content-start gap-6 p-[clamp(20px,3vw,32px)]", b.cls, i > 0 && "border-t border-border sm:border-t-0 sm:border-l")}>
            <span className="font-mono text-[11px] leading-none tracking-[0.06em] uppercase">{b.name}</span>
            {[true, false].map((round) => (
              <div key={String(round)} className="flex items-end gap-5">
                {[96, 48, 32].map((s) => (
                  <div key={s} className="grid justify-items-center gap-2">
                    <AvatarImg size={s} round={round} />
                    <span className="font-mono text-[11px] leading-none">{s}</span>
                  </div>
                ))}
                <span className="ml-auto self-center font-mono text-[11px] leading-none tracking-[0.06em] uppercase">{round ? t("圆形", "Circle") : t("方形", "Square")}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <figcaption className="max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground [&_b]:font-semibold [&_b]:text-subtle">
        {t("32px 下须仍可辨认；不得另做平台版本、改用字标或加字。", "Must read at 32px. No platform variants, no wordmark, no added text.")}
      </figcaption>
    </figure>
  )
}

function Rules({ items }: { items: [ReactNode, ReactNode][] }) {
  return (
    <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([k, v], i) => (
        <div key={i} className="grid content-start gap-1.5 border-t border-border pt-3 text-sm leading-relaxed text-subtle">
          <b className="font-mono text-[11px] font-medium tracking-[0.06em] text-brand uppercase">{k}</b>
          {v}
        </div>
      ))}
    </div>
  )
}

/* ---------- Do & Don't specimens ---------- */
const MiniSquare = ({ className, children }: { className?: string; children: ReactNode }) => <div className={cn("relative grid size-40 shrink-0 p-4", className)}>{children}</div>

function HeaderMock({ good }: { good: boolean }) {
  return (
    <div className="relative w-full max-w-[300px] pb-6">
      <div className="relative aspect-[3/1] w-full overflow-hidden bg-neutral-950 [--mx-data:#0062FF]">
        <span className={cn("absolute left-[6%] font-display text-[14px] leading-[1.05] font-[750] text-white [font-stretch:112%]", good ? "top-[14%]" : "bottom-[8%]")}>
          AI infrastructure,
          <br />
          accounted for
          <br />
          byte by byte.
        </span>
        <div className="absolute inset-y-0 right-0 grid w-[40%] grid-cols-4 gap-[3px] p-[3px] opacity-90">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} className={cn("block", i % 6 === 4 || i % 6 === 5 ? "bg-oxide-500" : "bg-blue-500")} style={{ opacity: i % 6 >= 4 ? 1 : [1, 0.6, 0.34][i % 3] }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-[3%] rounded-full outline-3 outline-white dark:outline-neutral-900">
        <AvatarImg size={50} round />
      </div>
    </div>
  )
}

export default async function SocialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)
  const lang: Locale = isLocale(locale) ? locale : "en"

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/social/"
        label="Templates · Social"
        title={t("社交媒体", "Social")}
        subtitle={t("Social", "社交媒体")}
        lede={t(
          "各平台的账号素材与帖子模板：账号一眼可辨，一帖一事，信息流尺寸下仍须清晰。",
          "Profile assets and post templates for every channel: recognisable at a glance, one message per post, legible at feed size.",
        )}
        meta={[
          { k: t("模板", "Templates"), v: "23" },
          { k: t("底色", "Surfaces"), v: "Ink / Paper / White / Signal" },
          { k: t("语言", "Languages"), v: "中 / EN" },
          { k: t("导出", "Export"), v: "PNG @2x" },
        ]}
      />

      {/* ================= Profiles ================= */}
      <Section
        id="profiles"
        tag="Profiles"
        title={t("账号资料", "Profile assets")}
        lede={<p>{t("尺寸截至 2026 年 10 月；平台规则会变，上传后须在桌面端与手机端各检查一次。", "Sizes as of October 2026. Platform rules change, so check every upload on desktop and on a phone.")}</p>}
      >
        <Table
          mono={[2]}
          className="[&_table]:min-w-[760px] [&_td:nth-child(3)]:whitespace-nowrap"
          head={[t("平台", "Platform"), t("素材", "Asset"), t("画板", "Artboard"), t("显示与裁切", "Display and crop")]}
          rows={[
            [t("全部平台", "All platforms"), t("头像", "Avatar"), "400 × 400", t("圆形或方形裁切，最小约 32px；@2x 导出 800 × 800", "Circle or square crop, down to about 32px; @2x export 800 × 800")],
            ["GitHub", t("社交预览图", "Social preview"), "1280 × 640", t("链接展开卡片；四周 40px 留空", "Link unfurl card; keep 40px clear at every edge")],
            ["GitHub", t("组织主页 / README 横幅", "Organisation / README banner"), "1280 × 320", t("手机上约 360px 宽；导出 Ink 与 Paper 两版", "About 360px wide on phones; export Ink and Paper versions")],
            ["X", t("页眉", "Header"), "1500 × 500", t("头像压住左下；文字距上下边 ≥ 10u", "Avatar covers bottom left; type ≥ 10u from top and bottom")],
            ["LinkedIn", t("公司主页封面", "Company page cover"), "1128 × 191", t("标志压住左下，手机裁去两侧；文字居中", "Logo covers bottom left, phones trim the sides; keep type central")],
            ["YouTube", t("频道横幅", "Channel banner"), "2560 × 1440", t("手机只显示居中 1546 × 423；字标与文字须在其内", "Phones show only the centred 1546 × 423; wordmark and type stay inside")],
            [t("Bilibili、微信、小红书", "Bilibili, WeChat, Xiaohongshu"), t("头像", "Avatar"), "400 × 400", t("同一头像；未列出的页眉按上传界面尺寸，沿用 X 页眉构图", "Same avatar; unlisted headers take the upload dialog's size and the X header layout")],
          ]}
        />

        <TemplateGrid>
          <Template
            span={4}
            title={t("头像", "Avatar")}
            spec={t("400 × 400 · 全部平台", "400 × 400 · all platforms")}
            w={400}
            h={400}
            themes={["signal"]}
            file="avatar"
            note={t("符号框宽 58%，只用 Signal Blue 底。", "Symbol box 58% wide; Signal Blue only.")}
          >
            <Avatar />
          </Template>
          <AvatarSizes />

          <Template
            span={6}
            title={t("GitHub 社交预览图", "GitHub social preview")}
            spec="1280 × 640 · github.com/rustfs/rustfs"
            w={1280}
            h={640}
            themes={["ink", "paper", "signal"]}
            file="github-social-preview"
            note={t("聊天卡片常缩至 360px 宽，标题 ≥ 8u。", "Chat cards shrink to about 360px; title ≥ 8u.")}
          >
            <GithubPreview />
          </Template>
          <Template
            span={6}
            title={t("X 页眉", "X header")}
            spec="1500 × 500 · 3 : 1"
            w={1500}
            h={500}
            themes={["ink", "signal", "paper"]}
            file="x-header"
            note={t("头像覆盖区留空。", "Keep the avatar overlap empty.")}
          >
            <XHeader />
          </Template>

          <Template
            title={t("GitHub 组织主页 / README 横幅", "GitHub organisation / README banner")}
            spec={t("1280 × 320 · 4 : 1 · 深色与浅色主题各一版", "1280 × 320 · 4 : 1 · one version per theme")}
            w={1280}
            h={320}
            themes={["ink", "paper", "white"]}
            file="github-readme-banner"
            note={t(
              <>以 <code>&lt;picture&gt;</code> 同时提供 Ink 与 Paper 两版。</>,
              <>Serve Ink and Paper together via <code>&lt;picture&gt;</code>.</>,
            )}
          >
            <GithubBanner />
          </Template>

          <Template
            title={t("LinkedIn 公司主页封面", "LinkedIn company page cover")}
            spec="1128 × 191"
            w={1128}
            h={191}
            themes={["ink", "signal", "paper"]}
            file="linkedin-cover"
          >
            <LinkedInCover />
          </Template>

          <Template
            title={t("YouTube 频道横幅", "YouTube channel banner")}
            spec={t("2560 × 1440 · 安全区 1546 × 423 居中", "2560 × 1440 · safe area 1546 × 423, centred")}
            w={2560}
            h={1440}
            themes={["ink", "signal"]}
            file="youtube-banner"
          >
            <YouTubeBanner />
          </Template>
        </TemplateGrid>
      </Section>

      {/* ================= Posts ================= */}
      <Section
        id="posts"
        tag="Posts"
        title={t("帖子模板", "Post templates")}
        lede={<p>{t("短边均为 1080px：u = 10.8px，安全边距 7u。", "Every format is 1080px on its short side: u = 10.8px, safe margin 7u.")}</p>}
      >
        <Rules
          items={[
            [t("① 一个焦点", "① One focus"), t("一个标签、一个主体、一个图形；Oxide 只出现一次。", "One label, one hero, one graphic; Oxide appears once.")],
            [t("② 信息流字号", "② Feed-size type"), t("主体 ≥ 7u，正文 ≥ 3.5u，标签 ≥ 2.5u。", "Hero ≥ 7u, body ≥ 3.5u, labels ≥ 2.5u.")],
            [t("③ 占位内容", "③ Placeholders"), t("虚线下划线为占位，发布前全部替换；不得虚构人名或标志。", "Dashed underlines are placeholders; replace them all. Never invent names or logos.")],
            [t("④ 轮播", "④ Carousels"), t("每页一步；第 1 页单独成立，末页给出链接。", "One step per slide; slide 1 stands alone, the last gives the link.")],
          ]}
        />

        <figure className="m-0 grid gap-3">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-6 border border-border bg-surface p-[clamp(16px,2.5vw,28px)]">
            <Mini w={1080} h={1080} width={320} theme="ink" lang={lang} label={t("320px · 方形帖子", "320px · square post")}>
              <PostRelease />
            </Mini>
            <Mini w={1080} h={1350} width={320} theme="paper" lang={lang} label={t("320px · 轮播第 1 页", "320px · carousel slide 1")}>
              <Carousel1 />
            </Mini>
            <Mini w={1080} h={1440} width={180} theme="paper" lang="zh" label={t("180px · 小红书双列", "180px · Xiaohongshu feed")}>
              <XhsCover />
            </Mini>
          </div>
          <figcaption className="max-w-[72ch] text-[13px] leading-relaxed text-muted-foreground [&_b]:font-semibold [&_b]:text-subtle">
            {t("发布前须在此宽度下检查：主体须一眼可读。", "Check every export at this width: the hero must read at a glance.")}
          </figcaption>
        </figure>

        <TemplateGrid
          filters={[
            { id: "all", label: t("全部 17", "All 17") },
            { id: "square", label: t("方形 8", "Square 8") },
            { id: "portrait", label: t("竖版 3", "Portrait 3") },
            { id: "vertical", label: t("全屏竖版 2", "Vertical 2") },
            { id: "carousel", label: t("轮播 4", "Carousel 4") },
          ]}
        >
          <Template span={6} title={t("版本发布", "Release")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["ink", "paper", "signal"]} tags={["square"]} file="post-release" note={t("新版本只改版本号与日期。", "A new release changes only the number and date.")}>
            <PostRelease />
          </Template>
          <Template span={6} title={t("功能聚焦", "Feature spotlight")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["paper", "white", "ink"]} tags={["square"]} file="post-feature" note={t("状态与官方文档一致；预览功能加 Oxide 标记。", "Status matches the docs; Preview features carry the Oxide marker.")}>
            <PostFeature />
          </Template>

          <Template span={4} title={t("使用提示", "Tip")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["ink", "paper"]} tags={["square"]} file="post-tip" note={t("命令照录官方文档，不得虚构输出。", "Commands copied verbatim from the docs; never invent output.")}>
            <PostTip />
          </Template>
          <Template span={4} title={t("数据里程碑", "Milestone")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["signal", "ink", "paper"]} tags={["square"]} file="post-milestone" note={t("数字与来源完全一致，注明日期，不写约数。", "The exact sourced figure with its date; never rounded.")}>
            <PostStat />
          </Template>
          <Template span={4} title={t("线下交流会", "Meetup")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["paper", "ink", "signal"]} tags={["square"]} file="post-meetup" note={t("日历中的橙色方块标记活动当天。", "The orange calendar square marks the event day.")}>
            <PostMeetup />
          </Template>

          <Template span={4} title={t("招聘", "Hiring")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["ink", "paper", "white"]} tags={["square"]} file="post-hiring" note={t("图中只写职位、地点与用工形式。", "The image names only role, location and employment type.")}>
            <PostHiring />
          </Template>
          <Template span={4} title={t("设计原则", "Principle")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["signal", "ink", "paper"]} tags={["square"]} file="post-principle" note={t("引文只取自设计原则，不署个人姓名。", "Quotes only from the design principles, never a named person.")}>
            <PostPrinciple />
          </Template>
          <Template span={4} title={t("感谢贡献者", "Contributor thanks")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["paper", "white", "ink"]} tags={["square"]} file="post-thanks" note={t("与 GitHub 记录一致；发布前征得本人同意。", "Match the GitHub record; ask the contributor before posting.")}>
            <PostThanks />
          </Template>

          <Template span={6} title={t("竖版 · 博客文章", "Portrait · blog post")} spec="1080 × 1350 · 4 : 5" w={1080} h={1350} themes={["ink", "paper", "signal"]} tags={["portrait"]} file="portrait-blog" note={t("标题与原文一致。", "The title matches the article.")}>
            <PortraitMigrate />
          </Template>
          <Template span={6} title={t("竖版 · 功能一览", "Portrait · feature round-up")} spec="1080 × 1350 · 4 : 5" w={1080} h={1350} themes={["paper", "white", "ink"]} tags={["portrait"]} file="portrait-features" note={t("只有预览项使用 Oxide 标记。", "Only Preview items carry the Oxide marker.")}>
            <PortraitFeatures />
          </Template>

          <Template span={3} title={t("轮播 1 / 4 · 问题", "Carousel 1 / 4 · question")} spec="1080 × 1350" w={1080} h={1350} themes={["paper", "ink"]} tags={["carousel"]} file="carousel-ec-1" presentGroup="ec-carousel" note={t("四页同一底色，矩阵不动；LinkedIn 以 PDF 上传。", "One surface, matrix fixed; upload to LinkedIn as a PDF.")}>
            <Carousel1 />
          </Template>
          <Template span={3} title={t("轮播 2 / 4 · 分片", "Carousel 2 / 4 · shards")} spec="1080 × 1350" w={1080} h={1350} themes={["paper", "ink"]} tags={["carousel"]} file="carousel-ec-2" presentGroup="ec-carousel">
            <Carousel2 />
          </Template>
          <Template span={3} title={t("轮播 3 / 4 · 坏盘", "Carousel 3 / 4 · failure")} spec="1080 × 1350" w={1080} h={1350} themes={["paper", "ink"]} tags={["carousel"]} file="carousel-ec-3" presentGroup="ec-carousel">
            <Carousel3 />
          </Template>
          <Template span={3} title={t("轮播 4 / 4 · 重建", "Carousel 4 / 4 · rebuild")} spec="1080 × 1350" w={1080} h={1350} themes={["paper", "ink"]} tags={["carousel"]} file="carousel-ec-4" presentGroup="ec-carousel">
            <Carousel4 />
          </Template>

          <Template span={4} title={t("小红书笔记封面", "Xiaohongshu note cover")} spec="1080 × 1440 · 3 : 4" w={1080} h={1440} themes={["paper", "white", "ink"]} langs={["zh"]} tags={["portrait"]} file="xhs-cover" note={t("标题不小于 10u。", "Titles at least 10u.")}>
            <XhsCover />
          </Template>
          <Template span={4} title={t("全屏竖版 · 直播海报", "Vertical · livestream poster")} spec={t("1080 × 1920 · 视频号 / Stories", "1080 × 1920 · Channels / Stories")} w={1080} h={1920} themes={["ink", "signal", "paper"]} tags={["vertical"]} file="story-livestream">
            <StoryLive />
          </Template>
          <Template span={4} title={t("朋友圈海报", "WeChat Moments poster")} spec="1080 × 1920 · 9 : 16" w={1080} h={1920} themes={["ink", "signal", "paper"]} langs={["zh"]} tags={["vertical"]} file="moments-poster" note={t("二维码指向 rustfs.com，保留白底，不用短链。", "QR code to rustfs.com on its white backing; no short links.")}>
            <MomentsPoster />
          </Template>
        </TemplateGrid>
      </Section>

      {/* ================= Writing ================= */}
      <Section
        id="writing"
        tag="Writing for social"
        title={t("帖子文案", "Writing for social")}
      >
        <div className="grid items-start gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <figure className="m-0 grid min-w-0 border border-border lg:sticky lg:top-6">
            <div className="grid gap-4 p-[clamp(16px,2.5vw,24px)]">
              <div className="flex items-center gap-3">
                <AvatarImg size={40} round />
                <div className="grid leading-tight">
                  <b className="text-[15px] font-semibold">RustFS</b>
                  <span className="font-mono text-xs text-muted-foreground">{t("@账号", "@handle")}</span>
                </div>
              </div>
              <div className="grid gap-1.5 text-[15px] leading-relaxed">
                <p className="m-0"><Num n={1} />{t("RustFS 1.0.1 已发布。版本说明与升级步骤：", "RustFS 1.0.1 is out. Release notes and upgrade steps:")}</p>
                <p className="m-0 break-all"><Num n={2} /><span className="text-link">https://github.com/rustfs/rustfs/releases</span></p>
                <p className="m-0"><Num n={3} /><span className="text-link">{t("#RustFS #对象存储", "#RustFS #ObjectStorage")}</span></p>
              </div>
              <Mini w={1080} h={1080} width={300} theme="ink" lang={lang}>
                <PostRelease />
              </Mini>
              <div className="grid gap-2 border border-dashed border-strong p-3">
                <span className="flex items-center font-mono text-[11px] leading-none tracking-[0.06em] text-muted-foreground uppercase">
                  <Num n={4} />
                  {t("替代文本", "Alt text")}
                </span>
                <p className="m-0 text-[13px] leading-relaxed text-subtle">{lang === "zh" ? ALT.zh : ALT.en}</p>
              </div>
            </div>
            <figcaption className="grid gap-1 border-t border-border px-3.5 py-2.5 font-mono text-xs leading-normal text-muted-foreground">
              <span>{t("① 一件事 · ② 一个链接，单独成行 · ③ 两个标签，置于末尾 · ④ 替代文本", "① One message · ② One link on its own line · ③ Two hashtags, at the end · ④ Alt text")}</span>
            </figcaption>
          </figure>

          <ol className="m-0 grid list-none gap-0 p-0">
            {[
              [t("链接与标签", "Links and hashtags"), t("一个官方域名完整链接，单独成行；末尾只放 #RustFS 加一个主题标签。不用短链。", "One full link on an official domain, on its own line; then #RustFS plus one topic tag at the end. No short links.")],
              [t("替代文本必填", "Alt text is required"), t("写明图片类型与图中全部文字，再用一句话描述图形。", "Name the image type, transcribe every word, then describe the graphic in one sentence.")],
              [t("一帖一种语言", "One language per post"), t("中文平台用中文，国际平台用英文；双语内容分两条发布。", "Chinese on Chinese platforms, English elsewhere; bilingual content goes out as two posts.")],
              [t("不用 emoji 与最高级", "No emoji, no superlatives"), t("数字注明来源与日期；@ 账号发布前须打开主页核对。", "Figures carry source and date; check every @handle on its profile before posting.")],
            ].map(([k, v], i) => (
              <li key={i} className="grid grid-cols-[40px_1fr] gap-x-3 border-t border-border py-4 last:border-b">
                <span className="font-mono text-xs leading-[1.9] text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div className="grid gap-1">
                  <b className="text-[15px] leading-snug font-semibold">{k}</b>
                  <p className="m-0 text-[15px] leading-[1.7] text-subtle">{v}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Table
          className="[&_table]:min-w-[760px]"
          head={[t("平台", "Platform"), t("正文", "Caption"), t("链接", "Link"), t("图片", "Images")]}
          rows={[
            ["X", t("≤ 280 字符，首句即要点", "≤ 280 characters; lead with the point"), t("标签之前", "Before the hashtags"), t("方形、竖版", "Square, portrait")],
            ["LinkedIn", t("要点放前两行", "Point in the first two lines"), t("末尾", "At the end"), t("方形、竖版；轮播传 PDF", "Square, portrait; carousels as PDF")],
            [t("微信朋友圈", "WeChat Moments"), t("一至三句，无标签", "1–3 sentences, no hashtags"), t("无，用海报二维码", "None; use the poster QR code"), t("朋友圈海报", "Moments poster")],
            [t("小红书", "Xiaohongshu"), t("标题 ≤ 20 字，命令写在图中", "Title ≤ 20 characters; commands in the image"), t("无外链，网址写在图中", "None; URL in the image"), t("3 : 4 封面", "3 : 4 cover")],
            [t("Bilibili 动态", "Bilibili posts"), t("一至三句", "1–3 sentences"), t("末尾", "At the end"), t("方形、竖版", "Square, portrait")],
            [t("社区群组", "Community groups"), t("按群组语言，一句话", "The group's language; one sentence"), t("单独一行", "On its own line"), t("方形，不发长图", "Square; no long images")],
          ]}
        />
      </Section>

      {/* ================= Do & Don't ================= */}
      <Section id="rules" tag="Do & Don't" title={t("发布前检查", "Before you publish")}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="surface" caption={t("一个标签、一个主体、一句说明。", "One label, one hero, one line.")}>
            <MiniSquare className="content-between bg-neutral-950 text-white">
              <span className="font-mono text-[9px] leading-none tracking-[0.08em] text-neutral-400">RELEASE · 2026-10</span>
              <span className="grid gap-1.5">
                <span className="font-display text-[46px] leading-[0.8] font-extrabold tracking-[-0.04em] [font-stretch:125%]">1.0.1</span>
                <span className="text-[10px] leading-snug text-neutral-300">{t("版本说明见 GitHub Releases。", "Release notes on GitHub Releases.")}</span>
              </span>
            </MiniSquare>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("多件事、多种颜色，一眼读不懂。", "Many messages, many colours; nothing reads.")}>
            <MiniSquare className="content-center justify-items-center gap-1 bg-white text-center">
              <span className="font-display text-[22px] leading-none font-extrabold text-oxide-500 [font-stretch:125%]">1.0.1!</span>
              <span className="text-[13px] leading-tight font-bold text-blue-500">S3 Tables</span>
              <span className="bg-oxide-500 px-1 text-[11px] leading-tight font-bold text-white">{t("我们在招聘", "We're hiring")}</span>
              <span className="text-[13px] leading-tight font-bold text-green-700">35K+ Stars</span>
              <span className="text-[9px] leading-tight text-neutral-500">{t("扫码 · 报名 · 关注 · 转发", "Scan · sign up · follow · share")}</span>
            </MiniSquare>
          </DoDont>

          <DoDont kind="do" on="paper" bodyClassName="gap-4" caption={t("只用 Flow S，32px 仍可辨认。", "Flow S alone; recognisable at 32px.")}>
            <div className="flex items-end gap-5">
              {[64, 40, 28].map((s) => (
                <AvatarImg key={s} size={s} round />
              ))}
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" caption={t("头像里放完整字标。", "The full wordmark inside the avatar.")}>
            <div className="flex items-end gap-5">
              {[64, 40, 28].map((s) => (
                <span key={s} className="grid shrink-0 place-items-center rounded-full bg-blue-500 text-white" style={{ width: s, height: s }}>
                  <Wordmark className="h-auto w-[78%]" />
                </span>
              ))}
            </div>
          </DoDont>

          <DoDont kind="do" on="surface" caption={t("文字避开头像覆盖区。", "Type clears the avatar overlap.")}>
            <HeaderMock good />
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("文字被头像遮挡。", "Type hidden behind the avatar.")}>
            <HeaderMock good={false} />
          </DoDont>

          <DoDont kind="do" on="blue" bodyClassName="place-items-start content-center gap-2" caption={t("精确数字，注明来源与日期。", "Exact figure, source and date.")}>
            <span className="font-display text-[44px] leading-[0.85] font-extrabold tracking-[-0.03em] [font-stretch:125%]">34,869</span>
            <span className="font-display text-[17px] leading-tight font-[750] [font-stretch:112%]">{t("GitHub Star", "GitHub stars")}</span>
            <span className="font-mono text-[11px] leading-snug text-white/75">{t("数据来源：RustFS 官方网站 · 2026-10-14", "Source: official RustFS website · 2026-10-14")}</span>
          </DoDont>
          <DoDont kind="dont" on="blue" bodyClassName="place-items-start content-center gap-2" caption={t("约数加感叹号，无来源。", "Rounded figure, exclamation marks, no source.")}>
            <span className="font-display text-[44px] leading-[0.85] font-extrabold tracking-[-0.03em] [font-stretch:125%]">35K+</span>
            <span className="font-display text-[17px] leading-tight font-[750] tracking-[0.06em] uppercase [font-stretch:112%]">{t("Star 破纪录！！！", "Stars!!! Record!!!")}</span>
          </DoDont>

          <DoDont kind="do" bodyClassName="place-items-start content-center" caption={t("一句要点、一个链接、两个标签。", "One point, one link, two hashtags.")}>
            <p className="m-0 grid max-w-[32em] gap-1 text-sm leading-relaxed">
              <span>{t("RustFS 1.0.1 已发布。版本说明与升级步骤：", "RustFS 1.0.1 is out. Release notes and upgrade steps:")}</span>
              <span className="break-all text-link">https://github.com/rustfs/rustfs/releases</span>
              <span className="text-link">{t("#RustFS #对象存储", "#RustFS #ObjectStorage")}</span>
            </p>
          </DoDont>
          <DoDont kind="dont" bodyClassName="place-items-start content-center" caption={t("emoji、最高级、短链与成串标签。", "Emoji, superlatives, short links, hashtag walls.")}>
            <p className="m-0 max-w-[32em] text-sm leading-relaxed">
              {t("🚀 重磅！！史上最快的", "🚀 HUGE news!!! The fastest")} <span className="text-link">#S3</span> {t("存储来了", "storage ever")} <span className="text-link">bit.ly/xxxx</span> <span className="text-link">#Rust #{t("开源", "OpenSource")} #AI #{t("云原生", "Cloud")} #{t("存储", "Storage")}</span>
            </p>
          </DoDont>

          <DoDont kind="do" bodyClassName="place-items-stretch content-center" caption={t("写明类型、全部文字与图形。", "Image type, every word, the graphic.")}>
            <div className="grid gap-2 border border-dashed border-strong p-3">
              <span className="font-mono text-[11px] leading-none tracking-[0.06em] text-muted-foreground uppercase">{t("替代文本", "Alt text")}</span>
              <p className="m-0 line-clamp-4 text-[13px] leading-relaxed text-subtle">{lang === "zh" ? ALT.zh : ALT.en}</p>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="place-items-stretch content-center" caption={t("留空或只写文件名。", "Left empty or set to the file name.")}>
            <div className="grid gap-2 border border-dashed border-strong p-3">
              <span className="font-mono text-[11px] leading-none tracking-[0.06em] text-muted-foreground uppercase">{t("替代文本", "Alt text")}</span>
              <p className="m-0 font-mono text-[13px] leading-relaxed text-subtle">post-release-1080x1080@2x.png</p>
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="social" />
    </Page>
  )
}
