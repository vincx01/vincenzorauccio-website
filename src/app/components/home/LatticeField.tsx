import { cx } from '../../lib/cx'

const COLUMNS = Array.from({ length: 7 }, (_, i) => 40 + i * 54)
const ROWS = Array.from({ length: 9 }, (_, i) => 36 + i * 52)

/**
 * Abstract network field: a ledger grid, settlement paths and a few live nodes.
 * Deliberately geometric rather than illustrative — it reads as infrastructure,
 * not as stock technology artwork. All motion is CSS and stops under
 * `prefers-reduced-motion`.
 */
export function LatticeField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={cx('text-ink', className)}
    >
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.16">
        {COLUMNS.map((x) => (
          <line key={`col-${x}`} x1={x} y1={20} x2={x} y2={460} />
        ))}
        {ROWS.map((y) => (
          <line key={`row-${y}`} x1={20} y1={y} x2={380} y2={y} />
        ))}
      </g>

      <g fill="none" stroke="currentColor" className="text-accent" strokeWidth="1">
        <path d="M40 88 L148 88 L148 192 L256 192 L310 244" opacity="0.6" />
        <path d="M94 244 L202 244 L202 348 L310 348" opacity="0.45" />
        <path d="M310 88 L310 140 L364 192" opacity="0.35" />
      </g>

      <g fill="currentColor">
        {COLUMNS.map((x, xi) =>
          ROWS.map((y, yi) =>
            (xi + yi) % 2 === 0 ? (
              <circle key={`node-${xi}-${yi}`} cx={x} cy={y} r={1.2} opacity={0.28} />
            ) : null,
          ),
        )}
      </g>

      <g fill="currentColor" className="text-accent">
        <circle cx={148} cy={192} r={3.4} className="lattice-pulse" />
        <circle cx={256} cy={192} r={2.6} className="lattice-pulse" style={{ animationDelay: '1.6s' }} />
        <circle cx={202} cy={348} r={2.9} className="lattice-pulse" style={{ animationDelay: '3.1s' }} />
        <circle cx={310} cy={88} r={2.4} className="lattice-pulse" style={{ animationDelay: '4.4s' }} />
        <circle cx={310} cy={244} r={2.1} className="lattice-pulse" style={{ animationDelay: '5.2s' }} />
      </g>
    </svg>
  )
}
