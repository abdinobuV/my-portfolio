import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"

import { cn } from "cn"

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="font-heading mt-10 mb-4 text-2xl font-semibold tracking-wide md:text-3xl" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="font-heading mt-10 mb-3 text-xl font-semibold tracking-wide md:text-2xl" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="font-heading mt-8 mb-2 text-lg font-semibold tracking-wide" {...props} />
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
