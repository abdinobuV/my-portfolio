"use client"

import * as React from "react"
import { motion, useScroll } from "framer-motion"
import { MailIcon } from "lucide-react"

import { profile } from "@/content/profile"
import { motionTheme } from "@/motion.theme"

function StickyCta() {
  const [scrolled, setScrolled] = React.useState(false)
  const [inContact, setInContact] = React.useState(false)
  const { scrollY } = useScroll()

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 480)
    })
    return () => unsubscribe()
  }, [scrollY])

  React.useEffect(() => {
    const el = document.getElementById("kontak")
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInContact(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !inContact

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
      }}
      transition={motionTheme.transitions.ui}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="sticky-cta fixed inset-x-4 bottom-4 z-40 md:hidden"
      aria-hidden={!visible}
    >
      <a
        href={`mailto:${profile.email}`}
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center gap-2 border border-border bg-background/95 px-4 py-3 text-xs font-semibold tracking-widest uppercase shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        Terbuka untuk kerja
        <MailIcon className="size-4" aria-hidden />
      </a>
    </motion.div>
  )
}

export { StickyCta }
