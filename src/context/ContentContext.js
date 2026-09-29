import { createContext, useContext } from 'react'

export const ContentContext = createContext(null)

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent() must be used inside <ContentProvider>')
  return ctx
}
