import {
  BRAND_STORAGE_KEY,
  DEFAULT_BRAND,
  DEFAULT_HERO_MARK,
  DEFAULT_SEAL_VARIANT,
  HERO_MARK_STORAGE_KEY,
  SEAL_VARIANT_STORAGE_KEY,
} from './brand'

// Script inline exécuté AVANT le paint : lit les choix visiteur en localStorage
// et pose `data-brand` (couleur) + `data-hero-mark` (logo/texte) sur <html> pour
// éviter tout flash au chargement.
// Inséré dans le <head> du shell via dangerouslySetInnerHTML.
export const BRAND_NO_FLASH_SCRIPT = `(function(){try{var allowed=['canard','blush','or','lie-de-vin','nuit'];var b=localStorage.getItem(${JSON.stringify(
  BRAND_STORAGE_KEY,
)});if(allowed.indexOf(b)===-1){b=${JSON.stringify(
  DEFAULT_BRAND,
)};}document.documentElement.setAttribute('data-brand',b);}catch(e){document.documentElement.setAttribute('data-brand',${JSON.stringify(
  DEFAULT_BRAND,
)});}try{var hmAllowed=['logo','texte'];var hm=localStorage.getItem(${JSON.stringify(
  HERO_MARK_STORAGE_KEY,
)});if(hmAllowed.indexOf(hm)===-1){hm=${JSON.stringify(
  DEFAULT_HERO_MARK,
)};}document.documentElement.setAttribute('data-hero-mark',hm);}catch(e){document.documentElement.setAttribute('data-hero-mark',${JSON.stringify(
  DEFAULT_HERO_MARK,
)});}try{var slAllowed=['rond','octogone','epure'];var sl=localStorage.getItem(${JSON.stringify(
  SEAL_VARIANT_STORAGE_KEY,
)});if(slAllowed.indexOf(sl)===-1){sl=${JSON.stringify(
  DEFAULT_SEAL_VARIANT,
)};}document.documentElement.setAttribute('data-seal',sl);}catch(e){document.documentElement.setAttribute('data-seal',${JSON.stringify(
  DEFAULT_SEAL_VARIANT,
)});}})();`
