import { Link } from '@tanstack/react-router'
import { Reveal } from '../Reveal'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import type { BespokePageData } from '../../lib/content/bespoke'

/**
 * Section L'atelier / Emeline — déclaration + galerie 3 images (deux portraits
 * décalés + une bande) avec un médaillon circulaire tournant (texte sur cercle,
 * picto poudre). Spin figé en reduced-motion. `overflow-hidden` clippe le débord
 * du médaillon (pas de scroll horizontal). Contenu piloté par Sanity.
 */
export function BespokeAtelier({
  atelier,
}: {
  atelier: BespokePageData['atelier']
}) {
  const [a0, a1, a2] = atelier.images
  return (
    <section className="overflow-hidden px-8 pb-[68px] pt-16 lg:px-14">
      <div className="grid grid-cols-1 items-center gap-[clamp(40px,6vw,80px)] md:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <div>
            <h2 className="max-w-[15ch] font-display text-[clamp(30px,4vw,54px)] font-normal leading-[1.06]">
              {atelier.titleLead}{' '}
              <i className="text-framboise">{atelier.titleAccent}</i>{' '}
              {atelier.titleTail}
            </h2>
            <p className="my-6 mb-7 max-w-[46ch] font-body text-[17px] font-light leading-[1.7] text-canard">
              {atelier.body}
            </p>
            <Link
              to="/creatrice"
              className="group inline-flex items-center gap-[7px] border-b border-framboise pb-[3px] font-display text-[14px] tracking-[0.04em] text-canard transition-colors duration-300 hover:text-framboise focus-visible:[outline:2px_solid_var(--framboise)] focus-visible:[outline-offset:3px]"
            >
              {atelier.link}
              <span className="transition-transform duration-300 group-hover:translate-x-[5px]">›</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative grid grid-cols-2 grid-rows-[auto_auto] gap-4">
            {a0 && (
              <div className="overflow-hidden border border-canard/15 aspect-[3/4]">
                <img
                  className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
                  src={a0.src}
                  alt={a0.alt}
                  style={a0.position ? { objectPosition: a0.position } : undefined}
                  loading="lazy"
                />
              </div>
            )}
            {a1 && (
              <div className="mt-[38px] overflow-hidden border border-canard/15 aspect-[3/4] max-md:mt-0">
                <img
                  className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
                  src={a1.src}
                  alt={a1.alt}
                  style={a1.position ? { objectPosition: a1.position } : undefined}
                  loading="lazy"
                />
              </div>
            )}
            {a2 && (
              <div className="col-span-2 overflow-hidden border border-canard/15 aspect-[16/9]">
                <img
                  className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
                  src={a2.src}
                  alt={a2.alt}
                  style={a2.position ? { objectPosition: a2.position } : undefined}
                  loading="lazy"
                />
              </div>
            )}

            {/* Médaillon tournant */}
            <div
              aria-hidden="true"
              className="sm-badge absolute bottom-6 left-[-26px] z-[3] flex h-[124px] w-[124px] items-center justify-center max-md:bottom-[14px] max-md:left-auto max-md:right-[14px] max-md:h-[104px] max-md:w-[104px]"
            >
              <style>{`
                @keyframes sm-spin { to { transform: rotate(360deg) } }
                .sm-badge svg { transform-origin: center; animation: sm-spin 26s linear infinite; }
                @media (prefers-reduced-motion: reduce) { .sm-badge svg { animation: none; } }
              `}</style>
              <span className="absolute inset-0 rounded-full bg-framboise" />
              <svg viewBox="0 0 124 124" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <path id="sm-badge-circ" d="M62,62 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text className="fill-poudre font-display text-[9.2px] uppercase tracking-[0.26em]">
                  <textPath href="#sm-badge-circ" startOffset="0">{atelier.badge}</textPath>
                </text>
              </svg>
              <span
                className="relative z-[1] h-10 w-10"
                style={maskStyle(BRAND_PICTO_MASK, 'var(--poudre)')}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
