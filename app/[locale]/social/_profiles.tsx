import { L } from "@/components/artboard/l"
import { BrandSymbol, Wordmark } from "@/components/brand/logo"
import { ShardMatrix } from "@/components/brand/matrix"
import { Stripe } from "@/components/brand/stripe"
import { Guide, H } from "./_shared"

/* ---------- Avatar · 400 × 400 ---------- */
export function Avatar() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 u-size-58 -translate-x-1/2 -translate-y-1/2">
        <BrandSymbol className="size-full text-ab-logo" />
      </div>
      {/* circle-crop preview: dim the corners, dash the circle */}
      <div className="no-export pointer-events-none absolute inset-0 z-10" style={{ background: "radial-gradient(circle closest-side, transparent calc(100% - 0.5px), rgba(11, 14, 20, 0.5) 100%)" }} aria-hidden="true" />
      <Guide className="inset-0" round label={<L zh="圆形裁切" en="Circle crop" />} labelClass="top-[3%] left-[3%]" />
    </>
  )
}

/* ---------- GitHub social preview · 1280 × 640 ---------- */
export function GithubPreview() {
  return (
    <>
      <div className="ab-frame">
        <div className="ab-row">
          <Wordmark className="ab-logo u-h-5.5" />
          <span className="ab-label u-text-2.75">
            Open source · <b>Apache 2.0</b>
          </span>
        </div>
        <div>
          <div className="font-mono u-text-4.5 leading-none tracking-[-0.01em] text-ab-muted">
            github.com/<b className="font-medium text-ab-fg">rustfs/rustfs</b>
          </div>
          <H className="u-mt-4 u-text-9.5 max-w-[15em]" zhClass="max-w-[12em] leading-[1.2]" zh="以 Rust 构建、兼容 S3 的分布式对象存储" en="Distributed, S3-compatible object storage, built in Rust" />
        </div>
        <ShardMatrix className="!h-[calc(var(--u)*12)] !w-full" cols={44} rows={3} k={4} m={2} seed={5} mode="tone" fit="slice" gap={0.24} />
      </div>
      <Guide className="inset-[40px]" label={<L zh="40px 边界" en="40px border" />} labelClass="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </>
  )
}

/* ---------- GitHub organisation / README banner · 1280 × 320 ---------- */
export function GithubBanner() {
  return (
    <>
      <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[30%]" cols={6} rows={5} k={4} m={2} seed={14} mode="tone" fade="l" fit="slice" gap={0.22} />
      <div className="absolute inset-y-0 left-[calc(var(--u)*12)] right-[calc(30%+var(--u)*6)] flex items-center u-gap-10">
        <Wordmark className="ab-logo u-h-16 self-center" />
        <i className="block u-h-40 w-px bg-ab-line" />
        <H className="u-text-11.5" zhClass="leading-[1.24]" enClass="leading-[1.04]" zh={<>每一个字节，<br />都有着落。</>} en={<>Every byte,<br />accounted for.</>} />
      </div>
    </>
  )
}

/* ---------- X header · 1500 × 500 ---------- */
export function XHeader() {
  return (
    <>
      <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[56%]" cols={11} rows={6} k={4} m={2} seed={33} mode="tone" fade="l" fit="slice" gap={0.22} />
      <div className="absolute top-[calc(var(--u)*16)] left-[calc(var(--u)*8)]">
        <H className="u-text-12" zhClass="leading-[1.22]" enClass="leading-[1.02]" zh={<>每一个字节，<br />都有着落。</>} en={<>Every byte,<br />accounted for.</>} />
      </div>
      {/* X draws the avatar over the bottom left: about 134px at 600px header width */}
      <Guide className="bottom-[-167px] left-[40px] size-[334px]" round label={<L zh="头像覆盖区" en="Avatar overlap" />} labelClass="top-[18%] left-1/2 -translate-x-1/2" />
    </>
  )
}

/* ---------- LinkedIn company cover · 1128 × 191 ---------- */
export function LinkedInCover() {
  return (
    <>
      <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[24%]" cols={7} rows={5} k={4} m={2} seed={9} mode="tone" fade="l" fit="slice" gap={0.22} />
      <div className="absolute inset-y-0 left-[25%] right-[calc(24%+var(--u)*8)] flex flex-col justify-center u-gap-5">
        <H className="u-text-16" zhClass="leading-[1.15]" enClass="leading-none" zh="每一个字节，都有着落。" en="Every byte, accounted for." />
        <span className="ab-label u-text-6">
          <L zh="兼容 S3 的对象存储 · Rust 构建 · Apache 2.0" en="S3-compatible object storage · Built in Rust · Apache 2.0" />
        </span>
      </div>
      <Guide className="bottom-0 left-0 h-[52%] w-[19%]" label={<L zh="标志覆盖区" en="Logo overlap" />} labelClass="bottom-0 left-0" />
    </>
  )
}

/* ---------- YouTube channel banner · 2560 × 1440 ---------- */
export function YouTubeBanner() {
  return (
    <>
      <ShardMatrix className="absolute inset-y-0 right-0 !h-full !w-[40%]" cols={10} rows={14} k={4} m={2} seed={27} mode="tone" fade="l" fit="slice" gap={0.22} />
      <div className="absolute top-[calc(50%-211.5px)] left-[calc(50%-773px)] flex h-[423px] w-[1546px] items-center">
        <div className="grid u-gap-4">
          <div className="flex items-center u-gap-6">
            <Wordmark className="ab-logo u-h-7" />
            <Stripe className="u-text-3" />
          </div>
          <H className="u-text-6.5" zhClass="leading-[1.2]" enClass="leading-[1.02]" zh={<>每一个字节，<br />都有着落。</>} en={<>Every byte,<br />accounted for.</>} />
        </div>
      </div>
      <Guide className="inset-0" label={<L zh="电视 · 全图 2560 × 1440" en="TV · full image 2560 × 1440" />} labelClass="top-[3%] left-[1.5%]" />
      <Guide className="inset-x-0 top-[calc(50%-211.5px)] h-[423px]" label={<L zh="桌面 2560 × 423" en="Desktop 2560 × 423" />} labelClass="top-0 left-0 -translate-y-full" />
      <Guide className="top-[calc(50%-211.5px)] left-[calc(50%-927.5px)] h-[423px] w-[1855px]" label={<L zh="平板 1855 × 423" en="Tablet 1855 × 423" />} labelClass="bottom-0 left-0 translate-y-full" />
      <Guide className="top-[calc(50%-211.5px)] left-[calc(50%-773px)] h-[423px] w-[1546px]" label={<L zh="安全区 · 全部设备 1546 × 423" en="Safe area · all devices 1546 × 423" />} labelClass="bottom-0 right-0 translate-y-full" />
    </>
  )
}
