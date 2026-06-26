import { createFileRoute } from '@tanstack/react-router'
import { devOnly } from '../lib/dev-only'
import { useState } from 'react'
import { ContactA } from '../components/contact-variants/ContactA'
import { ContactB } from '../components/contact-variants/ContactB'
import { ContactC } from '../components/contact-variants/ContactC'
import { ContactD } from '../components/contact-variants/ContactD'
import { ContactE } from '../components/contact-variants/ContactE'

const VARIANTS = [
  { id: 'A', label: 'Éditorial magazine', Component: ContactA },
  { id: 'B', label: 'Split visuel', Component: ContactB },
  { id: 'C', label: 'Section sombre', Component: ContactC },
  { id: 'D', label: 'Bento grid', Component: ContactD },
  { id: 'E', label: 'Carte centrée', Component: ContactE },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

export const Route = createFileRoute('/preview/contact')({ component: ContactPreview, beforeLoad: devOnly })

function ContactPreview() {
  const [active, setActive] = useState<VariantId>('A')
  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.Component ?? ContactA

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/15 px-6 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center gap-3 flex-wrap">
          <span className="font-display italic text-[11px] text-ink/55 tracking-[0.3em] uppercase mr-2">
            Preview Contact —
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

      <ActiveComponent />
    </div>
  )
}
