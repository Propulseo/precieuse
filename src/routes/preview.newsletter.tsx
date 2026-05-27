import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useNewsletterTrigger } from '../lib/hooks/useNewsletterTrigger'
import { NewsletterA } from '../components/newsletter-variants/NewsletterA'
import { NewsletterB } from '../components/newsletter-variants/NewsletterB'
import { NewsletterC } from '../components/newsletter-variants/NewsletterC'
import { NewsletterD } from '../components/newsletter-variants/NewsletterD'
import { NewsletterE } from '../components/newsletter-variants/NewsletterE'

const VARIANTS = [
  { id: 'A', label: 'Modal centré', Component: NewsletterA },
  { id: 'B', label: 'Slide-in bas-droit', Component: NewsletterB },
  { id: 'C', label: 'Drawer latéral', Component: NewsletterC },
  { id: 'D', label: 'Split image/form', Component: NewsletterD },
  { id: 'E', label: 'Bandeau haut', Component: NewsletterE },
] as const

type VariantId = (typeof VARIANTS)[number]['id']

export const Route = createFileRoute('/preview/newsletter')({ component: NewsletterPreview })

function NewsletterPreview() {
  const [active, setActive] = useState<VariantId>('A')
  const ActiveComponent = VARIANTS.find((v) => v.id === active)?.Component ?? NewsletterA
  const trigger = useNewsletterTrigger()

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink/15 px-6 py-3">
        <div className="mx-auto max-w-[1240px] flex items-center gap-3 flex-wrap">
          <span className="font-display italic text-[11px] text-ink/55 tracking-[0.3em] uppercase mr-2">
            Preview Newsletter —
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
              onClick={trigger.forceOpen}
              className="px-4 py-1.5 rounded-full text-[12px] font-display italic tracking-wider bg-raspberry text-cream hover:bg-ink transition-colors"
            >
              ▶ Déclencher
            </button>
            <button
              type="button"
              onClick={trigger.reset}
              className="px-4 py-1.5 rounded-full text-[12px] font-display italic tracking-wider border border-ink/30 text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors"
              title="Vider le localStorage et refermer"
            >
              ↻ Reset
            </button>
          </div>
        </div>
      </header>

      {/* Stub long pour permettre le test du trigger 50% scroll naturellement */}
      <main className="px-6 lg:px-16 py-16 space-y-16">
        <section className="mx-auto max-w-[760px] text-center">
          <span className="font-display italic text-[11px] tracking-[0.4em] uppercase text-ink/40">
            Contexte de page
          </span>
          <h1 className="mt-4 font-display italic text-[clamp(36px,5vw,56px)] leading-[1.05] text-ink">
            Faites défiler pour déclencher le pop-up à 50%,
            <br />
            ou utilisez « ▶ Déclencher » en haut.
          </h1>
          <p className="mt-6 font-display italic text-[16px] text-ink/65 max-w-md mx-auto">
            « ↻ Reset » vide le localStorage pour pouvoir retester (le pop-up se cache 7 jours après fermeture, à jamais après soumission).
          </p>
        </section>

        {[1, 2, 3, 4].map((i) => (
          <section key={i} className="mx-auto max-w-[760px] py-16">
            <span className="font-display italic text-[10px] tracking-[0.4em] uppercase text-ink/35">
              Section placeholder {i}
            </span>
            <p className="mt-3 font-display italic text-[18px] text-ink/55 leading-relaxed">
              Contenu factice pour donner de la hauteur à la page et tester le déclencheur au scroll. Aucune des sections de la home n'est rendue ici — c'est uniquement un environnement de test du pop-up.
            </p>
          </section>
        ))}
      </main>

      <ActiveComponent
        isOpen={trigger.isOpen}
        onClose={trigger.close}
        onSubmit={trigger.submit}
      />
    </div>
  )
}
