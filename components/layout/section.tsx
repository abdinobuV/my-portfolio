"use client"

import * as React from "react"
import { cn } from "cn"
import { Reveal } from "@/components/animations/reveal"

function Section({
  id,
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-border px-6 py-20 md:px-10 md:py-28 lg:px-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  )
}

function SectionHeading({
  index,
  title,
  description,
  className,
  headingLevel: Heading = "h2",
}: {
  index?: string
  title: string
  description?: string
  className?: string
  /** Level heading untuk judul section — "h1" dipakai di halaman yang punya satu judul utama. */
  headingLevel?: "h1" | "h2" | "h3"
}) {
  return (
    <Reveal className={cn("mb-10 md:mb-14", className)}>
      <div className="mb-4 flex items-baseline gap-4 border-b border-border pb-3">
        {index ? (
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {index}
          </span>
        ) : null}
        <Heading className="font-heading text-2xl font-semibold tracking-wide uppercase md:text-3xl">
          {title}
        </Heading>
      </div>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

export { Section, SectionHeading }
