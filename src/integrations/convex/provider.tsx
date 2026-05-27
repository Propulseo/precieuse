import { ConvexProvider } from 'convex/react'
import { ConvexQueryClient } from '@convex-dev/react-query'

const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL

let convexQueryClient: ConvexQueryClient | null = null
if (CONVEX_URL) {
  convexQueryClient = new ConvexQueryClient(CONVEX_URL)
} else {
  console.warn('VITE_CONVEX_URL not set — Convex disabled')
}

export default function AppConvexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (!convexQueryClient) {
    return <>{children}</>
  }
  return (
    <ConvexProvider client={convexQueryClient.convexClient}>
      {children}
    </ConvexProvider>
  )
}
