export type Lettre = {
  citation: string
  auteur: string
  initiale: string
  ville: string
  date: string
  piece: string
}

// NOTE: placeholders — à valider / remplacer par de vrais avis (Eméline).
export const LETTRES: Lettre[] = [
  {
    citation:
      "Emeline est tout simplement une artiste. Les bijoux qu'elle a créés pour moi se sont révélés magnifiques, le résultat est au-delà de ce que j'avais imaginé. Je suis émue et enthousiasmée.",
    auteur: 'Martine B.',
    initiale: 'M',
    ville: 'Bordeaux',
    date: '18 mars 2025',
    piece: 'Création sur-mesure',
  },
  {
    citation:
      "Très contente de votre création pour ma bague. Très professionnelle, agréable et sympathique. Je recommande sans hésiter.",
    auteur: 'Sandrine L.',
    initiale: 'S',
    ville: 'Lyon',
    date: '3 octobre 2024',
    piece: 'Bague serpentine sur-mesure',
  },
  {
    citation:
      "On sent dans chaque pièce le temps passé, la précision, l'amour du métier. Je porte ma bague tous les jours depuis deux ans, elle est toujours aussi belle.",
    auteur: 'Camille R.',
    initiale: 'C',
    ville: 'Paris',
    date: '12 février 2025',
    piece: 'Modèle Joséphine',
  },
]
