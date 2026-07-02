import { m } from '#/paraglide/messages'
import type { CreatriceContent } from '../../lib/cms'
import { EditorialHeader } from '../editorial/EditorialHeader'
import { ClosingInvite } from '../ClosingInvite'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import { Filigrane, Seal } from './ornements'

/**
 * Page Créatrice pilotée par Sanity (document `creatricePage`). Rend EXACTEMENT
 * le même design « lettre signée » que `CreatriceStatic` (le repli), mais depuis
 * le document d'Emeline. Toute divergence visuelle est un bug (cf. spec parité).
 */
export function CreatriceCms({ content }: { content: CreatriceContent }) {
  return (
    <>
      <EditorialHeader title={content.introTitle}>
        {content.introLede ? (
          <p className="mx-auto max-w-[54ch] font-body italic font-light text-[clamp(14px,1.4vw,19px)] leading-[1.5] text-canard-90 [text-wrap:pretty]">
            {content.introLede}
          </p>
        ) : null}
      </EditorialHeader>

      <section className="overflow-hidden bg-poudre px-8 pb-6 pt-3 lg:px-16 lg:pt-4">
        <div className="mx-auto max-w-[clamp(680px,52vw,900px)]">
          {/* Portrait encadré + légende, avec filigranes de marque dans les marges. */}
          <figure className="relative mb-12 flex flex-col items-center">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 lg:block"
              style={{ width: 360, height: 360, marginLeft: -560, opacity: 0.07, ...maskStyle(BRAND_PICTO_MASK, 'var(--canard)') }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 -scale-x-100 lg:block"
              style={{ width: 360, height: 360, marginLeft: 200, opacity: 0.07, ...maskStyle(BRAND_PICTO_MASK, 'var(--canard)') }}
            />
            {content.portrait.url ? (
              <div className="relative aspect-[3/4] w-[clamp(240px,22vw,320px)] max-w-[64vw] overflow-hidden border border-canard/30">
                <img
                  src={content.portrait.url}
                  alt={content.portrait.alt}
                  style={{ objectPosition: content.portrait.position }}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : null}
            <figcaption className="mt-3 flex items-baseline gap-3.5 font-display text-[12px] uppercase tracking-[0.22em]">
              <span className="text-canard/75">{content.captionName}</span>
              <span className="text-framboise">·</span>
              <span className="text-canard">{content.captionPlace}</span>
            </figcaption>
          </figure>

          {/* Corps de lettre — lettrine sur le premier paragraphe. */}
          {content.parcours.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'font-display text-[clamp(18px,1.1vw,22px)] leading-[1.95] text-canard/85 first-letter:float-left first-letter:pr-3 first-letter:pt-2 first-letter:font-headline first-letter:text-[clamp(56px,5vw,72px)] first-letter:leading-[0.7] first-letter:text-framboise'
                  : 'mt-5 font-display text-[clamp(18px,1.1vw,22px)] leading-[1.95] text-canard/85'
              }
            >
              {p}
            </p>
          ))}

          <Filigrane />

          {content.philosophieBody ? (
            <p className="font-display text-[clamp(18px,1.1vw,22px)] leading-[1.95] text-canard/85">
              {content.philosophieBody}
            </p>
          ) : null}

          {content.quote ? (
            <blockquote className="relative mx-auto my-14 max-w-[clamp(560px,42vw,740px)] text-center">
              <span aria-hidden className="mx-auto mb-6 block h-0.5 w-16 bg-framboise" />
              <p className="font-display italic text-[clamp(23px,3vw,34px)] leading-[1.45] text-canard">
                {content.quote}
              </p>
            </blockquote>
          ) : null}

          {/* Clôture : cachet + signature. */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-canard/15 pt-8">
            <Seal />
            <div className="text-center">
              <div className="font-headline italic text-[clamp(44px,4vw,58px)] leading-none text-canard">
                {content.signatureName}
              </div>
              <div className="mt-2.5 font-display text-[12px] uppercase tracking-[0.24em] text-canard/55">
                {content.signatureRole}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingInvite title={m.creatrice_cta_title()} cta={m.creatrice_cta_button()} />
    </>
  )
}
