const ITEMS = [
  { icon: 'RotateCcw', text: 'Retour gratuit 30 jours' },
  { icon: 'Ruler', text: 'Remise à taille offerte' },
  { icon: 'MessageCircle', text: 'WhatsApp 7j/7 avec Emeline' },
  { icon: 'ShieldCheck', text: 'RJC · Processus de Kimberly' },
]

function Icon({ name }: { name: string }) {
  const props = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  if (name === 'RotateCcw') return (
    <svg {...props}><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
  )
  if (name === 'Ruler') return (
    <svg {...props}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
  )
  if (name === 'MessageCircle') return (
    <svg {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></svg>
  )
  return (
    <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
  )
}

export function Reassurance() {
  return (
    <div className="bg-poudre border-y border-canard/10 py-5 px-4 lg:px-8">
      <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {ITEMS.map((item) => (
          <span key={item.text} className="flex items-center gap-2.5 text-canard/70">
            <span className="text-rouille"><Icon name={item.icon} /></span>
            <span className="font-display text-[13px] tracking-wide">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
