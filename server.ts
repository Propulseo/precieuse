import { paraglideMiddleware } from './src/paraglide/server.js'
import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

export default createServerEntry({
  fetch(req) {
    return paraglideMiddleware(req, () => handler.fetch(req))
  },
})
