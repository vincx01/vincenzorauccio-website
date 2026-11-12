import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

type Tone = 'light' | 'quiet' | 'dark'
type Spacing = 'default' | 'tight' | 'none'

/**
 * A page band. `tone="dark"` flips the surface roles for everything inside,
 * so nested components invert without needing variants.
 */
export function Section({
  children,
  id,
  tone = 'light',
  spacing = 'default',
  className,
  labelledBy,
  as: Tag = 'section',
}: {
  children: ReactNode
  id?: string
  tone?: Tone
  spacing?: Spacing
  className?: string
  labelledBy?: string
  as?: 'section' | 'div'
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-surface={tone === 'dark' ? 'dark' : undefined}
      className={cx(
        'relative',
        tone === 'quiet' ? 'bg-sunken text-ink' : 'bg-canvas text-ink',
        spacing === 'default' && 'section-space',
        spacing === 'tight' && 'section-space-tight',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
