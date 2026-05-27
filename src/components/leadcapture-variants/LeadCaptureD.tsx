const TILES = [
  { src: '/images/carnet/josephine-portee.jpg', alt: 'Joséphine portée' },
  { src: '/images/carnet/aurore-portee.jpg', alt: 'Aurore portée' },
  { src: '/images/bijou-lifestyle-main.jpg', alt: 'Bague lifestyle, sur main' },
  { src: '/images/bijou-lifestyle-blazer.jpg', alt: 'Bague lifestyle, blazer' },
]

function MonogramSeal() {
  return (
    <svg aria-hidden viewBox="0 0 120 120" className="w-[80px] h-[80px] text-gold opacity-90">
      <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" fill="none" />
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontSize="32"
        fill="currentColor"
        fontFamily="serif"
        fontStyle="italic"
      >
        P
      </text>
      <text x="60" y="92" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="serif" letterSpacing="2.4">
        PORTÉE
      </text>
    </svg>
  )
}

export function LeadCaptureD() {
  return (
    <section className="relative bg-cream border-t border-b border-ink/15 py-20 lg:py-28 px-6 overflow-hidden">
      {/* Mosaïque de vignettes floutées */}
      <div className="absolute inset-0 grid grid-cols-2 lg:grid-cols-4 gap-3 p-6 lg:p-10 opacity-90">
        {TILES.map((t, i) => (
          <div
            key={t.src}
            className={`relative overflow-hidden aspect-square ${i >= 2 ? 'hidden lg:block' : ''}`}
          >
            <img
              src={t.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ filter: 'blur(6px) grayscale(20%)' }}
            />
            <div className="absolute inset-0 bg-cream/45" />
          </div>
        ))}
      </div>

      {/* Voile de fond global pour lisibilité */}
      <div className="absolute inset-0 bg-cream/55" />

      {/* Carte centrale */}
      <div className="relative mx-auto max-w-[520px] bg-ivory border border-ink/15 px-9 py-12 lg:px-12 lg:py-14 text-center shadow-[0_30px_70px_-30px_rgba(26,12,4,0.35)]">
        <div className="flex justify-center mb-5">
          <MonogramSeal />
        </div>

        <span className="font-display italic text-[11px] tracking-[0.4em] uppercase text-gold block mb-3">
          Galerie privée
        </span>

        <h2 className="font-headline text-[clamp(28px,3.5vw,40px)] text-ink leading-[1.05] mb-5">
          Déverrouiller les photos.
        </h2>

        <p className="font-display italic text-[15px] text-ink/75 leading-relaxed mb-8">
          Nos bagues, portées par celles qui les ont reçues. Une galerie privée, sur simple demande.
        </p>

        <form
          className="flex flex-col gap-4 text-left"
          onSubmit={(e) => e.preventDefault()}
        >
          <FieldD label="Prénom" name="prenom" />
          <FieldD label="Email" name="email" type="email" required />
          <button
            type="submit"
            className="mt-3 bg-ink text-cream font-display text-[12px] tracking-[0.35em] uppercase py-3.5 hover:bg-raspberry transition-colors"
          >
            Accéder à la galerie
          </button>
        </form>

        <p className="font-display italic text-[11px] text-ink/50 mt-6">
          Réservée aux personnes inscrites. Pas de partage public.
        </p>
      </div>
    </section>
  )
}

function FieldD({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-display italic text-[10px] tracking-[0.3em] uppercase text-ink/60">
        {label}
        {required && <span className="text-raspberry"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border-b border-ink/30 py-2 font-display italic text-[16px] text-ink placeholder:text-ink/30 focus:outline-none focus:border-gold transition-colors"
      />
    </label>
  )
}
