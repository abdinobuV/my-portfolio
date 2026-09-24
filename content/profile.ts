export const profile = {
  name: "Abdi Raihan Wibowo",
  role: "Frontend Developer",
  focus: "React & Next.js",
  /** Bio hero — segment teks mengalir dengan chip teknologi inline (dummy) */
  heroBio: [
    {
      type: "text",
      value:
        "Saya frontend developer yang membangun antarmuka web dari nol dengan",
    },
    { type: "chip", value: "TypeScript" },
    { type: "chip", value: "React" },
    { type: "chip", value: "Next.js" },
    { type: "chip", value: "Tailwind CSS" },
    {
      type: "text",
      value:
        "— fokus pada kecepatan, aksesibilitas, dan detail interaksi yang membuat user nyaman. Di luar kode, saya menulis journal belajar supaya progres tidak hilang begitu saja.",
    },
  ],
  bio: "Saya seorang pengembang web yang sedang giat belajar membangun produk digital dari nol. Fokus saya di frontend: TypeScript, React, dan detail interaksi yang membuat user nyaman. Di luar kode, saya menulis journal belajar supaya progres tidak hilang begitu saja.",
  location: "Indonesia",
  /** Foto profil — klik untuk berganti (dummy, ganti file untuk foto asli) */
  photos: [
    { src: "/avatars/avatar-1.svg", alt: "Foto profil Abdi Raihan Wibowo" },
    {
      src: "/avatars/avatar-2.svg",
      alt: "Foto profil alternatif (placeholder)",
    },
  ],
  email: "abdi@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Email", href: "mailto:abdi@example.com", icon: "email" },
  ],
  cvUrl: "/cv.pdf",
  year: new Date().getFullYear(),
} as const
