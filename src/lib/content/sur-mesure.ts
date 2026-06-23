export type MetamorphoseStep = {
  roman: string
  title: string
  annotation: string
  detail: string
  image: string
  imageAlt: string
}

export const METAMORPHOSE: MetamorphoseStep[] = [
  {
    roman: 'I',
    title: "L'Esquisse",
    annotation: 'toujours au crayon B, sur papier vélin',
    detail:
      "Tout commence par un échange. Vous me parlez de vous, de l'occasion, du geste que vous imaginez. Je traduis vos mots en lignes : deux ou trois croquis, autant de directions possibles. Rien n'est figé, tout se construit ensemble.",
    image: '/images/real/deux-mains.webp',
    imageAlt:
      "Deux mains présentant une bague en or 18 carats — geste de l'atelier Précieuse, Bordeaux",
  },
  {
    roman: 'II',
    title: 'La Fonte',
    annotation: "l'or entre à 1064 °C, il sort pièce unique",
    detail:
      "Le croquis validé devient volume. Modelage en cire, puis fonte à cire perdue en or 18 carats dans mon atelier à Bordeaux. Chaque pièce est coulée individuellement. Il n'y aura pas de seconde chance, et c'est ce qui rend chaque bijou irremplaçable.",
    image: '/images/real/mains-poche-thelma.webp',
    imageAlt:
      'Bague Thelma en or 18 carats présentée à la main — atelier Précieuse, Bordeaux',
  },
  {
    roman: 'III',
    title: "L'Écrin",
    annotation: 'polie, sertie, signée. Votre bijou est né',
    detail:
      "Polissage à la main, sertissage pierre par pierre sous loupe. Chaque grain est poursuivi, chaque arête adoucie. Le bijou reçoit son certificat d'authenticité, puis rejoint son écrin pour le voyage jusqu'à vous. Livraison sécurisée, assurée, suivie.",
    image: '/images/real/bague-main-josephine.webp',
    imageAlt:
      'Bague Joséphine en or 18 carats portée à la main — atelier Précieuse, Bordeaux',
  },
]

export const PROMESSES = [
  {
    titre: 'Or 18 carats',
    detail: 'Sourcé et tracé grâce au traité de Kimberley',
    image: '/images/real/bague-pierre-josephine.webp',
    imageAlt:
      "Bague en or 18 carats poli sertie d'une pierre — atelier Précieuse, Bordeaux",
  },
  {
    titre: 'Pierres certifiées',
    detail: 'Diamants et pierres certifiés GIA/HRD, choisis un à un',
    image: '/images/real/bague-diamant.webp',
    imageAlt:
      'Bague en or 18 carats sertie de diamants certifiés GIA/HRD — atelier Précieuse, Bordeaux',
  },
  {
    titre: 'Fait main',
    detail: 'Fonte à cire perdue, sertissage sous loupe',
    image: '/images/real/bague-pierre-aurore.webp',
    imageAlt:
      "Bague en or 18 carats sertie d'une pierre de couleur — atelier Précieuse, Bordeaux",
  },
  {
    titre: '4 à 8 semaines',
    detail: 'Le temps juste pour un travail sans compromis',
    image: '/images/real/bague-entouree-josephine.webp',
    imageAlt:
      'Bague en or 18 carats, pierre de couleur entourée de diamants — atelier Précieuse, Bordeaux',
  },
  {
    titre: 'Remise sécurisée',
    detail: 'Express, assurée, certificat inclus',
    image: '/images/real/bague-rubis.webp',
    imageAlt: "Bague en or 18 carats sertie d'un rubis — atelier Précieuse, Bordeaux",
  },
]

export const CREATION_TYPES = [
  { value: 'bague', label: 'Bague' },
  { value: 'alliance', label: 'Alliance' },
  { value: 'pendentif', label: 'Pendentif' },
  { value: 'boucles', label: "Boucles d'oreilles" },
  { value: 'autre', label: 'Autre création' },
]

export const BUDGETS = [
  { value: 'a-discuter', label: 'À discuter ensemble' },
  { value: 'mesure', label: 'Création sur-mesure' },
  { value: 'piece-exception', label: "Pièce d'exception" },
]
