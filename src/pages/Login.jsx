import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DEMO_ACCOUNT } from '../lib/demoAccount'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../ui/ToastContext'
import Button from '../ui/Button'
import { Field, Input } from '../ui/Field'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const redirectTo = location.state?.from || '/dashboard'

  // Redirect once the session is in place — also covers visiting /login while
  // already signed in.
  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true })
  }, [isAuthenticated, navigate, redirectTo])

  const submit = (event) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const result = login(email, password)
    setBusy(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    toast.success('Berhasil masuk. Selamat bekerja!')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink px-10 py-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #2b57e8 0, transparent 45%), radial-gradient(circle at 80% 70%, #0e9f6e 0, transparent 40%)',
          }}
        />
        <Link to="/" className="relative flex items-center gap-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <span className="material-symbols-outlined text-[20px]">school</span>
          </span>
          <span className="font-display text-[15px] font-bold">TMT Administration</span>
        </Link>

        <div className="relative max-w-md">
          <p className="text-micro font-bold uppercase tracking-wider text-primary-soft/70">
            Panel Konten
          </p>
          <h1 className="mt-3 font-display text-[34px] font-bold leading-tight text-white">
            Kelola seluruh halaman landing dari satu tempat.
          </h1>
          <p className="mt-4 text-body-lg text-white/65">
            Ubah teks hero, statistik, perbandingan, peran pengguna, kontak, dan navigasi —
            perubahan langsung terlihat di halaman publik.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {[
              'CRUD untuk setiap bagian halaman',
              'Pratinjau langsung tanpa build ulang',
              'Pesan masuk dari formulir kontak',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-label text-white/80">
                <span className="material-symbols-outlined text-[18px] text-success">
                  check_circle
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-micro text-white/40">
          © 2026 TMT Administration. Dedicated to educational excellence.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-label text-muted lg:hidden">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke halaman
          </Link>

          <h2 className="font-display text-[26px] font-bold tracking-tight text-ink">
            Masuk ke dashboard
          </h2>
          <p className="mt-1.5 text-label text-muted">
            Gunakan akun demo di bawah untuk mengelola konten.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <Field label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={DEMO_ACCOUNT.email}
                required
              />
            </Field>

            <Field label="Kata sandi" htmlFor="password">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-md text-faint transition-colors hover:bg-fill hover:text-ink"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </Field>

            {error ? (
              <p className="flex items-center gap-2 rounded-lg bg-danger-soft px-3 py-2 text-label font-medium text-danger-ink">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </p>
            ) : null}

            <Button type="submit" size="lg" icon="login" disabled={busy} className="mt-1">
              {busy ? 'Memeriksa…' : 'Masuk'}
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-line bg-subtle p-4">
            <p className="text-micro font-bold uppercase tracking-wider text-faint">Akun demo</p>
            <p className="mt-2 font-mono text-label text-ink">
              {DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}
            </p>
            <Button
              variant="secondary"
              size="sm"
              icon="bolt"
              className="mt-3"
              onClick={() => {
                setEmail(DEMO_ACCOUNT.email)
                setPassword(DEMO_ACCOUNT.password)
                setError('')
              }}
            >
              Isi otomatis
            </Button>
          </div>

          <p className="mt-6 text-center text-label text-muted">
            <Link to="/" className="font-semibold text-primary hover:text-primary-hover">
              ← Kembali ke landing page
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
