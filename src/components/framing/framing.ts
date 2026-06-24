import type { CSSProperties } from 'react'

/**
 * Style de point focal pour un `<img>` en `object-cover` : applique
 * `object-position` issu du hotspot Sanity (réglé par Emeline dans le Studio).
 * Sans valeur → image centrée par défaut.
 */
export function objectPositionStyle(position?: string): CSSProperties {
  return position ? { objectPosition: position } : {}
}
