# Rencana — Peta Keterampilan 3D

Status: **selesai** — semua commit sudah masuk di `main`.
Fokus: 3D dulu. Antrean non-3D (README, CI, vitest, SEO, dead code) ditunda.

## Keputusan yang sudah dikunci

- 3D dipakai untuk **peta keterampilan** — visualisasi yang menambah informasi (pola spasial antar bidang + hubungan antar skill), bukan dekorasi.
- Arah visual: **konsisten dengan estetika brutalis/terminal** — monokrom amber, wireframe, tanpa glossy PBR.
- Layout: **peta 3D di atas, Tabs tetap ada di bawah** (pola "chart + tabel data").
- **Ukuran node = level skill** (62–88 → 0.053–0.087), jadi bentuknya sendiri sudah membawa data.
- 3D hanya di ≥1024px + WebGL + `prefers-reduced-motion: no-preference`. Selain itu → Tabs saja.

## Data yang dipakai

`content/skills.ts` → `skillGroups`: 6 grup, 61 node (45 `skills` + 16 `more`), level 62–88.

| id | nama | jumlah node |
|---|---|---|
| network | Jaringan Komputer | 10 |
| devices-monitoring | MikroTik, Cisco & Monitoring | 8 |
| linux-server | Linux & Server | 7 |
| web | Web Development | 8 |
| backend-data | Backend & Database | 7 |
| tools | Tools & Pendukung | 21 |

## Peta file

| File | Status | Isi |
|---|---|---|
| `lib/skill-graph.ts` | baru | Fungsi murni `buildSkillGraph(groups, links)` → `{ nodes, edges, hubs }`. PRNG ber-seed (mulberry32) + Fibonacci sphere → posisi deterministik, stabil tiap muat & tiap resize. |
| `content/skill-graph.ts` | baru | 13 hubungan antar grup (id → id), didefinisikan manual. |
| `components/three/skill-scene.tsx` | baru | Scene R3F: points + edges + hub, shader radial untuk titik bulat lembut, interaksi pointer. |
| `components/sections/skills-map.tsx` | baru | Gerbang (WebGL / motion / viewport), tooltip, kontrol zoom, sinkron state. |
| `components/sections/skills.tsx` | ubah | Section "Keahlian": peta 3D di atas, Tabs di bawah, state `active` dibagi. |
| `content/skills.ts` | ubah | Buang `skillCategories` + tipe `SkillCategory` (130 baris mati, level-nya bentrok dengan `skillGroups`). |
| `components/three/hero-canvas.tsx` | ubah | `pointColor`/`lineColor` → amber (sekarang dua-duanya abu-abu identik, tak cocok ramp chart baru). |
| `components/three/hero-scene.tsx` | ubah | `Math.random()` → PRNG ber-seed agar komposisi stabil. |

## Layout 3D

- 6 hub di bola Fibonacci, radius 2.4.
- 61 skill mengelilingi hub-nya (radius 0.75–1.15), sebaran Fibonacci + rotasi ber-seed per grup.
- Radius node = `0.05 + ((level - 60) / 30) * 0.04`.
- Edge: hub→skill (opacity rendah) + 13 edge antar grup.
- Grid: 3 lingkaran konsentris + sumbu, garis wireframe (bahasa visual "radar").

## ID node

`${groupId}/${slug}` dengan slug = nama skill lowercase, non-alnum → `-`.
Contoh: `network/tcp-ip`, `devices-monitoring/konfigurasi-dasar-mikrotik-winbox`.
Slug wajib unik per grup — diverifikasi skrip build.

## Interaksi

| Gestur | Hasil |
|---|---|
| Pointer bergerak | Node terdekat disorot + tooltip (nama · level · grup) |
| Klik node | Set `active` → Tabs di bawah ikut berganti; node menyala |
| Klik hub | Fokus grup: node lain memudar, kamera mundur sedikit |
| Drag | Orbit (rotasi X/Y) |
| Scroll | **Tidak diintervensi** — scroll halaman & Lenis tetap normal |
| Tombol `+` / `−` | Zoom kamera (`aria-label` Indonesia) |

## Hasil & temuan saat pengerjaan

| Temuan | decisions |
|---|---|
| Raycast titik R3F punya toleransi jauh lebih ketat daripada hover berbasis koordinat layar → klik bisa meleset dari node yang terlihat disorot. | Klik diproses dari node yang **sedang disorot**, bukan raycast terpisah. Klik selalu sesuai dengan yang dilihat. |
| `state.pointer` R3F tetap berisi posisi terakhir setelah kursor keluar canvas → node terus dianggap tersorot. | Ditambah penanda `pointerInside`; hover hanya dihitung saat kursor benar-benar di atas canvas. |
| `useSyncExternalStore` (bukan `setState` di dalam effect) untuk deteksi WebGL & lebar viewport — pola yang sama dipakai `theme-toggle.tsx`. | Menyamakan dengan `theme-toggle.tsx`, sekaligus menghindari hydration mismatch. |
| Aturan React Compiler (`react-hooks/immutability`) menolak mutasi objek three.js. | Di-*disable* khusus di file scene, dengan alasan tertulis: three.js memang mutable, dan R3F yang memiliki siklus render-nya. |
| `--virtual-time-budget` pada Chrome headless menyelesaikan virtual time sebelum request jaringan selesai → screenshot tampak kosong padahal canvas merender. | Verifikasi memakai driver CDP (WebSocket bawaan Node 22+) dengan waktu nyata, bukan `--screenshot`. |
| "Ghost" pada heading Playfair ternyata artefak downscaling PNG, bukan bug. | Dikonfirmasi: 1 elemen di DOM, tanpa text-shadow/filter, font termuat; pada zoom 5× heading bersih sempurna. |

## Verifikasi

- `npm run typecheck`, `npm run lint`, `npm run build` — bersih.
- 12 pemeriksaan layout: determinisme (3 build identik), tanpa NaN, radius naik seiring level, 75 edge resolve, slug unik, 14 edge cross lintas grup, jarak hub aman.
- Smoke test browser (Chrome headless + CDP): canvas 1022×478 ter-render, 6 label hub dengan posisi 3D live, hover menghasilkan tooltip, klik mengganti tab (Jaringan → Devices), console bersih.
- Bundle: three.js tetap lazy (chunk terpisah, tidak di initial load); initial load naik hanya ~12 KB.

## Aksesibilitas

- Wrapper canvas `aria-hidden="true"` — 3D bukan satu-satunya jalan ke informasi.
- Tabs tetap di DOM dengan state yang sama → keyboard & screen reader aman.
- Tooltip 3D `aria-hidden` (isinya sudah ada di daftar).
- Node terpilih = tab aktif → perubahan tercium pembaca layar.

## Performa

- **Nol dependensi baru, nol chunk baru** — R3F + three sudah ada; chunk three sudah lazy (tidak di initial load).
- Canvas mount saat section masuk viewport (IntersectionObserver, `rootMargin: 200px`).
- `dpr={[1, 1.75]}`, `powerPreference: "low-power"`.
- Auto-rotate lambat (0.03 rad/s), berhenti saat pointer masuk, lanjut lagi setelah idle 2.5s.
- Geometri & material di-`dispose` saat unmount.
- Tanpa postprocessing/bloom — glow dari shader radial (cukup untuk 61 titik).

## Urutan commit

1. `lib/skill-graph.ts` + `content/skills.ts` bersihkan `skillCategories`
2. `content/skill-graph.ts` — 13 hubungan antar grup
3. `components/three/skill-scene.tsx` — scene R3F
4. `components/sections/skills-map.tsx` — wrapper + gerbang + tooltip + kontrol
5. `components/sections/skills.tsx` — integrasi + sinkron state
6. `components/three/hero-*` — palet amber + seed deterministik
7. Verifikasi layout via skrip node (determinisme, tanpa NaN, slug unik, edge valid)

## Risiko & mitigasi

| Risiko | Mitigasi |
|---|---|
| Scroll halaman mati saat pointer di canvas | Wheel tidak diintervensi; zoom via tombol |
| Layout shift saat 3D mount | Tinggi container dikunci; Tabs fallback SSR |
| 2 konteks WebGL | Hero sudah di-unmount saat off-screen; skills mount saat masuk viewport |
| Terasa berat di HP | 3D hanya ≥1024px; mobile tetap Tabs |
| Terlalu ramai secara visual | Satu hero visual; auto-rotate lambat; tanpa postprocessing |
| Label overlay meleset | Posisi di-update tiap frame via proyeksi kamera; disembunyikan di luar frustum |
