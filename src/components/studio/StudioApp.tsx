import { Studio } from 'sanity'
import config from '../../../sanity.config'

/**
 * Studio Sanity embarqué, monté UNIQUEMENT côté client (voir la route
 * `studio.$.tsx` qui l'importe en lazy après hydratation). Le Studio s'appuie
 * sur des APIs navigateur et ne doit jamais être évalué en SSR/build.
 * Réutilise la config partagée (`sanity.config.ts`, basePath `/studio`).
 */
export default function StudioApp() {
  return <Studio config={config} />
}
