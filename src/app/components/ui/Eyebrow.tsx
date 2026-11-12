import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

/** Small-caps label used for indices, metadata and interface labels. */
export function Eyebrow({
  children,
  className,
  as: Tag = 'span',
}: {
  children: ReactNode
  className?: string
  as?: 'span' | 'p' | 'div'
}) {
  return <Tag className={cx('eyebrow text-ink-muted', className)}>{children}</Tag>
}
