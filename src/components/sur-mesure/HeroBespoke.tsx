export function HeroBespoke() {
  return (
    <section className="relative min-h-screen -mt-16 pt-16 flex flex-col items-center justify-center bg-canard overflow-hidden">
      <img
        src="/images/stitch-v3/sur-mesure-sketching.jpg"
        alt="Eméline dessine une esquisse sur-mesure à l'atelier"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'saturate(1.1) brightness(0.7) contrast(1.05)', objectPosition: 'center 40%' }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,84,84,0.95) 0%, rgba(0,84,84,0.5) 50%, rgba(0,84,84,0.25) 100%)' }}
      />

      <div className="relative z-10 text-center px-6 max-w-[700px] motion-safe:animate-[fadeUp_1.4s_ease-out_200ms_both]">
        <span className="font-technical text-poudre/50 block mb-8">
          Création sur-mesure · Lisboa
        </span>

        <h1 className="font-headline text-[clamp(42px,6vw,88px)] text-poudre leading-[0.92]">
          Votre bijou n'existe <span className="text-rouille">pas encore.</span>
        </h1>

        <p className="font-body italic font-light text-[20px] lg:text-[24px] text-poudre/75 leading-relaxed mt-8 mx-auto max-w-[32ch]">
          Il commence par une conversation, un croquis, une envie murmurée.
        </p>

        <a
          href="#racontez-nous"
          className="group font-display text-[14px] tracking-[0.2em] uppercase inline-flex items-center gap-3 text-poudre px-7 py-3.5 border border-poudre/40 hover:bg-poudre hover:text-canard transition-all duration-300 mt-10"
        >
          <span>Racontez-nous votre projet</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>

      <div className="relative z-10 absolute bottom-0 inset-x-0 border-t border-poudre/15 px-8 lg:px-16 py-6">
        <div className="mx-auto max-w-[1440px] flex items-center justify-center gap-12 sm:gap-16">
          {[
            ['à partir de', '1 000 €'],
            ['délai', '4 à 8 sem.'],
            ['réponse', '48 h'],
          ].map(([label, value]) => (
            <div key={label} className="text-center">
              <span className="font-technical text-poudre/35 block mb-1">{label}</span>
              <span className="font-display text-[20px] text-poudre">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  )
}
