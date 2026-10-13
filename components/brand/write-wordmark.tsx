import { Wordmark } from "./logo"

/** The wordmark entering with the brand "write" move: letters step in left to right (pure CSS, so the first paint is already animating). */
export function WriteWordmark({ className }: { className?: string }) {
  return (
    <span className="write-in block">
      <Wordmark className={className} />
    </span>
  )
}
