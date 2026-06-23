import { BRAND_STORAGE_KEY, DEFAULT_BRAND } from './brand'

// Script inline exécuté AVANT le paint : lit le choix visiteur en localStorage
// et pose `data-brand` sur <html> pour éviter tout flash de couleur au chargement.
// Inséré dans le <head> du shell via dangerouslySetInnerHTML.
export const BRAND_NO_FLASH_SCRIPT = `(function(){try{var b=localStorage.getItem(${JSON.stringify(
  BRAND_STORAGE_KEY,
)});if(b!=='teal'&&b!=='blush'){b=${JSON.stringify(
  DEFAULT_BRAND,
)};}document.documentElement.setAttribute('data-brand',b);}catch(e){document.documentElement.setAttribute('data-brand',${JSON.stringify(
  DEFAULT_BRAND,
)});}})();`
