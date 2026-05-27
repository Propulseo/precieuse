export const CONTACT = {
  tel: '+33 1 23 45 67 89',
  email: 'atelier@precieuse-joaillerie.com',
  hours: 'mardi → samedi, 10h–18h',
  instagram: 'precieusejoaillerie',
  instagramUrl: 'https://www.instagram.com/precieusejoaillerie',
  facebookUrl: 'https://www.facebook.com/people/Pr%C3%A9cieuse/61576262354969/',
  linkedinUrl: 'https://www.linkedin.com/in/emeline-le-ray-70052116a',
}

export const DEMAND_TYPES = [
  { value: 'sur-mesure', label: 'Sur-mesure' },
  { value: 'restauration', label: 'Restauration' },
  { value: 'question', label: 'Question' },
  { value: 'autre', label: 'Autre' },
] as const

export type DemandType = (typeof DEMAND_TYPES)[number]['value']
