/**
 * Médias par bague pour les présentations collection : une photo PORTÉE
 * (lifestyle) et un PACKSHOT détouré sur transparent. Indexés par slug.
 * Partagé par les variantes (galerie, hero, registre, damier) pour rester
 * cohérent. Eugénie est une pièce dessinée → « porté » = aquarelle d'atelier.
 */
export type RingMedia = {
  worn: string
  wornPosition?: string
  packshot: string
}

export const RING_MEDIA: Partial<Record<string, RingMedia>> = {
  josephine: {
    worn: '/images/real/main-chaise-josephine.webp',
    wornPosition: '50% 40%',
    packshot: '/images/bijoux-detoures/josephine.png',
  },
  aurore: {
    worn: '/images/carnet/aurore-portee.jpg',
    packshot: '/images/bijoux-detoures/aurore.png',
  },
  eugenie: {
    // Placeholder pour le grand visuel porté (pas de photo) ; le packshot garde le dessin.
    worn: '/images/placeholder-piece.svg',
    packshot: '/images/bijoux-detoures/eugenie.png',
  },
  thelma: {
    worn: '/images/real/mains-poche-thelma.webp',
    wornPosition: '50% 45%',
    packshot: '/images/bijoux-detoures/thelma.png',
  },
  louise: {
    worn: '/images/real/buste-thelma-louise.webp',
    wornPosition: '50% 35%',
    packshot: '/images/bijoux-detoures/louise.png',
  },
}

export function ringMedia(slug: string): RingMedia | undefined {
  return RING_MEDIA[slug]
}
