import { CONTACT, DEMAND_TYPES } from './contact-data'

const FIELD = 'w-full bg-white/70 border border-ink/15 rounded-md px-4 py-2.5 font-display italic text-[14px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus:bg-white transition-all'

export function ContactD() {
  return (
    <section className="bg-cream py-20 lg:py-28 px-6 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-1.5 rounded-full border border-ink/35 font-display italic text-[11px] tracking-[0.4em] uppercase text-ink/80">
            Contact
          </span>
          <h2 className="mt-6 font-display italic text-[clamp(40px,5.5vw,72px)] leading-[1.05] text-ink">
            Parlons-en.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bloc formulaire — gros */}
          <div className="lg:col-span-2 lg:row-span-2 bg-ivory rounded-[28px] p-8 lg:p-10">
            <h3 className="font-display italic text-[24px] text-ink mb-1">Votre message</h3>
            <p className="font-display italic text-[13px] text-ink/60 mb-6">Réponse sous 48 h.</p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
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
              <textarea placeholder="Votre message" rows={4} required className={`${FIELD} resize-none`} />
              <button
                type="submit"
                className="w-full bg-ink text-cream rounded-md py-3 font-display italic text-[13px] tracking-[0.2em] uppercase hover:bg-raspberry transition-colors mt-1"
              >
                Envoyer
              </button>
            </form>
          </div>

          {/* Bloc téléphone — or rosé */}
          <div className="bg-rose-gold rounded-[28px] p-6 flex flex-col justify-between min-h-[160px]">
            <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/55">Téléphone</span>
            <a href={`tel:${CONTACT.tel.replace(/\s/g, '')}`} className="font-display italic text-[clamp(20px,2.3vw,28px)] text-ink hover:text-raspberry transition-colors">
              {CONTACT.tel}
            </a>
          </div>

          {/* Bloc email — argent oxydé */}
          <div className="bg-oxidized-silver rounded-[28px] p-6 flex flex-col justify-between min-h-[160px]">
            <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-cream/55">Email</span>
            <a href={`mailto:${CONTACT.email}`} className="font-display italic text-[16px] lg:text-[18px] text-cream hover:text-gold transition-colors break-all">
              {CONTACT.email}
            </a>
          </div>

          {/* Bloc horaires + RS */}
          <div className="lg:col-span-2 bg-cream border border-ink/15 rounded-[28px] p-6 flex items-center justify-between gap-6 min-h-[120px]">
            <div>
              <span className="font-display italic text-[10px] tracking-[0.35em] uppercase text-ink/55">Horaires</span>
              <p className="mt-1 font-display italic text-[16px] text-ink">{CONTACT.hours}</p>
            </div>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="font-display italic text-[14px] text-ink hover:text-raspberry transition-colors whitespace-nowrap"
            >
              @{CONTACT.instagram} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
