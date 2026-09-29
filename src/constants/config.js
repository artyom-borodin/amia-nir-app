const RAW_API_ROOT = import.meta.env.VITE_API_URL || ''
export const TRAILING_SLASH_RE = /\/+$/
export const STORAGE_PREFIX = 'nir_'

export const API_ROOT = RAW_API_ROOT.replace(TRAILING_SLASH_RE, '')
export const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api'
export const API_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS) || 20000
export const AUTH_HEADER_NAME = import.meta.env.VITE_AUTH_HEADER || 'X-Authorization'

export const APP_BASE_URL = import.meta.env.BASE_URL || '/'
export const APP_LOCALE = 'ru'
export const IS_DEV = Boolean(import.meta.env.DEV)

export function validateEnv() {
  const missing = []
  if (!import.meta.env.VITE_API_URL) missing.push('VITE_API_URL')
  if (missing.length && IS_DEV) {
    console.error('[config] missing env: ' + missing.join(', ') + '. Using relative ' + API_PREFIX)
  }
  return missing
}

validateEnv()
