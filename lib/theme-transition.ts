/**
 * Transisi ganti tema dengan View Transitions API (imperatif).
 *
 * `setTheme` dari next-themes adalah setState biasa, jadi `<ViewTransition>`
 * React tidak aktif — di sinilah `document.startViewTransition()` dipakai.
 * Di dalam callback update, `flushSync` memaksa commit React sinkron, lalu
 * `nextPaint` menunggu useEffect next-themes (pemasangan class .dark) + paint
 * sebelum browser meng-capture snapshot baru.
 * Selama transisi berjalan kelas `theme-sweep` dipasang di <html>;
 * CSS-nya ada di app/globals.css (reveal lingkaran + feather lembut dari
 * `--theme-x`/`--theme-y`).
 *
 * Header/footer memakai `view-transition-name` persisten (untuk anchoring
 * navigasi halaman). Selama ganti tema nama itu dinetralkan sementara
 * supaya mereka ikut snapshot `root` dan meleleh bersama halaman — bukan
 * loncat langsung ke tema baru.
 */

import { flushSync } from "react-dom"

type TransitionLike = { finished: Promise<void> }
type StartViewTransition = (update: () => void | Promise<void>) => TransitionLike

type SavedAnchor = { el: HTMLElement; value: string; priority: string }

/** Pakai token supaya toggle cepat-berturut tidak saling menghapus kelas. */
let runId = 0

/** Nilai asli view-transition-name; hanya disimpan sekali antar toggle cepat. */
let savedAnchors: SavedAnchor[] | null = null

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function setOrigin(x?: number, y?: number) {
  const root = document.documentElement
  root.style.setProperty("--theme-x", `${x ?? window.innerWidth / 2}px`)
  root.style.setProperty("--theme-y", `${y ?? window.innerHeight / 2}px`)
}

function stripAnchors() {
  if (savedAnchors) return
  const els = document.querySelectorAll<HTMLElement>(
    '[style*="view-transition-name"]:not([vt-name])'
  )
  savedAnchors = Array.from(els, (el) => ({
    el,
    value: el.style.getPropertyValue("view-transition-name"),
    priority: el.style.getPropertyPriority("view-transition-name"),
  }))
  for (const { el } of savedAnchors) {
    el.style.setProperty("view-transition-name", "none", "important")
  }
}

function restoreAnchors() {
  if (!savedAnchors) return
  for (const { el, value, priority } of savedAnchors) {
    if (value) {
      el.style.setProperty("view-transition-name", value, priority)
    } else {
      el.style.removeProperty("view-transition-name")
    }
  }
  savedAnchors = null
}

function clearThemeSweep(id: number) {
  if (id !== runId) return
  const root = document.documentElement
  root.classList.remove("theme-sweep")
  root.style.removeProperty("--theme-x")
  root.style.removeProperty("--theme-y")
  restoreAnchors()
}

/** Tunggu sampai React selesai commit (kelas .dark/terang sudah di <html>).
 * setTimeout sebagai pengaman: resolve walau frame macet, supaya promise
 * update tidak pernah menggantung (Chromium meng-abort dengan TimeoutError). */
function nextPaint() {
  return new Promise<void>((resolve) => {
    let settled = false
    const done = () => {
      if (!settled) {
        settled = true
        resolve()
      }
    }
    requestAnimationFrame(() => requestAnimationFrame(done))
    setTimeout(done, 120)
  })
}

export function transitionTheme(
  update: () => void,
  origin?: { x: number; y: number }
) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    update()
    return
  }

  // Panggil via .call(document, ...): native API throw "Illegal invocation"
  // bila referensinya dilepas dari receiver-nya.
  const startViewTransition = document.startViewTransition as
    | StartViewTransition
    | undefined
  // Tab hidden: rAF bekukan → promise update menggantung → Chromium
  // meng-abort dengan TimeoutError. Langsung ganti tema tanpa transisi.
  if (
    !startViewTransition ||
    reducedMotion() ||
    document.visibilityState === "hidden"
  ) {
    update()
    return
  }

  const id = ++runId
  const root = document.documentElement
  setOrigin(origin?.x, origin?.y)
  root.classList.add("theme-sweep")
  stripAnchors()

  const wrapped = async () => {
    flushSync(update)
    await nextPaint()
  }

  let transition: TransitionLike | undefined
  try {
    transition = startViewTransition.call(document, wrapped)
  } catch {
    clearThemeSweep(id)
    update()
    return
  }

  transition.finished.then(
    () => clearThemeSweep(id),
    () => clearThemeSweep(id)
  )
}
