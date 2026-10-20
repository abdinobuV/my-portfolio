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
| Hero | Nama stagger, badge + stats **micro-tilt** (pointer fine), CTA magnetic, parallax ringan pada stats |
| Section | Scroll-linked **enter** (opacity/y) + **exit dissolve** (opacity floor 0.2) kecuali footer (enter whileInView saja) |
| Smooth scroll | Lenis: inertia wheel desktop, touch native mobile, `anchors: true`, mati/instan pada reduced-motion |
| Projects | Grid filter, SpotlightCard, dialog detail + link eksternal |
| Skills | Tabs kategori + progress bar |
| Timeline | Daftar kronologis; reveal pada **parent list** (bukan per-item) |
| Dashboard | Counter animasi + chart (line/radar/bar) di wrapper Reveal |
| Contact | Form RHF + zod (schema bersama di `lib/contact.ts`), server action, success + confetti |
| Blog | Listing + SSG detail MDX (remark-gfm, rehype-slug/highlight) |
| Tema | Light/dark (next-themes), hotkey `d` |
| Transisi page | View Transition API (`page-content`, header/footer anchored) |
| A11y | Skip-link, reduced-motion respect, DOM identik saat reduce, label form |
| Performa | Animasi hanya `opacity`/`transform`, motion value (tanpa re-render per frame), parity desktop↔mobile |

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

- Next.js **16.3.4** (App Router, Turbopack), React **19.2.8**, TypeScript.
- Tailwind CSS **v4**, shadcn/ui components (radix + `cn` from package `cn`).
- **framer-motion 13** for entrance, scrub, springs; **Lenis 1.3** for smooth scroll.
- MDX via `next-mdx-remote` + gray-matter for posts.
- Forms: react-hook-form + zod 4 (`z.email()`).
- Charts: Recharts. Icons: lucide-react.
- Theming: next-themes.

### Architecture

- **Server-first pages** with client islands for interactive sections (hero, skills, projects, dashboard, contact form, navbar, animations).
- **Root layout** owns ThemeProvider → LenisProvider → skip-link → Navbar → main → Footer.
- **View Transition** wrapper lives in each `page.tsx` (not layout) per Next 16 constraints.
- **Content layer**: `content/` modules (`profile`, `projects`, `skills`, `timeline`, `dashboard`, `posts/`) — UI never hardcodes identity data.
- **Motion tokens**: single `motion.theme.ts` (transitions `ui`/`gentle`/`snap`, stagger, `travel.section`/`tilt`, `scrub.exitOpacity`).

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
- Existing: Magnetic CTAs, SpotlightCard, Parallax on hero stats, Confetti on contact success.

### Interaction & a11y decisions

- Navbar active section only when `pathname === "/"`.
- ThemeToggle gates `aria-label` / `isDark` on `useSyncExternalStore` mounted flag (hydration-safe).
- Reduced-motion: **never branch DOM structure** on `useReducedMotion()` (null on server / boolean on client) — same tags, `initial={false}` / omit motion style.
- Profile `year` is a static build-time value in content (avoids hydration mismatch on `new Date()`).

### Quality gates

- Scripts: `typecheck`, `lint`, `build` must pass before commit.
- ESLint: Next + strict `react-hooks/set-state-in-effect` (no setState directly in effect bodies).

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
| **Route smoke (highest)** | `/`, `/blog`, `/blog/[slug]` SSG, `404` return HTML and expected landmarks | Primary automated seam when tests are added |
| **Contact form contract** | Invalid payload → Indonesian field errors; transport belum tersambung → `success: false` + pesan jujur (form tidak pernah melaporkan sukses palsu); transport tersambung → `success: true` | Best unit/integration seam without DOM animation |
| **Build gates (existing)** | `npm run typecheck`, `npm run lint`, `npm run build` | Already in use — keep as pre-commit truth |

### Explicit non-goals for tests (now)

- Per-frame scroll progress / opacity mid-values (brittle; covered by design + manual QA).
- Snapshotting motion style attributes (hydration + reduce-motion variants).
- Visual regression (no harness yet).

### Manual QA checklist (release)

- Desktop wheel inertia; mobile swipe native; anchor nav (`#tentang` … `#kontak`).
- Reduced-motion: content solid, Lenis non-smooth, tilt off.
- Pointer tilt only on fine pointers; no layout shift.
- Theme toggle + hotkey; blog ↔ home View Transition; skip-link focus.
- Footer fully visible at page bottom (scrub fallback path).

### Prior art

- No unit test runner in `package.json` today; prior art is the **build pipeline** + session QA checklists used during animation work.
- When tests land: prefer testing the **contact action** and **route modules** first (stable seams), not `components/animations/*`.

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
- Git state at writing: features through smooth-scroll/reveal/tilt on `main` (`e3f60f9`); `.opencode/` skill install may be untracked until committed.
