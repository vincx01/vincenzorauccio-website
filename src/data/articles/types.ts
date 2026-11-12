/** Content model for recovered articles. Blocks keep the published structure. */

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; ordered?: boolean; items: Array<string | { title: string; text: string }> }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'links'; title?: string; items: Array<{ label: string; href: string }> }

export interface ArticleImage {
  src: string
  alt: string
  caption?: string
}

export interface ArticleSource {
  slug: string
  title: string
  excerpt: string
  /** ISO date, published on the original site. */
  publishedAt: string
  categories: string[]
  tags?: string[]
  originalUrl: string
  /**
   * Canonical target when the same body was published twice. Preserves the URL
   * while keeping duplicate content out of search results.
   */
  canonicalUrl?: string
  image?: ArticleImage
  body: ArticleBlock[]
  featured?: boolean
}

export interface Article extends ArticleSource {
  readingMinutes: number
  displayDate: string
  /** Path used in the canonical link, relative to the site root. */
  canonicalPath: string
}

export interface ArticleCategory {
  name: string
  slug: string
  count: number
}
