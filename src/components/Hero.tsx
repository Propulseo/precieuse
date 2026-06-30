import { HeroSplitSezane } from './hero-variants/HeroSplitSezane'
import type { HomePageData } from '../lib/content/home'

export function Hero({ home }: { home: HomePageData }) {
  return <HeroSplitSezane hero={home.hero} />
}
