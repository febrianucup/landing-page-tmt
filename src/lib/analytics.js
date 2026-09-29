/**
 * Local visit tracking.
 *
 * The site has no backend, so events are stored in localStorage under their own
 * key (kept out of the content document so page-view volume never slows down
 * content saves). Everything stays inside this browser — to count visits from
 * all visitors, an event endpoint would have to be added (see README).
 */

export const ANALYTICS_KEY = 'tmt.analytics.v1'

const SESSION_GAP_MS = 30 * 60 * 1000

/**
 * Per-type duplicate guard. Views and clicks repeat fast when a page remounts
 * (React StrictMode mounts twice in dev); sections are only recorded once per
 * visit, so a wider window is safe and survives that double mount.
 */
const DEDUPE_WINDOW_MS = { view: 1500, section: 60000, click: 1500, submit: 5000 }

/** Hard cap on stored events; oldest are dropped first. */
export const MAX_EVENTS = 800

export const EMPTY_ANALYTICS = {
  version: 1,
  visitorId: '',
  recording: true,
  createdAt: null,
  events: [],
}

const uid = (prefix) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

export function loadAnalytics() {
  if (typeof window === 'undefined') return { ...EMPTY_ANALYTICS }
  try {
    const raw = window.localStorage.getItem(ANALYTICS_KEY)
    if (!raw) return { ...EMPTY_ANALYTICS }
    const parsed = JSON.parse(raw)
    return {
      ...EMPTY_ANALYTICS,
      ...parsed,
      events: Array.isArray(parsed.events) ? parsed.events : [],
    }
  } catch {
    return { ...EMPTY_ANALYTICS }
  }
}

export function saveAnalytics(doc) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(doc))
  } catch {
    /* storage full or unavailable — in-memory state stays authoritative */
  }
}

export function detectDevice() {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''
  if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet'
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return 'mobile'
  return 'desktop'
}

export function detectBrowser() {
  if (typeof navigator === 'undefined') return 'Lainnya'
  const ua = navigator.userAgent || ''
  if (/Edg\//i.test(ua)) return 'Edge'
  if (/OPR\/|Opera/i.test(ua)) return 'Opera'
  if (/Chrome\//i.test(ua)) return 'Chrome'
  if (/Firefox\//i.test(ua)) return 'Firefox'
  if (/Safari\//i.test(ua)) return 'Safari'
  return 'Lainnya'
}

/** Builds the next event, or returns null when it duplicates the previous one. */
export function buildEvent(doc, payload, now = Date.now()) {
  if (!doc.recording) return null

  const events = doc.events
  const last = events[events.length - 1]
  const at = new Date(now).toISOString()
  const window = DEDUPE_WINDOW_MS[payload.type] ?? 1500

  if (
    last &&
    last.type === payload.type &&
    last.path === payload.path &&
    (payload.section ? last.section === payload.section : true) &&
    now - new Date(last.at).getTime() < window
  ) {
    return null
  }

  const withinSession = last && now - new Date(last.at).getTime() < SESSION_GAP_MS

  return {
    id: uid('ev'),
    at,
    type: payload.type || 'view',
    path: payload.path || '/',
    section: payload.section || '',
    label: payload.label || '',
    referrer: payload.referrer ?? (typeof document !== 'undefined' ? document.referrer || '' : ''),
    device: payload.device || detectDevice(),
    browser: payload.browser || detectBrowser(),
    sessionId: withinSession && last.sessionId ? last.sessionId : uid('s'),
    visitorId: doc.visitorId || uid('v'),
  }
}

/* ---------- aggregation ---------- */

export function dateKey(value) {
  const date = value instanceof Date ? value : new Date(value)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function startOfToday(now = Date.now()) {
  const date = new Date(now)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export const RANGES = [
  { id: 'today', label: 'Hari ini' },
  { id: '7', label: '7 hari' },
  { id: '30', label: '30 hari' },
  { id: 'all', label: 'Semua' },
]

export function rangeCutoff(range, now = Date.now()) {
  if (range === 'today') return startOfToday(now)
  if (range === '7') return now - 7 * 24 * 60 * 60 * 1000
  if (range === '30') return now - 30 * 24 * 60 * 60 * 1000
  return 0
}

export function rangeDays(range) {
  if (range === 'today') return 1
  if (range === '7') return 7
  if (range === '30') return 30
  return 14
}

function topCounts(events, keyOf) {
  const map = new Map()
  events.forEach((event) => {
    const key = keyOf(event)
    if (!key) return
    map.set(key, (map.get(key) || 0) + 1)
  })
  return [...map.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count || String(a.id).localeCompare(String(b.id)))
}

export function summarize(events, { range = '7', now = Date.now() } = {}) {
  const cutoff = rangeCutoff(range, now)
  const scoped = events.filter((event) => new Date(event.at).getTime() >= cutoff)

  const views = scoped.filter((event) => event.type === 'view')
  const sections = scoped.filter((event) => event.type === 'section')
  const clicks = scoped.filter((event) => event.type === 'click')

  const visitorIds = new Set(scoped.map((event) => event.visitorId).filter(Boolean))
  const sessionIds = new Set(scoped.map((event) => event.sessionId).filter(Boolean))

  const days = rangeDays(range)
  const perDay = []
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - offset)
    perDay.push({
      key: dateKey(date),
      date,
      count: 0,
    })
  }
  const dayIndex = new Map(perDay.map((day) => [day.key, day]))
  scoped.forEach((event) => {
    const day = dayIndex.get(dateKey(event.at))
    if (day) day.count += 1
  })

  // sessions
  const sessionMap = new Map()
  scoped
    .slice()
    .sort((a, b) => new Date(a.at) - new Date(b.at))
    .forEach((event) => {
      const entry = sessionMap.get(event.sessionId) || {
        id: event.sessionId,
        start: event.at,
        end: event.at,
        events: 0,
        views: 0,
        device: event.device,
        browser: event.browser,
        referrer: event.referrer,
      }
      entry.end = event.at
      entry.events += 1
      if (event.type === 'view') entry.views += 1
      sessionMap.set(event.sessionId, entry)
    })

  const sessionList = [...sessionMap.values()]
    .map((entry) => ({
      ...entry,
      durationMs: Math.max(0, new Date(entry.end).getTime() - new Date(entry.start).getTime()),
    }))
    .sort((a, b) => new Date(b.start) - new Date(a.start))

  return {
    scoped,
    total: scoped.length,
    views: views.length,
    visitors: visitorIds.size,
    sessions: sessionIds.size,
    sectionAccess: sections.length,
    clicks: clicks.length,
    perDay,
    maxPerDay: perDay.reduce((max, day) => Math.max(max, day.count), 0),
    perSection: topCounts(sections, (event) => event.section),
    perPath: topCounts(views, (event) => event.path),
    perDevice: topCounts(scoped, (event) => event.device),
    perBrowser: topCounts(scoped, (event) => event.browser),
    perLabel: topCounts(clicks, (event) => event.label),
    sessionList,
    recent: scoped.slice().sort((a, b) => new Date(b.at) - new Date(a.at)),
  }
}

export function formatRelative(value, now = Date.now()) {
  const diff = now - new Date(value).getTime()
  if (Number.isNaN(diff)) return '—'
  if (diff < 45 * 1000) return 'baru saja'
  const minutes = Math.round(diff / 60000)
  if (minutes < 60) return `${minutes} menit lalu`
  const hours = Math.round(diff / 3600000)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.round(diff / 86400000)
  if (days === 1) return 'kemarin'
  if (days < 30) return `${days} hari lalu`
  return new Date(value).toLocaleDateString('id-ID', { dateStyle: 'medium' })
}

export function formatDuration(ms) {
  if (!ms || ms < 1000) return '< 1 dtk'
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.round((ms % 60000) / 1000)
  if (minutes < 60) return `${minutes}m ${seconds}s`
  const hours = Math.floor(minutes / 60)
  return `${hours}j ${minutes % 60}m`
}
