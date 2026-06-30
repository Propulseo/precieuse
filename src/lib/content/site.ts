export const SITE = {
  brand: 'Précieuse',
  baseline: 'Joaillerie artisanale · Bordeaux',
  email: 'contact@precieuse-joaillerie.com',
  // TODO: remplacer par le vrai numéro WhatsApp français (+33) d'Emeline — placeholder pour l'instant.
  whatsapp: 'https://wa.me/33600000000',
  instagram: 'https://instagram.com/precieusejoaillerie',
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
