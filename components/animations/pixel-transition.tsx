"use client"

import * as React from "react"
import Image from "next/image"
import { useReducedMotion } from "framer-motion"

import { cn } from "cn"

type PixelTransitionProps = {
  photos: readonly { src: string; alt: string }[]
  /** Sisi grid piksel per sumbu (gridSize x gridSize sel). */
  gridSize?: number
  /** Durasi satu fase animasi dalam detik (muncul / hilang). */
  duration?: number
  /** Label untuk pembaca layar. */
  label?: string
  /** Teks petunjuk kecil di bawah foto (opsional). */
  hint?: string
  className?: string
  buttonClassName?: string
}

function makeDelays(count: number, span: number) {
  return Array.from({ length: count }, () => Math.random() * span)
}

function PixelTransition({
  photos,
  gridSize = 12,
  duration = 0.4,
  label = "Ganti foto profil",
  hint,
  className,
  buttonClassName,
}: PixelTransitionProps) {
  const reduceMotion = useReducedMotion()
  const hintId = React.useId()
  const [index, setIndex] = React.useState(0)
  const [phase, setPhase] = React.useState<"idle" | "cover" | "reveal">("idle")
  const [delays, setDelays] = React.useState<number[]>([])
  const busy = React.useRef(false)
  const timers = React.useRef<number[]>([])

  React.useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => clearTimeout(id))
  }, [])

  function toggle() {
    if (busy.current || photos.length < 2) return

    const next = (index + 1) % photos.length

    if (reduceMotion) {
      setIndex(next)
      return
    }

    busy.current = true
    const step = Math.min(0.1, duration)
    setDelays(makeDelays(gridSize * gridSize, Math.max(duration - step, 0)))
    setPhase("cover")

    timers.current.push(
      window.setTimeout(() => {
        setIndex(next)
        setPhase("reveal")
      }, duration * 1000)
    )
    timers.current.push(
      window.setTimeout(() => {
        setPhase("idle")
        busy.current = false
        timers.current.length = 0
      }, duration * 2000)
    )
  }

  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-describedby={hint ? hintId : undefined}
        title={label}
        className={cn(
          "group relative block aspect-square shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-border bg-card transition-colors outline-none hover:border-foreground/40",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          buttonClassName
        )}
      >
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={i === index ? photo.alt : ""}
            aria-hidden={i !== index}
            width={640}
            height={640}
            sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {phase !== "idle" ? (
          <span
            key={`${phase}-${delays.length}-${index}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {delays.map((delay, i) => (
              <span
                key={i}
                className={
                  phase === "cover" ? "pixel pixel--in" : "pixel pixel--out"
                }
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </span>
        ) : null}
      </button>

      {hint ? (
        <span
          id={hintId}
          className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase"
        >
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export { PixelTransition }
