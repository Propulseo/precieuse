import { useEffect, useRef, useState } from 'react'
import { m } from '#/paraglide/messages'
import { Eyebrow } from './Eyebrow'
import { Filigrane } from './Filigrane'
import { ETABLI_STEPS } from '../lib/content/etabli'
import type { EtabliStep } from '../lib/content/etabli'
import { objectPositionStyle } from './framing/framing'

function BrushUnderline() {
  return (
    <svg aria-hidden viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full h-3 text-rouille/60">
      <path d="M2 8 C 60 2, 120 12, 200 6 S 280 10, 318 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Etabli({ steps = ETABLI_STEPS }: { steps?: EtabliStep[] }) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'))
            setActive(idx)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const step = steps[active]
  if (!step) return null

  return (
    <section className="relative bg-poudre">
      <header className="relative px-8 lg:px-16 pt-12 pb-8">
        <div className="relative mx-auto max-w-[1440px] flex items-end justify-between flex-wrap gap-6">
          {/* Fleur de la marque en filigrane : habille le vide à droite du titre */}
          <Filigrane
            flip
            className="hidden lg:block top-[-30px] right-[40px] h-[420px] w-[420px] opacity-[0.08]"
          />
          <div className="relative z-10">
            <Eyebrow className="mb-3">{m.etabli_overline()}</Eyebrow>
            <h2 className="font-headline text-[clamp(32px,6vw,56px)] text-canard leading-[0.95]">{m.etabli_title()}</h2>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24">
          {/* Image sticky desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-12 h-[80vh] w-full">
              <div className="relative w-full h-full overflow-hidden">
                {steps.map((s, idx) => (
                  <div
                    key={s.roman}
                    aria-hidden={active !== idx}
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
                    style={{ opacity: active === idx ? 1 : 0 }}
                  >
                    <img src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" style={objectPositionStyle(s.imagePosition)} className="absolute inset-0 w-full h-full object-cover scale-[1.03]" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-poudre via-poudre/60 to-transparent flex items-baseline justify-end">
                  <span className="font-display text-[13px] tracking-widest text-canard">
                    {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Textes scrollés */}
          <div>
            {steps.map((s, idx) => {
              const isActive = active === idx
              const detailFirst = s.detail.charAt(0)
              const detailRest = s.detail.slice(1)
              return (
                <div
                  key={s.roman}
                  ref={(el) => {
                    stepRefs.current[idx] = el
                  }}
                  data-idx={idx}
                  data-active={isActive}
                  className="group min-h-[60vh] flex flex-col justify-center py-8 relative"
                >
                  <div className="lg:hidden relative w-full aspect-[4/5] mb-8 overflow-hidden">
                    <img src={s.image} alt={s.imageAlt} loading="lazy" decoding="async" style={objectPositionStyle(s.imagePosition)} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <div className="space-y-7 transition-[opacity,transform] duration-700 ease-out group-data-[active=false]:opacity-50 group-data-[active=false]:translate-y-2">
                    <div className="flex items-center gap-3">
                      <span className="block w-10 h-px bg-canard" />
                      <span className="font-display text-[12px] tracking-[0.35em] text-framboise">
                        {m.etabli_fragment_label({ roman: s.roman })}
                      </span>
                    </div>

                    <h3 className="font-headline text-[clamp(34px,7vw,56px)] text-canard leading-[0.98]">{s.title}.</h3>

                    <div className="relative inline-block w-full">
                      <p className="font-body italic font-light text-[24px] text-canard-90 leading-relaxed">{s.annotation}</p>
                      <BrushUnderline />
                    </div>

                    <p className="font-display text-[18px] text-canard/75 leading-loose max-w-[480px] pt-4">
                      <span className="font-display float-left mr-3 mt-2 text-[72px] leading-[0.8] text-canard">
                        {detailFirst}
                      </span>
                      {detailRest}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </section>
  )
}
