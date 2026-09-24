"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
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
  /**
   * false → enter via whileInView saja (untuk konten pendek di dasar halaman
   * yang offset scroll-nya tidak pernah mencapai target enter scrub).
   * true (default) → enter scrub + exit dissolve.
   */
  exit?: boolean
}

const childVariants = {
  hidden: { opacity: 0, y: motionTheme.travel.section },
  show: {
    opacity: 1,
    y: 0,
    transition: motionTheme.transitions.ui,
  },
} as const

function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as = "div",
  exit = true,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | HTMLLIElement | null>(null)
  const reduceMotion = useReducedMotion()
  const useStagger = stagger && as === "div" && !reduceMotion
  const scrub = exit && !reduceMotion

  const { scrollYProgress: enterP } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"],
  })
  const { scrollYProgress: exitP } = useScroll({
    target: ref,
    offset: ["end 45%", "end 5%"],
  })
  const enterOpacity = useTransform(enterP, [0, 1], [0, 1])
  const exitOpacity = useTransform(exitP, [0, 1], [
    1,
    exit ? motionTheme.scrub.exitOpacity : 1,
  ])
  const opacity = useTransform(
    [enterOpacity, exitOpacity],
    (latest: number[]) => Math.min(latest[0], latest[1])
  )
  const y = useTransform(enterP, [0, 1], [motionTheme.travel.section, 0])

  if (useStagger) {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement | null>}
        className={cn(className)}
        style={scrub ? { opacity } : undefined}
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

  if (!scrub) {
    if (as === "li") {
      return (
        <motion.li
          ref={ref as React.RefObject<HTMLLIElement | null>}
          className={cn(className)}
          initial={reduceMotion ? false : { opacity: 0, y: motionTheme.travel.section }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...motionTheme.transitions.gentle, delay }}
        >
          {children}
        </motion.li>
      )
    }

    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement | null>}
        className={cn(className)}
        initial={reduceMotion ? false : { opacity: 0, y: motionTheme.travel.section }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ ...motionTheme.transitions.gentle, delay }}
      >
        {children}
      </motion.div>
    )
  }

  const style = { opacity, y }

  if (as === "li") {
    return (
      <motion.li
        ref={ref as React.RefObject<HTMLLIElement | null>}
        className={cn(className)}
        style={style}
      >
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement | null>}
      className={cn(className)}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export { Reveal }
