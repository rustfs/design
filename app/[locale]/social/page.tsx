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
        {t(
          <><b>检查：</b>头像在 32px 下须仍可辨认。各平台的圆形与方形裁切使用同一张图，不得为单个平台另做版本，不得改用字标或加入文字。</>,
          <><b>Check:</b> the avatar must stay recognisable at 32px. Circle and square crops on every platform use the same image; never make a platform-specific variant, substitute the wordmark or add text.</>,
        )}
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
        <span className={cn("absolute left-[6%] font-display text-[17px] leading-[1.05] font-[750] text-white [font-stretch:112%]", good ? "top-[16%]" : "bottom-[10%]")}>
          Every byte,
          <br />
          accounted for.
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
          "GitHub、X、LinkedIn、YouTube、Bilibili、微信、小红书与社区渠道的账号资料素材和帖子模板。头像与页眉让每个账号一眼可辨；每条帖子只讲一件事，在信息流的缩略尺寸下仍须清晰可读。",
          "Profile assets and post templates for GitHub, X, LinkedIn, YouTube, Bilibili, WeChat, Xiaohongshu and community channels. Avatars and headers make every account recognisable at a glance; every post carries one message and must stay legible at feed size.",
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
        lede={
          <>
            <p>
              {t(
                "所有平台使用同一枚头像：Signal Blue 底上的 Flow S 符号。页眉与横幅按各平台的显示裁切设计，文字与标志须避开平台遮挡的区域。",
                "Every platform uses the same avatar: the Flow S symbol on Signal Blue. Headers and banners are designed for each platform's display crop, and type and logo must stay clear of the areas the platform covers.",
              )}
            </p>
            <p>
              {t(
                "下表为截至 2026 年 10 月的平台尺寸。平台规则可能调整，上传后须分别在桌面端与手机端检查一次。画板上的橙色虚线为裁切与遮挡预览，不随导出。",
                "The sizes below apply as of October 2026. Platform rules change, so check every upload once on desktop and once on a phone. Orange dashed lines on the artboards preview crops and overlaps; they are not exported.",
              )}
            </p>
          </>
        }
      >
        <Table
          mono={[2]}
          className="[&_table]:min-w-[760px] [&_td:nth-child(3)]:whitespace-nowrap"
          head={[t("平台", "Platform"), t("素材", "Asset"), t("画板", "Artboard"), t("显示与裁切", "Display and crop")]}
          rows={[
            [t("全部平台", "All platforms"), t("头像", "Avatar"), "400 × 400", t("圆形或方形裁切，最小显示约 32px。导出 @2x 为 800 × 800，满足 YouTube 推荐尺寸。", "Cropped to a circle or a square and shown as small as about 32px. The @2x export is 800 × 800, YouTube's recommended size.")],
            ["GitHub", t("社交预览图", "Social preview"), "1280 × 640", t("仓库链接在 X、Slack、微信等处展开时显示。四周 40px 内不得放置内容。", "Shown when a repository link unfurls on X, Slack, WeChat and elsewhere. Nothing may sit within 40px of the edge.")],
            ["GitHub", t("组织主页 / README 横幅", "Organisation / README banner"), "1280 × 320", t("随 README 宽度缩放，手机上约 360px 宽。须导出 Ink 与 Paper 两版，分别对应深色与浅色主题。", "Scales with the README, to about 360px wide on a phone. Export an Ink and a Paper version for the dark and light themes.")],
            ["X", t("页眉", "Header"), "1500 × 500", t("头像压住左下角；部分设备会裁去上下边缘，文字须距上下边至少 10u。", "The avatar covers the bottom left, and some devices trim the top and bottom edges; keep type at least 10u from both.")],
            ["LinkedIn", t("公司主页封面", "Company page cover"), "1128 × 191", t("公司标志压住左下角，手机端两侧可能被裁切；文字须位于中部。", "The company logo covers the bottom left and phones may trim both sides; keep type in the middle.")],
            ["YouTube", t("频道横幅", "Channel banner"), "2560 × 1440", t("电视显示全图，桌面显示中部 2560 × 423，手机只显示居中的 1546 × 423；字标与文字须位于该安全区内。", "TVs show the full image, desktops the middle 2560 × 423 band and phones only the centred 1546 × 423; wordmark and type must sit inside that safe area.")],
            [t("Bilibili、微信、小红书", "Bilibili, WeChat, Xiaohongshu"), t("头像", "Avatar"), "400 × 400", t("使用同一枚头像。Bilibili 空间头图等未列出的页眉，按平台上传界面标注的尺寸制作，沿用 X 页眉的构图。", "Use the same avatar. Headers not listed here, such as the Bilibili space banner, follow the size given in the platform's upload dialog and reuse the X header composition.")],
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
            note={t(
              <><b>规格：</b>Flow S 符号居中，符号框宽为画板的 58%，圆形裁切后四周仍留有空白。只使用 Signal Blue 底。</>,
              <><b>Spec:</b> the Flow S symbol is centred in a box 58% of the artboard wide, leaving clear space after the circle crop. Signal Blue only.</>,
            )}
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
            note={t(
              <><b>用途：</b>在仓库 Settings 中上传。链接卡片在聊天工具中常缩至 360px 宽，标题字号不小于 8u。</>,
              <><b>Use:</b> upload in the repository Settings. Link cards in chat apps often shrink to 360px wide, so the title is at least 8u.</>,
            )}
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
            note={t(
              <><b>用途：</b>X 账号页眉。左下虚线圆为头像覆盖区，不得放置任何内容；品牌语位于左上，图形向右延伸。</>,
              <><b>Use:</b> the X profile header. The dashed circle bottom left is the avatar overlap and stays empty; the brand line sits top left and the graphic runs to the right.</>,
            )}
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
              <><b>用途：</b>组织主页与仓库 README 顶部。应以 <code>&lt;picture&gt;</code> 同时提供 Ink 与 Paper 两版，分别对应 GitHub 深色与浅色主题。</>,
              <><b>Use:</b> the top of the organisation profile and repository READMEs. Serve the Ink and Paper versions together with <code>&lt;picture&gt;</code> for GitHub&apos;s dark and light themes.</>,
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
            note={t(
              <><b>用途：</b>LinkedIn 公司主页封面。左下虚线框为公司标志覆盖区；品牌语居中偏左，图形位于右侧。</>,
              <><b>Use:</b> the LinkedIn company page cover. The dashed box bottom left is the logo overlap; the brand line sits centre left and the graphic on the right.</>,
            )}
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
            note={t(
              <><b>用途：</b>YouTube 频道横幅。字标与品牌语位于安全区内，在所有设备上完整显示；分片矩阵延伸至全图，电视上完整可见。</>,
              <><b>Use:</b> the YouTube channel banner. The wordmark and brand line sit inside the safe area and show in full on every device; the shard matrix extends across the whole image and is seen in full on TVs.</>,
            )}
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
        lede={
          <p>
            {t(
              "帖子分为方形、竖版、全屏竖版与轮播四类，短边均为 1080px，即 u = 10.8px，安全边距 7u。选择「编辑文字」可直接修改画板文字，切换底色与语言后选择「导出 PNG」。",
              "Posts come in four formats: square, portrait, vertical and carousel. Each is 1080px on its short side, so u = 10.8px and the safe margin is 7u. Choose Edit text to change the copy on the artboard, switch surface and language as needed, then choose Export PNG.",
            )}
          </p>
        }
      >
        <Rules
          items={[
            [t("① 一个焦点", "① One focus"), t("一个标签、一个主体、一个图形。Oxide 只出现一次，用于校验分片或唯一的强调点。", "One label, one hero, one graphic. Oxide appears once, for parity or the single point of emphasis.")],
            [t("② 信息流字号", "② Feed-size type"), t("帖子在信息流中约 320px 宽。主体不小于 7u，正文不小于 3.5u，标签不小于 2.5u。", "Posts appear about 320px wide in a feed. Heroes are at least 7u, body text 3.5u and labels 2.5u.")],
            [t("③ 占位内容", "③ Placeholders"), t("虚线下划线为占位内容，发布前须全部替换。演讲者、合作方等位置不得使用虚构的人名或标志。", "Dashed underlines mark placeholders; replace every one before publishing. Speaker and partner slots never carry invented names or logos.")],
            [t("④ 轮播", "④ Carousels"), t("每页一步，页码 1/4 至 4/4 与发布顺序一致。第 1 页须单独成立，最后一页给出链接。", "One step per slide; page numbers 1/4 to 4/4 follow the publishing order. Slide 1 must stand on its own and the last slide gives the link.")],
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
            {t(
              <><b>信息流尺寸：</b>以上为实际显示宽度。发布前应将导出图缩至该宽度检查：主体须一眼可读，正文可退居其次，命令与网址在点开大图后可读即可。</>,
              <><b>Feed size:</b> shown at actual display width. Before publishing, scale the export down to this width and check it: the hero must read at a glance, body text may recede, and commands and URLs only need to read once the image is opened.</>,
            )}
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
          <Template span={6} title={t("版本发布", "Release")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["ink", "paper", "signal"]} tags={["square"]} file="post-release" note={t(<><b>用途：</b>主版本与补丁版本发布。版本号是唯一主体；新版本只替换版本号与日期。</>, <><b>Use:</b> major and patch releases. The version number is the sole hero; a new release changes only the number and the date.</>)}>
            <PostRelease />
          </Template>
          <Template span={6} title={t("功能聚焦", "Feature spotlight")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["paper", "white", "ink"]} tags={["square"]} file="post-feature" note={t(<><b>用途：</b>介绍单个功能。状态须与官方文档一致，预览功能须标注「预览」并以 Oxide 方块标记；示意图须说明功能的实际结构。</>, <><b>Use:</b> one feature per post. The status must match the official documentation; Preview features carry the label and the Oxide marker, and the diagram shows how the feature is actually structured.</>)}>
            <PostFeature />
          </Template>

          <Template span={4} title={t("使用提示", "Tip")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["ink", "paper"]} tags={["square"]} file="post-tip" note={t(<><b>用途：</b>每条一个提示。命令须照录 RustFS README 或官方文档，不得改写，不得虚构程序输出。</>, <><b>Use:</b> one tip per post. Commands are copied verbatim from the RustFS README or documentation; program output is never invented.</>)}>
            <PostTip />
          </Template>
          <Template span={4} title={t("数据里程碑", "Milestone")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["signal", "ink", "paper"]} tags={["square"]} file="post-milestone" note={t(<><b>用途：</b>里程碑。数字须与来源完全一致，并注明来源与统计日期；不得写成「35K+」之类的约数。</>, <><b>Use:</b> milestones. The figure matches its source exactly and carries the source and date; never round it into forms such as “35K+”.</>)}>
            <PostStat />
          </Template>
          <Template span={4} title={t("线下交流会", "Meetup")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["paper", "ink", "signal"]} tags={["square"]} file="post-meetup" note={t(<><b>用途：</b>线下活动。城市、日期、时间与场地均为占位内容；日历中的橙色方块须对应活动当天。</>, <><b>Use:</b> in-person events. City, date, time and venue are placeholders; the orange square in the calendar marks the event day.</>)}>
            <PostMeetup />
          </Template>

          <Template span={4} title={t("招聘", "Hiring")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["ink", "paper", "white"]} tags={["square"]} file="post-hiring" note={t(<><b>用途：</b>招聘。图中只写职位名称、地点与用工形式；职责与待遇写在正文链接指向的职位页面中。</>, <><b>Use:</b> hiring. The image names only the role, location and employment type; responsibilities and terms belong on the job page linked from the caption.</>)}>
            <PostHiring />
          </Template>
          <Template span={4} title={t("设计原则", "Principle")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["signal", "ink", "paper"]} tags={["square"]} file="post-principle" note={t(<><b>用途：</b>品牌原则。引文只能取自 RustFS 设计原则，署名为「RustFS 设计原则」，不得署个人姓名。</>, <><b>Use:</b> brand principles. Quotes come only from the RustFS design principles and are attributed to them, never to a named person.</>)}>
            <PostPrinciple />
          </Template>
          <Template span={4} title={t("感谢贡献者", "Contributor thanks")} spec="1080 × 1080 · 1 : 1" w={1080} h={1080} themes={["paper", "white", "ink"]} tags={["square"]} file="post-thanks" note={t(<><b>用途：</b>感谢贡献者。账号、PR 编号与标题须与 GitHub 记录一致，头像使用贡献者在 GitHub 公开的头像；发布前应征得本人同意。</>, <><b>Use:</b> thanking contributors. Handle, PR number and title match the GitHub record and the avatar is the contributor’s public GitHub avatar; ask the contributor before posting.</>)}>
            <PostThanks />
          </Template>

          <Template span={6} title={t("竖版 · 博客文章", "Portrait · blog post")} spec="1080 × 1350 · 4 : 5" w={1080} h={1350} themes={["ink", "paper", "signal"]} tags={["portrait"]} file="portrait-blog" note={t(<><b>用途：</b>推广博客文章。标题与博客原文一致；示意图只说明文章的核心做法。</>, <><b>Use:</b> promoting a blog post. The title matches the article; the diagram shows only the article’s core idea.</>)}>
            <PortraitMigrate />
          </Template>
          <Template span={6} title={t("竖版 · 功能一览", "Portrait · feature round-up")} spec="1080 × 1350 · 4 : 5" w={1080} h={1350} themes={["paper", "white", "ink"]} tags={["portrait"]} file="portrait-features" note={t(<><b>用途：</b>功能盘点。状态标签与官方功能状态一致：可用、预览、可选构建；只有预览项使用 Oxide 标记。</>, <><b>Use:</b> feature round-ups. Status labels follow the official feature status: Available, Preview, Opt-in. Only Preview items carry the Oxide marker.</>)}>
            <PortraitFeatures />
          </Template>

          <Template span={3} title={t("轮播 1 / 4 · 问题", "Carousel 1 / 4 · question")} spec="1080 × 1350" w={1080} h={1350} themes={["paper", "ink"]} tags={["carousel"]} file="carousel-ec-1" presentGroup="ec-carousel" note={t(<><b>用途：</b>分步讲解原理，示例为 EC 4+2。四页同一底色，矩阵位置不变，只有状态变化；LinkedIn 以 PDF 文档上传。</>, <><b>Use:</b> step-by-step explainers; this set covers EC 4+2. All four slides share one surface and the matrix stays in place while its state changes. On LinkedIn, upload the set as a PDF document.</>)}>
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

          <Template span={4} title={t("小红书笔记封面", "Xiaohongshu note cover")} spec="1080 × 1440 · 3 : 4" w={1080} h={1440} themes={["paper", "white", "ink"]} langs={["zh"]} tags={["portrait"]} file="xhs-cover" note={t(<><b>用途：</b>小红书笔记封面，仅中文。双列信息流中宽约 180px，标题不小于 10u；正文不支持外链，网址写在图中。</>, <><b>Use:</b> Xiaohongshu note covers, Chinese only. The two-column feed shows covers about 180px wide, so titles are at least 10u; captions cannot carry links, so the address is set in the image.</>)}>
            <XhsCover />
          </Template>
          <Template span={4} title={t("全屏竖版 · 直播海报", "Vertical · livestream poster")} spec={t("1080 × 1920 · 视频号 / Stories", "1080 × 1920 · Channels / Stories")} w={1080} h={1920} themes={["ink", "signal", "paper"]} tags={["vertical"]} file="story-livestream" note={t(<><b>用途：</b>直播与活动的全屏竖版海报。顶部 250px 与底部 340px 会被平台界面遮挡，只放图形，不放文字。</>, <><b>Use:</b> full-screen posters for livestreams and events. Platform controls cover the top 250px and bottom 340px, so those areas hold graphics only, never text.</>)}>
            <StoryLive />
          </Template>
          <Template span={4} title={t("朋友圈海报", "WeChat Moments poster")} spec="1080 × 1920 · 9 : 16" w={1080} h={1920} themes={["ink", "signal", "paper"]} langs={["zh"]} tags={["vertical"]} file="moments-poster" note={t(<><b>用途：</b>微信朋友圈海报，仅中文。二维码指向 https://rustfs.com，须保留白色底框以便识别，不得替换为第三方短链。</>, <><b>Use:</b> WeChat Moments posters, Chinese only. The QR code points to https://rustfs.com and keeps its white backing so it scans; never replace it with a third-party short link.</>)}>
            <MomentsPoster />
          </Template>
        </TemplateGrid>
      </Section>

      {/* ================= Writing ================= */}
      <Section
        id="writing"
        tag="Writing for social"
        title={t("帖子文案", "Writing for social")}
        lede={
          <p>
            {t(
              "图片承载一件事，正文补充上下文，链接与标签各有固定位置。以下规则适用于全部平台；平台差异见本节末尾的表格。",
              "The image carries one message, the caption adds context, and links and hashtags each have a fixed place. These rules apply on every platform; differences between platforms are listed in the table at the end of this section.",
            )}
          </p>
        }
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
              [t("一帖一事", "One message per post"), t("每条帖子只讲一件事：一个版本、一个功能、一条提示或一场活动。要讲多件事时，拆成多条帖子或改用轮播。", "Each post says one thing: one release, one feature, one tip or one event. To say more, split it into several posts or use a carousel.")],
              [t("标签不超过 2 个", "At most two hashtags"), t("只用 #RustFS 加一个主题标签，如 #对象存储 或 #ObjectStorage，放在正文末尾。不得在句中插入标签。", "Use #RustFS plus one topic tag, such as #ObjectStorage, at the end of the post. Never put hashtags inside a sentence.")],
              [t("链接", "Links"), t("每条帖子最多一个链接，单独成行，放在标签之前；使用官方域名的完整地址：rustfs.com、docs.rustfs.com、github.com/rustfs/rustfs。不得使用第三方短链。不支持外链的平台在图中写出网址。", "At most one link per post, on its own line before the hashtags, as a full address on an official domain: rustfs.com, docs.rustfs.com or github.com/rustfs/rustfs. Third-party link shorteners must not be used. Where a platform has no clickable links, set the address in the image.")],
              [t("替代文本必填", "Alt text is required"), t("每张图片都须填写替代文本：先说明图片类型，再完整写出图中文字，最后用一句话描述图形。示例见本节帖子样例中的 ④。", "Every image carries alt text: state what kind of image it is, transcribe all of its text, then describe the graphic in one sentence. See ④ in the sample post.")],
              [t("提及账号须准确", "Mention handles exactly"), t("提及个人或组织时，使用其在该平台上的准确账号，发布前打开主页核对；无法确认时写全称，不加 @。", "When mentioning a person or an organisation, use their exact handle on that platform and open the profile to check it before posting. If the handle cannot be confirmed, write the full name without @.")],
              [t("每条帖子只用一种语言", "One language per post"), t("中文平台用中文，国际平台用英文，双语内容分两条发布。中文使用全角标点，中文与英文、数字之间加空格；英文使用句首大写，不用全大写表示强调。", "Chinese on Chinese platforms, English on international ones; bilingual content goes out as two posts. Chinese uses full-width punctuation with a space between Chinese and Latin text or numerals. English uses sentence case and never capitals for emphasis.")],
              [t("不使用 emoji", "No emoji"), t("图片与正文一律不使用 emoji，功能性 emoji 也不例外。需要提示时直接用文字：「链接：」「时间：」「地点：」。", "No emoji in graphics or captions, functional ones included. Use words instead: “Link:”, “When:”, “Where:”.")],
              [t("数字注明来源与日期", "Figures carry a source and date"), t("正文中的数字须与图片一致，并注明来源与统计日期。不得使用最高级或无法核实的说法。", "Figures in the caption match the image and carry their source and date. Superlatives and claims that cannot be verified are not permitted.")],
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
          head={[t("平台", "Platform"), t("语言", "Language"), t("正文", "Caption"), t("链接", "Link"), t("图片", "Images")]}
          rows={[
            ["X", t("英文", "English"), t("不超过 280 字符，首句即要点", "Up to 280 characters; lead with the point"), t("正文末尾，标签之前", "End of the post, before the hashtags"), t("方形、竖版", "Square, portrait")],
            ["LinkedIn", t("英文", "English"), t("前两行讲清要点，其后内容会被折叠", "Make the point in the first two lines; the rest is folded"), t("正文末尾", "End of the post"), t("方形、竖版；轮播以 PDF 文档上传", "Square, portrait; carousels as a PDF document")],
            [t("微信朋友圈", "WeChat Moments"), t("中文", "Chinese"), t("一至三句，不加标签", "One to three sentences, no hashtags"), t("不放链接，以海报二维码代替", "No link; the poster's QR code replaces it"), t("朋友圈海报", "Moments poster")],
            [t("小红书", "Xiaohongshu"), t("中文", "Chinese"), t("标题不超过 20 字；正文分段，命令写在图中", "Title up to 20 characters; short paragraphs, with commands in the image"), t("不支持外链，网址写在图中", "No clickable links; set the address in the image"), t("3 : 4 封面", "3 : 4 cover")],
            [t("Bilibili 动态", "Bilibili posts"), t("中文", "Chinese"), t("一至三句", "One to three sentences"), t("正文末尾", "End of the post"), t("方形、竖版", "Square, portrait")],
            [t("社区群组", "Community groups"), t("按群组语言", "The group's language"), t("一句说明加一个链接", "One sentence and one link"), t("单独一行", "On its own line"), t("方形；不发长图", "Square; no long images")],
          ]}
        />
      </Section>

      {/* ================= Do & Don't ================= */}
      <Section id="rules" tag="Do & Don't" title={t("发布前检查", "Before you publish")} lede={<p>{t("发布前，须逐项对照以下规则。", "Check every post and profile asset against these rules before publishing.")}</p>}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="surface" caption={t("一帖一事：一个标签、一个主体、一句说明。", "One message: one label, one hero, one supporting line.")}>
            <MiniSquare className="content-between bg-neutral-950 text-white">
              <span className="font-mono text-[9px] leading-none tracking-[0.08em] text-neutral-400">RELEASE · 2026-10</span>
              <span className="grid gap-1.5">
                <span className="font-display text-[46px] leading-[0.8] font-extrabold tracking-[-0.04em] [font-stretch:125%]">1.0.1</span>
                <span className="text-[10px] leading-snug text-neutral-300">{t("版本说明见 GitHub Releases。", "Release notes on GitHub Releases.")}</span>
              </span>
            </MiniSquare>
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("一张图塞进多件事，多种颜色争夺注意力，在信息流中无法一眼读懂。", "Several messages in one image and colours competing for attention; nothing reads at a glance in the feed.")}>
            <MiniSquare className="content-center justify-items-center gap-1 bg-white text-center">
              <span className="font-display text-[22px] leading-none font-extrabold text-oxide-500 [font-stretch:125%]">1.0.1!</span>
              <span className="text-[13px] leading-tight font-bold text-blue-500">S3 Tables</span>
              <span className="bg-oxide-500 px-1 text-[11px] leading-tight font-bold text-white">{t("我们在招聘", "We're hiring")}</span>
              <span className="text-[13px] leading-tight font-bold text-green-700">35K+ Stars</span>
              <span className="text-[9px] leading-tight text-neutral-500">{t("扫码 · 报名 · 关注 · 转发", "Scan · sign up · follow · share")}</span>
            </MiniSquare>
          </DoDont>

          <DoDont kind="do" on="paper" bodyClassName="gap-4" caption={t("头像只用 Flow S 符号，在 32px 下仍可辨认。", "The avatar is the Flow S symbol alone and stays recognisable at 32px.")}>
            <div className="flex items-end gap-5">
              {[64, 40, 28].map((s) => (
                <AvatarImg key={s} size={s} round />
              ))}
            </div>
          </DoDont>
          <DoDont kind="dont" on="paper" caption={t("把完整字标塞进头像，小尺寸下无法辨认。", "The full wordmark squeezed into the avatar; illegible at small sizes.")}>
            <div className="flex items-end gap-5">
              {[64, 40, 28].map((s) => (
                <span key={s} className="grid shrink-0 place-items-center rounded-full bg-blue-500 text-white" style={{ width: s, height: s }}>
                  <Wordmark className="h-auto w-[78%]" />
                </span>
              ))}
            </div>
          </DoDont>

          <DoDont kind="do" on="surface" caption={t("页眉文字位于头像覆盖区之外。", "Header type sits clear of the avatar overlap.")}>
            <HeaderMock good />
          </DoDont>
          <DoDont kind="dont" on="surface" caption={t("文字落在左下角，被头像遮挡。", "Type placed bottom left, hidden behind the avatar.")}>
            <HeaderMock good={false} />
          </DoDont>

          <DoDont kind="do" on="blue" bodyClassName="place-items-start content-center gap-2" caption={t("数字精确，注明来源与统计日期。", "An exact figure with its source and date.")}>
            <span className="font-display text-[44px] leading-[0.85] font-extrabold tracking-[-0.03em] [font-stretch:125%]">34,869</span>
            <span className="font-display text-[17px] leading-tight font-[750] [font-stretch:112%]">{t("GitHub Star", "GitHub stars")}</span>
            <span className="font-mono text-[11px] leading-snug text-white/75">{t("数据来源：RustFS 官方网站 · 2026-10-14", "Source: official RustFS website · 2026-10-14")}</span>
          </DoDont>
          <DoDont kind="dont" on="blue" bodyClassName="place-items-start content-center gap-2" caption={t("约数与感叹号，没有来源与日期。", "A rounded figure and exclamation marks, with no source or date.")}>
            <span className="font-display text-[44px] leading-[0.85] font-extrabold tracking-[-0.03em] [font-stretch:125%]">35K+</span>
            <span className="font-display text-[17px] leading-tight font-[750] tracking-[0.06em] uppercase [font-stretch:112%]">{t("Star 破纪录！！！", "Stars!!! Record!!!")}</span>
          </DoDont>

          <DoDont kind="do" bodyClassName="place-items-start content-center" caption={t("一句要点、一个链接、两个标签，各在其位。", "One point, one link, two hashtags, each in its place.")}>
            <p className="m-0 grid max-w-[32em] gap-1 text-sm leading-relaxed">
              <span>{t("RustFS 1.0.1 已发布。版本说明与升级步骤：", "RustFS 1.0.1 is out. Release notes and upgrade steps:")}</span>
              <span className="break-all text-link">https://github.com/rustfs/rustfs/releases</span>
              <span className="text-link">{t("#RustFS #对象存储", "#RustFS #ObjectStorage")}</span>
            </p>
          </DoDont>
          <DoDont kind="dont" bodyClassName="place-items-start content-center" caption={t("emoji、最高级用语、第三方短链与成串的标签。", "Emoji, superlatives, a third-party short link and a wall of hashtags.")}>
            <p className="m-0 max-w-[32em] text-sm leading-relaxed">
              {t("🚀 重磅！！史上最快的", "🚀 HUGE news!!! The fastest")} <span className="text-link">#S3</span> {t("存储来了", "storage ever")} <span className="text-link">bit.ly/xxxx</span> <span className="text-link">#Rust #{t("开源", "OpenSource")} #AI #{t("云原生", "Cloud")} #{t("存储", "Storage")}</span>
            </p>
          </DoDont>

          <DoDont kind="do" bodyClassName="place-items-stretch content-center" caption={t("替代文本写明图片类型、图中全部文字与图形。", "Alt text names the image type, transcribes every word and describes the graphic.")}>
            <div className="grid gap-2 border border-dashed border-strong p-3">
              <span className="font-mono text-[11px] leading-none tracking-[0.06em] text-muted-foreground uppercase">{t("替代文本", "Alt text")}</span>
              <p className="m-0 line-clamp-4 text-[13px] leading-relaxed text-subtle">{lang === "zh" ? ALT.zh : ALT.en}</p>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="place-items-stretch content-center" caption={t("替代文本留空或只写文件名。", "Alt text left empty or set to the file name.")}>
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
