export type Lettre = {
  citation: string
  auteur: string
  initiale: string
  ville: string
  date: string
  piece: string
}

export const LETTRES: Lettre[] = [
  {
    citation:
      "J'ai reçu Joséphine un mardi matin. Je ne l'ai plus retirée depuis. Ce n'est pas une bague, c'est une présence.",
    auteur: 'Claire M.',
    initiale: 'C',
    ville: 'Paris',
    date: '12 février 2025',
    piece: 'Joséphine',
  },
  {
    citation:
      "Eméline a su traduire en métal ce que je ne savais pas dire en mots. La pièce est exactement ce que je portais en tête sans le savoir.",
    auteur: 'Sophie L.',
    initiale: 'S',
    ville: 'Lyon',
    date: '3 octobre 2024',
    piece: 'Solis',
  },
  {
    citation:
      "Chaque fois que je regarde ma main, je pense à l'atelier, à la lumière de Lisbonne. C'est un voyage porté sur le doigt.",
    auteur: 'Margaux D.',
    initiale: 'M',
    ville: 'Bordeaux',
    date: '18 mars 2025',
    piece: 'Nidus',
  },
]
