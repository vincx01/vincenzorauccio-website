import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

import { LocaleLink as Link } from '../../../i18n/core'
import { cx } from '../../lib/cx'

/** Inline navigation with a hairline underline and a sliding arrow. */
export function TextLink({
  children,
  to,
  href,
  arrow = true,
  className,
}: {
  children: ReactNode
  to?: string
  href?: string
  arrow?: boolean
  className?: string
}) {
  const classes = cx('link-arrow', className)
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}
