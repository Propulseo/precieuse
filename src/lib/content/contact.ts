import { m } from '#/paraglide/messages'

/** Une entrée de la mini-FAQ du drawer Contact (question + réponse). */
export type ContactFaqItem = { q: string; a: string }

/**
 * Contrat de données du drawer Contact (et, par partage, du bandeau de clôture
 * `ClosingInvite`). Vient du singleton Sanity `contact` quand il est rempli,
 * sinon de ce repli i18n (Paraglide). Les coordonnées et les liens restent
 * structurels (SITE). Cf. `getContact` (src/lib/cms/content.ts).
 */
export type ContactContent = {
  eyebrow: string
  title: string
  lede: string
  reassurance: string
  faq: ContactFaqItem[]
  successTitle: string
  successBody: string
  /** Libellés du formulaire (champs, bouton, erreur) et les 4 sujets. */
  form: {
    fieldName: string
    fieldEmail: string
    fieldSubject: string
    fieldMessage: string
    submitLabel: string
    errorMessage: string
    subjects: { question: string; bespoke: string; care: string; press: string }
  }
}

/**
 * Repli statique du contenu Contact : valeurs i18n (Paraglide). Conserve
 * EXACTEMENT le contenu actuel du drawer (zéro régression tant que le document
 * Sanity `contact` n'est pas rempli par Emeline).
 */
export function contactFallback(): ContactContent {
  return {
    eyebrow: m.contact_eyebrow(),
    title: m.contact_title(),
    lede: m.contact_lede(),
    reassurance: m.contact_reassurance(),
    faq: [
      { q: m.contact_faq_q1(), a: m.contact_faq_a1() },
      { q: m.contact_faq_q2(), a: m.contact_faq_a2() },
      { q: m.contact_faq_q3(), a: m.contact_faq_a3() },
    ],
    successTitle: m.contact_success_title(),
    successBody: m.contact_success_body(),
    form: {
      fieldName: m.contact_field_name(),
      fieldEmail: m.contact_field_email(),
      fieldSubject: m.contact_field_subject(),
      fieldMessage: m.contact_field_message(),
      submitLabel: m.contact_submit(),
      errorMessage: m.form_error(),
      subjects: {
        question: m.contact_subject_question(),
        bespoke: m.contact_subject_bespoke(),
        care: m.contact_subject_care(),
        press: m.contact_subject_press(),
      },
    },
  }
}
