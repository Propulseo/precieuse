// DIAG STUB - Better Auth temporairement neutralisé pour isoler une boucle SSR
export const auth = {
  handler: async (_request: Request) =>
    new Response('Auth disabled (diag)', { status: 503 }),
}