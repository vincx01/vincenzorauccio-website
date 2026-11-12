import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/**
 * A two-pixel reading indicator pinned under the header on article pages.
 * Transform-only, so it never triggers layout; reduced motion maps scroll
 * position directly instead of easing it.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smoothed }}
      className="fixed inset-x-0 top-[var(--header-height)] z-40 h-[2px] origin-left bg-accent"
    />
  )
}
