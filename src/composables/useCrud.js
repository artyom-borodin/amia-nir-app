import { ref } from 'vue'
import { makeCrud } from '../api/crud.js'
import { parseApiError } from '../api/errors.js'
import { QUERY_LIMIT, QUERY_OFFSET, QUERY_ORDERING } from '../constants/api.js'
import { SORT_DESC, ORDER_DESC_PREFIX } from '../constants/ui.js'
import { usePagination } from './usePagination.js'

export function useCrud(endpoint) {
  const crud = makeCrud(endpoint)
  const rows = ref([])
  const total = ref(0)
  const loading = ref(false)
  const error = ref('')
  const fieldErrors = ref({})
  const { page, pageSize, resetPage } = usePagination()
  const query = ref({})
  const sorting = ref({ prop: '', order: '' })

  function orderingValue() {
    if (!sorting.value.prop) return ''
    if (sorting.value.order === SORT_DESC) return ORDER_DESC_PREFIX + sorting.value.prop
    return sorting.value.prop
  }

  async function fetch(extra = {}) {
    loading.value = true
    error.value = ''
    fieldErrors.value = {}
    try {
      const params = {
        [QUERY_LIMIT]: pageSize.value,
        [QUERY_OFFSET]: (page.value - 1) * pageSize.value,
        ...query.value,
        ...extra
      }
      const ordering = orderingValue()
      if (ordering && !params[QUERY_ORDERING]) {
        params[QUERY_ORDERING] = ordering
      }
      const { results, count } = await crud.list(params)
      rows.value = results
      total.value = count
    } catch (err) {
      const parsed = parseApiError(err)
      error.value = parsed.message
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
      const parsed = parseApiError(err)
      error.value = parsed.message
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

  return { rows, total, loading, error, fieldErrors, page, pageSize, query, sorting, fetch, remove, setQuery, setSorting, onSortChange, crud }
}
