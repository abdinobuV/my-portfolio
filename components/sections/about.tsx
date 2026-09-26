import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { profile } from "@/content/profile"
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
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Sekarang
            </p>
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
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {profile.mainStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Lokasi
            </p>
            <p className="mt-3 text-sm">{profile.location}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {profile.institution}
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Kontak
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 block text-sm underline-offset-4 hover:underline"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export { About }
