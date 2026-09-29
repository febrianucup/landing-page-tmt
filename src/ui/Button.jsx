import { cn } from '../lib/cn'

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
  secondary: 'bg-white text-ink border border-line hover:bg-fill',
  soft: 'bg-primary-soft text-primary-ink hover:bg-primary-soft/70',
  ghost: 'text-muted hover:text-ink hover:bg-fill',
  danger: 'bg-danger text-white hover:bg-danger-ink shadow-sm',
  dangerSoft: 'bg-danger-soft text-danger-ink hover:bg-danger/10',
}

const SIZES = {
  sm: 'h-9 px-3 text-label gap-1.5',
  md: 'h-10 px-4 text-label gap-2',
  lg: 'h-12 px-6 text-body gap-2',
  icon: 'h-9 w-9 text-label',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter,
  className,
  children,
  type,
  ...rest
}) {
  const isButton = Component === 'button'
  return (
    <Component
      type={isButton ? type || 'button' : undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg font-semibold transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant] || VARIANTS.primary,
        SIZES[size] || SIZES.md,
        className,
      )}
      {...rest}
    >
      {icon ? <span className="material-symbols-outlined text-[18px]">{icon}</span> : null}
      {children}
      {iconAfter ? (
        <span className="material-symbols-outlined text-[18px]">{iconAfter}</span>
      ) : null}
    </Component>
  )
}
