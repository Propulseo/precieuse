import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { Reveal } from '../Reveal'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'

/**
 * Section L'atelier / Emeline — déclaration + galerie 3 images (deux portraits
 * décalés + une bande) avec un médaillon circulaire tournant (texte sur cercle,
 * picto poudre). Spin figé en reduced-motion. `overflow-hidden` clippe le débord
 * du médaillon (pas de scroll horizontal).
 */
export function BespokeAtelier() {
  return (
    <section className="overflow-hidden px-[8vw] pb-[68px] pt-16">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-[clamp(40px,6vw,80px)] md:grid-cols-[1.05fr_.95fr]">
        <Reveal>
          <div>
            <h2 className="max-w-[15ch] font-display text-[clamp(30px,4vw,54px)] font-normal leading-[1.06]">
              {m.sm_about_title_lead()}{' '}
              <i className="text-framboise">{m.sm_about_title_accent()}</i>{' '}
              {m.sm_about_title_tail()}
            </h2>
            <p className="my-6 mb-7 max-w-[46ch] font-body text-[17px] font-light leading-[1.7] text-canard">
              {m.sm_about_body()}
            </p>
            <Link
              to="/creatrice"
              className="group inline-flex items-center gap-[7px] border-b border-framboise pb-[3px] font-display text-[14px] tracking-[0.04em] text-canard transition-colors duration-300 hover:text-framboise"
            >
              {m.sm_about_link()}
              <span className="transition-transform duration-300 group-hover:translate-x-[5px]">›</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative grid grid-cols-2 grid-rows-[auto_auto] gap-4">
            <div className="overflow-hidden border border-canard/15 aspect-[3/4]">
              <img
                className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
                src="/images/emeline/emeline-atelier.jpg"
                alt="Emeline à l'établi, dans son atelier de Bordeaux"
                loading="lazy"
              />
            </div>
            <div className="mt-[38px] overflow-hidden border border-canard/15 aspect-[3/4] md:mt-[38px] max-md:mt-0">
              <img
                className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
                src="/images/atelier/bague-en-fabrication.jpg"
                alt="Bague en cours de fabrication, fixée à l'étau"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 overflow-hidden border border-canard/15 aspect-[16/9]">
              <img
                className="h-full w-full object-cover transition-transform duration-[1s] hover:scale-[1.04]"
                src="/images/real/main-poche-josephine.webp"
                alt="Bague Joséphine portée, main glissée dans la poche"
                loading="lazy"
              />
            </div>

            {/* Médaillon tournant */}
            <div className="sm-badge absolute bottom-6 left-[-26px] z-[3] flex h-[124px] w-[124px] items-center justify-center max-md:bottom-[14px] max-md:left-auto max-md:right-[14px] max-md:h-[104px] max-md:w-[104px]">
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
                  <textPath href="#sm-badge-circ" startOffset="0">{m.sm_about_badge()}</textPath>
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
