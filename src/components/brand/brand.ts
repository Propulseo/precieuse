// Palette de marque sélectionnable par le visiteur (5 teintes curées).
// Le choix pilote l'accent (CSS var `--brand-accent`, via `data-brand` sur <html>)
// et recolore les logos (rendus en masque CSS, plus en PNG par couleur).
// Persisté en localStorage.

export type Brand = 'canard' | 'blush' | 'or' | 'lie-de-vin' | 'nuit'

export const BRANDS: Brand[] = ['canard', 'blush', 'or', 'lie-de-vin', 'nuit']
export const DEFAULT_BRAND: Brand = 'canard'
export const BRAND_STORAGE_KEY = 'precieuse-brand'

export const BRAND_LABELS: Record<Brand, string> = {
  canard: 'Canard',
  blush: 'Blush',
  or: 'Or',
  'lie-de-vin': 'Lie-de-vin',
  nuit: 'Nuit',
}

// Pastilles d'aperçu pour le contrôle (doivent suivre les valeurs de styles.css).
export const BRAND_SWATCHES: Record<Brand, string> = {
  canard: '#125e5e',
  blush: '#b97e72',
  or: '#b08d57',
  'lie-de-vin': '#7a2e3e',
  nuit: '#2f3e4d',
}

// Source du masque CSS pour les logos (recolorés via --brand-accent).
// Le wordmark (hero) et le lockup (nav/footer) sont des PNG RGBA dont l'alpha
// porte la forme ; on les utilise comme mask-image sur un fond --brand-accent.
export const BRAND_WORDMARK_MASK = '/brand/logo-teal.png'
export const BRAND_LOCKUP_MASK = '/brand/lockup-teal.png'

export function isBrand(value: unknown): value is Brand {
  return (
    value === 'canard' ||
    value === 'blush' ||
    value === 'or' ||
    value === 'lie-de-vin' ||
    value === 'nuit'
  )
}

// ─── Marque affichée dans la hero : logo (masque CSS) ou texte (« Précieuse. ») ───
// Réglage indépendant de la couleur, persisté séparément en localStorage et
// piloté par `data-hero-mark` sur <html> (posé avant le paint par no-flash).
export type HeroMark = 'logo' | 'texte'

export const HERO_MARKS: HeroMark[] = ['logo', 'texte']
export const DEFAULT_HERO_MARK: HeroMark = 'logo'
export const HERO_MARK_STORAGE_KEY = 'precieuse-hero-mark'

export const HERO_MARK_LABELS: Record<HeroMark, string> = {
  logo: 'Logo',
  texte: 'Texte',
}

export function isHeroMark(value: unknown): value is HeroMark {
  return value === 'logo' || value === 'texte'
}

// ─── Cachet d'atelier (avant-propos) : 3 montages au choix ───
// Fusion de la fleur de la marque (picto d'Emeline) avec la provenance
// « ATELIER · BORDEAUX · MMXXVI ». Piloté par `data-seal` sur <html>, persisté
// indépendamment. La fleur et le texte suivent --brand-accent (toggle couleur).
export type SealVariant = 'rond' | 'octogone' | 'epure'

export const SEAL_VARIANTS: SealVariant[] = ['rond', 'octogone', 'epure']
export const DEFAULT_SEAL_VARIANT: SealVariant = 'rond'
export const SEAL_VARIANT_STORAGE_KEY = 'precieuse-seal'

export const SEAL_VARIANT_LABELS: Record<SealVariant, string> = {
  rond: 'Rond',
  octogone: 'Octogone',
  epure: 'Épuré',
}

export function isSealVariant(value: unknown): value is SealVariant {
  return value === 'rond' || value === 'octogone' || value === 'epure'
}
