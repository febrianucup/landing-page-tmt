import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAnalytics } from '../context/AnalyticsContext'

/**
 * Records a page view on every landing hit and one "section" event per section
 * that actually entered the viewport (per visit).
 */
export default function useVisitTracking() {
  const { record } = useAnalytics()
  const location = useLocation()
  const seen = useRef(new Set())

  useEffect(() => {
    record({ type: 'view', path: location.pathname })
  }, [record, location.pathname])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (!entry.isIntersecting || !id || seen.current.has(id)) return
          seen.current.add(id)
          record({ type: 'section', section: id, path: location.pathname })
        })
      },
      { threshold: 0.45 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [record, location.pathname])
}
