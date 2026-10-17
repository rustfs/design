import type { Metadata } from "next"
import type { ReactNode } from "react"
import { TemplateGrid } from "@/components/artboard/template"
import { Icon } from "@/components/brand/icon"
import { Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import { CodeBlock } from "@/components/site/code-block"
import { DoDont, Page, PageFooter, PageHeader, Section, Spec, Sub, Table } from "@/components/site/page"
import { isLocale, setLocale, t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { PageSectionTemplates } from "./_artboards"
import { AnnouncementDemo, ChecksDemo, CommandBar, HealDemo, InputsDemo, NavDemo, OverlayDemo, QuotaDemo, SelectDemo, SkeletonDemo, TabsDemo, ToastDemo } from "./_demos"
import { EmailTemplate, MAIL_BUTTON_CODE } from "./_email"
import { HEAL_CSS, MotionStyles, SKELETON_CSS } from "./_styles"
import { Cell, Row, Rules, Sample, Specimen } from "./_kit"
import {
  ANNOUNCE_CODE,
  BADGE_SOLID,
  Btn,
  BUTTON_CODE,
  CALLOUT,
  CALLOUT_BODY,
  CALLOUT_CODE,
  CALLOUT_MARK,
  CALLOUT_TITLE,
  CARD,
  CARD_ARROW,
  CARD_CODE,
  CARD_ICON,
  CARD_MORE,
  CARD_TEXT,
  CARD_TITLE,
  CHECK_CODE,
  CHIP,
  CHIP_CODE,
  CMD_CODE,
  COUNT,
  cx,
  EMPTY,
  EMPTY_CODE,
  EMPTY_TEXT,
  EMPTY_TITLE,
  FOOTER,
  FOOTER_BASE,
  FOOTER_CODE,
  FOOTER_GRID,
  FOOTER_HEAD,
  FOOTER_LINK,
  INPUT,
  INPUT_CODE,
  LINK_GROW,
  MARK,
  NAV_CODE,
  PROGRESS_CODE,
  SELECT_CODE,
  SHARD,
  SHARDS,
  TABLE,
  TABLE_CODE,
  TABLE_WRAP,
  TABS_CODE,
  TD,
  TD_NUM,
  TH,
  TH_NUM,
  TOAST_CODE,
  TR,
} from "./_ui"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "网站与组件" : "Web & UI" }
}

const INSTALL = "curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh"

const SETUP_CODE = `/* app/globals.css */
@import "tailwindcss";
@import "./tailwind.css"; /* RustFS tokens: colours, type, radius 0, easing */

/* app/layout.tsx */
import { Archivo, Geist, Geist_Mono } from "next/font/google"

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" })
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

<html className={\`\${archivo.variable} \${geistSans.variable} \${geistMono.variable}\`}>`

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

const DOCKER = `# Create data and logs directories
mkdir -p data logs

# Change the owner of these directories
chown -R 10001:10001 data logs

docker run -d -p 9000:9000 -p 9001:9001 -v $(pwd)/data:/data -v $(pwd)/logs:/logs rustfs/rustfs:latest`

function Mono({ children }: { children: ReactNode }) {
  return <code>{children}</code>
}

export default async function WebPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (isLocale(locale)) setLocale(locale)

  const drives = [
    ["/data/rustfs0", "node-01", "online", "3.42", "7.28"],
    ["/data/rustfs1", "node-01", "online", "3.39", "7.28"],
    ["/data/rustfs2", "node-02", "healing", "1.07", "7.28"],
    ["/data/rustfs3", "node-02", "degraded", "6.91", "7.28"],
    ["/data/rustfs4", "node-03", "offline", "—", "7.28"],
    ["/data/rustfs5", "node-03", "online", "3.40", "7.28"],
  ] as const
  const stateLabel = { online: t("在线", "Online"), healing: t("修复中", "Healing"), degraded: t("降级", "Degraded"), offline: t("离线", "Offline") }

  return (
    <Page>
      <MotionStyles />
      <PageHeader
        path="s3://rustfs-brand/web/"
        label={t("Guidelines · 网站与组件", "Guidelines · Web & UI")}
        title={t("网站与组件", "Web & UI")}
        subtitle={t("Web & UI", "网站与组件")}
        lede={t(
          "官网、文档站与控制台的界面标准。引入 tokens/tailwind.css，shadcn/ui 项目即可切换为 RustFS 品牌。",
          "The interface standard for the RustFS site, docs and Console. Import tokens/tailwind.css and any shadcn/ui project takes on the brand.",
        )}
        meta={[
          { k: t("组件", "Components"), v: "16" },
          { k: t("页面模板", "Page templates"), v: "15" },
          { k: t("技术栈", "Stack"), v: "Tailwind v4 · shadcn/ui" },
          { k: t("令牌", "Tokens"), v: "tokens/tailwind.css" },
        ]}
      />

      {/* ------------------------------------------------------------ Foundations */}
      <Section
        id="foundations"
        tag="Foundations for UI"
        title={t("界面基础", "Foundations for UI")}
        lede={
          <p>
            {t("4px 基数、12 栏网格、1240px 内容宽；直角、1px 分隔线，阴影只用于浮层。", "A 4px base, 12 columns, 1240px content; square corners, 1px rules, shadows on overlays only.")}
          </p>
        }
      >
        <Sub title={t("接入", "Setup")} aside="tokens/tailwind.css">
          <div className="grid items-start gap-x-8 gap-y-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <CodeBlock title="globals.css · layout.tsx" lang="tsx" code={SETUP_CODE} />
            <Rules
              items={[
                t(
                  <>
                    <b>只引入一个文件。</b>
                    <a className="text-link underline underline-offset-4" href="/tokens/tailwind.css">tokens/tailwind.css</a> 定义全部令牌，并把 <Mono>--radius</Mono> 与 <Mono>rounded-*</Mono> 归零。
                  </>,
                  <>
                    <b>Import one file.</b> <a className="text-link underline underline-offset-4" href="/tokens/tailwind.css">tokens/tailwind.css</a> defines every token and sets <Mono>--radius</Mono> and <Mono>rounded-*</Mono> to 0.
                  </>,
                ),
                t(
                  <>
                    <b>语义优先。</b>组件只用 <Mono>bg-primary</Mono>、<Mono>border-border</Mono> 等语义类；色阶类仅用于悬停与按下。
                  </>,
                  <>
                    <b>Semantic first.</b> Components use semantic classes such as <Mono>bg-primary</Mono> and <Mono>border-border</Mono>; scale classes only for hover and pressed.
                  </>,
                ),
                t(
                  <>
                    <b>深色模式。</b>在 <Mono>{"<html>"}</Mono> 上切换 <Mono>.dark</Mono>，组件无需 <Mono>dark:</Mono> 变体。
                  </>,
                  <>
                    <b>Dark mode.</b> Toggle <Mono>.dark</Mono> on <Mono>{"<html>"}</Mono>; components need no <Mono>dark:</Mono> variants.
                  </>,
                ),
              ]}
            />
          </div>
        </Sub>

        <Sub title={t("网格与断点", "Grid and breakpoints")} aside="max-w-[1240px] · px-[clamp(16px,4.2vw,64px)]">
          <Spec
            bodyClassName="grid-cols-1 place-items-stretch p-0 min-h-0"
            aside="grid-cols-4 · sm:grid-cols-8 · lg:grid-cols-12"
          >
            <div className="grid grid-cols-[clamp(16px,4.2vw,64px)_minmax(0,1fr)_clamp(16px,4.2vw,64px)] bg-surface">
              <div className="bg-[repeating-linear-gradient(135deg,var(--strong)_0_1px,transparent_1px_7px)]" aria-hidden="true" />
              <div className="grid grid-cols-4 gap-4 py-5 sm:grid-cols-8 sm:gap-6 lg:grid-cols-12">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className={cn("grid h-36 content-end justify-items-center bg-brand/12 pb-2 font-mono text-[11px] text-brand dark:bg-brand/20", i >= 4 && "hidden sm:grid", i >= 8 && "sm:hidden lg:grid")}>
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="bg-[repeating-linear-gradient(135deg,var(--strong)_0_1px,transparent_1px_7px)]" aria-hidden="true" />
            </div>
          </Spec>
          <Table
            className="[&_table]:min-w-[640px]"
            mono={[0, 1, 2, 3]}
            head={[t("断点", "Breakpoint"), t("最小宽度", "Min width"), t("栏数", "Columns"), t("栏间距", "Gutter"), t("布局", "Layout")]}
            rows={[
              ["base", "0", "4", "16px", t("单栏；按钮通栏；导航收为菜单", "Single column; full-width buttons; menu nav")],
              ["sm", "640px", "8", "24px", t("卡片两栏", "Two-column cards")],
              ["md", "768px", "8", "24px", t("完整导航；标题与导语并排", "Full nav; heading beside lede")],
              ["lg", "1024px", "12", "24px", t("文档侧栏；卡片三栏", "Docs sidebar; three-column cards")],
              ["xl", "1280px", "12", "24px", t("内容达 1240px", "Content reaches 1240px")],
              ["2xl", "1536px", "12", "24px", t("内容不变，仅边距增加", "Content fixed; margins grow")],
            ]}
          />
        </Sub>

        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
          <Sub title={t("间距", "Spacing")} aside={t("基数 4px", "4px base")}>
            <div className="grid gap-2.5 border border-border p-[clamp(16px,2.4vw,28px)]">
              {[
                [1, 4],
                [2, 8],
                [3, 12],
                [4, 16],
                [6, 24],
                [8, 32],
                [12, 48],
                [16, 64],
                [24, 96],
                [32, 128],
              ].map(([k, px]) => (
                <div key={k} className="grid grid-cols-[40px_52px_minmax(0,1fr)] items-center gap-3 font-mono text-xs">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="tabular-nums">{px}px</span>
                  <i className="block h-2.5 max-w-full bg-brand" style={{ width: px }} />
                </div>
              ))}
            </div>
            <Rules
              items={[
                t("组件内 4–16px；组件间 24–32px；内容组间 48–64px；区块间 96–128px。", "Within a component 4–16px; between components 24–32px; between groups 48–64px; between sections 96–128px."),
                t("不得使用 4px 网格外的数值（如 13px、18px）；字号与行高除外。", "No values off the 4px grid, such as 13px or 18px; type sizes and line heights are exempt."),
              ]}
            />
          </Sub>

          <Sub title={t("圆角、边框、层级与焦点", "Radius, borders, elevation, focus")} aside="radius 0 · 1px · shadow-overlay · 2px ring">
            <div className="grid grid-cols-2 border-t border-l border-border">
              <div className="grid content-between gap-4 border-r border-b border-border p-5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("圆角", "Radius")}</span>
                <div className="flex items-end gap-2.5">
                  <i className="block size-14 rounded-xl border border-foreground bg-surface" />
                  <i className="block h-8 w-16 rounded-md bg-primary" />
                </div>
                <span className="font-mono text-xs leading-snug text-subtle">rounded-md · rounded-xl → 0px</span>
              </div>
              <div className="grid content-between gap-4 border-r border-b border-border p-5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("边框", "Borders")}</span>
                <div className="grid gap-2">
                  {[
                    ["border-border", t("分隔、卡片、表格", "dividers, cards, tables")],
                    ["border-strong", t("控件、描边按钮", "controls, outline buttons")],
                    ["border-foreground", t("悬停、选中、区块线", "hover, selected, section rules")],
                  ].map(([c, d]) => (
                    <div key={c} className="grid grid-cols-[28px_1fr] items-center gap-2.5">
                      <i className={cn("block h-5 border", c)} />
                      <span className="font-mono text-[11px] leading-tight text-subtle">
                        {c}
                        <span className="block text-muted-foreground">{d}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid content-between gap-4 border-r border-b border-border p-5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("层级", "Elevation")}</span>
                <OverlayDemo />
                <span className="font-mono text-xs leading-snug text-subtle">{t("仅浮层：shadow-overlay", "Overlays only: shadow-overlay")}</span>
              </div>
              <div className="grid content-between gap-4 border-r border-b border-border p-5">
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("焦点", "Focus")}</span>
                <div className="flex flex-wrap items-center gap-3.5 p-0.5">
                  <Btn size="sm" className="outline-2 outline-offset-2 outline-ring">
                    {t("保存", "Save")}
                  </Btn>
                  <span className="text-sm text-link underline underline-offset-4 outline-2 outline-offset-2 outline-ring">{t("链接", "Link")}</span>
                </div>
                <span className="font-mono text-xs leading-snug text-subtle">outline 2px · offset 2px</span>
              </div>
            </div>
            <Rules
              items={[
                t("圆角一律为 0；不得使用 rounded-full，也不得以任意值加回圆角。", "Corners are always square; never use rounded-full or bring radius back through arbitrary values."),
                t("卡片、按钮与输入框不加阴影，以 1px 边框与 surface 区分；浮层使用 shadow-overlay。", "Cards, buttons and inputs carry no shadow; use 1px borders and surface. Overlays use shadow-overlay."),
                t(
                  <>
                    焦点统一为 <Mono>{FOCUS}</Mono>，仅在键盘焦点时出现，不得移除。
                  </>,
                  <>
                    Focus is always <Mono>{FOCUS}</Mono>, on keyboard focus only, and never removed.
                  </>,
                ),
              ]}
            />
          </Sub>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Components */}
      <Section
        id="components"
        tag="Components"
        title={t("组件", "Components")}
        lede={
          <p>
            {t("每个组件须覆盖默认、悬停、键盘焦点、按下与禁用五种状态。", "Every component must cover default, hover, focus-visible, pressed and disabled states.")}
          </p>
        }
      >
        <div className="grid gap-[clamp(56px,7vw,88px)]">
          <Specimen
            id="button"
            n="01"
            title={t("按钮", "Button")}
            aside="sm 32 · default 40 · lg 48 · icon 40"
            code={BUTTON_CODE}
            codeTitle="components/ui/button.tsx"
            rules={[
              t(
                <>
                  <b>每屏只有一个主按钮。</b>次要操作用 outline 或 secondary；危险操作用 destructive 并须二次确认。
                </>,
                <>
                  <b>One primary button per view.</b> Secondary actions use outline or secondary; destructive actions use destructive and need confirmation.
                </>,
              ),
              t("文字以动词开头，不超过 3 个词或 6 个汉字；仅图标按钮须加 aria-label。", "Labels start with a verb, within three words or six Chinese characters; icon-only buttons need an aria-label."),
              t("禁用为 40% 不透明度；不得以隐藏按钮表示不可用。", "Disabled is 40% opacity; never hide a button to show it is unavailable."),
            ]}
          >
            <Row label={t("变体", "Variants")}>
              <Btn>{t("开始使用", "Get started")}</Btn>
              <Btn variant="secondary">{t("查看示例", "View examples")}</Btn>
              <Btn variant="outline">{t("阅读文档", "Read the docs")}</Btn>
              <Btn variant="ghost">{t("取消", "Cancel")}</Btn>
              <Btn variant="link">{t("更新说明", "Release notes")}</Btn>
              <Btn variant="destructive">{t("删除存储桶", "Delete bucket")}</Btn>
            </Row>
            <Row label={t("尺寸", "Sizes")} className="items-end gap-5">
              <Cell label="sm · 32px">
                <Btn size="sm">{t("下载", "Download")}</Btn>
              </Cell>
              <Cell label="default · 40px">
                <Btn>{t("下载", "Download")}</Btn>
              </Cell>
              <Cell label="lg · 48px">
                <Btn size="lg">{t("下载", "Download")}</Btn>
              </Cell>
              <Cell label="icon · 40px">
                <Btn size="icon" variant="outline" aria-label={t("复制", "Copy")}>
                  <Icon name="copy" />
                </Btn>
              </Cell>
            </Row>
            <Row label={t("图标", "With icon")}>
              <Btn>
                <Icon name="download" />
                {t("下载 RustFS", "Download RustFS")}
              </Btn>
              <Btn variant="outline">
                GitHub
                <Icon name="arrow-up-right" />
              </Btn>
              <Btn variant="secondary">
                <Icon name="plus" />
                {t("新建存储桶", "New bucket")}
              </Btn>
            </Row>
            <Row label={t("状态", "States")} className="items-end gap-5">
              <Cell label={t("默认", "Default")}>
                <Btn>{t("部署", "Deploy")}</Btn>
              </Cell>
              <Cell label={t("悬停", "Hover")}>
                <Btn className="-translate-y-px bg-blue-600">{t("部署", "Deploy")}</Btn>
              </Cell>
              <Cell label={t("键盘焦点", "Focus-visible")}>
                <Btn className="outline-2 outline-offset-2 outline-ring">{t("部署", "Deploy")}</Btn>
              </Cell>
              <Cell label={t("按下", "Active")}>
                <Btn className="bg-blue-700">{t("部署", "Deploy")}</Btn>
              </Cell>
              <Cell label={t("禁用", "Disabled")}>
                <Btn disabled>{t("部署", "Deploy")}</Btn>
              </Cell>
            </Row>
          </Specimen>

          <Specimen
            id="input"
            n="02"
            title={t("输入框", "Input")}
            aside={t("高 40 · 标签 · 帮助文字 · 错误", "40px · label · help · error")}
            code={INPUT_CODE}
            codeTitle="bucket-name-field.tsx"
            rules={[
              t("标签始终可见，位于上方；占位符只示范格式，不得代替标签。", "Labels stay visible above the field; placeholders only show a format, never replace a label."),
              t("错误时边框与文字为 danger 并加方块标记，说明如何修正；以 aria-invalid 与 aria-describedby 关联。", "Errors turn border and message danger with a square marker and say how to fix it; wire aria-invalid and aria-describedby."),
              t("机器值（路径、端点、版本）用 Geist Mono 13px；禁用字段保留数值并说明原因。", "Machine values (paths, endpoints, versions) use Geist Mono 13px; disabled fields keep their value and say why."),
            ]}
          >
            <InputsDemo />
          </Specimen>

          <Specimen
            id="select"
            n="03"
            title={t("下拉选择与分段控件", "Select and segmented control")}
            aside="select · radix ToggleGroup"
            code={SELECT_CODE}
            codeTitle="storage-class.tsx · time-range.tsx"
            rules={[
              t("2–5 个可见互斥选项用分段控件；更多用下拉选择，超过 7 个用可搜索组合框。", "2–5 visible exclusive options use a segmented control; more use a select, beyond seven a searchable combobox."),
              t("分段选中项为前景色实底；不得填充蓝色，以免与主按钮混淆。", "The selected segment is filled with the foreground colour, never blue, which reads as a primary button."),
              t("下拉箭头为 1.5px 直角折线，与图标系统一致。", "The chevron is a 1.5px square-capped stroke, matching the icon set."),
            ]}
          >
            <SelectDemo />
          </Specimen>

          <Specimen
            id="checkbox"
            n="04"
            title={t("复选框与开关", "Checkbox and switch")}
            aside="16 × 16 · 36 × 20"
            code={CHECK_CODE}
            codeTitle="checkbox.tsx · switch.tsx"
            rules={[
              t("复选框用于需提交的设置；开关用于立即生效的设置。", "Checkboxes for settings that are submitted; switches for settings that apply at once."),
              t("均为直角方形，勾选为 Signal Blue 填充，部分选择为短横线。", "Both are square; checked fills Signal Blue, a partial selection shows a dash."),
              t("整行标签可点击，高度不少于 24px，触屏不少于 44px。", "The whole label is clickable: at least 24px tall, 44px on touch screens."),
            ]}
          >
            <ChecksDemo />
          </Specimen>

          <Specimen
            id="status"
            n="05"
            title={t("状态标记与徽标", "Status chips and badges")}
            aside={t("方形标记 8px · 高 24", "8px square marker · 24px")}
            code={CHIP_CODE}
            codeTitle="status-chip.tsx"
            rules={[
              t(
                <>
                  <b>颜色只在方形标记上。</b>8px 方块、等宽大写与 1px 边框；不得用圆点、胶囊或彩色底。
                </>,
                <>
                  <b>Colour lives on the square marker.</b> An 8px square, mono capitals and a 1px border; no dots, pills or tinted fills.
                </>,
              ),
              t("在线 = success，修复中 = brand，降级 = warning，离线 = danger；文字标签始终保留。", "Online = success, Healing = brand, Degraded = warning, Offline = danger; the text label always stays."),
              t("Oxide 只用于校验块与预览功能，每个视图至多一处。", "Oxide marks parity and preview features only, once per view at most."),
            ]}
          >
            <Row label={t("盘状态", "Drive state")}>
              <span className={CHIP}>
                <i className={MARK.online} />
                {t("在线", "Online")}
              </span>
              <span className={CHIP}>
                <i className={MARK.healing} />
                {t("修复中", "Healing")}
              </span>
              <span className={CHIP}>
                <i className={MARK.degraded} />
                {t("降级", "Degraded")}
              </span>
              <span className={CHIP}>
                <i className={MARK.offline} />
                {t("离线", "Offline")}
              </span>
            </Row>
            <Row label={t("功能状态", "Feature state")}>
              <span className={CHIP}>
                <i className="size-2 shrink-0 bg-brand" />
                {t("可用", "Available")}
              </span>
              <span className={CHIP}>
                <i className={MARK.parity} />
                {t("预览", "Preview")}
              </span>
              <span className={CHIP}>
                <i className="size-2 shrink-0 border border-current" />
                {t("可选构建", "Opt-in")}
              </span>
            </Row>
            <Row label={t("分片", "Shards")}>
              <span className={CHIP}>
                <i className="size-2 shrink-0 bg-brand" />
                {t("数据 12", "Data 12")}
              </span>
              <span className={CHIP}>
                <i className={MARK.parity} />
                {t("校验 4", "Parity 4")}
              </span>
              <Stripe k={12} m={4} className="text-[8px]" />
            </Row>
            <Row label={t("徽标", "Badges")}>
              <span className={BADGE_SOLID}>1.0.1</span>
              <span className={BADGE_SOLID}>{t("最新", "Latest")}</span>
              <span className="inline-flex items-center gap-2 text-sm">
                {t("存储桶", "Buckets")} <span className={COUNT}>12</span>
              </span>
            </Row>
          </Specimen>

          <Specimen
            id="tabs"
            n="06"
            title={t("标签页", "Tabs")}
            aside="radix Tabs · h-11"
            code={TABS_CODE}
            codeTitle="bucket-tabs.tsx"
            rules={[
              t("当前标签为 2px Signal Blue 底线加前景色文字。", "The active tab has a 2px Signal Blue underline and foreground text."),
              t("2–7 个标签；窄屏横向滚动，不换行、不收入菜单。", "Use 2–7 tabs; on narrow screens they scroll, never wrap or collapse into a menu."),
              t("只允许图标与等宽数字计数，不加其他装饰。", "Only an icon and a tabular count; no other decoration."),
            ]}
          >
            <TabsDemo />
          </Specimen>

          <Specimen
            id="code"
            n="07"
            title={t("代码块与命令栏", "Code block and command bar")}
            aside="Geist Mono 13 / 1.65 · Ink"
            code={CMD_CODE}
            codeTitle="command-bar.tsx"
            rules={[
              t("代码始终在 Ink 底上，Geist Mono 13px / 1.65，两种主题相同。", "Code always sits on Ink in Geist Mono 13px / 1.65, in both themes."),
              t("命令只取自 README 或官方文档；以注释说明结果，不得虚构输出。", "Commands come only from the README or official docs; comments state the result, output is never invented."),
              t("提示符 $ 不被复制；长命令横向滚动，不折行。", "The $ prompt is never copied; long commands scroll, never wrap."),
            ]}
          >
            <Row label={t("命令栏", "Command")}>
              <CommandBar command={INSTALL} className="w-full" />
            </Row>
            <Row label={t("代码块", "Block")} className="block">
              <CodeBlock title="Docker · README" code={DOCKER} lang="bash" />
            </Row>
          </Specimen>

          <Specimen
            id="callout"
            n="08"
            title={t("提示框", "Callouts")}
            aside="note · tip · warning · preview"
            code={CALLOUT_CODE}
            codeTitle="callout.tsx"
            rules={[
              t("类型只由方形标记区分（info / success / warning / parity）；不用色条或彩色底。", "Types differ only by the square marker (info / success / warning / parity); no side rails or tinted fills."),
              t("每个只说一件事，至多 3 句；每屏至多 2 个。", "One point each, at most three sentences; two per screen at most."),
              t("警告写明后果与条件，不用感叹号或全大写。", "Warnings state consequence and condition; no exclamation marks or all caps."),
            ]}
          >
            <div className="grid gap-3 p-[clamp(16px,2.4vw,28px)] md:grid-cols-2">
              {(
                [
                  ["note", t("说明", "Note"), t("容器以 UID 10001 运行。挂载的数据与日志目录须先授权给该用户。", "The container runs as UID 10001. Grant the mounted data and log directories to that user first.")],
                  ["tip", t("提示", "Tip"), t("S3 API 默认监听 9000 端口，控制台为 9001。", "The S3 API listens on port 9000 by default and the Console on 9001.")],
                  ["warning", t("警告", "Warning"), t("EC 4+2 最多容忍 2 块盘同时故障；超过后对象不可读取，直到盘恢复。", "EC 4+2 tolerates at most two failed drives at once; beyond that, objects cannot be read until drives return.")],
                  ["preview", t("预览", "Preview"), t("S3 Tables（Iceberg REST）为预览功能，接口可能在后续版本中变更。", "S3 Tables (Iceberg REST) is a preview feature; its API may change in later releases.")],
                ] as const
              ).map(([k, title, body]) => (
                <div key={k} role="note" className={CALLOUT}>
                  <i className={CALLOUT_MARK[k]} aria-hidden="true" />
                  <b className={CALLOUT_TITLE}>{title}</b>
                  <p className={CALLOUT_BODY}>{body}</p>
                </div>
              ))}
            </div>
          </Specimen>

          <Specimen
            id="table"
            n="09"
            title={t("数据表格", "Data table")}
            aside={t("行高 40 · 等宽数字右对齐", "40px rows · mono numerals right-aligned")}
            code={TABLE_CODE}
            codeTitle="drives-table.tsx"
            rules={[
              t("数字右对齐、等宽，单位写在表头或数值后；文本左对齐。", "Numbers right-aligned and tabular, units in the header or after the value; text left-aligned."),
              t("行高 40px，表头 36px；只用 1px 分隔线，不用斑马纹。", "40px rows, 36px header; 1px rules only, no zebra stripes."),
              t("缺失值写「—」；窄屏时表格在容器内横向滚动，页面不滚动。", "Missing values show an em dash; on narrow screens the table scrolls, never the page."),
            ]}
          >
            <div className="grid gap-3 p-[clamp(16px,2.4vw,28px)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-medium">
                  {t("纠删集 1 · 6 块盘", "Erasure set 1 · 6 drives")} <span className="font-mono text-[13px] font-normal text-muted-foreground">EC 4+2</span>
                </span>
                <Sample>{t("示例数据", "Sample data")}</Sample>
              </div>
              <div className={TABLE_WRAP}>
                <table className={TABLE}>
                  <thead>
                    <tr>
                      <th className={TH}>{t("盘", "Drive")}</th>
                      <th className={TH}>{t("节点", "Node")}</th>
                      <th className={TH}>{t("状态", "State")}</th>
                      <th className={cn(TH, TH_NUM)}>
                        {t("已用", "Used")} <span className="normal-case">TiB</span>
                      </th>
                      <th className={cn(TH, TH_NUM)}>
                        {t("容量", "Capacity")} <span className="normal-case">TiB</span>
                      </th>
                      <th className={cn(TH, TH_NUM)}>{t("使用率", "Used")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drives.map(([drive, node, state, used, cap]) => {
                      const pct = used === "—" ? null : Math.round((Number(used) / Number(cap)) * 100)
                      return (
                        <tr key={drive} className={TR}>
                          <td className={cn(TD, "font-mono")}>{drive}</td>
                          <td className={cn(TD, "text-subtle")}>{node}</td>
                          <td className={TD}>
                            <span className={cn(CHIP, "h-5.5 px-1.5 text-[10px]")}>
                              <i className={MARK[state]} />
                              {stateLabel[state]}
                            </span>
                          </td>
                          <td className={cn(TD, TD_NUM)}>{used}</td>
                          <td className={cn(TD, TD_NUM, "text-subtle")}>{cap}</td>
                          <td className={cn(TD, TD_NUM)}>
                            <span className="inline-flex items-center gap-2.5">
                              <span className="grid w-15 grid-cols-10 gap-px" aria-hidden="true">
                                {Array.from({ length: 10 }, (_, i) => (
                                  <i key={i} className={cn("h-2", pct !== null && i < Math.round(pct / 10) ? (pct >= 90 ? "bg-warning" : "bg-brand") : "bg-surface-2")} />
                                ))}
                              </span>
                              <span className="w-9">{pct === null ? "—" : `${pct}%`}</span>
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Specimen>

          <Specimen
            id="card"
            n="10"
            title={t("卡片", "Cards")}
            aside={t("1px 边框 · 内边距 24", "1px border · 24px padding")}
            code={CARD_CODE}
            codeTitle="feature-card.tsx"
            rules={[
              t("整张卡片为一个链接；悬停时边框变为前景色，箭头右移 2px。", "The whole card is one link; on hover the border turns foreground and the arrow moves 2px."),
              t("不得用色条、阴影、渐变或圆角强调卡片。", "Never emphasise a card with rails, shadows, gradients or rounded corners."),
              t("一个图标、一个标题、一至两句说明；同组等高。", "One icon, one title, one or two sentences; equal heights in a group."),
            ]}
          >
            <div className="grid gap-4 p-[clamp(16px,2.4vw,28px)] sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  ["shard", t("纠删码", "Erasure coding"), t("对象切分为数据块与校验块，分散写入纠删集中的各块盘。", "Objects are split into data and parity shards spread across the drives of an erasure set.")],
                  ["shield", t("位腐烂检测", "Bitrot detection"), t("读取时校验每个分片，发现静默损坏后从校验块恢复。", "Every shard is verified on read; silent corruption is repaired from parity.")],
                  ["heal", t("自愈", "Healing"), t("盘或节点恢复后，缺失的分片在后台重建。", "When a drive or node returns, missing shards are rebuilt in the background.")],
                ] as const
              ).map(([icon, title, text]) => (
                <a key={icon} href="#card" className={cx(CARD)}>
                  <span className={CARD_ICON}>
                    <Icon name={icon} />
                  </span>
                  <h3 className={CARD_TITLE}>{title}</h3>
                  <p className={CARD_TEXT}>{text}</p>
                  <span className={CARD_MORE}>
                    {t("了解更多", "Learn more")}
                    <Icon name="arrow-right" className={CARD_ARROW} />
                  </span>
                </a>
              ))}
            </div>
          </Specimen>

          <Specimen
            id="nav"
            n="11"
            title={t("导航栏", "Navigation bar")}
            aside={t("高 64 · 容器宽度 768 以下收起", "64px · collapses below a 768px container")}
            code={NAV_CODE}
            codeTitle="site-header.tsx"
            previewClassName="bg-surface"
            rules={[
              t("高 64px，底部 1px 线，吸顶，不加阴影与毛玻璃。", "64px tall with a 1px bottom rule; sticky, no shadow or blur."),
              t("一级链接至多 5 个；当前页为前景色加中等字重，并设 aria-current。", "At most five top-level links; the current page is foreground and medium weight, with aria-current."),
              t("右侧依次为语言、GitHub、主按钮；容器窄于 768px 时收为菜单，每项高 48px。", "On the right: language, GitHub, the primary button. Below a 768px container links collapse into a menu of 48px items."),
            ]}
          >
            <div className="grid gap-5 p-[clamp(16px,2.4vw,28px)]">
              <div className="grid gap-2">
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("桌面", "Desktop")}</span>
                <div className="border border-border">
                  <NavDemo />
                </div>
              </div>
              <div className="grid justify-items-start gap-2">
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("手机 · 390px", "Phone · 390px")}</span>
                <div className="w-full max-w-[390px] border border-border">
                  <NavDemo />
                </div>
              </div>
            </div>
          </Specimen>

          <Specimen
            id="announce"
            n="12"
            title={t("公告栏", "Announcement bar")}
            aside={t("高 40 · Ink 底", "40px · Ink")}
            code={ANNOUNCE_CODE}
            codeTitle="announcement.tsx"
            rules={[
              t("位于导航栏之上，Ink 底，全站同时只有一条。", "Above the navigation, on Ink, one site-wide at a time."),
              t("一句陈述加一个链接；不得用于促销倒计时或口号。", "One statement and one link; never countdowns or slogans."),
              t("可关闭，按公告编号记住；新公告重新显示。", "Dismissible, remembered per announcement ID; a new one shows again."),
            ]}
          >
            <AnnouncementDemo />
          </Specimen>

          <Specimen
            id="footer"
            n="13"
            title={t("页脚", "Footer")}
            aside={t("容器宽度 672 起分四栏", "four columns from a 672px container")}
            code={FOOTER_CODE}
            codeTitle="site-footer.tsx"
            rules={[
              t("字标与标语、三至四组链接、版权与许可证；不放社交图标墙。", "Wordmark and line, three or four link groups, copyright and licence; no social icon wall."),
              t("分组标题为等宽大写；链接为 subtle，悬停变为前景色。", "Group headings in mono capitals; links subtle, foreground on hover."),
              t("版权行固定为：© 年份 RustFS · Apache License 2.0。", "The copyright line reads: © year RustFS · Apache License 2.0."),
            ]}
          >
            <footer className={FOOTER}>
              <div className={FOOTER_GRID}>
                <div className="col-span-2 grid content-start gap-3 @2xl:col-span-1">
                  <Wordmark className="h-4.5 w-auto text-brand dark:text-foreground" />
                  <p className="max-w-[24ch] text-sm leading-relaxed text-subtle">{t("AI 时代的基建，从每一个字节算起。", "AI infrastructure, accounted for byte by byte.")}</p>
                </div>
                {[
                  [t("产品", "Product"), [t("功能", "Features"), t("下载", "Download"), t("控制台", "Console"), t("更新日志", "Changelog")]],
                  [t("文档", "Docs"), [t("快速开始", "Quick start"), t("安装", "Installation"), t("S3 兼容性", "S3 compatibility")]],
                  [t("社区", "Community"), ["GitHub", t("讨论区", "Discussions"), t("博客", "Blog")]],
                ].map(([head, links]) => (
                  <nav key={head as string} aria-label={head as string} className="grid content-start gap-3">
                    <h2 className={FOOTER_HEAD}>{head}</h2>
                    {(links as string[]).map((l) => (
                      <a key={l} href="#footer" className={FOOTER_LINK}>
                        {l}
                      </a>
                    ))}
                  </nav>
                ))}
              </div>
              <div className={FOOTER_BASE}>
                <span>© 2026 RustFS · Apache License 2.0</span>
                <span>rustfs.com · docs.rustfs.com</span>
              </div>
            </footer>
          </Specimen>

          <Specimen
            id="toast"
            n="14"
            title={t("通知", "Toast")}
            aside="sonner · bottom-center"
            code={TOAST_CODE}
            codeTitle="sonner"
            rules={[
              t("通知只确认操作或报告后台结果；需要决定的用对话框。", "Toasts confirm an action or report a background result; decisions need a dialog."),
              t("标题一行；说明给出对象与数值。", "A one-line title; the description names the object and figures."),
              t("成功 4 秒后消失，错误保留至关闭；同时至多 3 条。", "Success dismisses after 4s; errors stay until closed; three at most."),
            ]}
          >
            <ToastDemo />
          </Specimen>

          <Specimen
            id="empty"
            n="15"
            title={t("空状态", "Empty state")}
            aside={t("轮廓分片矩阵 · 一个主操作", "outline shard matrix · one action")}
            code={EMPTY_CODE}
            codeTitle="empty-buckets.tsx"
            rules={[
              t("说明此处将出现什么，并给出唯一的下一步。", "Say what will appear here and offer one next step."),
              t("图形为轮廓模式的小分片矩阵；不用插画或表情。", "The graphic is a small outline shard matrix; no illustrations or emoji."),
              t("居中排列，是左对齐原则的唯一例外。", "Centred: the one exception to left alignment."),
            ]}
          >
            <div className="p-[clamp(16px,2.4vw,28px)]">
              <div className={EMPTY}>
                <ShardMatrix cols={8} rows={3} k={8} m={0} mode="outline" className="h-12 w-auto" />
                <h3 className={EMPTY_TITLE}>{t("还没有存储桶", "No buckets yet")}</h3>
                <p className={EMPTY_TEXT}>{t("存储桶用于存放对象及其版本。创建第一个存储桶后，即可通过 S3 API 或控制台上传对象。", "A bucket holds objects and their versions. Create the first one, then upload through the S3 API or the Console.")}</p>
                <Btn>
                  <Icon name="plus" />
                  {t("创建存储桶", "Create bucket")}
                </Btn>
              </div>
            </div>
          </Specimen>

          <Specimen
            id="progress"
            n="16"
            title={t("进度与配额", "Progress and quota")}
            code={PROGRESS_CODE}
            codeTitle="heal-progress.tsx · quota.tsx"
            rules={[
              t("可计数进度画成分片：完成为 brand，进行中为修复动效，未开始为轮廓。", "Countable progress is drawn as shards: done is brand, active runs the heal motion, pending is an outline."),
              t("配额条 40 格：低于 80% 为 brand，80% 起 warning，95% 起 danger，并同步状态标记。", "Quota bars have 40 cells: brand below 80%, warning from 80%, danger from 95%, with a matching chip."),
              t("数值写作「已用 / 总量 · 百分比」，等宽数字；设 role=progressbar 与 aria-valuenow。", "Values read “used / total · percent” in tabular numerals; set role=progressbar and aria-valuenow."),
            ]}
          >
            <div className="grid gap-x-10 gap-y-8 p-[clamp(16px,2.4vw,28px)] md:grid-cols-2">
              <div className="grid content-start gap-3">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-sm font-medium">{t("修复进度", "Heal progress")}</span>
                  <span className="font-mono text-[13px] tabular-nums">7 / 16 {t("块盘", "drives")}</span>
                </div>
                <div role="progressbar" aria-label={t("修复进度", "Heal progress")} aria-valuemin={0} aria-valuemax={16} aria-valuenow={7} className={SHARDS}>
                  {Array.from({ length: 16 }, (_, i) => (
                    <i key={i} className={i < 7 ? SHARD.done : i === 7 ? SHARD.healing : SHARD.todo} />
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={CHIP}>
                    <i className={MARK.healing} />
                    {t("修复中", "Healing")}
                  </span>
                  <Sample>{t("示例数据", "Sample data")}</Sample>
                </div>
              </div>
              <QuotaDemo />
            </div>
          </Specimen>
        </div>
      </Section>

      {/* ------------------------------------------------------------ Page sections */}
      <Section
        id="sections"
        tag="Page sections"
        title={t("页面区块", "Page sections")}
        lede={
          <p>
            {t("每个区块只有一个标签、一个标题与一个图形。", "Each section has one label, one title and one graphic.")}
          </p>
        }
      >
        <PageSectionTemplates />
      </Section>

      {/* ------------------------------------------------------------ Email */}
      <Section
        id="email"
        tag="Email"
        title={t("邮件", "Email")}
        lede={
          <p>
            {t("版式须在图片屏蔽、系统字体替换与深色反色时仍然成立。", "The layout must hold with images blocked, system fonts and dark-mode inversion.")}
          </p>
        }
      >
        <TemplateGrid>
          <EmailTemplate />
          <div className="col-span-12 grid content-start gap-8 md:col-span-7">
            <Table
              head={[t("项目", "Item"), t("规则", "Rule")]}
              rows={[
                [t("宽度", "Width"), t("640px 单栏，左右内边距 40px；窄屏缩至 100%", "640px single column, 40px side padding; 100% in narrow clients")],
                [t("字体", "Fonts"), t("系统字体栈：-apple-system、Segoe UI、PingFang SC、Microsoft YaHei、Arial；不加载网络字体", "System stack: -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, Arial; no web fonts")],
                [t("图片关闭", "Images off"), t("色带用单元格背景色，字标带 alt=\"RustFS\"；正文与按钮为实时文字", "Band as cell background, wordmark with alt=\"RustFS\"; body and buttons are live text")],
                [t("点击区域", "Tap targets"), t("按钮高 48px；链接间距 ≥ 12px；可点区域 ≥ 44 × 44px", "Buttons 48px; links ≥ 12px apart; targets ≥ 44 × 44px")],
                [t("深色模式", "Dark mode"), t("声明 color-scheme；字标置于 Signal 色带；不用透明底深色图片", "Declare color-scheme; wordmark on the Signal band; no dark images on transparent backgrounds")],
                [t("正文", "Body"), t("16px / 1.6；链接带下划线；数字注明来源与日期", "16px / 1.6; links underlined; figures carry a source and date")],
                [t("合规", "Compliance"), t("页脚含订阅原因、退订链接与通讯地址；附纯文本版本", "Footer: why subscribed, unsubscribe link, postal address; send a plain-text version")],
              ]}
            />
            <CodeBlock title="email.html · bulletproof button" lang="html" code={MAIL_BUTTON_CODE} />
          </div>
        </TemplateGrid>
      </Section>

      {/* ------------------------------------------------------------ Motion */}
      <Section
        id="motion"
        tag="Micro-interactions"
        title={t("微交互", "Micro-interactions")}
        lede={
          <p>
            {t("微交互只用于反馈：时长取 80 / 150 / 240 / 420 / 720ms，缓动只用 standard 与 emphasized，不得回弹。", "Feedback only: 80 / 150 / 240 / 420 / 720ms durations, standard or emphasized easing, no bounce.")}
          </p>
        }
      >
        <div className="grid border-t border-l border-border md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              k: t("按钮扫光", "Button sheen"),
              tok: "720ms · ease-emphasized · translate",
              d: t("上移 1px，光带自左向右扫过一次；离开立即复位。", "Lifts 1px; the sheen crosses once left to right and resets on leave."),
              stage: (
                <Btn size="lg">
                  {t("悬停查看", "Hover me")}
                  <Icon name="arrow-right" />
                </Btn>
              ),
            },
            {
              k: t("链接下划线", "Link underline"),
              tok: "240ms · ease-emphasized · background-size",
              d: t("独立链接的下划线自左向右生长；段落内链接始终带下划线。", "Standalone links grow the underline left to right; links in running text stay underlined."),
              stage: (
                <p className="max-w-[26ch] text-[15px] leading-relaxed text-subtle">
                  {t("阅读", "Read the ")}{" "}
                  <a href="#motion" className={cx(LINK_GROW)}>
                    {t("纠删码说明", "erasure coding guide")}
                  </a>{" "}
                  {t("或", "or the ")}{" "}
                  <a href="#motion" className={cx(LINK_GROW)}>
                    {t("快速开始", "quick start")}
                  </a>
                  {t("。", ".")}
                </p>
              ),
            },
            {
              k: t("卡片悬停", "Card hover"),
              tok: "240ms · ease-standard / emphasized",
              d: t("边框变为前景色，箭头右移 2px；卡片不位移、不放大、不加阴影。", "Border turns foreground, arrow moves 2px; the card never moves, scales or gains a shadow."),
              stage: (
                <a href="#motion" className={cn(cx(CARD), "w-full max-w-64 p-5")}>
                  <span className={CARD_ICON}>
                    <Icon name="replicate" />
                  </span>
                  <h3 className="mt-1 text-base font-semibold">{t("站点复制", "Site replication")}</h3>
                  <span className={CARD_MORE}>
                    {t("了解更多", "Learn more")}
                    <Icon name="arrow-right" className={CARD_ARROW} />
                  </span>
                </a>
              ),
            },
            {
              k: t("复制反馈", "Copy feedback"),
              tok: "1600ms · toast",
              d: t("图标变为 success 色对勾 1600ms，并弹出「已复制」。", "The icon becomes a success check for 1600ms, with a Copied toast."),
              stage: <CommandBar command="mkdir -p data logs" className="w-full max-w-72" />,
            },
            {
              k: t("修复动效", "Heal"),
              tok: "720ms × 3 · steps",
              d: t("分片掉线 → 校验块闪亮 → 重建，每步 720ms，阶跃切换不渐变。", "Shard drops → parity flashes → rebuild, 720ms per step, stepped, never faded."),
              stage: <HealDemo />,
            },
            {
              k: t("骨架屏", "Skeleton"),
              tok: "1200ms · stagger 40ms · steps(1)",
              d: t("8px 分片排成文字行，每 40ms 点亮一格；不用闪烁渐变条。", "Rows of 8px shards lit every 40ms; no shimmering gradient bars."),
              stage: <SkeletonDemo />,
            },
          ].map((m) => (
            <figure key={m.tok} className="m-0 grid grid-rows-[auto_1fr] border-r border-b border-border">
              <div className="grid min-h-64 place-items-center bg-surface p-[clamp(16px,2.4vw,28px)]">{m.stage}</div>
              <figcaption className="grid content-start gap-2 border-t border-border p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <b className="font-semibold">{m.k}</b>
                  <span className="font-mono text-[11px] text-brand">{m.tok}</span>
                </div>
                <p className="text-sm leading-relaxed text-subtle">{m.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <Table
          className="[&_table]:min-w-[720px]"
          mono={[1, 2, 3]}
          head={[t("交互", "Interaction"), t("属性", "Property"), t("时长", "Duration"), t("缓动", "Easing"), t("减少动态效果", "Reduced motion")]}
          rows={[
            [t("按钮悬停上移", "Button lift"), "translate", "150ms · --duration-fast", "ease-standard", t("不位移", "No movement")],
            [t("按钮扫光", "Button sheen"), "translate", "720ms · --duration-scene", "ease-emphasized", t("不显示", "Hidden")],
            [t("链接下划线", "Link underline"), "background-size", "240ms · --duration-base", "ease-emphasized", t("直接显示", "Shown at once")],
            [t("卡片悬停", "Card hover"), "border-color · translate", "240ms · --duration-base", "ease-standard · emphasized", t("仅变色", "Colour only")],
            [t("控件状态", "Control state"), "background · border", "80–150ms", "ease-standard", t("保持", "Kept")],
            [t("修复动效", "Heal"), "background · outline", "720ms × 3", "steps(1)", t("显示最终状态", "Final state")],
            [t("骨架屏", "Skeleton"), "background", "1200ms · stagger 40ms", "steps(1)", t("静态占位", "Static")],
          ]}
        />
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <CodeBlock title="heal · keyframes" lang="css" code={HEAL_CSS} />
          <CodeBlock title="skeleton · keyframes" lang="css" code={SKELETON_CSS} />
        </div>
      </Section>

      {/* ------------------------------------------------------------ Do & Don't */}
      <Section
        id="rules"
        tag="Do & Don't"
        title={t("正确与错误", "Do and don't")}
        lede={<p>{t("上线前须逐项对照以下五组规则。", "Check every interface against these five pairs before it ships.")}</p>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" bodyClassName="gap-4" caption={t("按钮、输入框与卡片均为直角。", "Buttons, inputs and cards are square.")}>
            <div className="grid w-full max-w-72 gap-3">
              <input readOnly value="s3://photos" className={cn(cx(INPUT), "font-mono text-[13px]")} aria-label={t("示例输入框", "Example input")} />
              <div className="flex gap-2">
                <Btn size="sm">{t("创建", "Create")}</Btn>
                <Btn size="sm" variant="outline">
                  {t("取消", "Cancel")}
                </Btn>
              </div>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="gap-4" caption={t("圆角与胶囊形状。", "Rounded corners and capsule shapes.")}>
            <div className="grid w-full max-w-72 gap-3">
              <span className="flex h-10 items-center rounded-[10px] border border-input px-3 font-mono text-[13px]">s3://photos</span>
              <div className="flex gap-2">
                <span className="inline-flex h-8 items-center rounded-[999px] bg-primary px-4 text-[13px] font-medium text-primary-foreground">{t("创建", "Create")}</span>
                <span className="inline-flex h-8 items-center rounded-[999px] border border-strong px-4 text-[13px] font-medium">{t("取消", "Cancel")}</span>
              </div>
            </div>
          </DoDont>

          <DoDont kind="do" bodyClassName="flex flex-wrap content-center gap-2.5" caption={t("方形标记、等宽文字、1px 边框。", "Square marker, mono text, 1px border.")}>
            <span className={CHIP}>
              <i className={MARK.online} />
              {t("在线", "Online")}
            </span>
            <span className={CHIP}>
              <i className={MARK.degraded} />
              {t("降级", "Degraded")}
            </span>
            <span className={CHIP}>
              <i className={MARK.offline} />
              {t("离线", "Offline")}
            </span>
          </DoDont>
          <DoDont kind="dont" bodyClassName="flex flex-wrap content-center gap-2.5" caption={t("彩色胶囊与圆点，对比度不足。", "Coloured pills and dots; weak contrast.")}>
            <span className="inline-flex h-6 items-center gap-1.5 rounded-[999px] bg-[#D1FAE5] px-3 text-xs font-medium text-[#34D399]">
              <i className="size-1.5 rounded-[999px] bg-[#34D399]" />
              Online
            </span>
            <span className="inline-flex h-6 items-center rounded-[999px] bg-[#FEF3C7] px-3 text-xs font-medium text-[#FBBF24]">Degraded</span>
            <span className="inline-flex h-6 items-center rounded-[999px] bg-[#FEE2E2] px-3 text-xs font-medium text-[#F87171]">Offline</span>
          </DoDont>

          <DoDont kind="do" on="ink" bodyClassName="p-0 min-h-52" caption={t("平涂底色，图形来自产品结构。", "Flat colour; graphics from product structure.")}>
            <div className="absolute inset-0 [--mx-data:#0062FF] [--mx-empty:rgba(255,255,255,0.14)] [--mx-parity:#FF5E14]">
              <ShardMatrix className="absolute inset-y-5 right-5 !h-auto !w-[40%]" cols={8} rows={6} k={7} m={1} seed={9} mode="tone" fade="bl" fit="right" />
              <span className="absolute bottom-6 left-6 max-w-[13em] font-display text-[22px] leading-[1.04] font-extrabold text-white [font-stretch:125%]">AI infrastructure, accounted for byte by byte.</span>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="p-0 min-h-52" caption={t("渐变底、发光与模糊光斑。", "Gradient backgrounds, glows and blurred blobs.")}>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#3B0A75,#0062FF_55%,#00C2FF)]" />
            <div className="absolute top-6 right-8 size-28 rounded-[999px] bg-[#FF5EDB] opacity-70 blur-2xl" />
            <span className="absolute bottom-6 left-6 max-w-[13em] font-display text-[22px] leading-[1.04] font-extrabold text-white [text-shadow:0_0_24px_rgba(255,255,255,.7)]">AI infrastructure, accounted for byte by byte.</span>
          </DoDont>

          <DoDont kind="do" bodyClassName="place-items-start content-center gap-1.5" caption={t("文字用 foreground / subtle / muted-foreground，均 ≥ 4.5:1。", "Text in foreground, subtle or muted-foreground; ≥ 4.5:1.")}>
            <span className="text-lg font-semibold">{t("纠删集 1", "Erasure set 1")}</span>
            <span className="text-sm text-subtle">{t("6 块盘，EC 4+2，可容忍 2 块盘故障。", "Six drives, EC 4+2, tolerates two failed drives.")}</span>
            <span className="font-mono text-xs text-muted-foreground">{t("更新于 2026-10-14 · 示例数据", "Updated 2026-10-14 · Sample data")}</span>
          </DoDont>
          <DoDont kind="dont" on="white" bodyClassName="place-items-start content-center gap-1.5" caption={t("任意浅灰与过小字号。", "Ad-hoc greys and tiny type.")}>
            <span className="text-lg font-semibold text-[#9CA3AF]">{t("纠删集 1", "Erasure set 1")}</span>
            <span className="text-[12px] text-[#C7CBD1]">{t("6 块盘，EC 4+2，可容忍 2 块盘故障。", "Six drives, EC 4+2, tolerates two failed drives.")}</span>
            <span className="text-[10px] text-[#D9DCE1]">{t("更新于 2026-10-14", "Updated 2026-10-14")}</span>
          </DoDont>

          <DoDont kind="do" bodyClassName="content-center" caption={t("1px 边框，悬停变为前景色。", "1px border; foreground on hover.")}>
            <a href="#rules" className={cn(cx(CARD), "w-full max-w-72 p-5")}>
              <span className={CARD_ICON}>
                <Icon name="lock" />
              </span>
              <h3 className="mt-1 text-base font-semibold">{t("对象锁定", "Object Lock")}</h3>
              <p className={CARD_TEXT}>{t("以 WORM 方式保留对象。", "Retain objects as WORM.")}</p>
            </a>
          </DoDont>
          <DoDont kind="dont" bodyClassName="content-center" caption={t("侧边色条、阴影与圆角。", "Side rails, shadows, rounded corners.")}>
            <div className="grid w-full max-w-72 gap-2 rounded-[8px] border-l-4 border-[#0062FF] bg-background p-5 shadow-[0_8px_24px_rgba(11,14,20,0.14)]">
              <h3 className="text-base font-semibold">{t("对象锁定", "Object Lock")}</h3>
              <p className={CARD_TEXT}>{t("以 WORM 方式保留对象。", "Retain objects as WORM.")}</p>
            </div>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="web" />
    </Page>
  )
}
