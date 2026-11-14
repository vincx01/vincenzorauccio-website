import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { localizedNav, localizedSite } from '../../../i18n/content'
import { LocaleLink as Link, LocaleNavLink as NavLink, useLocale } from '../../../i18n/core'
import { localizedUi } from '../../../i18n/ui'
import { cx } from '../../lib/cx'
import { EASE_OUT } from '../../lib/motion'
import { Logo } from '../brand/Logo'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { LocaleSwitcher } from './LocaleSwitcher'

/**
 * Header sticky: logo ufficiale, navigazione con stato attivo, selettore
 * lingua, azione di contatto e pannello mobile a tutta altezza.
 *
 * Il pannello si chiude con Escape, con il pulsante, al cambio pagina e
 * quando il viewport passa al layout desktop. Il focus resta confinato nel
 * menu finché è aperto.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const { primary } = localizedNav(locale)
  const copy = localizedUi(locale).header

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

  // Al passaggio al layout desktop il menu mobile non deve restare aperto
  // con il body ancora bloccato.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (desktop.matches) setOpen(false)
    }

    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const panel = panelRef.current
      const focusable = [
        toggleRef.current,
        ...Array.from(
          panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
        ),
      ].filter((element): element is HTMLElement => element !== null)

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
    <>
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
              aria-label={copy.homeAria}
              onClick={() => setOpen(false)}
              className="min-w-0 lg:col-start-1 lg:justify-self-start"
            >
              <Logo priority />
            </Link>

            <nav
              aria-label={copy.navAria}
              className="hidden items-center gap-4 lg:flex lg:justify-self-center xl:gap-6"
            >
              {primary.map((item) => (
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

            <div className="flex items-center gap-3 lg:col-start-3 lg:justify-self-end">
              <LocaleSwitcher className="hidden lg:flex" />
              <div className="hidden lg:flex">
                <Button href={`mailto:${site.email}`} size="sm" arrow>
                  {copy.cta}
                </Button>
              </div>

              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? copy.closeMenu : copy.openMenu}
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
      </header>

      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-navigation"
          role="dialog"
          aria-label={copy.menuDialog}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-[45] overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <Container className="flex min-h-full flex-col justify-between gap-10 py-8">
            <nav aria-label={copy.mobileNavAria} className="flex flex-col">
              {primary.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
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
              <LocaleSwitcher className="self-start" />
              <Button href={`mailto:${site.email}`} arrow className="w-full">
                {copy.cta}
              </Button>
              <p className="text-caption text-ink-faint">{site.email}</p>
            </div>
          </Container>
        </motion.div>
      )}
    </>
  )
}
