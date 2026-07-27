import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
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

  // Même étalonnage que le héro de /sur-mesure, pour que les deux pages se
  // répondent.
  const grade = 'brightness-[0.8] saturate-[1.06]'
  const common = `absolute inset-0 w-full h-full object-cover ${grade}`
  const position = img.position ? { objectPosition: img.position } : undefined

  if (showVideo) {
    // Plein cadre, comme la photo de gauche : aucune bande, la moitié de héro
    // est entièrement remplie. La vidéo étant au format téléphone (716 x 1284)
    // et le cadre bien plus large, elle est forcément rognée en haut et en bas —
    // c'est le compromis assumé pour ne pas laisser de vide sur les côtés.
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
        // Même point focal que la photo : sans ça, le hotspot réglé dans Sanity
        // s'appliquerait à la photo mais pas à la vidéo, et le cadrage sauterait
        // au moment du relais.
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
            className="absolute inset-0 w-full h-full object-cover brightness-[0.8] saturate-[1.06]"
          />
        </div>
        <div className="relative overflow-hidden">
          <HeroRightMedia img={hero.imageRight} />
        </div>
      </div>

      {/* Voile canard dégradé — même recette que le héro de /sur-mesure :
          appuyé en haut et en bas (lisibilité de la marque et des boutons),
          quasi transparent au centre pour ne pas éteindre les visuels. */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(13,71,71,0.5)_0%,rgba(13,71,71,0.2)_36%,rgba(13,71,71,0.2)_62%,rgba(13,71,71,0.56)_100%)]" />

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
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

          {/* #18 — deux colonnes de largeur égale à TOUTES les tailles : leur
              frontière tombe exactement sur la séparation des visuels, et chaque
              moitié de la promesse s'en écarte du même retrait (pr/pl). La
              seconde moitié démarre donc sur l'image de droite, du téléphone au
              grand écran. Un simple écart centré ne suffisait pas : l'équilibre
              dépendait de la longueur de chaque texte, et sur mobile la bascule
              tombait avant la couture. Retrait réduit sous `lg` pour que
              « Votre histoire. » tienne sur une ligne jusqu'à 320 px de large. */}
          <p className="font-display text-[clamp(20px,2.6vw,30px)] text-poudre mb-3 w-full leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            <span className="grid grid-cols-2 items-baseline">
              <span className="justify-self-end pr-1.5 lg:pr-5">{hero.taglineLead}</span>
              <span className="text-lie-de-vin drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)] justify-self-start pl-1.5 lg:pl-5">
                {hero.taglineAccent}
              </span>
            </span>
          </p>
          <p className="font-display text-[clamp(14px,1.7vw,18px)] text-poudre/85 mb-10 max-w-[36ch] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
            {hero.subline}
          </p>
          {/* #17 — même grille que la promesse ci-dessus, et même retrait, pour
              que boutons et texte soient cales identiquement sur la jointure. */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:grid lg:w-full lg:grid-cols-2 lg:gap-0">
            <Link
              to="/collection"
              className="inline-flex items-center justify-center min-w-[260px] whitespace-nowrap font-display text-[12px] tracking-[0.25em] uppercase border border-poudre/80 px-7 py-3.5 hover:bg-poudre hover:text-canard transition-colors duration-300 lg:justify-self-end lg:mr-5"
            >
              {hero.ctaCollection}
            </Link>
            <Link
              to="/sur-mesure"
              className="inline-flex items-center justify-center min-w-[260px] whitespace-nowrap font-display text-[12px] tracking-[0.25em] uppercase bg-poudre text-canard border border-poudre px-7 py-3.5 hover:bg-transparent hover:text-poudre transition-colors duration-300 lg:justify-self-start lg:ml-5"
            >
              {hero.ctaBespoke}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
