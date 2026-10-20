/**
 * Pembantu acak yang deterministik.
 *
 * `Math.random()` tidak bisa dipakai untuk tata letak yang harus konsisten:
 * hasilnya berubah tiap muat, jadi komposisi "berganti" setiap reload.
 * PRNG ber-seed menghasilkan angka yang sama untuk seed yang sama.
 */

/** PRNG mulberry32 — kecil, cepat, dan deterministik untuk seed yang sama. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

/**
 * Sebar n titik merata di bola — Golden Spiral, tanpa random sama sekali.
 * Dipakai untuk hub dan untuk skill di dalam satu grup.
 */
export function fibonacciSphere(count: number): [number, number, number][] {
  const points: [number, number, number][] = []
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = GOLDEN_ANGLE * i
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r])
  }
  return points
}
