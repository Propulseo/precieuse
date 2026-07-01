import { m } from '#/paraglide/messages'
import { useContactDrawer } from './contact/ContactDrawerProvider'

/**
 * Bande de clôture (avant footer) — une porte de sortie chaude vers le contact,
 * pour ne pas déverser un lecteur « chaud » dans le footer (règle peak-end).
 * Fond poudre + filet de séparation (le footer étant en canard plein, on évite
 * un bloc sombre qui se fondrait dedans) ; le bouton canard plein porte l'action.
 * Ouvre le drawer Contact global. Réutilisée en fin des pages à forte intention
 * (/creatrice, /sur-mesure).
 */
export function ClosingInvite({
  title = m.contact_title(),
  lede = m.contact_lede(),
  cta = m.creatrice_cta_button(),
}: {
  title?: string
  lede?: string
  cta?: string
}) {
  const { open } = useContactDrawer()
  return (
    <section className="border-t border-canard/15 bg-poudre px-8 py-16 text-center lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[640px]">
        <h2 className="font-headline text-[clamp(30px,4.2vw,48px)] leading-[1.05] text-canard">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] font-body text-[17px] font-light leading-relaxed text-canard/90 [text-wrap:pretty]">
          {lede}
        </p>
        <button
          type="button"
          onClick={open}
          className="mt-8 inline-block bg-canard px-10 py-3.5 font-display text-[12px] uppercase tracking-[0.3em] text-poudre transition-colors duration-300 hover:bg-canard-90"
        >
          {cta}
        </button>
      </div>
    </section>
  )
}
