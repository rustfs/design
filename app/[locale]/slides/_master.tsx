import type { ReactNode } from "react"
import { L } from "@/components/artboard/l"
import { Template, TemplateGrid } from "@/components/artboard/template"
import { t } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Chrome, Part, SLIDE, TITLE } from "./_parts"

/** Annotation tag, set in Oxide on a dark chip so it reads on every surface. */
function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("absolute bg-neutral-950/90 px-[calc(var(--u)*0.9)] py-[calc(var(--u)*0.65)] font-mono u-text-1.75 leading-none tracking-[0.04em] whitespace-nowrap text-oxide-500", className)}>{children}</span>
}

export function Master() {
  return (
    <TemplateGrid>
      <Template
        span={12}
        w={1920}
        h={1080}
        className={SLIDE}
        themes={["ink", "paper", "white"]}
        file="slide-master"
        title={t("母版 · 橙色虚线为 96 px 安全边距", "Master · the dashed line is the 96 px safe margin")}
        spec="1920 × 1080 · 16:9 · 1u = 10.8 px"
      >
        {/* 12 columns inside the margins */}
        <div className="absolute inset-(--m) grid grid-cols-12 u-gap-x-2.25">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} className="block bg-ab-data/10" />
          ))}
        </div>

        {/* zones */}
        <div className="absolute inset-x-(--m) top-(--m) u-h-3 bg-oxide-500/18" />
        <div className="absolute inset-x-(--m) u-top-20 u-h-20 border-y border-dashed border-oxide-500/60" />
        <div className="absolute inset-x-(--m) bottom-(--m) u-h-2 bg-oxide-500/18" />
        <div className="absolute inset-x-0 top-[288px] h-[2px] bg-oxide-500" />
        <div className="pointer-events-none absolute inset-(--m) outline-2 outline-oxide-500 outline-dashed" />

        <Chrome n={7} section={<Part i={2} />} />
        <h3 className={cn(TITLE, "absolute left-(--m) u-top-20 max-w-[16em]")}>
          <L zh="标题首行落在基线上" en="The first line of every title sits on the baseline" />
        </h3>
        <div className="absolute left-(--m) u-top-40 grid w-[calc((100%-var(--m)*2+var(--u)*2.25)*7/12-var(--u)*2.25)] u-gap-3">
          {[
            ["正文不小于 28 px，本母版使用 32 px。", "Body type is 28 px or larger; this master uses 32 px."],
            ["每页不超过 6 条要点，每条不超过 2 行。", "Six bullets at most, two lines each."],
            ["数字带单位，并注明来源与统计日期。", "Numbers carry a unit, a source and a date."],
          ].map(([zh, en], i) => (
            <p key={i} className="grid grid-cols-[calc(var(--u)*3.5)_1fr] u-text-3 leading-[1.42]">
              <i className="mt-[0.5em] block u-size-1.25 bg-ab-data" />
              <span>
                <L zh={zh} en={en} />
              </span>
            </p>
          ))}
        </div>

        {/* margin dimensions */}
        <span className="absolute top-1/2 left-0 block h-[2px] w-(--m) bg-oxide-500" />
        <Tag className="top-[calc(50%+var(--u)*1)] left-[calc(var(--u)*1)]">96</Tag>
        <span className="absolute top-0 right-[calc(var(--m)+var(--u)*30)] block h-(--m) w-[2px] bg-oxide-500" />
        <Tag className="top-[calc(var(--u)*3.5)] right-[calc(var(--m)+var(--u)*31)]">96 = 5% × 1920</Tag>

        {/* zone labels */}
        <Tag className="top-[calc(var(--m)+var(--u)*0.25)] left-[calc(var(--m)+var(--u)*22)]">
          <L zh="① 页眉区 · 字标 3u + 章节标签" en="① Header · wordmark 3u + section label" />
        </Tag>
        <Tag className="top-[calc(288px-var(--u)*4.5)] right-[calc(var(--m)+var(--u)*1)]">
          <L zh="② 标题区 y 216–432 · 首行基线 y 288" en="② Title zone y 216–432 · first baseline y 288" />
        </Tag>
        <Tag className="u-top-74 right-[calc(var(--m)+var(--u)*1)]">
          <L zh="③ 内容区 y 432–888 · 12 栏 · 栏宽 122 · 栏距 24" en="③ Content y 432–888 · 12 columns · 122 wide · 24 gutter" />
        </Tag>
        <Tag className="bottom-[calc(var(--m)+var(--u)*3.5)] left-[calc(var(--m)+var(--u)*1)]">
          <L zh="④ 页脚区 · 条带签名 · 演示名称 · 页码 07 / 18" en="④ Footer · stripe signature · deck name · number 07 / 18" />
        </Tag>
      </Template>
    </TemplateGrid>
  )
}
