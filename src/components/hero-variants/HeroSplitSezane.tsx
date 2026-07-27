import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { m } from '#/paraglide/messages'
import { BRAND_WORDMARK_MASK, maskStyle } from '../brand/brand'
import { useBrand } from '../brand/BrandProvider'
import type { HomeImg, HomePageData } from '../../lib/content/home'

// Vidéo de la moitié droite du héro (retour Emeline #15/#16). Pas encore
// pilotée par Sanity : à passer en champ `homePage` si Emeline doit pouvoir la
// changer elle-même.
const HERO_VIDEO_SRC = '/images/video/hero-emeline.mp4'

/**
 * Hero A — Split 50/50 strict (style Sézane).
 * Macro produit à gauche + portrait/main portée à droite.
 * Texte centré à cheval sur les 2 images, 1 seul CTA.
 * Photos + promesse pilotées par Sanity (homePage) via getHomePage ; les
 * libellés d'UI (sur-titre, boutons) restent en i18n.
 */
/**
 * Eyebrow de la hero — 4 traitements (toggle « Fond de l'eyebrow »). « actuel »
 * garde le cartouche translucide ; les autres retirent le fond (filets, texte
 * nu, losanges) avec une ombre renforcée pour rester lisible sur l'image.
 */
function HeroEyebrowMark({ text }: { text: string }) {
  const { heroEyebrow } = useBrand()
  const base =
    'mb-5 font-display font-bold text-[12px] tracking-[0.4em] uppercase text-poudre'
  const shadow = '[text-shadow:0_1px_5px_rgba(0,0,0,0.55)]'

  if (heroEyebrow === 'filets') {
    return (
      <span className={`inline-flex items-center gap-4 ${base} ${shadow}`}>
        <span aria-hidden className="h-px w-8 bg-current opacity-60" />
        {text}
        <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      </span>
    )
  }
  if (heroEyebrow === 'losanges') {
    return (
      <span className={`inline-flex items-center gap-3.5 ${base} ${shadow}`}>
        <span aria-hidden className="h-[7px] w-[7px] rotate-45 bg-current opacity-70" />
        {text}
        <span aria-hidden className="h-[7px] w-[7px] rotate-45 bg-current opacity-70" />
      </span>
    )
  }
  if (heroEyebrow === 'nu') {
    return <span className={`inline-block ${base} ${shadow}`}>{text}</span>
  }
  // actuel : cartouche translucide (patch)
  return (
    <span
      className={`inline-block bg-poudre/10 px-3 py-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.28)] ${base}`}
    >
      {text}
    </span>
  )
}

/**
 * Moitié droite du héro : la photo reste le premier rendu (c'est elle qui
 * compte pour le LCP mobile < 2,5 s, objectif Ads du PRD). La vidéo ne prend le
 * relais qu'après le premier rendu, sur grand écran, et jamais en
 * « animations réduites ». La photo sert aussi de `poster` → pas de clignotement
 * au moment du relais.
 */
function HeroRightMedia({ img }: { img: HomeImg }) {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wide = window.matchMedia('(min-width: 1024px)').matches
    if (reduced || !wide) return
    // Laisse passer le premier rendu avant d'aller chercher les 4 Mo de vidéo.
    const id = window.setTimeout(() => setShowVideo(true), 300)
    return () => window.clearTimeout(id)
  }, [])

  const common = 'absolute inset-0 w-full h-full object-cover'
  const position = img.position ? { objectPosition: img.position } : undefined

  if (showVideo) {
    return (
      <video
        src={HERO_VIDEO_SRC}
        poster={img.src}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={img.alt}
        style={position}
        className={common}
      />
    )
  }
  return (
    <img
      src={img.src}
      alt={img.alt}
      style={position}
      fetchPriority="high"
      className={common}
    />
  )
}

export function HeroSplitSezane({ hero }: { hero: HomePageData['hero'] }) {
  const { heroMark } = useBrand()

  // dvh : le 100vh figé d'iOS Safari cache le bas du héro (CTA) derrière la
  // barre d'URL ; h-screen reste en repli pour les vieux navigateurs.
  return (
    <section className="relative w-full h-screen supports-[height:100dvh]:h-dvh min-h-[640px] -mt-16 overflow-hidden">
      <div className="grid grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <img
            src={hero.imageLeft.src}
            alt={hero.imageLeft.alt}
            style={hero.imageLeft.position ? { objectPosition: hero.imageLeft.position } : undefined}
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative overflow-hidden">
          <HeroRightMedia img={hero.imageRight} />
        </div>
      </div>

      {/* Léger dégradé vertical (cadre haut/bas) pour aider la lisibilité —
          pas de halo central. */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/30" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center text-center text-poudre">
          <HeroEyebrowMark text={hero.eyebrow} />

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

          {/* Les deux moitiés de la promesse sont écartées sur grand écran
              (#18) : le groupe étant centré, le blanc tombe pile sur la
              séparation des deux visuels. Sur mobile, l'écart reste celui d'une
              espace normale (rendu inchangé). */}
          <p className="font-display text-[clamp(20px,2.6vw,30px)] text-poudre mb-3 max-w-[24ch] lg:max-w-none leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <span className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] lg:gap-x-16">
              <span>{hero.taglineLead}</span>
              <span className="text-lie-de-vin drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">{hero.taglineAccent}</span>
            </span>
          </p>
          <p className="font-display text-[clamp(14px,1.7vw,18px)] text-poudre/85 mb-10 max-w-[36ch] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {hero.subline}
          </p>
          {/* Même logique pour les deux boutons (#17) : écart élargi sur grand
              écran pour que le blanc tombe sur la séparation des visuels. */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-16">
            <Link
              to="/collection"
              className="inline-flex items-center justify-center min-w-[260px] whitespace-nowrap font-display text-[12px] tracking-[0.25em] uppercase border border-poudre/80 px-7 py-3.5 hover:bg-poudre hover:text-canard transition-colors duration-300"
            >
              {m.hero_cta_collection()}
            </Link>
            <Link
              to="/sur-mesure"
              className="inline-flex items-center justify-center min-w-[260px] whitespace-nowrap font-display text-[12px] tracking-[0.25em] uppercase bg-poudre text-canard border border-poudre px-7 py-3.5 hover:bg-transparent hover:text-poudre transition-colors duration-300"
            >
              {m.hero_cta_bespoke()}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
