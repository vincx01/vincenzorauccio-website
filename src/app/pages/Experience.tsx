import { localizedCareer, localizedRecognition, localizedSite } from '../../i18n/content'
import { useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { ExperienceCard } from '../components/career/ExperienceCard'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { CapabilityList } from '../components/ui/CapabilityList'
import { TextLink } from '../components/ui/TextLink'
import { Timeline } from '../components/ui/Timeline'
import { usePageMeta } from '../lib/meta'

export function ExperiencePage() {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const career = localizedCareer(locale)
  const recognition = localizedRecognition(locale)
  const copy = localizedPages(locale).experience

  const educationEntries = career.education.map((entry) => ({
    period: entry.period,
    title: entry.title,
    organisation: entry.organisation,
    meta: entry.status,
  }))

  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/experience',
    locale,
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">02</span>
            <span className="eyebrow text-ink-muted">{copy.eyebrow}</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-8">
              <h1 className="max-w-[18ch] font-display text-headline">{copy.title}</h1>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <p className="text-body text-ink-muted">{copy.lead}</p>
            </div>
          </div>

          <nav
            aria-label={copy.navAria}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-4"
          >
            {copy.nav.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="link-quiet text-small">
                {section.label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      <Section id="esperienza" spacing="none" className="pt-16">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-4">
            <h2 className="eyebrow text-ink-muted">{copy.professional}</h2>
            <span className="text-caption text-ink-faint">{copy.updated}</span>
          </div>

          <div className="mt-2 border-b border-line">
            {career.professionalExperience.map((role) => (
              <ExperienceCard key={role.id} role={role} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="formazione" tone="quiet">
        <Container>
          <SectionHeading
            index={copy.education.index}
            eyebrow={copy.education.eyebrow}
            title={copy.education.title}
            description={copy.education.description}
          />
          <Timeline items={educationEntries} className="mt-10" />
        </Container>
      </Section>

      <Section id="certificazioni">
        <Container>
          <SectionHeading
            index={copy.certifications.index}
            eyebrow={copy.certifications.eyebrow}
            title={copy.certifications.title}
            description={copy.certifications.description}
          />
          <ol className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
            {career.certifications.map((certification, index) => (
              <li
                key={certification.name}
                className="flex items-baseline gap-4 border-b border-line py-4"
              >
                <span className="eyebrow shrink-0 text-ink-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {certification.href ? (
                  <a href={certification.href} className="link-quiet text-small">
                    {certification.name}
                  </a>
                ) : (
                  <span className="text-small text-ink">{certification.name}</span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="competenze" tone="quiet">
        <Container>
          <SectionHeading
            index={copy.skills.index}
            eyebrow={copy.skills.eyebrow}
            title={copy.skills.title}
            description={copy.skills.description}
          />
          <CapabilityList items={career.skillGroups} className="mt-10" />
        </Container>
      </Section>

      <Section id="lingue" spacing="tight">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">{copy.languages.index}</span>
                <span className="eyebrow text-ink-muted">{copy.languages.eyebrow}</span>
              </div>
              <h2 className="mt-6 font-display text-title">{copy.languages.title}</h2>
            </div>

            <dl className="border-t border-line lg:col-span-7 lg:col-start-6">
              {career.languages.map((entry) => (
                <div
                  key={entry.language}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-4"
                >
                  <dt className="text-subtitle">{entry.language}</dt>
                  <dd className="text-small text-ink-muted">{entry.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {recognition.length > 0 && (
        <Section spacing="tight">
          <Container>
            <div className="grid gap-6 border-t border-line pt-5 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <div className="lg:col-span-4">
                <p className="eyebrow text-ink-faint">{copy.recognition.eyebrow}</p>
                <h2 className="mt-4 max-w-[16ch] font-display text-title">
                  {copy.recognition.title}
                </h2>
              </div>
              <div className="divide-y divide-line lg:col-span-7 lg:col-start-6">
                {recognition.map((entry) => (
                  <div key={entry.id} className="border-t border-line py-6 first:border-t-0 first:pt-0">
                    <p className="eyebrow text-ink-faint">{entry.kind}</p>
                    <h3 className="mt-2 text-subtitle">{entry.title}</h3>
                    {entry.awardTitle && (
                      <p className="mt-2 text-lead text-ink">{entry.awardTitle}</p>
                    )}
                    {entry.recipient && (
                      <p className="mt-2 text-small text-ink">
                        <span className="text-ink-faint">{copy.recognition.assignedTo}</span>
                        {entry.recipient}
                        {entry.recipientRole ? ` · ${entry.recipientRole}` : ''}
                      </p>
                    )}
                    <p className="mt-2 text-small text-ink-muted">
                      {entry.organisation} · {entry.date}
                    </p>
                    <p className="mt-4 max-w-[56ch] text-small text-ink-muted">{entry.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {entry.links[0] && (
                        <a
                          href={entry.links[0].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-arrow text-small"
                        >
                          {entry.links[0].label}
                        </a>
                      )}
                      <TextLink to="/recognition">{copy.recognition.link}</TextLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section tone="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-7">
              <p className="eyebrow text-ink-faint">{copy.contact.eyebrow}</p>
              <h2 className="mt-4 max-w-[17ch] font-display text-title">{copy.contact.title}</h2>
              <p className="text-measure mt-5 text-lead text-ink-muted">{copy.contact.lead}</p>
            </div>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <Button href={`mailto:${site.email}`} arrow>
                {copy.contact.primary}
              </Button>
              <Button to="/projects" variant="secondary">
                {copy.contact.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
