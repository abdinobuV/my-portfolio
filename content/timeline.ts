export type TimelineItem = {
  period: string
  title: string
  org: string
  description: string
  kind: "kerja" | "pendidikan" | "kursus"
}

export const timeline: TimelineItem[] = [
  {
    period: "2025 — Sekarang",
    title: "Frontend Developer (Freelance)",
    org: "Proyek klien & open source",
    description:
      "Membangun landing page dan dashboard internal. Menangani aksesibilitas, optimasi performa, dan integrasi API sederhana.",
    kind: "kerja",
  },
  {
    period: "2024 — 2025",
    title: "Kursus Full-Stack Web",
    org: "Platform kursus daring",
    description:
      "Menyelesaikan jalur belajar React, Node, dan database. Mengerjakan 6 proyek akhir termasuk aplikasi absensi dan toko online mini.",
    kind: "kursus",
  },
  {
    period: "2023 — 2024",
    title: "Kontributor Documentation",
    org: "Komunitas open source",
    description:
      "Menulis dan memperbaiki dokumentasi library frontend. Belajar membaca kode orang lain dan berkomunikasi secara asinkron.",
    kind: "kerja",
  },
  {
    period: "2021 — 2025",
    title: "S1 Teknik Informatika",
    org: "Universitas Contoh",
    description:
      "Fokus pada dasar algoritma, struktur data, dan rekayasa perangkat lunak. Skripsi tentang optimasi rendering dashboard data.",
    kind: "pendidikan",
  },
]
