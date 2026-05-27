import { createFileRoute } from '@tanstack/react-router'
import { HeroBespoke } from '../components/sur-mesure/HeroBespoke'
import { Metamorphose } from '../components/sur-mesure/Metamorphose'
import { Promesses } from '../components/sur-mesure/Promesses'
import { HistoireSandrine } from '../components/sur-mesure/HistoireSandrine'
import { FormulaireInvitation } from '../components/sur-mesure/FormulaireInvitation'
import { Reveal } from '../components/Reveal'

export const Route = createFileRoute('/sur-mesure')({ component: SurMesurePage })

function SurMesurePage() {
  return (
    <>
      <HeroBespoke />
      <Metamorphose />
      <Reveal delay={60}>
        <Promesses />
      </Reveal>
      <Reveal delay={60}>
        <HistoireSandrine />
      </Reveal>
      <FormulaireInvitation />
    </>
  )
}
