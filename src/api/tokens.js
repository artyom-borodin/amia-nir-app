import { STORAGE_ACCESS_KEY, STORAGE_REFRESH_KEY, isNonEmptyToken } from '../constants/api.js'
import { readStorage, writeStorage, removeStorage } from '../utils/storage.js'

function readToken(key) {
  return readStorage(key, '')
}

export function getAccess() {
  return readToken(STORAGE_ACCESS_KEY)
}

export function getRefresh() {
  return readToken(STORAGE_REFRESH_KEY)
}

export function setTokens(access, refresh) {
  if (isNonEmptyToken(access)) writeStorage(STORAGE_ACCESS_KEY, access)
  if (isNonEmptyToken(refresh)) writeStorage(STORAGE_REFRESH_KEY, refresh)
}

export function clearTokens() {
  removeStorage(STORAGE_ACCESS_KEY)
  removeStorage(STORAGE_REFRESH_KEY)
}
