export type Matiere = {
  slug: string
  nom: string
  sous_titre: string
  description_courte: string
  image: string
  image_alt: string
  /** Point focal CSS (object-position), piloté par le hotspot Sanity (défaut centre). */
  imagePosition?: string
  annotation_caveat: string
  page: string
}

export const MATIERES: Matiere[] = [
  {
    slug: 'or-18kt',
    nom: 'Or 18 carats',
    sous_titre: 'sourcé et tracé',
    description_courte:
      'Or 18 carats jaune, blanc ou rose, travaillé à la main dans notre atelier à Bordeaux. Un or sourcé et tracé grâce au traité de Kimberley, choisi pour son éclat chaud et sa tenue — pensé pour durer.',
    image: '/images/matieres/or-19kt-v2.jpg',
    image_alt:
      "Or 18 carats poli reposant sur une pierre claire — matière de l'atelier Précieuse, Bordeaux",
    annotation_caveat: 'sourcé et tracé · Kimberley',
    page: 'p. 05',
  },
  {
    slug: 'diamants',
    nom: 'Diamants',
    sous_titre: 'certifiés GIA/HRD',
    description_courte:
      'Diamants taille brillant, navette et baguette, certifiés GIA ou HRD. Chaque pierre est sourcée et tracée grâce au traité de Kimberley, puis sertie à la main pour libérer la lumière au maximum.',
    image: '/images/matieres/diamants-gvs-v2.jpg',
    image_alt:
      'Diamant taille poire certifié GIA/HRD présenté sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'certifiés GIA/HRD',
    page: 'p. 06',
  },
  // Pierres de couleur — renommées suite au retour cliente (Saphirs→Tanzanites,
  // Émeraudes→Tourmalines, Rubis→Opales). Photos « gemme sur socle » réutilisées
  // par proximité de couleur : Tanzanite=saphir (bleu), Tourmaline=émeraude (vert).
  // Opale=rubis (rose-rouge) — À REMPLACER : une opale n'a pas cet aspect facetté.
  {
    slug: 'tanzanites',
    nom: 'Tanzanites',
    sous_titre: 'bleu-violet rare',
    description_courte:
      "Tanzanite au bleu-violet profond, gemme rare née au pied du Kilimandjaro et nulle part ailleurs. Sa couleur se révèle autrement à chaque lumière. Sur commande pour les pièces sur-mesure.",
    image: '/images/matieres/saphirs-v2.jpg',
    image_alt:
      'Gemme bleu-violet taille émeraude présentée sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'sur commande',
    page: 'p. 07',
  },
  {
    slug: 'tourmalines',
    nom: 'Tourmalines',
    sous_titre: 'toute une palette',
    description_courte:
      "Tourmalines vertes, rosées ou indigo, jusqu'au bleu Paraïba électrique. La pierre aux mille couleurs, choisie une à une pour son caractère. Sur commande pour les pièces sur-mesure.",
    image: '/images/matieres/emeraudes-v2.jpg',
    image_alt:
      'Gemme verte taille émeraude présentée sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'sur commande',
    page: 'p. 08',
  },
  {
    slug: 'opales',
    nom: 'Opales',
    sous_titre: 'feux changeants',
    description_courte:
      "Opales aux reflets mouvants : chaque éclat de lumière y révèle une nouvelle couleur. Une pierre vivante, jamais deux fois la même. Sur commande pour les pièces sur-mesure.",
    image: '/images/matieres/rubis-v2.jpg',
    image_alt:
      'Gemme rose-rouge taille émeraude présentée sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'sur commande',
    page: 'p. 09',
  },
]
