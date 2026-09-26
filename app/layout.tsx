import { Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import "lenis/dist/lenis.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { StickyCta } from "@/components/layout/sticky-cta"
import { BackToTop } from "@/components/layout/back-to-top"
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
    // TODO: portfolio-data.md — konfirmasi nama lengkap
    default:
      "Abdi Raihan Wibowo — Mahasiswa Pendidikan Teknologi Informatika dan Komputer",
    template: "%s — Abdi Raihan Wibowo",
  },
  description:
    "Portfolio Abdi Raihan Wibowo, mahasiswa Pendidikan Teknologi Informatika dan Komputer di Universitas Negeri Medan. Minat pada computer networking, Linux, educational technology, dan pengembangan web.",
  keywords: [
    "portfolio",
    "computer networking",
    "Linux",
    "pendidikan teknologi informatika",
    "Universitas Negeri Medan",
    "educational technology",
    "web development",
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
          <LenisProvider>
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
              <StickyCta />
              <BackToTop />
              <div className="grain" aria-hidden />
            </TooltipProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
