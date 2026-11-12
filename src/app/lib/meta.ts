import { useEffect } from 'react'

import { site } from '../../data/site'

/**
 * Metadati per la single-page application: titolo, descrizione, Open Graph,
 * canonical e JSON-LD vengono aggiornati al mount e ripristinati ai valori
 * della homepage allo unmount.
 */

const DEFAULTS = {
  title: 'Vincenzo Rauccio | Consulente Blockchain, FinTech e innovazione',
  description:
    'Vincenzo Rauccio è Consulente Blockchain e speaker. Si occupa di pagamenti digitali, Web3 e innovazione finanziaria.',
}

export interface PageMeta {
  title: string
  description: string
  /** Percorso corrente, usato per og:url. */
  path: string
  /** Canonical quando differisce dal percorso corrente (contenuto duplicato). */
  canonical?: string
  type?: 'website' | 'article'
  image?: string
  publishedAt?: string
  jsonLd?: Record<string, unknown>
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function usePageMeta({
  title,
  description,
  path,
  canonical,
  type = 'website',
  image,
  publishedAt,
  jsonLd,
}: PageMeta) {
  const structuredData = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', `${site.url}${path}`)
    setMeta('property', 'og:locale', 'it_IT')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    if (image) setMeta('property', 'og:image', image)
    if (publishedAt) setMeta('property', 'article:published_time', publishedAt)
    setCanonical(`${site.url}${canonical ?? path}`)

    let script = document.getElementById('page-structured-data') as HTMLScriptElement | null
    if (structuredData) {
      if (!script) {
        script = document.createElement('script')
        script.id = 'page-structured-data'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = structuredData
    } else if (script) {
      script.remove()
    }

    return () => {
      document.title = DEFAULTS.title
      setMeta('name', 'description', DEFAULTS.description)
      setMeta('property', 'og:title', DEFAULTS.title)
      setMeta('property', 'og:description', DEFAULTS.description)
      setMeta('property', 'og:type', 'website')
      setMeta('property', 'og:url', `${site.url}/`)
      setMeta('name', 'twitter:title', DEFAULTS.title)
      setMeta('name', 'twitter:description', DEFAULTS.description)
      setMeta('name', 'twitter:card', 'summary')
      document.head.querySelector('meta[property="og:image"]')?.remove()
      document.head.querySelector('meta[property="article:published_time"]')?.remove()
      setCanonical(`${site.url}/`)
      document.getElementById('page-structured-data')?.remove()
    }
  }, [title, description, path, canonical, type, image, publishedAt, structuredData])
}
