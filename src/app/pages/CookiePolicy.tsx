import { LocaleLink as Link, useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { LegalBody } from '../components/editorial/LegalBody'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { usePageMeta } from '../lib/meta'

/** Cookie policy basata su ciò che il sito usa realmente: localStorage e lingua. */
export function CookiePolicy() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).cookies

  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/cookie-policy',
    locale,
  })

  return (
    <Section spacing="none">
      <Container width="narrow" className="pt-[clamp(3rem,6vw,5rem)]">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow text-ink-faint">{copy.legal}</span>
          <span className="eyebrow text-ink-muted">{copy.title}</span>
        </div>

        <h1 className="mt-8 font-display text-headline">{copy.heading}</h1>
        <p className="mt-4 text-caption text-ink-faint">{copy.updated}</p>

        <div className="prose-article mt-12">
          {copy.sections.map((section, index) =>
            index === 3 ? (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <div className="not-prose mt-6 overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-small">
                    <thead>
                      <tr className="border-b border-line-strong">
                        <th className="py-3 pr-4 font-medium">{copy.table.category}</th>
                        <th className="py-3 pr-4 font-medium">{copy.table.status}</th>
                        <th className="py-3 font-medium">{copy.table.use}</th>
                      </tr>
                    </thead>
                    <tbody className="text-ink-muted">
                      {copy.table.rows.map((row) => (
                        <tr key={row.category} className="border-b border-line align-top">
                          <th className="py-4 pr-4 font-medium text-ink">{row.category}</th>
                          <td className="py-4 pr-4">{row.status}</td>
                          <td className="py-4">{row.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <LegalBody key={section.heading || 'intro'} sections={[section]} />
            ),
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
          <Link to="/privacy" className="link-arrow">
            <span>{copy.privacyLink}</span>
          </Link>
          <Link to="/contact" className="link-quiet text-small">
            {copy.contactLink}
          </Link>
        </div>
      </Container>
    </Section>
  )
}
