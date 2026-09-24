"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowDownRightIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { Badge } from "@/components/ui/badge"

function Hero() {
  const reduceMotion = useReducedMotion()

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section
      id="atas"
      aria-labelledby="hero-heading"
      className="px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div {...rise(0)} className="mb-6 flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="border-border px-2 py-1">
            Portfolio / {new Date().getFullYear()}
          </Badge>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {profile.location}
          </span>
        </motion.div>

        <motion.h1
          id="hero-heading"
          {...rise(0.08)}
          className="font-heading max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          <span className="font-semibold text-foreground">{profile.role}.</span>{" "}
          {profile.tagline}
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#proyek">
              Lihat proyek
              <ArrowDownRightIcon />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={profile.cvUrl} download>
              Unduh CV
              <FileTextIcon />
            </a>
          </Button>
        </motion.div>

        <motion.div
          {...rise(0.34)}
          className="mt-16 grid grid-cols-2 gap-px border border-border bg-border md:mt-20 md:grid-cols-4"
        >
          {profile.stats.map((stat) => (
            <div key={stat.label} className="bg-background px-4 py-5 md:px-5">
              <p className="font-heading text-2xl font-semibold md:text-3xl">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { Hero }
