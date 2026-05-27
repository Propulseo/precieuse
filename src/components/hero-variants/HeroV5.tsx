import { Link } from '@tanstack/react-router'
import { DecoCornerFrame } from '../ornaments'
import { HeroBackground } from './HeroBackground'

export function HeroV5() {
  return (
    <HeroBackground>
      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-8 lg:px-16 py-5 text-center border-b border-gold-pale/15">
        <span className="font-technical text-gold-pale/85 drop-shadow-md">
          Vitrine · MMXXVI · Lisboa
        </span>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 lg:px-12">
        <div className="relative w-full max-w-[1100px] mx-auto motion-safe:animate-[glassRise_1.6s_cubic-bezier(0.2,0.8,0.2,1)_120ms_both]">
          <DecoCornerFrame
            className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-12 h-12 lg:w-16 lg:h-16 text-gold-pale/85 z-10"
            stroke="#f4d8a0"
          />
          <DecoCornerFrame
            className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 text-gold-pale/85 z-10 -scale-x-100"
            stroke="#f4d8a0"
          />
          <DecoCornerFrame
            className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-12 h-12 lg:w-16 lg:h-16 text-gold-pale/85 z-10 -scale-y-100"
            stroke="#f4d8a0"
          />
          <DecoCornerFrame
            className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 text-gold-pale/85 z-10 rotate-180"
            stroke="#f4d8a0"
          />

          <div className="relative px-6 py-12 lg:py-20 flex flex-col items-center gap-10">
            <h1
              aria-label="Précieuse, joaillerie artisanale, Lisboa"
              className="font-display italic leading-[0.85] tracking-[-0.045em] text-center select-none"
              style={{
                fontSize: 'clamp(80px, 14vw, 220px)',
                color: '#fff8e6',
                textShadow:
                  '0 1px 0 rgba(255,255,255,0.40), 0 0 32px rgba(255,225,170,0.55), 0 4px 18px rgba(20,10,4,0.85), 0 16px 60px rgba(20,10,4,0.7)',
              }}
            >
              Précieuse
            </h1>

            <Link
              to="/carnet"
              className="group font-display italic inline-flex items-center gap-3 text-[15px] lg:text-[17px] text-[#fff7e3] px-7 py-3 border border-gold-pale/65 backdrop-blur-[6px] bg-black/20 hover:bg-gold-pale hover:text-ink transition-all duration-300 motion-safe:animate-[fadeUp_1.4s_ease-out_900ms_both]"
            >
              <span>Pousser la porte</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes glassRise { 0% { opacity: 0; transform: translateY(28px); filter: blur(10px); } 60% { opacity: 1; } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
          @keyframes fadeUp { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-8 lg:px-16 pb-10 text-center">
        <p className="font-display italic text-[20px] lg:text-[26px] text-[#fff7e3] drop-shadow-md max-w-[44ch] mx-auto">
          « La pierre choisit la main qui la taille. »
        </p>
      </div>
    </HeroBackground>
  )
}
