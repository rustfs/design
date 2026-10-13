import { LETTERS, LOGO_PATHS, SYMBOL_VIEWBOX, WORDMARK_VIEWBOX } from "@/lib/logo-paths"
import { cn } from "@/lib/utils"

type SvgProps = { className?: string; fill?: string; title?: string }

/** The RUSTFS wordmark. Colour follows currentColor unless `fill` is set. */
export function Wordmark({ className, fill = "currentColor", title = "RustFS" }: SvgProps) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title} className={cn("block w-auto", !className?.includes("ab-logo") && "h-5", className)}>
      <g fill={fill}>
        {LETTERS.map((k) => (
          <path key={k} className={`l l-${k}`} d={LOGO_PATHS[k]} />
        ))}
      </g>
    </svg>
  )
}

/** The Flow S: the wordmark's last letter, used as the standalone symbol. */
export function BrandSymbol({ className, fill = "currentColor", title = "RustFS" }: SvgProps) {
  return (
    <svg viewBox={SYMBOL_VIEWBOX} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title} className={cn("block size-8", className)}>
      <path fill={fill} d={LOGO_PATHS.s2} />
    </svg>
  )
}

/** Square app icon: symbol at 94% on a solid field. */
export function AppIcon({ className, bg = "#0062FF", fg = "#FFFFFF", title = "RustFS" }: { className?: string; bg?: string; fg?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title} className={cn("block size-12", className)}>
      <rect width="100" height="100" fill={bg} />
      <path fill={fg} transform="translate(50 50) scale(0.94) translate(-331.58 -30.3)" d={LOGO_PATHS.s2} />
    </svg>
  )
}
