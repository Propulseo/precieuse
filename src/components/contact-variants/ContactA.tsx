import { CONTACT, DEMAND_TYPES } from './contact-data'

const FIELD = 'w-full bg-transparent border-b border-ink/25 py-3 font-display italic text-[16px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none transition-colors'

export function ContactA() {
  return (
    <section className="bg-cream py-24 lg:py-32 px-6 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <span className="inline-block px-5 py-1.5 rounded-full border border-ink/35 font-display italic text-[11px] tracking-[0.4em] uppercase text-ink/80">
              Contact
            </span>

            <h2 className="mt-8 font-display italic text-[clamp(56px,9vw,128px)] leading-[0.92] text-ink">
              Écrivons
              <br />
              un projet,
              <br />
              <span className="text-raspberry">ensemble.</span>
            </h2>

            <p className="mt-10 font-display italic text-[18px] lg:text-[20px] text-ink-soft max-w-md leading-relaxed">
              Sur-mesure, restauration ou simple curiosité, Eméline vous répond personnellement sous 48 h.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pt-40">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <input type="text" placeholder="Votre nom" required className={FIELD} />
              <input type="email" placeholder="Votre email" required className={FIELD} />
              <select required defaultValue="" className={FIELD}>
                <option value="" disabled>Type de demande</option>
                {DEMAND_TYPES.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <textarea placeholder="Votre message" rows={4} required className={`${FIELD} resize-none`} />
              <button
                type="submit"
                className="mt-2 inline-flex items-center gap-2 font-display italic text-[14px] tracking-[0.25em] uppercase text-ink hover:text-raspberry transition-colors"
              >
                Envoyer le message
                <span aria-hidden>→</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-ink/15 flex flex-wrap items-baseline justify-between gap-6 font-display italic text-[13px] lg:text-[14px] text-ink/70">
          <span><span className="text-[10px] tracking-[0.3em] uppercase text-ink/40 mr-2">tel</span>{CONTACT.tel}</span>
          <span><span className="text-[10px] tracking-[0.3em] uppercase text-ink/40 mr-2">email</span>{CONTACT.email}</span>
          <span><span className="text-[10px] tracking-[0.3em] uppercase text-ink/40 mr-2">horaires</span>{CONTACT.hours}</span>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="text-ink hover:text-raspberry transition-colors">
            @{CONTACT.instagram} →
          </a>
        </div>
      </div>
    </section>
  )
}
