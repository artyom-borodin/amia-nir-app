import { ref } from 'vue'
import {
  DRILL_ROW_KIND_RULES,
  DRILL_ROW_DEFAULT_KIND,
  DEDUP_PREFIX_LEARNER,
  DEDUP_PREFIX_PPS,
  DEDUP_PREFIX_ROW,
  TOTALS_DRILL_KEY
} from '../constants/reports.js'
import { columnsFromKeys, formatDrillTitle, isTechnicalKey, isPlainObject } from './reportHelpers.js'

export { isTechnicalKey, TOTALS_DRILL_KEY }

function resolveRowKind(r) {
  const matched = DRILL_ROW_KIND_RULES.find((rule) => rule.field in r)
  return matched ? matched.kind : DRILL_ROW_DEFAULT_KIND
}

function rowDedupKey(r) {
  if (!isPlainObject(r)) return ''
  if (r.learner) return DEDUP_PREFIX_LEARNER + r.learner
  if (r.pps && r.id === undefined) return DEDUP_PREFIX_PPS + (r.supervisor_id || r.pps)
  if (r.id !== undefined && r.id !== null) {
    return DEDUP_PREFIX_ROW + resolveRowKind(r) + ':' + r.id
  }
  return ''
}

export function resolveDrillDetails(data, key, col) {
  if (key === TOTALS_DRILL_KEY) {
    const allDetails = data?.details
    if (isPlainObject(allDetails) && col) {
      const merged = []
      const seen = new Set()
      for (const bucket of Object.values(allDetails)) {
        if (!isPlainObject(bucket)) continue
        const sub = bucket[col]
        if (!Array.isArray(sub)) continue
        for (const r of sub) {
          const dk = rowDedupKey(r)
          if (dk) {
            if (seen.has(dk)) continue
            seen.add(dk)
          }
          merged.push(r)
        }
      }
      if (merged.length > 0) return merged
    }
    if (Array.isArray(data?.items) && data.items.length > 0) {
      return data.items
    }
    return []
  }
  const byKey = data?.details?.[key]
  const details = Array.isArray(byKey) ? byKey : (byKey?.[col] ?? [])
  return Array.isArray(details) ? details : []
}

export function buildDrillColumns(rows) {
  const first = rows[0]
  if (!first || typeof first !== 'object') return []
  const seen = new Set()
  const union = []
  for (const r of rows) {
    if (!r || typeof r !== 'object') continue
    for (const k of Object.keys(r)) {
      if (!isTechnicalKey(k) && !seen.has(k)) {
        seen.add(k)
        union.push(k)
      }
    }
  }
  return columnsFromKeys(union)
}

export function useDrill(dataRef) {
  const drawer = ref(false)
  const drillTitle = ref('')
  const drillRows = ref([])
  const drillColumns = ref([])
  const drillKey = ref('')
  const drillCol = ref('')

  function onDrill(row) {
    drillTitle.value = formatDrillTitle(row.label, row.value)
    const details = resolveDrillDetails(dataRef.value, row.key, row.col)
    drillRows.value = details
    drillColumns.value = buildDrillColumns(drillRows.value)
    drillKey.value = row.key ?? ''
    drillCol.value = row.col ?? ''
    drawer.value = true
  }

  return { drawer, drillTitle, drillRows, drillColumns, drillKey, drillCol, onDrill }
}
