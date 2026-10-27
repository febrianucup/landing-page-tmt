import { useContent } from '../context/ContentContext'
import { DEFAULT_HERO_IMAGE } from '../lib/assets'

export default function Hero() {
  const { content } = useContent()
  const hero = content.hero
  const highlights = (hero.highlights || []).filter((item) => item.trim())
  const image = hero.image || DEFAULT_HERO_IMAGE

  return (
    <section id="home" className="border-b border-line bg-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div
          className={
            hero.showImage
              ? 'grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]'
              : 'flex max-w-3xl flex-col'
          }
        >
          <div data-aos="fade-up">
            {/* {hero.eyebrow ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-subtle px-3 py-1.5 text-micro font-bold uppercase tracking-wider text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {hero.eyebrow}
              </span>
            ) : null} */}

            <h1 className="mt-5 font-display text-[36px] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-[46px] lg:text-[54px]">
              {hero.title}{' '}
              <span className="relative inline-block text-primary">
                {hero.highlight}
                <span className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-sm bg-primary-soft" />
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lead text-muted">{hero.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {hero.primaryCta?.label ? (
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-body font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  {hero.primaryCta.label}
                  <span className="material-symbols-outlined text-[18px]">
                    {hero.primaryCta.icon}
                  </span>
                </a>
              ) : null}

              {hero.showSecondaryCta && hero.secondaryCta?.label ? (
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-white px-6 text-body font-semibold text-ink transition-colors hover:bg-fill"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {hero.secondaryCta.icon}
                  </span>
                  {hero.secondaryCta.label}
                </a>
              ) : null}
            </div>

            {highlights.length > 0 ? (
              <ul className="mt-8 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                {highlights.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-start gap-2.5 text-label text-muted"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-[17px] text-success">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* {hero.showTrust && hero.trust ? (
              <p className="mt-6 flex items-center gap-2 text-label font-medium text-faint">
                <span className="material-symbols-outlined text-[17px] text-primary">
                  verified
                </span>
                {hero.trust}
              </p>
            ) : null} */}
          </div>

          {hero.showImage ? (
            <div className="relative" data-aos="fade-up" data-aos-delay="120">
              <div className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-primary-soft to-success-soft" />
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
                <div className="flex items-center gap-1.5 border-b border-line bg-subtle px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-danger/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/40" />
                  <span className="ml-3 truncate rounded-md bg-white px-2 py-0.5 text-micro text-faint">
                    app.tmt.school
                  </span>
                </div>
                <img
                  src={image}
                  alt={`Tampilan aplikasi ${content.brand.name}`}
                  className="aspect-[4/3] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
