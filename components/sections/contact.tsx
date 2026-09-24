import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { ContactForm } from "@/components/sections/contact-form"
import { profile } from "@/content/profile"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileTextIcon } from "lucide-react"

function Contact() {
  return (
    <Section id="kontak">
      <SectionHeading
        index="06"
        title="Kontak"
        description="Punya ide kolaborasi, lowongan, atau sekadar ingin menyapa? Kirim pesan."
      />

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
        <Reveal className="space-y-6">
          <div className="border border-border p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Email
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 block text-base font-medium underline-offset-4 hover:underline"
            >
              {profile.email}
            </a>
          </div>

          <div className="border border-border p-5">
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Sosial
            </p>
            <ul className="mt-3 space-y-2">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Button asChild variant="outline" size="lg" className="w-full">
            <a href={profile.cvUrl} download>
              Unduh CV (PDF)
              <FileTextIcon />
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>

      <Separator className="mt-16" />
    </Section>
  )
}

export { Contact }
