/** Shared tone → class mapping so landing sections and dashboard agree. */
export const TONE = {
  primary: {
    chip: 'bg-primary-soft text-primary-ink',
    solid: 'bg-primary text-white',
    soft: 'bg-primary-soft',
    text: 'text-primary',
    border: 'border-primary/20',
  },
  success: {
    chip: 'bg-success-soft text-success-ink',
    solid: 'bg-success text-white',
    soft: 'bg-success-soft',
    text: 'text-success',
    border: 'border-success/20',
  },
  accent: {
    chip: 'bg-accent-soft text-accent-ink',
    solid: 'bg-accent text-white',
    soft: 'bg-accent-soft',
    text: 'text-accent',
    border: 'border-accent/20',
  },
  warning: {
    chip: 'bg-warning-soft text-warning-ink',
    solid: 'bg-warning text-white',
    soft: 'bg-warning-soft',
    text: 'text-warning',
    border: 'border-warning/20',
  },
  danger: {
    chip: 'bg-danger-soft text-danger-ink',
    solid: 'bg-danger text-white',
    soft: 'bg-danger-soft',
    text: 'text-danger',
    border: 'border-danger/20',
  },
}

export function tone(name, key = 'chip') {
  return (TONE[name] || TONE.primary)[key]
}
