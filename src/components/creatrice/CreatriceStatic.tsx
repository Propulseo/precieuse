import { m } from '#/paraglide/messages'
import { EditorialHeader } from '../editorial/EditorialHeader'
import { BRAND_PICTO_MASK, maskStyle } from '../brand/brand'
import { ClosingInvite } from '../ClosingInvite'

/** Filigrane losange — séparateur éditorial entre les mouvements de la lettre. */
function Filigrane() {
  return (
    <div className="my-10 flex justify-center text-framboise/50" aria-hidden>
      <svg viewBox="0 0 86 24" className="h-6 w-[86px]" fill="none">
        <line x1="8" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="0.6" />
        <rect x="39" y="8" width="8" height="8" stroke="currentColor" strokeWidth="0.6" transform="rotate(45 43 12)" />
        <line x1="50" y1="12" x2="78" y2="12" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  )
}

/** Cachet d'atelier — sceau rond ATELIER · BORDEAUX · MMXXV, fleur de la marque au centre. */
function Seal() {
  return (
    <div className="relative h-24 w-24 shrink-0 text-canard" aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full opacity-80" fill="none">
        <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <text x="60" y="32" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">ATELIER</text>
        <text x="60" y="92" textAnchor="middle" fontSize="8.5" fill="currentColor" fontFamily="serif" letterSpacing="2.2">BORDEAUX</text>
        <text x="60" y="104" textAnchor="middle" fontSize="6.5" fill="currentColor" fontFamily="serif" letterSpacing="2.6">MMXXV</text>
      </svg>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: 32, height: 32, ...maskStyle(BRAND_PICTO_MASK) }}
      />
    </div>
  )
}

/**
 * Page Créatrice — version statique (repli Paraglide tant que Sanity n'est pas
 * rempli). Charte poudre/canard : manchette éditoriale partagée + corps mis en
 * scène comme une lettre signée d'Emeline.
 */
export function CreatriceStatic() {
  return (
    <>
      <EditorialHeader title={m.creatrice_intro_title()}>
        <p className="mx-auto max-w-[54ch] font-body italic font-light text-[clamp(14px,1.4vw,17px)] leading-[1.5] text-canard-90 [text-wrap:pretty]">
          {m.creatrice_intro_lede()}
        </p>
      </EditorialHeader>

      <section className="overflow-hidden bg-poudre px-8 pb-6 pt-3 lg:px-16 lg:pt-4">
        <div className="mx-auto max-w-[680px]">
          {/* Portrait encadré + légende — visible dès l'arrivée (au-dessus de la ligne de flottaison). */}
          <figure className="relative mb-12 flex flex-col items-center">
            {/* Feuilles de la marque en filigrane pâle, de part et d'autre du portrait (décor des marges). */}
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
            <div className="relative aspect-[3/4] w-[240px] max-w-[64vw] overflow-hidden border border-canard/30">
              <img
                src="/images/emeline-portrait.jpg"
                alt={m.creatrice_intro_portrait_alt()}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3.5 font-display text-[12px] uppercase tracking-[0.22em]">
              <span className="text-canard/75">Emeline Le Ray</span>
              <span className="text-framboise">·</span>
              <span className="text-canard">Bordeaux · MMXXV</span>
            </figcaption>
          </figure>

          {/* Corps de lettre */}
          <p className="font-display text-[18px] leading-[1.95] text-canard/85 first-letter:float-left first-letter:pr-3 first-letter:pt-2 first-letter:font-headline first-letter:text-[56px] first-letter:leading-[0.7] first-letter:text-framboise">
            {m.creatrice_parcours_p1()}
          </p>
          <p className="mt-5 font-display text-[18px] leading-[1.95] text-canard/85">
            {m.creatrice_parcours_p2()}
          </p>

          <Filigrane />

          <p className="font-display text-[18px] leading-[1.95] text-canard/85">
            {m.creatrice_philosophie_body()}
          </p>

          {/* Citation en exergue */}
          <blockquote className="relative mx-auto my-14 max-w-[560px] text-center">
            <span aria-hidden className="mx-auto mb-6 block h-0.5 w-16 bg-framboise" />
            <p className="font-display italic text-[clamp(23px,3.2vw,31px)] leading-[1.45] text-canard">
              {m.creatrice_philosophie_quote()}
            </p>
          </blockquote>

          {/* Clôture : cachet + signature */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-canard/15 pt-8">
            <Seal />
            <div className="text-center">
              <div className="font-headline italic text-[44px] leading-none text-canard">Emeline</div>
              <div className="mt-2.5 font-display text-[12px] uppercase tracking-[0.24em] text-canard/55">
                {m.creatrice_signature_role()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingInvite title={m.creatrice_cta_title()} cta={m.creatrice_cta_button()} />
    </>
  )
}
