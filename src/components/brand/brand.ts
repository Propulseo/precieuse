// Palette de marque sélectionnable par le visiteur (5 teintes curées).
// Le choix pilote l'accent (CSS var `--brand-accent`, via `data-brand` sur <html>)
// et recolore les logos (rendus en masque CSS, plus en PNG par couleur).
// Persisté en localStorage.

import type { CSSProperties } from 'react'

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
export const BRAND_PICTO_MASK = '/brand/picto-teal.png'

/**
 * Style d'un logo rendu en masque CSS : peint `color` (défaut --brand-accent) à
 * travers l'alpha du PNG `mask`. Centralise les 8 propriétés mask/-webkit-mask
 * répétées (hero, nav, footer, cachet). La taille reste au call site
 * (`width`/`height`/`aspectRatio`).
 */
export function maskStyle(
  mask: string,
  color: string = 'var(--brand-accent)',
): CSSProperties {
  return {
    backgroundColor: color,
    maskImage: `url(${mask})`,
    WebkitMaskImage: `url(${mask})`,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  }
}

export function isBrand(value: unknown): value is Brand {
  return typeof value === 'string' && (BRANDS as string[]).includes(value)
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
  return typeof value === 'string' && (HERO_MARKS as string[]).includes(value)
}

// ─── Cachet d'atelier (avant-propos) : 3 montages au choix ───
// Fusion de la fleur de la marque (picto d'Emeline) avec la provenance
// « ATELIER · BORDEAUX · MMXXVI ». Piloté par `data-seal` sur <html>, persisté
// indépendamment. La fleur et le texte suivent --brand-accent (toggle couleur).
export type SealVariant = 'rond' | 'octogone' | 'epure'

export const SEAL_VARIANTS: SealVariant[] = ['rond', 'octogone', 'epure']
export const DEFAULT_SEAL_VARIANT: SealVariant = 'epure'
export const SEAL_VARIANT_STORAGE_KEY = 'precieuse-seal'

export const SEAL_VARIANT_LABELS: Record<SealVariant, string> = {
  rond: 'Rond',
  octogone: 'Octogone',
  epure: 'Épuré',
}

export function isSealVariant(value: unknown): value is SealVariant {
  return typeof value === 'string' && (SEAL_VARIANTS as string[]).includes(value)
}

// ─── Filigrane (séparateur décoratif de l'avant-propos) : 3 motifs au choix ───
// Piloté par `data-filigrane` sur <html>, persisté indépendamment.
export type FiligraneVariant = 'losange' | 'points' | 'eclat'

export const FILIGRANE_VARIANTS: FiligraneVariant[] = ['losange', 'points', 'eclat']
export const DEFAULT_FILIGRANE_VARIANT: FiligraneVariant = 'losange'
export const FILIGRANE_VARIANT_STORAGE_KEY = 'precieuse-filigrane'

export const FILIGRANE_VARIANT_LABELS: Record<FiligraneVariant, string> = {
  losange: 'Losange',
  points: 'Points',
  eclat: 'Éclat',
}

export function isFiligraneVariant(value: unknown): value is FiligraneVariant {
  return (
    typeof value === 'string' && (FILIGRANE_VARIANTS as string[]).includes(value)
  )
}

// ─── Carousel de la collection : 3 comportements au choix ───
// Piloté par `data-carousel` sur <html>, persisté indépendamment. Permet à
// Emeline de choisir le défilement de la section « Collection » sans toucher au
// code. Chaque mode a un libellé court (toggle) et une phrase d'explication.
export type CarouselMode = 'glisse' | 'fondu' | 'coverflow'

export const CAROUSEL_MODES: CarouselMode[] = ['glisse', 'fondu', 'coverflow']
export const DEFAULT_CAROUSEL_MODE: CarouselMode = 'glisse'
export const CAROUSEL_MODE_STORAGE_KEY = 'precieuse-carousel'

export const CAROUSEL_MODE_LABELS: Record<CarouselMode, string> = {
  glisse: 'Glissé',
  fondu: 'Fondu',
  coverflow: 'Coverflow',
}

// Phrase affichée sous le réglage, pour qu'Emeline comprenne ce que ça change.
export const CAROUSEL_MODE_HINTS: Record<CarouselMode, string> = {
  glisse: 'Une grande pièce à la fois, qui glisse sur le côté.',
  fondu: 'La pièce suivante apparaît en fondu, sans mouvement.',
  coverflow: 'Grande pièce au centre, aperçus des voisines sur les côtés.',
}

export function isCarouselMode(value: unknown): value is CarouselMode {
  return typeof value === 'string' && (CAROUSEL_MODES as string[]).includes(value)
}

// ─── Présentation de la section Collection (home) : défilé plein écran ou carrousel ───
// Piloté par `data-collection` sur <html>, persisté indépendamment. Défaut = défilé.
export type CollectionLayout = 'defile' | 'carrousel'

export const COLLECTION_LAYOUTS: CollectionLayout[] = ['defile', 'carrousel']
export const DEFAULT_COLLECTION_LAYOUT: CollectionLayout = 'defile'
export const COLLECTION_LAYOUT_STORAGE_KEY = 'precieuse-collection-layout'

export const COLLECTION_LAYOUT_LABELS: Record<CollectionLayout, string> = {
  defile: 'Défilé',
  carrousel: 'Carrousel',
}

export const COLLECTION_LAYOUT_HINTS: Record<CollectionLayout, string> = {
  defile: 'Les pièces défilent horizontalement au scroll (plein écran).',
  carrousel: 'Une pièce à la fois, en carrousel (réglable ci-dessous).',
}

export function isCollectionLayout(value: unknown): value is CollectionLayout {
  return (
    typeof value === 'string' && (COLLECTION_LAYOUTS as string[]).includes(value)
  )
}

// ─── Fond de l'eyebrow de la hero : 4 traitements au choix ───
// Piloté par `data-heroEyebrow` sur <html>, persisté indépendamment. « actuel »
// = le cartouche translucide (patch) ; les trois autres retirent le fond.
export type HeroEyebrow = 'actuel' | 'filets' | 'nu' | 'losanges'

export const HERO_EYEBROWS: HeroEyebrow[] = ['actuel', 'filets', 'nu', 'losanges']
export const DEFAULT_HERO_EYEBROW: HeroEyebrow = 'nu'
export const HERO_EYEBROW_STORAGE_KEY = 'precieuse-hero-eyebrow'

export const HERO_EYEBROW_LABELS: Record<HeroEyebrow, string> = {
  actuel: 'Actuel',
  filets: 'Filets',
  nu: 'Texte nu',
  losanges: 'Losanges',
}

export function isHeroEyebrow(value: unknown): value is HeroEyebrow {
  return typeof value === 'string' && (HERO_EYEBROWS as string[]).includes(value)
}

// ─── Couleurs personnalisables (aperçu dev) : 3 niveaux pilotés en direct ───
// Chaque niveau écrit UNE variable CSS sur <html> (style inline, qui l'emporte
// sur les tokens de styles.css) et persiste son hex en localStorage. Le no-flash
// les applique avant le paint. Sert à tester en live des combinaisons de charte.
export type ColorSlot = 'primary' | 'secondary' | 'tertiary'

export const COLOR_SLOTS_ORDER: ColorSlot[] = ['primary', 'secondary', 'tertiary']

export type ColorPreset = { label: string; hex: string }

export type ColorSlotSpec = {
  /** Variable CSS pilotée (inline sur <html>). */
  cssVar: string
  storageKey: string
  /** Hex par défaut = valeur actuelle de la charte. */
  fallback: string
  label: string
  hint: string
  presets: ColorPreset[]
}

export const COLOR_SLOTS: Record<ColorSlot, ColorSlotSpec> = {
  primary: {
    cssVar: '--brand-accent',
    storageKey: 'precieuse-color-primary',
    fallback: '#125e5e',
    label: 'Couleur principale',
    hint: 'Texte, titres, UI et logos.',
    presets: [
      { label: 'Canard', hex: '#125e5e' },
      { label: 'Jewel', hex: '#107252' },
      { label: 'Nuit', hex: '#2f3e4d' },
      { label: 'Prune', hex: '#72106b' },
    ],
  },
  secondary: {
    cssVar: '--poudre',
    storageKey: 'precieuse-color-secondary',
    fallback: '#eadcd3',
    label: 'Couleur secondaire (fond)',
    hint: 'Le fond chaud des pages.',
    presets: [
      { label: 'Poudre', hex: '#eadcd3' },
      { label: 'Ivoire', hex: '#f4ece4' },
      { label: 'Blanc cassé', hex: '#faf6f1' },
      { label: 'Pêche pâle', hex: '#f7e3d3' },
    ],
  },
  tertiary: {
    cssVar: '--framboise',
    storageKey: 'precieuse-color-tertiary',
    fallback: '#b80049',
    label: 'Couleur tertiaire (accent)',
    hint: 'Accents, eyebrows, liens, détails.',
    presets: [
      { label: 'Framboise', hex: '#bb4e7c' },
      { label: 'Framboise foncé', hex: '#8e3a5d' },
      { label: 'Rubis', hex: '#b80049' },
      { label: 'Rose', hex: '#d07992' },
      { label: 'Prune', hex: '#72106b' },
      { label: 'Corail', hex: '#f98688' },
      { label: 'Pêche', hex: '#fbbb8b' },
    ],
  },
}

const HEX_RE = /^#[0-9a-fA-F]{6}$/
export function isHex(value: unknown): value is string {
  return typeof value === 'string' && HEX_RE.test(value)
}
