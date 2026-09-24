import { Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "cn"

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Arief Nugroho — Frontend Developer",
    template: "%s — Arief Nugroho",
  },
  description:
    "Portfolio dan journal belajar Arief Nugroho, frontend developer dari Indonesia. Proyek, keahlian, dan catatan pengembangan diri.",
  keywords: [
    "portfolio",
    "frontend developer",
    "Next.js",
    "React",
    "Indonesia",
    "journal belajar",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        notoSans.variable,
        playfairDisplayHeading.variable
      )}
    >
      <body className="min-h-svh bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <a
              href="#konten"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
            >
              Lewati ke konten
            </a>
            <Navbar />
            <main id="konten">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
