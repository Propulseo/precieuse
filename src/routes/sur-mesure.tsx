import { createFileRoute } from '@tanstack/react-router'
import { BespokeHero } from '../components/sur-mesure/BespokeHero'
import { BespokeMarquee } from '../components/sur-mesure/BespokeMarquee'
import { BespokeAtelier } from '../components/sur-mesure/BespokeAtelier'
import { BespokeProcess } from '../components/sur-mesure/BespokeProcess'
import { BespokeSplit } from '../components/sur-mesure/BespokeSplit'
import { BespokeRealisations } from '../components/sur-mesure/BespokeRealisations'
import { BespokeVoices } from '../components/sur-mesure/BespokeVoices'
import { getBespokePage } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/sur-mesure')({
  component: SurMesurePage,
  // Page entièrement pilotable depuis Sanity (singleton surMesurePage),
  // repli i18n/photos via bespokePageFallback().
  loader: () => getBespokePage(getLocale()),
  head: () =>
    seo({
      title: m.seo_surmesure_title(),
      description: m.seo_surmesure_desc(),
      path: '/sur-mesure',
    }),
})

function SurMesurePage() {
  const page = Route.useLoaderData()
  return (
    // -mt-16 : le héro passe en plein cadre sous le Nav fixe (pt-16 du <main>).
    <div className="-mt-16">
      <BespokeHero hero={page.hero} />
      <BespokeMarquee items={page.marquee} />
      <BespokeAtelier atelier={page.atelier} />
      <BespokeProcess steps={page.steps} manifeste={page.manifeste} />
      <BespokeSplit split={page.split} />
      <BespokeRealisations realisations={page.realisations} />
      <BespokeVoices voices={page.voices} />
    </div>
  )
}
