"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { profile } from "@/content/profile"
import { motionTheme } from "@/motion.theme"

const navItems = [
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#perjalanan", label: "Perjalanan" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
  { href: "#kontak", label: "Kontak" },
] as const

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const el = document.documentElement
    let raf = 0
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setScrolled(el.scrollTop > threshold)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [threshold])

  return scrolled
}

function Navbar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScrolled()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = React.useState<string | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    if (pathname !== "/") return

    const ids = navItems
      .filter((i) => i.href.startsWith("#"))
      .map((i) => i.href.slice(1))
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  const hashActive = pathname === "/" ? active : null

  const headerHeight = scrolled ? "h-12 md:h-14" : "h-14 md:h-16"

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75"
    >
      <ScrollProgress />
      <motion.div
        layout={reduceMotion ? false : true}
        transition={motionTheme.transitions.ui}
        className={`mx-auto flex w-full max-w-5xl items-center justify-between px-6 md:px-10 lg:px-16 ${headerHeight}`}
      >
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-widest uppercase"
        >
          {profile.name.split(" ")[0]}
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              hashActive === item.href ||
              (item.href === "/blog" && pathname.startsWith("/blog"))

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-2.5 py-2 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-foreground"
                style={{ color: isActive ? "var(--foreground)" : undefined }}
              >
                {isActive && !reduceMotion ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-1 -bottom-0.5 h-px bg-foreground"
                    transition={motionTheme.transitions.ui}
                  />
                ) : isActive ? (
                  <span className="absolute inset-x-1 -bottom-0.5 h-px bg-foreground" />
                ) : null}
                <span className={!isActive ? "text-muted-foreground" : undefined}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={profile.cvUrl} download>
              Unduh CV
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="md:hidden"
                aria-label="Buka menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
              <nav aria-label="Navigasi mobile" className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3 text-sm font-semibold tracking-widest uppercase transition-colors hover:text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator className="my-6" />
              <Button asChild size="sm" className="w-full">
                <a href={profile.cvUrl} download>
                  Unduh CV
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  )
}

export { Navbar }
