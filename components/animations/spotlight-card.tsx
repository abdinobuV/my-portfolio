"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "cn"
import { motionTheme } from "@/motion.theme"

type SpotlightCardProps = React.ComponentPropsWithoutRef<typeof motion.div> & {
  beam?: boolean
}

const SpotlightCard = React.forwardRef<
  HTMLDivElement,
  SpotlightCardProps
>(function SpotlightCard(
  { children, className, beam = true, onPointerMove, onPointerEnter, onPointerLeave, ...props },
  ref
) {
  const reduceMotion = useReducedMotion()
  const [pos, setPos] = React.useState({ x: 50, y: 50 })
  const [active, setActive] = React.useState(false)

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event)
    if (event.pointerType === "touch") return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    setPos({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={(e) => {
        onPointerEnter?.(e)
        setActive(true)
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e)
        setActive(false)
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={motionTheme.transitions.snap}
      className={cn("group relative isolate overflow-hidden border border-border", className)}
      {...props}
      style={
        reduceMotion
          ? props.style
          : ({
              ...(props.style as React.CSSProperties | undefined),
              "--spot-x": `${pos.x}%`,
              "--spot-y": `${pos.y}%`,
            } as React.CSSProperties)
      }
    >
      {!reduceMotion ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            "bg-[radial-gradient(400px_circle_at_var(--spot-x)_var(--spot-y),oklch(0.9_0.02_40/0.18),transparent_60%)]"
          )}
        />
      ) : null}

      {beam && !reduceMotion && active ? (
        <span
          aria-hidden
          className="beam-border pointer-events-none absolute inset-0 z-10"
        />
      ) : null}

      <div className="relative z-20">{children as React.ReactNode}</div>
    </motion.div>
  )
})

export { SpotlightCard }
