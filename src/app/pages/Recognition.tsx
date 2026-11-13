import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { articles } from '../../data/articles'
import { recognition } from '../../data/recognition'
import { site } from '../../data/site'
import { ArticleRow } from '../components/editorial/ArticleRow'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { Media } from '../components/ui/Media'
import { TextLink } from '../components/ui/TextLink'
import { usePageMeta } from '../lib/meta'

/** Un articolo per URL canonico, così la pubblicazione duplicata non compare due volte. */
const publications = articles.filter((article) => article.canonicalPath === `/${article.slug}`)

export function Recognition() {
  usePageMeta({
    title: 'Riconoscimenti — Vincenzo Rauccio',
    description:
      'I riconoscimenti documentati di Vincenzo Rauccio e di Synclin, tra cui i Pan Finance Awards 2026 e il premio Most Influential FinTech Entrepreneur 2025 (Italy).',
    path: '/recognition',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: `${site.url}/recognition`,
      inLanguage: 'it',
      mainEntity: {
        '@type': 'Person',
        name: site.name,
        url: site.url,
        jobTitle: site.role,
        award: recognition
          .filter((entry) => !entry.recipient)
          .map((entry) => `${entry.title} — ${entry.organisation} (${entry.date})`),
      },
    },
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">—</span>
            <span className="eyebrow text-ink-muted">Riconoscimenti</span>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-8">
              <h1 className="max-w-[17ch] font-display text-headline">
                Riconoscimenti professionali.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <p className="text-body text-ink-muted">
                Raccolgo solo riconoscimenti verificabili, con una fonte pubblica. Premi,
                interventi e pubblicazioni entrano quando il riferimento è disponibile.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {recognition.map((entry) => (
        <Section key={entry.id} spacing="none" className="pt-12">
          <Container width="wide">
            <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
              <span className="eyebrow text-ink-muted">{entry.kind}</span>
              <time dateTime={entry.dateTime} className="eyebrow text-ink-faint">
                {entry.date}
              </time>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-[var(--grid-gap)]">
              {entry.image && (
                <div className="lg:col-span-6">
                  <Media src={entry.image.src} alt={entry.image.alt} ratio="3/2" priority />
                </div>
              )}

              <div className={entry.image ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-8'}>
                <h2 className="font-display text-title">{entry.title}</h2>
                {entry.awardTitle && (
                  <p className="mt-2 text-lead text-ink">{entry.awardTitle}</p>
                )}
                {entry.recipient && (
                  <p className="mt-3 text-small text-ink">
                    <span className="text-ink-faint">Assegnato a </span>
                    {entry.recipient}
                    {entry.recipientRole ? ` · ${entry.recipientRole}` : ''}
                  </p>
                )}
                <p className="mt-2 text-small text-ink-muted">
                  {entry.organisation} · {entry.date}
                </p>
                <p className="mt-5 text-lead text-ink-muted">{entry.summary}</p>

                <ul className="mt-6 flex flex-col border-t border-line">
                  {entry.links.map((link) => (
                    <li key={link.href} className="border-b border-line">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 py-3 text-small transition-colors duration-300 hover:text-accent-ink"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                {entry.articleSlug && (
                  <div className="mt-6">
                    <TextLink to={`/${entry.articleSlug}`}>Leggi l’annuncio</TextLink>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="dark" className="mt-[clamp(3rem,6vw,5rem)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">01</span>
                <span className="eyebrow text-ink-muted">Speaking e contributi pubblici</span>
              </div>
              <h2 className="mt-6 max-w-[16ch] font-display text-title">
                Interventi e conversazioni pubbliche.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-lead text-ink-muted">
                  Spiegare Blockchain, pagamenti e innovazione finanziaria a chi li costruisce o li
                  deve governare fa parte del lavoro.
                </p>
                <p className="mt-5 text-body text-ink-muted">
                  Sto raccogliendo conferenze, panel, workshop e interviste. Ogni appuntamento sarà
                  pubblicato con evento, data e riferimento, dopo conferma.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button to="/contact" arrow>
                    Scrivimi per un intervento
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <h2 className="eyebrow text-ink-muted">Pubblicazioni selezionate</h2>
            <Link to="/insights" className="link-quiet text-small">
              Tutti gli articoli
            </Link>
          </div>

          <p className="text-measure mt-5 text-body text-ink-muted">
            Articoli pubblicati su governance Blockchain, pagamenti digitali, Web3 e innovazione
            finanziaria.
          </p>

          <ul className="mt-8">
            {publications.map((article) => (
              <li key={article.slug}>
                <ArticleRow article={article} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
