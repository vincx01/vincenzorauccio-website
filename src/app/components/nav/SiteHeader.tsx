import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { primaryNav, site } from '../../../data/site'
import { cx } from '../../lib/cx'
import { EASE_OUT } from '../../lib/motion'
import { Logo } from '../brand/Logo'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'

/**
 * Header sticky: logo ufficiale, navigazione con stato attivo, azione di
 * contatto e pannello mobile a tutta altezza. Il pannello si chiude con
 * Escape, riporta il focus al pulsante e ripristina lo scroll della pagina.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Densifica l’header dopo i primi pixel, senza animare l’altezza.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    const panel = panelRef.current

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    panel?.querySelector<HTMLAnchorElement>('a')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  // Il pannello smonta mentre contiene il focus: lo riportiamo al pulsante.
  useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus()
    wasOpen.current = open
  }, [open])

  return (
    <header
      className={cx(
        'sticky top-0 z-50 border-b text-ink transition-colors duration-300',
        scrolled ? 'border-line-strong bg-canvas/85 backdrop-blur-md' : 'border-line bg-canvas',
      )}
    >
      <Container width="wide">
        <div className="flex h-[var(--header-height)] items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4 xl:gap-6">
          <Link
            to="/"
            aria-label="Vincenzo Rauccio, torna alla home"
            className="min-w-0 lg:col-start-1 lg:justify-self-start"
          >
            <Logo priority />
          </Link>

          <nav
            aria-label="Navigazione principale"
            className="hidden items-center gap-4 lg:flex lg:justify-self-center xl:gap-6"
          >
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => cx('link-quiet text-nav', isActive && 'text-ink')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center lg:col-start-3 lg:justify-self-end">
            <div className="hidden lg:flex">
              <Button href={`mailto:${site.email}`} size="sm" arrow>
                Scrivimi
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
              onClick={() => setOpen((value) => !value)}
              className="grid size-10 place-items-center border border-line-strong text-ink transition-colors duration-300 hover:border-ink lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="size-4" />
              ) : (
                <Menu aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-navigation"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <Container className="flex min-h-full flex-col justify-between gap-10 py-8">
            <nav aria-label="Navigazione mobile" className="flex flex-col">
              {primaryNav.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cx(
                      'flex items-baseline justify-between border-b border-line py-4 text-title transition-colors duration-300',
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                    )
                  }
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="eyebrow text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-4">
              <Button href={`mailto:${site.email}`} arrow className="w-full">
                Scrivimi
              </Button>
              <p className="text-caption text-ink-faint">{site.email}</p>
            </div>
          </Container>
        </motion.div>
      )}
    </header>
  )
}
