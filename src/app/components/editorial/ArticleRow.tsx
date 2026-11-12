import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Article } from '../../../data/articles'

/** Archive row: date, title, excerpt, reading time and category. */
export function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      to={`/${article.slug}`}
      className="group grid gap-3 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-[var(--grid-gap)] md:py-7"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:col-span-3">
        <time dateTime={article.publishedAt} className="eyebrow text-ink-faint">
          {article.displayDate}
        </time>
        <span aria-hidden="true" className="text-caption text-ink-faint">
          ·
        </span>
        <span className="eyebrow text-ink-faint">{article.readingMinutes} min di lettura</span>
      </div>

      <div className="md:col-span-7">
        <h3 className="text-subtitle transition-colors duration-300 group-hover:text-accent-ink">
          {article.title}
        </h3>
        <p className="mt-2 max-w-[62ch] text-small text-ink-muted">{article.excerpt}</p>
      </div>

      <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
        <span className="eyebrow text-ink-faint">{article.categories[0]}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-ink-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </div>
    </Link>
  )
}
