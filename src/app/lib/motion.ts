/**
 * Shared motion tokens. Every animation on the site reads from these so the
 * timing language stays consistent: quick confirmations, slower reveals.
 */

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const DURATION = {
  /** Hover, focus and small state changes. */
  fast: 0.25,
  /** Panels, alerts and route changes. */
  base: 0.3,
  /** Scroll reveals. */
  reveal: 0.65,
} as const
