import { motion, useReducedMotion } from 'motion/react'
import { Link, useSearchParams } from 'react-router'

import {
  articleCategories,
  articles,
  articlesInCategory,
  featuredArticle,
} from '../../data/articles'
import { site } from '../../data/site'
import { ArticleRow } from '../components/editorial/ArticleRow'
import { AuthorCard } from '../components/editorial/AuthorCard'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Media } from '../components/ui/Media'
import { TextLink } from '../components/ui/TextLink'
import { EASE_OUT } from '../lib/motion'
import { usePageMeta } from '../lib/meta'

/** Indice editoriale: articolo in evidenza, archivio e filtro per categoria. */
export function Insights() {
  const reduce = useReducedMotion()
  const [params] = useSearchParams()
  const requested = (params.get('category') ?? '').toLowerCase()
  const active = articleCategories.find((category) => category.slug === requested)

  const latest = requested
    ? active
      ? articlesInCategory(active.slug)
      : []
    : articles.filter((article) => article.slug !== featuredArticle?.slug)

  usePageMeta({
    title: 'Blog — Blockchain, pagamenti e innovazione | Vincenzo Rauccio',
    description:
      'Articoli di Vincenzo Rauccio su Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.',
    path: '/insights',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog — Vincenzo Rauccio',
      url: `${site.url}/insights`,
      inLanguage: 'it',
      description:
        'Articoli su Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.',
      author: { '@type': 'Person', name: site.name, url: site.url },
      blogPost: articles.map((article) => ({
        '@type': 'BlogPosting',
        headline: article.title,
        url: `${site.url}/${article.slug}`,
        datePublished: article.publishedAt,
      })),
    },
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">05</span>
            <span className="eyebrow text-ink-muted">Blog</span>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-8">
              <h1 className="max-w-[18ch] font-display text-headline">
                Blockchain, pagamenti e innovazione: appunti di lavoro.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <p className="text-body text-ink-muted">
                Articoli e riflessioni su governance Blockchain, pagamenti, Web3 e innovazione
                finanziaria.
              </p>
              <p className="mt-4 text-caption text-ink-faint">
                {articles.length} articoli
                {articles[0] ? ` · Ultimo: ${articles[0].displayDate}` : ''}
              </p>
            </div>
          </div>

          <nav
            aria-label="Filtra gli articoli per categoria"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4"
          >
            <Link
              to="/insights"
              aria-current={!requested ? 'page' : undefined}
              className="link-quiet text-small"
            >
              Tutti <span className="text-caption text-ink-faint">{articles.length}</span>
            </Link>
            {articleCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/insights?category=${category.slug}`}
                aria-current={active?.slug === category.slug ? 'page' : undefined}
                className="link-quiet text-small"
              >
                {category.name} <span className="text-caption text-ink-faint">{category.count}</span>
              </Link>
            ))}
          </nav>
        </Container>
      </Section>

      {!requested && featuredArticle && (
        <Section spacing="none" className="pt-12">
          <Container width="wide">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="eyebrow text-ink-muted">Articolo in evidenza</span>
            </div>

            <article className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-[var(--grid-gap)]">
              {featuredArticle.image && (
                <div className="lg:col-span-7">
                  <Media
                    src={featuredArticle.image.src}
                    alt={featuredArticle.image.alt}
                    ratio="16/9"
                    priority
                  />
                </div>
              )}

              <div className={featuredArticle.image ? 'lg:col-span-5' : 'lg:col-span-8'}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <time dateTime={featuredArticle.publishedAt} className="eyebrow text-ink-faint">
                    {featuredArticle.displayDate}
                  </time>
                  <span aria-hidden="true" className="text-caption text-ink-faint">
                    ·
                  </span>
                  <span className="eyebrow text-ink-faint">
                    {featuredArticle.readingMinutes} min di lettura
                  </span>
                  <span aria-hidden="true" className="text-caption text-ink-faint">
                    ·
                  </span>
                  <span className="eyebrow text-ink-faint">{featuredArticle.categories[0]}</span>
                </div>

                <h2 className="mt-4 font-display text-title">
                  <Link
                    to={`/${featuredArticle.slug}`}
                    className="transition-colors duration-300 hover:text-accent-ink"
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="mt-4 text-lead text-ink-muted">{featuredArticle.excerpt}</p>

                <div className="mt-6">
                  <TextLink to={`/${featuredArticle.slug}`}>Leggi l’articolo</TextLink>
                </div>
              </div>
            </article>
          </Container>
        </Section>
      )}

      <Section spacing="none" className="pt-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-8">
              <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <h2 className="eyebrow text-ink-muted">
                  {active ? `Articoli in ${active.name}` : 'Ultime pubblicazioni'}
                </h2>
                <span className="text-caption text-ink-faint">
                  {latest.length} {latest.length === 1 ? 'articolo' : 'articoli'}
                </span>
              </div>

              <motion.div
                key={active?.slug ?? 'all'}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: EASE_OUT }}
              >
                {latest.length > 0 ? (
                  <ul className="mt-2">
                    {latest.map((article) => (
                      <li key={article.slug}>
                        <ArticleRow article={article} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-body text-ink-muted">
                    Non ci sono ancora articoli in questa categoria.{' '}
                    <Link to="/insights" className="underline underline-offset-4">
                      Vedi tutti gli articoli
                    </Link>
                    .
                  </p>
                )}
              </motion.div>
            </div>

            <aside className="lg:col-span-3 lg:col-start-10">
              <div className="border-t border-line pt-4">
                <h2 className="eyebrow text-ink-muted">Categorie</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {articleCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        to={`/insights?category=${category.slug}`}
                        aria-current={active?.slug === category.slug ? 'page' : undefined}
                        className="link-quiet flex items-baseline justify-between gap-4 text-small"
                      >
                        <span>{category.name}</span>
                        <span className="text-caption text-ink-faint">{category.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <AuthorCard className="mt-10" />
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
