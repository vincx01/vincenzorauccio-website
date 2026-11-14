import { ArrowUpRight } from 'lucide-react'

import { LocaleLink as Link } from '../../../i18n/core'
import { cx } from '../../lib/cx'
import { Media } from './Media'

/**
 * Editorial project preview: image, index, title, category and year. The whole
 * card is one link, with the hover state carried by the image and the arrow.
 */
export function ProjectPreview({
  title,
  category,
  year,
  index,
  to,
  image,
  alt,
  ratio = '4/5',
  className,
}: {
  title: string
  category?: string
  year?: string
  index?: string
  to?: string
  image?: string
  alt?: string
  ratio?: '4/5' | '3/2' | '16/9' | '1/1'
  className?: string
}) {
  const body = (
    <>
      <Media src={image} alt={alt ?? ''} ratio={ratio} zoom />
      <div className="mt-4 flex items-start justify-between gap-6 border-t border-line pt-4">
        <div>
          <div className="flex items-baseline gap-3">
            {index && <span className="eyebrow text-ink-faint">{index}</span>}
            <h3 className="text-subtitle transition-colors duration-300 group-hover:text-accent-ink">{title}</h3>
          </div>
          {category && <p className="mt-1 text-small text-ink-muted">{category}</p>}
        </div>
        <div className="flex items-center gap-3 pt-1">
          {year && <span className="eyebrow text-ink-faint">{year}</span>}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cx('group block', className)}>
        {body}
      </Link>
    )
  }

  return <div className={cx('group block', className)}>{body}</div>
}
