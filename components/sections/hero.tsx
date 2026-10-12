"use client"

import { motion, useReducedMotion } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowRightIcon, MailIcon } from "lucide-react"
import { siGithub } from "simple-icons"

import { Button } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { Magnetic } from "@/components/animations/magnetic"
import { MicroTilt } from "@/components/animations/micro-tilt"
import { StaggerText } from "@/components/animations/stagger-text"
import { PixelTransition } from "@/components/animations/pixel-transition"
import { TechIcon } from "@/components/tech-icon"
import { linkedinIcon } from "@/components/icons/linkedin"
import { techIconByLabel } from "@/content/technologies"
import { motionTheme } from "@/motion.theme"

const HeroCanvas = dynamic(
  () => import("@/components/three/hero-canvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
)

function SocialIcon({
  kind,
}: {
  kind: (typeof profile.socials)[number]["icon"]
}) {
  if (kind === "github") return <TechIcon icon={siGithub} size={18} />
  if (kind === "linkedin") return <TechIcon icon={linkedinIcon} size={18} />
  return <MailIcon aria-hidden size={18} />
}

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
      className="relative overflow-hidden px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28 lg:px-16"
    >
      <HeroCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div {...rise(0)} className="flex items-center gap-4 sm:gap-6">
          <MicroTilt strength={4} className="inline-block shrink-0">
            <PixelTransition
              photos={profile.photos}
              buttonClassName="size-32 sm:size-36 md:size-40"
            />
          </MicroTilt>
          <div className="flex min-w-0 flex-col justify-center gap-2.5">
            <h1
              id="hero-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
            >
              <StaggerText text={profile.name} delay={0.08} as="span" />
            </h1>
            <div className="flex items-center gap-4">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="inline-flex text-muted-foreground opacity-70 transition-all hover:-translate-y-0.5 hover:text-foreground hover:opacity-100"
                >
                  <SocialIcon kind={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.h2
          {...rise(0.15)}
          className="mt-6 max-w-3xl text-[1.7rem] leading-tight font-normal tracking-tight text-balance sm:text-[2.05rem] md:text-[2.15rem]"
        >
          {profile.role}{" "}
          <span className="text-[0.95em] font-light text-muted-foreground">
            — {profile.focus}
          </span>
        </motion.h2>

        <motion.p
          {...rise(0.25)}
          className="mt-5 max-w-2xl text-base leading-7 font-light text-muted-foreground sm:text-lg sm:leading-8"
        >
          {profile.heroBio.map((segment, index) =>
            segment.type === "chip" ? (
              <span
                key={index}
                className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-1 align-middle text-xs text-foreground/80 sm:px-2.5 sm:text-sm"
              >
                {techIconByLabel[segment.value] ? (
                  <TechIcon icon={techIconByLabel[segment.value]} size={14} />
                ) : null}
                {segment.value}
              </span>
            ) : (
              <span key={index}>
                {index > 0 ? " " : null}
                {segment.value}
              </span>
            )
          )}
        </motion.p>

        <motion.div {...rise(0.35)} className="mt-8">
          <Magnetic strength={8}>
            <Button asChild size="lg">
              <a href={profile.cvUrl} download>
                Unduh CV
                <ArrowRightIcon />
              </a>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}

export { Hero }
