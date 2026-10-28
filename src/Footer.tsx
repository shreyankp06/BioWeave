export default function Footer() {
  return (
    <footer className="border-t border-forest/10 dark:border-white/10 bg-white/75 dark:bg-dark-card/90 backdrop-blur-md py-5 px-4 md:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-forest/75 dark:text-white/70 text-center sm:text-left">
        <p className="font-medium tracking-tight">
          © 2026 Circuit Atlas · Shreyank Parab · 24102B0044 · TE CMPN B
        </p>
        <p className="hidden sm:inline text-forest/50 dark:text-white/45 font-normal">
          E-Waste &amp; Environmental Management
        </p>
      </div>
    </footer>
  )
}
