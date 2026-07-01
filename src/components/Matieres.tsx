import { useEffect, useRef, useState } from 'react'
import { MATIERES, type Matiere } from '../lib/content/matieres'
import { objectPositionStyle } from './framing/framing'

/** Stagger delay between each card in ms */
const STAGGER_MS = 200

export function Matieres({
  matieres = MATIERES,
  header,
}: {
  matieres?: Matiere[]
  header: { title: string; subtitle: string; marginNote: string }
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // threshold 0 (et non 0.15) : sur mobile la section passe en une colonne
      // et devient plus haute que l'écran — un seuil de 15 % ne serait jamais
      // atteint, les cartes resteraient invisibles. Le rootMargin déclenche le
      // reveal dès que le haut de la section entre franchement dans l'écran.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-poudre py-10 sm:py-14">
      <div className="mx-auto mb-7 sm:mb-8 max-w-[1440px] px-6 sm:px-10 lg:px-16 flex items-end justify-between">
        <div>
          <h2 className="font-headline text-[48px] sm:text-[56px] lg:text-[64px] text-framboise leading-none mb-3">
            {header.title}
          </h2>
          <p className="font-body italic font-light text-[20px] sm:text-[22px] text-canard-90">
            {header.subtitle}
          </p>
        </div>
        <span className="font-body italic font-light text-[13px] text-canard-90/40 hidden md:block -rotate-[0.5deg]">
          {header.marginNote}
        </span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {matieres.map((mat, i) => (
          <article
            key={mat.slug}
            className="group flex h-full flex-col border-r border-b border-canard/10 last:border-r-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-60px)',
              transitionDelay: visible ? `${i * STAGGER_MS}ms` : '0ms',
            }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-canard-10">
              <img
                src={mat.image}
                alt={mat.image_alt}
                loading="lazy"
                decoding="async"
                style={objectPositionStyle(mat.imagePosition)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <span className="font-display text-[12px] text-poudre/85 absolute bottom-3 right-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                {mat.page}
              </span>
            </div>

            <div className="flex flex-col gap-3 p-6 lg:p-8 flex-1">
              <h3 className="font-display text-[30px] lg:text-[34px] text-canard leading-none">
                {mat.nom}
              </h3>
              <p className="font-body italic font-light text-[18px] text-framboise">{mat.sous_titre}</p>
              <p className="font-body text-[13px] font-light text-canard/80 leading-relaxed mt-1">
                {mat.description_courte}
              </p>
              <span className="font-body italic font-light text-[13px] text-canard-90/55 mt-auto pt-4 -rotate-[0.5deg]">
                {mat.annotation_caveat}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
