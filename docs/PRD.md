# PRD — Portfolio Web Abdi Raihan Wibowo

> Dihasilkan dengan skill `to-spec` (sintesis percakapan + codebase; tanpa interview).  
> Tracker issue belum dikonfigurasi (`/setup-matt-pocock-skills` belum dijalankan) — PRD disimpan sebagai dokumen repo, bukan issue.

---

## Problem Statement

Sebagai frontend developer Indonesia yang sedang membangun karier, saya butuh **satu situs personal** yang:

1. Menampilkan identitas, keahlian, proyek, perjalanan, dan cara menghubungi saya secara kredibel.
2. Membuktikan kemampuan frontend (React/Next.js, animasi, aksesibilitas, performa) lewat pengalaman itu sendiri — bukan hanya daftar bullet.
3. Memiliki journal/blog agar belajar terdokumentasi dan bisa dibagikan.
4. Tetap **responsif, aksesibel, dan cepat** di desktop maupun mobile, termasuk saat `prefers-reduced-motion`.
5. Bisa dideploy statis (Vercel/dll) tanpa backend database, dengan konten yang mudah diperbarui.

Situs lama/template default tidak memenuhi: tidak ada personalisasi, tidak ada bukti craft animasi, dan tidak ada alur konten editorial.

---

## Solution

Situs **portfolio + journal** one-page-first (home) dengan blog MDX, dibangun di **Next.js 16 App Router + shadcn/ui (preset Sera) + Tailwind v4 + framer-motion + Lenis**, konten berbahasa Indonesia data-dummy yang nanti diganti asli.

**Alamat utama:** `/`  
**Halaman lain:** `/blog`, `/blog/[slug]`, `404`

### Pengalaman inti (product requirements)

| Area | Requirement |
|------|-------------|
| Navigasi | Navbar sticky, shrink saat scroll, active section (IntersectionObserver di `/`), link Blog, mobile sheet, link CV (LinkedIn) |
| Hero | Nama stagger, badge + stats **micro-tilt** (pointer fine), CTA magnetic, backdrop WebGL constellation (amber, lazy) |
| Section | Scroll-linked **enter** (opacity/y) + **exit dissolve** (opacity floor 0.2) kecuali footer (enter whileInView saja) |
| Smooth scroll | Lenis: inertia wheel desktop, touch native mobile, `anchors: true`, mati/instan pada reduced-motion |
| Projects | Grid filter, SpotlightCard, dialog detail + link eksternal |
| Skills | **Peta keterampilan 3D** (6 bidang, 61 node, ukuran = level) + Tabs kategori dengan progress bar; keduanya berbagi state, daftar tetap jadi sumber kebenaran |
| Timeline | Daftar kronologis; reveal pada **parent list** (bukan per-item) |
| Dashboard | Counter animasi + chart (line/radar/bar) di wrapper Reveal; chart dimuat saat section didekati |
| Contact | Form RHF + zod (schema bersama di `lib/contact.ts`), server action, success + confetti — dan **tidak pernah** melapor sukses bila transport belum tersambung |
| Blog | Listing + SSG detail MDX (remark-gfm, rehype-slug/highlight), dukungan `.md` & `.mdx` |
| Tema | Light/dark (next-themes), hotkey `d` |
| Transisi page | View Transition API (`page-content`, header/footer anchored) |
| A11y | Skip-link, reduced-motion respect, DOM identik saat reduce, label form, hierarki heading benar di semua halaman |
| Performa | Animasi hanya `opacity`/`transform`, motion value (tanpa re-render per frame), parity desktop↔mobile, three.js & recharts lazy |
| SEO | Open Graph + Twitter card, `sitemap.xml` (otomatis ikut artikel baru), `robots.txt`, error boundary |

---

## User Stories

1. As a **recruiter**, I want to open the homepage and immediately understand who Abdi is and what role he targets, so that I can decide to continue reading within a few seconds.
2. As a **recruiter**, I want to scan projects in a grid with tags and years, so that I can match skills to an open role quickly.
3. As a **recruiter**, I want to open a project card for a longer description and external links, so that I can verify real work without leaving the flow mid-scan.
4. As a **recruiter**, I want to download a CV from the hero and navbar, so that I can archive the candidate for later.
5. As a **recruiter**, I want to see skills with honest percentage levels, so that I can calibrate interview questions.
6. As a **recruiter**, I want a contact form with validated fields and a clear success state, so that I can reach out without knowing the email address first.
7. As a **hiring manager**, I want a timeline of work/education/courses, so that I can see career trajectory and consistency.
8. As a **hiring manager**, I want a learning dashboard (streak, hours, skill radar), so that I can judge self-discipline, not only portfolio pieces.
9. As a **peer developer**, I want smooth, cinematic scroll with section enter/exit motion, so that the site itself demonstrates frontend craft.
10. As a **peer developer**, I want subtle pointer micro-tilt on hero badge/stats only, so that interactivity feels alive without gimmicks or mobile jank.
11. As a **mobile visitor**, I want native touch scrolling and no hover-only affordances, so that the experience stays comfortable on a phone.
12. As a **keyboard user**, I want a skip-link to `#konten` and focusable controls, so that I can navigate without a pointer.
13. As a **visitor with reduced-motion enabled**, I want all decorative animation off and content fully visible, so that I am not forced into motion that harms me.
14. As a **blog reader**, I want a chronological list with date, tags, and excerpt, so that I can choose a post to read.
15. As a **blog reader**, I want post pages with readable typography, headings anchors, and code highlight, so that technical notes are pleasant to consume.
16. As a **blog reader**, I want to return to the list with a clear “Kembali” control, so that browsing does not feel like a dead end.
17. As a **site owner**, I want light/dark theme toggle (persisted, system default), so that the site matches reader preference.
18. As a **site owner**, I want hotkey `d` to toggle theme outside form fields, so that I can switch quickly while presenting.
19. As a **site owner**, I want navbar active state to clear correctly on `/blog`, so that I never see a stale homepage hash highlight.
20. As a **site owner**, I want View Transitions between home and blog without morphing header/footer glitches, so that navigation feels continuous.
21. As a **site owner**, I want profile data in one content module, so that I can swap dummy → real identity in one place.
22. As a **site owner**, I want blog posts as MDX/markdown in `content/posts`, so that I can add posts without touching components.
23. As a **site owner**, I want static generation for blog routes, so that hosting can be pure CDN.
24. As a **site owner**, I want `npm run typecheck`, `lint`, and `build` green before every commit, so that main stays deployable.
25. As a **future maintainer**, I want animation tokens centralized (springs, stagger, travel, scrub), so that motion stays consistent when sections are added.
26. As a **future maintainer**, I want Reveal to own scroll enter/exit semantics, so that new sections inherit the pattern by default.
27. As a **future maintainer**, I want list-level reveal (timeline/blog parent), so that we do not spawn dozens of scroll observers.
28. As a **visitor on a short viewport**, I want footer content to still fade in reliably, so that the bottom of the page never looks “stuck half-transparent.”
29. As a **visitor**, I want section headings to participate in the same scroll choreography as bodies, so that hierarchy moves as one system.
30. As a **visitor**, I want project cards to keep a calm surface (`bg-card` → muted hover) under spotlight, so that motion does not fight readability.
31. As a **contact submitter**, I want client-side zod messages in Indonesian, so that I understand errors without re-reading English API jargon.
32. As a **contact submitter**, I want confetti only after success, so that celebration is honest.
33. As a **404 visitor**, I want a branded not-found page with a way home, so that I am not stranded.
34. As a **deployer**, I want no Vercel config forced by the repo beyond Next defaults, so that I choose the host myself.
35. As a **deployer**, I want secrets/env only for optional real form backends later, so that the dummy path ships with zero secrets.

---

## Implementation Decisions

### Stack

- Next.js **16.3.8** (App Router, Turbopack), React **19.2.8**, TypeScript strict.
- Tailwind CSS **v4**, shadcn/ui components (radix + `cn` from package `cn`).
- **framer-motion 13** for entrance, scrub, springs; **Lenis 1.3** for smooth scroll.
- **three.js 0.186 + @react-three/fiber 9** untuk grafik 3D (R3F, tanpa drei).
- MDX via `next-mdx-remote` + gray-matter for posts.
- Forms: react-hook-form + zod 4 (`z.email()`).
- Charts: Recharts (dimuat terpisah). Icons: lucide-react + simple-icons.
- Theming: next-themes.
- Test: **Vitest 3** (unit test untuk `lib/`).

### Architecture

- **Server-first pages** with client islands for interactive sections (hero, skills, projects, dashboard, contact form, navbar, animations).
- **Root layout** owns ThemeProvider → LenisProvider → skip-link → Navbar → main → Footer.
- **View Transition** wrapper lives in each `page.tsx` (not layout) per Next 16 constraints.
- **Content layer**: `content/` modules (`profile`, `projects`, `skills`, `skill-graph`, `timeline`, `dashboard`, `technologies`, `posts/`) — UI never hardcodes identity data.
- **Motion tokens**: single `motion.theme.ts` (transitions `ui`/`gentle`/`snap`, stagger, `travel.section`/`tilt`, `scrub.exitOpacity`).
- **Pure logic lives in `lib/`** and has no React/three dependency, so it can be unit-tested directly: `skill-graph` (layout 3D), `contact` (schema + transport), `posts` (loader artikel), `random` (PRNG + Fibonacci sphere).

### Grafik 3D

- Dua tempat: **backdrop constellation** di hero, dan **peta keterampilan 3D** di section Keahlian.
- Peta keterampilan: 6 hub bidang competenceArrange di bola Fibonacci, 61 skill mengelilingi hub-nya, **ukuran node proporsional level skill**, 14 garis penghubung antar bidang.
- **Layout wajib deterministik** — `Math.random()` membuat konstelasi "reset" sendiri tiap viewport berubah. Dipakai `lib/random.ts` (mulberry32 + Fibonacci sphere) oleh hero maupun peta.
- **Interaksi**: hover menyorot node terdekat (pemindaian koordinat layar, bukan raycast — toleransinya lebih longgar sehingga node kecil tetap gampang ditunjuk); klik memilih node yang **sedang disorot** supaya selalu sesuai dengan yang dilihat; drag untuk memutar (pointer capture).
- **Scroll halaman tidak boleh diintervensi** — wheel dibiarkan untuk Lenis; zoom lewat tombol.
- **Gerbang render**: hanya di ≥1024px + WebGL tersedia + `prefers-reduced-motion: no-preference`. Selain itu daftar biasa yang tampil.
- **Tidak boleh ada informasi yang hanya ada di 3D** — Tabs Keahlian tetap dirender di DOM dengan state yang sama, jadi peta 3D adalah visualisasi, bukan pengganti data.
- three.js di-import **dinamis** (`ssr: false`) supaya tidak masuk ke initial load.

### Scroll & motion system

- Lenis **root** mode (no wrapper divs — sticky/anchors stay native): `autoRaf`, `anchors`, `smoothWheel`, `syncTouch: false`, `respectReducedMotion`, `stopInertiaOnNavigate`.
- Route change: scroll reset via ref (no `setState` in effect), skipped when URL has a hash.
- **Reveal dual-mode**:
  - Default: scroll-linked enter (`start 90%` → `start 40%`) + exit dissolve (`end 45%` → `end 5%`, floor `0.2`).
  - `exit={false}`: classic `whileInView` enter (footer / short end-of-page content where scrub offsets never complete).
  - `stagger`: parent opacity scrub + child `whileInView` stagger.
- **Lists** (timeline, blog): single parent Reveal — one scroll tracker, not per-item.
- **SectionHeading**: same Reveal choreography as bodies.
- **MicroTilt**: badge strength 4, stats strength 8; only `(pointer: fine)`; off under reduced-motion.
- Existing: Magnetic CTAs, SpotlightCard, Confetti on contact success.
- Hero punya backdrop WebGL constellation (R3F) — lazy, `dpr` dibatasi, `powerPreference: low-power`, di-unmount saat off-screen, fallback CSS tanpa WebGL.

### Token warna & kontras

- Semua token warna ada di `app/globals.css` (`--chart-1..5`, `--ring`, `--border`, `--destructive`, `--muted-foreground`).
- **Ramp chart harus dibalik antar tema**: di light mode seri pertama paling terang? Tidak — justru **paling gelap di light mode, paling terang di dark mode**. Ramp yang sama untuk keduanya membuat satu seri selalu mustahil di salah satu tema.
- Semua rasio kontras diverifikasi terhadap WCAG AA (teks ≥ 4.5:1, grafis ≥ 3:1) di **kedua** tema, termasuk opasitas garis 3D.
- Warna 3D (ramp amber) diselaraskan dengan ramp chart supaya hero dan peta keterampilan terasa satu keluarga.

### Interaction & a11y decisions

- Navbar active section only when `pathname === "/"`.
- ThemeToggle gates `aria-label` / `isDark` on `useSyncExternalStore` mounted flag (hydration-safe).
- Reduced-motion: **never branch DOM structure** on `useReducedMotion()` (null on server / boolean on client) — same tags, `initial={false}` / omit motion style.
- Profile `year` is a static build-time value in content (avoids hydration mismatch on `new Date()`).

### Quality gates

- Scripts: `typecheck`, `lint`, `test`, `build` must pass before commit.
- ESLint: Next + `react-hooks/set-state-in-effect` (no setState synchronously in effect bodies) — pola yang dipakai untuk deteksi WebGL & lebar viewport adalah `useSyncExternalStore`, bukan `setState` di effect.
- Aturan React Compiler (`react-hooks/immutability`) dimatikan **khusus** di `components/three/` — three.js memang mutable, dan R3F yang memiliki siklus render-nya. Disertai penjelasan tertulis di dalam file.
- CI: `.github/workflows/ci.yml` menjalankan `typecheck → lint → test → build` di setiap push & PR ke `main`.

### Git / delivery

- Remote: GitHub `abdinobuV/web-portfolio2`, branch `main`.
- Commit/push only when explicitly requested.
- **No Vercel deploy automation** from the agent — owner deploys.

### Tooling (agent environment)

- Project skill: `.opencode/skills/ui-ux-pro-max` (via `uipro init --ai opencode`) for future UI/UX research; Python available for its search scripts.
- License note: UI/UX Pro Max is **CC-BY-NC-4.0** (non-commercial) — do not assume commercial reuse of that skill pack.

---

## Testing Decisions

**What makes a good test (for this repo today):** assert **external behavior** the user can observe — routes render, form validation/success contract, reduced-motion leaves content visible — not framer-motion internal call counts or Lenis instance fields.

### Seams (proposed, highest first)

| Seam | What is locked down | Status |
|------|---------------------|--------|
| **Layout grafik 3D** (`lib/skill-graph.ts`) | Determinisme (seed sama → posisi sama), tanpa NaN, radius naik seiring level, 14 edge cross lintas grup, slug unik, tautan ke skill yang tidak ada ditolak | ✅ 13 unit test |
| **Loader artikel** (`lib/posts.ts`) | `.md` dan `.mdx` terbaca, slug berbahaya ditolak (path traversal), nama file invalid tidak masuk index, urutan tanggal terbaru | ✅ 9 unit test |
| **Kontrak form kontak** (`lib/contact.ts`) | Pesan error zod dalam Bahasa Indonesia, batas panjang pesan, transport tidak pernah melapor sukses palsu | ✅ 6 unit test |
| **Route smoke (tertinggi)** | `/`, `/blog`, `/blog/[slug]` SSG, `404` return HTML dan expected landmarks | Belum jadi unit test — masih manual QA + smoke test HTTP |
| **Build gates (existing)** | `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` | ✅ dipakai — jalankan sebelum commit |

### Explicit non-goals for tests (now)

- Per-frame scroll progress / opacity mid-values (brittle; covered by design + manual QA).
- Snapshotting motion style attributes (hydration + reduce-motion variants).
- Visual regression (no harness yet).
- Render 3D (butuh WebGL; tidak ada harness browser di repo — verifikasi dilakukan manual via Chrome headless + CDP).

### Manual QA checklist (release)

- Desktop wheel inertia; mobile swipe native; anchor nav (`#tentang` … `#kontak`).
- Reduced-motion: content solid, Lenis non-smooth, tilt off.
- Pointer tilt only on fine pointers; no layout shift.
- Theme toggle + hotkey; blog ↔ home View Transition; skip-link focus.
- Footer fully visible at page bottom (scrub fallback path).

### Prior art

- Test runner: **Vitest 3** (`vitest.config.ts`, alias `@/` sudah dikonfigurasi). Semua test ada di `lib/*.test.ts` — logika murni, tanpa DOM.
- Berikutnya kalau mau menambah: **route smoke test** (butuh environment jsdom atau E2E), lalu gate di CI.
- Jangan menguji `components/animations/*` — rapuh dan tidak nilai bisnisnya sebanding biayanya.

---

## Out of Scope

- Real backend/email delivery for contact (transport `sendContactMessage` di `lib/contact.ts` masih menolak — form sengaja memberi tahu pengirim, bukan melapor sukses).
- CMS, auth, analytics, i18n (single locale: `id`).
- Multi-layer background parallax / scroll hijack (rejected — a11y, SEO, long-content issues).
- Global pointer spotlight (pointer choice **A**: hero micro-tilt only).
- Automated visual regression, E2E suite (not requested yet).
- Agent-driven Vercel (or any) production deploy.
- Rewriting UI away from shadcn/Sera or replacing framer-motion.
- Commercial redistribution of the UI/UX Pro Max skill assets (NC license).

---

## Further Notes

- **Dummy data** lives under `content/`; replace `profile` first when going live (email, socials). `profile.cvUrl` saat ini menunjuk ke profil LinkedIn — ganti dengan URL PDF bila file CV tersedia.
- **Exit dissolve floor is 0.2**, not 0 — keeps partially off-screen text perceivable and avoids “vanish” on fast scroll/keyboard.
- **Footer** intentionally uses `whileInView` enter (`exit={false}`): short elements at document bottom never reach scrub enter offset `start 40%`, which previously left opacity stuck near the floor.
- **Delay props** on non-stagger Reveal are inert under scrub mode (historical API); only stagger `delayChildren` applies.
- **Issue tracker**: run `/setup-matt-pocock-skills` if you want `to-spec` / `to-tickets` to publish to GitHub Issues (`ready-for-agent`) instead of files like this PRD.
- **Initial JS diukur**: ~428 KB gzip untuk halaman `/`. recharts dimuat terpisah (hanya saat section Dashboard didekati), three.js dimuat terpisah (hanya saat WebGLNeeded). FCP lokal ~380 ms.
- **Domain situs** tidak dipaksa di repo — `lib/site.ts` memakai `NEXT_PUBLIC_SITE_URL`, lalu variabel Vercel, lalu localhost. Isi `NEXT_PUBLIC_SITE_URL` saat deploy supaya link Open Graph dan sitemap menunjuk ke domain yang benar.
