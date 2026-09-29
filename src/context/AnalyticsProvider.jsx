import { useCallback, useMemo, useRef, useState } from 'react'
import { AnalyticsContext } from './AnalyticsContext'
import {
  buildEvent,
  loadAnalytics,
  MAX_EVENTS,
  saveAnalytics,
} from '../lib/analytics'

export default function AnalyticsProvider({ children }) {
  const [doc, setDoc] = useState(() => loadAnalytics())
  const docRef = useRef(doc)

  /**
   * Every mutation is written through synchronously from the ref. Persisting in a
   * useEffect instead would race: React runs child effects before parent ones, so
   * a child `record()` was overwritten by the provider re-saving stale state.
   */
  const commit = useCallback((next) => {
    docRef.current = next
    saveAnalytics(next)
    setDoc(next)
  }, [])

  const update = useCallback(
    (mutate) => {
      commit(mutate(docRef.current))
    },
    [commit],
  )

  /**
   * Records one interaction. The event is built from a ref rather than inside the
   * state updater, so StrictMode's double invocation can never double-count.
   */
  const record = useCallback(
    (payload) => {
      const prev = docRef.current
      const event = buildEvent(prev, payload)
      if (!event) return null

      commit({
        ...prev,
        visitorId: prev.visitorId || event.visitorId,
        createdAt: prev.createdAt || event.at,
        events: [...prev.events, event].slice(-MAX_EVENTS),
      })
      return event
    },
    [commit],
  )

  const removeEvent = useCallback(
    (id) => update((prev) => ({ ...prev, events: prev.events.filter((event) => event.id !== id) })),
    [update],
  )

  const clearEvents = useCallback(() => update((prev) => ({ ...prev, events: [] })), [update])

  const value = useMemo(
    () => ({
      events: doc.events,
      record,
      removeEvent,
      clearEvents,
    }),
    [doc, record, removeEvent, clearEvents],
  )

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}
