"use client"

import * as React from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"

import { mulberry32 } from "@/lib/random"

type ConstellationProps = {
  pointColor: string
  lineColor: string
  densityScale?: number
}

function buildConstellation(count: number, spread: [number, number, number]) {
  // PRNG ber-seed supaya komposisi tetap sama tiap muat. Dengan Math.random,
  // konstelasi berubah-ubah setiap kali viewport berubah — untuk hero itu
  // terasa seperti "reset", bukan animasi.
  const rand = mulberry32(20260101)
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * spread[0]
    positions[i * 3 + 1] = (rand() - 0.5) * spread[1]
    positions[i * 3 + 2] = (rand() - 0.5) * spread[2]
  }

  const threshold = 2.1
  const linePositions: number[] = []
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < threshold * threshold) {
        linePositions.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2]
        )
      }
    }
  }

  return { positions, linePositions: new Float32Array(linePositions) }
}

function Constellation({
  pointColor,
  lineColor,
  densityScale = 1,
}: ConstellationProps) {
  const groupRef = React.useRef<THREE.Group>(null)
  const { size } = useThree()

  const { pointGeometry, lineGeometry } = React.useMemo(() => {
    const isMobile = size.width < 640
    const count = Math.round((isMobile ? 60 : 120) * densityScale)
    const spread: [number, number, number] =
      size.width / Math.max(size.height, 1) > 1.2
        ? [11, 6, 4]
        : [7, 7, 4]
    const { positions, linePositions } = buildConstellation(count, spread)

    const pointGeometry = new THREE.BufferGeometry()
    pointGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    )
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    )
    return { pointGeometry, lineGeometry }
  }, [size.width, size.height, densityScale])

  React.useEffect(() => {
    return () => {
      pointGeometry.dispose()
      lineGeometry.dispose()
    }
  }, [pointGeometry, lineGeometry])

  const pointerTarget = React.useRef({ x: 0, y: 0 })
  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    const clampedDelta = Math.min(delta, 0.05)

    pointerTarget.current.x +=
      (state.pointer.x * 0.28 - pointerTarget.current.x) * 0.04
    pointerTarget.current.y +=
      (state.pointer.y * 0.2 - pointerTarget.current.y) * 0.04

    group.rotation.y += clampedDelta * 0.03 + pointerTarget.current.x * 0.002
    group.rotation.x =
      Math.sin(t * 0.08) * 0.06 + -pointerTarget.current.y * 0.4
    group.position.y = Math.sin(t * 0.25) * 0.08
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointGeometry}>
        <pointsMaterial
          color={pointColor}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export { Constellation }
