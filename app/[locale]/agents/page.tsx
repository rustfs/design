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
        lede={t("供 AI agent 使用的设计规范与技能。", "The design spec and skill for AI agents.")}
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
            <p>{t("Google design.md 格式：YAML 令牌加规则正文。", "Google’s design.md format: YAML tokens plus rules.")}</p>
          </>
        }
      >
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            ["01", t("放入项目", "Add to the project"), t("放在仓库根目录。", "Put it at the repository root.")],
            ["02", t("在说明中引用", "Reference it"), t("在 AGENTS.md 中引用。", "Reference it from AGENTS.md.")],
            ["03", t("校验与导出", "Validate and export"), t("用 CLI 校验或导出。", "Lint or export with the CLI.")],
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
            <span className="text-sm leading-relaxed text-subtle">{t("下载当前版本", "Download the current version")}</span>
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
        lede={<p>{t("制作 RustFS 品牌物料时自动加载，按规范出图并自检。", "Loads for any RustFS-branded work, designs to the rules and checks its output.")}</p>}
      >
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
          {[
            { href: "/downloads/rustfs-brand.skill", name: "rustfs-brand.skill", zh: "上传到 Claude.ai", en: "Upload to Claude.ai" },
            { href: "/downloads/rustfs-brand-skill.zip", name: "rustfs-brand-skill.zip", zh: "其它 agent 使用", en: "For other agents" },
            { href: "/skills/rustfs-brand/SKILL.md", name: "SKILL.md", zh: "在线查看", en: "View online" },
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
            [t("「给 1.0.2 发布做一张公众号头图和分享图」", "“Make a WeChat cover and share image for the 1.0.2 release”"), t("按规格出两张 PNG", "Two PNGs at spec")],
            ["“Design a 1080×1080 post announcing S3 Tables preview”", t("标注 Preview 并注明来源", "Labels Preview, cites the source")],
            [t("「把控制台的按钮和卡片改成品牌规范」", "“Bring the Console buttons and cards in line with the brand”"), t("引入 tailwind.css，去圆角与投影", "Imports tailwind.css, drops radii and shadows")],
            ["“A slide comparing RustFS throughput before and after the release”", t("按比例绘制，标注示例数据", "To scale, sample data labelled")],
          ]}
        />
        <CodeBlock title="SKILL.md" lang="markdown" code={skill} maxHeight={420} />
        <Note>{t("规范更新后请重新下载。", "Download again when the guidelines change.")}</Note>
      </Section>

      <PageFooter slug="agents" />
    </Page>
  )
}
