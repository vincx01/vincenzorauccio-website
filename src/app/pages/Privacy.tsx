import { LocaleLink as Link, useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { LegalBody } from '../components/editorial/LegalBody'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { usePageMeta } from '../lib/meta'

/** Informativa privacy: nessun modulo, nessun tracciamento opzionale attivo. */
export function Privacy() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).privacy

  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/privacy',
    locale,
  })

  return (
    <Section spacing="none">
      <Container width="narrow" className="pt-[clamp(3rem,6vw,5rem)] pb-[var(--section-space-tight)]">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow text-ink-faint">{copy.legal}</span>
          <span className="eyebrow text-ink-muted">{copy.title}</span>
        </div>

        <h1 className="mt-8 font-display text-headline">{copy.heading}</h1>
        <p className="mt-4 text-caption text-ink-faint">{copy.updated}</p>

        <div className="prose-article mt-12">
          <LegalBody sections={copy.sections} />
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
          <Link to="/cookie-policy" className="link-arrow">
            <span>{copy.cookieLink}</span>
          </Link>
          <Link to="/contact" className="link-quiet text-small">
            {copy.contactLink}
          </Link>
        </div>
      </Container>
    </Section>
  )
}
