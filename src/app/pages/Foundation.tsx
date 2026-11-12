import type { ReactNode } from 'react'

import { capabilities, primaryNav, site } from '../../data/site'
import { cx } from '../lib/cx'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { CapabilityList } from '../components/ui/CapabilityList'
import { Card } from '../components/ui/Card'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Media } from '../components/ui/Media'
import { ProjectPreview } from '../components/ui/ProjectPreview'
import { Stat, StatGrid } from '../components/ui/Stat'
import { TextLink } from '../components/ui/TextLink'
import { Timeline, type TimelineEntry } from '../components/ui/Timeline'
import { usePageMeta } from '../lib/meta'

/* ---------------------------------------------------------------------------
   Dati di riferimento per la guida di stile
--------------------------------------------------------------------------- */

const contents = [
  { id: 'fondamenta', label: 'Fondamenta' },
  { id: 'colore', label: 'Colore' },
  { id: 'tipografia', label: 'Tipografia' },
  { id: 'layout', label: 'Layout' },
  { id: 'componenti', label: 'Componenti' },
  { id: 'interazione', label: 'Interazione' },
]

const mastheadMeta = [
  { term: 'Sistema', detail: 'Colore · tipografia · layout · componenti' },
  { term: 'Stack', detail: 'React · Tailwind CSS · Motion' },
  { term: 'Ambito', detail: 'Fondamenta di design, v0.1' },
  { term: 'Font', detail: 'Inter Tight · Inter' },
]

const brandColours = [
  { name: 'Navy profondo', value: '#101D32', role: 'Superficie del marchio, testo principale e azioni primarie.' },
  { name: 'Avorio caldo', value: '#F4F2ED', role: 'Canvas predefinito; testo sul navy.' },
  { name: 'Blu acciaio', value: '#527A9B', role: 'Accento funzionale: linee, focus, enfasi.' },
  { name: 'Grigio blu tenue', value: '#B7C6D5', role: 'Testo secondario sul navy; divisori discreti.' },
]

const surfaceRoles = [
  { name: 'Canvas', token: '--surface-canvas', role: 'Sfondo della pagina' },
  { name: 'Rilievo', token: '--surface-raised', role: 'Schede e pannelli' },
  { name: 'Fondo', token: '--surface-sunken', role: 'Bande silenziose, letti delle immagini' },
  { name: 'Inchiostro', token: '--surface-ink', role: 'Testo principale' },
  { name: 'Inchiostro attenuato', token: '--surface-ink-muted', role: 'Testo secondario' },
  { name: 'Inchiostro tenue', token: '--surface-ink-faint', role: 'Didascalie e indici' },
  { name: 'Linea', token: '--surface-line', role: 'Tratti sottili e divisori' },
  { name: 'Linea forte', token: '--surface-line-strong', role: 'Controlli, linee di enfasi' },
  { name: 'Accento', token: '--surface-accent', role: 'Anelli di focus e segni' },
  { name: 'Accento testuale', token: '--surface-accent-ink', role: 'Testo d’accento con contrasto 4.5:1 o superiore' },
]

const typeSpecimens = [
  { label: 'Titolo display', token: 'text-display', spec: 'clamp(44 → 92px) · 0.96 · −3.5%', sample: 'Vincenzo Rauccio', className: 'font-display text-display' },
  { label: 'Titolo', token: 'text-headline', spec: 'clamp(36 → 56px) · 1.02 · −3%', sample: 'Chiarezza a ogni scala', className: 'font-display text-headline' },
  { label: 'Titolo · H2', token: 'text-title', spec: 'clamp(28 → 40px) · 1.08 · −2.5%', sample: 'Progetti selezionati', className: 'font-display text-title' },
  { label: 'Sottotitolo · H3', token: 'text-subtitle', spec: '19 → 23px · 1.25 · −1.5%', sample: 'Pagamenti digitali e regolamento', className: 'font-display text-subtitle' },
  { label: 'Occhiello', token: 'text-lead', spec: '17 → 20px · 1.55', sample: 'Un solo carattere tipografico accompagna il sistema, dai titoli ai testi di interfaccia.', className: 'text-lead text-ink-muted' },
  { label: 'Testo', token: 'text-body', spec: '16px · 1.65 · misura 64ch', sample: 'Il testo di lettura fissa il ritmo: sedici pixel su un’interlinea di 1.65, con una misura vicina ai sessantaquattro caratteri.', className: 'text-body' },
  { label: 'Piccolo', token: 'text-small', spec: '15px · 1.55', sample: 'Dettagli di supporto, metadati e testi secondari dell’interfaccia.', className: 'text-small text-ink-muted' },
  { label: 'Didascalia', token: 'text-caption', spec: '13px · 1.45', sample: 'Figura 01 — Il blu acciaio usato come accento funzionale.', className: 'text-caption text-ink-faint' },
  { label: 'Etichetta', token: 'eyebrow', spec: '11px · 0.16em · maiuscolo', sample: 'Competenze', className: 'eyebrow text-ink-muted' },
]

const layoutSpecs = [
  { term: 'Larghezza contenuto', detail: '1240px', note: 'Contenitore predefinito' },
  { term: 'Larghezza estesa', detail: '1480px', note: 'Header, footer, griglie a tutta larghezza' },
  { term: 'Larghezza stretta', detail: '760px', note: 'Lettura lunga' },
  { term: 'Margine laterale', detail: '20 → 48px', note: 'Fluido con il viewport' },
  { term: 'Griglia', detail: '12 colonne', note: 'Gap da 16 → 28px' },
  { term: 'Ritmo di sezione', detail: '72 → 128px', note: 'Bande compatte a 48 → 72px' },
]

const timelineSamples: TimelineEntry[] = [
  { period: '20XX — oggi', title: 'Ruolo o posizione', organisation: 'Organizzazione', detail: 'Una riga su ambito, team e attività. Solo struttura di esempio.', meta: 'Segnaposto' },
  { period: '20XX — 20XX', title: 'Ruolo o posizione', organisation: 'Organizzazione', detail: 'Una riga su ambito, team e attività.', meta: 'Segnaposto' },
]

const interactionPrinciples = [
  { title: 'Passaggio del puntatore', body: 'Da 250 a 400ms su colore e linee. Nessun salto di scala, nessuna ombra che solleva le schede dalla pagina.' },
  { title: 'Pressione', body: 'Un pixel di movimento. I controlli primari si scuriscono; quelli secondari acquistano un bordo più marcato.' },
  { title: 'Focus', body: 'Un contorno in blu acciaio di 2px con offset di 3px. Mai rimosso, mai tagliato dall’overflow.' },
  { title: 'Comparsa', body: 'Un sollevamento di 16px in 700ms, una volta per elemento, solo sotto la piega. Il contenuto non resta mai nascosto senza movimento.' },
  { title: 'Movimento ridotto', body: 'Tutte le transizioni scendono a 0.01ms e lo scorrimento fluido si disattiva quando il sistema lo richiede.' },
  { title: 'Budget', body: 'Una comparsa per sezione. Niente loop in sottofondo e niente elementi che seguono il cursore.' },
]

/* ---------------------------------------------------------------------------
   Helper di presentazione
--------------------------------------------------------------------------- */

function Specimen({
  label,
  note,
  children,
  className,
}: {
  label: string
  note?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cx('border-t border-line pt-6', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Eyebrow>{label}</Eyebrow>
        {note && <span className="text-caption text-ink-faint">{note}</span>}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

function Swatch({ name, value, role }: { name: string; value: string; role: string }) {
  return (
    <div>
      <div
        className="h-28 w-full rounded-xs border border-line"
        style={{ background: value }}
        aria-hidden="true"
      />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="text-small font-medium">{name}</span>
        <span className="eyebrow text-ink-faint">{value}</span>
      </div>
      <p className="mt-1 max-w-[34ch] text-caption text-ink-muted">{role}</p>
    </div>
  )
}

function RoleList() {
  return (
    <ul className="mt-6 border-t border-line">
      {surfaceRoles.map((role) => (
        <li key={role.token} className="flex items-center gap-4 border-b border-line py-3">
          <span
            aria-hidden="true"
            className="size-3 shrink-0 rounded-xs border border-line-strong"
            style={{ background: `var(${role.token})` }}
          />
          <span className="w-32 shrink-0 text-small">{role.name}</span>
          <code className="truncate font-mono text-[0.6875rem] text-ink-faint">{role.token}</code>
          <span className="ml-auto hidden text-caption text-ink-muted sm:block">{role.role}</span>
        </li>
      ))}
    </ul>
  )
}

/* ---------------------------------------------------------------------------
   Pagina
--------------------------------------------------------------------------- */

export function Foundation() {
  usePageMeta({
    title: 'Fondamenta di design — Vincenzo Rauccio',
    description:
      'Guida di stile del sito: colore, tipografia, layout, componenti e regole di interazione.',
    path: '/design-system',
  })

  return (
    <>
      <Section tone="dark" spacing="none" className="overflow-hidden border-b border-line">
        <div className="surface-glow absolute inset-0" aria-hidden="true" />
        <div className="surface-grid surface-grid-fade absolute inset-0" aria-hidden="true" />
        <Container width="wide" className="relative py-[clamp(4.5rem,9vw,8rem)]">
          <Reveal>
            <Eyebrow className="text-ink-faint">Fondamenta di design · v0.1</Eyebrow>
            <h1 className="mt-8 font-display text-display">{site.name}</h1>
            <p className="mt-7 font-display text-subtitle text-ink-muted">{site.positioning}</p>
            <p className="text-measure mt-6 text-body text-ink-muted">
              Il sistema di design di {site.domain}: colore, tipografia, layout e componenti
              condivisi. Le pagine vengono composte a partire da queste fondamenta.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-12 border-t border-line pt-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-7">
              {mastheadMeta.map((item) => (
                <div key={item.term} className="flex flex-col gap-1">
                  <dt className="eyebrow text-ink-faint">{item.term}</dt>
                  <dd className="text-small text-ink-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
            <nav aria-label="Indice delle fondamenta di design" className="lg:col-span-5">
              <ul className="flex flex-col">
                {contents.map((item, index) => (
                  <li key={item.id} className="border-b border-line first:border-t">
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline justify-between gap-4 py-2.5 text-small text-ink-muted transition-colors duration-300 hover:text-ink"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="eyebrow text-ink-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </Section>

      <Section id="fondamenta">
        <Container>
          <SectionHeading
            index="00"
            eyebrow="Fondamenta"
            title="La struttura prima dell’ornamento."
            description="Quattro colori, due caratteri tipografici, un solo ritmo di spaziatura. La gerarchia nasce da scala e spazio bianco; il colore d’accento è riservato al segnale, mai alla decorazione."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: 'Palette', detail: '4 colori di marca, 10 ruoli di interfaccia' },
              { term: 'Tipografia', detail: '2 famiglie, 9 livelli' },
              { term: 'Griglia', detail: '12 colonne, contenuto da 1240px' },
              { term: 'Raggi', detail: '2 / 4 / 6 / 10px' },
            ].map((item) => (
              <Reveal key={item.term} className="border-t border-line pt-4">
                <Eyebrow className="text-ink-faint">{item.term}</Eyebrow>
                <p className="mt-2 text-small text-ink-muted">{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="colore" tone="quiet">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Colore"
            title="Navy istituzionale, carta calda, un solo blu funzionale."
            description="La palette è volutamente stretta. Il blu acciaio segnala interazione e dati; il grigio blu tenue accompagna il testo secondario sul navy. Ogni abbinamento rispetta il contrasto WCAG AA."
          />
          <div className="mt-14 grid gap-x-[var(--grid-gap)] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {brandColours.map((colour) => (
              <Swatch key={colour.name} {...colour} />
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-[var(--grid-gap)]">
            <div className="border border-line p-6 sm:p-8">
              <Eyebrow>Ruoli di superficie — chiaro</Eyebrow>
              <RoleList />
            </div>
            <div data-surface="dark" className="border border-line bg-canvas p-6 text-ink sm:p-8">
              <Eyebrow>Ruoli di superficie — scuro</Eyebrow>
              <RoleList />
              <p className="mt-6 text-caption text-ink-faint">
                Lo stesso markup e gli stessi token. Cambia solo <code className="font-mono">data-surface</code>.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="tipografia">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Tipografia"
            title="Scala editoriale, sobrietà corporate."
            description="Inter Tight compone i titoli con tracking stretto e interlinea serrata; Inter accompagna il testo e l’interfaccia. Le dimensioni seguono il viewport, senza regole dedicate ai singoli breakpoint."
          />
          <div className="mt-14 border-t border-line">
            {typeSpecimens.map((spec) => (
              <Reveal
                key={spec.label}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-[var(--grid-gap)]"
              >
                <div className="md:col-span-3">
                  <Eyebrow>{spec.label}</Eyebrow>
                  <p className="mt-2 text-caption text-ink-faint">{spec.spec}</p>
                  <code className="mt-1 block font-mono text-[0.6875rem] text-ink-faint">{spec.token}</code>
                </div>
                <div className={cx('md:col-span-9', spec.className)}>{spec.sample}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="layout" tone="quiet">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Layout"
            title="Una griglia, tre larghezze, spaziatura fluida."
            description="Ogni sezione condivide contenitore, margine e ritmo verticale. L’allineamento lo decide la griglia a dodici colonne, non l’occhio."
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-7">
              <Eyebrow className="text-ink-faint">Dodici colonne</Eyebrow>
              <div className="mt-5 grid grid-cols-6 gap-2 md:grid-cols-12">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="h-24 bg-canvas/70 ring-1 ring-line" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 text-caption text-ink-muted">
                Quattro colonne su mobile, dodici da 640px. Il gap passa da 16px a 28px.
              </p>
            </div>
            <div className="lg:col-span-5">
              <Eyebrow className="text-ink-faint">Specifiche</Eyebrow>
              <dl className="mt-5 border-t border-line">
                {layoutSpecs.map((spec) => (
                  <div key={spec.term} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <dt className="text-small">{spec.term}</dt>
                    <dd className="text-right">
                      <span className="block text-small tabular-nums">{spec.detail}</span>
                      <span className="block text-caption text-ink-faint">{spec.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-ink-faint">Proporzioni delle immagini</Eyebrow>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(['4/5', '1/1', '3/2', '16/9'] as const).map((ratio) => (
                <div key={ratio}>
                  <Media ratio={ratio} />
                  <p className="mt-2 text-caption text-ink-faint">{ratio.replace('/', ' : ')}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="componenti">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Componenti"
            title="Un solo linguaggio, riusato ovunque."
            description="Ogni elemento legge gli stessi token, così stati, spaziatura e tipografia restano coerenti mentre le pagine vengono composte. Gli esempi usano segnaposto strutturali."
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-[var(--grid-gap)]">
            <Specimen label="Pulsanti" note="Primario · Secondario · Fantasma">
              <div className="flex flex-wrap items-center gap-3">
                <Button arrow>Azione primaria</Button>
                <Button variant="secondary">Secondario</Button>
                <Button variant="ghost" arrow>
                  Azione fantasma
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Piccolo</Button>
                <Button size="sm" variant="secondary">
                  Piccolo secondario
                </Button>
                <Button disabled>Disattivato</Button>
              </div>
            </Specimen>

            <Specimen label="Link" note="Navigazione in linea, regola del 40%">
              <div className="flex flex-wrap items-center gap-8">
                <TextLink to="/">Link con freccia</TextLink>
                <a href="#componenti" className="link-quiet text-small">
                  Link silenzioso
                </a>
                <span className="link-quiet text-small" data-active="true">
                  Stato attivo
                </span>
              </div>
            </Specimen>

            <Specimen label="Schede" note="Contorno · Riempita · Interattiva">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <Eyebrow className="text-ink-faint">Contorno</Eyebrow>
                  <p className="mt-3 font-display text-subtitle">Contenuto raggruppato</p>
                  <p className="mt-2 text-small text-ink-muted">Un bordo sottile, riempimento trasparente.</p>
                </Card>
                <Card variant="filled" interactive>
                  <Eyebrow className="text-ink-faint">Riempita</Eyebrow>
                  <p className="mt-3 font-display text-subtitle">Enfasi discreta</p>
                  <p className="mt-2 text-small text-ink-muted">Superficie in rilievo, si solleva di 2px.</p>
                </Card>
              </div>
            </Specimen>

            <Specimen label="Titolo di sezione" note="Indice · occhiello · titolo · descrizione">
              <div className="border-t border-line pt-4">
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-ink-faint">01</span>
                  <span className="eyebrow text-ink-muted">Competenze</span>
                </div>
                <p className="mt-5 font-display text-title">Un titolo enuncia la tesi.</p>
                <p className="text-measure mt-3 text-lead text-ink-muted">
                  La descrizione porta la frase di supporto, a una scala più piccola e più quieta.
                </p>
              </div>
            </Specimen>

            <Specimen label="Statistiche" note="Valore · etichetta · nota">
              <StatGrid>
                <Stat value="—" label="Metrica" note="In attesa di dati" />
                <Stat value="—" label="Metrica" note="In attesa di dati" />
                <Stat value="—" label="Metrica" note="In attesa di dati" />
                <Stat value="—" label="Metrica" note="In attesa di dati" />
              </StatGrid>
            </Specimen>
          </div>

          <div className="mt-14">
            <Eyebrow className="text-ink-faint">Anteprime progetti</Eyebrow>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {['01', '02', '03'].map((index) => (
                <ProjectPreview
                  key={index}
                  index={index}
                  title="Nome progetto"
                  category="Categoria · Settore"
                  year="20XX"
                />
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-[var(--grid-gap)]">
            <div>
              <Eyebrow className="text-ink-faint">Timeline dell’esperienza</Eyebrow>
              <Timeline items={timelineSamples} className="mt-6" />
            </div>
            <div>
              <Eyebrow className="text-ink-faint">Categorie di competenza</Eyebrow>
              <CapabilityList items={capabilities} className="mt-6" />
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-ink-faint">Inversione di superficie — componenti su navy</Eyebrow>
            <div
              data-surface="dark"
              className="mt-6 grid gap-10 border border-line bg-canvas p-6 text-ink sm:p-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            >
              <div className="lg:col-span-6">
                <span className="eyebrow text-ink-faint">Azione primaria</span>
                <p className="mt-5 font-display text-title">Gli stessi componenti, invertiti.</p>
                <p className="text-measure mt-3 text-small text-ink-muted">
                  I ruoli di superficie si ribaltano con un solo attributo: nessun componente ha
                  bisogno di una variante scura.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button arrow>Azione primaria</Button>
                  <Button variant="secondary">Secondario</Button>
                </div>
              </div>
              <div className="lg:col-span-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="border-t border-line pt-3">
                    <dt className="eyebrow text-ink-faint">Inchiostro tenue</dt>
                    <dd className="mt-2 text-small text-ink-muted">6.3:1 sul navy</dd>
                  </div>
                  <div className="border-t border-line pt-3">
                    <dt className="eyebrow text-ink-faint">Inchiostro attenuato</dt>
                    <dd className="mt-2 text-small text-ink-muted">9.8:1 sul navy</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-ink-faint">Navigazione</Eyebrow>
            <p className="text-measure mt-4 text-small text-ink-muted">
              Persistente in alto. Struttura: {primaryNav.map((item) => item.label).join(' · ')}. Il
              pannello mobile prende il posto della barra sotto i 1024px, si chiude con Escape e
              ripristina lo scroll.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="interazione" tone="dark">
        <Container>
          <SectionHeading
            index="05"
            eyebrow="Interazione"
            title="Il movimento conferma, non si esibisce."
            description="Le transizioni sono brevi, direzionali e interrompibili. Nulla compete con la lettura e ogni effetto ha un equivalente statico."
          />
          <div className="mt-14 grid gap-x-[var(--grid-gap)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {interactionPrinciples.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.04} className="border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-subtitle">{principle.title}</h3>
                <p className="mt-2 text-small text-ink-muted">{principle.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <TextLink to="/" className="text-ink">
              Torna alla homepage
            </TextLink>
            <span className="text-caption text-ink-faint">
              Home · Chi sono · Esperienza · Progetti · Blog · Contatti
            </span>
          </div>
        </Container>
      </Section>
    </>
  )
}
