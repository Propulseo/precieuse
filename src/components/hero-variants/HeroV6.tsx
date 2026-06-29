import { Link } from '@tanstack/react-router'

export function HeroV6() {
  return (
    <section className="relative min-h-screen pt-16 -mt-16 overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-ink">
      <div className="relative h-[55vh] lg:h-screen overflow-hidden">
        <img
          src="/images/gemmyo.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'saturate(1.15) brightness(0.88) contrast(1.04)',
            objectPosition: 'center 60%',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,4,2,0.05) 0%, rgba(8,4,2,0.0) 50%, rgba(26,12,4,0.55) 100%)',
          }}
        />
      </div>

      <div className="relative flex items-center px-8 lg:px-20 py-16 lg:py-0 bg-ink">
        <div className="motion-safe:animate-[fadeRight_1.4s_cubic-bezier(0.2,0.8,0.2,1)_200ms_both] max-w-[520px]">
          <span className="font-technical text-gold-pale/80 block mb-6">
            Vitrine · MMXXVI · Lisboa
          </span>

          <h1
            aria-label="Précieuse, joaillerie artisanale, Lisboa"
            className="font-display italic leading-[0.88] tracking-[-0.035em] select-none"
            style={{
              fontSize: 'clamp(72px, 9vw, 140px)',
              color: '#fff8e6',
            }}
          >
            Précieuse
          </h1>

          <p className="font-display italic text-[18px] lg:text-[22px] text-[#fff7e3]/85 leading-relaxed mt-8 max-w-[36ch]">
            Un atelier, à Bordeaux. Chaque bague naît d'une commande,
            d'une main, d'un nom.
          </p>

          <Link
            to="/carnet"
            className="group font-display italic inline-flex items-center gap-3 text-[15px] lg:text-[17px] text-[#fff7e3] px-7 py-3 border border-gold-pale/65 hover:bg-gold-pale hover:text-ink transition-all duration-300 mt-10"
          >
            <span>Pousser la porte</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeRight { 0% { opacity: 0; transform: translateX(-20px); } 100% { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  )
}
