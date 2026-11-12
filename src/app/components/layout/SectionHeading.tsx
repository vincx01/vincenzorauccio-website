import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

/**
 * The section heading pattern used across the whole site: an index and eyebrow
 * above a hairline, a display title, an optional description and a trailing
 * action that aligns to the right on desktop.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
  action,
  level = 2,
  className,
}: {
  id?: string
  index?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  level?: 1 | 2 | 3
  className?: string
}) {
  const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as 'h1' | 'h2' | 'h3'
  const descriptionId = id && description ? `${id}-description` : undefined

  return (
    <div className={cx('grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]', className)}>
      <div className="lg:col-span-8">
        {(index || eyebrow) && (
          <div className="mb-6 flex items-center gap-4 border-t border-line pt-4">
            {index && <span className="eyebrow text-ink-faint">{index}</span>}
            {eyebrow && <span className="eyebrow text-ink-muted">{eyebrow}</span>}
          </div>
        )}
        <Tag id={id} className={level === 1 ? 'text-headline' : 'text-title'}>
          {title}
        </Tag>
        {description && (
          <p id={descriptionId} className="text-measure mt-5 text-lead text-ink-muted">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-start lg:col-span-4 lg:justify-end lg:pt-1">{action}</div>}
    </div>
  )
}
