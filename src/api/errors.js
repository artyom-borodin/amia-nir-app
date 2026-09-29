import {
  API_ERROR_UNKNOWN,
  API_ERROR_OFFLINE,
  API_ERROR_BAD_REQUEST,
  API_ERROR_DETAIL_KEYS,
  API_ERROR_DETAIL_KEY,
  HTTP_BAD_REQUEST,
  formatStatusError,
  toStringArray
} from '../constants/api.js'

export function parseApiError(err) {
  if (!err) return { message: API_ERROR_UNKNOWN, fields: {} }
  const resp = err.response
  if (!resp) return { message: API_ERROR_OFFLINE, fields: {} }
  const data = resp.data
  if (resp.status === HTTP_BAD_REQUEST && data && typeof data === 'object') {
    const fields = {}
    let general = []
    for (const key of Object.keys(data)) {
      const val = data[key]
      if (API_ERROR_DETAIL_KEYS.includes(key)) {
        general = general.concat(toStringArray(val))
      } else {
        fields[key] = toStringArray(val)
      }
    }
    return {
      message: general.length ? general.join('; ') : API_ERROR_BAD_REQUEST,
      fields
    }
  }
  if (data?.[API_ERROR_DETAIL_KEY]) return { message: String(data[API_ERROR_DETAIL_KEY]), fields: {} }
  return { message: formatStatusError(resp.status), fields: {} }
}
