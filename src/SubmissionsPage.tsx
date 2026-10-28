import { useState, useMemo } from 'react'
import {
  Search,
  Calendar,
  Paperclip,
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Download,
  ExternalLink,
  Eye,
  ArrowLeft,
  Link2,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Package,
  Layers,
  Sparkles,
  Tag,
  Globe,
} from 'lucide-react'
import type { Assignment, FileAttachment } from './lib'
import { CATEGORIES, downloadFile, downloadAllFiles, fmtSize, fmtDate, getFileUrl, kind } from './lib'
import { primary, ghost, card, input } from './styles'
import Preview from './Preview'

interface SubmissionsPageProps {
  items: Assignment[]
  onFlash: (message: string) => void
}

type ViewMode = 'list' | 'detail'

export default function SubmissionsPage({ items, onFlash }: SubmissionsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [previewFile, setPreviewFile] = useState<FileAttachment | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState<'All' | 'ISA' | 'ESE' | 'Extras'>('All')
  const [sortAsc, setSortAsc] = useState(true)
  const [downloadingZipId, setDownloadingZipId] = useState<string | null>(null)

  const currentAssignment = items.find((a) => a.id === selectedId)

  // Filter and sort assignments
  const filteredList = useMemo(() => {
    return items
      .filter((a) => {
        const matchesCat = selectedCat === 'All' || a.category === selectedCat
        const q = searchQuery.toLowerCase().trim()
        if (!q) return matchesCat

        const inTitle = a.title.toLowerCase().includes(q)
        const inDesc = a.description.toLowerCase().includes(q)
        const inTags = a.tags.some((t) => t.toLowerCase().includes(q))
        const inFiles = a.files.some((f) => f.name.toLowerCase().includes(q))

        return matchesCat && (inTitle || inDesc || inTags || inFiles)
      })
      .sort((a, b) => (sortAsc ? a.number - b.number : b.number - a.number))
  }, [items, searchQuery, selectedCat, sortAsc])

  const openDetail = (a: Assignment) => {
    setSelectedId(a.id)
    setViewMode('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToList = () => {
    setViewMode('list')
    setSelectedId(null)
  }

  // Handle Download All as ZIP
  const handleDownloadAll = async (a: Assignment) => {
    setDownloadingZipId(a.id)
    await downloadAllFiles(a, onFlash)
    setDownloadingZipId(null)
  }

  // Category badge styling
  const getCatBadge = (cat: string) => {
    switch (cat) {
      case 'ISA':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800'
      case 'ESE':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800'
      case 'Extras':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      default:
        return 'bg-forest/10 text-forest dark:bg-white/10 dark:text-white'
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      {/* ── LIST VIEW ────────────────────────────────────────────── */}
      {viewMode === 'list' && (
        <div className="rise space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-forest/10 dark:border-white/10 pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 dark:bg-emerald/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald">
                <Sparkles size={13} /> Portfolio Index
              </span>
              <h1 className="mt-2 font-display text-3xl font-bold text-forest dark:text-white md:text-4xl">
                Coursework &amp; Resources
              </h1>
              <p className="mt-1 text-sm text-forest/65 dark:text-white/60">
                Search the collection, open a record for details, or preview and download its files.
              </p>
            </div>

            {/* Quick summary pill */}
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-dark-card border border-forest/10 dark:border-dark-border px-4 py-2 text-xs font-medium text-forest/70 dark:text-white/70 shadow-sm">
              <Layers size={15} className="text-emerald" />
              <span>
                Showing <strong>{filteredList.length}</strong> of <strong>{items.length}</strong> entries
              </span>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-3.5 text-forest/40 dark:text-white/30 pointer-events-none"
              />
              <input
                className={`${input} pl-10`}
                placeholder="Search titles, topics, tags or file names…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 flex-wrap">
              {(['All', ...CATEGORIES] as const).map((cat) => {
                const count =
                  cat === 'All'
                    ? items.length
                    : items.filter((a) => a.category === cat).length

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                      selectedCat === cat
                        ? 'bg-forest dark:bg-emerald text-white dark:text-forest'
                        : 'border border-forest/15 dark:border-white/15 bg-white dark:bg-dark-card text-forest/80 dark:text-white/80 hover:bg-sand/60 dark:hover:bg-dark-muted'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                        selectedCat === cat
                          ? 'bg-white/20 text-white dark:bg-forest/20 dark:text-forest'
                          : 'bg-forest/10 dark:bg-white/10 text-forest/60 dark:text-white/60'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Sort Toggle */}
            <button
              className={`${ghost} !text-xs whitespace-nowrap`}
              onClick={() => setSortAsc(!sortAsc)}
              title="Toggle sorting order"
            >
              {sortAsc ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span>Entry # {sortAsc ? `1 → ${items.length}` : `${items.length} → 1`}</span>
            </button>
          </div>

          {/* Cards Grid */}
          {filteredList.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filteredList.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  a={assignment}
                  catBadge={getCatBadge(assignment.category)}
                  onOpen={() => openDetail(assignment)}
                  onPreview={(f) => setPreviewFile(f)}
                  onDownload={(f) => downloadFile(f)}
                  onDownloadAll={() => handleDownloadAll(assignment)}
                  isZipping={downloadingZipId === assignment.id}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-forest/15 dark:border-white/10 bg-white/40 dark:bg-dark-card/40 py-20 text-center">
              <Search className="mx-auto text-forest/30 dark:text-white/25" size={40} />
              <h3 className="mt-4 font-display text-xl font-bold text-forest dark:text-white">
                No matching submissions found
              </h3>
              <p className="mt-1 text-sm text-forest/60 dark:text-white/50">
                Try clearing your search query or choosing another category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCat('All')
                }}
                className={`${ghost} mt-5`}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── DETAIL VIEW ─────────────────────────────────────────── */}
      {viewMode === 'detail' && currentAssignment && (
        <div className="rise mx-auto max-w-4xl space-y-6">
          {/* Back button */}
          <button
            onClick={backToList}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:underline underline-offset-4 group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Portfolio Index
          </button>

          {/* Main Assignment Banner Card */}
          <article className={`${card} overflow-hidden shadow-lg`}>
            {/* Header banner */}
            <div className="bg-gradient-to-br from-forest via-pine to-forest p-6 md:p-8 text-white relative">
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
                <span className="rounded-full bg-emerald text-forest px-3 py-1 font-bold">
                  No. {currentAssignment.number}
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-semibold border ${getCatBadge(
                    currentAssignment.category
                  )}`}
                >
                  {currentAssignment.category}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-white/90">
                  <CheckCircle2 size={13} className="text-emerald" /> Submitted
                </span>
                {currentAssignment.date && (
                  <span className="flex items-center gap-1 text-white/70 ml-auto">
                    <Calendar size={13} /> {fmtDate(currentAssignment.date)}
                  </span>
                )}
              </div>

              <h1 className="mt-4 font-display text-2xl md:text-3xl font-bold leading-snug">
                {currentAssignment.title}
              </h1>
            </div>

            {/* Description Body */}
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-forest/40 dark:text-white/40 mb-2">
                  Entry Notes
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-forest/85 dark:text-white/80">
                  {currentAssignment.description}
                </p>
              </div>

              {/* Tags */}
              {currentAssignment.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <Tag size={14} className="text-emerald flex-shrink-0" />
                  {currentAssignment.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-forest/5 dark:bg-white/5 border border-forest/10 dark:border-white/10 px-2.5 py-0.5 text-xs text-forest/70 dark:text-white/60"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Deliverables Breakdown Section */}
          <section className={`${card} p-6 md:p-8 shadow-sm space-y-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-forest dark:text-white">
                  Deliverables Breakdown
                </h2>
                <p className="text-xs text-forest/55 dark:text-white/45 mt-0.5">
                  All components and requirements submitted under this assignment.
                </p>
              </div>
              <span className="rounded-full bg-emerald/15 px-3 py-1 text-xs font-bold text-emerald">
                {currentAssignment.deliverables.length} Deliverable{currentAssignment.deliverables.length === 1 ? '' : 's'}
              </span>
            </div>

            <ul className="space-y-2.5 pt-2">
              {currentAssignment.deliverables.map((deliv, idx) => (
                <li
                  key={deliv.id}
                  className="flex items-start gap-3 rounded-2xl border border-forest/8 dark:border-dark-border bg-beige/40 dark:bg-dark-muted/40 p-3.5"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald text-forest text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-forest dark:text-white">
                      {deliv.label}
                    </p>
                    {deliv.fileName && (
                      <p className="text-xs text-forest/55 dark:text-white/45 font-mono truncate mt-0.5">
                        📎 {deliv.fileName}
                      </p>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald bg-emerald/10 dark:bg-emerald/20 px-2.5 py-1 rounded-full flex-shrink-0">
                    <CheckCircle2 size={13} /> Completed
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Attached Files Section with View / Open in Tab / Download / Download All */}
          <section className={`${card} p-6 md:p-8 shadow-sm space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest/8 dark:border-white/10 pb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-forest dark:text-white">
                  Attached Files ({currentAssignment.files.length})
                </h2>
                <p className="text-xs text-forest/55 dark:text-white/45 mt-0.5">
                  Inspect deliverables inline or download the exact files.
                </p>
              </div>

              {currentAssignment.files.length > 1 && (
                <button
                  onClick={() => handleDownloadAll(currentAssignment)}
                  disabled={downloadingZipId === currentAssignment.id}
                  className={`${primary} !py-2 !px-4 text-xs font-semibold`}
                >
                  <Package size={15} />
                  {downloadingZipId === currentAssignment.id
                    ? 'Packaging ZIP…'
                    : 'Download All Files (ZIP)'}
                </button>
              )}
            </div>

            <ul className="space-y-3 pt-2">
              {currentAssignment.files.map((file) => {
                const k = kind(file.name)
                const fileUrl = getFileUrl(file)

                return (
                  <li
                    key={file.path}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-forest/10 dark:border-dark-border bg-white dark:bg-dark-card p-4 shadow-sm hover:border-emerald/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileIcon type={file.type} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-forest dark:text-white truncate">
                          {file.label || file.name}
                        </p>
                        <p className="text-xs text-forest/50 dark:text-white/40 font-mono truncate">
                          {file.name} · {fmtSize(file.size)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                      {/* Preview Button (In-Modal Viewer) */}
                      <button
                        className={`${ghost} !py-1.5 !px-3 !text-xs`}
                        onClick={() => setPreviewFile(file)}
                        title={
                          k === 'pdf'
                            ? 'Preview PDF in-page'
                            : k === 'image'
                            ? 'Preview image'
                            : 'View file info & online preview options'
                        }
                      >
                        <Eye size={13} /> {k === 'office' ? 'Online Preview' : 'Preview'}
                      </button>

                      {/* Open in Tab (Only for PDF and Image where browser natively renders without downloading) */}
                      {(k === 'pdf' || k === 'image') && (
                        <a
                          className={`${ghost} !py-1.5 !px-3 !text-xs`}
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Open directly in a new browser tab"
                        >
                          <ExternalLink size={13} /> Open Tab
                        </a>
                      )}

                      {/* Explicit Download Button */}
                      <button
                        className={`${primary} !py-1.5 !px-3.5 !text-xs font-semibold`}
                        onClick={() => downloadFile(file)}
                        title="Download original file"
                      >
                        <Download size={13} /> Download
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* External Links Section */}
          {currentAssignment.links.length > 0 && (
            <section className={`${card} p-6 md:p-8 shadow-sm space-y-4`}>
              <h2 className="font-display text-xl font-bold text-forest dark:text-white">
                External References &amp; Online Portals
              </h2>
              <ul className="space-y-2.5">
                {currentAssignment.links.map((link, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-forest/10 dark:border-dark-border bg-beige/40 dark:bg-dark-muted/40 p-4"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Link2 size={18} className="text-emerald flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-forest dark:text-white">
                          {link.label}
                        </p>
                        <p className="text-xs text-forest/50 dark:text-white/40 font-mono truncate">
                          {link.url}
                        </p>
                      </div>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`${primary} !py-1.5 !px-3.5 !text-xs font-semibold flex-shrink-0 flex items-center gap-1.5`}
                    >
                      <ExternalLink size={13} /> Open Link
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <Preview f={previewFile} onClose={() => setPreviewFile(null)} />
      )}
    </div>
  )
}

/* ── Original Creative Assignment Card ───────────────────────────── */

interface AssignmentCardProps {
  a: Assignment
  catBadge: string
  onOpen: () => void
  onPreview: (f: FileAttachment) => void
  onDownload: (f: FileAttachment) => void
  onDownloadAll: () => void
  isZipping: boolean
}

function AssignmentCard({
  a,
  catBadge,
  onOpen,
  onPreview,
  onDownload,
  onDownloadAll,
  isZipping,
}: AssignmentCardProps) {
  // Format deliverable summary: e.g. "2 files" or "1 file + 1 link"
  const fileCount = a.files.length
  const linkCount = a.links.length
  const deliverableSummary =
    fileCount > 0 && linkCount > 0
      ? `${fileCount} file${fileCount > 1 ? 's' : ''} + ${linkCount} link${linkCount > 1 ? 's' : ''}`
      : fileCount > 0
      ? `${fileCount} file${fileCount > 1 ? 's' : ''}`
      : `${linkCount} link${linkCount > 1 ? 's' : ''}`

  return (
    <div className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-dark-card border border-forest/10 dark:border-dark-border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Top sequence + category bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="rounded-full bg-forest dark:bg-emerald text-white dark:text-forest px-3 py-0.5 text-xs font-bold shadow-sm">
            No. {a.number}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${catBadge}`}
            >
              {a.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 dark:bg-emerald/20 text-emerald text-[11px] px-2 py-0.5 font-medium">
              <CheckCircle2 size={11} /> Submitted
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={onOpen}
          className="font-display text-lg font-bold text-forest dark:text-white leading-snug cursor-pointer group-hover:text-emerald transition-colors"
        >
          {a.title}
        </h3>

        {/* Complete description directly on card - NO TRUNCATION, NO READ MORE */}
        <p className="mt-3 text-xs md:text-sm text-forest/75 dark:text-white/70 leading-relaxed">
          {a.description}
        </p>

        {/* Deliverables summary chip */}
        <div className="mt-4 flex items-center justify-between text-xs border-t border-forest/8 dark:border-white/5 pt-3">
          <span className="inline-flex items-center gap-1.5 text-forest/60 dark:text-white/50 font-medium">
            <Paperclip size={13} className="text-emerald" />
            <span>{deliverableSummary}</span>
          </span>
          {a.date && (
            <span className="flex items-center gap-1 text-forest/50 dark:text-white/40">
              <Calendar size={12} />
              <span>{fmtDate(a.date)}</span>
            </span>
          )}
        </div>

        {/* Associated deliverables chip list */}
        {a.deliverables.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {a.deliverables.map((d) => (
              <span
                key={d.id}
                className="inline-flex items-center gap-1 rounded-lg bg-beige dark:bg-dark-muted px-2 py-0.5 text-[11px] font-medium text-forest/70 dark:text-white/60 truncate max-w-[13rem]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald flex-shrink-0" />
                <span className="truncate">{d.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-forest/8 dark:border-white/5 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={onOpen}
          className="text-xs font-semibold text-emerald hover:underline underline-offset-4 flex items-center gap-1"
        >
          View Details &amp; Files →
        </button>

        <div className="flex items-center gap-1.5">
          {a.files.length === 1 ? (
            <>
              <button
                onClick={() => onPreview(a.files[0])}
                className={`${ghost} !py-1 !px-2.5 !text-xs`}
                title={kind(a.files[0].name) === 'office' ? 'Preview details & online options' : 'Preview file'}
              >
                <Eye size={13} />
              </button>
              <button
                onClick={() => onDownload(a.files[0])}
                className={`${primary} !py-1 !px-2.5 !text-xs font-semibold`}
                title="Download original file"
              >
                <Download size={13} />
              </button>
            </>
          ) : a.files.length > 1 ? (
            <button
              onClick={onDownloadAll}
              disabled={isZipping}
              className={`${primary} !py-1 !px-3 !text-xs font-semibold flex items-center gap-1`}
              title="Download all files in this assignment as a ZIP"
            >
              <Package size={13} />
              <span>{isZipping ? 'Zipping…' : 'Download All'}</span>
            </button>
          ) : a.links.length > 0 ? (
            <a
              href={a.links[0].url}
              target="_blank"
              rel="noreferrer"
              className={`${primary} !py-1 !px-3 !text-xs font-semibold flex items-center gap-1`}
            >
              <ExternalLink size={13} />
              <span>Link</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* ── File Icon Sub-component ─────────────────────────────────────── */
function FileIcon({ type }: { type: string }) {
  switch (type) {
    case 'pdf':
      return (
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex-shrink-0">
          <FileText size={20} />
        </span>
      )
    case 'xlsx':
      return (
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 flex-shrink-0">
          <FileSpreadsheet size={20} />
        </span>
      )
    case 'pptx':
      return (
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex-shrink-0">
          <Presentation size={20} />
        </span>
      )
    case 'image':
      return (
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex-shrink-0">
          <ImageIcon size={20} />
        </span>
      )
    default:
      return (
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/15 text-emerald flex-shrink-0">
          <FileText size={20} />
        </span>
      )
  }
}
