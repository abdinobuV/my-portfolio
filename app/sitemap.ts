import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/posts"
import { siteUrl } from "@/lib/site"

/**
 * Sitemap untuk search engine. Artikel diambil dari content/posts, jadi
 * menambah artikel otomatis menambah entri sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...postRoutes]
}
