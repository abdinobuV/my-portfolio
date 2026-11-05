import { ImageResponse } from "next/og"

import { profile } from "@/content/profile"
import { getAllPosts, getPost } from "@/lib/posts"

export const alt = "Artikel Journal Belajar"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  const title = post?.title ?? "Journal Belajar"
  const excerpt =
    post?.excerpt ??
    "Catatan teknis seputar computer networking, Linux, dan pengembangan web."
  const date = post?.date ?? ""
  const tags = post?.tags ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#14110f",
          color: "#faf8f5",
          padding: "56px 64px",
          border: "2px solid #2e2621",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #2e2621",
            paddingBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#efae7c",
            }}
          >
            {`JOURNAL BELAJAR · ${profile.name.toUpperCase()}`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#a89d93",
            }}
          >
            {date}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#faf8f5",
              maxWidth: "1020px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.4,
              color: "#d4c8be",
              maxWidth: "960px",
            }}
          >
            {excerpt}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2e2621",
            paddingTop: "24px",
            fontSize: 18,
            color: "#a89d93",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: "1px solid #3a3029",
                  backgroundColor: "#1d1815",
                  padding: "6px 14px",
                  color: "#efae7c",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                {`#${tag}`}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", color: "#d4c8be" }}>
            {profile.role}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

