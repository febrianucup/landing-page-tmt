import { useContent } from '../context/ContentContext'

export default function Cta() {
  const { content } = useContent()
  const cta = content.cta

  return (
    <section className="border-b border-line bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-14 text-center lg:px-16 lg:py-20"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-ink" />
          {cta.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${cta.image})` }}
            />
          ) : (
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 20%, #2b57e8 0, transparent 45%), radial-gradient(circle at 85% 80%, #0e9f6e 0, transparent 45%)',
              }}
            />
          )}

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-[36px]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/70">{cta.description}</p>
            <div className="mt-9 flex justify-center">
              <a
                href={cta.buttonHref}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-body font-semibold text-ink transition-colors hover:bg-white/90"
              >
                {cta.buttonLabel}
                <span className="material-symbols-outlined text-[18px] text-primary">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
