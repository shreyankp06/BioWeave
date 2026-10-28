import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}

export default function Modal({ title, onClose, children, wide }: ModalProps) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest/60 dark:bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`rise flex max-h-[92vh] w-full flex-col rounded-t-3xl bg-beige dark:bg-dark-card shadow-2xl sm:rounded-3xl ${
          wide ? 'max-w-4xl' : 'max-w-xl'
        }`}
      >
        <div className="flex items-center justify-between border-b border-forest/10 dark:border-dark-border px-6 py-4">
          <h2 className="truncate font-display text-xl font-bold text-forest dark:text-white">{title}</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-1.5 text-forest/50 dark:text-white/50 hover:bg-sand dark:hover:bg-dark-muted hover:text-forest dark:hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
