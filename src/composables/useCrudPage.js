import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useCrud } from './useCrud.js'
import { useDictionariesStore } from '../stores/dictionaries.js'
import { getEndpoint } from '../constants/tables.js'
import { parseApiError } from '../api/errors.js'
import { shouldAutoCreate } from '../constants/routes.js'
import { BTN_WARNING, CONFIRM_BOX_CLASS, CONFIRM_DANGER_BTN_CLASS } from '../constants/ui.js'
import { TEXT_DELETE, TEXT_CONFIRM_TITLE, TEXT_CANCEL, TEXT_CHECK_FORM, TEXT_SAVED, TEXT_CREATED, TEXT_DELETED_COUNT, formatDeleteConfirm, formatBulkDeleteConfirm } from '../constants/texts.js'
import { fillForm, emptyFilters, buildFilterQuery, getRowLabel } from '../features/_shared.js'

export function useCrudPage(key, { filterDefs, emptyFormFn, validateFn = null, normalizeFn = null }) {
  const { rows, total, loading, error, fieldErrors, page, pageSize, fetch, remove, removeMany, setQuery, onSortChange, crud: crudApi } =
    useCrud(getEndpoint(key))
  const dicts = useDictionariesStore()

  const route = useRoute()

  const filters = ref(emptyFilters(filterDefs))
  const selectedRows = ref([])
  const drawer = ref(false)
  const editId = ref(null)
  const form = ref(emptyFormFn())
  const saving = ref(false)
  const formError = ref('')
  const formFields = ref({})
  const formViewRef = ref(null)

  async function onSearch() {
    setQuery(buildFilterQuery(filters.value, filterDefs))
    await fetch()
  }

  async function onReset() {
    filters.value = emptyFilters(filterDefs)
    setQuery({})
    await fetch()
  }

  async function onRemoveFilter(prop) {
    if (!prop) return
    filters.value = { ...filters.value, [prop]: '' }
    await onSearch()
  }

  function onCreate() {
    editId.value = null
    form.value = emptyFormFn()
    formError.value = ''
    formFields.value = {}
    drawer.value = true
  }

  function onEdit(row) {
    editId.value = row.id
    form.value = fillForm(emptyFormFn(), row)
    formError.value = ''
    formFields.value = {}
    drawer.value = true
  }

  async function confirmDelete(message) {
    try {
      await ElMessageBox.confirm(message, TEXT_CONFIRM_TITLE, {
        confirmButtonText: TEXT_DELETE,
        cancelButtonText: TEXT_CANCEL,
        type: BTN_WARNING,
        customClass: CONFIRM_BOX_CLASS,
        confirmButtonClass: CONFIRM_DANGER_BTN_CLASS
      })
      return true
    } catch (e) {
      return false
    }
  }

  async function onRemove(row) {
    if (!(await confirmDelete(formatDeleteConfirm(getRowLabel(row))))) return
    await remove(row.id)
    dicts.clear()
  }

  function onSelectionChange(list) {
    selectedRows.value = Array.isArray(list) ? list : []
  }

  async function onRemoveSelected() {
    const ids = selectedRows.value.map((r) => r.id).filter(Boolean)
    if (!ids.length) return
    if (!(await confirmDelete(formatBulkDeleteConfirm(ids.length)))) return
    const { deleted } = await removeMany(ids)
    selectedRows.value = []
    dicts.clear()
    if (deleted > 0) {
      ElMessage.success(TEXT_DELETED_COUNT + deleted)
    }
  }

  function onPage(p) {
    page.value = p
    fetch()
  }

  function onSize(s) {
    pageSize.value = s
    page.value = 1
    fetch()
  }

  async function validateAll() {
    const ok = formViewRef.value ? await formViewRef.value.validate() : true
    if (!ok) {
      ElMessage.warning(TEXT_CHECK_FORM)
      return false
    }
    if (validateFn) {
      const learnerError = validateFn(form.value)
      if (learnerError) {
        formError.value = learnerError
        ElMessage.warning(TEXT_CHECK_FORM)
        return false
      }
    }
    return true
  }

  async function onSave() {
    if (!(await validateAll())) return
    saving.value = true
    formError.value = ''
    formFields.value = {}
    try {
      const payload = normalizeFn ? normalizeFn(form.value) : form.value
      if (editId.value) {
        await crudApi.update(editId.value, payload)
        ElMessage.success(TEXT_SAVED)
      } else {
        await crudApi.create(payload)
        ElMessage.success(TEXT_CREATED)
      }
      drawer.value = false
      dicts.clear()
      await fetch()
    } catch (e) {
      const p = parseApiError(e)
      formError.value = p.message
      formFields.value = p.fields
    } finally {
      saving.value = false
    }
  }

  async function initPage() {
    await fetch()
    if (shouldAutoCreate(route)) onCreate()
  }

  onMounted(initPage)

  return {
    rows,
    total,
    loading,
    error,
    fieldErrors,
    page,
    pageSize,
    filters,
    selectedRows,
    drawer,
    editId,
    form,
    saving,
    formError,
    formFields,
    formViewRef,
    onSearch,
    onReset,
    onRemoveFilter,
    onCreate,
    onEdit,
    onRemove,
    onSelectionChange,
    onRemoveSelected,
    onPage,
    onSize,
    onSave,
    onSortChange,
    initPage
  }
}
