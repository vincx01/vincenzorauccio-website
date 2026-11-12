import { useState } from 'react'

import { site } from '../../../data/site'
import { cx } from '../../lib/cx'

/**
 * Marchio ufficiale VR. L’immagine originale viene usata così com’è, senza
 * ridisegni né effetti. Su fondo scuro viene invertita con un filtro, così la
 * geometria resta identica. Se l’asset non è disponibile, il nome resta
 * leggibile grazie a un segnaposto tipografico.
 */
export function Logo({
  onDark = false,
  showText = true,
  priority = false,
  className,
}: {
  onDark?: boolean
  showText?: boolean
  priority?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  return (
    <span className={cx('flex min-w-0 items-center gap-3', className)}>
      {failed ? (
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center bg-ink text-[0.6875rem] font-semibold tracking-[0.08em] text-canvas"
        >
          VR
        </span>
      ) : (
        <img
          src="/brand/vr-logo.png"
          alt=""
          width={187}
          height={187}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={cx('size-9 shrink-0 object-contain', onDark && 'invert')}
        />
      )}

      {showText && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="truncate text-[0.9375rem] font-medium tracking-[-0.01em]">{site.name}</span>
          <span className="mt-1 hidden text-[0.5625rem] uppercase tracking-[0.18em] text-ink-faint sm:block">
            {site.positioning}
          </span>
        </span>
      )}
    </span>
  )
}
