/**
 * Solo riconoscimenti verificati.
 *
 * Le voci rimandano alle fonti pubbliche disponibili. I riconoscimenti
 * assegnati a Synclin sono indicati con il destinatario e il ruolo
 * professionale, per non attribuirli direttamente alla persona.
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
  /** Denominazione ufficiale del riconoscimento, quando differisce dal nome dell’iniziativa. */
  awardTitle?: string
  /** Destinatario del riconoscimento, quando non è direttamente Vincenzo Rauccio. */
  recipient?: string
  /** Ruolo professionale collegato al destinatario. */
  recipientRole?: string
  image?: { src: string; alt: string }
  links: Array<{ label: string; href: string }>
  /** Articolo interno che racconta il riconoscimento, quando esiste. */
  articleSlug?: string
}

export const recognition: RecognitionEntry[] = [
  {
    id: 'pan-finance-awards-2026',
    kind: 'Premio',
    title: 'Pan Finance Awards 2026',
    organisation: 'Pan Finance',
    awardTitle: 'Best Professional Booking Management Platform - Italy 2026',
    date: '2026',
    dateTime: '2026',
    recipient: 'Synclin',
    recipientRole: 'Vincenzo Rauccio, Co-Founder & CEO di Synclin',
    summary:
      'Synclin ha ricevuto il riconoscimento Best Professional Booking Management Platform - Italy 2026 nell’ambito dei Pan Finance Awards 2026. Un risultato che valorizza il lavoro di sviluppo del prodotto e l’impegno per semplificare la gestione delle prenotazioni professionali.',
    links: [
      {
        label: 'Leggi l’articolo ufficiale su Synclin',
        href: 'https://synclin.com/blog/pan-finance-awards-2026',
      },
    ],
  },
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
