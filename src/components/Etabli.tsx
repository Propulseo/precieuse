import { useEffect, useRef, useState } from 'react'
import { m } from '#/paraglide/messages'
import { ETABLI_STEPS, type EtabliStep } from '../lib/content/etabli'

const SIGNATURES = [
  { day: () => m.etabli_day_monday(), time: '11h32', glyph: '♦' },
  { day: () => m.etabli_day_tuesday(), time: '14h08', glyph: '※' },
  { day: () => m.etabli_day_wednesday(), time: '16h45', glyph: '✦' },
  { day: () => m.etabli_day_thursday(), time: '18h20', glyph: '❖' },
]

const ROMAN_PATHS: Record<string, string> = {
  I: 'M50 20 L50 180',
  II: 'M30 20 L30 180 M70 20 L70 180',
  III: 'M20 20 L20 180 M50 20 L50 180 M80 20 L80 180',
  IV: 'M20 20 L20 180 M40 20 L80 180',
}

function BrushUnderline() {
  return (
    <svg aria-hidden viewBox="0 0 320 14" className="absolute -bottom-2 left-0 w-full h-3 text-rouille/60">
      <path d="M2 8 C 60 2, 120 12, 200 6 S 280 10, 318 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function RomanTrace({ roman, drawn }: { roman: string; drawn: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 100 200" className="w-full h-full text-canard/80">
      <path
        d={ROMAN_PATHS[roman] || ROMAN_PATHS.I}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={drawn ? 0 : 1}
        className="transition-[stroke-dashoffset] duration-[1400ms] ease-out"
      />
    </svg>
  )
}

export function Etabli({ steps = ETABLI_STEPS }: { steps?: EtabliStep[] }) {
  const [active, setActive] = useState(0)
  const [drawnSet, setDrawnSet] = useState<Set<number>>(new Set([0]))
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'))
            setActive(idx)
            setDrawnSet((prev) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const step = steps[active]
  const sig = SIGNATURES[active]
  if (!step || !sig) return null

  return (
    <section className="relative bg-poudre">
      <header className="relative px-8 lg:px-16 pt-24 pb-16">
        <div className="mx-auto max-w-[1440px] flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="font-display text-[12px] tracking-[0.35em] text-canard block mb-3">
              {m.etabli_overline()}
            </span>
            <h2 className="font-headline text-[56px] text-canard leading-[0.95]">{m.etabli_title()}</h2>
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
                    <img src={s.image} alt={s.imageAlt} className="absolute inset-0 w-full h-full object-cover scale-[1.03]" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />
                <div className="absolute top-10 left-10 w-24 h-48">
                  <RomanTrace roman={step.roman} drawn={drawnSet.has(active)} />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-poudre via-poudre/60 to-transparent flex items-baseline justify-between">
                  <span className="font-body italic font-light text-[18px] text-canard-90">
                    {m.etabli_photo_caption()} · {sig.day()} {sig.time}
                  </span>
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
              const sg = SIGNATURES[idx]
              if (!sg) return null
              return (
                <div
                  key={s.roman}
                  ref={(el) => {
                    stepRefs.current[idx] = el
                  }}
                  data-idx={idx}
                  data-active={isActive}
                  className="group min-h-[85vh] flex flex-col justify-center py-16 relative"
                >
                  <div className="lg:hidden relative w-full aspect-[4/5] mb-8 overflow-hidden">
                    <img src={s.image} alt={s.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <div className="space-y-7 transition-[opacity,transform] duration-700 ease-out group-data-[active=false]:opacity-50 group-data-[active=false]:translate-y-2">
                    <div className="flex items-center gap-3">
                      <span className="block w-10 h-px bg-canard" />
                      <span className="font-display text-[12px] tracking-[0.35em] text-canard">
                        {m.etabli_fragment_label({ roman: s.roman })}
                      </span>
                    </div>

                    <h3 className="font-headline text-[56px] text-canard leading-[0.98]">{s.title}.</h3>

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

                    <div className="flex items-end justify-between pt-6 max-w-[480px] border-t border-canard/20">
                      <span className="font-body italic font-light text-[18px] text-canard-90/80">
                        É. R., {sg.day()} {sg.time}
                      </span>
                      <span aria-hidden className="font-display text-[28px] text-violet/40 leading-none">
                        {sg.glyph}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-16 pt-12 pb-24 relative">
        <div className="mx-auto max-w-[1440px] flex justify-between items-end pt-8 border-t border-canard/15">
          <span className="font-body italic font-light text-[17px] text-canard-90">
            {m.etabli_footer_note()}
          </span>
          <span className="font-display text-[13px] text-canard">p. 07</span>
        </div>
      </div>
    </section>
  )
}
