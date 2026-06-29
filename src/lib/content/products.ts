export type Product = {
  slug: string
  name: string
  tagline: string
  price: string
  description: string
  materials: string
  story: string
  image: string
  imageAlt: string
  /** Point focal CSS (object-position), piloté par le hotspot Sanity (défaut centre). */
  imagePosition?: string
  /** Zoom de cadrage (scale) sur l'image dans le défilé Collection. Défaut 1. */
  imageZoom?: number
}

export const PRODUCTS: Product[] = [
  {
    slug: 'josephine',
    name: 'Joséphine',
    tagline: 'La bague entourage intemporelle',
    price: 'Sur devis',
    description:
      "On en hérite, on l'admire depuis l'enfance sur les mains de nos aïeules. Joséphine incarne la délicatesse du halo de diamants pavés autour d'une pierre centrale. Chaque détail est travaillé pour la rendre aussi confortable que belle à l'œil.",
    materials:
      'Or 18 carats (jaune, blanc ou rose) · Diamants pavés certifiés GIA/HRD · Pierre centrale au choix',
    story:
      "Inspirée des bagues de transmission familiale, Joséphine incarne le lien entre générations. Son design épuré mais généreux en matière fait ressentir la qualité du savoir-faire : chaque pavage est positionné pour maximiser la lumière.",
    image: '/images/real/bague-entouree-josephine.webp',
    imageAlt:
      "Bague Joséphine en or 18 carats, pierre centrale entourée d'un halo de diamants — atelier Précieuse, Bordeaux",
    imagePosition: '61% 54%',
    imageZoom: 1.35,
  },
  {
    slug: 'aurore',
    name: 'Aurore',
    tagline: "La promesse d'un nouveau jour",
    price: 'Sur devis',
    description:
      "Aurore évoque la lumière naissante : un solitaire délicat où la pierre semble suspendue, posée sur un anneau fin comme un trait. Pensée pour se porter seule ou se superposer, elle accompagne tous les gestes du quotidien.",
    materials: 'Or 18 carats · Diamant central certifié GIA/HRD · Anneau 1,8 mm',
    story:
      "Le premier modèle dessiné après une nuit blanche, en pensant à toutes celles qui veulent une bague qui ne s'oublie jamais, sans jamais se faire remarquer.",
    image: '/images/real/bague-pierre-aurore.webp',
    imageAlt:
      'Bague Aurore en or 18 carats, solitaire posé sur pierre — atelier Précieuse, Bordeaux',
  },
  {
    slug: 'eugenie',
    name: 'Eugénie',
    tagline: 'La signature poétique',
    price: 'Sur devis',
    description:
      "Eugénie est une trilogie : trois pierres pour trois temps, hier, aujourd'hui, demain. La monture est travaillée en griffes fines pour libérer la lumière, et l'anneau s'évase légèrement vers la pierre centrale.",
    materials:
      'Or 18 carats · Trois diamants gradués certifiés GIA/HRD · Possibilité saphir, rubis ou émeraude central',
    story:
      "Pensée pour célébrer un cap : un anniversaire, une décennie, une étape. Chaque pierre raconte un moment, et l'ensemble fait récit.",
    image: '/images/real/eugenie-dessin.png',
    imageAlt:
      'Dessin de la bague Eugénie, trilogie à pierre marquise et griffes fines — atelier Précieuse, Bordeaux',
  },
  {
    slug: 'thelma',
    name: 'Thelma',
    tagline: "L'audace tranquille",
    price: 'Sur devis',
    description:
      "Thelma joue avec les volumes : une pierre généreuse, une monture sculpturale, un équilibre tenu entre force et grâce. C'est la bague de celles qui ne demandent pas la permission.",
    materials:
      'Or 18 carats · Pierre centrale 1 ct minimum (diamant ou couleur) · Pavage optionnel',
    story:
      "Née d'une commande pour une femme qui voulait « une bague qu'on remarque sans qu'elle hurle ». Le résultat : une pièce ample, mais portée au quotidien sans accroche.",
    image: '/images/real/bague-boule-thelma.webp',
    imageAlt:
      'Bague Thelma en or 18 carats, pierre centrale généreuse à la monture sculpturale — atelier Précieuse, Bordeaux',
  },
  {
    slug: 'louise',
    name: 'Louise',
    tagline: "L'éternelle alliance",
    price: 'Sur devis',
    description:
      "Louise est une alliance, mais pas n'importe laquelle : un demi-tour de diamants pavés, un confort millimétré, une finition main qui se lit à la lumière. À porter seule ou en duo avec une autre pièce de la collection.",
    materials:
      'Or 18 carats · Pavage demi-tour diamants certifiés GIA/HRD · Largeur 2 ou 3 mm au choix',
    story:
      "Le modèle le plus discret de la collection, et pourtant celui qui revient le plus souvent dans les commandes : la preuve que l'évidence ne se démode pas.",
    image: '/images/real/buste-thelma-louise.webp',
    imageAlt:
      'Bague Louise en or 18 carats portée — atelier Précieuse, Bordeaux',
  },
]
