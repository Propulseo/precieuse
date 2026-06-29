import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  CAROUSEL_MODE_HINTS,
  CAROUSEL_MODE_LABELS,
  CAROUSEL_MODES,
  COLLECTION_LAYOUT_HINTS,
  COLLECTION_LAYOUT_LABELS,
  COLLECTION_LAYOUTS,
  COLOR_SLOTS,
  COLOR_SLOTS_ORDER,
  FILIGRANE_VARIANT_LABELS,
  FILIGRANE_VARIANTS,
  HERO_MARK_LABELS,
  HERO_MARKS,
  SEAL_VARIANT_LABELS,
  SEAL_VARIANTS,
  type ColorSlot,
} from './brand'
import { useBrand } from './BrandProvider'

/**
 * Une ligne du panneau : un libellé clair de CE QUE règle le contrôle, le
 * contrôle lui-même, et une phrase d'aide facultative (pour Emeline).
 */
function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-display text-[10px] uppercase tracking-[0.18em] text-canard/55">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="font-body text-[11px] italic leading-snug text-canard/45">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

/** Groupe de pastilles texte (radiogroup) — marque hero / cachet / filigrane / carousel. */
function PillGroup<T extends string>({
  ariaLabel,
  values,
  current,
  labels,
  onSelect,
}: {
  ariaLabel: string
  values: readonly T[]
  current: T
  labels: Record<T, string>
  onSelect: (value: T) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex w-fit flex-wrap items-center gap-1 rounded-full bg-canard/5 p-0.5"
    >
      {values.map((v) => {
        const active = current === v
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={labels[v]}
            onClick={() => onSelect(v)}
            className={`rounded-full px-3 py-1 font-display text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${
              active
                ? 'bg-canard text-poudre shadow-sm'
                : 'text-canard/60 hover:text-canard'
            }`}
          >
            {labels[v]}
          </button>
        )
      })}
    </div>
  )
}

/** Un niveau de couleur : pastilles de la palette + pioche libre (input color). */
function ColorField({ slot }: { slot: ColorSlot }) {
  const { colors, setColor } = useBrand()
  const spec = COLOR_SLOTS[slot]
  const current = colors[slot]
  return (
    <Field label={spec.label} hint={spec.hint}>
      <div
        role="group"
        aria-label={spec.label}
        className="flex flex-wrap items-center gap-1.5"
      >
        {spec.presets.map((p) => {
          const active = current.toLowerCase() === p.hex.toLowerCase()
          return (
            <button
              key={p.hex}
              type="button"
              aria-label={p.label}
              title={p.label}
              onClick={() => setColor(slot, p.hex)}
              className="group flex items-center justify-center rounded-full p-0.5"
            >
              <span
                aria-hidden
                className={`block h-5 w-5 rounded-full border transition-transform duration-300 ${
                  active
                    ? 'scale-110 border-canard ring-1 ring-canard/40 ring-offset-1 ring-offset-poudre'
                    : 'border-black/10 group-hover:scale-110'
                }`}
                style={{ backgroundColor: p.hex }}
              />
            </button>
          )
        })}
        {/* Couleur libre */}
        <label
          className="relative ml-0.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-dashed border-canard/40 text-canard/60"
          title="Couleur libre"
        >
          <input
            type="color"
            value={current}
            onChange={(e) => setColor(slot, e.target.value)}
            aria-label={`${spec.label} — couleur libre`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M5 1v8 M1 5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </label>
      </div>
    </Field>
  )
}

/**
 * Contrôle visiteur (bas-gauche) pour faire valider les choix de design par
 * Emeline. Replié par défaut (pastille « Apparence ») ; déplié, chaque réglage
 * est clairement libellé pour qu'elle comprenne ce qu'il change. Le carousel
 * affiche en plus une phrase décrivant le comportement choisi.
 */
export function BrandToggle() {
  const {
    heroMark,
    setHeroMark,
    sealVariant,
    setSealVariant,
    filigraneVariant,
    setFiligraneVariant,
    carouselMode,
    setCarouselMode,
    collectionLayout,
    setCollectionLayout,
    colors,
    resetColors,
  } = useBrand()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {open ? (
        <div
          role="region"
          aria-label="Réglages d'apparence"
          className="flex w-[264px] flex-col gap-4 rounded-2xl border border-canard/20 bg-poudre/95 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.16)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-canard">
              Aperçu — réglages
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer les réglages"
              className="flex h-6 w-6 items-center justify-center rounded-full text-canard/50 transition-colors hover:bg-canard/5 hover:text-canard"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M3 3 L9 9 M9 3 L3 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3 border-b border-canard/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-[10px] uppercase tracking-[0.18em] text-canard/55">
                Couleurs (aperçu)
              </span>
              <button
                type="button"
                onClick={resetColors}
                className="font-display text-[10px] uppercase tracking-[0.12em] text-canard/45 transition-colors hover:text-canard"
              >
                Réinitialiser
              </button>
            </div>
            {COLOR_SLOTS_ORDER.map((slot) => (
              <ColorField key={slot} slot={slot} />
            ))}
          </div>

          <Field
            label="Marque dans la hero"
            hint="Le logo dessiné ou le mot « Précieuse »."
          >
            <PillGroup
              ariaLabel="Marque de la hero"
              values={HERO_MARKS}
              current={heroMark}
              labels={HERO_MARK_LABELS}
              onSelect={setHeroMark}
            />
          </Field>

          <Field
            label="Cachet de l'atelier"
            hint="Le sceau à côté de la signature d'Emeline."
          >
            <PillGroup
              ariaLabel="Cachet d'atelier"
              values={SEAL_VARIANTS}
              current={sealVariant}
              labels={SEAL_VARIANT_LABELS}
              onSelect={setSealVariant}
            />
          </Field>

          <Field
            label="Filigrane"
            hint="Le petit motif entre « Atelier » et « Précieuse »."
          >
            <PillGroup
              ariaLabel="Filigrane"
              values={FILIGRANE_VARIANTS}
              current={filigraneVariant}
              labels={FILIGRANE_VARIANT_LABELS}
              onSelect={setFiligraneVariant}
            />
          </Field>

          <Field
            label="Section Collection"
            hint={COLLECTION_LAYOUT_HINTS[collectionLayout]}
          >
            <PillGroup
              ariaLabel="Présentation de la section Collection"
              values={COLLECTION_LAYOUTS}
              current={collectionLayout}
              labels={COLLECTION_LAYOUT_LABELS}
              onSelect={setCollectionLayout}
            />
          </Field>

          {collectionLayout === 'carrousel' ? (
            <Field
              label="Mouvement du carrousel"
              hint={CAROUSEL_MODE_HINTS[carouselMode]}
            >
              <PillGroup
                ariaLabel="Mouvement du carrousel"
                values={CAROUSEL_MODES}
                current={carouselMode}
                labels={CAROUSEL_MODE_LABELS}
                onSelect={setCarouselMode}
              />
            </Field>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Réglages d'apparence"
        className="flex items-center gap-2 rounded-full border border-canard/20 bg-poudre/90 px-3.5 py-2 font-display text-[11px] uppercase tracking-[0.18em] text-canard shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors hover:bg-poudre"
      >
        <span
          aria-hidden
          className="h-3 w-3 rounded-full border border-canard/30"
          style={{ backgroundColor: colors.primary }}
        />
        Apparence
      </button>
    </div>
  )
}
