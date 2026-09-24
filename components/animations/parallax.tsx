"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { cn } from "cn"

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  /** Seberapa jauh bergerak relatif scroll (px). */
  offset?: number
}

function Parallax({ children, className, offset = 30 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export { Parallax }
