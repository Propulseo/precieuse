import { buildLegacyTheme } from 'sanity'

/**
 * Thème Précieuse pour le Studio Sanity : passe l'interface du sombre
 * « technique » par défaut à une charte claire poudre/canard, accent framboise.
 * Objectif : qu'Emeline ne voie plus « un outil de dev » mais son espace.
 */
const palette = {
  poudre: '#eadcd3',
  poudreClair: '#faf6f1',
  canard: '#125e5e',
  canardFonce: '#0d4747',
  framboise: '#b80049',
  gris: '#8a8079',
  succes: '#2f8f6b',
  attention: '#c98a2b',
}

export const precieuseTheme = buildLegacyTheme({
  '--black': palette.canardFonce,
  '--white': palette.poudreClair,

  '--gray': palette.gris,
  '--gray-base': palette.gris,

  '--component-bg': palette.poudreClair,
  '--component-text-color': palette.canard,

  '--brand-primary': palette.framboise,

  '--default-button-color': palette.canard,
  '--default-button-primary-color': palette.canard,
  '--default-button-success-color': palette.succes,
  '--default-button-warning-color': palette.attention,
  '--default-button-danger-color': palette.framboise,

  '--state-info-color': palette.canard,
  '--state-success-color': palette.succes,
  '--state-warning-color': palette.attention,
  '--state-danger-color': palette.framboise,

  '--main-navigation-color': palette.canard,
  '--main-navigation-color--inverted': palette.poudreClair,

  '--focus-color': palette.framboise,
})
