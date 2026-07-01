import { useEffect, useRef, useState } from 'react'
import { m } from '#/paraglide/messages'
import { slugifyHeading } from './blocks'

/**
 * Sommaire éditorial : entrées numérotées + suivi de lecture où un marqueur
 * framboise **coulisse** le long du filet jusqu'au chapitre courant (dernier
 * titre dont le haut a dépassé la barre de lecture). Glissement throttlé (rAF),
 * sobre, neutralisé sous `prefers-reduced-motion`.
 */
export function Sommaire({
  headings,
  readTime,
}: {
  headings: { text: string }[]
  readTime: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [marker, setMarker] = useState({ top: 0, height: 0 })
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const depKey = headings.map((h) => h.text).join('|')

  // Scroll-spy → index du chapitre courant.
  useEffect(() => {
    const ids = headings.map((h) => slugifyHeading(h.text))
    if (ids.length === 0) return

    let frame = 0
    const compute = () => {
      frame = 0
      let current = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = i
      })
      setActiveIndex(current)
    }
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
    // depKey sérialise headings (recalculé à chaque rendu sinon).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depKey])

  // Mesure la position de l'étape active → le marqueur y glisse (transition CSS).
  // Recalcule aussi au resize (les hauteurs de titres changent).
  useEffect(() => {
    const place = () => {
      const el = itemRefs.current[activeIndex]
      if (el) setMarker({ top: el.offsetTop, height: el.offsetHeight })
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [activeIndex, depKey])

  if (headings.length === 0) return null

  return (
    <div>
      <div className="font-display text-[10px] uppercase tracking-[0.35em] text-framboise">
        {m.carnet_toc_label()}
      </div>
      <div className="mt-1.5 font-body text-[12px] font-light text-canard/45">
        {m.carnet_toc_chapters({ count: headings.length })} ·{' '}
        {m.carnet_read_time({ time: readTime })}
      </div>

      <ol className="relative mt-6 border-l border-canard/15">
        {/* Marqueur glissant : se déplace vers l'étape active. */}
        <span
          aria-hidden
          style={{ transform: `translateY(${marker.top}px)`, height: marker.height }}
          className="absolute -left-0.5 top-0 w-[3px] rounded-full bg-framboise transition-all duration-500 ease-out motion-reduce:transition-none"
        />
        {headings.map((h, i) => {
          const id = slugifyHeading(h.text)
          const isActive = i === activeIndex
          return (
            <li
              key={h.text}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
            >
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex gap-3 py-2 pl-4"
              >
                <span
                  className={`pt-0.5 font-display text-[12px] tabular-nums transition-colors duration-300 ${
                    isActive ? 'text-framboise' : 'text-canard/35'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-body text-[14px] leading-snug transition-colors duration-300 [text-wrap:pretty] ${
                    isActive
                      ? 'text-canard'
                      : 'text-canard/55 group-hover:text-framboise'
                  }`}
                >
                  {h.text}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
