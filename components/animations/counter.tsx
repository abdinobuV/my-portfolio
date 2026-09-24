"use client"

import * as React from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

type CounterProps = {
  value: number
  suffix?: string
  className?: string
  duration?: number
}

function Counter({
  value,
  suffix = "",
  className,
  duration = 1.4,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!inView || reduceMotion) return

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  const shown = reduceMotion ? value : inView || display > 0 ? display : 0

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  )
}

export { Counter }
