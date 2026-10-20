"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"

import { buildSkillGraph } from "@/lib/skill-graph"
import { skillGroups } from "@/content/skills"
import { skillLinks } from "@/content/skill-graph"
import type { SkillSceneColors } from "@/components/three/skill-scene"
import { cn } from "cn"

const SkillCanvas = dynamic(
  () =>
    import("@/components/three/skill-canvas").then((mod) => mod.SkillCanvas),
  { ssr: false }
)

/** Lebar minimal (px) sebelum peta 3D ditampilkan. Di bawah ini, daftar biasa. */
const MIN_WIDTH = 1024

const LIGHT_COLORS: SkillSceneColors = {
  idle: "#b26417",
  active: "#925000",
  highlight: "#5e3905",
  edge: "#b26417",
  crossEdge: "#925000",
  grid: "#b26417",
  // Di latar krem, garis perlu lebih pekat supaya tetap >= 3:1.
  edgeOpacity: 0.75,
  crossEdgeOpacity: 0.8,
  gridOpacity: 0.3,
}

const DARK_COLORS: SkillSceneColors = {
  idle: "#da915f",
  active: "#efae7c",
  highlight: "#f6d5b0",
  edge: "#da915f",
  crossEdge: "#efae7c",
  grid: "#da915f",
  edgeOpacity: 0.55,
  crossEdgeOpacity: 0.6,
  gridOpacity: 0.25,
}

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

let webglSupport: boolean | null = null

function getWebGLSupport() {
  if (webglSupport === null) webglSupport = isWebGLAvailable()
  return webglSupport
}

function subscribeWebGL() {
  return () => {}
}

function getWebGLServerSnapshot() {
  return false
}

let viewportMedia: MediaQueryList | null = null

function getViewportMedia() {
  if (!viewportMedia) {
    viewportMedia = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`)
  }
  return viewportMedia
}

function subscribeViewport(onChange: () => void) {
  const media = getViewportMedia()
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function getViewportSnapshot() {
  return getViewportMedia().matches
}

function getViewportServerSnapshot() {
  return false
}

export type SkillsMapProps = {
  /** Grup yang sedang aktif — dipakai untuk menyorot node yang terkait. */
  activeGroup: string | null
  /** Callback saat grup berubah lewat peta 3D. */
  onActiveGroupChange: (groupId: string) => void
}

function SkillsMap({ activeGroup, onActiveGroupChange }: SkillsMapProps) {
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const stageRef = React.useRef<HTMLDivElement>(null)
  const labelRefs = React.useRef<(HTMLElement | null)[]>([])

  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [cameraDistance, setCameraDistance] = React.useState(9)
  const [inView, setInView] = React.useState(false)

  // Dukungan WebGL hanya diketahui di browser. useSyncExternalStore menjaga
  // render pertama tetap identik dengan hasil server, lalu naik ke nilai
  // sebenarnya tanpa setState di dalam effect.
  const webglOk = React.useSyncExternalStore(
    subscribeWebGL,
    getWebGLSupport,
    getWebGLServerSnapshot
  )

  // likewise untuk lebar viewport.
  const wideEnough = React.useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getViewportServerSnapshot
  )

  const graph = React.useMemo(
    () => buildSkillGraph(skillGroups, skillLinks),
    []
  )

  const nodeById = React.useMemo(
    () => new Map(graph.nodes.map((node) => [node.id, node])),
    [graph]
  )
  const groupById = React.useMemo(
    () => new Map(skillGroups.map((group) => [group.id, group])),
    []
  )

  const colors = resolvedTheme === "dark" ? DARK_COLORS : LIGHT_COLORS

  // --- Gerbang: canvas hanya hidup saat section masuk viewport ------------
  React.useEffect(() => {
    const element = stageRef.current
    if (!element || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin: "200px" }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const enabled = webglOk && wideEnough && !reduceMotion && inView

  const handleHover = React.useCallback((id: string | null) => {
    setHoveredId(id)
  }, [])

  const handleSelect = React.useCallback(
    (id: string | null) => {
      setSelectedId(id)
      if (!id) return
      const node = nodeById.get(id)
      if (node && node.groupId !== activeGroup) {
        onActiveGroupChange(node.groupId)
      }
    },
    [activeGroup, nodeById, onActiveGroupChange]
  )

  const hoveredNode = hoveredId ? nodeById.get(hoveredId) : undefined
  const focusNode = hoveredNode ?? (selectedId ? nodeById.get(selectedId) : undefined)
  const focusGroup = focusNode ? groupById.get(focusNode.groupId) : undefined

  return (
    <div className="relative">
      <div
        ref={stageRef}
        className="relative h-[420px] w-full overflow-hidden border border-border bg-card/40 md:h-[480px]"
      >
        {enabled ? (
          <SkillCanvas
            graph={graph}
            activeGroup={activeGroup}
            hoveredId={hoveredId}
            selectedId={selectedId}
            colors={colors}
            cameraDistance={cameraDistance}
            labelRefs={labelRefs}
            onHover={handleHover}
            onSelect={handleSelect}
          />
        ) : null}

        {/* Label hub mengikuti posisi node di ruang 3D. */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {graph.hubs.map((hub, index) => (
            <span
              key={hub.id}
              ref={(element) => {
                labelRefs.current[index] = element
              }}
              className={cn(
                "absolute left-0 top-0 whitespace-nowrap border border-border bg-background/85 px-1.5 py-0.5 font-mono text-[0.625rem] tracking-widest uppercase",
                "text-muted-foreground"
              )}
            >
              {groupById.get(hub.id)?.shortLabel ?? hub.name}
            </span>
          ))}
        </div>

        {/* Kontrol zoom */}
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              setCameraDistance((value) => Math.min(13, value + 1.5))
            }
            aria-label="Perkecil peta 3D"
            className="flex size-8 items-center justify-center border border-border bg-background/80 text-sm leading-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/70"
          >
            −
          </button>
          <button
            type="button"
            onClick={() =>
              setCameraDistance((value) => Math.max(6.5, value - 1.5))
            }
            aria-label="Perbesar peta 3D"
            className="flex size-8 items-center justify-center border border-border bg-background/80 text-sm leading-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/70"
          >
            +
          </button>
        </div>
      </div>

      {/* Tooltip node yang disorot */}
      <div className="pointer-events-none mt-3 min-h-5">
        {focusNode ? (
          <p className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
            {focusNode.name} · {focusNode.level}% ·{" "}
            {focusGroup?.shortLabel ?? ""}
          </p>
        ) : (
          <p className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
            {enabled
              ? "Seret untuk memutar — klik node untuk melihat detail"
              : "Peta 3D tampil di layar lebar dengan WebGL aktif"}
          </p>
        )}
      </div>
    </div>
  )
}

export { SkillsMap }
