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
    eyebrow: string
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
  sections: {
    /** Bandeau réassurance : liste de garanties (retours, mise à taille…). */
    reassurance: string[]
    matieres: { title: string; subtitle: string; marginNote: string }
    bespoke: { title: string; intro: string; tagline: string; meta: string }
    etabli: { overline: string; title: string }
    collection: { title: string; subtitle: string }
    testimonials: { line1: string; line2: string }
    leadCapture: {
      title: string
      subtitle: string
      consentPrefix: string
      consentLink: string
      consentSuffix: string
    }
    newsletter: { eyebrow: string; title: string; subtitle: string }
  }
  /** Métadonnées SEO (titre + description) de la page, éditables par page. */
  seo: { title: string; description: string }
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
      eyebrow: m.hero_eyebrow(),
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
    sections: {
      reassurance: [
        m.reassurance_returns(),
        m.reassurance_resizing(),
        m.reassurance_whatsapp(),
        m.reassurance_certificate(),
      ],
      matieres: {
        title: m.matieres_section_title(),
        subtitle: m.matieres_section_subtitle(),
        marginNote: m.matieres_margin_note(),
      },
      bespoke: {
        title: m.surmesure_title(),
        intro: m.surmesure_intro_paragraph(),
        tagline: m.surmesure_intro_tagline(),
        meta: m.surmesure_meta(),
      },
      etabli: { overline: m.etabli_overline(), title: m.etabli_title() },
      collection: { title: m.series_title(), subtitle: m.series_subtitle() },
      testimonials: {
        line1: m.testimonials_title_line1(),
        line2: m.testimonials_title_line2(),
      },
      leadCapture: {
        title: m.leadcapture_title(),
        subtitle: m.leadcapture_subtitle(),
        consentPrefix: m.leadcapture_consent_prefix(),
        consentLink: m.leadcapture_consent_link(),
        consentSuffix: m.leadcapture_consent_suffix(),
      },
      newsletter: {
        eyebrow: m.newsletter_eyebrow(),
        title: m.newsletter_title(),
        subtitle: m.newsletter_short_subtitle(),
      },
    },
    seo: { title: m.seo_home_title(), description: m.seo_home_desc() },
  }
}
