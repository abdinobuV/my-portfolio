"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { projectFilters, projects, type Project } from "@/content/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function ProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="group flex h-full cursor-pointer flex-col justify-between border border-border bg-card p-5 transition-colors hover:bg-muted/40 md:p-6">
          <div>
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {project.year} — {project.status}
              </p>
              <ArrowUpRightIcon
                className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                aria-hidden
              />
            </div>
            <h3 className="font-heading mt-4 text-lg font-semibold tracking-wide md:text-xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="px-2 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </article>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {project.year} — {project.status}
          </p>
          <DialogTitle className="font-heading text-xl tracking-wide">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="px-2 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <Button key={link.label} asChild variant="outline" size="sm">
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ArrowUpRightIcon />
              </a>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Projects() {
  const [filter, setFilter] = React.useState("Semua")

  const visible =
    filter === "Semua"
      ? projects
      : projects.filter((p) => p.tags.includes(filter))

  return (
    <Section id="proyek">
      <SectionHeading
        index="03"
        title="Proyek"
        description="Beberapa karya terpilih. Klik kartu untuk melihat detail."
      />

      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter proyek">
          {projectFilters.map((tag) => {
            const active = filter === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                aria-pressed={active}
                className={
                  active
                    ? "border border-primary bg-primary px-3 py-1.5 text-xs font-semibold tracking-widest text-primary-foreground uppercase"
                    : "border border-border px-3 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:border-foreground/30 hover:text-foreground"
                }
              >
                {tag}
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Tidak ada proyek dengan filter ini.
          </p>
        ) : null}
      </Reveal>
    </Section>
  )
}

export { Projects }
