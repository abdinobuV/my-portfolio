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

/** Ekstensi yang dibaca. getAllPosts dan getPost harus memakai daftar yang sama. */
const POST_EXTENSIONS = [".md", ".mdx"]

/** Slug sah: huruf, angka, tanda hubung. Menjaga path tetap di dalam postsDir. */
const SAFE_SLUG = /^[a-z0-9][a-z0-9-]*$/i

function sortPosts(a: PostMeta, b: PostMeta) {
  return b.date.localeCompare(a.date)
}

export async function getAllPosts(
  directory: string = postsDir
): Promise<PostMeta[]> {
  const files = await fs.readdir(directory)
  const posts = await Promise.all(
    files
      .filter((file) => POST_EXTENSIONS.some((ext) => file.endsWith(ext)))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(directory, file), "utf8")
        const { data } = matter(raw)
        const slug = file.replace(/\.mdx?$/, "")
        return {
          slug,
          title: String(data.title ?? file),
          date: String(data.date ?? ""),
          excerpt: String(data.excerpt ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        } satisfies PostMeta
      })
  )
  return posts
    // Nama file yang tidak bisa dibuka sebagai URL dilewati, supaya index
    // tidak pernah menautkan artikel yang bakal 404.
    .filter((post) => SAFE_SLUG.test(post.slug))
    .sort(sortPosts)
}

export async function getPost(
  slug: string,
  directory: string = postsDir
): Promise<Post | null> {
  if (!SAFE_SLUG.test(slug)) return null

  for (const extension of POST_EXTENSIONS) {
    try {
      const raw = await fs.readFile(
        path.join(directory, `${slug}${extension}`),
        "utf8"
      )
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
      // Lanjut ke ekstensi berikutnya (.md -> .mdx).
    }
  }

  return null
}
