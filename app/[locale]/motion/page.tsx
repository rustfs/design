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
        lede={t(
          "RustFS 的动效像数据写入磁盘：按顺序、可预期、在确定的时间内完成。动效用来说明状态的变化，而不是装饰。",
          "RustFS motion behaves like data being written to disk: in order, predictable and finished in a known time. Motion explains a change of state; it never decorates.",
        )}
        meta={[
          { k: t("缓动", "Easing"), v: "standard · emphasized · exit" },
          { k: t("时长", "Durations"), v: "80–720 ms" },
          { k: t("品牌动作", "Brand moves"), v: t("写入 · 修复", "Write · Heal") },
        ]}
      />

      <Section id="principles" tag="Principles" title={t("动效原则", "Principles")}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t("写入，而非漂浮", "Write, don't float"), t("元素按条带顺序逐块出现，从左到右、从上到下。不使用漂浮、视差与随机飞入。", "Elements appear block by block in stripe order, left to right and top to bottom. No floating, parallax or random fly-ins.")],
            [t("修复，而非隐藏", "Heal, don't hide"), t("状态变化要被看见：缺失、校验、重建三个阶段清楚可辨。不用闪烁或抖动掩盖错误。", "State changes are made visible: missing, parity, rebuilt. Errors are never masked by flashing or shaking.")],
            [t("精确，不回弹", "Exact, never elastic"), t("只使用三条标准缓动与五档时长。不使用弹簧、回弹与过冲。", "Only the three standard easings and five durations. No springs, bounces or overshoot.")],
            [t("可以关闭", "Can be turned off"), t("尊重系统的「减少动态效果」设置：动画直接显示最终状态，信息不丢失。", "Respect the system's reduce-motion setting: show the final state immediately, with no information lost.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid content-start gap-2 bg-background p-5">
              <h3 className="text-base font-semibold">{k}</h3>
              <p className="text-sm leading-relaxed text-subtle">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="easing" tag="Easing" title={t("缓动曲线", "Easing")} lede={<p>{t("standard 用于大多数状态变化；emphasized 用于进入画面与修复完成；exit 用于离开画面。linear 只用于进度与循环。", "Use standard for most state changes, emphasized for entrances and the end of a heal, and exit for elements leaving. Linear is reserved for progress and loops.")}</p>}>
        <EasingDemo />
      </Section>

      <Section id="duration" tag="Duration" title={t("时长", "Duration")} lede={<p>{t("距离越短、元素越小，时长越短。界面交互不超过 420ms；720ms 只用于品牌动作与视频场景。", "Shorter distances and smaller elements get shorter durations. Interface transitions stay at or under 420ms; 720ms is reserved for brand moves and video scenes.")}</p>}>
        <DurationDemo />
      </Section>

      <Section id="moves" tag="Brand moves" title={t("品牌动作", "Brand moves")} lede={<p>{t("品牌只有两个标志性动作，均来自 RustFS 的实际行为：写入与修复。它们用于 Logo 片头、加载、发布与状态恢复。", "The brand has two signature moves, both taken from what RustFS actually does: write and heal. They are used in the logo sting, loading, releases and recovered states.")}</p>}>
        <div className="grid gap-4 md:grid-cols-2">
          <WriteDemo />
          <HealDemo />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <CardLink href={href(locale, "video")} k="video/" title={t("Logo 片头", "Logo sting")} icon="play">{t("写入与修复在视频片头中的完整时间轴。", "The full timeline of write and heal in the video opener.")}</CardLink>
          <CardLink href={href(locale, "graphics")} k="graphics/" title={t("分片矩阵", "Shard matrix")}>{t("矩阵在首屏中以写入出现、以修复循环。", "Matrices enter with write and loop with heal on hero sections.")}</CardLink>
        </div>
      </Section>

      <Section id="micro" tag="Micro-interactions" title={t("微交互", "Micro-interactions")} lede={<p>{t("微交互确认操作已被接收。它们细小、迅速，并且在所有组件中保持一致。", "Micro-interactions confirm that an action was received. They are small, quick and identical across components.")}</p>}>
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

      <Section id="code" tag="Implementation" title={t("实现", "Implementation")} lede={<p>{t("动效 token 由 tokens/tailwind.css 提供。Tailwind 中使用 ease-standard、ease-emphasized 与 duration-(--duration-base) 等写法。", "Motion tokens ship in tokens/tailwind.css. In Tailwind, write ease-standard, ease-emphasized and duration-(--duration-base).")}</p>}>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock title="CSS" lang="css" code={`:root {\n  --ease-standard: cubic-bezier(0.2, 0, 0, 1);\n  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);\n  --ease-exit: cubic-bezier(0.4, 0, 1, 1);\n  --duration-fast: 150ms;\n  --duration-base: 240ms;\n  --duration-slow: 420ms;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}`} />
          <CodeBlock title="Tailwind" lang="html" code={`<button class="transition-transform duration-(--duration-fast) ease-standard hover:-translate-y-px active:scale-[.985]">\n  Download RustFS\n</button>\n\n<a class="group ... transition-colors duration-(--duration-base) ease-standard hover:border-foreground">\n  <svg class="transition-transform ease-emphasized group-hover:translate-x-0.5" />\n</a>`} />
        </div>
        <Note>{t("任何动画都须在 prefers-reduced-motion: reduce 下直接显示最终状态；闪烁频率不得超过每秒 3 次。", "Every animation must jump to its final state under prefers-reduced-motion: reduce, and nothing may flash more than three times per second.")}</Note>
      </Section>

      <PageFooter slug="motion" />
    </Page>
  )
}
