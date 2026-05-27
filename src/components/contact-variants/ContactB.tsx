import { CONTACT, DEMAND_TYPES } from './contact-data'

const FIELD = 'w-full bg-white/60 border border-ink/15 rounded-md px-4 py-3 font-display italic text-[15px] text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none focus:bg-white transition-all'

export function ContactB() {
  return (
    <section className="bg-cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[720px]">
        {/* LEFT — visuel atelier */}
        <div className="relative bg-ivory flex items-end p-10 lg:p-16 min-h-[420px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/30 via-ivory to-oxidized-silver/15" />
          <div className="absolute top-10 left-10 lg:top-16 lg:left-16">
            <span className="font-display italic text-[10px] tracking-[0.4em] uppercase text-ink/60">
              Atelier, Lisboa
            </span>
          </div>
          <div className="relative max-w-md">
            <p className="font-display italic text-[clamp(26px,3vw,36px)] leading-[1.15] text-ink">
              « Chaque pièce naît d'une conversation. »
            </p>
            <p className="mt-4 font-display italic text-[14px] tracking-[0.25em] uppercase text-ink/55">
              Eméline, fondatrice
            </p>
          </div>
        </div>

        {/* RIGHT — formulaire */}
        <div className="bg-cream p-10 lg:p-16 flex flex-col justify-center">
          <span className="inline-block w-fit px-5 py-1.5 rounded-full border border-ink/35 font-display italic text-[11px] tracking-[0.4em] uppercase text-ink/80">
            Contact
          </span>
          <h2 className="mt-6 font-display italic text-[clamp(36px,4.5vw,56px)] leading-[1.05] text-ink max-w-md">
            Écrivez-nous.
          </h2>
          <p className="mt-4 font-display italic text-[15px] text-ink/70 max-w-md">
            Réponse personnelle sous 48 h.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4 max-w-md">
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
              className="w-full mt-2 bg-ink text-cream rounded-md py-3 font-display italic text-[14px] tracking-[0.2em] uppercase hover:bg-raspberry transition-colors"
            >
              Envoyer
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-ink/15 grid grid-cols-2 gap-4 font-display italic text-[13px] text-ink/70 max-w-md">
            <div>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-1">téléphone</span>
              {CONTACT.tel}
            </div>
            <div>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-1">horaires</span>
              {CONTACT.hours}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
