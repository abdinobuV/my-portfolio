"use client"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { skillCategories } from "@/content/skills"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Skills() {
  return (
    <Section id="keahlian">
      <SectionHeading
        index="02"
        title="Keahlian"
        description="Kemampuan yang saya latih secara rutin — angka adalah perkiraan jujur, bukan klaim mutlak."
      />

      <Reveal>
        <Tabs defaultValue={skillCategories[0].id}>
          <TabsList>
            {skillCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6 space-y-6">
              <ul className="grid gap-6 sm:grid-cols-2">
                {cat.skills.map((skill) => (
                  <li key={skill.name} className="space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress
                      value={skill.level}
                      aria-label={`${skill.name} ${skill.level}%`}
                    />
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>
    </Section>
  )
}

export { Skills }
