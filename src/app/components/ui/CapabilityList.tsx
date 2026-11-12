import { cx } from '../../lib/cx'

export interface Capability {
  title: string
  description?: string
  items?: string[]
}

/**
 * Skill categories as a numbered editorial list. Titles are the primary
 * structure; descriptions and grouped items are optional, so the component
 * works with only confirmed expertise areas.
 */
export function CapabilityList({ items, className }: { items: Capability[]; className?: string }) {
  return (
    <ul className={cx('border-t border-line', className)}>
      {items.map((item, i) => (
        <li key={item.title} className="group border-b border-line">
          <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[3.5rem_1fr_1fr] md:gap-[var(--grid-gap)] md:py-7">
            <span className="eyebrow text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-subtitle transition-colors duration-300 group-hover:text-accent-ink">
              {item.title}
            </h3>
            <div className="col-start-2 md:col-start-3">
              {item.description && <p className="max-w-[44ch] text-small text-ink-muted">{item.description}</p>}
              {item.items && item.items.length > 0 && (
                <ul className="flex flex-wrap gap-x-3 gap-y-2">
                  {item.items.map((entry) => (
                    <li
                      key={entry}
                      className="border border-line px-2.5 py-1 text-caption text-ink-muted"
                    >
                      {entry}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
