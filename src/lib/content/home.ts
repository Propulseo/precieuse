import { m } from '#/paraglide/messages'

/** Image du héro d'accueil : src + alt + point focal CSS optionnel. */
export type HomeImg = { src: string; alt: string; position?: string }

/**
 * Contrat de données de la page d'accueil. Le héro (2 photos + promesse) vient
 * de Sanity (`homePage`) quand il est rempli, sinon de ce repli i18n/photos.
 * Cf. `getHomePage` (src/lib/cms/content.ts).
 */
export type HomePageData = {
  hero: {
    imageLeft: HomeImg
    imageRight: HomeImg
    taglineLead: string
    taglineAccent: string
    subline: string
  }
  avantPropos: {
    portrait: HomeImg
    name: string
    place: string
    /** Manifeste : paires « pas… / mais… » (storytelling cœur de marque). */
    manifesto: { pas: string; mais: string }[]
    qualification: string
    founder: string
  }
}

/**
 * Repli statique du héro d'accueil : valeurs i18n (Paraglide) + photos par
 * défaut. Conserve EXACTEMENT le contenu actuel de `HeroSplitSezane` (zéro
 * régression tant que le document Sanity `homePage` n'est pas rempli).
 */
export function homePageFallback(): HomePageData {
  return {
    hero: {
      imageLeft: {
        src: '/images/real/bague-main-josephine.webp',
        alt: m.hero_alt_josephine(),
      },
      imageRight: {
        src: '/images/real/buste-thelma-louise.webp',
        alt: m.hero_alt_thelma_louise(),
      },
      taglineLead: m.hero_tagline_lead(),
      taglineAccent: m.hero_tagline_accent(),
      subline: m.hero_subline(),
    },
    avantPropos: {
      portrait: {
        src: '/images/emeline-portrait.jpg',
        alt: m.avantpropos_portrait_alt(),
      },
      name: 'Emeline Le Ray',
      place: 'Bordeaux · MMXXVI',
      manifesto: [
        { pas: m.avantpropos_pair1_pas(), mais: m.avantpropos_pair1_mais() },
        { pas: m.avantpropos_pair2_pas(), mais: m.avantpropos_pair2_mais() },
        { pas: m.avantpropos_pair3_pas(), mais: m.avantpropos_pair3_mais() },
        { pas: m.avantpropos_pair4_pas(), mais: m.avantpropos_pair4_mais() },
      ],
      qualification: m.avantpropos_credits_qualification(),
      founder: m.avantpropos_credits_founder(),
    },
  }
}
