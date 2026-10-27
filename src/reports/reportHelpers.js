import {
  REPORT_ROW_KEYS,
  REPORT_STRATEGY_SOME_ARRAY,
  REPORT_STRATEGY_KEYS_LENGTH,
  REPORT_BY_COURSE_PROP,
  TOTALS_DRILL_KEY,
  TECHNICAL_KEYS,
  TECHNICAL_ID_SUFFIX,
  labelFor,
  mapReportCols
} from '../constants/reports.js'
import { REPORT_KIND_FACULTY } from '../constants/tables.js'
import { formatRowFallback, TEXT_TOTALS } from '../constants/texts.js'
import { KV_JOINER, TITLE_SEPARATOR } from '../constants/formats.js'

export { TOTALS_DRILL_KEY, labelFor }

export function isTechnicalKey(key) {
  if (!key) return true
  if (TECHNICAL_KEYS.includes(key)) return true
  return key.endsWith(TECHNICAL_ID_SUFFIX)
}

export function fallbackRowLabel(idx) {
  return formatRowFallback(idx)
}

export function formatDrillTitle(label, value) {
  return label + KV_JOINER + value
}

export function reportItems(data) {
  return data && Array.isArray(data.items) ? data.items : []
}

export function reportTotals(data) {
  const t = data && data.totals
  if (!t || typeof t !== 'object') return {}
  return t
}

export function columnsFromKeys(keys, hidden = []) {
  return mapReportCols(keys.filter((k) => !isTechnicalKey(k) && !hidden.includes(k)))
}

export function buildReportColumns(firstRow, hidden = []) {
  if (!firstRow || typeof firstRow !== 'object') return []
  return columnsFromKeys(Object.keys(firstRow), hidden)
}

export function pickFirst(row, props, fallback) {
  for (const p of props) {
    const v = row ? row[p] : undefined
    if (v !== null && v !== undefined) return v
  }
  return fallback
}

export function createRowKeys({
  keyPriority = REPORT_ROW_KEYS[REPORT_KIND_FACULTY].key,
  labelPriority = REPORT_ROW_KEYS[REPORT_KIND_FACULTY].label
} = {}) {
  function keyOf(row, idx) {
    return String(pickFirst(row, keyPriority, idx))
  }
  function labelOf(row, idx) {
    const v = pickFirst(row, labelPriority, undefined)

    const withKey = v !== null && v !== undefined ? v : row.key ?? fallbackRowLabel(idx)
    return String(withKey)
  }
  return { keyOf, labelOf }
}

export function defaultKeyOf(row, idx) {
  return String(pickFirst(row, REPORT_ROW_KEYS[REPORT_KIND_FACULTY].key, idx))
}

export function hasDetails(data, key, prop, { missing = false, objectStrategy = REPORT_STRATEGY_SOME_ARRAY } = {}) {
  const all = data && data.details
  if (!all || typeof all !== 'object') return missing
  const d = all[key]
  if (d == null) return missing
  if (Array.isArray(d)) return d.length > 0
  if (typeof d === 'object') {
    if (prop && Array.isArray(d[prop])) return d[prop].length > 0

    if (objectStrategy === REPORT_STRATEGY_KEYS_LENGTH) return Object.keys(d).length > 0
    return Object.values(d).some((v) => Array.isArray(v) && v.length > 0)
  }
  return missing
}

export function hasReportDetails(data, key, prop, objectStrategy = REPORT_STRATEGY_SOME_ARRAY) {
  return hasDetails(data, key, prop, { objectStrategy })
}

export function isPositiveNumber(v) {
  return typeof v === 'number' && v > 0
}

export function canDrillCell(row, prop, idx, ctx) {
  if (!isPositiveNumber(row[prop])) return false
  if (isTechnicalKey(prop) || ctx.hidden.includes(prop)) return false
  if (ctx.extraGuard && !ctx.extraGuard(prop)) return false
  return hasReportDetails(ctx.data, ctx.keyOf(row, idx), prop, ctx.objectStrategy)
}

export function makeCanDrill({ hidden = [], keyOf = defaultKeyOf, getData, extraGuard = null, objectStrategy = REPORT_STRATEGY_SOME_ARRAY }) {
  return (row, prop, idx) =>
    canDrillCell(row, prop, idx, { hidden, keyOf, data: getData(), extraGuard, objectStrategy })
}

export function buildDrillPayload(row, col, idx, { keyOf, labelOf }) {
  return {
    key: keyOf(row, idx),
    label: labelOf(row, idx) + TITLE_SEPARATOR + col.label,
    value: row[col.prop],
    col: col.prop
  }
}

export function buildCourseDrillPayload(row, idx, course, count, { keyOf, labelOf }, courseLabel) {
  return {
    key: keyOf(row, idx),
    label: labelOf(row, idx) + TITLE_SEPARATOR + courseLabel,
    value: count,
    col: REPORT_BY_COURSE_PROP + ':' + course
  }
}

export function buildTotalDrillPayload(entry) {
  return {
    key: TOTALS_DRILL_KEY,
    label: TEXT_TOTALS + TITLE_SEPARATOR + entry.label,
    value: entry.value,
    col: entry.key
  }
}

export function isDrillableTotal(entry) {
  return Boolean(entry && isPositiveNumber(entry.value))
}

export function normalizeSummary(data, metricLabels) {
  if (!data) return []
  const src = data.totals || data.summary || data
  if (Array.isArray(src)) {
    return src.map((row, idx) => ({
      key: row.key || row.metric || String(idx),
      label: row.label || row.name || metricLabels[row.metric] || metricLabels[row.key] || fallbackRowLabel(idx),
      value: row.value ?? row.count ?? 0
    }))
  }
  if (typeof src === 'object') {
    return Object.keys(src)
      .filter((key) => typeof src[key] !== 'object')
      .map((key) => ({
        key,
        label: metricLabels[key] || key,
        value: src[key]
      }))
  }
  return []
}

export function hasSummaryDetails(data, key) {
  return hasDetails(data, key, undefined, { missing: true, objectStrategy: REPORT_STRATEGY_KEYS_LENGTH })
}

export function isPlainObject(v) {
  return v != null && typeof v === 'object' && !Array.isArray(v)
}

export function isCourseMap(v) {
  return isPlainObject(v) && Object.keys(v).length > 0
}

export function isEmptyCourseMap(v) {
  return isPlainObject(v) && Object.keys(v).length === 0
}
