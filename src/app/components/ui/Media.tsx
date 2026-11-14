import { useLocale } from '../../../i18n/core'
import { localizedUi } from '../../../i18n/ui'
import { cx } from '../../lib/cx'

type Ratio = '4/5' | '3/2' | '16/9' | '1/1' | '2/3'

/**
 * Image container with a fixed aspect ratio, so grids stay aligned while
 * content is still missing. Renders a gridded placeholder when no source is
 * supplied — never a stand-in photograph.
 */
export function Media({
  src,
  alt = '',
  ratio = '3/2',
  zoom = false,
  priority = false,
  className,
}: {
  src?: string
  alt?: string
  ratio?: Ratio
  zoom?: boolean
  priority?: boolean
  className?: string
}) {
  const { locale } = useLocale()
  const placeholder = localizedUi(locale).common.imagePlaceholder

  return (
    <div
      className={cx('media', zoom && 'media--zoom', className)}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      {src ? (
        <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      ) : (
        <div className="media__placeholder surface-grid" aria-hidden="true">
          <span className="eyebrow">{placeholder}</span>
        </div>
      )}
    </div>
  )
}
