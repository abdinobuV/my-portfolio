"use client"

import * as React from "react"
import { useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"
import { Canvas } from "@react-three/fiber"

import { Constellation } from "@/components/three/hero-scene"
import { cn } from "cn"

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    )
  } catch {
    return false
  }
}

function HeroFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("hero-webgl-fallback pointer-events-none", className)}
    />
  )
}

function HeroCanvas({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [inView, setInView] = React.useState(true)
  const [webglOk] = React.useState(() =>
    typeof document === "undefined" ? true : isWebGLAvailable()
  )

  React.useEffect(() => {
    const el = wrapperRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isDark = resolvedTheme === "dark"
  // Palet amber yang sama dengan ramp chart, supaya constellation di hero
  // dan peta keterampilan di section Keilikian terasa satu keluarga.
  const pointColor = isDark ? "#efae7c" : "#b26417"
  const lineColor = isDark ? "#da915f" : "#b26417"

  if (reduceMotion || !webglOk) {
    return (
      <div ref={wrapperRef} aria-hidden className={cn("absolute inset-0", className)}>
        <HeroFallback className="absolute inset-0" />
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={cn("hero-webgl pointer-events-none absolute inset-0", className)}
    >
      {inView ? (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
            stencil: false,
          }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Constellation pointColor={pointColor} lineColor={lineColor} />
        </Canvas>
      ) : (
        <HeroFallback className="absolute inset-0" />
      )}
    </div>
  )
}

export { HeroCanvas }
