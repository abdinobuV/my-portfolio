import { describe, expect, it } from "vitest"

import { skillGroups } from "@/content/skills"
import { skillLinks } from "@/content/skill-graph"
import { buildSkillGraph, skillNodeId, slugify } from "@/lib/skill-graph"

const graph = buildSkillGraph(skillGroups, skillLinks)

describe("buildSkillGraph", () => {
  it("memuat setiap skill sebagai node", () => {
    const expected = skillGroups.reduce(
      (total, group) => total + group.skills.length + group.more.length,
      0
    )
    expect(graph.skillNodes).toHaveLength(expected)
    expect(graph.hubs).toHaveLength(skillGroups.length)
  })

  it("tidak menghasilkan koordinat NaN atau Infinity", () => {
    for (const node of graph.nodes) {
      expect(Number.isFinite(node.position[0])).toBe(true)
      expect(Number.isFinite(node.position[1])).toBe(true)
      expect(Number.isFinite(node.position[2])).toBe(true)
      expect(Number.isFinite(node.radius)).toBe(true)
    }
  })

  it("menghubungkan setiap skill ke hub grupnya", () => {
    const groupEdges = graph.edges.filter((edge) => edge.kind === "group")
    expect(groupEdges).toHaveLength(graph.skillNodes.length)
  })

  it("menyimpan setiap edge supaya kedua ujungnya ada", () => {
    const ids = new Set(graph.nodes.map((node) => node.id))
    for (const edge of graph.edges) {
      expect(ids.has(edge.from)).toBe(true)
      expect(ids.has(edge.to)).toBe(true)
    }
  })

  it("membuat edge antar grup selalu menyeberang grup berbeda", () => {
    const groupOf = new Map(graph.nodes.map((node) => [node.id, node.groupId]))
    const cross = graph.edges.filter((edge) => edge.kind === "cross")
    expect(cross).toHaveLength(skillLinks.length)
    for (const edge of cross) {
      expect(groupOf.get(edge.from)).not.toBe(groupOf.get(edge.to))
    }
  })

  it("menyamakan radius node dengan level skill", () => {
    const sorted = [...graph.skillNodes].sort((a, b) => a.level - b.level)
    expect(sorted[0].radius).toBeLessThan(sorted[sorted.length - 1].radius)
    for (const node of graph.skillNodes) {
      expect(node.radius).toBeGreaterThan(0)
    }
  })

  it("deterministik: seed sama menghasilkan layout sama persis", () => {
    const signature = (g: typeof graph) =>
      JSON.stringify(g.nodes.map((node) => [node.id, ...node.position]))
    const first = signature(buildSkillGraph(skillGroups, skillLinks))
    const second = signature(buildSkillGraph(skillGroups, skillLinks))
    const third = signature(buildSkillGraph(skillGroups, skillLinks))
    expect(first).toBe(second)
    expect(second).toBe(third)
  })

  it("seed berbeda menghasilkan layout berbeda", () => {
    const signature = (g: typeof graph) =>
      JSON.stringify(g.nodes.map((node) => [...node.position]))
    const a = signature(buildSkillGraph(skillGroups, skillLinks))
    const b = signature(buildSkillGraph(skillGroups, skillLinks, { seed: 999 }))
    expect(a).not.toBe(b)
  })

  it("menjaga jarak antar hub tetap lapang", () => {
    const distance = (
      a: readonly [number, number, number],
      b: readonly [number, number, number]
    ) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
    for (let i = 0; i < graph.hubs.length; i++) {
      for (let j = i + 1; j < graph.hubs.length; j++) {
        expect(distance(graph.hubs[i].position, graph.hubs[j].position)).toBeGreaterThan(1)
      }
    }
  })

  it("menolak tautan yang menunjuk skill yang tidak ada", () => {
    expect(() =>
      buildSkillGraph(skillGroups, [
        {
          from: { group: "network", name: "TCP/IP" },
          to: { group: "network", name: "Skill Yang Tidak Ada" },
        },
      ])
    ).toThrow()
  })

  it("menolak id node yang duplikat", () => {
    const duplicated = [
      {
        id: "network",
        name: "Jaringan Komputer",
        shortLabel: "Jaringan",
        blurb: "",
        icon: "network" as const,
        skills: [
          { name: "Sama", level: 80 },
          { name: "Sama", level: 70 },
        ],
        more: [],
      },
    ]
    expect(() => buildSkillGraph(duplicated)).toThrow(/duplikat/)
  })
})

describe("slugify", () => {
  it("mengubah nama skill menjadi slug yang stabil", () => {
    expect(slugify("TCP/IP")).toBe("tcp-ip")
    expect(slugify("Konfigurasi dasar MikroTik (WinBox)")).toBe(
      "konfigurasi-dasar-mikrotik-winbox"
    )
    expect(slugify("Routing, NAT & firewall MikroTik")).toBe(
      "routing-nat-firewall-mikrotik"
    )
    expect(slugify("IP addressing dan subnetting")).toBe(
      "ip-addressing-dan-subnetting"
    )
  })

  it("membentuk id node dari grup dan nama", () => {
    expect(skillNodeId("network", "TCP/IP")).toBe("network/tcp-ip")
  })
})
