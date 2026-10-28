import { useEffect, useState } from 'react'
import { ASSIGNMENTS } from './data/assignments'
import type { Assignment } from './lib'
import Navbar from './Navbar'
import HomePage from './HomePage'
import AboutPage from './AboutPage'
import SubmissionsPage from './SubmissionsPage'
import Footer from './Footer'

type Page = 'home' | 'about' | 'submissions'

const THEME_KEY = 'circuit-atlas-theme'

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false
  const saved = localStorage.getItem(THEME_KEY)
  if (saved) return saved === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark: boolean) {
  if (typeof document === 'undefined') return
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
}

export default function App() {
  const [items] = useState<Assignment[]>(ASSIGNMENTS)
  const [page, setPage] = useState<Page>('home')
  const [toast, setToast] = useState('')
  const [dark, setDark] = useState<boolean>(getInitialDark)

  // Sync theme changes to <html> class and localStorage
  useEffect(() => {
    applyTheme(dark)
  }, [dark])

  const toggleTheme = () => setDark((prev) => !prev)

  const flash = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(''), 3200)
  }

  const handleNav = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-screen flex-col bg-beige dark:bg-dark-bg text-forest dark:text-white transition-colors duration-300 selection:bg-emerald selection:text-forest">
      {/* Site navigation */}
      <Navbar
        page={page}
        onNav={handleNav}
        dark={dark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {page === 'home' && (
          <HomePage
            items={items}
            onNavAbout={() => handleNav('about')}
            onNavSubmissions={() => handleNav('submissions')}
          />
        )}
        {page === 'about' && <AboutPage />}
        {page === 'submissions' && (
          <SubmissionsPage items={items} onFlash={flash} />
        )}
      </main>

      {/* Site footer */}
      <Footer />

      {/* Download status */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-forest dark:bg-emerald px-6 py-3 text-sm font-semibold text-white dark:text-forest shadow-2xl backdrop-blur-md animate-rise border border-white/10 dark:border-forest/20">
          {toast}
        </div>
      )}
    </div>
  )
}
