import { ref, watch } from 'vue'
import { useDictionariesStore, buildCacheKey } from '../stores/dictionaries.js'
import { DICT_VALUE_FIELD, DICT_LABEL_FIELD } from '../constants/ui.js'
import {
  pickValue,
  buildOptionDescriptor,
  buildSearchText,
  matchSearchTokens
} from '../utils/entityCards.js'

export function useDictionarySelect(
  endpoint,
  valueField = DICT_VALUE_FIELD,
  labelField = DICT_LABEL_FIELD,
  paramsGetter = null,
  onParamsChange = null
) {
  const store = useDictionariesStore()
  const options = ref([])
  const allOptions = ref([])
  const loading = ref(false)
  let loadedKey = ''
  let loadedRows = null

  async function ensureLoaded() {
    const extra = paramsGetter ? paramsGetter() : undefined
    if (extra === null) {
      loadedKey = ''
      loadedRows = null
      allOptions.value = []
      options.value = []
      return []
    }
    const params = extra || {}
    const key = buildCacheKey(endpoint, params)
    const cached = store.cache[key]
    if (cached && key === loadedKey && cached === loadedRows) {
      return allOptions.value
    }
    loading.value = true
    try {
      const rows = await store.load(endpoint, params)
      loadedKey = key
      loadedRows = rows
      allOptions.value = rows.map((row) => {
        const { label, card } = buildOptionDescriptor(row, labelField)
        return {
          value: pickValue(row, valueField),
          label,
          card,
          searchText: buildSearchText(row, label, card),
          raw: row
        }
      })
      return allOptions.value
    } finally {
      loading.value = false
    }
  }

  async function search(text = '') {
    const list = await ensureLoaded()
    options.value = text ? list.filter((item) => matchSearchTokens(item, text)) : list
    return options.value
  }

  if (paramsGetter) {
    watch(
      () => {
        const extra = paramsGetter()
        return extra ? buildCacheKey(endpoint, extra) : extra
      },
      async () => {
        const list = await search('')
        if (onParamsChange) onParamsChange(list)
      }
    )
  }

  return { options, allOptions, loading, search }
}
