import { User, BookOpen, GraduationCap, Building2, Calendar, Layers, Pencil } from 'lucide-react'
import { STUDENT, COURSE_OVERVIEW } from './config'

export default function AboutPage() {
  return (
    <div className="rise mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16 space-y-8">
      {/* Page header */}
      <div className="text-center">
        <span className="mb-3 inline-block rounded-full bg-emerald/10 dark:bg-emerald/15 px-3 py-1 text-xs font-medium text-emerald">
          Student details
        </span>
        <h1 className="font-display text-4xl font-bold text-forest dark:text-white">
          Student Profile
        </h1>
        <p className="mt-2 text-forest/60 dark:text-white/50">
          Course context and portfolio author
        </p>
      </div>

      {/* Student profile card */}
      <div className="rounded-3xl border border-forest/8 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm overflow-hidden">
        {/* Card header band */}
        <div className="relative bg-hero-gradient px-6 py-10 text-white overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald/15 blur-2xl" />
          <div className="relative flex items-center gap-5">
            <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 text-4xl shadow-lg">
              🎓
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{STUDENT.name}</h2>
              <p className="mt-1 text-white/70">Roll No. {STUDENT.rollNo}</p>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="p-6">
          <h3 className="mb-4 font-display text-lg font-bold text-forest dark:text-white flex items-center gap-2">
            <User size={18} className="text-emerald" /> Profile
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow icon={GraduationCap}  label="Class"        value={STUDENT.class} />
            <InfoRow icon={Building2}      label="College"      value={STUDENT.college} />
            <InfoRow icon={Calendar}       label="Semester"     value={`${STUDENT.semester}, AY ${STUDENT.academicYear}`} />
            <InfoRow icon={BookOpen}       label="Subject"      value={STUDENT.subject} />
            <InfoRow icon={Layers}         label="Roll No."     value={STUDENT.rollNo} />
            <InfoRow icon={Pencil}         label="Faculty"      value={STUDENT.faculty} />
          </div>
        </div>
      </div>

      {/* Course overview card */}
      <div className="rounded-3xl border border-forest/8 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="mb-1 font-display text-xl font-bold text-forest dark:text-white flex items-center gap-2">
            <BookOpen size={20} className="text-emerald" /> About the Subject
          </h3>
          <p className="mb-5 text-sm text-forest/50 dark:text-white/40">{STUDENT.subject}</p>

          <div className="prose-sm max-w-none">
            {COURSE_OVERVIEW.split('\n\n').map((para, i) => {
              if (para.startsWith('•') || para.includes('\n•')) {
                // It's a bullet list block
                const lines = para.split('\n').filter(Boolean)
                return (
                  <ul key={i} className="mt-3 space-y-1.5 list-none pl-0">
                    {lines.map((line, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-forest/70 dark:text-white/60">
                        <span className="mt-0.5 flex-shrink-0 text-emerald">▸</span>
                        <span>{line.replace(/^•\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                )
              }
              return (
                <p key={i} className="mt-3 text-sm leading-relaxed text-forest/70 dark:text-white/60">
                  {para}
                </p>
              )
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="border-t border-forest/8 dark:border-dark-border px-6 py-4 flex flex-wrap gap-2">
          {['E-Waste', 'Circular Economy', 'EPR', 'Recycling', 'Sustainability', 'Environmental Policy', 'Green Design'].map((tag) => (
            <span key={tag} className="rounded-full bg-emerald/10 dark:bg-emerald/15 px-3 py-1 text-xs font-medium text-emerald">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-beige/60 dark:bg-dark-muted/60 p-3.5">
      <span className="mt-0.5 flex-shrink-0 grid h-8 w-8 place-items-center rounded-xl bg-emerald/10 dark:bg-emerald/15 text-emerald">
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-forest/40 dark:text-white/35">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-forest dark:text-white break-words">{value}</p>
      </div>
    </div>
  )
}
