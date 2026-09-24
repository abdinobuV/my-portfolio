import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { profile } from "@/content/profile"
import { Badge } from "@/components/ui/badge"

const highlights = [
  "TypeScript & React",
  "Next.js App Router",
  "Aksesibilitas",
  "Desain responsif",
]

function About() {
  return (
    <Section id="tentang">
      <SectionHeading
        index="01"
        title="Tentang"
        description="Sedikit konteks tentang siapa saya dan bagaimana saya bekerja."
      />

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <Reveal className="space-y-5">
          <p className="text-base leading-relaxed md:text-lg">{profile.bio}</p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Saya percaya interface yang baik itu tenang: hierarki jelas, gerak
            punya tujuan, dan setiap piksel punya alasan. Di setiap proyek saya
            mencoba menyeimbangkan kecepatan pengembangan dengan kualitas jangka
            panjang — supaya kode tetap enak dibaca enam bulan kemudian.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          <div className="border border-border p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Sekarang
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Sedang memperdalam Server Components, testing, dan pola desain
              editorial untuk web personal.
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Fokus
            </p>
            <div className="flex flex-wrap gap-2">
              {highlights.map((item) => (
                <Badge key={item} variant="secondary" className="px-2 py-1">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export { About }
