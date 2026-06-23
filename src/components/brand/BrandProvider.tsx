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
  BRANDS,
  DEFAULT_BRAND,
  DEFAULT_HERO_MARK,
  HERO_MARK_STORAGE_KEY,
  isBrand,
  isHeroMark,
  type Brand,
  type HeroMark,
} from './brand'

type BrandContextValue = {
  brand: Brand
  setBrand: (brand: Brand) => void
  toggleBrand: () => void
  heroMark: HeroMark
  setHeroMark: (mark: HeroMark) => void
}

const BrandContext = createContext<BrandContextValue | null>(null)

function readStoredBrand(): Brand {
  if (typeof document !== 'undefined') {
    // L'attribut est posé avant le paint par le script no-flash (root shell).
    const fromAttr = document.documentElement.dataset.brand
    if (isBrand(fromAttr)) return fromAttr
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(BRAND_STORAGE_KEY)
      if (isBrand(stored)) return stored
    } catch {
      /* localStorage indisponible (mode privé strict) — on garde le défaut */
    }
  }
  return DEFAULT_BRAND
}

function readStoredHeroMark(): HeroMark {
  if (typeof document !== 'undefined') {
    // L'attribut est posé avant le paint par le script no-flash (root shell).
    const fromAttr = document.documentElement.dataset.heroMark
    if (isHeroMark(fromAttr)) return fromAttr
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(HERO_MARK_STORAGE_KEY)
      if (isHeroMark(stored)) return stored
    } catch {
      /* localStorage indisponible (mode privé strict) — on garde le défaut */
    }
  }
  return DEFAULT_HERO_MARK
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(DEFAULT_BRAND)
  const [heroMark, setHeroMarkState] = useState<HeroMark>(DEFAULT_HERO_MARK)

  // Sync initial après hydratation (le SSR ne connaît pas le choix visiteur).
  useEffect(() => {
    setBrandState(readStoredBrand())
    setHeroMarkState(readStoredHeroMark())
  }, [])

  const setBrand = useCallback((next: Brand) => {
    setBrandState(next)
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.brand = next
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(BRAND_STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
    }
  }, [])

  const setHeroMark = useCallback((next: HeroMark) => {
    setHeroMarkState(next)
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.heroMark = next
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(HERO_MARK_STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
    }
  }, [])

  // Parcourt la palette dans l'ordre (utilitaire ; l'UI principale est la
  // rangée de pastilles de BrandToggle).
  const toggleBrand = useCallback(() => {
    const idx = BRANDS.indexOf(brand)
    const next = BRANDS[(idx + 1) % BRANDS.length]
    setBrand(next)
  }, [brand, setBrand])

  return (
    <BrandContext.Provider
      value={{ brand, setBrand, toggleBrand, heroMark, setHeroMark }}
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
