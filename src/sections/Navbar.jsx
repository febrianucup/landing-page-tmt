import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { useAnalytics } from '../context/AnalyticsContext'
import { cn } from '../lib/cn'

export default function Navbar() {
  const { content } = useContent()
  const { record } = useAnalytics()
  const { navbar, brand } = content
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const anchors = useMemo(
    () =>
      navbar.items
        .filter((item) => item.href?.startsWith('#'))
        .map((item) => item.href.slice(1)),
    [navbar.items],
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
      const probe = window.scrollY + 160
      let current = ''
      for (const id of anchors) {
        const element = document.getElementById(id)
        if (!element) continue
        if (probe >= element.offsetTop && probe < element.offsetTop + element.offsetHeight) {
          current = id
          break
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [anchors])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        scrolled || menuOpen
          ? 'border-line bg-white/90 backdrop-blur-md'
          : 'border-transparent bg-white/70 backdrop-blur',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px]">{brand.icon}</span>
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-ink">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {navbar.items.map((item) => {
            const isActive = item.href === `#${activeSection}`
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => record({ type: 'click', label: item.label, path: '/' })}
                className={cn(
                  'rounded-lg px-3 py-2 text-label font-semibold transition-colors',
                  isActive ? 'text-primary' : 'text-muted hover:bg-fill hover:text-ink',
                )}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3 py-2 text-label font-semibold text-muted transition-colors hover:bg-fill hover:text-ink sm:block"
          >
            Masuk
          </Link>
          <a
            href={navbar.cta.href}
            onClick={() => record({ type: 'click', label: navbar.cta.label, path: '/' })}
            className="hidden h-10 items-center gap-2 rounded-lg bg-primary px-4 text-label font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover sm:inline-flex"
          >
            <span className="material-symbols-outlined text-[18px]">{navbar.cta.icon}</span>
            {navbar.cta.label}
          </a>
          <button
            type="button"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-fill lg:hidden"
          >
            <span className="material-symbols-outlined text-[22px]">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-line bg-white transition-[max-height,opacity] duration-200 lg:hidden',
          menuOpen ? 'max-h-96 border-t opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
          {navbar.items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                record({ type: 'click', label: item.label, path: '/' })
                setMenuOpen(false)
              }}
              className={cn(
                'rounded-lg px-3 py-2.5 text-body font-semibold transition-colors',
                item.href === `#${activeSection}`
                  ? 'bg-primary-soft text-primary-ink'
                  : 'text-ink hover:bg-fill',
              )}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 text-body font-semibold text-muted hover:bg-fill"
          >
            Masuk ke dashboard
          </Link>
          <a
            href={navbar.cta.href}
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-body font-semibold text-white"
          >
            <span className="material-symbols-outlined text-[18px]">{navbar.cta.icon}</span>
            {navbar.cta.label}
          </a>
        </div>
      </div>
    </header>
  )
}
