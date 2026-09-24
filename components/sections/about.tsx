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
              Saya percaya interface yang baik itu tenang: hierarki jelas, gerak
              punya tujuan, dan setiap piksel punya alasan. Di setiap proyek saya
              mencoba menyeimbangkan kecepatan pengembangan dengan kualitas jangka
              panjang — supaya kode tetap enak dibaca enam bulan kemudian.
            </p>
          </div>

          <div className="border border-border bg-card p-5 md:col-span-2">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Sekarang
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Sedang memperdalam Server Components, testing, dan pola desain
              editorial untuk web personal.
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Fokus
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <Badge key={item} variant="secondary" className="px-2 py-1">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Prinsip
            </p>
            <p className="font-heading mt-3 text-lg leading-snug font-semibold tracking-wide md:text-xl">
              Hierarki jelas. Gerak punya alasan. Piksel punya tujuan.
            </p>
          </div>

          <div className="border border-border bg-card p-5 md:col-span-2">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Stack utama
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <li>TypeScript</li>
              <li>React / Next.js</li>
              <li>Tailwind CSS</li>
              <li>shadcn/ui</li>
            </ul>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Lokasi
            </p>
            <p className="mt-3 text-sm">{profile.location}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Remote-friendly
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
