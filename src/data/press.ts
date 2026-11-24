/**
 * Rassegna stampa: articoli e documenti istituzionali che parlano del percorso.
 *
 * I titoli restano nella lingua di pubblicazione; le date sono registrate in
 * formato ISO e formattate nella lingua dell'interfaccia. Le fonti senza una
 * data verificabile non ne riportano alcuna.
 */

export type PressKind = 'article' | 'document'

/** Trattamento tipografico della testata, usato al posto di un logo non disponibile. */
export type PressWordmark = 'caps' | 'tight' | 'editorial' | 'institutional'

export interface PressEntry {
  id: string
  kind: PressKind
  source: string
  sourceDetail?: string
  wordmark: PressWordmark
  title: string
  dateISO?: string
  href: string
}

export const pressEntries: PressEntry[] = [
  {
    id: 'fox-interviewer',
    kind: 'article',
    source: 'Fox Interviewer',
    wordmark: 'caps',
    title:
      'Vincenzo Pio Rauccio is a brilliant New Age Entrepreneur and the creator of the well-known App',
    dateISO: '2022-05-06',
    href: 'https://foxinterviewer.com/lifestyle/vincenzo-pio-rauccio-is-a-brilliant-new-age-entrepreneur-and-the-creator-of-the-well-known-app/',
  },
  {
    id: 'edizione-caserta',
    kind: 'article',
    source: 'Edizione Caserta',
    wordmark: 'editorial',
    title: 'DigithON 2022: Ciraclo, una startup casertana tra le 100 finaliste',
    dateISO: '2022-06-30',
    href: 'https://edizionecaserta.net/2022/06/30/digithon-2022-ciraclo-una-startup-casertana-tra-le-100-finaliste/',
  },
  {
    id: 'daily-silicon-valley',
    kind: 'article',
    source: 'Daily Silicon Valley',
    wordmark: 'tight',
    title: 'Who is Vincenzo Rauccio, the inventor of the Ciraclo ecosystem?',
    href: 'https://dailysiliconvalley.com/article/who-is-vincenzo-rauccio-the-inventor-of-the-ciraclo-ecosystem/',
  },
  {
    id: 'ordine-ingegneri-caserta',
    kind: 'document',
    source: 'Ordine degli Ingegneri',
    sourceDetail: 'Provincia di Caserta',
    wordmark: 'institutional',
    title: 'Documentazione – Commissione Innovazione ed Economia Circolare',
    href: 'https://caserta.ordingegneri.it/wp-content/uploads/sites/113/2026/04/documentazione-Commissione-Innovazione-e-Economia-circolare.pdf',
  },
]
