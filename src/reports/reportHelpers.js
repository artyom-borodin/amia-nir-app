import {
  REPORT_COLUMN_LABELS,
  REPORT_ROW_KEYS,
  REPORT_STRATEGY_SOME_ARRAY,
  REPORT_STRATEGY_KEYS_LENGTH
} from '../constants/reports.js'
import { REPORT_KIND_FACULTY } from '../constants/tables.js'
import { formatRowFallback } from '../constants/texts.js'

export function isTechnicalKey(key) {
  if (!key) return true
  if (['id','key','raw','learner','learner_key'].includes(key)) return true
  return key.endsWith('_id')
}

export function labelFor(key) {
  return REPORT_COLUMN_LABELS[key] ?? key
}

export function fallbackRowLabel(idx) {
  return formatRowFallback(idx)
}

export const DRILL_TITLE_SEP = ' - '
export const DRILL_VALUE_SEP = ': '
export const LIST_SEP = ', '
export const KV_SEP = ': '

export function formatDrillTitle(label, value) {
  return label + DRILL_VALUE_SEP + value
}

export function reportItems(data) {
  return data && Array.isArray(data.items) ? data.items : []
}

export function reportTotals(data) {
  const t = data && data.totals
  if (!t || typeof t !== 'object') return {}
  return t
}

export function buildReportColumns(firstRow, hidden = []) {
  if (!firstRow || typeof firstRow !== 'object') return []
  return Object.keys(firstRow)
    .filter((k) => !isTechnicalKey(k) && !hidden.includes(k))
    .map((k) => ({ prop: k, label: labelFor(k) }))
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

export function defaultLabelOf(row, idx) {
  return String(pickFirst(row, REPORT_ROW_KEYS[REPORT_KIND_FACULTY].label, fallbackRowLabel(idx)))
}

export function hasReportDetails(data, key, prop, objectStrategy = REPORT_STRATEGY_SOME_ARRAY) {
  const all = data && data.details
  if (!all || typeof all !== 'object') return false
  const d = all[key]
  if (d == null) return false
  if (Array.isArray(d)) return d.length > 0
  if (typeof d === 'object') {
    if (prop && Array.isArray(d[prop])) return d[prop].length > 0

    if (objectStrategy === REPORT_STRATEGY_KEYS_LENGTH) return Object.keys(d).length > 0
    return Object.values(d).some((v) => Array.isArray(v) && v.length > 0)
  }
  return false
}

export function canDrillCell(row, prop, idx, ctx) {
  const v = row[prop]
  if (typeof v !== 'number' || v === 0) return false
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
    label: labelOf(row, idx) + DRILL_TITLE_SEP + col.label,
    value: row[col.prop],
    col: col.prop
  }
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
  const all = data && data.details
  if (!all || typeof all !== 'object') return true
  const d = all[key]
  if (d == null) return true
  if (Array.isArray(d)) return d.length > 0
  if (typeof d === 'object') return Object.keys(d).length > 0
  return true
}

export function isCourseMap(v) {
  return v != null && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0
}
