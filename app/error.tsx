"use client"

import Link from "next/link"
import { useEffect } from "react"
import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * Error boundary untuk route segment root.
 * Menangkap error saat render, sehingga halaman tetap punya jalan keluar
 * alih-alih menampilkan layar kosong browser.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log di server lebih berguna daripada diam-diam menelan error.
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        500
      </p>
      <h1 className="font-heading mt-4 text-3xl font-semibold tracking-wide">
        Ada yang tidak beres
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Terjadi kesalahan saat halaman ini dimuat. Coba muat ulang, atau
        kembali ke beranda.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Kode: {error.digest}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>
          <RotateCcwIcon />
          Coba lagi
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Kembali ke beranda</Link>
        </Button>
      </div>
    </div>
  )
}
