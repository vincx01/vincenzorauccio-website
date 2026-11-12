import { Link } from 'react-router'

import { footerNav, site } from '../../../data/site'
import { Logo } from '../brand/Logo'
import { useConsent } from '../consent/CookieConsent'
import { Container } from '../layout/Container'

/**
 * Footer in tre aree: brand, navigazione essenziale e contatti. La riga
 * legale resta separata e discreta. Nessuna colonna di competenze e nessun
 * elenco ridondante di profili.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()
  const { openPreferences } = useConsent()

  return (
    <footer data-surface="dark" className="bg-canvas text-ink">
      <Container width="wide" className="py-[clamp(2.75rem,4vw,4rem)]">
        <div className="grid gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:items-start lg:gap-[var(--grid-gap)]">
          <div className="lg:col-span-5">
            <Link to="/" aria-label="Vincenzo Rauccio, torna alla home">
              <Logo onDark showText={false} />
            </Link>
            <p className="mt-4 text-subtitle">{site.name}</p>
            <p className="mt-2 max-w-[34ch] text-small text-ink-muted">{site.descriptor}</p>
          </div>

          <nav aria-label="Navigazione del footer" className="lg:col-span-3">
            <p className="eyebrow text-ink-faint">Navigazione</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-quiet text-small">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-ink-faint">Contatti</p>
            <a
              href={`mailto:${site.email}`}
              className="link-quiet mt-4 inline-block break-words text-small"
            >
              {site.email}
            </a>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-quiet text-small"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 text-caption text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Vincenzo Rauccio</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy" className="link-quiet text-caption">
              Privacy
            </Link>
            <Link to="/cookie-policy" className="link-quiet text-caption">
              Cookie policy
            </Link>
            <button type="button" onClick={openPreferences} className="link-quiet text-caption">
              Gestisci preferenze cookie
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
