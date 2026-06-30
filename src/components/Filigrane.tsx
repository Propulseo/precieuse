import { BRAND_PICTO_MASK, maskStyle } from './brand/brand'

/**
 * Fleur de la marque en filigrane — watermark décoratif (le picto peint en
 * masque CSS, basse opacité) pour habiller les zones vides, comme dans le
 * footer. Purement décoratif (aria-hidden), posé derrière le contenu (-z-10).
 *
 * Taille / position / opacité passées via `className` (ex.
 * `top-10 right-0 h-[320px] w-[320px] opacity-[0.08]`). Couleur par défaut =
 * accent de marque (canard) ; sur fond poudre, ~6-10 % donne un ton sur ton.
 *
 * Note z-index : on ne force PAS de z négatif (ça enverrait la fleur derrière
 * le fond de section → invisible). Le filigrane vit dans la couche normale ;
 * pour qu'il passe derrière du texte qui le chevauche, donner au contenu une
 * pile supérieure (`relative z-10`).
 */
export function Filigrane({
  className = '',
  color = 'var(--brand-accent)',
  flip = false,
}: {
  className?: string
  color?: string
  flip?: boolean
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute select-none ${flip ? '-scale-x-100' : ''} ${className}`}
      style={maskStyle(BRAND_PICTO_MASK, color)}
    />
  )
}
