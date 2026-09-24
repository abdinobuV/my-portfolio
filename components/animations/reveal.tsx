"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "cn"
import { motionTheme } from "@/motion.theme"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** true → animasikan tiap anak dengan stagger (untuk list/grid non-semantik). */
  stagger?: boolean
  /** Override elemen wrapping (mis. "li" untuk list semantik). Tidak kompatibel dengan stagger. */
  as?: "div" | "li"
}

const childVariants = {
  hidden: { opacity: 0, y: motionTheme.travel.section },
  show: {
    opacity: 1,
    y: 0,
    transition: motionTheme.transitions.ui,
  },
} as const

function Reveal({ children, className, delay = 0, stagger = false, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Tag = as === "li" ? motion.li : motion.div
  const useStagger = stagger && as === "div" && !reduceMotion

  if (useStagger) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: motionTheme.stagger.base,
              delayChildren: delay,
            },
          },
        }}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={childVariants}>{child}</motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <Tag
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: motionTheme.travel.section }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...motionTheme.transitions.gentle, delay }}
    >
      {children}
    </Tag>
  )
}

export { Reveal }
