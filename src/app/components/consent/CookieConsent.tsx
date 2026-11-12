import { X } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Link } from 'react-router'

import { Button } from '../ui/Button'
import { Container } from '../layout/Container'

/**
 * Consenso ai cookie.
 *
 * Il sito non installa cookie propri e non carica strumenti analitici o di
 * marketing. L’unica tecnologia usata è localStorage, per ricordare la scelta
 * dell’utente. Il consenso viene comunque raccolto e versionato, così le
 * categorie opzionali restano spente finché non c’è un’autorizzazione
 * esplicita e le preferenze possono essere revocate dal footer.
 */

const STORAGE_KEY = 'vr-cookie-consent'
const CONSENT_VERSION = 1
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180

export type OptionalCategory = 'analytics' | 'marketing'

export interface Preferences {
  analytics: boolean
  marketing: boolean
}

interface StoredConsent extends Preferences {
  version: number
  timestamp: number
}

interface ConsentContextValue {
  consent: StoredConsent | null
  preferencesOpen: boolean
  hasConsent: (category: OptionalCategory) => boolean
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (preferences: Preferences) => void
  openPreferences: () => void
  closePreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext)
  if (!value) throw new Error('useConsent deve essere usato dentro ConsentProvider')
  return value
}

function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    const valid =
      parsed.version === CONSENT_VERSION &&
      typeof parsed.timestamp === 'number' &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean' &&
      parsed.timestamp <= Date.now() &&
      Date.now() - parsed.timestamp < MAX_AGE_MS

    return valid ? (parsed as StoredConsent) : null
  } catch {
    return null
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(() => readConsent())
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  const persist = useCallback((preferences: Preferences) => {
    const record: StoredConsent = {
      ...preferences,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
    } catch {
      // Se lo spazio è bloccato, la scelta vale per la sessione corrente.
    }

    setConsent(record)
    setPreferencesOpen(false)
  }, [])

  const acceptAll = useCallback(
    () => persist({ analytics: true, marketing: true }),
    [persist],
  )

  const rejectAll = useCallback(
    () => persist({ analytics: false, marketing: false }),
    [persist],
  )

  const openPreferences = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const hasConsent = useCallback(
    (category: OptionalCategory) => {
      if (category === 'analytics') return consent?.analytics === true
      return consent?.marketing === true
    },
    [consent],
  )

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      preferencesOpen,
      hasConsent,
      acceptAll,
      rejectAll,
      savePreferences: persist,
      openPreferences,
      closePreferences,
    }),
    [
      consent,
      preferencesOpen,
      hasConsent,
      acceptAll,
      rejectAll,
      persist,
      openPreferences,
      closePreferences,
    ],
  )

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <CookieBanner />
      <CookiePreferences />
    </ConsentContext.Provider>
  )
}

function CookieBanner() {
  const { consent, preferencesOpen, acceptAll, rejectAll, openPreferences } = useConsent()

  if (consent || preferencesOpen) return null

  return (
    <div
      role="region"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-line-strong bg-canvas/95 text-ink backdrop-blur-md"
    >
      <Container width="wide" className="py-5">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-7">
            <p className="eyebrow text-ink-faint" id="cookie-banner-title">
              Cookie e preferenze
            </p>
            <p className="mt-2 max-w-[62ch] text-small text-ink-muted">
              Questo sito non usa cookie di profilazione. Salva solo la tua scelta in memoria locale;
              le categorie opzionali restano spente finché non saranno attivati gli strumenti che le
              richiedono.
            </p>
            <p className="mt-2 text-caption text-ink-faint">
              Leggi la{' '}
              <Link to="/cookie-policy" className="link-quiet">
                cookie policy
              </Link>{' '}
              e l’<Link to="/privacy" className="link-quiet">informativa privacy</Link>.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button onClick={acceptAll} size="sm" className="justify-center">
              Accetta tutti
            </Button>
            <Button onClick={rejectAll} size="sm" variant="secondary" className="justify-center">
              Rifiuta tutti
            </Button>
            <Button onClick={openPreferences} size="sm" variant="secondary" className="justify-center">
              Personalizza
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

const CATEGORY_COPY = {
  necessary: {
    title: 'Preferenze necessarie',
    description:
      'Servono a ricordare la tua scelta. Non richiedono consenso e non possono essere disattivate.',
  },
  analytics: {
    title: 'Cookie analitici',
    description:
      'Aiuterebbero a capire come viene usato il sito. Al momento non è installato alcuno strumento analitico: la preferenza viene registrata per il futuro.',
  },
  marketing: {
    title: 'Cookie di marketing',
    description:
      'Servirebbero a mostrare contenuti o annunci in base ai tuoi interessi. Al momento non è attivo alcuno strumento di marketing.',
  },
} as const

function CookiePreferences() {
  const {
    consent,
    preferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useConsent()

  const [draft, setDraft] = useState<Preferences>({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  })

  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!preferencesOpen) return

    setDraft({
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
    })

    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePreferences()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus()
    }
  }, [preferencesOpen, closePreferences, consent])

  if (!preferencesOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-navy/60 p-0 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePreferences()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-line-strong bg-canvas p-6 text-ink sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-ink-faint">Privacy</p>
            <h2 id="cookie-preferences-title" className="mt-2 font-display text-title">
              Preferenze cookie
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Chiudi le preferenze cookie"
            onClick={closePreferences}
            className="grid size-9 shrink-0 place-items-center border border-line-strong transition-colors hover:border-ink"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <p className="text-measure mt-5 text-small text-ink-muted">
          Scegli quali categorie autorizzare. Le preferenze necessarie restano sempre attive. Puoi
          cambiare idea in qualsiasi momento dal link nel footer.
        </p>

        <div className="mt-7 divide-y divide-line border-y border-line">
          <div className="flex items-start justify-between gap-6 py-5">
            <div>
              <p className="text-small font-medium">{CATEGORY_COPY.necessary.title}</p>
              <p className="mt-1 max-w-[52ch] text-caption text-ink-muted">
                {CATEGORY_COPY.necessary.description}
              </p>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              aria-label={`${CATEGORY_COPY.necessary.title}, sempre attivi`}
              className="mt-1 size-4 shrink-0 accent-[var(--surface-accent)]"
            />
          </div>

          <label className="flex cursor-pointer items-start justify-between gap-6 py-5">
            <span>
              <span className="block text-small font-medium">{CATEGORY_COPY.analytics.title}</span>
              <span className="mt-1 block max-w-[52ch] text-caption text-ink-muted">
                {CATEGORY_COPY.analytics.description}
              </span>
            </span>
            <input
              type="checkbox"
              checked={draft.analytics}
              onChange={(event) =>
                setDraft((current) => ({ ...current, analytics: event.target.checked }))
              }
              className="mt-1 size-4 shrink-0 accent-[var(--surface-accent)]"
            />
          </label>

          <label className="flex cursor-pointer items-start justify-between gap-6 py-5">
            <span>
              <span className="block text-small font-medium">{CATEGORY_COPY.marketing.title}</span>
              <span className="mt-1 block max-w-[52ch] text-caption text-ink-muted">
                {CATEGORY_COPY.marketing.description}
              </span>
            </span>
            <input
              type="checkbox"
              checked={draft.marketing}
              onChange={(event) =>
                setDraft((current) => ({ ...current, marketing: event.target.checked }))
              }
              className="mt-1 size-4 shrink-0 accent-[var(--surface-accent)]"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button variant="secondary" size="sm" onClick={rejectAll} className="justify-center">
            Rifiuta tutti
          </Button>
          <Button variant="secondary" size="sm" onClick={acceptAll} className="justify-center">
            Accetta tutti
          </Button>
          <Button size="sm" onClick={() => savePreferences(draft)} className="justify-center">
            Salva preferenze
          </Button>
        </div>

        <p className="mt-5 text-caption text-ink-faint">
          <Link to="/cookie-policy" className="link-quiet">
            Cookie policy
          </Link>
          <span aria-hidden="true"> · </span>
          <Link to="/privacy" className="link-quiet">
            Informativa privacy
          </Link>
        </p>
      </div>
    </div>
  )
}
