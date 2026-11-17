import type { Article, ArticleBlock } from '../data/articles'
import { getArticles } from '../data/articles'
import {
  localizedCareer,
  localizedExpertise,
  localizedProjects,
  localizedRecognition,
  localizedSite,
} from '../i18n/content'
import { localizedPages } from '../i18n/pages'

export type KnowledgeLocale = 'it' | 'en'

export interface KnowledgeChunk {
  id: string
  locale: KnowledgeLocale
  title: string
  section?: string
  path: string
  text: string
}

type LegalPart = string | { text: string; to?: string; href?: string }
type LegalSections = ReadonlyArray<{
  heading: string
  paragraphs: ReadonlyArray<ReadonlyArray<LegalPart>>
}>

const locales: KnowledgeLocale[] = ['it', 'en']
const chunks: KnowledgeChunk[] = []

function clean(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function add(
  locale: KnowledgeLocale,
  key: string,
  title: string,
  path: string,
  text: string,
  section?: string,
): void {
  const body = clean(text)
  if (!body) return

  chunks.push({
    id: `${locale}:${key}`,
    locale,
    title: clean(title),
    section: section ? clean(section) : undefined,
    path,
    text: body,
  })
}

function lines(values: Array<string | undefined>): string {
  return values.filter((value): value is string => Boolean(value && value.trim())).join('\n')
}

function legalText(sections: LegalSections): string {
  return sections
    .map((section) => {
      const body = section.paragraphs
        .map((paragraph) =>
          paragraph.map((part) => (typeof part === 'string' ? part : part.text)).join(''),
        )
        .join(' ')
      return clean(`${section.heading ? `${section.heading}: ` : ''}${body}`)
    })
    .filter(Boolean)
    .join('\n')
}

function blockText(block: ArticleBlock): string {
  switch (block.type) {
    case 'paragraph':
      return block.text
    case 'heading':
      return ''
    case 'quote':
      return block.attribution ? `“${block.text}” — ${block.attribution}` : `“${block.text}”`
    case 'list':
      return block.items
        .map((item, index) => {
          const prefix = block.ordered ? `${index + 1}.` : '•'
          return typeof item === 'string'
            ? `${prefix} ${item}`
            : `${prefix} ${item.title}: ${item.text}`
        })
        .join('\n')
    case 'links':
      return block.items.map((item) => `${item.label}: ${item.href}`).join('\n')
    default:
      return ''
  }
}

function addArticle(locale: KnowledgeLocale, article: Article): void {
  const overview = locale === 'it' ? 'Panoramica' : 'Overview'
  const metadata = lines([
    article.title,
    article.excerpt,
    `${article.displayDate} · ${article.categories.join(', ')}`,
    article.tags?.length ? `Tag: ${article.tags.join(', ')}` : undefined,
  ])

  let section = overview
  let buffer = metadata
  let index = 0

  const flush = () => {
    if (!buffer.trim()) return
    add(
      locale,
      `article:${article.slug}:${index}`,
      article.title,
      `/${article.slug}`,
      buffer,
      section,
    )
    index += 1
    buffer = ''
  }

  for (const block of article.body) {
    if (block.type === 'heading') {
      flush()
      section = block.text
      continue
    }

    const text = blockText(block)
    if (!text) continue

    if (buffer && buffer.length + text.length > 1_400) flush()
    buffer += `${buffer ? '\n\n' : ''}${text}`
  }

  flush()
}

function buildLocale(locale: KnowledgeLocale): void {
  const site = localizedSite(locale)
  const page = localizedPages(locale)
  const career = localizedCareer(locale)
  const projects = localizedProjects(locale)
  const recognition = localizedRecognition(locale)
  const expertise = localizedExpertise(locale)
  const articles = getArticles(locale)
  const isItalian = locale === 'it'

  add(
    locale,
    'home:profile',
    isItalian ? 'Home — profilo' : 'Home — profile',
    '/',
    lines([
      `${site.name} — ${site.role}. ${site.descriptor}`,
      page.home.hero.lead,
      page.home.intro.lead,
      page.home.intro.body,
      `Focus: ${site.disciplines.join(', ')}.`,
      page.home.intro.facts.map((fact) => `${fact.label}: ${fact.value}`).join(' · '),
    ]),
    page.home.hero.eyebrow,
  )

  add(
    locale,
    'home:expertise',
    isItalian ? 'Home — aree di competenza' : 'Home — areas of expertise',
    '/',
    expertise.map((entry) => `${entry.title}: ${entry.description ?? ''}`).join('\n'),
    page.home.expertise.eyebrow,
  )

  add(
    locale,
    'home:experience',
    isItalian ? 'Home — esperienza' : 'Home — experience',
    '/',
    [
      page.home.experience.description,
      ...career.professionalExperience.map(
        (role) => `${role.role} presso ${role.organisation} (${role.period}): ${role.summary}`,
      ),
    ].join('\n'),
    page.home.experience.eyebrow,
  )

  add(
    locale,
    'contact',
    isItalian ? 'Contatti' : 'Contact',
    '/contact',
    lines([
      page.contact.lead,
      page.contact.body,
      `Email: ${site.email}`,
      `Profili: ${site.socials.map((social) => `${social.label} (${social.href})`).join(', ')}`,
      isItalian
        ? 'Il canale più diretto è la email; non esiste un modulo di contatto.'
        : 'Email is the most direct channel; there is no contact form.',
    ]),
    page.contact.eyebrow,
  )

  add(
    locale,
    'about:profile',
    isItalian ? 'Chi sono — profilo' : 'About — profile',
    '/about',
    lines([
      page.about.lead,
      ...page.about.work.paragraphs,
      `${page.about.facts.today}: ${page.about.todayValue}`,
      `${page.about.facts.leadership}: ${page.about.leadershipValue}`,
      `${page.about.facts.focus}: ${page.about.focusValue}`,
    ]),
    page.about.eyebrow,
  )

  add(
    locale,
    'about:method',
    isItalian ? 'Chi sono — metodo di lavoro' : 'About — way of working',
    '/about',
    page.about.method.entries.map((entry) => `${entry.title}: ${entry.text}`).join('\n'),
    page.about.method.eyebrow,
  )

  add(
    locale,
    'about:skills',
    isItalian ? 'Competenze' : 'Skills',
    '/about',
    lines([
      `${page.about.skills.technicalTitle}: ${page.about.skills.technicalText}`,
      `${page.about.skills.professionalLabel}: ${career.skillGroups
        .find((group) => group.title === page.about.skills.professionalLabel)
        ?.items.join(', ')}`,
      career.skillGroups.map((group) => `${group.title}: ${group.items.join(', ')}`).join('\n'),
    ]),
    page.about.skills.eyebrow,
  )

  add(
    locale,
    'experience:journey',
    page.experience.eyebrow,
    '/experience',
    lines([
      page.experience.lead,
      ...career.professionalExperience.map(
        (role) => `${role.role} presso ${role.organisation} (${role.period}): ${role.summary}`,
      ),
      page.experience.education.description,
      ...career.education.map(
        (entry) => `${entry.title}, ${entry.organisation} (${entry.period})`,
      ),
    ]),
    isItalian ? 'Percorso professionale' : 'Professional background',
  )

  for (const role of career.professionalExperience) {
    add(
      locale,
      `experience:${role.id}`,
      `${role.organisation} — ${role.role}`,
      '/experience',
      lines([
        `${role.role} presso ${role.organisation}`,
        `Periodo: ${role.period}`,
        `Sede: ${role.location}`,
        role.summary,
        `Responsabilità: ${role.responsibilities.join(' ')}`,
        role.projects?.length
          ? `Progetti: ${role.projects.map((project) => `${project.name} — ${project.description}`).join(' ')}`
          : undefined,
      ]),
      role.organisation,
    )
  }

  add(
    locale,
    'experience:education',
    isItalian ? 'Formazione' : 'Education',
    '/experience',
    career.education
      .map(
        (entry) =>
          `${entry.title}, ${entry.organisation} (${entry.period}${entry.status ? `, ${entry.status}` : ''})`,
      )
      .join('\n'),
    page.experience.education.eyebrow,
  )

  add(
    locale,
    'experience:certifications',
    isItalian ? 'Certificazioni' : 'Certifications',
    '/experience',
    career.certifications.map((certification) => certification.name).join('\n'),
    page.experience.certifications.eyebrow,
  )

  add(
    locale,
    'experience:skills',
    isItalian ? 'Competenze tecniche e professionali' : 'Technical and professional skills',
    '/experience',
    career.skillGroups.map((group) => `${group.title}: ${group.items.join(', ')}`).join('\n'),
    page.experience.skills.eyebrow,
  )

  add(
    locale,
    'experience:languages',
    isItalian ? 'Lingue' : 'Languages',
    '/experience',
    career.languages.map((entry) => `${entry.language}: ${entry.level}`).join('\n'),
    page.experience.languages.eyebrow,
  )

  for (const project of projects) {
    add(
      locale,
      `project:${project.slug}`,
      project.name,
      '/projects',
      lines([
        `${project.name} — ${project.category} (${project.year})`,
        project.summary,
        project.description,
        project.facts.map((fact) => `${fact.label}: ${fact.value}`).join(' · '),
        `Sito pubblico: ${project.href}`,
        project.articleSlug ? `Articolo interno: /${project.articleSlug}` : undefined,
      ]),
      project.name,
    )
  }

  add(
    locale,
    'recognition:intro',
    isItalian ? 'Riconoscimenti' : 'Awards & Recognition',
    '/recognition',
    lines([
      page.recognition.lead,
      page.recognition.speaking.lead,
      page.recognition.speaking.body,
      page.recognition.publications.lead,
    ]),
    page.recognition.eyebrow,
  )

  for (const entry of recognition) {
    add(
      locale,
      `recognition:${entry.id}`,
      entry.title,
      '/recognition',
      lines([
        `${entry.title} — ${entry.organisation} (${entry.date})`,
        entry.awardTitle ? `Premio: ${entry.awardTitle}` : undefined,
        entry.recipient
          ? `Assegnato a: ${entry.recipient}${entry.recipientRole ? ` — ${entry.recipientRole}` : ''}`
          : undefined,
        entry.summary,
        entry.links.map((link) => `${link.label}: ${link.href}`).join('\n'),
      ]),
      entry.title,
    )
  }

  add(
    locale,
    'insights:index',
    isItalian ? 'Blog — elenco articoli' : 'Blog — article index',
    '/insights',
    lines([
      page.insights.lead,
      ...articles.map(
        (article) =>
          `${article.title} (${article.displayDate}) — ${article.excerpt} — /${article.slug}`,
      ),
    ]),
    page.insights.eyebrow,
  )

  for (const article of articles) {
    addArticle(locale, article)
  }

  add(
    locale,
    'privacy',
    isItalian ? 'Informativa privacy' : 'Privacy notice',
    '/privacy',
    legalText(page.privacy.sections as LegalSections),
    page.privacy.title,
  )

  add(
    locale,
    'cookies',
    isItalian ? 'Cookie policy' : 'Cookie policy',
    '/cookie-policy',
    legalText(page.cookies.sections as LegalSections),
    page.cookies.title,
  )
}

for (const locale of locales) {
  buildLocale(locale)
}

export const knowledgeChunks: ReadonlyArray<KnowledgeChunk> = chunks
