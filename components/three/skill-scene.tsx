/* eslint-disable react-hooks/immutability --
 * three.js dan R3F sengaja mutable: objek three diubah langsung di dalam
 * useFrame (rotasi group, posisi kamera, uniform shader). Aturan React
 * Compiler tidak berlaku untuk kode 3D imperative seperti ini — renderer
 * R3F yang memiliki siklus render-nya, bukan React. */
"use client"

import * as React from "react"
import * as THREE from "three"
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber"

import type { SkillGraph, SkillNode } from "@/lib/skill-graph"

export type SkillSceneColors = {
  /** Warna node biasa. */
  idle: string
  /** Warna node milik grup yang sedang aktif. */
  active: string
  /** Warna node yang sedang disorot atau dipilih. */
  highlight: string
  /** Warna garis hub -> skill. */
  edge: string
  /** Warna garis penghubung antar grup. */
  crossEdge: string
  /** Warna grid lingkaran. */
  grid: string
  /** Opasitas garis hub -> skill. */
  edgeOpacity: number
  /** Opasitas garis penghubung antar grup. */
  crossEdgeOpacity: number
  /** Opasitas grid lingkaran. */
  gridOpacity: number
}

export type SkillSceneProps = {
  graph: SkillGraph
  /** Id grup yang aktif (tab terpilih). */
  activeGroup: string | null
  /** Id node yang sedang disorot. */
  hoveredId: string | null
  /** Id node yang dipilih. */
  selectedId: string | null
  colors: SkillSceneColors
  /** Jarak kamera — dikendalikan dari luar lewat tombol zoom. */
  cameraDistance: number
  /** Referensi elemen label hub, diisi posisi tiap frame. */
  labelRefs: React.RefObject<(HTMLElement | null)[]>
  /** Dipanggil saat node disorot berubah. */
  onHover: (id: string | null) => void
  /** Dipanggil saat node diklik. */
  onSelect: (id: string | null) => void
  /** true saat kursor berada di atas canvas. */
  pointerInside: React.RefObject<boolean>
}

const NODE_STATE = {
  idle: 0,
  active: 1,
  faded: 2,
  highlight: 3,
} as const

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aState;
  varying float vState;
  uniform float uScale;
  uniform float uBoost;

  void main() {
    vState = aState;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float size = aSize * uBoost * uScale / max(0.001, -mv.z);
    if (vState > 2.5) size *= 1.35;
    gl_PointSize = max(2.0, size);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  varying float vState;
  uniform vec3 uIdle;
  uniform vec3 uActive;
  uniform vec3 uHighlight;

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;

    float body = smoothstep(0.5, 0.12, d);
    float core = smoothstep(0.24, 0.0, d);

    vec3 color = uIdle;
    float alpha = 0.55;
    if (vState > 2.5) {
      color = uHighlight;
      alpha = 1.0;
    } else if (vState > 1.5) {
      color = uIdle;
      alpha = 0.14;
    } else if (vState > 0.5) {
      color = uActive;
      alpha = 0.9;
    }

    float outAlpha = body * alpha + core * 0.45;
    if (outAlpha < 0.01) discard;
    gl_FragColor = vec4(color, clamp(outAlpha, 0.0, 1.0));
  }
`

function buildGrid(radii: number[], segments: number) {
  const points: number[] = []
  for (const radius of radii) {
    for (let i = 0; i < segments; i++) {
      const a1 = (i / segments) * Math.PI * 2
      const a2 = ((i + 1) / segments) * Math.PI * 2
      points.push(
        Math.cos(a1) * radius,
        Math.sin(a1) * radius,
        0,
        Math.cos(a2) * radius,
        Math.sin(a2) * radius,
        0
      )
    }
  }
  const outer = radii[radii.length - 1] ?? 1
  const spokes = 8
  for (let i = 0; i < spokes; i++) {
    const a = (i / spokes) * Math.PI * 2
    points.push(0, 0, 0, Math.cos(a) * outer, Math.sin(a) * outer, 0)
  }
  return new Float32Array(points)
}

/**
 * Memproyeksikan node ke layar lalu mencari yang terdekat dengan pointer.
 * Lebih memaafkan daripada raycast, jadi node kecil tetap gampang ditunjuk.
 */
function pickNodeAt(
  nodes: SkillNode[],
  camera: THREE.Camera,
  ndcX: number,
  ndcY: number,
  maxDistance = 0.055
): SkillNode | null {
  const vector = new THREE.Vector3()
  let best: SkillNode | null = null
  let bestDistance = maxDistance

  for (const node of nodes) {
    vector.set(...node.position).project(camera)
    if (vector.z > 1) continue
    const dx = vector.x - ndcX
    const dy = vector.y - ndcY
    const distance = Math.hypot(dx, dy)
    if (distance < bestDistance) {
      bestDistance = distance
      best = node
    }
  }

  return best
}

function SkillScene({
  graph,
  activeGroup,
  hoveredId,
  selectedId,
  colors,
  cameraDistance,
  labelRefs,
  onHover,
  onSelect,
  pointerInside,
}: SkillSceneProps) {
  const { camera, size, clock, raycaster } = useThree()
  const groupRef = React.useRef<THREE.Group>(null)
  const gridRef = React.useRef<THREE.LineSegments>(null)
  const rotation = React.useRef({ x: 0.18, y: 0 })
  const lastInteraction = React.useRef(-Infinity)
  const reportedHover = React.useRef<string | null>(null)
  const suppressClick = React.useRef(false)
  const drag = React.useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    moved: 0,
  })

  // --- Geometri node -----------------------------------------------------
  const { pointGeometry, hubGeometry } = React.useMemo(() => {
    const skillPositions = new Float32Array(graph.skillNodes.length * 3)
    const skillSizes = new Float32Array(graph.skillNodes.length)
    graph.skillNodes.forEach((node, index) => {
      skillPositions.set(node.position, index * 3)
      skillSizes[index] = node.radius
    })

    const hubPositions = new Float32Array(graph.hubs.length * 3)
    const hubSizes = new Float32Array(graph.hubs.length)
    graph.hubs.forEach((hub, index) => {
      hubPositions.set(hub.position, index * 3)
      hubSizes[index] = hub.radius
    })

    const build = (
      positions: Float32Array,
      radii: Float32Array
    ): THREE.BufferGeometry => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("aSize", new THREE.BufferAttribute(radii, 1))
      geometry.setAttribute(
        "aState",
        new THREE.BufferAttribute(new Float32Array(radii.length), 1)
      )
      return geometry
    }

    return {
      pointGeometry: build(skillPositions, skillSizes),
      hubGeometry: build(hubPositions, hubSizes),
    }
  }, [graph])

  // --- Geometri garis ----------------------------------------------------
  const { groupEdges, crossEdges } = React.useMemo(() => {
    const group: { a: THREE.Vector3; b: THREE.Vector3; groupId: string }[] = []
    const cross: { a: THREE.Vector3; b: THREE.Vector3 }[] = []
    const byId = new Map(graph.nodes.map((node) => [node.id, node]))

    for (const edge of graph.edges) {
      const from = byId.get(edge.from)
      const to = byId.get(edge.to)
      if (!from || !to) continue
      const a = new THREE.Vector3(...from.position)
      const b = new THREE.Vector3(...to.position)
      if (edge.kind === "cross") {
        cross.push({ a, b })
      } else {
        group.push({ a, b, groupId: to.groupId })
      }
    }

    return { groupEdges: group, crossEdges: cross }
  }, [graph])

  const makeEdgeGeometry = React.useCallback(
    (edges: { a: THREE.Vector3; b: THREE.Vector3 }[]) => {
      const positions = new Float32Array(edges.length * 6)
      const colors = new Float32Array(edges.length * 6)
      edges.forEach((edge, index) => {
        positions.set([edge.a.x, edge.a.y, edge.a.z], index * 6)
        positions.set([edge.b.x, edge.b.y, edge.b.z], index * 6 + 3)
      })
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      return geometry
    },
    []
  )

  const groupEdgeGeometry = React.useMemo(
    () => makeEdgeGeometry(groupEdges),
    [groupEdges, makeEdgeGeometry]
  )
  const crossEdgeGeometry = React.useMemo(
    () => makeEdgeGeometry(crossEdges),
    [crossEdges, makeEdgeGeometry]
  )

  const gridGeometry = React.useMemo(
    () =>
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.BufferAttribute(buildGrid([1.3, 2.1, 2.9], 96), 3)
      ),
    []
  )

  // --- Material ----------------------------------------------------------
  const { pointMaterial, hubMaterial } = React.useMemo(() => {
    const make = () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uScale: { value: 600 },
          uBoost: { value: 4.6 },
          uIdle: { value: new THREE.Color("#b26417") },
          uActive: { value: new THREE.Color("#925000") },
          uHighlight: { value: new THREE.Color("#5e3905") },
        },
      })
    return { pointMaterial: make(), hubMaterial: make() }
  }, [])

  const groupEdgeMaterial = React.useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      }),
    []
  )
  const crossEdgeMaterial = React.useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#b26417"),
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      }),
    []
  )
  const gridMaterial = React.useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#b26417"),
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      }),
    []
  )

  // --- Sinkronisasi warna ------------------------------------------------
  React.useEffect(() => {
    const idle = new THREE.Color(colors.idle)
    const active = new THREE.Color(colors.active)
    const highlight = new THREE.Color(colors.highlight)
    for (const material of [pointMaterial, hubMaterial]) {
      material.uniforms.uIdle.value.copy(idle)
      material.uniforms.uActive.value.copy(active)
      material.uniforms.uHighlight.value.copy(highlight)
    }
    crossEdgeMaterial.color.set(colors.crossEdge)
    gridMaterial.color.set(colors.grid)
    groupEdgeMaterial.opacity = colors.edgeOpacity
    crossEdgeMaterial.opacity = colors.crossEdgeOpacity
    gridMaterial.opacity = colors.gridOpacity
  }, [
    colors,
    pointMaterial,
    hubMaterial,
    groupEdgeMaterial,
    crossEdgeMaterial,
    gridMaterial,
  ])

  // --- State node --------------------------------------------------------
  React.useEffect(() => {
    const apply = (geometry: THREE.BufferGeometry, ids: string[]) => {
      const attribute = geometry.getAttribute(
        "aState"
      ) as THREE.BufferAttribute
      ids.forEach((id, index) => {
        let state: number = NODE_STATE.idle
        if (activeGroup) {
          const node = graph.nodes.find((item) => item.id === id)
          state =
            node && node.groupId === activeGroup
              ? NODE_STATE.active
              : NODE_STATE.faded
        }
        if (id === hoveredId || id === selectedId) {
          state = NODE_STATE.highlight
        }
        attribute.setX(index, state)
      })
      attribute.needsUpdate = true
    }

    apply(pointGeometry, graph.skillNodes.map((node) => node.id))
    apply(hubGeometry, graph.hubs.map((hub) => hub.id))
  }, [
    activeGroup,
    hoveredId,
    selectedId,
    graph,
    pointGeometry,
    hubGeometry,
  ])

  // --- Warna garis hub -> skill ------------------------------------------
  React.useEffect(() => {
    const attribute = groupEdgeGeometry.getAttribute(
      "color"
    ) as THREE.BufferAttribute
    const base = new THREE.Color(colors.edge)
    const bright = new THREE.Color(colors.active)
    const dim = base.clone().multiplyScalar(0.22)

    groupEdges.forEach((edge, index) => {
      const color = !activeGroup
        ? base
        : edge.groupId === activeGroup
          ? bright
          : dim
      color.toArray(attribute.array as Float32Array, index * 6)
      color.toArray(attribute.array as Float32Array, index * 6 + 3)
    })
    attribute.needsUpdate = true
  }, [activeGroup, groupEdges, groupEdgeGeometry, colors.edge, colors.active])

  // --- Raycast titik -----------------------------------------------------
  React.useEffect(() => {
    raycaster.params.Points = {
      ...raycaster.params.Points,
      threshold: 0.2,
    }
  }, [raycaster])

  // --- Kebersihan --------------------------------------------------------
  React.useEffect(() => {
    return () => {
      pointGeometry.dispose()
      hubGeometry.dispose()
      groupEdgeGeometry.dispose()
      crossEdgeGeometry.dispose()
      gridGeometry.dispose()
      pointMaterial.dispose()
      hubMaterial.dispose()
      groupEdgeMaterial.dispose()
      crossEdgeMaterial.dispose()
      gridMaterial.dispose()
    }
  }, [
    pointGeometry,
    hubGeometry,
    groupEdgeGeometry,
    crossEdgeGeometry,
    gridGeometry,
    pointMaterial,
    hubMaterial,
    groupEdgeMaterial,
    crossEdgeMaterial,
    gridMaterial,
  ])

  // --- Drag & putar ------------------------------------------------------
  // Pointer dicapture ke elemen canvas, jadi drag tetap jalan walau kursor
  // keluar dari area peta.
  const onPlanePointerDown = React.useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const target = event.target as HTMLElement | null
      target?.setPointerCapture(event.pointerId)
      drag.current = {
        active: true,
        lastX: event.clientX,
        lastY: event.clientY,
        moved: 0,
      }
      lastInteraction.current = clock.elapsedTime
    },
    [clock]
  )

  const onPlanePointerMove = React.useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const state = drag.current
      if (!state.active) return
      const dx = event.clientX - state.lastX
      const dy = event.clientY - state.lastY
      state.lastX = event.clientX
      state.lastY = event.clientY
      state.moved += Math.abs(dx) + Math.abs(dy)
      rotation.current.y += dx * 0.005
      rotation.current.x = Math.max(
        -0.9,
        Math.min(0.9, rotation.current.x + dy * 0.004)
      )
    },
    []
  )

  const onPlanePointerUp = React.useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      suppressClick.current = drag.current.moved > 6
      drag.current.active = false
      lastInteraction.current = clock.elapsedTime
      const target = event.target as HTMLElement | null
      if (target?.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId)
      }
    },
    [clock]
  )

  const onPointClick = React.useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (suppressClick.current) {
        suppressClick.current = false
        return
      }
      const index = event.index
      if (typeof index !== "number") return
      // Indeks 0..n-1 adalah skill, sisanya hub.
      const node =
        graph.skillNodes[index] ?? graph.hubs[index - graph.skillNodes.length]
      if (node) onSelect(node.id)
    },
    [graph, onSelect]
  )

  const onHubClick = React.useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (suppressClick.current) {
        suppressClick.current = false
        return
      }
      const index = event.index
      if (typeof index !== "number") return
      const hub = graph.hubs[index]
      // Id hub sama dengan id grupnya, jadi ini sekaligus menyorot tab.
      if (hub) onSelect(hub.id)
    },
    [graph, onSelect]
  )

  /**
   * Klik diproses dari node yang sedang disorot, bukan dari raycast terpisah.
   * Raycast titik punya toleransi jauh lebih ketat daripada-hover berbasis
   * koordinat layar, sehingga klik bisa meleset dari node yang terlihat
   * disorot. Dengan memakai state hover, klik selalu sesuai dengan yang
   * dilihat pengguna.
   */
  const onPlaneClick = React.useCallback(() => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    onSelect(reportedHover.current)
  }, [onSelect])

  // --- Loop --------------------------------------------------------------
  useFrame((state, delta) => {
    const clamped = Math.min(delta, 0.05)
    const group = groupRef.current

    if (group) {
      if (!drag.current.active) {
        // Rotasi pelan; berhenti saat dipakai, lanjut lagi setelah idle.
        if (state.clock.elapsedTime - lastInteraction.current > 2.5) {
          rotation.current.y += clamped * 0.03
        }
      }
      group.rotation.x += (rotation.current.x - group.rotation.x) * 0.12
      group.rotation.y += (rotation.current.y - group.rotation.y) * 0.12
    }

    if (gridRef.current) {
      gridRef.current.rotation.z += clamped * 0.012
    }

    camera.position.z += (cameraDistance - camera.position.z) * 0.1
    camera.lookAt(0, 0, 0)

    // Ukuran titik mengikuti tinggi viewport supaya proporsional.
    const scale = size.height / (2 * Math.tan((45 * Math.PI) / 360))
    pointMaterial.uniforms.uScale.value = scale
    hubMaterial.uniforms.uScale.value = scale

    // Hover: node terdekat dengan pointer (skill atau hub).
    // Saat kursor sudah keluar dari canvas, state.pointer masih berisi posisi
    // lama — tanpa penjaga ini node akan terus dianggap tersorot.
    const picked = pointerInside.current
      ? pickNodeAt(
          [...graph.skillNodes, ...graph.hubs],
          camera,
          state.pointer.x,
          state.pointer.y
        )
      : null
    const pickedId = picked?.id ?? null
    if (pickedId !== reportedHover.current) {
      reportedHover.current = pickedId
      onHover(pickedId)
    }

    // Posisi label hub mengikuti proyeksi kamera.
    groupRef.current?.updateMatrixWorld()
    const vector = new THREE.Vector3()
    graph.hubs.forEach((hub, index) => {
      const element = labelRefs.current?.[index]
      if (!element) return
      vector.set(...hub.position).project(camera)
      const x = (vector.x * 0.5 + 0.5) * size.width
      const y = (-vector.y * 0.5 + 0.5) * size.height
      element.style.transform = `translate3d(${x}px, ${y - 22}px, 0) translate(-50%, -50%)`
      element.style.opacity = vector.z > 1 ? "0" : "1"
    })
  })

  React.useEffect(() => {
    return () => {
      drag.current.active = false
    }
  }, [])

  return (
    <>
      {/* Grid diam sebagai rujukan; tidak ikut berputar dengan constellation. */}
      <lineSegments
        ref={gridRef}
        geometry={gridGeometry}
        material={gridMaterial}
        raycast={() => null}
      />
      <group ref={groupRef}>
        <lineSegments
          geometry={groupEdgeGeometry}
          material={groupEdgeMaterial}
          raycast={() => null}
        />
        <lineSegments
          geometry={crossEdgeGeometry}
          material={crossEdgeMaterial}
          raycast={() => null}
        />
        <points
          geometry={pointGeometry}
          material={pointMaterial}
          onClick={onPointClick}
        />
        <points
          geometry={hubGeometry}
          material={hubMaterial}
          onClick={onHubClick}
        />
      </group>
      {/* bidang tak terlihat di belakang: tempat drag dimulai & area kosong diklik */}
      <mesh
        position={[0, 0, -6]}
        onPointerDown={onPlanePointerDown}
        onPointerMove={onPlanePointerMove}
        onPointerUp={onPlanePointerUp}
        onClick={onPlaneClick}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}

export { SkillScene }
