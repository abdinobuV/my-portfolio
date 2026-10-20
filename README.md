# Portfolio — Abdi Raihan Wibowo

Portfolio pribadi: profil, keahlian, proyek, pendidikan, dan journal belajar.
Dibangun dengan Next.js (App Router) + TypeScript, Tailwind v4, dan shadcn/ui.

three.js dipakai di dua tempat: backdrop constellation di hero, dan **peta
keterampilan 3D** di section Keahlian — 6 bidang competenceArrange di bola,
61 skill sebagai node (ukuran node = level skill), dengan garis penghubung antar
bidang yang menunjukkan hubungan nyata.

## Menjalankan secara lokal

Butuh **Node.js 20+** (teruji di Node 24).

```bash
npm install
npm run dev
```

Buka <http://localhost:3000>.

> `npm install` memakai `.npmrc` yang memblokir seluruh lifecycle script
> (`allow-scripts=`). Ini disengaja — paket yang butuh postinstall harus
> diizinkan eksplisit di `package.json` (`allowScripts`).

## Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan (Turbopack) |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (hanya `.ts`/`.tsx`) |
| `npm test` | Unit test (Vitest) |
| `npm run test:watch` | Unit test mode watch |

**Gerbang kualitas:** `typecheck` → `lint` → `test` → `build` harus lolos
sebelum commit. CI menjalankan urutan yang sama di setiap push dan PR.

## Struktur

```
app/            Route App Router
  actions/      Server action (form kontak)
  blog/         Halaman journal (index + detail SSG)
components/
  animations/   Reveal, counter, magnetic, micro-tilt, pixel transition, ...
  three/        Scene three.js (hero constellation, peta keterampilan 3D)
  layout/       Navbar, footer, section, CTA melayang
  sections/     Hero, about, skills, projects, journey, dashboard, contact
  ui/           Primitif shadcn/ui
content/        SEMUA data konten (tidak ada data identitas di dalam UI)
  posts/        Artikel journal (markdown)
lib/            Fungsi murni: posts, contact, skill-graph, random
hooks/          Kosong — tersedia untuk hook kustom
docs/PRD.md     Requirements & keputusan desain
motion.theme.ts Token animasi terpusat
```

## Mengubah konten

Selalu lewat `content/`. UI tidak pernah menyimpan data identitas.

| File | Isi |
|---|---|
| `content/profile.ts` | Nama, peran, bio, sosial, foto, `cvUrl` |
| `content/projects.ts` | Daftar proyek |
| `content/skills.ts` | 6 grup keahlian + level tiap skill |
| `content/skill-graph.ts` | Hubungan antar bidang untuk peta 3D |
| `content/timeline.ts` | Riwayat pendidikan |
| `content/dashboard.ts` | Data chart dashboard |
| `content/technologies.ts` | Ikon teknologi (simple-icons) |
| `content/posts/*.md` | Artikel journal |

Menambah artikel: buat `content/posts/nama-artikel.md` dengan frontmatter
`title`, `date`, `excerpt`, `tags`. Ekstensi `.md` dan `.mdx` keduanya didukung.

Menambah skill: `content/skills.ts` → masukkan ke `skills` (dengan progress bar)
atau `more` (chip). Node 3D-nya ikut menyesuaikan otomatis.

## Konvensi

- **TypeScript strict.** Tidak ada `any`, tidak ada `@ts-ignore`.
- **Server Component secara default.** Tambahkan `"use client"` hanya bila
  benar-benar butuh state/efek di browser.
- **Token warna** ada di `app/globals.css` (`--chart-*`, `--ring`, `--border`, …).
  Nilai warna untuk 3D ada di `components/sections/skills-map.tsx`.
  Semua rasio kontras diuji terhadap WCAG AA — ubah token, lalu cek ulang.
- **Animasi** memakai token dari `motion.theme.ts`, bukan durasi hardcode.
- **three.js/R3F** hanya boleh di file `components/three/`. Aturan lint
  React Compiler dimatikan khusus di sana, dengan alasan tertulis.

## Environment variables

Belum ada env var yang wajib. Lihat `.env.example` untuk placeholder yang
disiapkan ke depan (form kontak belum tersambung ke layanan email — form
sengaja memberi tahu pengirim alih-alih melaporkan sukses).

## Deploy

Repo ini tidak memaksa provider tertentu. Build-nya output Next.js standar:

```bash
npm run build && npm run start
```

Untuk hosting statis, tambahkan `output: "export"` di `next.config.ts` (belum
diuji untuk semua fitur — animasi dan `not-found` mungkin perlu penyesuaian).

## Dokumentasi

- `docs/PRD.md` — requirements, keputusan teknis, dan QA checklist
- `.opencode/plans/` — catatan rencana implementasi

## Lisensi

Kode dalam repo ini milik pemilik repositori.
