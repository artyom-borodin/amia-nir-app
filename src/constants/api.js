import { STORAGE_PREFIX, API_ROOT, API_PREFIX, AUTH_HEADER_NAME } from './config.js'

export { STORAGE_PREFIX }
export { API_ROOT, API_PREFIX }
export { API_TIMEOUT_MS } from './config.js'

export const STORAGE_ACCESS_KEY = STORAGE_PREFIX + 'access'
export const STORAGE_REFRESH_KEY = STORAGE_PREFIX + 'refresh'
export const STORAGE_USERNAME_KEY = STORAGE_PREFIX + 'username'
export const STORAGE_SIDEBAR_WIDTH_KEY = STORAGE_PREFIX + 'sidebar_width'
export const STORAGE_SIDEBAR_COLLAPSED_KEY = STORAGE_PREFIX + 'sidebar_collapsed'

export const STORAGE_FLAG_TRUE = '1'
export const STORAGE_FLAG_FALSE = '0'

export const API_BASE_URL = API_ROOT + API_PREFIX
export const API_TOKEN_URL = API_ROOT + API_PREFIX + '/token/'
export const API_TOKEN_REFRESH_URL = API_ROOT + API_PREFIX + '/token/refresh/'

export const API_REPORT_PREFIX = '/reports/nir/'
export const API_REPORT_EXPORT_SUFFIX = 'export'

export const API_AUTH_SCHEME = 'Bearer'
export const API_AUTH_HEADER = AUTH_HEADER_NAME

export const API_NO_REFRESH_TEXT = 'no refresh token'
export const API_ERROR_UNKNOWN = 'Неизвестная ошибка'
export const API_ERROR_OFFLINE = 'Нет связи с сервером'
export const API_ERROR_BAD_REQUEST = 'Проверьте поля формы'
export function formatStatusError(status) {
  return 'Ошибка ' + status
}
export const API_FIELD_DETAIL = 'detail'
export const API_FIELD_NON_FIELD = 'non_field_errors'
export const API_ERROR_DETAIL_KEYS = [API_FIELD_DETAIL, API_FIELD_NON_FIELD]
export const API_ERROR_DETAIL_KEY = API_FIELD_DETAIL

export const HTTP_NO_RESPONSE = 0
export const HTTP_UNAUTHORIZED = 401
export const HTTP_BAD_REQUEST = 400
export const RETRY_FLAG = '_retry'
export const RESPONSE_TYPE_BLOB = 'blob'

export const PAGINATION_RESULTS_KEY = 'results'
export const PAGINATION_COUNT_KEY = 'count'
export const PAGINATION_LIMIT_KEY = 'limit'
export const PAGINATION_OFFSET_KEY = 'offset'
export const QUERY_LIMIT = 'limit'
export const QUERY_OFFSET = 'offset'
export const QUERY_ORDERING = 'ordering'
export const QUERY_SEARCH = 'search'
export const LOOKUP_SEP = '__'
export const PK_FIELD = 'id'

export const TOKEN_ACCESS_FIELD = 'access'
export const TOKEN_REFRESH_FIELD = 'refresh'
export const AUTH_FIELD_USERNAME = 'username'
export const AUTH_FIELD_PASSWORD = 'password'

export const LOGIN_ERROR_TEXT = 'Ошибка входа'
export const REPORT_FILE_DEFAULT = 'report.xlsx'
export const REPORT_MIME_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export function buildReportFilename(kind) {
  return 'report-' + kind + '.xlsx'
}

export function buildAuthHeader(token) {
  return API_AUTH_SCHEME + ' ' + token
}

export function ensureHeaders(config) {
  config.headers = config.headers || {}
  return config.headers
}

export function isNonEmptyToken(v) {
  return v !== '' && v !== null && v !== undefined
}

export function parseTokenPair(data) {
  return {
    access: data?.[TOKEN_ACCESS_FIELD] ?? '',
    refresh: data?.[TOKEN_REFRESH_FIELD] ?? ''
  }
}

export function baseUrl(endpoint) {
  return '/' + endpoint + '/'
}

export function itemUrl(base, id) {
  return base + encodeURIComponent(id) + '/'
}

export function toStringArray(val) {
  return Array.isArray(val) ? val.map(String) : [String(val)]
}

export function isEmptyValue(v) {
  return v === '' || v === null || v === undefined
}
