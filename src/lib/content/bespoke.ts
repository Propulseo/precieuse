import { m } from '#/paraglide/messages'

/**
 * Données structurées de la page Sur-mesure. Les libellés user-facing sont des
 * CLÉS Paraglide (résolues au rendu via `bespokeMessage(key)`) ; seuls les `alt`
 * restent FR (convention `etabli.ts`). Voix et pièces servent aussi de repli
 * statique au loader CMS (cf. route /sur-mesure).
 */

/** Résout une clé de message Paraglide sans paramètre (titres, corps courts). */
export function bespokeMessage(key: string): string {
  const table = m as unknown as Record<string, (() => string) | undefined>
  const fn = table[key]
  return typeof fn === 'function' ? fn() : key
}

export type BespokeStep = { svg: string; titleKey: string; bodyKey: string }
export const BESPOKE_STEPS: BespokeStep[] = [
  { svg: '/images/process/etape-1.svg', titleKey: 'sm_step1_title', bodyKey: 'sm_step1_body' },
  { svg: '/images/process/etape-2.svg', titleKey: 'sm_step2_title', bodyKey: 'sm_step2_body' },
  { svg: '/images/process/etape-3.svg', titleKey: 'sm_step3_title', bodyKey: 'sm_step3_body' },
  { svg: '/images/process/etape-4.svg', titleKey: 'sm_step4_title', bodyKey: 'sm_step4_body' },
]

export type BespokePiece = {
  atelierSrc: string
  atelierAlt: string
  porteeSrc: string
  porteeAlt: string
  name: string
  matKey: string
}
export const BESPOKE_PIECES: BespokePiece[] = [
  {
    atelierSrc: '/images/real/bague-entouree-josephine.webp',
    atelierAlt: "Bague Joséphine photographiée à l'atelier",
    porteeSrc: '/images/real/main-chaise-josephine.webp',
    porteeAlt: 'Bague Joséphine portée, main posée sur une chaise',
    name: 'Joséphine',
    matKey: 'sm_real_mat_josephine',
  },
  {
    atelierSrc: '/images/real/bague-pierre-aurore.webp',
    atelierAlt: "Bague Aurore photographiée à l'atelier",
    porteeSrc: '/images/real/bague-main-chaise-aurore.webp',
    porteeAlt: 'Bague Aurore portée, main posée sur une chaise',
    name: 'Aurore',
    matKey: 'sm_real_mat_aurore',
  },
  {
    atelierSrc: '/images/real/bague-boule-thelma.webp',
    atelierAlt: "Bague Thelma photographiée à l'atelier",
    porteeSrc: '/images/real/mains-poche-thelma.webp',
    porteeAlt: 'Bague Thelma portée, mains glissées dans les poches',
    name: 'Thelma',
    matKey: 'sm_real_mat_thelma',
  },
]

export type BespokeVoice = { initial: string; quoteKey: string; name: string; city: string }
export const BESPOKE_VOICES: BespokeVoice[] = [
  { initial: 'M', quoteKey: 'sm_voice1_quote', name: 'Martine B.', city: 'Bordeaux' },
  { initial: 'S', quoteKey: 'sm_voice2_quote', name: 'Sandrine L.', city: 'Lyon' },
  { initial: 'C', quoteKey: 'sm_voice3_quote', name: 'Camille R.', city: 'Paris' },
]

export const BESPOKE_MARQUEE = [
  'sm_marquee_1',
  'sm_marquee_2',
  'sm_marquee_3',
  'sm_marquee_4',
  'sm_marquee_5',
] as const
