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
    title: "Website Portfolio & Journal Interaktif",
    category: "Web Development",
    summary:
      "Website pribadi berarsitektur Next.js App Router dengan peta keterampilan 3D WebGL, blog MDX, dan sistem gerak aksesibel.",
    description:
      "Website pribadi untuk menampilkan profil, pendidikan, peta keterampilan 3D berbasis React Three Fiber, dashboard progres belajar, dan artikel MDX. Dirancang dengan estetika editorial brutalist, mendukung View Transitions API serta prefers-reduced-motion penuh.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    year: "2026",
    status: "Live",
    links: [
      {
        label: "Repositori GitHub",
        href: "https://github.com/abdinobuV/web-portfolio2",
      },
      {
        label: "Baca Journal",
        href: "/blog",
      },
    ],
    accent: "oklch(0.75 0.12 75)",
  },
  {
    slug: "simulasi-konfigurasi-jaringan",
    title: "Simulasi & Konfigurasi Topologi Jaringan",
    category: "Computer Networking",
    summary:
      "Perancangan subnetting VLSM, routing statis/dinamis, NAT, VLAN, dan manajemen bandwidth menggunakan MikroTik & Cisco Packet Tracer.",
    description:
      "Proyek praktikum dan simulasi topologi jaringan multi-ruangan yang mencakup perhitungan IP addressing VLSM, segmentasi divisi dengan VLAN, konfigurasi firewall NAT, DHCP Server, serta analisis paket menggunakan Wireshark, MikroTik RouterOS (WinBox), dan Cisco Packet Tracer.",
    tags: ["MikroTik", "WinBox", "Cisco Packet Tracer", "Wireshark"],
    year: "2025",
    status: "Live",
    links: [
      {
        label: "Catatan Konfigurasi",
        href: "/blog/vlsm-dan-routing-mikrotik",
      },
      {
        label: "Profil GitHub",
        href: "https://github.com/abdinobuV",
      },
    ],
    accent: "oklch(0.7 0.14 200)",
  },
  {
    slug: "administrasi-server-linux",
    title: "Lab Administrasi Server Debian Linux",
    category: "Linux dan System Administration",
    summary:
      "Konfigurasi layanan server Debian Linux: Apache Web Server, Squid Proxy caching/filtering, SSH, dan manajemen hak akses.",
    description:
      "Eksplorasi dan praktik administrasi sistem menggunakan Debian Linux melalui command line interface (CLI): instalasi dan virtual host Apache2, pemblokiran situs & caching dengan Squid Proxy Server, otomasi skrip bash dasar, serta pemantauan trafik jaringan.",
    tags: ["Debian Linux", "Apache", "Squid Proxy Server", "Linux"],
    year: "2025",
    status: "Live",
    links: [
      {
        label: "Dokumentasi Lab",
        href: "/blog/catatan-server-debian-proxy",
      },
    ],
    accent: "oklch(0.65 0.15 150)",
  },
  {
    slug: "arduino-elektronika-dasar",
    title: "Sistem Kontrol Sensor & Relay Berbasis Arduino",
    category: "Embedded System",
    summary:
      "Purwarupa otomasi berbasis mikrokontroler Arduino dengan pembacaan sensor lingkungan dan aktuator relay di Proteus & Wokwi.",
    description:
      "Perancangan dan simulasi rangkaian elektronika dasar berbasis mikrokontroler Arduino Uno. Mengintegrasikan sensor suhu/jarak dengan modul relay untuk kendali beban otomatis, disimulasikan dan diuji skematiknya melalui Proteus, Wokwi, dan Tinkercad.",
    tags: ["Arduino", "Proteus", "Wokwi", "Tinkercad"],
    year: "2025",
    status: "Dalam proyek",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/abdinobuV",
      },
    ],
    accent: "oklch(0.74 0.13 40)",
  },
]
