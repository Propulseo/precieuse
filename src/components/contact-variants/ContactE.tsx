import { CONTACT, DEMAND_TYPES } from './contact-data'

const FIELD = 'w-full bg-white/70 border border-ink/15 rounded-md px-4 py-3 font-display italic text-[15px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus:bg-white transition-all'

export function ContactE() {
  return (
    <section className="bg-cream py-20 lg:py-32 px-6 lg:px-16">
      <div className="mx-auto max-w-[720px]">
        <div className="bg-ivory rounded-[32px] p-8 lg:p-14 shadow-[0_30px_70px_-30px_rgba(26,12,4,0.25)]">
          <div className="text-center">
            <span className="inline-block px-5 py-1.5 rounded-full border border-ink/35 font-display italic text-[11px] tracking-[0.4em] uppercase text-ink/80">
              Contact
            </span>
            <h2 className="mt-6 font-display italic text-[clamp(36px,5vw,60px)] leading-[1.05] text-ink">
              À votre écoute.
            </h2>
            <p className="mt-4 font-display italic text-[15px] text-ink/65 max-w-sm mx-auto">
              Eméline vous répond personnellement sous 48 heures.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mt-10 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Nom" required className={FIELD} />
              <input type="email" placeholder="Email" required className={FIELD} />
            </div>
            <select required defaultValue="" className={FIELD}>
              <option value="" disabled>Type de demande</option>
              {DEMAND_TYPES.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <textarea placeholder="Votre message" rows={5} required className={`${FIELD} resize-none`} />
            <button
              type="submit"
              className="w-full mt-2 bg-ink text-cream rounded-md py-3.5 font-display italic text-[13px] tracking-[0.25em] uppercase hover:bg-raspberry transition-colors"
            >
              Envoyer le message
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-ink/15 text-center space-y-2 font-display italic text-[14px] text-ink/70">
            <p>
              <a href={`tel:${CONTACT.tel.replace(/\s/g, '')}`} className="text-ink hover:text-raspberry transition-colors">
                {CONTACT.tel}
              </a>
              <span className="mx-2 text-ink/30">·</span>
              <a href={`mailto:${CONTACT.email}`} className="text-ink hover:text-raspberry transition-colors">
                {CONTACT.email}
              </a>
            </p>
            <p className="text-[13px] text-ink/55">{CONTACT.hours}</p>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-[13px] text-ink hover:text-raspberry transition-colors mt-1"
            >
              @{CONTACT.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
