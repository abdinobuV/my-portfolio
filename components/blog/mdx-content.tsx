import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"

import { cn } from "cn"

// Level heading digeser satu tingkat: judul artikel sudah memakai <h1> di
// halaman, jadi isi artikel dimulai dari <h2>. Penulisan `#` di markdown
// tidak lagi menghasilkan <h1> kedua di halaman yang sama.
const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h2 className="font-heading mt-10 mb-4 text-2xl font-semibold tracking-wide md:text-3xl" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h3 className="font-heading mt-10 mb-3 text-xl font-semibold tracking-wide md:text-2xl" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h4 className="font-heading mt-8 mb-2 text-lg font-semibold tracking-wide" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-4 text-sm leading-relaxed text-foreground md:text-base" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="underline underline-offset-4 hover:text-muted-foreground" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-4 list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed md:text-base" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-foreground py-1 pl-4 text-sm text-muted-foreground italic md:text-base"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.ComponentProps<"code">) => (
    <code
      className={cn(
        "border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.8em]",
        className
      )}
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="my-6 overflow-x-auto border border-border bg-muted/50 p-4 font-mono text-xs leading-relaxed"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  img: ({ alt, width, height, ...props }: React.ComponentProps<"img">) => (
    // Penulis boleh mengisi width/height lewat markdown; bila tidak ada,
    // rasio 16:9 dipakai sebagai fallback agar tidak ada layout shift.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      width={width ?? 960}
      height={height ?? 540}
      loading="lazy"
      decoding="async"
      className="my-6 h-auto max-w-full"
      {...props}
    />
  ),
}

export async function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeHighlight],
        },
      }}
    />
  )
}
