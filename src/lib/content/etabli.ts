export type EtabliStep = {
  roman: string
  index: number
  title: string
  annotation: string
  detail: string
  image: string
  imageAlt: string
}

export const ETABLI_STEPS: EtabliStep[] = [
  {
    roman: 'I',
    index: 1,
    title: "L'Esquisse",
    annotation: 'toujours au crayon B, jamais à la gomme. Les erreurs restent',
    detail:
      "Le premier trait décide de tout. Sur papier vélin, le crayon laisse une mémoire que la pièce finie portera.",
    image: '/images/atelier/esquisses-amethyste.jpg',
    imageAlt: "Esquisses d'améthyste sur papier vélin",
  },
  {
    roman: 'II',
    index: 2,
    title: 'La Cire',
    annotation: 'température critique à 68°C, une seconde de trop et tout recommence',
    detail:
      "Modelage à la main du volume exact. La cire pardonne moins que le papier : elle est le dernier brouillon.",
    image: '/images/atelier/dessin-aquarelle.jpg',
    imageAlt: 'Modèle en cire de la pièce',
  },
  {
    roman: 'III',
    index: 3,
    title: 'La Fonte',
    annotation: "l'or entre à 1064°C, il sort pièce unique. Il n'y a pas d'autre façon",
    detail:
      "La cire disparaît, l'or prend sa place. Une seule pièce sortira du moule. Il n'y aura pas de seconde chance.",
    image: '/images/stitch/journal-fonte-or.jpg',
    imageAlt: "Fonte de l'or dans le moule",
  },
  {
    roman: 'IV',
    index: 4,
    title: 'Le Polissage',
    annotation: 'deux heures minimum, à la main, sous loupe. C\'est là que la lumière naît',
    detail:
      "Chaque grain est poursuivi, chaque arête adoucie. La lumière n'est pas donnée par le métal : elle est arrachée à la main.",
    image: '/images/atelier/bague-en-fabrication.jpg',
    imageAlt: 'Polissage final de la bague en atelier',
  },
]
