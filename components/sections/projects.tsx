"use client"

import { useState } from "react"
import { ArrowUpRightIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { SpotlightCard } from "@/components/animations/spotlight-card"
import { projects, type Project } from "@/content/projects"
import { techIconByLabel } from "@/content/technologies"
import { TechIcon } from "@/components/tech-icon"
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

function TagBadge({
  tag,
  variant = "secondary",
}: {
  tag: string
  variant?: "secondary" | "outline"
}) {
  const icon = techIconByLabel[tag]

  return (
    <Badge variant={variant} className="gap-1.5 px-2 py-1">
      {icon ? <TechIcon icon={icon} size={12} /> : null}
      {tag}
    </Badge>
  )
}

function projectMeta(project: Project) {
  return `${project.year ? `${project.year} — ` : ""}${project.status}`
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SpotlightCard
          beam
          className="h-full bg-card transition-colors hover:bg-muted/40"
        >
          <article className="group flex h-full cursor-pointer flex-col justify-between">
            <div
              aria-hidden
              className="relative aspect-[4/3] overflow-hidden border-b border-border"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklab, ${project.accent} 14%, transparent) 0%, transparent 50%), linear-gradient(225deg, color-mix(in oklab, ${project.accent} 28%, transparent) 0%, transparent 60%), var(--card)`,
              }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                style={{
                  background: `radial-gradient(circle at 30% 70%, color-mix(in oklab, ${project.accent} 34%, transparent) 0%, transparent 45%)`,
                }}
              />
              <span className="absolute top-3 left-3 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <span className="absolute right-3 bottom-3 font-heading text-4xl font-semibold tracking-tight text-foreground/10 md:text-5xl">
                {project.year ?? ""}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    {projectMeta(project)}
                  </p>
                  <ArrowUpRightIcon
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold tracking-wide md:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </article>
        </SpotlightCard>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <div
          aria-hidden
          className="-mx-6 -mt-6 mb-2 h-1.5"
          style={{ background: project.accent }}
        />
        <DialogHeader>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {projectMeta(project)} · {project.category}
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
            <TagBadge key={tag} tag={tag} variant="outline" />
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

const FEATURED_COUNT = 3

function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, FEATURED_COUNT)

  return (
    <Section id="proyek">
      <SectionHeading
        index="03"
        title="Proyek"
        description="Karya dan latihan yang pernah saya kerjakan. Klik kartu untuk melihat detail."
      />

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={visibleProjects.length}
            />
          ))}
        </div>
      </Reveal>

      {projects.length > FEATURED_COUNT ? (
        <Reveal className="mt-8 flex justify-center md:mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
          >
            {showAll ? "Sembunyikan proyek lain" : "Lihat proyek lain"}
            {showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        </Reveal>
      ) : null}
    </Section>
  )
}

export { Projects }
