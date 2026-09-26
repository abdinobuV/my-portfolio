/**
 * Transisi ganti tema dengan View Transitions API (imperatif).
 *
 * `setTheme` dari next-themes adalah setState biasa, jadi `<ViewTransition>`
 * React tidak aktif — di sinilah `document.startViewTransition()` dipakai.
 * Selama transisi berjalan kelas `theme-sweep` dipasang di <html>;
 * CSS-nya ada di app/globals.css (sweep lingkaran dari `--theme-x`/`--theme-y`).
 */

type TransitionLike = { finished: Promise<void> }
type StartViewTransition = (update: () => void | Promise<void>) => TransitionLike

/** Pakai token supaya toggle cepat-berturut tidak saling menghapus kelas. */
let runId = 0

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function setOrigin(x?: number, y?: number) {
  const root = document.documentElement
  root.style.setProperty("--theme-x", `${x ?? window.innerWidth / 2}px`)
  root.style.setProperty("--theme-y", `${y ?? window.innerHeight / 2}px`)
}

function clearThemeSweep(id: number) {
  if (id !== runId) return
  const root = document.documentElement
  root.classList.remove("theme-sweep")
  root.style.removeProperty("--theme-x")
  root.style.removeProperty("--theme-y")
}

/** Tunggu sampai React selesai commit (kelas .dark/terang sudah di <html>). */
function nextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
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

  const start = document.startViewTransition as StartViewTransition | undefined
  if (!start || reducedMotion()) {
    update()
    return
  }

  const id = ++runId
  const root = document.documentElement
  setOrigin(origin?.x, origin?.y)
  root.classList.add("theme-sweep")

  const wrapped = async () => {
    update()
    await nextPaint()
  }

  let transition: TransitionLike | undefined
  try {
    transition = start(wrapped)
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
