import { ArrowUpRight, FileText } from 'lucide-react'

import { pressEntries, type PressWordmark } from '../../../data/press'
import { useLocale, type Locale } from '../../../i18n/core'
import { localizedPages } from '../../../i18n/pages'
import { cx } from '../../lib/cx'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'

const wordmarkClass: Record<PressWordmark, string> = {
  caps: 'font-display text-caption font-semibold uppercase tracking-[0.22em] text-ink',
  tight: 'font-display text-body font-medium tracking-[-0.02em] text-ink',
  editorial: 'font-display text-subtitle font-medium tracking-[-0.03em] text-ink',
  institutional: 'text-caption uppercase tracking-[0.14em] text-ink-muted',
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))
}

/**
 * Rassegna stampa: a compact editorial grid. The mastheads are set in type,
 * because no reliable official logo asset is available for these outlets; the
 * institutional document is separated by tone, label and icon.
 */
export function PressSection() {
  const { locale } = useLocale()
  const copy = localizedPages(locale).about.press

  return (
    <Section id="rassegna-stampa" labelledBy="rassegna-stampa-title">
      <Container>
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow text-ink-faint">{copy.index}</span>
          <span className="eyebrow text-ink-muted">{copy.eyebrow}</span>
        </div>

        <div className="mt-6 grid gap-x-[var(--grid-gap)] gap-y-4 lg:grid-cols-12">
          <h2 id="rassegna-stampa-title" className="font-display text-title lg:col-span-5">
            {copy.title}
          </h2>
          <p className="text-measure text-body text-ink-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            {copy.subtitle}
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {pressEntries.map((entry) => (
            <li key={entry.id} className="min-w-0">
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  'group flex h-full flex-col gap-6 border border-line p-5 transition duration-300 sm:p-6',
                  'hover:-translate-y-0.5 hover:border-line-strong',
                  entry.kind === 'document' ? 'bg-sunken' : 'bg-raised',
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className={cx('block', wordmarkClass[entry.wordmark])}>{entry.source}</span>
                    {entry.sourceDetail && (
                      <span className="mt-1.5 block text-caption text-ink-faint">
                        {entry.sourceDetail}
                      </span>
                    )}
                  </div>
                  {entry.kind === 'document' ? (
                    <FileText
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-accent-ink"
                    />
                  ) : (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                    />
                  )}
                </div>

                <div>
                  {entry.kind === 'document' && (
                    <span className="eyebrow block text-ink-faint">{copy.documentLabel}</span>
                  )}
                  <h3
                    className={cx(
                      'font-display text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent-ink',
                      entry.kind === 'document' && 'mt-2',
                    )}
                  >
                    {entry.title}
                  </h3>
                  {entry.dateISO && (
                    <time
                      dateTime={entry.dateISO}
                      className="mt-3 block text-caption text-ink-faint"
                    >
                      {formatDate(entry.dateISO, locale)}
                    </time>
                  )}
                  <span className="sr-only">{copy.external}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
