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
  isBrand,
  type Brand,
} from './brand'

type BrandContextValue = {
  brand: Brand
  setBrand: (brand: Brand) => void
  toggleBrand: () => void
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

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(DEFAULT_BRAND)

  // Sync initial après hydratation (le SSR ne connaît pas le choix visiteur).
  useEffect(() => {
    setBrandState(readStoredBrand())
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

  const toggleBrand = useCallback(() => {
    setBrand(brand === 'teal' ? 'blush' : 'teal')
  }, [brand, setBrand])

  return (
    <BrandContext.Provider value={{ brand, setBrand, toggleBrand }}>
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
