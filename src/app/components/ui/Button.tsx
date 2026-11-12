import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { cx } from '../../lib/cx'

type Variant = 'primary' | 'secondary' | 'ghost'

/**
 * One control for actions and navigation. Surface-aware: the primary variant
 * inverts itself automatically inside `data-surface="dark"`.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  to,
  href,
  type = 'button',
  disabled = false,
  className,
  onClick,
}: {
  children: ReactNode
  variant?: Variant
  size?: 'sm' | 'md'
  arrow?: boolean
  to?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  onClick?: () => void
}) {
  const classes = cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className)
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  )
}
