import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useOutlet,
  useParams,
} from 'react-router'

import { getArticles } from '../data/articles'
import {
  defaultLocale,
  detectLocale,
  isLocale,
  LocaleProvider,
  type Locale,
} from '../i18n/core'
import { localizedUi } from '../i18n/ui'
import { AIAssistant } from './components/assistant/AIAssistant'
import { ConsentProvider } from './components/consent/CookieConsent'
import { PageTransition } from './components/motion/Reveal'
import { SiteFooter } from './components/nav/SiteFooter'
import { SiteHeader } from './components/nav/SiteHeader'
import { About } from './pages/About'
import { ArticlePage } from './pages/Article'
import { Contact } from './pages/Contact'
import { CookiePolicy } from './pages/CookiePolicy'
import { ExperiencePage } from './pages/Experience'
import { Foundation } from './pages/Foundation'
import { Home } from './pages/Home'
import { Insights } from './pages/Insights'
import { NotFound } from './pages/NotFound'
import { Privacy } from './pages/Privacy'
import { Projects } from './pages/Projects'
import { Recognition } from './pages/Recognition'

function RouteScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>{outlet}</PageTransition>
    </AnimatePresence>
  )
}

/** First visit: stored choice, country, browser language, then Italian. */
function LocaleEntry() {
  const navigate = useNavigate()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    detectLocale()
      .then((locale) => {
        if (!cancelled) navigate(`/${locale}/`, { replace: true })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [navigate])

  useEffect(() => {
    if (failed) navigate(`/${defaultLocale}/`, { replace: true })
  }, [failed, navigate])

  return (
    <p className="sr-only" role="status" aria-live="polite">
      Loading…
    </p>
  )
}

/**
 * Client-side fallback for legacy unprefixed Italian URLs. Production hosts
 * answer these with a 301 via vercel.json and the Cloudflare Worker.
 */
const legacyPages: Record<string, string> = {
  about: '/about',
  'chi-sono': '/about',
  experience: '/experience',
  esperienza: '/experience',
  projects: '/projects',
  progetti: '/projects',
  work: '/projects',
  contact: '/contact',
  contatti: '/contact',
  recognition: '/recognition',
  insights: '/insights',
  privacy: '/privacy',
  'cookie-policy': '/cookie-policy',
  cookie: '/cookie-policy',
  'design-system': '/design-system',
}

function LegacyEntry() {
  const { pathname } = useLocation()
  const clean = pathname.replace(/^\/+|\/+$/g, '')
  const knownArticle = getArticles('it').some((article) => article.slug === clean)
  const destination = legacyPages[clean] ?? (knownArticle ? `/${clean}` : '/')

  return <Navigate to={`/it${destination === '/' ? '/' : destination}`} replace />
}

function LocaleShell() {
  const { locale: rawLocale } = useParams<{ locale: string }>()

  if (!isLocale(rawLocale)) return <Navigate to="/" replace />

  return (
    <LocaleProvider locale={rawLocale}>
      <ConsentProvider>
        <LocalizedChrome locale={rawLocale} />
      </ConsentProvider>
    </LocaleProvider>
  )
}

function LocalizedChrome({ locale }: { locale: Locale }) {
  const copy = localizedUi(locale)

  useEffect(() => {
    document.documentElement.dataset.locale = locale
  }, [locale])

  return (
    <>
      <a href="#main-content" className="skip-link">
        {copy.skipToContent}
      </a>
      <RouteScroll />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <AnimatedRoutes />
      </main>
      <SiteFooter />
      <AIAssistant />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocaleEntry />} />
        <Route path="/:locale" element={<LocaleShell />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="recognition" element={<Recognition />} />
          <Route path="insights" element={<Insights />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="design-system" element={<Foundation />} />
          <Route path="work" element={<Navigate to="../projects" replace />} />
          <Route path="chi-sono" element={<Navigate to="../about" replace />} />
          <Route path="esperienza" element={<Navigate to="../experience" replace />} />
          <Route path="progetti" element={<Navigate to="../projects" replace />} />
          <Route path="contatti" element={<Navigate to="../contact" replace />} />
          <Route path="cookie" element={<Navigate to="../cookie-policy" replace />} />
          <Route path=":slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<LegacyEntry />} />
      </Routes>
    </BrowserRouter>
  )
}
