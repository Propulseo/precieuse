import { m } from '#/paraglide/messages'
import type { CreatriceContent } from '../../lib/cms'
import { EditorialHeader } from '../editorial/EditorialHeader'
import { ClosingInvite } from '../ClosingInvite'

/**
 * Page Créatrice pilotée par Sanity (document `creatricePage`) — affichée dès
 * qu'Emeline a rempli le document. Charte poudre/canard : manchette éditoriale
 * partagée, sections à image alternée, puis citation.
 */
export function CreatriceCms({ content }: { content: CreatriceContent }) {
  return (
    <>
      <EditorialHeader title={content.title}>
        {content.intro ? (
          <p className="mx-auto max-w-[54ch] font-body italic font-light text-[clamp(14px,1.4vw,17px)] leading-[1.5] text-canard-90 [text-wrap:pretty]">
            {content.intro}
          </p>
        ) : null}
      </EditorialHeader>

      <section className="bg-poudre px-8 pb-6 pt-8 lg:px-16 lg:pt-12">
        <div className="mx-auto max-w-[680px]">
          {content.portrait.url ? (
            <figure className="mb-6 flex flex-col items-center">
              <div className="relative aspect-[3/4] w-[280px] max-w-[72vw] overflow-hidden border border-canard/30">
                <img
                  src={content.portrait.url}
                  alt={content.portrait.alt}
                  style={{ objectPosition: content.portrait.position }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </figure>
          ) : null}
        </div>
      </section>

      {/* Sections (image alternée gauche/droite) */}
      {content.sections.map((section, i) => (
        <section
          key={`${section.title}-${i}`}
          className="relative border-t border-canard/15 bg-poudre px-8 py-16 lg:px-16 lg:py-20"
        >
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {section.image.url ? (
              <div
                className={`relative aspect-[3/4] overflow-hidden border border-canard/20 ${i % 2 === 0 ? 'order-2 lg:order-1' : 'order-2'}`}
              >
                <img
                  src={section.image.url}
                  alt={section.image.alt}
                  style={{ objectPosition: section.image.position }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : null}
            <div className={i % 2 === 0 ? 'order-1 lg:order-2' : 'order-1'}>
              {section.overline ? (
                <span className="mb-3 block font-display text-[12px] uppercase tracking-[0.35em] text-framboise">
                  {section.overline}
                </span>
              ) : null}
              <h2 className="mb-8 font-headline text-[40px] leading-none text-canard">
                {section.title}
              </h2>
              <div className="max-w-prose space-y-6 font-display text-[18px] leading-[1.9] text-canard/85">
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
        <section className="border-t border-canard/15 bg-poudre px-8 py-20 lg:px-16">
          <blockquote className="relative mx-auto max-w-[560px] text-center">
            <span aria-hidden className="mx-auto mb-6 block h-0.5 w-16 bg-framboise" />
            <p className="font-display italic text-[clamp(23px,3.2vw,31px)] leading-[1.45] text-canard">
              {content.quote}
            </p>
          </blockquote>
        </section>
      ) : null}

      <ClosingInvite title={m.creatrice_cta_title()} cta={m.creatrice_cta_button()} />
    </>
  )
}
