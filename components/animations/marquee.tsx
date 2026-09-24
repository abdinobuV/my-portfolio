"use client"

import * as React from "react"
import { cn } from "cn"

type MarqueeProps = {
  items: string[]
  duration?: number
  reverse?: boolean
  className?: string
  separator?: string
}

function Marquee({
  items,
  duration = 40,
  reverse = false,
  className,
  separator = "·",
}: MarqueeProps) {
  const doubled = React.useMemo(() => [...items, ...items], [items])

  return (
    <div
      className={cn("marquee overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${duration}s`,
        } as React.CSSProperties
      }
      aria-label="Teknologi yang digunakan"
      role="region"
    >
      <div className={cn("marquee-track", reverse && "reverse")}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            data-marquee-dup={i >= items.length ? "" : undefined}
            className="flex shrink-0 items-center gap-4 px-4 md:gap-6 md:px-6"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase md:text-sm">
              {item}
            </span>
            <span aria-hidden className="text-muted-foreground/50">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export { Marquee }
