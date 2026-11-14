import { Link } from 'react-router'

import { cx } from '../../lib/cx'
import { locales, persistLocale, useLocale } from '../../../i18n/core'
import { localizedUi } from '../../../i18n/ui'

/**
 * Compact IT | EN control. Each option is a real link to the same page in the
 * other language, so it works with keyboard navigation and keeps the current
 * path, query and hash.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, switchTo } = useLocale()
  const copy = localizedUi(locale).language

  return (
    <nav
      aria-label={copy.label}
      className={cx('flex shrink-0 items-center border border-line-strong', className)}
    >
      {locales.map((option, index) => {
        const active = option === locale
        const label = option === 'it' ? copy.it : copy.en

        return (
          <span key={option} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
            )}
            <Link
              to={switchTo(option)}
              hrefLang={option}
              lang={option}
              aria-current={active ? 'true' : undefined}
              aria-label={option === 'it' ? copy.switchToIt : copy.switchToEn}
              title={label}
              onClick={() => persistLocale(option)}
              className={cx(
                'px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300',
                active
                  ? 'bg-ink text-canvas'
                  : 'text-ink-muted hover:bg-sunken hover:text-ink',
              )}
            >
              {option.toUpperCase()}
            </Link>
          </span>
        )
      })}
    </nav>
  )
}
