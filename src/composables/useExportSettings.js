import { computed, ref, watch } from 'vue'
import {
  TEXT_EXPORT_DETAIL_METRICS,
  TEXT_EXPORT_COLUMNS,
  TEXT_EXPORT_SUMMARY_METRICS
} from '../constants/texts.js'
import { CSV_JOINER } from '../constants/formats.js'
import { EMIT_EXPORT } from '../constants/events.js'
import { REPORT_KIND_SUMMARY } from '../constants/tables.js'
import {
  QUERY_EXPORT_COLS,
  QUERY_DETAILS_MODE,
  QUERY_DETAIL_METRICS,
  QUERY_EXPAND_GROUPS,
  QUERY_INCLUDE_TOTALS,
  QUERY_HIDE_ZERO_ROWS,
  QUERY_EXPORT_SCOPE
} from '../constants/api.js'
import {
  DIPLOMA_TRUE,
  DIPLOMA_FALSE,
  EXPORT_TARGET_REPORT,
  EXPORT_TARGET_CRUD,
  EXPORT_MODE_NONE,
  EXPORT_MODE_INLINE,
  EXPORT_MODE_BOTH,
  EXPORT_SCOPE_ALL,
  EXPORT_SCOPE_PAGE,
  EXPORT_SCOPE_SELECTED,
  EXPORT_SCOPES,
  getReportExportColumns,
  getReportDetailMetrics
} from '../constants/reports.js'

function propList(items) {
  return items.map((item) => item.prop)
}

function encodeSubset(items, selected) {
  const all = propList(items)
  if (!all.length || !selected.length || selected.length >= all.length) return ''
  return all.filter((p) => selected.includes(p)).join(CSV_JOINER)
}

export function useExportSettings(props, emit) {
  const isReportMode = computed(() => props.mode === EXPORT_TARGET_REPORT)
  const isCrudMode = computed(() => props.mode === EXPORT_TARGET_CRUD)
  const isSummaryReport = computed(() => isReportMode.value && props.kind === REPORT_KIND_SUMMARY)

  const dialogOpen = ref(false)
  const detailsMode = ref(EXPORT_MODE_NONE)
  const selectedDetailMetrics = ref([])
  const expandGroups = ref(false)
  const selectedCols = ref([])
  const exportScope = ref(EXPORT_SCOPE_ALL)
  const includeTotals = ref(isReportMode.value)
  const hideZeroRows = ref(false)

  const hasInlineDetails = computed(
    () => detailsMode.value === EXPORT_MODE_INLINE || detailsMode.value === EXPORT_MODE_BOTH
  )

  const resolvedColumns = computed(() => {
    if (isReportMode.value && props.kind) {
      const byKind = getReportExportColumns(props.kind)
      if (byKind.length) return byKind
    }
    return (props.columns || []).filter((c) => c?.prop)
  })

  const resolvedDetailMetrics = computed(() =>
    isReportMode.value && props.kind ? getReportDetailMetrics(props.kind) : []
  )

  const hasExtraColumns = computed(() => resolvedColumns.value.some((c) => Boolean(c.extra)))

  const scopeCounts = computed(() => ({
    [EXPORT_SCOPE_ALL]: props.totalCount,
    [EXPORT_SCOPE_PAGE]: props.pageCount,
    [EXPORT_SCOPE_SELECTED]: props.selectedCount
  }))

  const scopeOptions = computed(() =>
    EXPORT_SCOPES.filter((s) => s.value !== EXPORT_SCOPE_SELECTED || isCrudMode.value).map((s) => {
      const count = scopeCounts.value[s.value] || 0
      const isSelectedScope = s.value === EXPORT_SCOPE_SELECTED
      return {
        ...s,
        count,
        showBadge: isSelectedScope || count > 0,
        disabled: isSelectedScope && !count
      }
    })
  )

  function selectAllCols() {
    selectedCols.value = propList(resolvedColumns.value)
  }

  function selectPrimaryCols() {
    const primary = propList(resolvedColumns.value.filter((c) => !c.extra))
    selectedCols.value = primary.length ? primary : propList(resolvedColumns.value)
  }

  function selectAllMetrics() {
    selectedDetailMetrics.value = propList(resolvedDetailMetrics.value)
  }

  const checkSections = computed(() => {
    const list = []
    if (resolvedColumns.value.length) {
      list.push({
        key: QUERY_EXPORT_COLS,
        label: isSummaryReport.value ? TEXT_EXPORT_SUMMARY_METRICS : TEXT_EXPORT_COLUMNS,
        items: resolvedColumns.value,
        selected: selectedCols.value,
        showDefault: hasExtraColumns.value,
        onChange: (val) => {
          selectedCols.value = val
        },
        onSelectAll: selectAllCols,
        onSelectDefault: selectPrimaryCols
      })
    }
    if (isReportMode.value && detailsMode.value !== EXPORT_MODE_NONE && resolvedDetailMetrics.value.length) {
      list.push({
        key: QUERY_DETAIL_METRICS,
        label: TEXT_EXPORT_DETAIL_METRICS,
        items: resolvedDetailMetrics.value,
        selected: selectedDetailMetrics.value,
        showDefault: false,
        onChange: (val) => {
          selectedDetailMetrics.value = val
        },
        onSelectAll: selectAllMetrics,
        onSelectDefault: null
      })
    }
    return list
  })

  watch(resolvedColumns, selectAllCols, { immediate: true })
  watch(resolvedDetailMetrics, selectAllMetrics, { immediate: true })

  watch(
    () => props.selectedCount,
    (cnt) => {
      if (!cnt && exportScope.value === EXPORT_SCOPE_SELECTED) {
        exportScope.value = EXPORT_SCOPE_ALL
      }
    }
  )

  function onResetSettings() {
    detailsMode.value = EXPORT_MODE_NONE
    selectAllMetrics()
    expandGroups.value = false
    selectAllCols()
    exportScope.value = EXPORT_SCOPE_ALL
    includeTotals.value = isReportMode.value
    hideZeroRows.value = false
  }

  function buildExportParams() {
    const params = {}
    const cols = encodeSubset(resolvedColumns.value, selectedCols.value)
    if (cols) params[QUERY_EXPORT_COLS] = cols

    if (isReportMode.value) {
      if (detailsMode.value && detailsMode.value !== EXPORT_MODE_NONE) {
        params[QUERY_DETAILS_MODE] = detailsMode.value
        const metrics = encodeSubset(resolvedDetailMetrics.value, selectedDetailMetrics.value)
        if (metrics) params[QUERY_DETAIL_METRICS] = metrics
        if (expandGroups.value && hasInlineDetails.value) {
          params[QUERY_EXPAND_GROUPS] = DIPLOMA_TRUE
        }
      }
      if (!isSummaryReport.value && !includeTotals.value) {
        params[QUERY_INCLUDE_TOTALS] = DIPLOMA_FALSE
      }
      if (hideZeroRows.value) {
        params[QUERY_HIDE_ZERO_ROWS] = DIPLOMA_TRUE
      }
    } else {
      if (exportScope.value && exportScope.value !== EXPORT_SCOPE_ALL) {
        params[QUERY_EXPORT_SCOPE] = exportScope.value
      }
      if (includeTotals.value) {
        params[QUERY_INCLUDE_TOTALS] = DIPLOMA_TRUE
      }
    }
    return params
  }

  const exportParams = computed(buildExportParams)
  const hasCustomSettings = computed(() => Object.keys(exportParams.value).length > 0)

  function onExportNow() {
    emit(EMIT_EXPORT, { ...exportParams.value })
  }

  function onExportFromDialog() {
    dialogOpen.value = false
    onExportNow()
  }

  return {
    dialogOpen,
    isReportMode,
    isSummaryReport,
    detailsMode,
    exportScope,
    includeTotals,
    hideZeroRows,
    expandGroups,
    hasInlineDetails,
    scopeOptions,
    checkSections,
    hasCustomSettings,
    onResetSettings,
    onExportNow,
    onExportFromDialog
  }
}
