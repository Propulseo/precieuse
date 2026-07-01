import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'

/** Filigrane losange — séparateur éditorial entre les mouvements de la lettre. */
export function Filigrane() {
  return (
    <div className="my-10 flex justify-center text-framboise/50" aria-hidden>
      <svg viewBox="0 0 86 24" className="h-6 w-[86px]" fill="none">
        <line x1="8" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="0.6" />
        <rect x="39" y="8" width="8" height="8" stroke="currentColor" strokeWidth="0.6" transform="rotate(45 43 12)" />
        <line x1="50" y1="12" x2="78" y2="12" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  )
}

/** Cachet d'atelier — sceau rond ATELIER · BORDEAUX · MMXXV, fleur de la marque au centre. */
export function Seal() {
  return (
    <div className="relative h-24 w-24 shrink-0 text-canard" aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full opacity-80" fill="none">
        <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <text x="60" y="32" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">ATELIER</text>
        <text x="60" y="92" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">BORDEAUX</text>
        <text x="60" y="104" textAnchor="middle" fontSize="6.5" fill="currentColor" fontFamily="serif" letterSpacing="2.6">MMXXV</text>
      </svg>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 32, height: 32, ...maskStyle(BRAND_PICTO_MASK) }}
      />
    </div>
  )
}
