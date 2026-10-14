import type { Metadata } from "next"
import { CodeBlock } from "@/components/site/code-block"
import { DurationDemo, EasingDemo, HealDemo, MicroDemos, WriteDemo } from "@/components/site/motion-demos"
import { CardLink, Note, Page, PageFooter, PageHeader, Section, Table } from "@/components/site/page"
import { href, isLocale, setLocale, t, type Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "动效" : "Motion" }
}

export default async function MotionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/motion/"
        label="Guidelines · Motion"
        title={t("动效", "Motion")}
        subtitle={t("Motion", "动效")}
        lede={t("按顺序、可预期、在确定时间内完成；动效只说明状态变化。", "In order, predictable and finished on time; motion only explains change.")}
        meta={[
          { k: t("缓动", "Easing"), v: "standard · emphasized · exit" },
          { k: t("时长", "Durations"), v: "80–720 ms" },
          { k: t("品牌动作", "Brand moves"), v: t("写入 · 修复", "Write · Heal") },
        ]}
      />

      <Section id="principles" tag="Principles" title={t("动效原则", "Principles")}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t("写入，而非漂浮", "Write, don't float"), t("逐块出现，不漂浮、不视差。", "Step in block by block; no floating or parallax.")],
            [t("修复，而非隐藏", "Heal, don't hide"), t("缺失、校验、重建清楚可辨。", "Missing, parity, rebuilt — all visible.")],
            [t("精确，不回弹", "Exact, never elastic"), t("只用标准缓动，不回弹。", "Standard easings only; never bounce.")],
            [t("可以关闭", "Can be turned off"), t("减弱动效时直接显示最终状态。", "Under reduced motion, show the final state.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid content-start gap-2 bg-background p-5">
              <h3 className="text-base font-semibold">{k}</h3>
              <p className="text-sm leading-relaxed text-subtle">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="easing" tag="Easing" title={t("缓动曲线", "Easing")} lede={<p>{t("standard 用于多数变化，emphasized 用于进入，exit 用于离开。", "standard for most changes, emphasized to enter, exit to leave.")}</p>}>
        <EasingDemo />
      </Section>

      <Section id="duration" tag="Duration" title={t("时长", "Duration")} lede={<p>{t("界面交互 ≤ 420ms；720ms 只用于品牌动作。", "Interface ≤ 420ms; 720ms for brand moves only.")}</p>}>
        <DurationDemo />
      </Section>

      <Section id="moves" tag="Brand moves" title={t("品牌动作", "Brand moves")} lede={<p>{t("写入与修复，来自 RustFS 的实际行为。", "Write and heal, taken from what RustFS does.")}</p>}>
        <div className="grid gap-4 md:grid-cols-2">
          <WriteDemo />
          <HealDemo />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <CardLink href={href(locale, "video")} k="video/" title={t("Logo 片头", "Logo sting")} icon="play">{t("完整时间轴见视频页。", "Full timeline on the Video page.")}</CardLink>
          <CardLink href={href(locale, "graphics")} k="graphics/" title={t("分片矩阵", "Shard matrix")}>{t("首屏矩阵以写入出现、以修复循环。", "Hero matrices write in and heal in a loop.")}</CardLink>
        </div>
      </Section>

      <Section id="micro" tag="Micro-interactions" title={t("微交互", "Micro-interactions")} lede={<p>{t("细小、迅速、处处一致。", "Small, quick and consistent.")}</p>}>
        <MicroDemos />
        <Table
          mono={[2, 3]}
          head={[t("交互", "Interaction"), t("变化", "Change"), t("时长", "Duration"), t("缓动", "Easing")]}
          rows={[
            [t("按钮悬停", "Button hover"), t("上移 1px；光带扫过", "Lift 1px; sheen sweep"), "150 / 420 ms", "standard / emphasized"],
            [t("按钮按下", "Button press"), t("回到原位并缩小至 98.5%", "Return and scale to 98.5%"), "80 ms", "standard"],
            [t("卡片悬停", "Card hover"), t("边框变为前景色；箭头移动 2px", "Border to foreground; arrow 2px"), "240 ms", "standard / emphasized"],
            [t("复制", "Copy"), t("底部提示「已复制」", "Toast: “Copied”"), "240 ms", "emphasized"],
            [t("展开与收起", "Expand and collapse"), t("高度与透明度同时变化", "Height and opacity together"), "240 ms", "standard / exit"],
            [t("加载", "Loading"), t("分片按条带写入循环", "Shards write in a loop"), "60 ms / shard", "steps(2)"],
          ]}
        />
      </Section>

      <Section id="code" tag="Implementation" title={t("实现", "Implementation")} lede={<p>{t("令牌见 tokens/tailwind.css。", "Tokens ship in tokens/tailwind.css.")}</p>}>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock title="CSS" lang="css" code={`:root {\n  --ease-standard: cubic-bezier(0.2, 0, 0, 1);\n  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);\n  --ease-exit: cubic-bezier(0.4, 0, 1, 1);\n  --duration-fast: 150ms;\n  --duration-base: 240ms;\n  --duration-slow: 420ms;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}`} />
          <CodeBlock title="Tailwind" lang="html" code={`<button class="transition-transform duration-(--duration-fast) ease-standard hover:-translate-y-px active:scale-[.985]">\n  Download RustFS\n</button>\n\n<a class="group ... transition-colors duration-(--duration-base) ease-standard hover:border-foreground">\n  <svg class="transition-transform ease-emphasized group-hover:translate-x-0.5" />\n</a>`} />
        </div>
        <Note>{t("须支持 prefers-reduced-motion；闪烁不超过每秒 3 次。", "Honour prefers-reduced-motion; never flash over 3 Hz.")}</Note>
      </Section>

      <PageFooter slug="motion" />
    </Page>
  )
}
