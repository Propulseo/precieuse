import { useEffect, useRef, useState } from 'react'

/**
 * Etabli A — Pièces finies en lieu et place des étapes.
 * Structure scroll-sticky 4 étapes conservée, mais les images d'atelier
 * sont remplacées par des macros de bagues finies (style studio Gemmyo).
 */

type Step = {
  roman: string
  title: string
  annotation: string
  detail: string
  image: string
}

const STEPS: Step[] = [
  {
    roman: 'I',
    title: 'Le Trait',
    annotation: 'la première ligne, sur papier vélin',
    detail:
      'Tout part d\'une intention. Un trait, posé au crayon B, qui contient déjà la silhouette de la pièce à venir.',
    image: '/images/etabli/piece-01.png',
  },
  {
    roman: 'II',
    title: 'La Pierre',
    annotation: 'choisie une à une, sous loupe',
    detail:
      'La gemme dicte le rythme. Sa taille, sa lumière, ses inclusions guident la main qui dessine la monture autour d\'elle.',
    image: '/images/etabli/piece-02.png',
  },
  {
    roman: 'III',
    title: 'La Lumière',
    annotation: 'six semaines de fabrication',
    detail:
      'Fonte, sertissage, polissage. Chaque étape ajoute de la lumière. Rien n\'est laissé au hasard : la main reprend chaque arête.',
    image: '/images/etabli/piece-03.png',
  },
  {
    roman: 'IV',
    title: 'La Pièce',
    annotation: 'elle vous attend',
    detail:
      'L\'or 18 carats prend sa forme finale. Ce qui sort de l\'atelier est unique, ne ressemble à rien d\'autre, et vient à vous.',
    image: '/images/bijoux-officiels/aurore.jpg',
  },
]

export function EtabliPiecesFinies() {
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
      <header className="relative px-8 lg:px-16 pt-24 pb-16">
        <div className="mx-auto max-w-[1440px]">
          <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3">
            CHAPITRE VII · L'ATELIER
          </span>
          <h2 className="font-headline text-[56px] text-ink leading-[0.95]">À l'établi.</h2>
        </div>
      </header>

      <div className="relative">
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24">
          {/* Image sticky desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-12 h-[80vh] w-full">
              <div className="relative w-full h-full overflow-hidden bg-ivory">
                {STEPS.map((s, idx) => (
                  <div
                    key={s.roman}
                    aria-hidden={active !== idx}
                    className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
                    style={{ opacity: active === idx ? 1 : 0 }}
                  >
                    <img
                      src={s.image}
                      alt={`Pièce ${s.roman}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent flex items-baseline justify-between text-cream">
                  <span className="font-script text-[18px]">
                    {step.annotation}
                  </span>
                  <span className="font-display italic text-[13px] tracking-widest text-gold">
                    {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
                  </span>
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
                  key={s.roman}
                  ref={(el) => {
                    stepRefs.current[idx] = el
                  }}
                  data-idx={idx}
                  data-active={isActive}
                  className="group min-h-[85vh] flex flex-col justify-center py-16"
                >
                  <div className="lg:hidden relative w-full aspect-[4/5] mb-8 overflow-hidden bg-ivory">
                    <img src={s.image} alt={`Pièce ${s.roman}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>

                  <div className="space-y-7 transition-[opacity,transform] duration-700 ease-out group-data-[active=false]:opacity-50 group-data-[active=false]:translate-y-2">
                    <div className="flex items-center gap-3">
                      <span className="block w-10 h-px bg-gold" />
                      <span className="font-display italic text-[12px] tracking-[0.35em] text-gold">
                        FRAGMENT {s.roman}
                      </span>
                    </div>

                    <h3 className="font-headline text-[56px] text-ink leading-[0.98]">{s.title}.</h3>

                    <p className="font-script text-[24px] text-raspberry leading-relaxed">{s.annotation}</p>

                    <p className="font-display italic text-[18px] text-ink/75 leading-loose max-w-[480px] pt-4">
                      {s.detail}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-16 pt-12 pb-24 relative">
        <div className="mx-auto max-w-[1440px] flex justify-between items-end pt-8 border-t border-gold/15">
          <span className="font-script text-[17px] italic text-raspberry">
            quatre étapes, pas une de moins
          </span>
          <span className="font-display italic text-[13px] text-gold">p. 07</span>
        </div>
      </div>
    </section>
  )
}
