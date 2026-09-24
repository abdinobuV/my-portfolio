"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ReactLenis, useLenis } from "lenis/react"

function ScrollReset() {
  const pathname = usePathname()
  const lenis = useLenis()
  const prevPathname = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!lenis) return
    if (prevPathname.current === null) {
      prevPathname.current = pathname
      return
    }
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname
    if (window.location.hash) return
    lenis.scrollTo(0, { immediate: true })
  }, [lenis, pathname])

  return null
}

function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        smoothWheel: true,
        syncTouch: false,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  )
}

export { LenisProvider }
