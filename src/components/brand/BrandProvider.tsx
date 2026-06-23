import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import {
  BRAND_STORAGE_KEY,
  DEFAULT_BRAND,
  DEFAULT_HERO_MARK,
  DEFAULT_SEAL_VARIANT,
  HERO_MARK_STORAGE_KEY,
  SEAL_VARIANT_STORAGE_KEY,
  isBrand,
  isHeroMark,
  isSealVariant,
  type Brand,
  type HeroMark,
  type SealVariant,
} from './brand'

type BrandContextValue = {
  brand: Brand
  setBrand: (brand: Brand) => void
  heroMark: HeroMark
  setHeroMark: (mark: HeroMark) => void
  sealVariant: SealVariant
  setSealVariant: (variant: SealVariant) => void
}

const BrandContext = createContext<BrandContextValue | null>(null)

/**
 * Un réglage visiteur = un attribut `data-*` sur <html> + une clé localStorage,
 * validé par un type-guard, avec un défaut. Une seule table décrit les trois
 * (couleur, marque hero, cachet) ; `readStored`/`persist` la parcourent.
 */
type ToggleSpec<T extends string> = {
  attr: string
  storageKey: string
  isValid: (value: unknown) => value is T
  fallback: T
}

const BRAND_SPEC: ToggleSpec<Brand> = {
  attr: 'brand',
  storageKey: BRAND_STORAGE_KEY,
  isValid: isBrand,
  fallback: DEFAULT_BRAND,
}
const HERO_MARK_SPEC: ToggleSpec<HeroMark> = {
  attr: 'heroMark',
  storageKey: HERO_MARK_STORAGE_KEY,
  isValid: isHeroMark,
  fallback: DEFAULT_HERO_MARK,
}
const SEAL_SPEC: ToggleSpec<SealVariant> = {
  attr: 'seal',
  storageKey: SEAL_VARIANT_STORAGE_KEY,
  isValid: isSealVariant,
  fallback: DEFAULT_SEAL_VARIANT,
}

/** Lit le réglage : attribut posé avant le paint (no-flash) → localStorage → défaut. */
function readStored<T extends string>(spec: ToggleSpec<T>): T {
  if (typeof document !== 'undefined') {
    const fromAttr = document.documentElement.dataset[spec.attr]
    if (spec.isValid(fromAttr)) return fromAttr
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(spec.storageKey)
      if (spec.isValid(stored)) return stored
    } catch {
      /* localStorage indisponible (mode privé strict) — on garde le défaut */
    }
  }
  return spec.fallback
}

/** Persiste le choix : attribut <html> (effet immédiat) + localStorage (mémoire). */
function persist<T extends string>(spec: ToggleSpec<T>, next: T): void {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset[spec.attr] = next
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(spec.storageKey, next)
    } catch {
      /* ignore */
    }
  }
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(DEFAULT_BRAND)
  const [heroMark, setHeroMarkState] = useState<HeroMark>(DEFAULT_HERO_MARK)
  const [sealVariant, setSealVariantState] =
    useState<SealVariant>(DEFAULT_SEAL_VARIANT)

  // Sync initial après hydratation (le SSR ne connaît pas le choix visiteur).
  useEffect(() => {
    setBrandState(readStored(BRAND_SPEC))
    setHeroMarkState(readStored(HERO_MARK_SPEC))
    setSealVariantState(readStored(SEAL_SPEC))
  }, [])

  const setBrand = useCallback((next: Brand) => {
    setBrandState(next)
    persist(BRAND_SPEC, next)
  }, [])

  const setHeroMark = useCallback((next: HeroMark) => {
    setHeroMarkState(next)
    persist(HERO_MARK_SPEC, next)
  }, [])

  const setSealVariant = useCallback((next: SealVariant) => {
    setSealVariantState(next)
    persist(SEAL_SPEC, next)
  }, [])

  return (
    <BrandContext.Provider
      value={{
        brand,
        setBrand,
        heroMark,
        setHeroMark,
        sealVariant,
        setSealVariant,
      }}
    >
      {children}
    </BrandContext.Provider>
  )
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext)
  if (!ctx) {
    throw new Error('useBrand must be used within a <BrandProvider>')
  }
  return ctx
}
