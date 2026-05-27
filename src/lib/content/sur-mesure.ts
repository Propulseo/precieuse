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
    image: '/images/atelier/esquisses-amethyste.jpg',
    imageAlt: 'Esquisses de bijoux sur papier vélin avec améthyste brute',
  },
  {
    roman: 'II',
    title: 'La Fonte',
    annotation: "l'or entre à 1064 °C, il sort pièce unique",
    detail:
      "Le croquis validé devient volume. Modelage en cire, puis fonte à cire perdue en or 19 kt dans mon atelier au Portugal. Chaque pièce est coulée individuellement. Il n'y aura pas de seconde chance, et c'est ce qui rend chaque bijou irremplaçable.",
    image: '/images/atelier/bague-en-fabrication.jpg',
    imageAlt: 'Bague en cours de fabrication sur établi',
  },
  {
    roman: 'III',
    title: "L'Écrin",
    annotation: 'polie, sertie, signée. Votre bijou est né',
    detail:
      "Polissage à la main, sertissage pierre par pierre sous loupe. Chaque grain est poursuivi, chaque arête adoucie. Le bijou reçoit son certificat d'authenticité, puis rejoint son écrin pour le voyage jusqu'à vous. Livraison sécurisée, assurée, suivie.",
    image: '/images/bijoux-officiels/josephine.jpg',
    imageAlt: 'Bague Joséphine terminée, or et diamants',
  },
]

export const PROMESSES = [
  {
    titre: 'Or 19 kt',
    detail: 'Fondu à Lisboa, plus pur que le 18 kt français',
    image: '/images/matieres/or-19kt-v2.jpg',
    imageAlt: 'Or 19 kt poli',
  },
  {
    titre: 'Pierres GVS',
    detail: 'Diamants et pierres certifiés, choisis un à un',
    image: '/images/matieres/diamants-gvs-v2.jpg',
    imageAlt: 'Diamant certifié GVS',
  },
  {
    titre: 'Fait main',
    detail: 'Fonte à cire perdue, sertissage sous loupe',
    image: '/images/matieres/saphirs-v2.jpg',
    imageAlt: 'Saphir taille émeraude',
  },
  {
    titre: '4 à 8 semaines',
    detail: 'Le temps juste pour un travail sans compromis',
    image: '/images/matieres/emeraudes-v2.jpg',
    imageAlt: 'Émeraude colombienne',
  },
  {
    titre: 'Livraison DHL',
    detail: 'Express, assurée, certificat inclus',
    image: '/images/matieres/rubis-v2.jpg',
    imageAlt: 'Rubis taille émeraude',
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
  { value: '1000-2000', label: '1 000 € – 2 000 €' },
  { value: '2000-3500', label: '2 000 € – 3 500 €' },
  { value: '3500-5000', label: '3 500 € – 5 000 €' },
  { value: '5000+', label: '5 000 € et plus' },
]
