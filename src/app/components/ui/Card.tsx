import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

type Variant = 'outline' | 'filled' | 'accent'

/** Content surface for grouped information: restrained radius, one hairline. */
export function Card({
  children,
  variant = 'outline',
  interactive = false,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  variant?: Variant
  interactive?: boolean
  className?: string
  as?: 'div' | 'article' | 'li'
}) {
  return (
    <Tag
      className={cx(
        'card',
        variant === 'filled' && 'card--filled',
        variant === 'accent' && 'card--accent',
        interactive && 'card--interactive',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
