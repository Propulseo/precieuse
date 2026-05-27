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
}

export const PRODUCTS: Product[] = [
  {
    slug: 'josephine',
    name: 'Joséphine',
    tagline: 'La bague entourage intemporelle',
    price: 'À partir de 2 500 €',
    description:
      "On en hérite, on l'admire depuis l'enfance sur les mains de nos aïeules. Joséphine incarne la délicatesse du halo de diamants pavés autour d'une pierre centrale. Chaque détail est travaillé pour la rendre aussi confortable que belle à l'œil.",
    materials:
      'Or 19kt (jaune, blanc ou rose) · Diamants pavés GVS certifiés · Pierre centrale au choix',
    story:
      "Inspirée des bagues de transmission familiale, Joséphine incarne le lien entre générations. Son design épuré mais généreux en matière fait ressentir la qualité du savoir-faire : chaque pavage est positionné pour maximiser la lumière.",
    image: '/images/bijoux-officiels/josephine.jpg',
    imageAlt: 'Bague Joséphine, entourage diamants',
  },
  {
    slug: 'aurore',
    name: 'Aurore',
    tagline: "La promesse d'un nouveau jour",
    price: 'À partir de 1 800 €',
    description:
      "Aurore évoque la lumière naissante : un solitaire délicat où la pierre semble suspendue, posée sur un anneau fin comme un trait. Pensée pour se porter seule ou se superposer, elle accompagne tous les gestes du quotidien.",
    materials: 'Or 19kt · Diamant central GVS certifié · Anneau 1,8mm',
    story:
      "Le premier modèle dessiné après une nuit blanche, en pensant à toutes celles qui veulent une bague qui ne s'oublie jamais, sans jamais se faire remarquer.",
    image: '/images/bijoux-officiels/aurore.jpg',
    imageAlt: 'Bague Aurore, solitaire diamant',
  },
  {
    slug: 'eugenie',
    name: 'Eugénie',
    tagline: 'La signature poétique',
    price: 'À partir de 3 200 €',
    description:
      "Eugénie est une trilogie : trois pierres pour trois temps, hier, aujourd'hui, demain. La monture est travaillée en griffes fines pour libérer la lumière, et l'anneau s'évase légèrement vers la pierre centrale.",
    materials:
      'Or 19kt · Trois diamants gradués GVS · Possibilité saphir, rubis ou émeraude central',
    story:
      "Pensée pour célébrer un cap : un anniversaire, une décennie, une étape. Chaque pierre raconte un moment, et l'ensemble fait récit.",
    image: '/images/bijoux-officiels/eugenie.png',
    imageAlt: 'Bague Eugénie, dessin original',
  },
  {
    slug: 'thelma',
    name: 'Thelma',
    tagline: "L'audace tranquille",
    price: 'À partir de 4 500 €',
    description:
      "Thelma joue avec les volumes : une pierre généreuse, une monture sculpturale, un équilibre tenu entre force et grâce. C'est la bague de celles qui ne demandent pas la permission.",
    materials:
      'Or 19kt · Pierre centrale 1ct minimum (diamant ou couleur) · Pavage optionnel',
    story:
      "Née d'une commande pour une femme qui voulait « une bague qu'on remarque sans qu'elle hurle ». Le résultat : une pièce ample, mais portée au quotidien sans accroche.",
    image: '/images/bijoux-officiels/thelma.jpg',
    imageAlt: 'Bague Thelma, pierre centrale sculptée',
  },
  {
    slug: 'louise',
    name: 'Louise',
    tagline: "L'éternelle alliance",
    price: 'À partir de 1 200 €',
    description:
      "Louise est une alliance, mais pas n'importe laquelle : un demi-tour de diamants pavés, un confort millimétré, une finition main qui se lit à la lumière. À porter seule ou en duo avec une autre pièce de la collection.",
    materials:
      'Or 19kt · Pavage demi-tour diamants GVS · Largeur 2 ou 3mm au choix',
    story:
      "Le modèle le plus discret de la collection, et pourtant celui qui revient le plus souvent dans les commandes : la preuve que l'évidence ne se démode pas.",
    image: '/images/bijoux-officiels/louise.jpg',
    imageAlt: 'Bague Louise, alliance pavée',
  },
]
