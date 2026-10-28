import { useState } from 'react'
import {
  Download,
  ExternalLink,
  FileText,
  FileSpreadsheet,
  Presentation,
  Globe,
  X,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import Modal from './Modal'
import { kind, getFileUrl, downloadFile, fmtSize } from './lib'
import type { FileAttachment } from './lib'
import { ghost, primary } from './styles'

interface PreviewProps {
  f: FileAttachment
  onClose: () => void
}

export default function Preview({ f, onClose }: PreviewProps) {
  const k = kind(f.name)
  const fileUrl = getFileUrl(f)
  const [onlineViewerActive, setOnlineViewerActive] = useState(false)

  // Determine if running on localhost or deployed
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local'))

  const publicAbsoluteUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${fileUrl}` : ''

  // Google Docs Viewer supports DOCX, XLSX, PPTX when publicly hosted
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    publicAbsoluteUrl
  )}&embedded=true`

  const msOfficeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
    publicAbsoluteUrl
  )}`

  return (
    <Modal title={f.name} onClose={onClose} wide>
      <div className="p-4 md:p-6 space-y-4">
        {/* ── 1. Image Preview ─────────────────────────────────── */}
        {k === 'image' && (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-forest/5 dark:bg-black/50 p-4 border border-forest/10 dark:border-dark-border min-h-[300px]">
            <img
              src={fileUrl}
              alt={f.name}
              className="max-h-[68vh] w-auto rounded-xl object-contain shadow-lg"
              onError={(e) => {
                ;(e.target as HTMLImageElement).alt =
                  'Image preview could not be loaded.'
              }}
            />
          </div>
        )}

        {/* ── 2. PDF In-Page Preview ──────────────────────────── */}
        {k === 'pdf' && (
          <div className="overflow-hidden rounded-2xl border border-forest/10 dark:border-dark-border shadow-sm bg-white dark:bg-dark-muted">
            <iframe
              src={fileUrl}
              title={f.name}
              className="h-[70vh] w-full rounded-2xl border-0"
            />
          </div>
        )}

        {/* ── 3. Office Documents (DOCX, XLSX, PPTX) ──────────── */}
        {k === 'office' && (
          <div className="space-y-4">
            {!isLocalhost && onlineViewerActive ? (
              // Embedded Google Docs Viewer when deployed
              <div className="overflow-hidden rounded-2xl border border-forest/10 dark:border-dark-border shadow-sm bg-white">
                <iframe
                  src={googleViewerUrl}
                  title={`Online Preview: ${f.name}`}
                  className="h-[68vh] w-full rounded-2xl border-0"
                />
              </div>
            ) : (
              // Office document informative card with actions
              <div className="flex flex-col items-center justify-center rounded-3xl bg-forest/5 dark:bg-dark-muted/60 text-center px-6 py-12 border border-forest/10 dark:border-white/10">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald/15 text-emerald mb-4 shadow-sm">
                  {f.name.endsWith('.xlsx') || f.name.endsWith('.xls') ? (
                    <FileSpreadsheet size={34} />
                  ) : f.name.endsWith('.pptx') || f.name.endsWith('.ppt') ? (
                    <Presentation size={34} />
                  ) : (
                    <FileText size={34} />
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-forest dark:text-white max-w-lg truncate">
                  {f.name}
                </h3>
                <p className="mt-1 text-xs text-forest/60 dark:text-white/45 font-mono">
                  {fmtSize(f.size)} · Microsoft {f.type.toUpperCase()} Document
                </p>

                <p className="mt-4 text-sm text-forest/75 dark:text-white/65 max-w-md leading-relaxed">
                  Web browsers do not render Office documents directly in-page.
                  {!isLocalhost ? (
                    <> You can launch the online viewer below or download the original file.</>
                  ) : (
                    <>
                      {' '}Once deployed to Vercel, online Google Docs/Office viewing will be available. In local mode, please download the file to inspect.
                    </>
                  )}
                </p>

                {/* Online viewer options if deployed */}
                {!isLocalhost && (
                  <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
                    <button
                      onClick={() => setOnlineViewerActive(true)}
                      className={`${ghost} !py-2 !px-4 !text-xs font-semibold`}
                    >
                      <Eye size={14} /> In-Page Online Preview
                    </button>
                    <a
                      href={googleViewerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`${ghost} !py-2 !px-4 !text-xs font-semibold`}
                    >
                      <Globe size={14} /> Open in Google Docs Viewer
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── 4. Other File Types ─────────────────────────────── */}
        {k === 'other' && (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-forest/5 dark:bg-dark-muted/60 text-center px-6 py-12 border border-forest/10 dark:border-dark-border">
            <FileText size={36} className="text-emerald mb-3" />
            <p className="text-sm font-semibold text-forest dark:text-white">{f.name}</p>
            <p className="mt-1 text-xs text-forest/60 dark:text-white/40">{fmtSize(f.size)}</p>
          </div>
        )}

        {/* ── Modal Action Footer ─────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-forest/10 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs text-forest/60 dark:text-white/45 font-mono">
            <span>Size: {fmtSize(f.size)}</span>
            <span>·</span>
            <span className="uppercase">{f.type}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in new tab (safe for PDF and image) */}
            {(k === 'pdf' || k === 'image') && (
              <a
                className={`${ghost} !py-1.5 !px-3 !text-xs font-medium`}
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={14} /> Open in Browser Tab
              </a>
            )}

            {/* If office on public host */}
            {k === 'office' && !isLocalhost && (
              <a
                className={`${ghost} !py-1.5 !px-3 !text-xs font-medium`}
                href={msOfficeViewerUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={14} /> Office Online
              </a>
            )}

            {/* Separate Download button */}
            <button
              className={`${primary} !py-1.5 !px-3.5 !text-xs font-semibold`}
              onClick={() => downloadFile(f)}
            >
              <Download size={14} /> Download File
            </button>

            {/* Close button */}
            <button
              className={`${ghost} !py-1.5 !px-3 !text-xs`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
