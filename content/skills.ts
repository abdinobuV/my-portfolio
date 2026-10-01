export type SkillCategory = {
  id: string
  name: string
  skills: { name: string; level: number }[]
}

export type SkillGroupIcon =
  | "network"
  | "router"
  | "server"
  | "code"
  | "database"
  | "wrench"

export type SkillGroup = {
  id: string
  name: string
  shortLabel: string
  blurb: string
  icon: SkillGroupIcon
  /** Ditampilkan sebagai progress bar (dibuat ringkas: maks 8 per tab). */
  skills: { name: string; level: number }[]
  /** Kelebihan item ditampilkan sebagai chip teks tanpa bar. */
  more: { name: string; level: number }[]
}

/** Hard Skills — portfolio-data.md. level = self-assessment (estimasi). */
export const skillCategories: SkillCategory[] = [
  {
    id: "networking",
    name: "Networking",
    skills: [
      { name: "TCP/IP", level: 85 },
      { name: "IP addressing dan subnetting", level: 85 },
      { name: "Routing", level: 80 },
      { name: "NAT", level: 80 },
      { name: "VLAN", level: 75 },
      { name: "Gateway", level: 75 },
      { name: "Network troubleshooting", level: 78 },
      { name: "Firewall dasar", level: 70 },
      { name: "QoS dasar", level: 65 },
      { name: "Konfigurasi router dan switch", level: 80 },
    ],
  },
  {
    id: "mikrotik-cisco",
    name: "MikroTik dan Cisco",
    skills: [
      { name: "Konfigurasi dasar MikroTik menggunakan WinBox", level: 80 },
      {
        name: "Konfigurasi routing, NAT, dan firewall dasar pada MikroTik",
        level: 75,
      },
      { name: "Simulasi jaringan menggunakan Cisco Packet Tracer", level: 82 },
      { name: "Konfigurasi dasar router dan switch Cisco", level: 72 },
    ],
  },
  {
    id: "linux",
    name: "Linux dan System Administration",
    skills: [
      { name: "Debian Linux", level: 85 },
      { name: "Linux command line interface (CLI)", level: 85 },
      { name: "Administrasi Linux dasar", level: 80 },
      { name: "Konfigurasi server dasar", level: 75 },
      { name: "Apache", level: 72 },
      { name: "Squid Proxy Server", level: 70 },
      { name: "Konfigurasi layanan jaringan dasar", level: 72 },
    ],
  },
  {
    id: "monitoring",
    name: "Network Monitoring dan Troubleshooting",
    skills: [
      { name: "Wireshark", level: 78 },
      { name: "Cacti", level: 68 },
      { name: "Analisis koneksi jaringan", level: 75 },
      {
        name: "Identifikasi dan troubleshooting masalah jaringan dasar",
        level: 78,
      },
    ],
  },
  {
    id: "web",
    name: "Web Development",
    skills: [
      { name: "HTML", level: 88 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 85 },
      { name: "React Router", level: 75 },
      { name: "Vite", level: 75 },
    ],
  },
  {
    id: "database",
    name: "Database dan Backend",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "SQL", level: 75 },
      { name: "phpMyAdmin", level: 72 },
      { name: "PHP", level: 65 },
      { name: "Firebase", level: 70 },
      { name: "Firestore", level: 68 },
      { name: "Google Apps Script", level: 65 },
    ],
  },
  {
    id: "uiux",
    name: "UI/UX dan Design",
    skills: [
      { name: "Figma", level: 72 },
      { name: "UI/UX design dasar", level: 70 },
      { name: "Canva", level: 80 },
      { name: "Basic graphic design", level: 70 },
      { name: "Penyusunan layout dan presentasi visual", level: 75 },
    ],
  },
  {
    id: "version-control",
    name: "Version Control dan Deployment",
    skills: [
      { name: "Git", level: 82 },
      { name: "GitHub", level: 82 },
      { name: "Vercel", level: 75 },
      { name: "Pengembangan Progressive Web App (PWA) dasar", level: 65 },
    ],
  },
  {
    id: "mobile-embedded",
    name: "Mobile dan Embedded System",
    skills: [
      { name: "Flutter", level: 68 },
      { name: "Android Studio", level: 62 },
      { name: "Pengembangan Android dasar", level: 62 },
      { name: "Arduino", level: 75 },
      { name: "Elektronika dasar", level: 70 },
      { name: "Sensor dan relay", level: 72 },
      { name: "Proteus", level: 65 },
      { name: "Wokwi", level: 68 },
      { name: "Tinkercad", level: 70 },
    ],
  },
  {
    id: "productivity",
    name: "Productivity Tools",
    skills: [
      { name: "Microsoft Word", level: 85 },
      { name: "Microsoft PowerPoint", level: 85 },
      { name: "Microsoft Excel", level: 80 },
    ],
  },
]

/**
 * Grup ringkas untuk Tabs Keahlian — 10 kategori diringkas jadi 6 grup
 * agar tinggi section ±1 panel (±75% lebih pendek saat scroll).
 * `skills` = bar utama, `more` = chip "lainnya".
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "network",
    name: "Jaringan Komputer",
    shortLabel: "Jaringan",
    blurb: "Fondasi TCP/IP, subnetting, routing, dan troubleshooting.",
    icon: "network",
    skills: [
      { name: "TCP/IP", level: 85 },
      { name: "IP addressing dan subnetting", level: 85 },
      { name: "Routing", level: 80 },
      { name: "NAT", level: 80 },
      { name: "Konfigurasi router dan switch", level: 80 },
      { name: "Network troubleshooting", level: 78 },
      { name: "VLAN", level: 75 },
    ],
    more: [
      { name: "Gateway", level: 75 },
      { name: "Firewall dasar", level: 70 },
      { name: "QoS dasar", level: 65 },
    ],
  },
  {
    id: "devices-monitoring",
    name: "MikroTik, Cisco & Monitoring",
    shortLabel: "Devices",
    blurb: "Konfigurasi perangkat dan analisis trafik jaringan.",
    icon: "router",
    skills: [
      { name: "Simulasi jaringan Cisco Packet Tracer", level: 82 },
      { name: "Konfigurasi dasar MikroTik (WinBox)", level: 80 },
      { name: "Wireshark", level: 78 },
      { name: "Troubleshooting masalah jaringan", level: 78 },
      { name: "Routing, NAT & firewall MikroTik", level: 75 },
      { name: "Analisis koneksi jaringan", level: 75 },
      { name: "Konfigurasi router & switch Cisco", level: 72 },
      { name: "Cacti", level: 68 },
    ],
    more: [],
  },
  {
    id: "linux-server",
    name: "Linux & Server",
    shortLabel: "Linux",
    blurb: "Administrasi Debian, CLI, dan layanan server dasar.",
    icon: "server",
    skills: [
      { name: "Debian Linux", level: 85 },
      { name: "Linux CLI", level: 85 },
      { name: "Administrasi Linux dasar", level: 80 },
      { name: "Konfigurasi server dasar", level: 75 },
      { name: "Apache", level: 72 },
      { name: "Layanan jaringan dasar", level: 72 },
      { name: "Squid Proxy Server", level: 70 },
    ],
    more: [],
  },
  {
    id: "web",
    name: "Web Development",
    shortLabel: "Web",
    blurb: "Membangun antarmuka modern dengan React & Tailwind.",
    icon: "code",
    skills: [
      { name: "HTML", level: 88 },
      { name: "CSS", level: 85 },
      { name: "Tailwind CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "React Router", level: 75 },
      { name: "Vite", level: 75 },
    ],
    more: [],
  },
  {
    id: "backend-data",
    name: "Backend & Database",
    shortLabel: "Backend",
    blurb: "Penyimpanan data dan logika backend dasar.",
    icon: "database",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "SQL", level: 75 },
      { name: "phpMyAdmin", level: 72 },
      { name: "Firebase", level: 70 },
      { name: "Firestore", level: 68 },
      { name: "PHP", level: 65 },
      { name: "Google Apps Script", level: 65 },
    ],
    more: [],
  },
  {
    id: "tools",
    name: "Tools & Pendukung",
    shortLabel: "Tools",
    blurb: "Version control, desain, dan produktivitas harian.",
    icon: "wrench",
    skills: [
      { name: "Microsoft Word", level: 85 },
      { name: "Microsoft PowerPoint", level: 85 },
      { name: "Git", level: 82 },
      { name: "GitHub", level: 82 },
      { name: "Microsoft Excel", level: 80 },
      { name: "Canva", level: 80 },
      { name: "Vercel", level: 75 },
      { name: "Figma", level: 72 },
    ],
    more: [
      { name: "Penyusunan layout visual", level: 75 },
      { name: "Arduino", level: 75 },
      { name: "Sensor dan relay", level: 72 },
      { name: "UI/UX design dasar", level: 70 },
      { name: "Basic graphic design", level: 70 },
      { name: "Elektronika dasar", level: 70 },
      { name: "Tinkercad", level: 70 },
      { name: "Flutter", level: 68 },
      { name: "Wokwi", level: 68 },
      { name: "Proteus", level: 65 },
      { name: "PWA dasar", level: 65 },
      { name: "Pengembangan Android dasar", level: 62 },
      { name: "Android Studio", level: 62 },
    ],
  },
]
