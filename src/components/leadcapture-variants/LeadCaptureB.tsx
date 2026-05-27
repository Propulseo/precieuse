export function LeadCaptureB() {
  return (
    <section className="relative bg-cream border-t border-b border-ink/15">
      <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-2">
        {/* Visuel : bague portée */}
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] overflow-hidden border-r border-ink/10">
          <img
            src="/images/carnet/josephine-portee.jpg"
            alt="Bague Joséphine portée sur la main d'une cliente"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-cream/85 backdrop-blur-sm px-5 py-3 flex items-baseline justify-between">
            <span className="font-script text-[18px] text-raspberry">
              Joséphine, sur la main de Claire
            </span>
            <span className="font-display italic text-[12px] tracking-[0.3em] uppercase text-ink/55">
              Lisboa
            </span>
          </div>
        </div>

        {/* Formulaire */}
        <div className="px-8 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
          <span className="font-display italic text-[12px] tracking-[0.35em] uppercase text-gold block mb-3">
            Sur la main des nôtres
          </span>
          <h2 className="font-headline text-[clamp(32px,4vw,52px)] text-ink leading-[1.05] mb-7">
            Voir les bagues portées.
          </h2>
          <p className="font-display italic text-[18px] text-ink/75 leading-relaxed max-w-prose mb-10">
            Au quotidien, en voyage, aux moments choisis : nos pièces sur les mains de celles qui les portent. Une sélection de photos vous attend.
          </p>

          <form
            className="flex flex-col gap-5 max-w-[440px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <FieldB label="Prénom" name="prenom" />
            <FieldB label="Email" name="email" type="email" required />
            <button
              type="submit"
              className="self-start mt-3 font-display italic text-[15px] text-ink border-b border-ink/40 pb-1 hover:border-raspberry hover:text-raspberry transition-colors"
            >
              Recevoir la sélection →
            </button>
          </form>

          <p className="font-display italic text-[12px] text-ink/50 mt-8 max-w-[440px]">
            Vos coordonnées restent privées.{' '}
            <a href="/confidentialite" className="underline underline-offset-2 hover:text-ink">
              Politique de confidentialité
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}

function FieldB({
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
    <label className="flex flex-col gap-1.5">
      <span className="font-display italic text-[11px] tracking-[0.3em] uppercase text-ink/55">
        {label}
        {required && <span className="text-raspberry"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="bg-transparent border-b border-ink/30 py-2.5 font-display italic text-[18px] text-ink placeholder:text-ink/30 focus:outline-none focus:border-raspberry transition-colors"
      />
    </label>
  )
}
