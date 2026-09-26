"use client"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { skillCategories } from "@/content/skills"
import { profile } from "@/content/profile"
import { Progress } from "@/components/ui/progress"
import { cn } from "cn"

function Skills() {
  return (
    <Section id="keahlian">
      <SectionHeading
        index="02"
        title="Keahlian"
        description="Kemampuan yang saya latih secara rutin — angka adalah perkiraan jujur, bukan klaim mutlak."
      />

      <Reveal>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {skillCategories.map((cat, catIndex) => (
            <div
              key={cat.id}
              className={cn("border border-border bg-card p-5 md:p-6")}
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
                <h3 className="font-heading text-lg font-semibold tracking-wide md:text-xl">
                  {cat.name}
                </h3>
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {String(catIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 space-y-4">
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
            </div>
          ))}

          <div className="border border-border bg-card p-5 md:col-span-2 md:p-6">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Soft skills
            </p>
            <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              {profile.softSkills.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between border-b border-border pb-3"
                >
                  <span>{item}</span>
                  <span aria-hidden className="size-2 bg-foreground" />
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Angka pada tiap tile adalah self-assessment — dipakai sebagai peta
              latihan, bukan sertifikasi.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export { Skills }
