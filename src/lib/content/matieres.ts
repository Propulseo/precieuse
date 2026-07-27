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
      "Or 18 carats jaune, blanc ou rose, façonné à la main dans mon atelier bordelais. Je sélectionne un or tracé, issu de partenaires exigeants et privilégiant le recyclage lorsque cela est possible. Chaque création respecte une charte de qualité stricte, pour offrir un bijou aussi responsable que durable.",
    image: '/images/matieres/or-19kt-v2.jpg',
    image_alt:
      "Or 18 carats poli reposant sur une pierre claire — matière de l'atelier Précieuse, Bordeaux",
    // Kimberley ne concerne que les diamants (retour Emeline #9) — retiré de l'or.
    annotation_caveat: 'sourcé et tracé',
    page: 'p. 05',
  },
  {
    slug: 'diamants',
    nom: 'Diamants',
    sous_titre: 'certifiés GIA/HRD',
    description_courte:
      'Diamants soigneusement sélectionnés dans toutes les formes, selon vos envies. Certifiés GIA ou HRD, chaque diamant est rigoureusement sourcé et tracé, conformément au Processus de Kimberley, garantissant une provenance responsable et transparente.',
    image: '/images/matieres/diamants-gvs-v2.jpg',
    image_alt:
      'Diamant taille poire certifié GIA/HRD présenté sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'certifiés GIA/HRD · processus de Kimberley',
    page: 'p. 06',
  },
  // Pierres de couleur — renommées suite au retour cliente (Saphirs→Tanzanites,
  // Émeraudes→Tourmalines, Rubis→Opales). Photos propres à chaque pierre depuis
  // le retour Emeline du 27/07 (#14, #30, #31) : plus de réemploi par proximité
  // de couleur. La mention « Disponible sur commande » vit dans le caveat, pas
  // dans la description (sinon doublon en bas de fiche).
  {
    slug: 'tanzanites',
    nom: 'Tanzanites',
    sous_titre: "Beauté rare d'Afrique",
    description_courte:
      "Gemme rare née au pied du Kilimandjaro, la tanzanite est extraite d'une seule et unique mine au monde, en Tanzanie. Ses fascinantes nuances de bleu et de violet, associées à son exceptionnelle rareté, en font une pierre précieuse d'une élégance incomparable.",
    image: '/images/matieres/tanzanites-v3.jpg',
    image_alt:
      "Tanzanite taille poire d'un bleu-violet intense présentée sur socle — atelier Précieuse, Bordeaux",
    annotation_caveat: 'Disponible sur commande',
    page: 'p. 07',
  },
  {
    slug: 'tourmalines',
    nom: 'Tourmalines',
    sous_titre: 'La pierre bonbon, colorée à souhait',
    description_courte:
      "La tourmaline séduit par son incroyable palette de couleurs, du rose au vert, en passant par le bleu. La plus rare, la tourmaline Paraíba, découverte au Brésil, est célèbre pour son intense bleu turquoise et fait partie des gemmes les plus précieuses au monde.",
    image: '/images/matieres/tourmalines-v3.jpg',
    image_alt:
      'Tourmaline bicolore rose et verte, taille émeraude, présentée sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'Disponible sur commande',
    page: 'p. 08',
  },
  {
    slug: 'opales',
    nom: 'Opales',
    sous_titre: 'La pierre aux mille feux',
    description_courte:
      "L'opale est une gemme fascinante, célèbre pour ses jeux de lumière uniques qui révèlent une infinité de couleurs. Les opales d'Éthiopie, particulièrement recherchées, séduisent par leurs éclats flamboyants, allant du jaune au rouge en passant par l'orange et le vert.",
    image: '/images/matieres/opales-v3.jpg',
    image_alt:
      'Opale cabochon ovale aux feux orangés et verts présentée sur socle — atelier Précieuse, Bordeaux',
    annotation_caveat: 'Disponible sur commande',
    page: 'p. 09',
  },
]
