import type { Metadata } from "next"
import { DoDont, Note, Page, PageFooter, PageHeader, Section, Spec, Table } from "@/components/site/page"
import { isLocale, setLocale, t, type Locale } from "@/lib/i18n"
import { dataviz } from "@/lib/tokens"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return { title: locale === "zh" ? "数据可视化" : "Data visualisation" }
}

const AXIS = "var(--muted-foreground)"
const GRID = "var(--border)"
const FG = "var(--foreground)"

export default async function DatavizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  const locale = (isLocale(raw) ? raw : "en") as Locale
  setLocale(locale)
  const sample = t("示例数据", "Sample data")

  return (
    <Page>
      <PageHeader
        path="s3://rustfs-brand/dataviz/"
        label="Guidelines · Data visualisation"
        title={t("数据可视化", "Data visualisation")}
        subtitle={t("Data visualisation", "数据可视化")}
        lede={t(
          "图表是 RustFS 对外陈述性能与可靠性的主要方式。每张图表都须按比例绘制、注明单位与来源，并让读者在三秒内看出结论。",
          "Charts are how RustFS states performance and reliability in public. Every chart must be drawn to scale, carry units and a source, and let a reader see the conclusion within three seconds.",
        )}
        meta={[
          { k: t("主色", "Series 1"), v: "Signal #0062FF" },
          { k: t("对比系列", "Comparisons"), v: t("中性色", "Neutral") },
          { k: t("强调", "Highlight"), v: t("Oxide · 一处", "Oxide · one") },
        ]}
      />

      <Section id="principles" tag="Principles" title={t("制图原则", "Principles")}>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            [t("按比例绘制", "Draw to scale"), t("柱状图从 0 开始；坐标轴不截断；同一组图表使用同一刻度。", "Bars start at zero, axes are never truncated, and charts in a set share one scale.")],
            [t("结论先行", "Lead with the finding"), t("标题写结论而不是图表类型，例如「1 MiB 对象 GET 吞吐提升 38%」。", "The title states the finding, not the chart type — for example “GET throughput up 38% on 1 MiB objects”.")],
            [t("RustFS 永远是蓝色", "RustFS is always blue"), t("RustFS 系列使用 Signal Blue；对比对象使用中性色；Oxide 只标记一个需要注意的点。", "The RustFS series is Signal Blue, comparisons are neutral, and Oxide marks the one point that matters.")],
            [t("可追溯", "Traceable"), t("注明单位、测试环境、版本、日期与来源；示例数据须明确标注。", "Give units, environment, versions, date and source; sample data is labelled as such.")],
          ].map(([k, v], i) => (
            <div key={i} className="grid content-start gap-2 bg-background p-5">
              <h3 className="text-base font-semibold">{k}</h3>
              <p className="text-sm leading-relaxed text-subtle">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="palette" tag="Palette" title={t("图表色板", "Chart palette")} lede={<p>{t("分类色按固定顺序使用，最多 8 个系列；超过 5 个系列时优先考虑拆图。连续数据使用 Signal 色阶，正负对比使用 Signal—中性—Oxide 发散色阶。", "Categorical colours are used in a fixed order, up to eight series; beyond five, split the chart. Sequential data uses the Signal scale; diverging data runs from Signal through neutral to Oxide.")}</p>}>
        <div className="grid gap-4">
          <div className="grid grid-cols-8 gap-1.5">
            {dataviz.map((d) => (
              <div key={d.index} className="grid gap-1.5">
                <span className="h-12" style={{ background: d.hex }} />
                <span className="font-mono text-[10px] text-muted-foreground">{d.index} · {d.hex}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-1.5">
            <div className="grid h-8 grid-cols-9">
              {["#F1F6FE", "#E0ECFE", "#C3DBFE", "#96BFFF", "#5C99FF", "#0062FF", "#014FDD", "#043EB5", "#072163"].map((c) => <span key={c} style={{ background: c }} />)}
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">{t("连续 · Signal 50–900", "Sequential · Signal 50–900")}</span>
          </div>
          <div className="grid gap-1.5">
            <div className="grid h-8 grid-cols-9">
              {["#0062FF", "#5C99FF", "#96BFFF", "#C3DBFE", "#DCE0E6", "#FFD2B7", "#FEB38D", "#FE8F5D", "#FF5E14"].map((c) => <span key={c} style={{ background: c }} />)}
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">{t("发散 · Signal — 中性 — Oxide", "Diverging · Signal — neutral — Oxide")}</span>
          </div>
        </div>
      </Section>

      <Section id="charts" tag="Chart types" title={t("图表规范", "Chart standards")} lede={<p>{t("以下图表均为示例数据，用于说明画法。", "The charts below use sample data to show the drawing standard.")}</p>}>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title={t("1 MiB 对象的 GET 吞吐高出 38%", "GET throughput is 38% higher on 1 MiB objects")} kicker={t("柱状图 · 分组", "Bar · grouped")} source={`${sample} · GiB/s · 4 × NVMe · 25 GbE`}>
            <GroupedBars sample={sample} />
          </ChartCard>
          <ChartCard title={t("盘 07 离线 42 分钟，期间 p99 延迟保持在 30 ms 以内", "Drive 07 was offline for 42 minutes; p99 latency stayed under 30 ms")} kicker={t("折线图 · 事件标注", "Line · annotated event")} source={`${sample} · p99 ms · 24 h`}>
            <LineChart />
          </ChartCard>
          <ChartCard title={t("Pool 2 已使用 81%，建议扩容", "Pool 2 is 81% full; plan expansion")} kicker={t("条形图 · 占比", "Bar · share")} source={`${sample} · TiB`}>
            <CapacityBars />
          </ChartCard>
          <ChartCard title={t("48 块盘中 1 块离线，2 块修复中", "1 of 48 drives offline, 2 healing")} kicker={t("热力图 · 盘状态", "Heatmap · drive state")} source={`${sample} · 4 nodes × 12 drives`}>
            <DriveMap />
          </ChartCard>
        </div>
        <Sub2 title={t("指标卡", "Metric tiles")}>
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: t("吞吐 · GET", "Throughput · GET"), v: "18.4", u: "GiB/s", d: "+6.1%", s: [12, 13, 12.5, 14, 15, 14.6, 16, 17.2, 18.4] },
              { k: t("延迟 · p99", "Latency · p99"), v: "21", u: "ms", d: "−3 ms", s: [26, 25, 27, 24, 23, 25, 22, 22, 21] },
              { k: t("容量 · 已用", "Capacity · used"), v: "1.2", u: "PiB", d: "+40 TiB", s: [0.9, 0.95, 1, 1.02, 1.06, 1.1, 1.13, 1.17, 1.2] },
              { k: t("修复队列", "Heal queue"), v: "0", u: t("对象", "objects"), d: t("已清空", "Clear"), s: [40, 32, 30, 22, 18, 9, 4, 1, 0] },
            ].map((m) => (
              <div key={m.k} className="grid gap-3 bg-background p-5">
                <span className="type-label-sm text-muted-foreground">{m.k}</span>
                <span className="flex items-baseline gap-1.5">
                  <b className="font-display text-4xl leading-none font-extrabold tracking-[-0.02em] num [font-stretch:125%]">{m.v}</b>
                  <span className="font-mono text-xs text-muted-foreground">{m.u}</span>
                </span>
                <Sparkline values={m.s} />
                <span className="font-mono text-[11px] text-muted-foreground">{m.d} · {sample}</span>
              </div>
            ))}
          </div>
        </Sub2>
      </Section>

      <Section id="benchmarks" tag="Benchmarks" title={t("性能数据发布要求", "Publishing benchmarks")} lede={<p>{t("对外发布的性能数据须完整说明测试条件，并且只与同一环境、同一时间段测得的结果比较。", "Published performance figures must state the full test conditions and compare only with results measured in the same environment and period.")}</p>}>
        <Table
          head={[t("必须注明", "Must state"), t("示例格式", "Example format")]}
          mono={[1]}
          rows={[
            [t("硬件", "Hardware"), "2 vCPU Intel Xeon Platinum 8475B · 4 GB RAM · 4 × 40 GB, 3,800 IOPS each"],
            [t("网络", "Network"), "15 Gbps"],
            [t("软件版本", "Software versions"), "RustFS 1.0.1 · warp v1.x"],
            [t("拓扑与纠删配置", "Topology and erasure layout"), "1 node · 4 drives · EC 2+2"],
            [t("负载", "Workload"), "GET / PUT · 1 MiB objects · 32 concurrent clients · 10 min"],
            [t("日期与来源", "Date and source"), "2026-10-14 · github.com/rustfs/rustfs"],
          ]}
        />
        <Note tone="parity">{t("不得发布单次测量的峰值，不得在未注明的情况下更换对比对象的配置，不得使用「最快」等无法验证的结论。", "Never publish a single-run peak, never change a competitor's configuration without saying so, and never claim “fastest” or any other unverifiable conclusion.")}</Note>
      </Section>

      <Section id="rules" tag="Do & Don't" title={t("制图规则", "Chart rules")}>
        <div className="grid gap-4 md:grid-cols-2">
          <DoDont kind="do" on="white" caption={t("从 0 开始，直接标注数值，RustFS 为蓝色。", "Starts at zero, values labelled directly, RustFS in blue.")}>
            <MiniBars from={0} />
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("截断坐标轴放大差异，且未标注单位。", "A truncated axis exaggerates the gap, and there are no units.")}>
            <MiniBars from={14} />
          </DoDont>
          <DoDont kind="do" on="white" caption={t("平面、方形标记，图例直接标在线条末端。", "Flat, square markers, labels at the line ends.")}>
            <svg viewBox="0 0 240 110" className="w-full max-w-72" aria-hidden="true">
              <path d="M10 90L60 70L110 74L160 46L230 30" fill="none" stroke="#0062FF" strokeWidth={2} />
              <path d="M10 92L60 86L110 82L160 76L230 70" fill="none" stroke="#9AA0AC" strokeWidth={2} />
              <rect x="226" y="26" width="8" height="8" fill="#0062FF" />
              <text x="200" y="20" fontSize="10" fill="#0B0E14" fontFamily="var(--font-mono)">RustFS</text>
              <text x="186" y="88" fontSize="10" fill="#5A616D" fontFamily="var(--font-mono)">Baseline</text>
            </svg>
          </DoDont>
          <DoDont kind="dont" on="white" caption={t("3D、饼图、渐变与彩虹配色。", "3D, pie charts, gradients and rainbow colours.")}>
            <svg viewBox="0 0 240 110" className="w-full max-w-72" aria-hidden="true">
              <defs>
                <linearGradient id="dv-bad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#A855F7" /><stop offset="1" stopColor="#06B6D4" /></linearGradient>
              </defs>
              <ellipse cx="70" cy="62" rx="52" ry="30" fill="#F59E0B" />
              <path d="M70 62L70 32A52 30 0 0 1 120 70Z" fill="#EF4444" />
              <path d="M70 62L120 70A52 30 0 0 1 30 82Z" fill="#22C55E" />
              <rect x="150" y="30" width="22" height="64" rx="6" fill="url(#dv-bad)" />
              <rect x="180" y="50" width="22" height="44" rx="6" fill="url(#dv-bad)" />
              <rect x="210" y="40" width="22" height="54" rx="6" fill="url(#dv-bad)" />
            </svg>
          </DoDont>
        </div>
      </Section>

      <PageFooter slug="dataviz" />
    </Page>
  )
}

function Sub2({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </div>
  )
}

function ChartCard({ title, kicker, source, children }: { title: React.ReactNode; kicker: React.ReactNode; source: React.ReactNode; children: React.ReactNode }) {
  return (
    <Spec bodyClassName="place-items-stretch content-start gap-5 p-[clamp(18px,2.4vw,28px)]" caption={source}>
      <div className="grid gap-1.5">
        <span className="type-label-sm text-muted-foreground">{kicker}</span>
        <h3 className="max-w-[30ch] text-lg leading-snug font-semibold">{title}</h3>
      </div>
      {children}
    </Spec>
  )
}

function GroupedBars({ sample }: { sample: string }) {
  const data = [
    { k: "4 KiB", a: 1.9, b: 1.6 },
    { k: "1 MiB", a: 18.4, b: 13.3 },
    { k: "64 MiB", a: 21.2, b: 19.8 },
  ]
  const W = 520, H = 260, L = 40, B = 34, T = 14, max = 25
  const y = (v: number) => H - B - ((H - B - T) * v) / max
  const gw = (W - L - 10) / data.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={sample}>
      {[0, 5, 10, 15, 20, 25].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - 4} y1={y(v)} y2={y(v)} stroke={GRID} strokeWidth={1} />
          <text x={L - 8} y={y(v) + 3.5} fontSize="10" textAnchor="end" fill={AXIS} fontFamily="var(--font-mono)">{v}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x0 = L + gw * i + gw * 0.18
        const bw = gw * 0.3
        return (
          <g key={d.k}>
            <rect x={x0} y={y(d.a)} width={bw} height={y(0) - y(d.a)} fill="#0062FF" />
            <rect x={x0 + bw + 4} y={y(d.b)} width={bw} height={y(0) - y(d.b)} fill="#9AA0AC" />
            <text x={x0 + bw / 2} y={y(d.a) - 6} fontSize="10" textAnchor="middle" fill={FG} fontFamily="var(--font-mono)">{d.a}</text>
            <text x={x0 + bw * 1.5 + 4} y={y(d.b) - 6} fontSize="10" textAnchor="middle" fill={AXIS} fontFamily="var(--font-mono)">{d.b}</text>
            <text x={x0 + bw + 2} y={H - B + 18} fontSize="11" textAnchor="middle" fill={FG} fontFamily="var(--font-mono)">{d.k}</text>
          </g>
        )
      })}
      <rect x={L} y={H - 10} width="8" height="8" fill="#0062FF" />
      <text x={L + 13} y={H - 2.5} fontSize="10" fill={FG} fontFamily="var(--font-mono)">RustFS</text>
      <rect x={L + 70} y={H - 10} width="8" height="8" fill="#9AA0AC" />
      <text x={L + 83} y={H - 2.5} fontSize="10" fill={AXIS} fontFamily="var(--font-mono)">Baseline</text>
    </svg>
  )
}

function LineChart() {
  const pts = [18, 19, 18, 20, 19, 21, 20, 22, 21, 23, 26, 28, 27, 25, 22, 21, 20, 19, 20, 19, 18, 19, 18, 18]
  const W = 520, H = 260, L = 40, B = 30, T = 14, max = 40
  const x = (i: number) => L + ((W - L - 8) * i) / (pts.length - 1)
  const y = (v: number) => H - B - ((H - B - T) * v) / max
  const d = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("")
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      {[0, 10, 20, 30, 40].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - 4} y1={y(v)} y2={y(v)} stroke={GRID} />
          <text x={L - 8} y={y(v) + 3.5} fontSize="10" textAnchor="end" fill={AXIS} fontFamily="var(--font-mono)">{v}</text>
        </g>
      ))}
      <rect x={x(10)} y={T} width={x(12.4) - x(10)} height={y(0) - T} fill="#FF5E14" fillOpacity={0.12} />
      <line x1={L} x2={W - 4} y1={y(30)} y2={y(30)} stroke="#FF5E14" strokeDasharray="4 4" />
      <path d={d} fill="none" stroke="#0062FF" strokeWidth={2} />
      {pts.map((v, i) => (i % 4 === 0 || i === pts.length - 1 ? <rect key={i} x={x(i) - 2.5} y={y(v) - 2.5} width="5" height="5" fill="#0062FF" /> : null))}
      <text x={x(10) + 4} y={T + 12} fontSize="10" fill="#B33A10" fontFamily="var(--font-mono)">drive-07 offline → healed</text>
      {[0, 6, 12, 18, 23].map((i) => (
        <text key={i} x={x(i)} y={H - B + 18} fontSize="10" textAnchor="middle" fill={AXIS} fontFamily="var(--font-mono)">{String(i).padStart(2, "0")}:00</text>
      ))}
    </svg>
  )
}

function CapacityBars() {
  const pools = [
    { k: "Pool 1", used: 412, total: 640 },
    { k: "Pool 2", used: 518, total: 640, hi: true },
    { k: "Pool 3", used: 96, total: 960 },
  ]
  return (
    <div className="grid gap-4">
      {pools.map((p) => {
        const pct = Math.round((p.used / p.total) * 100)
        return (
          <div key={p.k} className="grid gap-1.5">
            <div className="flex justify-between font-mono text-xs">
              <span>{p.k}</span>
              <span className={p.hi ? "text-parity-text" : "text-muted-foreground"}>
                {p.used} / {p.total} TiB · {pct}%
              </span>
            </div>
            <div className="grid h-5 grid-cols-[repeat(40,1fr)] gap-0.5">
              {Array.from({ length: 40 }, (_, i) => (
                <span key={i} className={i < Math.round((pct / 100) * 40) ? (p.hi ? "bg-oxide-500" : "bg-blue-500") : "bg-surface-2"} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DriveMap() {
  const state = (n: number, d: number) => (n === 2 && d === 6 ? "off" : (n === 1 && d === 9) || (n === 3 && d === 2) ? "heal" : "ok")
  const color = { ok: "#02A855", heal: "#0062FF", off: "#E42E41" }
  return (
    <div className="grid gap-2.5">
      {[0, 1, 2, 3].map((n) => (
        <div key={n} className="grid grid-cols-[64px_1fr] items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">node-{n + 1}</span>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }, (_, d) => {
              const s = state(n, d)
              return <span key={d} title={`node-${n + 1} drive-${d + 1}: ${s}`} className={`aspect-square ${s === "heal" ? "animate-pulse" : ""}`} style={s === "off" ? { boxShadow: `inset 0 0 0 1.5px ${color.off}` } : { background: color[s] }} />
            })}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-4 pt-1 font-mono text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><i className="size-2.5 bg-green-500" />online</span>
        <span className="inline-flex items-center gap-1.5"><i className="size-2.5 bg-blue-500" />healing</span>
        <span className="inline-flex items-center gap-1.5"><i className="size-2.5 shadow-[inset_0_0_0_1.5px_#E42E41]" />offline</span>
      </div>
    </div>
  )
}

function Sparkline({ values }: { values: number[] }) {
  const W = 200, H = 40
  const min = Math.min(...values), max = Math.max(...values)
  const x = (i: number) => (W * i) / (values.length - 1)
  const y = (v: number) => H - 4 - ((H - 8) * (v - min)) / (max - min || 1)
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("")
  const last = values.length - 1
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${d}L${W} ${H}L0 ${H}Z`} fill="#0062FF" fillOpacity={0.08} />
      <path d={d} fill="none" stroke="#0062FF" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      <rect x={x(last) - 3} y={y(values[last]) - 3} width="6" height="6" fill="#0062FF" />
    </svg>
  )
}

function MiniBars({ from }: { from: number }) {
  const vals = [{ k: "RustFS", v: 18.4, c: "#0062FF" }, { k: "Baseline", v: 16.9, c: "#9AA0AC" }]
  const max = 20
  return (
    <div className="grid w-full max-w-72 gap-3 text-neutral-950">
      {vals.map((b) => (
        <div key={b.k} className="grid grid-cols-[64px_1fr_auto] items-center gap-2 font-mono text-[11px]">
          <span>{b.k}</span>
          <span className="h-5" style={{ width: `${((b.v - from) / (max - from)) * 100}%`, background: b.c }} />
          <span>{from === 0 ? `${b.v} GiB/s` : ""}</span>
        </div>
      ))}
    </div>
  )
}
