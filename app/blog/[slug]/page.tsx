import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { MdxContent } from "@/components/blog/mdx-content"
import { getAllPosts, getPost } from "@/lib/posts"
import { ArrowLeftIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Artikel tidak ditemukan" }
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <article className="px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" aria-hidden />
          Semua artikel
        </Link>

        <header className="border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <time
              dateTime={post.date}
              className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
            >
              {formatDate(post.date)}
            </time>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="font-heading mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {post.excerpt}
          </p>
        </header>

        <div className="mt-10">
          <MdxContent source={post.content} />
        </div>
      </div>
    </article>
  )
}
