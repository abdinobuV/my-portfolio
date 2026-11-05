import { ArrowUpRightIcon, MapPinIcon } from "lucide-react"

import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { TechIcon } from "@/components/tech-icon"
import { profile } from "@/content/profile"
import { techIconByLabel } from "@/content/technologies"
import { Badge } from "@/components/ui/badge"

function About() {
  return (
    <Section id="tentang">
      <SectionHeading
        index="01"
        title="Tentang"
        description="Sedikit konteks tentang siapa saya dan bagaimana saya bekerja."
      />

      <Reveal>
        <div className="grid gap-3 md:grid-cols-4 md:gap-4">
          <div className="border border-border bg-card p-5 md:col-span-2 md:row-span-2 md:p-6">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Bio
            </p>
            <p className="mt-4 text-base leading-relaxed md:text-lg">
              {profile.bio}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {profile.bioSecondary}
            </p>
          </div>

          <div className="border border-border bg-card p-5 md:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Sekarang
              </p>
              <span className="inline-flex items-center gap-1.5 border border-border bg-muted/50 px-2 py-0.5 font-mono text-[0.625rem] tracking-wider uppercase">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-chart-1"
                />
                Terbuka untuk kolaborasi & magang
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{profile.nowText}</p>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Fokus
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.focusAreas.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="shrink justify-start px-2 py-1 break-words whitespace-normal"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Minat
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.interests.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="shrink justify-start px-2 py-1 break-words whitespace-normal"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-5 md:col-span-2">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Stack utama
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {profile.mainStack.map((item) => {
                const icon = techIconByLabel[item]
                return (
                  <li
                    key={item}
                    className="flex items-center gap-2 border border-border bg-muted/30 px-2.5 py-1.5 text-xs font-medium"
                  >
                    {icon ? <TechIcon icon={icon} size={14} /> : null}
                    <span>{item}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                Lokasi
              </p>
              <MapPinIcon aria-hidden className="size-3.5 text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm font-medium">{profile.location}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {profile.institution}
            </p>
            <p className="mt-2 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
              WIB · UTC+7
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Kontak
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-3 inline-flex items-center gap-1 text-sm font-medium break-all underline-offset-4 hover:underline"
            >
              <span>{profile.email}</span>
              <ArrowUpRightIcon
                aria-hidden
                className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
              />
            </a>
            <p className="mt-2 font-mono text-[0.625rem] tracking-widest text-muted-foreground uppercase">
              Respon cepat via Email / LinkedIn
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export { About }
