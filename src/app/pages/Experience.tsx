import { certifications, education, languages, professionalExperience, skillGroups } from '../../data/career'
import { recognition } from '../../data/recognition'
import { site } from '../../data/site'
import { ExperienceCard } from '../components/career/ExperienceCard'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Button } from '../components/ui/Button'
import { CapabilityList } from '../components/ui/CapabilityList'
import { TextLink } from '../components/ui/TextLink'
import { Timeline } from '../components/ui/Timeline'
import { usePageMeta } from '../lib/meta'

const award = recognition[0]

const educationEntries = education.map((entry) => ({
  period: entry.period,
  title: entry.title,
  organisation: entry.organisation,
  meta: entry.status,
}))

const pageSections = [
  { id: 'esperienza', label: 'Esperienza' },
  { id: 'formazione', label: 'Formazione' },
  { id: 'certificazioni', label: 'Certificazioni' },
  { id: 'competenze', label: 'Competenze' },
  { id: 'lingue', label: 'Lingue' },
]

export function ExperiencePage() {
  usePageMeta({
    title: 'Esperienza — Vincenzo Rauccio',
    description:
      'Il percorso professionale di Vincenzo Rauccio: consulenza in PwC Italy, Blockchain Trajectory Lead all’Ordine degli Ingegneri di Caserta, formazione e certificazioni.',
    path: '/experience',
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">02</span>
            <span className="eyebrow text-ink-muted">Esperienza</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-8">
              <h1 className="max-w-[18ch] font-display text-headline">
                Consulenza, leadership e formazione.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <p className="text-body text-ink-muted">
                Un percorso tra iniziative di trasformazione digitale, coordinamento tecnico e
                formazione continua. Le esperienze e le certificazioni che seguono sono quelle
                riportate nel CV.
              </p>
            </div>
          </div>

          <nav
            aria-label="Sezioni della pagina Esperienza"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-4"
          >
            {pageSections.map((section) => (
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
            <h2 className="eyebrow text-ink-muted">Esperienza professionale</h2>
            <span className="text-caption text-ink-faint">Aggiornato a novembre 2026</span>
          </div>

          <div className="mt-2 border-b border-line">
            {professionalExperience.map((role) => (
              <ExperienceCard key={role.id} role={role} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="formazione" tone="quiet">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Formazione"
            title="Formazione accademica."
            description="Due percorsi in ingegneria, tra automazione, cybersecurity e informatica."
          />
          <Timeline items={educationEntries} className="mt-10" />
        </Container>
      </Section>

      <Section id="certificazioni">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Certificazioni"
            title="Formazione professionale."
            description="Le certificazioni e i percorsi completati, con la denominazione originale."
          />
          <ol className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
            {certifications.map((certification, index) => (
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
            index="05"
            eyebrow="Competenze"
            title="Competenze tecniche e professionali."
            description="Linguaggi, aree tecniche e competenze trasversali maturate nel percorso professionale."
          />
          <CapabilityList items={skillGroups} className="mt-10" />
        </Container>
      </Section>

      <Section id="lingue" spacing="tight">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">06</span>
                <span className="eyebrow text-ink-muted">Lingue</span>
              </div>
              <h2 className="mt-6 font-display text-title">Italiano e inglese.</h2>
            </div>

            <dl className="border-t border-line lg:col-span-7 lg:col-start-6">
              {languages.map((entry) => (
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

      {award && (
        <Section spacing="tight">
          <Container>
            <div className="grid gap-6 border-t border-line pt-5 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
              <div className="lg:col-span-4">
                <p className="eyebrow text-ink-faint">Riconoscimenti</p>
                <h2 className="mt-4 max-w-[16ch] font-display text-title">
                  Un premio che riguarda il lavoro.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="eyebrow text-ink-faint">{award.kind}</p>
                <h3 className="mt-2 text-subtitle">{award.title}</h3>
                <p className="mt-2 text-small text-ink-muted">
                  {award.organisation} · {award.date}
                </p>
                <p className="mt-4 max-w-[56ch] text-small text-ink-muted">{award.summary}</p>
                <div className="mt-5">
                  <TextLink to="/recognition">Vedi il riconoscimento</TextLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section tone="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-7">
              <p className="eyebrow text-ink-faint">Contatti</p>
              <h2 className="mt-4 max-w-[17ch] font-display text-title">
                Parliamo del prossimo passo.
              </h2>
              <p className="text-measure mt-5 text-lead text-ink-muted">
                Per un confronto su un ruolo, una collaborazione o un progetto di consulenza.
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <Button href={`mailto:${site.email}`} arrow>
                Scrivimi
              </Button>
              <Button to="/projects" variant="secondary">
                Vedi i progetti
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
