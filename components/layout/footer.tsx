import Link from "next/link"

import { profile } from "@/content/profile"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "@/components/animations/reveal"

function Footer() {
  return (
    <footer
      style={{ viewTransitionName: "site-footer" }}
      className="border-t border-border px-6 py-10 md:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal exit={false}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-heading text-sm font-semibold tracking-widest uppercase">
                {profile.name}
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Portfolio & journal belajar. Dibangun dengan Next.js, shadcn/ui, dan
                Tailwind CSS.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-xs font-semibold tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                ))}
                <Link
                  href="/blog"
                  className="text-xs font-semibold tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                © {profile.year} — {profile.location}
              </p>
            </div>
          </div>
        </Reveal>
        <Separator className="mt-8" />
      </div>
    </footer>
  )
}

export { Footer }
