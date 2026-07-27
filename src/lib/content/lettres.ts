export type Lettre = {
  citation: string
  auteur: string
  initiale: string
  /** Optionnel : les avis récupérés n'ont pas tous une ville renseignée. */
  ville?: string
  /** Optionnel : format libre (ex. « 18 mars 2025 »). */
  date?: string
  piece: string
  /** Photo de la pièce portée (galerie témoignages). Optionnel : fallback côté composant. */
  image?: string
  imageAlt?: string
  /** `object-position` CSS (point focal Sanity). */
  imagePosition?: string
}

// Vrais avis transmis par Emeline (retour du 27/07, #28) — ne plus traiter comme
// des placeholders. Ville et date non communiquées : champs laissés vides,
// l'affichage s'adapte. `piece` = « Création sur-mesure » (#29) : ces avis
// portent sur du sur-mesure, pas sur un modèle de la collection — le lien
// « 1 avis = 1 photo = 1 bague » n'est donc plus revendiqué.
export const LETTRES: Lettre[] = [
  {
    citation:
      "Merci à vous pour l'originalité de vos bijoux, mais surtout pour votre gentillesse, votre patience et votre compréhension ! Une vraie pro ! Je recommande fortement…",
    auteur: 'L. Nicola',
    initiale: 'L',
    piece: 'Création sur-mesure',
    image: '/images/real/bague-main-chaise-aurore.webp',
  },
  {
    citation:
      "Emeline est tout simplement une artiste ! Les bijoux qu'elle a créés pour moi se sont révélés être magnifiques, le résultat est au-delà de ce que j'avais imaginé… Je suis émue et enthousiasmée ! En un mot : Sublime ! Merci de tout cœur.",
    auteur: 'M. Benoit',
    initiale: 'M',
    piece: 'Création sur-mesure',
    image: '/images/real/bague-main-chaise-thelma.webp',
  },
  {
    citation:
      'Toujours disponible, de bons conseils, et des prix justes. Merci beaucoup, vous êtes une vraie professionnelle.',
    auteur: 'I. Echinops',
    initiale: 'I',
    piece: 'Création sur-mesure',
    image: '/images/real/main-chaise-josephine.webp',
  },
]
