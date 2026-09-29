import { api } from './client.js'
import {
  API_REPORT_PREFIX,
  API_REPORT_EXPORT_SUFFIX,
  REPORT_FILE_DEFAULT,
  REPORT_MIME_XLSX,
  RESPONSE_TYPE_BLOB
} from '../constants/api.js'
import { UI_BLOB_REVOKE_TIMEOUT_MS } from '../constants/ui.js'

export { REPORT_MIME_XLSX }

export function reportUrl(kind, forExport) {
  const tail = forExport ? API_REPORT_EXPORT_SUFFIX + '/' : ''
  return API_REPORT_PREFIX + kind + '/' + tail
}

export async function getReport(kind, params = {}) {
  const res = await api.get(reportUrl(kind, false), { params })
  return res.data
}

export async function exportReport(kind, params = {}) {
  const res = await api.get(reportUrl(kind, true), {
    params,
    responseType: RESPONSE_TYPE_BLOB
  })
  return res.data
}

export function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || REPORT_FILE_DEFAULT
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => window.URL.revokeObjectURL(url), UI_BLOB_REVOKE_TIMEOUT_MS)
}
