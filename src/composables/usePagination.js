import { ref } from 'vue'
import { UI_PAGE_SIZE } from '../constants/ui.js'
import { QUERY_LIMIT, QUERY_OFFSET, QUERY_EXPORT_SCOPE } from '../constants/api.js'
import { EXPORT_SCOPE_PAGE } from '../constants/reports.js'

export function usePagination() {
  const page = ref(1)
  const pageSize = ref(UI_PAGE_SIZE)

  function resetPage() {
    page.value = 1
  }

  function pageParams() {
    return {
      [QUERY_LIMIT]: pageSize.value,
      [QUERY_OFFSET]: (page.value - 1) * pageSize.value
    }
  }

  function withPageScope(params = {}) {
    const next = { ...(params || {}) }
    if (next[QUERY_EXPORT_SCOPE] === EXPORT_SCOPE_PAGE) {
      Object.assign(next, pageParams())
    }
    return next
  }

  function paginateRows(rows) {
    const start = (page.value - 1) * pageSize.value
    return rows.slice(start, start + pageSize.value)
  }

  function onPage(next) {
    page.value = next
  }

  function onSize(next) {
    pageSize.value = next
    resetPage()
  }

  return { page, pageSize, resetPage, pageParams, withPageScope, paginateRows, onPage, onSize }
}
