"use client"

import * as React from "react"
import {
  CodeIcon,
  DatabaseIcon,
  NetworkIcon,
  RouterIcon,
  ServerIcon,
  WrenchIcon,
} from "lucide-react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { SkillsMap } from "@/components/sections/skills-map"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { skillGroups, type SkillGroupIcon } from "@/content/skills"
import { profile } from "@/content/profile"
import { cn } from "cn"

const groupIcons: Record<SkillGroupIcon, typeof NetworkIcon> = {
  network: NetworkIcon,
  router: RouterIcon,
  server: ServerIcon,
  code: CodeIcon,
  database: DatabaseIcon,
  wrench: WrenchIcon,
}

function average(levels: { level: number }[]) {
  if (levels.length === 0) return 0
  return Math.round(
    levels.reduce((sum, item) => sum + item.level, 0) / levels.length
  )
}

function Skills() {
  const [active, setActive] = React.useState(skillGroups[0].id)
  const totalBars = skillGroups.reduce(
    (sum, group) => sum + group.skills.length + group.more.length,
    0
  )

  return (
    <Section id="keahlian">
      <SectionHeading
        index="02"
        title="Keahlian"
        description={`${skillGroups.length} bidang · ${totalBars} keterampilan dalam satu panel tab — angka adalah perkiraan jujur, bukan klaim mutlak.`}
      />

      <Reveal>
        <SkillsMap
          activeGroup={active}
          onActiveGroupChange={setActive}
        />
      </Reveal>

      <Reveal>
        <Tabs value={active} onValueChange={setActive}>
          <TabsList
            variant="line"
            aria-label="Kategori keahlian"
            className="w-full justify-start gap-1 overflow-x-auto border-b border-border"
          >
            {skillGroups.map((group) => {
              const Icon = groupIcons[group.icon]
              const count = group.skills.length + group.more.length
              return (
                <TabsTrigger
                  key={group.id}
                  value={group.id}
                  className="shrink-0 cursor-pointer transition-colors duration-200"
                >
                  <Icon aria-hidden className="size-3.5" />
                  {group.shortLabel}
                  <span className="font-mono text-[0.625rem] text-muted-foreground">
                    {String(count).padStart(2, "0")}
                  </span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {skillGroups.map((group) => {
            const Icon = groupIcons[group.icon]
            const avg = average([...group.skills, ...group.more])
            return (
              <TabsContent
                key={group.id}
                value={group.id}
                className="min-h-[320px] border border-border bg-card p-5 md:min-h-[300px] md:p-6"
              >
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-border bg-muted/50">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold tracking-wide md:text-lg">
                        {group.name}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-sm">
                        {group.blurb}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
                    ~{avg}%
                  </span>
                </div>

                <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="space-y-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-sm font-medium">
                          {skill.name}
                        </span>
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

                {group.more.length > 0 ? (
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
                      Lainnya
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.more.map((item) => (
                        <li
                          key={item.name}
                          className="border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-200"
                          title={`${item.name} — ${item.level}%`}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </TabsContent>
            )
          })}
        </Tabs>

        <div
          className={cn(
            "mt-3 flex flex-col gap-3 border border-border bg-card p-5",
            "sm:flex-row sm:items-center md:p-6"
          )}
        >
          <p className="shrink-0 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
            Soft skills
          </p>
          <ul className="flex flex-wrap gap-2">
            {profile.softSkills.map((item) => (
              <li
                key={item}
                className="border border-border px-2.5 py-1 text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Angka = self-assessment sebagai peta latihan, bukan sertifikasi.
        </p>
      </Reveal>
    </Section>
  )
}

export { Skills }
