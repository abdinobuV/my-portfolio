import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

export type PostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export type Post = PostMeta & {
  content: string
}

const postsDir = path.join(process.cwd(), "content", "posts")

function sortPosts(a: PostMeta, b: PostMeta) {
  return b.date.localeCompare(a.date)
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(postsDir)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(postsDir, file), "utf8")
        const { data } = matter(raw)
        return {
          slug: file.replace(/\.mdx?$/, ""),
          title: String(data.title ?? file),
          date: String(data.date ?? ""),
          excerpt: String(data.excerpt ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        } satisfies PostMeta
      })
  )
  return posts.sort(sortPosts)
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(path.join(postsDir, `${slug}.md`), "utf8")
    const { data, content } = matter(raw)
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      content,
    }
  } catch {
    return null
  }
}
