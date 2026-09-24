"use client"

import * as React from "react"
import { motion, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "cn"
import { motionTheme } from "@/motion.theme"

type MagneticProps = {
  children: React.ReactNode
  className?: string
  /** Seberapa kuat tarikan (px). */
  strength?: number
}

function Magnetic({ children, className, strength = 6 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const x = useSpring(0, motionTheme.transitions.ui)
  const y = useSpring(0, motionTheme.transitions.ui)

  React.useEffect(() => {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    const target: HTMLDivElement = el

    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return
      const rect = target.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      const radius = Math.max(rect.width, rect.height) * 0.9
      if (dist < radius) {
        x.set((dx / radius) * strength)
        y.set((dy / radius) * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    function onLeave() {
      x.set(0)
      y.set(0)
    }

    window.addEventListener("pointermove", onMove)
    target.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      target.removeEventListener("pointerleave", onLeave)
    }
  }, [reduceMotion, strength, x, y])

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}

export { Magnetic }
