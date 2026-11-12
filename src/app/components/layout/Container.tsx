import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

type Width = 'default' | 'wide' | 'narrow'

/** Horizontal rhythm for every section: one max width, one gutter. */
export function Container({
  children,
  width = 'default',
  className,
}: {
  children: ReactNode
  width?: Width
  className?: string
}) {
  return (
    <div
      className={cx(
        'container-page',
        width === 'wide' && 'container-wide',
        width === 'narrow' && 'container-narrow',
        className,
      )}
    >
      {children}
    </div>
  )
}
