import type {
  Certification,
  EducationEntry,
  LanguageEntry,
  ProfessionalRole,
  SkillGroup,
} from '../data/career'
import { certifications as itCertifications, education as itEducation, languages as itLanguages, professionalExperience as itExperience, skillGroups as itSkills } from '../data/career'
import type { CapabilityGroup } from '../data/site'
import { expertise as itExpertise, site as baseSite } from '../data/site'
import type { Project } from '../data/projects'
import { projects as itProjects } from '../data/projects'
import type { Locale } from './core'

export interface SiteContent {
  name: string
  domain: string
  url: string
  positioning: string
  role: string
  descriptor: string
  email: string
  disciplines: readonly string[]
  socials: ReadonlyArray<{ label: string; href: string; handle: string }>
}

const siteContent: Record<Locale, SiteContent> = {
  it: baseSite,
  en: {
    ...baseSite,
    positioning: 'Technology, finance and innovation',
    role: 'Blockchain Consultant and speaker',
    descriptor: 'Blockchain consultant working across technology, finance and innovation.',
    disciplines: ['Blockchain', 'FinTech', 'Digital payments', 'Web3', 'Digital transformation'],
  },
}

export function localizedSite(locale: Locale): SiteContent {
  return siteContent[locale]
}

export interface NavContent {
  primary: Array<{ label: string; to: string }>
  footer: Array<{ label: string; to: string }>
}

const navContent: Record<Locale, NavContent> = {
  it: {
    primary: [
      { label: 'Home', to: '/' },
      { label: 'Chi sono', to: '/about' },
      { label: 'Esperienza', to: '/experience' },
      { label: 'Progetti', to: '/projects' },
      { label: 'Blog', to: '/insights' },
      { label: 'Contatti', to: '/contact' },
    ],
    footer: [
      { label: 'Home', to: '/' },
      { label: 'Chi sono', to: '/about' },
      { label: 'Progetti', to: '/projects' },
      { label: 'Contatti', to: '/contact' },
    ],
  },
  en: {
    primary: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Experience', to: '/experience' },
      { label: 'Projects', to: '/projects' },
      { label: 'Blog', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
    footer: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Projects', to: '/projects' },
      { label: 'Contact', to: '/contact' },
    ],
  },
}

export function localizedNav(locale: Locale): NavContent {
  return navContent[locale]
}

const expertiseContent: Record<Locale, CapabilityGroup[]> = {
  it: itExpertise,
  en: [
    {
      title: 'Blockchain and distributed ledgers',
      description:
        'Shared ledgers, consensus and cryptographic verification: the infrastructure that makes digital value auditable.',
    },
    {
      title: 'FinTech and digital payments',
      description:
        'Payment flows, settlement and financial products that move money between people, banks and platforms.',
    },
    {
      title: 'Web3 and decentralised ecosystems',
      description:
        'Tokens, wallets, DAOs and governance models for systems run by their communities.',
    },
    {
      title: 'Technology consulting',
      description:
        'Assessing emerging technology and turning it into architecture, roadmaps and delivery decisions.',
    },
    {
      title: 'Digital transformation',
      description:
        'Moving processes, products and operating models from legacy systems to a digital footing.',
    },
    {
      title: 'Financial innovation',
      description:
        'New instruments and market structures where finance, regulation and technology meet.',
    },
  ],
}

export function localizedExpertise(locale: Locale): CapabilityGroup[] {
  return expertiseContent[locale]
}

export interface CareerContent {
  professionalExperience: ProfessionalRole[]
  education: EducationEntry[]
  certifications: Certification[]
  skillGroups: SkillGroup[]
  languages: LanguageEntry[]
}

const careerContent: Record<Locale, CareerContent> = {
  it: {
    professionalExperience: itExperience,
    education: itEducation,
    certifications: itCertifications,
    skillGroups: itSkills,
    languages: itLanguages,
  },
  en: {
    professionalExperience: [
      {
        id: 'pwc-italy',
        role: 'Consultant',
        organisation: 'PwC Italy',
        period: 'January 2024 — present',
        location: 'Milan',
        summary:
          'Consulting on digital transformation and technology innovation programmes for the Financial Services sector.',
        responsibilities: [
          'Requirements analysis.',
          'Functional solution design.',
          'Support for the implementation of digital systems.',
          'Collaboration with business and technology stakeholders.',
          'Work across System Integration, Digital Identity and Digital Assets.',
        ],
        projects: [
          {
            name: 'Easy CQS — ABI Lab',
            description:
              'A project to digitise the salary-backed loan assignment process using blockchain technology.',
          },
          {
            name: 'Digital Asset Custody',
            description:
              'A project for a leading bank covering the transfer and custody of crypto-assets for Large Corporate and Financial Institutions clients.',
          },
        ],
      },
      {
        id: 'ordine-ingegneri-caserta',
        role: 'Blockchain Innovation Lead',
        organisation: 'Ordine degli Ingegneri della Provincia di Caserta',
        period: 'February 2023 — present',
        location: 'Caserta',
        summary:
          'Leading the Blockchain working group and organising technical seminars on the relevant technology and regulatory frameworks.',
        responsibilities: [
          'Leading the working group dedicated to blockchain technology.',
          'Organising technical seminars on technology and regulatory frameworks.',
        ],
      },
    ],
    education: [
      {
        id: 'laurea-magistrale',
        period: '2026',
        title: 'Master’s degree in Automation Engineering and Cybersecurity',
        organisation: 'Università degli Studi della Campania Luigi Vanvitelli',
        status: 'In progress',
      },
      {
        id: 'laurea-triennale',
        period: '2023 — 2026',
        title: 'Bachelor’s degree in Computer Engineering',
        organisation: 'Università degli Studi della Campania Luigi Vanvitelli',
      },
    ],
    certifications: itCertifications,
    skillGroups: [
      {
        title: 'Programming',
        items: ['Python', 'C', 'JavaScript', 'Kotlin'],
      },
      {
        title: 'Technical areas',
        items: [
          'System Integration',
          'Digital transformation',
          'Cybersecurity',
          'Digital Assets',
          'Blockchain and Web3',
          'Compliance and regulation',
          'Functional analysis',
        ],
      },
      {
        title: 'Professional skills',
        items: [
          'Problem solving',
          'Accuracy and attention to detail',
          'Leadership',
          'Results orientation',
          'Interpersonal skills',
        ],
      },
    ],
    languages: [
      { language: 'Italian', level: 'Native' },
      { language: 'English', level: 'C1, advanced' },
    ],
  },
}

export function localizedCareer(locale: Locale): CareerContent {
  return careerContent[locale]
}

const projectsContent: Record<Locale, Project[]> = {
  it: itProjects,
  en: [
    {
      slug: 'synclin',
      name: 'Synclin',
      category: 'SaaS product',
      year: '2023 — present',
      summary: 'Bookings, payments and communication in one place.',
      description:
        'Synclin is an appointment management platform for independent professionals and practices. It brings together a booking page, payments, invoicing and automated reminders, with a calendar that applies availability rules and prevents double bookings.',
      image: {
        src: '/images/insights/synclin.jpg',
        alt: 'The Synclin interface on a dark background: calendar, appointment schedule and client panel.',
      },
      href: 'https://synclin.com',
      articleSlug: 'introducing-synclin',
      facts: [
        { label: 'Period', value: 'August 2023 — present' },
        { label: 'Services', value: 'Naming, branding, graphic design, web design and development' },
        { label: 'Website', value: 'synclin.com' },
      ],
    },
  ],
}

export function localizedProjects(locale: Locale): Project[] {
  return projectsContent[locale]
}

export type RecognitionKind =
  | 'Premio'
  | 'Award'
  | 'Certificazione'
  | 'Certification'
  | 'Speaking'
  | 'Pubblicazione'
  | 'Publication'

export interface LocalizedRecognition {
  id: string
  kind: RecognitionKind
  title: string
  organisation: string
  date: string
  dateTime: string
  summary: string
  awardTitle?: string
  recipient?: string
  recipientRole?: string
  image?: { src: string; alt: string }
  links: Array<{ label: string; href: string }>
  articleSlug?: string
}

const recognitionContent: Record<Locale, LocalizedRecognition[]> = {
  it: [
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
  ],
  en: [
    {
      id: 'pan-finance-awards-2026',
      kind: 'Award',
      title: 'Pan Finance Awards 2026',
      organisation: 'Pan Finance',
      awardTitle: 'Best Professional Booking Management Platform - Italy 2026',
      date: '2026',
      dateTime: '2026',
      recipient: 'Synclin',
      recipientRole: 'Vincenzo Rauccio, Co-Founder & CEO at Synclin',
      summary:
        'Synclin was named Best Professional Booking Management Platform - Italy 2026 at the Pan Finance Awards 2026. The recognition reflects the work behind the product and the commitment to simplifying professional booking management.',
      links: [
        {
          label: 'Read the official Synclin article',
          href: 'https://synclin.com/blog/pan-finance-awards-2026',
        },
      ],
    },
    {
      id: 'fintech-awards-2025',
      kind: 'Award',
      title: 'Most Influential FinTech Entrepreneur 2025 (Italy)',
      organisation: 'Wealth & Finance International',
      date: 'September 2025',
      dateTime: '2025-09',
      summary:
        'The FinTech Awards 2025 recognition reflects his work across blockchain, digital payments and Web3 innovation.',
      image: {
        src: '/images/insights/fintech-award.jpg',
        alt: 'Two participants in front of the World Blockchain Summit backdrop at a CNBC event.',
      },
      links: [
        { label: 'Official winners page', href: 'https://wealthandfinance.digital/winners/vincenzo-rauccio/' },
        { label: 'FinTech Awards 2025', href: 'https://wealthandfinance.digital/issues/fintech-awards-2025/' },
      ],
      articleSlug:
        'vincenzo-rauccio-named-most-influential-fintech-entrepreneur-2025-italy-by-wealth-finance-international',
    },
  ],
}

export function localizedRecognition(locale: Locale): LocalizedRecognition[] {
  return recognitionContent[locale]
}
