import { knowledgeChunks, type KnowledgeChunk, type KnowledgeLocale } from './knowledge'

/**
 * Retrieval lessicale (BM25 semplificato) sui contenuti pubblici del sito.
 *
 * Non servono embedding o un database vettoriale: il corpus è piccolo, vive
 * nello stesso bundle del Worker e può essere aggiornato insieme ai contenuti.
 * L'espansione bilingue aiuta le domande formulate nell'altra lingua.
 */

const stopwords = new Set([
  'a', 'ad', 'al', 'alla', 'alle', 'allo', 'anche', 'che', 'chi', 'ci', 'come', 'con', 'cosa',
  'da', 'dal', 'dalla', 'delle', 'dello', 'dei', 'degli', 'di', 'dove', 'e', 'è', 'ed', 'gli',
  'ha', 'hai', 'hanno', 'ho', 'i', 'il', 'in', 'io', 'la', 'le', 'lei', 'lo', 'lui', 'ma', 'mi',
  'mia', 'mie', 'miei', 'mio', 'ne', 'nel', 'nella', 'nelle', 'nello', 'non', 'o', 'per', 'più',
  'posso', 'può', 'puoi', 'qual', 'quale', 'quali', 'quello', 'questa', 'queste', 'questi',
  'questo', 'sa', 'se', 'sei', 'si', 'sono', 'su', 'sua', 'sue', 'sui', 'sul', 'sulla', 'suo',
  'suoi', 'tra', 'tu', 'un', 'una', 'uno', 'vi', 'voi', 'vorrei',
  'about', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'can', 'could', 'did', 'do', 'does',
  'for', 'from', 'had', 'has', 'have', 'he', 'her', 'his', 'how', 'i', 'in', 'is', 'it', 'its',
  'me', 'my', 'of', 'on', 'or', 'our', 'please', 'she', 'tell', 'that', 'the', 'their', 'them',
  'there', 'these', 'they', 'this', 'to', 'was', 'we', 'were', 'what', 'when', 'where', 'which',
  'who', 'why', 'will', 'with', 'would', 'you', 'your',
])

const expansions: Record<string, string[]> = {
  contatto: ['contact', 'email', 'mail'],
  contatti: ['contact', 'email', 'mail'],
  contattare: ['contact', 'email'],
  contattarlo: ['contact', 'email'],
  contact: ['contatto', 'email', 'mail'],
  email: ['contatto', 'mail'],
  mail: ['email', 'contatto'],
  esperienza: ['experience', 'career', 'role', 'work'],
  esperienze: ['experience', 'career', 'role', 'work'],
  experience: ['esperienza', 'career', 'role', 'work'],
  career: ['carriera', 'experience'],
  curriculum: ['cv', 'experience', 'education'],
  cv: ['curriculum', 'experience'],
  formazione: ['education', 'university', 'degree', 'study'],
  education: ['formazione', 'university', 'degree'],
  università: ['university', 'education', 'degree'],
  university: ['università', 'education', 'degree'],
  laurea: ['degree', 'education'],
  degree: ['laurea', 'education'],
  competenza: ['skill', 'expertise', 'technical'],
  competenze: ['skill', 'expertise', 'technical'],
  skill: ['competenza', 'expertise'],
  skills: ['competenze', 'expertise'],
  technical: ['tecniche', 'competenze'],
  progetti: ['project', 'synclin'],
  progetto: ['project', 'synclin'],
  project: ['progetto', 'synclin'],
  projects: ['progetti', 'synclin'],
  premi: ['award', 'recognition', 'premio'],
  premio: ['award', 'recognition', 'premi'],
  riconoscimenti: ['award', 'recognition', 'premi'],
  riconoscimento: ['award', 'recognition', 'premio'],
  award: ['premio', 'recognition', 'premi'],
  awards: ['premi', 'recognition'],
  recognition: ['riconoscimenti', 'award', 'premi'],
  articoli: ['article', 'blog', 'insights'],
  articolo: ['article', 'blog', 'insights'],
  article: ['articolo', 'blog', 'insights'],
  articles: ['articoli', 'blog', 'insights'],
  blog: ['articoli', 'insights', 'article'],
  blockchain: ['web3', 'digital', 'assets'],
  web3: ['blockchain', 'digital', 'assets'],
  pagamenti: ['payments', 'digital'],
  payments: ['pagamenti', 'digital'],
  sicurezza: ['cybersecurity', 'security'],
  cybersecurity: ['sicurezza', 'security'],
  pwc: ['consultant', 'consulting', 'financial', 'services'],
  synclin: ['project', 'prodotto', 'product', 'saas'],
  profilo: ['profile', 'background', 'about', 'career'],
  profile: ['profilo', 'background', 'about', 'career'],
  percorso: ['career', 'experience', 'background', 'profile', 'storia'],
  professionale: ['professional', 'career', 'experience', 'work'],
  professional: ['professionale', 'career', 'experience'],
  carriera: ['career', 'percorso', 'experience'],
  touch: ['contact', 'email', 'contatto'],
  get: ['contact', 'email', 'contatto'],
  chi: ['vincenzo', 'profilo'],
  cosa: ['vincenzo', 'profilo'],
}

const documents = knowledgeChunks.map((chunk) => {
  const titleTokens = new Set(tokens(`${chunk.title} ${chunk.section ?? ''}`))
  const bodyTokens = tokens(chunk.text)
  return {
    chunk,
    titleTokens,
    bodyTokens,
    length: bodyTokens.length,
    normalizedText: normalize(`${chunk.title} ${chunk.section ?? ''} ${chunk.text}`),
  }
})

const averageLength =
  documents.reduce((sum, document) => sum + document.length, 0) / Math.max(documents.length, 1)

const documentFrequencies = new Map<string, number>()
for (const document of documents) {
  const unique = new Set([...document.titleTokens, ...document.bodyTokens])
  for (const token of unique) {
    documentFrequencies.set(token, (documentFrequencies.get(token) ?? 0) + 1)
  }
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function tokens(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 1 && !stopwords.has(token))
}

function expandedTerms(query: string): string[] {
  const terms = new Set<string>()
  for (const token of tokens(query)) {
    terms.add(token)
    for (const expansion of expansions[token] ?? []) {
      terms.add(expansion)
    }
  }
  return [...terms]
}

function countOccurrences(values: string[], term: string): number {
  let count = 0
  for (const value of values) {
    if (value === term) count += 1
  }
  return count
}

function scoreDocument(
  document: (typeof documents)[number],
  query: string,
  terms: string[],
  locale: KnowledgeLocale,
): number {
  const k1 = 1.2
  const b = 0.75
  const normalizedQuery = normalize(query).trim()
  let score = 0

  for (const term of terms) {
    const titleFrequency = document.titleTokens.has(term) ? 3 : 0
    const frequency = countOccurrences(document.bodyTokens, term) + titleFrequency
    if (frequency === 0) continue

    const documentFrequency = documentFrequencies.get(term) ?? 0
    const idf = Math.log(1 + (documents.length - documentFrequency + 0.5) / (documentFrequency + 0.5))
    const lengthNormalisation = 1 - b + (b * document.length) / Math.max(averageLength, 1)
    score += idf * ((frequency * (k1 + 1)) / (frequency + k1 * lengthNormalisation))
  }

  if (normalizedQuery.length > 3 && document.normalizedText.includes(normalizedQuery)) {
    score += 1.5
  }

  if (document.chunk.locale === locale) score += 0.35
  return score
}

export interface RetrievalOptions {
  limit?: number
  maxCharacters?: number
}

export function retrieveChunks(
  query: string,
  locale: KnowledgeLocale,
  options: RetrievalOptions = {},
): KnowledgeChunk[] {
  const terms = expandedTerms(query)
  if (terms.length === 0) return []

  const limit = options.limit ?? 6
  const maxCharacters = options.maxCharacters ?? 9_000
  const seen = new Set<string>()
  const results: KnowledgeChunk[] = []
  let characters = 0

  const rank = (pool: typeof documents) =>
    pool
      .map((document) => ({
        chunk: document.chunk,
        score: scoreDocument(document, query, terms, locale),
      }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)

  // Keep the answer grounded in the active site language. Fall back to the
  // other locale only when the localized corpus has no lexical match. This
  // avoids sending duplicate IT/EN passages and keeps the context compact.
  let ranked = rank(documents.filter((document) => document.chunk.locale === locale))
  if (ranked.length === 0) ranked = rank(documents)

  for (const entry of ranked) {
    const key = `${entry.chunk.path}|${entry.chunk.section ?? entry.chunk.title}`
    if (seen.has(key)) continue

    if (results.length >= limit || characters + entry.chunk.text.length > maxCharacters) break

    seen.add(key)
    results.push(entry.chunk)
    characters += entry.chunk.text.length
  }

  return results
}
