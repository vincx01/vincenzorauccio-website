import { elections } from './elections'
import { fintechAward } from './fintech-award'
import { government } from './government'
import { supplyChain } from './supply-chain'
import { synclin } from './synclin'
import type { Article, ArticleCategory } from './types'
import { categorySlug, formatDate, readingMinutes } from './utils'

const sources = [synclin, fintechAward, elections, government, supplyChain]

/** Newest first. Derived fields are computed once, from the published body. */
export const articles: Article[] = [...sources]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((source) => ({
    ...source,
    readingMinutes: readingMinutes(source.body),
    displayDate: formatDate(source.publishedAt),
    canonicalPath: source.canonicalUrl ? new URL(source.canonicalUrl).pathname : `/${source.slug}`,
  }))

export const featuredArticle: Article | undefined =
  articles.find((article) => article.featured) ?? articles[0]

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

const counts = new Map<string, number>()
for (const article of articles) {
  for (const category of article.categories) {
    counts.set(category, (counts.get(category) ?? 0) + 1)
  }
}

export const articleCategories: ArticleCategory[] = [...counts.entries()]
  .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

export function articlesInCategory(slug: string): Article[] {
  return articles.filter((article) =>
    article.categories.some((category) => categorySlug(category) === slug),
  )
}

/**
 * Same-category articles first, newest first. The duplicate publication is
 * excluded from its own suggestions and appears at most once in a list.
 */
export function relatedArticles(article: Article, limit = 2): Article[] {
  const seen = new Set<string>()

  return articles
    .filter((item) => item.slug !== article.slug && item.canonicalPath !== article.canonicalPath)
    .map((item) => ({
      item,
      shared: item.categories.filter((category) => article.categories.includes(category)).length,
    }))
    .sort((a, b) => b.shared - a.shared || b.item.publishedAt.localeCompare(a.item.publishedAt))
    .map((entry) => entry.item)
    .filter((item) => {
      if (seen.has(item.canonicalPath)) return false
      seen.add(item.canonicalPath)
      return true
    })
    .slice(0, limit)
}

export type { Article, ArticleBlock, ArticleCategory, ArticleImage } from './types'
