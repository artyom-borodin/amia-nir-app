import { defineStore } from 'pinia'
import { makeCrud } from '../api/crud.js'
import { UI_DICT_CACHE_LIMIT } from '../constants/ui.js'
import { PAGINATION_LIMIT_KEY, isEmptyValue } from '../constants/api.js'
import { STORE_DICTS } from '../constants/stores.js'
import { getEndpoint } from '../constants/tables.js'
import { buildOptionDescriptor, inferEndpointKind } from '../utils/entityCards.js'

const inflight = {}

export function buildCacheKey(endpoint, params) {
  const norm = getEndpoint(endpoint)
  const sorted = Object.keys(params || {}).sort()
  return norm + '|' + JSON.stringify(params || {}, sorted)
}

export const useDictionariesStore = defineStore(STORE_DICTS, {
  state: () => ({
    cache: {},
    byId: {},
    byLabel: {}
  }),
  actions: {
    indexRows(endpoint, rows) {
      const norm = getEndpoint(endpoint)
      const kind = inferEndpointKind(norm)
      const idMap = { ...(this.byId[norm] || {}) }
      const labelMap = { ...(this.byLabel[norm] || {}) }
      for (const row of rows || []) {
        if (!row || isEmptyValue(row.id)) continue
        const { label, card } = buildOptionDescriptor(row, undefined, kind)
        idMap[row.id] = card
        if (label) labelMap[label] = card
        if (row.subdivision_short_name) labelMap[String(row.subdivision_short_name)] = card
        if (row.subdivision_name) labelMap[String(row.subdivision_name)] = card
        if (row.name) labelMap[String(row.name)] = card
      }
      this.byId[norm] = idMap
      this.byLabel[norm] = labelMap
    },
    async load(endpoint, params = {}) {
      const norm = getEndpoint(endpoint)
      const key = buildCacheKey(norm, params)
      if (key in this.cache) return this.cache[key]
      if (key in inflight) return inflight[key]
      const promise = makeCrud(norm)
        .list({ [PAGINATION_LIMIT_KEY]: UI_DICT_CACHE_LIMIT, ...params })
        .then(({ results }) => {
          this.cache[key] = results
          this.indexRows(norm, results)
          return results
        })
        .finally(() => {
          delete inflight[key]
        })
      inflight[key] = promise
      return promise
    },
    ensureEndpoint(endpoint) {
      const norm = getEndpoint(endpoint)
      const key = buildCacheKey(norm, {})
      if (!(key in this.cache) && !(key in inflight)) {
        this.load(norm, {}).catch(() => {})
      }
    },
    lookupCard(map, endpoint, key) {
      if (isEmptyValue(key)) return null
      const norm = getEndpoint(endpoint)
      const card = map[norm]?.[key]
      if (card) return card
      this.ensureEndpoint(norm)
      return null
    },
    getCard(endpoint, id) {
      return this.lookupCard(this.byId, endpoint, id)
    },
    getCardByLabel(endpoint, label) {
      return this.lookupCard(this.byLabel, endpoint, isEmptyValue(label) ? label : String(label))
    },
    clear() {
      this.cache = {}
      this.byId = {}
      this.byLabel = {}
    }
  }
})
