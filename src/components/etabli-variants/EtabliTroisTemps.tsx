import { useEffect, useRef, useState } from 'react'

/**
 * Etabli B — 3 temps au lieu de 4 (simplification).
 * Le Dessin → La Fabrication → La Pièce. Pile poil 3 nouvelles photos.
 */

type Step = {
  numeral: string
  title: string
  annotation: string
  detail: string
  image: string
}

const STEPS: Step[] = [
  {
    numeral: 'I',
    title: 'Le Dessin',
    annotation: 'crayon B, papier vélin',
    detail:
      'Avant l\'or, il y a le trait. Au crayon B, sur un papier qui garde la mémoire des hésitations. C\'est là que la pièce existe pour la première fois.',
    image: '/images/etabli/piece-01.png',
  },
  {
    numeral: 'II',
    title: 'La Fabrication',
    annotation: 'six semaines, à la main',
    detail:
      'Fonte à cire perdue, sertissage, polissage manuel. Chaque geste est ancien, chaque pièce sortie du moule est unique. À Bordeaux, dans notre atelier.',
    image: '/images/etabli/piece-02.png',
  },
  {
    numeral: 'III',
    title: 'La Pièce',
    annotation: 'or 18 carats, pierres naturelles',
    detail:
      'Ce qui sort de l\'atelier est ce que vous porterez : aucun stock, aucune copie. Une bague vous attend, une seule, façonnée pour vous.',
    image: '/images/etabli/piece-03.png',
  },
]

export function EtabliTroisTemps() {
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

  const step = STEPS[active]
  if (!step) return null

  return (
    <section className="relative bg-cream">
      <header className="relative px-8 lg:px-16 pt-24 pb-12">
        <div className="mx-auto max-w-[1440px] text-center">
          <span className="font-display italic text-[12px] tracking-[0.45em] text-gold block mb-4">
            L'ATELIER
          </span>
          <h2 className="font-headline text-[clamp(48px,6vw,80px)] text-ink leading-[0.95]">
            Trois temps.
          </h2>
          <p className="font-script text-[22px] text-raspberry mt-5">
            du dessin à la bague portée
          </p>
        </div>
      </header>

      <div className="relative">
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image sticky desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-12 h-[80vh] w-full">
              <div className="relative w-full h-full overflow-hidden bg-ivory">
                {STEPS.map((s, idx) => (
                  <div
                    key={s.numeral}
                    aria-hidden={active !== idx}
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
                    style={{ opacity: active === idx ? 1 : 0 }}
                  >
                    <img
                      src={s.image}
                      alt={`Étape ${s.numeral}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
                {/* Numérotation latérale */}
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                  {STEPS.map((s, idx) => (
                    <span
                      key={s.numeral}
                      className={`font-display italic tracking-[0.3em] transition-colors duration-500 ${
                        idx === active ? 'text-gold text-[14px]' : 'text-cream/50 text-[12px]'
                      }`}
                    >
                      {s.numeral}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent text-cream">
                  <span className="font-script text-[18px]">{step.annotation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Textes scrollés */}
          <div>
            {STEPS.map((s, idx) => {
              const isActive = active === idx
              return (
                <div
                  key={s.numeral}
                  ref={(el) => {
                    stepRefs.current[idx] = el
                  }}
                  data-idx={idx}
                  data-active={isActive}
                  className="group min-h-[80vh] flex flex-col justify-center py-14"
                >
                  <div className="lg:hidden relative w-full aspect-[4/5] mb-8 overflow-hidden bg-ivory">
                    <img src={s.image} alt={`Étape ${s.numeral}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <div className="space-y-7 transition-[opacity,transform] duration-700 ease-out group-data-[active=false]:opacity-45 group-data-[active=false]:translate-y-2">
                    <span className="font-display italic text-[12px] tracking-[0.45em] text-gold block">
                      TEMPS {s.numeral}
                    </span>

                    <h3 className="font-headline text-[clamp(40px,4vw,60px)] text-ink leading-[0.98]">
                      {s.title}.
                    </h3>

                    <p className="font-script text-[24px] text-raspberry leading-relaxed">
                      {s.annotation}
                    </p>

                    <p className="font-display italic text-[18px] text-ink/75 leading-[1.75] max-w-[480px] pt-3">
                      {s.detail}
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
