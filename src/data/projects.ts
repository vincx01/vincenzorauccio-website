/**
 * Progetto pubblicato.
 *
 * Le informazioni provengono dalla scheda portfolio e dall’articolo dedicato
 * a Synclin. Non vengono inventati risultati, ruoli o tecnologie.
 */

export interface Project {
  slug: string
  name: string
  category: string
  year: string
  summary: string
  description: string
  image: { src: string; alt: string }
  /** Sito o pagina pubblica del progetto. */
  href: string
  /** Articolo interno che racconta il progetto, quando esiste. */
  articleSlug?: string
  facts: Array<{ label: string; value: string }>
}

export const projects: Project[] = [
  {
    slug: 'synclin',
    name: 'Synclin',
    category: 'Prodotto SaaS',
    year: '2023 — oggi',
    summary: 'Prenotazioni, pagamenti e comunicazione in un unico posto.',
    description:
      'Synclin è una piattaforma di gestione appuntamenti per professionisti indipendenti e studi. Riunisce pagina di prenotazione, pagamenti, fatturazione e promemoria automatici, con un’agenda che applica le regole di disponibilità e impedisce le sovrapposizioni.',
    image: {
      src: '/images/insights/synclin.jpg',
      alt: 'Interfaccia di Synclin su sfondo scuro: calendario, agenda degli appuntamenti e pannello clienti.',
    },
    href: 'https://synclin.com',
    articleSlug: 'introducing-synclin',
    facts: [
      { label: 'Periodo', value: 'Agosto 2023 — oggi' },
      { label: 'Servizi', value: 'Naming, branding, graphic design, web design e sviluppo' },
      { label: 'Sito', value: 'synclin.com' },
    ],
  },
]

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
