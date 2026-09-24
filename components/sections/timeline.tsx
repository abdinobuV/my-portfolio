import { Section, SectionHeading } from "@/components/layout/section"
import { Reveal } from "@/components/animations/reveal"
import { timeline } from "@/content/timeline"
import { cn } from "cn"

const kindLabel: Record<string, string> = {
  kerja: "Kerja",
  pendidikan: "Pendidikan",
  kursus: "Kursus",
}

function Timeline() {
  return (
    <Section id="perjalanan">
      <SectionHeading
        index="04"
        title="Perjalanan"
        description="Ringkasan pengalaman kerja, pendidikan, dan kursus."
      />

      <ol className="relative space-y-0 border-l border-border">
        {timeline.map((item, i) => (
          <Reveal key={item.period} delay={i * 0.05}>
            <li className="relative pb-10 pl-6 last:pb-0 md:pl-8">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[5px] size-2.5 bg-foreground"
              />
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {item.period}
                </p>
                <span
                  className={cn(
                    "border border-border px-2 py-0.5 text-[0.625rem] font-semibold tracking-widest uppercase",
                    item.kind === "kerja" && "text-foreground",
                    item.kind === "pendidikan" && "text-muted-foreground",
                    item.kind === "kursus" && "text-muted-foreground"
                  )}
                >
                  {kindLabel[item.kind]}
                </span>
              </div>
              <h3 className="font-heading mt-2 text-lg font-semibold tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.org}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

export { Timeline }
