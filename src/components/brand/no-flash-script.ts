import {
  BRAND_STORAGE_KEY,
  BRANDS,
  CAROUSEL_MODE_STORAGE_KEY,
  CAROUSEL_MODES,
  COLLECTION_LAYOUT_STORAGE_KEY,
  COLLECTION_LAYOUTS,
  COLOR_SLOTS,
  COLOR_SLOTS_ORDER,
  DEFAULT_BRAND,
  DEFAULT_CAROUSEL_MODE,
  DEFAULT_COLLECTION_LAYOUT,
  DEFAULT_FILIGRANE_VARIANT,
  DEFAULT_HERO_MARK,
  DEFAULT_SEAL_VARIANT,
  FILIGRANE_VARIANT_STORAGE_KEY,
  FILIGRANE_VARIANTS,
  HERO_MARK_STORAGE_KEY,
  HERO_MARKS,
  SEAL_VARIANT_STORAGE_KEY,
  SEAL_VARIANTS,
} from './brand'

// Initialisation des 3 couleurs personnalisables (source unique : COLOR_SLOTS).
const COLOR_INIT = COLOR_SLOTS_ORDER.map((slot) => {
  const s = COLOR_SLOTS[slot]
  return `setColor(${JSON.stringify(s.storageKey)},${JSON.stringify(
    s.cssVar,
  )},${JSON.stringify(s.fallback)});`
}).join('')

// Script inline exécuté AVANT le paint : lit les choix visiteur en localStorage
// et pose `data-brand` (couleur), `data-hero-mark` (logo/texte), `data-seal`
// (cachet), `data-filigrane` (séparateur) et `data-carousel` (défilement) sur
// <html> pour éviter tout flash au chargement. Les listes de valeurs autorisées
// proviennent de brand.ts (source unique, injectées ici).
// Inséré dans le <head> du shell via dangerouslySetInnerHTML.
export const BRAND_NO_FLASH_SCRIPT = `(function(){function set(attr,key,allowed,def){try{var v=localStorage.getItem(key);if(allowed.indexOf(v)===-1){v=def;}document.documentElement.setAttribute(attr,v);}catch(e){document.documentElement.setAttribute(attr,def);}}function setColor(key,cssVar,def){try{var v=localStorage.getItem(key);if(!/^#[0-9a-fA-F]{6}$/.test(v)){v=def;}document.documentElement.style.setProperty(cssVar,v);}catch(e){}}${COLOR_INIT}set('data-brand',${JSON.stringify(
  BRAND_STORAGE_KEY,
)},${JSON.stringify(BRANDS)},${JSON.stringify(
  DEFAULT_BRAND,
)});set('data-hero-mark',${JSON.stringify(
  HERO_MARK_STORAGE_KEY,
)},${JSON.stringify(HERO_MARKS)},${JSON.stringify(
  DEFAULT_HERO_MARK,
)});set('data-seal',${JSON.stringify(
  SEAL_VARIANT_STORAGE_KEY,
)},${JSON.stringify(SEAL_VARIANTS)},${JSON.stringify(
  DEFAULT_SEAL_VARIANT,
)});set('data-filigrane',${JSON.stringify(
  FILIGRANE_VARIANT_STORAGE_KEY,
)},${JSON.stringify(FILIGRANE_VARIANTS)},${JSON.stringify(
  DEFAULT_FILIGRANE_VARIANT,
)});set('data-carousel',${JSON.stringify(
  CAROUSEL_MODE_STORAGE_KEY,
)},${JSON.stringify(CAROUSEL_MODES)},${JSON.stringify(
  DEFAULT_CAROUSEL_MODE,
)});set('data-collection',${JSON.stringify(
  COLLECTION_LAYOUT_STORAGE_KEY,
)},${JSON.stringify(COLLECTION_LAYOUTS)},${JSON.stringify(
  DEFAULT_COLLECTION_LAYOUT,
)});})();`
