import type { Metadata } from "next"
import { DoDont, Note, Page, PageFooter, PageHeader, Section, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "语言与文案" : "Voice" }
}

export default async function VoicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/voice/"
        label="Guidelines · Voice"
        title={t("语言与文案", "Voice")}
        subtitle={t("Voice", "语言与文案")}
        lede={t(
          "RustFS 像一位资深的存储工程师那样说话：先给结论，再给依据；用事实代替形容词；承认边界，也说明下一步。",
          "RustFS speaks like a senior storage engineer: the conclusion first, then the evidence; facts instead of adjectives; limits stated plainly, along with what comes next.",
        )}
        meta={[
          { k: t("人称", "Person"), v: t("你 / 我们", "you / we") },
          { k: t("语言", "Languages"), v: "中文 · English" },
          { k: t("标准", "Standard"), v: t("可验证", "Verifiable") },
        ]}
      />

      <Section id="voice" tag="Voice" title={t("品牌口吻", "How RustFS sounds")} lede={<p>{t("四个品牌性格落到文字上，对应以下写法。", "The four brand traits translate into these writing habits.")}</p>}>
        <Table
          head={[t("特质", "Trait"), t("写法", "Habit"), t("推荐", "Write"), t("避免", "Avoid")]}
          rows={[
            [t("精确", "Exact"), t("给出数字、单位、条件与日期。", "Give the number, unit, condition and date."), t("EC 4+2 配置下，任意两块盘离线时数据仍可读取。", "With EC 4+2, data stays readable with any two drives offline."), t("极致可靠，永不丢数据。", "Ultra-reliable. Never lose data.")],
            [t("坦诚", "Candid"), t("标明预览状态与限制。", "Label previews and limits."), t("S3 Tables 目前为预览功能。", "S3 Tables is in preview."), t("全面支持所有表格式。", "Full support for every table format.")],
            [t("工程化", "Engineered"), t("先结论，后原因，再步骤。", "Conclusion, then cause, then steps."), t("上传失败：存储桶已达配额。请提高配额或删除旧版本。", "Upload failed: the bucket has reached its quota. Raise the quota or delete old versions.")],
            [t("开放", "Open"), t("平视读者，欢迎参与。", "Speak as a peer and invite participation."), t("欢迎在 GitHub 提交 issue 与 PR。", "Issues and pull requests are welcome on GitHub."), t("用户必须严格遵守……", "Users are strictly required to…")],
          ].map((r) => (r.length === 3 ? [...r.slice(0, 3), "—"] : r))}
        />
      </Section>

      <Section id="tone" tag="Tone by context" title={t("不同场景的语气", "Tone by context")} lede={<p>{t("口吻不变，语气随场景调整。", "The voice stays constant; the tone shifts with the context.")}</p>}>
        <Table
          head={[t("场景", "Context"), t("语气", "Tone"), t("要点", "Key points")]}
          rows={[
            [t("文档", "Documentation"), t("中性、直接", "Neutral, direct"), t("第二人称「你」；每一步可执行；不写营销语句。", "Second person; every step is actionable; no marketing language.")],
            [t("官网与广告", "Website and ads"), t("自信、克制", "Confident, restrained"), t("一个画面一个信息；需要条件的说法必须带脚注。", "One message per surface; any conditional claim carries a footnote.")],
            [t("发布说明", "Release notes"), t("清楚、完整", "Clear, complete"), t("按「新增、改进、修复、破坏性变更」分组；破坏性变更放在最前。", "Group as added, improved, fixed and breaking; breaking changes first.")],
            [t("安全公告", "Security advisories"), t("冷静、准确", "Calm, precise"), t("编号、影响范围、严重程度、修复版本、缓解措施；不淡化也不渲染。", "Identifier, scope, severity, fixed version, mitigation; neither downplay nor dramatise.")],
            [t("社区与社媒", "Community and social"), t("友好、平视", "Friendly, level"), t("感谢具体的人和贡献；不玩梗、不攻击其他项目。", "Thank specific people and contributions; no memes, no attacks on other projects.")],
            [t("错误信息", "Error messages"), t("具体、可操作", "Specific, actionable"), t("说明发生了什么、为什么、怎么解决；不道歉，不责备用户。", "Say what happened, why and how to fix it; no apologies, no blame.")],
          ]}
        />
      </Section>

      <Section id="naming" tag="Terminology" title={t("术语表", "Terminology")} lede={<p>{t("以下术语在中英文物料中统一使用。产品名、协议名与功能名保留英文时，首次出现可在括号中附中文说明。", "Use these terms consistently in both languages. Where product, protocol or feature names stay in English, the first mention in Chinese may add a Chinese gloss in parentheses.")}</p>}>
        <Table
          head={["中文", "English", t("说明", "Notes")]}
          rows={[
            ["对象存储", "object storage", t("RustFS 的品类；不称作文件系统", "RustFS's category; never “file system”")],
            ["存储桶", "bucket", "—"],
            ["对象", "object", "—"],
            ["纠删码", "erasure coding", t("缩写 EC，写作 EC 4+2", "Abbreviated EC, written EC 4+2")],
            ["纠删集", "erasure set", "—"],
            ["数据块 / 校验块", "data shard / parity shard", "—"],
            ["存储池", "pool", t("扩容以池为单位", "Capacity grows by pools")],
            ["位腐烂保护", "bitrot protection", "—"],
            ["自愈 / 修复", "healing / heal", t("名词用「修复」，功能名用 Healing", "Use 修复 as the noun; Healing as the feature name")],
            ["版本控制", "versioning", "—"],
            ["对象锁定", "Object Lock (WORM)", t("功能名首字母大写", "Feature name capitalised")],
            ["服务端加密", "server-side encryption (SSE)", "—"],
            ["站点复制 / 存储桶复制", "site replication / bucket replication", "—"],
            ["生命周期管理", "lifecycle management (ILM)", "—"],
            ["分层存储", "tiering", "—"],
            ["控制台", "Console", t("产品名 RustFS Console 不翻译", "Product name RustFS Console is not translated")],
          ]}
        />
      </Section>

      <Section id="rules" tag="Writing rules" title={t("写作规则", "Writing rules")}>
        <Table
          head={[t("项目", "Item"), t("规则", "Rule")]}
          rows={[
            [t("标题", "Headings"), t("英文使用句首大写（Sentence case）；中文标题不加句号。", "English uses sentence case; Chinese headings take no full stop.")],
            [t("按钮", "Buttons"), t("用动词开头说明结果：下载 RustFS、创建存储桶。不写「点击这里」「确定」。", "Start with a verb that names the result: Download RustFS, Create bucket. Never “Click here” or “OK”.")],
            [t("数字", "Numbers"), t("遵循字体页的数字与单位规范；同一物料内格式一致。", "Follow the numbers and units rules on the Typography page; one format per piece.")],
            [t("宣称", "Claims"), t("性能、兼容性与可靠性宣称必须可验证，并注明条件与来源。", "Performance, compatibility and reliability claims must be verifiable, with conditions and a source.")],
            [t("比较", "Comparisons"), t("只比较可公开验证的事实；不贬低其他项目或其用户。", "Compare only publicly verifiable facts; never disparage other projects or their users.")],
            [t("预览功能", "Preview features"), t("名称后标注「预览」/ Preview，并链接到支持范围说明。", "Mark the name with Preview and link to the support scope.")],
            [t("链接文字", "Link text"), t("描述目标内容，如「查看兼容性矩阵」；不写「点击此处」。", "Describe the destination, such as “See the compatibility matrix”; never “click here”.")],
            [t("包容性", "Inclusive language"), t("使用 allowlist / denylist、primary / replica；中文避免性别化默认称谓。", "Use allowlist / denylist and primary / replica; avoid gendered defaults.")],
          ]}
        />
      </Section>

      <Section id="words" tag="Word list" title={t("用词清单", "Word list")} lede={<p>{t("左列词语没有信息量或无法验证，须替换为右列的具体表述。", "Words on the left carry no information or cannot be verified; replace them with the specific statements on the right.")}</p>}>
        <Table
          head={[t("避免", "Avoid"), t("改为", "Write instead")]}
          rows={[
            [t("最快、最强、全球领先、业界第一", "Fastest, best, world-leading, number one"), t("同环境实测数据，注明条件与日期", "A like-for-like measurement with conditions and date")],
            [t("100% 兼容 S3", "100% S3 compatible"), t("兼容 S3 API，范围见兼容性矩阵", "Compatible with the S3 API; see the compatibility matrix")],
            [t("军工级安全、绝对安全", "Military-grade, absolutely secure"), t("具体的机制：SSE-KMS、对象锁定、IAM 策略", "The mechanism: SSE-KMS, Object Lock, IAM policies")],
            [t("零运维、开箱即用", "Zero ops, works out of the box"), t("具体的步骤数与时间：两条命令启动单节点", "The steps and time: two commands start a single node")],
            [t("颠覆、革命性、黑科技", "Disruptive, revolutionary, magic"), t("说明它解决的具体问题", "The specific problem it solves")],
            [t("赋能、抓手、生态闭环", "Empower, leverage, synergy"), t("直接说明谁做了什么", "Say who does what")],
          ]}
        />
      </Section>

      <Section id="examples" tag="Examples" title={t("对照示例", "Side by side")}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="white" bodyClassName="place-items-start content-center gap-2 text-neutral-950" caption={t("结论、依据、来源齐全。", "Conclusion, evidence and source in one line.")}>
            <p className="text-lg leading-snug font-semibold">{t("1 MiB 对象的 GET 吞吐较上一版本提升 38%。", "GET throughput on 1 MiB objects is 38% higher than the previous release.")}</p>
            <p className="font-mono text-xs text-neutral-600">{t("4 × NVMe · 25 GbE · 测试日期 2026-10-14 · 方法见基准测试说明", "4 × NVMe · 25 GbE · tested 2026-10-14 · method in the benchmark notes")}</p>
          </DoDont>
          <DoDont kind="dont" on="white" bodyClassName="place-items-start content-center gap-2 text-neutral-950" caption={t("无法验证的最高级与情绪化表达。", "Unverifiable superlatives and emotive language.")}>
            <p className="text-lg leading-snug font-semibold">{t("史上最快的对象存储！性能碾压一切对手！！", "The fastest object storage ever! Crushes every competitor!!")}</p>
          </DoDont>
          <DoDont kind="do" on="white" bodyClassName="place-items-start content-center gap-2 text-neutral-950" caption={t("错误信息说明原因与解决办法。", "The error explains the cause and the fix.")}>
            <p className="text-sm leading-relaxed"><b>{t("无法删除存储桶 my-bucket", "Cannot delete bucket my-bucket")}</b><br />{t("存储桶中仍有 1,284 个对象。请先清空存储桶，或使用 --force 删除。", "The bucket still holds 1,284 objects. Empty it first, or delete with --force.")}</p>
          </DoDont>
          <DoDont kind="dont" on="white" bodyClassName="place-items-start content-center gap-2 text-neutral-950" caption={t("只有道歉，没有信息。", "An apology without information.")}>
            <p className="text-sm leading-relaxed"><b>{t("哎呀，出错了！", "Oops, something went wrong!")}</b><br />{t("非常抱歉，请稍后再试。", "We're so sorry. Please try again later.")}</p>
          </DoDont>
        </div>
        <Note>{t("中英文版本须表达相同的意思，但不逐字对应。翻译时先确定要传达的结论，再按目标语言的习惯重写。", "Chinese and English versions must say the same thing without mirroring each other word for word. Fix the conclusion first, then rewrite it the way the target language says it.")}</Note>
      </Section>

      <PageFooter slug="voice" />
    </Page>
  )
}
