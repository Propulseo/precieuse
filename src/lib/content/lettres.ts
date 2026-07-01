export type Lettre = {
  citation: string
  auteur: string
  initiale: string
  ville: string
  date: string
  piece: string
  /** Photo de la pièce portée (galerie témoignages). Optionnel : fallback côté composant. */
  image?: string
  imageAlt?: string
  /** `object-position` CSS (point focal Sanity). */
  imagePosition?: string
}

// NOTE: placeholders — à valider / remplacer par de vrais avis + photos (Eméline).
// Règle « galerie portée » : 1 avis = 1 photo « bague sur chaise » = 1 bague.
export const LETTRES: Lettre[] = [
  {
    citation:
      "Emeline est tout simplement une artiste. Les bijoux qu'elle a créés pour moi se sont révélés magnifiques, le résultat est au-delà de ce que j'avais imaginé. Je suis émue et enthousiasmée.",
    auteur: 'Martine B.',
    initiale: 'M',
    ville: 'Bordeaux',
    date: '18 mars 2025',
    piece: 'Modèle Aurore',
    image: '/images/real/bague-main-chaise-aurore.webp',
  },
  {
    citation:
      "Très contente de votre création pour ma bague. Très professionnelle, agréable et sympathique. Je recommande sans hésiter.",
    auteur: 'Sandrine L.',
    initiale: 'S',
    ville: 'Lyon',
    date: '3 octobre 2024',
    piece: 'Modèle Thelma',
    image: '/images/real/bague-main-chaise-thelma.webp',
  },
  {
    citation:
      "On sent dans chaque pièce le temps passé, la précision, l'amour du métier. Je porte ma bague tous les jours depuis deux ans, elle est toujours aussi belle.",
    auteur: 'Camille R.',
    initiale: 'C',
    ville: 'Paris',
    date: '12 février 2025',
    piece: 'Modèle Joséphine',
    image: '/images/real/main-chaise-josephine.webp',
  },
]
