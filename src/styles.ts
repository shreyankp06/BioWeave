/** Shared Tailwind class strings used across all components */

export const btn     = 'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95'
export const primary = `${btn} bg-emerald text-forest hover:bg-emerald/90 shadow-sm`
export const ghost   = `${btn} border border-forest/15 dark:border-white/15 bg-white dark:bg-dark-card text-forest dark:text-white hover:bg-sand/60 dark:hover:bg-dark-muted`
export const danger  = `${ghost} !text-red-600 dark:!text-red-400 hover:!bg-red-50 dark:hover:!bg-red-900/20`
export const input   = 'w-full rounded-xl border border-forest/15 dark:border-white/10 bg-white dark:bg-dark-card px-3.5 py-2.5 text-sm text-forest dark:text-white placeholder:text-forest/40 dark:placeholder:text-white/30 focus:border-emerald focus:outline-none transition-colors'
export const card    = 'rounded-3xl bg-white dark:bg-dark-card shadow-sm border border-transparent dark:border-dark-border'
export const label   = 'mb-1.5 block text-sm font-medium text-forest dark:text-white/80'
