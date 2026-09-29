import { ref, onUnmounted } from 'vue'
import { useDictionariesStore } from '../stores/dictionaries.js'
import { UI_DICT_LIMIT, UI_SEARCH_DEBOUNCE_MS, DICT_VALUE_FIELD, DICT_LABEL_FIELD } from '../constants/ui.js'
import { LABEL_SEPARATOR, FIO_SEPARATOR } from '../constants/choices.js'
import { LOOKUP_ICONTAINS, unknownLabel } from '../features/_shared.js'
import { LOOKUP_SEP, QUERY_SEARCH, PK_FIELD } from '../constants/api.js'

export const DEFAULT_SEARCH_FIELD = 'last_name_rus'
export const DEFAULT_SEARCH_LOOKUP = LOOKUP_SEP + LOOKUP_ICONTAINS
export const DEFAULT_SEARCH_PARAM = DEFAULT_SEARCH_FIELD + DEFAULT_SEARCH_LOOKUP
export const DEFAULT_ID_FIELD = PK_FIELD
export const DEFAULT_LABEL_FIELD = DICT_LABEL_FIELD
export const DEFAULT_SEARCH_QUERY_PARAM = QUERY_SEARCH

const LABEL_FORMATTERS = [
  {
    test: (row) => row.pps_fio && row.department_name,
    format: (row) => String(row.pps_fio) + LABEL_SEPARATOR + String(row.department_name)
  },
  {
    test: (row) => row.subdivision_name,
    format: (row) => String(row.subdivision_short_name || row.subdivision_name)
  },
  { test: (row) => row.group_name, format: (row) => String(row.group_name) },
  { test: (row) => row.get_full_name, format: (row) => String(row.get_full_name) },
  {
    test: (row) => row.last_name_rus,
    format: (row) => [row.last_name_rus, row.first_name_rus, row.patronymic_rus].filter(Boolean).join(FIO_SEPARATOR)
  }
]

export const DICT_LABEL_FIELDS = Object.freeze([
  'pps_fio',
  'department_name',
  'subdivision_name',
  'subdivision_short_name',
  'group_name',
  'get_full_name',
  'last_name_rus',
  'first_name_rus',
  'patronymic_rus',
  'name',
  'title',
  'fio',
  'id'
])

function pickValue(row, valueField) {
  return row[valueField] ?? row[DEFAULT_ID_FIELD]
}

function pickLabel(row, field) {
  for (const f of LABEL_FORMATTERS) {
    if (f.test(row)) return f.format(row)
  }
  if (row[field]) return String(row[field])
  if (row.name) return String(row.name)
  if (row.title) return String(row.title)
  if (row.fio) return String(row.fio)
  return unknownLabel(row.id)
}

export const SEARCH_PARAM = {
  subdivision: 'subdivision_name' + DEFAULT_SEARCH_LOOKUP,
  group: 'group_name' + DEFAULT_SEARCH_LOOKUP,
  cadet: DEFAULT_SEARCH_PARAM,
  student: DEFAULT_SEARCH_PARAM,
  'fpk-mag-student': DEFAULT_SEARCH_PARAM,
  employee: DEFAULT_SEARCH_PARAM
}

export function useDictionarySelect(endpoint, valueField = DEFAULT_ID_FIELD, labelField = DEFAULT_LABEL_FIELD) {
  const store = useDictionariesStore()
  const options = ref([])
  const loading = ref(false)
  let timer = null

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  async function search(text = '') {
    loading.value = true
    try {
      const params = { limit: UI_DICT_LIMIT }
      if (text) {
        params[SEARCH_PARAM[endpoint] ?? DEFAULT_SEARCH_QUERY_PARAM] = text
      }
      const rows = await store.load(endpoint, params)
      options.value = rows.map((row) => ({
        value: pickValue(row, valueField),
        label: pickLabel(row, labelField),
        raw: row
      }))
    } finally {
      loading.value = false
    }
  }

  function searchDebounced(text = '') {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => search(text), UI_SEARCH_DEBOUNCE_MS)
  }

  return { options, loading, search, searchDebounced }
}
