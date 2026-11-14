import { useLocation } from 'react-router'

import { useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Button } from '../components/ui/Button'
import { usePageMeta } from '../lib/meta'

export function NotFound() {
  const { locale } = useLocale()
  const { pathname } = useLocation()
  const copy = localizedPages(locale).notFound
  const path = pathname.replace(/^\/(it|en)/, '') || '/'

  usePageMeta({
    title: `${copy.title} — Vincenzo Rauccio`,
    description: copy.text,
    path,
    locale,
  })

  return (
    <Section spacing="none">
      <Container width="narrow" className="py-[clamp(4rem,10vw,8rem)]">
        <p className="eyebrow text-ink-faint">404</p>
        <h1 className="mt-5 font-display text-headline">{copy.title}</h1>
        <p className="text-measure mt-5 text-lead text-ink-muted">{copy.text}</p>
        <div className="mt-8">
          <Button to="/" arrow>
            {copy.cta}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
