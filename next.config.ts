import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // AVIF didahulukan karena ukurannya paling kecil; browser yang tidak
    // mendukungnya otomatis jatuh ke WebP, lalu ke format asli.
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
