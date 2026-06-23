import {
  BRAND_LABELS,
  BRAND_SWATCHES,
  BRANDS,
  FILIGRANE_VARIANT_LABELS,
  FILIGRANE_VARIANTS,
  HERO_MARK_LABELS,
  HERO_MARKS,
  SEAL_VARIANT_LABELS,
  SEAL_VARIANTS,
} from './brand'
import { useBrand } from './BrandProvider'

/**
 * Contrôle visiteur discret, site-wide, posé en bas à gauche.
 * - Sélecteur de teinte (palette 5 couleurs, radiogroup + aria-checked).
 * - Switch « Logo / Texte » pour la marque de la hero (radiogroup compact).
 * Accessible clavier, pill compacte et élégante.
 */
export function BrandToggle() {
  const {
    brand,
    setBrand,
    heroMark,
    setHeroMark,
    sealVariant,
    setSealVariant,
    filigraneVariant,
    setFiligraneVariant,
  } = useBrand()

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-canard/20 bg-poudre/90 px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md">
      <div
        role="radiogroup"
        aria-label="Couleur de la marque"
        className="flex items-center gap-1"
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

      {/* Séparateur discret */}
      <span aria-hidden className="h-4 w-px bg-canard/15" />

      {/* Switch Logo / Texte pour la marque de la hero */}
      <div
        role="radiogroup"
        aria-label="Marque de la hero"
        className="flex items-center rounded-full bg-canard/5 p-0.5"
      >
        {HERO_MARKS.map((m) => {
          const active = heroMark === m
          return (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`Marque ${HERO_MARK_LABELS[m]}`}
              title={HERO_MARK_LABELS[m]}
              onClick={() => setHeroMark(m)}
              className={`rounded-full px-2.5 py-0.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                active
                  ? 'bg-canard text-poudre shadow-sm'
                  : 'text-canard/60 hover:text-canard'
              }`}
            >
              {HERO_MARK_LABELS[m]}
            </button>
          )
        })}
      </div>

      {/* Séparateur discret */}
      <span aria-hidden className="h-4 w-px bg-canard/15" />

      {/* Switch du cachet d'atelier (avant-propos) : Rond / Octogone / Épuré */}
      <div
        role="radiogroup"
        aria-label="Cachet d'atelier"
        className="flex items-center rounded-full bg-canard/5 p-0.5"
      >
        {SEAL_VARIANTS.map((v) => {
          const active = sealVariant === v
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`Cachet ${SEAL_VARIANT_LABELS[v]}`}
              title={SEAL_VARIANT_LABELS[v]}
              onClick={() => setSealVariant(v)}
              className={`rounded-full px-2.5 py-0.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                active
                  ? 'bg-canard text-poudre shadow-sm'
                  : 'text-canard/60 hover:text-canard'
              }`}
            >
              {SEAL_VARIANT_LABELS[v]}
            </button>
          )
        })}
      </div>

      {/* Séparateur discret */}
      <span aria-hidden className="h-4 w-px bg-canard/15" />

      {/* Filigrane décoratif de l'avant-propos : Losange / Points / Éclat */}
      <div
        role="radiogroup"
        aria-label="Filigrane"
        className="flex items-center rounded-full bg-canard/5 p-0.5"
      >
        {FILIGRANE_VARIANTS.map((v) => {
          const active = filigraneVariant === v
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`Filigrane ${FILIGRANE_VARIANT_LABELS[v]}`}
              title={FILIGRANE_VARIANT_LABELS[v]}
              onClick={() => setFiligraneVariant(v)}
              className={`rounded-full px-2.5 py-0.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                active
                  ? 'bg-canard text-poudre shadow-sm'
                  : 'text-canard/60 hover:text-canard'
              }`}
            >
              {FILIGRANE_VARIANT_LABELS[v]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
