export type Matiere = {
  slug: string
  nom: string
  sous_titre: string
  description_courte: string
  image: string
  image_alt: string
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
    image_alt: "Anneau d'or 18 carats poli, posé sur un galet de marbre blanc",
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
    image_alt: 'Diamant taille poire posé sur podium céramique beige',
    annotation_caveat: 'certifiés GIA/HRD',
    page: 'p. 06',
  },
  {
    slug: 'saphirs',
    nom: 'Saphirs',
    sous_titre: 'bleu de roi · padparadscha',
    description_courte:
      'Saphirs bleu de roi, jaune miel ou padparadscha rose-orangé, sourcés en Birmanie ou au Sri Lanka. Sur commande pour les pièces sur-mesure.',
    image: '/images/matieres/saphirs-v2.jpg',
    image_alt: 'Saphir bleu taille émeraude posé sur podium céramique beige',
    annotation_caveat: 'sur commande',
    page: 'p. 07',
  },
  {
    slug: 'emeraudes',
    nom: 'Émeraudes',
    sous_titre: 'Colombie · Zambie',
    description_courte:
      'Émeraudes colombiennes (vert intense, jardin caractéristique) ou zambiennes (vert plus froid, plus pures). Une matière vivante, jamais identique.',
    image: '/images/matieres/emeraudes-v2.jpg',
    image_alt: 'Émeraude verte taille émeraude posée sur podium céramique beige',
    annotation_caveat: 'vivantes, jamais identiques',
    page: 'p. 08',
  },
  {
    slug: 'rubis',
    nom: 'Rubis',
    sous_titre: 'rouge sang de pigeon',
    description_courte:
      'Rubis Mozambique ou Birmanie, du rouge framboise au mythique sang de pigeon. Pierre de cœur, signature des pièces les plus émotionnelles.',
    image: '/images/matieres/rubis-v2.jpg',
    image_alt: 'Rubis rose taille émeraude posé sur podium céramique beige',
    annotation_caveat: 'pierre de cœur',
    page: 'p. 09',
  },
]
