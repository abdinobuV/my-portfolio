import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { getAllPosts, getPost } from "@/lib/posts"

let dir = ""

const frontmatter = (title: string, date: string, tags: string[] = []) =>
  `---\ntitle: "${title}"\ndate: "${date}"\nexcerpt: "Ringkasan."\ntags: [${tags.map((t) => `"${t}"`).join(", ")}]\n---\n\n# Judul\n\nIsi artikel.\n`

beforeAll(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), "posts-test-"))
  await fs.writeFile(
    path.join(dir, "artikel-md.md"),
    frontmatter("Artikel MD", "2026-03-01", ["satu"])
  )
  await fs.writeFile(
    path.join(dir, "artikel-mdx.mdx"),
    frontmatter("Artikel MDX", "2026-01-01", ["dua", "tiga"])
  )
  await fs.writeFile(
    path.join(dir, "_slug-tidak-valid.md"),
    frontmatter("Slug Tidak Valid", "2026-02-01")
  )
  await fs.writeFile(path.join(dir, "bukan-artikel.txt"), "abaikan saya")
})

afterAll(async () => {
  await fs.rm(dir, { recursive: true, force: true })
})

describe("getAllPosts", () => {
  it("membaca .md dan .mdx", async () => {
    const posts = await getAllPosts(dir)
    const slugs = posts.map((post) => post.slug)
    expect(slugs).toContain("artikel-md")
    expect(slugs).toContain("artikel-mdx")
  })

  it("mengabaikan berkas yang bukan artikel", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.map((post) => post.slug)).not.toContain("bukan-artikel")
  })

  it("membuang nama file yang tidak bisa jadi URL", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.map((post) => post.slug)).not.toContain("_slug-tidak-valid")
  })

  it("mengurutkan dari tanggal terbaru", async () => {
    const posts = await getAllPosts(dir)
    expect(posts.map((post) => post.slug)).toEqual([
      "artikel-md",
      "artikel-mdx",
    ])
  })

  it("membaca frontmatter lengkap", async () => {
    const posts = await getAllPosts(dir)
    const post = posts.find((item) => item.slug === "artikel-mdx")
    expect(post?.title).toBe("Artikel MDX")
    expect(post?.date).toBe("2026-01-01")
    expect(post?.excerpt).toBe("Ringkasan.")
    expect(post?.tags).toEqual(["dua", "tiga"])
  })
})

describe("getPost", () => {
  it("membaca artikel .md", async () => {
    const post = await getPost("artikel-md", dir)
    expect(post?.title).toBe("Artikel MD")
    expect(post?.content).toContain("Isi artikel")
  })

  it("membaca artikel .mdx dengan ekstensi yang sama", async () => {
    const post = await getPost("artikel-mdx", dir)
    expect(post?.title).toBe("Artikel MDX")
    expect(post?.content).toContain("Isi artikel")
  })

  it("mengembalikan null untuk slug yang tidak ada", async () => {
    expect(await getPost("tidak-ada-sama-sekali", dir)).toBeNull()
  })

  it("menolak slug berbahaya supaya tidak keluar dari folder posts", async () => {
    for (const slug of [
      "../package",
      "../../etc/passwd",
      "a/b",
      "a\\b",
      ".",
      "..",
      "",
      "_awal-underscore",
    ]) {
      expect(await getPost(slug, dir)).toBeNull()
    }
  })
})
