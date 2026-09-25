export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  year: string
  status: "Live" | "Dalam proyek" | "Arsip"
  links: { label: string; href: string }[]
  /** Base accent color (no alpha); use with color-mix for tints */
  accent: string
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
    accent: "oklch(0.75 0.12 75)",
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
    accent: "oklch(0.7 0.14 200)",
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
    accent: "oklch(0.65 0.15 150)",
  },
  {
    slug: "landing-kopi-senja",
    title: "Landing Page Kopi Senja",
    summary:
      "Landing page UMKM dengan animasi scroll dan formulir pemesanan.",
    description:
      "Landing page satu halaman untuk kedai kopi lokal. Berisi bagian menu, galeri, dan formulir pemesanan yang divalidasi di sisi klien. Latihan utama: layout responsif, animasi scroll dengan framer-motion, dan optimasi gambar.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    year: "2025",
    status: "Live",
    links: [
      { label: "Live", href: "#" },
      { label: "Kode", href: "#" },
    ],
    accent: "oklch(0.74 0.13 40)",
  },
  {
    slug: "papan-tugas-kolaboratif",
    title: "Papan Tugas Kolaboratif",
    summary:
      "Papan tugas ala kanban dengan drag antar kolom dan validasi data.",
    description:
      "Aplikasi papan tugas untuk tim kecil. Kartu bisa dipindah antar kolom, lengkap dengan label, tenggat, dan filter anggota. Latihan utama: state management kompleks, validasi dengan Zod, dan optimasi render daftar panjang.",
    tags: ["React", "TypeScript", "Zod"],
    year: "2025",
    status: "Arsip",
    links: [{ label: "Kode", href: "#" }],
    accent: "oklch(0.7 0.14 300)",
  },
  {
    slug: "form-event-multi-step",
    title: "Form Pendaftaran Event",
    summary:
      "Formulir pendaftaran multi-step dengan validasi tiap tahap.",
    description:
      "Formulir pendaftaran acara dengan beberapa tahap: data diri, pilihan sesi, dan konfirmasi. Validasi berjalan di tiap langkah sebelum lanjut. Latihan utama: pola form wizard, React Hook Form, dan pesan error yang aksesibel.",
    tags: ["React Hook Form", "Zod", "Tailwind"],
    year: "2024",
    status: "Live",
    links: [
      { label: "Live", href: "#" },
      { label: "Kode", href: "#" },
    ],
    accent: "oklch(0.72 0.13 200)",
  },
]
