import { m } from '#/paraglide/messages'
import { BRAND_WORDMARK_MASK, maskStyle } from '../brand/brand'
import { useBrand } from '../brand/BrandProvider'

/**
 * Hero A — Split 50/50 strict (style Sézane).
 * Macro produit à gauche + portrait/main portée à droite.
 * Texte centré à cheval sur les 2 images, 1 seul CTA.
 */
export function HeroSplitSezane() {
  const { heroMark } = useBrand()

  return (
    <section className="relative w-full h-screen min-h-[640px] -mt-16 overflow-hidden">
      <div className="grid grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <img
            src="/images/real/bague-main-josephine.webp"
            alt={m.hero_alt_josephine()}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden">
          <img
            src="/images/real/buste-thelma-louise.webp"
            alt={m.hero_alt_thelma_louise()}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Léger dégradé vertical (cadre haut/bas) pour aider la lisibilité —
          pas de halo central. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center text-center text-poudre">
          <span className="mb-5 inline-block bg-poudre/10 px-3 py-1 font-display text-[12px] tracking-[0.4em] uppercase text-lie-de-vin backdrop-blur-[2px] [text-shadow:0_1px_3px_rgba(0,0,0,0.28)]">
            {m.hero_eyebrow()}
          </span>

          {/* Marque de la hero : soit le logo (masque CSS), soit le mot écrit
              « Précieuse. ». Les deux suivent la couleur via --brand-accent. */}
          {heroMark === 'logo' ? (
            <div
              role="img"
              aria-label="Précieuse"
              className="mb-4 drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)]"
              style={{
                // Logo « allongé » : on élargit le cadre et on aplatit le ratio
                // (natif 4844/2740 ≈ 1,77) pour réduire la hauteur de la boucle
                // du P. Pour tuner : ↑ le 2ᵉ nombre = plus plat ; ↓ = plus haut.
                width: 'min(56vw, 360px)',
                aspectRatio: '4844 / 2380',
                ...maskStyle(BRAND_WORDMARK_MASK),
                // Étire le masque pour remplir le cadre aplati (sinon « contain »
                // recadrerait sans aplatir).
                maskSize: '100% 100%',
                WebkitMaskSize: '100% 100%',
              }}
            />
          ) : (
            <h1
              className="font-headline mb-4 text-center drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)]"
              style={{
                fontSize: 'clamp(56px, 11vw, 140px)',
                color: 'var(--brand-accent)',
              }}
            >
              Précieuse.
            </h1>
          )}

          <p className="font-display text-[clamp(20px,2.6vw,30px)] text-poudre mb-3 max-w-[24ch] leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {m.hero_tagline_lead()}{' '}
            <span className="text-lie-de-vin drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">{m.hero_tagline_accent()}</span>
          </p>
          <p className="font-display text-[clamp(14px,1.7vw,18px)] text-poudre/85 mb-10 max-w-[36ch] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {m.hero_subline()}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/collection"
              className="inline-flex items-center justify-center w-[260px] font-display text-[12px] tracking-[0.35em] uppercase border border-poudre/80 px-9 py-3.5 hover:bg-poudre hover:text-canard transition-colors duration-300"
            >
              {m.hero_cta_collection()}
            </a>
            <a
              href="/sur-mesure"
              className="inline-flex items-center justify-center w-[260px] font-display text-[12px] tracking-[0.35em] uppercase bg-poudre text-canard border border-poudre px-9 py-3.5 hover:bg-transparent hover:text-poudre transition-colors duration-300"
            >
              {m.hero_cta_bespoke()}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
