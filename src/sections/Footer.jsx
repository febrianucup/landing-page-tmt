import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { content } = useContent()
  const { brand, footer } = content

  return (
    <footer className="bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <span className="material-symbols-outlined text-[20px]">{brand.icon}</span>
              </span>
              <span className="font-display text-[15px] font-bold text-ink">{brand.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-label text-muted">{footer.description || brand.tagline}</p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.id}>
              <p className="text-micro font-bold uppercase tracking-wider text-faint">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {(column.links || []).map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-label text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-micro text-faint">{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-5">
            {footer.legal.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-micro text-faint transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-micro font-semibold text-muted transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-[15px]">dashboard</span>
              Panel Konten
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
