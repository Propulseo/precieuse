import {
  BRAND_STORAGE_KEY,
  BRANDS,
  CAROUSEL_MODE_STORAGE_KEY,
  CAROUSEL_MODES,
  DEFAULT_BRAND,
  DEFAULT_CAROUSEL_MODE,
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

// Script inline exécuté AVANT le paint : lit les choix visiteur en localStorage
// et pose `data-brand` (couleur), `data-hero-mark` (logo/texte), `data-seal`
// (cachet), `data-filigrane` (séparateur) et `data-carousel` (défilement) sur
// <html> pour éviter tout flash au chargement. Les listes de valeurs autorisées
// proviennent de brand.ts (source unique, injectées ici).
// Inséré dans le <head> du shell via dangerouslySetInnerHTML.
export const BRAND_NO_FLASH_SCRIPT = `(function(){function set(attr,key,allowed,def){try{var v=localStorage.getItem(key);if(allowed.indexOf(v)===-1){v=def;}document.documentElement.setAttribute(attr,v);}catch(e){document.documentElement.setAttribute(attr,def);}}set('data-brand',${JSON.stringify(
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
)});})();`
