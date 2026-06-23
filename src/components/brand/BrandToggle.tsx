import { BRAND_LABELS, BRAND_SWATCHES, BRANDS } from './brand'
import { useBrand } from './BrandProvider'

/**
 * Sélecteur de teinte visiteur (palette 5 couleurs) — discret, site-wide.
 * Posé en bas à gauche, accessible clavier (radiogroup + aria-checked).
 * Chaque option = une pastille de couleur, libellé en tooltip (compact).
 */
export function BrandToggle() {
  const { brand, setBrand } = useBrand()

  return (
    <div
      role="radiogroup"
      aria-label="Couleur de la marque"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-1 rounded-full border border-canard/20 bg-poudre/90 px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md"
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
            className="group flex items-center justify-center rounded-full p-1 transition-all duration-300"
          >
            <span
              aria-hidden
              className={`block h-4 w-4 rounded-full border transition-transform duration-300 ${
                active
                  ? 'scale-110 border-canard ring-1 ring-canard/40 ring-offset-1 ring-offset-poudre'
                  : 'border-black/10 group-hover:scale-110'
              }`}
              style={{ backgroundColor: BRAND_SWATCHES[b] }}
            />
          </button>
        )
      })}
    </div>
  )
}
