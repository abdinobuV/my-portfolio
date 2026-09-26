export const profile = {
  // TODO: portfolio-data.md — "Data yang Masih Perlu Dilengkapi: Nama lengkap"
  name: "Abdi Raihan Wibowo",
  role: "Mahasiswa Pendidikan Teknologi Informatika dan Komputer",
  focus: "Computer Networking, Linux & Educational Technology",
  /** Bio hero — segment teks mengalir dengan chip inline (dari portfolio-data.md) */
  heroBio: [
    {
      type: "text",
      value:
        "Saya mahasiswa Pendidikan Teknologi Informatika dan Komputer di Universitas Negeri Medan, dengan latar belakang Teknik Komputer dan Jaringan dari SMK serta minat utama pada",
    },
    { type: "chip", value: "Computer Networking" },
    { type: "chip", value: "Linux" },
    {
      type: "text",
      value:
        "— senang mempelajari cara kerja jaringan komputer, konfigurasi sistem, serta pengembangan website dan aplikasi sederhana.",
    },
  ],
  /** Profile — portfolio-data.md */
  bio: "Saya adalah mahasiswa Pendidikan Teknologi Informatika dan Komputer di Universitas Negeri Medan. Saya memiliki latar belakang Teknik Komputer dan Jaringan dari SMK, dengan minat utama pada computer networking dan Linux.",
  /** Profile paragraf 2 — portfolio-data.md */
  bioSecondary:
    "Saya senang mempelajari cara kerja jaringan komputer, melakukan konfigurasi sistem, serta mengembangkan website dan aplikasi sederhana. Saat ini, saya terus mengembangkan kemampuan teknis dan komunikasi melalui berbagai latihan, proyek, dan kegiatan akademik.",
  /** Focus Areas — portfolio-data.md */
  focusAreas: [
    "Computer Networking",
    "Linux dan administrasi sistem dasar",
    "Educational Technology",
    "Web Development",
    "UI/UX dan desain antarmuka",
  ],
  /** Soft Skills — portfolio-data.md */
  softSkills: [
    "Kemauan belajar",
    "Pemecahan masalah",
    "Berpikir logis dan analitis",
    "Ketelitian dalam konfigurasi teknis",
    "Komunikasi",
    "Kerja sama tim",
    "Manajemen waktu",
    "Adaptasi terhadap teknologi baru",
  ],
  /** Interests — portfolio-data.md */
  interests: [
    "Computer networking",
    "Linux dan Debian",
    "Administrasi sistem",
    "Educational technology",
    "Web development",
    "UI/UX design",
    "Eksplorasi teknologi baru",
    "Pengembangan kemampuan bahasa Inggris dan komunikasi",
  ],
  /** Contact — portfolio-data.md: Lokasi */
  location: "Medan, Indonesia",
  institution: "Universitas Negeri Medan",
  /** Tile "Sekarang" di section Tentang */
  nowText:
    "Sedang memperdalam computer networking dan Linux, sambil terus mengasah kemampuan teknis dan komunikasi lewat latihan, proyek, dan kegiatan akademik.",
  /** Tile "Stack utama" di section Tentang (diambil dari Hard Skills web + database + version control) */
  mainStack: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "MySQL",
    "Git",
  ],
  /** TODO: portfolio-data.md — foto profil masih placeholder SVG */
  photos: [
    { src: "/avatars/avatar-1.svg", alt: "Foto profil Abdi Raihan Wibowo" },
    {
      src: "/avatars/avatar-2.svg",
      alt: "Foto profil alternatif (placeholder)",
    },
  ],
  email: "abdi.raihan.wibowo@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/abdinobuV", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdi-raihan-wibowo-5a5656437/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:abdi.raihan.wibowo@gmail.com",
      icon: "email",
    },
  ],
  cvUrl: "/cv.pdf",
  year: new Date().getFullYear(),
} as const
