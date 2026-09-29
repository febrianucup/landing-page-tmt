import { useCallback, useEffect, useMemo, useState } from 'react'
import { ContentContext } from './ContentContext'
import {
  defaultDocument,
  getAt,
  loadContent,
  mergeDefaults,
  saveContent,
  setAt,
} from '../lib/content'
import { uid } from '../lib/cn'

/**
 * Holds the whole landing-page document and persists every change to
 * localStorage. Exposed operations are path based, e.g.
 * setPath(['hero', 'title'], 'Baru') or addItem(['stats', 'items']).
 */
export default function ContentProvider({ children }) {
  const [content, setContent] = useState(() => loadContent())
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    saveContent(content)
    setSavedAt(Date.now())
  }, [content])

  const commit = useCallback((updater) => {
    setContent((prev) => ({
      ...updater(prev),
      updatedAt: new Date().toISOString(),
    }))
  }, [])

  const setPath = useCallback(
    (path, value) => commit((prev) => setAt(prev, path, value)),
    [commit],
  )

  const addItem = useCallback(
    (path, item = {}) =>
      commit((prev) => {
        const list = getAt(prev, path) || []
        return setAt(prev, path, [...list, { id: uid(), ...item }])
      }),
    [commit],
  )

  const updateItem = useCallback(
    (path, id, patch) =>
      commit((prev) => {
        const list = getAt(prev, path) || []
        return setAt(
          prev,
          path,
          list.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        )
      }),
    [commit],
  )

  const removeItem = useCallback(
    (path, id) =>
      commit((prev) => {
        const list = getAt(prev, path) || []
        return setAt(
          prev,
          path,
          list.filter((item) => item.id !== id),
        )
      }),
    [commit],
  )

  const moveItem = useCallback(
    (path, id, delta) =>
      commit((prev) => {
        const list = [...(getAt(prev, path) || [])]
        const from = list.findIndex((item) => item.id === id)
        const to = from + delta
        if (from < 0 || to < 0 || to >= list.length) return prev
        const [moved] = list.splice(from, 1)
        list.splice(to, 0, moved)
        return setAt(prev, path, list)
      }),
    [commit],
  )

  /** Replaces the entire document (used by JSON import). */
  const replaceDocument = useCallback(
    (document) => setContent(mergeDefaults(defaultDocument(), document)),
    [],
  )

  const resetAll = useCallback(() => setContent(defaultDocument()), [])

  const addSubmission = useCallback(
    (payload) =>
      commit((prev) => ({
        ...prev,
        submissions: [
          { id: uid('msg'), status: 'new', createdAt: new Date().toISOString(), ...payload },
          ...(prev.submissions || []),
        ],
      })),
    [commit],
  )

  const value = useMemo(
    () => ({
      content,
      savedAt,
      setPath,
      addItem,
      updateItem,
      removeItem,
      moveItem,
      replaceDocument,
      resetAll,
      addSubmission,
    }),
    [
      content,
      savedAt,
      setPath,
      addItem,
      updateItem,
      removeItem,
      moveItem,
      replaceDocument,
      resetAll,
      addSubmission,
    ],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
