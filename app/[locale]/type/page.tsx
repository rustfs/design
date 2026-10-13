import type { Metadata } from "next"
import { DoDont, Note, Page, PageFooter, PageHeader, Section, Sub, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { typography } from "@/lib/tokens"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "字体" : "Typography" }
}

const FAMILY: Record<string, string> = { display: "var(--font-display)", sans: "var(--font-sans)", mono: "var(--font-mono)" }

export default async function TypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)
  const zh = locale === "zh"

  const sample: Record<string, string> = {
    "display-2xl": "1.0.1",
    "display-xl": zh ? "每一个字节" : "Every byte",
    "display-lg": zh ? "丢盘，不丢数据" : "Lose drives. Keep data.",
    "display-md": zh ? "兼容 S3 的对象存储" : "S3-compatible object storage",
    "headline-lg": zh ? "纠删码如何保证数据完整" : "How erasure coding keeps data whole",
    "headline-md": zh ? "按池扩展，不停机" : "Grow by pools without downtime",
    "headline-sm": zh ? "配置站点复制" : "Configure site replication",
    title: zh ? "存储桶生命周期规则" : "Bucket lifecycle rules",
    "body-lg": zh ? "每个对象被切分为数据块与校验块，分散写入纠删集中的每块盘。" : "Each object is split into data and parity shards spread across every drive in an erasure set.",
    "body-md": zh ? "任意两块盘离线时，EC 4+2 配置下的数据仍可读取，并在盘恢复后自动修复。" : "With EC 4+2, data stays readable with any two drives offline and heals once they return.",
    "body-sm": zh ? "位腐烂保护会在读取时校验每个数据块。" : "Bitrot protection verifies every shard on read.",
    caption: zh ? "数据来源：RustFS 官方网站。统计日期：2026-10-14。" : "Source: the official RustFS website. As of 2026-10-14.",
    "label-md": "Release · 2026-10",
    "label-sm": "EC 4+2 · 6 drives",
    code: "docker run -d -p 9000:9000 rustfs/rustfs:latest",
    numeral: "15,154,618",
  }

  const use: Record<string, [string, string]> = {
    "display-2xl": ["版本号、海报主数字", "Version numbers, poster figures"],
    "display-xl": ["首屏与海报标题", "Hero and poster headlines"],
    "display-lg": ["页面主标题", "Page titles"],
    "display-md": ["分区大标题", "Large section titles"],
    "headline-lg": ["章节标题", "Chapter headings"],
    "headline-md": ["小节标题", "Section headings"],
    "headline-sm": ["卡片与模块标题", "Card and module titles"],
    title: ["列表与表单标题", "List and form titles"],
    "body-lg": ["导语", "Lead paragraphs"],
    "body-md": ["正文", "Body text"],
    "body-sm": ["辅助说明、表格", "Supporting text, tables"],
    caption: ["注释、来源", "Captions, sources"],
    "label-md": ["栏目标签、眉题", "Category labels, eyebrows"],
    "label-sm": ["数据标注", "Data annotations"],
    code: ["代码与命令", "Code and commands"],
    numeral: ["指标数字", "Metric figures"],
  }

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/type/"
        label="Guidelines · Typography"
        title={t("字体", "Typography")}
        subtitle={t("Typography", "字体")}
        lede={t(
          "RustFS 使用三款开源字体：Archivo 加宽体承担展示文字，延续字标的宽体粗黑结构；Geist 承担正文与界面；Geist Mono 承担标签、数据与代码。中文使用 HarmonyOS Sans SC 或思源黑体。",
          "RustFS uses three open-source typefaces. Archivo at expanded widths carries display type and echoes the wide, heavy build of the wordmark; Geist carries text and interfaces; Geist Mono carries labels, data and code. Chinese is set in HarmonyOS Sans SC or Source Han Sans SC.",
        )}
        meta={[
          { k: t("展示", "Display"), v: "Archivo 112–125%" },
          { k: t("正文", "Text"), v: "Geist" },
          { k: t("数据", "Data"), v: "Geist Mono" },
          { k: t("中文", "Chinese"), v: "HarmonyOS Sans SC" },
        ]}
      />

      <Section id="families" tag="Typefaces" title={t("字体家族", "Typefaces")} lede={<p>{t("所有字体均可免费商用。网站通过 next/font 自托管，设计软件中须安装同名字体。", "Every typeface is free for commercial use. Websites self-host them with next/font; design tools must have the same fonts installed.")}</p>}>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          <Specimen
            name="Archivo"
            role={t("展示 · 标题 · 数字", "Display · headlines · figures")}
            meta={[t("宽度 112% / 125%", "Width 112% / 125%"), t("字重 700 / 750 / 800", "Weights 700 / 750 / 800"), "SIL OFL 1.1"]}
            glyph={<span className="font-display font-extrabold [font-stretch:125%]">Aa</span>}
            line={<span className="font-display font-extrabold tracking-[-0.02em] [font-stretch:125%]">RUSTFS 1.0.1</span>}
            chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789"
            charsClass="font-display font-bold [font-stretch:112%]"
          />
          <Specimen
            name="Geist"
            role={t("正文 · 界面", "Text · interface")}
            meta={[t("字重 400 / 500 / 600", "Weights 400 / 500 / 600"), "SIL OFL 1.1"]}
            glyph={<span className="font-sans font-medium">Aa</span>}
            line={<span className="font-sans font-medium tracking-[-0.01em]">Object storage, accounted for</span>}
            chars="abcdefghijklmnopqrstuvwxyz 0123456789 (.,:;!?)"
            charsClass="font-sans"
          />
          <Specimen
            name="Geist Mono"
            role={t("标签 · 数据 · 代码", "Labels · data · code")}
            meta={[t("字重 400 / 500", "Weights 400 / 500"), "SIL OFL 1.1"]}
            glyph={<span className="font-mono">Aa</span>}
            line={<span className="font-mono text-[0.8em]">s3://my-bucket/hello.txt</span>}
            chars="0123456789 {}[]()<>=/:._- MiB GiB"
            charsClass="font-mono"
          />
          <Specimen
            name="HarmonyOS Sans SC"
            role={t("中文 · 标题与正文", "Chinese · headlines and text")}
            meta={[t("替代：思源黑体 Source Han Sans SC", "Alternative: Source Han Sans SC"), t("网页回退：PingFang SC / Microsoft YaHei", "Web fallback: PingFang SC / Microsoft YaHei")]}
            glyph={<span className="font-display font-extrabold">字</span>}
            line={<span className="font-display font-extrabold">每一个字节，都有着落。</span>}
            chars="对象存储 纠删码 校验块 存储桶 修复 复制 生命周期"
            charsClass="font-sans"
          />
        </div>
      </Section>

      <Section id="width" tag="Width" title={t("宽度轴", "The width axis")} lede={<p>{t("Archivo 是可变字体，宽度轴取值 62–125%。品牌只使用两档：展示文字 125%，标题 112%。宽度越大，字号越少，单行字数越少。", "Archivo is a variable font with a width axis from 62% to 125%. The brand uses two settings: 125% for display and 112% for headlines. The wider the setting, the fewer words per line.")}</p>}>
        <div className="grid border-t border-foreground">
          {[
            { w: "100%", zh: "不使用：失去与字标的呼应", en: "Not used: loses the link to the wordmark", muted: true },
            { w: "112%", zh: "标题：章节、卡片、长标题", en: "Headlines: chapters, cards, long titles" },
            { w: "125%", zh: "展示：首屏、海报、版本号、指标", en: "Display: heroes, posters, versions, metrics" },
          ].map((r) => (
            <div key={r.w} className="grid items-baseline gap-x-8 gap-y-2 border-b border-border py-6 md:grid-cols-[120px_1fr_280px]">
              <span className="font-mono text-xs text-muted-foreground">wdth {r.w}</span>
              <span className={cn("truncate font-display text-[clamp(36px,6vw,80px)] leading-none font-extrabold tracking-[-0.02em]", r.muted && "text-faint")} style={{ fontStretch: r.w }}>
                Every byte
              </span>
              <span className="text-sm text-subtle">{t(r.zh, r.en)}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="scale" tag="Type scale" title={t("字号阶梯", "Type scale")} lede={<p>{t("16 个文字样式覆盖网站、文档与营销物料。每个样式在 Tailwind 中对应一个 type-* 工具类，例如 type-display-xl。移动端展示字号按比例缩小，行高与字距保持不变。", "Sixteen styles cover the websites, documentation and marketing. Each maps to a type-* utility in Tailwind, such as type-display-xl. On small screens display sizes scale down; line height and tracking stay the same.")}</p>}>
        <div className="grid border-t border-foreground">
          {typography.map((s) => (
            <div key={s.name} className="grid min-w-0 items-baseline gap-x-8 gap-y-3 border-b border-border py-6 lg:grid-cols-[200px_minmax(0,1fr)]">
              <div className="grid gap-1 font-mono text-xs leading-relaxed">
                <span className="text-foreground">type-{s.name}</span>
                <span className="text-muted-foreground">
                  {s.fontSize} / {s.lineHeight} · {s.fontWeight}
                  {"fontStretch" in s ? ` · ${s.fontStretch}` : ""}
                  {s.letterSpacing !== "0em" ? ` · ${s.letterSpacing}` : ""}
                </span>
                <span className="font-sans text-faint">{t(use[s.name][0], use[s.name][1])}</span>
              </div>
              <div
                className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  fontFamily: FAMILY[s.fontFamily],
                  fontSize: parseInt(s.fontSize) > 40 ? `min(${s.fontSize}, 9vw)` : s.fontSize,
                  lineHeight: s.lineHeight,
                  letterSpacing: zh && s.fontFamily === "display" ? 0 : s.letterSpacing,
                  fontWeight: s.fontWeight,
                  fontStretch: "fontStretch" in s ? s.fontStretch : undefined,
                  textTransform: "textTransform" in s ? (s.textTransform as "uppercase") : undefined,
                  fontVariantNumeric: s.name === "numeral" ? "tabular-nums" : undefined,
                }}
              >
                {sample[s.name]}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="chinese" tag="Chinese & mixed text" title={t("中文与中英混排", "Chinese and mixed text")} lede={<p>{t("中文与拉丁字母混排时，两种文字须在字重、字号与基线上协调。以下规则适用于所有中文与双语物料。", "When Chinese and Latin text are set together they must agree in weight, size and baseline. These rules apply to all Chinese and bilingual materials.")}</p>}>
        <Table
          head={[t("项目", "Item"), t("规则", "Rule"), t("示例", "Example")]}
          rows={[
            [t("空格", "Spacing"), t("中文与英文、数字之间加一个半角空格；中文与标点之间不加空格。", "Put a half-width space between Chinese and Latin letters or numbers; none next to punctuation."), "RustFS 1.0 正式发布"],
            [t("标点", "Punctuation"), t("中文使用全角标点；引号使用直角引号「」，嵌套使用『』。", "Chinese uses full-width punctuation; quotes are corner brackets 「」, nested 『』."), "「流向 S」符号"],
            [t("字距", "Tracking"), t("中文标题字距为 0，不使用负字距；正文不调整字距。", "Chinese headlines use zero tracking, never negative; body text is never tracked."), "每一个字节，都有着落。"],
            [t("行高", "Line height"), t("中文展示文字行高不小于 1.15，正文行高 1.7–1.8。", "Chinese display lines are at least 1.15; body text 1.7–1.8."), "—"],
            [t("字重", "Weight"), t("中文标题使用 Bold 或 Heavy；不使用浏览器合成的加粗与斜体。", "Chinese headlines use Bold or Heavy; never synthesised bold or italic."), "—"],
            [t("数字", "Numerals"), t("数字一律使用阿拉伯数字与拉丁字体；版本号、容量与日期不转为中文。", "Numbers always use Arabic numerals in the Latin face; versions, sizes and dates are never written in Chinese."), "15.15M · 2026-10-14"],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="white" bodyClassName="place-items-start content-center" caption={t("中英之间有空格，标题字距为 0。", "A space between scripts, zero tracking on the headline.")}>
            <span className="font-display text-[clamp(22px,2.6vw,32px)] leading-tight font-extrabold text-neutral-950">RustFS 1.0 正式发布</span>
          </DoDont>
          <DoDont kind="dont" on="white" bodyClassName="place-items-start content-center" caption={t("缺少空格、负字距、合成斜体。", "Missing spaces, negative tracking, synthetic italics.")}>
            <span className="font-display text-[clamp(22px,2.6vw,32px)] leading-tight font-extrabold tracking-[-0.08em] text-neutral-950 italic">RustFS1.0正式发布</span>
          </DoDont>
        </div>
      </Section>

      <Section id="numbers" tag="Numbers & units" title={t("数字与单位", "Numbers and units")} lede={<p>{t("数字是 RustFS 最重要的证据。数字的写法须统一、可比较，并在数据列中使用等宽数字。", "Numbers are RustFS's most important evidence. Write them consistently and comparably, and use tabular figures in data columns.")}</p>}>
        <Table
          mono={[1]}
          head={[t("类型", "Type"), t("写法", "Format"), t("说明", "Notes")]}
          rows={[
            [t("大数", "Large numbers"), "34,869 · 2.7M+ · 15.15M", t("英文使用千位逗号与 K / M / B；中文可写作「270 万+」，同一物料内保持一种写法。", "Use thousands separators and K / M / B; Chinese may write 270 万+. Keep one style per piece.")],
            [t("日期", "Dates"), "2026-10-14", t("统一使用 ISO 8601；英文长文可写作 October 14, 2026。", "Use ISO 8601; long-form English may write October 14, 2026.")],
            [t("版本", "Versions"), "1.0.1 · 1.0.0 GA", t("不加 v 前缀；预发布写作 1.1.0-rc.1。", "No v prefix; pre-releases read 1.1.0-rc.1.")],
            [t("容量", "Capacity"), "64 MiB · 40 GiB · 1.2 PB", t("二进制容量使用 KiB / MiB / GiB；硬件标称容量沿用 GB / TB。", "Binary sizes use KiB / MiB / GiB; vendor drive capacities keep GB / TB.")],
            [t("纠删码", "Erasure coding"), "EC 4+2 · EC 12+4", t("数据块在前、校验块在后，加号两侧无空格。", "Data shards first, parity second, no spaces around the plus.")],
            [t("速率", "Throughput"), "15 Gbps · 1.8 GiB/s", t("网络用 bit，存储吞吐用 byte；数值与单位间加空格。", "Bits for networks, bytes for storage throughput; a space before the unit.")],
          ]}
        />
      </Section>

      <Section id="hierarchy" tag="Hierarchy" title={t("层级示范", "Hierarchy in practice")} lede={<p>{t("一个版块通常只用四级：等宽眉题、展示标题、正文与数据。层级靠字号、宽度与颜色区分，不靠下划线、加框或颜色堆叠。", "A block normally uses four levels: a mono eyebrow, a display headline, body text and data. Levels differ in size, width and colour, never through underlines, boxes or stacked colours.")}</p>}>
        <div className="grid gap-10 border border-border p-[clamp(24px,5vw,64px)] md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="grid content-start gap-5">
            <span className="type-label-md text-muted-foreground">Engineering · 12 min</span>
            <h3 className="font-display text-[clamp(32px,4.4vw,56px)] leading-[1.02] font-extrabold tracking-[-0.02em] [font-stretch:125%]">{t<React.ReactNode>(<>坏了两块盘，<br />数据为什么还在</>, "Two drives down. Why is the data still here?")}</h3>
            <p className="max-w-[56ch] text-lg leading-[1.7] text-subtle">{t("RustFS 将每个对象切分为 4 个数据块与 2 个校验块，分别写入 6 块盘。读取时只需任意 4 块，缺失的部分在后台由校验块重建。", "RustFS splits each object into four data shards and two parity shards across six drives. Any four are enough to read; the missing pieces are rebuilt from parity in the background.")}</p>
          </div>
          <dl className="m-0 grid content-end gap-0 border-t border-foreground">
            {[
              ["EC 4+2", t("配置", "Layout")],
              ["2", t("可容忍的盘故障", "Drive failures tolerated")],
              ["1.5×", t("存储开销", "Storage overhead")],
            ].map(([v, k]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border py-4">
                <dt className="type-label-sm text-muted-foreground">{k}</dt>
                <dd className="m-0 font-display text-3xl font-extrabold tracking-[-0.02em] num [font-stretch:125%]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="setup" tag="Setup" title={t("安装与回退", "Installation and fallbacks")}>
        <Sub title={t("字体栈", "Font stacks")}>
          <Table
            mono={[1]}
            head={[t("角色", "Role"), "font-family", t("说明", "Notes")]}
            rows={[
              [t("展示", "Display"), `"Archivo", "HarmonyOS Sans SC", "Source Han Sans SC", "PingFang SC", sans-serif`, t("同时设置 font-stretch: 125% 或 112%", "Also set font-stretch: 125% or 112%")],
              [t("正文", "Text"), `"Geist", "HarmonyOS Sans SC", "Source Han Sans SC", "PingFang SC", system-ui, sans-serif`, t("中文字符自动回退到中文字体", "Chinese characters fall back to the Chinese face")],
              [t("等宽", "Mono"), `"Geist Mono", "SF Mono", ui-monospace, Menlo, monospace`, t("标签使用大写与 0.08em 字距", "Labels use caps with 0.08em tracking")],
            ]}
          />
        </Sub>
        <Note>{t("无法安装品牌字体的场合（如第三方平台的纯文本编辑器），英文使用系统无衬线字体，中文使用系统黑体。不得以衬线体、手写体或其它展示字体替代 Archivo。", "Where brand fonts cannot be installed, such as plain-text editors on third-party platforms, use the system sans serif for English and the system Hei face for Chinese. Never replace Archivo with a serif, script or other display face.")}</Note>
        <Note tone="parity">{t("导出中文物料前，请在本机安装 HarmonyOS Sans SC 或思源黑体。未安装时中文标题会回退到系统字体，苹方最高只有 Semibold，字重明显偏轻。", "Install HarmonyOS Sans SC or Source Han Sans SC before exporting Chinese materials. Without them, Chinese headings fall back to the system face, and PingFang SC stops at Semibold, which reads noticeably lighter.")}</Note>
      </Section>

      <PageFooter slug="type" />
    </Page>
  )
}

function Specimen({ name, role, meta, glyph, line, chars, charsClass }: { name: string; role: React.ReactNode; meta: React.ReactNode[]; glyph: React.ReactNode; line: React.ReactNode; chars: string; charsClass: string }) {
  return (
    <div className="grid min-w-0 gap-6 bg-background p-[clamp(20px,3vw,36px)]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid gap-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <span className="font-mono text-xs text-muted-foreground">{role}</span>
        </div>
        <ul className="m-0 grid list-none justify-items-end gap-0.5 p-0 text-right font-mono text-[11px] text-faint">
          {meta.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
      <div className="text-[clamp(96px,12vw,168px)] leading-[0.9] text-brand">{glyph}</div>
      <div className="truncate text-[clamp(22px,2.6vw,34px)] leading-tight">{line}</div>
      <p className={cn("text-sm leading-relaxed break-words text-subtle", charsClass)}>{chars}</p>
    </div>
  )
}
