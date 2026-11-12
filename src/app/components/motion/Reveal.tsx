import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'
import { DURATION, EASE_OUT } from '../../lib/motion'

/**
 * The single scroll-reveal primitive: a short rise and fade, once per element.
 * Content is never hidden without motion — when the visitor prefers reduced
 * motion the plain element renders immediately.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: DURATION.reveal, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Page transition: a short fade and lift. Kept under 300ms so navigation still
 * feels immediate; reduced motion renders the page with no animation at all.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      className={cx('min-h-[60vh]')}
    >
      {children}
    </motion.div>
  )
}
