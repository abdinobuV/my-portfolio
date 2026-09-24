---
title: "Checklist responsif yang selalu saya pakai"
date: "2026-07-03"
excerpt: "Mobile-first bukan sekadar media query. Ini checklist konkret sebelum menaruh project ke production."
tags: ["css", "ui"]
---

## Sebelum commit

- [ ] Uji di lebar **320px** (iPhone SE lama) — tidak ada teks terpotong.
- [ ] Uji di lebar **768px** dan **1024px** — layout tidak "setengah jadi".
- [ ] Target sentuh minimal **44×44px**.
- [ ] Navigasi utama bisa dipakai **keyboard** (Tab, Enter, Escape).
- [ ] Tidak ada **horizontal scroll** yang tidak disengaja.
- [ ] Gambar punya `width`/`height` (atau aspect-ratio) supaya tidak layout shift.

## Pola yang sering berhasil

Gunakan CSS Grid untuk bagian yang butuh alignment tegas:

```css
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

Untuk tipografi, skala fluid lebih aman daripada breakpoint teks yang banyak:

```css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
```

## Catatan

Responsif itu urusan **konten**, bukan device. Tanyakan: kalau kolom ini menyempit, informasi mana yang harus tetap terbaca duluan?
