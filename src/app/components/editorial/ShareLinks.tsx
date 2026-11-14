import { useEffect, useState } from 'react'

import { useLocale } from '../../../i18n/core'
import { localizedUi } from '../../../i18n/ui'

/** Sharing targets build from the canonical article URL. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const { locale } = useLocale()
  const copy = localizedUi(locale).share
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2400)
    return () => window.clearTimeout(id)
  }, [copied])

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        return
      }
    } catch {
      // Clipboard permission can be denied; fall back to a selection copy.
    }

    try {
      const field = document.createElement('textarea')
      field.value = url
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.top = '-1000px'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      const ok = document.execCommand('copy')
      field.remove()
      setCopied(ok)
    } catch {
      setCopied(false)
    }
  }

  const shareTargets = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    { label: 'X', href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}` },
    { label: 'Email', href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ]

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="eyebrow text-ink-faint">{copy.label}</span>
      {shareTargets.map((target) => (
        <a
          key={target.label}
          href={target.href}
          target={target.label === 'Email' ? undefined : '_blank'}
          rel={target.label === 'Email' ? undefined : 'noopener noreferrer'}
          className="link-quiet text-small"
        >
          {target.label}
        </a>
      ))}
      <button type="button" onClick={copyLink} className="link-quiet text-small">
        {copied ? copy.copied : copy.copy}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copy.copiedAnnouncement : ''}
      </span>
    </div>
  )
}
