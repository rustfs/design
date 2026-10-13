import { ICONS, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"

export function Icon({ name, className, strokeWidth = 1.5, title }: { name: IconName; className?: string; strokeWidth?: number; title?: string }) {
  const ic: { d?: string; f?: string; dash?: string } = ICONS[name]
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block size-5 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {ic.d && <path d={ic.d} />}
      {ic.dash && <path d={ic.dash} strokeDasharray="2 2" />}
      {ic.f && <path d={ic.f} fill="currentColor" stroke="none" />}
    </svg>
  )
}
