import { localizedCareer, localizedExpertise, localizedSite } from '../../i18n/content'
import { useLocale } from '../../i18n/core'
import { localizedPages } from '../../i18n/pages'

import { Hero } from '../components/home/Hero'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { CapabilityList } from '../components/ui/CapabilityList'
import { TextLink } from '../components/ui/TextLink'
import { Timeline } from '../components/ui/Timeline'
import { usePageMeta } from '../lib/meta'

/** Elenco compatto delle discipline sotto l’hero. */
function Disciplines() {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const copy = localizedPages(locale).home

  return (
    <div className="border-y border-line bg-canvas">
      <Container width="wide">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {site.disciplines.map((discipline) => (
              <li key={discipline} className="eyebrow text-ink-muted">
                {discipline}
              </li>
            ))}
          </ul>
          <p className="eyebrow text-ink-faint">{copy.disciplinesLabel}</p>
        </div>
      </Container>
    </div>
  )
}

function Introduction() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).home.intro

  return (
    <Section id="introduction">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="eyebrow text-ink-faint">{copy.index}</span>
              <span className="eyebrow text-ink-muted">{copy.eyebrow}</span>
            </div>
            <h2 className="mt-6 max-w-[17ch] font-display text-title">{copy.title}</h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-lead text-ink-muted">{copy.lead}</p>
              <p className="mt-5 text-body text-ink-muted">{copy.body}</p>

              <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-line pt-5 sm:grid-cols-2">
                {copy.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow text-ink-faint">{fact.label}</dt>
                    <dd className="mt-1.5 text-small text-ink-muted">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9">
                <TextLink to="/about">{copy.link}</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Expertise() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).home.expertise
  const expertise = localizedExpertise(locale)

  return (
    <Section id="expertise" tone="quiet">
      <Container>
        <SectionHeading
          index={copy.index}
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />
        <Reveal className="mt-14">
          <CapabilityList items={expertise} />
        </Reveal>
      </Container>
    </Section>
  )
}

function Experience() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).home.experience
  const experience = localizedCareer(locale).professionalExperience.map((role) => ({
    period: role.period,
    title: role.role,
    organisation: role.organisation,
    detail: role.summary,
    meta: role.location,
  }))

  return (
    <Section id="experience">
      <Container>
        <SectionHeading
          index={copy.index}
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          action={<TextLink to="/experience">{copy.action}</TextLink>}
        />
        <div className="mt-14">
          <Reveal>
            <Timeline items={experience} />
            <p className="mt-5 text-caption text-ink-faint">{copy.note}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function Contact() {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const copy = localizedPages(locale).home.contact
  const linkedin = site.socials.find((social) => social.label === 'LinkedIn')?.href ?? site.url

  return (
    <Section id="contact" tone="dark">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="eyebrow text-ink-faint">{copy.index}</span>
              <span className="eyebrow text-ink-muted">{copy.eyebrow}</span>
            </div>
            <h2 className="mt-7 max-w-[16ch] font-display text-headline">{copy.title}</h2>
            <p className="text-measure mt-6 text-lead text-ink-muted">{copy.lead}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${site.email}`} arrow>
                {copy.cta}
              </Button>
              <Button href={linkedin} variant="secondary">
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              <div className="border-b border-line py-4">
                <dt className="eyebrow text-ink-faint">{copy.email}</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.email}`} className="link-quiet text-small">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="eyebrow text-ink-faint">{copy.profiles}</dt>
                <dd className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {site.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-quiet text-small"
                    >
                      {social.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export function Home() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).home
  const site = localizedSite(locale)
  const expertise = localizedExpertise(locale)

  usePageMeta({
    title: copy.meta.title,
    description: copy.meta.description,
    path: '/',
    locale,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      url: `${site.url}/${locale}/`,
      jobTitle: site.role,
      description: copy.meta.description,
      email: `mailto:${site.email}`,
      knowsAbout: expertise.map((area) => area.title),
      sameAs: site.socials.map((social) => social.href),
    },
  })

  return (
    <>
      <Hero />
      <Disciplines />
      <Introduction />
      <Expertise />
      <Experience />
      <Contact />
    </>
  )
}
