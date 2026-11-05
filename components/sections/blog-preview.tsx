import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { getAllPosts } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3)

  if (posts.length === 0) return null

  return (
    <Section id="catatan">
      <SectionHeading
        index="06"
        title="Journal Belajar"
        description="Catatan teknis terbaru seputar jaringan komputer, administrasi server Linux, dan eksperimen antarmuka web."
      />

      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between border border-border bg-card p-5 transition-colors hover:bg-muted/40 md:p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold tracking-wide transition-colors group-hover:text-muted-foreground md:text-xl">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-2 py-0.5 text-[0.6875rem]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-8 flex justify-end">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog">
            Baca semua catatan
            <ArrowRightIcon />
          </Link>
        </Button>
      </Reveal>
    </Section>
  )
}

export { BlogPreview }

