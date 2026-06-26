import { createFileRoute } from '@tanstack/react-router'
import { devOnly } from '../lib/dev-only'
import { useState } from 'react'
import { LeadCaptureA } from '../components/leadcapture-variants/LeadCaptureA'
import { LeadCaptureB } from '../components/leadcapture-variants/LeadCaptureB'
import { LeadCaptureC } from '../components/leadcapture-variants/LeadCaptureC'
import { LeadCaptureD } from '../components/leadcapture-variants/LeadCaptureD'
import { LeadCaptureE } from '../components/leadcapture-variants/LeadCaptureE'

const VARIANTS = [
  { id: 'A', label: 'Formulaire classique', Component: LeadCaptureA },
  { id: 'B', label: 'Éditorial deux colonnes', Component: LeadCaptureB },
  { id: 'C', label: 'Minimal one-liner', Component: LeadCaptureC },
  { id: 'D', label: 'Mosaïque floutée', Component: LeadCaptureD },
  { id: 'E', label: 'Storytelling éditorial', Component: LeadCaptureE },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

export const Route = createFileRoute('/preview/leadcapture')({ component: LeadCapturePreview, beforeLoad: devOnly })

function LeadCapturePreview() {
  const [active, setActive] = useState<VariantId>('A')
  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.Component ?? LeadCaptureA

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/15 px-6 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center gap-3 flex-wrap">
          <span className="font-display italic text-[11px] text-ink/55 tracking-[0.3em] uppercase mr-2">
            Preview Lead Capture
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
