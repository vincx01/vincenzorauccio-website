import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="design-system" element={<Foundation />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="recognition" element={<Recognition />} />
          <Route path="insights" element={<Insights />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
          <Route path="work" element={<Navigate to="/projects" replace />} />
          {/* Alias italiani, utili se il link viene scritto a mano. */}
          <Route path="chi-sono" element={<Navigate to="/about" replace />} />
          <Route path="esperienza" element={<Navigate to="/experience" replace />} />
          <Route path="progetti" element={<Navigate to="/projects" replace />} />
          <Route path="contatti" element={<Navigate to="/contact" replace />} />
          <Route path="cookie" element={<Navigate to="/cookie-policy" replace />} />
          {/* Gli URL degli articoli restano alla radice, come in origine. */}
          <Route path=":slug" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ConsentProvider>
        <a href="#main-content" className="skip-link">
          Vai al contenuto
        </a>
        <RouteScroll />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <SiteFooter />
      </ConsentProvider>
    </BrowserRouter>
  )
}
