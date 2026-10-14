import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import { Icon } from "@/components/brand/icon"
import { CodeBlock } from "@/components/site/code-block"
import { Note, Page, PageFooter, PageHeader, Section, Sub, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { motion, semantic, space, typography } from "@/lib/tokens"

export const metadata: Metadata = { title: "Design Tokens" }

const read = (f: string) => readFileSync(join(process.cwd(), "tokens", f), "utf8")

export default async function TokensPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)
  const files = [
    { f: "tokens.json", zh: "W3C DTCG 格式的唯一来源，可导入 Tokens Studio 与 Style Dictionary。", en: "The single source in W3C DTCG format; imports into Tokens Studio and Style Dictionary." },
    { f: "tailwind.css", zh: "Tailwind v4 主题：原始色、字体、字号、缓动，以及与 shadcn/ui 同名的语义变量。", en: "Tailwind v4 theme: primitives, fonts, type sizes, easings and semantic variables named like shadcn/ui." },
    { f: "tokens.css", zh: "不依赖框架的 CSS 变量，含浅色、深色与跟随系统三种模式。", en: "Framework-free CSS variables with light, dark and follow-the-system modes." },
  ]

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/tokens/"
        label="Resources · Design tokens"
        title="Design Tokens"
        subtitle={t("设计令牌", "Design tokens")}
        lede={t(
          "Design Tokens 是品牌在代码中的唯一来源。颜色、字体、字号、间距、圆角与动效均以 tokens.json 定义，并生成 Tailwind v4 主题与 CSS 变量，供官网、文档站与控制台直接使用。",
          "Design tokens are the brand's single source of truth in code. Colour, type, sizes, spacing, radius and motion are defined in tokens.json and generated into a Tailwind v4 theme and CSS variables that the website, documentation and Console use directly.",
        )}
        meta={[
          { k: t("格式", "Format"), v: "W3C DTCG" },
          { k: t("输出", "Outputs"), v: "Tailwind v4 · CSS" },
          { k: t("语义命名", "Semantic names"), v: "shadcn/ui" },
        ]}
      />

      <Section id="files" tag="Files" title={t("文件", "Files")} lede={<p>{t("三个文件内容一致，按项目需要选用。", "The three files carry the same values; use the one that fits the project.")}</p>}>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {files.map((x) => (
            <a key={x.f} href={`/tokens/${x.f}`} download className="group grid content-start gap-3 bg-background p-5 transition-colors hover:bg-surface">
              <span className="flex items-center justify-between font-mono text-sm">
                {x.f}
                <Icon name="download" className="size-4 text-faint transition-colors group-hover:text-brand" />
              </span>
              <span className="text-sm leading-relaxed text-subtle">{t(x.zh, x.en)}</span>
            </a>
          ))}
        </div>
      </Section>

      <Section id="tiers" tag="Tiers" title={t("三层结构", "Three tiers")} lede={<p>{t("组件只引用语义层，语义层引用原始层。修改品牌色时只需改动原始层，深浅主题自动跟随。", "Components reference only semantic tokens, and semantic tokens reference primitives. Changing a brand colour touches the primitive tier only; both themes follow.")}</p>}>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            ["Primitive", t("原始层", "Primitive"), "--color-blue-500: #0062FF", t("色阶、字体族、缓动等原始值。", "Raw values: scales, families, easings.")],
            ["Semantic", t("语义层", "Semantic"), "--primary: var(--color-blue-500)", t("按用途命名，区分浅色与深色主题。", "Named by role, with light and dark values.")],
            ["Component", t("组件层", "Component"), "bg-primary text-primary-foreground", t("组件通过 Tailwind 工具类使用语义层。", "Components use semantic tokens through Tailwind utilities.")],
          ].map(([k, name, code, note], i) => (
            <div key={i} className="grid content-start gap-3 bg-background p-5">
              <span className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{String(i + 1).padStart(2, "0")} · {k}</span>
              <b className="text-lg font-semibold">{name}</b>
              <code className="w-fit font-mono text-xs">{code}</code>
              <span className="text-sm leading-relaxed text-subtle">{note}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="usage" tag="Usage" title={t("接入方式", "Using the tokens")}>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock title={t("Tailwind v4 项目（含 shadcn/ui）", "Tailwind v4 projects (including shadcn/ui)")} lang="css" code={`/* app/globals.css */\n@import "tailwindcss";\n@import "./rustfs-tokens.css"; /* tokens/tailwind.css */\n\n/* Remove the project's own :root / .dark colour variables:\n   the file defines --background, --primary, --ring … */`} />
          <CodeBlock title={t("字体（Next.js）", "Fonts (Next.js)")} lang="tsx" code={`import { Archivo, Geist, Geist_Mono } from "next/font/google"\n\nconst archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" })\nconst geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })\nconst geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })\n\n<html className={\`\${archivo.variable} \${geistSans.variable} \${geistMono.variable}\`}>`} />
          <CodeBlock title={t("组件中使用", "In components")} lang="tsx" code={`<button className="bg-primary text-primary-foreground hover:bg-blue-600">\n  Download RustFS\n</button>\n\n<h1 className="type-display-lg">Every byte, accounted for.</h1>\n<span className="type-label-md text-muted-foreground">Release · 2026-10</span>\n<div className="border border-border bg-surface text-subtle" />`} />
          <CodeBlock title={t("纯 CSS", "Plain CSS")} lang="css" code={`@import url("tokens.css");\n\n.button {\n  background: var(--primary);\n  color: var(--primary-foreground);\n  font-family: var(--font-sans);\n  transition: background-color var(--duration-fast) var(--ease-standard);\n}`} />
        </div>
        <Note>{t("tailwind.css 会覆盖 Tailwind 默认的 blue 与 neutral 色阶，并将所有圆角设为 0。引入后，项目中的 rounded-* 不再产生圆角。", "tailwind.css replaces Tailwind's default blue and neutral scales and sets every radius to 0. Once imported, rounded-* utilities no longer round corners.")}</Note>
      </Section>

      <Section id="semantic" tag="Semantic colours" title={t("语义色全表", "All semantic colours")} lede={<p>{t("包含 shadcn/ui 的全部标准角色，以及 RustFS 增加的 brand、parity、subtle、faint、surface、stage 等角色。", "Every standard shadcn/ui role, plus the roles RustFS adds: brand, parity, subtle, faint, surface, stage and more.")}</p>}>
        <Table
          head={["Token", t("浅色", "Light"), t("深色", "Dark"), "Tailwind"]}
          rows={semantic.light.map((r) => {
            const d = semantic.dark.find((x) => x.name === r.name)!
            return [
              <code key="n" className="!bg-transparent !p-0 font-mono text-[13px]">--{r.name}</code>,
              <Swatch key="l" hex={r.hex} />,
              <Swatch key="d" hex={d.hex} />,
              <span key="tw" className="font-mono text-xs text-muted-foreground">{twClass(r.name)}</span>,
            ]
          })}
        />
      </Section>

      <Section id="type" tag="Typography" title={t("字体样式", "Type styles")}>
        <Table
          mono={[0, 1, 2, 3, 4]}
          head={[t("工具类", "Utility"), t("字号", "Size"), t("行高", "Line height"), t("字重", "Weight"), t("字距 · 宽度", "Tracking · width")]}
          rows={typography.map((s) => [`type-${s.name}`, s.fontSize, String(s.lineHeight), String(s.fontWeight), `${s.letterSpacing}${"fontStretch" in s ? ` · ${s.fontStretch}` : ""}`])}
        />
      </Section>

      <Section id="others" tag="Space · motion" title={t("间距、圆角与动效", "Space, radius and motion")}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Sub title={t("间距（4px 基数）", "Space (4px base)")}>
            <div className="grid gap-1.5">
              {space.filter((s) => s.step !== "0").map((s) => (
                <div key={s.step} className="grid grid-cols-[48px_64px_1fr] items-center gap-3 font-mono text-xs">
                  <span className="text-muted-foreground">{s.step}</span>
                  <span>{s.value}</span>
                  <span className="h-2.5 bg-brand" style={{ width: s.value }} />
                </div>
              ))}
            </div>
          </Sub>
          <Sub title={t("圆角与动效", "Radius and motion")}>
            <Table
              mono={[0, 1]}
              head={["Token", t("取值", "Value")]}
              rows={[
                ["--radius-*", "0px"],
                ["--radius-full", t("9999px（仅平台头像裁切）", "9999px (platform avatar crops only)")],
                ...motion.easing.map((e) => [`--ease-${e.name}`, e.css]),
                ...motion.duration.map((d) => [`--duration-${d.name}`, d.value]),
                ["--shadow-overlay", "0 24px 48px -16px #0B0E1447"],
              ]}
            />
          </Sub>
        </div>
      </Section>

      <Section id="source" tag="Source" title={t("源文件", "Source")} lede={<p>{t("以下为当前版本的完整内容。", "The complete files for the current version.")}</p>}>
        <div className="grid gap-4">
          <CodeBlock title="tokens/tailwind.css" code={read("tailwind.css")} maxHeight={420} />
          <CodeBlock title="tokens/tokens.json" code={read("tokens.json")} maxHeight={420} />
        </div>
      </Section>

      <PageFooter slug="tokens" />
    </Page>
  )
}

function Swatch({ hex }: { hex: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs whitespace-nowrap">
      <i className="inline-block size-3.5 shadow-[inset_0_0_0_1px_rgba(127,127,127,0.35)]" style={{ background: hex }} />
      {hex.toUpperCase()}
    </span>
  )
}

function twClass(name: string) {
  if (name.endsWith("foreground") || ["subtle", "faint", "link", "parity-text", "success", "warning", "danger", "info"].includes(name)) return `text-${name}`
  if (["border", "input", "strong", "sidebar-border"].includes(name)) return `border-${name}`
  if (["ring", "sidebar-ring"].includes(name)) return `ring-${name}`
  if (name === "selection") return "selection:bg-selection"
  return `bg-${name}`
}
