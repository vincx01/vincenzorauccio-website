import { motion, useReducedMotion } from 'motion/react'

import { cx } from '../../lib/cx'
import { EASE_OUT } from '../../lib/motion'

export interface TimelineEntry {
  period: string
  title: string
  organisation?: string
  detail?: string
  meta?: string
}

/**
 * Experience timeline: period in the left column, role and organisation in the
 * middle, optional meta on the right. Rows enter in sequence so the timeline
 * reads as a progression rather than a block; each row owns its own viewport
 * trigger, and motion is skipped entirely when it is reduced.
 */
export function Timeline({ items, className }: { items: TimelineEntry[]; className?: string }) {
  const reduce = useReducedMotion()

  if (items.length === 0) {
    return (
      <p className="border-t border-line pt-6 text-small text-ink-faint">
        Le voci di esperienza saranno aggiunte con i contenuti verificati.
      </p>
    )
  }

  return (
    <ol className={cx('border-t border-line', className)}>
      {items.map((item, index) => (
        <motion.li
          key={`${item.period}-${item.title}`}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_OUT }}
          className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-[var(--grid-gap)] md:py-7"
        >
          <div className="flex items-center gap-3 md:col-span-3">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-ink" />
            <span className="eyebrow text-ink-faint">{item.period}</span>
          </div>
          <div className="md:col-span-6">
            <h3 className="text-subtitle">{item.title}</h3>
            {item.organisation && <p className="mt-0.5 text-small text-ink-muted">{item.organisation}</p>}
            {item.detail && <p className="mt-2 max-w-[52ch] text-small text-ink-muted">{item.detail}</p>}
          </div>
          {item.meta && (
            <div className="md:col-span-3 md:text-right">
              <span className="eyebrow text-ink-faint">{item.meta}</span>
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  )
}
