import qrcode from "qrcode-generator"
import { cn } from "@/lib/utils"

/** QR code with square modules, rendered at build time. */
export function QR({ value, className, quiet = 2 }: { value: string; className?: string; quiet?: number }) {
  const q = qrcode(0, "M")
  q.addData(value)
  q.make()
  const n = q.getModuleCount()
  let d = ""
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) d += `M${x} ${y}h1v1h-1z`
  return (
    <svg viewBox={`${-quiet} ${-quiet} ${n + quiet * 2} ${n + quiet * 2}`} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" role="img" aria-label={`QR: ${value}`} className={cn("block size-24", className)}>
      <path d={d} fill="currentColor" />
    </svg>
  )
}
