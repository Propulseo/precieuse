export const SITE = {
  brand: 'Précieuse',
  baseline: 'Joaillerie artisanale · Bordeaux',
  email: 'contact@precieuse-joaillerie.com',
  whatsapp: 'https://wa.me/33623185887',
  // Libellé du bouton WhatsApp flottant (repli FR ; EN/PT via Sanity/Paraglide).
  whatsappLabel: 'Échanger avec Emeline',
  instagram: 'https://instagram.com/precieusejoaillerie',
  /** Fiche Google Business (avis clients) — lien de partage fourni par Emeline. */
  google: 'https://share.google/IhDrgYIhH7Q6WP9Q7',
  address: {
    street: '[Adresse Bordeaux — à confirmer]',
    zip: '',
    city: 'Bordeaux',
    country: 'France',
  },
  hours: 'sur rendez-vous · mardi à samedi · 10h à 18h',
} as const

// Le parcours sur-mesure vit désormais dans `surMesurePage.steps` (4 étapes
// illustrées, source unique LP + page) — cf. `bespokePageFallback()` et
// `getBespokeSteps`. L'ancien modèle 5 étapes a été retiré.
