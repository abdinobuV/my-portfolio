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
import { cn } from "cn"

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

/**
 * Skema visual teknis (blueprint SVG) untuk header kartu proyek sesuai kategori,
 * sehingga kartu tetap ringan tanpa aset gambar eksternal namun punya identitas visual kuat.
 */
function ProjectBlueprint({ category }: { category: string }) {
  if (category.includes("Networking")) {
    return (
      <svg
        viewBox="0 0 240 140"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full stroke-foreground/20 transition-transform duration-500 ease-out group-hover:scale-105"
      >
        <path
          d="M40 70 L110 34 M40 70 L110 106 M110 34 L190 48 M110 34 L190 92 M110 106 L190 92"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
        <rect x="24" y="56" width="32" height="28" strokeWidth="1.4" className="fill-background/50" />
        <circle cx="110" cy="34" r="11" strokeWidth="1.4" className="fill-background/50" />
        <circle cx="110" cy="106" r="11" strokeWidth="1.4" className="fill-background/50" />
        <rect x="178" y="38" width="24" height="20" strokeWidth="1.2" className="fill-background/50" />
        <rect x="178" y="82" width="24" height="20" strokeWidth="1.2" className="fill-background/50" />
        <text x="29" y="73" className="fill-foreground/40 font-mono text-[7px]">RTR</text>
        <text x="102" y="36" className="fill-foreground/40 font-mono text-[6px]">SW1</text>
        <text x="102" y="108" className="fill-foreground/40 font-mono text-[6px]">SW2</text>
      </svg>
    )
  }

  if (category.includes("Linux")) {
    return (
      <svg
        viewBox="0 0 240 140"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full stroke-foreground/20 transition-transform duration-500 ease-out group-hover:scale-105"
      >
        <rect x="34" y="26" width="172" height="88" strokeWidth="1.3" className="fill-background/45" />
        <line x1="34" y1="42" x2="206" y2="42" strokeWidth="1.1" />
        <circle cx="44" cy="34" r="2.2" className="fill-foreground/30" />
        <circle cx="52" cy="34" r="2.2" className="fill-foreground/30" />
        <circle cx="60" cy="34" r="2.2" className="fill-foreground/30" />
        <text x="44" y="60" className="fill-foreground/40 font-mono text-[8px]">root@debian:~# systemctl</text>
        <text x="44" y="75" className="fill-foreground/30 font-mono text-[7px]">● apache2.service — active</text>
        <text x="44" y="89" className="fill-foreground/30 font-mono text-[7px]">● squid.service   — active</text>
      </svg>
    )
  }

  if (category.includes("Embedded")) {
    return (
      <svg
        viewBox="0 0 240 140"
        fill="none"
        aria-hidden
        className="absolute inset-0 h-full w-full stroke-foreground/20 transition-transform duration-500 ease-out group-hover:scale-105"
      >
        <rect x="78" y="38" width="84" height="64" strokeWidth="1.4" className="fill-background/50" />
        <path
          d="M50 52 H78 M50 70 H78 M50 88 H78 M162 52 H190 M162 70 H190 M162 88 H190 M102 22 V38 M120 22 V38 M138 22 V38 M102 102 V118 M120 102 V118 M138 102 V118"
          strokeWidth="1.3"
        />
        <circle cx="46" cy="52" r="3" strokeWidth="1.2" />
        <circle cx="194" cy="88" r="3" strokeWidth="1.2" />
        <text x="95" y="73" className="fill-foreground/40 font-mono text-[8px]">ATmega328P</text>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      aria-hidden
      className="absolute inset-0 h-full w-full stroke-foreground/20 transition-transform duration-500 ease-out group-hover:scale-105"
    >
      <rect x="32" y="24" width="176" height="92" strokeWidth="1.3" className="fill-background/45" />
      <line x1="32" y1="40" x2="208" y2="40" strokeWidth="1.1" />
      <rect x="44" y="50" width="68" height="54" strokeWidth="1.1" strokeDasharray="3 2" />
      <rect x="122" y="50" width="74" height="24" strokeWidth="1.1" />
      <rect x="122" y="80" width="74" height="24" strokeWidth="1.1" />
      <circle cx="78" cy="77" r="14" strokeWidth="1.1" />
    </svg>
  )
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
              <ProjectBlueprint category={project.category} />
              <span className="relative z-10 inline-block bg-background/75 px-2 py-0.5 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase backdrop-blur-xs">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")} · {project.category}
              </span>
              <span className="absolute right-3 bottom-2 font-heading text-4xl font-semibold tracking-tight text-foreground/15 md:text-5xl">
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

        {project.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => {
              const isExternal = link.href.startsWith("http")
              return (
                <Button key={link.label} asChild variant="outline" size="sm">
                  <a
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                  >
                    {link.label}
                    <ArrowUpRightIcon />
                  </a>
                </Button>
              )
            })}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

const FEATURED_COUNT = 3
const ALL_CATEGORY = "Semua"

const categories = [
  ALL_CATEGORY,
  ...Array.from(new Set(projects.map((p) => p.category))),
]

function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY)
  const [showAll, setShowAll] = useState(false)

  const filteredProjects =
    activeCategory === ALL_CATEGORY
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  const isFiltering = activeCategory !== ALL_CATEGORY
  const visibleProjects =
    showAll || isFiltering
      ? filteredProjects
      : filteredProjects.slice(0, FEATURED_COUNT)

  return (
    <Section id="proyek">
      <SectionHeading
        index="03"
        title="Proyek"
        description="Karya, simulasi, dan latihan teknis yang pernah saya kerjakan. Filter menurut bidang atau klik kartu untuk melihat detail."
      />

      <Reveal className="mb-6">
        <div
          role="tablist"
          aria-label="Filter kategori proyek"
          className="flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const active = activeCategory === category
            const count =
              category === ALL_CATEGORY
                ? projects.length
                : projects.filter((p) => p.category === category).length
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 border px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                <span>{category}</span>
                <span
                  className={cn(
                    "text-[0.625rem]",
                    active ? "text-background/80" : "text-muted-foreground"
                  )}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              total={filteredProjects.length}
            />
          ))}
        </div>
      </Reveal>

      {!isFiltering && filteredProjects.length > FEATURED_COUNT ? (
        <Reveal className="mt-8 flex justify-center md:mt-10">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
          >
            {showAll ? "Sembunyikan proyek lain" : "Lihat semua proyek"}
            {showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Button>
        </Reveal>
      ) : null}
    </Section>
  )
}

export { Projects }
