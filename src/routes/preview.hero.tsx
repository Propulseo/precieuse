import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { HeroSplitSezane } from '../components/hero-variants/HeroSplitSezane'
import { HeroSplitProduit } from '../components/hero-variants/HeroSplitProduit'
import { HeroTriptyqueGemmyo } from '../components/hero-variants/HeroTriptyqueGemmyo'
import { HeroPanneauCouleur } from '../components/hero-variants/HeroPanneauCouleur'

const VARIANTS = [
  { id: 'A', label: 'Split 50/50 (Sézane, avec portrait)', Component: HeroSplitSezane },
  { id: 'B', label: 'Split 50/50 (produit + ambiance)', Component: HeroSplitProduit },
  { id: 'C', label: 'Triptyque 3 panneaux (Gemmyo)', Component: HeroTriptyqueGemmyo },
  { id: 'D', label: 'Hybride image + panneau couleur', Component: HeroPanneauCouleur },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

export const Route = createFileRoute('/preview/hero')({ component: HeroPreview })

function HeroPreview() {
  const [active, setActive] = useState<VariantId>('A')
  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.Component ?? HeroSplitSezane

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/15 px-6 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center gap-3 flex-wrap">
          <span className="font-display italic text-[11px] text-ink/55 tracking-[0.3em] uppercase mr-2">
            Preview Hero
          </span>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(v.id)}
              aria-pressed={active === v.id}
              className={`px-4 py-1.5 rounded-full text-[12px] font-display italic tracking-wider transition-colors ${
                active === v.id
                  ? 'bg-ink text-cream'
                  : 'border border-ink/30 text-ink hover:bg-ink/5'
              }`}
            >
              {v.id} · {v.label}
            </button>
          ))}
        </div>
      </header>

      <ActiveComponent />
    </div>
  )
}
