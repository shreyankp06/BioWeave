import JSZip from 'jszip'
import type { Assignment, FileAttachment } from './data/assignments'

export type { Assignment, FileAttachment, DeliverableDetail, ExternalLink } from './data/assignments'
export { ASSIGNMENTS } from './data/assignments'

export const CATEGORIES = ['ISA', 'ESE', 'Extras'] as const
export type Category = (typeof CATEGORIES)[number]

/**
 * Get file extension (lowercase without dot)
 */
export const ext = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}

/**
 * Determine the preview / display category of a file
 */
export const kind = (filename: string): 'pdf' | 'image' | 'office' | 'other' => {
  const e = ext(filename)
  if (e === 'pdf') return 'pdf'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(e)) return 'image'
  if (['docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt'].includes(e)) return 'office'
  return 'other'
}

/**
 * Format bytes into readable KB / MB
 */
export const fmtSize = (bytes: number): string => {
  if (!bytes || bytes <= 0) return '0 KB'
  if (bytes > 1_048_576) {
    return (bytes / 1_048_576).toFixed(1) + ' MB'
  }
  return Math.max(1, Math.round(bytes / 1024)) + ' KB'
}

/**
 * Format date into Indian/UK format (e.g. 18 Aug 2026)
 */
export const fmtDate = (d: string): string => {
  if (!d) return ''
  try {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return d
  }
}

/**
 * Safe encoded URL for static files (handles spaces, parentheses, etc.)
 */
export const getFileUrl = (f: FileAttachment | { path: string }): string => {
  // Split path into segments and encode each to preserve slashes
  return f.path
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')
}

/**
 * Trigger direct download of a single file
 */
export const downloadFile = (f: FileAttachment): void => {
  const url = getFileUrl(f)
  const a = document.createElement('a')
  a.href = url
  a.download = f.name
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Download all files of an assignment as a single ZIP using JSZip,
 * with fallback to sequential individual downloads if needed.
 */
export const downloadAllFiles = async (
  assignment: Assignment,
  onStatus?: (msg: string) => void
): Promise<void> => {
  if (!assignment.files.length) {
    onStatus?.('No files to download.')
    return
  }

  // If only 1 file, download directly without zipping
  if (assignment.files.length === 1) {
    downloadFile(assignment.files[0])
    onStatus?.(`Downloaded ${assignment.files[0].name}`)
    return
  }

  onStatus?.('Preparing ZIP archive…')

  try {
    const zip = new JSZip()
    let successCount = 0

    // Fetch and add each file to zip
    for (const file of assignment.files) {
      try {
        const fileUrl = getFileUrl(file)
        const res = await fetch(fileUrl)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const blob = await res.blob()
        zip.file(file.name, blob)
        successCount++
      } catch (err) {
        console.warn(`Could not add ${file.name} to zip:`, err)
      }
    }

    if (successCount === 0) {
      // Fallback: trigger individual downloads
      onStatus?.('ZIP creation failed; starting individual downloads…')
      assignment.files.forEach((f, i) => {
        setTimeout(() => downloadFile(f), i * 350)
      })
      return
    }

    onStatus?.('Compressing files…')
    const zipBlob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    })

    const url = URL.createObjectURL(zipBlob)
    const safeTitle = assignment.title
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 40)
    const zipName = `CircuitAtlas_${assignment.category}_No${assignment.number}_${safeTitle}.zip`

    const a = document.createElement('a')
    a.href = url
    a.download = zipName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    onStatus?.(`Downloaded ${zipName} (${successCount} files)`)
  } catch (err: any) {
    console.error('ZIP generation error:', err)
    onStatus?.('Falling back to individual file downloads…')
    assignment.files.forEach((f, i) => {
      setTimeout(() => downloadFile(f), i * 350)
    })
  }
}
