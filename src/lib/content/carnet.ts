export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  featured?: boolean
}

export const ARTICLES: Article[] = [
  {
    slug: 'chemin-dune-bague',
    title: "Le chemin d'une bague : de l'esquisse à l'écrin",
    excerpt:
      "Quatre semaines, un seul bijou. Retour en images sur la fabrication complète d'une Joséphine, du premier croquis au polissage final.",
    category: 'Atelier',
    date: '12 mai 2026',
    readTime: '6 min',
    image: '/images/atelier/esquisses-amethyste.jpg',
    imageAlt: "Esquisses de bijoux et améthyste brute sur l'établi",
    featured: true,
  },
  {
    slug: 'or-19kt-signature-portugal',
    title: "L'or 19 kt, signature du Portugal",
    excerpt:
      "Pourquoi le Portugal travaille un or plus pur que le reste de l'Europe, et ce que cela change pour votre bijou.",
    category: 'Matières',
    date: '28 avril 2026',
    readTime: '4 min',
    image: '/images/matieres/or-19kt-v2.jpg',
    imageAlt: "Anneau d'or 19 kt poli",
  },
  {
    slug: 'journal-fonte-matinee-atelier',
    title: "Journal de fonte : une matinée à l'atelier",
    excerpt:
      "1 064 °C, une seule chance. Récit d'une fonte à cire perdue, entre tension et émerveillement.",
    category: 'Atelier',
    date: '15 avril 2026',
    readTime: '5 min',
    image: '/images/stitch/journal-fonte-or.jpg',
    imageAlt: "Fonte de l'or à l'atelier",
  },
  {
    slug: 'choisir-pierre-precieuse',
    title: 'Comment choisir sa pierre précieuse',
    excerpt:
      "Couleur, pureté, taille, origine : les quatre critères qui comptent vraiment, expliqués sans jargon.",
    category: 'Guides',
    date: '2 avril 2026',
    readTime: '7 min',
    image: '/images/matieres/diamants-gvs-v2.jpg',
    imageAlt: 'Diamant taille poire',
  },
  {
    slug: 'rhodolite-pierre-oubliee',
    title: 'La rhodolite, pierre oubliée',
    excerpt:
      "Rose framboise, abordable, résistante. Portrait d'une gemme discrète qui mérite votre attention.",
    category: 'Matières',
    date: '18 mars 2026',
    readTime: '3 min',
    image: '/images/carnet/rhodolite-profil.jpg',
    imageAlt: 'Rhodolite rose framboise en gros plan',
  },
  {
    slug: 'bague-portee-au-quotidien',
    title: 'Portée au quotidien : les gestes qui comptent',
    excerpt:
      "Entretien, rangement, habitudes. Tout ce qu'il faut savoir pour garder votre bague intacte des années.",
    category: 'Guides',
    date: '4 mars 2026',
    readTime: '4 min',
    image: '/images/carnet/josephine-portee.jpg',
    imageAlt: 'Bague Joséphine portée au quotidien',
  },
]

export const CATEGORIES = ['Tous', 'Atelier', 'Matières', 'Guides'] as const
