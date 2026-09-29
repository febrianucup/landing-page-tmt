import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from './ToastContext'
import { cn } from '../lib/cn'

const TONES = {
  success: { icon: 'check_circle', className: 'text-success-ink bg-success-soft border-success/25' },
  error: { icon: 'error', className: 'text-danger-ink bg-danger-soft border-danger/25' },
  info: { icon: 'info', className: 'text-primary-ink bg-primary-soft border-primary/20' },
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      window.clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback(
    (message, tone = 'success') => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }])
      timers.current.set(
        id,
        window.setTimeout(() => dismiss(id), 3200),
      )
    },
    [dismiss],
  )

  const value = useMemo(
    () => ({
      success: (message) => push(message, 'success'),
      error: (message) => push(message, 'error'),
      info: (message) => push(message, 'info'),
    }),
    [push],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-[min(22rem,calc(100vw-3rem))] flex-col gap-2">
        {toasts.map((toast) => {
          const tone = TONES[toast.tone] || TONES.info
          return (
            <button
              key={toast.id}
              type="button"
              onClick={() => dismiss(toast.id)}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-label font-medium shadow-lift backdrop-blur',
                tone.className,
              )}
            >
              <span className="material-symbols-outlined mt-px text-[18px]">{tone.icon}</span>
              <span className="flex-1">{toast.message}</span>
            </button>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
