import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Button } from '../components/ui/Button'
import { Media } from '../components/ui/Media'
import { TextLink } from '../components/ui/TextLink'
import { usePageMeta } from '../lib/meta'

export function Projects() {
  usePageMeta({
    title: 'Progetti — Vincenzo Rauccio',
    description:
      'Synclin: un prodotto SaaS per la gestione degli appuntamenti, con periodo, servizi e sito del progetto.',
    path: '/projects',
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">03</span>
            <span className="eyebrow text-ink-muted">Progetti</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-8">
              <h1 className="max-w-[18ch] font-display text-headline">
                Synclin, dall’idea al prodotto.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pt-2">
              <p className="text-body text-ink-muted">
                Un prodotto SaaS per la gestione degli appuntamenti. La scheda raccoglie periodo,
                servizi e sito del progetto.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {projects.map((project, index) => (
        <Section
          key={project.slug}
          id={project.slug}
          tone={index % 2 === 1 ? 'quiet' : 'light'}
          className={index === 0 ? 'pt-[clamp(3rem,5vw,4rem)]' : undefined}
        >
          <Container width="wide">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-[var(--grid-gap)]">
              <div className={index % 2 === 1 ? 'lg:order-2 lg:col-span-6 lg:col-start-7' : 'lg:col-span-6'}>
                <Media
                  src={project.image.src}
                  alt={project.image.alt}
                  ratio="3/2"
                  priority={index === 0}
                />
              </div>

              <div
                className={
                  index % 2 === 1
                    ? 'lg:order-1 lg:col-span-5'
                    : 'lg:col-span-5 lg:col-start-8'
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-4">
                  <p className="eyebrow text-ink-faint">
                    {String(index + 1).padStart(2, '0')} · {project.category}
                  </p>
                  <span className="eyebrow text-ink-faint">{project.year}</span>
                </div>

                <h2 className="mt-5 font-display text-title">{project.name}</h2>
                <p className="mt-3 text-lead text-ink-muted">{project.summary}</p>
                <p className="mt-4 text-body text-ink-muted">{project.description}</p>

                <dl className="mt-7 border-t border-line">
                  {project.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="grid gap-1 border-b border-line py-3 sm:grid-cols-3 sm:gap-4"
                    >
                      <dt className="eyebrow text-ink-faint">{fact.label}</dt>
                      <dd className="text-small text-ink-muted sm:col-span-2">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button href={project.href} size="sm" arrow>
                    Visita il sito
                  </Button>
                  {project.articleSlug && (
                    <TextLink to={`/${project.articleSlug}`}>Leggi l’articolo</TextLink>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}


      <Section tone="dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-7">
              <p className="eyebrow text-ink-faint">Contatti</p>
              <h2 className="mt-4 max-w-[18ch] font-display text-title">
                Hai un progetto da discutere?
              </h2>
              <p className="text-measure mt-5 text-lead text-ink-muted">
                Scrivimi per una consulenza, una collaborazione o un confronto su prodotto e
                tecnologia.
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <Button href={`mailto:${site.email}`} arrow>
                Scrivimi
              </Button>
              <Button to="/about" variant="secondary">
                Chi sono
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
