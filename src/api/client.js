import axios from 'axios'
import { getAccess, getRefresh, setTokens, clearTokens } from './tokens.js'
import {
  API_BASE_URL,
  API_TIMEOUT_MS,
  API_TOKEN_REFRESH_URL,
  API_AUTH_HEADER,
  API_NO_REFRESH_TEXT,
  HTTP_UNAUTHORIZED,
  HTTP_NO_RESPONSE,
  RETRY_FLAG,
  TOKEN_REFRESH_FIELD,
  buildAuthHeader,
  ensureHeaders,
  parseTokenPair
} from '../constants/api.js'
import { ROUTE_LOGIN } from '../constants/routes.js'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS
})

api.interceptors.request.use((config) => {
  const token = getAccess()
  if (token) {
    ensureHeaders(config)[API_AUTH_HEADER] = buildAuthHeader(token)
  }
  return config
})

let refreshPromise = null

async function doRefresh() {
  if (refreshPromise) return refreshPromise
  const refresh = getRefresh()
  if (!refresh) throw new Error(API_NO_REFRESH_TEXT)
  refreshPromise = axios.post(API_TOKEN_REFRESH_URL, { [TOKEN_REFRESH_FIELD]: refresh }).then((res) => {
    const { access } = parseTokenPair(res.data)
    if (access) setTokens(access, '')
    return access
  }).finally(() => {
    refreshPromise = null
  })
  return refreshPromise
}

function navigateToLogin() {
  if (window.location.pathname !== ROUTE_LOGIN) {
    window.location.href = ROUTE_LOGIN
  }
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config || {}
    const status = err.response?.status ?? HTTP_NO_RESPONSE
    if (status === HTTP_UNAUTHORIZED && !original[RETRY_FLAG]) {
      original[RETRY_FLAG] = true
      try {
        const access = await doRefresh()
        ensureHeaders(original)[API_AUTH_HEADER] = buildAuthHeader(access)
        return api(original)
      } catch (refreshErr) {
        clearTokens()
        navigateToLogin()
        return Promise.reject(err)
      }
    }
    return Promise.reject(err)
  }
)
