/**
 * Identità e dati di base del sito.
 *
 * La città di residenza non è documentata e viene quindi omessa. I luoghi
 * associati a un ruolo specifico vivono in `career.ts`.
 */

export const site = {
  name: 'Vincenzo Rauccio',
  domain: 'vincenzorauccio.com',
  url: 'https://vincenzorauccio.com',
  positioning: 'Tecnologia, finanza e innovazione',
  role: 'Consulente Blockchain e speaker',
  descriptor: 'Consulente Blockchain tra tecnologia, finanza e innovazione.',
  email: 'vincenzorauccio12@gmail.com',
  disciplines: ['Blockchain', 'FinTech', 'Pagamenti digitali', 'Web3', 'Trasformazione digitale'],
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vincenzo-rauccio/',
      handle: 'vincenzo-rauccio',
    },
    { label: 'GitHub', href: 'https://github.com/vincx01', handle: 'vincx01' },
    {
      label: 'Instagram',
      href: 'https://instagram.com/vincenzorauccio',
      handle: 'vincenzorauccio',
    },
  ],
} as const

export interface NavItem {
  label: string
  to: string
}

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Chi sono', to: '/about' },
  { label: 'Esperienza', to: '/experience' },
  { label: 'Progetti', to: '/projects' },
  { label: 'Blog', to: '/insights' },
  { label: 'Contatti', to: '/contact' },
]

/** Navigazione volutamente breve del footer. */
export const footerNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Chi sono', to: '/about' },
  { label: 'Progetti', to: '/projects' },
  { label: 'Contatti', to: '/contact' },
]

export interface CapabilityGroup {
  title: string
  description?: string
  items?: string[]
}

/** Le aree di competenza, descritte per dominio e non come auto-promozione. */
export const expertise: CapabilityGroup[] = [
  {
    title: 'Blockchain e registri distribuiti',
    description:
      'Registri condivisi, consenso e verifica crittografica: l’infrastruttura che rende verificabile il valore digitale.',
  },
  {
    title: 'FinTech e pagamenti digitali',
    description:
      'Flussi di pagamento, regolamento e prodotti finanziari che spostano denaro tra persone, banche e piattaforme.',
  },
  {
    title: 'Web3 ed ecosistemi decentralizzati',
    description:
      'Token, wallet, DAO e modelli di governance per sistemi gestiti dalle loro comunità.',
  },
  {
    title: 'Consulenza tecnologica',
    description:
      'Valutare una tecnologia nuova e tradurla in architettura, roadmap e decisioni di delivery.',
  },
  {
    title: 'Trasformazione digitale',
    description:
      'Portare processi, prodotti e modelli operativi dai sistemi esistenti a un’impostazione digitale.',
  },
  {
    title: 'Innovazione finanziaria',
    description:
      'Nuovi strumenti e strutture di mercato nel punto in cui finanza, regole e tecnologia si incontrano.',
  },
]

/** Alias storico usato dal componente condiviso delle competenze. */
export const capabilities = expertise

export interface Highlight {
  value: string
  label: string
  note?: string
}

/** Le metriche compaiono solo quando sono verificate; nessuna è pubblicata. */
export const highlights: Highlight[] = []
