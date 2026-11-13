/**
 * Dati professionali.
 *
 * Le informazioni provengono dal CV fornito per questa fase. Non vengono
 * aggiunti clienti, risultati, date di certificazione o altri dettagli non
 * documentati. Il luogo di lavoro è indicato solo dove appartiene a una
 * specifica esperienza, non come base personale.
 */

export interface CareerProject {
  name: string
  description: string
}

export interface ProfessionalRole {
  id: string
  role: string
  organisation: string
  period: string
  location: string
  summary: string
  responsibilities: string[]
  projects?: CareerProject[]
}

export const professionalExperience: ProfessionalRole[] = [
  {
    id: 'pwc-italy',
    role: 'Consultant',
    organisation: 'PwC Italy',
    period: 'Gennaio 2024 — oggi',
    location: 'Milano',
    summary:
      'Consulente su progetti di trasformazione digitale e innovazione tecnologica per il settore Financial Services.',
    responsibilities: [
      'Analisi dei requisiti.',
      'Definizione funzionale delle soluzioni.',
      'Supporto all’implementazione di sistemi digitali.',
      'Collaborazione con interlocutori business e tecnici.',
      'Attività nell’ambito di System Integration, Digital Identity e Digital Assets.',
    ],
    projects: [
      {
        name: 'Easy CQS — ABI Lab',
        description:
          'Progetto finalizzato alla digitalizzazione del processo di cessione del quinto dello stipendio attraverso l’utilizzo della tecnologia Blockchain.',
      },
      {
        name: 'Digital Asset Custody',
        description:
          'Progetto sviluppato per un primario istituto bancario, finalizzato al trasferimento e alla custodia di cripto-asset per clientela Large Corporate e Financial Institutions.',
      },
    ],
  },
  {
    id: 'ordine-ingegneri-caserta',
    role: 'Blockchain Trajectory Lead',
    organisation: 'Ordine degli Ingegneri della Provincia di Caserta',
    period: 'Febbraio 2023 — oggi',
    location: 'Caserta',
    summary:
      'Coordinamento del gruppo di lavoro dedicato alla tecnologia Blockchain e organizzazione di seminari tecnici sui relativi framework tecnologici e normativi.',
    responsibilities: [
      'Coordinamento del gruppo di lavoro dedicato alla tecnologia Blockchain.',
      'Organizzazione di seminari tecnici sui framework tecnologici e normativi.',
    ],
  },
]

export interface EducationEntry {
  id: string
  period: string
  title: string
  organisation: string
  status?: string
}

export const education: EducationEntry[] = [
  {
    id: 'laurea-magistrale',
    period: '2026',
    title: 'Laurea Magistrale in Ingegneria dell’Automazione e Cybersecurity',
    organisation: 'Università degli Studi della Campania Luigi Vanvitelli',
    status: 'In corso',
  },
  {
    id: 'laurea-triennale',
    period: '2023 — 2026',
    title: 'Laurea Triennale in Ingegneria Informatica',
    organisation: 'Università degli Studi della Campania Luigi Vanvitelli',
  },
]

export interface Certification {
  name: string
  /** Predisposto per un eventuale link pubblico al credenziale. */
  href?: string
}

/** Nomi esatti del CV; nessun ente o numero di certificazione aggiunto. */
export const certifications: Certification[] = [
  { name: 'Google Project Management' },
  { name: 'Blockchain Developer Nanodegree' },
  { name: 'R3 Corda Developer Certification' },
  { name: 'Chainalysis KYT Certification' },
  { name: 'Mastering Web3 MOOC' },
  { name: 'Sumsub Travel Rule Certification' },
  { name: 'MasterZ – Blockchain & Digital Assets' },
  { name: 'Decentralized Finance (DeFi) Infrastructures' },
]

export interface SkillGroup {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programmazione',
    items: ['Python', 'C', 'JavaScript', 'Kotlin'],
  },
  {
    title: 'Aree tecniche',
    items: [
      'System Integration',
      'Trasformazione digitale',
      'Cybersecurity',
      'Digital Assets',
      'Blockchain e Web3',
      'Compliance e regolamentazione',
      'Analisi funzionale',
    ],
  },
  {
    title: 'Competenze professionali',
    items: [
      'Problem solving',
      'Accuratezza e meticolosità',
      'Leadership',
      'Orientamento agli obiettivi',
      'Capacità relazionali',
    ],
  },
]

export interface LanguageEntry {
  language: string
  level: string
}

export const languages: LanguageEntry[] = [
  { language: 'Italiano', level: 'Madrelingua' },
  { language: 'Inglese', level: 'C1, livello avanzato' },
]
