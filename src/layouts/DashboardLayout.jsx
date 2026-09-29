import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import { SECTION_ROUTES } from '../lib/seed'
import { cn } from '../lib/cn'
import Button from '../ui/Button'

const OVERVIEW = { to: '/dashboard', label: 'Ringkasan', icon: 'dashboard', end: true }

const GROUPS = ['Konten', 'Pantauan', 'Struktur']

function useClockLabel(timestamp) {
  if (!timestamp) return 'memuat…'
  return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function NavItem({ item, onNavigate }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-label font-semibold transition-colors',
          isActive
            ? 'bg-primary-soft text-primary-ink'
            : 'text-muted hover:bg-fill hover:text-ink',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              'material-symbols-outlined text-[19px]',
              isActive ? 'text-primary' : 'text-faint',
            )}
          >
            {item.icon}
          </span>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">
              {item.badge}
            </span>
          ) : null}
        </>
      )}
    </NavLink>
  )
}

function SidebarContent({ unread, onNavigate }) {
  const { content } = useContent()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
          <span className="material-symbols-outlined text-[20px]">{content.brand.icon}</span>
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-bold text-ink">
            {content.brand.name}
          </p>
          <p className="text-micro text-faint">Panel Konten</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto scrollbar-slim px-3 pb-4">
        <div>
          <p className="px-3 pb-1.5 text-micro font-bold uppercase tracking-wider text-faint">
            Utama
          </p>
          <NavItem item={OVERVIEW} onNavigate={onNavigate} />
        </div>

        {GROUPS.map((group) => (
          <div key={group}>
            <p className="px-3 pb-1.5 text-micro font-bold uppercase tracking-wider text-faint">
              {group}
            </p>
            <div className="flex flex-col gap-0.5">
              {SECTION_ROUTES.filter((item) => item.group === group).map((item) => (
                <NavItem
                  key={item.to}
                  item={{ ...item, badge: item.to.endsWith('/submissions') && unread ? unread : null }}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-fill px-3 py-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-label font-bold text-primary-ink">
            {user?.name?.slice(0, 1) || 'A'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-label font-semibold text-ink">{user?.name || 'Admin'}</p>
            <p className="truncate text-micro text-faint">{user?.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon="open_in_new"
            className="flex-1"
            onClick={() => navigate('/')}
          >
            Lihat halaman
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon="logout"
            aria-label="Keluar"
            onClick={() => {
              logout()
              navigate('/login')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  const { content, savedAt } = useContent()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const savedLabel = useClockLabel(savedAt)

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const active =
    SECTION_ROUTES.find((item) => location.pathname.startsWith(item.to)) ||
    (location.pathname === '/dashboard' ? OVERVIEW : null)

  const unread = (content.submissions || []).filter((item) => item.status === 'new').length

  return (
    <div className="min-h-screen bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-line bg-white lg:block">
        <SidebarContent unread={unread} />
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setMenuOpen(false)}
          className={cn(
            'absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-[280px] border-r border-line bg-white shadow-pop transition-transform duration-200',
            menuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <SidebarContent unread={unread} onNavigate={() => setMenuOpen(false)} />
        </div>
      </div>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            <Button
              variant="secondary"
              size="icon"
              icon="menu"
              aria-label="Buka menu"
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15px] font-bold text-ink">
                {active?.label || 'Dashboard'}
              </p>
              <p className="truncate text-micro text-faint">
                Semua perubahan tersimpan otomatis di browser ini
              </p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-line bg-subtle px-3 py-1.5 text-micro font-semibold text-muted sm:inline-flex">
              <span className="material-symbols-outlined text-[15px] text-success">
                cloud_done
              </span>
              Tersimpan · {savedLabel}
            </span>
            <Button variant="secondary" size="sm" icon="visibility" as="a" href="/" target="_blank">
              Pratinjau
            </Button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
