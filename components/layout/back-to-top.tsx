"use client"

import * as React from "react"
import { motion, useScroll } from "framer-motion"
import { ArrowUpIcon } from "lucide-react"
import { useLenis } from "lenis/react"

import { motionTheme } from "@/motion.theme"

function BackToTop() {
  const [visible, setVisible] = React.useState(false)
  const { scrollY } = useScroll()
  const lenis = useLenis()

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setVisible(y > 640)
    })
    return () => unsubscribe()
  }, [scrollY])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0)
    } else {
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
      }}
      transition={motionTheme.transitions.ui}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="back-to-top fixed right-4 bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4.5rem))] z-40 md:bottom-4"
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={scrollToTop}
        tabIndex={visible ? 0 : -1}
        aria-label="Kembali ke atas"
        title="Kembali ke atas"
        className="flex size-11 items-center justify-center border border-border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        <ArrowUpIcon className="size-4" aria-hidden />
      </button>
    </motion.div>
  )
}

export { BackToTop }
