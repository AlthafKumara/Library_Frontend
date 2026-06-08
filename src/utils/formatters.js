import { BORROW_STATUSES } from './constants.js'

/**
 * utils/formatters.js — Display formatting functions
 * Pure JavaScript — no React, no Axios.
 */

/**
 * Format an ISO date string to a localized readable format.
 *
 * @param {string} dateStr - ISO date string, e.g. "2026-12-31T00:00:00.000Z"
 * @returns {string} - e.g. "31 Desember 2026"
 *
 * @example
 * formatDate("2026-12-31T00:00:00.000Z") // "31 Desember 2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Truncate a string to a max length, adding ellipsis if cut.
 * Used for book descriptions in BookCard components.
 *
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 *
 * @example
 * truncateText("A very long description...", 50)
 */
export function truncateText(str, maxLength = 100) {
  if (!str || typeof str !== 'string') return ''
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Map a borrow status key to a human-readable label (in Indonesian).
 *
 * @param {string} status - One of the BORROW_STATUSES values
 * @returns {string}
 *
 * @example
 * formatBorrowStatus('overdue') // "Terlambat"
 */
export function formatBorrowStatus(status) {
  const labels = {
    [BORROW_STATUSES.PENDING]: 'Menunggu',
    [BORROW_STATUSES.APPROVED]: 'Disetujui',
    [BORROW_STATUSES.BORROWED]: 'Dipinjam',
    [BORROW_STATUSES.RETURNED]: 'Dikembalikan',
    [BORROW_STATUSES.OVERDUE]: 'Terlambat',
    [BORROW_STATUSES.LOST]: 'Hilang',
  }
  return labels[status] ?? status
}
