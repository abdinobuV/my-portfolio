"use client"

import * as React from "react"
import { motion, useScroll } from "framer-motion"
import { MailIcon } from "lucide-react"

import { profile } from "@/content/profile"
import { motionTheme } from "@/motion.theme"

function StickyCta() {
  const [scrolled, setScrolled] = React.useState(false)
  const [inContact, setInContact] = React.useState(false)
  const [inFooter, setInFooter] = React.useState(false)
  const { scrollY } = useScroll()

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 480)
    })
    return () => unsubscribe()
  }, [scrollY])

  React.useEffect(() => {
    const kontak = document.getElementById("kontak")
    const footer = document.querySelector("footer")

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === "kontak") {
            setInContact(entry.isIntersecting)
          } else {
            setInFooter(entry.isIntersecting)
          }
        }
      },
      { threshold: 0.2 }
    )

    if (kontak) observer.observe(kontak)
    if (footer) observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !inContact && !inFooter

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 16,
      }}
      transition={motionTheme.transitions.ui}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="sticky-cta fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 md:hidden"
      aria-hidden={!visible}
    >
      <a
        href={`mailto:${profile.email}`}
        tabIndex={visible ? 0 : -1}
        className="flex min-h-11 items-center justify-center gap-2 border border-border bg-background/95 px-4 py-3 text-xs font-semibold tracking-widest uppercase shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80"
      >
        Terbuka untuk kerja
        <MailIcon className="size-4" aria-hidden />
      </a>
    </motion.div>
  )
}

export { StickyCta }
