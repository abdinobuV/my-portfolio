export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  year: string
  status: "Live" | "Dalam proyek" | "Arsip"
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: "kopi-catalog",
    title: "Katalog Kopi Nusantara",
    summary:
      "Katalog produk kopi dengan filter kategori, pencarian, dan detail modal.",
    description:
      "Aplikasi katalog sederhana untuk menampilkan biji kopi dari berbagai daerah. Fitur utama: filter berdasarkan origin dan roast level, pencarian instan, serta modal detail produk. Dibangun sebagai latihan state management dan aksesibilitas keyboard pada dialog.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    year: "2026",
    status: "Live",
    links: [
      { label: "Live", href: "#" },
      { label: "Kode", href: "#" },
    ],
  },
  {
    slug: "journal-harian",
    title: "Journal Harian Belajar",
    summary:
      "Blog journal belajar dengan Markdown, tagging, dan statistik streak.",
    description:
      "Tempat menuliskan catatan belajar harian. Konten ditulis dalam Markdown, dilengkapi tag topik dan ringkasan statistik mingguan. Tujuan proyek ini adalah memahami pipeline konten, rendering MDX, dan SEO untuk blog personal.",
    tags: ["Next.js", "MDX", "Rehype"],
    year: "2026",
    status: "Live",
    links: [
      { label: "Live", href: "#" },
      { label: "Kode", href: "#" },
    ],
  },
  {
    slug: "dashboard-keuangan",
    title: "Dashboard Keuangan Pribadi",
    summary:
      "Dashboard dengan grafik pemasukan/pengeluaran dan ringkasan bulanan.",
    description:
      "Dashboard mini untuk melacak arus kas bulanan. Menampilkan grafik garis, bar per kategori, dan kartu ringkasan. Latihan utama: visualisasi data dengan Recharts, layout responsif, dan dark mode yang konsisten.",
    tags: ["React", "Recharts", "Zod"],
    year: "2025",
    status: "Arsip",
    links: [{ label: "Kode", href: "#" }],
  },
  {
    slug: "form-builder",
    title: "Form Builder Ringan",
    summary:
      "Penyusun form drag-and-drop sederhana dengan validasi Zod.",
    description:
      "Eksperimen membuat form dari definisi JSON: field, label, dan validasi. Output bisa diekspor sebagai kode React. Fokus belajarnya pada schema validation dan pemisahan UI editor vs preview.",
    tags: ["TypeScript", "React Hook Form", "Zod"],
    year: "2025",
    status: "Dalam proyek",
    links: [{ label: "Kode", href: "#" }],
  },
]

export const projectFilters = ["Semua", ...new Set(projects.flatMap((p) => p.tags))]
