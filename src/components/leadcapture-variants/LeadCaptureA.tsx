import { useState } from 'react'

export function LeadCaptureA() {
  const [civility, setCivility] = useState<'M' | 'Mme' | null>(null)

  return (
    <section className="relative bg-poudre border-t border-b border-canard/15 py-12 lg:py-14 px-4 lg:px-8">
      <form
        className="mx-auto max-w-[860px] text-center flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <img
          src="/brand/picto-shape.png"
          alt="Précieuse"
          className="h-[86px] w-auto"
        />

        <h2 className="font-headline text-[22px] sm:text-[26px] text-canard mt-4 mb-3">
          Recevoir les photos portées
        </h2>

        <p className="font-display text-[14px] text-canard/70 leading-relaxed max-w-[440px] mb-6">
          Découvrez nos bagues telles qu'elles vivent, portées au quotidien, dans la lumière vraie.
          Un savoir-faire joaillier, une création qui vous ressemble.
        </p>

        <fieldset className="flex items-center gap-6 mb-5">
          <legend className="sr-only">Civilité</legend>
          {(['M', 'Mme'] as const).map((c) => (
            <label
              key={c}
              className="flex items-center gap-2.5 cursor-pointer font-display text-[15px] text-canard"
            >
              <span
                className={`w-4 h-4 border border-canard/40 rounded-sm flex items-center justify-center transition-colors ${
                  civility === c ? 'bg-canard border-canard' : ''
                }`}
              >
                {civility === c && (
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                    <path d="M2 5 L4.2 7.2 L8 3" stroke="#eadcd3" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <input
                type="radio"
                name="civility"
                value={c}
                checked={civility === c}
                onChange={() => setCivility(c)}
                className="sr-only"
              />
              {c}.
            </label>
          ))}
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 w-full mb-7 text-left">
          <FieldA label="Prénom *" name="prenom" required />
          <FieldA label="Nom *" name="nom" required />
          <FieldA label="Email *" name="email" type="email" required />
          <FieldA label="Téléphone" name="phone" type="tel" prefix="FR" />
        </div>

        <button
          type="submit"
          className="bg-canard text-poudre font-display text-[12px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-canard transition-colors duration-300"
        >
          Recevoir les photos
        </button>

        <p className="font-display text-[11px] text-canard/55 mt-5 max-w-[420px]">
          En validant, j'accepte de recevoir un email et j'approuve la{' '}
          <a href="/confidentialite" className="underline underline-offset-2 hover:text-canard">
            politique de confidentialité
          </a>
          .
        </p>
      </form>
    </section>
  )
}

function FieldA({
  label,
  name,
  type = 'text',
  required = false,
  prefix,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  prefix?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-[12px] text-canard/55 tracking-wide">{label}</span>
      <div className="flex items-center border-b border-canard/30 focus-within:border-canard transition-colors">
        {prefix && (
          <span className="font-display text-[14px] text-canard/55 pr-2 border-r border-canard/15 mr-2">
            {prefix}
          </span>
        )}
        <input
          type={type}
          name={name}
          required={required}
          className="flex-1 bg-transparent py-2 font-display text-[16px] text-canard placeholder:text-canard/30 focus:outline-none"
        />
      </div>
    </label>
  )
}
