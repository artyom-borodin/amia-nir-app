import { defineStore } from 'pinia'
import { makeCrud } from '../api/crud.js'
import { UI_DICT_CACHE_LIMIT } from '../constants/ui.js'
import { PAGINATION_LIMIT_KEY } from '../constants/api.js'
import { STORE_DICTS } from '../constants/stores.js'

export function buildCacheKey(endpoint, params) {
  const sorted = Object.keys(params).sort()
  return endpoint + '|' + JSON.stringify(params, sorted)
}

export const useDictionariesStore = defineStore(STORE_DICTS, {
  state: () => ({
    cache: {},
    loading: {}
  }),
  actions: {
    async load(endpoint, params = {}) {
      const key = buildCacheKey(endpoint, params)
      if (key in this.cache) return this.cache[key]
      this.loading[key] = true
      try {
        const { results } = await makeCrud(endpoint).list({ [PAGINATION_LIMIT_KEY]: UI_DICT_CACHE_LIMIT, ...params })
        this.cache[key] = results
        return results
      } finally {
        this.loading[key] = false
      }
    },
    clear() {
      this.cache = {}
      this.loading = {}
    }
  }
})
