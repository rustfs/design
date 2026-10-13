import { cn } from "@/lib/utils"

/** Stripe signature: k data shards followed by m parity shards. `missing` marks failed shards by index. */
export function Stripe({ k = 4, m = 2, missing = [], className }: { k?: number; m?: number; missing?: number[]; className?: string }) {
  return (
    <span className={cn("stripe", className)} aria-hidden="true">
      {Array.from({ length: k + m }, (_, i) => (
        <i key={i} className={cn(i >= k && "p", missing.includes(i) && "x")} />
      ))}
    </span>
  )
}
