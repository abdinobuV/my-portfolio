"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowDownRightIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { Badge } from "@/components/ui/badge"
import { Magnetic } from "@/components/animations/magnetic"
import { MicroTilt } from "@/components/animations/micro-tilt"
import { StaggerText } from "@/components/animations/stagger-text"
import { Parallax } from "@/components/animations/parallax"
import { PixelTransition } from "@/components/animations/pixel-transition"
import { motionTheme } from "@/motion.theme"

function Hero() {
  const reduceMotion = useReducedMotion()

  const rise = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            ...motionTheme.transitions.gentle,
            delay,
          },
        }

  return (
    <section
      id="atas"
      aria-labelledby="hero-heading"
      className="px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          {...rise(0)}
          className="mb-6 flex items-center gap-4 sm:gap-6"
        >
          <MicroTilt strength={4} className="inline-block">
            <PixelTransition
              photos={profile.photos}
              hint="Klik foto untuk ganti"
              buttonClassName="size-24 sm:size-28 md:size-32"
            />
          </MicroTilt>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-border px-2 py-1">
              Portfolio / {profile.year}
            </Badge>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {profile.location}
            </span>
          </div>
        </motion.div>

        <h1
          id="hero-heading"
          className="max-w-none font-heading text-[clamp(2.25rem,10vw,3rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          <StaggerText text={profile.name} delay={0.08} as="span" />
        </h1>

        <motion.p
          {...rise(0.2)}
          className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          <span className="font-semibold text-foreground">{profile.role}.</span>{" "}
          {profile.tagline}
        </motion.p>

        <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap gap-3">
          <Magnetic strength={8}>
            <Button asChild size="lg">
              <a href="#proyek">
                Lihat proyek
                <ArrowDownRightIcon />
              </a>
            </Button>
          </Magnetic>
          <Magnetic strength={5}>
            <Button asChild variant="outline" size="lg">
              <a href={profile.cvUrl} download>
                Unduh CV
                <FileTextIcon />
              </a>
            </Button>
          </Magnetic>
        </motion.div>

        <Parallax offset={24} className="mt-16 md:mt-20">
          <MicroTilt strength={8}>
            <motion.div
              {...rise(0.42)}
              className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4"
            >
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background px-4 py-5 md:px-5"
                >
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
          </MicroTilt>
        </Parallax>
      </div>
    </section>
  )
}

export { Hero }
