import type { Locale } from '../../i18n/core'
import { englishArticles } from '../../i18n/articles-en'
import { elections } from './elections'
import { fintechAward } from './fintech-award'
import { government } from './government'
import { supplyChain } from './supply-chain'
import { synclin } from './synclin'
import type { Article, ArticleCategory, ArticleSource } from './types'
import { categorySlug, formatDate, readingMinutes } from './utils'

const sources = [synclin, fintechAward, elections, government, supplyChain]

function localizedSource(source: ArticleSource, locale: Locale): ArticleSource {
  if (locale === 'it') return source

  const translation = englishArticles[source.slug]
  if (!translation) return source

  return {
    ...source,
    ...translation,
    image: source.image
      ? {
          ...source.image,
          ...translation.image,
        }
      : translation.image,
  }
}

function buildArticles(locale: Locale): Article[] {
  const available =
    locale === 'en' ? sources.filter((source) => Boolean(englishArticles[source.slug])) : sources

  return [...available]
    .map((source) => localizedSource(source, locale))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((source) => ({
      ...source,
      readingMinutes: readingMinutes(source.body),
      displayDate: formatDate(source.publishedAt, locale),
      canonicalPath: source.canonicalUrl
        ? new URL(source.canonicalUrl).pathname
        : `/${source.slug}`,
    }))
}

const articleSets: Record<Locale, Article[]> = {
  it: buildArticles('it'),
  en: buildArticles('en'),
}

export function getArticles(locale: Locale): Article[] {
  return articleSets[locale]
}

export function getFeaturedArticle(locale: Locale): Article | undefined {
  const articles = getArticles(locale)
  return articles.find((article) => article.featured) ?? articles[0]
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug)
}

export function getArticleCategories(locale: Locale): ArticleCategory[] {
  const counts = new Map<string, number>()

  for (const article of getArticles(locale)) {
    for (const category of article.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function getArticlesInCategory(locale: Locale, slug: string): Article[] {
  return getArticles(locale).filter((article) =>
    article.categories.some((category) => categorySlug(category) === slug),
  )
}

/**
 * Same-category articles first, newest first. The duplicate publication is
 * excluded from its own suggestions and appears at most once in a list.
 */
export function getRelatedArticles(locale: Locale, article: Article, limit = 2): Article[] {
  const seen = new Set<string>()

  return getArticles(locale)
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

/** Italian exports kept for internal compatibility. */
export const articles = getArticles('it')
export const articleCategories = getArticleCategories('it')
export const featuredArticle = getFeaturedArticle('it')
export const articleBySlug = (slug: string) => getArticleBySlug('it', slug)
export const articlesInCategory = (slug: string) => getArticlesInCategory('it', slug)
export const relatedArticles = (article: Article, limit = 2) =>
  getRelatedArticles('it', article, limit)

export type { Article, ArticleBlock, ArticleCategory, ArticleImage } from './types'
