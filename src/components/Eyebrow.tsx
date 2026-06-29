import type { ReactNode } from 'react'

/**
 * Eyebrow — sur-titre de section, traitement UNIQUE de la marque.
 *
 * Système délibéré (et non « eyebrow IA au-dessus de chaque section », listé
 * en anti-référence dans PRODUCT.md) : on l'emploie sur une minorité de
 * sections pour rythmer, jamais partout. Couleur = accent framboise/rubis,
 * lisible sur fond poudre. La marge basse se passe via `className` (mb-*).
 */
export function Eyebrow({
  children,
  className = '',
  colorClass = 'text-framboise',
}: {
  children: ReactNode
  className?: string
  /** Couleur du texte (override pour fond sombre : ex. `text-poudre/70`). */
  colorClass?: string
}) {
  return (
    <span
      className={`block font-display text-[11px] tracking-[0.4em] uppercase ${colorClass} ${className}`}
    >
      {children}
    </span>
  )
}
