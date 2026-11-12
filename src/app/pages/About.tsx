import { languages, skillGroups } from '../../data/career'
import { recognition } from '../../data/recognition'
import { site } from '../../data/site'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { TextLink } from '../components/ui/TextLink'
import { usePageMeta } from '../lib/meta'

const award = recognition[0]
const professionalSkills = skillGroups.find((group) => group.title === 'Competenze professionali')?.items ?? []
const italian = languages.find((entry) => entry.language === 'Italiano')
const english = languages.find((entry) => entry.language === 'Inglese')

export function About() {
  usePageMeta({
    title: 'Chi sono — Vincenzo Rauccio',
    description:
      'Vincenzo Rauccio è Consulente Blockchain e speaker. Lavora in PwC Italy su trasformazione digitale e innovazione tecnologica per il settore Financial Services.',
    path: '/about',
  })

  return (
    <>
      <Section spacing="none">
        <Container width="wide" className="pt-[clamp(3rem,6vw,5rem)]">
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow text-ink-faint">01</span>
            <span className="eyebrow text-ink-muted">Chi sono</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-6">
              <h1 className="max-w-[20ch] font-display text-headline">
                Tecnologia e innovazione dentro i processi.
              </h1>
              <p className="text-measure mt-7 text-lead text-ink-muted">
                Mi chiamo Vincenzo Rauccio. Lavoro come Consulente Blockchain e speaker. In PwC
                Italy seguo iniziative di trasformazione digitale per il settore Financial Services;
                nell’Ordine degli Ingegneri della Provincia di Caserta coordino il gruppo Blockchain.
              </p>
            </div>

            <figure className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <img
                src="/images/foto-profilo-transparent.png"
                srcSet="/images/foto-profilo-transparent-545.png 411w, /images/foto-profilo-transparent.png 1090w"
                sizes="(min-width: 1024px) 352px, 90vw"
                width={1090}
                height={1443}
                alt="Vincenzo Rauccio, Consulente Blockchain e professionista nell’ambito dell’innovazione tecnologica."
                loading="eager"
                decoding="async"
                className="mx-auto h-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:mx-0 lg:max-w-[22rem]"
              />
            </figure>
          </div>

          <dl className="mt-10 grid gap-x-8 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">Ruolo</dt>
              <dd className="mt-1.5 text-small text-ink-muted">{site.role}</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">Oggi</dt>
              <dd className="mt-1.5 text-small text-ink-muted">Consultant, PwC Italy</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">Leadership</dt>
              <dd className="mt-1.5 text-small text-ink-muted">
                Blockchain Trajectory Lead, Ordine degli Ingegneri di Caserta
              </dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="eyebrow text-ink-faint">Focus</dt>
              <dd className="mt-1.5 text-small text-ink-muted">
                Blockchain, pagamenti digitali, Web3
              </dd>
            </div>
            {award && (
              <div className="border-b border-line py-3">
                <dt className="eyebrow text-ink-faint">Riconoscimento</dt>
                <dd className="mt-1.5 text-small text-ink-muted">
                  {award.title}, {award.date.toLowerCase()}
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
                <span className="eyebrow text-ink-faint">02</span>
                <span className="eyebrow text-ink-muted">Il lavoro</span>
              </div>
              <h2 className="mt-6 max-w-[16ch] font-display text-title">
                Capire prima di costruire.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-lead text-ink-muted">
                  In PwC Italy lavoro su iniziative di trasformazione digitale e innovazione
                  tecnologica per il settore Financial Services. Parto dall’analisi dei requisiti e
                  dalla definizione funzionale delle soluzioni, collaborando con interlocutori
                  business e tecnici.
                </p>
                <p className="mt-5 text-body text-ink-muted">
                  Nell’Ordine degli Ingegneri della Provincia di Caserta coordino il gruppo di
                  lavoro dedicato alla Blockchain e organizzo seminari tecnici sui framework
                  tecnologici e normativi.
                </p>
                <p className="mt-5 text-body text-ink-muted">
                  Accanto alla consulenza porto avanti un prodotto mio, Synclin, e attività di
                  divulgazione: articoli, interventi e confronti pubblici su come la tecnologia
                  cambia processi e organizzazioni.
                </p>

                <div className="mt-10 border-t border-line pt-5">
                  <TextLink to="/experience">Guarda il percorso completo</TextLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="competenze" tone="quiet">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Competenze"
            title="Tecnica e metodo, con attenzione alla relazione."
            description="Competenze tecniche e trasversali, raccolte per area. Il dettaglio completo è nella pagina Esperienza."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-5">
              <h3 className="text-subtitle">Programmazione e aree tecniche</h3>
              <p className="mt-3 text-body text-ink-muted">
                Python, C, JavaScript e Kotlin. Lavoro su System Integration, trasformazione
                digitale, cybersecurity e Digital Assets, con un’attenzione particolare a
                Blockchain, Web3, compliance e analisi funzionale.
              </p>
              <p className="mt-5 text-small text-ink-muted">
                {italian?.language}: {italian?.level}. {english?.language}: {english?.level}.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h3 className="eyebrow text-ink-faint">Competenze professionali</h3>
              <ul className="mt-3 border-t border-line">
                {professionalSkills.map((skill) => (
                  <li key={skill} className="border-b border-line py-3 text-small text-ink-muted">
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <TextLink to="/experience#competenze">Competenze e percorso completo</TextLink>
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
                <span className="eyebrow text-ink-faint">04</span>
                <span className="eyebrow text-ink-muted">Come lavoro</span>
              </div>
              <h2 className="mt-6 max-w-[15ch] font-display text-title">
                Il metodo di lavoro.
              </h2>
            </div>

            <div className="lg:col-span-7">
              <dl className="border-t border-line">
                <div className="border-b border-line py-6">
                  <dt className="text-subtitle">Prima il problema</dt>
                  <dd className="mt-2 max-w-[56ch] text-small text-ink-muted">
                    Una tecnologia non basta se il processo intorno non regge. Parto da cosa non
                    funziona, da chi lo usa e da quali vincoli esistono.
                  </dd>
                </div>
                <div className="border-b border-line py-6">
                  <dt className="text-subtitle">Verificare prima di promettere</dt>
                  <dd className="mt-2 max-w-[56ch] text-small text-ink-muted">
                    Prototipi, scenari e limiti espliciti valgono più di una presentazione. Se
                    qualcosa non regge, va detto prima.
                  </dd>
                </div>
                <div className="border-b border-line py-6">
                  <dt className="text-subtitle">Sistemi che restano comprensibili</dt>
                  <dd className="mt-2 max-w-[56ch] text-small text-ink-muted">
                    Documentazione, governance e competenze interne: un progetto deve poter vivere
                    anche senza chi lo ha avviato.
                  </dd>
                </div>
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
                <span className="eyebrow text-ink-faint">05</span>
                <span className="eyebrow text-ink-muted">Riconoscimenti</span>
              </div>
              <h2 className="mt-6 max-w-[16ch] font-display text-title">
                Un riconoscimento al lavoro svolto.
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
                    <TextLink to="/recognition">Tutti i riconoscimenti</TextLink>
                  </div>
                </div>
              ) : (
                <p className="border-t border-line pt-5 text-small text-ink-muted">
                  I riconoscimenti documentati saranno pubblicati qui.
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
              <p className="eyebrow text-ink-faint">Contatti</p>
              <h2 className="mt-4 max-w-[18ch] font-display text-title">
                Se vuoi parlarne, scrivimi.
              </h2>
              <p className="text-measure mt-5 text-lead text-ink-muted">
                Per parlare di un progetto, di una collaborazione o di un percorso di consulenza.
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <Button href={`mailto:${site.email}`} arrow>
                Scrivimi
              </Button>
              <Button to="/experience" variant="secondary">
                Vedi l’esperienza
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
