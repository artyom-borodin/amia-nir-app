import { ref } from 'vue'
import { MONTH_RE, DATE_RE, MONTH_AS_DATE_RE, DAY_SUFFIX } from '../features/_shared.js'
import { FIELD_TYPE_DATE_MONTH } from '../constants/fieldTypes.js'
import { DATE_MODE_DATE as MODE_DATE, DATE_MODE_MONTH as MODE_MONTH, MONTH_VALUE_LEN } from '../constants/formats.js'

export const DATE_MODE_DATE = MODE_DATE
export const DATE_MODE_MONTH = MODE_MONTH
export const MONTH_STR_LEN = MONTH_VALUE_LEN

export function detectDateMode(value) {
  if (value === '' || value === null || value === undefined) {
    return DATE_MODE_MONTH
  }
  const s = String(value)
  if (MONTH_RE.test(s)) {
    return DATE_MODE_MONTH
  }
  if (DATE_RE.test(s)) {
    if (s.slice(8, 10) === '01') {
      return DATE_MODE_MONTH
    }
    return DATE_MODE_DATE
  }
  return DATE_MODE_MONTH
}

export function useDateMonth(fields) {
  const dateMode = ref({})

  function applyModel(v) {
    const base = { ...(v || {}) }
    const modes = { ...dateMode.value }
    for (const f of fields || []) {
      if (f && f.type === FIELD_TYPE_DATE_MONTH) {
        const val = base[f.prop]
        const m = detectDateMode(val)
        modes[f.prop] = m
        if (m === DATE_MODE_MONTH && typeof val === 'string' && MONTH_AS_DATE_RE.test(val)) {
          base[f.prop] = val.slice(0, MONTH_STR_LEN)
        }
      }
    }
    dateMode.value = modes
    return base
  }

  function onModeChange(localRef, prop, mode) {
    dateMode.value = { ...dateMode.value, [prop]: mode }
    const v = localRef.value[prop]
    if (mode === DATE_MODE_MONTH && typeof v === 'string' && DATE_RE.test(v)) {
      localRef.value = { ...localRef.value, [prop]: v.slice(0, MONTH_STR_LEN) }
      return
    }
    if (mode === DATE_MODE_DATE && typeof v === 'string' && MONTH_RE.test(v)) {
      localRef.value = { ...localRef.value, [prop]: v + DAY_SUFFIX }
    }
  }

  return { dateMode, applyModel, onModeChange }
}
