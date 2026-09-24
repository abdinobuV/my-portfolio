import type { Metadata } from "next"
import Link from "next/link"
import { ViewTransition } from "react"

import { SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { getAllPosts } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Journal Belajar",
  description:
    "Catatan belajar seputar web development, aksesibilitas, dan produktivitas.",
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  return (
    <ViewTransition name="page-content">
    <div className="px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-3.5" aria-hidden />
          Kembali
        </Link>

        <SectionHeading
          index="Blog"
          title="Journal Belajar"
          description="Tulisan singkat tentang apa yang saya pelajari — biar ilmu tidak hilang begitu saja."
        />

        <ul className="space-y-0 border-t border-border">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05} as="li">
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-b border-border py-8 transition-colors hover:bg-muted/30"
              >
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
                <h2 className="font-heading mt-3 text-xl font-semibold tracking-wide transition-colors group-hover:text-muted-foreground md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-xs font-semibold tracking-widest uppercase underline-offset-4 group-hover:underline">
                  Baca →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {posts.length === 0 ? (
          <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Belum ada artikel.
          </p>
        ) : null}
      </div>
    </div>
    </ViewTransition>
  )
}
