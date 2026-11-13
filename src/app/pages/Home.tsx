import { professionalExperience } from '../../data/career'
import { expertise, site } from '../../data/site'

import { Hero } from '../components/home/Hero'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { CapabilityList } from '../components/ui/CapabilityList'
import { TextLink } from '../components/ui/TextLink'
import { Timeline } from '../components/ui/Timeline'

const linkedin = site.socials.find((social) => social.label === 'LinkedIn')?.href ?? site.url

const homeExperience = professionalExperience.map((role) => ({
  period: role.period,
  title: role.role,
  organisation: role.organisation,
  detail: role.summary,
  meta: role.location,
}))

/** Elenco compatto delle discipline sotto l’hero. */
function Disciplines() {
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
          <p className="eyebrow text-ink-faint">Consulenza e interventi</p>
        </div>
      </Container>
    </div>
  )
}

function Introduction() {
  return (
    <Section id="introduction">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="eyebrow text-ink-faint">01</span>
              <span className="eyebrow text-ink-muted">Introduzione</span>
            </div>
            <h2 className="mt-6 max-w-[17ch] font-display text-title">
              Il lavoro comincia dal problema, non dalla tecnologia.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-lead text-ink-muted">
                Sono Vincenzo Rauccio, Consulente Blockchain e speaker. In PwC Italy seguo
                iniziative di trasformazione digitale e innovazione tecnologica per il settore
                Financial Services, dall’analisi dei requisiti alla definizione delle soluzioni.
              </p>
              <p className="mt-5 text-body text-ink-muted">
                Parto dai processi, dalle regole e dalle persone che dovranno usarli. È lì che si
                capisce se una tecnologia risolve un problema reale.
              </p>

              <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-line pt-5 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow text-ink-faint">Ruolo</dt>
                  <dd className="mt-1.5 text-small text-ink-muted">Consulente Blockchain</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-faint">Oggi</dt>
                  <dd className="mt-1.5 text-small text-ink-muted">Consultant, PwC Italy</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-faint">Leadership</dt>
                  <dd className="mt-1.5 text-small text-ink-muted">Blockchain Trajectory Lead</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-faint">Focus</dt>
                  <dd className="mt-1.5 text-small text-ink-muted">Pagamenti digitali</dd>
                </div>
              </dl>

              <div className="mt-9">
                <TextLink to="/about">Conosci il mio percorso</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Expertise() {
  return (
    <Section id="expertise" tone="quiet">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Competenze"
          title="Sei aree, lo stesso metodo: capire il processo prima della tecnologia."
          description="Governance Blockchain, pagamenti digitali e trasformazione digitale: le competenze che porto nei processi."
        />
        <Reveal className="mt-14">
          <CapabilityList items={expertise} />
        </Reveal>
      </Container>
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Esperienza"
          title="Dalla consulenza alla divulgazione."
          description="PwC Italy e Ordine degli Ingegneri della Provincia di Caserta: due ruoli tra consulenza e divulgazione."
          action={<TextLink to="/experience">Vedi l’esperienza</TextLink>}
        />
        <div className="mt-14">
          <Reveal>
            <Timeline items={homeExperience} />
            <p className="mt-5 text-caption text-ink-faint">
              Dalla formazione accademica alle certificazioni, il percorso completo è nella pagina
              Esperienza.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" tone="dark">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 border-t border-line pt-4">
              <span className="eyebrow text-ink-faint">04</span>
              <span className="eyebrow text-ink-muted">Contatti</span>
            </div>
            <h2 className="mt-7 max-w-[16ch] font-display text-headline">
              Raccontami il contesto di cui vuoi parlare.
            </h2>
            <p className="text-measure mt-6 text-lead text-ink-muted">
              Per una consulenza, una collaborazione o un confronto su Blockchain, pagamenti
              digitali e innovazione.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${site.email}`} arrow>
                Scrivimi
              </Button>
              <Button href={linkedin} variant="secondary">
                LinkedIn
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              <div className="border-b border-line py-4">
                <dt className="eyebrow text-ink-faint">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.email}`} className="link-quiet text-small">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-line py-4">
                <dt className="eyebrow text-ink-faint">Profili</dt>
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
