import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FooterA } from '../components/footer-variants/FooterA'
import { FooterB } from '../components/footer-variants/FooterB'
import { FooterC } from '../components/footer-variants/FooterC'
import { FooterD } from '../components/footer-variants/FooterD'
import { FooterE } from '../components/footer-variants/FooterE'

const VARIANTS = [
  { id: 'A', label: 'Une ligne pure', Component: FooterA },
  { id: 'B', label: 'Deux lignes ordonnées', Component: FooterB },
  { id: 'C', label: 'Centré symétrique', Component: FooterC },
  { id: 'D', label: 'Asymétrique éditorial', Component: FooterD },
  { id: 'E', label: 'Grille 4 colonnes', Component: FooterE },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

export const Route = createFileRoute('/preview/footer')({ component: FooterPreview })

function FooterPreview() {
  const [active, setActive] = useState<VariantId>('A')
  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.Component ?? FooterA

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/15 px-6 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center gap-3 flex-wrap">
          <span className="font-display italic text-[11px] text-ink/55 tracking-[0.3em] uppercase mr-2">
            Preview Footer —
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
              {v.id} — {v.label}
            </button>
          ))}
        </div>
      </header>

      {/* Stub minimal pour donner le contexte "fin de page" */}
      <main className="flex-1 bg-cream px-6 lg:px-16 py-24 flex items-center justify-center">
        <div className="text-center max-w-md">
          <span className="font-display italic text-[11px] tracking-[0.4em] uppercase text-ink/40">
            Contexte : fin de page
          </span>
          <p className="mt-4 font-display italic text-[18px] text-ink/55">
            Le footer ci-dessous arrive juste après la dernière section de la home (Newsletter).
          </p>
        </div>
      </main>

      <ActiveComponent />
    </div>
  )
}
