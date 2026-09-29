import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import { SECTION_ROUTES } from '../../lib/seed'
import { Card, CardHeader, Badge } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { EmptyState } from '../../ui/PageHeader'

function formatDate(value) {
  if (!value) return 'belum ada perubahan'
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function Overview() {
  const { content } = useContent()

  const counts = {
    stats: content.stats.items.length,
    problems: content.problems.items.length,
    roles: content.roles.items.length,
    nav: content.navbar.items.length,
    channels: content.contact.channels.length,
    footer: content.footer.columns.length,
  }

  const submissions = content.submissions || []
  const unread = submissions.filter((item) => item.status === 'new').length

  const tiles = [
    { label: 'Kartu statistik', value: counts.stats, icon: 'query_stats', to: '/dashboard/stats' },
    { label: 'Perbandingan', value: counts.problems, icon: 'fact_check', to: '/dashboard/problems' },
    { label: 'Peran pengguna', value: counts.roles, icon: 'groups', to: '/dashboard/roles' },
    { label: 'Menu navigasi', value: counts.nav, icon: 'menu', to: '/dashboard/navigation' },
    { label: 'Kanal kontak', value: counts.channels, icon: 'mail', to: '/dashboard/contact' },
    { label: 'Kolom footer', value: counts.footer, icon: 'table_chart', to: '/dashboard/navigation' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Ringkasan konten"
        description="Semua bagian landing page bisa diubah dari panel ini. Perubahan tersimpan otomatis di browser dan langsung terlihat di halaman publik."
        actions={
          <>
            <Button as="a" href="/" target="_blank" variant="secondary" icon="open_in_new">
              Buka landing page
            </Button>
            <Button as={Link} to="/dashboard/submissions" icon="inbox">
              Pesan masuk{unread ? ` (${unread})` : ''}
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader
          icon="tips_and_updates"
          title="Status dokumen"
          description={`Terakhir diperbarui: ${formatDate(content.updatedAt)}`}
          actions={<Badge name="success" icon="cloud_done">Tersimpan lokal</Badge>}
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-2xl bg-line sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((tile) => (
            <Link
              key={tile.to + tile.label}
              to={tile.to}
              className="group flex flex-col gap-2 bg-white px-4 py-5 transition-colors hover:bg-subtle"
            >
              <span className="material-symbols-outlined text-[20px] text-faint transition-colors group-hover:text-primary">
                {tile.icon}
              </span>
              <span className="font-display text-[24px] font-bold text-ink">{tile.value}</span>
              <span className="text-micro font-semibold uppercase tracking-wider text-muted">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="edit_note"
          title="Kelola bagian halaman"
          description="Pilih bagian yang ingin diubah. Setiap bagian mendukung tambah, ubah, urutkan, dan hapus."
        />
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          {SECTION_ROUTES.filter((item) => item.to !== '/dashboard/submissions').map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 transition-all hover:border-line-strong hover:shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary-ink">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-label font-semibold text-ink">{item.label}</span>
                <span className="block text-micro text-faint">{item.group}</span>
              </span>
              <span className="material-symbols-outlined text-[18px] text-faint">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="inbox"
          title="Pesan terbaru"
          description="Kiriman dari formulir kontak di landing page."
          actions={
            <Button as={Link} to="/dashboard/submissions" variant="ghost" size="sm" iconAfter="arrow_forward">
              Lihat semua
            </Button>
          }
        />
        <div className="p-5">
          {submissions.length === 0 ? (
            <EmptyState
              icon="mark_email_unread"
              title="Belum ada pesan"
              description="Pesan yang dikirim lewat formulir kontak akan muncul di sini."
              className="py-10"
            />
          ) : (
            <ul className="flex flex-col divide-y divide-line">
              {submissions.slice(0, 4).map((item) => (
                <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-fill text-label font-bold text-muted">
                    {(item.name || '?').slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-label font-semibold text-ink">
                      {item.name || 'Tanpa nama'}
                      {item.school ? (
                        <span className="font-normal text-faint"> · {item.school}</span>
                      ) : null}
                    </p>
                    <p className="truncate text-micro text-muted">{item.message}</p>
                  </div>
                  {item.status === 'new' ? <Badge name="warning">baru</Badge> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  )
}
