import type { SimpleIcon } from "simple-icons"

import { cn } from "cn"

function parseRgb(hex: string) {
  const value = hex.replace("#", "")
  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value
  return [0, 2, 4].map((offset) =>
    Number.parseInt(full.slice(offset, offset + 2), 16)
  )
}

/**
 * Menandai brand yang nyaris hitam / nyaris putih supaya CSS bisa
 * membalik warnanya agar tetap kontras di tema terang maupun gelap.
 */
function toneFor(hex: string): "dark" | "light" | undefined {
  const [r, g, b] = parseRgb(hex).map((channel) => {
    const s = channel / 255
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  if (luminance < 0.2) return "dark"
  if (luminance > 0.75) return "light"
  return undefined
}

type TechIconProps = {
  icon: SimpleIcon
  size?: number
  className?: string
}

/** Ikon brand simple-icons — selalu dekat label teks, jadi aria-hidden. */
function TechIcon({ icon, size = 14, className }: TechIconProps) {
  const tone = toneFor(icon.hex)

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      data-tone={tone}
      className={cn("tech-brand shrink-0", className)}
    >
      <path fill={icon.hex} d={icon.path} />
    </svg>
  )
}

export { TechIcon }
