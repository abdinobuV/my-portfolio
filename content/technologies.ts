import type { SimpleIcon } from "simple-icons"
import {
  siAndroidstudio,
  siApache,
  siArduino,
  siCisco,
  siCss,
  siDebian,
  siFigma,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGoogle,
  siHtml5,
  siJavascript,
  siLinux,
  siMikrotik,
  siMysql,
  siNextdotjs,
  siPhp,
  siProteus,
  siReact,
  siReactrouter,
  siTailwindcss,
  siTinkercad,
  siTypescript,
  siVercel,
  siVite,
  siWireshark,
} from "simple-icons"

export type Technology = {
  label: string
  icon: SimpleIcon
}

/**
 * Teknologi yang dipakai — terutama dari portfolio-data.md; Next.js/Vite
 * ditambahkan karena stack website ini sendiri (md: pakai teknologi yang
 * benar-benar digunakan).
 * Productivity Tools (Microsoft Word/PowerPoint/Excel), WinBox, Squid Proxy,
 * Cacti, Wokwi, dan Canva dilewati karena tidak tersedia di simple-icons.
 */
export const technologies: Technology[] = [
  { label: "MikroTik", icon: siMikrotik },
  { label: "Cisco", icon: siCisco },
  { label: "Linux", icon: siLinux },
  { label: "Debian", icon: siDebian },
  { label: "Apache", icon: siApache },
  { label: "Wireshark", icon: siWireshark },
  { label: "HTML5", icon: siHtml5 },
  { label: "CSS", icon: siCss },
  { label: "JavaScript", icon: siJavascript },
  { label: "TypeScript", icon: siTypescript },
  { label: "React", icon: siReact },
  { label: "React Router", icon: siReactrouter },
  { label: "Next.js", icon: siNextdotjs },
  { label: "Tailwind CSS", icon: siTailwindcss },
  { label: "Vite", icon: siVite },
  { label: "MySQL", icon: siMysql },
  { label: "PHP", icon: siPhp },
  { label: "Firebase", icon: siFirebase },
  { label: "Google Apps Script", icon: siGoogle },
  { label: "Figma", icon: siFigma },
  { label: "Git", icon: siGit },
  { label: "GitHub", icon: siGithub },
  { label: "Vercel", icon: siVercel },
  { label: "Flutter", icon: siFlutter },
  { label: "Android Studio", icon: siAndroidstudio },
  { label: "Arduino", icon: siArduino },
  { label: "Proteus", icon: siProteus },
  { label: "Tinkercad", icon: siTinkercad },
]

/** Ikon brand untuk label tag pada kartu proyek / chip hero (fallback: tanpa ikon). */
export const techIconByLabel: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  React: siReact,
  "React Router": siReactrouter,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Tailwind: siTailwindcss,
  HTML5: siHtml5,
  CSS: siCss,
  Vite: siVite,
  MySQL: siMysql,
  PHP: siPhp,
  Firebase: siFirebase,
  "Google Apps Script": siGoogle,
  Figma: siFigma,
  Flutter: siFlutter,
  "Android Studio": siAndroidstudio,
  Git: siGit,
  GitHub: siGithub,
  Vercel: siVercel,
  Linux: siLinux,
  Debian: siDebian,
  "Debian Linux": siDebian,
  Apache: siApache,
  Wireshark: siWireshark,
  MikroTik: siMikrotik,
  "Cisco Packet Tracer": siCisco,
  Cisco: siCisco,
  Arduino: siArduino,
  Proteus: siProteus,
  Tinkercad: siTinkercad,
}
