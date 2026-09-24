import type { Transition } from "framer-motion"

export const motionTheme = {
  transitions: {
    /** Menus, cards, reveals — default. */
    ui: { type: "spring", stiffness: 305, damping: 33 } satisfies Transition,
    /** Enter section — sedikit lebih tenang. */
    gentle: { type: "spring", stiffness: 110, damping: 20 } satisfies Transition,
    /** Hover / micro yang tegas. */
    snap: { type: "spring", stiffness: 1218, damping: 70 } satisfies Transition,
  },
  stagger: {
    tight: 0.04,
    base: 0.08,
  },
  travel: {
    section: 48,
  },
} as const

export type MotionTheme = typeof motionTheme
