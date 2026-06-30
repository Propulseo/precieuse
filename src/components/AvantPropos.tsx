import { BRAND_PICTO_MASK, maskStyle } from './brand/brand'
import { useBrand } from './brand/BrandProvider'
import type { HomePageData } from '../lib/content/home'

/** Chiffres romains des paires du manifeste (la donnée Sanity ne les porte pas). */
const ROMANS = ['I', 'II', 'III', 'IV'] as const

const FILIGRANE_SVG_CLASS = 'w-[80px] h-6 text-rouille opacity-70'

/** Losange : pierre taillée sur un filet. */
function FiligraneLosange() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 24" className={FILIGRANE_SVG_CLASS} fill="none">
      <line x1="6" y1="12" x2="34" y2="12" stroke="currentColor" strokeWidth="0.6" />
      <rect x="36" y="8" width="8" height="8" stroke="currentColor" strokeWidth="0.6" transform="rotate(45 40 12)" />
      <line x1="46" y1="12" x2="74" y2="12" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  )
}

/** Points : trois pastilles sobres. */
function FiligranePoints() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 24" className={FILIGRANE_SVG_CLASS} fill="none">
      <line x1="8" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="35.5" cy="12" r="1.3" fill="currentColor" />
      <circle cx="40" cy="12" r="1.7" fill="currentColor" />
      <circle cx="44.5" cy="12" r="1.3" fill="currentColor" />
      <line x1="50" y1="12" x2="72" y2="12" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}

/** Éclat : scintillement de diamant (étoile à 4 branches). */
function FiligraneEclat() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 24" className={FILIGRANE_SVG_CLASS} fill="none">
      <line x1="8" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="0.5" />
      <path d="M40 4 L41.6 10.4 L48 12 L41.6 13.6 L40 20 L38.4 13.6 L32 12 L38.4 10.4 Z" fill="currentColor" />
      <line x1="50" y1="12" x2="72" y2="12" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  )
}

/** Séparateur décoratif — 3 motifs au choix (toggle « Filigrane »). */
function Filigrane() {
  const { filigraneVariant } = useBrand()
  if (filigraneVariant === 'points') return <FiligranePoints />
  if (filigraneVariant === 'eclat') return <FiligraneEclat />
  return <FiligraneLosange />
}

/** La fleur de la marque (picto d'Emeline), recolorée par --brand-accent. */
function FlowerMark({ size, className }: { size: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ width: size, height: size, ...maskStyle(BRAND_PICTO_MASK) }}
    />
  )
}

/** Variant « rond » : cachet circulaire pointillé, fleur au centre. */
function SealRond() {
  return (
    <div className="relative h-[94px] w-[94px] shrink-0" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full opacity-85" fill="none" style={{ color: 'var(--brand-accent)' }}>
        <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <text x="60" y="33" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">ATELIER</text>
        <text x="60" y="91" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">BORDEAUX</text>
        <text x="60" y="103" textAnchor="middle" fontSize="6.5" fill="currentColor" fontFamily="serif" letterSpacing="2.6">MMXXVI</text>
      </svg>
      <FlowerMark size={40} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90" />
    </div>
  )
}

/** Variant « octogone » : reprend la forme du picto d'Emeline (cartouche). */
function SealOctogone() {
  return (
    <div className="relative h-[104px] w-[88px] shrink-0" aria-hidden="true">
      <svg viewBox="0 0 120 140" className="absolute inset-0 h-full w-full opacity-85" fill="none" style={{ color: 'var(--brand-accent)' }}>
        <path d="M40 8 L80 8 L98 26 L98 114 L80 132 L40 132 L22 114 L22 26 Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
        <text x="60" y="34" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">ATELIER</text>
        <text x="60" y="116" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">BORDEAUX</text>
        <text x="60" y="127" textAnchor="middle" fontSize="6.5" fill="currentColor" fontFamily="serif" letterSpacing="2.6">MMXXVI</text>
      </svg>
      <FlowerMark size={44} className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 opacity-90" />
    </div>
  )
}

/** Variant « épuré » : fleur seule + filet + ligne de provenance. */
function SealEpure() {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5 pt-1" aria-hidden="true">
      <FlowerMark size={50} className="opacity-90" />
      <span className="block h-px w-12" style={{ backgroundColor: 'var(--brand-accent)', opacity: 0.45 }} />
      <span className="font-display text-[9px] uppercase tracking-[0.25em]" style={{ color: 'var(--brand-accent)' }}>
        Atelier · Bordeaux · MMXXVI
      </span>
    </div>
  )
}

/**
 * Cachet d'atelier — 3 montages au choix (toggle « Cachet » en bas à gauche) :
 * fusion de la fleur de la marque + provenance « ATELIER · BORDEAUX · MMXXVI ».
 */
function Seal() {
  const { sealVariant } = useBrand()
  if (sealVariant === 'octogone') return <SealOctogone />
  if (sealVariant === 'epure') return <SealEpure />
  return <SealRond />
}

export function AvantPropos({ apropos }: { apropos: HomePageData['avantPropos'] }) {
  return (
    <section className="relative bg-poudre py-10 px-8 lg:px-16">

      <div className="mx-auto max-w-[1320px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="relative md:order-1 order-2 mx-auto md:mx-0">
          <div className="relative w-full max-w-[460px] aspect-[3/4] border border-canard/30 overflow-hidden">
            <img
              src={apropos.portrait.src}
              alt={apropos.portrait.alt}
              style={apropos.portrait.position ? { objectPosition: apropos.portrait.position } : undefined}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between max-w-[460px]">
            <span className="font-display text-[13px] tracking-[0.25em] uppercase text-canard/70">
              {apropos.name}
            </span>
            <span className="font-display text-[12px] tracking-[0.2em] uppercase text-canard">
              {apropos.place}
            </span>
          </div>
        </div>

        <div className="md:order-2 order-1">
          <div className="flex flex-col items-start mb-5">
            <span className="font-display text-[34px] tracking-[0.18em] uppercase text-canard leading-none">
              Atelier
            </span>
            <div className="my-3">
              <Filigrane />
            </div>
            <span className="font-headline text-[clamp(32px,6vw,52px)] text-canard leading-none">
              Précieuse
            </span>
          </div>

          <ul className="flex flex-col gap-7">
            {apropos.manifesto.map((p, i) => (
              <li key={i} className="grid grid-cols-[44px_1fr] gap-5 items-baseline">
                <span className="font-display text-[15px] text-rouille opacity-80 tracking-wider whitespace-nowrap">
                  · {ROMANS[i] ?? i + 1} ·
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-display text-[15px] text-canard/65 tracking-wide">
                    {p.pas}
                  </span>
                  <span className="font-display text-[20px] text-canard leading-[1.45]">
                    {p.mais}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-6 pt-4 border-t border-canard/15">
            <Seal />
            <div className="flex flex-col">
              <span className="font-display text-[18px] text-canard">{apropos.name}</span>
              <span className="font-display text-[13px] text-canard/65 tracking-wide">
                {apropos.qualification}
              </span>
              <span className="font-display text-[12px] text-canard/45 tracking-wide mt-0.5">
                {apropos.founder}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end max-w-[1320px] mx-auto">
        <span className="font-display text-[13px] text-framboise">p. 02</span>
      </div>
    </section>
  )
}
