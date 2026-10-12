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
          <div className="mb-3 flex items-center justify-between px-6 md:px-10 lg:px-16">
            <p className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
              Teknologi yang dipakai
            </p>
            <a
              href="#keahlian"
              className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              Lihat semua <span aria-hidden>→</span>
            </a>
          </div>
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
