export type Project = {
  slug: string
  title: string
  /** Kategori — portfolio-data.md */
  category: string
  summary: string
  description: string
  tags: string[]
  /** Tahun bersifat opsional — portfolio-data.md belum mencantumkan tahun proyek */
  year?: string
  status: "Live" | "Dalam proyek" | "Arsip"
  links: { label: string; href: string }[]
  /** Base accent color (no alpha); use with color-mix for tints */
  accent: string
}

/** Projects — portfolio-data.md */
export const projects: Project[] = [
  {
    slug: "website-portfolio",
    title: "Website Portfolio",
    category: "Web Development",
    summary:
      "Website pribadi untuk menampilkan profil, pendidikan, keterampilan, minat, dan proyek.",
    description:
      "Website pribadi untuk menampilkan profil, pendidikan, keterampilan, minat, dan proyek yang pernah dipelajari atau dikerjakan.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    year: "2026",
    status: "Live",
    links: [],
    accent: "oklch(0.75 0.12 75)",
  },
  {
    slug: "simulasi-konfigurasi-jaringan",
    title: "Simulasi dan Konfigurasi Jaringan",
    category: "Computer Networking",
    summary:
      "Latihan konfigurasi jaringan: routing, NAT, VLAN, IP addressing, dan troubleshooting dasar.",
    description:
      "Latihan konfigurasi jaringan menggunakan perangkat atau simulator jaringan. Materi yang dipelajari mencakup routing, NAT, VLAN, IP addressing, serta troubleshooting dasar, dengan tools MikroTik, WinBox, dan Cisco Packet Tracer.",
    tags: ["MikroTik", "WinBox", "Cisco Packet Tracer"],
    // TODO: portfolio-data.md — status: tambahkan detail proyek/praktik paling relevan
    status: "Dalam proyek",
    links: [],
    accent: "oklch(0.7 0.14 200)",
  },
  {
    slug: "administrasi-server-linux",
    title: "Administrasi Server Linux",
    category: "Linux dan System Administration",
    summary:
      "Latihan Debian Linux: command line, Apache, Squid Proxy Server, dan layanan jaringan dasar.",
    description:
      "Latihan menggunakan Debian Linux untuk memahami command line, konfigurasi server, Apache, Squid Proxy Server, dan layanan jaringan dasar.",
    tags: ["Debian Linux", "Apache", "Squid Proxy Server"],
    // TODO: portfolio-data.md — status: tambahkan detail konfigurasi/hasil proyek
    status: "Dalam proyek",
    links: [],
    accent: "oklch(0.65 0.15 150)",
  },
  {
    slug: "arduino-elektronika-dasar",
    title: "Proyek Arduino dan Elektronika Dasar",
    category: "Embedded System",
    summary:
      "Latihan berbasis Arduino dengan sensor dan relay, disimulasikan di Proteus, Wokwi, atau Tinkercad.",
    description:
      "Latihan atau proyek berbasis Arduino yang menggunakan komponen seperti sensor dan relay, dengan proses simulasi atau perancangan menggunakan Proteus, Wokwi, atau Tinkercad.",
    tags: ["Arduino", "Proteus", "Wokwi", "Tinkercad"],
    // TODO: portfolio-data.md — nama proyek dan deskripsi singkat
    status: "Dalam proyek",
    links: [],
    accent: "oklch(0.74 0.13 40)",
  },
]
