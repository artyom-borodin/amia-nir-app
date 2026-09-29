import { ref } from 'vue'
import { labelFor, formatDrillTitle, isTechnicalKey } from './reportHelpers.js'
import { LIST_JOINER, KV_JOINER } from '../constants/formats.js'

export { isTechnicalKey }

export function formatCompound(v) {
  if (Array.isArray(v)) return v.join(LIST_JOINER)
  if (typeof v === 'object' && v !== null) return Object.keys(v).map((k) => k + KV_JOINER + v[k]).join(LIST_JOINER)
  return undefined
}

export function formatReportCell(v) {
  if (v == null) return ''
  const compound = formatCompound(v)
  if (compound !== undefined) return compound
  return String(v)
}

export function resolveDrillDetails(data, key, col) {
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
  return union.map((k) => ({ prop: k, label: labelFor(k) }))
}

export function useDrill(dataRef) {
  const drawer = ref(false)
  const drillTitle = ref('')
  const drillRows = ref([])
  const drillColumns = ref([])

  function onDrill(row) {
    drillTitle.value = formatDrillTitle(row.label, row.value)
    const details = resolveDrillDetails(dataRef.value, row.key, row.col)
    drillRows.value = details
    drillColumns.value = buildDrillColumns(drillRows.value)
    drawer.value = true
  }

  return { drawer, drillTitle, drillRows, drillColumns, onDrill }
}
