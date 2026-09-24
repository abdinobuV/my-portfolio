"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "cn"
import { motionTheme } from "@/motion.theme"

function splitWords(text: string) {
  return text.split(/(\s+)/)
}

type StaggerTextProps = {
  text: string
  className?: string
  delay?: number
  as?: "span" | "div" | "p"
}

const wordHidden = { opacity: 0, y: "0.6em" } as const
const wordShow = {
  opacity: 1,
  y: 0,
  transition: motionTheme.transitions.ui,
} as const

function StaggerText({ text, className, delay = 0, as = "span" }: StaggerTextProps) {
  const reduceMotion = useReducedMotion()
  const Tag = motion[as]
  const parts = splitWords(text)

  return (
    <Tag
      className={cn(className)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "show"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: motionTheme.stagger.tight,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {parts.map((part, i) =>
        part.match(/^\s+$/) ? (
          <React.Fragment key={i}>{part}</React.Fragment>
        ) : (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            variants={{
              hidden: wordHidden,
              show: wordShow,
            }}
            aria-hidden
          >
            {part}
          </motion.span>
        )
      )}
    </Tag>
  )
}

export { StaggerText }
