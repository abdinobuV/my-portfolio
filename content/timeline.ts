export type TimelineItem = {
  period: string
  title: string
  org: string
  description: string
  kind: "kerja" | "pendidikan" | "kursus"
}

/** Education — portfolio-data.md */
export const timeline: TimelineItem[] = [
  {
    period: "2025 - Sekarang",
    title: "Pendidikan Teknologi Informatika dan Komputer",
    org: "Universitas Negeri Medan",
    description:
      "Program studi S1 dengan status mahasiswa, di Medan, Indonesia. Fokus belajar pada computer networking dan Linux.",
    kind: "pendidikan",
  },
  {
    period: "2022 - 2025",
    title: "Teknik Komputer dan Jaringan",
    org: "SMKS Teladan Medan",
    description:
      "Program keahlian Teknik Komputer dan Jaringan di SMKS Teladan Medan — latar belakang dasar jaringan komputer, Linux, dan konfigurasi sistem.",
    kind: "pendidikan",
  },
]
