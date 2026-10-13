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
        label={t("Templates · 网站与组件", "Templates · Web & UI")}
        title={t("网站与组件", "Web & UI")}
        subtitle={t("Web & UI", "网站与组件")}
        lede={t(
          "RustFS 官网、文档站与控制台的界面标准。组件以 Tailwind CSS v4 与 shadcn/ui 实现，取值来自 tokens/tailwind.css；其语义名称与 shadcn 一致，现有项目引入该文件即可切换为 RustFS 品牌。",
          "The interface standard for the RustFS website, documentation and Console. Components are built with Tailwind CSS v4 and shadcn/ui on the values in tokens/tailwind.css. Its semantic names match shadcn, so an existing project adopts the brand by importing that one file.",
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
            {t(
              "界面以 4px 为间距基数，12 栏网格，1240px 内容宽度。所有圆角为 0，所有分隔为 1px 线；阴影只用于浮层。焦点环为 2px Signal Blue，外扩 2px，任何可交互元素均不得移除。",
              "Interfaces use a 4px spacing base, a 12-column grid and a 1240px content width. Every corner is square and every division is a 1px rule; shadows belong to overlays only. The focus ring is 2px Signal Blue with a 2px offset and must never be removed from an interactive element.",
            )}
          </p>
        }
      >
        <Sub title={t("接入", "Setup")} aside="tokens/tailwind.css">
          <div className="grid items-start gap-x-8 gap-y-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <CodeBlock title="globals.css · layout.tsx" code={SETUP_CODE} />
            <Rules
              items={[
                t(
                  <>
                    <b>只引入一个文件。</b>tokens/tailwind.css 定义颜色、字体、字号预设、缓动与时长，并把 <Mono>--radius</Mono> 及所有 <Mono>rounded-*</Mono> 设为 0。
                  </>,
                  <>
                    <b>Import one file.</b> tokens/tailwind.css defines colour, type, type presets, easing and durations, and sets <Mono>--radius</Mono> and every <Mono>rounded-*</Mono> to 0.
                  </>,
                ),
                t(
                  <>
                    <b>语义优先。</b>组件只使用 <Mono>bg-background</Mono>、<Mono>text-foreground</Mono>、<Mono>bg-primary</Mono>、<Mono>border-border</Mono> 等语义类；色阶类（<Mono>bg-blue-600</Mono>）仅用于悬停与按下状态。
                  </>,
                  <>
                    <b>Semantic first.</b> Components use semantic classes such as <Mono>bg-background</Mono>, <Mono>text-foreground</Mono>, <Mono>bg-primary</Mono> and <Mono>border-border</Mono>; scale classes (<Mono>bg-blue-600</Mono>) appear only in hover and pressed states.
                  </>,
                ),
                t(
                  <>
                    <b>深色模式。</b>在 <Mono>{"<html>"}</Mono> 上切换 <Mono>.dark</Mono>，语义令牌自动换值，组件无需写 <Mono>dark:</Mono> 变体。
                  </>,
                  <>
                    <b>Dark mode.</b> Toggle <Mono>.dark</Mono> on <Mono>{"<html>"}</Mono>; semantic tokens switch values, so components need no <Mono>dark:</Mono> variants.
                  </>,
                ),
                t(
                  <>
                    下载：<a className="text-link underline underline-offset-4" href="/tokens/tailwind.css">tokens/tailwind.css</a>。
                  </>,
                  <>
                    Download: <a className="text-link underline underline-offset-4" href="/tokens/tailwind.css">tokens/tailwind.css</a>.
                  </>,
                ),
              ]}
            />
          </div>
        </Sub>

        <Sub title={t("网格与断点", "Grid and breakpoints")} aside="max-w-[1240px] · px-[clamp(16px,4.2vw,64px)]">
          <Spec
            bodyClassName="grid-cols-1 place-items-stretch p-0 min-h-0"
            caption={t("实时网格：缩放浏览器窗口查看列数变化", "Live grid: resize the window to see the column count change")}
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
              ["base", "0", "4", "16px", t("单栏；按钮通栏；导航收起为菜单按钮", "Single column; full-width buttons; navigation collapses to a menu button")],
              ["sm", "640px", "8", "24px", t("卡片两栏", "Cards in two columns")],
              ["md", "768px", "8", "24px", t("显示完整导航栏；区块标题与导语并排", "Full navigation bar; section heading beside its lede")],
              ["lg", "1024px", "12", "24px", t("文档侧栏出现；卡片三栏", "Docs sidebar appears; cards in three columns")],
              ["xl", "1280px", "12", "24px", t("内容宽度达到 1240px", "Content reaches its 1240px width")],
              ["2xl", "1536px", "12", "24px", t("内容保持 1240px，仅两侧边距增加", "Content stays at 1240px; only the side margins grow")],
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
                t("组件内部使用 4–16px（1–4）；相邻组件之间 24–32px（6–8）；内容组之间 48–64px；页面区块之间 96–128px。", "Inside a component use 4–16px (1–4); between components 24–32px (6–8); between groups 48–64px; between page sections 96–128px."),
                t("不得使用 4px 网格之外的数值，例如 13px、18px 的外边距。字号与行高不受此限制。", "Values off the 4px grid, such as 13px or 18px margins, are not permitted. Type sizes and line heights are exempt."),
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
                <span className="font-mono text-xs leading-snug text-subtle">{t("按 Tab 键在本页试用", "Press Tab to try it on this page")}</span>
              </div>
            </div>
            <Rules
              items={[
                t("圆角一律为 0。引入令牌后 rounded-xs 至 rounded-4xl 自动归零；rounded-full 不受令牌约束，不得使用，也不得以任意值重新加回圆角。", "Corners are always square. With the tokens imported, rounded-xs to rounded-4xl resolve to 0; rounded-full is outside the tokens and must not be used, and radius must never come back through arbitrary values."),
                t("卡片、按钮与输入框不加阴影，以 1px 边框和 surface 底色区分层次。菜单、弹出层、对话框与通知使用 shadow-overlay。", "Cards, buttons and inputs carry no shadow; separate them with 1px borders and the surface colour. Menus, popovers, dialogs and toasts use shadow-overlay."),
                t(
                  <>
                    焦点样式统一为 <Mono>{FOCUS}</Mono>；仅在键盘焦点时出现。
                  </>,
                  <>
                    The focus style is always <Mono>{FOCUS}</Mono>; it appears on keyboard focus only.
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
            {t(
              "以下 16 个组件均为实时渲染，可直接操作。代码块中的类名即页面实际使用的类名，可整段复制到 shadcn/ui 项目。每个组件须覆盖默认、悬停、键盘焦点、按下与禁用五种状态。",
              "All 16 components below are live and can be operated. The class names in each code block are the ones this page renders, ready to paste into a shadcn/ui project. Every component must cover five states: default, hover, keyboard focus, pressed and disabled.",
            )}
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
                  <b>每屏只有一个主按钮。</b>主按钮为 Signal Blue；次要操作使用 outline 或 secondary；危险操作使用 destructive，且须二次确认。
                </>,
                <>
                  <b>One primary button per view.</b> Primary is Signal Blue; secondary actions use outline or secondary; destructive actions use destructive and require confirmation.
                </>,
              ),
              t("品牌微交互：悬停时上移 1px，Signal 按钮同时出现一道斜向光带，以 720ms emphasized 缓动扫过；按下时回落。开启「减少动态效果」后两者均不出现。", "Brand micro-interaction: on hover the button lifts 1px and, on Signal buttons, a slanted sheen sweeps across over 720ms with the emphasized easing; pressing settles it. Both are removed under reduced motion."),
              t("按钮文字为动词开头的短语，不超过 3 个词或 6 个汉字。仅图标按钮须提供 aria-label。", "Labels start with a verb and stay within three words or six Chinese characters. Icon-only buttons need an aria-label."),
              t("禁用状态降低至 40% 不透明度并移除指针事件；不得隐藏按钮来表示不可用。", "Disabled drops to 40% opacity and removes pointer events; never hide a button to signal that it is unavailable."),
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
              t("标签始终可见，位于输入框上方；不得以占位符代替标签。占位符只给出格式示例。", "Labels are always visible and sit above the field; placeholders never replace them and only show a format example."),
              t("帮助文字说明规则，错误文字说明如何修正。错误时边框与文字为 danger，前置方块标记，并通过 aria-invalid 与 aria-describedby 关联。", "Help text states the rule; error text says how to fix it. Errors turn the border and message danger, add a square marker, and are wired with aria-invalid and aria-describedby."),
              t("路径、键名、端点、版本号等机器值使用 Geist Mono 13px。", "Machine values such as paths, keys, endpoints and versions use Geist Mono at 13px."),
              t("禁用字段保留数值并说明原因；只读值不得伪装成可编辑输入。", "Disabled fields keep their value and explain why; read-only values never pose as editable inputs."),
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
              t("2–5 个互斥选项且需同时可见时，使用分段控件；更多选项或空间不足时，使用下拉选择。", "Use a segmented control for 2–5 exclusive options that should stay visible; use a select for more options or less space."),
              t("分段控件的选中项为前景色实底、背景色文字；不得使用蓝色填充，以免与主按钮混淆。", "The selected segment is filled with the foreground colour and set in the background colour; never fill it blue, which would read as a primary button."),
              t("下拉箭头为 1.5px 描边的直角折线，与图标系统一致。", "The select chevron is a 1.5px square-capped stroke, consistent with the icon set."),
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
              t("复选框与开关均为直角方形；勾选后以 Signal Blue 填充。部分选择以短横线表示。", "Checkboxes and switches are square; the checked state fills with Signal Blue. A partial selection shows a short dash."),
              t("复选框用于需要提交的设置；开关用于立即生效的设置。", "Use a checkbox for settings that are submitted; use a switch for settings that apply immediately."),
              t("依赖其他设置的选项在条件不满足时禁用，并在标签中说明依赖关系。", "Options that depend on another setting are disabled until it is met, and the label states the dependency."),
              t("整行标签可点击，点击区域高度不少于 24px；触屏界面不少于 44px。", "The whole label is clickable, at least 24px tall, and at least 44px on touch screens."),
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
                  <b>颜色只在方形标记上。</b>状态标记由 8px 方块、等宽大写文字与 1px 边框组成；不得使用圆点、胶囊形或彩色底。
                </>,
                <>
                  <b>Colour lives on the square marker.</b> A status chip is an 8px square, mono capitals and a 1px border; dots, pills and tinted fills are not permitted.
                </>,
              ),
              t("盘与节点状态：在线 = success，修复中 = brand 并播放修复动效，降级 = warning，离线 = danger。", "Drive and node states: Online = success, Healing = brand with the heal motion, Degraded = warning, Offline = danger."),
              t("Oxide 只用于校验块与预览功能，同一视图中不超过一处。", "Oxide marks parity and preview features only, at most once per view."),
              t("状态不得只靠颜色传达，文字标签始终保留。", "State is never conveyed by colour alone; the text label always stays."),
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
              t("当前标签以 2px Signal Blue 底线与前景色文字表示，底线与列表的 1px 分隔线重合。", "The active tab shows a 2px Signal Blue underline over the list's 1px rule, with foreground text."),
              t("标签数量为 2–7 个。窄屏下标签栏横向滚动，不换行、不收入下拉菜单。", "Use 2–7 tabs. On narrow screens the list scrolls horizontally; it never wraps or collapses into a menu."),
              t("计数徽标使用等宽数字；不得在标签上使用图标与计数之外的装饰。", "Count badges use tabular numerals; tabs carry no decoration other than an icon and a count."),
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
              t("代码始终置于 Ink 底色上，浅色与深色主题相同；字体为 Geist Mono 13px，行高 1.65。", "Code always sits on Ink, identical in light and dark themes, set in Geist Mono at 13px with a 1.65 line height."),
              t("命令只取自 RustFS README 或官方文档；以注释说明结果，不得虚构程序输出。", "Commands come only from the RustFS README or official documentation; comments state the result and program output is never invented."),
              t("提示符 $ 不可选中、不被复制。长命令在块内横向滚动，不得折行到下一行。", "The $ prompt is not selectable and is not copied. Long commands scroll inside the block and never wrap."),
              t("复制后按钮图标变为对勾 1600ms，并弹出「已复制」通知。", "After copying, the icon turns into a check for 1600ms and a Copied toast appears."),
            ]}
          >
            <Row label={t("命令栏", "Command")}>
              <CommandBar command={INSTALL} className="w-full" />
            </Row>
            <Row label={t("代码块", "Block")} className="block">
              <CodeBlock title="Docker · README" code={DOCKER}>
                <span className="tok-c"># Create data and logs directories</span>
                {"\n"}
                <span className="tok-k">mkdir</span> -p data logs
                {"\n\n"}
                <span className="tok-c"># Change the owner of these directories</span>
                {"\n"}
                <span className="tok-k">chown</span> -R <span className="tok-n">10001:10001</span> data logs
                {"\n\n"}
                <span className="tok-k">docker</span> run -d -p <span className="tok-n">9000:9000</span> -p <span className="tok-n">9001:9001</span> -v $(pwd)/data:/data -v $(pwd)/logs:/logs <span className="tok-s">rustfs/rustfs:latest</span>
              </CodeBlock>
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
              t("提示框只用方形标记区分类型：说明 = info，提示 = success，警告 = warning，预览 = parity。不得使用左侧色条或彩色底。", "Callouts differ only by their square marker: note = info, tip = success, warning = warning, preview = parity. Coloured side rails and tinted fills are not permitted."),
              t("每个提示框只说一件事，不超过 3 句；同一屏不超过 2 个。", "One point per callout, at most three sentences; no more than two per screen."),
              t("警告须写明后果与条件，不使用感叹号或全大写强调。", "Warnings state the consequence and its condition, without exclamation marks or all-caps emphasis."),
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
              t("数字列右对齐并使用等宽数字（tabular-nums），单位写在表头或数值后；文本列左对齐。", "Numeric columns are right-aligned with tabular numerals, units in the header or after the value; text columns are left-aligned."),
              t("密集表格行高 40px，表头 36px；行之间只用 1px 分隔线，不使用斑马纹。", "Dense tables use 40px rows and a 36px header; rows are separated by 1px rules only, never zebra stripes."),
              t("窄屏下表格在自身容器内横向滚动，页面不得出现横向滚动。", "On narrow screens the table scrolls inside its own container; the page never scrolls sideways."),
              t("缺失值使用长破折号「—」，不得留空或写 0。", "Missing values show an em dash (—), never a blank or a zero."),
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
              t("卡片以 1px border-border 框定，悬停时边框变为前景色，箭头右移 2px；整张卡片为一个链接。", "Cards are framed by a 1px border-border; on hover the border turns to the foreground colour and the arrow moves 2px right. The whole card is one link."),
              t("不得使用左侧或顶部彩色色条、阴影、渐变底或圆角来强调卡片。", "Never emphasise a card with a coloured side or top rail, a shadow, a gradient fill or rounded corners."),
              t("每张卡片：一个图标、一个标题、一至两句说明；同组卡片等高。", "Each card has one icon, one title and one or two sentences; cards in a group share one height."),
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
              t("导航栏高 64px，底部 1px 分隔线，滚动时固定于顶部，不加阴影与毛玻璃。", "The bar is 64px tall with a 1px bottom rule; it sticks on scroll without shadow or background blur."),
              t("一级链接不超过 5 个；当前页以前景色加中等字重表示，并设置 aria-current。", "At most five top-level links; the current page uses the foreground colour and medium weight, with aria-current set."),
              t("右侧依次为语言、GitHub、唯一的主按钮。容器宽度小于 768px 时收起为菜单按钮，展开后每项高 48px。", "On the right: language, GitHub and the single primary button. Below a 768px container the links collapse into a menu button; each item in the open menu is 48px tall."),
              t("示例使用容器查询（@container），在任意宽度的父元素中均可正确收起。", "The example uses container queries (@container), so it collapses correctly inside a parent of any width."),
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
                <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{t("手机 · 390px · 点击菜单按钮", "Phone · 390px · tap the menu button")}</span>
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
              t("公告栏位于导航栏之上，始终为 Ink 底色，全站同一时间只有一条公告。", "The announcement sits above the navigation bar, always on Ink, with one announcement site-wide at a time."),
              t("文字为一句陈述加一个链接，例如版本发布；不得用于促销倒计时或营销口号。", "One statement and one link, such as a release; never countdowns or marketing slogans."),
              t("可关闭；关闭状态按公告编号记住，新公告发布后重新显示。", "It can be dismissed; the dismissal is remembered per announcement ID and a new announcement shows again."),
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
              t("页脚包含字标与标语、三至四组链接、版权与许可证；不放社交媒体图标墙。", "The footer holds the wordmark and line, three or four link groups, copyright and licence; no wall of social icons."),
              t("分组标题使用等宽大写，链接为 subtle 色，悬停变为前景色。", "Group headings use mono capitals; links are subtle and turn to the foreground colour on hover."),
              t("版权行固定写法：© 年份 RustFS · Apache License 2.0。", "The copyright line always reads: © year RustFS · Apache License 2.0."),
            ]}
          >
            <footer className={FOOTER}>
              <div className={FOOTER_GRID}>
                <div className="col-span-2 grid content-start gap-3 @2xl:col-span-1">
                  <Wordmark className="h-4.5 w-auto text-brand dark:text-foreground" />
                  <p className="max-w-[24ch] text-sm leading-relaxed text-subtle">{t("每一个字节，都有着落。", "Every byte, accounted for.")}</p>
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
              t("通知用于确认刚完成的操作或报告后台结果；需要用户决定的内容使用对话框。", "Toasts confirm an action just taken or report a background result; anything that needs a decision uses a dialog."),
              t("标题不超过一行，说明给出对象与数值，例如存储桶名称与用量。", "The title fits on one line; the description names the object and the figures, such as a bucket and its usage."),
              t("成功通知 4 秒后自动消失；错误通知保留至用户关闭。同时显示不超过 3 条。", "Success toasts dismiss after four seconds; errors stay until dismissed. No more than three at once."),
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
              t("空状态说明此处将出现什么，并给出唯一的下一步操作。", "An empty state says what will appear here and offers one next step."),
              t("图形使用轮廓模式的小型分片矩阵（只有空格，没有数据），不得使用插画或表情。", "The graphic is a small outline-mode shard matrix (empty cells, no data); illustrations and emoji are not used."),
              t("空状态居中排列，是本规范中左对齐原则的例外。", "Empty states are centred, the one exception to left alignment in these guidelines."),
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
            aside={t("以分片绘制", "drawn as shards")}
            code={PROGRESS_CODE}
            codeTitle="heal-progress.tsx · quota.tsx"
            rules={[
              t("可计数的进度以分片绘制：一格代表一块盘或一个单位，已完成为 brand，进行中播放修复动效，未开始为轮廓。", "Countable progress is drawn as shards: one cell per drive or unit; done is brand, in progress runs the heal motion, not started is an outline."),
              t("配额条固定 40 格：低于 80% 为 brand，80% 起为 warning，95% 起为 danger，并同步显示状态标记。", "Quota bars have 40 cells: brand below 80%, warning from 80%, danger from 95%, with a matching status chip."),
              t("数值以「已用 / 总量 · 百分比」形式给出，使用等宽数字；须设置 role=progressbar 与 aria-valuenow。", "Values read “used / total · percent” in tabular numerals; set role=progressbar and aria-valuenow."),
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
            {t(
              "官网与文档站的整页区块，以 1440px 桌面宽度与 390px 手机宽度绘制。每个区块只有一个标签、一个标题与一个图形；内容宽度 1240px，两侧边距随视口变化。选择「编辑文字」可修改文案，「导出 PNG」用于评审与提案。",
              "Full-width sections for the website and documentation, drawn at 1440px desktop and 390px phone widths. Each section has one label, one title and one graphic; content is 1240px wide and the side margins flex with the viewport. Use Edit text to change copy and Export PNG for reviews and proposals.",
            )}
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
            {t(
              "版本通知与月报使用 640px 单栏布局。邮件客户端对 CSS 与字体的支持有限：版式须在图片被屏蔽、系统字体替换与深色模式反色时仍然成立。",
              "Release notices and the monthly newsletter use a 640px single column. Mail clients support CSS and fonts only partly, so the layout must hold when images are blocked, system fonts stand in and dark mode inverts colours.",
            )}
          </p>
        }
      >
        <TemplateGrid>
          <EmailTemplate />
          <div className="col-span-12 grid content-start gap-8 md:col-span-7">
            <Table
              head={[t("项目", "Item"), t("规则", "Rule")]}
              rows={[
                [t("宽度", "Width"), t("640px 单栏，左右内边距 40px；窄屏客户端中缩放至 100% 宽度。", "A 640px single column with 40px side padding; scales to 100% width in narrow clients.")],
                [t("字体", "Fonts"), t("使用系统字体栈：-apple-system、Segoe UI、PingFang SC、Microsoft YaHei、Arial。不加载网络字体。", "Use the system stack: -apple-system, Segoe UI, PingFang SC, Microsoft YaHei, Arial. Web fonts are not loaded.")],
                [t("图片关闭", "Images off"), t("顶部色带以单元格背景色绘制，字标图片带 alt=\"RustFS\"；正文与按钮全部为实时文字。", "The header band is a cell background colour and the wordmark image carries alt=\"RustFS\"; body copy and buttons are live text.")],
                [t("点击区域", "Tap targets"), t("按钮高 48px，链接之间间距不小于 12px；所有可点区域不小于 44 × 44px。", "Buttons are 48px tall with at least 12px between links; every tap target is at least 44 × 44px.")],
                [t("深色模式", "Dark mode"), t("声明 color-scheme；字标置于 Signal 色带上，反色后仍可辨认；不使用透明背景的深色图片。", "Declare color-scheme; the wordmark sits on the Signal band and survives inversion; no dark images on transparent backgrounds.")],
                [t("正文", "Body"), t("正文 16px，行高 1.6；链接带下划线；数字须注明来源与日期。", "Body text 16px at 1.6 line height; links underlined; figures carry a source and date.")],
                [t("合规", "Compliance"), t("页脚须包含订阅原因、退订链接与公司通讯地址，并提供纯文本版本。", "The footer states why the reader is subscribed, an unsubscribe link and the company's postal address; a plain-text version is sent alongside.")],
              ]}
            />
            <CodeBlock title="email.html · bulletproof button" code={MAIL_BUTTON_CODE} />
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
            {t(
              "微交互只用于反馈：确认悬停、确认操作、报告状态。时长取自 80 / 150 / 240 / 420 / 720ms 五档，缓动取自 standard 与 emphasized，不得使用回弹或超调。开启「减少动态效果」后，位移与扫光取消，状态直接切换。",
              "Micro-interactions exist for feedback only: acknowledging hover, confirming an action, reporting state. Durations come from the 80 / 150 / 240 / 420 / 720ms steps and easing from standard and emphasized; bounce and overshoot are not used. Under reduced motion, movement and sheen are removed and states switch directly.",
            )}
          </p>
        }
      >
        <div className="grid border-t border-l border-border md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              k: t("按钮扫光", "Button sheen"),
              tok: "720ms · ease-emphasized · translate",
              d: t("悬停时按钮上移 1px，光带从左至右扫过一次；离开时立即复位，不反向扫回。", "On hover the button lifts 1px and the sheen crosses once from left to right; on leave it resets instantly and never sweeps back."),
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
              d: t("正文中的独立链接，下划线自左向右生长；键盘焦点时同样显示。正文段落内的链接始终带下划线。", "Standalone links grow their underline from left to right, on hover and on keyboard focus. Links inside running text keep a permanent underline."),
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
              d: t("边框由 border 变为前景色，箭头右移 2px；卡片本身不位移、不放大、不加阴影。", "The border turns from border to foreground and the arrow moves 2px right; the card itself never moves, scales or gains a shadow."),
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
              d: t("点击复制后图标变为对勾并转为 success 色，保持 1600ms；同时弹出「已复制」通知。", "After copying, the icon turns into a check in the success colour for 1600ms, and a Copied toast appears."),
              stage: <CommandBar command="mkdir -p data logs" className="w-full max-w-72" />,
            },
            {
              k: t("修复动效", "Heal"),
              tok: "720ms × 3 · steps",
              d: t("一块分片掉线（虚线框）→ 校验块闪亮 → 分片重建，每步 720ms，阶跃切换而非渐变。状态标记同步变化。", "A shard drops out (dashed) → parity flashes → the shard is rebuilt, 720ms per step, switched in steps rather than faded. The status chip follows."),
              stage: <HealDemo />,
            },
            {
              k: t("骨架屏", "Skeleton"),
              tok: "1200ms · stagger 40ms · steps(1)",
              d: t("加载占位由 8px 分片排成文字行，按 40ms 间隔逐格点亮，呈现「写入」的品牌动作；不使用闪烁渐变条。", "Placeholders are rows of 8px shards lit one by one at 40ms intervals, echoing the brand's write move; no shimmering gradient bars."),
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
          <CodeBlock title="heal · keyframes" code={HEAL_CSS} />
          <CodeBlock title="skeleton · keyframes" code={SKELETON_CSS} />
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
          <DoDont kind="dont" bodyClassName="gap-4" caption={t("圆角按钮、圆角输入框与胶囊形状。", "Rounded buttons, rounded inputs and capsule shapes.")}>
            <div className="grid w-full max-w-72 gap-3">
              <span className="flex h-10 items-center rounded-[10px] border border-input px-3 font-mono text-[13px]">s3://photos</span>
              <div className="flex gap-2">
                <span className="inline-flex h-8 items-center rounded-[999px] bg-primary px-4 text-[13px] font-medium text-primary-foreground">{t("创建", "Create")}</span>
                <span className="inline-flex h-8 items-center rounded-[999px] border border-strong px-4 text-[13px] font-medium">{t("取消", "Cancel")}</span>
              </div>
            </div>
          </DoDont>

          <DoDont kind="do" bodyClassName="flex flex-wrap content-center gap-2.5" caption={t("状态由方形标记、等宽文字与 1px 边框组成。", "State is a square marker, mono text and a 1px border.")}>
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
          <DoDont kind="dont" bodyClassName="flex flex-wrap content-center gap-2.5" caption={t("彩色胶囊徽标与圆点：形状偏离品牌，彩色底也降低文字对比度。", "Coloured pills and dots: off-brand shapes, and tinted fills lower text contrast.")}>
            <span className="inline-flex h-6 items-center gap-1.5 rounded-[999px] bg-[#D1FAE5] px-3 text-xs font-medium text-[#34D399]">
              <i className="size-1.5 rounded-[999px] bg-[#34D399]" />
              Online
            </span>
            <span className="inline-flex h-6 items-center rounded-[999px] bg-[#FEF3C7] px-3 text-xs font-medium text-[#FBBF24]">Degraded</span>
            <span className="inline-flex h-6 items-center rounded-[999px] bg-[#FEE2E2] px-3 text-xs font-medium text-[#F87171]">Offline</span>
          </DoDont>

          <DoDont kind="do" on="ink" bodyClassName="p-0 min-h-52" caption={t("平涂底色，图形来自产品结构。", "A flat surface; the graphic comes from the product's structure.")}>
            <div className="absolute inset-0 [--mx-data:#0062FF] [--mx-empty:rgba(255,255,255,0.14)] [--mx-parity:#FF5E14]">
              <ShardMatrix className="absolute inset-y-5 right-5 !h-auto !w-[40%]" cols={8} rows={6} k={7} m={1} seed={9} mode="tone" fade="bl" fit="right" />
              <span className="absolute bottom-6 left-6 max-w-[11em] font-display text-[26px] leading-[1.02] font-extrabold text-white [font-stretch:125%]">Every byte, accounted for.</span>
            </div>
          </DoDont>
          <DoDont kind="dont" bodyClassName="p-0 min-h-52" caption={t("渐变底、发光与模糊光斑。", "Gradient backgrounds, glows and blurred blobs.")}>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#3B0A75,#0062FF_55%,#00C2FF)]" />
            <div className="absolute top-6 right-8 size-28 rounded-[999px] bg-[#FF5EDB] opacity-70 blur-2xl" />
            <span className="absolute bottom-6 left-6 max-w-[11em] font-display text-[26px] leading-[1.02] font-extrabold text-white [text-shadow:0_0_24px_rgba(255,255,255,.7)]">Every byte, accounted for.</span>
          </DoDont>

          <DoDont kind="do" bodyClassName="place-items-start content-center gap-1.5" caption={t("正文为 foreground 或 subtle，次要信息为 muted-foreground，均满足 4.5:1。", "Body text is foreground or subtle, secondary text muted-foreground; all meet 4.5:1.")}>
            <span className="text-lg font-semibold">{t("纠删集 1", "Erasure set 1")}</span>
            <span className="text-sm text-subtle">{t("6 块盘，EC 4+2，可容忍 2 块盘故障。", "Six drives, EC 4+2, tolerates two failed drives.")}</span>
            <span className="font-mono text-xs text-muted-foreground">{t("更新于 2026-10-14 · 示例数据", "Updated 2026-10-14 · Sample data")}</span>
          </DoDont>
          <DoDont kind="dont" on="white" bodyClassName="place-items-start content-center gap-1.5" caption={t("任意浅灰色与过小字号：对比度不足，深色模式下也不会随之变化。", "Ad-hoc light greys and tiny type: too little contrast, and they ignore dark mode.")}>
            <span className="text-lg font-semibold text-[#9CA3AF]">{t("纠删集 1", "Erasure set 1")}</span>
            <span className="text-[12px] text-[#C7CBD1]">{t("6 块盘，EC 4+2，可容忍 2 块盘故障。", "Six drives, EC 4+2, tolerates two failed drives.")}</span>
            <span className="text-[10px] text-[#D9DCE1]">{t("更新于 2026-10-14", "Updated 2026-10-14")}</span>
          </DoDont>

          <DoDont kind="do" bodyClassName="content-center" caption={t("1px 边框卡片，悬停时边框变为前景色。", "A 1px bordered card whose border turns to the foreground colour on hover.")}>
            <a href="#rules" className={cn(cx(CARD), "w-full max-w-72 p-5")}>
              <span className={CARD_ICON}>
                <Icon name="lock" />
              </span>
              <h3 className="mt-1 text-base font-semibold">{t("对象锁定", "Object Lock")}</h3>
              <p className={CARD_TEXT}>{t("以 WORM 方式保留对象。", "Retain objects as WORM.")}</p>
            </a>
          </DoDont>
          <DoDont kind="dont" bodyClassName="content-center" caption={t("左侧彩色色条、阴影与圆角组合的卡片。", "Cards with a coloured side rail, a shadow and rounded corners.")}>
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
