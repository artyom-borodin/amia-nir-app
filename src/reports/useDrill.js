import { ref } from 'vue'
import { columnsFromKeys, formatDrillTitle, isTechnicalKey } from './reportHelpers.js'

export { isTechnicalKey }

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
