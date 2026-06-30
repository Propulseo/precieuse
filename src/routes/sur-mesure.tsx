import { createFileRoute } from '@tanstack/react-router'
import { BespokeHero } from '../components/sur-mesure/BespokeHero'
import { BespokeMarquee } from '../components/sur-mesure/BespokeMarquee'
import { BespokeAtelier } from '../components/sur-mesure/BespokeAtelier'
import { BespokeProcess } from '../components/sur-mesure/BespokeProcess'
import { BespokeSplit } from '../components/sur-mesure/BespokeSplit'
import { BespokeRealisations } from '../components/sur-mesure/BespokeRealisations'
import { BespokeVoices } from '../components/sur-mesure/BespokeVoices'
import { getBespokeVoices, getBespokePieces } from '../lib/cms'
import { m } from '#/paraglide/messages'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/sur-mesure')({
  component: SurMesurePage,
  head: () =>
    seo({
      title: m.seo_surmesure_title(),
      description: m.seo_surmesure_desc(),
      path: '/sur-mesure',
    }),
  // Loader CMS : voix + réalisations pilotables (repli statique bespoke.ts).
  loader: async () => {
    const [voices, pieces] = await Promise.all([
      getBespokeVoices(),
      getBespokePieces(),
    ])
    return { voices, pieces }
  },
})

function SurMesurePage() {
  const { voices, pieces } = Route.useLoaderData()
  return (
    // -mt-16 : le héro passe en plein cadre sous le Nav fixe (pt-16 du <main>).
    <div className="-mt-16">
      <BespokeHero />
      <BespokeMarquee />
      <BespokeAtelier />
      <BespokeProcess />
      <BespokeSplit />
      <BespokeRealisations pieces={pieces} />
      <BespokeVoices voices={voices} />
    </div>
  )
}
