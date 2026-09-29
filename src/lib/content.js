import { DEFAULT_CONTENT } from './seed'

const CONTENT_KEY = 'tmt.content.v1'
const SESSION_KEY = 'tmt.session.v1'

const isPlainObject = (value) =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const clone = (value) => JSON.parse(JSON.stringify(value))

/**
 * Recursively fill stored content with any missing defaults so that
 * adding a field to the schema never breaks an existing saved document.
 */
export function mergeDefaults(defaults, stored) {
  if (Array.isArray(defaults)) return Array.isArray(stored) ? stored : clone(defaults)
  if (isPlainObject(defaults)) {
    if (!isPlainObject(stored)) return clone(defaults)
    const merged = {}
    for (const key of Object.keys(defaults)) {
      merged[key] = mergeDefaults(defaults[key], stored[key])
    }
    for (const key of Object.keys(stored)) {
      if (!(key in merged)) merged[key] = stored[key]
    }
    return merged
  }
  return stored === undefined || stored === null ? defaults : stored
}

export function loadContent() {
  if (typeof window === 'undefined') return clone(DEFAULT_CONTENT)
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY)
    if (!raw) return clone(DEFAULT_CONTENT)
    return mergeDefaults(DEFAULT_CONTENT, JSON.parse(raw))
  } catch {
    return clone(DEFAULT_CONTENT)
  }
}

export function saveContent(content) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content))
  } catch {
    /* storage full or unavailable — the in-memory state stays authoritative */
  }
}

export function clearContent() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CONTENT_KEY)
  } catch {
    /* ignore */
  }
}

export function loadSession() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSession(session) {
  if (typeof window === 'undefined') return
  try {
    if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else window.localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

/* ---------- immutable path helpers used by the content provider ---------- */

export function getAt(root, path) {
  return path.reduce((node, key) => (node === undefined || node === null ? node : node[key]), root)
}

export function setAt(root, path, value) {
  const [head, ...rest] = path
  const base = Array.isArray(root) ? root.slice() : { ...root }
  base[head] = rest.length === 0 ? value : setAt(root[head], rest, value)
  return base
}

export function defaultDocument() {
  return clone(DEFAULT_CONTENT)
}

export { CONTENT_KEY, SESSION_KEY }
