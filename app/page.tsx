import { ViewTransition } from "react"

import { Hero } from "@/components/sections/hero"
import { TechMarquee } from "@/components/animations/tech-marquee"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { JourneyHorizontal } from "@/components/sections/journey-horizontal"
import { Dashboard } from "@/components/sections/dashboard"
import { Contact } from "@/components/sections/contact"
import { technologies } from "@/content/technologies"

export default function Page() {
  return (
    <ViewTransition name="page-content">
      <>
        <Hero />
        <div className="border-y border-border bg-card/50 py-4">
          <p className="mb-3 px-6 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase md:px-10 lg:px-16">
            Teknologi yang dipakai
          </p>
          <TechMarquee items={technologies} duration={50} />
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
