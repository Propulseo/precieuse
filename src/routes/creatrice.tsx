import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/creatrice')({ component: CreatricePage })

function CreatricePage() {
  return (
    <>
      {/* Intro — portrait + accroche */}
      <section className="relative bg-cream py-20 px-8 lg:px-16">
        <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-center">
          <div className="relative w-full max-w-[460px] aspect-[3/4] border border-ink/30 overflow-hidden mx-auto lg:mx-0">
            <img
              src="/images/emeline/emeline-atelier.jpg"
              alt="Emeline, joaillière artisanale, dans son atelier"
              className="absolute inset-0 w-full h-full object-cover luxe-grayscale"
            />
          </div>

          <div>
            <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
              La créatrice
            </span>
            <h1 className="font-headline text-[clamp(48px,7vw,90px)] text-ink leading-[0.95]">
              Moi c'est Emeline.
            </h1>
            <p className="font-display italic text-[20px] text-ink/75 mt-8 leading-relaxed max-w-prose">
              Joaillière artisanale, je fabrique le bijou de vos rêves. Douze ans à travailler l'or,
              tous les jours. Ça laisse des traces, et surtout du savoir-faire.
            </p>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="relative bg-cream py-20 px-8 lg:px-16 border-t border-ink/15">
        <div className="mx-auto max-w-[1320px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
            <img
              src="/images/real/deux-mains.webp"
              alt="Deux mains présentant une bague en or 18 carats — geste de l'atelier Précieuse, Bordeaux"
              className="absolute inset-0 w-full h-full object-cover luxe-grayscale"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
              Le parcours
            </span>
            <h2 className="font-headline text-[40px] text-ink leading-none mb-8">
              De la formation à l'atelier
            </h2>
            <div className="space-y-6 font-sans text-[15px] text-ink/80 leading-relaxed max-w-prose">
              <p>
                Formation en joaillerie, puis douze années à pratiquer chaque technique au quotidien :
                fonte à cire perdue, sertissage, polissage main. Chaque bague que je crée passe par mes
                mains, du dessin initial au polissage final.
              </p>
              <p>C'est exigeant, c'est précis, c'est lent. Et c'est ce qui rend chaque pièce unique et pérenne.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophie + citation */}
      <section className="relative bg-cream py-20 px-8 lg:px-16 border-t border-ink/15">
        <div className="mx-auto max-w-[800px]">
          <span className="font-display italic text-[12px] tracking-[0.35em] text-gold block mb-3 uppercase">
            La philosophie
          </span>
          <h2 className="font-headline text-[40px] text-ink leading-none mb-8">
            Pas de compromis, pas de raccourci.
          </h2>
          <p className="font-sans text-[15px] text-ink/80 leading-relaxed">
            Il y a des jours de doutes. Mais c'est dans ces moments-là que je me recentre sur l'essentiel :
            créer des bijoux qui racontent votre histoire, qui deviennent une part de vous. Pas de compromis
            sur la matière, pas de raccourci sur le savoir-faire. Précieuse, c'est cela : la transparence de
            l'artisanat, la confiance du geste.
          </p>
          <blockquote className="border-l-2 border-raspberry/40 pl-6 mt-12">
            <p className="font-display italic text-[26px] text-ink leading-snug">
              « Ce que personne ne voit derrière un bijou artisanal, et que personne n'a pris le temps de
              vous expliquer. »
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-cream py-24 px-8 lg:px-16 border-t border-ink/15 text-center">
        <h2 className="font-headline text-[48px] text-ink leading-none mb-10">On se rencontre ?</h2>
        <Link
          to="/contact"
          className="inline-block font-display italic text-[18px] text-ink border border-ink/30 px-8 py-3 hover:bg-ink hover:text-cream transition-all duration-300"
        >
          Prendre rendez-vous →
        </Link>
      </section>
    </>
  )
}
