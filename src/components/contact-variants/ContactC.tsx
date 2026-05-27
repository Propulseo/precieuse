import { CONTACT, DEMAND_TYPES } from './contact-data'

const FIELD = 'w-full bg-transparent border-b border-cream/25 py-3 font-display italic text-[16px] text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors'

export function ContactC() {
  return (
    <section className="bg-ink text-cream py-24 lg:py-32 px-6 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          {/* LEFT — titre + infos */}
          <div>
            <span className="inline-block px-5 py-1.5 rounded-full border border-cream/30 font-display italic text-[11px] tracking-[0.4em] uppercase text-cream/80">
              Contact
            </span>

            <h2 className="mt-8 font-display italic text-[clamp(48px,5.5vw,80px)] leading-[1.02] text-cream">
              Une question,
              <br />
              un projet,
              <br />
              <span className="text-gold">écrivons-nous.</span>
            </h2>

            <dl className="mt-14 space-y-7 font-display italic">
              <div>
                <dt className="text-[10px] tracking-[0.35em] uppercase text-gold/70">Téléphone</dt>
                <dd className="text-[22px] text-cream mt-1.5">{CONTACT.tel}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.35em] uppercase text-gold/70">Email</dt>
                <dd className="text-[20px] text-cream mt-1.5 break-all">{CONTACT.email}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.35em] uppercase text-gold/70">Horaires</dt>
                <dd className="text-[18px] text-cream/80 mt-1.5">{CONTACT.hours}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.35em] uppercase text-gold/70">Instagram</dt>
                <dd className="text-[18px] mt-1.5">
                  <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="text-cream hover:text-gold transition-colors">
                    @{CONTACT.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* RIGHT — formulaire */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6 lg:pl-8 lg:border-l lg:border-cream/15 lg:pt-2">
            <input type="text" placeholder="Votre nom" required className={FIELD} />
            <input type="email" placeholder="Votre email" required className={FIELD} />
            <select required defaultValue="" className={`${FIELD} appearance-none cursor-pointer`}>
              <option value="" disabled className="bg-ink">Type de demande</option>
              {DEMAND_TYPES.map((d) => (
                <option key={d.value} value={d.value} className="bg-ink">{d.label}</option>
              ))}
            </select>
            <textarea placeholder="Votre message" rows={5} required className={`${FIELD} resize-none`} />
            <button
              type="submit"
              className="mt-4 px-8 py-3 border border-gold/60 rounded-full font-display italic text-[13px] tracking-[0.25em] uppercase text-gold hover:bg-gold hover:text-ink transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
