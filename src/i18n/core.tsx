import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import {
  Link as RouterLink,
  Navigate as RouterNavigate,
  NavLink as RouterNavLink,
  useLocation,
  useParams,
  type LinkProps,
  type NavigateProps,
  type NavLinkProps,
} from 'react-router'

export const locales = ['it', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'it'

export const LOCALE_COOKIE = 'vr-locale'
export const LOCALE_STORAGE_KEY = 'vr-locale'
const LOCALE_MAX_AGE = 60 * 60 * 24 * 365

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'it' || value === 'en'
}

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${LOCALE_COOKIE}=`))

  if (!match) return null
  const value = decodeURIComponent(match.slice(LOCALE_COOKIE.length + 1))
  return isLocale(value) ? value : null
}

function readStoredLocale(): Locale | null {
  const fromCookie = readCookieLocale()
  if (fromCookie) return fromCookie

  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(value) ? value : null
  } catch {
    return null
  }
}

/** Persist a deliberate language choice. It takes priority over detection. */
export function persistLocale(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.cookie = `${LOCALE_COOKIE}=${locale}; Max-Age=${LOCALE_MAX_AGE}; Path=/; SameSite=Lax${
      window.location.protocol === 'https:' ? '; Secure' : ''
    }`
  }

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Cookie remains the primary persistence mechanism.
  }
}

async function detectCountry(): Promise<string | null> {
  try {
    const response = await fetch('/api/geo', {
      headers: { accept: 'application/json' },
      credentials: 'same-origin',
      cache: 'no-store',
    })

    if (!response.ok) return null
    const data = (await response.json()) as { country?: string | null }
    return typeof data.country === 'string' ? data.country.toUpperCase() : null
  } catch {
    return null
  }
}

function browserLocale(): Locale | null {
  if (typeof navigator === 'undefined') return null

  const languages = navigator.languages?.length
    ? navigator.languages
    : navigator.language
      ? [navigator.language]
      : []

  if (languages.length === 0) return null
  return languages.some((language) => language.toLowerCase().startsWith('it')) ? 'it' : 'en'
}

/**
 * Saved choice first, then country, then browser language, then Italian.
 * Country detection runs once per first visit and never requests GPS data.
 */
export async function detectLocale(): Promise<Locale> {
  const stored = readStoredLocale()
  if (stored) return stored

  const country = await detectCountry()
  if (country) return country === 'IT' ? 'it' : 'en'

  return browserLocale() ?? defaultLocale
}

export function localizePath(to: string, locale: Locale): string {
  if (!to.startsWith('/')) return to
  if (to === `/${locale}` || to.startsWith(`/${locale}/`)) return to
  if (to === '/it' || to === '/en' || to.startsWith('/it/') || to.startsWith('/en/')) return to

  const [pathAndQuery, hash] = to.split('#')
  const [path, query] = pathAndQuery.split('?')
  const suffix = path === '/' || path === '' ? '/' : path
  const localized = `/${locale}${suffix}`
  return `${localized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`
}

function stripLocale(pathname: string): string {
  if (pathname === '/it' || pathname === '/en') return '/'
  if (pathname.startsWith('/it/') || pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

interface LocaleContextValue {
  locale: Locale
  path: string
  switchTo: (locale: Locale) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used inside LocaleProvider')
  return value
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = 'ltr'
  }, [locale])

  const value = useMemo<LocaleContextValue>(() => {
    const path = stripLocale(pathname)

    return {
      locale,
      path,
      switchTo: (next) => `${localizePath(path, next)}${search}${hash}`,
    }
  }, [locale, pathname, search, hash])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

interface LocaleShellProps {
  children: ReactNode
}

/** Validates the URL locale before the localized shell renders. */
export function LocaleRoute({ children }: LocaleShellProps) {
  const { locale } = useParams<{ locale: string }>()

  if (!isLocale(locale)) return <RouterNavigate to="/" replace />

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>
}

export function LocaleLink({ to, ...props }: LinkProps) {
  const { locale } = useLocale()
  return <RouterLink to={localizePath(String(to), locale)} {...props} />
}

export function LocaleNavLink({ to, end, ...props }: NavLinkProps) {
  const { locale } = useLocale()
  const localized = localizePath(String(to), locale)
  return (
    <RouterNavLink
      to={localized}
      end={end ?? localized === `/${locale}/`}
      {...props}
    />
  )
}

export function LocaleNavigate({ to, ...props }: NavigateProps) {
  const { locale } = useLocale()
  return <RouterNavigate to={localizePath(String(to), locale)} {...props} />
}
