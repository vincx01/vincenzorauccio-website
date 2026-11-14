import { ArrowLeft } from 'lucide-react'
import { useParams } from 'react-router'

import {
  getArticleBySlug,
  getRelatedArticles,
  type Article,
} from '../../data/articles'
import { categorySlug } from '../../data/articles/utils'
import { localizedSite } from '../../i18n/content'
import { LocaleLink as Link, useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { ArticleBody } from '../components/editorial/ArticleBody'
import { ArticleRow } from '../components/editorial/ArticleRow'
import { AuthorCard } from '../components/editorial/AuthorCard'
import { ReadingProgress } from '../components/editorial/ReadingProgress'
import { ShareLinks } from '../components/editorial/ShareLinks'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Media } from '../components/ui/Media'
import { TextLink } from '../components/ui/TextLink'
import { usePageMeta } from '../lib/meta'
import { NotFound } from './NotFound'

function ArticleView({ article }: { article: Article }) {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const copy = localizedPages(locale).article
  const related = getRelatedArticles(locale, article)
  const shareUrl = `${site.url}/${locale}${article.canonicalPath}`
  const canonicalUrl = `${site.url}/${locale}${article.canonicalPath}`

  usePageMeta({
    title: `${article.title} — Vincenzo Rauccio`,
    description: article.excerpt,
    path: `/${article.slug}`,
    canonical: article.canonicalPath,
    locale,
    type: 'article',
    image: article.image ? `${site.url}${article.image.src}` : undefined,
    publishedAt: article.publishedAt,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      inLanguage: locale,
      author: { '@type': 'Person', name: site.name, url: `${site.url}/${locale}/` },
      image: article.image ? [`${site.url}${article.image.src}`] : undefined,
      url: shareUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      articleSection: article.categories,
      keywords: article.tags?.join(', '),
    },
  })

  return (
    <>
      <ReadingProgress />

      <Section spacing="none">
        <Container width="narrow" className="pt-[clamp(2.5rem,4vw,3.5rem)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <Link to="/insights" className="link-quiet inline-flex items-center gap-2 text-small">
              <ArrowLeft aria-hidden="true" className="size-4" />
              {copy.all}
            </Link>
            <p className="eyebrow text-ink-faint">
              {article.categories.map((category, index) => (
                <span key={category}>
                  {index > 0 && <span aria-hidden="true"> · </span>}
                  <Link to={`/insights?category=${categorySlug(category)}`} className="link-quiet">
                    {category}
                  </Link>
                </span>
              ))}
            </p>
          </div>

          <h1 className="mt-8 font-display text-headline">{article.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-ink-faint">
            <span>{site.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{article.displayDate}</time>
            <span aria-hidden="true">·</span>
            <span>
              {article.readingMinutes} {copy.readingTime}
            </span>
          </div>
        </Container>

        {article.image && (
          <Container className="mt-10">
            <figure>
              <Media
                src={article.image.src}
                alt={article.image.alt}
                ratio="16/9"
                priority
                zoom
                className="bg-sunken"
              />
              {article.image.caption && (
                <figcaption className="mt-3 text-caption text-ink-faint">
                  {article.image.caption}
                </figcaption>
              )}
            </figure>
          </Container>
        )}

        <Container width="narrow" className="mt-12">
          <ArticleBody blocks={article.body} />

          {article.tags && article.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
              {article.tags.map((tag) => (
                <li key={tag} className="border border-line px-2.5 py-1 text-caption text-ink-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 border-t border-line pt-6">
            <ShareLinks url={shareUrl} title={article.title} />
          </div>

          <AuthorCard className="mt-12" />

          <div className="mt-10">
            <TextLink to="/insights">{copy.back}</TextLink>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="quiet">
          <Container width="wide">
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <h2 className="eyebrow text-ink-muted">{copy.related}</h2>
              <Link to="/insights" className="link-quiet text-small">
                {copy.all}
              </Link>
            </div>
            <ul className="mt-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <ArticleRow article={item} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  )
}

export function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { locale } = useLocale()
  const article = getArticleBySlug(locale, slug)

  if (!article) return <NotFound />

  return <ArticleView key={`${locale}-${article.slug}`} article={article} />
}
