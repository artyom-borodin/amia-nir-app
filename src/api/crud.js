import { api } from './client.js'
import {
  baseUrl,
  itemUrl,
  PAGINATION_RESULTS_KEY,
  PAGINATION_COUNT_KEY
} from '../constants/api.js'

function normalizeList(data) {
  if (data && Array.isArray(data[PAGINATION_RESULTS_KEY])) {
    return { results: data[PAGINATION_RESULTS_KEY], count: data[PAGINATION_COUNT_KEY] || 0 }
  }
  if (Array.isArray(data)) {
    return { results: data, count: data.length }
  }
  return { results: [], count: 0 }
}

export function makeCrud(endpoint) {
  const base = baseUrl(endpoint)
  return {
    endpoint,
    async list(params = {}) {
      const res = await api.get(base, { params })
      return normalizeList(res.data)
    },
    async get(id) {
      const res = await api.get(itemUrl(base, id))
      return res.data
    },
    async create(payload) {
      const res = await api.post(base, payload)
      return res.data
    },
    async update(id, payload) {
      const res = await api.put(itemUrl(base, id), payload)
      return res.data
    },
    async patch(id, payload) {
      const res = await api.patch(itemUrl(base, id), payload)
      return res.data
    },
    async remove(id) {
      await api.delete(itemUrl(base, id))
      return true
    }
  }
}
