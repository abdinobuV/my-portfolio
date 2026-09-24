import { ViewTransition } from "react"

import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/animations/marquee"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { JourneyHorizontal } from "@/components/sections/journey-horizontal"
import { Dashboard } from "@/components/sections/dashboard"
import { Contact } from "@/components/sections/contact"
import { projects } from "@/content/projects"
import { skillCategories } from "@/content/skills"

const marqueeItems = [
  ...new Set([
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "shadcn/ui",
    "Framer Motion",
    "Lenis",
    "MDX",
    "Recharts",
    "Zod",
    "Aksesibilitas",
    ...projects.flatMap((p) => p.tags),
    ...skillCategories.flatMap((c) => c.skills.map((s) => s.name)),
  ]),
]

export default function Page() {
  return (
    <ViewTransition name="page-content">
      <>
        <Hero />
        <div className="border-y border-border bg-card/50 py-4">
          <Marquee items={marqueeItems} duration={45} />
        </div>
        <About />
        <Skills />
        <Projects />
        <JourneyHorizontal />
        <Dashboard />
        <Contact />
      </>
    </ViewTransition>
  )
}
