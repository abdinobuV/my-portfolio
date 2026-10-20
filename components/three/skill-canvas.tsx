"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"

import {
  SkillScene,
  type SkillSceneColors,
} from "@/components/three/skill-scene"
import type { SkillGraph } from "@/lib/skill-graph"

export type SkillCanvasProps = {
  graph: SkillGraph
  activeGroup: string | null
  hoveredId: string | null
  selectedId: string | null
  colors: SkillSceneColors
  cameraDistance: number
  labelRefs: React.RefObject<(HTMLElement | null)[]>
  onHover: (id: string | null) => void
  onSelect: (id: string | null) => void
}

/**
 * Modul ini di-import dinamis dari `skills-map.tsx` supaya three.js tetap
 * lazy — tidak ikut masuk ke initial load halaman.
 */
function SkillCanvas({
  graph,
  activeGroup,
  hoveredId,
  selectedId,
  colors,
  cameraDistance,
  labelRefs,
  onHover,
  onSelect,
}: SkillCanvasProps) {
  const pointerInside = React.useRef(true)

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
        stencil: false,
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onPointerEnter={() => {
        pointerInside.current = true
      }}
      onPointerLeave={() => {
        pointerInside.current = false
        onHover(null)
      }}
      onPointerMissed={() => onSelect(null)}
    >
      <SkillScene
        graph={graph}
        activeGroup={activeGroup}
        hoveredId={hoveredId}
        selectedId={selectedId}
        colors={colors}
        cameraDistance={cameraDistance}
        labelRefs={labelRefs}
        onHover={onHover}
        onSelect={onSelect}
        pointerInside={pointerInside}
      />
    </Canvas>
  )
}

export { SkillCanvas }
