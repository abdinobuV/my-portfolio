import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Timeline } from "@/components/sections/timeline"
import { Dashboard } from "@/components/sections/dashboard"
import { Contact } from "@/components/sections/contact"

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Dashboard />
      <Contact />
    </>
  )
}
