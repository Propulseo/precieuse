import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { LoaderA } from '../components/loader-variants/LoaderA'
import { LoaderB } from '../components/loader-variants/LoaderB'
import { LoaderC } from '../components/loader-variants/LoaderC'
import { LoaderD } from '../components/loader-variants/LoaderD'
import { LoaderE } from '../components/loader-variants/LoaderE'

const VARIANTS = [
  { id: 'A', label: 'Fil d’or horizontal', Component: LoaderA },
  { id: 'B', label: 'Compteur romain + underline', Component: LoaderB },
  { id: 'C', label: 'Chapelet de perles', Component: LoaderC },
  { id: 'D', label: 'Anneau circulaire', Component: LoaderD },
  { id: 'E', label: 'Bande verticale', Component: LoaderE },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

const INTERVAL_MS = 7000
const TOTAL = 5

export const Route = createFileRoute('/preview/loaders')({ component: LoaderPreview })

function LoaderPreview() {
  const [active, setActive] = useState<VariantId>('A')
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.Component ?? LoaderA

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TOTAL)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [paused])

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/15 px-6 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center gap-3 flex-wrap">
          <span className="font-display italic text-[11px] text-ink/55 tracking-[0.3em] uppercase mr-2">
            Preview Loader —
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

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="px-4 py-1.5 rounded-full text-[12px] font-display italic tracking-wider border border-ink/30 text-ink hover:bg-ink/5 transition-colors"
            >
              {paused ? '▶ Reprendre' : '❚❚ Pause'}
            </button>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % TOTAL)}
              className="px-4 py-1.5 rounded-full text-[12px] font-display italic tracking-wider bg-raspberry text-cream hover:bg-ink transition-colors"
            >
              ▶ Suivant
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-16 py-16">
        <div className="mx-auto max-w-[860px]">
          <div className="flex justify-center mb-6">
            <ActiveComponent current={current} total={TOTAL} />
          </div>

          <div className="relative aspect-[16/9] bg-ink/5 border border-ink/10 rounded-sm flex items-center justify-center">
            <div className="text-center">
              <span className="font-display italic text-[10px] tracking-[0.4em] uppercase text-ink/40 block">
                Placeholder image
              </span>
              <p className="mt-3 font-display italic text-[clamp(32px,4vw,48px)] text-ink/30 leading-none">
                Pièce {current + 1} / {TOTAL}
              </p>
            </div>
          </div>

          <p className="mt-8 text-center font-display italic text-[13px] text-ink/55 max-w-md mx-auto">
            Le loader s'anime en {INTERVAL_MS / 1000}s puis se réinitialise à chaque transition. Clique « ▶ Suivant » pour forcer une transition, « ❚❚ Pause » pour observer un état.
          </p>
        </div>
      </main>
    </div>
  )
}
