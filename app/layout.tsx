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
import { profile } from "@/content/profile"
import { siteUrl } from "@/lib/site"
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

const description = `Portfolio ${profile.name}, ${profile.role.toLowerCase()} di ${profile.institution}. Minat pada computer networking, Linux, educational technology, dan pengembangan web.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "portfolio",
    "computer networking",
    "Linux",
    "pendidikan teknologi informatika",
    "Universitas Negeri Medan",
    "educational technology",
    "web development",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
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
