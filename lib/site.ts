/**
 * URL dasar situs.
 *
 * Dipakai oleh metadata (Open Graph, Twitter Card), sitemap, dan robots.
 * Urutan sumber:
 *   1. NEXT_PUBLIC_SITE_URL — isi dengan domain produksi
 *   2. Variabel yang diberikan Vercel (jadi otomatis benar di sana)
 *   3. localhost — untuk pengembangan
 *
 * Domain tidak dipaksa di dalam repo, jadi owner bebas memilih host.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, "")

  const vercelProject = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercelProject) return `https://${vercelProject.replace(/\/+$/, "")}`

  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) return `https://${vercelUrl.replace(/\/+$/, "")}`

  return "http://localhost:3000"
}

export const siteUrl = resolveSiteUrl()

export const siteName = "Portfolio Abdi Raihan Wibowo"
