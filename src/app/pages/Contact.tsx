import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { site } from '../../data/site'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { usePageMeta } from '../lib/meta'

/**
 * Contatti: una sola azione principale, la mail. LinkedIn, GitHub e Instagram
 * restano come riferimenti professionali secondari. Nessun modulo, nessuna card.
 */
export function Contact() {
  usePageMeta({
    title: 'Contatti — Vincenzo Rauccio',
    description:
      'Scrivi a Vincenzo Rauccio per una consulenza, una collaborazione o un confronto su Blockchain, pagamenti digitali e innovazione.',
    path: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${site.url}/contact`,
      mainEntity: {
        '@type': 'Person',
        name: site.name,
        url: site.url,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        sameAs: site.socials.map((social) => social.href),
      },
    },
  })

  return (
    <Section spacing="none">
      <Container width="wide" className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow text-ink-faint">06</span>
          <span className="eyebrow text-ink-muted">Contatti</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-7">
            <h1 className="max-w-[15ch] font-display text-headline">
              Un confronto diretto, senza passaggi inutili.
            </h1>
            <p className="text-measure mt-7 text-lead text-ink-muted">
              Per una consulenza, una collaborazione o un confronto su Blockchain, pagamenti
              digitali e innovazione.
            </p>
            <p className="text-measure mt-5 text-body text-ink-muted">
              Non c’è un modulo da compilare. La mail è il canale più diretto: scrivi due righe sul
              contesto e su ciò che ti interessa.
            </p>

            <div className="mt-10 border-t border-line pt-5">
              <p className="eyebrow text-ink-faint">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-3 inline-flex max-w-full items-start gap-3 font-display text-[clamp(1.35rem,2.6vw,2.25rem)] leading-tight tracking-[-0.03em] transition-colors duration-300 hover:text-accent-ink"
              >
                <span className="break-words">{site.email}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <p className="mt-3 text-caption text-ink-faint">
                Si apre il tuo client di posta.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              {site.socials.map((social) => (
                <div key={social.label} className="border-b border-line py-4">
                  <dt className="eyebrow text-ink-faint">{social.label}</dt>
                  <dd className="mt-2">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet inline-flex items-center gap-2 text-small"
                    >
                      {social.handle}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-line pt-5 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <p className="lg:col-span-4">
            <span className="eyebrow text-ink-faint">Privacy</span>
          </p>
          <p className="text-measure text-small text-ink-muted lg:col-span-8">
            I dati che invii via email vengono usati solo per rispondere alla tua richiesta. Le
            modalità di trattamento sono descritte nell’<Link to="/privacy" className="link-quiet">
              informativa privacy
            </Link>
            . Per le tecnologie usate dal sito consulta la{' '}
            <Link to="/cookie-policy" className="link-quiet">
              cookie policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  )
}
