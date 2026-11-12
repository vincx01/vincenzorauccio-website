import type { ReactNode } from 'react'

import { cx } from '../../lib/cx'

/** A single headline metric: value, label, optional supporting note. */
export function Stat({
  value,
  label,
  note,
  className,
}: {
  value: string
  label: string
  note?: string
  className?: string
}) {
  return (
    <div className={cx('stat', className)}>
      <span className="stat__value">{value}</span>
      <span className="eyebrow mt-1 text-ink-muted">{label}</span>
      {note && <span className="text-caption text-ink-faint">{note}</span>}
    </div>
  )
}

/** Metric row. Two columns on mobile, four from `md` up. */
export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4', className)}>{children}</div>
  )
}
