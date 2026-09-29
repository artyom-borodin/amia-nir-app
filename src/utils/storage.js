import { STORAGE_FLAG_TRUE, STORAGE_FLAG_FALSE } from '../constants/api.js'
import { SIDEBAR_MIN_WIDTH } from '../constants/ui.js'

export const SIDEBAR_COLLAPSED_ON = STORAGE_FLAG_TRUE
export const SIDEBAR_COLLAPSED_OFF = STORAGE_FLAG_FALSE

export function readStorage(key, fallback = '') {
  return localStorage.getItem(key) ?? fallback
}

export function writeStorage(key, value) {
  localStorage.setItem(key, value)
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}

export function getCollapsedFlag(key) {
  return localStorage.getItem(key) === SIDEBAR_COLLAPSED_ON
}

export function setCollapsedFlag(key, collapsed) {
  localStorage.setItem(key, collapsed ? SIDEBAR_COLLAPSED_ON : SIDEBAR_COLLAPSED_OFF)
}

export function getWidthValue(key) {
  return Number(localStorage.getItem(key)) || SIDEBAR_MIN_WIDTH
}

export function getUsername(key) {
  return localStorage.getItem(key) || ''
}

export function setUsername(key, username) {
  localStorage.setItem(key, username)
}

export function clearUsername(key) {
  localStorage.removeItem(key)
}
