import { ref } from 'vue'
import { getReport, exportReport, downloadBlob } from '../api/reports.js'
import { parseApiError } from '../api/errors.js'
import { buildPeriodParams } from '../constants/periods.js'
import { buildReportFilename, isEmptyValue } from '../constants/api.js'

function cleanParams(params) {
  const out = { ...params }
  for (const key of Object.keys(out)) {
    if (isEmptyValue(out[key])) delete out[key]
  }
  return out
}

function buildParams(periodState, filters) {
  return cleanParams({ ...buildPeriodParams(periodState), ...filters })
}

export function useReport(kind) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref('')
  const exporting = ref(false)

  function isBusy() {
    return loading.value || exporting.value
  }

  function setError(err) {
    error.value = parseApiError(err).message
  }

  function reportParams(periodState, filters = {}) {
    return buildParams(periodState, filters)
  }

  async function load(periodState, filters = {}) {
    if (isBusy()) return
    loading.value = true
    error.value = ''
    try {
      data.value = await getReport(kind, reportParams(periodState, filters))
    } catch (err) {
      setError(err)
      data.value = null
    } finally {
      loading.value = false
    }
  }

  async function exportXlsx(periodState, filters = {}) {
    if (isBusy()) return
    exporting.value = true
    try {
      const blob = await exportReport(kind, reportParams(periodState, filters))
      downloadBlob(blob, buildReportFilename(kind))
    } catch (err) {
      setError(err)
    } finally {
      exporting.value = false
    }
  }

  return { data, loading, error, exporting, load, exportXlsx }
}
