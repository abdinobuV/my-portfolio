"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { profile } from "@/content/profile"

const navItems = [
  { href: "#tentang", label: "Tentang" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#proyek", label: "Proyek" },
  { href: "#perjalanan", label: "Perjalanan" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "/blog", label: "Blog" },
  { href: "#kontak", label: "Kontak" },
] as const

function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6 md:h-16 md:px-10 lg:px-16">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-widest uppercase"
        >
          {profile.name.split(" ")[0]}
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
      </div>
    </header>
  )
}

export { Navbar }
