import { Leaf, ArrowRight, FolderOpen, FileCheck2, Sparkles, BookOpen, Award, Cpu } from 'lucide-react'
import type { Assignment } from './lib'
import { APP_NAME, TAGLINE, HERO_HEADING, HERO_SUB, STUDENT } from './config'
import { primary, ghost } from './styles'

interface HomePageProps {
  items: Assignment[]
  onNavAbout: () => void
  onNavSubmissions: () => void
}

export default function HomePage({ items, onNavAbout, onNavSubmissions }: HomePageProps) {
  // Dynamically calculate unique assignment counts from centralized assignment data
  const totalSubmissions = items.length
  const isaCount = items.filter((a) => a.category === 'ISA').length
  const eseCount = items.filter((a) => a.category === 'ESE').length
  const extrasCount = items.filter((a) => a.category === 'Extras').length

  return (
    <div className="rise">
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-gradient pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 transition-colors duration-300">
        {/* Decorative ambient background glows */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Course badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/15 px-4 py-1.5 text-xs font-semibold text-emerald backdrop-blur-md shadow-sm">
                <Sparkles size={14} className="text-lime" />
                <span>E-Waste &amp; Environmental Management · {STUDENT.class}</span>
              </div>

              {/* Main heading */}
              <h1 className="font-display text-4xl font-bold leading-[1.15] text-white md:text-5xl lg:text-6xl tracking-tight">
                {HERO_HEADING}
              </h1>

              {/* Supporting Description */}
              <p className="text-base md:text-lg leading-relaxed text-white/85 max-w-xl">
                {HERO_SUB}
              </p>

              {/* Tagline */}
              <div className="flex items-center gap-2 text-sm font-medium text-emerald/90">
                <Leaf size={16} className="text-lime flex-shrink-0" />
                <span className="italic tracking-wide">"{TAGLINE}"</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onNavSubmissions}
                  className={`${primary} !px-7 !py-3.5 !text-base font-semibold shadow-lg shadow-emerald/25 hover:shadow-emerald/40 gap-2 group`}
                >
                  Explore the Portfolio{' '}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
                <button
                  onClick={onNavAbout}
                  className={`${ghost} !border-white/25 !bg-white/10 !text-white hover:!bg-white/20 !px-7 !py-3.5 !text-base font-medium backdrop-blur-sm`}
                >
                  Student Profile
                </button>
              </div>
            </div>

            {/* Right Hero Circular Economy Visual (Desktop & Mobile Responsive) */}
            <div className="lg:col-span-5 flex justify-center py-4 lg:py-0">
              <PortfolioSnapshot />
            </div>
          </div>
        </div>
      </section>

      {/* ── Portfolio counts ────────────────────────────────────── */}
      <section className="relative -mt-10 z-20 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Card 1: Total Submissions */}
          <StatCard
            icon={FolderOpen}
            count={totalSubmissions}
            label="Portfolio entries"
            sub="Files grouped by course activity"
            accent="border-emerald/30 hover:border-emerald"
            badgeBg="bg-emerald/15 text-emerald"
            numberColor="text-forest dark:text-emerald"
          />

          {/* Card 2: ISA Activities */}
          <StatCard
            icon={FileCheck2}
            count={isaCount}
            label="ISA entries"
            sub="Coursework and class material"
            accent="border-blue-500/30 hover:border-blue-500"
            badgeBg="bg-blue-500/15 text-blue-600 dark:text-blue-400"
            numberColor="text-forest dark:text-white"
          />

          {/* Card 3: ESE Activities */}
          <StatCard
            icon={Award}
            count={eseCount}
            label="ESE entries"
            sub="Reports, analysis and visual work"
            accent="border-purple-500/30 hover:border-purple-500"
            badgeBg="bg-purple-500/15 text-purple-600 dark:text-purple-400"
            numberColor="text-forest dark:text-white"
          />

          {/* Card 4: Extras */}
          <StatCard
            icon={BookOpen}
            count={extrasCount}
            label="Extras"
            sub="Additional resources and case studies"
            accent="border-amber-500/30 hover:border-amber-500"
            badgeBg="bg-amber-500/15 text-amber-600 dark:text-amber-400"
            numberColor="text-forest dark:text-white"
          />
        </div>
      </section>

      {/* ── Portfolio Introduction ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 dark:bg-emerald/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald">
              <Leaf size={13} /> About this collection
            </span>
            <h2 className="font-display text-3xl font-bold text-forest dark:text-white md:text-4xl leading-tight">
              A working index of e-waste coursework
            </h2>
            <p className="leading-relaxed text-forest/75 dark:text-white/70">
              <strong>{APP_NAME}</strong> brings together the coursework of <strong>{STUDENT.name}</strong> for <em>{STUDENT.subject}</em> at {STUDENT.college}.
            </p>
            <p className="leading-relaxed text-forest/75 dark:text-white/70">
              The collection moves between India-focused research, compliance material, green-building analysis and approaches to recovering value from discarded electronics.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onNavSubmissions}
                className={`${primary} !px-6 !py-3`}
              >
                Browse the Index <ArrowRight size={16} />
              </button>
              <button onClick={onNavAbout} className={ghost}>
                Meet the Student
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
            <FeatureCard
              emoji="📊"
              title="Regional E-Waste Study"
              desc="Karnataka company research, tracking workbook and presentation material."
            />
            <FeatureCard
              emoji="🔬"
              title="Materials Recovery"
              desc="A three-part exploration of hydrometallurgical processes and process modifications."
            />
            <FeatureCard
              emoji="🏢"
              title="Greener Buildings"
              desc="LEED characteristics and scoring material focused on Indian green buildings."
            />
            <FeatureCard
              emoji="🌍"
              title="Policy in Context"
              desc="E-waste rules and compliance viewed across Indian and European material."
            />
          </div>
        </div>
      </section>

      {/* ── CTA Band ────────────────────────────────────────────── */}
      <section className="border-t border-forest/10 dark:border-white/10 bg-gradient-to-r from-forest via-pine to-forest py-16 px-4 text-center text-white relative overflow-hidden">
        <Cpu
          className="spin-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-emerald/10"
          strokeWidth={0.75}
        />
        <div className="relative mx-auto max-w-2xl space-y-4">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-emerald/20 border border-emerald/30 text-emerald mb-2">
            <Leaf size={24} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Explore All {totalSubmissions} Portfolio Entries
          </h2>
          <p className="text-white/75 text-sm md:text-base leading-relaxed">
            Download original documents, view spreadsheets, inspect presentation slides, or review case studies directly in your browser.
          </p>
          <div className="pt-3">
            <button
              onClick={onNavSubmissions}
              className={`${primary} !px-8 !py-3.5 !text-base font-semibold shadow-lg shadow-emerald/30`}
            >
              Open the Portfolio Index <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function PortfolioSnapshot() {
  const topics = [
    { number: '01', title: 'Regional systems', detail: 'Karnataka research and tracking', icon: FileCheck2 },
    { number: '02', title: 'Recovery methods', detail: 'Hydrometallurgy and process work', icon: Cpu },
    { number: '03', title: 'Policy & impact', detail: 'Rules, buildings and emissions', icon: BookOpen },
  ]

  return (
    <aside className="w-full max-w-[400px] rotate-1 rounded-[2rem] border border-white/20 bg-white p-6 text-forest shadow-2xl shadow-black/20 sm:p-8">
      <div className="flex items-center justify-between border-b border-forest/10 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest/50">Fieldbook / 2026–27</span>
        <span className="rounded-full bg-emerald/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald">Course file</span>
      </div>
      <div className="py-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Circuit Atlas · TE CMPN B</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight">The afterlife<br />of electronics.</h2>
        <p className="mt-3 text-sm leading-relaxed text-forest/65">A map of the questions, systems and recovery ideas explored in this coursework.</p>
      </div>
      <div className="space-y-2">
        {topics.map(({ number, title, detail, icon: Icon }) => (
          <div key={number} className="flex items-center gap-3 rounded-2xl bg-beige p-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-white text-emerald shadow-sm">
              <Icon size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-forest/40">{number}</span>
                <p className="text-sm font-bold">{title}</p>
              </div>
              <p className="mt-0.5 text-xs text-forest/55">{detail}</p>
            </div>
            <ArrowRight size={15} className="text-forest/35" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-forest/10 pt-4 text-xs text-forest/50">
        <span>Shreyank Parab</span>
        <span>24102B0044</span>
      </div>
    </aside>
  )
}

/* ── Statistics Card ─────────────────────────────────────────────── */

interface StatCardProps {
  icon: any
  count: number
  label: string
  sub: string
  accent: string
  badgeBg: string
  numberColor: string
}

function StatCard({ icon: Icon, count, label, sub, accent, badgeBg, numberColor }: StatCardProps) {
  return (
    <div
      className={`group rounded-3xl bg-white dark:bg-dark-card border border-forest/10 dark:border-dark-border p-5 md:p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${accent}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-2xl ${badgeBg} transition-transform group-hover:scale-110 duration-200`}
        >
          <Icon size={22} />
        </span>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-forest/5 dark:bg-white/5 text-forest/60 dark:text-white/50">
          Indexed
        </span>
      </div>
      <p className={`font-display text-3xl md:text-4xl font-bold leading-none ${numberColor}`}>
        {count}
      </p>
      <h3 className="mt-2 text-sm md:text-base font-bold text-forest dark:text-white">
        {label}
      </h3>
      <p className="mt-1 text-xs text-forest/55 dark:text-white/45 leading-relaxed line-clamp-1">
        {sub}
      </p>
    </div>
  )
}

function FeatureCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-forest/10 dark:border-dark-border bg-white dark:bg-dark-card p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <span className="text-3xl block mb-2">{emoji}</span>
      <h3 className="font-display text-base font-bold text-forest dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs text-forest/65 dark:text-white/60 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}
