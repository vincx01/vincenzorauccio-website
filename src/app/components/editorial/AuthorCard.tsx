import { Link } from 'react-router'

import { site } from '../../../data/site'
import { cx } from '../../lib/cx'
import { linkedInUrl } from '../../lib/site-links'

/** Author block built only from published profile facts. */
export function AuthorCard({ className }: { className?: string }) {
  return (
    <div className={cx('border-t border-line pt-5', className)}>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center bg-ink text-[0.6875rem] font-semibold tracking-[0.08em] text-canvas"
        >
          VR
        </span>
        <div>
          <p className="text-small font-medium">{site.name}</p>
          <p className="text-caption text-ink-faint">{site.role}</p>
        </div>
      </div>
      <p className="mt-4 text-small text-ink-muted">{site.descriptor}</p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        <Link to="/about" className="link-quiet text-small">
          Chi sono
        </Link>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet text-small"
        >
          LinkedIn
        </a>
        <Link to="/contact" className="link-quiet text-small">
          Contatti
        </Link>
      </div>
    </div>
  )
}
