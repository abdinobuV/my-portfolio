"use client"

import * as React from "react"
import dynamic from "next/dynamic"

/**
 * Chart dashboard dimuat terpisah supaya recharts tidak ikut masuk ke
 * initial load halaman. Modul chart hanya diambil ketika section dashboard
 * mendekati viewport — sebagian besar pengunjung tidak pernah scroll ke
 * sana, jadi bundle itu tidak pernah diunduh.
 *
 * `ssr: false` dipakai karena chart butuh ukuran container yang sudah
 * terukur; merendernya di server tanpa ukuran menghasilkan gambar kosong.
 */
const DashboardCharts = dynamic(
  () =>
    import("@/components/sections/dashboard-charts").then(
      (mod) => mod.DashboardCharts
    ),
  { ssr: false }
)

const SkillRadarChart = dynamic(
  () =>
    import("@/components/sections/dashboard-charts").then(
      (mod) => mod.SkillRadarChart
    ),
  { ssr: false }
)

const RecentHoursChart = dynamic(
  () =>
    import("@/components/sections/dashboard-charts").then(
      (mod) => mod.RecentHoursChart
    ),
  { ssr: false }
)

/**
 * Memicu saat elemen mendekati viewport. `rootMargin` memberi jeda supaya
 * chart sudah siap sebelum pengguna mencapainya.
 */
function useNearViewport<T extends HTMLElement>(rootMargin = "400px") {
  const ref = React.useRef<T>(null)
  const [near, setNear] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, near }
}

function HoursChartSlot() {
  const { ref, near } = useNearViewport<HTMLDivElement>()
  return (
    <div ref={ref} className="h-full w-full">
      {near ? <DashboardCharts /> : null}
    </div>
  )
}

function RadarChartSlot() {
  const { ref, near } = useNearViewport<HTMLDivElement>()
  return (
    <div ref={ref} className="h-full w-full">
      {near ? <SkillRadarChart /> : null}
    </div>
  )
}

function RecentHoursSlot() {
  const { ref, near } = useNearViewport<HTMLDivElement>()
  return (
    <div ref={ref} className="h-full w-full">
      {near ? <RecentHoursChart /> : null}
    </div>
  )
}

export { HoursChartSlot, RadarChartSlot, RecentHoursSlot }
