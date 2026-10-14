import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import { Icon } from "@/components/brand/icon"
import { CodeBlock } from "@/components/site/code-block"
import { Note, Page, PageFooter, PageHeader, Section, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "DESIGN.md 与 Skill" : "DESIGN.md and skill" }
}

export default async function AgentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)
  const design = readFileSync(join(process.cwd(), "DESIGN.md"), "utf8")
  const skill = readFileSync(join(process.cwd(), "skills/rustfs-brand/SKILL.md"), "utf8")

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/agents/"
        label="Resources · AI agents"
        title={t("DESIGN.md 与 Skill", "DESIGN.md and skill")}
        subtitle={t("For AI agents", "面向 AI agent")}
        lede={t(
          "本指南同时以两种机器可读的形式发布，供 AI 编码与设计 agent 直接使用：DESIGN.md 描述设计令牌与规则，rustfs-brand Skill 提供完整的工作流程、参考资料与渲染脚本。",
          "These guidelines are also published in two machine-readable forms for AI coding and design agents: DESIGN.md describes the tokens and rules, and the rustfs-brand skill adds the full workflow, references and rendering scripts.",
        )}
        meta={[
          { k: "DESIGN.md", v: "alpha · lint 0 / 0" },
          { k: "Skill", v: "rustfs-brand" },
          { k: t("适用", "Works with"), v: "Claude Code · Claude.ai · Agent SDK" },
        ]}
      />

      <Section
        id="design-md"
        tag="DESIGN.md"
        title={t("DESIGN.md", "DESIGN.md")}
        lede={
          <>
            <p>{t("DESIGN.md 采用 Google 开源的 design.md 格式：文件开头的 YAML 定义颜色、字体、圆角、间距与组件令牌，正文按固定章节说明使用规则。编码 agent 读取后即可生成符合品牌的界面，并可用官方 CLI 校验。", "DESIGN.md uses Google's open design.md format: YAML front matter defines colour, type, radius, spacing and component tokens, and the body explains the rules in fixed sections. Coding agents read it to produce on-brand interfaces, and the official CLI validates it.")}</p>
          </>
        }
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            ["01", t("放入项目", "Add to the project"), t("将 DESIGN.md 放在仓库根目录，与 AGENTS.md 或 CLAUDE.md 并列。", "Place DESIGN.md at the repository root next to AGENTS.md or CLAUDE.md.")],
            ["02", t("在说明中引用", "Reference it"), t("在 AGENTS.md 中写明：所有界面与视觉工作须遵循 DESIGN.md。", "State in AGENTS.md that all interface and visual work must follow DESIGN.md.")],
            ["03", t("校验与导出", "Validate and export"), t("用 CLI 检查引用与对比度，或导出 Tailwind 与 DTCG 格式。", "Use the CLI to check references and contrast, or export Tailwind and DTCG formats.")],
          ].map(([n, k, v]) => (
            <div key={n} className="grid content-start gap-2 bg-background p-5">
              <span className="font-mono text-xs text-brand">{n}</span>
              <b className="text-base font-semibold">{k}</b>
              <p className="text-sm leading-relaxed text-subtle">{v}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <a href="/DESIGN.md" download className="group grid content-start gap-2 border border-border p-5 transition-colors hover:bg-surface lg:col-span-2">
            <span className="flex items-center justify-between font-mono text-sm">
              DESIGN.md
              <Icon name="download" className="size-4 text-faint transition-colors group-hover:text-brand" />
            </span>
            <span className="text-sm leading-relaxed text-subtle">{t("下载当前版本的 DESIGN.md。", "Download the current DESIGN.md.")}</span>
          </a>
          <CodeBlock title={t("命令", "Commands")} lang="bash" code={`npx @google/design.md lint DESIGN.md\nnpx @google/design.md export --format css-tailwind DESIGN.md\nnpx @google/design.md export --format dtcg DESIGN.md`} />
          <CodeBlock title="AGENTS.md" lang="markdown" code={`## Design\n\nAll UI, marketing and visual work must follow DESIGN.md\n(RustFS design system). Use the tokens in tokens/tailwind.css;\ndo not introduce colours, radii or fonts outside it.`} />
        </div>
        <CodeBlock title="DESIGN.md" lang="markdown" code={design} maxHeight={520} />
      </Section>

      <Section
        id="skill"
        tag="Skill"
        title={t("rustfs-brand Skill", "The rustfs-brand skill")}
        lede={<p>{t("Skill 是一个可安装的能力包。当用户要求制作任何 RustFS 品牌物料（封面、社媒、广告、幻灯片、视频缩略图、网站区块、图表等）时，agent 会自动加载它，按品牌规则完成设计，并用内置脚本渲染出 PNG 后自检。", "The skill is an installable capability package. Whenever someone asks for RustFS-branded material — covers, social posts, ads, slides, video thumbnails, web sections, charts — the agent loads it, designs to the brand rules, renders a PNG with the bundled script and checks its own output.")}</p>}
      >
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {[
            { href: "/downloads/rustfs-brand.skill", name: "rustfs-brand.skill", zh: "Claude.ai：在「设置 → 功能 → Skills」上传", en: "Claude.ai: upload under Settings → Capabilities → Skills" },
            { href: "/downloads/rustfs-brand-skill.zip", name: "rustfs-brand-skill.zip", zh: "同一内容的 zip 包，供其它 agent 使用", en: "The same package as a zip for other agents" },
            { href: "/skills/rustfs-brand/SKILL.md", name: "SKILL.md", zh: "在线查看 Skill 主文件", en: "View the skill entry file" },
          ].map((d) => (
            <a key={d.href} href={d.href} className="group grid content-start gap-2 bg-background p-5 transition-colors hover:bg-surface">
              <span className="flex items-center justify-between font-mono text-sm">
                {d.name}
                <Icon name="download" className="size-4 text-faint transition-colors group-hover:text-brand" />
              </span>
              <span className="text-sm leading-relaxed text-subtle">{t(d.zh, d.en)}</span>
            </a>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock title={t("安装到 Claude Code", "Install in Claude Code")} lang="bash" code={`# personal, all projects\nunzip rustfs-brand.skill -d ~/.claude/skills/\n\n# one project, shared with the team\nunzip rustfs-brand.skill -d .claude/skills/`} />
          <CodeBlock
            title={t("目录结构", "Structure")}
            lang="text"
            code={`rustfs-brand/\n  SKILL.md                 workflow and key rules\n  references/\n    DESIGN.md              tokens and full rules\n    formats.md             sizes and layout recipes per channel\n    copy.md                voice, terminology, approved lines, facts\n    graphics.md            logo, stripe, shard matrix, icons, charts\n  assets/\n    artboard.html          single-file starter for static graphics\n    tailwind.css           Tailwind v4 tokens\n    tokens.css             CSS variables\n    logo/*.svg             wordmark, symbol, app icon\n  scripts/\n    render.mjs             HTML → PNG with headless Chrome\n    matrix.mjs             shard-matrix SVG generator`}
          />
        </div>
        <Table
          head={[t("示例请求", "Example request"), t("Skill 的处理方式", "What the skill does")]}
          rows={[
            [t("「给 1.0.2 发布做一张公众号头图和分享图」", "“Make a WeChat cover and share image for the 1.0.2 release”"), t("取 900×383 与 600×600 规格，按版本号构图，中文排版，渲染两张 PNG 并检查。", "Uses the 900×383 and 600×600 specs, builds a version-led layout in Chinese, renders both PNGs and checks them.")],
            ["“Design a 1080×1080 post announcing S3 Tables preview”", t("标注 Preview，Oxide 只用于预览标记，附来源与日期，导出 PNG。", "Labels it Preview, uses Oxide only for the preview marker, adds source and date, exports PNG.")],
            [t("「把控制台的按钮和卡片改成品牌规范」", "“Bring the Console buttons and cards in line with the brand”"), t("引入 tailwind.css，替换语义变量，去除圆角与投影，按组件规范调整交互。", "Imports tailwind.css, swaps the semantic variables, removes radii and shadows, and applies the component interaction rules.")],
            ["“A slide comparing RustFS throughput before and after the release”", t("按比例绘制柱状图，RustFS 为蓝色，注明环境与日期；没有实测数据时标注示例数据。", "Draws bars to scale with RustFS in blue and the environment and date stated; marks sample data if no measurement is provided.")],
          ]}
        />
        <CodeBlock title="SKILL.md" lang="markdown" code={skill} maxHeight={420} />
        <Note>{t("Skill 与 DESIGN.md 随本指南同步发布。规范更新后，请重新下载并替换本地副本。", "The skill and DESIGN.md are published together with these guidelines. When the guidelines change, download them again and replace local copies.")}</Note>
      </Section>

      <PageFooter slug="agents" />
    </Page>
  )
}
