import { ref, computed } from 'vue'
import { useReport } from './useReport.js'
import { useReportFiltersStore } from '../stores/reportFilters.js'
import { REPORT_HIDDEN_COLUMNS, REPORT_ROW_KEYS, REPORT_STRATEGY_SOME_ARRAY } from '../constants/reports.js'
import { useDrill, formatReportCell } from '../reports/useDrill.js'
import {
  reportItems,
  reportTotals,
  buildReportColumns,
  createRowKeys,
  makeCanDrill,
  buildDrillPayload
} from '../reports/reportHelpers.js'

export function useReportPage(kind, options = {}) {
  const hidden = options.hiddenColumns ?? REPORT_HIDDEN_COLUMNS[kind] ?? []
  const rowKeys = REPORT_ROW_KEYS[kind] ?? { key: ['key', 'id'], label: ['name', 'key'] }
  const keyPriority = options.keyPriority ?? rowKeys.key
  const labelPriority = options.labelPriority ?? rowKeys.label
  const extraGuard = options.extraGuard ?? null
  const objectStrategy = options.objectStrategy ?? REPORT_STRATEGY_SOME_ARRAY
  const reloadOnPeriodChange = options.reloadOnPeriodChange ?? false

  const store = useReportFiltersStore()
  store.ensure(kind)
  const period = ref({ ...store.byKind[kind].period })
  const filters = ref({ ...store.byKind[kind].filters })
  const { data, loading, error, exporting, load, exportXlsx } = useReport(kind)
  const { drawer, drillTitle, drillRows, drillColumns, onDrill } = useDrill(data)

  const items = computed(() => reportItems(data.value))
  const columns = computed(() => buildReportColumns(items.value[0], hidden))
  const totals = computed(() => reportTotals(data.value))

  const { keyOf, labelOf } = createRowKeys({ keyPriority, labelPriority })
  const canDrill = makeCanDrill({
    hidden,
    keyOf,
    getData: () => data.value,
    extraGuard,
    objectStrategy
  })

  function onCell(row, col, idx) {
    onDrill(buildDrillPayload(row, col, idx, { keyOf, labelOf }))
  }

  function onChange() {
    store.setPeriod(kind, { ...period.value })
    if (reloadOnPeriodChange) return onLoad()
    return undefined
  }

  async function onLoad() {
    store.setPeriod(kind, { ...period.value })
    store.setFilters(kind, { ...filters.value })
    await load(period.value, filters.value)
  }

  async function onReset() {
    store.reset(kind)
    period.value = { ...store.byKind[kind].period }
    filters.value = { ...store.byKind[kind].filters }
    await load(period.value, filters.value)
  }

  async function onExport() {
    await exportXlsx(period.value, filters.value)
  }

  return {
    period,
    filters,
    data,
    loading,
    error,
    exporting,
    items,
    columns,
    totals,
    drawer,
    drillTitle,
    drillRows,
    drillColumns,
    onDrill,
    canDrill,
    formatCell: formatReportCell,
    keyOf,
    labelOf,
    onCell,
    onChange,
    onLoad,
    onReset,
    onExport
  }
}
