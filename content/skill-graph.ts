import type { SkillLink } from "@/lib/skill-graph"

/**
 * Hubungan antar grup — alasan mengapa dua skill di bidang berbeda saling
 * terkait. Dipakai untuk menarik garis melintang constellation, supaya peta
 * menunjukkan konektivitas, bukan sekadar enam kelompok terpisah.
 *
 * Ditulis sebagai `group` + `name` (bukan slug) supaya salah ketik langsung
 * ketahuan saat build graph, bukan diam-diam menggambar garis hilang.
 */
export const skillLinks: SkillLink[] = [
  // Konsep jaringan -> tempat praktik dan alatnya
  {
    from: { group: "network", name: "TCP/IP" },
    to: { group: "devices-monitoring", name: "Simulasi jaringan Cisco Packet Tracer" },
  },
  {
    from: { group: "network", name: "Routing" },
    to: { group: "devices-monitoring", name: "Routing, NAT & firewall MikroTik" },
  },
  {
    from: { group: "network", name: "NAT" },
    to: { group: "devices-monitoring", name: "Routing, NAT & firewall MikroTik" },
  },
  {
    from: { group: "network", name: "Network troubleshooting" },
    to: { group: "devices-monitoring", name: "Troubleshooting masalah jaringan" },
  },
  {
    from: { group: "network", name: "Network troubleshooting" },
    to: { group: "devices-monitoring", name: "Wireshark" },
  },
  {
    from: { group: "network", name: "Konfigurasi router dan switch" },
    to: { group: "devices-monitoring", name: "Konfigurasi router & switch Cisco" },
  },
  {
    from: { group: "network", name: "Firewall dasar" },
    to: { group: "linux-server", name: "Squid Proxy Server" },
  },
  // Server -> data
  {
    from: { group: "linux-server", name: "Konfigurasi server dasar" },
    to: { group: "backend-data", name: "MySQL" },
  },
  {
    from: { group: "linux-server", name: "Linux CLI" },
    to: { group: "tools", name: "Git" },
  },
  // Frontend -> backend & desain
  {
    from: { group: "web", name: "React" },
    to: { group: "backend-data", name: "Firebase" },
  },
  {
    from: { group: "web", name: "CSS" },
    to: { group: "tools", name: "UI/UX design dasar" },
  },
  {
    from: { group: "web", name: "Tailwind CSS" },
    to: { group: "tools", name: "Figma" },
  },
  {
    from: { group: "tools", name: "Vercel" },
    to: { group: "web", name: "React" },
  },
  {
    from: { group: "backend-data", name: "Google Apps Script" },
    to: { group: "tools", name: "Microsoft Excel" },
  },
]
