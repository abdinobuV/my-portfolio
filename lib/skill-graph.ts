import type { SkillGroup } from "@/content/skills"
import { fibonacciSphere, mulberry32 } from "@/lib/random"

export type SkillNodeKind = "hub" | "skill"

export type SkillNode = {
  /** `${groupId}/${slug}` — stabil dan bisa dirujuk dari data. */
  id: string
  name: string
  level: number
  groupId: string
  kind: SkillNodeKind
  position: [number, number, number]
  /** Radius node dalam satuan dunia — untuk skill nilainya proporsional level. */
  radius: number
  /** Skill dari daftar "lainnya" (chip), bukan bar utama. */
  minor: boolean
}

export type SkillEdge = {
  from: string
  to: string
  kind: "group" | "cross"
}

export type SkillGraph = {
  nodes: SkillNode[]
  edges: SkillEdge[]
  hubs: SkillNode[]
  skillNodes: SkillNode[]
}

/** Tautan antar grup, dirujuk lewat group + nama skill (bukan slug). */
export type SkillLink = {
  from: { group: string; name: string }
  to: { group: string; name: string }
}

export type SkillGraphOptions = {
  /** Benih PRNG — default konstan supaya tata letak selalu sama. */
  seed?: number
  /** Jarak hub dari pusat. */
  hubRadius?: number
  /** Radius dasar shell skill mengelilingi hub. */
  clusterRadius?: number
  /** Radius node untuk level terendah / tertinggi. */
  minNodeRadius?: number
  maxNodeRadius?: number
}

/**
 * Slug stabil dari nama skill:
 * "Konfigurasi router & switch" -> "konfigurasi-router-switch".
 */
export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function skillNodeId(groupId: string, name: string) {
  return `${groupId}/${slugify(name)}`
}

/**
 * Rotasi acak (deterministik lewat seed) terhadap vektor — supaya tiap grup
 * punya orientasi shell berbeda tanpa mengulang pola yang sama persis.
 */
function rotate(
  v: [number, number, number],
  rand: () => number
): [number, number, number] {
  const axis = [rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1]
  const len = Math.hypot(axis[0], axis[1], axis[2]) || 1
  const ax = axis[0] / len
  const ay = axis[1] / len
  const az = axis[2] / len
  const angle = rand() * Math.PI * 2
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const dot = ax * v[0] + ay * v[1] + az * v[2]
  const cross: [number, number, number] = [
    ay * v[2] - az * v[1],
    az * v[0] - ax * v[2],
    ax * v[1] - ay * v[0],
  ]
  return [
    v[0] * c + cross[0] * s + ax * dot * (1 - c),
    v[1] * c + cross[1] * s + ay * dot * (1 - c),
    v[2] * c + cross[2] * s + az * dot * (1 - c),
  ]
}

function scale(
  v: [number, number, number],
  k: number
): [number, number, number] {
  return [v[0] * k, v[1] * k, v[2] * k]
}

/**
 * Membangun graf 3D dari data skill.
 *
 * Murni: tanpa React, tanpa three, tanpa Date/Math.random — hasil fungsi ini
 * identik di server maupun client dan bisa diuji langsung.
 */
export function buildSkillGraph(
  groups: SkillGroup[],
  links: SkillLink[] = [],
  options: SkillGraphOptions = {}
): SkillGraph {
  const {
    seed = 20260101,
    hubRadius = 2.1,
    clusterRadius = 0.55,
    minNodeRadius = 0.05,
    maxNodeRadius = 0.09,
  } = options

  const rand = mulberry32(seed)
  const nodes: SkillNode[] = []
  const edges: SkillEdge[] = []
  const hubs: SkillNode[] = []
  const skillNodes: SkillNode[] = []
  const byId = new Map<string, SkillNode>()

  const hubDirections = fibonacciSphere(groups.length)

  groups.forEach((group, groupIndex) => {
    const hubDirection = hubDirections[groupIndex] ?? [0, 1, 0]
    const hubPosition = scale(hubDirection, hubRadius)
    const hub: SkillNode = {
      id: group.id,
      name: group.name,
      level: 100,
      groupId: group.id,
      kind: "hub",
      position: hubPosition,
      radius: 0.12,
      minor: false,
    }
    hubs.push(hub)
    nodes.push(hub)
    byId.set(hub.id, hub)

    const items = [
      ...group.skills.map((skill) => ({ ...skill, minor: false })),
      ...group.more.map((skill) => ({ ...skill, minor: true })),
    ]

    // Shell mengelilingi hub, makin banyak skill makin jauh radiusnya.
    const shellRadius = clusterRadius + 0.14 * Math.sqrt(items.length)
    const directions = fibonacciSphere(items.length)

    items.forEach((item, itemIndex) => {
      const direction = directions[itemIndex] ?? [1, 0, 0]
      const rotated = rotate(direction, rand)
      const id = skillNodeId(group.id, item.name)
      if (byId.has(id)) {
        throw new Error(
          `ID skill duplikat: "${id}" (grup ${group.id}, skill "${item.name}")`
        )
      }
      const node: SkillNode = {
        id,
        name: item.name,
        level: item.level,
        groupId: group.id,
        kind: "skill",
        position: [
          hubPosition[0] + rotated[0] * shellRadius,
          hubPosition[1] + rotated[1] * shellRadius,
          hubPosition[2] + rotated[2] * shellRadius,
        ],
        radius:
          minNodeRadius +
          (maxNodeRadius - minNodeRadius) *
            ((item.level - 60) / (100 - 60)),
        minor: item.minor,
      }
      skillNodes.push(node)
      nodes.push(node)
      byId.set(node.id, node)
      edges.push({ from: hub.id, to: node.id, kind: "group" })
    })
  })

  for (const link of links) {
    const fromId = skillNodeId(link.from.group, link.from.name)
    const toId = skillNodeId(link.to.group, link.to.name)
    if (!byId.has(fromId)) {
      throw new Error(`Tautan skill tidak ketemu: "${fromId}"`)
    }
    if (!byId.has(toId)) {
      throw new Error(`Tautan skill tidak ketemu: "${toId}"`)
    }
    edges.push({ from: fromId, to: toId, kind: "cross" })
  }

  return { nodes, edges, hubs, skillNodes }
}
