"use client"

import * as React from "react"
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion"

import { Reveal } from "@/components/animations/reveal"
import { timeline } from "@/content/timeline"
import { cn } from "cn"

const kindLabel: Record<string, string> = {
  kerja: "Kerja",
  pendidikan: "Pendidikan",
  kursus: "Kursus",
}

function KindChip({ kind }: { kind: string }) {
  return (
    <span
      className={cn(
        "border border-border px-2 py-0.5 text-[0.625rem] font-semibold tracking-widest uppercase",
        kind === "kerja" && "text-foreground",
        kind !== "kerja" && "text-muted-foreground"
      )}
    >
      {kindLabel[kind]}
    </span>
  )
}

function JourneyCard({ item }: { item: (typeof timeline)[number] }) {
  return (
    <article className="flex w-[24rem] shrink-0 flex-col border border-border bg-card p-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {item.period}
        </p>
        <KindChip kind={item.kind} />
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold tracking-wide md:text-2xl">
        {item.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed">{item.description}</p>
    </article>
  )
}

function VerticalJourney() {
  return (
    <Reveal>
      <ol className="relative space-y-0 border-l border-border">
        {timeline.map((item, index) => (
          <li key={index} className="relative pb-10 pl-6 last:pb-0 md:pl-8">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[5px] size-2.5 bg-foreground"
            />
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {item.period}
              </p>
              <KindChip kind={item.kind} />
            </div>
            <h3 className="mt-2 font-heading text-lg font-semibold tracking-wide">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.org}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const opacity = useTransform(progress, (v) => {
    const start = index / total
    const end = (index + 1) / total
    const isLast = index === total - 1
    if (isLast) return v >= start ? 1 : 0.3
    return v >= start && v < end ? 1 : 0.3
  })
  return (
    <motion.span style={{ opacity }} className="block size-1.5 bg-foreground" />
  )
}

function HorizontalTrack() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const frameRef = React.useRef<HTMLDivElement | null>(null)
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const rangeEnd = useMotionValue(0)
  const x = useTransform(
    [scrollYProgress, rangeEnd],
    ([p, end]: number[]) => -end * p
  )

  React.useEffect(() => {
    const outer = ref.current
    const frame = frameRef.current
    const track = trackRef.current
    if (!outer || !frame || !track) return

    const update = () => {
      const cs = getComputedStyle(frame)
      const contentW =
        frame.clientWidth -
        (parseFloat(cs.paddingLeft) || 0) -
        (parseFloat(cs.paddingRight) || 0)
      const overflow = Math.max(0, track.scrollWidth - contentW + 48)
      rangeEnd.set(overflow)
      // pin height = travel + viewport so scroll progress maps 1:1 to x
      outer.style.height = `${Math.round(overflow + window.innerHeight)}px`
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(track)
    ro.observe(frame)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [rangeEnd])

  return (
    <div ref={ref} className="journey-pin relative h-[220svh]">
      <div className="sticky top-20 flex h-[calc(100svh-6rem)] flex-col justify-center">
        <div
          ref={frameRef}
          className="mx-auto w-full max-w-5xl overflow-hidden px-6 md:px-10 lg:px-16"
        >
          <motion.div
            ref={trackRef}
            className="flex gap-4 pb-6 md:gap-6"
            style={{ x }}
          >
            {timeline.map((item, index) => (
              <JourneyCard key={index} item={item} />
            ))}
          </motion.div>

          <div className="mt-2 flex items-center gap-4">
            <div className="h-px flex-1 bg-border">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-px origin-left bg-foreground"
              />
            </div>
            <div className="flex gap-1.5" aria-hidden>
              {timeline.map((_, i) => (
                <ProgressDot
                  key={i}
                  index={i}
                  total={timeline.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              01 — {String(timeline.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function JourneyHorizontal() {
  return (
    <section
      id="perjalanan"
      aria-labelledby="journey-heading"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-6 pt-20 md:px-10 md:pt-28 lg:px-16">
        <Reveal className="mb-6 md:mb-10">
          <div className="mb-4 flex items-baseline gap-4 border-b border-border pb-3">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              04
            </span>
            <h2
              id="journey-heading"
              className="font-heading text-2xl font-semibold tracking-wide uppercase md:text-3xl"
            >
              Perjalanan
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Ringkasan jalur pendidikan dan latar belakang akademik.
          </p>
        </Reveal>
        <p className="journey-hint hidden max-w-2xl text-sm leading-relaxed text-muted-foreground lg:block lg:text-base">
          Gulir untuk menelusuri pengalaman secara horizontal.
        </p>
      </div>

      <div className="journey-horizontal hidden lg:block">
        <HorizontalTrack />
      </div>

      <div className="journey-vertical mx-auto w-full max-w-5xl px-6 pt-10 pb-20 md:px-10 md:pb-28 lg:px-16">
        <VerticalJourney />
      </div>
    </section>
  )
}

export { JourneyHorizontal }
