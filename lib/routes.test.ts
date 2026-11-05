import { describe, expect, it } from "vitest"

import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { profile } from "@/content/profile"
import { projects } from "@/content/projects"
import { getAllPosts, getPost } from "@/lib/posts"

describe("route & content smoke tests", () => {
  it("memuat semua artikel blog dengan metadata lengkap dan dapat di-resolve per slug", async () => {
    const posts = await getAllPosts()
    expect(posts.length).toBeGreaterThanOrEqual(4)

    for (const meta of posts) {
      expect(meta.slug).toBeTruthy()
      expect(meta.title).toBeTruthy()
      expect(meta.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(meta.excerpt.length).toBeGreaterThan(10)

      const full = await getPost(meta.slug)
      expect(full).not.toBeNull()
      expect(full?.content.length).toBeGreaterThan(20)
    }
  })

  it("menyertakan rute statis dan semua artikel blog di dalam sitemap.xml", async () => {
    const posts = await getAllPosts()
    const entries = await sitemap()

    expect(entries.length).toBe(2 + posts.length)
    const urls = entries.map((e) => e.url)
    expect(urls.some((u) => u.endsWith("/blog"))).toBe(true)
    for (const post of posts) {
      expect(urls.some((u) => u.endsWith(`/blog/${post.slug}`))).toBe(true)
    }
  })

  it("mengonfigurasi robots.txt dengan tautan sitemap", () => {
    const cfg = robots()
    expect(cfg.sitemap).toMatch(/\/sitemap\.xml$/)
  })

  it("memastikan data profil dan proyek memiliki struktur yang konsisten", () => {
    expect(profile.name).toBe("Abdi Raihan Wibowo")
    expect(typeof profile.year).toBe("number")
    expect(profile.socials.length).toBeGreaterThanOrEqual(3)

    expect(projects.length).toBeGreaterThanOrEqual(4)
    const slugs = new Set(projects.map((p) => p.slug))
    expect(slugs.size).toBe(projects.length)
    for (const project of projects) {
      expect(project.title).toBeTruthy()
      expect(project.category).toBeTruthy()
      expect(project.tags.length).toBeGreaterThan(0)
    }
  })
})

