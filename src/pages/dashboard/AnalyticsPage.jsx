import { useMemo, useState } from 'react'
import { useAnalytics } from '../../context/AnalyticsContext'
import { useContent } from '../../context/ContentContext'
import {
  formatDuration,
  formatRelative,
  RANGES,
  summarize,
} from '../../lib/analytics'
import { downloadText, toCsv } from '../../lib/download'
import { tone as toneClass } from '../../lib/tones'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader, { EmptyState } from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { ConfirmDialog } from '../../ui/Modal'
import { Input } from '../../ui/Field'
import { useToast } from '../../ui/ToastContext'

const EVENT_TYPES = {
  view: { label: 'Kunjungan', icon: 'visibility', tone: 'primary' },
  section: { label: 'Bagian', icon: 'view_agenda', tone: 'accent' },
  click: { label: 'Klik', icon: 'ads_click', tone: 'success' },
  submit: { label: 'Formulir', icon: 'mark_email_read', tone: 'warning' },
}

const DEVICE_ICONS = { desktop: 'desktop_windows', mobile: 'smartphone', tablet: 'tablet_mac' }

function KpiCard({ icon, tone, label, value, hint }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <span className="text-micro font-bold uppercase tracking-wider text-faint">{label}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneClass(tone, 'chip')}`}>
          <span className="material-symbols-outlined text-[18px]">{icon}</span>
        </span>
      </div>
      <p className="mt-3 font-display text-[30px] font-extrabold leading-none tracking-tight text-ink">
        {value}
      </p>
      <p className="mt-2 text-micro text-muted">{hint}</p>
    </div>
  )
}

function ShareRow({ label, count, max, icon, tone = 'primary' }) {
  const share = max > 0 ? Math.round((count / max) * 100) : 0
  return (
    <li className="flex flex-col gap-2 py-2.5 first:pt-0 last:pb-0">
      <div className="flex items-center gap-2.5">
        {icon ? (
          <span className="material-symbols-outlined text-[18px] text-faint">{icon}</span>
        ) : null}
        <span className="min-w-0 flex-1 truncate text-label font-semibold text-ink">{label}</span>
        <span className="text-label font-semibold tabular-nums text-muted">{count}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-fill">
        <div
          className={`h-full rounded-full ${toneClass(tone, 'solid')}`}
          style={{ width: `${Math.max(share, count > 0 ? 4 : 0)}%` }}
        />
      </div>
    </li>
  )
}

export default function AnalyticsPage() {
  const { events, removeEvent, clearEvents } = useAnalytics()
  const { content } = useContent()
  const toast = useToast()

  const [range, setRange] = useState('7')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [confirmClear, setConfirmClear] = useState(false)

  const summary = useMemo(() => summarize(events, { range }), [events, range])

  const sectionLabels = useMemo(() => {
    const map = new Map([['home', 'Hero']])
    content.navbar.items.forEach((item) => {
      if (item.href?.startsWith('#')) map.set(item.href.slice(1), item.label)
    })
    return map
  }, [content.navbar.items])

  const sectionName = (id) => sectionLabels.get(id) || id || 'Tanpa nama'

  const recent = useMemo(() => {
    const term = query.trim().toLowerCase()
    return summary.recent.filter((event) => {
      if (typeFilter !== 'all' && event.type !== typeFilter) return false
      if (!term) return true
      const haystack = [event.section, event.label, event.path, event.device, event.browser, sectionName(event.section)]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(term)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary.recent, query, typeFilter, sectionLabels])

  const exportCsv = () => {
    const csv = toCsv(events, [
      { label: 'waktu', value: 'at' },
      { label: 'jenis', value: (row) => EVENT_TYPES[row.type]?.label || row.type },
      { label: 'halaman', value: 'path' },
      { label: 'bagian', value: (row) => sectionName(row.section) },
      { label: 'label', value: 'label' },
      { label: 'perangkat', value: 'device' },
      { label: 'browser', value: 'browser' },
      { label: 'sesi', value: 'sessionId' },
      { label: 'pengunjung', value: 'visitorId' },
      { label: 'perujuk', value: 'referrer' },
    ])
    downloadText('tmt-kunjungan.csv', csv, 'text/csv')
    toast.success('Data kunjungan diekspor.')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Pantauan"
        title="Statistik Web"
        description="Berapa kali halaman dibuka, dari perangkat apa, bagian mana yang paling dilihat, dan aktivitas terbaru di landing page."
        actions={
          <>
            <Button as="a" href="/" target="_blank" variant="secondary" icon="open_in_new">
              Buka landing page
            </Button>
            <Button variant="secondary" icon="download" onClick={exportCsv} disabled={events.length === 0}>
              Ekspor CSV
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon="visibility"
          tone="primary"
          label="Kunjungan"
          value={summary.views}
          hint={`Halaman dibuka ${summary.views} kali dalam rentang ini`}
        />
        <KpiCard
          icon="person"
          tone="accent"
          label="Pengunjung unik"
          value={summary.visitors}
          hint={`${summary.sessions} sesi terpisah`}
        />
        <KpiCard
          icon="ads_click"
          tone="success"
          label="Bagian dilihat"
          value={summary.sectionAccess}
          hint={`Bagian halaman yang masuk layar`}
        />
        <KpiCard
          icon="bolt"
          tone="warning"
          label="Total aktivitas"
          value={summary.total}
          hint="Kunjungan + bagian + klik"
        />
      </div>

      <Card>
        <CardHeader
          icon="bar_chart"
          title="Aktivitas per hari"
          description={
            summary.maxPerDay > 0
              ? `Tertinggi ${summary.maxPerDay} aktivitas dalam sehari`
              : 'Belum ada aktivitas pada rentang ini'
          }
          actions={
            <div className="flex rounded-lg border border-line bg-white p-0.5">
              {RANGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRange(item.id)}
                  className={`rounded-md px-3 py-1.5 text-micro font-semibold uppercase tracking-wider transition-colors ${
                    range === item.id ? 'bg-primary-soft text-primary-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          }
        />

        <div className="px-5 pb-5 pt-6">
          <div className="flex h-40 items-end gap-1">
            {summary.perDay.map((day, index) => {
              const pct = summary.maxPerDay > 0 ? (day.count / summary.maxPerDay) * 100 : 0
              const step = Math.ceil(summary.perDay.length / 10)
              const last = index === summary.perDay.length - 1
              const showLabel = index % step === 0 || (last && (summary.perDay.length - 1) % step !== 0)
              return (
                <div key={day.key} className="group flex h-full flex-1 flex-col justify-end gap-1.5">
                  <div
                    title={`${day.count} aktivitas · ${day.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}`}
                    className={`mx-auto w-full max-w-10 rounded-t transition-colors ${
                      day.count > 0 ? 'bg-primary/70 group-hover:bg-primary' : 'bg-line'
                    }`}
                    style={{ height: day.count > 0 ? `${Math.max(pct, 6)}%` : '3px' }}
                  />
                  <span
                    className={`text-center text-[10px] leading-none text-faint ${showLabel ? '' : 'invisible'}`}
                  >
                    {day.date.getDate()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            icon="view_agenda"
            title="Bagian halaman yang dilihat"
            description="Dihitung saat bagian masuk ke layar pengunjung."
          />
          <div className="p-5">
            {summary.perSection.length === 0 ? (
              <p className="py-6 text-center text-label text-faint">
                Belum ada bagian yang tercatat pada rentang ini.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-line">
                {summary.perSection.map((row) => (
                  <ShareRow
                    key={row.id}
                    label={sectionName(row.id)}
                    count={row.count}
                    max={summary.perSection[0].count}
                    icon="segment"
                    tone="accent"
                  />
                ))}
              </ul>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader icon="devices" title="Perangkat" description="Dari user-agent pengunjung." />
            <div className="p-5">
              {summary.perDevice.length === 0 ? (
                <p className="py-4 text-center text-label text-faint">Belum ada data.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-line">
                  {summary.perDevice.map((row) => (
                    <ShareRow
                      key={row.id}
                      label={row.id}
                      count={row.count}
                      max={summary.perDevice[0].count}
                      icon={DEVICE_ICONS[row.id] || 'devices'}
                      tone="primary"
                    />
                  ))}
                </ul>
              )}
              {summary.perBrowser.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                  {summary.perBrowser.map((row) => (
                    <span
                      key={row.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-fill px-3 py-1 text-micro font-semibold text-muted"
                    >
                      {row.id}
                      <span className="text-ink">{row.count}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>

          <Card>
            <CardHeader icon="link" title="Halaman & menu" description="Halaman yang dibuka dan menu yang diklik." />
            <div className="p-5">
              {summary.perPath.length === 0 ? (
                <p className="py-4 text-center text-label text-faint">Belum ada halaman yang dibuka.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-line">
                  {summary.perPath.map((row) => (
                    <ShareRow
                      key={row.id}
                      label={row.id === '/' ? 'Landing page (/)' : row.id}
                      count={row.count}
                      max={summary.perPath[0].count}
                      icon="description"
                      tone="success"
                    />
                  ))}
                </ul>
              )}
              {summary.perLabel.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                  {summary.perLabel.map((row) => (
                    <span
                      key={row.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-micro font-semibold text-primary-ink"
                    >
                      <span className="material-symbols-outlined text-[14px]">ads_click</span>
                      {row.id}
                      <span>{row.count}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader
          icon="history"
          title={`Aktivitas terbaru (${recent.length})`}
          description="Kunjungan dan interaksi paling akhir, terbaru di atas."
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-line bg-white p-0.5">
                {[{ id: 'all', label: 'Semua' }, ...Object.entries(EVENT_TYPES).map(([id, meta]) => ({ id, label: meta.label }))].map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTypeFilter(item.id)}
                      className={`rounded-md px-2.5 py-1.5 text-micro font-semibold uppercase tracking-wider transition-colors ${
                        typeFilter === item.id ? 'bg-primary-soft text-primary-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </button>
                  ),
                )}
              </div>
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari bagian, menu, perangkat…"
                className="w-full sm:w-52"
              />
              <Button
                variant="dangerSoft"
                size="sm"
                icon="delete_sweep"
                onClick={() => setConfirmClear(true)}
                disabled={events.length === 0}
              >
                Hapus semua
              </Button>
            </div>
          }
        />

        <div className="p-5">
          {recent.length === 0 ? (
            <EmptyState
              icon="monitoring"
              title={events.length === 0 ? 'Belum ada kunjungan tercatat' : 'Tidak ada aktivitas yang cocok'}
              description={
                events.length === 0
                  ? 'Buka landing page di browser ini, lalu kembali ke halaman ini — setiap kunjungan dan bagian yang dilihat akan tercatat otomatis.'
                  : 'Coba ubah rentang waktu, filter jenis, atau kata kunci pencarian.'
              }
              action={
                events.length === 0 ? (
                  <Button as="a" href="/" target="_blank" icon="open_in_new">
                    Buka landing page
                  </Button>
                ) : null
              }
            />
          ) : (
            <ul className="flex flex-col divide-y divide-line">
              {recent.slice(0, 40).map((event) => {
                const meta = EVENT_TYPES[event.type] || EVENT_TYPES.view
                return (
                  <li key={event.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${toneClass(meta.tone, 'chip')}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{meta.icon}</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 text-label font-semibold text-ink">
                        {event.type === 'section' ? sectionName(event.section) : meta.label}
                        {event.type === 'click' && event.label ? (
                          <span className="font-normal text-muted">· {event.label}</span>
                        ) : null}
                        {event.type === 'view' ? (
                          <span className="font-normal text-muted">
                            · {event.path === '/' ? 'landing page' : event.path}
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 flex items-center gap-2 text-micro text-faint">
                        <span className="material-symbols-outlined text-[14px]">
                          {DEVICE_ICONS[event.device] || 'devices'}
                        </span>
                        {event.device} · {event.browser}
                        {event.referrer && !event.referrer.startsWith(window.location.origin)
                          ? ` · dari ${event.referrer.replace(/^https?:\/\//, '').slice(0, 32)}`
                          : ''}
                      </p>
                    </div>
                    <span className="hidden flex-shrink-0 text-micro text-faint sm:block">
                      {formatRelative(event.at)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      icon="delete"
                      aria-label="Hapus catatan"
                      className="hover:bg-danger-soft hover:text-danger-ink"
                      onClick={() => {
                        removeEvent(event.id)
                        toast.success('Catatan kunjungan dihapus.')
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          )}
          {recent.length > 40 ? (
            <p className="mt-3 text-center text-micro text-faint">
              Menampilkan 40 aktivitas terbaru dari {recent.length} pada rentang ini.
            </p>
          ) : null}
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="group_work"
          title={`Sesi terbaru (${summary.sessionList.length})`}
          description="Sesi baru dihitung setelah 30 menit tanpa aktivitas."
        />
        <div className="overflow-x-auto p-5">
          {summary.sessionList.length === 0 ? (
            <p className="py-6 text-center text-label text-faint">Belum ada sesi pada rentang ini.</p>
          ) : (
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="text-micro font-bold uppercase tracking-wider text-faint">
                  <th className="pb-2 pr-4 font-bold">Mulai</th>
                  <th className="pb-2 pr-4 font-bold">Durasi</th>
                  <th className="pb-2 pr-4 font-bold">Kunjungan</th>
                  <th className="pb-2 font-bold">Perangkat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {summary.sessionList.slice(0, 12).map((session) => (
                  <tr key={session.id} className="text-label">
                    <td className="py-2.5 pr-4 text-ink">{formatRelative(session.start)}</td>
                    <td className="py-2.5 pr-4 tabular-nums text-muted">
                      {formatDuration(session.durationMs)}
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-muted">
                      {session.views} hal · {session.events} aktivitas
                    </td>
                    <td className="py-2.5 text-muted">
                      {session.device} · {session.browser}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <ConfirmDialog
        open={confirmClear}
        title="Hapus semua catatan kunjungan?"
        description="Seluruh riwayat kunjungan akan hilang — termasuk yang sedang tidak terlihat karena filter atau rentang waktu. Ekspor CSV dulu jika ingin menyimpannya."
        confirmLabel="Ya, hapus"
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => {
          clearEvents()
          setConfirmClear(false)
          toast.success('Catatan kunjungan dihapus.')
        }}
      />
    </div>
  )
}
