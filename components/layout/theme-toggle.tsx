"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { transitionTheme } from "@/lib/theme-transition"

function subscribe(callback: () => void) {
  window.addEventListener("resume", callback)
  return () => window.removeEventListener("resume", callback)
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const isDark = mounted && resolvedTheme === "dark"

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    transitionTheme(() => setTheme(isDark ? "light" : "dark"), {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={className}
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? "Ganti ke tema terang"
            : "Ganti ke tema gelap"
          : "Ganti tema"
      }
      title="Ganti tema (d)"
    >
      {mounted ? (
        isDark ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        <span className="size-3.5" aria-hidden />
      )}
    </Button>
  )
}

export { ThemeToggle }
