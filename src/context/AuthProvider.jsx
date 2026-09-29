import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import { loadSession, saveSession } from '../lib/content'
import { DEMO_ACCOUNT } from '../lib/demoAccount'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession())

  const login = useCallback((email, password) => {
    const emailOk = String(email || '').trim().toLowerCase() === DEMO_ACCOUNT.email
    const passwordOk = String(password || '') === DEMO_ACCOUNT.password
    if (!emailOk || !passwordOk) {
      return { ok: false, error: 'Email atau kata sandi salah.' }
    }
    const session = { name: 'Admin TMT', email: DEMO_ACCOUNT.email, since: new Date().toISOString() }
    saveSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    saveSession(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: Boolean(user) }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
