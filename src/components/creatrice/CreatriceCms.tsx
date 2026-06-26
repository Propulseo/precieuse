import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import type { CreatriceContent } from '../../lib/cms'

/**
 * Page Créatrice pilotée par Sanity (document `creatricePage`) — affichée dès
 * qu'Emeline a rempli le document. Le CTA final reste structurel (Paraglide).
 * Les sections alternent l'image gauche/droite automatiquement.
 */
export function CreatriceCms({ content }: { content: CreatriceContent }) {
  return (
    <>
      {/* Intro — portrait + accroche */}
      <section className="relative bg-cream py-20 px-8 lg:px-16">
        <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-center">
          {content.portrait.url ? (
            <div className="relative w-full max-w-[460px] aspect-[3/4] border border-ink/30 overflow-hidden mx-auto lg:mx-0">
              <img
                src={content.portrait.url}
                alt={content.portrait.alt}
                style={{ objectPosition: content.portrait.position }}
                className="absolute inset-0 w-full h-full object-cover luxe-grayscale"
              />
            </div>
          ) : null}
          <div>
            {content.overline ? (
              <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
                {content.overline}
              </span>
            ) : null}
            <h1 className="font-headline text-[clamp(48px,7vw,90px)] text-ink leading-[0.95]">
              {content.title}
            </h1>
            {content.intro ? (
              <p className="font-display italic text-[20px] text-ink/75 mt-8 leading-relaxed max-w-prose">
                {content.intro}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Sections (image alternée gauche/droite) */}
      {content.sections.map((section, i) => (
        <section
          key={`${section.title}-${i}`}
          className="relative bg-cream py-20 px-8 lg:px-16 border-t border-ink/15"
        >
          <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {section.image.url ? (
              <div
                className={`relative aspect-[3/4] overflow-hidden ${i % 2 === 0 ? 'order-2 lg:order-1' : 'order-2'}`}
              >
                <img
                  src={section.image.url}
                  alt={section.image.alt}
                  style={{ objectPosition: section.image.position }}
                  className="absolute inset-0 w-full h-full object-cover luxe-grayscale"
                />
              </div>
            ) : null}
            <div className={i % 2 === 0 ? 'order-1 lg:order-2' : 'order-1'}>
              {section.overline ? (
                <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
                  {section.overline}
                </span>
              ) : null}
              <h2 className="font-headline text-[40px] text-ink leading-none mb-8">
                {section.title}
              </h2>
              <div className="space-y-6 font-sans text-[15px] text-ink/80 leading-relaxed max-w-prose">
                {section.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Citation */}
      {content.quote ? (
        <section className="relative bg-cream py-20 px-8 lg:px-16 border-t border-ink/15">
          <div className="mx-auto max-w-[800px]">
            <blockquote className="border-l-2 border-raspberry/40 pl-6">
              <p className="font-display italic text-[26px] text-ink leading-snug">
                {content.quote}
              </p>
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* CTA (structurel) */}
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
