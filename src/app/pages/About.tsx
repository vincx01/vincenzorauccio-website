import { localizedCareer, localizedRecognition, localizedSite } from '../../i18n/content'
import { useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { TextLink } from '../components/ui/TextLink'
import { usePageMeta } from '../lib/meta'

export function About() {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const career = localizedCareer(locale)
  const copy = localizedPages(locale).about

  const award = localizedRecognition(locale).find((entry) => !entry.recipient)
  const professionalSkills =
    career.skillGroups.find((group) => group.title === copy.skills.professionalLabel)?.items ?? []

  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/about',
    locale,
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">01</span>
            <span className="eyebrow text-ink-muted">{copy.eyebrow}</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-6">
              <h1 className="max-w-[20ch] font-display text-headline">{copy.title}</h1>
              <p className="text-measure mt-7 text-lead text-ink-muted">{copy.lead}</p>
            </div>

            <figure className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <img
                src="/images/foto-profilo-transparent.png"
                srcSet="/images/foto-profilo-transparent-545.png 411w, /images/foto-profilo-transparent.png 1090w"
                sizes="(min-width: 1024px) 352px, 90vw"
                width={1090}
                height={1443}
                alt={copy.imageAlt}
                loading="eager"
                decoding="async"
                className="mx-auto h-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:mx-0 lg:max-w-[22rem]"
              />
            </figure>
          </div>

          <dl className="mt-10 grid gap-x-8 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">{copy.facts.role}</dt>
              <dd className="mt-1.5 text-small text-ink-muted">{site.role}</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">{copy.facts.today}</dt>
              <dd className="mt-1.5 text-small text-ink-muted">{copy.todayValue}</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">{copy.facts.leadership}</dt>
              <dd className="mt-1.5 text-small text-ink-muted">{copy.leadershipValue}</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">{copy.facts.focus}</dt>
              <dd className="mt-1.5 text-small text-ink-muted">{copy.focusValue}</dd>
            </div>
            {award && (
              <div className="border-b border-line py-3">
                <dt className="eyebrow text-ink-faint">{copy.facts.recognition}</dt>
                <dd className="mt-1.5 text-small text-ink-muted">
                  {award.title}, {award.date}
                </dd>
              </div>
            )}
          </dl>
        </Container>
      </Section>

      <Section spacing="none" className="pt-[clamp(3rem,6vw,5rem)] pb-[clamp(4rem,5vw,5rem)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">{copy.work.index}</span>
                <span className="eyebrow text-ink-muted">{copy.work.eyebrow}</span>
              </div>
              <h2 className="mt-6 max-w-[16ch] font-display text-title">{copy.work.title}</h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                {copy.work.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={index === 0 ? 'text-lead text-ink-muted' : 'mt-5 text-body text-ink-muted'}
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="mt-10 border-t border-line pt-5">
                  <TextLink to="/experience">{copy.work.link}</TextLink>
                </div>
              </Reveal>
            </div>
          </div>
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

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-5">
              <h3 className="text-subtitle">{copy.skills.technicalTitle}</h3>
              <p className="mt-3 text-body text-ink-muted">{copy.skills.technicalText}</p>
              <p className="mt-5 text-small text-ink-muted">
                {career.languages.map((entry) => `${entry.language}: ${entry.level}`).join('. ')}.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h3 className="eyebrow text-ink-faint">{copy.skills.professionalLabel}</h3>
              <ul className="mt-3 border-t border-line">
                {professionalSkills.map((skill) => (
                  <li key={skill} className="border-b border-line py-3 text-small text-ink-muted">
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TextLink to="/experience#competenze">{copy.skills.link}</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">{copy.method.index}</span>
                <span className="eyebrow text-ink-muted">{copy.method.eyebrow}</span>
              </div>
              <h2 className="mt-6 max-w-[15ch] font-display text-title">{copy.method.title}</h2>
            </div>

            <div className="lg:col-span-7">
              <dl className="border-t border-line">
                {copy.method.entries.map((entry) => (
                  <div key={entry.title} className="border-b border-line py-6">
                    <dt className="text-subtitle">{entry.title}</dt>
                    <dd className="mt-2 max-w-[56ch] text-small text-ink-muted">{entry.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="quiet">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">{copy.recognition.index}</span>
                <span className="eyebrow text-ink-muted">{copy.recognition.eyebrow}</span>
              </div>
              <h2 className="mt-6 max-w-[16ch] font-display text-title">
                {copy.recognition.title}
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {award ? (
                <div className="border-t border-line pt-5">
                  <p className="eyebrow text-ink-faint">{award.kind}</p>
                  <h3 className="mt-3 text-subtitle">{award.title}</h3>
                  <p className="mt-2 text-small text-ink-muted">
                    {award.organisation} · {award.date}
                  </p>
                  <p className="mt-4 max-w-[56ch] text-small text-ink-muted">{award.summary}</p>
                  <div className="mt-5">
                    <TextLink to="/recognition">{copy.recognition.link}</TextLink>
                  </div>
                </div>
              ) : (
                <p className="border-t border-line pt-5 text-small text-ink-muted">
                  {copy.recognition.empty}
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-7">
              <p className="eyebrow text-ink-faint">{copy.contact.eyebrow}</p>
              <h2 className="mt-4 max-w-[18ch] font-display text-title">{copy.contact.title}</h2>
              <p className="text-measure mt-5 text-lead text-ink-muted">{copy.contact.lead}</p>
            </div>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <Button href={`mailto:${site.email}`} arrow>
                {copy.contact.primary}
              </Button>
              <Button to="/experience" variant="secondary">
                {copy.contact.secondary}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
