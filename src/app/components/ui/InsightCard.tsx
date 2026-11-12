import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Article } from '../../../data/articles'

/** Article preview for the homepage. Links to the internal article page. */
export function InsightCard({ article }: { article: Article }) {
  return (
    <Link to={`/${article.slug}`} className="group flex h-full flex-col border-t border-line pt-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <time dateTime={article.publishedAt} className="eyebrow text-ink-faint">
          {article.displayDate}
        </time>
        {article.categories[0] && (
          <>
            <span aria-hidden="true" className="text-caption text-ink-faint">
              ·
            </span>
            <span className="eyebrow text-ink-faint">{article.categories[0]}</span>
          </>
        )}
      </div>

      <h3 className="mt-4 text-subtitle transition-colors duration-300 group-hover:text-accent-ink">
        {article.title}
      </h3>
      <p className="mt-3 text-small text-ink-muted">{article.excerpt}</p>

      <span className="mt-auto flex items-center gap-2 pt-6 text-caption text-ink-faint transition-colors duration-300 group-hover:text-ink">
        Leggi l’articolo
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}
