"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "cn"

const COLORS = ["var(--foreground)", "var(--muted-foreground)", "var(--border)", "var(--primary)"]

function Confetti({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const [pieces] = React.useState(() =>
    Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2
      const velocity = 40 + (i % 5) * 18
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 30,
        rot: (i % 2 === 0 ? 1 : -1) * (120 + (i % 7) * 40),
        size: 4 + (i % 3) * 2,
        color: COLORS[i % COLORS.length],
        delay: (i % 4) * 0.03,
      }
    })
  )

  if (reduceMotion) return null

  return (
    <div
      className={cn("pointer-events-none absolute top-0 left-1/2 h-0 w-0", className)}
      aria-hidden
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute block"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: 0,
            top: 0,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 60],
            opacity: [1, 1, 0],
            rotate: p.rot,
            scale: [1, 1, 0.6],
          }}
          transition={{
            duration: 1.1,
            delay: p.delay,
            times: [0, 0.4, 1],
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export { Confetti }
