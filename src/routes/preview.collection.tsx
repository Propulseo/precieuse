import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { devOnly } from '../lib/dev-only'
import { CollectionGemmyo } from '../components/collection-variants/CollectionGemmyo'
import { CollectionDamier } from '../components/collection-variants/CollectionDamier'

const VARIANTS = [
  { id: 'actuel', label: 'Damier (actuel)', Component: CollectionGemmyo },
  { id: 'rythme', label: 'Damier rythmé', Component: CollectionDamier },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

export const Route = createFileRoute('/preview/collection')({
  component: CollectionPreview,
  beforeLoad: devOnly,
})

function CollectionPreview() {
  const [active, setActive] = useState<VariantId>('actuel')
  const ActiveComponent =
    VARIANTS.find((v) => v.id === active)?.Component ?? CollectionGemmyo

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-canard/15 bg-poudre/95 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-3">
          <span className="mr-2 font-display italic text-[11px] uppercase tracking-[0.3em] text-canard/55">
            Preview Collection —
          </span>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(v.id)}
              aria-pressed={active === v.id}
              className={`rounded-full px-4 py-1.5 font-display italic text-[12px] tracking-wider transition-colors ${
                active === v.id
                  ? 'bg-canard text-poudre'
                  : 'border border-canard/30 text-canard hover:bg-canard/5'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </header>

      <ActiveComponent />
    </div>
  )
}
