import * as React from "react"

import { cn } from "cn"
import { TechIcon } from "@/components/tech-icon"
import type { Technology } from "@/content/technologies"

type TechMarqueeProps = {
  items: Technology[]
  duration?: number
  className?: string
}

/** Dua baris chip ikon berjalan — arah baris bergantian, jeda saat hover. */
function TechMarquee({ items, duration = 50, className }: TechMarqueeProps) {
  const half = Math.ceil(items.length / 2)
  const rows = [items.slice(0, half), items.slice(half)]
  const mask =
    "linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)"

  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      role="region"
      aria-label="Teknologi yang digunakan"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="marquee overflow-hidden">
          <div
            className={cn("marquee-track gap-3", rowIndex === 1 && "reverse")}
            style={
              { "--marquee-duration": `${duration}s` } as React.CSSProperties
            }
          >
            {[...row, ...row].map((tech, i) => {
              const duplicate = i >= row.length
              return (
                <span
                  key={`${tech.label}-${i}`}
                  aria-hidden={duplicate || undefined}
                  data-marquee-dup={duplicate ? "" : undefined}
                  className="flex shrink-0 items-center gap-2 border border-border bg-card px-3 py-1.5"
                >
                  <TechIcon icon={tech.icon} size={14} />
                  <span className="font-mono text-xs tracking-widest uppercase">
                    {tech.label}
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export { TechMarquee }
