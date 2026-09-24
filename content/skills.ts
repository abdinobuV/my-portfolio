export type SkillCategory = {
  id: string
  name: string
  skills: { name: string; level: number }[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "HTML & CSS", level: 92 },
      { name: "TypeScript", level: 84 },
      { name: "React", level: 86 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    id: "tools",
    name: "Tools & Lainnya",
    skills: [
      { name: "Git & GitHub", level: 82 },
      { name: "Figma (handoff)", level: 70 },
      { name: "Vitest / Testing Library", level: 68 },
      { name: "Aksesibilitas (a11y)", level: 72 },
      { name: "CI dasar", level: 60 },
    ],
  },
]
