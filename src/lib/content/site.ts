export const SITE = {
  brand: 'Précieuse',
  baseline: 'Joaillerie artisanale · Lisboa',
  email: 'atelier@precieuse-joaillerie.com',
  whatsapp: 'https://wa.me/351000000000',
  instagram: 'https://instagram.com/precieusejoaillerie',
  address: {
    street: 'Rua da Boavista, 84',
    zip: '1200-070',
    city: 'Lisboa',
    country: 'Portugal',
  },
  hours: 'sur rendez-vous · mardi à samedi · 10h à 18h',
} as const

export type ProcessStep = {
  number: string
  title: string
  description: string
}

export const BESPOKE_PROCESS: ProcessStep[] = [
  {
    number: '01',
    title: "Vous m'appelez",
    description:
      'Nous discutons de votre vision, vos préférences, votre budget, votre délai. Un moment privilégié, sans engagement.',
  },
  {
    number: '02',
    title: 'Je dessine',
    description:
      'Je crée deux ou trois esquisses à partir de votre brief. Chaque croquis explore une direction différente.',
  },
  {
    number: '03',
    title: 'Vous validez',
    description:
      'Vous choisissez une esquisse, nous affinons ensemble les détails : pierre finale, taille, finitions.',
  },
  {
    number: '04',
    title: 'Je fabrique',
    description:
      'Fabrication complète au Portugal, en fonte à cire perdue, selon les techniques artisanales. Quatre à huit semaines.',
  },
  {
    number: '05',
    title: 'Vous recevez',
    description:
      "Livraison sécurisée, accompagnée d'un certificat d'authenticité et de conseils d'entretien.",
  },
]
