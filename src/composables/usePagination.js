import { ref } from 'vue'
import { UI_PAGE_SIZE } from '../constants/ui.js'

export function usePagination() {
  const page = ref(1)
  const pageSize = ref(UI_PAGE_SIZE)

  function resetPage() {
    page.value = 1
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

  return { page, pageSize, resetPage, paginateRows, onPage, onSize }
}
