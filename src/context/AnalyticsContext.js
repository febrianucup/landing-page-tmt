import { createContext, useContext } from 'react'

export const AnalyticsContext = createContext(null)

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext)
  if (!ctx) throw new Error('useAnalytics() must be used inside <AnalyticsProvider>')
  return ctx
}
