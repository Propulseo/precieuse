import { createFileRoute } from '@tanstack/react-router'
import { HeroBespoke } from '../components/sur-mesure/HeroBespoke'
import { Metamorphose } from '../components/sur-mesure/Metamorphose'
import { Promesses } from '../components/sur-mesure/Promesses'
import { HistoireSandrine } from '../components/sur-mesure/HistoireSandrine'
import { FormulaireInvitation } from '../components/sur-mesure/FormulaireInvitation'
import { Reveal } from '../components/Reveal'
import { getMetamorphose, getPromesses } from '../lib/cms'

export const Route = createFileRoute('/sur-mesure')({
  component: SurMesurePage,
  loader: async () => {
    const [metamorphose, promesses] = await Promise.all([
      getMetamorphose(),
      getPromesses(),
    ])
    return { metamorphose, promesses }
  },
})

function SurMesurePage() {
  const { metamorphose, promesses } = Route.useLoaderData()
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
      <FormulaireInvitation />
    </>
  )
}
