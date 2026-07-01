import { m } from '#/paraglide/messages'

export const FOOTER_DATA = {
  nav: [
    { label: 'La Collection', href: '/collection' },
    { label: 'Le Carnet', href: '/carnet' },
    { label: "L'Atelier", href: '/creatrice' },
    { label: 'Sur-Mesure', href: '/sur-mesure' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Confidentialité', href: '/confidentialite' },
    { label: 'CGV', href: '/cgv' },
  ],
  social: [
    {
      label: 'Instagram',
      handle: '@precieusejoaillerie',
      href: 'https://www.instagram.com/precieusejoaillerie',
    },
    {
      label: 'Facebook',
      handle: 'Précieuse',
      href: 'https://www.facebook.com/people/Pr%C3%A9cieuse/61576262354969/',
    },
    {
      label: 'LinkedIn',
      handle: 'Emeline Le Ray',
      href: 'https://www.linkedin.com/in/emeline-le-ray-70052116a',
    },
  ],
  email: 'contact@precieuse-joaillerie.com',
  signature: 'Fait à la main à Bordeaux, porté partout',
  copyright: '© Précieuse · Joaillerie artisanale, Bordeaux, France',
  credit: {
    label: "Fait avec passion par Propul'SEO",
    href: 'https://propulseo-site.com',
  },
  logoSrc: '/brand/lockup-teal.png',
}

/** Réseau social du footer (label + identifiant affiché + URL). */
export type FooterSocial = { label: string; handle: string; href: string }

/**
 * Contrat de données du footer. Réseaux + email + textes éditoriaux (signature,
 * réponse 48 h, copyright, cachet d'atelier) viennent de Sanity (`footer`) quand
 * ils sont remplis, sinon de ce repli i18n. Les libellés de navigation/légaux,
 * le crédit agence et les aria-labels restent gérés par Paraglide (structurels).
 * Cf. `getFooter` (src/lib/cms/content.ts).
 */
export type FooterContent = {
  social: FooterSocial[]
  email: string
  signature: string
  responseLine1: string
  responseLine2: string
  copyright: string
  /** Cachet « Atelier / Bordeaux / MMXXVI » — sauts de ligne préservés (pre-line). */
  atelierStamp: string
}

/**
 * Repli statique du footer : réseaux/email figés + textes i18n (Paraglide).
 * Conserve EXACTEMENT le contenu actuel (zéro régression tant que le document
 * Sanity `footer` n'est pas rempli par Emeline).
 */
export function footerFallback(): FooterContent {
  return {
    social: FOOTER_DATA.social,
    email: FOOTER_DATA.email,
    signature: m.footer_signature(),
    responseLine1: m.footer_response_line1(),
    responseLine2: m.footer_response_line2(),
    copyright: m.footer_copyright(),
    atelierStamp: 'Atelier\nBordeaux\nMMXXVI',
  }
}
