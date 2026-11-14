import type { Locale } from '../../i18n/core'
import type { ArticleBlock } from './types'

const WORDS_PER_MINUTE = 200

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/** Tempo di lettura calcolato sul corpo pubblicato. */
export function readingMinutes(blocks: ArticleBlock[]): number {
  const words = blocks.reduce((total, block) => {
    if (block.type === 'heading') return total
    if (block.type === 'links') {
      return total + block.items.reduce((sum, item) => sum + wordCount(item.label), 0)
    }
    if (block.type === 'list') {
      return (
        total +
        block.items.reduce(
          (sum, item) => sum + wordCount(typeof item === 'string' ? item : `${item.title} ${item.text}`),
          0,
        )
      )
    }
    return total + wordCount(block.text)
  }, 0)

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

/** Data deterministica e localizzata, ad esempio "22 aprile 2026" o "22 April 2026". */
export function formatDate(isoDate: string, locale: Locale = 'it'): string {
  return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`))
}

/** Slug di categoria sicuro per l’URL, ad esempio "Pagamenti digitali" -> "pagamenti-digitali". */
export function categorySlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
