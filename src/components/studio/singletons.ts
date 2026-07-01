import type { DocumentActionComponent, DocumentActionsContext, NewDocumentOptionsContext, TemplateItem } from 'sanity'

/** Documents uniques : une seule instance, non supprimable/dupliquable. */
export const SINGLETON_TYPES = new Set<string>([
  'homePage',
  'siteSettings',
  'surMesurePage',
  'creatricePage',
  'footer',
  'contact',
])

/** Retire delete/duplicate/unpublish pour les singletons. */
export function singletonDocumentActions(
  prev: DocumentActionComponent[],
  ctx: DocumentActionsContext,
): DocumentActionComponent[] {
  if (!SINGLETON_TYPES.has(ctx.schemaType)) return prev
  return prev.filter((action) => !['delete', 'duplicate', 'unpublish'].includes(action.action ?? ''))
}

/** Retire les singletons du menu « + Créer » global. */
export function singletonNewDocumentOptions(
  prev: TemplateItem[],
  ctx: NewDocumentOptionsContext,
): TemplateItem[] {
  if (ctx.creationContext.type === 'global') {
    return prev.filter((t) => !SINGLETON_TYPES.has(t.templateId))
  }
  return prev
}
