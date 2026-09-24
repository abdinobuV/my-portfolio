import Link from "next/link"
import { ViewTransition } from "react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <ViewTransition name="page-content">
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        404
      </p>
      <h1 className="font-heading mt-4 text-3xl font-semibold tracking-wide">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Halaman yang Anda cari tidak ada atau sudah dipindahkan.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Kembali ke beranda</Link>
      </Button>
    </div>
    </ViewTransition>
  )
}
