import { Link } from '@tanstack/react-router'
import { HeroBackgroundAnimated, type HeroAnim } from './HeroBackgroundAnimated'

type Props = { anim: HeroAnim }

export function HeroV7Animated({ anim }: Props) {
  return (
    <HeroBackgroundAnimated anim={anim}>
      <div className="relative z-10 flex-1 flex items-end justify-center px-4 lg:px-12 pb-[12vh]">
        <div className="relative w-full motion-safe:animate-[glassRise_1.6s_cubic-bezier(0.2,0.8,0.2,1)_120ms_both] flex flex-col items-center gap-10">
          <h1
            aria-label="Précieuse, joaillerie artisanale, Lisboa"
            className="font-display italic select-none text-center w-full"
            style={{
              fontSize: 'clamp(40px, 7vw, 110px)',
              letterSpacing: 'clamp(0.18em, 1.2vw, 0.42em)',
              color: '#fff8e6',
              textShadow:
                '0 1px 0 rgba(255,255,255,0.40), 0 0 28px rgba(255,225,170,0.45), 0 4px 18px rgba(20,10,4,0.85)',
              lineHeight: 1,
            }}
          >
            Précieuse
          </h1>

          <div className="flex items-center gap-6 motion-safe:animate-[fadeUp_1.4s_ease-out_700ms_both]">
            <span className="block h-px w-12 bg-gold-pale/60" aria-hidden="true" />
            <span className="font-technical text-gold-pale/90">
              Lisboa · MMXXVI · I
            </span>
            <span className="block h-px w-12 bg-gold-pale/60" aria-hidden="true" />
          </div>

          <Link
            to="/carnet"
            className="group font-display italic inline-flex items-center gap-3 text-[15px] lg:text-[17px] text-[#fff7e3] px-7 py-3 border border-gold-pale/65 backdrop-blur-[6px] bg-black/20 hover:bg-gold-pale hover:text-ink transition-all duration-300 motion-safe:animate-[fadeUp_1.4s_ease-out_1000ms_both]"
          >
            <span>Pousser la porte</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <style>{`
          @keyframes glassRise { 0% { opacity: 0; transform: translateY(28px); filter: blur(10px); } 60% { opacity: 1; } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
          @keyframes fadeUp { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </HeroBackgroundAnimated>
  )
}
