/**
 * Solo riconoscimenti verificati.
 *
 * L’unica voce documentata è l’annuncio del premio, che rimanda alla pagina
 * ufficiale dei vincitori e al numero FinTech Awards 2025. Certificazioni,
 * riconoscimenti accademici e interventi non sono pubblicati altrove, quindi
 * non vengono elencati.
 */

export interface RecognitionEntry {
  id: string
  kind: 'Premio' | 'Certificazione' | 'Speaking' | 'Pubblicazione'
  title: string
  organisation: string
  /** Data come pubblicata. */
  date: string
  /** Data leggibile da <time>. */
  dateTime: string
  summary: string
  image?: { src: string; alt: string }
  links: Array<{ label: string; href: string }>
  /** Articolo interno che racconta il riconoscimento, quando esiste. */
  articleSlug?: string
}

export const recognition: RecognitionEntry[] = [
  {
    id: 'fintech-awards-2025',
    kind: 'Premio',
    title: 'Most Influential FinTech Entrepreneur 2025 (Italy)',
    organisation: 'Wealth & Finance International',
    date: 'Settembre 2025',
    dateTime: '2025-09',
    summary:
      'Il riconoscimento dei FinTech Awards 2025 è legato al lavoro su Blockchain, pagamenti digitali e innovazione Web3.',
    image: {
      src: '/images/insights/fintech-award.jpg',
      alt: 'Due partecipanti davanti al fondale del World Blockchain Summit durante un evento CNBC.',
    },
    links: [
      { label: 'Pagina ufficiale dei vincitori', href: 'https://wealthandfinance.digital/winners/vincenzo-rauccio/' },
      { label: 'FinTech Awards 2025', href: 'https://wealthandfinance.digital/issues/fintech-awards-2025/' },
    ],
    articleSlug:
      'vincenzo-rauccio-named-most-influential-fintech-entrepreneur-2025-italy-by-wealth-finance-international',
  },
]
