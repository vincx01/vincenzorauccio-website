import { ArrowUpRight } from 'lucide-react'

import { localizedSite } from '../../i18n/content'
import { LocaleLink as Link, useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { usePageMeta } from '../lib/meta'

/**
 * Contatti: una sola azione principale, la mail. LinkedIn, GitHub e Instagram
 * restano come riferimenti professionali secondari.
 */
export function Contact() {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const copy = localizedPages(locale).contact

  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/contact',
    locale,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${site.url}/${locale}/contact`,
      inLanguage: locale,
      mainEntity: {
        '@type': 'Person',
        name: site.name,
        url: `${site.url}/${locale}/`,
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
          <span className="eyebrow text-ink-muted">{copy.eyebrow}</span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-7">
            <h1 className="max-w-[15ch] font-display text-headline">{copy.title}</h1>
            <p className="text-measure mt-7 text-lead text-ink-muted">{copy.lead}</p>
            <p className="text-measure mt-5 text-body text-ink-muted">{copy.body}</p>

            <div className="mt-10 border-t border-line pt-5">
              <p className="eyebrow text-ink-faint">{copy.email}</p>
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
              <p className="mt-3 text-caption text-ink-faint">{copy.opensClient}</p>
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
            <span className="eyebrow text-ink-faint">{copy.privacyLabel}</span>
          </p>
          <p className="text-measure text-small text-ink-muted lg:col-span-8">
            {copy.privacyText}
            <Link to="/privacy" className="link-quiet">
              {copy.privacyLink}
            </Link>
            . {copy.cookieText}
            <Link to="/cookie-policy" className="link-quiet">
              {copy.cookieLink}
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  )
}
