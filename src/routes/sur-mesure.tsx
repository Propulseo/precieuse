import { createFileRoute } from '@tanstack/react-router'
import { HeroBespoke } from '../components/sur-mesure/HeroBespoke'
import { Metamorphose } from '../components/sur-mesure/Metamorphose'
import { Promesses } from '../components/sur-mesure/Promesses'
import { HistoireSandrine } from '../components/sur-mesure/HistoireSandrine'
import { FormulaireInvitation } from '../components/sur-mesure/FormulaireInvitation'
import { Reveal } from '../components/Reveal'
import { getMetamorphose, getPromesses, getSite } from '../lib/cms'
import { getLocale } from '#/paraglide/runtime'

export const Route = createFileRoute('/sur-mesure')({
  component: SurMesurePage,
  loader: async () => {
    const locale = getLocale()
    const [metamorphose, promesses, site] = await Promise.all([
      getMetamorphose(locale),
      getPromesses(locale),
      getSite(locale),
    ])
    return { metamorphose, promesses, site }
  },
})

function SurMesurePage() {
  const { metamorphose, promesses, site } = Route.useLoaderData()
  return (
    <>
      <HeroBespoke />
      <Metamorphose steps={metamorphose} />
      <Reveal delay={60}>
        <Promesses promesses={promesses} />
      </Reveal>
      <Reveal delay={60}>
        <HistoireSandrine />
      </Reveal>
      <FormulaireInvitation whatsapp={site.whatsapp} />
    </>
  )
}
