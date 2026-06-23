import { useState } from 'react'
import { m } from '#/paraglide/messages'

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
          {m.leadcapture_title()}
        </h2>

        <p className="font-display text-[14px] text-canard/70 leading-relaxed max-w-[440px] mb-6">
          {m.leadcapture_subtitle()}
        </p>

        <fieldset className="flex items-center gap-6 mb-5">
          <legend className="sr-only">{m.leadcapture_civility_legend()}</legend>
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
          <FieldA label={m.leadcapture_field_firstname()} name="prenom" required />
          <FieldA label={m.leadcapture_field_lastname()} name="nom" required />
          <FieldA label={m.leadcapture_field_email()} name="email" type="email" required />
          <FieldA label={m.leadcapture_field_phone()} name="phone" type="tel" prefix="FR" />
        </div>

        <button
          type="submit"
          className="bg-canard text-poudre font-display text-[12px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-canard transition-colors duration-300"
        >
          {m.leadcapture_submit()}
        </button>

        <p className="font-display text-[11px] text-canard/55 mt-5 max-w-[420px]">
          {m.leadcapture_consent_prefix()}{' '}
          <a href="/confidentialite" className="underline underline-offset-2 hover:text-canard">
            {m.leadcapture_consent_link()}
          </a>
          {m.leadcapture_consent_suffix()}
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
