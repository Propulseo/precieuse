import { useBrand } from './brand/BrandProvider'

const PAIRES = [
  { roman: 'i', pas: 'pas de saison', mais: 'Des pièces dessinées pour traverser le temps.' },
  { roman: 'ii', pas: 'pas de stock', mais: "Une fabrication à la commande, pas forcément à l'unité." },
  { roman: 'iii', pas: "pas d'usine", mais: 'Une main, un atelier, un geste, du dessin au sertissage.' },
  { roman: 'iv', pas: 'pas de hasard', mais: 'Or 18 carats sourcé et tracé grâce au traité de Kimberley, pierres précieuses choisies une à une.' },
]

function Filigrane() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 24" className="w-[80px] h-6 text-rouille opacity-70" fill="none">
      <path d="M40 12 Q 32 4 24 12 Q 16 20 8 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <path d="M40 12 Q 48 4 56 12 Q 64 20 72 12" stroke="currentColor" strokeWidth="0.6" fill="none" />
      <circle cx="40" cy="12" r="2" stroke="currentColor" strokeWidth="0.6" fill="currentColor" fillOpacity="0.3" />
      <line x1="0" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="0.4" />
      <line x1="74" y1="12" x2="80" y2="12" stroke="currentColor" strokeWidth="0.4" />
    </svg>
  )
}

/** La fleur de la marque (picto d'Emeline), recolorée par --brand-accent. */
function FlowerMark({ size, className }: { size: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size,
        backgroundColor: 'var(--brand-accent)',
        maskImage: 'url(/brand/picto-teal.png)',
        WebkitMaskImage: 'url(/brand/picto-teal.png)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
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

export function AvantPropos() {
  return (
    <section className="relative bg-poudre py-20 px-8 lg:px-16">

      <div className="mx-auto max-w-[1320px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="relative md:order-1 order-2 mx-auto md:mx-0">
          <div className="relative w-full max-w-[460px] aspect-[3/4] border border-canard/30 overflow-hidden">
            <img
              src="/images/emeline-portrait.jpg"
              alt="Portrait d'Emeline Le Ray, fondatrice et joaillière de Précieuse"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between max-w-[460px]">
            <span className="font-display text-[13px] tracking-[0.25em] uppercase text-canard/70">
              Emeline Le Ray
            </span>
            <span className="font-display text-[12px] tracking-[0.2em] uppercase text-canard">
              Bordeaux · MMXXVI
            </span>
          </div>
        </div>

        <div className="md:order-2 order-1">
          <span className="font-display text-[10px] tracking-[0.45em] uppercase text-canard block mb-5">
            Avant-propos
          </span>

          <div className="flex flex-col items-start mb-10">
            <span className="font-display text-[34px] tracking-[0.18em] uppercase text-canard leading-none">
              Atelier
            </span>
            <div className="my-3">
              <Filigrane />
            </div>
            <span className="font-headline text-[52px] text-canard leading-none">
              Précieuse
            </span>
          </div>

          <ul className="flex flex-col gap-7">
            {PAIRES.map((p) => (
              <li key={p.roman} className="grid grid-cols-[32px_1fr] gap-5 items-baseline">
                <span className="font-display text-[15px] text-rouille opacity-80 tracking-wider">
                  · {p.roman} ·
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

          <div className="mt-10 flex items-center gap-6 pt-6 border-t border-canard/15">
            <Seal />
            <div className="flex flex-col">
              <span className="font-display text-[18px] text-canard">Emeline Le Ray</span>
              <span className="font-display text-[13px] text-canard/65 tracking-wide">
                joaillière diplômée · 12 ans d'expérience
              </span>
              <span className="font-display text-[12px] text-canard/45 tracking-wide mt-0.5">
                fondatrice · Bordeaux · MMXXVI
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end max-w-[1320px] mx-auto">
        <span className="font-display text-[13px] text-canard">p. 02</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-canard/25" />
    </section>
  )
}
