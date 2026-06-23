import { BRAND_LABELS, BRAND_SWATCHES, BRANDS } from './brand'
import { useBrand } from './BrandProvider'

/**
 * Toggle couleur visiteur (teal ↔ blush) — discret, site-wide.
 * Posé en bas à gauche, accessible clavier (radiogroup + aria-checked).
 */
export function BrandToggle() {
  const { brand, setBrand } = useBrand()

  return (
    <div
      role="radiogroup"
      aria-label="Couleur de la marque"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-1 rounded-full border border-canard/20 bg-poudre/90 px-1.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md"
    >
      {BRANDS.map((b) => {
        const active = brand === b
        return (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`Couleur ${BRAND_LABELS[b]}`}
            title={BRAND_LABELS[b]}
            onClick={() => setBrand(b)}
            className={`group flex items-center gap-1.5 rounded-full px-2 py-1 transition-all duration-300 ${
              active ? 'bg-canard/10' : 'hover:bg-black/[0.03]'
            }`}
          >
            <span
              aria-hidden
              className={`block h-3.5 w-3.5 rounded-full border transition-transform duration-300 ${
                active
                  ? 'scale-110 border-canard ring-1 ring-canard/40 ring-offset-1 ring-offset-poudre'
                  : 'border-canard/20 group-hover:scale-105'
              }`}
              style={{ backgroundColor: BRAND_SWATCHES[b] }}
            />
            <span
              className={`hidden font-display text-[12px] tracking-wide sm:block ${
                active ? 'text-canard-90' : 'text-canard/45'
              }`}
            >
              {BRAND_LABELS[b]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
