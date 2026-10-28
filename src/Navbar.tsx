import { Cpu, Sun, Moon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { APP_NAME } from './config'

type Page = 'home' | 'about' | 'submissions'

interface NavbarProps {
  page: Page
  onNav: (p: Page) => void
  dark: boolean
  onToggleTheme: () => void
}

export default function Navbar({ page, onNav, dark, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Profile' },
    { id: 'submissions', label: 'Portfolio' },
  ]

  const linkCls = (id: Page) =>
    `text-sm font-medium transition-all duration-200 px-3 py-1.5 rounded-full ${
      page === id
        ? 'bg-emerald text-forest font-semibold shadow-sm'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`

  return (
    <header className="sticky top-0 z-40 glass bg-forest/95 dark:bg-dark-bg/95 border-b border-white/10 shadow-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
        {/* Logo */}
        <button
          onClick={() => onNav('home')}
          className="flex items-center gap-2.5 group text-left"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald text-forest shadow-sm group-hover:rotate-180 transition-transform duration-700">
            <Cpu size={21} />
          </span>
          <div className="leading-tight">
            <p className="font-display text-xl font-bold tracking-tight text-white">{APP_NAME}</p>
            <p className="text-[10px] text-emerald tracking-wider uppercase font-medium">Student fieldbook</p>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((n) => (
            <button key={n.id} onClick={() => onNav(n.id)} className={linkCls(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Light / Dark theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90 hover:bg-white/20 hover:text-white transition-all shadow-sm active:scale-95"
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? (
              <>
                <Sun size={15} className="text-amber-300 animate-pulse-slow" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-emerald" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-forest/98 dark:bg-dark-bg/98 px-4 py-3 space-y-1.5 backdrop-blur-lg">
          {navLinks.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                onNav(n.id)
                setOpen(false)
              }}
              className={`block w-full rounded-2xl px-4 py-2.5 text-left text-sm transition-all ${
                page === n.id
                  ? 'bg-emerald text-forest font-semibold shadow-sm'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
