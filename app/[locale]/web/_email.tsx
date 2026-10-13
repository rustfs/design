import type { CSSProperties } from "react"
import { L } from "@/components/artboard/l"
import { Template } from "@/components/artboard/template"
import { Wordmark } from "@/components/brand/logo"
import { t } from "@/lib/i18n"

/* 640 × 1360 email (1u = 6.4px). Mail clients ignore web fonts, so the artboard is set in the system stack it will actually render in. */
export const MAIL_FONT = `-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif`
export const MAIL_MONO = `ui-monospace, "SF Mono", Menlo, Consolas, monospace`
const sans: CSSProperties = { fontFamily: MAIL_FONT }
const mono: CSSProperties = { fontFamily: MAIL_MONO }

export function EmailTemplate() {
  return (
    <Template
      span={5}
      title={t("Newsletter · 版本月报", "Newsletter · monthly release")}
      spec={t("640 × 1360 · 单栏，系统字体", "640 × 1360 · single column, system fonts")}
      w={640}
      h={1360}
      themes={["white", "ink"]}
      tags={["email"]}
      file="email-newsletter"
      note={t("WHITE 为默认外观；INK 用于检查深色模式邮件客户端中的效果。", "WHITE is the default appearance; INK checks the result in dark-mode mail clients.")}
    >
      <div className="absolute inset-0 flex flex-col" style={sans}>
        <div className="flex items-center justify-between u-px-6.25 u-py-2.5 u-text-1.75 text-ab-muted">
          <span>
            <L zh="RustFS 1.0.1 现已发布，另有三篇新文章。" en="RustFS 1.0.1 is available, plus three new articles." />
          </span>
          <span className="underline underline-offset-2">
            <L zh="在浏览器中查看" en="View in browser" />
          </span>
        </div>

        <div className="flex u-h-12.5 items-center justify-between bg-[#0062FF] u-px-6.25 text-white">
          <span className="block">
            <Wordmark className="ab-logo u-h-3" fill="#FFFFFF" />
          </span>
          <span className="u-text-2 font-semibold tracking-[0.04em]">
            <L zh="月报 · 2026.10" en="Monthly · 2026.10" />
          </span>
        </div>

        <div className="grid u-gap-3 u-px-6.25 u-pt-8 u-pb-7">
          <span className="u-text-1.75 font-semibold tracking-[0.08em] text-ab-brand uppercase">
            <L zh="版本发布" en="Release" />
          </span>
          <h1 className="u-text-5 leading-[1.25] font-bold">
            <L zh="RustFS 1.0.1 现已发布" en="RustFS 1.0.1 is available" />
          </h1>
          <p className="u-text-2.5 leading-[1.6] text-ab-fg-2">
            <L zh="1.0.1 是 1.0 系列的首个补丁版本。升级前请阅读更新说明，并按部署方式执行对应的升级步骤。" en="1.0.1 is the first patch release in the 1.0 series. Read the release notes before upgrading and follow the steps for your deployment method." />
          </p>
          <span className="u-mt-1.5 inline-flex u-h-7.5 w-fit items-center bg-ab-data u-px-4 u-text-2.5 font-semibold text-ab-on-data">
            <L zh="阅读更新说明" en="Read the release notes" />
          </span>
          <span className="u-text-2 text-ab-muted">
            <L zh="或访问 " en="or visit " />
            <span className="text-ab-brand underline underline-offset-2">github.com/rustfs/rustfs/releases</span>
          </span>
        </div>

        <div className="mx-[calc(var(--u)*6.25)] grid u-gap-1.5 border border-ab-line bg-ab-panel u-p-3">
          <span className="u-text-1.75 font-semibold text-ab-fg">
            <L zh="使用指定版本运行" en="Run a specific version" />
          </span>
          <span className="block u-text-1.75 leading-[1.6] break-all text-ab-fg-2" style={mono}>
            docker run -d -p 9000:9000 -p 9001:9001 -v $(pwd)/data:/data -v $(pwd)/logs:/logs rustfs/rustfs:1.0.1
          </span>
        </div>

        <div className="grid u-px-6.25 u-pt-8">
          <span className="u-mb-2 u-text-1.75 font-semibold tracking-[0.08em] text-ab-muted uppercase">
            <L zh="博客" en="From the blog" />
          </span>
          {[
            ["2026-09-16", <L key="a" zh="RustFS 1.0.0 正式发布：生产可用、开源、兼容 S3 的对象存储" en="Announcing RustFS 1.0.0 GA: Production-Ready, Open Source, S3-Compatible Object Storage" />],
            ["2026-09-10", <L key="b" zh="RustFS 推出 S3 Tables：开源对象存储中的 Apache Iceberg 表" en="RustFS Launches S3 Tables: Apache Iceberg Tables Inside an Open-Source Object Store" />],
            ["2026-08-19", <L key="c" zh="分步教程：使用 RPM/DEB 软件包安装 RustFS" en="Step-by-Step Tutorial: How to Install RustFS with RPM/DEB Packages" />],
          ].map(([d, title]) => (
            <div key={d as string} className="grid u-gap-0.75 border-t border-ab-line u-py-2.75">
              <span className="u-text-1.75 text-ab-muted" style={mono}>
                {d}
              </span>
              <span className="u-text-2.5 leading-[1.4] font-semibold text-ab-fg underline decoration-ab-line underline-offset-[0.25em]">{title}</span>
            </div>
          ))}
        </div>

        <div className="mx-[calc(var(--u)*6.25)] u-mt-4 grid grid-cols-2 border-y border-ab-line">
          {[
            ["34,869", <L key="a" zh="GitHub 星标" en="GitHub stars" />],
            ["15.15M", <L key="b" zh="Docker 镜像拉取" en="Docker pulls" />],
          ].map(([v, k], i) => (
            <div key={i} className={i > 0 ? "border-l border-ab-line u-py-3 u-pl-3" : "u-py-3"}>
              <b className="block u-text-4.5 leading-none font-bold tabular-nums">{v}</b>
              <span className="u-mt-1 block u-text-1.75 text-ab-muted">{k}</span>
            </div>
          ))}
        </div>
        <span className="u-px-6.25 u-pt-1.5 u-text-1.5 text-ab-muted">
          <L zh="数据来源：RustFS 官方网站。统计日期：2026-10-14。" en="Source: official RustFS website. As of 2026-10-14." />
        </span>

        <div className="mt-auto grid u-gap-2.5 bg-ab-panel u-px-6.25 u-py-6 u-text-1.75 leading-[1.6] text-ab-muted">
          <Wordmark className="ab-logo u-h-2.5" />
          <span>
            <L zh="你收到这封邮件，是因为订阅了 RustFS 月报。" en="You are receiving this email because you subscribed to the RustFS newsletter." />
          </span>
          <span className="flex u-gap-3 text-ab-fg-2 underline underline-offset-2">
            <span>
              <L zh="退订" en="Unsubscribe" />
            </span>
            <span>
              <L zh="管理订阅" en="Preferences" />
            </span>
            <span>
              <L zh="在浏览器中查看" en="View in browser" />
            </span>
          </span>
          <span className="w-fit border border-dashed border-ab-line u-px-1.5 u-py-0.75 u-text-1.5 tracking-[0.06em] uppercase">
            <L zh="公司名称与通讯地址" en="Company name and postal address" />
          </span>
        </div>
      </div>
    </Template>
  )
}

export const MAIL_BUTTON_CODE = `<!-- Bulletproof button: real text on a coloured cell, 48px tall -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td bgcolor="#0062FF" style="background:#0062FF;">
      <a href="https://github.com/rustfs/rustfs/releases"
         style="display:inline-block; padding:14px 24px; line-height:20px;
                font:600 16px/20px ${MAIL_FONT.replace(/"/g, "'")};
                color:#FFFFFF; text-decoration:none;">
        Read the release notes
      </a>
    </td>
  </tr>
</table>

<!-- Dark-mode clients -->
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">`
