// Toggle couleur visiteur (teal ↔ blush) — modèle de marque partagé.
// Le choix pilote l'accent (CSS var `--brand-accent`, via `data-brand` sur <html>)
// et le logo (lockup teal / blush). Persisté en localStorage.

export type Brand = 'teal' | 'blush'

export const BRANDS: Brand[] = ['teal', 'blush']
export const DEFAULT_BRAND: Brand = 'teal'
export const BRAND_STORAGE_KEY = 'precieuse-brand'

export const BRAND_LABELS: Record<Brand, string> = {
  teal: 'Canard',
  blush: 'Blush',
}

// Pastilles d'aperçu pour le contrôle (doivent suivre les valeurs de styles.css).
export const BRAND_SWATCHES: Record<Brand, string> = {
  teal: '#125e5e',
  blush: '#b97e72',
}

// Logo par marque — lockup horizontal (picto + wordmark) décliné teal / blush.
export const BRAND_LOGOS: Record<Brand, string> = {
  teal: '/brand/lockup-teal.png',
  blush: '/brand/lockup-blush.png',
}

export function isBrand(value: unknown): value is Brand {
  return value === 'teal' || value === 'blush'
}

export function logoForBrand(brand: Brand): string {
  return BRAND_LOGOS[brand] ?? BRAND_LOGOS[DEFAULT_BRAND]
}
