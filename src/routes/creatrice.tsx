import { createFileRoute, Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/creatrice')({ component: CreatricePage })

function CreatricePage() {
  return (
    <>
      {/* Intro — portrait + accroche */}
      <section className="relative bg-cream py-20 px-8 lg:px-16">
        <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-center">
          <div className="relative w-full max-w-[460px] aspect-[3/4] border border-ink/30 overflow-hidden mx-auto lg:mx-0">
            <img
              src="/images/emeline/emeline-atelier.jpg"
              alt={m.creatrice_intro_portrait_alt()}
              className="absolute inset-0 w-full h-full object-cover luxe-grayscale"
            />
          </div>

          <div>
            <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
              {m.creatrice_intro_eyebrow()}
            </span>
            <h1 className="font-headline text-[clamp(48px,7vw,90px)] text-ink leading-[0.95]">
              {m.creatrice_intro_title()}
            </h1>
            <p className="font-display italic text-[20px] text-ink/75 mt-8 leading-relaxed max-w-prose">
              {m.creatrice_intro_lede()}
            </p>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="relative bg-cream py-20 px-8 lg:px-16 border-t border-ink/15">
        <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
            <img
              src="/images/real/deux-mains.webp"
              alt={m.creatrice_parcours_image_alt()}
              className="absolute inset-0 w-full h-full object-cover luxe-grayscale"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
              {m.creatrice_parcours_eyebrow()}
            </span>
            <h2 className="font-headline text-[40px] text-ink leading-none mb-8">
              {m.creatrice_parcours_title()}
            </h2>
            <div className="space-y-6 font-sans text-[15px] text-ink/80 leading-relaxed max-w-prose">
              <p>{m.creatrice_parcours_p1()}</p>
              <p>{m.creatrice_parcours_p2()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophie + citation */}
      <section className="relative bg-cream py-20 px-8 lg:px-16 border-t border-ink/15">
        <div className="mx-auto max-w-[800px]">
          <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
            {m.creatrice_philosophie_eyebrow()}
          </span>
          <h2 className="font-headline text-[40px] text-ink leading-none mb-8">
            {m.creatrice_philosophie_title()}
          </h2>
          <p className="font-sans text-[15px] text-ink/80 leading-relaxed">
            {m.creatrice_philosophie_body()}
          </p>
          <blockquote className="border-l-2 border-raspberry/40 pl-6 mt-12">
            <p className="font-display italic text-[26px] text-ink leading-snug">
              {m.creatrice_philosophie_quote()}
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-cream py-24 px-8 lg:px-16 border-t border-ink/15 text-center">
        <h2 className="font-headline text-[48px] text-ink leading-none mb-10">{m.creatrice_cta_title()}</h2>
        <Link
          to="/contact"
          className="inline-block font-display italic text-[18px] text-ink border border-ink/30 px-8 py-3 hover:bg-ink hover:text-cream transition-all duration-300"
        >
          {m.creatrice_cta_button()} →
        </Link>
      </section>
    </>
  )
}
