export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  /** Point focal CSS (object-position), piloté par le hotspot Sanity (défaut centre). */
  imagePosition?: string
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
    image: '/images/real/bague-main-josephine.webp',
    imageAlt:
      'Bague Joséphine en or 18 carats portée à la main — atelier Précieuse, Bordeaux',
    featured: true,
  },
  {
    slug: 'or-18kt-source-trace',
    title: "L'or 18 carats, sourcé et tracé",
    excerpt:
      "Pourquoi nous ne travaillons que de l'or sourcé et tracé grâce au traité de Kimberley, et ce que cela change pour votre bijou. (Brouillon — à valider.)",
    category: 'Matières',
    date: '28 avril 2026',
    readTime: '4 min',
    image: '/images/real/bague-pierre-josephine.webp',
    imageAlt:
      "Bague en or 18 carats poli sertie d'une pierre — savoir-faire de l'atelier Précieuse, Bordeaux",
  },
  {
    slug: 'journal-fonte-matinee-atelier',
    title: "Journal de fonte : une matinée à l'atelier",
    excerpt:
      "1 064 °C, une seule chance. Récit d'une fonte à cire perdue, entre tension et émerveillement.",
    category: 'Atelier',
    date: '15 avril 2026',
    readTime: '5 min',
    image: '/images/real/deux-mains.webp',
    imageAlt:
      "Deux mains présentant une bague en or 18 carats — geste de l'atelier Précieuse, Bordeaux",
  },
  {
    slug: 'choisir-pierre-precieuse',
    title: 'Comment choisir sa pierre précieuse',
    excerpt:
      "Couleur, pureté, taille, origine : les quatre critères qui comptent vraiment, expliqués sans jargon.",
    category: 'Guides',
    date: '2 avril 2026',
    readTime: '7 min',
    image: '/images/real/bague-diamant.webp',
    imageAlt:
      'Bague en or 18 carats sertie de diamants certifiés GIA/HRD — atelier Précieuse, Bordeaux',
  },
  {
    slug: 'rhodolite-pierre-oubliee',
    title: 'La rhodolite, pierre oubliée',
    excerpt:
      "Rose framboise, abordable, résistante. Portrait d'une gemme discrète qui mérite votre attention.",
    category: 'Matières',
    date: '18 mars 2026',
    readTime: '3 min',
    image: '/images/real/main-chaise-josephine.webp',
    imageAlt:
      'Bague en or 18 carats sertie de pierres de couleur, portée à la main — atelier Précieuse, Bordeaux',
  },
  {
    slug: 'bague-portee-au-quotidien',
    title: 'Portée au quotidien : les gestes qui comptent',
    excerpt:
      "Entretien, rangement, habitudes. Tout ce qu'il faut savoir pour garder votre bague intacte des années.",
    category: 'Guides',
    date: '4 mars 2026',
    readTime: '4 min',
    image: '/images/real/bague-main-chaise-aurore.webp',
    imageAlt:
      'Bague en or 18 carats portée à la main — atelier Précieuse, Bordeaux',
  },
]

export const CATEGORIES = ['Tous', 'Atelier', 'Matières', 'Guides'] as const
