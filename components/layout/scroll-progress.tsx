"use client"

import { motion, useScroll, useSpring } from "framer-motion"

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="scroll-progress absolute right-0 bottom-0 left-0 h-0.5 origin-left bg-foreground"
    />
  )
}

export { ScrollProgress }
