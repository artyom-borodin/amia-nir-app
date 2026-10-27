import { ref } from 'vue'
import { makeCrud } from '../api/crud.js'
import { downloadBlob } from '../api/reports.js'
import { parseApiError } from '../api/errors.js'
import { QUERY_ORDERING } from '../constants/api.js'
import { SORT_DESC, ORDER_DESC_PREFIX } from '../constants/ui.js'
import { usePagination } from './usePagination.js'

export function useCrud(endpoint) {
  const crud = makeCrud(endpoint)
  const rows = ref([])
  const total = ref(0)
  const loading = ref(false)
  const exporting = ref(false)
  const error = ref('')
  const fieldErrors = ref({})
  const { page, pageSize, resetPage, pageParams, withPageScope } = usePagination()
  const query = ref({})
  const sorting = ref({ prop: '', order: '' })

  function isBusy() {
    return loading.value || exporting.value
  }

  function setError(err) {
    error.value = parseApiError(err).message
  }

  function orderingValue() {
    if (!sorting.value.prop) return ''
    if (sorting.value.order === SORT_DESC) return ORDER_DESC_PREFIX + sorting.value.prop
    return sorting.value.prop
  }

  function withOrdering(params = {}) {
    const next = { ...params }
    const ordering = orderingValue()
    if (ordering && !next[QUERY_ORDERING]) {
      next[QUERY_ORDERING] = ordering
    }
    return next
  }

  async function fetch(extra = {}) {
    loading.value = true
    error.value = ''
    fieldErrors.value = {}
    try {
      const { results, count } = await crud.list(
        withOrdering({ ...pageParams(), ...query.value, ...extra })
      )
      rows.value = results
      total.value = count
    } catch (err) {
      setError(err)
    } finally {
      loading.value = false
    }
  }

  async function remove(id) {
    loading.value = true
    try {
      await crud.remove(id)
      await fetch()
    } catch (err) {
      setError(err)
    } finally {
      loading.value = false
    }
  }

  async function removeMany(ids) {
    if (!Array.isArray(ids) || !ids.length) return { deleted: 0, failed: 0 }
    loading.value = true
    error.value = ''
    try {
      const settled = await Promise.allSettled(ids.map((id) => crud.remove(id)))
      const failedItems = settled.filter((r) => r.status === 'rejected')
      const deleted = settled.length - failedItems.length
      if (failedItems.length > 0) {
        setError(failedItems[0].reason)
      }
      await fetch()
      return { deleted, failed: failedItems.length }
    } finally {
      loading.value = false
    }
  }

  function setQuery(next) {
    query.value = { ...next }
    resetPage()
  }

  function setSorting(prop, order) {
    sorting.value = { prop: prop || '', order: order || '' }
    resetPage()
  }

  async function onSortChange(info) {
    const prop = info?.prop || ''
    const order = info?.order || ''
    setSorting(prop, order)
    await fetch()
  }

  async function exportXlsx(filename, params = query.value) {
    if (isBusy()) return
    exporting.value = true
    error.value = ''
    try {
      const blob = await crud.exportXlsx(withOrdering(withPageScope(params)))
      downloadBlob(blob, filename)
    } catch (err) {
      setError(err)
    } finally {
      exporting.value = false
    }
  }

  return { rows, total, loading, exporting, error, fieldErrors, page, pageSize, pageParams, withPageScope, query, sorting, fetch, remove, removeMany, setQuery, setSorting, onSortChange, exportXlsx, crud }
}
