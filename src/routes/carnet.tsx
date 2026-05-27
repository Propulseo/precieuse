import { createFileRoute } from '@tanstack/react-router'
import { CarnetHero } from '../components/carnet/CarnetHero'
import { CarnetGrid } from '../components/carnet/CarnetGrid'

export const Route = createFileRoute('/carnet')({ component: CarnetPage })

function CarnetPage() {
  return (
    <>
      <CarnetHero />
      <CarnetGrid />
    </>
  )
}
